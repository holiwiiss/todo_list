import close_icon from '../assets/icon_close.png'
import { useState } from 'react'

function PopUpItem ({setShowPopupAddTask, addTarea}) {

  const [nombreTarea, setNombreTarea] = useState('')
  const [fechaTarea, setFechaTarea] = useState('')
  const [descripcionTarea, setDescripcionTarea] = useState('')
  const [erroresPopUpAddTask, setErroresPopUpAddTask] = useState({errorName: '', errorDate: ''})

  const verifyInputs = () => {

    const erroresDefinitivos = {...erroresPopUpAddTask}
    let contador = 0

    //comprobar si el nombre de la tarea es correcto
    if(nombreTarea==="" ){
      contador ++
      erroresDefinitivos.errorName = 'Introduce un nombre valido'
    }else{
      erroresDefinitivos.errorName= ''
    }

    //comprobar si la fecha de la tarea es correcto
    if(fechaTarea===""){
      contador++
      erroresDefinitivos.errorDate= 'Introduce una fecha valida'
    }else {
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      const fechaElegida = new Date(fechaTarea)
      erroresDefinitivos.errorDate = ''

      //comprobar que la fecha no sea anterior a la de hoy
      if (fechaElegida < hoy) {
        contador++
        erroresDefinitivos.errorDate = 'La fecha no puede ser anterior a hoy'
      }else{
      erroresDefinitivos.errorDate = ''
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
          <span className='error__form'>{erroresPopUpAddTask.errorName}</span>

          <label>Fecha limite*</label>
          <input type='date' className='todo-list__input popUpAdd__container--input' onInput={(event) => setFechaTarea(event.target.value)} required></input>
          <span className='error__form'>{erroresPopUpAddTask.errorDate}</span>

          <label>Descripcion</label>
          <input type='text' className='todo-list__input popUpAdd__container--input' onInput={(event) => setDescripcionTarea(event.target.value)} placeholder='Introduce una descripcion'></input>
        </div>

        <button onClick={() => verifyInputs()} className='todo-list__button'>Añadir tarea</button>
      </div>
    </div>
  )
}

export default PopUpItem