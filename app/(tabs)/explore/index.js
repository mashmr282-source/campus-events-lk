import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import EventCard from '../../../components/EventCard';
import { categories, events } from '../../../data/events';

export default function ExploreScreen() {
  const router = useRouter();
  const [category, setCategory] = useState('All');
  const [filterOpen, setFilterOpen] = useState(false);

  const visibleEvents = category === 'All'
    ? events
    : events.filter((event) => event.category === category);

  function openEvent(event) {
    router.push({
      pathname: '/explore/[id]',
      params: { id: event.id },
    });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.toolbar}>
        <Text style={styles.heading}>Campus Events LK</Text>
        <Pressable
          accessibilityRole="button"
          style={styles.filterButton}
          onPress={() => setFilterOpen(true)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </Pressable>
      </View>

      <Text style={styles.summary}>
        {category === 'All' ? 'All events' : category} · {visibleEvents.length}
      </Text>

      <FlatList
        data={visibleEvents}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => openEvent(item)} />
        )}
        ListEmptyComponent={<Text>No events in this category.</Text>}
      />

      <Modal
        visible={filterOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.dialog}>
            <Text style={styles.heading}>Filter by category</Text>

            {categories.map((option) => (
              <Pressable
                key={option}
                accessibilityRole="button"
                accessibilityState={{ selected: option === category }}
                style={[
                  styles.option,
                  option === category && styles.selectedOption,
                ]}
                onPress={() => {
                  setCategory(option);
                  setFilterOpen(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}

            <Pressable
              accessibilityRole="button"
              style={styles.option}
              onPress={() => setFilterOpen(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#EFF6FF' },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: { color: '#0F172A', fontSize: 22, fontWeight: '700' },
  filterButton: { backgroundColor: '#1D4ED8', padding: 12, borderRadius: 10 },
  filterButtonText: { color: '#FFFFFF', fontWeight: '700' },
  summary: { color: '#475569', marginVertical: 12 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  dialog: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20 },
  option: { marginTop: 6, padding: 12, borderRadius: 8 },
  selectedOption: { backgroundColor: '#DBEAFE' },
  optionText: { color: '#0F172A', fontSize: 16 },
  closeText: { color: '#1D4ED8', fontSize: 16, fontWeight: '700' },
});