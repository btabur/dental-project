"use client"
import api from '@/app/utilis/api';
import React, { useState } from 'react'
import { CiMail } from 'react-icons/ci';
import { FaUserMd } from 'react-icons/fa';
import { FaLock, FaPhone, FaUser } from 'react-icons/fa6';
import { IoLogoAppleAr } from 'react-icons/io5';
import { toast } from 'react-toastify';

const EditDoctorModal = ({doctor,setDoctor,setIsEditing}) => {

     const [focusedField, setFocusedField] = useState('');
   const[loading,setLoading]=useState(false)

    const [formData, setFormData] = useState({
      name: doctor?.name || "",
      email: doctor?.email || "",
      profileImage:doctor?.profileImage || "",
      phone: doctor?.phone || "",
      password: "****"
    });
    const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData(prev => ({
            ...prev,
            [name]: value
          }));
        };
      
         const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
           
        
            // Dosya boyutunu kontrol et ( sınırı)
            const maxSize =  1024 * 1024; // 1mb
            if (file.size > maxSize) {
              toast.error("Dosya boyutu 1mb'dan büyük olmamalıdır.");
              return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setFormData({ ...formData, profileImage: reader.result });
            };
          }
        };
    
        const handleSubmit =async (e) => {
        e.preventDefault();
        try {
          setLoading(true)
        const response =  await api.put(`/doctor/update?id=${doctor._id}`,{
          name:formData.name,
          email:formData.email,
          password:formData.password,
          profileImage:formData.profileImage,
          phone:formData.phone
        });

        setDoctor(response.data)
        toast.success("Doktor başarı ile güncellendi");
        setLoading(false);
        setIsEditing(false)
        
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Doktor eklerken bir hata oluştu");
          setLoading(false)
        }
      };
      
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="w-[75%] mt-10">
              
               {/* Form Card */}
               <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
                 <div className="space-y-6 relative">
                    <h2 className='text-center text-2xl font-semibold'> Doktor Bilgilerini Düzenle</h2>

                    <button 
                    onClick={()=>setIsEditing(false)}
                    className='p-3 bg-black w-8 h-8 font-semibold rounded-full text-white flex items-center justify-center
                    absolute top-0 right-0 cursor-pointer'>X</button>
                   {/* Name Field */}
                   <div className="relative">
                     <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                       Adı Soyadı
                     </label>
                     <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <FaUser className={`w-5 h-5 transition-colors duration-200 ${
                           focusedField === 'name' ? 'text-blue-600' : 'text-gray-400'
                         }`} />
                       </div>
                       <input
                         type="text"
                         id="name"
                         name="name"
                         value={formData.name}
                         onChange={handleInputChange}
                         onFocus={() => setFocusedField('name')}
                         onBlur={() => setFocusedField('')}
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                         placeholder="Doktorun tam adını giriniz"
                         required
                       />
                     </div>
                   </div>
                    {/* Name Field */}
                   <div className="relative">
                     <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                       Profil Fotoğrafı
                     </label>
                     <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <IoLogoAppleAr className={`w-5 h-5 transition-colors duration-200 ${
                           focusedField === 'profileImage' ? 'text-blue-600' : 'text-gray-400'
                         }`} />
                       </div>
                      <input
                         onChange={handleFileChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                         type="file"
                         name="profileImage"
                         id="profileImage"
                         accept="image/*"
                       />
                     </div>
                   </div>
       
       
                   {/* Email Field */}
                   <div className="relative">
                     <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                       Email Adresi
                     </label>
                     <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <CiMail className={`w-5 h-5 transition-colors duration-200 ${
                           focusedField === 'email' ? 'text-blue-600' : 'text-gray-400'
                         }`} />
                       </div>
                       <input
                         type="email"
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         onFocus={() => setFocusedField('email')}
                         onBlur={() => setFocusedField('')}
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                         placeholder="ornek@hastane.com"
                         required
                       />
                     </div>
                   </div>
       
                   {/* Phone Field */}
                   <div className="relative">
                     <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                       Telefon Numarası
                     </label>
                     <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <FaPhone className={`w-5 h-5 transition-colors duration-200 ${
                           focusedField === 'phone' ? 'text-blue-600' : 'text-gray-400'
                         }`} />
                       </div>
                       <input
                         type="tel"
                         id="phone"
                         name="phone"
                         value={formData.phone}
                         onChange={handleInputChange}
                         onFocus={() => setFocusedField('phone')}
                         onBlur={() => setFocusedField('')}
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                         placeholder="0555 123 45 67"
                         required
                       />
                     </div>
                   </div>
       
                   {/* Password Field */}
                   <div className="relative">
                     <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                       Şifre
                     </label>
                     <div className="relative">
                       <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                         <FaLock className={`w-5 h-5 transition-colors duration-200 ${
                           focusedField === 'password' ? 'text-blue-600' : 'text-gray-400'
                         }`} />
                       </div>
                       <input
                         type="password"
                         id="password"
                         name="password"
                         value={formData.password}
                         onChange={handleInputChange}
                         onFocus={() => setFocusedField('password')}
                         onBlur={() => setFocusedField('')}
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                         placeholder="Güçlü bir şifre oluşturun"
                         required
                       />
                     </div>
                   </div>
       
                   {/* Submit Button */}
                   <button
                     type="submit"
                     onClick={handleSubmit}
                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98] flex items-center justify-center gap-2"
                     disabled={loading}
                   >
                     <FaUserMd className="w-5 h-5" />
                     {loading ? "Güncelleniyor" : "Doktor Güncelle"}
                   </button>
       
                   {/* Additional Info */}
                   <div className="text-center pt-4">
                     <p className="text-sm text-gray-500">
                       Tüm alanlar zorunludur. Girilen bilgiler güvenli bir şekilde saklanacaktır.
                     </p>
                   </div>
       
                 </div>
               </div>
             </div>
        </div>
  )
}

export default EditDoctorModal