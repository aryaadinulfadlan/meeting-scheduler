import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message?: string;
}
export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="font-bold bg-emerald-400 dark:bg-emerald-700 px-3 py-2 rounded-md flex items-center gap-x-2 text-sm lg:text-base text-black dark:text-white">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
