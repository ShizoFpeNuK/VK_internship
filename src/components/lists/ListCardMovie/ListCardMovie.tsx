import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { getTotalPageCount } from "utils/helpers/getTotalPageCount";
import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styles from "./ListCardMovie.module.scss";
import CardMovie from "components/cards/CardMovie/CardMovie";
import Pagination from "components/Pagination/Pagination";
import MainLoader from "components/loaders/MainLoader/MainLoader";

interface ListCardMovieProps {
	countPerPage?: number;
	title?: string;
}

const ListCardMovie: FC<ListCardMovieProps> = observer(
	({ countPerPage = 50, title = "Список фильмов" }) => {
		const {
			rootMoviesStore: { movies, isLoading, isAppliedFilters, getMovies, setIsAppliedFilters },
			rootFavMoviesStore: { favMoviesIds, addFavMovie, removeFavMovie },
		} = useStores();
		const [page, setPage] = useState(1);
		const ref = useRef<HTMLDivElement | null>(null);

		const handleClickCardMovie: MouseEventHandler<HTMLElement> = ({ target }) => {
			const el = target as HTMLElement;

			if (el.hasAttribute("data-btn-fav")) {
				const parent = el.parentElement!.parentElement!.parentElement!;
				const movieId = parent.getAttribute("data-key");

				const btn = el as HTMLButtonElement;
				btn.disabled = true;

				if (el.tagName === "BUTTON" && parent.getAttribute("data-fav") === "true") {
					parent.setAttribute("data-fav", "false");
					removeFavMovie(movieId!).finally(() => (btn.disabled = false));
				} else {
					parent.setAttribute("data-fav", "true");
					addFavMovie(movieId!).finally(() => (btn.disabled = false));
				}
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

		useEffect(() => {
			if (ref.current && movies?.docs && favMoviesIds.length) {
				Array.from(ref.current.children).forEach((child) => {
					const key = child.getAttribute("data-key");

					favMoviesIds.forEach((favId) => {
						if (key && favId === key) {
							child.setAttribute("data-fav", "true");
						}
					});
				});
			}
		}, [favMoviesIds, movies]);

		return (
			<section className={styles.listCards}>
				<h1 className={styles.title}>{title}</h1>
				<div
					className={styles.container}
					onClick={handleClickCardMovie}
					ref={ref}
				>
					{isLoading ? (
						<div className={styles.loader}>
							<MainLoader />
						</div>
					) : movies?.docs ? (
						movies.docs.map((movie, i) => (
							<CardMovie
								numberInList={i + 1 + (page - 1) * countPerPage}
								key={movie.id}
								movie={movie}
							/>
						))
					) : (
						<p>По запросу ничего не найдено...</p>
					)}
				</div>

				{!!movies && !isLoading && (
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
	},
);

export default ListCardMovie;
