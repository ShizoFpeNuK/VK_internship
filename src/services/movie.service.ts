import { removeEmptyValues } from "utils/helpers/removeEmptyValues";
import { IMovies, IMovieFilters, IMovie, IMovieMain } from "../models/movie.model";
import kpAPI from "../utils/axios/axios.config";

const DATA = {
	id: 1111,
	name: "Code Geass",
	alternativeName: null,
	enName: null,
	year: 2006,
	rating: { kp: 9.8 },
	poster: null,
};

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
		// const movies = await kpAPI.get<IMovies | null>(this.pathBase, { params });

		// !Для экономии запросов
		const DATA_TEST: IMovieMain[] = [];

		for (
			let i = (defaultFilters.page - 1) * defaultFilters.limit;
			i < defaultFilters.page * defaultFilters.limit;
			i++
		) {
			DATA_TEST.push({ ...DATA, id: i });
		}

		const p = new Promise<{ data: IMovies | null }>((res) => {
			const DATA_MOVIES: { data: IMovies | null } = {
				data: {
					docs: DATA_TEST,
					total: 5000,
					page: defaultFilters.page!,
					pages: 5000 / defaultFilters.limit!,
					limit: defaultFilters.limit!,
				},
			};

			setTimeout(() => {
				res(DATA_MOVIES);
				// res({ data: null });
			}, 1000);
		});

		const movies = await p;

		return movies.data;
	}

	static async getOne(id: number | string): Promise<IMovie | null> {
		// const movie = await kpAPI.get<IMovie | null>(`${this.pathBase}/${id}`, {params: id});

		// !Для экономии запросов
		const p = new Promise<{ data: IMovie | null }>((res) => {
			const DATA_MOVIE: { data: IMovie | null } = {
				data: {
					...DATA,
					id: typeof id === "string" ? parseInt(id) : id,
					genres: [{ name: "драма" }, { name: "фантастика" }, { name: "боевик" }],
					description: `Альтернативная реальность: Британская империя захватила треть мира, обрушивая на непокорных мощь своей военной машины.\n
              В Японии, захваченной и переименованной в Зону 11, вместе с младшей сестрой живёт старшеклассник Лелуш – изгнанный сын Императора, потерявший мать и право на престол.
              Юноша отличается от сверстников не только происхождением – он весьма одарённая личность, только где применить эти способности?
              Неожиданно Лелуш оказывается вовлечён в столкновение между японскими террористами и британскими солдатами.
              Так он знакомится с загадочной девушкой C.C. Она дарует ему сверхъестественную способность Гиас, позволяющую подчинять себе волю других людей.`,
				},
			};

			setTimeout(() => {
				res(DATA_MOVIE);
			}, 1000);
		});

		const movie = await p;

		return movie.data;
	}

	static async getOneFav(id: number | string): Promise<IMovieMain | null> {
		// const movie = await kpAPI.get<IMovieMain | null>(`${this.pathBase}/${id}`, {params: id});

		// !Для экономии запросов
		const p = new Promise<{ data: IMovieMain | null }>((res) => {
			const DATA_MOVIE: { data: IMovieMain | null } = {
				data: { ...DATA, id: typeof id === "string" ? parseInt(id) : id },
			};

			setTimeout(() => {
				res(DATA_MOVIE);
			}, 1000);
		});

		const movie = await p;

		return movie.data;
	}
}

export default MoviesService;
