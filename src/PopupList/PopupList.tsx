import { FC, ReactNode } from "react";
import styles from "./PopupList.module.scss";

interface PopupListProps {
	title: string;
	children?: ReactNode;
}

const PopupList: FC<PopupListProps> = ({ title, children }) => {
	return (
		<details className={styles.details}>
			<summary>{title}</summary>
			{children}
		</details>
	);
};

export default PopupList;
