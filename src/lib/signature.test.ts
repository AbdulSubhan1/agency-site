import { describe, expect, it } from "vitest";
import { signRequest } from "./signature";

describe("signRequest", () => {
  // The same vector is tested in AgencyDesk (docs/10-website-api.md); if either side changes, both tests fail
  it("matches the CRM's fixed test vector", () => {
    expect(signRequest("vector-secret", 1800000000, "POST", "/api/website/v1/leads", '{"a":1}')).toBe(
      "f7c5ec01ca8db206171c90ec802c3971b9e2bf2aad5fe9df689e524f352ebbc0",
    );
  });

  it("changes with the body", () => {
    const a = signRequest("s", 1, "POST", "/p", "{}");
    expect(signRequest("s", 1, "POST", "/p", '{"x":1}')).not.toBe(a);
  });
});
