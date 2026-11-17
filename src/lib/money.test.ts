import { describe, expect, it } from "vitest";
import { money, moneyRange } from "./money";

describe("money", () => {
  it("uses the dollar sign for USD and the code for other currencies", () => {
    expect(money(2500, "USD", "en-US")).toBe("$2,500");
    expect(money(3500, "AED", "en-GB")).toBe("AED 3,500");
    expect(money(25000, "PKR", "en-GB")).toBe("PKR 25,000");
  });

  it("writes a range once and an open range as from", () => {
    expect(moneyRange({ min: 2500, max: 5000 }, "USD", "en-US")).toBe("$2,500–5,000");
    expect(moneyRange({ min: 1500 }, "AED", "en-GB")).toBe("from AED 1,500");
  });
});
