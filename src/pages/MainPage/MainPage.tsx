import { FC } from "react";
import styles from "./MainPage.module.scss";
import WrapperPage from "components/wrappers/WrapperPage/WrapperPage";
import FiltersMovie from "components/forms/FiltersMovie/FiltersMovie";
import ListCardMovie from "components/lists/ListCardMovie/ListCardMovie";

const MOVIES_PER_PAGE = 50;

const MainPage: FC = () => {
	return (
		<WrapperPage>
			<section className={styles.mainPage}>
				<FiltersMovie countPerPage={MOVIES_PER_PAGE} />
				<ListCardMovie countPerPage={MOVIES_PER_PAGE} />
			</section>
		</WrapperPage>
	);
};

export default MainPage;
