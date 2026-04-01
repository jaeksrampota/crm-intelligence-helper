export function CreditGauge({ value, max }: { value: number; max: number }) {
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  const color = ratio > 0.8 ? '#F44336' : ratio > 0.5 ? '#FF9800' : '#4CAF50';

  const radius = 30;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - ratio);

  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="45" viewBox="0 0 80 45">
        <path
          d="M 5 40 A 35 35 0 0 1 75 40"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 5 40 A 35 35 0 0 1 75 40"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${offset}`}
          className="transition-all duration-500"
        />
      </svg>
      <span className="text-xs font-semibold -mt-1" style={{ color }}>
        {Math.round(ratio * 100)}%
      </span>
    </div>
  );
}
