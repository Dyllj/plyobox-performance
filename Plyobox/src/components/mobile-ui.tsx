import type { PropsWithChildren, ReactNode } from 'react';
import { router, type Href } from 'expo-router';
import {
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { AppIcon, type AppIconName } from '@/components/app-icon';
import { Layout, PlyoboxTheme as colors } from '@/constants/plyobox-theme';

type PageProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  backHref?: Href;
  rightAction?: ReactNode;
  header?: ReactNode;
  wide?: boolean;
  tabbed?: boolean;
}>;

export function Page({ title, subtitle, backHref, rightAction, header, wide, tabbed = false, children }: PageProps) {
  return (
    <SafeAreaView edges={tabbed ? ['top', 'left', 'right'] : ['top', 'left', 'right', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={[styles.content, wide && styles.wideContent]}>
          {header ??
            (title ? (
              <View style={styles.pageHeader}>
                {backHref ? <BackButton href={backHref} /> : null}
                <View style={styles.headerCopy}>
                  <Text accessibilityRole="header" style={styles.pageTitle}>
                    {title}
                  </Text>
                  {subtitle ? <Text style={styles.pageSubtitle}>{subtitle}</Text> : null}
                </View>
                {rightAction}
              </View>
            ) : null)}
          {children}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <View style={styles.brand}>
      <View style={[styles.brandMark, inverse && styles.brandMarkInverse]}>
        <Image
          accessibilityLabel="Plyobox Performance Gym"
          source={require('@/assets/images/logo.png')}
          style={{ width: 38, height: 38 }}
        />
      </View>
      <View>
        <Text style={styles.brandName}>Plyobox</Text>
        <Text style={styles.brandCaption}>PERFORMANCE GYM</Text>
      </View>
    </View>
  );
}

export function BackButton({ href, label = 'Go back' }: { href?: Href; label?: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        if (href) {
          router.replace(href);
        } else if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/member');
        }
      }}
      style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
      <AppIcon name="arrow-back" color={colors.text} size={18} />
    </Pressable>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'quiet' | 'danger';
  icon?: AppIconName;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  accessibilityLabel,
}: ButtonProps) {
  const buttonVariantStyle =
    variant === 'primary'
      ? styles.button_primary
      : variant === 'outline'
        ? styles.button_outline
        : variant === 'quiet'
          ? styles.button_quiet
          : styles.button_danger;
  const labelVariantStyle =
    variant === 'primary'
      ? styles.buttonLabel_primary
      : variant === 'outline'
        ? styles.buttonLabel_outline
        : variant === 'quiet'
          ? styles.buttonLabel_quiet
          : styles.buttonLabel_danger;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        buttonVariantStyle,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.pressed,
      ]}>
      <Text style={[styles.buttonLabel, labelVariantStyle]}>{label}</Text>
      {icon ? (
        <AppIcon
          name={icon}
          color={variant === 'primary' ? colors.accentInk : colors.accent}
          size={17}
        />
      ) : null}
    </Pressable>
  );
}

