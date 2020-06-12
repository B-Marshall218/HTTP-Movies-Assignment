import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);


  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // const addMovieUpdate = movie => {
  //   UpdateMovie([...movieList, movie])
  // }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <AddMovie movieList={movieList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
        <AddMovie setMovieList={setMovieList} getMovieList={getMovieList} />
      </Route>

      <Route path="/movies/:id" render={props => {
        return <Movie getMovieList={getMovieList} {...props} movieList={movieList} setMovieList={setMovieList} addToSavedList={addToSavedList} />
      }} />

      <Route path='/update-movie/:id' render={props => (<UpdateMovie {...props} movieList={movieList} setMovieList={setMovieList} />)} />
      {/* movieList={movieList} setMovieList={setMovieList} */}



    </>
  );
};

export default App;
