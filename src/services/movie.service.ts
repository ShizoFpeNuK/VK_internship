import { removeEmptyValues } from "utils/helpers/removeEmptyValues";
import { IMovie, IMovieFilters } from "../models/movie.model";
import kpAPI from "../utils/axios/axios.config";

class MoviesService {
	private static pathBase = "/v1.4/movie";

	static async getAll(filters: IMovieFilters = {}): Promise<IMovie> {
		const defaultFilters = {
			"selectField": ["id", "name", "enName", "alternativeName", "year", "rating", "poster"],
			"page": filters.page ?? 1,
			"limit": filters.limit ?? 50,
			"rating.kp": filters.rating?.kp,
			"genres.name": [filters.genres?.map((genre) => genre)],
			"year": filters.year,
		};

		const params = removeEmptyValues(defaultFilters);

		// const movies = await kpAPI.get<IMovie>(this.pathBase, { params });

		// !Тест запросов
		// const test = await kpAPI.get(this.pathBase, { params });

		// console.log(test);

		// !Для экономии запросов
		const p = new Promise<{ data: IMovie }>((res) => {
			const DATA_MOVIES: { data: IMovie } = {
				data: {
					docs: Array(defaultFilters.limit).fill({
						id: 1111,
						name: "Code Geass",
						alternativeName: null,
						enName: null,
						year: 2006,
						rating: { kp: 9.8 },
						poster: null,
					}),
					total: 5000,
					page: defaultFilters.page!,
					pages: 5000 / defaultFilters.limit!,
					limit: defaultFilters.limit!,
				},
			};

			setTimeout(() => {
				res(DATA_MOVIES);
			}, 1000);
		});

		const movies = await p;

		return movies.data;
	}

	static async getOne(id: number): Promise<any> {
		const categories = await kpAPI.get<any>(`${this.pathBase}/${id}`);

		return categories.data;
	}
}

export default MoviesService;
