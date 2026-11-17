import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1D4ED8',
        tabBarInactiveTintColor: '#475569',
        headerTintColor: '#0F172A',
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explore', headerShown: false }}
      />
      <Tabs.Screen
        name="favourites"
        options={{ title: 'Favourites' }}
      />
    </Tabs>
  );
}