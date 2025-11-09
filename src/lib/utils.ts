import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/*
Author => Ünsal Demircioğlu
Github =>  https://github.com/unsaldemircioglu
*/