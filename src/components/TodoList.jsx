import { useState } from 'react'

let nextId = 1

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [draft, setDraft] = useState('')

  function addTodo(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [...prev, { id: nextId++, text, done: false }])
    setDraft('')
  }

  function toggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function remove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className="todo">
      <h2>Todo</h2>
      <form onSubmit={addTodo} className="todo-form">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New todo"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-items">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggle(todo.id)}
              />
              {todo.text}
            </label>
            <button
              type="button"
              aria-label="Remove todo"
              onClick={() => remove(todo.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && <p className="todo-count">{remaining} remaining</p>}
    </div>
  )
}
