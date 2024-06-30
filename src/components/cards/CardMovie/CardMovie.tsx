import { FC } from "react";
import styles from "./CardMovie.module.scss";

interface CardMovieProps {
	id: number;
	name: string;
	year: number;
	rating: number;
	poster: string;
	numberInList: number;
	dataFav?: boolean;
}

const CardMovie: FC<CardMovieProps> = ({
	numberInList,
	id,
	name,
	year,
	rating,
	poster,
	dataFav = "false",
}) => {
	return (
		<div
			className={styles.card}
			data-key={id}
			data-fav={dataFav}
		>
			<div className={styles.numberInList}>
				<span>{numberInList}</span>
			</div>

			<img
				src={poster}
				alt={name}
				className={styles.poster}
			/>

			<div className={styles.container}>
				<div className={styles.info}>
					<h3 className={styles.title}>{name}</h3>
					<div className={styles.text}>{year}</div>
					<div className={styles.text}>{rating === 0 ? "Недостаточно оценок" : `${rating} ★`}</div>
				</div>

				<div className={styles.actives}>
					<button
						className={styles.btnInfo}
						data-btn-details
					>
						Подробнее
					</button>
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
