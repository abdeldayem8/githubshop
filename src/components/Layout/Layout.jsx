import React from 'react'
import Sidebar from '../Sidebar/sidebar'
import Navbar from '../Navbar/navbar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {selectDarkMode} from '../../Redux/darkmodeslice'
import {selectDirection} from '../../Redux/languageslice'
export default function Layout() {

  const isDarkMode = useSelector(selectDarkMode);
  const direction = useSelector(selectDirection);
 
  return <>
  <div dir={direction} className={`layout ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
   <div className='flex flex-direction-row overflow-hidden  w-screen'>
     <Sidebar/>
     <div className='flex-1'>
        <Navbar/>
        <div className='p-4 body'>
          <Outlet/>
      </div>
     </div>
   </div>
   </div>
  </>
}