import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Brand, Button, Field, Page } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { MEMBER_HOME_ROUTE } from '@/lib/navigation';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Page>
      <View style={styles.container}>
        <View style={styles.brandWrap}>
          <Brand inverse />
          <Text style={styles.tagline}>Train explosive. Move better.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.heading}>
            <Text accessibilityRole="header" style={styles.title}>
              Welcome back
            </Text>
            <Text style={styles.subtitle}>Log in to your Plyobox account</Text>
          </View>

          <Field
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="you@example.com"
            value={email}
          />
          <Field
            autoComplete="current-password"
            label="Password"
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
          />

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/forgot-password')}
            style={({ pressed }) => [styles.forgotButton, pressed && styles.pressed]}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <Button
            label="Log in"
            onPress={() => router.replace(MEMBER_HOME_ROUTE)}
            icon="arrow-right"
          />
          <Button
            label="Create account"
            onPress={() => router.push('/register')}
            variant="outline"
          />
          <View style={styles.demoNote}>
            <AppIcon name="info" color={colors.muted} size={15} />
            <Text style={styles.demoText}>UI preview · Sign-in is not connected yet</Text>
          </View>
        </View>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 42,
    paddingVertical: 28,
  },
  brandWrap: {
    alignItems: 'center',
    gap: 15,
  },
  tagline: {
    color: colors.muted,
    fontSize: 13,
  },
  form: {
    gap: 13,
  },
  heading: {
    gap: 4,
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
  },
  forgotText: {
    color: colors.muted,
    fontSize: 11,
  },
  demoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 2,
  },
  demoText: {
    color: colors.subtle,
    fontSize: 10,
  },
  pressed: {
    opacity: 0.72,
  },
});
