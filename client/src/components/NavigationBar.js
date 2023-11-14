import { useState, useCallback, useEffect } from "react";
import PopUpAccountInfo from "./PopUpAccountInfo";
import PortalPopup from "./PortalPopup";
import Login2 from "./Login2";
import styles from "../styles/NavigationBar.module.css";
import { useUser } from "../UserContext";

const NavigationBar = () => {
  const [isPopUpAccountInfoOpen, setPopUpAccountInfoOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const { user } = useUser();

  const handleUserData = () => {
    console.log("In Navigation bar handleUserData");
    // Additional logic for handling user data
  };

  const openPopUpAccountInfo = useCallback(() => {
    setPopUpAccountInfoOpen(true);
  }, []);
  const closePopUpAccountInfo = useCallback(() => {
    setPopUpAccountInfoOpen(false);
  }, []);
  const onContainerIconClick = useCallback(() => {
    /* TODO: Opens Menu of Filters */
  }, []);
  const openLoginPopup = useCallback(() => {
    setLoginPopupOpen(true);
  }, []);
  const closeLoginPopup = useCallback(() => {
    setLoginPopupOpen(false);
  }, []);

  useEffect(() => {
    if (user != null) handleUserData();
  }, [user]);

  return (
    <>
      <nav className={styles.navigationbar}>
        <button className={styles.radianceai} onClick={openLoginPopup}>
          radiance.ai
        </button>
        <div className={styles.buttonnavprofile} onClick={openPopUpAccountInfo}>
          <button className={styles.containericon} onClick={onContainerIconClick}>
            <img className={styles.editingSvg} alt="Menu icon" src="Iconburger-menu.svg" />
          </button>
          <div className={styles.containeraccount}>
            {/* <img className={styles.rectangleIcon} alt="User icon" src="/rectangle@1x.png" /> */}
            <div className={styles.containerusername}>
              <div className={styles.frame}>
                <div className={styles.username}>{user ? user.displayName : 'User Name'}</div>
                <div className={styles.frame1}>
                  <div className={styles.tokens}>Tokens</div>
                  <div className={styles.tokens}>0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isLoginPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeLoginPopup}
        >
          <Login2 onClose={closeLoginPopup} />
        </PortalPopup>
      )}

      {isPopUpAccountInfoOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopUpAccountInfo}
        >
          <PopUpAccountInfo onClose={closePopUpAccountInfo} />
        </PortalPopup>
      )}
    </>
  );
};

export default NavigationBar;
