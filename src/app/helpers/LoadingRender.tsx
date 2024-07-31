import styles from "../page.module.css";

export function LoadingOn() {
  return <div className={`${styles.loader} ${styles["center-loader"]}`}></div>;
}

export function TimeLoading() {
  return (
    <>
      <div
        className={`${styles["timer-loader"]} ${styles["loader-time"]}`}
      ></div>
      <h1>Cargando...</h1>
    </>
  );
}
