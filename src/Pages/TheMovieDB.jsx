import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContextProvider";

export default function TheMovieDB() {
    const { theme } = useTheme();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = process.env.REACT_APP_ACCESS_TOKEN;

    async function fetchMovies() {
        setLoading(true);
        try {
            const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
                params: { page: `${page}` },
                headers: { Authorization: `Bearer ${token}` },
            });
            setMovies((prev) => [...prev, ...response.data.results]);
            setTotalPages(response.data.total_pages);
            setError(null);
        } catch (err) {
            setError("Failed to fetch movies. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handlePage() {
        setPage((prev) => prev + 1);
    }

    useEffect(() => {
        fetchMovies();
    }, [page]);

    return (
        <div
            className={`${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}
            style={{ minHeight: "100vh", paddingBottom: "2rem" }}
        >
            <Container className="pt-4">
                <h1 className="text-center mb-4">
                    Movie List (Page {page} of {totalPages})
                </h1>

                {error && <p className="text-danger text-center">{error}</p>}

                <Row className="row-cols-lg-5 d-flex justify-content-center" id="movieContainer">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <Col key={movie.id} className="mb-4 d-flex justify-content-center">
                                <a
                                    href={`/TheMovieDB/${movie.id}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div
                                        className={`movie-card shadow-sm rounded ${
                                            theme === "dark"
                                                ? "bg-secondary text-light"
                                                : "bg-white border"
                                        } position-relative text-center p-2`}
                                        style={{
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            height: "450px",
                                            width: "220px",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "translateY(-5px)";
                                            e.currentTarget.style.boxShadow =
                                                theme === "dark"
                                                    ? "0 6px 12px rgba(255,255,255,0.15)"
                                                    : "0 6px 12px rgba(0,0,0,0.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "";
                                        }}
                                    >
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                                    : "https://via.placeholder.com/200x300?text=No+Image"
                                            }
                                            alt={movie.title}
                                            className="border rounded"
                                            width="200"
                                            height="300"
                                            style={{ objectFit: "cover" }}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/200x300?text=No+Image";
                                            }}
                                        />

                                        <div
                                            className="rounded-circle position-absolute border text-white"
                                            style={{
                                                backgroundColor:
                                                    Math.round(movie.vote_average * 10) >= 70
                                                        ? "#21d07a"
                                                        : Math.round(movie.vote_average * 10) >= 50
                                                        ? "#d2d531"
                                                        : "#db2360",
                                                top: "285px",
                                                left: "30px",
                                                fontSize: "0.9rem",
                                                fontWeight: "bold",
                                                width: "40px",
                                                height: "40px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            {Math.round(movie.vote_average * 10)}
                                        </div>

                                        <div className="mt-3">
                                            <div
                                                className="fs-6 fw-bold text-break"
                                                style={{
                                                    minHeight: "2.4rem",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "2",
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {movie.title}
                                            </div>
                                            <div
                                                className={`${
                                                    theme === "dark" ? "text-light" : "text-muted"
                                                }`}
                                                style={{ fontSize: "0.85rem" }}
                                            >
                                                {movie.release_date
                                                    ? new Date(
                                                          movie.release_date
                                                      ).toLocaleDateString("en-US", {
                                                          month: "short",
                                                          day: "numeric",
                                                          year: "numeric",
                                                      })
                                                    : "No release date"}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">Loading movies...</p>
                    )}
                </Row>

                {loading && (
                    <div className="text-center mt-4">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {movies.length > 0 && page < totalPages && (
                    <div className="text-center mt-5">
                        <Button
                            onClick={handlePage}
                            className={`px-5 py-2 ${
                                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Load More"}
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}
