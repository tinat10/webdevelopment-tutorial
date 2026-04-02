export default function DailyReminder({ schedule, onScheduleChange }) {
  const idToggle = 'daily-reminder-enabled'
  const idTime = 'daily-reminder-time'
  const idTemplate = 'daily-reminder-template'

  return (
    <section className="daily-reminder" aria-labelledby="daily-reminder-heading">
      <h2 id="daily-reminder-heading" className="daily-reminder-heading">
        Daily reminder
      </h2>
      <p className="daily-reminder-hint">
        While this tab is open, we check about once a minute. If the scheduled time
        has passed today and we have not added it yet, a new task is created.
      </p>

      <div className="daily-reminder-row">
        <input
          id={idToggle}
          className="daily-reminder-toggle"
          type="checkbox"
          checked={schedule.enabled}
          onChange={(e) => onScheduleChange({ enabled: e.target.checked })}
        />
        <label className="daily-reminder-toggle-label" htmlFor={idToggle}>
          Enable daily task
        </label>
      </div>

      <div className="daily-reminder-fields">
        <div className="daily-reminder-field">
          <label className="daily-reminder-label" htmlFor={idTime}>
            Time
          </label>
          <input
            id={idTime}
            className="daily-reminder-time"
            type="time"
            value={schedule.timeOfDay}
            onChange={(e) => onScheduleChange({ timeOfDay: e.target.value })}
            disabled={!schedule.enabled}
          />
        </div>
        <div className="daily-reminder-field daily-reminder-field-grow">
          <label className="daily-reminder-label" htmlFor={idTemplate}>
            Task text
          </label>
          <input
            id={idTemplate}
            className="daily-reminder-template-input"
            type="text"
            placeholder="What should we add each day?"
            value={schedule.template}
            onChange={(e) => onScheduleChange({ template: e.target.value })}
            disabled={!schedule.enabled}
            autoComplete="off"
          />
        </div>
      </div>
    </section>
  )
}
