import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEvents } from '../../../context/EventsContext';
import { events } from '../../../data/events';
import { notifyEventBookmarked } from '../../../utils/notifications';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { favouriteIds, saveFavourite, removeFavourite } = useEvents();
  const [sendingNotification, setSendingNotification] = useState(false);
  const [message, setMessage] = useState('');

  const event = events.find((item) => item.id === id);

  if (!event) {
    return <Text style={styles.missing}>Event unavailable. Go back to Explore.</Text>;
  }

  const isFavourite = favouriteIds.includes(event.id);

  async function handleFavouritePress() {
    setMessage('');

    if (isFavourite) {
      removeFavourite(event.id);
      return;
    }

    saveFavourite(event.id);
    setSendingNotification(true);

    try {
      const scheduled = await notifyEventBookmarked(event.title);

      if (!scheduled) {
        setMessage('Event saved. Enable notifications in device settings to see alerts.');
      }
    } catch {
      setMessage('Event saved. The notification could not be scheduled.');
    } finally {
      setSendingNotification(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Image source={event.image} style={styles.image} />
      <Text style={styles.category}>{event.category}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{event.date} · {event.time}</Text>
      <Text style={styles.meta}>{event.venue}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <Pressable
        accessibilityRole="button"
        disabled={sendingNotification}
        onPress={handleFavouritePress}
        style={[styles.button, sendingNotification && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>
          {isFavourite ? 'Remove from Favourites' : 'Save to Favourites'}
        </Text>
      </Pressable>

      {message ? <Text style={styles.meta}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EFF6FF' },
  content: { padding: 20 },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    backgroundColor: '#DBEAFE',
    resizeMode: 'contain',
  },
  category: { marginTop: 16, color: '#1D4ED8', fontWeight: '700' },
  title: { marginVertical: 8, color: '#0F172A', fontSize: 26, fontWeight: '700' },
  meta: { marginTop: 5, color: '#475569', lineHeight: 21 },
  description: { marginVertical: 18, color: '#0F172A', fontSize: 16, lineHeight: 25 },
  button: { padding: 14, borderRadius: 12, backgroundColor: '#1D4ED8' },
  disabledButton: { opacity: 0.65 },
  buttonText: { color: '#FFFFFF', fontWeight: '700', textAlign: 'center' },
  missing: { padding: 20 },
});