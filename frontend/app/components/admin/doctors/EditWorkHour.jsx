"use client"
import api from '@/app/utilis/api';
import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { FaClock, FaPlus, FaX } from 'react-icons/fa6';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EditWorkHour = ({ doctor, setDoctor ,setEditWorkHour}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading,setLoading] = useState(false)
  const [newSchedule, setNewSchedule] = useState({
    day: '',
    startHour: '',
    endHour: ''
  });

  const days = [
    'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 
    'Cuma', 'Cumartesi', 'Pazar'
  ];

  // Gün sırası
  const dayOrder = {
    'Pazartesi': 1,
    'Salı': 2,
    'Çarşamba': 3,
    'Perşembe': 4,
    'Cuma': 5,
    'Cumartesi': 6,
    'Pazar': 7,
  };

   const [sortedSchedule, setSortedSchedule] = useState([]);
  
    useEffect(()=> {
      if(doctor?.availableSchedule) {
      const sorted = doctor?.availableSchedule
      ? [...doctor.availableSchedule].sort((a, b) => {
          if (dayOrder[a.day] !== dayOrder[b.day]) {
            return dayOrder[a.day] - dayOrder[b.day];
          }
          return a.startHour.localeCompare(b.startHour); // aynı günse saatine göre sırala
        })
      : [];
      setSortedSchedule(sorted)
      }
    },[doctor])

  const handleDelete = (indexToDelete) => {
    setLoading(true)
    const updatedSchedule = doctor.availableSchedule.filter((_, index) => index !== indexToDelete);
    api.put(`/doctor/update?id=${doctor._id}`,{
      availableSchedule: updatedSchedule
    }).then(()=> {
        toast.success("Çalışma saati silindi");
         setDoctor({
      ...doctor,
      availableSchedule: updatedSchedule
    })

    }).catch(err => {
      toast.error("Çalışma saati silinirken hata oluştu");
      console.log(err)
    })
    setLoading(false)
   
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm(doctor.availableSchedule[index]);
  };

  const handleSaveEdit = () => {
    if(!editForm.day || !editForm.startHour || !editForm.endHour) {
      toast.info("Lütfen tüm alanları doldurun")
    }
    setLoading(true)
    const updatedSchedule = [...doctor.availableSchedule];
    updatedSchedule[editingIndex] = editForm;

    api.put(`/doctor/update?id=${doctor._id}`, {
      availableSchedule: updatedSchedule
    }).then(()=> {
            toast.success("Çalışma saati güncellendi")
            setDoctor({
          ...doctor,
          availableSchedule: updatedSchedule
        });
        setEditingIndex(null);
        setEditForm({});
    }).catch(err => {
      toast.error("Çalışma saati düzenlerken hata oluştu")
      console.log(err);
      
    })
    setLoading(false)
   
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditForm({});
  };

  const handleAdd = () => {

    if (newSchedule.day && newSchedule.startHour && newSchedule.endHour) {
      setLoading(true)
      const updatedSchedule = [...doctor.availableSchedule, {
        ...newSchedule,
        _id: Date.now().toString() // Geçici ID
      }];

      api.put(`/doctor/update?id=${doctor._id}`, {
      availableSchedule: updatedSchedule,
    }).then(()=> {
        toast.success("Çalışma saati eklendi")
        setDoctor({
        ...doctor,
        availableSchedule: updatedSchedule
      });
      setNewSchedule({ day: '', startHour: '', endHour: '' });
      setShowAddForm(false);
    }).catch(err => {
        toast.error("Çalışma saati eklerken hata oluştu")
        console.log(err);
        
    })
      setLoading(false)
    }
  };

  const formatTime = (time) => {
    return time || '--:--';
  };

  const getDayColor = (day) => {
    const colors = {
      'Pazartesi': 'bg-blue-50 border-blue-200',
      'Salı': 'bg-green-50 border-green-200',
      'Çarşamba': 'bg-purple-50 border-purple-200',
      'Perşembe': 'bg-orange-50 border-orange-200',
      'Cuma': 'bg-pink-50 border-pink-200',
      'Cumartesi': 'bg-indigo-50 border-indigo-200',
      'Pazar': 'bg-red-50 border-red-200'
    };
    return colors[day] || 'bg-gray-50 border-gray-200';
  };

  return (
     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <article className="max-w-4xl h-[90vh] overflow-y-auto mx-auto p-6 bg-white rounded-2xl shadow-lg  w-full" >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 relative">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaClock className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 ">Çalışma Saatleri</h2>
            <button
            onClick={()=>setEditWorkHour(false)}
            className='border rounded-full p-2 absolute right-0 top-0 hover:bg-black hover:text-white transition-colors duration-75 cursor-pointer  '>
            <FaX className='font-semibold'/>
            </button>
        
        </div>
        <p className="text-gray-600">Dr. {doctor.name} için çalışma günleri ve saatlerini düzenleyin</p>
      </div>

      {/* Add New Schedule Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          <FaPlus className="w-4 h-4" />
          Yeni Çalışma Saati Ekle
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Yeni Çalışma Saati</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gün</label>
              <select
                value={newSchedule.day}
                onChange={(e) => setNewSchedule({...newSchedule, day: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Gün seçiniz</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Başlangıç</label>
              <input
                type="time"
                value={newSchedule.startHour}
                onChange={(e) => setNewSchedule({...newSchedule, startHour: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bitiş</label>
              <input
                type="time"
                value={newSchedule.endHour}
                onChange={(e) => setNewSchedule({...newSchedule, endHour: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              disabled={loading}
            >
             {!loading ?  "Ekle": "Ekleniyor..."}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewSchedule({ day: '', startHour: '', endHour: '' });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
            >
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="space-y-4">
        {sortedSchedule && sortedSchedule.length > 0 ? (
          sortedSchedule.map((schedule, index) => (
            <div
              key={schedule._id || index}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${getDayColor(schedule.day)}`}
            >
              {editingIndex === index ? (
                // Edit Mode
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gün</label>
                    <select
                      value={editForm.day || ''}
                      onChange={(e) => setEditForm({...editForm, day: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Başlangıç</label>
                    <input
                      type="time"
                      value={editForm.startHour || ''}
                      onChange={(e) => setEditForm({...editForm, startHour: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bitiş</label>
                    <input
                      type="time"
                      value={editForm.endHour || ''}
                      onChange={(e) => setEditForm({...editForm, endHour: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2 md:col-span-3">
                    <button
                      onClick={handleSaveEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                      disabled={loading}
                    >
                      <FaSave className="w-4 h-4" />
                      {!loading ? "Kaydet" : "Kaydediliyor..."}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                    >
                      <FaX className="w-4 h-4" />
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="font-semibold text-lg text-gray-800 min-w-[100px]">
                        {schedule.day}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaClock className="w-4 h-4" />
                        <span className="font-mono text-lg">
                          {formatTime(schedule.startHour)} - {formatTime(schedule.endHour)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      <FiEdit3 className="w-4 h-4" />
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                      disabled={loading}
                    >
                      <FiTrash2 className="w-4 h-4" />
                      {loading ? "Siliniyor...": "Sil"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FaClock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Henüz çalışma saati tanımlanmamış</h3>
            <p className="text-gray-500">Yeni çalışma saati eklemek için yukarıdaki butonu kullanın</p>
          </div>
        )}
      </div>

      {/* Summary */}
      {sortedSchedule && sortedSchedule.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Özet</h3>
          <p className="text-blue-700">
            Toplam {sortedSchedule.length} çalışma saati tanımlanmış
          </p>
        </div>
      )}
    </article>
     </div>
  );
};

export default EditWorkHour;
