import { useEffect } from "react";
import styles from "../styles/Filters2.module.css";

const Filters2 = ({ onClose }) => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);
  return (
    <div className={styles.filters2} data-animate-on-scroll>
      <div className={styles.drawer}>
        <h2 className={styles.drawerheader}>
          <div className={styles.radianceai}>Be Your Own Model</div>
        </h2>
        <div className={styles.insertimages}>
          <h3 className={styles.heading2}>Upload Clothing Image</h3>
        </div>
        <input
          className={styles.textinput} placeholder="Or insert URL image link"
          type="text"
          style={{textAlign: 'center', width: '100%' }}
        />
        <button className={styles.buttonsubmit}>
          <img className={styles.editingSvg} alt="" src="/IconAIWand.svg" />
          <div className={styles.heading31}>Generate your AI Model</div>
        </button>
      </div>
    </div>
  );
};

export default Filters2;
