import { useState } from 'react'
import { sileo, Toaster } from "sileo";
import triste from './assets/triste.png'
import add_icon from './assets/icon_plus.png'
import './App.css'

import TaskItem from './components/TaskItem';
import PopUpItem from './components/PopUpItem';

function App() {

  const [listaTareas, setListaTareas] = useState([])
  const [palabraBuscar, setPalabraBuscar] = useState('')
  const [filtroTarea, setFiltroTarea] = useState('')
  const [showPopupAddTask, setShowPopupAddTask] = useState(false)
  
  const addTarea = (name, date, description) => {
    const newList = [...listaTareas, {nombre: name, complete:false, fecha: date, descripcion: description}]
    setListaTareas(newList)
    setShowPopupAddTask(false)
    sileo.success({ 
      title: "Tarea añadida",
      fill: "#171717",
    });
  }

  const deleteTask = (event, indexTarea) => {
    event.stopPropagation()
    const completeList = [...listaTareas]
    completeList.splice(indexTarea, 1)
    setListaTareas(completeList)
    sileo.success({ 
      title: "Tarea borrada",
      fill: "#171717",
    });
  }

  const editTask = (event, indexTarea, nuevoNombre) => {
    event.stopPropagation()
    const completeList = [...listaTareas]
    completeList[indexTarea].nombre =  nuevoNombre
    setListaTareas(completeList)
    sileo.success({ 
      title: "Tarea editada",
      fill: "#171717",
    });
  }

  const deleteAllTasks = () => {
    const deleteList = []
    setListaTareas(deleteList)
    sileo.success({ 
      title: "Todas las tareas borradas",
      fill: "#171717",
    });
  }

  const toggleStatusTask = (indexTarea) => {
    const completeList = [...listaTareas]
    completeList[indexTarea].complete= !completeList[indexTarea].complete
    const toggleTask = completeList[indexTarea]

    completeList.splice(indexTarea, 1)
    toggleTask.complete ? completeList.push(toggleTask) : completeList.unshift(toggleTask)

    setListaTareas(completeList)
  }

  const buscarTarea = (palabra) => {
    console.log(palabra)
    if(palabra === ''){
      setPalabraBuscar('')
      setFiltroTarea('')
      return
    }
    setPalabraBuscar(palabra)
    setFiltroTarea('buscador')
    
  }

  return (
    <>
      
      <div className='todo-list'>
        <h1 className='todo-list__tittle'>Tu peak de productividad 🔥</h1>

        <div className='todo-list__options'>
          <input type="text" onInput={(event) => buscarTarea(event.target.value)} className='todo-list__options--search todo-list__input' placeholder='Busca tu tarea...'/> 

          <select className='todo-list__options--filter todo-list__button' onChange={(event) => setFiltroTarea(event.target.value)}>
            <option value="">Todas</option>
            <option value="completas">Completadas</option>
            <option value="pendientes">Por hacer</option>
          </select>
        </div>
        
        {listaTareas.length === 0 ? (
          <div className='todo-list__empty'>
            <img src={triste} alt="Triste" className='todo-list__empty--img'/>
            <h3 className='todo-list__empty--title'>Tu lista de tareas esta vacía</h3>
            <p className='todo-list__empty--subtitle'>Empieza a cotizar</p>
          </div>
        ) : (<ul className='todo-list__items'> {
            listaTareas.filter(tarea => {
              if (filtroTarea === "completas") return tarea.complete;
              if (filtroTarea === "pendientes") return !tarea.complete;
              if (filtroTarea === "buscador") return (tarea.nombre).startsWith(palabraBuscar);
              return true;
            }).map((tarea, index) => (
          <TaskItem tareaName={tarea.nombre} tareaComplete={tarea.complete} tareaFecha={tarea.fecha} tareaDescripcion={tarea.descripcion} indexTarea={index} deleteTask={deleteTask} editTask={editTask} toggleStatusTask={toggleStatusTask}></TaskItem>
        ))}</ul>)}

        <button className='todo-list__delete--button todo-list__button' onClick={() => deleteAllTasks()}>Borrar todas las tareas ({listaTareas.length})</button>
        <button className='todo-list__btn--anyadir' onClick={() => setShowPopupAddTask(true)}><img src={add_icon}></img></button>
      </div>

      {showPopupAddTask && (
        <PopUpItem setShowPopupAddTask={setShowPopupAddTask} addTarea={addTarea}></PopUpItem>
      )}

      <Toaster position="top-right" />
    </>
  )
}

export default App
