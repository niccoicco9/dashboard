import logoSource from "@/assets/dashboard.svg";
import { DARK_MODE_BUTTON_TEXT, HEADER_TITLE, LIGHT_MODE_BUTTON_TEXT } from "@/consts/text.const";
import Button from "../input/button/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/consts/routes.const";
import { useState } from "react";
import styles from './header.module.scss';
import { useTheme } from '@/hooks/useTheme/useTheme';

function Header() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [isClicked, setIsClicked] = useState(false);

  const navigateToHome = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    
    if (window.location.pathname === ROUTES.HOME) {
      window.location.reload();
    } else {
      navigate(ROUTES.HOME);
    }
  };

  
  return (
    <header className={`${styles.header} ${isDark ? styles.dark : ''}`}>
      <div className={styles.inner}>
        <div className={`${styles.brand} ${isClicked ? styles.clicked : ''}`} onClick={navigateToHome} title="Click to refresh page">
          <img src={logoSource} alt="logo" className={`${styles.logo} ${isDark ? styles.logoDark : ''}`} />
          <h2 className={`${styles.title} ${isDark ? styles.titleDark : ''}`}>
            { HEADER_TITLE }
          </h2>
        </div>
        <div className={styles.actions}>
          <Button
            onClick={toggleTheme}
            icon={isDark ? <SunIcon /> : <MoonIcon />}
            title={ isDark ? LIGHT_MODE_BUTTON_TEXT : DARK_MODE_BUTTON_TEXT }
            disableHoverOnClick
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
