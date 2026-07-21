import { PLACEHOLDER_MARKER } from "./business";

export type Review = {
  id: string;
  author: string;
  text: string;
  rating: number;
  isPlaceholder: boolean;
};

/**
 * Do not fabricate reviews. Replace placeholders with verified Google reviews
 * or connect an official embed provider before production.
 */
export const reviews: Review[] = [
  {
    id: "placeholder-1",
    author: `${PLACEHOLDER_MARKER}: Customer Name`,
    text: `${PLACEHOLDER_MARKER}: Verified Google review text will appear here once supplied.`,
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    author: `${PLACEHOLDER_MARKER}: Customer Name`,
    text: `${PLACEHOLDER_MARKER}: Verified Google review text will appear here once supplied.`,
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    author: `${PLACEHOLDER_MARKER}: Customer Name`,
    text: `${PLACEHOLDER_MARKER}: Verified Google review text will appear here once supplied.`,
    rating: 5,
    isPlaceholder: true,
  },
];
