import { spy } from "mobx";
import { StrictMode } from "react";
import { RootStoreContext } from "hooks/rootStoreContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import MainPage from "pages/MainPage/MainPage";
import ReactDOM from "react-dom/client";
import RootStore from "stores/RootStore";
import MainTemplate from "components/templates/MainTemplate";
import MoviePage, { movieLoader } from "pages/MoviePage/MoviePage";
import { ROUTES } from "utils/routes/routes-page";
import FavoritesPage from "pages/FavoritesPage/FavoritesPage";
import StoreInitializer from "components/StoreInitializer/StoreInitializer";

// !Просмотр actions
// spy((e) => {
// 	if (e.type === "action") {
// 		console.log(e);
// 	}
// });

const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: <MainTemplate />,
		children: [
			{ path: ROUTES.HOME, element: <MainPage /> },
			{ path: `${ROUTES.MOVIE}/:movieId`, element: <MoviePage />, loader: movieLoader },
			{ path: ROUTES.FAVORITES, element: <FavoritesPage /> },
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<RootStoreContext.Provider value={new RootStore()}>
			<StoreInitializer />
			<RouterProvider router={router} />
		</RootStoreContext.Provider>
	</StrictMode>,
);
