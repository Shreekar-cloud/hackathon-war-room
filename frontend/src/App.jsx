import { useEffect, useState } from 'react'
import { addProject, getHealth, getProjects } from './services/api'

export default function App() {
  const [health, setHealth] = useState(null)
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function refresh() {
    try {
      const [status, data] = await Promise.all([getHealth(), getProjects()])
      setHealth(status)
      setProjects(data.items || [])
      setError('')
    } catch (err) {
      setError(err.message)
      setHealth(null)
    }
  }

  useEffect(() => { refresh() }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError('')
    try {
      await addProject({ name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
      await refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="shell">
      <nav className="nav">
        <a className="brand" href="/"> <span className="brand-mark">W</span> War Room</a>
        <span className="nav-tag">24-HOUR BUILD MODE</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">YOUR TEAM'S STARTING POINT</p>
        <h1>Build something<br /><span>that matters.</span></h1>
        <p className="hero-copy">A clean foundation for turning a problem statement into a working product. Replace this demo workspace with your solution.</p>
        <div className="status-row">
          <span className={`status-dot ${health ? 'online' : ''}`} />
          {health ? `API connected · ${health.environment}` : 'Connecting to API…'}
          {health && <span className="status-extra">· Supabase {health.supabase_configured ? 'configured' : 'not configured'}</span>}
        </div>
      </section>

      {error && <div className="alert" role="alert">{error}</div>}

      <section className="workspace">
        <div className="section-heading">
          <div><p className="eyebrow">WORKSPACE</p><h2>Project board</h2></div>
          <span className="count">{projects.length} PROJECTS</span>
        </div>

        <div className="grid">
          <form className="panel form-panel" onSubmit={handleSubmit}>
            <div className="panel-icon">＋</div>
            <h3>Create a project</h3>
            <p className="muted">A sample form wired to FastAPI and Supabase.</p>
            <label>Project name<input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Smart City Assistant" maxLength={120} required /></label>
            <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What problem are you solving?" maxLength={1000} rows={3} /></label>
            <button disabled={loading}>{loading ? 'Saving…' : 'Add to workspace'} <span>→</span></button>
          </form>

          <div className="project-list">
            {projects.length === 0 ? (
              <div className="empty panel"><div className="empty-mark">✳</div><h3>Your workspace is clear</h3><p className="muted">Create your first project to test the full stack.</p></div>
            ) : projects.map(project => (
              <article className="project-card panel" key={project.id}>
                <div className="project-symbol">◈</div>
                <div><h3>{project.name}</h3><p className="muted">{project.description || 'No description yet.'}</p></div>
                <span className="project-arrow">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer><span>HACKATHON WAR ROOM</span><span>React · FastAPI · Supabase</span></footer>
    </main>
  )
}
