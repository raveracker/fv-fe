import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Scam from "assets/svg/Scam";
import BadRep from "assets/svg/BadRep";
import Secure from "assets/svg/Secure";
import type { Profile } from "~types/profile";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const injectMainStyles = (cssText: string) => {
  const style = document.createElement("style");
  style.textContent = cssText;
  document.head.appendChild(style);
};

export function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return { firstName, lastName };
}

export function isProfileDirty(userName: string, current: Profile): boolean {
  const { firstName, lastName } = splitName(userName);
  return firstName !== current.firstName || lastName !== current.lastName;
}

export function formatPercent(value: number) {
  const result = (value / 10) * 100;
  const formatted = Number.isInteger(result)
    ? result.toString()
    : result.toFixed(2);
  return `${formatted}%`;
}

export function setProgressClasses(rating: number) {
  if (rating < 3) return "from-error-light to-error-dark";
  if (rating < 5) return "from-warning-light to-warning-dark";
  if (rating < 8) return "from-blue-500 to-blue-600";
  return "from-success-light to-success-dark";
}

export function getStatusIcon(isScam: boolean, rating: number, size?: number) {
  if (isScam) {
    return <Scam width={size || 50} height={size || 50} />;
  }
  if (!isScam && rating < 4) {
    return <BadRep width={size || 50} height={size || 50} />;
  }
  return <Secure width={size || 50} height={size || 50} />;
}

export function setRatingsClasses(rating: number) {
  if (rating < 3) return "text-error-dark";
  if (rating < 5) return "text-warning-dark";
  if (rating < 8) return "text-primary-90";
  return "text-success-dark";
}

export function extractDomainWord(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    if (parts.length >= 2) {
      return parts[parts.length - 2];
    }
    return parts[0];
  } catch {
    const re = /^https?:\/\/(?:www\.)?([^./]+)\.com/;
    const m = url.match(re);
    return m ? m[1] : null;
  }
}
