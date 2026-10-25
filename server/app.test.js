import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "0501234567",
  what: "Commission",
  message: "I'd love a custom mural.",
};

function makeMailer(impl = async () => ({ id: "email_123" })) {
  return { emails: { send: vi.fn(impl) } };
}

describe("POST /sendmail", () => {
  let consoleError;

  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("sends the email and returns success", async () => {
    const mailer = makeMailer();
    const app = createApp({ mailer });

    const res = await request(app).post("/sendmail").send(validBody);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      data: { id: "email_123" },
    });
    expect(mailer.emails.send).toHaveBeenCalledTimes(1);
  });

  it("builds the email from the form fields", async () => {
    const mailer = makeMailer();
    const app = createApp({ mailer });

    await request(app).post("/sendmail").send(validBody);

    const sent = mailer.emails.send.mock.calls[0][0];
    expect(sent.to).toBe("aliyanizar023@gmail.com");
    expect(sent.subject).toBe("New message from Jane Doe");
    expect(sent.text).toContain("Email: jane@example.com");
    expect(sent.text).toContain("Phone: 0501234567");
    expect(sent.text).toContain("Regarding: Commission");
    expect(sent.text).toContain("Message: I'd love a custom mural.");
  });

  it("uses a placeholder when phone is missing", async () => {
    const mailer = makeMailer();
    const app = createApp({ mailer });

    const noPhone = { ...validBody };
    delete noPhone.phone;
    await request(app).post("/sendmail").send(noPhone);

    expect(mailer.emails.send.mock.calls[0][0].text).toContain(
      "Phone: Not provided"
    );
  });

  it.each(["name", "email", "message"])(
    "rejects requests missing %s with 400",
    async (field) => {
      const mailer = makeMailer();
      const app = createApp({ mailer });

      const body = { ...validBody, [field]: "" };
      const res = await request(app).post("/sendmail").send(body);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        success: false,
        message: "Missing required fields",
      });
      expect(mailer.emails.send).not.toHaveBeenCalled();
    }
  );

  it("rejects an empty request body with 400", async () => {
    const app = createApp({ mailer: makeMailer() });

    const res = await request(app).post("/sendmail");

    expect(res.status).toBe(400);
  });

  it("returns 500 when the mail provider fails", async () => {
    const mailer = makeMailer(async () => {
      throw new Error("Resend is down");
    });
    const app = createApp({ mailer });

    const res = await request(app).post("/sendmail").send(validBody);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Resend is down");
  });

  it("rate limits after the configured number of requests", async () => {
    const app = createApp({ mailer: makeMailer(), rateLimitMax: 2 });

    await request(app).post("/sendmail").send(validBody).expect(200);
    await request(app).post("/sendmail").send(validBody).expect(200);
    const res = await request(app).post("/sendmail").send(validBody);

    expect(res.status).toBe(429);
    expect(res.body).toEqual({ error: "Too many requests, try again later." });
  });

  it("allows cross-origin requests from the frontend", async () => {
    const app = createApp({ mailer: makeMailer() });

    const res = await request(app)
      .post("/sendmail")
      .set("Origin", "https://www.aliyanizarstudio.com")
      .send(validBody);

    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

  it("returns 404 for unknown routes", async () => {
    const app = createApp({ mailer: makeMailer() });

    const res = await request(app).get("/does-not-exist");

    expect(res.status).toBe(404);
  });
});
