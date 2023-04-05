import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', name, id, value, className, autoComplete, required, isFocused, handleChange, placeholder, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `text-[8pt] border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md shadow-sm w-full` +
                    className
                }
                {...props}
                placeholder={placeholder}
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
    );
});
