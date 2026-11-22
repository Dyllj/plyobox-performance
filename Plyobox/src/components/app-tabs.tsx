import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppIcon, type AppIconName } from '@/components/app-icon';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { MEMBER_HOME_ROUTE } from '@/lib/navigation';

const tabs: { href: typeof MEMBER_HOME_ROUTE | '/member/pass' | '/member/scan' | '/member/trainers' | '/member/more'; label: string; icon: AppIconName }[] = [
  { href: MEMBER_HOME_ROUTE, label: 'Home', icon: 'home' },
  { href: '/member/pass', label: 'Pass', icon: 'wallet' },
  { href: '/member/scan', label: 'Scan', icon: 'qr' },
  { href: '/member/trainers', label: 'Trainers', icon: 'dumbbell' },
  { href: '/member/more', label: 'More', icon: 'more' },
];

function activeTabForPath(pathname: string) {
  if (pathname === MEMBER_HOME_ROUTE) {
    return MEMBER_HOME_ROUTE;
  }
  if (pathname === '/member/pass' || pathname.startsWith('/feature/membership') || pathname.startsWith('/feature/checkout') || pathname.startsWith('/feature/payments') || pathname.startsWith('/feature/receipt')) {
    return '/member/pass';
  }
  if (pathname === '/member/scan' || pathname.includes('check-in') || pathname.includes('attendance')) {
    return '/member/scan';
  }
  if (pathname.includes('trainer') || pathname.includes('booking') || pathname.includes('/coach/')) {
    return '/member/trainers';
  }
  if (pathname === '/member/more' || pathname.startsWith('/feature/')) {
    return '/member/more';
  }
  return MEMBER_HOME_ROUTE;
}

export default function AppTabs() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const selectedTab = activeTabForPath(pathname);

  return (
    <View style={[styles.safeArea, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View accessibilityRole="navigation" accessibilityLabel="Main navigation" style={styles.tabBar}>
        {tabs.map(({ href, label, icon }) => {
          const selected = href === selectedTab;

          return (
            <Pressable
              key={href}
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{ selected }}
              onPress={() => router.replace(href)}
              style={({ pressed }) => [
                styles.tab,
                selected && styles.tabSelected,
                pressed && styles.pressed,
              ]}>
              <AppIcon name={icon} color={selected ? colors.accentInk : colors.muted} size={18} />
              <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
  },
  tabBar: {
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 3,
    paddingHorizontal: 8,
    paddingTop: 7,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tab: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    borderRadius: 13,
  },
  tabSelected: {
    backgroundColor: colors.accent,
  },
  label: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '700',
  },
  labelSelected: {
    color: colors.accentInk,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.72,
  },
});
