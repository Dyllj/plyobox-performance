import { router } from 'expo-router';
import type { MembershipType } from '@/lib/shared/contract';

export const FEATURE_SCREENS = [
  'membership','checkout','payments','receipt','payment-pending','payment-rejected','payment-verified',
  'privacy-notice','check-in-result','attendance','trainer-profile','booking','bookings','workouts',
  'workout-detail','progress','notifications','profile','settings','community','trainer-dashboard',
  'trainer-requests','trainer-edit','trainer-services','trainer-availability','clients',
] as const;
export type FeatureScreen = (typeof FEATURE_SCREENS)[number];

export type FeatureParams = {
  membership: { type?: MembershipType };
  checkout: { type: MembershipType };
  payments: undefined;
  receipt: { paymentId: string };
  'payment-pending': { paymentId: string };
  'payment-rejected': { paymentId: string };
  'payment-verified': { paymentId: string };
  'privacy-notice': undefined;
  'check-in-result': { memberId: string };
  attendance: undefined;
  'trainer-profile': { trainerId: string };
  booking: { trainerId: string; serviceId?: string };
  bookings: undefined;
  workouts: undefined;
  'workout-detail': { workoutId: string };
  progress: undefined;
  notifications: undefined;
  profile: undefined;
  settings: undefined;
  community: undefined;
  'trainer-dashboard': undefined;
  'trainer-requests': undefined;
  'trainer-edit': { trainerId: string };
  'trainer-services': { trainerId: string };
  'trainer-availability': { trainerId: string };
  clients: undefined;
};

export const MEMBER_HOME_ROUTE = '/member' as const;

export type TabKey = 'home' | 'pass' | 'scan' | 'trainers' | 'more';

export const FEATURE_META: Record<FeatureScreen, {
  title: string;
  tab: TabKey;
  hideTabs?: boolean;
}> = {
  membership: { title: 'Membership', tab: 'pass' },
  checkout: { title: 'Checkout', tab: 'pass' },
  payments: { title: 'Payments', tab: 'pass' },
  receipt: { title: 'Receipt', tab: 'pass', hideTabs: true },
  'payment-pending': { title: 'Payment pending', tab: 'pass', hideTabs: true },
  'payment-rejected': { title: 'Payment needs attention', tab: 'pass', hideTabs: true },
  'payment-verified': { title: 'Payment verified', tab: 'pass', hideTabs: true },
  'privacy-notice': { title: 'Privacy notice', tab: 'more', hideTabs: true },
  'check-in-result': { title: 'Check-in complete', tab: 'scan', hideTabs: true },
  attendance: { title: 'Attendance', tab: 'scan' },
  'trainer-profile': { title: 'Trainer profile', tab: 'trainers' },
  booking: { title: 'Request a session', tab: 'trainers' },
  bookings: { title: 'My bookings', tab: 'trainers' },
  workouts: { title: 'Workout plans', tab: 'more', hideTabs: true },
  'workout-detail': { title: 'Workout detail', tab: 'more', hideTabs: true },
  progress: { title: 'Your progress', tab: 'more', hideTabs: true },
  notifications: { title: 'Notifications', tab: 'more' },
  profile: { title: 'Your profile', tab: 'more' },
  settings: { title: 'Settings & privacy', tab: 'more' },
  community: { title: 'Community', tab: 'more', hideTabs: true },
  'trainer-dashboard': { title: 'Trainer dashboard', tab: 'trainers', hideTabs: true },
  'trainer-requests': { title: 'Booking requests', tab: 'trainers', hideTabs: true },
  'trainer-edit': { title: 'Edit trainer profile', tab: 'trainers', hideTabs: true },
  'trainer-services': { title: 'Services & rates', tab: 'trainers', hideTabs: true },
  'trainer-availability': { title: 'Availability', tab: 'trainers', hideTabs: true },
  clients: { title: 'Clients', tab: 'trainers', hideTabs: true },
};

export function openFeature<T extends FeatureScreen>(
  screen: T,
  ...args: FeatureParams[T] extends undefined ? [params?: undefined] : [params: FeatureParams[T]]
) {
  const params = args[0];
  router.push({
    pathname: '/feature/[screen]',
    params: { screen, ...(params as object ?? {}) },
  } as never);
}
