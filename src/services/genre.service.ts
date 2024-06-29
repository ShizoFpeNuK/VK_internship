import { IGenre } from "models/genre.model";
import kpAPI from "../utils/axios/axios.config";

class GenresService {
	private static pathBase = "/v1/movie/possible-values-by-field";

	static async getAll(): Promise<IGenre[]> {
		// const genres = await kpAPI.get<IGenre[]>(this.pathBase, {
		// 	params: { field: "genres.name" },
		// });

		// !Для экономии запросов
		const p = new Promise<{ data: IGenre[] }>((res) => {
			const DATA_GENRES: { data: IGenre[] } = {
				data: [
					{ name: "аниме", slug: "" },
					{ name: "биография", slug: "" },
					{ name: "боевик", slug: "" },
					{ name: "вестерн", slug: "" },
					{ name: "военный", slug: "" },
					{ name: "детектив", slug: "" },
					{ name: "детский", slug: "" },
					{ name: "для взрослых", slug: "" },
					{ name: "документальный", slug: "" },
					{ name: "драма", slug: "" },
					{ name: "игра", slug: "" },
					{ name: "история", slug: "" },
					{ name: "комедия", slug: "" },
					{ name: "концерт", slug: "" },
					{ name: "короткометражка", slug: "" },
					{ name: "криминал", slug: "" },
					{ name: "мелодрама", slug: "" },
					{ name: "музыка", slug: "" },
					{ name: "мультфильм", slug: "" },
					{ name: "мюзикл", slug: "" },
					{ name: "новости", slug: "" },
					{ name: "приключения", slug: "" },
					{ name: "реальное ТВ", slug: "" },
					{ name: "семейный", slug: "" },
					{ name: "спорт", slug: "" },
					{ name: "ток-шоу", slug: "" },
					{ name: "триллер", slug: "" },
					{ name: "ужасы", slug: "" },
					{ name: "фантастика", slug: "" },
					{ name: "фильм-нуар", slug: "" },
					{ name: "фэнтези", slug: "" },
					{ name: "церемония", slug: "" },
				],
			};

			setTimeout(() => {
				res(DATA_GENRES);
			}, 1000);
		});

		const genres = await p;

		return genres.data;
	}
}

export default GenresService;
