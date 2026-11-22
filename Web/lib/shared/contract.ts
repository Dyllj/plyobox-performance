// GENERATED from /shared by shared/sync.mjs. Edit the source, not this copy.
export const MEMBERSHIP_TYPES = ['daily', 'monthly'] as const;
export type MembershipType = (typeof MEMBERSHIP_TYPES)[number];
export const PAYMENT_METHODS = ['cash', 'gcash', 'maya', 'bank'] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export const PAYMENT_STATUSES = ['pending', 'verified', 'rejected'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export const ACCOUNT_STATUSES = ['active', 'suspended'] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];
export const MEMBERSHIP_STATUSES = ['none', 'active', 'expired'] as const;
export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];
export const CHECKIN_SOURCES = ['qr', 'staff'] as const;
export type CheckInSource = (typeof CHECKIN_SOURCES)[number];
export const STAFF_ROLES = ['owner', 'admin', 'staff'] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];
export const APP_ROLES = ['member', 'trainer'] as const;
export type AppRole = (typeof APP_ROLES)[number];
export const TRAINER_PROFILE_STATUSES = ['draft', 'published', 'suspended'] as const;
export type TrainerProfileStatus = (typeof TRAINER_PROFILE_STATUSES)[number];
export const BOOKING_STATUSES = ['pending', 'confirmed', 'declined', 'completed', 'cancelled'] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export const INQUIRY_STATUSES = ['new', 'replied'] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];
export const INQUIRY_TOPICS = ['membership', 'trainer', 'other'] as const;
export type InquiryTopic = (typeof INQUIRY_TOPICS)[number];

export const GYM_TIME_ZONE = 'Asia/Manila';
export const QR_ROTATION_SECONDS = 60;
export const MINIMUM_MEMBER_AGE: null = null; // TODO(decision): owner to set a minimum age policy.

export const MEMBERSHIP_LABEL: Record<MembershipType, string> = {
  daily: 'Daily Session',
  monthly: 'Monthly Membership',
};
export const MEMBERSHIP_SHORT: Record<MembershipType, string> = {
  daily: 'Daily',
  monthly: 'Monthly',
};
export const MEMBERSHIP_UNIT: Record<MembershipType, string> = {
  daily: 'per session',
  monthly: 'per 30 days',
};
export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: 'Cash',
  gcash: 'GCash',
  maya: 'Maya',
  bank: 'Bank transfer',
};
export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: 'Pending',
  verified: 'Verified',
  rejected: 'Rejected',
};
export const ACCOUNT_STATUS_LABEL: Record<AccountStatus, string> = {
  active: 'Active',
  suspended: 'Suspended',
};
export const MEMBERSHIP_STATUS_LABEL: Record<MembershipStatus, string> = {
  none: 'No membership',
  active: 'Active',
  expired: 'Expired',
};
export const CHECKIN_SOURCE_LABEL: Record<CheckInSource, string> = {
  qr: 'QR',
  staff: 'Staff',
};
export const STAFF_ROLE_LABEL: Record<StaffRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  staff: 'Staff',
};
export const APP_ROLE_LABEL: Record<AppRole, string> = {
  member: 'Member',
  trainer: 'Trainer',
};
export const TRAINER_PROFILE_STATUS_LABEL: Record<TrainerProfileStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  suspended: 'Suspended',
};
export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  declined: 'Declined',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: 'New',
  replied: 'Replied',
};
export const INQUIRY_TOPIC_LABEL: Record<InquiryTopic, string> = {
  membership: 'Membership',
  trainer: 'Trainer sign-up',
  other: 'Other',
};

export interface ConsentRecord {
  noticeVersion: string;
  acceptedAt: string;
}

export interface GymInfo {
  name: string;
  locality: string | null;
  region: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
}

export interface Member {
  id: string;
  memberNo: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  accountStatus: AccountStatus;
  memberSince: string;
  consent: ConsentRecord | null;
}

export interface Membership {
  id: string;
  memberId: string;
  type: MembershipType;
  status: MembershipStatus;
  startsOn: string;
  lastValidDay: string;
  paymentId: string;
}

export interface Payment {
  id: string;
  paymentRef: string;
  memberId: string;
  membershipType: MembershipType;
  method: PaymentMethod;
  status: PaymentStatus;
  amountMinor: number;
  currency: 'PHP';
  proofUrl: string | null;
  createdAt: string;
  verifiedAt: string | null;
  verifiedBy: string | null;
}

export interface CheckIn {
  id: string;
  memberId: string;
  source: CheckInSource;
  membershipType: MembershipType;
  at: string;
}

export interface TrainerService {
  id: string;
  name: string;
  durationMinutes: number;
  priceMinor: number;
}

export interface TrainerProfile {
  id: string;
  name: string;
  specialty: string;
  yearsExperience: number | null;
  bio: string | null;
  tags: string[];
  rating: number | null;
  services: TrainerService[];
  status: TrainerProfileStatus;
  profile: number;
}

export interface Booking {
  id: string;
  trainerId: string;
  serviceId: string;
  memberId: string;
  startsAt: string;
  status: BookingStatus;
  note: string;
}

