import { FC } from "react";
import styles from "./SearchMovies.module.scss";
import FiltersMovie from "components/FiltersMovie/FiltersMovie";
import ListCardMovie from "components/ListCardMovie/ListCardMovie";

const SearchMovies: FC = () => {
	return (
		<section className={styles.searchMovies}>
			<FiltersMovie style={{width: "30%"}}/>
			<ListCardMovie />
		</section>
	);
};

export default SearchMovies;
