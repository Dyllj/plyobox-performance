import { StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Button, Page } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { openFeature } from '@/lib/navigation';

export default function ScanScreen() {
  return (
    <Page tabbed title="Check in" subtitle="Scan the current QR code at the gym entrance.">
      <View style={styles.scanFrame}>
        <View style={[styles.corner, styles.cornerTopLeft]} />
        <View style={[styles.corner, styles.cornerTopRight]} />
        <View style={[styles.corner, styles.cornerBottomLeft]} />
        <View style={[styles.corner, styles.cornerBottomRight]} />
        <View style={styles.scanContent}>
          <View style={styles.cameraIcon}>
            <AppIcon name="qr" color={colors.accent} size={34} />
          </View>
          <Text style={styles.cameraLabel}>CAMERA PREVIEW</Text>
          <Text style={styles.cameraHint}>Point your camera at the QR code by the gym entrance.</Text>
        </View>
        <View style={styles.scanLine} />
      </View>

      <View style={styles.scanInfo}>
        <AppIcon name="info" color={colors.accent} size={17} />
        <Text style={styles.scanInfoText}>
          A valid gym code and verified membership are required. You can check in once per local
          calendar day.
        </Text>
      </View>

      <View style={styles.cameraNotice}>
        <Text style={styles.cameraNoticeTitle}>Camera connection is not enabled yet</Text>
        <Text style={styles.cameraNoticeText}>
          This preview shows the check-in flow. The camera and signed QR validation will connect to
          the backend in a later integration step.
        </Text>
      </View>

      <Button
        label="Preview successful check-in"
        onPress={() => openFeature('check-in-result', { memberId: 'MEM-0042' })}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  scanFrame: {
    minHeight: 275,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 20,
    backgroundColor: '#171911',
  },
  corner: {
    position: 'absolute',
    width: 23,
    height: 23,
    borderColor: colors.accent,
  },
  cornerTopLeft: {
    top: 10,
    left: 10,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 9,
  },
  cornerTopRight: {
    top: 10,
    right: 10,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 9,
  },
  cornerBottomLeft: {
    bottom: 10,
    left: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 9,
  },
  cornerBottomRight: {
    right: 10,
    bottom: 10,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderBottomRightRadius: 9,
  },
  scanContent: {
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 24,
  },
  cameraIcon: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#292D1D',
  },
  cameraLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  cameraHint: {
    maxWidth: 240,
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
  },
  scanLine: {
    position: 'absolute',
    top: '50%',
    width: '76%',
    height: 1,
    backgroundColor: 'rgba(198, 241, 53, 0.45)',
  },
  scanInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  scanInfoText: {
    flex: 1,
    color: colors.muted,
    fontSize: 10,
    lineHeight: 16,
  },
  cameraNotice: {
    gap: 5,
    padding: 13,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  cameraNoticeTitle: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '800',
  },
  cameraNoticeText: {
    color: colors.subtle,
    fontSize: 9,
    lineHeight: 15,
  },
});
