import React from 'react'
import '../Search.css'
import axios from 'axios'
import { Link } from "react-router-dom";
import $ from 'jquery'

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            query : '',
            results : {},
            message: ''
        }
        this.cancel = ''
    }

    handleOnInputChange = (event) => {
        const query = event.target.value
        if(!query){
            this.setState({query:query, results:{}, message:''})
        }
        else{
            this.setState({query:query, message:''}, () => {
                this.fetchSearchResults(query);            
            });
        }

    }

    fetchSearchResults = (query) => {
        const searchUrl = `https://rest.bandsintown.com/artists/${query}?app_id=codingbootcamp`
        if (this.cancel !== ''){
            this.cancel.cancel()
        }
        this.cancel = axios.CancelToken.source();
        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
        .then(res => {
                const resultNotFoundMsg = (res.data==="" || res.data.error==="Not Found") ? "There are no search results. Please try a new search" : ""
                this.setState({
                    results: res.data,
                    message: resultNotFoundMsg,
                })
        })
        .catch(error => {
            if(axios.isCancel(error) || error){
                this.setState({
                    message: 'Failed to fetch the data'
                })
            
            }
        })
    }

   
    scrollToBottom = () => {
        var scroll = $('.scrolll');
        if(scroll.length){
            $('html,body').animate({
                scrollTop: scroll.offset().top},
                        'slow');
        }
        
    }

    renderSearchResults = () => {
        const results  = this.state.results;
        if((Object.keys(results).length && !(results.hasOwnProperty('error')) )){
            return <section className="testimonials text-center bg-light">
                <div className="container">
                    <div className="row">
                            <div className="col-lg-4">
                                <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                                <img className="img-fluid rounded-circle mb-3 artist-img" src={results.thumb_url} alt=""></img>
                                <h5>{results.name}</h5>
                                </div>
                            </div>

                            <div className="col-lg-4 order-lg-1 my-auto showcase-text">
                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item artist-list">
                                          <Link to={{pathname: `events/${results.name}` , query:"" }}>
                                          <i className="fa fa-calendar" ></i>&nbsp;Upcoming Events
                                            </Link>
                                        </li>
                                    <li className="list-group-item artist-list"><i className="fa fa-music" ></i> &nbsp;{results.tracker_count}</li>
			                        <li className="list-group-item artist-list"><a href={results.facebook_page_url}><i className="fab fa-facebook fa-fw; font-size: 25px" ></i> &nbsp;Facebook Profile</a></li>
                                </ul>
                            </div>

                    </div>
                </div>
                    
            </section>
        }
        
    }



    render(){
        const {query, message} = this.state;
        return (
            
            <div>
                    <nav className="navbar navbar-light bg-light static-top">
                        <div className="container">
                            <a className="navbar-brand" href="#">BandsInTown</a>
                        </div>
                    </nav>

            <header className="masthead text-white text-center">
                {/* <div className="overlay"></div> */}
                <div className="container header-container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                    <h6 className="">Stay connected with your favorite artists through live, intimate sets streamed directly from their homes to yours. Discover the best upcoming live streams from around the world - continuously updated so you'll never miss a thing.</h6>
                    </div>
                    <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <form>
                        <div className="form-row">
                        <div className="col-12 col-md-12 mb-2 mb-md-0">
                            <input 
                            type="text"
                            value={query} 
                            id="search-input" 
                            name="query" 
                            className="form-control form-control-lg" 
                            placeholder="Search artists..."
                            aria-label="Search"
                            onChange={this.handleOnInputChange}
                            ></input>
                        </div>  
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </header>
                    {/* Error message */}
                        <br></br>

                        {message && 
                                <div className="col-lg-4 offset-lg-4">
                                    <div className="alert alert-info" role="alert">{ message }</div>
                                </div>
                            }
                               
                                       {this.renderSearchResults()}
                   
            </div>
        )
    }
}

export default Search