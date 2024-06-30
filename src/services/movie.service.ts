import { removeEmptyValues } from "utils/helpers/removeEmptyValues";
import { IMovies, IMovieFilters, IMovie, IMovieMain } from "../models/movie.model";
import kpAPI from "../utils/axios/axios.config";

class MoviesService {
	private static pathBase = "/v1.4/movie";

	static async getAll(filters: IMovieFilters = {}): Promise<IMovies | null> {
		const defaultFilters = {
			"selectField": ["id", "name", "enName", "alternativeName", "year", "rating", "poster"],
			"page": filters.page ?? 1,
			"limit": filters.limit ?? 50,
			"rating.kp": filters.rating?.kp,
			"genres.name": [filters.genres?.map((genre) => genre)],
			"year": filters.year,
		};

		const params = removeEmptyValues(defaultFilters);
		const movies = await kpAPI.get<IMovies | null>(this.pathBase, { params });

		return movies.data;
	}

	static async getOne(id: number | string): Promise<IMovie | null> {
		const movie = await kpAPI.get<IMovie | null>(`${this.pathBase}/${id}`, { params: id });

		return movie.data;
	}

	static async getOneFav(id: number | string): Promise<IMovieMain | null> {
		const movie = await kpAPI.get<IMovieMain | null>(`${this.pathBase}/${id}`, { params: id });

		return movie.data;
	}
}

export default MoviesService;
