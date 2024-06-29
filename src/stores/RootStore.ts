import GenresStore from "./GenresStore";
import MoviesStore from "./MoviesStore";

class RootStore {
	rootMoviesStore = new MoviesStore();
	rootGenresStore = new GenresStore();
}

export default RootStore;
