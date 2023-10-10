import React from 'react'

function Search({ onSearch }) {
  return (
    <input
    type="text"
    placeholder="Search tasks..."
    onChange={(e) => onSearch(e.target.value)}
    className="border rounded p-1 w-[150px] text-sm"
/>
  )
}

export default Search