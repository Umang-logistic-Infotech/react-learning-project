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
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        fetchMovies();
    }, [page]);

    return (
        <div 
            className={`${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
            style={{ paddingBottom: '2rem' }}
        >
            <Container fluid className="">
                <h1 className="text-center mb-4">
                    Movie List (Page {page} of {totalPages})
                </h1>

                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                <Row className="g-3 justify-content-center">
                    {movies.length > 0 ? (
                        movies.map((movie) => {
                            const vote = Math.round(movie.vote_average * 10);
                            const posterPath = movie.poster_path 
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : 'https://via.placeholder.com/200x300?text=No+Image';
                            
                            return (
                                <Col key={movie.id} xs={12} sm={6} md={4} lg={3} xxl={2} className="d-flex justify-content-center" style={{ maxWidth: '20%', flex: '0 0 20%' }}>
                                    <a
                                        href={`/TheMovieDB/${movie.id}`}
                                        style={{ textDecoration: "none", color: "inherit", width: '100%', maxWidth: '220px' }}
                                    >
                                        <div
                                            className={`movie-card shadow rounded ${
                                                theme === "dark" ? "bg-secondary text-light" : "bg-white border"
                                            } position-relative text-center p-3`}
                                            style={{ 
                                                transition: "transform 0.3s, box-shadow 0.3s", 
                                                height: "100%",
                                                minHeight: "400px"
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = "translateY(-5px)";
                                                e.currentTarget.style.boxShadow = theme === 'dark' 
                                                    ? "0 8px 16px rgba(255,255,255,0.2)" 
                                                    : "0 8px 16px rgba(0,0,0,0.2)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = "translateY(0)";
                                                e.currentTarget.style.boxShadow = "";
                                            }}
                                        >
                                            <div className="position-relative" style={{ marginBottom: "1rem" }}>
                                                <img
                                                    src={posterPath}
                                                    alt={movie.title}
                                                    className="rounded w-100"
                                                    style={{ 
                                                        objectFit: "cover", 
                                                        height: "300px",
                                                        display: "block"
                                                    }}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                                                    }}
                                                />
                                                <div
                                                    className="rounded-circle border border-2 border-white position-absolute"
                                                    style={{
                                                        backgroundColor: vote >= 70 ? "#21d07a" : vote >= 50 ? "#d2d531" : "#db2360",
                                                        bottom: "-20px",
                                                        left: "10px",
                                                        fontSize: "0.85rem",
                                                        fontWeight: "bold",
                                                        width: "40px",
                                                        height: "40px",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        color: "white",
                                                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
                                                    }}
                                                >
                                                    {vote}%
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div 
                                                    className="fw-bold mb-2" 
                                                    style={{ 
                                                        fontSize: "1rem", 
                                                        lineHeight: "1.2",
                                                        minHeight: "2.4rem",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: "2",
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden"
                                                    }}
                                                >
                                                    {movie.title}
                                                </div>
                                                <div 
                                                    className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}
                                                    style={{ fontSize: "0.875rem" }}
                                                >
                                                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric' 
                                                    }) : 'No release date'}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Col>
                            );
                        })
                    ) : (
                        !loading && <p className="text-center col-12">No movies found.</p>
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
                            className={`px-5 py-2 ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
                            disabled={loading}
                            style={{ 
                                minWidth: "150px",
                                transition: "all 0.3s"
                            }}
                        >
                            {loading ? "Loading..." : "Load More"}
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    );
}