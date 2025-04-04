import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">dashboard</h1>

      {/* Toggle sağda */}
      <ThemeToggle />
    </header>
  );
};

export default Header;