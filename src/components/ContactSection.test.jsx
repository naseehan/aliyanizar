import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import ContactSection from "./ContactSection";

vi.mock("react-toastify", () => ({
  toast: {
    promise: vi.fn((promise) => promise),
    error: vi.fn(),
  },
}));

async function fillAndSubmit(user) {
  await user.type(screen.getByLabelText("Name*"), "Jane Doe");
  await user.type(screen.getByLabelText("Email Address*"), "jane@example.com");
  await user.type(screen.getByLabelText("What's this regarding?*"), "Prints");
  await user.type(screen.getByLabelText("Message*"), "Do you ship to Oman?");
  await user.click(screen.getByRole("button", { name: "Submit" }));
}

describe("ContactSection (home page form)", () => {
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

  it("sends the message and clears the form", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => ({ success: true }) });
    render(<ContactSection />);

    await fillAndSubmit(user);

    await waitFor(() => expect(screen.getByLabelText("Message*")).toHaveValue(""));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "",
      what: "Prints",
      message: "Do you ship to Oman?",
    });
  });

  it("tells the user to slow down when rate limited", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue({ ok: false, status: 429 });
    render(<ContactSection />);

    await fillAndSubmit(user);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining("You're sending messages too fast")
      )
    );
  });

  it("shows a generic error when the network request fails", async () => {
    const user = userEvent.setup();
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<ContactSection />);

    await fillAndSubmit(user);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("❌ Something went wrong. Please try again!")
    );
    expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
  });
});
