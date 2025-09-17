"use client"
import api from '@/app/utilis/api'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaMailBulk } from 'react-icons/fa'
import { FaCalendar, FaPhone, FaUser, FaUserCheck } from 'react-icons/fa6'
import { FiLoader } from 'react-icons/fi'


const List = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [admin,setAdmin]= useState();
  const [filteredDoctors,setFilteredDoctors] = useState([])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        const response = await api.get("/doctor/all")
        setDoctors(response.data)
      } catch (err) {
        setError('Doktorlar yüklenirken bir hata oluştu')
        console.error('Error fetching doctors:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
      api.get("/auth/me").then(res=> {
    setAdmin(res.data)
    }).catch(err=>console.log(err)
    )

  }, [])

  useEffect(()=> {
    if(!admin || !doctors) return
    if(admin.type==="private") {
        const filtered = doctors.filter(doc => doc.type !== admin.type)
    setFilteredDoctors(filtered)
    }else {
      setFilteredDoctors(doctors)
    }

  },[admin,doctors])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="h-[85vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <FiLoader className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium">Doktorlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[85vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FaUser className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Hata Oluştu</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[85vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FaUserCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Doktor Listesi
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sistemde kayıtlı tüm doktorları görüntüleyin ve yönetin
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Toplam {filteredDoctors.length} doktor
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-1 truncate">
                    {doctor.name}
                  </h3>
  
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMailBulk className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-sm truncate" title={doctor.email}>
                      {doctor.email}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPhone className="w-4 h-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium">
                      {doctor.phone}
                    </span>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <FaCalendar className="w-4 h-4" />
                    <span className="text-xs">
                      Kayıt: {formatDate(doctor.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Aktif</span>
                    </div>
                  </div>
                  <Link href={`/admin/doktorlar/${doctor._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors duration-200">
                    Detaylar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaUser className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz doktor kaydı yok
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Sisteme henüz doktor eklenmemiş. Yeni doktor eklemek için ilgili sayfayı ziyaret edin.
            </p>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default List