export interface IMovie {
	docs: {
		id: number;
		name: string | null;
		alternativeName: string | null;
		enName: string | null;
		rating: { kp: number };
		year: number;
		poster: {
			url: string | null;
		} | null;
	}[];
	total: number;
	limit: number;
	page: number;
	pages: number;
}
