import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserContentPanel from "./UserContentPanel";
import VerticalIconMenu from "./components/VerticalIconMenu";

export default function UserPanel() {
  const [isMobile, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();

  const userInitial =
    user?.displayName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "?";

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
          onClick={() => {
            setIsMobileOpen(true);
            setActivePanel("profile");
          }}
          className="fixed bottom-4 right-4 z-50 bg-trabzonBlue border border-trabzonBordo text-trabzonBordo rounded-full w-12 h-12 flex items-center justify-center text-base font-semibold shadow-lg hover:scale-105 transition"
        >
          {userInitial}
        </button>

        {isMobileOpen && (
          <UserContentPanel
            type={activePanel || "profile"}
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
      <VerticalIconMenu
        activePanel={activePanel}
        onTogglePanel={togglePanel}
      />

      {activePanel && (
        <UserContentPanel
          key={activePanel}
          type={activePanel}
          onClose={togglePanel}
          isMobile={false}
        />
      )}
    </aside>
  );
}
