"use client"
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { FaCalendar, FaCalendarCheck, FaClock, FaUser } from 'react-icons/fa6';
import { FiSettings } from 'react-icons/fi';
import EditDoctorModal from './EditDoctorModal';
import AddWorkHourModal from './AddWorkHourModal';


const Settings = ({doctor,setDoctor,admin}) => {

    const [editProfile,setEditProfile] = useState(false);
    const [addWorkHour,setAddWorkHour] = useState(false)
  const settingsOptions = [
    {
      id: 1,
      title: 'Doktor Bilgilerini Düzenle',
      description: 'Kişisel bilgilerinizi ve uzmanlık alanlarınızı güncelleyin',
      icon: FaUser,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      onClick: ()=> setEditProfile(true)
    },
    {
      id: 2,
      title: 'Çalışma Saati Ekle',
      description: 'Yeni çalışma saatlerinizi sistemize ekleyin',
      icon: FaClock,
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700',
      onClick: ()=> setAddWorkHour(true)
    },
    {
      id: 3,
      title: 'Çalışma Saati Düzenle',
      description: 'Mevcut çalışma saatlerinizi değiştirin',
      icon: FaEdit,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      id: 4,
      title: 'İzin Gir (Gün)',
      description: 'Tam gün izinlerinizi kaydedin',
      icon: FaCalendar,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    },
    {
      id: 5,
      title: 'İzin Gir (Saat)',
      description: 'Saatlik izin taleplerini oluşturun',
      icon: FaCalendarCheck,
      color: 'from-rose-500 to-rose-600',
      hoverColor: 'hover:from-rose-600 hover:to-rose-700'
    },
    {
      id: 6,
      title: 'İzinleri Düzenle',
      description: 'Mevcut izin kayıtlarınızı yönetin',
      icon: FiSettings,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
    }
  ];

  return (
    <div className="h-[89vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Doktor Ayarları
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hesabınızı ve çalışma programınızı kolayca yönetin
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={option.onClick}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Card Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} ${option.hoverColor} transition-all duration-300 mb-6 group-hover:scale-110`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                    {option.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {option.description}
                  </p>
                  
                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-500">
            Herhangi bir değişiklik yaptıktan sonra ayarlarınız otomatik olarak kaydedilir
          </p>
        </div>
      </div>
      {/* modals */}
      {editProfile && 
      <EditDoctorModal 
      doctor={doctor} 
      setDoctor={setDoctor} 
      admin={admin} 
      setEditProfile={setEditProfile} />}

      {addWorkHour && (
        <AddWorkHourModal doctor={doctor} setDoctor={setDoctor} setAddWorkHour={setAddWorkHour}/>
      )}

    </div>
  );
};

export default Settings;