"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import {useRouter } from "next/navigation";
import { ImExit } from "react-icons/im";
import { useEffect, useState } from "react";
import api from "../../utilis/api";
import { MdPublic } from "react-icons/md";

const Header = () => {

  const router = useRouter();

  const [user, setUser] = useState(null);

  // Kullanıcıyı kontrol et (cookie ile)
 useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (err) {
      console.error(
        "Oturum bulunamadı:",
        err.response?.data?.message || err.message
      );
      setUser(null);
      toast.info("Giriş yapmanız gerekir")
      router.push("/")
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
    <header className="flex items-center justify-between py-[11px] lg:px-20 px-4 shadow-lg">
      <div>
        <Link href={"/"} className="text-xl font-semibold cursor-pointer">
          Dental
        </Link>
      </div>

      {user &&  (
        <div className="flex items-center gap-3">
          {user.type==="public" && <MdPublic className="text-2xl text-blue-500"/>}
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
