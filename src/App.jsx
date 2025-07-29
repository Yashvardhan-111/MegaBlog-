import React ,{ useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from "./appwrite/auth"
import './App.css'
import { login,logout } from './store/authSlice'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from "react-router-dom";

function App() {
  //console.log(import.meta.env.VITE_PASSWORD);

  //network,database call mei time lag sakta hai uske liye loading state bnalo.used for consitional rendering 
  //if true show loading icon
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {   //find if logged in
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData})) //authSlice ka reducer
      }
      // else{
      //   dispatch(logout())
      // }
    })
    .finally(() => setLoading(false))
  }, [])
  
  //conditional rendering
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* Render child routes here */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
    
}

export default App
