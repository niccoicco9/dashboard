import logoSource from "@/assets/dashboard.svg";
import { DARK_MODE_BUTTON_TEXT, HEADER_TITLE, LIGHT_MODE_BUTTON_TEXT } from "@/consts/text.const";
import Button from "../input/button/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/consts/routes.const";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const navigateToHome = () => {
    navigate(ROUTES.HOME);
  };

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-black/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={navigateToHome}
          >
            <img src={logoSource} alt="logo" className="h-10 w-10 dark:invert" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              { HEADER_TITLE }
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              icon={isDark ? <SunIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" /> : <MoonIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
              title={ isDark ? LIGHT_MODE_BUTTON_TEXT : DARK_MODE_BUTTON_TEXT }
            />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;
