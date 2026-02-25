import { useState } from 'react'
import { sileo, Toaster } from "sileo";
import triste from './assets/triste.png'
import add_icon from './assets/icon_plus.png'
import './App.css'

import TaskItem from './components/TaskItem';
import PopUpItem from './components/PopUpItem';

function App() {

  const [taskList, setTaskList] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [taskFilter, setTaskFilter] = useState('')
  const [showPopupAddTask, setShowPopupAddTask] = useState(false)
  
  const addTask = (name, date, description) => {
    const newList = [...taskList, {name: name, complete:false, date: date, description: description}]
    setTaskList(newList)
    setShowPopupAddTask(false)
    sileo.success({ 
      title: "Tarea añadida",
      fill: "#171717",
    });
  }

  const deleteTask = (event, taskIndex) => {
    event.stopPropagation()
    const listUpdate = [...taskList]
    listUpdate.splice(taskIndex, 1)
    setTaskList(listUpdate)

    sileo.success({ 
      title: "Tarea borrada",
      fill: "#171717",
    });
  }

  const editTask = (event, taskIndex, newName) => {
    event.stopPropagation()
    const listUpdate = [...taskList]
    listUpdate[taskIndex].name =  newName
    setTaskList(listUpdate)
    sileo.success({ 
      title: "Tarea editada",
      fill: "#171717",
    });
  }

  const deleteAllTasks = () => {
    const listUpdate = []
    setTaskList(listUpdate)
    sileo.success({ 
      title: "Todas las tareas borradas",
      fill: "#171717",
    });
  }

  const toggleStatusTask = (taskIndex) => {
    const listUpdate = [...taskList]
    listUpdate[taskIndex].complete= !listUpdate[taskIndex].complete
    const toggleTask = listUpdate[taskIndex]

    listUpdate.splice(taskIndex, 1)
    toggleTask.complete ? listUpdate.push(toggleTask) : listUpdate.unshift(toggleTask)

    setTaskList(listUpdate)
  }

  const searchTask = (word) => {
    if(word === ''){
      setSearchWord('')
      setTaskFilter('')
      return
    }
    setSearchWord(word)
    setTaskFilter('buscador')
    
  }

  return (
    <>
      
      <div className='todo-list'>
        <h1 className='todo-list__tittle'>Tu peak de productividad 🔥</h1>

        <div className='todo-list__options'>
          <input type="text" onInput={(event) => searchTask(event.target.value)} className='todo-list__options--search todo-list__input' placeholder='Busca tu tarea...'/> 

          <select className='todo-list__options--filter todo-list__button' onChange={(event) => setTaskFilter(event.target.value)}>
            <option value="">Todas</option>
            <option value="completas">Completadas</option>
            <option value="pendientes">Por hacer</option>
          </select>
        </div>
        
        {taskList.length === 0 ? (
          <div className='todo-list__empty'>
            <img src={triste} alt="Triste" className='todo-list__empty--img'/>
            <h3 className='todo-list__empty--title'>Tu lista de tareas esta vacía</h3>
            <p className='todo-list__empty--subtitle'>Empieza a cotizar</p>
          </div>
        ) : (<ul className='todo-list__items'> {
            taskList.filter(task => {
              if (taskFilter === "completas") return task.complete;
              if (taskFilter === "pendientes") return !task.complete;
              if (taskFilter === "buscador") return (task.name).startsWith(searchWord);
              return true;
            }).map((task, index) => (
          <TaskItem taskName={task.name} taskComplete={task.complete} taskDate={task.date} taskDescription={task.description} taskIndex={index} deleteTask={deleteTask} editTask={editTask} toggleStatusTask={toggleStatusTask}></TaskItem>
        ))}</ul>)}

        <button className='todo-list__delete--button todo-list__button' onClick={() => deleteAllTasks()}>Borrar todas las tareas ({taskList.length})</button>
        <button className='todo-list__btn--anyadir' onClick={() => setShowPopupAddTask(true)}><img src={add_icon}></img></button>
      </div>

      {showPopupAddTask && (
        <PopUpItem setShowPopupAddTask={setShowPopupAddTask} addTask={addTask}></PopUpItem>
      )}

      <Toaster position="top-right" />
    </>
  )
}

export default App
