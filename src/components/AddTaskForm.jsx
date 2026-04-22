import { useContext, useState } from 'react'
import { TasksContext } from '../context/TasksContext'
import Button from './Button/Button'
import Field from './Field'

export default function AddTaskForm() {
	const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
		useContext(TasksContext)

	const [error, setError] = useState('')

	const clearNewTaskTitle = newTaskTitle.trim()
	const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

	const onSubmit = event => {
		event.preventDefault()
		if (!isNewTaskTitleEmpty) {
			addTask(clearNewTaskTitle)
		}
	}

	const onInput = event => {
		const { value } = event.target
		const clearValue = value.trim()
		const hasOnlySpaces = value.length > 0 && clearValue.length === 0

		setNewTaskTitle(value)
		setError(hasOnlySpaces ? 'The task cannot be empty' : '')
	}

	return (
		<form className='todo__form' onSubmit={onSubmit}>
			<Field
				className='todo__field'
				label='New task'
				id='new-task'
				type='text'
				error={error}
				value={newTaskTitle}
				onInput={onInput}
				ref={newTaskInputRef}
			/>
			<Button type='submit' isDisabled={isNewTaskTitleEmpty}>
				Add
			</Button>
		</form>
	)
}
