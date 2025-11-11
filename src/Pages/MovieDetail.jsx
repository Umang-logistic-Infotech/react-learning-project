import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function MovieDetail() {
    const { movieId } = useParams();
    const [currentMovieId, setCurrentMovieId] = useState(movieId);

    useEffect(() => {
        setCurrentMovieId(movieId);
    }, [movieId]);
    return (
        <>
            <Container className=' mt-5'>
                <h1>Movie ID: {currentMovieId}</h1>
            </Container>
        </>
    );
}
