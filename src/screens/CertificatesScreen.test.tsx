import { render } from "ink-testing-library";
import { describe, expect, it } from "vitest";
import CertificatesScreen from "./CertificatesScreen.js";

describe("CertificatesScreen", () => {
  it("renders header with Certificates title", () => {
    const { lastFrame } = render(<CertificatesScreen onBack={() => {}} />);
    expect(lastFrame()).toContain("Certificates");
  });

  it("shows back navigation hint", () => {
    const { lastFrame } = render(<CertificatesScreen onBack={() => {}} />);
    const frame = lastFrame() ?? "";
    expect(frame.includes("Esc") || frame.includes("Back")).toBe(true);
  });
});
