import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import '../Styles/header.css';
import FacebookLogin from "react-facebook-login";
import Googlelogin from "react-google-login";


const constants = require("../Constants");
const API_URL = constants.API_URL;



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        border: '2px solid tomato',
        width: '350px'
    }
};
const customStyles1 = {
    content: {
        top: '20%',
        left: '80%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0',
        transform: 'translate(-50%, -50%)',
        border: '2px solid tomato',
        width: '350px'
    }
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            background: 'coloured',
            isLoginModalOpen: false,
            isSingUpModalOpen: false,
            username: '',
            password: '',
            firstName: '',
            lastName: "",
            user: undefined,
            isLoggedIn: false,
            loginError: undefined,
            singUpError: undefined,
            isUserDashBordOpen: false,
            orderDetails: []
        };
        this.userDastbord = this.userDastbord.bind(this);
        this.showOrderDetails = this.showOrderDetails.bind(this);
    }

    componentDidMount() {
        const initialPath = this.props.history.location.pathname;
        this.setHeaderStyle(initialPath)

        this.props.history.listen((location, action) => {
            this.setHeaderStyle(location.pathname)

        });

        const isLoggedIn = localStorage.getItem("isLoggedIn");
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
        }
        this.setState({
            user: user,
            isLoggedIn: isLoggedIn
        });
    }
    setHeaderStyle = (path) => {
        let bg = '';
        if (path === '/' || path === '/home') {
            bg = 'transparent';
        } else {
            bg = 'coloured';
        }
        this.setState({
            background: bg
        });
    }

    handleChange = (event, field) => {
        this.setState({
            [field]: event.target.value,
            loginError: undefined
        });
    }

    handleLoginButtonClick = () => {
        this.setState({
            isLoginModalOpen: true
        });
    }
    handelSingUpButtonClicked = () => {
        this.setState({
            isSingUpModalOpen: true
        });
    }
    handleLogin = () => {
        // call the API to login the user
        const { username, password } = this.state;
        const obj = {
            email: username,
            password: password
        }
        axios({
            method: 'POST',
            url: `${API_URL}/login`,
            header: { 'Content-Type': 'application/json' },
            data: obj
        }).then(result => {
            localStorage.setItem("user", JSON.stringify(result.data.user[0]));
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                user: result.data.user[0],
                isLoggedIn: true,
                loginError: undefined
            });
            this.resetLoginForm();
        }).catch(error => {
            this.setState({
                loginError: 'Username or password is wrong !!'
            });
            console.log(error);
        });
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        this.setState({
            user: undefined,
            isLoggedIn: false
        });
    }

    resetLoginForm = () => {
        this.setState({
            isLoginModalOpen: false,
            username: '',
            password: '',
            loginError: undefined
        });
    }

    handleSingUp = () => {
        const { username, password, firstName, lastName } = this.state;
        const obj = {
            email: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        axios({
            method: 'POST',
            url: `${API_URL}/userSignUp`,
            header: { 'Content-Type': 'application/json' },
            data: obj
        }).then(result => {
            //debugger;
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                user: result.data.user,
                isLoggedIn: true,
                loginError: undefined,
                singUpError: undefined
            });
            this.resetSingUpForm();
        }).catch(error => {
            this.setState({
                singUpError: 'Error in SingUp !!'
            });
            console.log(error);
        });
    }

    resetSingUpForm = () => {
        this.setState({
            isSingUpModalOpen: false,
            username: '',
            password: '',
            firstName: "",
            lastName: "",
            singUpError: undefined
        });
    }
    logoClick() {
        this.props.history.push("/");
    }
    facebookLoginHandeller() {

    }
    responseFailureGoogle() {

    }
    responseSuccessGoogle() {

    }
    userDastbord() {
        // console.log(Header.state.isUserDashBordOpen)
        //debugger;
        this.setState({
            isUserDashBordOpen: true
        })
        const email = this.state.user.email;
        axios.get(`${API_URL}/getOrder/${email}`).then((result) => {
            this.setState({
                orderDetails: result.data.data
            })
            console.log(this.state.orderDetails)
        }).catch((error) => { console.log(error) });
    }

    showOrderDetails = () => {
        //debugger;
        const { orderDetails } = this.state;
        if (orderDetails.length == 0) {
            return null;
        }
        return (
            <ul className="orderDetailssBox">
                {
                    orderDetails.map((item, index) => {
                        return (
                            <li style={{
                                'style': 'none', 'box-shadow': '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                                'background-color': '#ffffff', 'margin-bottom': '10px'
                            }}>
                                <div className="od">
                                    Order Id : {item.orderId}
                                    <div>
                                        <div className=''>Order Status : {item.orderStatus}</div>
                                    order Items : {item.orderDetails}

                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
    closeOrderDetails() {
        this.setState({
            isUserDashBordOpen: false
        })
    }
    render() {
        const { isUserDashBordOpen, background, isLoginModalOpen, username, password, isLoggedIn, user, loginError, isSingUpModalOpen, firstName, lastName, singUpError } = this.state;
        return (
            <div className="container">
                <div className="header " style={{ 'background': background === 'transparent' ? 'transparent' : '#eb2929' }}>
                    {
                        background === "coloured"
                            ?
                            <div className="header-logo" onClick={() => this.logoClick()}>
                                e!
                    </div>
                            :
                            <div></div>
                    }
                    <div className="float-end ">
                        {
                            isLoggedIn
                                ?
                                <div>
                                    <span className="text-white m-4" onClick={this.userDastbord} >{user.firstName}</span >
                                    <button className="btn btn-outline-light" onClick={this.logout}>Logout</button>
                                    <Modal isOpen={isUserDashBordOpen} style={customStyles1}>
                                        <h3 style={{
                                            'width': '239px',
                                            'height': '33px',
                                            'font-family': 'Poppins',
                                            'font-size': '24px',
                                            'font-weight': 600,
                                            'font-stretch': 'normal',
                                            'font-style': 'normal',
                                            'line-height': '1.46',
                                            'letter-spacing': 'normal',
                                            'text-align': 'left',
                                            'color': '#192f60'
                                        }}>Order Details</h3>
                                        <button className=" btn btn-light" onClick={() => this.closeOrderDetails()} className="btn btn-light closeBtn">&times;</button>
                                        <ul className="">


                                            {this.showOrderDetails()}

                                        </ul>
                                    </Modal>
                                </div>
                                :
                                <div className="mr-7%" style={{
                                    "margin-right": "4%",
                                    /* width: 146%; */
                                    "width": "387px"
                                }}>
                                    <button className="btn text-white" onClick={this.handleLoginButtonClick}>Login</button>
                                    <button className="btn btn-outline-light" onClick={this.handelSingUpButtonClicked}>Create an account</button>
                                </div>
                        }
                    </div>
                    <Modal isOpen={isLoginModalOpen} style={customStyles}>
                        <h3>User Login</h3>
                        <form>
                            {
                                loginError ? <div className="alert alert-danger">{loginError}</div> : null
                            }
                            <label className="form-label">Username:</label>
                            <input type="text" value={username} className="form-control" onChange={(event) => this.handleChange(event, 'username')} />
                            <br />
                            <label className="form-label">Password:</label>
                            <input type="password" value={password} className="form-control" onChange={(event) => this.handleChange(event, 'password')} />
                            <br />
                            <br />
                            <FacebookLogin
                                appId="156050859817463"
                                textButton="Continue with Facebook"
                                field="name,email,picture"
                                size="metro"
                                callback={() => this.facebookLoginHandeller()}
                                icon="bi bi-facebook p-2 m-2"
                                cssClass="fb"
                            />
                            <br />
                            <Googlelogin
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={this.responseSuccessGoogle}
                                onFailure={this.responseFailureGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="google"
                            />
                            <br />
                            <br />
                            <input type="button" className="btn btn-primary" onClick={this.handleLogin} value="Login" />
                            <input type="button" className="btn" onClick={this.resetLoginForm} value="Cancel" />
                        </form>
                    </Modal>

                    <Modal isOpen={isSingUpModalOpen} style={customStyles}>
                        <h3>User Singup</h3>
                        <form>
                            {
                                singUpError ? <div className="alert alert-danger">{singUpError}</div> : null
                            }
                            <label className="form-label">First Name:</label>
                            <input type="text" value={firstName} className="form-control" onChange={(event) => this.handleChange(event, 'firstName')} />
                            <br />
                            <br />
                            <label className="form-label">Last Name:</label>
                            <input type="text" value={lastName} className="form-control" onChange={(event) => this.handleChange(event, 'lastName')} />

                            <br />
                            <br />
                            <label className="form-label">email:</label>
                            <input type="text" value={username} placeholder="Username" className="form-control" onChange={(event) => this.handleChange(event, 'username')} />
                            <br />
                            <label className="form-label">Password:</label>
                            <input type="password" value={password} className="form-control" onChange={(event) => this.handleChange(event, 'password')} />
                            <br />
                            <br />
                            <FacebookLogin
                                appId="156050859817463"
                                textButton="Continue with Facebook"
                                field="name,email,picture"
                                size="metro"
                                callback={() => this.facebookLoginHandeller()}
                                icon="bi bi-facebook p-2 m-2"
                                cssClass="fb"
                            />
                            <br />
                            <Googlelogin
                                clientId="644673893592-mai5ih1i938hl778l2m9hb30emkvb0ed.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={this.responseSuccessGoogle}
                                onFailure={this.responseFailureGoogle}
                                cookiePolicy={'single_host_origin'}
                                className="google"
                            />
                            <br />
                            <br />
                            <input type="button" className="btn btn-primary" onClick={this.handleSingUp} value="Sing Up" />
                            <input type="button" className="btn" onClick={this.resetSingUpForm} value="Cancel" />
                        </form>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);