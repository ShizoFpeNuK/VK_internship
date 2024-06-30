import { IMovie } from "models/movie.model";
import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import styles from "./MovieDetails.module.scss";

interface MovieDetailsProps {
	movie: IMovie;
}

const MovieDetails: FC<MovieDetailsProps> = observer(({ movie }) => {
	const title = movie.name ?? movie.enName ?? movie.alternativeName ?? "Постер";

	const {
		rootFavMoviesStore: { favMoviesIds, addFavMovie, removeFavMovie },
	} = useStores();
	const refBtn = useRef<HTMLButtonElement>(null);
	const [isFavorite, setIsFavorite] = useState<boolean>(false);

	const handleClickFav: MouseEventHandler<HTMLButtonElement> = () => {
		if (refBtn.current) {
			const btnFav = refBtn.current;
			btnFav.disabled = true;
			const isAdding = favMoviesIds.every((favId) => favId !== movie.id.toString());

			if (isAdding) {
				btnFav.setAttribute("data-fav", "true");
				addFavMovie(movie.id).then(() => (btnFav.disabled = false));
				setIsFavorite(true);
			} else {
				btnFav.setAttribute("data-fav", "false");
				removeFavMovie(movie.id).then(() => (btnFav.disabled = false));
				setIsFavorite(false);
			}
		}
	};

	useEffect(() => {
		if (refBtn.current && favMoviesIds.length) {
			const isAdding = favMoviesIds.some((favId) => favId === movie.id.toString());

			if (isAdding) {
				refBtn.current.setAttribute("data-fav", "true");
				setIsFavorite(true);
			}
		}
	}, [favMoviesIds, movie]);

	return (
		<section className={styles.movieDetails}>
			<div className={styles.top}>
				<div className={styles.left}>
					<img
						className={styles.poster}
						src={movie.poster?.url ?? "/poster.jpg"}
						alt={title}
						loading="lazy"
					/>
				</div>

				<div className={styles.right}>
					<h1 className={styles.title}>{title}</h1>

					<div className={styles.info}>
						<h3 className={styles.subtitle}>Информация</h3>

						<div className={styles.row}>
							<div className={styles.left}>Год выпуска</div>
							<div className={styles.right}>{movie.year}</div>
						</div>

						<div className={styles.row}>
							<div className={styles.left}>Жанр</div>
							<div className={styles.right}>
								{movie.genres.map((genre, i) =>
									movie.genres.length - 1 !== i ? `${genre.name}, ` : genre.name,
								)}
							</div>
						</div>

						<div className={styles.row}>
							<div className={styles.left}>Рейтинг</div>
							<div className={styles.right}>
								{movie.rating.kp === 0 ? "Недостаточно оценок" : `${movie.rating.kp} ★`}
							</div>
						</div>
					</div>

					<div className={styles.actives}>
						<button
							ref={refBtn}
							className={styles.btnFav}
							onClick={handleClickFav}
							data-fav="false"
						>
							{isFavorite ? "Избранное" : "В избранное"}
						</button>
					</div>
				</div>
			</div>

			<div className={styles.bottom}>
				<h3 className={styles.subtitle}>Описание</h3>
				<p className={styles.description}>{movie.description ?? "Отсутствует"}</p>
			</div>
		</section>
	);
});

export default MovieDetails;
