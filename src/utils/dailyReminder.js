const STORAGE_KEY = 'task-manager-daily-reminder'

export const DEFAULT_DAILY_REMINDER_SCHEDULE = {
  enabled: false,
  timeOfDay: '09:00',
  template: 'Daily reminder',
  lastFiredDate: '',
}

export function loadDailyReminderSchedule() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return {
      enabled: Boolean(data.enabled),
      timeOfDay:
        typeof data.timeOfDay === 'string'
          ? data.timeOfDay
          : DEFAULT_DAILY_REMINDER_SCHEDULE.timeOfDay,
      template:
        typeof data.template === 'string'
          ? data.template
          : DEFAULT_DAILY_REMINDER_SCHEDULE.template,
      lastFiredDate:
        typeof data.lastFiredDate === 'string'
          ? data.lastFiredDate
          : DEFAULT_DAILY_REMINDER_SCHEDULE.lastFiredDate,
    }
  } catch {
    return null
  }
}

export function saveDailyReminderSchedule(schedule) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
}

export function getLocalYmd(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** `timeOfDay` is "HH:MM" (24h). True if local clock is at or past that time today. */
export function isAtOrPastTimeToday(now, timeOfDay) {
  const parts = timeOfDay.split(':')
  const h = Number(parts[0])
  const min = Number(parts[1])
  if (Number.isNaN(h) || Number.isNaN(min)) return false
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  const minutesTarget = h * 60 + min
  return minutesNow >= minutesTarget
}
