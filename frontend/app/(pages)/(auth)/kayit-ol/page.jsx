"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { FaPhone } from "react-icons/fa6";
import axios from 'axios';
import { backendApi } from '@/app/utilis/helper';
import { toast } from 'react-toastify';
const RegisterPage = () => {

  const router = useRouter();
  const [loading,setLoading]=useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    password: "",
  });

  

  const handleChange = (e) => {
    const { id, value} = e.target;

      setFormData({ ...formData, [id]: value });
    
  };
  const handelSubmit = async(e)=> {
    e.preventDefault();
    if (Object.values(formData).some(value => !value.length)) {
      return toast.info("Tüm alanları doldurun");
    }
    try {
      axios.post(`${backendApi}/user/create-user`,formData)
      .then(()=> {
          toast.success("Kaydınız Alınmıştır")
          router.push("/giris-yap")
        })
      .catch((error)=> {
        toast.error(error.response.data.error)
      }
      )
      
    } catch (error) {
      toast.error("Bir Hata oluştu",error)
    }
    
  }
  return (
    <main className='flex'>
       <article className="lg:w-1/2 w-full mt-20 lg:mt-2  flex items-center justify-center ">
        <div className=" md:w-1/2 w-3/4 h-[60vh] -mt-20 flex flex-col items-center gap-2 p-5">
          <h1 className="text-3xl font-semibold">Kayıt Ol</h1>
          <p className="text-center">
            Sistemi kullanabilmek için hesap açmalısınız
          </p>
          <form
           onSubmit={handelSubmit}
            className=" w-full flex flex-col justify-center  items-center gap-5 mt-5"
          >
            <div className="w-full flex items-center shadow-lg  p-4 gap-3 bg-[#f2efe7] rounded-lg">
              <GoPerson className="text-2xl" />
              <input
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                type="text"
                name="name"
                id="name"
                placeholder="Adınız Soyadınız"
                value={formData.name}
              />
            </div>
            <div className="w-full flex items-center shadow-lg  p-4 gap-3 bg-[#f2efe7] rounded-lg">
              <TfiEmail className="text-2xl" />
              <input
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                type="email"
                name="email"
                id="email"
                placeholder="E Mailiniz"
                value={formData.email}
              />
            </div>
            <div className="w-full flex items-center shadow-lg  p-4 gap-3 bg-[#f2efe7] rounded-lg">
              <FaPhone className="text-2xl" />
              <input
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                type="text"
                name="phone"
                id="phone"
                placeholder="Telefon Numaranız"
                value={formData.phone}
              />
            </div>

            <div className="w-full flex items-center p-4 gap-3 shadow-lg bg-[#f2efe7] rounded-lg">
              <MdLockOutline className="text-2xl" />
              <input
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                type="password"
                name="password"
                id="password"
                placeholder="Şifreniz"
                value={formData.password}
              />
            </div>

            
            <button className="w-1/2 py-2 px-4 mt-4 rounded-lg text-white font-semibold cursor-pointer 
             bg-gradient-to-r from-[#006a71] shadow-lg  to-[#9acbd0] hover:scale-110 transition-all">
              {loading ? "Giriş Yapılıyor": "Kayıt Ol"}
            </button>
          </form>
           
        </div>
      </article>
      <article className='hidden min-h-[93vh] w-1/2 lg:flex'>
        <Image
        alt='bg-login'
        src={'/bg-login.webp'}
        width={800}
        height={900}
        className='w-full h-full object-cover'
        />

      </article>
    </main>
  )
}

export default RegisterPage