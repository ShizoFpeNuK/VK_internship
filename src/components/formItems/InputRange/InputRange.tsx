import { FC, FocusEventHandler, useState } from "react";
import styles from "./InputRange.module.scss";

interface InputRangeProps {
	min: number;
	max: number;
}

type Range = {
	fromRange: string | number;
	toRange: string | number;
};

const InputRange: FC<InputRangeProps> = ({ min, max }) => {
	const [inputValue, setInputValue] = useState<Range>({ fromRange: "", toRange: "" });

	const handleBlur: FocusEventHandler<HTMLInputElement> = ({ target }) => {
		if (!target.value.length) {
			return;
		}

		let valueInt = parseInt(target.value, 10);

		if (valueInt < min) {
			valueInt = min;
		}

		if (valueInt > max) {
			valueInt = max;
		}

		if (target.id === "from") {
			if (valueInt > parseInt(inputValue.toRange.toString())) {
				setInputValue((value) => ({ fromRange: value.toRange, toRange: valueInt }));
				return;
			}

			setInputValue((value) => ({ ...value, fromRange: valueInt.toString() }));
		}

		if (target.id === "to") {
			if (valueInt < parseInt(inputValue.fromRange.toString())) {
				setInputValue((value) => ({ fromRange: valueInt, toRange: value.fromRange }));
				return;
			}

			setInputValue((value) => ({ ...value, toRange: valueInt.toString() }));
		}
	};

	return (
		<div className={styles.inputRange}>
			<input
				type="number"
				name="from"
				id="from"
				min={min}
				max={max}
				value={inputValue.fromRange}
				onBlur={handleBlur}
				onChange={(e) => setInputValue((value) => ({ ...value, fromRange: e.target.value }))}
				placeholder={`от ${min}`}
			/>
			<input
				type="number"
				name="to"
				id="to"
				min={min}
				max={max}
				value={inputValue.toRange}
				onBlur={handleBlur}
				onChange={(e) => setInputValue((value) => ({ ...value, toRange: e.target.value }))}
				placeholder={`до ${max}`}
			/>
		</div>
	);
};

export default InputRange;
