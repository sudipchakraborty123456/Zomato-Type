import React from "react";
import FilterSection from "./FilterSection";
import ResultSection from "./ResultSection";
import axios from "axios";
import {withRouter} from "react-router-dom";


import queryString from "query-string";


const constants = require("../Constants");
const API_URL = constants.API_URL;




class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            locationsInCity: [],
            selectedCity: "",
            mealtypeId: 0,
            mealtypeName: '',
            restaurantList : [],
            cuisines : [],
            hCost:undefined,
            lCost:undefined,
            sortOrder: 1,
            pageNo:1,
            totalResult: 0,
            pageSize:2,
            noOFPages:0
        };
    }
    componentDidMount() {
        console.log("ComponentDidMount phase run...........")
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, mealtypeName } = qs;
        this.setState({
            mealtypeId: mealtype,
            mealtypeName: mealtypeName
        });


        const city_id = localStorage.getItem("city_id");
        //console.log(city_id);
        axios.get(`${API_URL}/getLocation`)
            .then(result => {
             //   debugger;
                const locations = result.data.location;
                const selectedCity = locations.find(city => city.city_id == city_id);
                const cityLocations = locations.filter(city => city.city_id == city_id);

                // console.log(result);
                this.setState({

                    locations: result.data.locations,
                    selectedCity: selectedCity.city,
                    locationsInCity: cityLocations,
                    selectedLocation: cityLocations[0].location_id
                });


            })
            .catch(error => {
                console.log(error);
            });


        // debugger
        setTimeout(() =>

            this.filterReastaurant(), 0);


    }
    filterReastaurant() {
        const { mealtypeId , selectedLocation,cuisines,hCost,lCost,sortOrder,pageNo} = this.state;
        //console.log(selectedLocation)
        const req = {
            mealtype: mealtypeId,
            page:pageNo
           
        };

        if(selectedLocation){
            req.location= selectedLocation;
        }

        if(cuisines.length>0){
            req.cuisine = cuisines
        }
        //debugger;
        //console.log(req.hcost+","+req.lCost)
        if(hCost!=undefined && lCost != undefined){
            
            req.hcost = hCost
            req.lcost = lCost
            
        }
        if(sortOrder!=undefined){
            req.sort = sortOrder;
        }
        axios({
            method: "POST",
            url: `${API_URL}/filterRestaurant`,
            //  headers : {"Content-Type" : "applicaton/json"},
            data: req
        }).then(result => {
            //console.log(result)
            //debugger;
            const totalResults = result.data.totalResults;
            const pageSize = result.data.pageSize;
            
            let quotient = totalResults / pageSize;
            quotient = Math.floor(quotient);
            let noOFPages = quotient;

            const remainder = totalResults % pageSize;
            if (remainder > 0) {
                noOFPages = quotient + 1;
            }
           // console.log(noOFPages)
            this.setState({
                restaurantList: result.data.restaurant,
                pageNo:result.data.pageNo,
                totalResult: result.data.totalResults,
                noOFPages: noOFPages
            });
            console.log("restaurantList stored successfully")
        }).catch(error => { console.log(error); });
    }


    handelCuisineChanged(event,cuisine) {
       // debugger;
        let {cuisines} =this.state;
        const index = cuisines.indexOf(cuisine)
        if(index < 0 && event.target.checked){
            cuisines.push(cuisine);
        }else if(!event.target.checked){
            cuisines.splice(index,1)
        }
        this.setState({
            cuisenes: cuisines
        });
        setTimeout(() => this.filterReastaurant(), 0)
    }

    handelLocationChange(event){
        //console.log( event.target.value)
        const location_id = event.target.value
        this.setState({
            selectedLocation : location_id
        })
        setTimeout(() => this.filterReastaurant(), 0)
        
    }

    handelCostChanged(e,lowCost,highCost){
        
        this.setState({
            hCost : highCost,
            lCost:lowCost
        })
        setTimeout(() => this.filterReastaurant(), 0)
    }
    handelSortChange(e,sortOrder){
        this.setState({
            sortOrder : sortOrder
        });
        setTimeout(() => this.filterReastaurant(), 0)
    }
    getPages = () => {
        //debugger;
        const { noOFPages } = this.state;
        let pages = [];
        for (let i = 0; i < noOFPages; i++ ) {
            pages.push(<span key={i} onClick={() => this.handlePage(i+1)} className="paginationButton">{ i+ 1 }</span>)
        }
        return pages;
    }
    handlePage(pageNo) {
        if (pageNo < 1) return;
        this.setState({
            pageNo: pageNo
        });
        setTimeout(() => {
            this.filterReastaurant();
        }, 0);
    }

    goToDeatais(item){
        const url= `/details?id=${item._id}`;
        this.props.history.push(url);
    }
    render() {
        console.log("Render phase run...............")
        const { locations, selectedCity, mealtypeName,totalResult, locationsInCity, restaurantList,pageNo } = this.state;
       let currPage= pageNo;
        return (
            <>


                <div className="container pt-5">
                   
                    <div className="row heading">{mealtypeName} Places in {selectedCity}</div>
                    <div className="row" style={{ margin: "auto" }}>
                        <div className="col-3 sm-12 filterSection" style={{ height: '100%' }}>
                            <div className="sectionHeading">Filters</div>
                            <div className="sectionSubHeading">Select Location</div>
                            <select className="locationSelection" onChange={(event) =>this.handelLocationChange(event)}>
                                 {/* <option selected disabled>Select Location</option>  */}
                                {
                                    locationsInCity.map((item, index) => {
                                        return <option key={index} value={item.location_id} >{item.name}</option>
                                    })
                                }
                            </select>
                            <div className="sectionSubHeading">Cuisine</div>
                            <div htmlFor="cus" className="cuisineSelection"><input id="cus" type="checkbox" onChange={(event) =>this.handelCuisineChanged(event,"North Indian")}/> North Indian</div>
                            <div htmlFor="cus1" className="cuisineSelection"><input id="cus1" type="checkbox" onChange={(event) =>this.handelCuisineChanged(event,"South Indian")}/> South Indian</div>
                            <div htmlFor="cus2" className="cuisineSelection"><input type="checkbox" id="cus2" onChange={(event) =>this.handelCuisineChanged(event,"Chinese")}/> Chinese</div>
                            <div className="cuisineSelection"><input type="checkbox" onChange={(event) =>this.handelCuisineChanged(event,"Fast Food")}/> Fast Food</div>
                            <div className="cuisineSelection"><input type="checkbox" onChange={(event) =>this.handelCuisineChanged(event,"Street Food")}/> Street Food</div>
                            <div className="sectionSubHeading">Cost for two</div>
                            <div className="cuisineSelection"><input type="radio" name="cost" onChange={(e) => {  this.handelCostChanged(e,0,500)}}/> Less than ₹ 500 </div>
                           
                            <div className="cuisineSelection"><input type="radio" name="cost" onChange={(e) => {this.handelCostChanged(e,500,1000)}}/> ₹ 500 to ₹ 1000 </div>
                            <div className="cuisineSelection"><input type="radio" name="cost" onChange={(e) => {this.handelCostChanged(e,1000,1500)}}/> ₹ 1000 to ₹ 1500 </div>
                            <div className="cuisineSelection"><input type="radio" name="cost" onChange={(e) => {this.handelCostChanged(e,1500,2000)}}/> ₹ 1500 to ₹ 2000 </div>
                            <div className="cuisineSelection"><input type="radio" name="cost" onChange={(e) => {this.handelCostChanged(e,2000,100000)}}/> ₹ 2000+ </div>
                            <div className="sectionSubHeading">Sort</div>
                            <div className="cuisineSelection"><input type="radio" name="sort" onChange={(e) => {this.handelSortChange(e,1)}}/> Price low to high </div>
                            <div className="cuisineSelection"><input type="radio" name="sort" onChange={(e) => {this.handelSortChange(e,-1)}}/> Price high to low </div>
                        </div>
                        <div className="col-7 sm-12" style={{ margin: "auto" }}>
                            <div className="row resultSection">
                                
                                {
                                    restaurantList.length > 0 ?
                                    restaurantList.map((item, index) => {
                                        //debugger;
                                        console.log(item);
                                        return (<div key={index}  className="resultBox" id="resultBox1" onClick={()=>{this.goToDeatais(item)}}>
                                                    <div className="row topSection">
                                                        <img className="col-2 image" src={require("../image/breakfast.png").default} alt="Oops!" />
                                                        <div className="resltboxtext col-9">
                                                            <div className="resultHeader">{item.name}</div>
                                                            <div className="resultSubHeader">{item.locality}</div>
                                                            <div className="resultDescription">{item.city}</div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row buttomSection">
                                                        <div className="col-3">
                                                            <div className="resultdetils">
                                                                CUISINES:
                                                            </div>
                                                            <div className="resultdetils">
                                                                COST FOR TWO:
                                                            </div>
                                                        </div>
                                                        <div className="col-9 resultoptionbuttom">
                                                            <div className="resultdetilsOptions">
                                                                {
                                                                    item.cuisine.map((item, index) => {
                                                                        return `${item.name},`
                                                                    })
                                                                }
                                                            </div>
                                                            <div className="resultdetilsOptions">
                                                                ₹ {item.min_price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                );
                                        //  </div>
                                     })
                                    :
                                     <div className="text-danger text-center my-5">No Restaurants for the selected filters</div>
                                   
                                }
                                {
                                    restaurantList.length > 0
                                     ?
                                    <div className=" paginationOptions">

                                    <span className="paginationButton" onClick={() => this.handlePage(--currPage)}>&lt;</span>
                                    {
                                        
                                    this.getPages()
                                  
                                    }
                                    <span className="paginationButton" onClick={() => this.handlePage(++currPage)}>&gt;</span>
                                </div>
                                    :
                                    <div></div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </>
           );
    }
}

export default withRouter(Filter);