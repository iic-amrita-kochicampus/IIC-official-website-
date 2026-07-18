export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div className={`admin-card ${hover ? 'admin-card-hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
