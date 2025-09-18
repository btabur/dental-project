import api from "@/app/utilis/api";
import React, { useState } from "react";
import { IoCloseOutline, IoPersonOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const AddWorkHourModal = ({ doctor, setDoctor, setAddWorkHour }) => {
  const [workHour, setWorkHour] = useState({
    day: "",
    start: "",
    end: "",
  });

  // Input değişikliklerini yakala
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkHour((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ Yeni çalışma saati nesnesi
  const newWorkHour = {
    day: workHour.day,
    startHour: workHour.start,
    endHour: workHour.end,
  };

  // 2️⃣ Eski çalışma saatlerine yenisini ekle
  const updatedSchedule = [
    ...(doctor.availableSchedule || []),
    newWorkHour,
  ];

  try {
    // 3️⃣ Backend'e güncellenmiş schedule gönder
    await api.put(`/doctor/update?id=${doctor._id}`, {
      availableSchedule: updatedSchedule,
    });

    // 4️⃣ Frontend state’i güncelle
    setDoctor((prev) => ({
      ...prev,
      availableSchedule: updatedSchedule,
    }));

    // Modalı kapat
    setAddWorkHour(false);
    toast.success("Çalışma Saati başarıyla eklendi");
  } catch (error) {
    console.error("Çalışma saati eklenirken hata:", error);
  }
};


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-[70%] max-w-lg max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Çalışma Saati Ekle</h2>
              <div className="flex items-center gap-4 mt-2 text-blue-100">
                <div className="flex items-center gap-1">
                  <IoPersonOutline />
                  <span className="text-sm">{doctor?.name}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setAddWorkHour(false)}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Gün seçme */}
            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gün Seçin
              </label>
              <select
                name="day"
                id="day"
                value={workHour.day}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Gün seçin</option>
                <option value="Pazartesi">Pazartesi</option>
                <option value="Salı">Salı</option>
                <option value="Çarşamba">Çarşamba</option>
                <option value="Perşembe">Perşembe</option>
                <option value="Cuma">Cuma</option>
                <option value="Cumartesi">Cumartesi</option>
                <option value="Pazar">Pazar</option>
              </select>
            </div>

            {/* Saat girişleri */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Başlama Saati
                </label>
                <input
                  type="time"
                  name="start"
                  value={workHour.start}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitiş Saati
                </label>
                <input
                  type="time"
                  name="end"
                  value={workHour.end}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            {/* Ekle butonu */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              Ekle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWorkHourModal;
