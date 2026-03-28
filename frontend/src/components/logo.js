export default function Logo({ className = "h-8 w-auto" }) {
  return (
    <img 
      src="/logo.svg" 
      alt="CircuitSetu Logo" 
      className={className} 
      draggable="false"
    />
  );
}