import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./ListCardMovie.module.scss";
import CardMovie from "components/CardMovie/CardMovie";
import Pagination from "components/Pagination/Pagination";

const getTotalPageCount = (countElements: number, count: number): number => {
	return Math.ceil(countElements / count);
};

interface ListCardMovieProps {
	countPerPage: number;
}

const ListCardMovie: FC<ListCardMovieProps> = observer(({ countPerPage }) => {
	const {
		rootMoviesStore: { movies, isLoading, isAppliedFilters, getMovies, setIsAppliedFilters },
	} = useStores();
	const [page, setPage] = useState(1);

	const handleNextPageClick = useCallback(() => {
		const current = page;
		const next = current + 1;
		const total = movies ? getTotalPageCount(movies.total, countPerPage) : current;

		setPage(next <= total ? next : current);
	}, [page, movies, countPerPage]);

	const handlePrevPageClick = useCallback(() => {
		const current = page;
		const prev = current - 1;

		setPage(prev > 0 ? prev : current);
	}, [page]);

	useEffect(() => {
		getMovies({ page, limit: countPerPage });
	}, [page, getMovies, countPerPage]);

	useEffect(() => {
		if (isAppliedFilters) {
			setPage(1);
			setIsAppliedFilters(false);
		}
	}, [isAppliedFilters, setIsAppliedFilters]);

	return (
		<div className={styles.listCards}>
			{isLoading ? (
				<p>Loading...</p>
			) : movies?.docs ? (
				movies.docs.map((movie, i) => (
					<CardMovie
						id={i + 1 + (page - 1) * countPerPage}
						key={movie.id}
						year={movie.year}
						poster={movie.poster?.url ?? "poster.avif"}
						rating={movie.rating.kp}
						name={
							movie.name
								? movie.name
								: movie.alternativeName
								? movie.alternativeName
								: movie.enName
								? movie.enName
								: "Название отсутствует"
						}
					/>
				))
			) : (
				<p>NO DATA</p>
			)}

			{!!movies && (
				<Pagination
					onNextPageClick={handleNextPageClick}
					onPrevPageClick={handlePrevPageClick}
					disable={{
						left: page === 1,
						right: page === getTotalPageCount(movies.total, countPerPage),
					}}
					nav={{ current: page, total: getTotalPageCount(movies.total, countPerPage) }}
				/>
			)}
		</div>
	);
});

export default ListCardMovie;
