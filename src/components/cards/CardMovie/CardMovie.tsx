import { FC } from "react";
import styles from "./CardMovie.module.scss";

interface CardMovieProps {
	id: number;
	name: string;
	year: number;
	rating: number;
	poster: string;
	numberInList: number;
}

const CardMovie: FC<CardMovieProps> = ({ numberInList, id, name, year, rating, poster }) => {
	return (
		<div
			className={styles.card}
			data-key={id}
		>
			<div className={styles.numberInList}>
				<span>{numberInList}</span>
			</div>

			<img
				src={poster}
				alt={name}
				className={styles.poster}
			/>

			<div className={styles.info}>
				<h3 className={styles.title}>{name}</h3>
				<p className={styles.year}>{year}</p>
				<p className={styles.rating}>{rating}</p>
			</div>

			<button
				className={styles.buttonInfo}
				data-btn-details
			>
				Подробнее
			</button>
		</div>
	);
};

export default CardMovie;
