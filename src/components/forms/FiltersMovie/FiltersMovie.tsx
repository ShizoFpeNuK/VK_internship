import { observer } from "mobx-react-lite";
import { useStores } from "hooks/rootStoreContext";
import { hasEmptyValues } from "utils/helpers/checkFields";
import { TypeInputRange, TypeMultipleSelect } from "types/formItems";
import { CSSProperties, FC, FormEventHandler, useCallback, useMemo, useState } from "react";
import styles from "./FiltersMovie.module.scss";
import PopupList from "components/popups/PopupList/PopupList";
import InputRange from "components/forms/formItems/InputRange/InputRange";
import MainLoader from "components/loaders/MainLoader/MainLoader";
import MultipleSelect from "components/forms/formItems/Select/MultipleSelect";

interface FiltersMovieProps {
	countPerPage: number;
	style?: CSSProperties;
}

type FormData = {
	genres: string[];
	year: { from: number | string; to: number | string };
	rating: { from: number | string; to: number | string };
};

const RATING = [0, 10];
const YEAR = [1990, new Date().getFullYear()];

const FiltersMovie: FC<FiltersMovieProps> = observer(({ style, countPerPage }) => {
	const {
		rootGenresStore: { genres, isLoading },
		rootMoviesStore: { getMovies, setIsAppliedFilters },
	} = useStores();
	const [formData, setFormData] = useState<FormData>({
		genres: [],
		year: { from: YEAR[0], to: YEAR[1] },
		rating: { from: RATING[0], to: RATING[1] },
	});

	const genreNames = useMemo(() => genres.map((genre) => genre.name), [genres]);

	const handleChangeInputRange = useCallback((value: TypeInputRange) => {
		setFormData((values) => ({ ...values, [value.name!]: value.range }));
	}, []);

	const handleSelect = (value: TypeMultipleSelect) => {
		setFormData((values) => ({ ...values, [value.name!]: value.selected }));
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!hasEmptyValues(formData, ["genres"])) {
			getMovies({
				limit: countPerPage,
				genres: formData.genres,
				rating: { kp: `${formData.rating.from}-${formData.rating.to}` },
				year: `${formData.year.from}-${formData.year.to}`,
			});
			setIsAppliedFilters(true);
		}
	};

	return (
		<aside
			className={styles.container}
			style={style}
		>
			<form
				className={styles.filters}
				onSubmit={handleSubmit}
			>
				<PopupList title="Жанры">
					{isLoading ? (
						<div className={styles.loader}>
							<MainLoader
								width={30}
								height={30}
							/>
						</div>
					) : (
						!!genreNames.length && (
							<MultipleSelect
								name="genres"
								selects={genreNames}
								onSelected={handleSelect}
							/>
						)
					)}
				</PopupList>
				<PopupList title="Рейтинг">
					<InputRange
						name="rating"
						min={RATING[0]}
						max={RATING[1]}
						onInputRange={handleChangeInputRange}
					/>
				</PopupList>
				<PopupList title="Год выпуска">
					<InputRange
						name="year"
						min={YEAR[0]}
						max={YEAR[1]}
						onInputRange={handleChangeInputRange}
					/>
				</PopupList>

				<button
					className={styles.btnSubmit}
					type="submit"
					disabled={!genreNames.length ? true : false}
				>
					Поиск
				</button>
			</form>
		</aside>
	);
});

export default FiltersMovie;
