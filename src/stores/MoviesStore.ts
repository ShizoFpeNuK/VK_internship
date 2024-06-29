import { IMovie } from "models/movie.model";
import { makeAutoObservable } from "mobx";
import MoviesService from "services/movie.service";

class MoviesStore {
	movies: IMovie | null = null;
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setMovies = (values: IMovie | null) => {
		this.movies = values;
	};

	getMovies = async (page: number, limit: number) => {
		try {
			this.isLoading = true;
			const res = await MoviesService.getAll(page, limit);
			this.movies = res;
		} catch {
		} finally {
			this.isLoading = false;
		}
	};
}

export default MoviesStore;
