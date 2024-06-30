import { spy } from "mobx";
import { StrictMode } from "react";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootStoreContext } from "hooks/rootStoreContext";
import MainPage from "pages/MainPage/MainPage";
import ReactDOM from "react-dom/client";
import RootStore from "stores/RootStore";
import MainTemplate from "components/templates/MainTemplate";
import MoviePage, { movieLoader } from "pages/MoviePage/MoviePage";

// !Просмотр actions
// spy((e) => {
// 	if (e.type === "action") {
// 		console.log(e);
// 	}
// });

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainTemplate />,
		children: [
			{ path: "/", element: <MainPage /> },
			{ path: "/movies/:movieId", element: <MoviePage />, loader: movieLoader },
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<StrictMode>
		<RootStoreContext.Provider value={new RootStore()}>
			<RouterProvider router={router} />
		</RootStoreContext.Provider>
	</StrictMode>,
);
