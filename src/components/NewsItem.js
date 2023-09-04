import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { Title, description, imgurl, newsurl } = this.props;
    return (
      <>
        <div>
          <div className="card" style={{ width: "18rem" }}>
            <img src={imgurl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{Title}</h5>
              <p className="card-text">{description}</p>
              <a
                href={newsurl}
                target="_blank"
                className="btn btn-sm btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
