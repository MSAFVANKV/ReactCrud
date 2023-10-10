import React from 'react'
import { useDispatch } from 'react-redux';

function InputTasks({ value, onChange, placeholder }) {
  const dispatch = useDispatch();
  return (
      <input 
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => dispatch(onChange(e.target.value))}
          className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
      />
  );
}


export default InputTasks


{/* <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
 /> */}