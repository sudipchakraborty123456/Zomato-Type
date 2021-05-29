import {Component} from "react";

class ResultSection extends Component{
    render(){
        return (<>
        <div className="resultSection col-8">
              <div className="resultBox row" id="resultBox1">
                <div className="topSection">
                  <img className="image" src={require("../image/breakfast.png").default} alt="Oops!" />
                  <div className="resltboxtext">
                    <div className="resultHeader">The Big Chill Cakery</div>
                    <div className="resultSubHeader">FORT</div>
                    <div className="resultDescription">Shop 1, Plot D, Samruddhi Complex, Chincholi …</div>
                  </div>
                </div>
                <hr />
                <div className="buttomSection">
                  <div>
                    <div className="resultdetils">
                      CUISINES:
                    </div>
                    <div className="resultdetils">
                      COST FOR TWO:
                    </div>
                  </div>
                  <div className="resultoptionbuttom">
                    <div className="resultdetilsOptions">
                      Bakery
                    </div>
                    <div className="resultdetilsOptions">
                      ₹   700
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="resultSection">
              <div id="resultBox2">
                <div className="topSection">
                  <img className="image" src={require("../image/breakfast.png").default} alt="Oops!" />
                  <div className="resltboxtext">
                    <div className="resultHeader">The Bake Shop</div>
                    <div className="resultSubHeader">FORT</div>
                    <div className="resultDescription">Shop 1, Plot D, Samruddhi Complex, Chincholi …</div>
                  </div>
                </div>
                <hr />
                <div className="buttomSection">
                  <div>
                    <div className="resultdetils">
                      CUISINES:
                    </div>
                    <div className="resultdetils">
                      COST FOR TWO:
                    </div>
                  </div>
                  <div className="resultoptionbuttom">
                    <div className="resultdetilsOptions">
                      Bakery
                    </div>
                    <div className="resultdetilsOptions">
                      ₹ 700
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="paginationOptions">
              <span className="paginationButton">&lt;</span>
              <span className="paginationButton">1</span>
              <span className="paginationButton">2</span>
              <span className="paginationButton">3</span>
              <span className="paginationButton">4</span>
              <span className="paginationButton">5</span>
              <span className="paginationButton">&gt;</span>
            </div>
        </>);
    }
}

export default ResultSection;