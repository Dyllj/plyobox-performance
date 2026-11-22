import { router, useLocalSearchParams } from 'expo-router';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import {
  BackButton,
  Badge,
  Button,
  Field,
  ListRow,
  Page,
  Panel,
  ProgressBar,
  SectionTitle,
} from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { MEMBER_HOME_ROUTE, openFeature, type FeatureScreen } from '@/lib/navigation';

const screens: FeatureScreen[] = [
  'membership',
  'checkout',
  'payments',
  'receipt',
  'payment-pending',
  'payment-rejected',
  'payment-approved',
  'check-in-result',
  'attendance',
  'trainer-profile',
  'booking',
  'bookings',
  'workouts',
  'workout-detail',
  'progress',
  'notifications',
  'profile',
  'settings',
  'community',
  'trainer-dashboard',
  'trainer-requests',
  'trainer-edit',
  'trainer-services',
  'trainer-availability',
  'clients',
];
const screenSet = new Set<string>(screens);

const titles: Record<FeatureScreen, string> = {
  membership: 'Membership',
  checkout: 'Checkout',
  payments: 'Payments',
  receipt: 'Receipt',
  'payment-pending': 'Payment pending',
  'payment-rejected': 'Payment needs attention',
  'payment-approved': 'Payment approved',
  'check-in-result': 'Check-in complete',
  attendance: 'Attendance',
  'trainer-profile': 'Trainer profile',
  booking: 'Request a session',
  bookings: 'My bookings',
  workouts: 'Workout plans',
  'workout-detail': 'Workout detail',
  progress: 'Your progress',
  notifications: 'Notifications',
  profile: 'Your profile',
  settings: 'Settings & privacy',
  community: 'Community',
  'trainer-dashboard': 'Trainer dashboard',
  'trainer-requests': 'Booking requests',
  'trainer-edit': 'Edit trainer profile',
  'trainer-services': 'Services & rates',
  'trainer-availability': 'Availability',
  clients: 'Clients',
};

function isFeatureScreen(screen: string | undefined): screen is FeatureScreen {
  return screenSet.has(screen ?? '');
}

export default function FeatureRoute() {
  const { screen: screenParam } = useLocalSearchParams<{ screen?: string }>();
  const screen = isFeatureScreen(screenParam) ? screenParam : null;

  if (!screen) {
    return (
      <FeaturePage title="Screen unavailable">
        <Text style={styles.muted}>This preview screen could not be found.</Text>
        <Button label="Go to home" onPress={() => router.replace(MEMBER_HOME_ROUTE)} />
      </FeaturePage>
    );
  }

  return (
    <FeaturePage title={titles[screen]} key={screen}>
      <ScreenContent screen={screen} />
    </FeaturePage>
  );
}

function FeaturePage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Page
      header={
        <View style={styles.featureHeader}>
          <BackButton />
          <View style={styles.headerCopy}>
            <Text accessibilityRole="header" style={styles.headerTitle}>
              {title}
            </Text>
          </View>
          <Badge tone="neutral">PREVIEW</Badge>
        </View>
      }>
      {children}
    </Page>
  );
}

function ScreenContent({ screen }: { screen: FeatureScreen }) {
  switch (screen) {
    case 'membership':
      return <MembershipContent />;
    case 'checkout':
      return <CheckoutContent />;
    case 'payments':
      return <PaymentsContent />;
    case 'receipt':
      return <ReceiptContent />;
    case 'payment-pending':
    case 'payment-rejected':
    case 'payment-approved':
      return <PaymentStateContent state={screen} />;
    case 'check-in-result':
      return <CheckInResultContent />;
    case 'attendance':
      return <AttendanceContent />;
    case 'trainer-profile':
      return <TrainerProfileContent />;
    case 'booking':
      return <BookingContent />;
    case 'bookings':
      return <BookingsContent />;
    case 'workouts':
      return <WorkoutsContent />;
    case 'workout-detail':
      return <WorkoutDetailContent />;
    case 'progress':
      return <ProgressContent />;
    case 'notifications':
      return <NotificationsContent />;
    case 'profile':
      return <ProfileContent />;
    case 'settings':
      return <SettingsContent />;
    case 'community':
      return <CommunityContent />;
    case 'trainer-dashboard':
      return <TrainerDashboardContent />;
    case 'trainer-requests':
      return <TrainerRequestsContent />;
    case 'trainer-edit':
      return <TrainerEditContent />;
    case 'trainer-services':
      return <TrainerServicesContent />;
    case 'trainer-availability':
      return <TrainerAvailabilityContent />;
    case 'clients':
      return <ClientsContent />;
  }
}

