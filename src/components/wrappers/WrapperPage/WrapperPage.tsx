import { FC, ReactNode } from "react";
import styles from "./WrapperPage.module.scss";

const WrapperPage: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.wrapper}>{children}</div>;
};

export default WrapperPage;
