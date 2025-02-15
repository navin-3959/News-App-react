import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";

import Newsitem from "./Newsitem";
import Spiner from "./spiner";

const News = ({ category, pageSize, setprogress, apiKey }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchNews = useCallback(async (newPage = page) => {
        setprogress(10);
        setLoading(true);

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${newPage}&pageSize=${pageSize}`;

        try {
            let response = await fetch(url);
            let parsedData = await response.json();

            setprogress(50);
            setArticles(parsedData.articles || []);
            setTotalResults(parsedData.totalResults || 0);
            setLoading(false);
            setprogress(100);
        } catch (error) {
            console.error("Error fetching news:", error);
            setLoading(false);
        }
    }, [category, pageSize, page, apiKey, setprogress]); 

    useEffect(() => {
        fetchNews();
    }, [fetchNews]); // ✅ No more ESLint warning

    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (page < Math.ceil(totalResults / pageSize)) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className="container my-3">
            <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                News-App Top Headlines - {category}
            </h2>

            {loading && <Spiner />}

            <div className="row">
                {!loading && articles.map((element) => (
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
                ))}
            </div>

            <div className="container d-flex justify-content-between">
                <button
                    disabled={page <= 1}
                    type="button"
                    className="btn btn-dark"
                    onClick={handlePrev}
                >
                    &larr; Previous
                </button>
                <button
                    disabled={page >= Math.ceil(totalResults / pageSize)}
                    type="button"
                    className="btn btn-dark"
                    onClick={handleNext}
                >
                    Next &rarr;
                </button>
            </div>
        </div>
    );
};

News.defaultProps = {
    pageSize: 8,
    category: "general",
};

News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setprogress: PropTypes.func.isRequired,
};

export default News;
