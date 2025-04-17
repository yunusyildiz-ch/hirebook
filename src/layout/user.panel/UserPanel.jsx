import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import UserContentPanel from "./UserContentPanel";
import VerticalIconMenu from "./components/VerticalIconMenu";

export default function UserPanel() {
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  // ✅ Mobile version: FAB + fullscreen panel
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          <Menu size={20} />
        </button>

        {isMobileOpen && (
          <UserContentPanel
            type={activePanel || "settings"} // varsayılan bir panel göstermek için
            onClose={() => {
              setIsMobileOpen(false);
              setActivePanel(null);
            }}
            onToggle={setActivePanel}
            isMobile={true}
          />
        )}
      </>
    );
  }

  // ✅ Desktop version
  return (
    <aside
      className={`transition-all duration-300 ease-in-out h-full z-40 flex flex-col justify-between border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${
        activePanel ? "w-80" : "w-16"
      }`}
    >
      <VerticalIconMenu activePanel={activePanel} onTogglePanel={togglePanel} />

      {activePanel && (
  <UserContentPanel
    key={activePanel} // 💥
    type={activePanel}
    onClose={togglePanel}
    isMobile={false}
  />
)}
    </aside>
  );
}
