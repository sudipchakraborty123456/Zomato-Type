import React, { Component } from "react";
import "../Styles/homepage.css"
import HomePageTopSection from "./HomepageTopSection";
import HomePageButtomSection from "./QuickSearches";

import axios from "axios";

const constants = require("../Constants");
const API_URL = constants.API_URL;




class Home extends Component {
    constructor(){
        super();
        this.state={
            locations : [],
            mealtypes : []};
    }

    componentDidMount() {
        axios.get(`${API_URL}/getLocation`)
            .then(result => {                           
               // console.log(result);
                this.setState({
                    
                    locations: result.data.location
                });
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(`${API_URL}/getMealType`).then(result => {
           // console.log(result)
            this.setState({mealtypes : result.data.mealtype});
        }).catch(error=>{console.log(error);})
        }

        
    render() {
        
        const {locations,mealtypes} = this.state;
        //console.log(mealtypes);
        return (
            <React.Fragment>
                <div className="">
                <HomePageTopSection cities={locations}/>
                <HomePageButtomSection mealtype ={mealtypes}/>
                </div>
            </React.Fragment>);
    }
}

export default Home;