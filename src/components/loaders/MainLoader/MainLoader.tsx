import { FC } from "react";
import styles from "./MainLoader.module.scss";

interface MainLoaderProps {
	width?: number | string;
	height?: number | string;
}

const MainLoader: FC<MainLoaderProps> = ({ width, height }) => {
	return <span style={{width, height}} className={styles.loader}></span>;
};

export default MainLoader;
