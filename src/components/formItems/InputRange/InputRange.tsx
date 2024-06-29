import { FC, FocusEventHandler, useEffect, useState } from "react";
import styles from "./InputRange.module.scss";
import { TypeInputRange } from "components/types/formItems";

interface InputRangeProps {
	min: number;
	max: number;
	name?: string;
	onInputRange?: (value: TypeInputRange) => void;
}

type Range = {
	from: string | number;
	to: string | number;
};

const InputRange: FC<InputRangeProps> = ({ min, max, name = "", onInputRange }) => {
	const [inputValue, setInputValue] = useState<Range>({ from: "", to: "" });

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
			if (valueInt > parseInt(inputValue.to.toString())) {
				setInputValue((value) => ({ from: value.to, to: valueInt }));
				return;
			}

			setInputValue((value) => ({ ...value, from: valueInt.toString() }));
		}

		if (target.id === "to") {
			if (valueInt < parseInt(inputValue.from.toString())) {
				setInputValue((value) => ({ from: valueInt, to: value.from }));
				return;
			}

			setInputValue((value) => ({ ...value, to: valueInt.toString() }));
		}
	};

	useEffect(() => {
		let value: Range = { ...inputValue };

		if (value.from === "") {
			value.from = min;
		}
		if (value.to === "") {
			value.to = max;
		}

		onInputRange?.({ name, range: value });
	}, [inputValue, name, onInputRange, max, min]);

	return (
		<div className={styles.inputRange}>
			<input
				type="number"
				name="from"
				id="from"
				min={min}
				max={max}
				value={inputValue.from}
				onBlur={handleBlur}
				onChange={(e) => setInputValue((value) => ({ ...value, from: e.target.value }))}
				placeholder={`от ${min}`}
			/>
			<input
				type="number"
				name="to"
				id="to"
				min={min}
				max={max}
				value={inputValue.to}
				onBlur={handleBlur}
				onChange={(e) => setInputValue((value) => ({ ...value, to: e.target.value }))}
				placeholder={`до ${max}`}
			/>
		</div>
	);
};

export default InputRange;
