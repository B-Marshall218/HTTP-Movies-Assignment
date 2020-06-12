import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
    const [addMovie, setAddMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    })




    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        setAddMovie({
            ...addMovie,
            [e.target.name]: value
        });
    }


    const handleSubmit = e => {
        e.preventDefault();

        axios
            .post(`http://localhost:5000/api/movies`, addMovie)
            .then(res => {
                props.setMovieList(res.data)
            })
            .catch(err =>
                console.error("error from handlesubmit axios call in updatemovie: ", err))
    }

    return (
        <div>
            <h2> Updated Movie </h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={addMovie.title}
                    placeholder="title"
                />
                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={addMovie.director}
                    placeholder="director"
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    value={addMovie.metascore}
                    placeholder="metascore"
                />
                <input
                    type="string"
                    name="stars"
                    onChange={changeHandler}
                    value={addMovie.stars}
                    placeholder="stars if you dare"
                />
                <button className="updateMovieBtn">Update</button>

            </form>
        </div>
    )

};

export default AddMovie;