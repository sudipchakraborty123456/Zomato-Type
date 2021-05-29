import { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';

import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import "../Styles/details.css";
import queryString from "query-string";


const constants = require("../Constants");
const API_URL = constants.API_URL;



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid tomato',
        width: '450px'
    }
};

class Details extends Component {
    constructor() {
        super();
       
        this.state = {
            restaurantId: '',
            restaurantName: '',
            cuisine: [],
            minPrice: 0,
            contact: 0,
            isMenuModalOpen: false,
            menu: [],
            totalPrice: 0,
            orderdItems: [],
            isOrderDetailsModalOpen: false,
            name: '',
            mobileNo: '',
            address: '',
            order: [],
            userDetails: undefined,
            email: '',
            orderDetails: undefined,
            restaurantLocality:'',
            restaurantCity:''
        };
        this.savedetails = this.savedetails.bind(this);
        this.paymentHandeller = this.paymentHandeller.bind(this);
        // var a = localStorage.getItem('user');
    }
    componentDidMount() {
        //debugger;
        var a = localStorage.getItem('user');
        console.log(JSON.parse(a))
        this.setState({ userDetails: JSON.parse(a) })
        //console.log(a.email)
        //debugger;

        const qs = queryString.parse(this.props.location.search);
        const { id } = qs;

        this.setState({
            restaurantId: id
        })
        //console.log(this.state.restaurantId)
        axios.get(`${API_URL}/getAllRestaurantById/${id}`).then((result) => {
            this.setState({
                restaurantName: result.data.restaurant[0].name,
                cuisine: result.data.restaurant[0].cuisine,
                minPrice: result.data.restaurant[0].min_price,
                contact: result.data.restaurant[0].contact_number,
                restaurantCity:result.data.restaurant[0].city,
                restaurantLocality:result.data.restaurant[0].locality

            })
            // console.log(result.data.restaurant[0].cuisine)
        }).catch((error) => { console.log(error) });
        // debugger;
        axios.get(`${API_URL}/getMenuByRestaurantId/${id}`).then((result) => {
            this.setState({
                menu: result.data.menu
            })
            console.log(result.data.menu)
        }).catch((error) => { console.log(error) });

    }
    getRestaurantById() {
    }
    handelPlaceOrderClicked() {
        //debugger;
        this.setState({
            isMenuModalOpen: true
        })
    }
    placeOrderDetails() {
        this.setState({
            isOrderDetailsModalOpen: true
        })
    }
    closeMenu() {
        this.setState({
            isMenuModalOpen: false
        })
    }
    closeOrderDetailsMenu() {
        this.setState({
            isOrderDetailsModalOpen: false
        })
    }
    addItem(item) {
        //debugger;
        const { totalPrice, orderdItems } = this.state;
        orderdItems.push(item.itemName);
        this.setState({
            totalPrice: totalPrice + item.itemPrice,
            orderdItems: orderdItems
        })
    }
    isObj = (val) => {
        return typeof val === 'object';

    }
    isDate = (val) => {
        return Object.prototype.toString.call(val) === '[object Date]';
    }

    stringifyValue(value) {
        if (this.isObj(value) && !this.isDate(value)) {
            return JSON.stringify(value);
        } else {
            return value;
        }

    }
    buildForm(details) {
        const { action, params } = details;
        const form = document.createElement('form');
        form.setAttribute("method", "post");
        form.setAttribute("action", action);

        Object.keys(params).forEach(key => {
            const input = document.createElement('input');
            input.setAttribute('type', 'hidden');
            input.setAttribute('name', key);
            input.setAttribute('value', this.stringifyValue(params[key]));
            form.appendChild(input);
        });
        return form;
    }


