import { FC } from "react";
import styles from "./CardMovie.module.scss";

interface CardMovieProps {
	id: number;
}

const CardMovie: FC<CardMovieProps> = ({ id }) => {
	return (
		<div className={styles.card}>
			<div className={styles.id}>
				<span>{id}</span>
			</div>
			<img
				src="poster.avif"
				alt="Название фильма"
				className={styles.poster}
			/>
			<div className={styles.info}>
				<h3 className={styles.title}>Название фильма</h3>
				<p className={styles.year}>Год выпуска</p>
				<p className={styles.rating}>Рейтинг фильма</p>
			</div>
		</div>
	);
};

export default CardMovie;
