import { router } from 'expo-router';

export type FeatureScreen =
  | 'membership'
  | 'checkout'
  | 'payments'
  | 'receipt'
  | 'payment-pending'
  | 'payment-rejected'
  | 'payment-approved'
  | 'check-in-result'
  | 'attendance'
  | 'trainer-profile'
  | 'booking'
  | 'bookings'
  | 'workouts'
  | 'workout-detail'
  | 'progress'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'community'
  | 'trainer-dashboard'
  | 'trainer-requests'
  | 'trainer-edit'
  | 'trainer-services'
  | 'trainer-availability'
  | 'clients';

export const MEMBER_HOME_ROUTE = '/member' as const;

export function openFeature(screen: FeatureScreen, params?: Record<string, string>) {
  router.push({ pathname: '/feature/[screen]', params: { screen, ...params } });
}
