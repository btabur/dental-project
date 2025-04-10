"use client"

import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { backendApi } from '../utilis/helper'
const ForgetModal = ({setIsForgetModal}) => {

    const [email,setEmail]=useState();
    const [loading,setLoading]=useState(false)

    const handleReset = (e)=> {
        e.preventDefault();

        if(!email) {
            toast.error("Bir e mail girin")
            return
        }
        setLoading(true)
        axios.post(`${backendApi}/auth/forget-password`,{email})
        .then(()=> {
            toast.info("Şifre Sıfırlama linki maillinize gönderildi")
            setLoading(false)
            setIsForgetModal(false)
        }).catch(err=> {
           console.log(err.response.data.message);
           toast.error(err.response.data.message)
           
        setLoading(false)})
    }

  return (
    <article className='w-full h-[100vh] fixed top-0 left-0 '>

        <div className='w-full h-full bg-slate-400 absolute top-0 left-0 opacity-70 '></div>
        <form onSubmit={handleReset} className='lg:w-1/2 w-[90%] ml-10 lg:ml-0 flex flex-col items-start bg-white rounded-lg border p-10 absolute top-[50%] lg:left[50%] lg:translate-x-[50%] -translate-y-[50%] '>
            <h2 className='font-semibold my-4'>Sıfırlamak için kayıtlı e mailinizi girin</h2>
            <input onChange={(e)=>setEmail(e.target.value)} className='p-2 rounded-lg border w-full' type="email" placeholder='e mailinizi giriniz' />
            <button  className="w-1/2 py-2 px-4 mt-4 rounded-lg text-white font-semibold cursor-pointer 
             bg-gradient-to-r from-[#006a71]  to-[#9acbd0] hover:scale-110 transition-all">
              {loading ? "Gönderiliyor" : "Şifreyi Sıfırla"}
            </button>
            <button onClick={()=>setIsForgetModal(false)} type='button' className='absolute top-2 right-2 w-10 h-10 rounded-full border-[2px] border-black flex items-center 
            justify-center p-2 text-xl font-semibold'>
                X

            </button>

        </form>


    </article>
  )
}

export default ForgetModal