import { describe, expect, it } from "vitest";
import { spell } from "./spelling";

describe("spell", () => {
  it("keeps US text as it is", () => {
    expect(spell("Optimize the color", "en-US")).toBe("Optimize the color");
  });

  it("swaps whole words for UK spelling and keeps the capital", () => {
    expect(spell("Optimize the center; we organize it.", "en-GB")).toBe("Optimise the centre; we organise it.");
  });

  it("leaves words that only contain a listed word", () => {
    expect(spell("colorful centers", "en-GB")).toBe("colorful centers");
  });
});
