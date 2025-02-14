/* eslint-disable react/prop-types */
import { Component } from "react";
import Newsitem from "./Newsitem";
import Spiner from "./spiner";

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }

    async fetchNews(page) {

        const { category, pageSize,setprogress,apiKey } = this.props;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
              setprogress(10)
        this.setState({ loading: true });

        try {
            let data = await fetch(url);
            // setprogress(50)

            let parsedData = await data.json();
            // setprogress(80)

            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
                page: page,
            });
            setprogress(100)

        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.fetchNews(1);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            this.fetchNews(1); // Reset to page 1 when category changes
        }
    }

    handlePrev = () => {
        if (this.state.page > 1) {
            this.fetchNews(this.state.page - 1);
        }
    };

    handleNext = () => {
        if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
            this.fetchNews(this.state.page + 1);
        }
    };

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">News-App Top Headlines - {this.props.category}</h2>
                {this.state.loading && <Spiner />}
                <div className="row">
                {!this.state.loading && Array.isArray(this.state.articles) &&
    this.state.articles.map((element) => (
        <div className="col-md-4" key={element.url}>
            <Newsitem
                title={element.title ? element.title.slice(0, 40) : ""}
                description={element.description ? element.description.slice(0, 50) : ""}
                imgurl={element.urlToImage}
                newsurl={element.url}
                author={element.author}
                date={element.publishedAt}
            />
        </div>
    ))
}

                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page <= 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrev}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNext}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
