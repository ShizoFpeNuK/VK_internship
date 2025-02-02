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

	getGenres = async () => {
		try {
			this.isLoading = true;
			const res = await GenresService.getAll();

			if (res) {
				this.genres = res;
			}
		} finally {
			this.isLoading = false;
		}
	};
}

export default GenresStore;
