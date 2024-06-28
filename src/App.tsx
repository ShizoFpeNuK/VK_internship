import { FC } from "react";
import styles from "./App.module.scss";
import SearchMovies from "components/SearchMovies/SearchMovies";

const App: FC = () => {
	return (
		<div className={styles.App}>
			<SearchMovies />
		</div>
	);
};

export default App;
