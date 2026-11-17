import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import EventCard from '../../components/EventCard';
import { useEvents } from '../../context/EventsContext';
import { events } from '../../data/events';

export default function FavouritesScreen() {
  const router = useRouter();
  const { favouriteIds, lastReturnedAt } = useEvents();
  const savedEvents = events.filter((event) => favouriteIds.includes(event.id));

  return (
    <View style={styles.screen}>
      <View style={styles.status}>
        <Text style={styles.label}>Last returned to app</Text>
        <Text style={styles.value}>
          {lastReturnedAt
            ? lastReturnedAt.toLocaleString()
            : 'Press Home and reopen the app to see the time here.'}
        </Text>
      </View>

      <FlatList
        data={savedEvents}
        keyExtractor={(event) => event.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => router.push({
              pathname: '/explore/[id]',
              params: { id: item.id },
            })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.value}>
            No saved events yet. Open an event in Explore to save it here.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#EFF6FF' },
  status: {
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
  },
  label: { color: '#0F172A', fontWeight: '700' },
  value: { color: '#475569', marginTop: 4, lineHeight: 21 },
});