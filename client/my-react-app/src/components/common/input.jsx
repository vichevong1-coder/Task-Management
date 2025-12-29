const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon,
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3 
            ${icon ? 'pl-11' : 'pl-4'}
            border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            placeholder:text-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;