import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-4 focus:ring-gray-200',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-200',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      )}
      {!loading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;