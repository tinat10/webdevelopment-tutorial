import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import DailyReminder from './components/DailyReminder.jsx'
import FilterBar from './components/FilterBar.jsx'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import {
  DEFAULT_DAILY_REMINDER_SCHEDULE,
  getLocalYmd,
  isAtOrPastTimeToday,
  loadDailyReminderSchedule,
  saveDailyReminderSchedule,
} from './utils/dailyReminder.js'

const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]

const POLL_MS = 60_000

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [schedule, setSchedule] = useState(() => {
    return loadDailyReminderSchedule() ?? DEFAULT_DAILY_REMINDER_SCHEDULE
  })

  const scheduleRef = useRef(schedule)
  const addTaskRef = useRef(null)

  useLayoutEffect(() => {
    scheduleRef.current = schedule
  }, [schedule])

  let visibleTasks = tasks
  if (filter === 'active') visibleTasks = tasks.filter((t) => !t.done)
  if (filter === 'done') visibleTasks = tasks.filter((t) => t.done)

  const addTask = useCallback((text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ])
  }, [])

  useLayoutEffect(() => {
    addTaskRef.current = addTask
  }, [addTask])

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function updateSchedule(partial) {
    setSchedule((prev) => ({ ...prev, ...partial }))
  }

  useEffect(() => {
    saveDailyReminderSchedule(schedule)
  }, [schedule])

  useEffect(() => {
    function tryAddDailyReminder() {
      const s = scheduleRef.current
      if (!s.enabled) return

      const template = s.template.trim()
      if (!template) return

      const now = new Date()
      const today = getLocalYmd(now)
      if (s.lastFiredDate === today) return
      if (!isAtOrPastTimeToday(now, s.timeOfDay)) return

      addTaskRef.current?.(template)
      setSchedule((prev) => ({ ...prev, lastFiredDate: today }))
    }

    tryAddDailyReminder()
    const id = window.setInterval(tryAddDailyReminder, POLL_MS)
    return () => window.clearInterval(id)
  }, [])

  const emptyMessage =
    filter === 'all'
      ? 'No tasks yet. Type above and press Add.'
      : filter === 'active'
        ? 'No active tasks. Nice work!'
        : 'No completed tasks yet.'

  return (
    <div className="app">
      <Header title="Task Manager">
        <p className="app-lead">
          Add tasks, mark them done, and remove them. State lives in React with{' '}
          <code>useState</code>.
        </p>
      </Header>

      <main className="app-main">
        <TaskForm onAdd={addTask} />

        <DailyReminder schedule={schedule} onScheduleChange={updateSchedule} />

        <FilterBar
          filters={FILTER_OPTIONS}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          emptyMessage={emptyMessage}
        />
      </main>
    </div>
  )
}

export default App
