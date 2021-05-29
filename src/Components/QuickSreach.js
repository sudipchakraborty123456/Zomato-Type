import { Component } from "react";
import {withRouter} from "react-router-dom";//to connect to home page
class QuickSearch extends Component {
    handelClick(id,heading){
        const url = `/filter?mealtype=${id}&mealtypeName=${heading}`
        this.props.history.push(url)
    }
    render() {
        const {imgSrc, heading,content, mealtypeId} = this.props;
        //console.log(this.props.imgSrc);
        return (
            <>
                <div className="col-12 col-md-6 col-lg-4 " onClick={() => {
                    this.handelClick(mealtypeId,heading)
                }}>
                    <div className="quickSearchBox">
                        <img src={imgSrc} alt="Oops! Sorry" width="160px" height="160px" />
                        <div className="quicksearchDec">
                            <h3>{heading}</h3>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(QuickSearch);