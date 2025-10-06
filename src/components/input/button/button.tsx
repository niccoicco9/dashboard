type ButtonVariant = "outlined" | "contained";

interface ButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

function Button({
  title,
  onClick,
  icon,
  variant = "outlined",
}: Readonly<ButtonProps>) {
  const baseClassName =
    "group flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-1 cursor-pointer min-w-fit";

  const variantStyles = {
    outlined:
      "text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-gray-200 border border-gray-200 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-gray-800 dark:border-gray-800",
    contained:
      "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-300 border border-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:border-white",
  } as const;

  return (
    <button
      className={`${baseClassName} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {icon}
      {title}
    </button>
  );
}

export default Button;
