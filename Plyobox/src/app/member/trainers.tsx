import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppIcon } from '@/components/app-icon';
import { Badge, Page } from '@/components/mobile-ui';
import { PlyoboxTheme as colors } from '@/constants/plyobox-theme';
import { openFeature } from '@/lib/navigation';

const filters = ['All', 'Strength', 'Speed', 'Rehab'] as const;
const trainers = [
  { id: 'a', name: 'Alex Rivera', focus: 'Strength & conditioning', tags: ['Strength'], years: '5 years', rating: '4.9' },
  { id: 'b', name: 'Maya Santos', focus: 'Speed & agility', tags: ['Speed'], years: '3 years', rating: 'New' },
  { id: 'c', name: 'Jordan Reyes', focus: 'Mobility & rehab', tags: ['Rehab'], years: '6 years', rating: '4.8' },
];

export default function TrainersScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const visibleTrainers = useMemo(
    () =>
      trainers.filter((trainer) => {
        const matchesText = `${trainer.name} ${trainer.focus}`.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = activeFilter === 'All' || trainer.tags.includes(activeFilter);
        return matchesText && matchesCategory;
      }),
    [activeFilter, query],
  );

  return (
    <Page
      title="Trainers"
      subtitle="Find the right coach for your next goal."
      rightAction={<Badge tone="neutral">SAMPLE LIST</Badge>}>
      <View style={styles.searchBox}>
        <AppIcon name="search" color={colors.muted} size={18} />
        <TextInput
          accessibilityLabel="Search trainers"
          autoCapitalize="none"
          onChangeText={setQuery}
          placeholder="Search trainers"
          placeholderTextColor={colors.subtle}
          style={styles.searchInput}
          value={query}
        />
      </View>

      <View style={styles.filters}>
        {filters.map((filter) => {
          const selected = filter === activeFilter;
          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filter, selected && styles.filterSelected]}>
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.list}>
        {visibleTrainers.map((trainer, index) => (
          <Pressable
            key={trainer.id}
            accessibilityRole="button"
            accessibilityLabel={`View ${trainer.name}'s trainer profile`}
            onPress={() => openFeature('trainer-profile')}
            style={({ pressed }) => [styles.trainerCard, pressed && styles.pressed]}>
            <View style={[styles.avatar, index === 1 && styles.avatarAlt, index === 2 && styles.avatarThird]}>
              <AppIcon name="person" color={index === 1 ? '#D8C18B' : colors.accent} size={24} />
              <View style={styles.avatarPhoto}>
                <Text style={styles.avatarPhotoText}>PHOTO</Text>
              </View>
            </View>
            <View style={styles.trainerCopy}>
              <View style={styles.trainerHeader}>
                <Text style={styles.trainerName}>{trainer.name}</Text>
                <View style={styles.rating}>
                  <AppIcon name="star" color={colors.accent} size={11} />
                  <Text style={styles.ratingText}>{trainer.rating}</Text>
                </View>
              </View>
              <Text style={styles.trainerFocus}>{trainer.focus}</Text>
              <View style={styles.trainerMeta}>
                <Text style={styles.experience}>{trainer.years} experience</Text>
                <Text style={styles.rate}>Rate set by trainer</Text>
              </View>
            </View>
            <AppIcon name="chevron-right" color={colors.subtle} size={17} />
          </Pressable>
        ))}
        {visibleTrainers.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No sample trainers match that search.</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.previewNote}>
        Sample trainer cards for UI preview. Real profiles publish when trainers complete their
        details.
      </Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.card,
  },
  searchInput: {
    flex: 1,
    minHeight: 44,
    padding: 0,
    color: colors.text,
    fontSize: 12,
  },
  filters: {
    flexDirection: 'row',
    gap: 7,
  },
  filter: {
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 13,
    borderRadius: 99,
    backgroundColor: colors.card,
  },
  filterSelected: {
    backgroundColor: colors.accent,
  },
  filterText: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '700',
  },
  filterTextSelected: {
    color: colors.accentInk,
  },
  list: {
    gap: 8,
  },
  trainerCard: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  avatar: {
    width: 57,
    height: 57,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 13,
    backgroundColor: '#30371E',
  },
  avatarAlt: {
    backgroundColor: '#2C2920',
  },
  avatarThird: {
    backgroundColor: '#222A23',
  },
  avatarPhoto: {
    position: 'absolute',
    right: 3,
    bottom: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(9, 10, 8, 0.75)',
  },
  avatarPhotoText: {
    color: colors.muted,
    fontSize: 5,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  trainerCopy: {
    flex: 1,
    gap: 3,
  },
  trainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  trainerName: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    color: colors.muted,
    fontSize: 8,
    fontWeight: '700',
  },
  trainerFocus: {
    color: colors.muted,
    fontSize: 9,
  },
  trainerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: 2,
  },
  experience: {
    color: colors.subtle,
    fontSize: 8,
  },
  rate: {
    color: colors.accent,
    fontSize: 8,
    fontWeight: '700',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: colors.card,
  },
  noResultsText: {
    color: colors.muted,
    fontSize: 11,
  },
  previewNote: {
    color: colors.subtle,
    fontSize: 9,
    lineHeight: 14,
  },
  pressed: {
    opacity: 0.74,
  },
});
