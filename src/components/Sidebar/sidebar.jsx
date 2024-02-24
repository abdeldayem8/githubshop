import React, { useEffect, useState } from 'react'
import Styles from './sidebar.module.css'
import { CiLogout} from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import {togglesidebar} from "../../Redux/collapseSlice"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearToken } from '../../Redux/authSlice';
import { TailSpin } from 'react-loader-spinner';
import { MdDashboard } from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";

const Sidebar =()=> {
 
    const isSidebarOpen = useSelector(state => state.sidebar.isopen);
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);
  const [translations, setTranslations] = useState(null);
  const handleLogout = () => {
   dispatch(clearToken());
   dispatch(togglesidebar());
 };
  useEffect(() => {
    import(`../../locales/${language}.json`)
      .then(module => setTranslations(module.default))
      .catch(err => {
        console.error(`Failed to load translation file: ${err}`);
        import('../../locales/en.json')
          .then(module => setTranslations(module.default))
          .catch(err => console.error(`Failed to load English translation file: ${err}`));
      });
  }, [language]);
  
  if(!translations){
   return  <div className="h-screen flex justify-center items-center">
   <TailSpin
   visible={true}
   height="80"
   width="80"
   color="#4fa94d"
   ariaLabel="tail-spin-loading"
   radius="1"
   wrapperStyle={{}}
   wrapperClass=""
   />
   </div>
 }
   
  return <>
    {localStorage.getItem('token') ?  < div className={isSidebarOpen ? Styles.opened : Styles.closed}>
      <div className='flex items-center gap-2 px-1 py-3 '>
         <FaCartShopping fontSize={24}/> 
         <span className='text-lg'>OpenShop</span>
         </div>
      <div className='flex-1 py-4 gap-0.5 flex flex-col'>
         <ul>
            <li  className={Styles.link}>
              
               <Link  className={Styles.title} to='/home' >
                     <MdDashboard className="mr-3" />{translations.dashboard}
               </Link>
               
            </li>
            <li className={Styles.link}>
               <Link className={Styles.title} to='/restaurants'>
               <IoMdRestaurant className="mr-3" />{translations.restaurants}
               </Link>
             
            </li>
            <li className={Styles.link}>
              
               <Link  className={Styles.title} to='/products' >
               <FaProductHunt className="mr-3" />{translations.products}
               </Link>
              
            </li>
         
            <li  className={Styles.link} onClick={handleLogout}>
               <Link className={Styles.title} to={'/login'} >
                  <CiLogout className='mr-3'/> {translations.logout}
               </Link>
            </li>
            </ul>
      </div>
      
   </div> : ''}
  
  </>

}

export default Sidebar;