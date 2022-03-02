import Link from "next/link";
import styles from "../styles/Error.module.css";

function Error({ statusCode }) {
  return (
    <div className={styles.Error}>
      <span className={styles.Error_Emoji}>😵</span>
      {statusCode === 404 ? (
        <h1>Page not found</h1>
      ) : (
        <h1 className={styles.Error_Message}>An error occurred</h1>
      )}
      <Link href="/" className={styles.Error_Link}>
        Back to the home page
      </Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
