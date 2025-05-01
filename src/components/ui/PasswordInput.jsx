import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { getPasswordStrength } from "@/utils/passwordUtils";

export default function PasswordInput({
  label = "Password",
  labelClassName = "flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-300",
  value,
  onChange,
  name = "password",
  placeholder = "",
  disabled = false,
  required = false,
  className = "",
  showIcon = true,
  showStrength = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("empty");

  useEffect(() => {
    setStrength(getPasswordStrength(value));
  }, [value]);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const colorClass = {
    empty: "focus:ring-gray-300",
    weak: "border-red-500 focus:ring-red-500",
    medium: "border-yellow-500 focus:ring-yellow-500",
    strong: "border-green-500 focus:ring-green-500",
  }[strength];

  const strengthLabel = {
    empty: "",
    weak: "Weak password",
    medium: "Medium strength",
    strong: "Strong password",
  }[strength];

  const strengthTextColor = {
    weak: "text-red-500",
    medium: "text-yellow-600",
    strong: "text-green-600",
  }[strength];

  return (
    <div className={className}>
      <label className={labelClassName}>
        {showIcon && <Lock size={18} />}
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white 
          ${colorClass} focus:outline-none focus:border-transparent focus:ring-2 transition`}
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

      {showStrength && strength !== "empty" && (
        <div className={`mt-1 text-xs ${strengthTextColor}`}>
          {strengthLabel}
        </div>
      )}
    </div>
  );
}