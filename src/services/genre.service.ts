import { IGenre } from "models/genre.model";
import kpAPI from "../utils/axios/axios.config";

class GenresService {
	private static pathBase = "/movie/possible-values-by-field";

	static async getAll(): Promise<IGenre[]> {
		const genres = await kpAPI.get<IGenre[]>(`${this.pathBase}`, {
			params: { field: "genres.name" },
		});

		// !Для экономии запросов
		// const DATA_MOVIES: { data: IMovie } = {
		// 	data: {
		// 		docs: Array(limit).fill({
		// 			id: 1111,
		// 			name: "Code Geass",
		// 			alternativeName: null,
		// 			enName: null,
		// 			year: 2006,
		// 			rating: { kp: 9.8 },
		// 			poster: null,
		// 		}),
		// 		total: 5000,
		// 		page,
		// 		pages: 5000 / limit,
		// 		limit,
		// 	},
		// };

		// const movies = DATA_MOVIES;

		return genres.data;
	}
}

export default GenresService;
