import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#BFA2FF] to-[#D9C8FF] text-white shadow-lg hover:scale-105 hover:shadow-xl",

  secondary:
    "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
};

function Button({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`
        rounded-2xl
        px-6
        py-3
        font-medium
        transition-all
        duration-300
        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer"
        }
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;