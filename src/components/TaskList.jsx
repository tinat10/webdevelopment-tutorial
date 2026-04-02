import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onToggle, onDelete, emptyMessage }) {
  if (tasks.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
