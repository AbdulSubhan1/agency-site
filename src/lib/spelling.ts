// Shared copy is written in US spelling; the UK-spelling brand swaps these words. A short list on purpose: the copy is
// written to avoid most differences, and content.test.ts fails when a word from the list slips past.
export const US_TO_UK: Record<string, string> = {
  analyze: "analyse",
  analyzed: "analysed",
  center: "centre",
  color: "colour",
  colors: "colours",
  customize: "customise",
  customized: "customised",
  favorite: "favourite",
  optimize: "optimise",
  optimized: "optimised",
  organization: "organisation",
  organize: "organise",
  organized: "organised",
  personalize: "personalise",
  personalized: "personalised",
  prioritize: "prioritise",
  standardize: "standardise",
};

const WORD = new RegExp(`\\b(${Object.keys(US_TO_UK).join("|")})\\b`, "gi");

/** The text in the brand's spelling. en-US is returned as it is. */
export function spell(text: string, locale: "en-US" | "en-GB"): string {
  if (locale === "en-US") return text;
  return text.replace(WORD, (word) => {
    const uk = US_TO_UK[word.toLowerCase()];
    return word[0] === word[0].toUpperCase() ? uk[0].toUpperCase() + uk.slice(1) : uk;
  });
}
