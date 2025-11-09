import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}
export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;
  return (
    <div className="bg-red-300 p-3 rounded-md flex items-center gap-x-2 text-sm md:text-base text-red-800">
      <FaExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
