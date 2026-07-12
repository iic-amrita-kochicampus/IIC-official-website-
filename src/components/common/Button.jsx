import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-primary hover:bg-blue-700 text-white',
  secondary: 'bg-secondary hover:bg-purple-700 text-white',
  accent: 'bg-accent hover:bg-cyan-600 text-white',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary/10',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  success: 'bg-success hover:bg-emerald-600 text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children, variant = 'primary', size = 'md', className = '', icon: Icon, ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}
