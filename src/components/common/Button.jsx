import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-sm shadow-primary/20',
  secondary: 'bg-secondary hover:opacity-90 text-white shadow-sm',
  accent: 'bg-accent hover:opacity-90 text-white shadow-sm',
  outline: 'border border-admin-border text-dark hover:border-primary hover:text-primary bg-admin-surface',
  ghost: 'text-dark hover:bg-admin-surface-2',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/20',
  success: 'bg-success hover:opacity-90 text-white shadow-sm',
};

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

export default function Button({
  children, variant = 'primary', size = 'md', className = '', icon: Icon, ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.button>
  );
}
