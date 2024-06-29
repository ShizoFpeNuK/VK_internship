import { FC } from "react";
import styles from "./SearchMovies.module.scss";
import FiltersMovie from "components/FiltersMovie/FiltersMovie";
import ListCardMovie from "components/ListCardMovie/ListCardMovie";

const COUNT_PER_PAGE = 50;

const SearchMovies: FC = () => {
	return (
		<section className={styles.searchMovies}>
			<FiltersMovie
				style={{ width: "30%" }}
				countPerPage={COUNT_PER_PAGE}
			/>
			<ListCardMovie countPerPage={COUNT_PER_PAGE} />
		</section>
	);
};

export default SearchMovies;
