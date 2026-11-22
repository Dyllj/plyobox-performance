// GENERATED from /shared by shared/sync.mjs. Edit the source, not this copy.
import {
  addDays,
  manilaDateKey,
  membershipWindow,
  type AuditEntry,
  type Booking,
  type CheckIn,
  type GymInfo,
  type Inquiry,
  type Member,
  type Membership,
  type Payment,
  type StaffUser,
  type TrainerProfile,
} from './contract';

export const gymInfo: GymInfo = {
  name: 'Plyobox Performance Gym',
  locality: 'Mahayag',
  region: 'Zamboanga del Sur',
  country: 'PH',
  phone: null,
  email: null,
  hours: null,
  address: null,
  lat: null,
  lng: null,
};

export const seedTotals = { total: 214, active: 186, expired: 21, suspended: 7 } as const;
export function assertSeedTotals() {
  const sum = seedTotals.active + seedTotals.expired + seedTotals.suspended;
  if (sum !== seedTotals.total) {
    throw new Error(`Invalid seed totals: ${sum} does not equal ${seedTotals.total}`);
  }
}

export function createSeed(now: Date = new Date()) {
  const today = manilaDateKey(now);
  const members: Member[] = [
    { id: 'MEM-0042', memberNo: 'PLY-0042', fullName: 'Mara Santos', email: 'mara.santos@example.com', phone: '09171234542', birthDate: '1998-04-12', emergencyContactName: 'Ana Santos', emergencyContactPhone: '09181234542', accountStatus: 'active', memberSince: '2026-08-12', consent: null },
    { id: 'MEM-0037', memberNo: 'PLY-0037', fullName: 'Eli Navarro', email: 'eli.navarro@example.com', phone: '09171234537', birthDate: '2000-09-20', emergencyContactName: 'Rina Navarro', emergencyContactPhone: '09181234537', accountStatus: 'active', memberSince: '2026-08-18', consent: null },
    { id: 'MEM-0031', memberNo: 'PLY-0031', fullName: 'Jules Reyes', email: 'jules.reyes@example.com', phone: '09171234531', birthDate: '1997-01-08', emergencyContactName: 'Liza Reyes', emergencyContactPhone: '09181234531', accountStatus: 'active', memberSince: '2026-07-30', consent: null },
    { id: 'MEM-0028', memberNo: 'PLY-0028', fullName: 'Nico Flores', email: 'nico.flores@example.com', phone: '09171234528', birthDate: '1999-12-03', emergencyContactName: 'Mark Flores', emergencyContactPhone: '09181234528', accountStatus: 'active', memberSince: '2026-07-12', consent: null },
    { id: 'MEM-0022', memberNo: 'PLY-0022', fullName: 'Sam Dizon', email: 'sam.dizon@example.com', phone: '09171234522', birthDate: '2002-05-16', emergencyContactName: 'Grace Dizon', emergencyContactPhone: '09181234522', accountStatus: 'active', memberSince: '2026-09-01', consent: null },
    { id: 'MEM-0018', memberNo: 'PLY-0018', fullName: 'Alex Lim', email: 'alex.lim@example.com', phone: '09171234518', birthDate: '1995-03-25', emergencyContactName: 'Paul Lim', emergencyContactPhone: '09181234518', accountStatus: 'suspended', memberSince: '2026-06-10', consent: null },
    { id: 'MEM-0014', memberNo: 'PLY-0014', fullName: 'Toni Garcia', email: 'toni.garcia@example.com', phone: '09171234514', birthDate: '1996-10-14', emergencyContactName: 'Nena Garcia', emergencyContactPhone: '09181234514', accountStatus: 'active', memberSince: '2026-08-01', consent: null },
  ];

  const maraWindow = membershipWindow('monthly', `${today}T09:00:00+08:00`);
  const eliWindow = membershipWindow('daily', `${today}T08:16:00+08:00`);
  const julesWindow = membershipWindow('monthly', `${addDays(today, -3)}T10:00:00+08:00`);
  const memberships: Membership[] = [
    { id: 'MSP-0042', memberId: 'MEM-0042', type: 'monthly', status: 'active', ...maraWindow, paymentId: 'PAY-0081' },
    { id: 'MSP-0037', memberId: 'MEM-0037', type: 'daily', status: 'active', ...eliWindow, paymentId: 'PAY-0080' },
    { id: 'MSP-0031', memberId: 'MEM-0031', type: 'monthly', status: 'active', ...julesWindow, paymentId: 'PAY-0079' },
  ];

  const payments: Payment[] = [
    { id: 'PAY-0081', paymentRef: 'PAY-0081', memberId: 'MEM-0042', membershipType: 'monthly', method: 'gcash', status: 'verified', amountMinor: 150000, currency: 'PHP', proofUrl: null, createdAt: `${today}T08:42:00+08:00`, verifiedAt: `${today}T09:02:00+08:00`, verifiedBy: 'USR-OWNER' },
    { id: 'PAY-0080', paymentRef: 'PAY-0080', memberId: 'MEM-0037', membershipType: 'daily', method: 'maya', status: 'pending', amountMinor: 18000, currency: 'PHP', proofUrl: null, createdAt: `${today}T08:16:00+08:00`, verifiedAt: null, verifiedBy: null },
    { id: 'PAY-0079', paymentRef: 'PAY-0079', memberId: 'MEM-0031', membershipType: 'monthly', method: 'bank', status: 'pending', amountMinor: 150000, currency: 'PHP', proofUrl: null, createdAt: `${addDays(today, -1)}T08:00:00+08:00`, verifiedAt: null, verifiedBy: null },
    { id: 'PAY-0078', paymentRef: 'PAY-0078', memberId: 'MEM-0014', membershipType: 'monthly', method: 'cash', status: 'pending', amountMinor: 150000, currency: 'PHP', proofUrl: null, createdAt: `${addDays(today, -3)}T08:00:00+08:00`, verifiedAt: null, verifiedBy: null },
  ];

  const checkIns: CheckIn[] = [
    { id: 'CHK-0042', memberId: 'MEM-0042', source: 'qr', membershipType: 'monthly', at: `${today}T09:02:00+08:00` },
    { id: 'CHK-0037', memberId: 'MEM-0037', source: 'qr', membershipType: 'daily', at: `${today}T08:40:00+08:00` },
    { id: 'CHK-0014', memberId: 'MEM-0014', source: 'staff', membershipType: 'monthly', at: `${today}T08:15:00+08:00` },
  ];

  const staff: StaffUser[] = [
    { id: 'USR-OWNER', name: 'Alex Villanueva', email: 'owner@plyobox.ph', role: 'owner', accountStatus: 'active' },
    { id: 'USR-ADMIN', name: 'Jamie Flores', email: 'admin@plyobox.ph', role: 'admin', accountStatus: 'active' },
    { id: 'USR-STAFF', name: 'Rico Santos', email: 'staff@plyobox.ph', role: 'staff', accountStatus: 'active' },
  ];

  const trainers: TrainerProfile[] = [
    { id: 'TRN-001', name: 'Kai Mendoza', specialty: 'Strength', yearsExperience: 5, bio: 'Strength and conditioning coach.', tags: ['Strength'], rating: 4.9, status: 'published', profile: 100, services: [{ id: 'SVC-001', name: 'Strength Session', durationMinutes: 60, priceMinor: 80000 }] },
    { id: 'TRN-002', name: 'Lia Ramos', specialty: 'Speed', yearsExperience: 4, bio: 'Sprint and agility coach.', tags: ['Speed'], rating: 4.8, status: 'published', profile: 100, services: [{ id: 'SVC-002', name: 'Agility Session', durationMinutes: 60, priceMinor: 75000 }] },
    { id: 'TRN-003', name: 'Noah Bautista', specialty: 'Rehab', yearsExperience: 6, bio: 'Movement and recovery coach.', tags: ['Rehab'], rating: 4.7, status: 'suspended', profile: 90, services: [{ id: 'SVC-003', name: 'Mobility Session', durationMinutes: 45, priceMinor: 70000 }] },
    { id: 'TRN-004', name: 'Bea Cruz', specialty: 'Power', yearsExperience: 3, bio: 'Power and plyometric coach.', tags: ['Power'], rating: 4.8, status: 'draft', profile: 75, services: [{ id: 'SVC-004', name: 'Power Session', durationMinutes: 60, priceMinor: 85000 }] },
  ];

  const bookings: Booking[] = [
    { id: 'BKG-001', trainerId: 'TRN-001', serviceId: 'SVC-001', memberId: 'MEM-0042', startsAt: `${today}T10:00:00+08:00`, status: 'pending', note: 'Strength focus' },
    { id: 'BKG-002', trainerId: 'TRN-002', serviceId: 'SVC-002', memberId: 'MEM-0037', startsAt: `${today}T14:00:00+08:00`, status: 'confirmed', note: '' },
    { id: 'BKG-003', trainerId: 'TRN-003', serviceId: 'SVC-003', memberId: 'MEM-0022', startsAt: `${addDays(today, -1)}T15:00:00+08:00`, status: 'completed', note: '' },
    { id: 'BKG-004', trainerId: 'TRN-004', serviceId: 'SVC-004', memberId: 'MEM-0014', startsAt: `${addDays(today, 1)}T16:00:00+08:00`, status: 'declined', note: 'Schedule conflict' },
    { id: 'BKG-005', trainerId: 'TRN-001', serviceId: 'SVC-001', memberId: 'MEM-0031', startsAt: `${addDays(today, -2)}T11:00:00+08:00`, status: 'cancelled', note: '' },
  ];

  const inquiries: Inquiry[] = [
    { id: 'INQ-001', topic: 'membership', name: 'Lena Cruz', email: 'lena@example.com', phone: null, message: 'How do I renew my monthly membership?', status: 'new', createdAt: `${today}T08:20:00+08:00` },
    { id: 'INQ-002', topic: 'trainer', name: 'Ramon Uy', email: 'ramon@example.com', phone: '09170000002', message: 'I want to apply as a trainer.', status: 'replied', createdAt: `${addDays(today, -1)}T10:00:00+08:00` },
  ];

  const audit: AuditEntry[] = [
    { id: 'AUD-001', actorId: 'USR-OWNER', action: 'Payment verified', detail: 'PAY-0081 for Mara Santos', createdAt: `${today}T09:02:00+08:00` },
    { id: 'AUD-002', actorId: 'USR-STAFF', action: 'Manual check-in', detail: 'PLY-0014 Toni Garcia', createdAt: `${today}T08:15:00+08:00` },
  ];

  return { members, memberships, payments, checkIns, staff, trainers, bookings, inquiries, audit };
}
