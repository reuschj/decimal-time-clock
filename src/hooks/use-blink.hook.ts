import { useEffect, useRef, useState } from "react";
import { DECIMAL_SECOND } from "../constants/time.constants";
import type { Optional } from "../types/generic.types";

/**
 * Uses gets boolean visibility toggled at a given interval to apply to visual item
 *
 * @param blinkRate - Blink rate for item, defaulting to one decimal second
 * @returns A stateful boolean indicating visibility status.
 */
export const useBlink = (blinkRate = DECIMAL_SECOND): boolean => {
  const [visible, setVisible] = useState(true);
  const timeout = useRef<Optional<ReturnType<typeof setTimeout>>>(undefined);
  useEffect(() => {
    if (blinkRate) {
      timeout.current = setTimeout(() => {
        setVisible(!visible);
      }, blinkRate);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [blinkRate, visible]);

  return visible;
};

export default useBlink;
