"use client";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { ImExit } from "react-icons/im";
import { IoPersonCircleSharp } from "react-icons/io5";
import { backendApi } from "../utilis/helper";
import { useEffect, useState } from "react";
import api from "../utilis/api";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);

  // Kullanıcıyı kontrol et (cookie ile)
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      console.log("Kullanıcı:", data);
      setUser(data);
    } catch (err) {
      console.error(
        "Oturum bulunamadı:",
        err.response?.data?.message || err.message
      );
      setUser(null);
    }
  };

  fetchUser();
}, []);


 const handleLogout = async () => {
  try {
    await api.post("/auth/logout");
    toast.success("Çıkış Yapıldı");
    router.push("/")
  } catch (err) {
    console.error("Çıkış hatası:", err.response?.data || err.message);
  }
};



  return (
    <header className="flex items-center justify-between py-2 lg:px-20 px-4 shadow-lg">
      <div>
        <Link href={"/"} className="text-xl font-semibold cursor-pointer">
          Dental
        </Link>
      </div>

      {!user ? (
        <div className="flex items-center gap-3">
          <Link
            href={"/giris-yap"}
            className="py-2 px-6 bg-green-500 rounded-lg text-white font-semibold hover:bg-white hover:text-green-500 hover:border hover:border-green-500"
          >
            Giriş Yap
          </Link>
          <Link
            href={"/kayit-ol"}
            className="py-2 px-6 border-2 border-green-500 rounded-lg text-green-500 font-semibold hover:bg-green-500 hover:text-white"
          >
            Kayıt Ol
          </Link>
           <Link
            href={"/online-randevu"}
            className="py-2 px-6 border-2 border-green-500 rounded-lg text-green-500 font-semibold hover:bg-green-500 hover:text-white"
          >
           Online Randevu
          </Link>
          
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {!pathname.includes("/admin") && (
            <Link
              href={"/patient/profile"}
              className="text-3xl text-[#065985] cursor-pointer"
            >
              <IoPersonCircleSharp />
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-[#f4b410] text-2xl cursor-pointer"
          >
            <ImExit />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
