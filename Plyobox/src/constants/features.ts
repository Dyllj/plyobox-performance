export const features = {
  workouts: false,
  progress: false,
  goals: false,
  community: false,
  ratings: false,
} as const;

export type Features = typeof features;
