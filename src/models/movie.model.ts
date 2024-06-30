export interface IMovieMain {
	id: number;
	name: string | null;
	alternativeName: string | null;
	enName: string | null;
	rating: { kp: number };
	year: number;
	poster: {
		url: string | null;
	} | null;
}

export interface IMovies {
	docs: IMovieMain[];
	total: number;
	limit: number;
	page: number;
	pages: number;
}

export interface IMovie extends IMovieMain {
	description: string | null;
	genres: { name: string }[];
}

export interface IMovieFilters {
	page?: number;
	limit?: number;
	genres?: string[];
	rating?: { kp: number | string };
	year?: number | string;
}
