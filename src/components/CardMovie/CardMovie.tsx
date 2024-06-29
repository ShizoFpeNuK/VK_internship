import { FC } from "react";
import styles from "./CardMovie.module.scss";

interface CardMovieProps {
	id: number;
	name: string;
	year: number;
	rating: number;
	poster: string;
}

const CardMovie: FC<CardMovieProps> = ({ id, name, year, rating, poster }) => {
	return (
		<div className={styles.card}>
			<div className={styles.id}>
				<span>{id}</span>
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
		</div>
	);
};

export default CardMovie;
