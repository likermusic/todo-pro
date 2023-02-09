import React from 'react';
import './Badge.scss';

export default function Badge( {color,onClickBadge,classActive} ) {
  return (
    <i onClick={onClickBadge} className={`badge badge--${color} ${classActive}`}></i>
  )
}
