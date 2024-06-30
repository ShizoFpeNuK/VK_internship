import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { getTotalPageCount } from "utils/helpers/getTotalPageCount";
import { FC, MouseEventHandler, useCallback, useState } from "react";
import styles from "./ListCardFavMovies.module.scss";
import CardMovie from "components/cards/CardMovie/CardMovie";
import Pagination from "components/Pagination/Pagination";
import MainLoader from "components/loaders/MainLoader/MainLoader";

interface ListCardFavMoviesProps {
	countPerPage?: number;
	title?: string;
}

const ListCardFavMovies: FC<ListCardFavMoviesProps> = observer(
	({ countPerPage = 50, title = "Список фильмов" }) => {
		const {
			rootFavMoviesStore: { favMovies, isLoading, removeFavMovie },
		} = useStores();
		const [page, setPage] = useState(1);

		const handleClickCardMovie: MouseEventHandler<HTMLElement> = ({ target }) => {
			const el = target as HTMLElement;

			if (el.hasAttribute("data-btn-fav")) {
				const parent = el.parentElement!.parentElement!.parentElement!;
				const movieId = parent.getAttribute("data-key");
				removeFavMovie(movieId!);
			}
		};

		const handleNextPageClick = useCallback(() => {
			const current = page;
			const next = current + 1;
			const total = !!favMovies.length
				? getTotalPageCount(favMovies.length, countPerPage)
				: current;

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
				>
					{isLoading ? (
						<div className={styles.loader}>
							<MainLoader />
						</div>
					) : !!favMovies.length ? (
						favMovies.slice((page - 1) * countPerPage, page * countPerPage).map((movie, i) => (
							<CardMovie
								numberInList={i + 1 + (page - 1) * countPerPage}
								key={movie.id}
								dataFav={true}
								movie={movie}
							/>
						))
					) : (
						<p>По запросу ничего не найдено...</p>
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
