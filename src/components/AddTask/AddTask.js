import React from 'react'
import addSvg from './../../assets/img/add.svg'

export default function AddTask( {onAddTask} ) {
    let [isVisible,setVisible] = React.useState(false);
    let [inputValue,setInputValue] = React.useState('');

    const addTaskHandler = (value) => {
        if (value) {
            onAddTask(value);
            setInputValue('');
            setVisible(false);
        } else {
            alert('Введено пустое значение');
        }
    }
  return (
    <div className="tasks__form">
          
    {!isVisible &&  (<div onClick={()=>setVisible(true)} className="tasks__form-new">
      <img src={addSvg} alt="Add icon" />
      <span>Новая задача</span>
    </div>)
    }

    {isVisible && (<div className="tasks__form-block">
      <input
        className="field"
        type="text"
        placeholder="Текст задачи"
        onChange={(e)=>setInputValue(e.target.value)}
        value={inputValue}
      />
      <button onClick={()=>addTaskHandler(inputValue)} className="button">
       Добавить задачу
      </button>
      <button onClick={()=>setVisible(false)} className="button button--grey">
        Отмена
      </button>
    </div>)
    }

  </div>
  )
}
