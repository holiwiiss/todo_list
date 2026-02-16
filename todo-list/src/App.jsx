import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import triste from './assets/triste.png'
import './App.css'

function TaskItem({tareaName, indexTarea, deleteTask, editTask}){

  return (
    <div key={indexTarea} className='tarea__container'>
      <p>{tareaName}</p>
      <div className='tarea__container--botones'>
        <button onClick={() => editTask(indexTarea, 'sacar la basura')}>Editar</button>
        <button onClick={() => deleteTask(indexTarea)}>Borrar</button>
      </div>
    </div>
  )
}

function App() {

  const [listaTareas, setListaTareas] = useState([])
  const [nombreTarea, setNombreTarea] = useState('')

  const addTarea = () => {
    const newList = [...listaTareas, nombreTarea]
    setListaTareas(newList)
  }

  const getNameTarea = (value) => {
    setNombreTarea(value)
  }

  const deleteTask = (indexTarea) => {
    const completeList = [...listaTareas]
    completeList.splice(indexTarea, 1)
    setListaTareas(completeList)
  }

  const editTask = (indexTarea, nuevoNombre) => {
    const completeList = [...listaTareas]
    completeList[indexTarea] =  nuevoNombre
    setListaTareas(completeList)
  }

  return (
    <>

      <div className='allTask__container'>
        <h1> Bienvenido a tu todo list</h1>
        <input type="text" onInput={() => getNameTarea(event.target.value)}/> 
        <button onClick={() => addTarea()}>Añadir tarea</button>

        
          {listaTareas.length === 0 ? (
            <div className='empty__container'>
              {triste}
              <h3>Tu lista de tareas esta vacía</h3>
              <p>Empieza a cotizar</p>
            </div>
            ) : (<ul> {listaTareas.map((tarea, index) => (
            <TaskItem tareaName={tarea} indexTarea={index} deleteTask={deleteTask} editTask={editTask} ></TaskItem>
          ))}</ul>)}
        </div>
    </>
  )
}

export default App
