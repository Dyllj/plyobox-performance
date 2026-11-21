/**
 * All editable copy and content for the public site lives here.
 * Replace every [PLACEHOLDER] with real content; components need no changes.
 */

export const siteInfo = {
  name: "Plyobox Performance Gym",
  location: "Mahayag, Zamboanga del Sur",
  country: "Philippines",
  contact: {
    phone: "[PHONE]",
    email: "[EMAIL]",
    hours: "[OPENING HOURS]",
  },
  /**
   * Approximate town-centre pin (OpenStreetMap embed, no API key needed).
   * Replace with the gym's exact coordinates: OSM → Share → HTML embed.
   */
  map: { lat: 8.148, lng: 123.434, span: 0.02 },
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

export const paymentMethods = ["Cash", "GCash", "Maya", "Bank"] as const;

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

export const membershipPlans = [
  {
    id: "daily",
    name: "Daily Session",
    description: "One gym entry for one day. Access ends at midnight.",
    price: "[YOUR PRICE]",
    unit: "per session",
    cta: "Get a day pass",
    href: "#contact",
    featured: false,
    tag: null,
  },
  {
    id: "monthly",
    name: "Monthly Membership",
    description: "Valid for 30 days from the day your payment is verified.",
    price: "[YOUR PRICE]",
    unit: "per 30 days",
    cta: "Become a member",
    href: "#contact",
    featured: true,
    tag: "For regulars",
  },
] as const;

export const trainers = [
  { id: "trainer-one", name: "[TRAINER NAME]", specialty: "[SPECIALIZATION]", years: "[YEARS]", rate: "[RATE]", bio: "[TRAINER BIO]" },
  { id: "trainer-two", name: "[TRAINER NAME]", specialty: "[SPECIALIZATION]", years: "[YEARS]", rate: "[RATE]", bio: "[TRAINER BIO]" },
  { id: "trainer-three", name: "[TRAINER NAME]", specialty: "[SPECIALIZATION]", years: "[YEARS]", rate: "[RATE]", bio: "[TRAINER BIO]" },
] as const;

export const communityQuotes = [
  { id: "member-one", quote: "[MEMBER QUOTE]", name: "[MEMBER NAME]" },
  { id: "member-two", quote: "[MEMBER QUOTE]", name: "[MEMBER NAME]" },
  { id: "member-three", quote: "[MEMBER QUOTE]", name: "[MEMBER NAME]" },
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
