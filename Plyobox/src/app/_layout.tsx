import { DarkTheme, Stack, ThemeProvider, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import AppTabs from '@/components/app-tabs';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';

export default function RootLayout() {
  const pathname = usePathname();
  const tabsHidden =
    pathname === '/' ||
    pathname === '/register' ||
    pathname === '/forgot-password' ||
    pathname === '/feature/receipt' ||
    pathname === '/feature/check-in-result' ||
    pathname === '/feature/payment-pending' ||
    pathname === '/feature/payment-rejected' ||
    pathname === '/feature/payment-approved';

  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" />
      <View style={styles.root}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        />
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
