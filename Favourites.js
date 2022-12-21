import React, { Component } from 'react'
import { movies } from '../movieapiData'

export class Favourites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            movies : [],
        }
    }
     componentDidMount() {
        let genreids =
            { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western", };
            let data = JSON.parse(localStorage.getItem('movies-test') || '[]')

            let tempArr=[]
            data.map((movieObj)=>{
                if(!tempArr.includes(genreids[movieObj.genre_ids[0]])){
                   tempArr.push(genreids[movieObj.genre_ids[0]]);
                }
            })
            this.setState({
                movies : [...data],
                genres : [...tempArr],

            })
    }
   
render() {
    let genreids =
        { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western", };
    let movieData = movies.results
    return (
        <div className='main'>
            <div className='row favourite-row'>
                <div className='col-3' style={{ padding: '2rem' }}>
                    <ul class="list-group list-group-flush genre-selector" style={{ border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                        {this.state.genres.map((genre) => (
                            <li class="list-group-item" style={{ backgroundColor: 'black', color: 'white', border: 'solid', borderColor: 'silver' }}>{genre}</li>
                        ))}

                    </ul>
                </div>
                <div className='col-9 favourites-table'>
                    <div className='row' >

                        <input type='text' placeholder='search' className='input-group-text col' style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px' }} />
                        <input type='number' className='input-group-text col' style={{ backgroundColor: 'black', color: 'white', borderRadius: '10px' }} />

                    </div>

                    <div className='row'>
                        <table class="table " style={{ backgroundColor: 'black', color: 'white', border: 'solid', borderColor: 'white', borderRadius: '5px' }}>
                            <thead>
                                <tr style={{ color: 'goldenrod' }}>
                                    <th></th>
                                    <th scope="col" >Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map((movieObj) => (
                                    <tr>
                                        <td><img style={{ width: '8rem' }} src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} /></td>
                                        <th scope="row">{movieObj.title}</th>
                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                        <td style={{ color: 'lightGreen' }}>{movieObj.popularity}</td>
                                        <td style={{ color: 'orange' }}>{movieObj.vote_average}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
}

export default Favourites