    postTheInformation(details) {
        const form = this.buildForm(details);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    }
    getCheckSum(data) {
        //debugger;
        return fetch(`${API_URL}/payment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data)
        }).then(result => {
            return result.json();
        }).catch(err => console.log(err))
    }

    paymentHandeller() {
        debugger;
        // const email =this.state.userDetails.email;
        
        if (this.state.totalPrice == 0) {
            return;
        }
        let a = this.savedetails();
        console.log(a)
        //let orderId = this.savedetails();
        // this.setState({order:{
        //     userId: (localStorage.getItem(user)),
        //     restaurantId:id
        // }})
        const data = {
            amount: this.state.totalPrice,
            email: this.state.userDetails.email,
            mobileNo: this.state.mobileNo,
            orderDetails: a
        }
        this.getCheckSum(data).then(result => {
            let information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: result
            }
            this.postTheInformation(information);
        }).catch(err => console.log(err));
    }
    setValueForName(e, field) {
        //debugger;

        this.setState({
            [field]: e.target.value

        });
        //console.log(this.state.field['name']);
        // console.log(this.state.name);
        // console.log(this.state.mobileNo);
        // console.log(this.state.address);
    }

    savedetails() {
        debugger;
        
        var orderDetails= {
                userId: this.state.userDetails.email,
                restaurantId: this.state.restaurantId,
                orderStatus: 'notPlaced',
                orderDetails: this.state.orderdItems,
                totalPrice: this.state.totalPrice,
                userAddress: this.state.address,
                userName:`${this.state.userDetails.firstName} ${this.state.userDetails.lastName}`,
                orderId: ""
            }
        return (orderDetails);
        // axios({
        //     method: "POST",
        //     url: `${API_URL}/placeOrder`,
        //     //headers : {"Content-Type" : "applicaton/json"},
        //     data: orderDetails
        // }).then((data)=>{
        //     //this.setState({orderDetails:orderDetails})
        //     console.log(data);
        //     return orderDetails;
        // }).catch((error)=>{console.log(error);});

        
    }
    render() {
        //debugger;
        const { restaurantCity,restaurantLocality,orderDetails, userDetails, email, name, mobileNo, address, restaurantName, cuisine, minPrice, contact, isMenuModalOpen, menu, totalPrice, isOrderDetailsModalOpen } = this.state;

         //console.log(orderDetails)
        return (
            <div>
                <div className="container m-5  pt-3" style={{ "fontFamily": "Poppins", "color": "#192f60" }}>


                    <div className="images my-5 mx-5" >
                        <Carousel dynamicHeight={false} showThumbs={false} stopOnHover={true} autoPlay={true} interval={3000} infiniteLoop={true}>
                            <div>
                                <img src={require("../image/breakfast.png").default} alt="Opps Sorry!" />
                            </div>
                            <div>
                                <img src={require("../image/img3.jpg").default} alt="Opps Sorry!" />
                            </div>
                            <div>
                                <img src={require("../image/beverages.jpg").default} alt="Opps Sorry!" />
                            </div>
                            <div>
                                <img src={require("../image/img2.jpg").default} alt="Opps Sorry!" />
                            </div>
                            <div>
                                <img src={require("../image/shutterstock-351721442.png").default} alt="Opps Sorry!" />
                            </div>
                        </Carousel>
                    </div>

                    <div className="resName">
                        {restaurantName}
                        <button className="btn btn-danger float-end" onClick={() => this.handelPlaceOrderClicked()}>Place Online Order</button>
                    </div>


                    <div className="mt-5 myTabs">
                        <Tabs>
                            <TabList>
                                <Tab>Overview</Tab>
                                <Tab>Contact</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="about">About This Page</div>
                                <div className="cuisine">Cuisine</div >
                                <div className="cuisines">
                                {
                                    cuisine.map((item, index) => {
                                        return `${item.name},`
                                    })
                                }
                                </div>
                                <div className="cuisine mt-3">Average Cost</div>
                                <span>₹ {minPrice} for two people (approx.)</span>
                            </TabPanel>
                            <TabPanel>
                            <div className="container">
                                        <div className="cuisines my-3">
                                            Phone Number
                                            <div className="text-danger">
                                                { contact}
                                            </div>
                                        </div>
                                        <div className="cuisine mt-5">{ restaurantName }</div>
                                        <div className="text-muted">{ restaurantLocality }, { restaurantCity }</div> 
                                    </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                    <Modal isOpen={isMenuModalOpen} style={customStyles}>
                        <h3>{restaurantName}</h3>
                        <button onClick={() => this.closeMenu()} className="btn btn-light closeBtn">&times;</button>
                        <ul className="menu">

                            {
                                menu.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="row no-gutters  menuItem">
                                                <div className="col-10">
                                                    {
                                                        item.isVeg ?
                                                            <div className="text-success">Veg</div>
                                                            :
                                                            <div className="text-danger">Non-Veg</div>
                                                    }
                                                    <div className="itemName">{item.itemName}</div>
                                                    <div className="itemName">{item.itemPrice}</div>
                                                    <div className="itemName text-muted">{item.itemDescription}</div>
                                                </div>
                                                <div className="col-2">

                                                    <button className="btn btn-light addButton" onClick={() => this.addItem(item)}>Add</button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <div className="price" >
                            Subtotal &#8377; {totalPrice}
                        </div>
                        <button className="btn btn-danger float-end" onClick={() => this.placeOrderDetails()}>Place Order</button>
                    </Modal>

                    <Modal isOpen={isOrderDetailsModalOpen} style={customStyles}>
                        <div className="container">
                            <div >
                                <h3 className="heading2">{restaurantName}</h3>
                                <button className=" btn btn-light" onClick={() => this.closeOrderDetailsMenu()} className="btn btn-light closeBtn">&times;</button>
                            </div>
                            <div >
                                <div className="subHading">Name</div>
                                <input className="inputField" type="text" placeholder="Enter your name" onChange={(e) => this.setValueForName(e, 'name')} />
                                <div className="subHading">Mobile Number</div>
                                <input type="number" className="inputField" placeholder="Enter mobile number" onChange={(e) => this.setValueForName(e, 'mobileNo')} />
                                <div className="subHading">Address</div>
                                <input type="text" className="inputField" placeholder="Enter your address" onChange={(e) => this.setValueForName(e, 'address')} />
                            </div>
                            <button className="btn btn-danger float-end" type="submit" value="submit" onClick={this.paymentHandeller}>Pay Now</button>

                        </div>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default Details;