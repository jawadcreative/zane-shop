import React from 'react'

const SeacrhBar = () => {
    return (
        <div className="w-full flex justify-between items-center">
            <input placeholder='search something....' type="search" name="search" id="searchBar" className='py-2 px-6 w-lg border border-foreground/40 outline-none rounded-full' />
            <select name="category" id="category" className='p-2 flex gap-2 border border-foreground/40 rounded-md outline-none'>
                <option className='bg-background text-foreground' value="all" selected>All</option>
                <option className='bg-background text-foreground' value="stationary">Stationary</option>
                <option className='bg-background text-foreground' value="home-decore">Home Decoratione</option>
            </select>
        </div>
    )
}

export default SeacrhBar