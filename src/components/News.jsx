import { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false
        };
    }

    async componentDidMount() {
        let url =
            "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bf405cbdc39541878ecf828d854a4251";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({ articles: parsedData.articles }); // Fix variable name
    }

    render() {
        return (
            <div className="container my-3">
                <h2>News-App Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <Newsitem
                                    title={element.title ? element.title.slice(0, 40) : ""}
                                    description={
                                        element.description ? element.description.slice(0, 50) : ""
                                    }
                                    imgurl={element.urlToImage }
                                    newsurl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default News;
