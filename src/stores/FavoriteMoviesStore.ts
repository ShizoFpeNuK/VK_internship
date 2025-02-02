import { IMovieMain } from "models/movie.model";
import { itemsLocalStorage } from "utils/storages/itemsLocalStorage";
import { makeAutoObservable, reaction } from "mobx";
import MoviesService from "services/movie.service";

class FavoriteMoviesStore {
	favMovies: IMovieMain[] = [];
	favMoviesIds: string[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);

		// !Экономия запросов. Иначе лучше было бы кидать запросы по id
		reaction(
			() => this.favMovies,
			(movies) => {
				localStorage.setItem(itemsLocalStorage.FAV_MOVIES, JSON.stringify(movies));
			},
		);

		reaction(
			() => this.favMoviesIds,
			(ids) => {
				localStorage.setItem(itemsLocalStorage.IDS_FAV_MOVIES, JSON.stringify(ids));
			},
		);
	}

	addFavMovie = async (id: string | number) => {
		let isAdd = this.favMoviesIds.every((favId) => favId !== id.toString());

		if (isAdd) {
			try {
				this.isLoading = true;
				const res = await MoviesService.getOneFav(id);

				if (res) {
					this.favMovies = [...this.favMovies, res];
					this.favMoviesIds = [...this.favMoviesIds, res.id.toString()];
				}
			} finally {
				this.isLoading = false;
			}
		}
	};

	removeFavMovie = async (id: string | number) => {
		id = typeof id === "string" ? parseInt(id) : id;

		this.favMovies = this.favMovies.filter((movie) => movie.id !== id);
		this.favMoviesIds = this.favMoviesIds.filter((movieId) => movieId !== id.toString());
	};

	getFavMovies = () => {
		const storageFavMovies = localStorage.getItem(itemsLocalStorage.FAV_MOVIES);
		const storageFavMoviesIds = localStorage.getItem(itemsLocalStorage.IDS_FAV_MOVIES);

		if (storageFavMovies) {
			this.favMovies = JSON.parse(storageFavMovies);
		}

		if (storageFavMoviesIds) {
			this.favMoviesIds = JSON.parse(storageFavMoviesIds);
		}
	};
}

export default FavoriteMoviesStore;
