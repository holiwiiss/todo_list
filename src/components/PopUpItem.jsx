import close_icon from '../assets/icon_close.png'
import { useState } from 'react'
import { sileo, Toaster } from "sileo";

function PopUpItem ({setShowPopupAddTask, addTask}) {

  const [taskName, setTaskName] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
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
      addTask(taskName, taskDate, taskDescription)
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
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setTaskName(event.target.value)} placeholder='Introduce el nombre de tu tarea' required></input>
          <span className='error__form'>{errorPopUpAddTask.errorName}</span>

          <label>Fecha limite*</label>
          <input type='date' className='todo-list__input popUpAdd__container--input' onInput={(event) => setTaskDate(event.target.value)} required></input>
          <span className='error__form'>{errorPopUpAddTask.errorDate}</span>

          <label>Descripcion</label>
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setTaskDescription(event.target.value)} placeholder='Introduce una descripcion'></input>
        </div>

        <button onClick={() => verifyInputs()} className='todo-list__button'>Añadir tarea</button>
      </div>
    </div>
  )
}

export default PopUpItem