import close_icon from '../assets/icon_close.png'
import { useState } from 'react'
import { sileo, Toaster } from "sileo";

function PopUpItem ({closePopUp, addTask, editTask, taskEditing}) {

  const [taskName, setTaskName] = useState(taskEditing?.name || '')
  const [taskDate, setTaskDate] = useState(taskEditing?.date || '')
  const [taskDescription, setTaskDescription] = useState(taskEditing?.description || '')
  const [errorPopUpAddTask, setErrorPopUpAddTask] = useState({errorName: '', errorDate: ''})

  const verifyInputs = () => {

    const errorsUpdate = {...errorPopUpAddTask}
    let cont = 0

    //comprobar si el nombre de la tarea es correcto
    if(taskName==="" ){
      cont ++
      errorsUpdate.errorName = 'Introduce un nombre valido'
    }else{
      errorsUpdate.errorName= ''
    }

    //comprobar si la fecha de la tarea es correcto
    if(taskDate===""){
      cont++
      errorsUpdate.errorDate= 'Introduce una fecha valida'
    }else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dateSelected = new Date(taskDate)
      errorsUpdate.errorDate = ''

      //comprobar que la fecha no sea anterior a la de hoy
      if (dateSelected < today) {
        cont++
        errorsUpdate.errorDate = 'La fecha no puede ser anterior a hoy'
      }else{
      errorsUpdate.errorDate = ''
      }
    }
    
    //actualizar si hay algun error
    if(cont>0){
      setErrorPopUpAddTask(errorsUpdate)
      sileo.error({
        title: "No se puede crear la tarea",
        fill: "#171717",
      });
      return
    //llamar a la creación de tarea
    }else{
      setErrorPopUpAddTask(errorsUpdate)
      if (taskEditing) {
        editTask(taskEditing.id, taskName, taskDate, taskDescription)
      } else {
        addTask(taskName, taskDate, taskDescription)
      }
    }
  }

  return (
    <div className='bg-blur' onClick={closePopUp}>
      <div className='popUpAdd__container' onClick={(e) => e.stopPropagation()}>

        <div className='popUpAdd__container--row'>
          <h2 className='popUpAdd__container--title'>{taskEditing ? 'Edita tu tarea' : 'Añade tu tarea'}</h2>
          <img src={close_icon} className='popUpAdd__container--close' onClick={closePopUp}></img>
        </div>

        <div className='popUpAdd__container--form'>
          <label>Nombre*</label>
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setTaskName(event.target.value)} value={taskName} placeholder='Introduce el nombre de tu tarea' required></input>
          <span className='error__form'>{errorPopUpAddTask.errorName}</span>

          <label>Fecha limite*</label>
          <input type='date' className='todo-list__input popUpAdd__container--input' onInput={(event) => setTaskDate(event.target.value)} value={taskDate} required></input>
          <span className='error__form'>{errorPopUpAddTask.errorDate}</span>

          <label>Descripcion</label>
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setTaskDescription(event.target.value)} value={taskDescription} placeholder='Introduce una descripcion'></input>
        </div>

        <button onClick={() => verifyInputs()} className='todo-list__button'>{taskEditing ? 'Guardar cambios' : 'Añadir tarea'}</button>
      </div>
    </div>
  )
}

export default PopUpItem