function MembershipContent() {
  return (
    <>
      <Panel style={styles.highlightPanel}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.eyebrow}>MONTHLY MEMBERSHIP</Text>
            <Text style={styles.largeValue}>Active</Text>
          </View>
          <Badge tone="success">18 DAYS LEFT</Badge>
        </View>
        <Text style={styles.muted}>30 days from activation · Expires 12 Dec</Text>
        <ProgressBar value={12} max={30} />
        <Button label="Renew monthly" onPress={() => openFeature('checkout')} />
      </Panel>
      <SectionTitle title="Choose access" />
      <ChoiceCard
        icon="calendar"
        title="Daily Session"
        detail="One entry. Expires at midnight."
        action="Choose daily pass"
        plan="Daily Session"
      />
      <ChoiceCard
        icon="wallet"
        title="Monthly Membership"
        detail="Valid for 30 days after verified activation."
        action="Choose monthly"
        plan="Monthly Membership"
      />
      <PreviewNote>
        Prices are set by the gym. Payment proof does not activate access until authorized
        verification.
      </PreviewNote>
    </>
  );
}

function CheckoutContent() {
  const { plan: planParam } = useLocalSearchParams<{ plan?: string }>();
  const [method, setMethod] = useState<'cash' | 'transfer'>('transfer');
  const [proofAdded, setProofAdded] = useState(false);
  const plan = planParam === 'Daily Session' ? 'Daily Session' : 'Monthly Membership';

  return (
    <>
      <Panel style={styles.panelStack}>
        <Text style={styles.eyebrow}>YOUR SELECTION</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>{plan}</Text>
          <Text style={styles.accentText}>Price set by gym</Text>
        </View>
        <Text style={styles.muted}>
          {plan === 'Daily Session'
            ? 'One entry · Expires at midnight'
            : '30 days from approved payment verification'}
        </Text>
      </Panel>
      <SectionTitle title="Payment method" />
      <SelectRow
        title="Bank / e-wallet transfer"
        detail="Follow the gym’s posted payment instructions."
        selected={method === 'transfer'}
        onPress={() => setMethod('transfer')}
      />
      <SelectRow
        title="Pay at the gym"
        detail="Pay staff in person and request a receipt."
        selected={method === 'cash'}
        onPress={() => setMethod('cash')}
      />
      {method === 'transfer' ? (
        <Panel style={styles.panelStack}>
          <Text style={styles.rowTitle}>Payment proof</Text>
          <Text style={styles.muted}>
            Upload a clear image or receipt reference. The transfer must still be verified by staff.
          </Text>
          <Button
            label={proofAdded ? 'Demo proof attached' : 'Attach payment proof'}
            icon={proofAdded ? 'check' : 'upload'}
            onPress={() => setProofAdded(true)}
            variant="outline"
          />
        </Panel>
      ) : null}
      <PreviewNote>
        This is a UI-only checkout. No payment is collected and no membership is activated.
      </PreviewNote>
      <Button
        label={method === 'transfer' ? 'Submit for verification' : 'Continue'}
        onPress={() => openFeature('payment-pending')}
        disabled={method === 'transfer' && !proofAdded}
      />
    </>
  );
}

function PaymentsContent() {
  return (
    <>
      <SectionTitle title="Recent payments" />
      <PaymentRow title="Monthly Membership" date="04 Nov · Reference shown in demo" state="Pending" />
      <PaymentRow title="Daily Session" date="22 Oct · Example entry" state="Verified" />
      <Button label="View sample receipt" onPress={() => openFeature('receipt')} variant="outline" />
      <PreviewNote>Payment records shown here are sample UI content only.</PreviewNote>
    </>
  );
}

function PaymentRow({ title, date, state }: { title: string; date: string; state: string }) {
  return (
    <Panel style={styles.paymentRow}>
      <View style={styles.rowBetween}>
        <View style={styles.flex}>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.tinyMuted}>{date}</Text>
        </View>
        <Badge tone={state === 'Verified' ? 'success' : 'warning'}>{state}</Badge>
      </View>
    </Panel>
  );
}

function ReceiptContent() {
  return (
    <Panel style={styles.receipt}>
      <View style={styles.receiptBrand}>
        <View style={styles.receiptMark}><Text style={styles.receiptMarkText}>P</Text></View>
        <Text style={styles.receiptBrandName}>PLYObox</Text>
      </View>
      <Text style={styles.eyebrow}>PAYMENT RECEIPT · SAMPLE</Text>
      <Text style={styles.receiptTitle}>Monthly Membership</Text>
      <View style={styles.divider} />
      <Fact label="Member" value="Mika · Demo member" />
      <Fact label="Reference" value="PLY-DEMO-0001" />
      <Fact label="Status" value="Awaiting verification" />
      <Fact label="Access" value="Not activated" />
      <PreviewNote>Sample receipt preview. Not a proof of payment.</PreviewNote>
      <Button label="Done" onPress={() => router.replace('/member/pass')} />
    </Panel>
  );
}

