import { AppMeta } from "newt-client-js";
import { CSSProperties, PropsWithChildren } from "react";
import styles from "../styles/Layout.module.css";
import { Badge } from "./Badge";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({
  app,
  children,
  containerStyle,
}: PropsWithChildren<{
  app: AppMeta;
  containerStyle?: CSSProperties;
}>): JSX.Element {
  return (
    <div className={styles.Wrapper}>
      <Header app={app} />
      <main className={styles.Container} style={containerStyle}>
        {children}
      </main>
      <Footer app={app} />
      <Badge />
    </div>
  );
}
