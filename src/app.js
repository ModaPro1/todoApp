import React from "react";
// List
import List from "./list";
// CSS
import './style.css'

export default function App() {
  // Empty Array To Store The Tasks
  const [arrayOfTasks, setArrayOfTasks] = React.useState([]);

  // Check if There is Tasks In Local Storage
  React.useEffect(() => {
    let items = localStorage.getItem("tasks")
    if (items) {
      setArrayOfTasks(JSON.parse(localStorage.getItem("tasks")))
    }
  }, [])
  // Handle Click Function
  function addTask() {
    if(!document.querySelector(".todo-input").value == "") { // Check if it isnt empty
      let currentDate = new Date()
      let day = currentDate.getDay() + "th"
      let month = currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
  
      let taskDate = Date.now()
      let taskText = document.querySelector(".todo-input").value
      let taskOutputDate = `${day} ${month}, ${year}`
      // Final Task Variable
      let task = {
        date: taskDate,
        text: taskText,
        outputDate: taskOutputDate,
        completed: false
      }
      // Set The Array
      setArrayOfTasks(prev => {
        return [
          ...prev,
          task
        ]
      })
    }
  }
  // When The State Changes
  React.useEffect(() => {
    // Set The Array To Local Storage
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
  }, [arrayOfTasks])

  return (
    <div className="container">
      <div className="app">
      <div className="header">
        <h2 className="primary">To-Do List By <span>Mahmoud</span></h2>
        <div className="inputs">
          <input type="text" placeholder="Add new .." className="todo-input"/>
          <button className="add" onClick={addTask}>Add</button>
        </div>
      </div>
      {
      arrayOfTasks.length == 0 ? "No Todos Found" :
            <div className="lists">
            {
              arrayOfTasks.map(task => {
                return (
                  <List
                    key={task.date}
                    id={task.date}
                    text={task.text}
                    date={task.outputDate}
                    completed={task.completed}
                    tasksArray={arrayOfTasks}
                    setTasksArray={setArrayOfTasks}
                  />
                )
              })
            }
          </div>}
      </div>
    </div>
  )
}