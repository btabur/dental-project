import Menu from '@/app/components/admin/Menu'
import React from 'react'

const AdminLayout = ({children}) => {
  return (
    <main className='flex min-h-[95vh] w-full bg-slate-200'>
      <Menu/>
      {children}
    </main>
  )
}

export default AdminLayout