export function IconButton({
  icon,
  label,
  onPress,
  badge,
}: {
  icon: AppIconName;
  label: string;
  onPress: () => void;
  badge?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
      <AppIcon name={icon} color={colors.text} size={20} />
      {badge ? (
        <View style={styles.iconBadge}>
          <Text style={styles.iconBadgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

export function Field({
  label,
  style,
  error,
  ...props
}: TextInputProps & {
  label: string;
  error?: string;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.subtle}
        selectionColor={colors.accent}
        accessibilityLiveRegion={error ? 'polite' : undefined}
        style={[styles.input, error ? styles.inputError : undefined, style]}
        {...props}
      />
      {error ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

export function Panel({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text accessibilityRole="header" style={styles.sectionTitle}>
        {title}
      </Text>
      {action}
    </View>
  );
}

export function Badge({
  children,
  tone = 'neutral',
}: PropsWithChildren<{ tone?: 'neutral' | 'lime' | 'warning' | 'success' | 'danger' }>) {
  const badgeVariantStyle =
    tone === 'neutral'
      ? styles.badge_neutral
      : tone === 'lime'
        ? styles.badge_lime
        : tone === 'warning'
          ? styles.badge_warning
          : tone === 'success'
            ? styles.badge_success
            : styles.badge_danger;
  const labelVariantStyle =
    tone === 'neutral'
      ? styles.badgeLabel_neutral
      : tone === 'lime'
        ? styles.badgeLabel_lime
        : tone === 'warning'
          ? styles.badgeLabel_warning
          : tone === 'success'
            ? styles.badgeLabel_success
            : styles.badgeLabel_danger;

  return (
    <View style={[styles.badge, badgeVariantStyle]}>
      {tone === 'success' || tone === 'lime' ? <View style={styles.badgeDot} /> : null}
      <Text style={[styles.badgeLabel, labelVariantStyle]}>{children}</Text>
    </View>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${percent}%` }]} />
    </View>
  );
}

export function ListRow({
  icon,
  title,
  detail,
  onPress,
  trailing,
}: {
  icon?: AppIconName;
  title: string;
  detail?: string;
  onPress?: () => void;
  trailing?: ReactNode;
}) {
  const content = (
    <>
      {icon ? (
        <View style={styles.rowIcon}>
          <AppIcon name={icon} color={colors.accent} size={18} />
        </View>
      ) : null}
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        {detail ? <Text style={styles.rowDetail}>{detail}</Text> : null}
      </View>
      {trailing ?? (onPress ? <AppIcon name="chevron-right" color={colors.subtle} size={17} /> : null)}
    </>
  );

  if (!onPress) {
    return <View style={styles.listRow}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.listRow, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

export function Divider() {
  return <View style={styles.divider} />;
}

export const mobileUiStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  muted: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  limeText: {
    color: colors.accent,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  stack: {
    gap: 12,
  },
});

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    width: '100%',
    maxWidth: 640,
    paddingHorizontal: Layout.gutter,
    paddingTop: 16,
    gap: 18,
  },
  wideContent: {
    maxWidth: 940,
  },
  pageHeader: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerCopy: {
    flex: 1,
    gap: 3,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: colors.card,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: colors.accent,
  },
  brandMarkInverse: {
    backgroundColor: colors.text,
  },
  brandLetter: {
    color: colors.accentInk,
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 27,
  },
  brandLetterInverse: {
    color: colors.background,
  },
  brandName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  brandCaption: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  button: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 15,
    borderRadius: 99,
  },
  button_primary: {
    backgroundColor: colors.accent,
  },
  button_outline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  button_quiet: {
    backgroundColor: colors.card,
  },
  button_danger: {
    borderWidth: 1,
    borderColor: '#603A32',
    backgroundColor: '#291A16',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.25,
    textAlign: 'center',
  },
  buttonLabel_primary: {
    color: colors.accentInk,
  },
  buttonLabel_outline: {
    color: colors.text,
  },
  buttonLabel_quiet: {
    color: colors.text,
  },
  buttonLabel_danger: {
    color: colors.danger,
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  iconBadge: {
    position: 'absolute',
    top: -4,
    right: -3,
    minWidth: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderRadius: 99,
    backgroundColor: colors.accent,
  },
  iconBadgeText: {
    color: colors.accentInk,
    fontSize: 8,
    fontWeight: '900',
  },
  field: {
    gap: 7,
  },
  fieldLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  input: {
    minHeight: 46,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: 13,
  },
  inputError: {
    borderColor: colors.danger,
  },
  fieldError: {
    color: colors.danger,
    fontSize: 11,
  },
  panel: {
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Layout.radius,
    backgroundColor: colors.card,
  },
  sectionHeader: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
  },
  badge: {
    minHeight: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 8,
    borderRadius: 99,
    backgroundColor: colors.cardRaised,
  },
  badge_neutral: {
    backgroundColor: colors.cardRaised,
  },
  badge_lime: {
    backgroundColor: '#31391D',
  },
  badge_warning: {
    backgroundColor: '#332919',
  },
  badge_success: {
    backgroundColor: '#26321B',
  },
  badge_danger: {
    backgroundColor: '#341E19',
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  badgeLabel: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.35,
  },
  badgeLabel_neutral: {
    color: colors.muted,
  },
  badgeLabel_lime: {
    color: colors.accent,
  },
  badgeLabel_warning: {
    color: '#E8C06F',
  },
  badgeLabel_success: {
    color: colors.accent,
  },
  badgeLabel_danger: {
    color: colors.danger,
  },
  progressTrack: {
    height: 6,
    overflow: 'hidden',
    borderRadius: 99,
    backgroundColor: '#33352B',
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
    backgroundColor: colors.accent,
  },
  listRow: {
    minHeight: 61,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.card,
  },
  rowIcon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: colors.cardRaised,
  },
  rowCopy: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  rowDetail: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  pressed: {
    opacity: 0.72,
  },
});