function PaymentStateContent({ state }: { state: 'payment-pending' | 'payment-rejected' | 'payment-approved' }) {
  const config = {
    'payment-pending': {
      icon: 'clock' as const,
      title: 'Under review',
      detail: 'Your payment step was submitted in this preview. Staff verification is still required.',
      tone: 'warning' as const,
    },
    'payment-rejected': {
      icon: 'close' as const,
      title: 'Payment needs attention',
      detail: 'The submitted proof could not be verified. Review the instructions or ask staff for help.',
      tone: 'danger' as const,
    },
    'payment-approved': {
      icon: 'check-circle' as const,
      title: 'Payment verified',
      detail: 'In the live app, access dates begin after verification is recorded by authorized staff.',
      tone: 'success' as const,
    },
  }[state];

  return (
    <View style={styles.stateWrap}>
      <View style={styles.stateIcon}>
        <AppIcon name={config.icon} color={colors.accent} size={27} />
      </View>
      <Badge tone={config.tone}>{state.replace('payment-', '').toUpperCase()}</Badge>
      <Text style={styles.stateTitle}>{config.title}</Text>
      <Text style={styles.stateDetail}>{config.detail}</Text>
      <PreviewNote>No real payment is processed in this prototype.</PreviewNote>
      {state === 'payment-pending' ? (
        <View style={styles.previewActionGroup}>
          <Button
            label="Preview staff approval"
            onPress={() => openFeature('payment-approved')}
            variant="outline"
          />
          <Button
            label="Preview declined proof"
            onPress={() => openFeature('payment-rejected')}
            variant="quiet"
          />
        </View>
      ) : null}
      <Button label="View payments" onPress={() => openFeature('payments')} />
    </View>
  );
}

function CheckInResultContent() {
  return (
    <View style={styles.stateWrap}>
      <View style={styles.stateIcon}>
        <AppIcon name="check-circle" color={colors.accent} size={28} />
      </View>
      <Badge tone="success">DEMO RESULT</Badge>
      <Text style={styles.stateTitle}>You’re checked in</Text>
      <Text style={styles.stateDetail}>
        Preview check-in · Today at 9:14 AM. The production flow will validate a current gym QR code
        and membership before recording a visit.
      </Text>
      <Panel style={styles.checkinDetails}>
        <Fact label="Member" value="PLY-0001" />
        <Fact label="Check-in" value="Today · 9:14 AM" />
        <Fact label="Membership" value="Monthly · Active" />
      </Panel>
      <Button label="View attendance" onPress={() => openFeature('attendance')} />
      <Button label="Back to home" onPress={() => router.replace(MEMBER_HOME_ROUTE)} variant="outline" />
    </View>
  );
}

function AttendanceContent() {
  return (
    <>
      <Panel style={styles.highlightPanel}>
        <Text style={styles.eyebrow}>THIS MONTH</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.largeValue}>8 visits</Text>
          <Badge tone="lime">GOAL · 12</Badge>
        </View>
        <ProgressBar value={8} max={12} />
        <Text style={styles.muted}>Keep your momentum going.</Text>
      </Panel>
      <SectionTitle title="Recent visits" />
      <VisitRow day="Today" time="9:14 AM" />
      <VisitRow day="Tuesday, 12 Nov" time="6:32 PM" />
      <VisitRow day="Saturday, 09 Nov" time="8:58 AM" />
      <PreviewNote>Attendance rows are demo data. Only a successful QR check-in is recorded.</PreviewNote>
    </>
  );
}

function VisitRow({ day, time }: { day: string; time: string }) {
  return (
    <ListRow
      icon="attendance"
      title={day}
      detail={`Plyobox Performance Gym · ${time}`}
      trailing={<Badge tone="success">CHECKED IN</Badge>}
    />
  );
}

