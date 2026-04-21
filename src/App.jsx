import Router from './Router'
import TaskPage from './pages/TaskPage'
import TasksPage from './pages/TasksPage'

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/123': TaskPage,
    '*': () => <div>404 Page not found XD</div>
  }

  return (
    <Router routes={routes} />
  )
}

export default App
