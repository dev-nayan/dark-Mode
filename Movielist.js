import React, { Component } from 'react'

import axios from 'axios'
//link-https://api.themoviedb.org/3/movie/popular?api_key=&language=en-US&page=1
//key-722efcf6249805b7be6fffd194e75902 {{ backgroundColor: 'black', color: 'white' }}
// style={{ backgroundColor: 'goldenrod', color: 'black' }}

export class Movielist extends Component {
    constructor() {
        super()

        this.state = {
            hover: '',
            movies: [],
            currPage: 1,
            parr: [1],
            favourites: [],
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=722efcf6249805b7be6fffd194e75902&language=en-US&page=${this.state.currPage}`)

        let movieDataFromApi = res.data

        this.setState({
            movies: [...movieDataFromApi.results]
        })
    }

    changePage = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=722efcf6249805b7be6fffd194e75902&language=en-US&page=${this.state.currPage}`)

        let movieDataFromApi = res.data

        this.setState({

            movies: [...movieDataFromApi.results]
        })
    }
    handleNext = () => {
        let tempArr = []
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            tempArr.push(i)
        }
        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage + 1,
        }, this.changePage)
    }
    handlePrevious = () => {
        let tempArr = []
        for (let i = 1; i <= this.state.parr.length - 1; i++) {
            tempArr.push(i)
        }
        if (this.state.parr.length > 1) {
            this.setState({
                parr: [...tempArr],
                currPage: this.state.currPage - 1,
            }, this.changePage)
        }

    }

    handlePageClick = (value) => {
        if (value != this.state.currPage) {
            this.setState(
                {
                    currPage: value,
                }

                , this.changePage);
        }
    }
    /*handleFavourites = (movieObj) => {
        let data = JSON.parse(localStorage.getItem('movies-test') || '[]')
        if (this.state.favourites.includes(movieObj.id)) {
            data = data.filter((movie) => movie.id != movieObj.id);
        }
        else {
            data.push(movieObj)
        }
        localStorage.setItem('movie-test', JSON.stringify(data));

        this.handleFavouritesState();


    }
    handleFavouritesState = () => {
        let data = JSON.parse(localStorage.getItem('movies-test') || '[]')
        let temp = data.map((movie) => movie.id);
        this.setState({
            favourites: [...temp],
        });
    };*/
    handleFavourites = (movieObj) => {
        let data = JSON.parse(localStorage.getItem("movies-test") || "[]");

        if (this.state.favourites.includes(movieObj.id)) {
            data = data.filter((movie) => movie.id != movieObj.id);
        } else {
            data.push(movieObj);
        }

        localStorage.setItem("movies-test", JSON.stringify(data));

        console.log(data);

        this.handleFavoritesState();
    };

    handleFavoritesState = () => {
        let data = JSON.parse(localStorage.getItem("movies-test") || "[]");

        let temp = data.map((movie) => movie.id);

        this.setState({
            favourites: [...temp],
        });
    };
    render() {


        return (
            <>
                <div>
                    <h3 className='text-center' style={{ color: 'yellow' }}>
                        <strong>Top Rated</strong>
                    </h3>
                </div>


                <div className='movies-list'>

                    {this.state.movies.map((movieElem) => (
                        <div className="card movie-card"
                            onMouseEnter={() => this.setState({ hover: movieElem.id })}
                            onMouseLeave={() => this.setState({ hover: '' })}
                        >


                            <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} className="card-img-top movie-img " alt="..." />

                            <h5 class="card-title movie-title">{movieElem.original_title}</h5>
                            {this.state.hover == movieElem.id && (
                                <a
                                    class="btn btn-primary movies-button btn-center"
                                    style={{ backgroundColor: 'goldenrod', color: 'black' }}
                                    onClick={() => this.handleFavourites(movieElem)}
                                >
                                    {this.state.favourites.includes(movieElem.id) ? 'Rem From Fav' : 'Add To Fav'}
                                </a>
                            )}

                        </div>
                    ))}

                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item ">
                                <a class="page-link" style={{ backgroundColor: 'black', color: 'white' }} onClick={this.handlePrevious}>
                                    Previous
                                </a>
                            </li>

                            {this.state.parr.map((value) => (
                                <li class="page-item">
                                    <a style={{ backgroundColor: 'black', color: 'white' }}
                                        class="page-link "
                                        onClick={() => this.handlePageClick(value)}
                                    >
                                        {value}
                                    </a>
                                </li>
                            ))}
                            <li class="page-item">
                                <a class="page-link" style={{ backgroundColor: 'black', color: 'white' }} onClick={this.handleNext}>
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </>

        )
    }
}

export default Movielist

