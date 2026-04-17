import TodoItem from './TodoItem'
import { memo, useContext } from 'react'
import {TasksContext} from '../context/TasksContext'

export default memo(function TodoList() {
  const { tasks, filteredTasks } = useContext(TasksContext)

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return (
      <div className="todo__empty-message">There are no tasks yet</div>
    )
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">There are no tasks matching your search query</div>
    )
  }

	return (
			<ul className="todo__list">
        {(filteredTasks ?? tasks).map((task) => (
          <TodoItem 
            className='todo__item' 
            key={task.id}
            {...task}
          />
        ))}
      </ul>
	)
})