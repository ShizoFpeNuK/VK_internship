import { FC } from "react";
import styles from "./ListCardMovie.module.scss";
import CardMovie from "components/CardMovie/CardMovie";

const ListCardMovie: FC = () => {
	return (
		<div className={styles.listCards}>
			{Array.from({ length: 50 }).map((_, i) => (
				<CardMovie
					id={++i}
					key={i}
				/>
			))}
		</div>
	);
};

export default ListCardMovie;
