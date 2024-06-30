import { FC } from "react";
import styles from "./MainTemplate.module.scss";
import { Link, Outlet } from "react-router-dom";

const MainTemplate: FC = () => {
	return (
		<main className={styles.app}>
			<header className={styles.header}>
				<div className={styles.container}>
					<Link to="/">Главная</Link>
					<Link to="/favorites">Избранное</Link>
				</div>
			</header>

			<Outlet />
		</main>
	);
};

export default MainTemplate;
