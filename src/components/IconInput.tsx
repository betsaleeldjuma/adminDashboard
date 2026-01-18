import type { ReactNode, ChangeEvent } from "react";

interface IconInputProps {
  icon: ReactNode;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default function IconInput({
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}: IconInputProps) {
  return (
    <div className="relative w-full mb-3">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        {icon}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-4 py-3 rounded-xl
          bg-white/80 border border-gray-200
          focus:outline-none focus:ring-2 focus:ring-sky-300
        "
      />
    </div>
  );
}