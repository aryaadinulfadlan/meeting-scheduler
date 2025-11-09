import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string;
}
export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500 dark:bg-emerald-300 p-3 rounded-md flex items-center gap-x-2 text-sm lg:text-base text-emerald-900 dark:text-emerald-400">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
