import React from 'react';
import './List.scss';
import itemRemove from './../../assets/img/remove.svg';
import Badge from './../Badge/Badge';

export default function List( {items, active, isRemovable, onDelete, clickAddButton = null, onItemActive = null} ) {
    // console.log(items);
    let activeListHandler = (id=null) => {
        if (clickAddButton == null) {
            onItemActive(id);
        }
    }
  return (
    <ul className="list" onClick={clickAddButton}>
        {
            items.map( (item,ind)=> 
                (       
                 <li onClick={()=>onItemActive && activeListHandler(item.id)} key={ind} className={active && (active == item.id || active == 'default') ? 'active' : ''}> 
                    <i>
                        {item.icon ? 
                            (<img src={item.icon} />) 
                            :
                            (<Badge color={item.color.name}/>)
                        }
                    </i>
                    <span>
                        {item.name}
                        {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}   
                    </span>

                    {isRemovable && 
                        (<img onClick={()=>{
                            if (window.confirm('Вы действительно хотите удалить список?')) {
                                onDelete(item.id)
                            }
                        }} className='list__remove-icon' src={itemRemove} alt="" />)   
                    }                    
                    </li>
                )
            )
        
        }



           
    </ul>
  )
}
