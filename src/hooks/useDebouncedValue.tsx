import { useEffect, useRef, useState } from "react";

type useDebouncedValueProps = {
  value: any;
  delay: number;
};

export const useDebouncedValue = ({ value, delay }: useDebouncedValueProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      timeoutRef.current = null;
    }, delay);
  }, [delay, value]);

  return {
    debouncedValue,
  };
};
