import { memo, useContext } from 'react'
import { TasksContext } from '../../context/TasksContext'
import TodoItem from '../TodoItem/TodoItem'

export default memo(function TodoList({styles}) {
	const { tasks, filteredTasks } = useContext(TasksContext)

	const hasTasks = tasks.length > 0
	const isEmptyFilteredTasks = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className={styles.emptyMessage}>There are no tasks yet</div>
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return (
			<div className={styles.emptyMessage}>
				There are no tasks matching your search query
			</div>
		)
	}

	return (
		<ul className={styles.list}>
			{(filteredTasks ?? tasks).map(task => (
				<TodoItem className={styles.item} key={task.id} {...task} />
			))}
		</ul>
	)
})
