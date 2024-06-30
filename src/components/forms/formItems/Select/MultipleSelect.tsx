import { TypeMultipleSelect } from "types/formItems";
import { FC, MouseEventHandler, useState } from "react";
import styles from "./MultipleSelect.module.scss";

interface MultipleSelectProps {
	selects: string[];
	name?: string;
	onSelected?: (value: TypeMultipleSelect) => void;
}

const MultipleSelect: FC<MultipleSelectProps> = ({ onSelected, selects, name = "" }) => {
	const [selected, setSelected] = useState<string[]>([]);

	const handleClickItem: MouseEventHandler<HTMLDivElement> = ({ target }) => {
		const el = target as HTMLElement;

		if (el.className === styles.item) {
			let newSelected = [...selected];

			if (selected.includes(el.getAttribute("data-key")!)) {
				el.setAttribute("data-choice", "false");
				newSelected = newSelected.filter((value) => value !== el.getAttribute("data-key"));
			} else {
				el.setAttribute("data-choice", "true");
				newSelected.push(el.getAttribute("data-key")!);
			}

			setSelected(newSelected);
			onSelected?.({ name, selected: newSelected });
		}
	};

	return (
		<div className={styles.dropdown}>
			<div
				className={styles.select}
				onClick={handleClickItem}
			>
				{selects.map((select) => (
					<div
						className={styles.item}
						data-choice="false"
						key={select}
						data-key={select}
					>
						{select.charAt(0).toUpperCase() + select.slice(1)}
					</div>
				))}
			</div>
		</div>
	);
};

export default MultipleSelect;
