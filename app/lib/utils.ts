import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function shuffle<T>(array: T[]): T[] {
  const result = [...array] // jangan mutasi original
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function formatHumanReadableTime(
  dateString?: string | null
): string {
  if (!dateString) {
    return "-"; // atau "" kalau mau
  }

  const date = new Date(dateString.replace(" ", "T"));

  // invalid date guard
  if (isNaN(date.getTime())) {
    return "-";
  }

  const now = new Date();

  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // ≥ 7 hari → tampilkan tanggal lengkap
  if (diffDays >= 7) {
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diffDays >= 1) return `${diffDays} hari lalu`;
  if (diffHours >= 1) return `${diffHours} jam lalu`;
  if (diffMinutes >= 1) return `${diffMinutes} menit lalu`;

  return "baru saja";
}

