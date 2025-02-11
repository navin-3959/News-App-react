/* eslint-disable react/prop-types */
import { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imgurl, newsurl } = this.props; // Fixed prop names

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={imgurl} className="card-img-top" alt="News" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
