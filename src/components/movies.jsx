import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService.js';
import Pagination from './common/pagination';
import {paginate} from '../utils/paginate';
import ListGroup from './common/listGroup';
import {getGenres} from '../services/fakeGenreService.js'; 
import MoviesTable from './moviesTable';
import _ from 'lodash';
class Movies extends Component {
    state = { 
        Movies:[],
        genres:[],
        pageSize:4,
        currentPage:1,
        sortColumn:{path:'title',order:'asc'}
        };
    
    componentDidMount(){
        const genres=[{_id:'',name:'AllGenres'},...getGenres()]
        this.setState({Movies:getMovies(),genres});
    }
    handleDelete=movie=>{
        const newMovies=this.state.Movies.filter(newmovie=>movie._id!==newmovie._id);
        this.setState({Movies:newMovies});
    };
    renderTags(){
        if(this.state.Movies.length===0) return <h1>There are no tables in the database</h1>
        return <h1>There are ${this.state.Movies.length} tables in the database</h1>
    }
    handleLike=(movie)=>{
        let Movies=[...this.state.Movies];
        const index=Movies.indexOf(movie);
        Movies[index]={...Movies[index]};
        Movies[index].liked=!Movies[index].liked;
        this.setState({Movies})
        
    };
    handleSort=(sortColumn)=>{
        this.setState({sortColumn});
    }
    handlePageChange=(page)=>{
        this.setState({currentPage:page});
    };
    handleGenreSelect=genre=>{
        this.setState({selectedGenre:genre,currentPage:1})
    }
    getPageData=()=>{
        const {pageSize,currentPage,Movies,selectedGenre,sortColumn}=this.state;
        const filtered=selectedGenre&&selectedGenre._id?Movies.filter(m=>m.genre._id===selectedGenre._id):Movies;
        const sorted=_.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
        const movies=paginate(sorted,currentPage,pageSize);
        return {totalCount:filtered.length,data:movies}
    }
    render() { 
        const {length:count}=this.state.Movies;
        const {pageSize,currentPage,selectedGenre,sortColumn}=this.state;
        if(count===0)
           return <p>There are no movies in the database</p>
        const {totalCount,data:movies}=this.getPageData();
        return ( 
                <div className="row">
                    <div className="col-3">
                        <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={selectedGenre}/>
                    </div>
                    <div className="col">
                        <p>There are ${totalCount} movies in the database</p>
                        <MoviesTable movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} sortColumn={sortColumn}/>
                        <Pagination itemsCount={totalCount} currentPage={currentPage} pageSize={pageSize} onPageChange={this.handlePageChange}/>
                    </div>
                </div>
        );
    }
}
 
export default Movies;