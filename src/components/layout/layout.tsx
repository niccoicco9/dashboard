import { Outlet } from "react-router-dom";
import Header from "@/components/header/header";
import styles from '@/components/layout/layout.module.scss';

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
