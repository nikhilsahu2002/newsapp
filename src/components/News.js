import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      totalPages: 0,
    };
  }

  async componentDidMount() {
    await this.fetchArticles(this.state.page);
  }

  fetchArticles = async (page) => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a1a7efaac7e94574a560cf2bb8bb6b44&page=${page}&pagesize=${this.props.pagesize}`;
    let response = await fetch(url);
    let parsedData = await response.json();
    this.setState({
      articles: parsedData.articles,
      page,
      totalResults: parsedData.totalResults,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pagesize),
      loading: false,
    });
  };

  ClickPrev = async () => {
    await this.fetchArticles(this.state.page - 1);
  };

  clicknext = async () => {
    await this.fetchArticles(this.state.page + 1);
  };

  render() {
    return (
      <div>
        <h1>This is News Component</h1>
        {this.state.loading && <Spinner />}
        <div className="container my-3">
          <div className="row ">
            {!this.state.loading &&
              this.state.articles.map((element) => (
                <div className="col-md-4 my-2" key={element.url}>
                  <NewsItem
                    Title={element.title ? element.title : " "}
                    description={
                      element.description ? element.description : " "
                    }
                    imgurl={element.urlToImage ? element.urlToImage : " "}
                    newsurl={element.url ? element.url : " "}
                  />
                </div>
              ))}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              onClick={this.ClickPrev}
              type="button"
              className="btn btn-dark"
            >
              &larr; Prev
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.clicknext}
              disabled={this.state.page >= this.state.totalPages}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
