import api from '@/app/utilis/api';
import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { FaCalendar, FaClock, FaPlus, FaX } from 'react-icons/fa6';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';


const PermissionHour = ({ setEditPermissionHour, doctor, setDoctor }) => {
  const [activeTab, setActiveTab] = useState('hours');
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] =  useState(false)
  
  // Form states for hours
  const [hourForm, setHourForm] = useState({
    date: '',
    startHour: '',
    endHour: '',
    reason: ''
  });
  
  // Form states for days
  const [dayForm, setDayForm] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const formatDate = (date) => {
    console.log(date);
    
    return new Date(date).toLocaleDateString('tr-TR');
  };

  const formatTime = (time) => {
    return time || '--:--';
  };

  const handleAddHour = () => {
    if (hourForm.date && hourForm.startHour && hourForm.endHour && hourForm.reason) {
        setLoading(true)
      const newHour = {
        date: new Date(hourForm.date),
        startHour: hourForm.startHour,
        endHour: hourForm.endHour,
        reason: hourForm.reason
      };
      const updatedUnWorksHours = [...(doctor.unWorkHours || []),newHour]
      api.put(`/doctor/update?id=${doctor._id}`,{
        unWorkHours: updatedUnWorksHours
      }).then(()=> {
        toast.success("İzin saati eklendi");
         setDoctor(prev => ({
        ...prev,
            unWorkHours: [...(prev.unWorkHours || []), newHour]
        }));
      
      setHourForm({ date: '', startHour: '', endHour: '', reason: '' });
      setShowAddForm(false);

      }).catch(err=> {
        toast.error("İzin saati eklenirken hata oluştu")
        console.log(err);
        
      })
      setLoading(false)

    }
  };

  const handleAddDay = () => {
    if (dayForm.startDate && dayForm.endDate && dayForm.reason) {
        setLoading(true)
      const newDay = {
        date: new Date(dayForm.date),
        reason: dayForm.reason
      };
       api.put(`/doctor/update?id=${doctor._id}`,{
        unWorkDays: [...(doctor.unWorkDays || []),newDay]
       }).then(()=> {
        toast.success("İzin günü eklendi")
         setDoctor(prev => ({
        ...prev,
        unWorkDays: [...(prev.unWorkDays || []), newDay]
      }));
      
      setDayForm({ date: '', reason: '' });
      setShowAddForm(false);

       }).catch(err=> {
        toast.error("İzin günü eklenirken hata oluştu")
        console.log(err);
        
       })
       setLoading(false)
     
    }
  };

  const handleEditHour = (index, updatedHour) => {
    setLoading(true)

    const updated = doctor.unWorkHours.map((hour, i) => 
        i === index ? { ...hour, ...updatedHour } : hour
      )
      api.put(`/doctor/update?id=${doctor._id}`, {
        unWorkHours: updated
      }).then(()=> {
        toast.success("İzin saati güncellendi")
        setDoctor(prev => ({
        ...prev,
        unWorkHours: prev.unWorkHours.map((hour, i) => 
            i === index ? { ...hour, ...updatedHour } : hour
        )
        }));
        setEditingItem(null);

      }).catch(err=> {
        toast.error("İzin saati güncellenirken hata oluştu")
        console.log(err);
      })
      setLoading(false)

    
  };

  const handleEditDay = (index, updatedDay) => {
    setLoading(true)

    const updated = doctor.unWorkDays.map((day, i) => 
        i === index ? { ...day, ...updatedDay } : day
      )
         api.put(`/doctor/update?id=${doctor._id}`, {
            unWorkDays: updated
         }).then(()=> {
            toast.success("İzin günü güncellendi")
              setDoctor(prev => ({
            ...prev,
            unWorkDays: prev.unWorkDays.map((day, i) => 
                i === index ? { ...day, ...updatedDay } : day
            )
            }));
            setEditingItem(null);

         }).catch(err=> {
            toast.error("İzin günü güncellenirken hata oluştu")
            console.log(err);
            
         })
         setLoading(false)
  
  };

  const handleDeleteHour = (index) => {
    setLoading(true)
    const updated = doctor.unWorkHours.filter((_, i) => i !== index);
     api.put(`/doctor/update?id=${doctor._id}`, {
        unWorkHours: updated
     }).then(()=> {
        toast.success("İzin saati silindi");
         setDoctor(prev => ({
        ...prev,
        unWorkHours: prev.unWorkHours.filter((_, i) => i !== index)
        }));

     }).catch(err=> {
        toast.error("İzin saati silinirken hata oluştu")
        console.log(err);
        
     })
     setLoading(false)
   
  };

  const handleDeleteDay = (index) => {
    setLoading(true)
    const updated = doctor.unWorkDays.filter((_, i) => i !== index);
     api.put(`/doctor/update?id=${doctor._id}`, {
        unWorkDays: updated
      }).then(()=> {
        toast.success("İzin günü silindi")
         setDoctor(prev => ({
        ...prev,
        unWorkDays: prev.unWorkDays.filter((_, i) => i !== index)
        }));

      }).catch(err => {
        toast.error("İzin günü silinirken hata oluştu")
        console.log(err);
      })
      setLoading(false)
  };

  const EditHourForm = ({ hour, index, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
      date: hour.date ? new Date(hour.date).toISOString().split('T')[0] : '',
      startHour: hour.startHour || '',
      endHour: hour.endHour || '',
      reason: hour.reason || ''
    });

    return (
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sebep</label>
            <input
              type="text"
              value={editData.reason}
              onChange={(e) => setEditData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="İzin sebebi"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlangıç Saati</label>
            <input
              type="time"
              value={editData.startHour}
              onChange={(e) => setEditData(prev => ({ ...prev, startHour: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bitiş Saati</label>
            <input
              type="time"
              value={editData.endHour}
              onChange={(e) => setEditData(prev => ({ ...prev, endHour: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSave(index, editData)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
             disabled={loading}
          >
            <FaSave size={16} />
            {loading ? "Kaydediliyor...":"Kaydet"}
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaX size={16} />
            İptal
          </button>
        </div>
      </div>
    );
  };

  const EditDayForm = ({ day, index, onSave, onCancel }) => {
    const [editData, setEditData] = useState({
      startDate: day.startDate ? new Date(day.startDate).toISOString().split('T')[0] : '',
      endDate: day.endDate ? new Date(day.endDate).toISOString().split('T')[0] : '',
      reason: day.reason || ''
    });

    return (
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarih(Başlangıç)</label>
            <input
              type="date"
              value={editData.startDate}
              onChange={(e) => setEditData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tarih(Bitiş)</label>
            <input
              type="date"
              value={editData.endDate}
              onChange={(e) => setEditData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sebep</label>
            <input
              type="text"
              value={editData.reason}
              onChange={(e) => setEditData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="İzin sebebi"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onSave(index, editData)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
             disabled={loading}
          >
            <FaSave size={16} />
            {loading ? "Kaydediliyor...": "Kaydet"}
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaX size={16} />
            İptal
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white  rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">İzin Yönetimi</h2>
              <p className="text-blue-100 mt-1">Dr. {doctor.name}</p>
            </div>
            <button
              onClick={() => setEditPermissionHour(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <FaX size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('hours')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hours'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaClock className="w-4 h-4 inline-block mr-2" />
              İzin Saatleri
            </button>
            <button
              onClick={() => setActiveTab('days')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'days'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaCalendar className="w-4 h-4 inline-block mr-2" />
              İzin Günleri
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'hours' && (
            <div>
              {/* Add Hour Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus size={16} />
                  Yeni İzin Saati Ekle
                </button>
              </div>

              {/* Add Hour Form */}
              {showAddForm && activeTab === 'hours' && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-medium mb-4">Yeni İzin Saati Ekle</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tarih</label>
                      <input
                        type="date"
                        value={hourForm.date}
                        onChange={(e) => setHourForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sebep</label>
                      <input
                        type="text"
                        value={hourForm.reason}
                        onChange={(e) => setHourForm(prev => ({ ...prev, reason: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="İzin sebebi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Başlangıç Saati</label>
                      <input
                        type="time"
                        value={hourForm.startHour}
                        onChange={(e) => setHourForm(prev => ({ ...prev, startHour: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bitiş Saati</label>
                      <input
                        type="time"
                        value={hourForm.endHour}
                        onChange={(e) => setHourForm(prev => ({ ...prev, endHour: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddHour}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                       disabled={loading}
                    >
                      <FaSave size={16} />
                      {loading ?   "Kaydediliyor...":"Kaydet"}
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <FaX size={16} />
                      İptal
                    </button>
                  </div>
                </div>
              )}

              {/* Hours List */}
              <div className="space-y-4">
                {doctor.unWorkHours && doctor.unWorkHours.length > 0 ? (
                  doctor.unWorkHours.map((hour, index) => (
                    <div key={index}>
                      {editingItem === `hour-${index}` ? (
                        <EditHourForm
                          hour={hour}
                          index={index}
                          onSave={handleEditHour}
                          onCancel={() => setEditingItem(null)}
                        />
                      ) : (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Tarih</span>
                                <p className="text-gray-900">{formatDate(hour.date)}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">Saat Aralığı</span>
                                <p className="text-gray-900">{formatTime(hour.startHour)} - {formatTime(hour.endHour)}</p>
                              </div>
                              <div className="col-span-2">
                                <span className="text-sm font-medium text-gray-500">Sebep</span>
                                <p className="text-gray-900">{hour.reason}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => setEditingItem(`hour-${index}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <FiEdit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteHour(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                 disabled={loading}
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaClock size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Henüz izin saati tanımlanmamış</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'days' && (
            <div>
              {/* Add Day Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus size={16} />
                  Yeni İzin Günü Ekle
                </button>
              </div>

              {/* Add Day Form */}
              {showAddForm && activeTab === 'days' && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-medium mb-4">Yeni İzin Günü Ekle</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tarih(Başlangış)</label>
                      <input
                        type="date"
                        value={dayForm.startDate}
                        onChange={(e) => setDayForm(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                      <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tarih(Bitiş)</label>
                      <input
                        type="date"
                        value={dayForm.endDate}
                        onChange={(e) => setDayForm(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sebep</label>
                      <input
                        type="text"
                        value={dayForm.reason}
                        onChange={(e) => setDayForm(prev => ({ ...prev, reason: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="İzin sebebi"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddDay}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                       disabled={loading}
                    >
                      <FaSave size={16} />
                    {loading ?   "Kaydediliyor...":"Kaydet"}
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <FaX size={16} />
                      İptal
                    </button>
                  </div>
                </div>
              )}

              {/* Days List */}
              <div className="space-y-4">
                {doctor.unWorkDays && doctor.unWorkDays.length > 0 ? (
                  doctor.unWorkDays.map((day, index) => (
                    <div key={index}>
                      {editingItem === `day-${index}` ? (
                        <EditDayForm
                          day={day}
                          index={index}
                          onSave={handleEditDay}
                          onCancel={() => setEditingItem(null)}
                          
                        />
                      ) : (
                        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="grid grid-cols-2 gap-4 flex-1">
                              <div>
                                <span className="text-sm font-medium text-gray-500">Tarih</span>
                                <p className="text-gray-900">{formatDate(day.startDate)}- {formatDate(day.endDate)}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-500">Sebep</span>
                                <p className="text-gray-900">{day.reason}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => setEditingItem(`day-${index}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <FiEdit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteDay(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                disabled={loading}
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaCalendar size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Henüz izin günü tanımlanmamış</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={() => setEditPermissionHour(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Tamamla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionHour;