import React from 'react';

export function Button({ children, className = '', variant = 'solid', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variants = {
    solid: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };

  const cls = `${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.solid} ${className}`;

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

export default Button;
