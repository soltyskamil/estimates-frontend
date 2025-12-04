import { useEffect, useRef, type RefObject } from "react";

type useOnClickAwayProps = {
  ref: RefObject<HTMLDivElement | null>;
  parentRef: RefObject<HTMLDivElement | null>;
  onAwayCallback: () => void;
  doWhile: boolean;
};

export const useOnClickAway = ({
  ref,
  parentRef,
  onAwayCallback,
  doWhile,
}: //   onAwayCallback,
useOnClickAwayProps) => {
  const callbackRef = useRef<() => void | null>(null);

  useEffect(() => {
    callbackRef.current = onAwayCallback;
  }, [onAwayCallback]);

  useEffect(() => {
    if (!doWhile) return;

    function handleClick(e: MouseEvent) {
      const { current: parentCurrent } = parentRef;
      const { current: refCurrent } = ref;
      if (!parentCurrent || !refCurrent) return;
      const target = e.target as Node;
      const insideParent = parentCurrent.contains(target);
      const insideRef = refCurrent.contains(target);

      if (insideParent || insideRef) return;

      callbackRef.current?.();
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, parentRef, doWhile]);
};