function TrainerProfileContent() {
  return (
    <>
      <Panel style={styles.trainerProfile}>
        <View style={styles.trainerPlaceholder}>
          <AppIcon name="person" color={colors.accent} size={33} />
          <Text style={styles.placeholderCaption}>PHOTO PLACEHOLDER</Text>
        </View>
        <Badge tone="neutral">SAMPLE TRAINER</Badge>
        <Text style={styles.stateTitle}>Alex Rivera</Text>
        <Text style={styles.muted}>Strength & conditioning · 5 years experience</Text>
        <View style={styles.trainerStats}>
          <Stat value="4.9" label="Rating" />
          <Stat value="1-on-1" label="Service" />
          <Stat value="Gym" label="Location" />
        </View>
        <Text style={styles.bodyText}>
          Coaching focused on strength, movement quality and consistent progress.
        </Text>
      </Panel>
      <SectionTitle title="Services" />
      <ChoiceCard icon="dumbbell" title="1-on-1 Strength" detail="Session length and rate set by trainer" action="Request session" />
      <Button label="Request a session" onPress={() => openFeature('booking')} />
      <PreviewNote>Trainer details are sample UI content, not published profiles.</PreviewNote>
    </>
  );
}

function BookingContent() {
  const [slot, setSlot] = useState('Saturday · 9:00 AM');
  const slots = ['Saturday · 9:00 AM', 'Saturday · 11:00 AM', 'Monday · 6:00 PM'];

  return (
    <>
      <Panel style={styles.panelStack}>
        <Text style={styles.eyebrow}>SESSION REQUEST</Text>
        <Text style={styles.rowTitle}>Alex Rivera · 1-on-1 Strength</Text>
        <Text style={styles.muted}>The trainer confirms the request before it becomes a booking.</Text>
      </Panel>
      <SectionTitle title="Choose a time" />
      {slots.map((item) => (
        <SelectRow key={item} title={item} selected={slot === item} onPress={() => setSlot(item)} />
      ))}
      <Field label="Notes for trainer · Optional" placeholder="Tell the trainer what you’re working on" multiline />
      <PreviewNote>Submitting sends a request only. No session is confirmed or charged here.</PreviewNote>
      <Button label="Send booking request" onPress={() => openFeature('bookings')} />
    </>
  );
}

function BookingsContent() {
  return (
    <>
      <SectionTitle title="Upcoming" />
      <Panel style={styles.bookingCard}>
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>1-on-1 Strength</Text>
          <Badge tone="warning">PENDING</Badge>
        </View>
        <Text style={styles.muted}>Alex Rivera · Saturday · 9:00 AM</Text>
        <Text style={styles.tinyMuted}>Sample request · Waiting for trainer response</Text>
      </Panel>
      <Button label="Find a trainer" onPress={() => router.replace('/member/trainers')} variant="outline" />
      <PreviewNote>Requests become confirmed only after the trainer accepts.</PreviewNote>
    </>
  );
}

function WorkoutsContent() {
  return (
    <>
      <Panel style={styles.highlightPanel}>
        <Text style={styles.eyebrow}>YOUR TRAINING</Text>
        <Text style={styles.largeValue}>Build power</Text>
        <Text style={styles.muted}>A sample plan curated for Plyobox members.</Text>
      </Panel>
      <SectionTitle title="Plans" />
      <ChoiceCard icon="dumbbell" title="Lower body strength" detail="3 days · 6 exercises · Beginner" action="View plan" feature="workout-detail" />
      <ChoiceCard icon="sparkle" title="Speed & agility" detail="2 days · 5 exercises · Intermediate" action="View plan" feature="workout-detail" />
      <Button label="Track my progress" onPress={() => openFeature('progress')} variant="outline" />
      <PreviewNote>Sample workout plans. Follow your trainer’s guidance for exercise selection.</PreviewNote>
    </>
  );
}

function WorkoutDetailContent() {
  return (
    <>
      <Panel style={styles.highlightPanel}>
        <Text style={styles.eyebrow}>SAMPLE PLAN · 3 DAYS / WEEK</Text>
        <Text style={styles.largeValue}>Lower body strength</Text>
        <Text style={styles.muted}>Build foundational strength and control.</Text>
      </Panel>
      <SectionTitle title="Day 1 · Strength" />
      <ExerciseRow name="Goblet squat" detail="3 sets · 8 reps" />
      <ExerciseRow name="Romanian deadlift" detail="3 sets · 8 reps" />
      <ExerciseRow name="Reverse lunge" detail="3 sets · 10 reps / side" />
      <ExerciseRow name="Calf raise" detail="2 sets · 12 reps" />
      <Button label="Log this workout" onPress={() => openFeature('progress')} />
    </>
  );
}

function ExerciseRow({ name, detail }: { name: string; detail: string }) {
  return (
    <ListRow
      icon="dumbbell"
      title={name}
      detail={detail}
      trailing={<AppIcon name="chevron-right" color={colors.subtle} size={17} />}
    />
  );
}

