import React, { InputHTMLAttributes } from 'react';

interface DatePickerFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  error,
  id,
  className = '',
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        type="date"
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...rest}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DatePickerField;
