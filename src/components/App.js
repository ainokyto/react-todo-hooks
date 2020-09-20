import React, { useState, useEffect } from 'react'
import './App.css'


//? Task Component for each individual task

function Task({ task, index, completeTask, removeTask }) { //? props being passed in Todo JSX
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }} //? inline style for task completion
    >
      {task.title}
      <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
      <button onClick={() => completeTask(index)}>Complete</button>
    </div>
  )
}

//? Todo Component to handle completing tasks and adding new ones 

//? useState returns an array with two elements

//? first item, the tasks object, being the current state value for the tasks
  //? two key-value pairs, one for title and the other for completion

//? second being a function that can be used to update the tasks

function Todo() {
  const [tasksRemaining, setTasksRemaining] = useState(0) //* Effect hook to update the state of tasksRemaining when the DOM re-renders
  const [tasks, setTasks] = useState([
    {
      title: "Grab some pizza",
      completed: true
    },
    {
      title: "Exercise",
      completed: true
    },
    {
      title: "Chill with mates",
      completed: false
    }
  ])

  //* Effect hook to update the state of tasksRemaining when the DOM re-renders

  useEffect(() => {
    setTasksRemaining(tasks.filter(task => !task.completed).length)
  }, [tasks])

  //? Method to handle adding new tasks
  //? uses spead operator and destructuring to push a new object into to the tasks state
  
  const addTask = title => {
    const newTasks = [...tasks, { title, completed: false }]
    setTasks(newTasks)
  }

  //? Method to handle completing tasks

  const completeTask = index => {
    const newTasks = [...tasks]
    newTasks[index].completed = true
    setTasks(newTasks)
  }

  //? Method to handle removing tasks

  const removeTask = index => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <div className="todo-container">
      <div className="header">Pending tasks ({tasksRemaining})</div>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
      <div className="create-task" >
          <CreateTask addTask={addTask} />
      </div>
    </div>
  )
}

function CreateTask({ addTask }) { // receives addTask method as prop
  const [value, setValue] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    if (!value) return null

    addTask(value) // event handler adds a new task using the latest value that's in the input field
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add a new task"
        onChange={event => setValue(event.target.value)}
      />
    </form>
  )
}


export default Todo