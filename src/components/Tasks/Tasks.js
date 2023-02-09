import React from 'react'
import './Tasks.scss'
import editSvg from './../../assets/img/edit.svg'
import checkSvg from './../../assets/img/check.svg'
import Task from './../Task/Task'
import AddTask from './../AddTask/AddTask'
import axios from 'axios'


export default function Tasks( {list, onListRename, onAddTask, onEditTask,onDeleteTask, onCompleteTask} ) {
  if (list.length == 0) {
    return (
        <div className="tasks">
          <div className="tasks__items">
            <h2>Задачи отсутствуют</h2>
          </div>  
        </div>
    )
  } else {

      const listRenameHandler = (id) => {
        const name = prompt('Введите название списка');
        if (name != '') {
          onListRename(id, name);
        } else {
          alert('Введено пустое значение');
        }
      }
      
 
      return (
    <div className="tasks">
    <h2 style={{color:list.color?.hex}} className="tasks__title">
      {list.name}
     <img onClick={()=>listRenameHandler(list.id)} src={editSvg} alt="" />
    </h2>

    <div className="tasks__items">
      {list.tasks.length>0 && list.tasks.map( (task) => 
        ( <Task onCompleteTask={onCompleteTask}  onDeleteTask={()=>onDeleteTask(task.id)} onEditTask={(id,text)=>onEditTask(id,text)} key={task.id} task={task}/> )
      )}
         <AddTask onAddTask={(name)=>onAddTask(list.id,name)}/>
    </div>
    </div>
  )

  }
}
