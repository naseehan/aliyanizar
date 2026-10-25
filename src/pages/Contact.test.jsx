import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Contact from "./Contact";

vi.mock("react-toastify", () => ({
  toast: {
    promise: vi.fn((promise) => promise),
    error: vi.fn(),
  },
}));

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
}

async function fillForm(user) {
  await user.type(screen.getByLabelText("Name*"), "Jane Doe");
  await user.type(screen.getByLabelText("Email Address*"), "jane@example.com");
  await user.type(screen.getByLabelText("Phone"), "0501234567");
  await user.type(screen.getByLabelText("What's this regarding?*"), "Commission");
  await user.type(screen.getByLabelText("Message*"), "I'd love a mural.");
}

describe("Contact page", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders all form fields and marks required ones", () => {
    renderContact();

    expect(screen.getByLabelText("Name*")).toBeRequired();
    expect(screen.getByLabelText("Email Address*")).toBeRequired();
    expect(screen.getByLabelText("Email Address*")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone")).not.toBeRequired();
    expect(screen.getByLabelText("What's this regarding?*")).toBeRequired();
    expect(screen.getByLabelText("Message*")).toBeRequired();
  });

  it("posts the form to the mail server and resets it on success", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true }) });
    renderContact();

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(screen.getByLabelText("Name*")).toHaveValue(""));
    expect(fetchMock).toHaveBeenCalledWith(
      "https://aliyanizar.onrender.com/sendmail",
      expect.objectContaining({ method: "POST" })
    );
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "0501234567",
      what: "Commission",
      message: "I'd love a mural.",
    });
    expect(toast.promise).toHaveBeenCalledTimes(1);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("disables the button while the message is sending", async () => {
    const user = userEvent.setup();
    let resolve;
    fetchMock.mockReturnValue(new Promise((r) => (resolve = r)));
    renderContact();

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByRole("button", { name: "Submitting..." })).toBeDisabled();

    resolve({ ok: true, status: 200, json: async () => ({}) });
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled()
    );
  });

  it("shows a rate-limit message when the server returns 429", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({ ok: false, status: 429 });
    renderContact();

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("You're sending messages too fast")
      )
    );
    // the form keeps what the user typed so they can retry
    expect(screen.getByLabelText("Name*")).toHaveValue("Jane Doe");
  });

  it("shows a generic error when the server fails", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    renderContact();

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("❌ Something went wrong. Please try again!")
    );
  });

  it("does not submit when required fields are empty", async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(fetchMock).not.toHaveBeenCalled();
  });
});
