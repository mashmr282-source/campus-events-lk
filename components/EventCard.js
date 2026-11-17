import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function EventCard({ event, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={event.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{event.category}</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>{event.date} · {event.time}</Text>
        <Text style={styles.meta}>{event.venue}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  pressed: { opacity: 0.7 },
  image: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: 12,
    backgroundColor: '#DBEAFE',
  },
  content: { flex: 1 },
  category: { color: '#1D4ED8', fontWeight: '600' },
  title: { color: '#0F172A', fontSize: 16, fontWeight: '700', marginVertical: 4 },
  meta: { color: '#475569', lineHeight: 20 },
});