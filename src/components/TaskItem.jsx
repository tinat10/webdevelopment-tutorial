export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <label className="task-label">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.done ? 'task-text is-done' : 'task-text'}>
          {task.text}
        </span>
      </label>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => onDelete(task.id)}
      >
        Remove
      </button>
    </li>
  )
}
