import { createContext, useState, useRef, useCallback, useEffect, useMemo } from 'react';

export const TasksContext = createContext({})

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState(() => {
			const savedTasks = localStorage.getItem('tasks')
	
			if (savedTasks) {
				return JSON.parse(savedTasks)
			} 
		
			return (
				[
					{id: 1, title: 'Task 1', isDone: false},
					{id: 2, title: 'Task 2', isDone: true},
					{id: 3, title: 'Task 3', isDone: false},
				]
			)
		})
	
		const [newTaskTitle, setNewTaskTitle] = useState('')
		const [searchQuery, setSearchQuery] = useState('')
	
		const newTaskInputRef = useRef(null)
		const firstIncompleteTaskRef = useRef(null)
		const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id
	
		const deleteAllTasks = useCallback(() => {
			const isConfirmed = confirm('Are you sure you want to delete all tasks?')
			if (isConfirmed) {
				setTasks([])
			}
		}, [])
	
		const deleteTask = useCallback((taskId) => {
			setTasks(
				tasks.filter((task) => task.id !== taskId)
			)
		}, [tasks])
	
		const toggleTaskComplete = useCallback((taskId, isDone) => {
			setTasks(
				tasks.map((task) => task.id === taskId ? {...task, isDone} : task)
			)
		}, [tasks])
	
		const addTask = useCallback(() => {
			if (newTaskTitle.trim().length > 0) {
				const newTask = {
					id: crypto?.randomUUID() ?? Date.now().toString(),
					title: newTaskTitle,
					isDone: false
				}
				setTasks((prevTasks) => [...prevTasks, newTask])
				setNewTaskTitle('')
				setSearchQuery('')
				
				newTaskInputRef.current.focus()
			}
		}, [newTaskTitle])
	
		useEffect(() => {
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}, [tasks])
	
		useEffect(() => {
			newTaskInputRef.current.focus()
		}, [])
	
		const filteredTasks = useMemo(() => {
			const clearSearchQuery = searchQuery.trim().toLocaleLowerCase()
	
			return (
				clearSearchQuery.length > 0
				? tasks.filter(({ title }) => title.toLocaleLowerCase().includes(clearSearchQuery))
				: null)
		}, [tasks, searchQuery])
	

	return (
				<TasksContext.Provider value={{tasks, filteredTasks , firstIncompleteTaskRef, firstIncompleteTaskId , deleteAllTasks, deleteTask, toggleTaskComplete, newTaskTitle, setNewTaskTitle, searchQuery, setSearchQuery, newTaskInputRef, addTask}}>
					{children}
				</TasksContext.Provider>
			)

}