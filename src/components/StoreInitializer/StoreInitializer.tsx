import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { FC, useRef } from "react";

const StoreInitializer: FC = observer(() => {
	const {
		rootFavMoviesStore: { getFavMovies },
		rootGenresStore: { getGenres },
	} = useStores();

	const isInitialized = useRef(false);

	if (!isInitialized.current) {
		getFavMovies();
    getGenres();
		isInitialized.current = true;
	}

	return null;
});

export default StoreInitializer;
