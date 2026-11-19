// The worked examples the home pages animate. Businesses and numbers are made up, and every one is labelled
// "Example" where it shows.

/** Hero visual: the parts of a system joined to the middle, with work flowing between them. */
export type GraphVisual = { hub: string; nodes: readonly string[] };

/** One evening at an example business, as a live feed. */
export type FeedExample = {
  title: string;
  rows: readonly { time: string; event: string; result: string }[];
  done: string;
};

/** One piece of work's steps, before and after automation. */
export type FlowStory = {
  title: string;
  who: string;
  steps: readonly { label: string; before: string; after: string }[];
  after: string;
};
