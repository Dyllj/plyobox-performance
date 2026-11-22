import {
  MEMBERSHIP_LABEL,
  MEMBERSHIP_UNIT,
  PAYMENT_METHOD_LABEL,
  type GymInfo,
  type MembershipType,
  type PaymentMethod,
} from "../lib/shared/contract";

export const siteInfo: GymInfo = {
  name: "Plyobox Performance Gym",
  locality: "Mahayag",
  region: "Zamboanga del Sur",
  country: "PH",
  phone: null,
  email: null,
  hours: null,
  address: null,
  lat: 8.148,
  lng: 123.434,
};

export const appLinks = {
  register: null,
  ios: null,
  android: null,
};

export const publicNavigation = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Gym", href: "#gym" },
  { label: "Membership", href: "#membership" },
  { label: "Trainers", href: "#trainers" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const tickerWords = ["Strength", "Power", "Speed", "Agility"] as const;

export const heroPhotos = [
  {
    id: "main",
    label: "Hero photo · box jump",
    src: "/Jump.jpg",
    alt: "Athlete performing a box jump inside the gym",
  },
  {
    id: "barbell",
    label: "Photo · dumbbell training",
    src: "/Dumbell.jpg",
    alt: "Athlete training with dumbbells",
  },
  {
    id: "coach",
    label: "Photo · coach",
    src: "/Coach.jpg",
    alt: "Coach demonstrating a kettlebell lunge",
  },
] as const;

export const steps = [
  {
    id: "account",
    title: "Create your account",
    text: "Register online and get your own member number.",
    visual: "signup",
  },
  {
    id: "pay",
    title: "Pay and get verified",
    text: "Pay by cash, GCash, Maya or bank transfer. Access starts after verification.",
    visual: "payment",
  },
  {
    id: "scan",
    title: "Scan and train",
    text: "Scan the gym QR to check in. Your attendance is logged for you.",
    visual: "qr",
  },
] as const;

export const paymentMethods: readonly PaymentMethod[] = [
  "cash",
  "gcash",
  "maya",
  "bank",
] as const;
export const paymentMethodLabels = paymentMethods.map(
  (method) => PAYMENT_METHOD_LABEL[method],
);

export const gymPhotos = [
  {
    id: "floor",
    label: "Large photo · training floor",
    src: "/TrainingFloor.jpg",
    alt: "View across the Plyobox Performance Gym training floor",
  },
  {
    id: "box",
    label: "Photo · plyo boxes",
    src: "/JumpBox.jpg",
    alt: "Plyometric boxes on the gym floor",
  },
  {
    id: "kettlebell",
    label: "Photo · kettlebells",
    src: "/KettleBall.jpg",
    alt: "Kettlebells arranged on the training floor",
  },
  {
    id: "racks",
    label: "Tall photo · squat racks",
    src: "/SquatRack.jpg",
    alt: "Loaded squat rack inside the gym",
  },
  {
    id: "turf",
    label: "Photo · turf lane",
    src: "/TurfLane.jpg",
    alt: "Indoor turf lane for conditioning and agility training",
  },
  {
    id: "community",
    label: "Wide photo · members training together",
    src: "/WorkingOut.jpg",
    alt: "Members working out together on the turf",
  },
] as const;

export const membershipPlans: readonly {
  id: MembershipType;
  name: string;
  description: string;
  priceMinor: number | null;
  unit: string;
  cta: string;
  href: string;
  featured: boolean;
  tag: string | null;
}[] = [
  {
    id: "daily",
    name: MEMBERSHIP_LABEL.daily,
    description: "One gym entry for one day. Access ends at midnight on the day of verification.",
    priceMinor: null,
    unit: MEMBERSHIP_UNIT.daily,
    cta: "Get a day pass",
    href: "#contact",
    featured: false,
    tag: null,
  },
  {
    id: "monthly",
    name: MEMBERSHIP_LABEL.monthly,
    description: "Valid for 30 calendar days from the day your payment is verified.",
    priceMinor: null,
    unit: MEMBERSHIP_UNIT.monthly,
    cta: "Become a member",
    href: "#contact",
    featured: true,
    tag: "For regulars",
  },
] as const;

export const trainers = [
  { id: "trainer-one", name: null, specialty: null, yearsExperience: null, services: [] as { id: string; name: string; durationMinutes: number; priceMinor: number }[], bio: null },
  { id: "trainer-two", name: null, specialty: null, yearsExperience: null, services: [] as { id: string; name: string; durationMinutes: number; priceMinor: number }[], bio: null },
  { id: "trainer-three", name: null, specialty: null, yearsExperience: null, services: [] as { id: string; name: string; durationMinutes: number; priceMinor: number }[], bio: null },
] as const;

export const communityQuotes = [
  { id: "member-one", quote: null, name: null },
  { id: "member-two", quote: null, name: null },
  { id: "member-three", quote: null, name: null },
] as const;

export const frequentlyAskedQuestions = [
  {
    question: "Can I check in twice in one day?",
    answer:
      "No. Each member can enter once per local calendar day. An unused Daily Session expires at the end of that day.",
  },
  {
    question: "When does my membership start?",
    answer:
      "Your membership starts after your payment has been verified. A payment screenshot alone does not activate access.",
  },
  {
    question: "How long is a Monthly Membership valid?",
    answer: "It is valid for 30 days from its activation date.",
  },
  {
    question: "How do I become a trainer?",
    answer:
      "Create an account and complete your trainer profile. Completed profiles are published automatically; no interview or approval is required.",
  },
] as const;
