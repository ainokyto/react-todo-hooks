import React, { useState } from 'react'
import './Todo.css'

//? component for each individual task

function Task({ task, index, completeTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
      {task.title}
      <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
      <button onClick={() => completeTask(index)}>Complete</button>
    </div>
  )
}

//? Component to handle completing tasks and adding new ones 

//? useState returns an array with two elements
//? first item, tasks object, being the current state value for the tasks
  //? two key-value pairs, one for title and the other for completion
//? second being a function that can be used to update the tasks

function Todo() {
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
      <div className="header">TODO - ITEMS</div>
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
      <div classname="create-task" >
          <CreateTask addTask={addTask} />
      </div>
    </div>
  )
}

function CreateTask({ addTask }) { // receives a prop addTask, a function that adds a new task to the tasks state
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return

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
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}


export default Todo