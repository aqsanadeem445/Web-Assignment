import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../Events.css'
class Events extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            events : [],
            message: '',
            currentPage: 1,
            eventsPerPage: 4,
            pageNumbers: []
        }
        
    }

    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }


    componentDidMount() {
        const artistname = this.props.match.params.artistname;
        this.fetchEvents(artistname)

    }

    fetchEvents = (name) => {
        const searchUrl = `https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`
        axios.get(searchUrl)
        .then(res => {
                //const resultNotFoundMsg = res.data.length ? "No upcoming events" : ""
                var resultNotFoundMsg = "No upcoming events";
                const pageNumbers = [];

                if (res.data.length) {
                    for (let i = 1; i <= Math.ceil(res.data.length / this.state.eventsPerPage); i++) {
                        pageNumbers.push(i);
                    }
                    resultNotFoundMsg = ""   
                }
            
                this.setState({
                    events: res.data,
                    message: resultNotFoundMsg,
                    pageNumbers: pageNumbers
                })
        })
        .catch(error => {
            if(error){
                this.setState({
                    message: 'Failed to fetch the data'
                })
            
            }
        })
    }


    renderEvents = () => {
        //const events  = this.state.events;
        const { events, currentPage, eventsPerPage } = this.state;
        if((Object.keys(events).length && events.length)){
            const indexOfLastTodo = currentPage * eventsPerPage;
            const indexOfFirstTodo = indexOfLastTodo - eventsPerPage;
            const currentEvents = events.slice(indexOfFirstTodo, indexOfLastTodo);

            return (<div className="row">
                {currentEvents.map(event =>{
                    return <div key={event.id}  className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="box-part text-center" >
                        <div className="title">
                            <h5>{event.title ? event.title : "New Show" }</h5> 
                        </div>
                       
                        <hr></hr>

                        <ul className="list-group list-group-flush">

                            <li className="list-group-item events-list">
                                    <p><b>Venue: </b>{event.venue.name}, {event.venue.country}</p>
                                    <p><b>Date:</b> {event.datetime.split("T")[0]}</p>
                                    <p><b>Time:</b> {event.datetime.split("T")[1]}</p>
                                    <p><b>About this show: </b>{event.description ? (event.description.length > 80 ? event.description.substr(0, 80-1) + "..." : event.description) : "Event description not available" }</p>
                                    <a target="_blank" href={event.url}>Read more</a>
                            </li>
                        </ul>
                        
                        </div>
                       </div>
                    
                })}


            </div>)
        }
 
    }

    renderPageNo = () => {
        const { pageNumbers } = this.state;
        return(<ul className="pagination" id="page-numbers">
                {pageNumbers.map(number => {
                  return(
                      //<li  className="page-item" key={number} id={number} onClick={this.handleClick}>{number}</li>
                      <li className="page-item"><a key={number} id={number} onClick={this.handleClick} className="page-link" href="#">{number}</a></li>
                  )  
                })}            
            </ul>)
    }

    render(){
        const {message} = this.state
        if (message === "No upcoming events"){
            return(<div>
                <nav className="navbar navbar-light bg-light static-top">
                        <div className="container">
                            <a className="navbar-brand" href="#">BandsInTown</a>
                        </div>
                    </nav>
                    <br></br>

                    <div className="container">
                <div className="row">
                    <div className="col-lg-1">
                        <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="/">Back</a></li>
                        </ul>
                    
                    </div>

                    <div className="col-lg-4 ">
                                    <div className="alert alert-info" role="alert">{ message }</div>
                                </div>


                </div>
                </div>

            </div>)
        }

        return (
            <div className="main-div">
                <nav className="navbar navbar-light bg-light static-top">
                        <div className="container">
                            <a className="navbar-brand" href="#">BandsInTown</a>
                        </div>
                    </nav>
                    <br></br>
                <div className="container">
                <div className="row">
                    <div className="col-lg-1">
                        <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="/">Back</a></li>
                        </ul>
                    
                    </div>
                    <br></br>


                    <div className="col-lg-3 offset-lg-7">
                        <nav aria-label="Pagination">
                             {this.renderPageNo()}
                        </nav>
                    </div>
                </div>
                    {this.renderEvents()}
                 
                </div>
                 
            </div>
        )
    }
}

export default Events