function ProgressContent() {
  const bars = [40, 55, 44, 75, 58, 88, 66];
  return (
    <>
      <Panel style={styles.panelStack}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.eyebrow}>THIS MONTH</Text>
            <Text style={styles.largeValue}>8 sessions</Text>
          </View>
          <Badge tone="success">+2 THIS MONTH</Badge>
        </View>
        <Text style={styles.muted}>Training consistency</Text>
        <View style={styles.chart} accessibilityLabel="Sample weekly workout activity chart">
          {bars.map((height, index) => (
            <View key={index} style={styles.barColumn}>
              <View style={[styles.chartBar, { height }]} />
              <Text style={styles.chartLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</Text>
            </View>
          ))}
        </View>
      </Panel>
      <SectionTitle title="Recent personal bests" />
      <ProgressRow title="Goblet squat" value="24 kg" date="Nov 14" />
      <ProgressRow title="Standing broad jump" value="1.8 m" date="Nov 10" />
      <Button label="Browse workout plans" onPress={() => openFeature('workouts')} variant="outline" />
      <PreviewNote>Progress metrics above are sample data and not health advice.</PreviewNote>
    </>
  );
}

function ProgressRow({ title, value, date }: { title: string; value: string; date: string }) {
  return (
    <Panel style={styles.progressRow}>
      <View>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.tinyMuted}>{date} · Sample record</Text>
      </View>
      <Text style={styles.accentText}>{value}</Text>
    </Panel>
  );
}

function NotificationsContent() {
  return (
    <>
      <SectionTitle title="Recent updates" />
      <NotificationRow icon="calendar" title="Session request sent" detail="Your request is waiting for trainer confirmation." time="Today · 9:20 AM" />
      <NotificationRow icon="wallet" title="Payment is under review" detail="Staff will update your payment status after verification." time="Yesterday · 4:05 PM" />
      <NotificationRow icon="dumbbell" title="New workout plan" detail="A sample plan is ready to preview." time="Nov 14" />
      <PreviewNote>Notifications are represented as previews and are not sent by a backend.</PreviewNote>
    </>
  );
}

function NotificationRow({ icon, title, detail, time }: { icon: 'calendar' | 'wallet' | 'dumbbell'; title: string; detail: string; time: string }) {
  return (
    <ListRow icon={icon} title={title} detail={`${detail} · ${time}`} trailing={<View style={styles.unreadDot} />} />
  );
}

function ProfileContent() {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <Panel style={styles.profilePanel}>
        <View style={styles.profileAvatar}><AppIcon name="person" color={colors.accent} size={25} /></View>
        <View style={styles.flex}>
          <Text style={styles.rowTitle}>Mika · Demo member</Text>
          <Text style={styles.tinyMuted}>PLY-0001 · Sample account</Text>
        </View>
        <Badge tone="neutral">MEMBER</Badge>
      </Panel>
      <SectionTitle title="Personal information" />
      <Field label="Full name" placeholder="Mika · Demo member" />
      <Field label="Email" placeholder="member@example.com" />
      <Field label="Phone" placeholder="+63 9XX XXX XXXX" keyboardType="phone-pad" />
      <Field label="Emergency contact" placeholder="Not provided" />
      <Button
        label={saved ? 'Changes saved · preview' : 'Save changes'}
        onPress={() => setSaved(true)}
      />
      <ListRow icon="settings" title="Settings & privacy" onPress={() => openFeature('settings')} />
    </>
  );
}

function SettingsContent() {
  const [emailOn, setEmailOn] = useState(true);
  const [pushOn, setPushOn] = useState(false);

  return (
    <>
      <SectionTitle title="Notifications" />
      <ToggleRow title="Email updates" detail="Membership and booking notices" value={emailOn} onPress={() => setEmailOn((value) => !value)} />
      <ToggleRow title="Push notifications" detail="Time-sensitive app updates" value={pushOn} onPress={() => setPushOn((value) => !value)} />
      <SectionTitle title="Privacy" />
      <ListRow icon="lock" title="Privacy notice" detail="How member information is used" onPress={() => openFeature('community')} />
      <ListRow icon="account" title="Data and account" detail="Manage profile and account access" onPress={() => openFeature('profile')} />
      <PreviewNote>Settings are local UI controls only. No notification preferences are saved.</PreviewNote>
    </>
  );
}

function ToggleRow({ title, detail, value, onPress }: { title: string; detail: string; value: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={onPress}
      style={styles.toggleRow}>
      <View style={styles.flex}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.tinyMuted}>{detail}</Text>
      </View>
      <View style={[styles.toggle, value && styles.toggleOn]}>
        <View style={[styles.toggleKnob, value && styles.toggleKnobOn]} />
      </View>
    </Pressable>
  );
}

