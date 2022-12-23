import React from "react"
export default function List(props) {
  const Swal = require('sweetalert2') // For Sweet Alert

  let tasksArray = props.tasksArray
  let listId = props.id
  function handleDel() {
    Swal.fire({
      title: `Are you sure ?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        tasksArray = tasksArray.filter(task => task.date != listId) // Return The Array Without the the current task
        props.setTasksArray(tasksArray) // Set The State
        localStorage.setItem("tasks", JSON.stringify(tasksArray))
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your Todo Item has been deleted.',
          timer: 2000
        })
      }
    })
  }
  function handleEdit() {
    Swal.fire({
      icon: 'info',
      title: `Change <span class='todoNameAlert'>${props.text}</span> Todo`,
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Change',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      },
      preConfirm: (login) => {
        let value = login // Value of The Input
        const newArr = tasksArray.map(obj => {
          if(obj.date == listId) {
            return {...obj, text: value} // Return the object data but overwrite on the text
          }
          return obj // you must add this to return the rest of objects
        })
        props.setTasksArray(newArr)
        localStorage.setItem("tasks", JSON.stringify(newArr))
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Edited!',
          text: 'Your Todo Item has been Edited.',
          timer: 2000
        })
      }
    })
  }
  function toggleCompleted(e) {
    e.target.checked = false
    Swal.fire({
      icon: 'info',
      title: `Are you sure ?`,
      text: "Do this if you Completed This Todo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, i completed it!',
      preConfirm: () => {
        const newArr = tasksArray.map(obj => {
          if(obj.date == listId) {
            return {...obj, completed: !obj.completed} // Return the object data but overwrite on the text
          }
          return obj // you must add this to return the rest of objects
        })
        props.setTasksArray(newArr)
        localStorage.setItem("tasks", JSON.stringify(newArr))
      }
    }).then((result) => {
      if (result.isConfirmed) {
        e.target.checked = true
        Swal.fire({
          icon: 'success',
          title: 'Edited!',
          text: 'Your Todo Item has been Edited.',
          timer: 2000
        })
      }
    })
  }
  return (
    <div className="list">
      <div className="text">
        
        {
        props.completed ? <input type="checkbox" defaultChecked disabled/> :
          <div className="checkbox-container">
            <input type="checkbox" onClick={(e) => toggleCompleted(e)}/>
          </div>
        }
        <p>{props.text}</p>
      </div>
      <div style={{display:"flex", gap:"10px"}} >
        <div className="time">
          <i className="fa-regular fa-hourglass-half"></i>
          <div className="date">
            {props.date}
          </div>
        </div>
        <button className="remove" onClick={handleDel}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button className="edit" onClick={handleEdit}>
          <i className="fa fa-pencil"></i>
        </button>
      </div>
    </div>
  )
}