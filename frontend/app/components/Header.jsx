import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='flex items-center justify-between py-2 lg:px-20 px-4 shadow-lg'>
        <div>
            <h1 className='text-xl font-semibold'>Dental</h1>
        </div>
        <div className='flex items-center gap-3'>
            <Link href={"/giris-yap"} className='py-2 px-6 bg-green-500 rounded-lg text-white font-semibold cursor-pointer
            hover:border-2 hover:border-green-500 hover:bg-white hover:text-green-500'>Giriş Yap</Link>
            <Link href={"/kayit-ol"} className='py-2 px-6 border-2 border-green-500 rounded-lg text-green-500 
            cursor-pointer font-semibold hover:border-2 hover:border-white hover:bg-green-500 hover:text-white'>Kayıt Ol</Link>
        </div>

    </header>
  )
}

export default Header