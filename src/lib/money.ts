import type { Range } from "@/content/schema";

/** "$2,500", or "AED 3,500" in en-GB; whole units, no decimals. */
export function money(amount: number, currency: string, locale: string): string {
  return (
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: currency === "USD" ? "symbol" : "code",
      maximumFractionDigits: 0,
    })
      .format(amount)
      // Intl puts a no-break space after a currency code; a plain one keeps copy and tests predictable
      .replace(/\u00a0/g, " ")
  );
}

/** "$2,500–5,000" or "from $1,500". */
export function moneyRange(range: Range, currency: string, locale: string): string {
  if (range.max === undefined) return `from ${money(range.min, currency, locale)}`;
  const max = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(range.max);
  return `${money(range.min, currency, locale)}–${max}`;
}
