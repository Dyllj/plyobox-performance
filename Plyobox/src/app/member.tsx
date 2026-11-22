import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Badge, Button, IconButton, Page, Panel, ProgressBar, SectionTitle } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { openFeature } from '@/lib/navigation';

export default function MemberHomeScreen() {
  return (
    <Page
      header={
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Hi, Mika</Text>
            <Text style={styles.welcome}>Ready for your next training session?</Text>
          </View>
          <View style={styles.topActions}>
            <Badge tone="neutral">PREVIEW</Badge>
            <IconButton
              icon="bell"
              label="Open notifications"
              badge="3"
              onPress={() => openFeature('notifications')}
            />
          </View>
        </View>
      }>
      <View style={styles.membershipCard}>
        <View style={styles.membershipTop}>
          <View>
            <Text style={styles.membershipEyebrow}>MONTHLY MEMBERSHIP</Text>
            <Text style={styles.membershipStatus}>Active</Text>
          </View>
          <View style={styles.daysRing}>
            <Text style={styles.daysCount}>18</Text>
            <Text style={styles.daysUnit}>DAYS</Text>
          </View>
        </View>
        <Text style={styles.expires}>Expires 12 Dec · 18 days left</Text>
        <View style={styles.memberIdRow}>
          <Text style={styles.memberIdLabel}>MEMBER ID</Text>
          <Text style={styles.memberId}>PLY-0001</Text>
        </View>
        <View style={styles.actionRow}>
          <Button
            label="Scan in"
            icon="qr"
            onPress={() => router.replace('/member/scan')}
          />
          <Button label="Renew" variant="outline" onPress={() => router.push('/member/pass')} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="Next session" />
        <Panel style={styles.sessionCard}>
          <View style={styles.sessionLeft}>
            <View style={styles.sessionIcon}>
              <AppIcon name="dumbbell" color={colors.accent} size={19} />
            </View>
            <View style={styles.sessionCopy}>
              <Text style={styles.sessionName}>1-on-1 Strength</Text>
              <Text style={styles.sessionCoach}>Sample trainer · Sat · 9:00 AM</Text>
            </View>
          </View>
          <Badge tone="success">CONFIRMED</Badge>
        </Panel>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => openFeature('attendance')}
        style={({ pressed }) => [styles.goalCard, pressed && styles.pressed]}>
        <View style={styles.goalHeader}>
          <View style={styles.goalTitleGroup}>
            <AppIcon name="chart" color={colors.accent} size={18} />
            <Text style={styles.goalTitle}>Monthly goal</Text>
          </View>
          <Text style={styles.goalCount}>8 of 12 visits</Text>
        </View>
        <ProgressBar value={8} max={12} />
        <Text style={styles.goalFootnote}>Make time for movement this week.</Text>
      </Pressable>

      <View style={styles.quickLinks}>
        <SectionTitle title="Keep moving" />
        <View style={styles.quickGrid}>
          <QuickLink
            icon="dumbbell"
            label="Workouts"
            onPress={() => openFeature('workouts')}
          />
          <QuickLink
            icon="person"
            label="Trainers"
            onPress={() => router.push('/member/trainers')}
          />
          <QuickLink
            icon="receipt"
            label="Payments"
            onPress={() => openFeature('payments')}
          />
        </View>
      </View>
    </Page>
  );
}

function QuickLink({
  icon,
  label,
  onPress,
}: {
  icon: 'dumbbell' | 'person' | 'receipt';
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.quickLink, pressed && styles.pressed]}>
      <AppIcon name={icon} color={colors.accent} size={19} />
      <Text style={styles.quickLinkLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topBar: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  greeting: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '800',
  },
  welcome: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 11,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  membershipCard: {
    padding: 18,
    borderRadius: 19,
    backgroundColor: colors.accent,
  },
  membershipTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  membershipEyebrow: {
    color: '#47521E',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.9,
  },
  membershipStatus: {
    marginTop: 4,
    color: colors.accentInk,
    fontSize: 23,
    fontWeight: '900',
  },
  daysRing: {
    width: 61,
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.accentInk,
    borderRadius: 99,
  },
  daysCount: {
    color: colors.accentInk,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 19,
  },
  daysUnit: {
    marginTop: 1,
    color: '#47521E',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  expires: {
    marginTop: 7,
    color: '#404A1D',
    fontSize: 10,
    fontWeight: '700',
  },
  memberIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgba(16, 17, 11, 0.2)',
  },
  memberIdLabel: {
    color: '#47521E',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  memberId: {
    color: colors.accentInk,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 14,
  },
  section: {
    gap: 9,
  },
  sessionCard: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 12,
  },
  sessionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sessionIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#292D1D',
  },
  sessionCopy: {
    flex: 1,
    gap: 3,
  },
  sessionName: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  sessionCoach: {
    color: colors.muted,
    fontSize: 9,
  },
  goalCard: {
    gap: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  goalTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalTitle: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  goalCount: {
    color: colors.muted,
    fontSize: 9,
  },
  goalFootnote: {
    color: colors.subtle,
    fontSize: 9,
  },
  quickLinks: {
    gap: 9,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  quickLink: {
    flex: 1,
    minHeight: 67,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  quickLinkLabel: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
});
