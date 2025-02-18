import React from 'react'

const ExpenseCard = ({amount, label}) => {
  return (
    <div className='flex h-[160px] min-w-[160px] bg-[#8B7F72] flex flex-col justify-center items-center px-3 py-1.5 space-y-2'>
      <p className='text-5xl'>{amount}.00</p>
      <p className='font-medium text-lg'>{label}</p>
    </div>
  )
}

export default ExpenseCard
