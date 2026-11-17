import { createContext, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';

const EventsContext = createContext(null);

export function EventsProvider({ children }) {
  const [favouriteIds, setFavouriteIds] = useState([]);
  const [lastReturnedAt, setLastReturnedAt] = useState(null);

  useEffect(() => {
    let wasInBackground = AppState.currentState === 'background';

    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'background') {
        wasInBackground = true;
      }

      if (nextState === 'active' && wasInBackground) {
        wasInBackground = false;
        setLastReturnedAt(new Date());
      }
    });

    return () => subscription.remove();
  }, []);

  function saveFavourite(eventId) {
    setFavouriteIds((ids) =>
      ids.includes(eventId) ? ids : [...ids, eventId]
    );
  }

  function removeFavourite(eventId) {
    setFavouriteIds((ids) => ids.filter((id) => id !== eventId));
  }

  return (
    <EventsContext.Provider
      value={{ favouriteIds, lastReturnedAt, saveFavourite, removeFavourite }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used inside EventsProvider');
  }
  return context;
}
