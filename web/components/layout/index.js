import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

//Context
import StateContext from "../../Context/StateContext";
import DispatchContext from "../../Context/DispatchContext";

import Button from "../button";
import ContextMenu from "../contextMenu";
import ChatModal from "../chatModal";
import styles from "./styles.module.scss";
import GithubIcon from "../../images/icons/github.svg";
import UserIcon from "../../images/icons/user.svg";
import Logo from "../../images/logo/logo.svg";

const Layout = ({ children }) => {
  const router = useRouter();

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const isLoginPage = router.pathname === "/login";
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const isAuth = appState.loggedIn;
  const isUserDoctor = appState?.person?.role === "Medical_Professional";

  const toggleContextMenu = () => {
    setIsContextMenuOpen(!isContextMenuOpen);
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const handleNavigation = (path) => {
    closeContextMenu();
    router.push(path);
  };

  return (
    <div id="layoutRoot">
      <Head>
        <title>Med Assist</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <header className={styles.headerBar}>
        <div className={styles.logo}>
          <a href="/" role="link" tabIndex="0" className={styles.logoText}>
            <img src={Logo} alt="Med Assist" />
            med<span style={{ fontSize: "1.25rem" }}>assist</span>
          </a>
        </div>
        <nav className={styles.nav}>
          {!isLoginPage && !isAuth && <Button href="/login">Login</Button>}
          {!isLoginPage && isAuth && (
            <div className={styles.user}>
              <span
                role="button"
                tabIndex="0"
                onClick={() => toggleContextMenu()}
              >
                <img src={UserIcon} alt="User Icon" />
              </span>
            </div>
          )}
          {!isLoginPage && isAuth && isContextMenuOpen && (
            <ContextMenu
              menuItems={[
                {
                  id: "upload",
                  label: "Upload Prescription",
                  action: () => handleNavigation("/prescriptionUpload"),
                },
                {
                  id: "logout",
                  label: "Logout",
                  action: () => {
                    appDispatch({
                      type: "logout",
                    });
                    handleNavigation("/");
                  },
                },
              ]}
              closeAction={() => closeContextMenu()}
              isTopNavigation={true}
            />
          )}
        </nav>
      </header>
      <main className={styles.content}>{children}</main>
      <ChatModal />
      <footer className={styles.footerBar}>
        <hr className={styles.hr} />
        <div className={styles.footerInfo}>
          <div className={styles.name}>
            Crafted by{" "}
            <a
              href="https://github.com/akaditya394"
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
            >
              <name>
                <strong>Aditya</strong>
              </name>
            </a>
            {", "}
            <a
              href="https://github.com/NamanAgarwal214"
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
            >
              <name>
                <strong>Naman</strong>
              </name>
            </a>
            {", "}
            <a
              href="https://themillenniumfalcon.github.io"
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
            >
              <name>
                <strong>Nishank</strong>
              </name>
            </a>{" "}
            {"& "}
            <a
              href="https://www.linkedin.com/in/vansh-agarwal-94069a202"
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
            >
              <name>
                <strong>Vansh</strong>
              </name>
            </a>
          </div>
          <div className={styles.github}>
            <a
              href="https://github.com/akaditya394/medassist"
              rel="noopener noreferrer"
              role="link"
              tabIndex="0"
            >
              <img src={GithubIcon} alt="Github Icon" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
