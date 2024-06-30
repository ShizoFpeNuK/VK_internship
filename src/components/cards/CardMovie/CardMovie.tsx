import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/routes/routes-page";
import { IMovieMain } from "models/movie.model";
import styles from "./CardMovie.module.scss";

interface CardMovieProps {
	numberInList: number;
	dataFav?: boolean;
	movie: IMovieMain;
}

const CardMovie: FC<CardMovieProps> = ({ numberInList, dataFav = "false", movie }) => {
	const nameOk = movie.name ?? movie.enName ?? movie.alternativeName ?? "Название отсутствует";

	return (
		<div
			className={styles.card}
			data-key={movie.id}
			data-fav={dataFav}
		>
			<div className={styles.numberInList}>
				<span>{numberInList}</span>
			</div>

			<img
				src={movie.poster?.url ?? "poster.jpg"}
				alt={nameOk}
				className={styles.poster}
			/>

			<div className={styles.container}>
				<div className={styles.info}>
					<h3 className={styles.title}>{nameOk}</h3>
					<div className={styles.text}>{movie.year}</div>
					<div className={styles.text}>
						{movie.rating.kp === 0 ? "Недостаточно оценок" : `${movie.rating.kp} ★`}
					</div>
				</div>

				<div className={styles.actives}>
					<Link to={`${ROUTES.MOVIE}/${movie.id}`}>
						<button
							className={styles.btnInfo}
							data-btn-details
						>
							Подробнее
						</button>
					</Link>
					<button
						className={styles.btnFav}
						data-btn-fav
					>
						☆
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardMovie;
