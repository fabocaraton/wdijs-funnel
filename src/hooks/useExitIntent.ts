import { useEffect, useState } from "react";

export function useExitIntent(delay = 5000) {
  const [showModal, setShowModal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Don't trigger on mobile (no mouseout)
    if ("ontouchstart" in window) return;

    let armed = false;
    const timer = setTimeout(() => {
      armed = true;
    }, delay);

    function handleMouseLeave(e: MouseEvent) {
      if (!armed || hasTriggered) return;
      if (e.clientY <= 0) {
        setShowModal(true);
        setHasTriggered(true);
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [delay, hasTriggered]);

  function closeModal() {
    setShowModal(false);
  }

  return { showModal, closeModal };
}
