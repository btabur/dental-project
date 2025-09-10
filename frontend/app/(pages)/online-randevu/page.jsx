"use client"
import React, { useState } from 'react'
import Header from '@/app/components/Header'

const OnlineRandevuPage = () => {
     const [step,setStep] = useState(1);
  return (
    <main>
        <Header/>

        <section>

                <article className="flex items-center justify-center relative gap-16 w-full max-w-xl mx-auto">
      {/* Step 1 */}
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 
          transition-all duration-300 
          ${step >= 1 ? "border-green-500 bg-green-500 text-white shadow-lg" : "border-gray-400 bg-white text-gray-500"}`}
        >
          {step > 1 ? <Check className="w-5 h-5" /> : <span>1</span>}
        </div>
        <span className="mt-2 text-sm font-medium text-gray-700">Öğrenci Bilgileri</span>
      </div>

      {/* Progress line */}
      <span
        className={`absolute top-[22px] left-1/4 w-1/2 h-1 rounded-full transition-all duration-500
        ${step >= 2 ? "bg-green-500" : "bg-gray-300"}`}
      ></span>

      {/* Step 2 */}
      <div className="flex flex-col items-center relative z-10">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 
          transition-all duration-300 
          ${step === 2 ? "border-green-500 bg-green-500 text-white shadow-lg" : "border-gray-400 bg-white text-gray-500"}`}
        >
          {step === 2 ? <span>2</span> : step > 2 ? <Check className="w-5 h-5" /> : <span>2</span>}
        </div>
        <span className="mt-2 text-sm font-medium text-gray-700">Ödeme Planı</span>
      </div>
    </article>

        </section>
    </main>
  )
}

export default OnlineRandevuPage