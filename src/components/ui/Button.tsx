import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl';
  
  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20',
    secondary: 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-100',
    outline: 'bg-transparent border-2 border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-600',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
    xl: 'px-12 py-4 text-lg font-black',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
