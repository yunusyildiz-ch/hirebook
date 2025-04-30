import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  label = "Password",
  value,
  onChange,
  placeholder,
  name = "password",
  disabled = false,
  required = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={className}>
      {/* Input with toggle button on the right */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          disabled={disabled}
           className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          tabIndex={-1}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}