
import { useState } from 'react'
import {
  FaPlus,
  FaTrash,
  FaCheck,
  FaMoon,
  FaSun
} from 'react-icons/fa'

function App() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  const addTask = () => {
    if (input.trim() === '') return

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInput('')
  }

  const deleteTask = (id) => {
    const filtered = tasks.filter(task => task.id !== id)
    setTasks(filtered)
  }

  const toggleComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )

    setTasks(updated)
  }

  const clearAll = () => {
    setTasks([])
  }

  const completedCount = tasks.filter(task => task.completed).length

  return (
    <div className={darkMode ? 'app dark' : 'app light'}>
      <aside className="sidebar">
        <h2>TaskFlow</h2>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{tasks.length}</p>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completedCount}</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>Professional Task Manager</h1>
            <p>
              Modern React application without API integration.
            </p>
          </div>
        </header>

        <section className="hero">
          <h2>Manage Your Productivity 🚀</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask()
                }
              }}
            />

            <button onClick={addTask}>
              <FaPlus />
            </button>
          </div>
        </section>

        <section className="task-section">
          <div className="task-header">
            <h2>Your Tasks</h2>

            {tasks.length > 0 && (
              <button className="clear-btn" onClick={clearAll}>
                Clear All
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="empty">
              <h3>No Tasks Yet</h3>
              <p>Add your first task to get started.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={
                    task.completed
                      ? 'task completed'
                      : 'task'
                  }
                >
                  <div className="task-info">
                    <h3>{task.text}</h3>
                  </div>

                  <div className="task-actions">
                    <button
                      className="complete-btn"
                      onClick={() => toggleComplete(task.id)}
                    >
                      <FaCheck />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
