"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ImExit } from "react-icons/im";
import { IoPersonCircleSharp } from "react-icons/io5";
import { backendApi } from '../utilis/helper';

const Header = () => {
  const { token,setToken } = useAuth();

  const router = useRouter()

    const handleLogout = async () => {
        try {
          await axios.post(`${backendApi}/auth/logout`, {}, { withCredentials: true });
          toast.info("Çıkış Yapıldı");
          setToken(null)
          router.push("/");
        } catch (error) {
          console.error("Çıkış hatası:", error);
        }
      };
 
  

  return (
    <header className='flex items-center justify-between py-2 lg:px-20 px-4 shadow-lg'>
      <div>
        <Link href={"/"} className='text-xl font-semibold cursor-pointer'>Dental</Link>
      </div>
      {!token ? (
        <div className='flex items-center gap-3'>
          <Link href={"/giris-yap"} className='py-2 px-6 bg-green-500 rounded-lg text-white font-semibold hover:bg-white hover:text-green-500 hover:border hover:border-green-500'>Giriş Yap</Link>
          <Link href={"/kayit-ol"} className='py-2 px-6 border-2 border-green-500 rounded-lg text-green-500 font-semibold hover:bg-green-500 hover:text-white'>Kayıt Ol</Link>
        </div>
      ) : (
        <div className='flex items-center gap-3'>
          <Link href={"/patient/profile"} className='text-3xl text-[#065985] cursor-pointer'>
           <IoPersonCircleSharp />
          </Link>
        <button onClick={handleLogout } 
          className='text-[#f4b410] text-2xl cursor-pointer'>
            <ImExit />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
