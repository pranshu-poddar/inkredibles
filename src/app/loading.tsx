import Spinner from '@/components/shared/spinner'
import React from 'react'

function loading() {
  return (
   <div className='w-screen h-screen flex justify-center fixed inset-0 items-center bg-white/50 backdrop-blur'>
    <Spinner/>
   </div>
  )
}

export default loading