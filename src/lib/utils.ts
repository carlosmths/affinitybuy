import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge and classnames */
export const cn = (...inputs: classNames.ArgumentArray) => {
  return twMerge(classNames(inputs));
};

export const remToPx = (rem: number): number => {
  if (typeof window !== 'undefined') {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  return 0;
};

export const checkTouchDevice = (): boolean => {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};
