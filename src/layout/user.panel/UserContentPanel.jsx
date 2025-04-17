import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ProfilePanel from "./panels/ProfilePanel";
import NotificationsPanel from "./panels/NotificationsPanel";
import SettingsPanel from "./panels/SettingsPanel";
import VerticalIconMenu from "./components/VerticalIconMenu";

const panelComponents = {
  settings: SettingsPanel,
  notifications: NotificationsPanel,
  profile: ProfilePanel, // ✅ ekledik
};

export default function UserContentPanel({ type, onClose }) {
  const panelRef = useRef(null);
  const [activeType, setActiveType] = useState(type);

  const PanelContent = panelComponents[activeType];

  // Dışarıdan yeni type gelirse güncelle
  useEffect(() => {
    setActiveType(type);
  }, [type]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
      <div
        ref={panelRef}
        className="flex h-full w-full max-w-[600px] bg-white dark:bg-gray-900 shadow-xl border-l border-gray-200 dark:border-gray-700 animate-slide-in"
      >
        <VerticalIconMenu
          activePanel={activeType}
          onTogglePanel={setActiveType}
          isSidebar
        />

        <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold dark:text-white capitalize">
              {activeType}
            </h2>
            <button
              onClick={() => onClose(null)}
              className="text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <X size={20} />
            </button>
          </div>

          {PanelContent ? <PanelContent /> : <p>Unknown panel</p>}

          <div className="pt-8 text-center text-xs text-gray-400 dark:text-gray-500">
            Qatip App – v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
