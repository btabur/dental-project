"use client"
import AddWorkHourModal from '@/app/components/admin/doctors/AddWorkHourModal';
import EditDoctorModal from '@/app/components/admin/doctors/EditDoctorModal';
import api from '@/app/utilis/api';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaMailBulk, FaSave } from 'react-icons/fa';
import { FaCalendar, FaClock, FaPhone } from 'react-icons/fa6';
import { FiAlertCircle } from 'react-icons/fi';
import { IoAdd, IoCloseOutline, IoPersonOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';


const DoctorDetailPanel = () => {

  const pathname = usePathname();
   const pageId = pathname.split("/").pop();
  const [isEditing, setIsEditing] = useState(false);
  const [doctor,setDoctor] = useState();
  const [addModal,setAddModal]= useState(false);
  const [admin,setAdmin]= useState();
  

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
  
  // Örnek doktor verisi
  const [doctorData, setDoctorData] = useState({
    id: 1,
    name: "Dr. Ayşe Demir",
    specialty: "Diş Hekimi",
    phone: "+90 532 123 45 67",
    email: "ayse.demir@klinik.com",
    address: "Kızılay Mah. Atatürk Cad. No:15 Çankaya/Ankara",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    workingDays: [
      { day: "Pazartesi", startTime: "09:00", endTime: "18:00", isActive: true },
      { day: "Salı", startTime: "09:00", endTime: "18:00", isActive: true },
      { day: "Çarşamba", startTime: "09:00", endTime: "18:00", isActive: true },
      { day: "Perşembe", startTime: "09:00", endTime: "18:00", isActive: true },
      { day: "Cuma", startTime: "09:00", endTime: "17:00", isActive: true },
      { day: "Cumartesi", startTime: "10:00", endTime: "14:00", isActive: false },
      { day: "Pazar", startTime: "-", endTime: "-", isActive: false }
    ],
    leaveDates: [
      { startDate: "2024-09-20", endDate: "2024-09-22", reason: "Yıllık İzin" },
      { startDate: "2024-10-15", endDate: "2024-10-15", reason: "Sağlık Raporu" },
      { startDate: "2024-11-01", endDate: "2024-11-03", reason: "Eğitim Semineri" }
    ]
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDayClassName = (isActive) => {
    return `flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
      isActive 
        ? 'bg-green-50 border-green-200 text-green-800' 
        : 'bg-gray-50 border-gray-200 text-gray-500'
    }`;
  };
   
 
  

  return (
    <div className="h-[85vh] w-full overflow-y-auto  bg-gray-50 p-4 lg:p-8">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="relative">
                {doctor?.profileImage && <Image 
                  src={doctor?.profileImage} 
                  alt={doctor?.name}
                  height={500} width={500}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />}
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
              </div>
              
              <div className="flex-1 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">Dt.{doctor?.name}</h1>
                   
                    
                    <div className="flex flex-wrap gap-4 text-sm opacity-90">
                      <div className="flex items-center gap-2">
                        <FaPhone className="w-4 h-4" />
                        <span>{doctor?.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMailBulk className="w-4 h-4" />
                        <span>{doctor?.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white text-black cursor-pointer bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-200 self-start lg:self-center"
                  >
                    {isEditing ? <FaSave className="w-4 h-4" /> : <FaEdit className="w-4 h-4" />}
                    {isEditing ? 'Kaydet' : 'Düzenle'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Çalışma Saatleri */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className='flex items-center gap-3'>
                   <div className="p-2 bg-blue-100 rounded-lg">
                  <FaClock className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Çalışma Saatleri</h2>

                </div>
               
               <div className='flex items-center gap-3'> <button
                onClick={()=>setAddModal(true)}
                 className='p-2  text-xl font-semibold rounded-full text-white bg-gradient-to-l cursor-pointer shadow-lg to-blue-500 from-green-600'>
                  <IoAdd /></button>
                   <button
                onClick={()=>setAddModal(true)}
                 className='p-2  text-xl font-semibold rounded-full text-white bg-gradient-to-l cursor-pointer shadow-lg to-green-500 from-blue-600'>
                  <MdEdit /></button></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctor?.availableSchedule.map((schedule, index) => (
                  <div key={index} className=' bg-green-200 py-5 px-10 rounded-lg '>
                    <div>
                      <h3 className="font-semibold text-lg">{schedule.day}</h3>
                      <p className="text-sm opacity-75">
                          {schedule.startHour} - {schedule.endHour}
                      </p>
                    </div>
                    {schedule.isActive && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* İzin Tarihleri */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaCalendar className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">İzin Tarihleri</h2>
              </div>
              
              <div className="space-y-4">
                {doctorData.leaveDates.length > 0 ? (
                  doctorData.leaveDates.map((leave, index) => (
                    <div key={index} className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <FiAlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-semibold text-orange-800 mb-1">{leave.reason}</p>
                          <p className="text-sm text-orange-600">
                            {leave.startDate === leave.endDate ? (
                              formatDate(leave.startDate)
                            ) : (
                              `${formatDate(leave.startDate)} - ${formatDate(leave.endDate)}`
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaCalendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Henüz izin talebi bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>

            {/* İstatistikler */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Bu Ay İstatistikleri</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Toplam Hasta</span>
                  <span className="text-2xl font-bold text-blue-600">142</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Tamamlanan Randevu</span>
                  <span className="text-2xl font-bold text-green-600">138</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">İptal Edilen</span>
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">Başarı Oranı</span>
                  <span className="text-2xl font-bold text-purple-600">97%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* çalışma saati ekle modal */}
      {addModal && <AddWorkHourModal setAddModal={setAddModal} doctor={doctor} setDoctor={setDoctor}/>}
      {/* bilgileri düzenle modal */}
      {isEditing && (
        <EditDoctorModal  
        doctor={doctor} 
        setDoctor={setDoctor} 
        setIsEditing={setIsEditing}
        admin={admin}
         />     
          )}
    </div>
  );
};

export default DoctorDetailPanel;