import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-input">
        New task
      </label>
      <input
        id="task-input"
        className="task-input"
        type="text"
        placeholder="What do you need to do?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  )
}
