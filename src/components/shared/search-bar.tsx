import React from 'react'
import { Category } from '@/__mocks__/category.mock'

const SearchBar = () => {
    return (
        <div className=" bg-white rounded-full max-w-xl flex items-center w-full overflow-hidden shadow-sm border border-gray-200">
            <div className="bg-gray-200 p-3">
                <select className="text-xs outline-none focus:outline-none bg-transparent">
                    {
                        Category.map((category) => {
                            return <option key={category} value={category}>{category}</option>
                        })
                    }
                </select>
            </div>
            <div className='flex w-full justify-between px-4'>
                <input type="search" name="" id="" placeholder="search entire store here..." x-model="q" className="w-full text-sm outline-none focus:outline-none bg-transparent" />
                <button className="outline-none focus:outline-none"><svg className=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
            </div>
        </div>
    )
}

export default SearchBar