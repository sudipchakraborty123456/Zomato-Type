import {Component} from "react";

class FilterSection extends Component{
    render(){
        return(
            <>
            < div className="heading">Breakfast Places in Mumbai</div>
            <div className="filterSection">
              <div className="sectionHeading">Filters</div>
              <div className="sectionSubHeading">Select Location</div>
              <select className="locationSelection">
                <option selected disabled>Select Location</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
              </select>
              <div className="sectionSubHeading">Cuisine</div>
              <label htmlFor="cus" className="cuisineSelection"><input id="cus" type="checkbox" /> North Indian</label>
              <div htmlFor="cus1" className="cuisineSelection"><input id="cus1" type="checkbox" /> South Indian</div>
              <div htmlFor="cus2" className="cuisineSelection"><input type="checkbox" id="cus2" /> Chinese</div>
              <div className="cuisineSelection"><input type="checkbox" /> Fast Food</div>
              <div className="cuisineSelection"><input type="checkbox" /> Street Food</div>
              <div className="sectionSubHeading">Cost for two</div>
              <div className="cuisineSelection"><input type="radio" name="cost" /> Less than ₹ 500 </div>
              <div className="cuisineSelection"><input type="radio" name="cost" /> ₹ 500 to ₹ 1000 </div>
              <div className="cuisineSelection"><input type="radio" name="cost" /> ₹ 1000 to ₹ 1500 </div>
              <div className="cuisineSelection"><input type="radio" name="cost" /> ₹ 1500 to ₹ 2000 </div>
              <div className="cuisineSelection"><input type="radio" name="cost" /> ₹ 2000+ </div>
              <div className="sectionSubHeading">Sort</div>
              <div className="cuisineSelection"><input type="radio" name="sort" /> Price low to high </div>
              <div className="cuisineSelection"><input type="radio" name="sort" /> Price high to low </div>
            </div>
            </>
        )
    }
}

export default FilterSection;