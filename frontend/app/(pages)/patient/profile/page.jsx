"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendApi } from '@/app/utilis/helper';

const ProfilePage = () => {

    const router = useRouter()

    const handleLogout = async () => {
        try {
          await axios.post(`${backendApi}/auth/logout`, {}, { withCredentials: true });
          toast.info("Çıkış Yapıldı");
          router.push("/");
        } catch (error) {
          console.error("Çıkış hatası:", error);
        }
      };
  return (
    <main>
        <div className='flex items-center justify-between px-10'>

            <p>menu</p>
            <p onClick={handleLogout}>Çıkış Yap</p>
        </div>
    </main>
  )
}

export default ProfilePage