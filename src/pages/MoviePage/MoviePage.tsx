import { IMovie } from "models/movie.model";
import { FC, Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import styles from "./MoviePage.module.scss"
import WrapperPage from "components/wrappers/WrapperPage/WrapperPage";
import MovieDetails from "components/MovieDetails/MovieDetails";
import MoviesService from "services/movie.service";

export const movieLoader = ({ params }: any) => {
	const movie = MoviesService.getOne(params.movieId);
	console.log(params);

	return defer({ movie });
};

const MoviePage: FC = () => {
	const { movie } = useLoaderData() as { movie: IMovie };

	return (
		<WrapperPage>
			<section className={styles.moviePage}>
				<Suspense fallback={<p>Loading...</p>}>
					<Await
						resolve={movie}
						errorElement={<p>Error loading movie!</p>}
					>
						{(movie) => <MovieDetails movie={movie} />}
					</Await>
				</Suspense>
			</section>
		</WrapperPage>
	);
};

export default MoviePage;
