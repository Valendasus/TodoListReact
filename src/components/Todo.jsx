import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'
import Button from './Button'
import {TasksContext} from '../context/TasksContext'

export default function Todo() {
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
			<TasksContext.Provider value={{tasks, filteredTasks , firstIncompleteTaskRef, firstIncompleteTaskId , deleteAllTasks, deleteTask, toggleTaskComplete}}>
				<div className="todo">
					<h1 className="todo__title">To Do List</h1>
					<AddTaskForm 
						addTask={addTask}
						newTaskTitle={newTaskTitle}
						setNewTaskTitle={setNewTaskTitle}
						newTaskInputRef={newTaskInputRef}
					/>
					<SearchTaskForm 
						searchQuery = {searchQuery}
						setSearchQuery = {setSearchQuery}
					/>
					<TodoInfo	/>
					<Button 
						onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({ behavior: 'smooth'})}

					>
						Show first incomplete task
					</Button>
					<TodoList	/>
				</div>
			</TasksContext.Provider>
		)
}