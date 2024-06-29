import { IGenre } from "models/genre.model";
import { makeAutoObservable } from "mobx";
import GenresService from "services/genre.service";

class GenresStore {
	genres: IGenre[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setGenres(movies: IGenre[]) {
		this.genres = movies;
	}

	getGenres = async (page: number, limit: number) => {
		try {
			this.isLoading = true;
			const res = await GenresService.getAll();
			this.genres = res;
		} catch {
		} finally {
			this.isLoading = false;
		}
	};
}

export default GenresStore;
