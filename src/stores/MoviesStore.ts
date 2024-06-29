import { IMovie, IMovieFilters } from "models/movie.model";
import { makeAutoObservable } from "mobx";
import MoviesService from "services/movie.service";

class MoviesStore {
	movies: IMovie | null = null;
	isLoading: boolean = false;
	isAppliedFilters: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setMovies = (obj: IMovie | null) => {
		this.movies = obj;
	};

	setIsAppliedFilters = (boolean: boolean) => {
		this.isAppliedFilters = boolean;
	};

	getMovies = async (filters?: IMovieFilters) => {
		try {
			this.isLoading = true;
			const res = await MoviesService.getAll(filters);
			this.movies = res;
		} catch {
		} finally {
			this.isLoading = false;
		}
	};
}

export default MoviesStore;
