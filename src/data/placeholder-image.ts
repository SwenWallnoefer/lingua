/** Placeholder picture from Picsum. The same seed always returns the same photo. */
export const placeholderImage = (seed: string, width = 600, height = 400) =>
  `https://picsum.photos/seed/${seed}/${width}/${height}`
