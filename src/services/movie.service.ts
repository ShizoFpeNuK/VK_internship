import kpAPI from "../utils/axios/axios.config";
import { IMovie } from "../models/movie.model";

class MoviesService {
	private static pathBase = "/movie";

	static async getAll(page: number, limit: number): Promise<IMovie> {
		const params = new URLSearchParams();
		params.append("selectFields", "id");
		params.append("selectFields", "name");
		params.append("selectFields", "enName");
		params.append("selectFields", "alternativeName");
		params.append("selectFields", "year");
		params.append("selectFields", "rating");
		params.append("selectFields", "poster");
		params.append("type", "movie");
		params.append("page", `${page}`);
		params.append("limit", `${limit}`);

		// const movies = await kpAPI.get<IMovie>(`${this.pathBase}`, { params });

		// !Для экономии запросов
		const p = new Promise<{ data: IMovie }>((res) => {
			const DATA_MOVIES: { data: IMovie } = {
				data: {
					docs: Array(limit).fill({
						id: 1111,
						name: "Code Geass",
						alternativeName: null,
						enName: null,
						year: 2006,
						rating: { kp: 9.8 },
						poster: null,
					}),
					total: 5000,
					page,
					pages: 5000 / limit,
					limit,
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
