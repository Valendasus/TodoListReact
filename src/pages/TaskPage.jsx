import { useState } from 'react'

const TaskPage = () => {
	const taskId = '123'
	const [task, setTask] = useState(null)

	return (
		<div>
			<h1>Детали задачи</h1>
			{/* загрузка данных по задаче по айдишнику */}
		</div>
	)
}

export default TaskPage