function CommunityContent() {
  const [joined, setJoined] = useState(false);
  return (
    <>
      <Panel style={styles.communityHero}>
        <View style={styles.communityIcon}><AppIcon name="share" color={colors.accent} size={23} /></View>
        <Text style={styles.largeValue}>Train together</Text>
        <Text style={styles.muted}>
          Share the Plyobox community with a friend or take part in gym challenges.
        </Text>
      </Panel>
      <SectionTitle title="Invite a friend" />
      <Panel style={styles.panelStack}>
        <Text style={styles.rowTitle}>Bring your training partner</Text>
        <Text style={styles.muted}>Referral links will be available when accounts are connected.</Text>
        <Button label="Preview referral" onPress={() => setJoined(true)} variant="outline" />
        {joined ? <Badge tone="success">REFERRAL PREVIEW READY</Badge> : null}
      </Panel>
      <SectionTitle title="Gym challenge" />
      <Panel style={styles.panelStack}>
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>12-session month</Text>
          <Badge tone="lime">8 / 12</Badge>
        </View>
        <ProgressBar value={8} max={12} />
        <Text style={styles.muted}>Move consistently, one visit at a time.</Text>
      </Panel>
      <PreviewNote>No social feed or referral service is connected in this demo.</PreviewNote>
    </>
  );
}

function TrainerDashboardContent() {
  return (
    <>
      <Panel style={styles.highlightPanel}>
        <Text style={styles.eyebrow}>TRAINER MODE · PREVIEW</Text>
        <Text style={styles.largeValue}>Welcome, Coach</Text>
        <Text style={styles.muted}>Your coaching activity at a glance.</Text>
      </Panel>
      <View style={styles.statsGrid}>
        <Stat value="2" label="New requests" />
        <Stat value="6" label="Active clients" />
        <Stat value="4" label="Sessions this week" />
      </View>
      <SectionTitle title="Manage your studio" />
      <ListRow icon="calendar" title="Booking requests" detail="Review and respond to session requests" onPress={() => openFeature('trainer-requests')} />
      <ListRow icon="person" title="Clients & plans" detail="Client list and workout plans" onPress={() => openFeature('clients')} />
      <ListRow icon="edit" title="Trainer profile" onPress={() => openFeature('trainer-edit')} />
      <ListRow icon="cash" title="Services & rates" onPress={() => openFeature('trainer-services')} />
      <ListRow icon="clock" title="Availability" onPress={() => openFeature('trainer-availability')} />
    </>
  );
}

function TrainerRequestsContent() {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');
  return (
    <>
      <SectionTitle title="New requests" />
      <Panel style={styles.panelStack}>
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>Mika · Demo member</Text>
          <Badge
            tone={status === 'pending' ? 'warning' : status === 'accepted' ? 'success' : 'danger'}>
            {status.toUpperCase()}
          </Badge>
        </View>
        <Text style={styles.muted}>1-on-1 Strength · Saturday · 9:00 AM</Text>
        <Text style={styles.tinyMuted}>Sent today · 9:20 AM</Text>
        {status === 'pending' ? (
          <View style={styles.actionRow}>
            <Button label="Accept" onPress={() => setStatus('accepted')} />
            <Button label="Decline" onPress={() => setStatus('declined')} variant="outline" />
          </View>
        ) : (
          <Text style={styles.muted}>Preview response saved for this screen only.</Text>
        )}
      </Panel>
      <PreviewNote>Example request. Trainer actions are not sent to a member.</PreviewNote>
    </>
  );
}

function TrainerEditContent() {
  const [complete, setComplete] = useState(false);
  return (
    <>
      <Panel style={styles.trainerPhotoEdit}>
        <AppIcon name="camera" color={colors.muted} size={23} />
        <Text style={styles.tinyMuted}>PROFILE PHOTO · PLACEHOLDER</Text>
      </Panel>
      <Field label="Public name" placeholder="Your name" />
      <Field label="Specialty" placeholder="Strength & conditioning" />
      <Field label="About" placeholder="Share your coaching approach" multiline />
      <Field label="Experience" placeholder="Years coaching" keyboardType="number-pad" />
      <PreviewNote>Complete profiles can publish directly. No screening pipeline is shown here.</PreviewNote>
      <Button label={complete ? 'Profile complete · preview' : 'Save profile'} onPress={() => setComplete(true)} />
    </>
  );
}

