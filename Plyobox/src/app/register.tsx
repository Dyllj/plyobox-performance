import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Button, Field, Page } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { MEMBER_HOME_ROUTE } from '@/lib/navigation';

const steps = ['YOUR DETAILS', 'PROFILE', 'SAFETY & CONSENT'];

export default function RegisterScreen() {
  const [step, setStep] = useState(0);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const goBack = () => {
    if (step > 0) {
      setStep((current) => current - 1);
      return;
    }
    router.back();
  };

  return (
    <Page
      title="Create account"
      backHref={step === 0 ? '/' : undefined}
      rightAction={
        step > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to previous registration step"
            onPress={goBack}
            style={styles.backButton}>
            <AppIcon name="arrow-back" color={colors.text} size={18} />
          </Pressable>
        ) : null
      }>
      <View style={styles.stepHeader}>
        <View style={styles.progressSegments}>
          {steps.map((label, index) => (
            <View
              key={label}
              style={[styles.segment, index <= step && styles.segmentActive]}
            />
          ))}
        </View>
        <Text style={styles.stepLabel}>
          STEP {step + 1} · {steps[step]}
        </Text>
      </View>

      {step === 0 ? (
        <View style={styles.form}>
          <Field label="Full name" placeholder="Your full name" />
          <Field
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            placeholder="you@example.com"
          />
          <Field keyboardType="phone-pad" label="Phone" placeholder="+63 9XX XXX XXXX" />
          <Field label="Password" placeholder="Create a password" secureTextEntry />
          <Text style={styles.hint}>
            Next: your profile details, emergency contact and privacy consent.
          </Text>
        </View>
      ) : null}

      {step === 1 ? (
        <View style={styles.form}>
          <View style={styles.profilePhoto}>
            <AppIcon name="camera" color={colors.muted} size={22} />
            <Text style={styles.photoLabel}>ADD PROFILE PHOTO · OPTIONAL</Text>
          </View>
          <Field label="Birth date" placeholder="DD / MM / YYYY" />
          <Field label="Member number" placeholder="Assigned after registration" editable={false} />
          <Text style={styles.hint}>
            Your member number is assigned when your account is created.
          </Text>
        </View>
      ) : null}

      {step === 2 ? (
        <View style={styles.form}>
          <Field label="Emergency contact name" placeholder="Full name" />
          <Field label="Emergency contact phone" placeholder="+63 9XX XXX XXXX" keyboardType="phone-pad" />
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: privacyAccepted }}
            onPress={() => setPrivacyAccepted((accepted) => !accepted)}
            style={styles.consentRow}>
            <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
              {privacyAccepted ? <AppIcon name="check" color={colors.accentInk} size={14} /> : null}
            </View>
            <Text style={styles.consentText}>
              I agree to the Privacy Notice and understand how my information is used.
            </Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.bottomActions}>
        {step > 0 ? <Button label="Back" onPress={goBack} variant="outline" /> : null}
        <Button
          label={step === steps.length - 1 ? 'Create account' : 'Continue'}
          onPress={() => {
            if (step < steps.length - 1) {
              setStep((current) => current + 1);
            } else if (privacyAccepted) {
              router.replace(MEMBER_HOME_ROUTE);
            }
          }}
          disabled={step === steps.length - 1 && !privacyAccepted}
        />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  stepHeader: {
    gap: 11,
  },
  progressSegments: {
    flexDirection: 'row',
    gap: 5,
  },
  segment: {
    flex: 1,
    height: 3,
    borderRadius: 9,
    backgroundColor: colors.border,
  },
  segmentActive: {
    backgroundColor: colors.accent,
  },
  stepLabel: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  form: {
    gap: 14,
  },
  hint: {
    color: colors.subtle,
    fontSize: 10,
    lineHeight: 16,
  },
  profilePhoto: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    backgroundColor: colors.card,
  },
  photoLabel: {
    color: colors.subtle,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    paddingVertical: 8,
  },
  checkbox: {
    width: 21,
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.subtle,
    borderRadius: 6,
    backgroundColor: colors.card,
  },
  checkboxChecked: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  consentText: {
    flex: 1,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 'auto',
    paddingTop: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    backgroundColor: colors.card,
  },
});
