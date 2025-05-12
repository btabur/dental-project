"use client"
import { backendApi } from '@/app/utilis/helper'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from 'react-toastify';
const PatientsPage = () => {
const [patients,setPatients]= useState([])
const [chooseds,setChooseds]= useState([]);
const [filtered,setFiltered]= useState()

useEffect(()=> {
    axios.get(`${backendApi}/user/all`)
    .then(response=> {
        setPatients(response.data)
       setFiltered(response.data) 
    }).catch(err=>console.log(err))
},[])
const allChoose = (e)=> {
    if (e.target.checked) {
      setChooseds(prev => [...patients.map(patient => patient._id)]);
    } else {
      setChooseds(prev => []);
    }
  }

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // Arama terimini küçük harfe çevir
    if (searchTerm === "") {
      setFiltered(patients); // Arama alanı boşsa tüm öğrencileri göster
    } else {
      const filtered = patients.filter(item => item.name.toLowerCase().includes(searchTerm)); // startsWith ile filtrele
      setFiltered(filtered);
    }
  }

  const handleIndividualCheck = (patientId) => {
    setChooseds(prev => {
      if (prev.includes(patientId)) {
        return prev.filter(id => id !== patientId);
      } else {
        return [...prev, patientId];
      }
    });
  }

  const deleteSelected = async () => {
    try {
      // Her bir seçili öğrenci için silme işlemi yap
      await Promise.all(
        chooseds.map(async (patientId) => {
          await axios.delete(`${backendApi}/user?id=${patientId}`);
        })
      );

      // Başarılı silme işleminden sonra state'i güncelle
      setFiltered(prev => prev.filter(patient => !chooseds.includes(patient._id)));
      setChooseds([]); // Seçili öğrencileri temizle
      toast.success("Seçili hastalar başarıyla silindi");
    } catch (error) {
      console.error("Silme işlemi sırasında hata:", error);
      toast.error("Hastalar silinirken bir hata oluştu");
    }
  }

  return (
    <main className='w-full mt-10 ml-5'>

        <section className='flex items-center gap-5'>
        <article className="relative ">
          <input onChange={(e)=>handleFilter(e)} type="text" className='py-2 ps-10 rounded-lg border w-72' placeholder='Ara' />
          <FaSearch className='absolute top-3 left-5' />
        </article>
        <div className="relative group flex flex-col items-center">
            <CiCirclePlus className="text-[40px] cursor-pointer text-green-500 hover:scale-110 transition-transform duration-200" />
            <p className="absolute -top-10  left-1/2  -translate-x-1/2 w-44 bg-[#0d1a2a]
             text-white text-sm text-center px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100
              transition-opacity duration-200 z-10">
                Yeni Hasta Ekle
            </p>
            </div>
            {chooseds.length >0  && 
            <button onClick={deleteSelected}
                className="py-2 px-8 rounded-lg cursor-pointer text-white font-semibold bg-gradient-to-r from-red-500 to-red-700"> Sil</button>}

        </section>
     

        <section className="overflow-x-auto w-[80%] mt-5">
            <table className="min-w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <thead className="bg-[#065985] text-white text-sm md:text-base">
                <tr>
                    <th className="p-3 text-left">
                    <div className="flex items-center gap-2 relative group">
                        <input
                        type="checkbox"
                        onChange={allChoose}
                        id="allChoose"
                        className="w-5 h-5 accent-yellow-400 hover:scale-110 transition-transform duration-200"
                        />
                        <label
                        htmlFor="allChoose"
                        className="cursor-pointer select-none absolute -bottom-8 left-0 w-32 bg-black text-white text-xs text-center px-2 py-1 rounded-md shadow-md hidden group-hover:block"
                        >
                        Hepsini Seç
                        </label>
                    </div>
                    </th>
                    <th className="p-3 text-left font-semibold">Adı Soyadı</th>
                    <th className="p-3 text-left font-semibold">Telefon</th>
                    <th className="p-3 text-left font-semibold">E Mail</th>
                </tr>
                </thead>
                <tbody className="text-gray-700 text-sm md:text-base">
                {filtered && filtered.length > 0 &&
                    filtered.map((patient) => (
                    <tr
                        key={patient._id}
                        className="border-b border-gray-200 odd:bg-slate-50 even:bg-slate-100 hover:bg-indigo-100 transition-colors"
                    >
                        <td className="p-2">
                        <input
                            type="checkbox"
                            checked={chooseds.includes(patient._id) || false}
                            onChange={() => handleIndividualCheck(patient._id)}
                            className="w-5 h-5 accent-blue-500"
                        />
                        </td>
                        <td className="p-2 font-medium">{patient.name}</td>
                        <td className="p-2 font-medium">{patient.phone}</td>
                        <td className="p-2 font-medium">{patient.email}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
         </section>


        

    </main>
  )
}

export default PatientsPage