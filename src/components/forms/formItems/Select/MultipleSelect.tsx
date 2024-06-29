import { TypeMultipleSelect } from "types/formItems";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import styles from "./MultipleSelect.module.scss";

interface MultipleSelectProps {
	selects: string[];
	name?: string;
	onSelected?: (value: TypeMultipleSelect) => void;
}

// const Select: FC<SelectProps> = ({ selected, onSelected, selects, name = "" }) => {
const MultipleSelect: FC<MultipleSelectProps> = ({ onSelected, selects, name = "" }) => {
	const [selected, setSelected] = useState<string[]>([]);
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

			if (selected.includes(element.getAttribute("data-key")!)) {
				element.setAttribute("data-choice", "false");
				newSelected = newSelected.filter((value) => value !== element.getAttribute("data-key"));
			} else {
				element.setAttribute("data-choice", "true");
				newSelected.push(element.getAttribute("data-key")!);
			}

			setSelected(newSelected);
			onSelected?.({ name, selected: newSelected });
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
			{selects.map((select, i) => (
				<div
					className={styles.item}
					data-choice="false"
					// data-choice={isAllSelected ? "true" : "false"}
					key={select}
					data-key={select}
				>
					{select.charAt(0).toUpperCase() + select.slice(1)}
				</div>
			))}
		</div>
	);
};

export default MultipleSelect;
