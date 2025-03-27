"use client"
import { backendApi } from '@/app/utilis/helper';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { toast } from 'react-toastify';
const LoginPage = () => {

  const router = useRouter();
  const [isRemember, setIsRemember] = useState(false);
  const [isForgetModal,setIsForgetModal]=useState(false);
  const [loading,setLoading]=useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setIsRemember(checked);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value.length)) {
      return toast.info("Tüm alanları doldurun");
    }
  
    setLoading(true);
  
    try {
      await axios.post(
        `${backendApi}/auth/login`,
        { ...formData, rememberMe: isRemember },
        { withCredentials: true } // Cookie'yi almak için eklemelisin!
      );
  
      toast.success("Giriş Yapıldı");
      router.push("/patient/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className='flex'>
       <article className="lg:w-1/2 w-full mt-20 lg:mt-2  flex items-center justify-center ">
        <div className=" md:w-1/2 w-3/4 h-[60vh] -mt-20 flex flex-col items-center gap-2 p-5">
          <h1 className="text-3xl font-semibold">Giriş Yap</h1>
          <p className="text-center">
            Sistemi kullanabilmek için giriş yapmalısınız
          </p>
          <form
           onSubmit={handleSubmit}
            className=" w-full flex flex-col justify-center  items-center gap-5 mt-5"
          >
            <div className="w-full flex items-center shadow-lg  p-4 gap-3 bg-[#f2efe7] rounded-lg">
              <GoPerson className="text-2xl" />
              <input
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
                type="email"
                name="email"
                id="email"
                placeholder="E Mail Adresiniz"
                value={formData.email}
              />
            </div>

            <div className="w-full flex items-center p-4 shadow-lg gap-3 bg-[#f2efe7] rounded-lg">
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

            <div className="flex items-center gap-3 border rounded-lg p-3">
              <input
                onChange={handleChange}
                className="cursor-pointer"
                type="checkbox"
                id="remember"
                checked={isRemember}
              />
              <label className="cursor-pointer" htmlFor="remember">
                Beni Hatırla
              </label>
            </div>
            <button className="w-1/2 py-2 px-4 mt-4 rounded-lg text-white font-semibold cursor-pointer 
             bg-gradient-to-r from-[#006a71]  to-[#9acbd0] hover:scale-110 transition-all">
              {loading ? "Giriş Yapılıyor": "Giriş Yap"}
            </button>
          </form>
            <button onClick={()=>setIsForgetModal(true)} className="hover:underline hover:text-blue-400"> Şifremi Unuttum</button>
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

export default LoginPage