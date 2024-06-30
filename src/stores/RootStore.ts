import GenresStore from "./GenresStore";
import MoviesStore from "./MoviesStore";
import FavoriteMoviesStore from "./FavoriteMoviesStore";

class RootStore {
	rootMoviesStore = new MoviesStore();
	rootGenresStore = new GenresStore();
	rootFavMoviesStore = new FavoriteMoviesStore();
}

export default RootStore;
