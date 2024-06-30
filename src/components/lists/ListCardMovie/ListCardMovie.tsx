import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { FC, MouseEventHandler, useCallback, useEffect, useState } from "react";
import styles from "./ListCardMovie.module.scss";
import CardMovie from "components/cards/CardMovie/CardMovie";
import Pagination from "components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

	const onClickCardMovie: MouseEventHandler<HTMLElement> = ({ target }) => {
		const element = target as HTMLElement;

		if (element.getAttribute("data-btn-details")) {
			const movieId = element.parentElement?.parentElement?.parentElement?.getAttribute("data-key");
			navigate(`/movies/${movieId}`);
		}
	};

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
		<section className={styles.listCards}>
			<h1 className={styles.title}>Все фильмы</h1>
			<div
				className={styles.container}
				onClick={onClickCardMovie}
			>
				{isLoading ? (
					<p>Loading...</p>
				) : movies?.docs ? (
					movies.docs.map((movie, i) => (
						<CardMovie
							numberInList={i + 1 + (page - 1) * countPerPage}
							id={movie.id}
							key={movie.id}
							year={movie.year}
							poster={movie.poster?.url ?? "poster.avif"}
							rating={movie.rating.kp}
							name={movie.name ?? movie.enName ?? movie.alternativeName ?? "Название отсутствует"}
						/>
					))
				) : (
					<p>NO DATA</p>
				)}
			</div>

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
		</section>
	);
});

export default ListCardMovie;
