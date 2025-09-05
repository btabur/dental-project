'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FiLayout, 
  FiCreditCard,
  FiBarChart2,

  FiClock,
  FiSettings,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi';

export default function Menu() {

  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter()
  const pathName = usePathname()

  const toggleSidebar = () => setCollapsed(!collapsed);

  const baseText = collapsed ? 'hidden md:hidden' : 'inline';

  return (
    <div
      className={`${
        collapsed ? 'w-24' : 'w-64'
      } bg-[#0D1B2A] text-white h-[94vh] flex flex-col justify-between p-4 transition-all duration-300`}
    >
      <div>
        {/* Profil */}
        <div className="flex items-center gap-4 p-3 mb-6 bg-[#1B263B] rounded-lg">
          <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
            AD
          </div>
          {!collapsed && (
            <div>
              <p className="font-semibold">Ahmet Demir</p>
              <p className="text-sm text-gray-400">Yönetici</p>
            </div>
          )}
        </div>

        {/* Menü Başlığı */}
        {!collapsed && (
          <div className="text-xs text-gray-400 mb-2">ANA MENÜ</div>
        )}

        {/* Menü */}
        <ul className="space-y-1">
          <li 
          onClick={()=>router.push("/admin/dashboard")} 
          className={`${pathName.includes("dashboard") &&"bg-[#3a475f]"} rounded-md px-3 py-2 flex  hover:bg-[#1B263B] items-center gap-3 cursor-pointer`}>
            <FiLayout size={18} />
            <span className={`${baseText} hidden sm:inline`}>Gösterge Paneli</span>
          </li>
          <li onClick={()=>router.push("/admin/hastalar")}
             className={`${pathName.includes("hasta") &&"bg-[#3a475f]"} rounded-md px-3 py-2 flex  hover:bg-[#1B263B] items-center gap-3 cursor-pointer`}>
           
            <FiLayout size={18} />
            <span className={`${baseText} hidden sm:inline`}>Hastalar</span>

          </li>



          {/* Finans */}
          <li onClick={()=>router.push("/admin/finans")} className={`${pathName.includes("finans") &&"bg-[#3a475f]"} rounded-md px-3 py-2 flex  hover:bg-[#1B263B] items-center gap-3 cursor-pointer`}>
            <div className="flex items-center gap-3">
              <FiCreditCard size={18} />
              <span className={`${baseText} hidden sm:inline`}>Finans</span>
            </div>
          </li>

         
        </ul>

        {/* Raporlar */}
        {!collapsed && (
          <div className="text-xs text-gray-400 mt-6 mb-2">RAPORLAR</div>
        )}
        <ul className="space-y-1">
          <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1B263B]">
            <FiBarChart2 size={18} />
            <span className={`${baseText} hidden sm:inline`}>
              Randevular
            </span>
          </li>
         
          <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1B263B]">
            <FiClock size={18} />
            <span className={`${baseText} hidden sm:inline`}>
              Aktivite Geçmişi
            </span>
          </li>
        </ul>

        {/* Ayarlar */}
        {!collapsed && (
          <div className="text-xs text-gray-400 mt-6 mb-2">AYARLAR</div>
        )}
        <ul>
          <li className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#1B263B]">
            <FiSettings size={18} />
            <span className={`${baseText} hidden sm:inline`}>
              Sistem Ayarları
            </span>
          </li>
        </ul>
      </div>

      {/* Alt kısım: copyright + ok */}
      <div className="flex justify-between items-center mt-4">
        {!collapsed && (
          <span className="text-xs text-gray-500 text-center">
            &copy; 2025 DeepERP
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white p-2"
        >
          {collapsed ? <FiArrowRight /> : <FiArrowLeft />}
        </button>
      </div>
    </div>
  );
}
