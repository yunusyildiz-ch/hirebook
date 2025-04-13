import AvatarBox from "./AvatarBox";
import UserMenu from "./UserMenu";
import ThemeSection from "./ThemeSection";

export default function UserPanel() {
  return (
    <aside className="w-16 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between py-4 relative overflow-visible z-50">
      <AvatarBox />
      <UserMenu />
      <ThemeSection />
    </aside>
  );
}
