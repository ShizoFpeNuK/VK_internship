import { FC, MouseEventHandler, useEffect, useState } from "react";
import styles from "./Select.module.scss";

// Добавить режим одиночного и множественного выбора
interface SelectProps {
	genres: string[];
	selected: string[];
	setSelected: (values: string[]) => void;
}

const Select: FC<SelectProps> = ({ selected, setSelected, genres }) => {
	// const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

	const handleClickItem: MouseEventHandler<HTMLDivElement> = ({ target }) => {
		const element = target as HTMLElement;

		if (element.className === styles.item) {
			// if (genres.length === selected.length) {
			// 	setIsAllSelected(true);
			// } else {
			// 	setIsAllSelected(false);
			// }

			// if (element.hasAttribute("data-id")) {
			// 	setIsAllSelected(false);

			// 	if (genres.length === selected.length) {
			// 		setIsAllSelected(false);
			// 		// element.setAttribute("data-choice", "true");
			// 		setSelected([]);
			// 	} else {
			// 		setIsAllSelected(true);
			// 		setSelected(genres);
			// 	}

			// 	return;
			// }

			let newSelected = [...selected];

			if (selected.includes(element.textContent!)) {
				element.setAttribute("data-choice", "false");
				newSelected = newSelected.filter((value) => value !== element.textContent);
			} else {
				element.setAttribute("data-choice", "true");
				newSelected.push(element.textContent!);
			}

			setSelected(newSelected);
		}
	};

	// useEffect(() => {
	// 	console.log(selected);
	// 	console.log(isAllSelected);
	// }, [selected, isAllSelected]);

	return (
		<div
			className={styles.select}
			onClick={handleClickItem}
		>
			{/* <div
				className={styles.item}
				data-id
				data-all={selected.length === genres.length ? "true" : "false"}
			>
				Все жанры
			</div> */}
			{genres.map((genre, i) => (
				<div
					className={styles.item}
					data-choice="false"
					// data-choice={isAllSelected ? "true" : "false"}
					key={i}
				>
					{genre}
				</div>
			))}
		</div>
	);
};

export default Select;
