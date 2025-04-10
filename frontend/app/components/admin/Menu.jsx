import React from 'react'
import { MdDashboard } from "react-icons/md";
import { FaUsers,FaUserDoctor } from "react-icons/fa6";
const Menu = () => {
    const menu = [
        {   id:1,
            text:"Genel",
            icon: <MdDashboard />,
            href:"/admin/dashboard"
        },
        {   id:2,
            text:"Hastalar",
            icon:<FaUsers />,
            href:"/admin/patients"
        },
        {   id:3,
            text:"Doktorlar",
            icon:<FaUserDoctor />,
            href:"/admin/doktors"
        },
    ]
  return (
    <aside className='w-44 bg-white border-t flex flex-col  items-center'>
        {menu.map(item=> (
            <div key={item.id} className='flex items-center shadow-lg gap-3 py-2 w-36 border border-slate-300 
             hover:bg-[#065985] hover:text-white m-3 rounded-lg p-5 cursor-pointer'>
                <p className='text-xl'>{item.icon}</p>
                <p className='text-xl font-semibold'>{item.text}</p>
            </div>
        ))}

    </aside>

  )
}

export default Menu