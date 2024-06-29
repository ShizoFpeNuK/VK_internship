import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { FC, useCallback, useEffect, useState } from "react";
import styles from "./ListCardMovie.module.scss";
import CardMovie from "components/CardMovie/CardMovie";
import Pagination from "components/Pagination/Pagination";

const COUNT_PER_PAGE = 50;

const getTotalPageCount = (countElements: number): number => {
	return Math.ceil(countElements / COUNT_PER_PAGE);
};

const ListCardMovie: FC = observer(() => {
	const {
		rootMoviesStore: { movies, isLoading, getMovies },
	} = useStores();
	const [page, setPage] = useState(1);

	const handleNextPageClick = useCallback(() => {
		const current = page;
		const next = current + 1;
		const total = movies ? getTotalPageCount(movies.total) : current;

		setPage(next <= total ? next : current);
	}, [page, movies]);

	const handlePrevPageClick = useCallback(() => {
		const current = page;
		const prev = current - 1;

		setPage(prev > 0 ? prev : current);
	}, [page]);

	useEffect(() => {
		getMovies(page, COUNT_PER_PAGE);
	}, [page, getMovies]);

	return (
		<div className={styles.listCards}>
			{isLoading ? (
				<p>Loading...</p>
			) : movies?.docs ? (
				movies.docs.map((movie, i) => (
					<CardMovie
						id={i + 1 + (page - 1) * COUNT_PER_PAGE}
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
						right: page === getTotalPageCount(movies.total),
					}}
					nav={{ current: page, total: getTotalPageCount(movies.total) }}
				/>
			)}
		</div>
	);
});

export default ListCardMovie;
