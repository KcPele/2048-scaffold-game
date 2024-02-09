import { useEffect } from "react";

// Use a generic type parameter `T` to allow for different event types
export default function useEvent<T extends Event = Event>(event: string, handler: (event: T) => void, passive = false) {
  useEffect(() => {
    // The handler is already correctly typed, so no need for casting
    const eventListener: (this: Window, ev: T) => void = ev => handler(ev);

    // Add the event listener with the specific event type
    window.addEventListener(event, eventListener as EventListener, passive);
    return () => {
      // Remove the event listener
      window.removeEventListener(event, eventListener as EventListener);
    };
  }); // Ensure dependencies are correctly listed
}