function TrainerServicesContent() {
  const [added, setAdded] = useState(false);
  return (
    <>
      <SectionTitle title="Your services" />
      <Panel style={styles.panelStack}>
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>1-on-1 Strength</Text>
          <Badge tone="success">PUBLISHED</Badge>
        </View>
        <Text style={styles.muted}>60 minutes · Rate set by trainer</Text>
        <Button label="Edit service" onPress={() => setAdded((value) => !value)} variant="outline" />
      </Panel>
      {added ? (
        <Panel style={styles.panelStack}>
          <Text style={styles.rowTitle}>Service editor preview</Text>
          <Field label="Service name" placeholder="Strength & conditioning" />
          <Field label="Session duration" placeholder="60 minutes" />
          <Field label="Rate" placeholder="Set your rate" keyboardType="decimal-pad" />
        </Panel>
      ) : null}
      <Button label="Add service" icon="add" onPress={() => setAdded((value) => !value)} />
      <PreviewNote>Rates are entered by the trainer. No fixed pricing is assumed.</PreviewNote>
    </>
  );
}

function TrainerAvailabilityContent() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['Sat']);
  const [saved, setSaved] = useState(false);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <>
      <SectionTitle title="Available days" />
      <View style={styles.dayGrid}>
        {days.map((day) => {
          const selected = selectedDays.includes(day);
          return (
            <Pressable
              key={day}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              onPress={() =>
                setSelectedDays((current) =>
                  selected ? current.filter((value) => value !== day) : [...current, day],
                )
              }
              style={[styles.dayChip, selected && styles.dayChipSelected]}>
              <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{day}</Text>
            </Pressable>
          );
        })}
      </View>
      <SectionTitle title="Time windows" />
      <Panel style={styles.panelStack}>
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>Morning</Text>
          <Text style={styles.muted}>8:00 AM – 12:00 PM</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.rowBetween}>
          <Text style={styles.rowTitle}>Evening</Text>
          <Text style={styles.muted}>4:00 PM – 8:00 PM</Text>
        </View>
      </Panel>
      <Button
        label={saved ? 'Availability saved · preview' : 'Save availability'}
        onPress={() => setSaved(true)}
        variant="outline"
      />
      <PreviewNote>Availability selection is a local preview; booking slots are not synchronized.</PreviewNote>
    </>
  );
}

function ClientsContent() {
  return (
    <>
      <SectionTitle title="Active clients" />
      <ClientCard name="Mika · Demo member" detail="Strength plan · Last session Nov 14" />
      <ClientCard name="Taylor · Sample client" detail="Power & movement · Last session Nov 12" />
      <PreviewNote>Client list and workout assignments shown here are sample trainer data.</PreviewNote>
    </>
  );
}

function ClientCard({ name, detail }: { name: string; detail: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => openFeature('workout-detail')}
      style={styles.clientCard}>
      <View style={styles.profileAvatar}><AppIcon name="person" color={colors.accent} size={19} /></View>
      <View style={styles.flex}>
        <Text style={styles.rowTitle}>{name}</Text>
        <Text style={styles.tinyMuted}>{detail}</Text>
      </View>
      <AppIcon name="chevron-right" color={colors.subtle} size={16} />
    </Pressable>
  );
}

function SelectRow({
  title,
  detail,
  selected,
  onPress,
}: {
  title: string;
  detail?: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.selectRow, selected && styles.selectRowSelected]}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.radioDot} /> : null}
      </View>
      <View style={styles.flex}>
        <Text style={styles.rowTitle}>{title}</Text>
        {detail ? <Text style={styles.tinyMuted}>{detail}</Text> : null}
      </View>
    </Pressable>
  );
}

function ChoiceCard({
  icon,
  title,
  detail,
  action,
  feature = 'checkout',
  plan,
}: {
  icon: 'calendar' | 'wallet' | 'dumbbell' | 'sparkle';
  title: string;
  detail: string;
  action: string;
  feature?: FeatureScreen;
  plan?: string;
}) {
  return (
    <Panel style={styles.choiceCard}>
      <View style={styles.choiceIcon}><AppIcon name={icon} color={colors.accent} size={19} /></View>
      <View style={styles.flex}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.tinyMuted}>{detail}</Text>
      </View>
      <Button
        label={action}
        onPress={() => openFeature(feature, plan ? { plan } : undefined)}
        variant="outline"
      />
    </Panel>
  );
}

