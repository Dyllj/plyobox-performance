import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Page, Panel, ProgressBar, SectionTitle } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { openFeature } from '@/lib/navigation';

export default function MembershipScreen() {
  return (
    <Page
      tabbed
      title="Membership"
      subtitle="Your gym access and payment history."
      rightAction={<Badge tone="neutral">PREVIEW</Badge>}>
      <Panel style={styles.currentPlan}>
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planType}>MONTHLY MEMBERSHIP</Text>
            <Text style={styles.planStatus}>Active</Text>
          </View>
          <Badge tone="success">18 DAYS LEFT</Badge>
        </View>
        <Text style={styles.planValidity}>30 days from activation</Text>
        <ProgressBar value={12} max={30} />
        <View style={styles.progressLabel}>
          <Text style={styles.meta}>12 days used</Text>
          <Text style={styles.meta}>Expires 12 Dec</Text>
        </View>
        <Button
          label="Renew membership"
          onPress={() => openFeature('checkout', { type: 'monthly' })}
        />
      </Panel>

      <View style={styles.section}>
        <SectionTitle title="Available access" />
        <Panel style={styles.optionCard}>
          <View style={styles.optionTop}>
            <View>
              <Text style={styles.optionTitle}>Daily Session</Text>
              <Text style={styles.optionDetail}>One gym entry · Expires at midnight</Text>
            </View>
            <Text style={styles.price}>Set by gym</Text>
          </View>
          <Button
            label="Buy day pass"
            onPress={() => openFeature('checkout', { type: 'daily' })}
            variant="outline"
          />
        </Panel>
        <Panel style={styles.optionCard}>
          <View style={styles.optionTop}>
            <View>
              <Text style={styles.optionTitle}>Monthly Membership</Text>
              <Text style={styles.optionDetail}>30 days from verified activation</Text>
            </View>
            <Text style={styles.price}>Set by gym</Text>
          </View>
          <Button
            label="Choose monthly"
            onPress={() => openFeature('checkout', { type: 'monthly' })}
            variant="quiet"
          />
        </Panel>
      </View>

      <View style={styles.section}>
        <SectionTitle title="History" />
        <HistoryRow name="Monthly membership" date="04 Nov" state="Expired" />
        <HistoryRow name="Daily session" date="22 Oct" state="Used" />
      </View>

      <Text style={styles.notice}>
        Access begins only after an authorized payment verification. Submitting proof alone does not
        activate a membership.
      </Text>

      <Button
        label="Payments & receipts"
        icon="arrow-right"
        onPress={() => openFeature('payments')}
        variant="outline"
      />
    </Page>
  );
}

function HistoryRow({ name, date, state }: { name: string; date: string; state: string }) {
  return (
    <View style={styles.historyRow}>
      <View>
        <Text style={styles.historyTitle}>{name}</Text>
        <Text style={styles.meta}>{date}</Text>
      </View>
      <Badge tone="neutral">{state}</Badge>
    </View>
  );
}

const styles = StyleSheet.create({
  currentPlan: {
    gap: 11,
    padding: 17,
    borderColor: '#61782A',
    backgroundColor: '#1D2116',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  planType: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  planStatus: {
    marginTop: 4,
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  planValidity: {
    color: colors.muted,
    fontSize: 10,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    color: colors.muted,
    fontSize: 9,
  },
  section: {
    gap: 8,
  },
  optionCard: {
    gap: 13,
    padding: 14,
  },
  optionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  optionDetail: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 9,
  },
  price: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '800',
  },
  historyRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  historyTitle: {
    marginBottom: 4,
    color: colors.text,
    fontSize: 10,
    fontWeight: '700',
  },
  notice: {
    color: colors.subtle,
    fontSize: 10,
    lineHeight: 16,
  },
});
