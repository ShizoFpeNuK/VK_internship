import { FC, memo } from "react";
import styles from "./Pagination.module.scss";

type PaginationProps = {
	onNextPageClick: () => void;
	onPrevPageClick: () => void;
	disable: {
		left: boolean;
		right: boolean;
	};
	nav?: {
		current: number;
		total: number;
	};
};

const Pagination: FC<PaginationProps> = ({
	nav = null,
	disable,
	onNextPageClick,
	onPrevPageClick,
}) => {
	const handleNextPageClick = () => {
		onNextPageClick();
	};

	const handlePrevPageClick = () => {
		onPrevPageClick();
	};

	return (
		<div className={styles.pagination}>
			<button
				className={styles.arrow}
				type="button"
				title="Назад"
				onClick={handlePrevPageClick}
				disabled={disable.left}
			>
				{"<"}
			</button>
			{nav && (
				<span className={styles.navigation}>
					{nav.current} / {nav.total}
				</span>
			)}
			<button
				className={styles.arrow}
				type="button"
				title="Вперёд"
				onClick={handleNextPageClick}
				disabled={disable.right}
			>
				{">"}
			</button>
		</div>
	);
};

export default memo(Pagination);
