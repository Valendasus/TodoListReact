import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext'
import AddTaskForm from './AddTaskForm'
import Button from './Button/Button'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'

export default function Todo() {
	const { firstIncompleteTaskRef } = useContext(TasksContext)

	return (
		<div className='todo'>
			<h1 className='todo__title'>To Do List</h1>
			<AddTaskForm />
			<SearchTaskForm />
			<TodoInfo />
			<Button
				onClick={() =>
					firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth' })
				}
			>
				Show first incomplete task
			</Button>
			<TodoList />
		</div>
	)
}
