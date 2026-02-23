import { useState } from 'react'
import { sileo, Toaster } from "sileo";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import triste from './assets/triste.png'
import add_icon from './assets/icon_plus.png'
import close_icon from './assets/icon_close.png'
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

function PopUpItem ({setShowPopupAddTask, addTarea}) {

  const [nombreTarea, setNombreTarea] = useState('')
  const [fechaTarea, setFechaTarea] = useState('')
  const [descripcionTarea, setDescripcionTarea] = useState('')
  const [erroresPopUpAddTask, setErroresPopUpAddTask] = useState(['',''])

  const verifyInputs = () => {

    const erroresDefinitivos = [...erroresPopUpAddTask]
    let contador = 0

    //comprobar si el nombre de la tarea es correcto
    if(nombreTarea==="" ){
      contador ++
      erroresDefinitivos[0] = 'Introduce un nombre valido'
    }else{
      erroresDefinitivos[0]= ''
    }

    //comprobar si la fecha de la tarea es correcto
    if(fechaTarea===""){
      contador++
      erroresDefinitivos[1] = 'Introduce una fecha valida'
    }else {
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      const fechaElegida = new Date(fechaTarea)
      erroresDefinitivos[1] = ''

      //comprobar que la fecha no sea anterior a la de hoy
      if (fechaElegida < hoy) {
        contador++
        erroresDefinitivos[1] = 'La fecha no puede ser anterior a hoy'
      }else{
      erroresDefinitivos[1] = ''
      }
    }
    
    //actualizar si hay algun error
    if(contador>0){
      setErroresPopUpAddTask(erroresDefinitivos)
      sileo.error({
        title: "No se puede crear la tarea",
        fill: "#171717",
      });
      return
    //llamar a la creación de tarea
    }else{
      setErroresPopUpAddTask(erroresDefinitivos)
      addTarea(nombreTarea, fechaTarea, descripcionTarea)
    }
  }

  return (
    <div className='bg-blur' onClick={() => setShowPopupAddTask(false)}>
      <div className='popUpAdd__container' onClick={(e) => e.stopPropagation()}>

        <div className='popUpAdd__container--row'>
          <h2 className='popUpAdd__container--title' >Añade tu tarea</h2>
          <img src={close_icon} className='popUpAdd__container--close' onClick={() => setShowPopupAddTask(false)}></img>
        </div>

        <div className='popUpAdd__container--form'>
          <label>Nombre*</label>
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setNombreTarea(event.target.value)} placeholder='Introduce el nombre de tu tarea' required></input>
          <span className='error__form'>{erroresPopUpAddTask[0]}</span>

          <label>Fecha limite*</label>
          <input type='date' className='todo-list__input popUpAdd__container--input' onInput={(event) => setFechaTarea(event.target.value)} required></input>
          <span className='error__form'>{erroresPopUpAddTask[1]}</span>

          <label>Descripcion</label>
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setDescripcionTarea(event.target.value)} placeholder='Introduce una descripcion'></input>
        </div>

        <button onClick={() => verifyInputs()} className='todo-list__button'>Añadir tarea</button>
      </div>
    </div>
  )
}

function App() {

  const [listaTareas, setListaTareas] = useState([])
  const [palabraBuscar, setPalabraBuscar] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
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
    if(!toggleTask.complete){
      completeList.splice(indexTarea,1)
      completeList.unshift(toggleTask)
    }else{
      completeList.splice(indexTarea,1)
      completeList.push(toggleTask)
    }
    setListaTareas(completeList)
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
