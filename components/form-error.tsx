import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}
export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="font-bold bg-red-300 dark:bg-red-700 px-3 py-2 rounded-md flex items-center gap-x-2 text-sm md:text-base text-black dark:text-white">
      <FaExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
