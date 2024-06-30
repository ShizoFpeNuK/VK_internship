import { FC } from "react";
import { IMovie } from "models/movie.model";
import styles from "./MovieDetails.module.scss";

interface MovieDetailsProps {
	movie: IMovie;
}

const MovieDetails: FC<MovieDetailsProps> = ({ movie }) => {
	const title = movie.name ?? movie.enName ?? movie.alternativeName ?? "Постер";

	return (
		<section className={styles.movieDetails}>
			<div className={styles.top}>
				<div className={styles.left}>
					<img
						className={styles.poster}
						src={movie.poster?.url ?? "/poster.jpg"}
						alt={title}
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
				</div>
			</div>

			<div className={styles.bottom}>
				<h3 className={styles.subtitle}>Описание</h3>
				<p className={styles.description}>{movie.description ?? "Отсутствует"}</p>
			</div>
		</section>
	);
};

export default MovieDetails;
