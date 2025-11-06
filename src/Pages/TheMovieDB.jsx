import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function TheMovieDB() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    const token = process.env.REACT_APP_ACCESS_TOKEN;
    async function fetchMovies() {
        try {
            const response = await axios.get(
                "https://api.themoviedb.org/3/discover/movie",
                {
                    params: {
                        page: `${page}`,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMovies((prev) => [...prev, ...response.data.results]);
            setPage(response.data.page);
            setTotalPages(response.data.total_pages);
        } catch (err) {
            setError("Failed to fetch movies. Please try again later.");
            console.error(err);
        }
    };

    function handlePage(e) {
        setPage(page + 1);
    }

    useEffect(() => {
        fetchMovies();
    }, [page]);

    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">
                Movie List (Page {page} of {totalPages})
            </h1>

            {error && <p className="text-danger text-center">{error}</p>}

            <Row className="row-cols-lg-5 d-flex justify-content-center" id="movieContainer">
                {movies.length > 0 ? (
                    movies.map((movie) => {
                        const vote = Math.round(movie.vote_average * 10);
                        const posterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
                        return (
                            <Col key={movie.id} className="mb-4">
                                <a
                                    href={`/TheMovieDB/${movie.id}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div
                                        className="movie-card sha shadow-sm rounded bg-body border mt-2 position-relative text-center p-2"
                                        style={{ transition: "transform 0.3s", height: "450px" }}
                                    >
                                        <img
                                            src={posterPath}
                                            alt={movie.title}
                                            className="border rounded text-wrap"
                                            width="200px"
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className="d-flex justify-content-start align-items-center">
                                            <div
                                                className="rounded-circle border text-break position-absolute p-2 text-white"
                                                style={{
                                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                    backdropFilter: "blur(2px)",
                                                    top: "285px",
                                                    left: "30px",
                                                    fontSize: "0.9rem",
                                                    width: "40px",
                                                    height: "40px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {vote}
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="fs-5 text-break fw-bold">{movie.title}</div>
                                            <div className="text-muted">{movie.release_date}</div>
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        );
                    })
                ) : (
                    <p className="text-center">Loading movies...</p>
                )}
            </Row>
            <Button onClick={handlePage} className=" mb-5"> Loadmore </Button>
        </Container>
    );
}
