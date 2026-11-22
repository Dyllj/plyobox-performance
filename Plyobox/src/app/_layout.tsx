import { DarkTheme, Stack, ThemeProvider, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { SessionProvider, useSession } from '@/lib/session';
import { FEATURE_META, FEATURE_SCREENS } from '@/lib/navigation';

export default function RootLayout() {
  return (
    <SessionProvider>
      <AppLayout />
    </SessionProvider>
  );
}

function AppLayout() {
  const pathname = usePathname();
  const { status } = useSession();
  const feature = FEATURE_SCREENS.find((screen) => pathname.endsWith(`/feature/${screen}`));
  const tabsHidden = pathname === '/' || pathname === '/register' || pathname === '/forgot-password' ||
    (feature ? FEATURE_META[feature].hideTabs === true : false);

  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Protected guard={status === 'signed-out'}>
            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot-password" />
          </Stack.Protected>
          <Stack.Protected guard={status === 'signed-in'}>
            <Stack.Screen name="member" />
            <Stack.Screen name="member/pass" />
            <Stack.Screen name="member/scan" />
            <Stack.Screen name="member/trainers" />
            <Stack.Screen name="member/more" />
            <Stack.Screen name="feature/[screen]" />
          </Stack.Protected>
        </Stack>
        {!tabsHidden ? <AppTabs /> : null}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
