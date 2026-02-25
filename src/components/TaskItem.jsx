import { useState } from 'react'

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

export default TaskItem