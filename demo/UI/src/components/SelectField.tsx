import React, { SelectHTMLAttributes } from 'react';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
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
      <select
        id={id}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...rest}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SelectField;