export interface Inquiry {
  id: string;
  topic: InquiryTopic;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface InquiryInput {
  topic: InquiryTopic;
  name: string;
  email: string;
  phone: string | null;
  message: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  accountStatus: AccountStatus;
}

export interface AuditEntry {
  id: string;
  actorId: string;
  action: string;
  detail: string;
  createdAt: string;
}

export type CheckInResult =
  | 'ok'
  | 'already_checked_in'
  | 'no_active_access'
  | 'invalid_code';

export type Permission =
  | 'pricing'
  | 'settings'
  | 'reports'
  | 'expenses'
  | 'members'
  | 'trainers'
  | 'payments'
  | 'attendance'
  | 'inquiries'
  | 'users'
  | 'auditLog';

export type PermissionLevel = 'full' | 'view' | 'none';

export const PERMISSIONS: Record<Permission, Record<StaffRole, PermissionLevel>> = {
  pricing: { owner: 'full', admin: 'none', staff: 'none' },
  settings: { owner: 'full', admin: 'none', staff: 'none' },
  reports: { owner: 'full', admin: 'none', staff: 'none' },
  expenses: { owner: 'full', admin: 'none', staff: 'none' },
  members: { owner: 'full', admin: 'full', staff: 'view' },
  trainers: { owner: 'full', admin: 'full', staff: 'view' },
  payments: { owner: 'full', admin: 'full', staff: 'full' },
  attendance: { owner: 'full', admin: 'full', staff: 'full' },
  inquiries: { owner: 'full', admin: 'full', staff: 'view' },
  users: { owner: 'full', admin: 'full', staff: 'none' },
  auditLog: { owner: 'full', admin: 'full', staff: 'none' },
};

export function isMembershipType(value: unknown): value is MembershipType {
  return typeof value === 'string' && (MEMBERSHIP_TYPES as readonly string[]).includes(value);
}

export function formatPeso(minor: number): string {
  if (!Number.isFinite(minor)) return '₱0';
  const pesos = minor / 100;
  const cents = minor % 100;
  if (cents === 0) return `₱${pesos.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
  return `₱${pesos.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function parsePesoToMinor(input: string): number | null {
  const normalized = input.replace(/,/g, '').trim();
  if (!/^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, cents = ''] = normalized.split('.');
  const minor = Number(whole) * 100 + Number(cents.padEnd(2, '0'));
  return Number.isSafeInteger(minor) && minor > 0 ? minor : null;
}

export function manilaDateKey(date: Date | string): string {
  const iso = typeof date === 'string' ? date : date.toISOString();
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: GYM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(iso));
  const value = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function addDays(dateKey: string, n: number): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + n));
  return date.toISOString().slice(0, 10);
}

export function formatDate(iso: string, options: { year?: boolean } = {}): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: GYM_TIME_ZONE,
    month: 'short',
    day: '2-digit',
    ...(options.year ? { year: 'numeric' } : {}),
  }).format(new Date(iso));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: GYM_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function formatRelative(iso: string, now: Date): string {
  const diffMinutes = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60000));
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const hours = Math.round(diffMinutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? 'Yesterday' : `${days} days ago`;
}

export function daysUntil(dateKey: string, now: Date): number {
  const today = manilaDateKey(now);
  const parse = (key: string) => Date.UTC(...(key.split('-').map(Number) as [number, number, number]));
  return Math.round((parse(dateKey) - parse(today)) / 86400000);
}

// Examples: verified Nov 1 -> Nov 1 to Nov 30 monthly; daily verified
// Nov 1 -> Nov 1 only. Existing memberships keep their original payment amount.
export function membershipWindow(
  type: MembershipType,
  verifiedAt: string,
): { startsOn: string; lastValidDay: string } {
  const startsOn = manilaDateKey(verifiedAt);
  return {
    startsOn,
    lastValidDay: type === 'daily' ? startsOn : addDays(startsOn, 29),
  };
}

export function membershipStatusAt(
  membership: Membership,
  now: Date,
): MembershipStatus {
  const today = manilaDateKey(now);
  return today <= membership.lastValidDay ? 'active' : 'expired';
}

export function canCheckIn(input: {
  member: Member;
  memberships: Membership[];
  checkIns: CheckIn[];
  now: Date;
  codeValid?: boolean;
}): CheckInResult {
  if (input.codeValid === false) return 'invalid_code';
  if (input.member.accountStatus !== 'active') return 'no_active_access';
  const today = manilaDateKey(input.now);
  if (input.checkIns.some((entry) => entry.memberId === input.member.id && manilaDateKey(entry.at) === today)) {
    return 'already_checked_in';
  }
  const hasAccess = input.memberships.some(
    (membership) =>
      membership.memberId === input.member.id &&
      membershipStatusAt(membership, input.now) === 'active',
  );
  return hasAccess ? 'ok' : 'no_active_access';
}

export function memberDisplayStatus(
  member: Member,
  membership: Membership | null,
): 'Suspended' | 'Active' | 'Expired' | 'No membership' {
  if (member.accountStatus === 'suspended') return 'Suspended';
  if (!membership) return 'No membership';
  return membershipStatusAt(membership, new Date()) === 'active' ? 'Active' : 'Expired';
}
