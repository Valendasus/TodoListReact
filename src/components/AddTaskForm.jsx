import Field from './Field'
import Button from './Button'

export default function AddTaskForm({
		addTask, 
		newTaskTitle, 
		setNewTaskTitle,
		newTaskInputRef
	}) {
	const onSubmit = (event) => {
		event.preventDefault()
		addTask()
	}

	return (
		<form className="todo__form" onSubmit={onSubmit}>
      <Field 
				className='todo__field'
				label='New task'
				id='new-task'
				type='text'
				value={newTaskTitle}
				onInput={(event) => setNewTaskTitle(event.target.value)}
				ref={newTaskInputRef}
			/>
      <Button type='submit'>Add</Button>
    </form>
	)
}