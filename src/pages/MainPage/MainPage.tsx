import { FC } from "react";
import styles from "./MainPage.module.scss";
import FiltersMovie from "components/forms/FiltersMovie/FiltersMovie";
import ListCardMovie from "components/lists/ListCardMovie/ListCardMovie";

const MOVIES_PER_PAGE = 50;

const MainPage: FC = () => {
	return (
		<section className={styles.searchMovies}>
			<FiltersMovie
				style={{ width: "30%" }}
				countPerPage={MOVIES_PER_PAGE}
			/>
			<ListCardMovie countPerPage={MOVIES_PER_PAGE} />
		</section>
	);
};

export default MainPage;
