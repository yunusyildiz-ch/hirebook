import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  label = "Password",
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
  disabled = false,
  required = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={className}>
      {/* Label without icon */}
      <label className="block mb-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Password field with right-side toggle icon */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="w-full p-2 pr-10 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
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