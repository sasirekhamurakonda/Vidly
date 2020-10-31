import React, { Component } from 'react';
import {getMovies} from './services/fakeMovieService.js';
class Movies extends Component {
    state = { 
        Movies:getMovies()
    };
    handleDelete=movie=>{
        const newMovies=this.state.Movies.filter(newmovie=>movie._id!==newmovie._id);
        this.setState({Movies:newMovies});
    };
    renderTags(){
        if(this.state.Movies.length===0) return <h1>There are no tables in the database</h1>
        return <h1>There are ${this.state.Movies.length} tables in the database</h1>
    }
    render() { 
        const {length:count}=this.state.Movies;
        if(count===0)
           return <p>There are no movies in the database</p>
        return ( 
        <React.Fragment>
            <p>There are ${count} movies in the database</p>
            <table className="table">
            <thead>
                <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                </tr>
            </thead>
            <tbody>
                   {this.state.Movies.map(movie=>(
                       <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><button className="btn btn-danger" onClick={()=>{this.handleDelete(movie)}}>Delete</button></td>
                       </tr>
                   ))}
            </tbody>
            </table>
        </React.Fragment>
        );
    }
}
 
export default Movies;