import { observer } from "mobx-react-lite";
import { CSSProperties, FC, FormEventHandler, useState } from "react";
import styles from "./FiltersMovie.module.scss";
import InputRange from "components/formItems/InputRange/InputRange";
import PopupList from "components/popups/PopupList/PopupList";
import Select from "components/formItems/Select/Select";

interface FiltersMovieProps {
	style?: CSSProperties;
}

const genres = ["Комедия", "Драма", "Экшен", "Фантастика"];

const FiltersMovie: FC<FiltersMovieProps> = observer(({ style }) => {
	const [selected, setSelected] = useState<string[]>([]);

	const handleSubmit: FormEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
	};

	return (
		<form
			className={styles.filters}
			style={style}
		>
			<PopupList title="Жанры">
				<Select
					selected={selected}
					setSelected={setSelected}
					genres={genres}
				/>
			</PopupList>
			<PopupList title="Рейтинг">
				<InputRange
					min={0}
					max={10}
				/>
			</PopupList>
			<PopupList title="Год выпуска">
				<InputRange
					min={1990}
					max={new Date().getFullYear()}
				/>
			</PopupList>
			<button onSubmit={handleSubmit}>Поиск</button>
		</form>
	);
});

export default FiltersMovie;
