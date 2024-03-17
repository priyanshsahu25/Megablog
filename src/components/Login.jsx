import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import Loader from './Loader'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false);

    const login = async(data) => {
      setLoader(true);
        setError("")
        try {
        setLoader(true);
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                setLoader(false);
                navigate("/all-posts")

            }
        } catch (error) {
          setLoader(false);
            setError(error.message)
        }
    }

  return (
   <> {loader?  <div className='flex justify-center items-center h-screen'>
    <Loader/> 
   </div> :  <section>   
   <div className="grid grid-cols-1 lg:grid-cols-2">
     <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
       <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
         <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Log in</h2>
         <p className="mt-2 text-sm text-gray-600">
           Don&apos;t have an account?{' '}
           <Link
             to='/signup'
             title=""
             className="font-semibold text-black transition-all duration-200 hover:underline"
           >
             Create a free account
           </Link>
         </p>
         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
         <form onSubmit={handleSubmit(login)}  className="mt-8">
           <div className="space-y-5">
             <div>
               <label htmlFor="" className="text-base font-medium text-gray-900">
                 {' '}
                 Email address{' '}
               </label>
               <div className="mt-2">
                 {/* <input
                   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                   type="email"
                   placeholder="Email"
                 ></input> */}
<Input
className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              
               placeholder="Enter your email"
               type="email"
               {...register("email", {
                   required: true,
                   validate: {
                       matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                       "Email address must be a valid address",
                   }
               })}
               />

               </div>
             </div>
             <div>
               <div className="flex items-center justify-between">
                 <label htmlFor="" className="text-base font-medium text-gray-900">
                   {' '}
                   Password{' '}
                 </label>
               </div>
               <div className="mt-2">
                    <Input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
           
               type="password"
               placeholder="Enter your password"
               {...register("password", {
                   required: true,
               })}
               />
               </div>
             </div>
             <div>
           
               <Button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
               
               >Get started </Button>
             </div>
           </div>
         </form>
     
       </div>
     </div>
     <div className="h-full w-full ">
       <img
         className=" pt-10 px-3 py-4 rounded-md object-cover"
         src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
         alt=""
       />
     </div>
   </div>
 </section>} 
   
  </> 
  )
}

export default Login