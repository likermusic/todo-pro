import React from 'react';
import './App.scss';
import {Route,Link,Routes, useNavigate, useLocation } from 'react-router-dom';

import listSvg from './../../assets/img/list.svg';
import addSvg from './../../assets/img/add.svg';
import closeSvg from './../../assets/img/close.svg';
import DB from './../../assets/db.json';
// import {useQuery} from 'react-query'
import axios from 'axios';

import List from './../List/List';
import Tasks from './../Tasks/Tasks';

// import { useState, useEffect } from 'react';
import AddList from '../AddList/AddList';


function App() {
  // let t = false;
  // let jsxEl = (
  //   <i>{ t == true ? (<b>TRUE</b>) : (<u>FALSE</u>) }</i>
  // )
  let [lists, setLists] = React.useState(null);
  let [colors,setColors] = React.useState(null);
  let [active,setActive] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation()
  // alert('act ' + active)
  // console.log(navigate );
  // console.log(lists);
  // useQuery('query-tutorials', ()=> {} );
  React.useEffect(() => { 
    const uri = location.pathname.split('lists/')[1] || location.pathname;
    if (uri == '/') {
      setActive(null);
    } else {
      setActive(uri);
    }
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(( {data} )=>{
      //  console.log(data);
      // console.log('Listsc'+lists,'Active'+active);
      // setActive(1);
        setLists(data);
      }).catch( () => {
        alert('Ошибка выполнения операции :(  Попробуйте позже');
      });
     axios.get('http://localhost:3001/colors').then(( {data} )=>{
        setColors(data);
      }).catch( () => {
        alert('Ошибка выполнения операции :(  Попробуйте позже');
      });
  },[active, location.pathname]);
  

  let deleteHandler = (id) => {
    let newList = [...lists].map(list=>{
      if (list.id != id) {
        // alert(1111);
        return list;
      }
    });
    // console.log(newList);
    // axios.delete('http://localhost:3001/lists/'+id).then((data)=>setLists(newList));

    // const data =
    axios.delete('http://localhost:3001/lists/'+id).then(()=>navigate('/')).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
    // .then(()=>console.log(newList));
  }
  // console.log(lists);

  let addListHandler = (name,colorId,color) => {
    axios.post('http://localhost:3001/lists', {name,colorId}).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
    // const id = (lists.length>0) ? lists[lists.length-1].id+1 : 1;
    // const newItem = {id,name,colorId,color};
    // const newList = [...lists,newItem];
    // console.log(newItem);
    // console.log(newList);
  //   axios.post('http://localhost:3001/lists', {name,colorId}).then((data)=>{
  //   setLists([...lists,data]);
  // });
    // axios.post('http://localhost:3001/lists', {name,colorId}).then(()=>console.log(''));

  }

  const listRenameHandler = (id,name) => {
    axios.patch('http://localhost:3001/lists/'+id, {name}).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
  }

  const addTaskHandler = (id,name) => {
    axios.post('http://localhost:3001/tasks', {listId:id,text:name,completed:false}).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
  }
  const editTaskHandler = (id,text) => {
    axios.patch('http://localhost:3001/tasks/'+id, {text:text}).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
  }

  const deleteTaskHandler = (id) => {
    axios.delete('http://localhost:3001/tasks/'+id).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
  }
  const completeTaskHandler = (id,completed) => {
    axios.patch('http://localhost:3001/tasks/'+id, {completed:completed}).catch( () => {
      alert('Ошибка выполнения операции :(  Попробуйте позже');
    });
  }
  const selectTasks = () => {
    // console.log(lists);
    if (lists && active) {
      // navigate('/');
      return (
          <Tasks onCompleteTask={completeTaskHandler} onDeleteTask={deleteTaskHandler} onEditTask={editTaskHandler} onAddTask={addTaskHandler} onListRename={(id,name)=>listRenameHandler(id,name)} list={
          lists[lists.findIndex((item)=>item.id==active)]
          }/>
        ) 
    } else if (lists && active == null) {
      // navigate('/lists/5');

      // console.log('Tasks' + lists);
        return lists.map((list,ind)=> (
          <Tasks onCompleteTask={completeTaskHandler} onDeleteTask={deleteTaskHandler} onEditTask={editTaskHandler} onAddTask={addTaskHandler} onListRename={(id,name)=>listRenameHandler(id,name)} key={ind} list={list}/>
        ))
    } else {
      return (<Tasks list={[]}/>);
    }
  }
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List active={active == null && 'default'} onItemActive={(id)=>navigate('/')} items={[
          {
            icon: listSvg,
            name: 'Все списки',
          }
        ]}/>

        { lists && lists.length>0 &&  
         (
         <List active={active} onItemActive={(id)=>navigate(`lists/${id}`)} items={lists}
        isRemovable={true}
        //   [
        //   {
        //     color: 'green',
        //     name: 'Покупки',
        //     active: true
        //   }
        // ]
        onDelete={(id)=>deleteHandler(id)}
        />
         ) 
        } 
        {
          colors &&
        (<AddList addList={(name,colorId,color)=>addListHandler(name,colorId,color)} colors={colors} closeSvg={closeSvg} addSvg={addSvg} name="Добавить список"/>)
        }
      </div>
      <div className="todo__tasks">
        {selectTasks()}
      </div>
    </div>
  );
}

/* 
function App1() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log(1111);
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
 */



export default App;