import { makeAutoObservable } from "mobx";
import { IMovies, IMovieFilters } from "models/movie.model";
import MoviesService from "services/movie.service";

class MoviesStore {
	movies: IMovies | null = null;
	isLoading: boolean = false;
	isAppliedFilters: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setMovies = (obj: IMovies | null) => {
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
		} finally {
			this.isLoading = false;
		}
	};
}

export default MoviesStore;
