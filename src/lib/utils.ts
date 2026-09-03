import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("998")) {
    return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  if (cleaned.length === 9) {
    return `+998 (${cleaned.slice(0, 2)}) ${cleaned.slice(2, 5)}-${cleaned.slice(5, 7)}-${cleaned.slice(7, 9)}`;
  }
  return phone;
}

export function cleanPhoneForCall(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 9) return `+998${cleaned}`;
  if (cleaned.startsWith("998")) return `+${cleaned}`;
  return phone;
}

export function formatDateUz(dateString: string | Date | null | undefined): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getDurationHolding(takenAt: string | Date | null | undefined): string {
  if (!takenAt) return "";
  const start = new Date(takenAt).getTime();
  const now = Date.now();
  const diffMinutes = Math.floor((now - start) / (1000 * 60));
  
  if (diffMinutes < 1) return "Hozirgina";
  if (diffMinutes < 60) return `${diffMinutes} daqiqa oldin`;
  const hours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;
  if (hours < 24) return `${hours} soat ${remainingMinutes > 0 ? remainingMinutes + "m" : ""} oldin`;
  const days = Math.floor(hours / 24);
  return `${days} kun ${hours % 24 > 0 ? (hours % 24) + "s" : ""} oldin`;
}
