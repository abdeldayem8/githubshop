
import Styles from "./navbar.module.css";
import { MdMenu } from "react-icons/md";
import { Fragment, useEffect, useState } from "react";
import {togglesidebar} from "../../Redux/collapseSlice"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import {toggleLanguage}  from '../../Redux/languageslice'
import {toggleDarkMode, selectDarkMode} from '../../Redux/darkmodeslice'
import { TailSpin } from "react-loader-spinner";
const Navbar =()=>{
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.token !== null);
    const isDarkMode = useSelector(selectDarkMode);
    const language = useSelector(state => state.language.language);

    
    const [translations, setTranslations] = useState(null);
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
    
   

    const handleLanguageToggle = () => {
      dispatch(toggleLanguage());
    };
    const handleDarkModeToggle = () => {
      dispatch(toggleDarkMode());
    };
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
     {isLoggedIn ?  <div className={`${Styles.nav} h-16 px-5 flex justify-between items-center ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <MdMenu  onClick={() => dispatch(togglesidebar())} className="cursor-pointer" />
    <div className="flex items-center gap-2">
    
    <button onClick={handleDarkModeToggle} className={`rounded-full w-10 h-10 flex items-center justify-center ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-300 text-gray-800'}`}>
            {isDarkMode ? <MdDarkMode size={20} /> : <MdOutlineLightMode size={20} />}
          </button>

          <button className="rounded-md px-3" onClick={handleLanguageToggle}>
            {language === 'en' ? 'Arabic' : 'انجليزي'}
          </button>
         
    </div>
   </div> : <div className={`${Styles.nav} h-16 px-4 flex justify-between items-center`}>
      <h2 className="m-1">Open Shop</h2>
      <ul className="flex items-center justify-end p-2">
      <button onClick={handleDarkModeToggle} className={`rounded-full w-10 h-10 flex items-center justify-center ${isDarkMode ? 'dark-mood' : 'light-mode'}`}>
            {isDarkMode ? <MdDarkMode size={20} /> : <MdOutlineLightMode size={20} />}
          </button>
      <li className="m-1"  >
              
              <Link   to='/login' >
                    Login
              </Link>
              
           </li>
           <li className="m-1" >
              <Link  to='/signup'>
              Sign Up
              </Link>
            
           </li>
           
      </ul>
      
    </div>}
  

 </>
}

export default Navbar;