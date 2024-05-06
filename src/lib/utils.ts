import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge and classnames */
export const cn = (...inputs: classNames.ArgumentArray) => {
  return twMerge(classNames(inputs));
};

export const remToPx = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
