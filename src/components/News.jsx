/* eslint-disable react/prop-types */
import { Component } from "react";
import Newsitem from "./Newsitem";
import Spiner from "./spiner";
export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults:0
        };
    }

    async componentDidMount() {
        
        let url =
            `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bf405cbdc39541878ecf828d854a4251&page=1&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading: false, }); 
    }


    handleprev = async() => {
        console.log("previous")
        let url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bf405cbdc39541878ecf828d854a4251&page=${ this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})

        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
    }

    handlenext = async () => {
        console.log("next")
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
             console.log("nothing")
        }
        else{
            let url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bf405cbdc39541878ecf828d854a4251&page=${ this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })
    }}


    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">News-App Top Headlines</h2>
                {this.state.loading && <Spiner/>}
                <div className="row">
                    {!this.state.loading&&this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <Newsitem
                                    title={element.title ? element.title.slice(0, 40) : ""}
                                    description={
                                        element.description ? element.description.slice(0, 50) : ""
                                    }
                                    imgurl={element.urlToImage}
                                    newsurl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1 } type="button" className="btn btn-dark" onClick={this.handleprev}> &larr; Previous</button>
                    <button  disabled={this.state.page + 1 > Math.ceil((this.state.totalResults || 1)/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
