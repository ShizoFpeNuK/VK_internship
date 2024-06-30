import { IGenre } from "models/genre.model";
import kpAPI from "../utils/axios/axios.config";

class GenresService {
	private static pathBase = "/v1/movie/possible-values-by-field";

	static async getAll(): Promise<IGenre[] | null> {
		const genres = await kpAPI.get<IGenre[] | null>(this.pathBase, {
			params: { field: "genres.name" },
		});

		return genres.data;
	}
}

export default GenresService;
