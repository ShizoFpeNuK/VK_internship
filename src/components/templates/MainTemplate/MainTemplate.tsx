import { FC } from "react";
import { ROUTES } from "utils/routes/routes-page";
import { Link, Outlet } from "react-router-dom";
import styles from "./MainTemplate.module.scss";

const MainTemplate: FC = () => {
	return (
		<main className={styles.app}>
			<header className={styles.header}>
				<div className={styles.container}>
					<Link to={ROUTES.HOME}>Главная</Link>
					<Link to={ROUTES.FAVORITES}>Избранное</Link>
				</div>
			</header>

			<Outlet />
		</main>
	);
};

export default MainTemplate;