function PreviewNote({ children }: { children: ReactNode }) {
  return (
    <View style={styles.previewNote}>
      <AppIcon name="info" color={colors.accent} size={15} />
      <Text style={styles.previewText}>{children}</Text>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Panel style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.tinyMuted}>{label}</Text>
    </Panel>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.factRow}>
      <Text style={styles.tinyMuted}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  featureHeader: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerCopy: { flex: 1 },
  headerTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  rowTitle: { color: colors.text, fontSize: 12, fontWeight: '800' },
  muted: { color: colors.muted, fontSize: 10, lineHeight: 16 },
  tinyMuted: { color: colors.subtle, fontSize: 9, lineHeight: 14 },
  eyebrow: { color: colors.accent, fontSize: 8, fontWeight: '900', letterSpacing: 0.9 },
  largeValue: { color: colors.text, fontSize: 21, fontWeight: '800' },
  accentText: { color: colors.accent, fontSize: 10, fontWeight: '800' },
  flex: { flex: 1, gap: 3 },
  highlightPanel: { gap: 12, borderColor: '#566D25', backgroundColor: '#1C2114' },
  panelStack: { gap: 12 },
  paymentRow: { padding: 13 },
  receipt: { gap: 15, padding: 20, borderColor: '#515545' },
  receiptBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  receiptMark: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 9, backgroundColor: colors.accent },
  receiptMarkText: { color: colors.accentInk, fontSize: 18, fontWeight: '900' },
  receiptBrandName: { color: colors.text, fontSize: 14, fontWeight: '900' },
  receiptTitle: { color: colors.text, fontSize: 19, fontWeight: '800' },
  divider: { height: 1, backgroundColor: colors.border },
  factRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 9 },
  factValue: { color: colors.text, fontSize: 10, fontWeight: '700', textAlign: 'right' },
  stateWrap: { alignItems: 'center', gap: 13, paddingTop: 16 },
  stateIcon: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: '#29311C' },
  stateTitle: { color: colors.text, fontSize: 21, fontWeight: '800', textAlign: 'center' },
  stateDetail: { maxWidth: 400, color: colors.muted, fontSize: 11, lineHeight: 18, textAlign: 'center' },
  checkinDetails: { width: '100%', gap: 12 },
  previewNote: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 11, borderRadius: 12, backgroundColor: colors.card },
  previewActionGroup: { width: '100%', gap: 8 },
  previewText: { flex: 1, color: colors.muted, fontSize: 9, lineHeight: 15 },
  trainerProfile: { alignItems: 'center', gap: 12 },
  trainerPlaceholder: { width: 90, height: 90, alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: 25, backgroundColor: '#292D1D' },
  placeholderCaption: { color: colors.subtle, fontSize: 6, fontWeight: '800' },
  trainerStats: { width: '100%', flexDirection: 'row', gap: 7 },
  stat: { flex: 1, alignItems: 'center', gap: 4, padding: 10 },
  statValue: { color: colors.accent, fontSize: 15, fontWeight: '900' },
  bodyText: { color: colors.muted, fontSize: 10, lineHeight: 16, textAlign: 'center' },
  selectRow: { minHeight: 55, flexDirection: 'row', alignItems: 'center', gap: 11, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.card },
  selectRowSelected: { borderColor: colors.accent, backgroundColor: '#202417' },
  radio: { width: 18, height: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.subtle, borderRadius: 99 },
  radioSelected: { borderColor: colors.accent },
  radioDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: colors.accent },
  bookingCard: { gap: 10 },
  actionRow: { flexDirection: 'row', gap: 9 },
  chart: { height: 113, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingTop: 8 },
  barColumn: { height: '100%', alignItems: 'center', justifyContent: 'flex-end', gap: 6 },
  chartBar: { width: 16, maxHeight: 78, borderRadius: 5, backgroundColor: colors.accent },
  chartLabel: { color: colors.subtle, fontSize: 8 },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: 13 },
  unreadDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: colors.accent },
  profilePanel: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  profileAvatar: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#30371E' },
  toggleRow: { minHeight: 60, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, borderRadius: 13, backgroundColor: colors.card },
  toggle: { width: 39, height: 23, justifyContent: 'center', padding: 3, borderRadius: 99, backgroundColor: '#393B32' },
  toggleOn: { backgroundColor: '#506824' },
  toggleKnob: { width: 17, height: 17, borderRadius: 99, backgroundColor: colors.muted },
  toggleKnobOn: { alignSelf: 'flex-end', backgroundColor: colors.accent },
  communityHero: { gap: 11, padding: 18 },
  communityIcon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 14, backgroundColor: '#29311C' },
  statsGrid: { flexDirection: 'row', gap: 7 },
  trainerPhotoEdit: { minHeight: 104, alignItems: 'center', justifyContent: 'center', gap: 8, borderStyle: 'dashed' },
  dayGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  dayChip: { minWidth: 39, minHeight: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: colors.card },
  dayChipSelected: { backgroundColor: colors.accent },
  dayText: { color: colors.muted, fontSize: 10, fontWeight: '800' },
  dayTextSelected: { color: colors.accentInk },
  clientCard: { minHeight: 65, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 11, borderWidth: 1, borderColor: colors.border, borderRadius: 13, backgroundColor: colors.card },
  choiceCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12 },
  choiceIcon: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 11, backgroundColor: '#292D1D' },
});
