import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, setNameError, setTaskError } from '../Redux-Toolkit/TaskSlice';

function InputTasks({ value, onChange, placeholder, errorType  }) {
  const dispatch = useDispatch();

  const nameError = useSelector(state => state.tasks.nameError);
  const taskError = useSelector(state => state.tasks.taskError);
  let error;
  if(errorType === "name") {
      error = nameError;
  } else if(errorType === "task") {
      error = taskError;
  }

  const handleInputChange = (e) => {
    dispatch(onChange(e.target.value));
    
    if(errorType === "name") {
      dispatch(setNameError(null));
    } else if(errorType === "task") {
      dispatch(setTaskError(null));
    }
    // dispatch(clearError());  // Clear the error when the input value changes
  }

  return (
    <div className="">
      <input 
          type="text"
          value={value}
          placeholder={placeholder}
          // onChange={(e) => dispatch(onChange(e.target.value))}
          onChange={handleInputChange}
          className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
  );
}


export default InputTasks


{/* <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='border-black border-[.1rem] rounded-lg mb-4 w-[250px] p-2'
 /> */}