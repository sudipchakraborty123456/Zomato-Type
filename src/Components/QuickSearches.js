import {Component} from "react";
import  QuickSearch from "./QuickSreach";
class HomePageButtomSection extends Component{
    render(){
        const {mealtype} = this.props;
        //console.log(mealtype);
        return (
            <>
            <div className="container">
                    <div className="quickSearchOptions row">
                        <h1 className="quickSearchHeader">Quick Searches</h1>
                        <h4 className="quickSearchSubHeader">Discover restaurants by type of meal</h4>
                    </div>
                    <div className="row">
                        {
                           mealtype.map((item,index) => {
                                 return (<QuickSearch key={index} imgSrc={require(`../${item.image}`).default} heading ={item.name} content={item.content} mealtypeId={item.meal_type}/>)
                            })
                        }
                        {/* <QuickSearch imgSrc={require('../image/breakfast.png').default} heading ="Breakfast"/>
                        <QuickSearch imgSrc={require("../image/lunch.png").default} heading ="Lunch" />
                        <QuickSearch imgSrc={require("../image/snacks.png").default} heading ="Snacks" />
                        <QuickSearch imgSrc={require("../image/dinner.png").default} heading ="Dinner" />
                        <QuickSearch imgSrc={require("../image/drinks.png").default} heading ="Drinks" />
                        <QuickSearch imgSrc={require("../image/nightlife.png").default} heading ="Nightlife" /> */}
                    </div>
                </div>
            </>
        );
    }
}

export default HomePageButtomSection;