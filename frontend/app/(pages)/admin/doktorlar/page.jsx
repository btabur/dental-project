"use client"
import AddDoctor from '@/app/components/admin/doctors/AddDoctor'
import List from '@/app/components/admin/doctors/List'
import React, { useState } from 'react'

const DoctorsPage = () => {
    const [active,setActive] = useState("list")
  return (
    <main className='w-full'>
         <header className='flex items-center px-10 border-t border-gray-300 '>
      <button onClick={()=>setActive("list")} 
      className={`${active==="list" ?" bg-[#065885] text-white shadow-2xl" : " bg-white "} relative shadow-lg  px-6 py-2 transform skew-x-[-12deg] `}>
        <span className="inline-block transform skew-x-[12deg]">
          Doktorlar
        </span>
      </button>
      <button onClick={()=>setActive("add")} 
      className={`${active==="add" ?" bg-[#065885] text-white shadow-2xl " : " bg-white  "} relative shadow-lg  border-l  px-6 py-2 transform skew-x-[-12deg] `}>
        <span className="inline-block transform skew-x-[12deg]">
          Doktor Ekle
        </span>
      </button>
      </header>

     <section >
       {active==="add" && <AddDoctor/>}
       {active==="list" && <List/>}
     </section>
    </main>
  )
}

export default DoctorsPage