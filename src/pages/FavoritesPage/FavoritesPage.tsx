import { FC } from "react";
import styles from "./FavoritesPage.module.scss";
import WrapperPage from "components/wrappers/WrapperPage/WrapperPage";
import ListCardFavMovies from "components/lists/ListCardFavMovies/ListCardFavMovies";

const MOVIES_PER_PAGE = 50;

const FavoritesPage: FC = () => {
	return (
		<WrapperPage>
			<section className={styles.favoritesPage}>
				<ListCardFavMovies
					countPerPage={MOVIES_PER_PAGE}
					title="Избранное"
				/>
			</section>
		</WrapperPage>
	);
};

export default FavoritesPage;
