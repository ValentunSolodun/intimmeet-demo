import React from 'react';
import './Menu.css';
import _ from 'lodash';

const MenuItem = ({title, ...args}) => <span {...args}>{title}</span>

const Menu = () => {
  const MENU_LIST = [
    {id: 'Messages', title: 'Messages'},
    {id: 'Search', title: 'Search'},
    {id: 'Likes', title: 'Likes'},
    {id: 'Menu', title: 'Menu'},
  ];

  return (
    <div className='menu-container'>
      {
        _.map(MENU_LIST, l => <MenuItem className='menu-item' key={l.id} title={l.title}/>)
      }
    </div>
  )
}

export default Menu;
