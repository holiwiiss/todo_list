import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import triste from './assets/triste.png'
import './App.css'

function TaskItem({tareaName, tareaComplete, tareaFecha, tareaDescripcion, indexTarea, deleteTask, editTask, toggleStatusTask}){

  return (
    <li key={indexTarea} onClick={() => toggleStatusTask(indexTarea)} className={`todo-list__task ${tareaComplete ? 'todo-list__task--completed' : ''}`}>
      <div className='todo-list__task--info'>
        <div className='todo-list__checkbox-label'></div>
        <div className='todo-list__task--description'>
          <div className='todo-list__row'>
            <h3 className='todo-list__task--description--title'>{tareaName}</h3>
            <p className='todo-list__task--description--date'>{tareaFecha}</p>
          </div>
          <p className='todo-list__task--description--description'>{tareaDescripcion} </p>
        </div>
      </div>
      <div className='todo-list__task-buttons'>
        <button onClick={(event) => editTask(event, indexTarea, 'sacar la basura')} className='todo-list__button'>Editar</button>
        <button onClick={(event) => deleteTask(event, indexTarea)} className='todo-list__button'>Borrar</button>
      </div>
    </li>
  )
}

function App() {

  const [listaTareas, setListaTareas] = useState([])
  const [nombreTarea, setNombreTarea] = useState('')
  const [fechaTarea, setFechaTarea] = useState('')
  const [descripcionTarea, setDescripcionTarea] = useState('')
  const [palabraBuscar, setPalabraBuscar] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  const [filtroTarea, setFiltroTarea] = useState('')
  const [numeroTareas, setNumeroTareas] = useState(0)
  const [showPopupAddTask, setShowPopupAddTask] = useState(false)

  const addTarea = () => {
    if(nombreTarea===""){return}

    const newList = [...listaTareas, {nombre: nombreTarea, complete:false, fecha: fechaTarea, descripcion: descripcionTarea}]
    setListaTareas(newList)
    setNumeroTareas(newList.length)
    setShowPopupAddTask(false)
  }

  const deleteTask = (event, indexTarea) => {
    event.stopPropagation()
    const completeList = [...listaTareas]
    completeList.splice(indexTarea, 1)
    setListaTareas(completeList)
    setNumeroTareas(completeList.length)
  }

  const editTask = (event, indexTarea, nuevoNombre) => {
    event.stopPropagation()
    const completeList = [...listaTareas]
    completeList[indexTarea].nombre =  nuevoNombre
    setListaTareas(completeList)
  }

  const deleteAllTasks = () => {
    const deleteList = []
    setListaTareas(deleteList)
    setNumeroTareas(deleteList.length)
  }

  const toggleStatusTask = (indexTarea) => {
    const completeList = [...listaTareas]
    completeList[indexTarea].complete= !completeList[indexTarea].complete
    setListaTareas(completeList)
    console.log(completeList)
  }

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    setFiltroTarea(e.target.value)
  };

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

          <select className='todo-list__options--filter todo-list__button' value={selectedValue} onChange={handleChange}>
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
                if (filtroTarea === "buscador") return (tarea.nombre).startsWith(palabraBuscar)
                return true;
          }).map((tarea, index) => (
            <TaskItem tareaName={tarea.nombre} tareaComplete={tarea.complete} tareaFecha={tarea.fecha} tareaDescripcion={tarea.descripcion} indexTarea={index} deleteTask={deleteTask} editTask={editTask} toggleStatusTask={toggleStatusTask}></TaskItem>
          ))}</ul>)}

          <button className='todo-list__delete--button todo-list__button' onClick={() => deleteAllTasks()}>Borrar todas las tareas ({numeroTareas})</button>
          <button className='todo-list__btn--anyadir' onClick={() => setShowPopupAddTask(true)}>+</button>
        </div>

        {showPopupAddTask && (
          <div className='bg-blur' onClick={() => setShowPopupAddTask(false)}>

            <div className='popUpAdd__container' onClick={(e) => e.stopPropagation()}>

              <div className='popUpAdd__container--row'>
                <h2 className='popUpAdd__container--title' >Añade tu tarea</h2>
                <img src='#' className='popUpAdd__container--close' onClick={() => setShowPopupAddTask(false)}></img>
              </div>

              <div className='popUpAdd__container--form'>
                <label>Nombre*</label>
                <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setNombreTarea(event.target.value)} placeholder='Introduce el nombre de tu tarea' required></input>

                <label>Fecha limite*</label>
                <input type='date' className='todo-list__input popUpAdd__container--input' onInput={(event) => setFechaTarea(event.target.value)} required></input>

                <label>Descripcion</label>
                <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setDescripcionTarea(event.target.value)} placeholder='Introduce una descripcion'></input>
              </div>

              <button onClick={() => addTarea()} className='todo-list__button'>Añadir tarea</button>
            </div>
          </div>

        )}

        
    </>
  )
}

export default App
