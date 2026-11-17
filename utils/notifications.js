import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const CHANNEL_ID = 'event-updates';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function notifyEventBookmarked(eventTitle) {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Event updates',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  let permission = await Notifications.getPermissionsAsync();

  if (!permission.granted && permission.canAskAgain) {
    permission = await Notifications.requestPermissionsAsync();
  }

  const isAuthorized =
    permission.granted ||
    permission.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;

  if (!isAuthorized) {
    return false;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Event bookmarked!',
      body: `${eventTitle} was added to your favourites.`,
    },
    trigger: Platform.OS === 'android' ? { channelId: CHANNEL_ID } : null,
  });

  return true;
}