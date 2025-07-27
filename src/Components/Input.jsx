import React, {useId} from 'react'
//useId generates a unique ID (stable across renders), useful for linking inputs with labels.
//React.forwardRef(...): Allows you to forward a ref from a parent component to this input element — useful for focusing or controlling the input from outside.
//Lets parent access the DOM node (like an <input>) inside the child.

//generally funtion and that returns.  React.forwardRef(...) takes a function as an argument, and returns a component that React understands can accept a ref.
const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){//ref also passed by parent 
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input