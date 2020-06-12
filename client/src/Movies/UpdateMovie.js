import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const UpdateMovie = props => {
    const { push } = useHistory();
    const { id } = useParams();
    const [update, setUpdate] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    })

    // const UpdateMovie = props => {
    //     const [movie, setMovie] = useState(initialMovie);
    //     const { id } = useParams();
    //     const { push } = useHistory();
    //     console.log(useHistory())
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setUpdate(res.data))
            // why couldn't I see my console.log: console.log("res from update movie axios: ", res.data)
            .catch(err => console.error("err from updatemovie axios call: ", err))
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${update.id}`, update)
            .then(res => {
                console.log(res.data)

                const newMovie = props.movieList.map(movie => {
                    if (movie.id === update.id) {
                        return update
                    }
                    return movie
                })

                props.setMovielist(newMovie);
                push("/")
                // push(`/movies/${update.id}`)
            })
            .catch(err =>
                console.error("error from handlesubmit axios call in updatemovie: ", err))
    }

    const changeHandler = e => {
        e.persist();
        if (e.target.name === "metascore") {
            e.target.value = parseInt(e.target.value, 10);
        }
        setUpdate({
            ...update, [e.target.name]: e.target.value
        })
    }


    return (
        <div>
            <h2> Updated Movie </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={update.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={update.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    value={update.metascore}
                />

                <button type="submit" className="updateMovieBtn">Update</button>

            </form>
        </div>
    )
}

export default UpdateMovie;