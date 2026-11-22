import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, ListRow, Page, Panel, SectionTitle } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { openFeature } from '@/lib/navigation';

export default function MoreScreen() {
  return (
    <Page
      title="More"
      subtitle="Your account, training tools and community."
      rightAction={<Badge tone="neutral">Mika · Member</Badge>}>
      <View style={styles.menu}>
        <ListRow
          icon="bell"
          title="Notifications"
          detail="Payments, bookings and membership updates"
          trailing={<Badge tone="lime">3 NEW</Badge>}
          onPress={() => openFeature('notifications')}
        />
        <ListRow
          icon="attendance"
          title="Attendance"
          detail="Your gym visits"
          onPress={() => openFeature('attendance')}
        />
        <ListRow
          icon="receipt"
          title="Payments & receipts"
          detail="Payment status and receipts"
          onPress={() => openFeature('payments')}
        />
        <ListRow
          icon="dumbbell"
          title="Workouts & progress"
          detail="Plans, training logs and personal progress"
          onPress={() => openFeature('workouts')}
        />
      </View>

      <View style={styles.section}>
        <SectionTitle title="Account" />
        <ListRow
          icon="person"
          title="Profile & settings"
          detail="Personal details, emergency contact and privacy"
          onPress={() => openFeature('profile')}
        />
        <ListRow
          icon="settings"
          title="Settings & privacy"
          onPress={() => openFeature('settings')}
        />
        <ListRow
          icon="share"
          title="Community"
          detail="Referrals and fitness challenges"
          onPress={() => openFeature('community')}
        />
      </View>

      <Panel style={styles.trainerPanel}>
        <View style={styles.trainerPanelCopy}>
          <Text style={styles.trainerPanelTitle}>Trainer account?</Text>
          <Text style={styles.trainerPanelDetail}>
            Switch to trainer tools to manage services, availability and bookings.
          </Text>
        </View>
        <Button
          label="Switch to trainer mode"
          onPress={() => openFeature('trainer-dashboard')}
          variant="outline"
        />
      </Panel>

      <Button label="Log out" onPress={() => router.replace('/')} variant="quiet" />
    </Page>
  );
}

const styles = StyleSheet.create({
  menu: {
    gap: 7,
  },
  section: {
    gap: 8,
  },
  trainerPanel: {
    gap: 14,
    padding: 15,
    backgroundColor: colors.surface,
  },
  trainerPanelCopy: {
    gap: 5,
  },
  trainerPanelTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  trainerPanelDetail: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 16,
  },
});
