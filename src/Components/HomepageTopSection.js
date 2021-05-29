import { Component } from "react";
import axios from "axios";
import homeimage from "../image/home.png"
import {withRouter} from "react-router-dom";
import "../Styles/HomePageTopSection.css"



const constants = require("../Constants");
const API_URL = constants.API_URL;


class HomePageTopSection extends Component {
    onOptionChanged(event) {
        //debugger;
        const city_id_city_name = event.target.value;
        const city_id = city_id_city_name.split(' ')[0];
        const cityName = city_id_city_name.split(' ')[1];
        localStorage.setItem("city_id", city_id);
        // debugger;
        // const a= localStorage.getItem("city_id")
        // console.log(a)
        axios.get(`${API_URL}/getAllRestaurantByCity/${cityName}`).then(result => {
            this.setState({
                restaurants: result.data.city
            })
           // console.log(this.state.restaurants)
        }).catch(err => {
            console.log(err)
        });
    }

    constructor() {
        super();
        this.state = {
            text: "",
            restaurants: [],
            suggestions: []
        }
    }

    textChanged = (e) => {
        //debugger;
        const searchText = e.target.value;
        const { restaurants } = this.state;
        let suggestions = [];
        if (searchText.length > 0) {
            suggestions = restaurants.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
            //console.log(suggestions)
        }

        this.setState({
            text: searchText,
            suggestions: suggestions
        });
    }
    goToRestaurant = (item) => {
        debugger;
        this.props.history.push(`/details?id=${item._id}`);
    }


    renderSuggestions = () => {
        //debugger;
        const { suggestions } = this.state;
        if (suggestions.length == 0) {
            return null;
        }
        return (
            <ul className="suggestionsBox">
                {
                    suggestions.map((item, index) => {
                        return (
                            <li key={index} onClick={() => this.goToRestaurant(item)}>
                                <div className="suggestionImage">
                                    <img src={require('../' + item.image).default} alt="myimg"/>
                                </div>
                                <div className="suggestionText w-100">
                                    <div>
                                        {item.name}, {item.locality}
                                    </div>
                                    <div className="text-muted">
                                        Rating: {item.aggregate_rating}
                                        <span className="text-danger float-end">
                                            Order Now &gt;
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
    render() {
        const { cities } = this.props;
        // console.log(this.props);
        return (
            <>
            <img src={homeimage} alt="sorry!" className="homeImage" />
                <div className="row">
                    
                    <div className="row text-center">
                        <div className="imageText col-12">
                            <div className="logo text-center">
                                e!
                            </div>
                            <div className="headerText">
                                Find the best restaurants, cafés, and bars
                            </div>
                        </div>
                    </div>
                </div>
                <div className="locationOption row">
                    <div className="col-12 col-md-5 location-wrapper text-center text-sm-end">
                        <select className="locationDropDown" onChange={(event) => { this.onOptionChanged(event) }}>
                            <option value="0" disabled selected>Select Location</option>
                            {cities.map((item, index) => {
                                return <option key={index} value={item.city_id + " " + item.city}>{item.name},{item.city} </option>
                            })}
                        </select>
                    </div>
                    <div className="col-12 col-md-7 r text-sm-start text-center">
                        <input className="restaurantSearch" type="text" placeholder="Search the Restaurants" onChange={(e) => { this.textChanged(e) }} />
                        {
                            this.renderSuggestions()
                        }
                    </div>
                </div>

            </>
        );
    }
}

export default withRouter(HomePageTopSection);