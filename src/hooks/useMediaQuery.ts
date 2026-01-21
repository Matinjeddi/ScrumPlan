import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return isClient ? matches : false;
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 640px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(max-width: 1024px)");
}
