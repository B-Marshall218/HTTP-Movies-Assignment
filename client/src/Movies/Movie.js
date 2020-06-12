import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { getMovieList } from "../App";


function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory(); //whats the point of this line?

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }


  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log("from delete component", res)
        setMovie(res.data)
        push('/')
        props.getMovieList();
      })
      .catch(err => console.log(err))
  }


  // const deleteMovie = e => {

  //   e.preventDefault();
  //   axios.delete(`http://localhost:3333/api/movies/${params.id}`)
  //     .then((res) => {
  //       setMovie(res.movie);
  //       push(`/`);
  //       // getMovieList()
  //     })
  //     .catch(err => console.error(err.message))
  // }



  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to={`update-movie/${params.id}`}>
        <button type="submit">Update</button>
      </Link>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  )
}

export default Movie;
