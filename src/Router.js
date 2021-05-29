import Home from "./Components/Home";
import Filter from "./Components/Filter";
import Details from "./Components/Details";
import Header from "./Components/Header";
import {Route,BrowserRouter} from "react-router-dom";
import { Component } from "react";


class Router extends Component{
 
    render(){
        
        return <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home}  />
            <Route path="/home" component={Home} />
            <Route path="/details" component={Details}/>
            <Route path="/filter" component={Filter}/>
        </BrowserRouter>
    }
}
export default Router;