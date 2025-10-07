import { Outlet } from "react-router-dom";
import Header from "../header/header";
import styles from './layout.module.scss';

function Layout() {
  return (
    <div className={styles.layoutRoot}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
