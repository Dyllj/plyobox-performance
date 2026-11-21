import type { CSSProperties } from "react";

/** Sets the `--i` custom property used by CSS to stagger entrance animations. */
export const stagger = (index: number): CSSProperties =>
  ({ "--i": index }) as CSSProperties;
