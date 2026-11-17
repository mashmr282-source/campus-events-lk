import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { EventsProvider } from '../context/EventsContext';
import '../utils/notifications';

export default function RootLayout() {
  return (
    <EventsProvider>
      <StatusBar style="dark" />
      <Slot />
    </EventsProvider>
  );
}