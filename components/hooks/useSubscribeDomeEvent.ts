import { useEffect } from "react";

interface UseSubscribeDomeEventProps {
  target: Node | null;
  events: string[];
  listener: EventListenerOrEventListenerObject;
}

export default function useSubscribeDomeEvent({
  target,
  events,
  listener,
}: UseSubscribeDomeEventProps) {
  useEffect(() => {
    if (!target) return;

    events.forEach((event) => target.addEventListener(event, listener), false);

    return () => {
      events.forEach((event) => target.removeEventListener(event, listener));
    };
  }, [target, events, listener]);
}
