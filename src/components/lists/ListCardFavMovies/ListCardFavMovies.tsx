import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styles from "./ListCardFavMovies.module.scss";
import CardMovie from "components/cards/CardMovie/CardMovie";
import Pagination from "components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { IMovieMain } from "models/movie.model";
import { ROUTES } from "utils/routes/routes-page";
import { runInAction } from "mobx";

const getTotalPageCount = (countElements: number, count: number): number => {
	return Math.ceil(countElements / count);
};

interface ListCardFavMoviesProps {
	countPerPage?: number;
	title?: string;
	// movies: IMovieMain | null;
	// isLoading?: boolean;
	// onClickCardMovie?: (el: HTMLElement) => void;
	// currentPage: number;
	// onChangePage: (page: number) => void;
}

const ListCardFavMovies: FC<ListCardFavMoviesProps> = observer(
	({ countPerPage = 50, title = "Список фильмов" }) => {
		const {
			rootFavMoviesStore: { favMovies, removeFavMovie },
		} = useStores();
		const [page, setPage] = useState(1);
		const navigate = useNavigate();
		// const ref = useRef<HTMLDivElement | null>(null);

		const handleClickCardMovie: MouseEventHandler<HTMLElement> = ({ target }) => {
			const el = target as HTMLElement;

			if (el.tagName === "BUTTON") {
				const parent = el.parentElement!.parentElement!.parentElement!;
				const movieId = parent.getAttribute("data-key");

				if (el.hasAttribute("data-btn-details")) {
					navigate(`${ROUTES.MOVIE}/${movieId}`);
					return;
				}

				if (el.hasAttribute("data-btn-fav")) {
					removeFavMovie(movieId!);
				}
			}
		};

		const handleNextPageClick = useCallback(() => {
			const current = page;
			const next = current + 1;
			const total = favMovies ? getTotalPageCount(favMovies.length, countPerPage) : current;

			setPage(next <= total ? next : current);
		}, [page, favMovies, countPerPage]);

		const handlePrevPageClick = useCallback(() => {
			const current = page;
			const prev = current - 1;

			setPage(prev > 0 ? prev : current);
		}, [page]);

		return (
			<section className={styles.listCards}>
				<h1 className={styles.title}>{title}</h1>
				<div
					className={styles.container}
					onClick={handleClickCardMovie}
					// ref={ref}
				>
					{/* {isLoading ? (
						<p>Loading...</p>
					) : movies?.docs ? (
						movies.docs.map((movie, i) => (
							<CardMovie
								numberInList={i + 1 + (currentPage - 1) * countPerPage}
								// numberInList={i + 1 + (page - 1) * countPerPage}
								id={movie.id}
								key={movie.id}
								year={movie.year}
								poster={movie.poster?.url ?? "poster.avif"}
								rating={movie.rating.kp}
								name={movie.name ?? movie.enName ?? movie.alternativeName ?? "Название отсутствует"}
								// dataFav={favMoviesIds.includes(movie.id.toString())}
							/>
						)) */}
					{!!favMovies.length ? (
						favMovies.map((movie, i) => (
							<CardMovie
								numberInList={i + 1 + (page - 1) * countPerPage}
								id={movie.id}
								key={movie.id}
								year={movie.year}
								poster={movie.poster?.url ?? "poster.avif"}
								rating={movie.rating.kp}
								name={movie.name ?? movie.enName ?? movie.alternativeName ?? "Название отсутствует"}
								dataFav={true}
							/>
						))
					) : (
						<p>NO DATA</p>
					)}
				</div>

				{!!favMovies.length && (
					<Pagination
						onNextPageClick={handleNextPageClick}
						onPrevPageClick={handlePrevPageClick}
						disable={{
							left: page === 1,
							right: page === getTotalPageCount(favMovies.length, countPerPage),
						}}
						nav={{ current: page, total: getTotalPageCount(favMovies.length, countPerPage) }}
					/>
				)}
			</section>
		);
	},
);

export default ListCardFavMovies;
