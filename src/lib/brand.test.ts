import { describe, expect, it } from "vitest";
import { brandFrom } from "./brand";

describe("brandFrom", () => {
  it("defaults to the US brand when BRAND is not set", () => {
    expect(brandFrom(undefined)).toBe("us");
    expect(brandFrom(" ")).toBe("us");
  });

  it("reads a known brand", () => {
    expect(brandFrom("asia")).toBe("asia");
    expect(brandFrom(" us ")).toBe("us");
  });

  it("refuses an unknown brand", () => {
    expect(() => brandFrom("uk")).toThrow(/BRAND must be one of us, asia/);
  });
});
