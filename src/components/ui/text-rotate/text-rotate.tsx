
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TextRotateProps, TextRotateRef, WordObject } from "./types";

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // handy function to split text into characters with support for unicode and emojis
    const splitIntoCharacters = (text: string): string[] => {
      // Fallback for browsers that don't support Intl.Segmenter
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex];
      if (splitBy === "characters") {
        const text = currentText.split(" ");
        return text.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== text.length - 1,
        }));
      }
      return splitBy === "words"
        ? currentText.split(" ")
        : splitBy === "lines"
          ? currentText.split("\n")
          : currentText.split(splitBy);
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number) => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );

    // Helper function to handle index changes and trigger callback
    const handleIndexChange = useCallback((newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    }, [onNext]);

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1
        ? (loop ? 0 : currentTextIndex)
        : currentTextIndex + 1;
      
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0
        ? (loop ? texts.length - 1 : currentTextIndex)
        : currentTextIndex - 1;
      
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback((index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    }, [texts.length, currentTextIndex, handleIndexChange]);

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    // Expose all navigation functions via ref
    useImperativeHandle(ref, () => ({
      next,
      previous,
      jumpTo,
      reset,
    }), [next, previous, jumpTo, reset]);

    React.useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    const calculateStaggerDelay = useCallback((wordIndex: number, charIndex: number, wordArray: WordObject[]) => {
      const previousCharsCount = wordArray
        .slice(0, wordIndex)
        .reduce((sum, word) => sum + word.characters.length, 0);
      
      const totalChars = wordArray.reduce(
        (sum, word) => sum + word.characters.length, 0
      );

      return getStaggerDelay(
        previousCharsCount + charIndex,
        totalChars
      );
    }, [getStaggerDelay]);

    return (
      <motion.span
        className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)}
        {...props}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>

        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <motion.div
            key={currentTextIndex}
            className={cn(
              "flex flex-wrap",
              splitBy === "lines" && "flex-col w-full"
            )}
            layout
            aria-hidden="true"
          >
            {(splitBy === "characters"
              ? (elements as WordObject[])
              : (elements as string[]).map((el, i) => ({
                  characters: [el],
                  needsSpace: i !== elements.length - 1,
                }))
            ).map((wordObj, wordIndex, array) => (
              <span
                key={wordIndex}
                className={cn("inline-flex overflow-visible", splitLevelClassName)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    key={charIndex}
                    transition={{
                      ...transition,
                      delay: calculateStaggerDelay(wordIndex, charIndex, array),
                    }}
                    className={cn("inline-block overflow-visible", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && (
                  <span className="whitespace-pre"> </span>
                )}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

TextRotate.displayName = "TextRotate";

export { TextRotate };
