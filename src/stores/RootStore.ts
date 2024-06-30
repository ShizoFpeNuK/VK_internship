import FavoriteMoviesStore from "./FavoriteMoviesStore";
import GenresStore from "./GenresStore";
import MoviesStore from "./MoviesStore";

class RootStore {
	rootMoviesStore = new MoviesStore();
	rootGenresStore = new GenresStore();
	rootFavMoviesStore = new FavoriteMoviesStore();
}

export default RootStore;
