import { IMovie } from "models/movie.model";
import { FC, Suspense } from "react";
import { Await, Params, defer, useLoaderData } from "react-router-dom";
import styles from "./MoviePage.module.scss";
import MainLoader from "components/loaders/MainLoader/MainLoader";
import WrapperPage from "components/wrappers/WrapperPage/WrapperPage";
import MovieDetails from "components/MovieDetails/MovieDetails";
import MoviesService from "services/movie.service";

export const movieLoader = ({ params }: { params: Params<"movieId"> }) => {
	const movie = MoviesService.getOne(params.movieId!);

	return defer({ movie });
};

const MoviePage: FC = () => {
	const { movie } = useLoaderData() as { movie: IMovie };

	return (
		<WrapperPage>
			<section className={styles.moviePage}>
				<Suspense
					fallback={
						<div className={styles.loader}>
							<MainLoader />
						</div>
					}
				>
					<Await
						resolve={movie}
						errorElement={<p>Ошибка загрузки фильма!</p>}
					>
						{(movie) => <MovieDetails movie={movie} />}
					</Await>
				</Suspense>
			</section>
		</WrapperPage>
	);
};

export default MoviePage;
