export default function Header({ title, children }) {
  return (
    <header className="app-header">
      <h1 className="app-title">{title}</h1>
      {children}
    </header>
  )
}
