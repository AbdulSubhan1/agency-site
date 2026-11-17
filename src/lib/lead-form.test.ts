import { describe, expect, it } from "vitest";
import { asiaLeadSchema, fieldErrors, MESSAGES, normalizePhone, usLeadSchema } from "./lead-form";

describe("normalizePhone", () => {
  it.each([
    ["(512) 555-0143", undefined, "+15125550143"],
    ["+1 512 555 0143", undefined, "+15125550143"],
    ["00971 50 123 4567", undefined, "+971501234567"],
    ["0300 1234567", "+92", "+923001234567"],
    ["50 123 4567", "+971", "+971501234567"],
    ["", "+971", ""],
  ])("%s with %s becomes %s", (raw, code, expected) => {
    expect(normalizePhone(raw, code)).toBe(expected);
  });
});

const us = {
  service: "workflows",
  budgetBand: "1k_5k",
  timeline: "asap",
  name: "Jordan Ellis",
  email: "jordan@example.com",
};

describe("usLeadSchema", () => {
  it("accepts a full enquiry and fills optional fields", () => {
    const v = usLeadSchema.parse(us);
    expect(v).toMatchObject({ phone: "", company: "", message: "" });
  });

  it("needs a work email", () => {
    const r = usLeadSchema.safeParse({ ...us, email: "" });
    expect(r.success || fieldErrors(r.error)).toEqual({ email: MESSAGES.emailRequired });
  });

  it("names every missing choice", () => {
    const r = usLeadSchema.safeParse({ name: "Jo", email: "jo@example.com" });
    expect(Object.keys(r.success ? {} : fieldErrors(r.error))).toEqual(["service", "timeline", "budgetBand"]);
  });

  it("rejects a phone it can't read", () => {
    const r = usLeadSchema.safeParse({ ...us, phone: "12" });
    expect(r.success || fieldErrors(r.error)).toEqual({ phone: MESSAGES.phone });
  });
});

const asia = {
  phone: "50 123 4567",
  callingCode: "+971",
  name: "Fatima Noor",
  whatsappOptIn: "on",
  service: "chat-agent",
  timeline: "asap",
};

describe("asiaLeadSchema", () => {
  it("adds the calling code and reads the tick box", () => {
    expect(asiaLeadSchema.parse(asia)).toMatchObject({ phone: "+971501234567", whatsappOptIn: true });
  });

  it("needs the WhatsApp tick or an email", () => {
    const r = asiaLeadSchema.safeParse({ ...asia, whatsappOptIn: "" });
    expect(r.success || fieldErrors(r.error)).toEqual({ whatsappOptIn: MESSAGES.whatsappOptIn });
    expect(asiaLeadSchema.safeParse({ ...asia, whatsappOptIn: "", email: "f@example.com" }).success).toBe(true);
  });

  it("needs the number", () => {
    const r = asiaLeadSchema.safeParse({ ...asia, phone: "" });
    expect(r.success || fieldErrors(r.error)).toMatchObject({ phone: MESSAGES.phoneRequired });
  });
});
