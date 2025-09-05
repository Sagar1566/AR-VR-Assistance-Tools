import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import * as styles from "./LoadingScreen.module.css";

const LoadingScreen = ({ loaded, setLoaded }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      setLoaded(true);
    }
  }, [progress]);

  return (
    <div
      className={`${styles.loadingScreen} ${
        loaded ? styles.loadingScreen_loaded : styles.loadingScreen_start
      }`}
    >
      <div className={styles.loadingScreen_progress}>
        <div
          className={styles.loadingScreen_progressvalue}
          style={{
            width: `${progress}%`,
          }}
        />
        <div className={styles.loadingScreen_board}>
          <h1 className={styles.loadingScreen_title}>Finding your</h1>
          <h1 className={styles.loadingScreen_title}>
            Virtual Fitness Trainer
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
