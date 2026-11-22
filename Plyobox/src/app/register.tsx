import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Button, Field, Page } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { MEMBER_HOME_ROUTE, openFeature } from '@/lib/navigation';
import { useSession } from '@/lib/session';

const steps = ['YOUR DETAILS', 'PROFILE', 'SAFETY & CONSENT'];

export default function RegisterScreen() {
  const { signIn } = useSession();
  const [step, setStep] = useState(0);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '',
    birthDay: '', birthMonth: '', birthYear: '',
    emergencyName: '', emergencyPhone: '',
  });
  const setField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

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
      rightAction={null}>
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
          <Field label="Full name" placeholder="Your full name" value={form.fullName} onChangeText={(value) => setField('fullName', value)} error={errors.fullName} />
          <Field
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            placeholder="you@example.com"
            value={form.email}
            onChangeText={(value) => setField('email', value)}
            error={errors.email}
          />
          <Field keyboardType="phone-pad" label="Phone" placeholder="+63 9XX XXX XXXX" value={form.phone} onChangeText={(value) => setField('phone', value)} error={errors.phone} />
          <Field label="Password" placeholder="Create a password" secureTextEntry textContentType="newPassword" autoComplete="new-password" value={form.password} onChangeText={(value) => setField('password', value)} error={errors.password} />
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
          <Field label="Birth date" placeholder="DD / MM / YYYY" value={`${form.birthDay} / ${form.birthMonth} / ${form.birthYear}`} editable={false} />
          <View style={styles.birthGrid}>
            <Field label="Day" keyboardType="number-pad" value={form.birthDay} onChangeText={(value) => setField('birthDay', value)} error={errors.birthDate} />
            <Field label="Month" keyboardType="number-pad" value={form.birthMonth} onChangeText={(value) => setField('birthMonth', value)} />
            <Field label="Year" keyboardType="number-pad" value={form.birthYear} onChangeText={(value) => setField('birthYear', value)} />
          </View>
          <Field label="Member number" placeholder="Assigned after registration" editable={false} />
          <Text style={styles.hint}>
            Your member number is assigned when your account is created.
          </Text>
        </View>
      ) : null}

      {step === 2 ? (
        <View style={styles.form}>
          <Field label="Emergency contact name" placeholder="Full name" value={form.emergencyName} onChangeText={(value) => setField('emergencyName', value)} error={errors.emergencyName} />
          <Field label="Emergency contact phone" placeholder="+63 9XX XXX XXXX" keyboardType="phone-pad" value={form.emergencyPhone} onChangeText={(value) => setField('emergencyPhone', value)} error={errors.emergencyPhone} />
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: privacyAccepted }}
            onPress={() => setPrivacyAccepted((accepted) => !accepted)}
            style={styles.consentRow}>
            <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
              {privacyAccepted ? <AppIcon name="check" color={colors.accentInk} size={14} /> : null}
            </View>
            <Text style={styles.consentText}>
              I agree to the <Text onPress={() => openFeature('privacy-notice')} style={styles.linkText}>Privacy Notice</Text> and understand how my information is used.
            </Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.bottomActions}>
        {step > 0 ? <Button label="Back" onPress={goBack} variant="outline" /> : null}
        <Button
          label={step === steps.length - 1 ? 'Create account' : 'Continue'}
          onPress={() => {
            const nextErrors: Record<string, string> = {};
            if (step === 0) {
              if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
              if (!/^(\+63 ?9\d{9}|09\d{9})$/.test(form.phone)) nextErrors.phone = 'Use +63 9XX XXX XXXX or 09XXXXXXXXX.';
              if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
            }
            if (step === 1) {
              const day = Number(form.birthDay);
              const month = Number(form.birthMonth);
              const year = Number(form.birthYear);
              const date = new Date(Date.UTC(year, month - 1, day));
              if (!day || !month || !year || date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day || date >= new Date()) {
                nextErrors.birthDate = 'Enter a real past birth date.';
              }
            }
            if (step === 2) {
              if (!form.emergencyName.trim()) nextErrors.emergencyName = 'Emergency contact name is required.';
              if (!/^(\+63 ?9\d{9}|09\d{9})$/.test(form.emergencyPhone)) nextErrors.emergencyPhone = 'Enter a valid emergency phone.';
            }
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length) return;
            if (step < steps.length - 1) {
              setStep((current) => current + 1);
            } else if (privacyAccepted) {
              signIn();
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
  birthGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  linkText: {
    color: colors.accent,
    textDecorationLine: 'underline',
  },
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
