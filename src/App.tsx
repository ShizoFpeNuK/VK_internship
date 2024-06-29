import { FC } from "react";
import { RootStoreContext } from "hooks/rootStoreContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styles from "./App.module.scss";
import MainPage from "pages/MainPage/MainPage";
import RootStore from "stores/RootStore";
import MoviePage, { movieLoader } from "pages/MoviePage/MoviePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
    path: "movies/:movieId",
		element: <MoviePage />,
    loader: movieLoader,
	},
]);

const App: FC = () => {
	return (
		<RootStoreContext.Provider value={new RootStore()}>
			<div className={styles.App}>
				<RouterProvider router={router} />
			</div>
		</RootStoreContext.Provider>
	);
};

export default App;
