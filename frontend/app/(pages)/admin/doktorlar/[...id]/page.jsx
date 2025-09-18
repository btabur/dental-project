"use client"

import Profile from '@/app/components/admin/doctors/Profile';
import Settings from '@/app/components/admin/doctors/Settings';
import api from '@/app/utilis/api';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';


const DoctorDetailPanel = () => {

  const pathname = usePathname();
   const pageId = pathname.split("/").pop();
  const [doctor,setDoctor] = useState();

  const [admin,setAdmin]= useState();
  const [active,setActive] = useState("profile")
  

  // doctor verilerini çek
  useEffect(()=> {
    api.get(`/doctor/one?id=${pageId}`)
    .then(response => {
      setDoctor(response.data)
    }).catch(err => {
      console.log(err);
      toast.error("Doktor verilerini alırken hata oluştu")
      
    })

    api.get("/auth/me").then(res=> {
    setAdmin(res.data)
    }).catch(err=>console.log(err)
    )
  },[])

  return (
    <main className='w-full'>
        <header className='flex items-center px-10 '>
          <button onClick={()=>setActive("profile")} 
          className={`${active==="profile" ?" bg-[#065885] text-white shadow-2xl" : " bg-white "} relative  px-6 py-2 transform skew-x-[-12deg] `}>
            <span className="inline-block transform skew-x-[12deg]">
              Profil
            </span>
          </button>
          <button onClick={()=>setActive("settings")} 
          className={`${active==="settings" ?" bg-[#065885] text-white shadow-2xl " : " bg-white "} relative border-l  px-6 py-2 transform skew-x-[-12deg] `}>
            <span className="inline-block transform skew-x-[12deg]">
              Ayarlar
            </span>
          </button>
      </header>

      {active === "profile" && (
        <Profile doctor={doctor}/>
      )
     }
    {active === "settings" && <Settings doctor={doctor} setDoctor={setDoctor} admin={admin} />}
  

    </main> )
   
};

export default DoctorDetailPanel;