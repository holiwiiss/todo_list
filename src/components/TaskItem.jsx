import { useState } from 'react'

function TaskItem({taskName,taskComplete,taskDate, taskDescription, taskIndex, deleteTask, openEditTask, toggleStatusTask}){

  return (
    <li key={taskIndex} onClick={() => toggleStatusTask(taskIndex)} className={`todo-list__task ${taskComplete ? 'todo-list__task--completed' : ''}`}>
      <div className='todo-list__task--info'>
        <div className='todo-list__checkbox-label'></div>
        <div className='todo-list__task--description'>
          <div className='todo-list__row'>
            <h3 className='todo-list__task--description--title'>{taskName}</h3>
            <p className='todo-list__task--description--date'>{taskDate}</p>
          </div>
          <p className='todo-list__task--description--description'>{taskDescription} </p>
        </div>
      </div>
      <div className='todo-list__task-buttons'>
        <button onClick={(event) => openEditTask(event, taskIndex, 'sacar la basura')} className='todo-list__button'>Editar</button>
        <button onClick={(event) => deleteTask(event, taskIndex)} className='todo-list__button'>Borrar</button>
      </div>
    </li>
  )
}

export default TaskItem