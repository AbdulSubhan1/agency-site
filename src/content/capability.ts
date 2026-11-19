/** One service on a brand's home page: what it does for the buyer and what they receive. */
export type Capability = {
  id: string;
  name: string;
  outcome: string;
  deliverables: string;
  icon:
    | "code"
    | "web"
    | "mobile"
    | "design"
    | "ai"
    | "flow"
    | "plug"
    | "cloud"
    | "brand"
    | "search"
    | "megaphone"
    | "target"
    | "compass"
    | "chart";
};
