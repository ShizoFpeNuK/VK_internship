import { FC } from "react";
import styles from "./App.module.scss";
import SearchMovies from "components/SearchMovies/SearchMovies";
import { RootStoreContext } from "hooks/rootStoreContext";
import RootStore from "stores/RootStore";

const App: FC = () => {
	return (
		<RootStoreContext.Provider value={new RootStore()}>
			<div className={styles.App}>
				<SearchMovies />
			</div>
		</RootStoreContext.Provider>
	);
};

export default App;
