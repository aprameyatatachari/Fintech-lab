import React, { InputHTMLAttributes, useState } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  hint,
  id,
  className = '',
  leftIcon,
  rightIcon,
  containerClassName = '',
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <div className={`mb-4 ${containerClassName}`}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <div className={`relative ${isFocused ? 'ring-2 ring-indigo-500 rounded-lg' : ''}`}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} 
            ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : hint ? (
        <p className="text-xs mt-1 text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
};

export default InputField;