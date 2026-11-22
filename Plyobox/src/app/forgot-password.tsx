import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Button, Field, Page } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title="Reset password" backHref="/">
      {sent ? (
        <View style={styles.successCard}>
          <View style={styles.successIcon}>
            <AppIcon name="check-circle" color={colors.accent} size={28} />
          </View>
          <Text accessibilityRole="header" style={styles.successTitle}>
            Check your inbox
          </Text>
          <Text style={styles.description}>
            If an account exists for {email || 'that email'}, a reset link will be sent.
          </Text>
          <Text style={styles.previewNotice}>Preview only · No email was sent.</Text>
          <Button label="Return to log in" onPress={() => router.replace('/')} />
        </View>
      ) : (
        <View style={styles.form}>
          <Text style={styles.description}>
            Enter your email and we’ll send a link to reset your password.
          </Text>
          <Field
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            onChangeText={setEmail}
            placeholder="you@example.com"
            value={email}
          />
          <Button label="Send link" onPress={() => setSent(true)} />
        </View>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 17,
    paddingTop: 4,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  previewNotice: {
    color: colors.subtle,
    fontSize: 10,
    textAlign: 'center',
  },
  successCard: {
    alignItems: 'center',
    gap: 14,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  successIcon: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#29331B',
  },
  successTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
});
