import WindowsLogo from "@assets/WindowsLogo";
import AppleLogo from "@assets/AppleLogo";

export default function DownloadSection({ onComingSoon }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      {/* Mac Button */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onComingSoon();
        }}
        className="flex-1 flex items-center justify-center gap-2 
          bg-black text-white 
          px-4 py-1 rounded-lg 
          hover:bg-gray-800 
          transition-colors duration-200"
      >
        <AppleLogo className="w-5 h-5 fill-white" />
        Download for Mac
      </a>

      {/* Windows Button */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onComingSoon();
        }}
        className="flex-1 flex items-center justify-center gap-2 
          bg-black text-white 
          px-4 py-1 rounded-lg 
          hover:bg-gray-800 
          transition-colors duration-200"
      >
        <WindowsLogo className="w-5 h-5" />
        Download for Windows
      </a>
    </div>
  );
}