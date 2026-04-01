import type { Translations } from '../i18n/translations';

export function daysUntilBirthday(dob: string): number {
  const today = new Date();
  const birth = new Date(dob);
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffMs = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function isBirthdayWithinDays(dob: string, days: number): boolean {
  const d = daysUntilBirthday(dob);
  return d <= days || d >= (365 - days);
}

export function computeAge(dob: string): number {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function relativeDate(isoDate: string, dateTrans?: Translations['dates']): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (!dateTrans) {
    // Fallback to English
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  if (diffDays === 0) return dateTrans.today;
  if (diffDays === 1) return dateTrans.yesterday;
  if (diffDays < 7) return dateTrans.daysAgo(diffDays);
  if (diffDays < 14) return dateTrans.oneWeekAgo;
  if (diffDays < 30) return dateTrans.weeksAgo(Math.floor(diffDays / 7));
  if (diffDays < 60) return dateTrans.oneMonthAgo;
  return dateTrans.monthsAgo(Math.floor(diffDays / 30));
}

export function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export function makeBirthdayDOB(age: number, daysUntilNextBirthday: number): string {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const nextBday = new Date(today);
  nextBday.setDate(nextBday.getDate() + daysUntilNextBirthday);
  return `${birthYear}-${String(nextBday.getMonth() + 1).padStart(2, '0')}-${String(nextBday.getDate()).padStart(2, '0')}`;
}

export function isWithinDays(isoDate: string, days: number): boolean {
  const target = new Date(isoDate);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}
