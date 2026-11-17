# Campus Events LK

**Student Name:** K.M.S.Imash 
**Student ID:** PS/2022/143
**Module:** Mobile Application Development  
**Assignment:** 01

## Overview

Campus Events LK is a mobile app built with React Native, Expo, and JavaScript. It gives university students one place to look through sample campus activities, check when and where they take place, and keep a shortlist of events they want to attend. Students can filter events by category, open a card for the full description, and save events to Favourites.

The app uses four sample events stored in `data/events.js`: Campus Photography Workshop, CV and Interview Clinic, University Swimming Training, and Mobile UI Design Workshop. Each entry has a unique ID, title, category, date, time, venue, description, and image. The schedules are sample data for the assignment.

## Screens

The app has **three user-facing screens** and **two bottom tabs**. The category filter opens as a modal within Explore.

| Screen | Purpose | Main actions |
| --- | --- | --- |
| Explore Events | Browse the campus event catalogue and see each event's category, date, time, and venue. | Open the filter modal, select a category, or tap a card to open Event Details. |
| Event Details | Read the full description and manage the selected event. | Save or remove the event, receive a local confirmation notification after saving, or use the stack's Back button. |
| Favourites | View the events saved during the current session and see the last time the app returned to the foreground. | Open a saved event or switch back to Explore. An empty-state message appears when there are no saved events. |

## React Native components

| Component or API | Where it is used | Purpose |
| --- | --- | --- |
| `View` | Explore, Favourites, and `components/EventCard.js` | Groups the filter controls, status panel, card content, and modal layout. |
| `Text` | All three screens and `components/EventCard.js` | Displays screen labels, event information, button labels, status messages, and the foreground timestamp. |
| `Image` | `components/EventCard.js` and `app/(tabs)/explore/[id].js` | Displays the event image on each card and at a larger size on Event Details. |
| `Pressable` | Explore, Event Details, and `components/EventCard.js` | Opens and controls the filter modal, opens event cards, and saves or removes favourites. |
| `FlatList` | `app/(tabs)/explore/index.js` and `app/(tabs)/favourites.js` | Renders the filtered event catalogue and the saved events. The unique event ID is the list key. |
| `Modal` | `app/(tabs)/explore/index.js` | Shows category choices. It closes when the user selects a category, taps Close, or presses Android Back. |
| `ScrollView` | `app/(tabs)/explore/[id].js` | Lets the user scroll through the image, description, and actions on smaller displays. |
| `StyleSheet` | Screen and event card files | Defines spacing, colours, typography, and layout. |
| `AppState` | `context/EventsContext.js` | Detects when the app returns from the background and records the return time. |

## Expo Router structure

```text
app/
├── _layout.js
├── index.js
└── (tabs)/
    ├── _layout.js
    ├── favourites.js
    └── explore/
        ├── _layout.js
        ├── index.js
        └── [id].js
```

| Route file | Role |
| --- | --- |
| `app/_layout.js` | Wraps the routed screens in `EventsProvider` and loads the notification handler. |
| `app/index.js` | Redirects the initial `/` route to `/explore`. |
| `app/(tabs)/_layout.js` | Defines the Explore and Favourites tabs. Expo Router omits the `(tabs)` group name from URLs. |
| `app/(tabs)/explore/_layout.js` | Defines the nested stack for the Explore list and Event Details. The stack supplies a Back button when an event is opened from Explore. |
| `app/(tabs)/explore/index.js` | Renders the event catalogue at `/explore`. |
| `app/(tabs)/explore/[id].js` | Renders `/explore/<id>`, reads the route parameter, and looks up the corresponding event. |
| `app/(tabs)/favourites.js` | Renders saved events and the foreground timestamp at `/favourites`. |

## Shared state and app lifecycle

`EventsProvider` uses React Context and `useState` to share saved event IDs across Event Details and Favourites. Event Details updates the IDs when a user saves or removes an event. Favourites uses the same IDs to select matching entries from the sample dataset, so changes appear immediately. Favourites reset when the app process restarts.

The provider also registers an `AppState` change listener. When the app enters the background and later becomes active, the provider records the return time and Favourites displays it under **Last returned to app**. The provider removes the listener when it unmounts.

## Local notification research and implementation

The implementation follows Expo's guidance for [local and remote notifications](https://docs.expo.dev/push-notifications/what-you-need-to-know/) and the [`expo-notifications` API reference](https://docs.expo.dev/versions/latest/sdk/notifications/). The save action uses an immediate local notification because the bookmark already happens on the device and can trigger a confirmation there.

1. `utils/notifications.js` registers a foreground handler so the system can show a banner while the app is open.
2. On Android, the helper creates an **Event updates** channel, checks notification permission and requests it when needed.
3. After an event is added, `scheduleNotificationAsync` requests immediate delivery of **Event bookmarked!**, with the event name in the message.
4. If permission is denied or scheduling fails, the saved event stays in Favourites and Event Details displays a message. Removing an event updates the saved list without triggering another notification.

## Run locally

Install Node.js with npm and Git. For the mobile demo, use an Android phone with Expo Go compatible with the project's Expo SDK.

```bash
git clone https://github.com/mashmr282-source/campus-events-lk.git
cd campus-events-lk
npm ci
npx expo start
```

On Android, connect the phone and development computer to the same Wi-Fi network and scan the QR code from the terminal using Expo Go. To preview the interface in a browser, press **w** in the Expo terminal. Use the phone to verify the system notification and the background-to-foreground transition.

## Demonstration video

**Video link:** https://drive.google.com/file/d/1qkYef3-ulFabtSZa4yD6O11J1eS6_EO6/view?usp=sharing

The demo covers the event data, category filter, tab and stack navigation, saving and removing favourites, the local notification, and the foreground timestamp after returning to the app.
