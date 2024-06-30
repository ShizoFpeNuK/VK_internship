import { FC, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";

const StoreInitializer: FC = observer(() => {
	const {
		rootFavMoviesStore: { getFavMovies },
	} = useStores();

	const isInitialized = useRef(false);

	if (!isInitialized.current) {
		getFavMovies();
		isInitialized.current = true;
	}

	return null;
});

export default StoreInitializer;
