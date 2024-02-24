import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './collapseSlice'
import authReducer from './authSlice'
import darkModeReducer from './darkmodeslice'
import languageReducer from './languageslice'

 const Store =configureStore({
    reducer:{
        sidebar:sidebarReducer,
        auth:authReducer,
        darkMode: darkModeReducer,
        language: languageReducer,
       
    }
})
export default Store;