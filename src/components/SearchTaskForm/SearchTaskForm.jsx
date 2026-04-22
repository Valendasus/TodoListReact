import { useContext } from 'react'
import { TasksContext } from '../../context/TasksContext'
import Field from '../Field/Field'

export default function SearchTaskForm({ styles }) {
	const { searchQuery, setSearchQuery } = useContext(TasksContext)

	return (
		<form className={styles.form} onSubmit={event => event.preventDefault()}>
			<Field
				className={styles.field}
				label='Search task'
				id='search-task'
				type='search'
				value={searchQuery}
				onInput={event => setSearchQuery(event.target.value)}
			/>
		</form>
	)
}
