import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="flex items-start justify-center h-[calc(100vh-2.5rem)] xl:h-[calc(100vh-3.5rem)]">
      <div className="h-[70%] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-12 h-12 md:w-16 md:h-16 xl:w-24 xl:h-24 animate-spin" />
      </div>
    </div>
  );
}
