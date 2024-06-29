import { FC } from "react";
import { RootStoreContext } from "hooks/rootStoreContext";
import styles from "./App.module.scss";
import RootStore from "stores/RootStore";
import SearchMovies from "components/SearchMovies/SearchMovies";

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
