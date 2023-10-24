import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10);
        // Simulating a delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // dummy data
        const dummyData = {
            articles: [
                {
                    title: 'Dummy Title 1',
                    description: 'Dummy Description 1',
                    imageUrl: '',
                    newsUrl: '#',
                    author: 'Dummy Author 1',
                    publishedAt: '2023-10-22',
                    source: { name: 'Dummy Source 1' },
                },
                {
                    title: 'Dummy Title 2',
                    description: 'Dummy Description 2',
                    imageUrl: '',
                    newsUrl: '#',
                    author: 'Dummy Author 2',
                    publishedAt: '2023-10-23',
                    source: { name: 'Dummy Source 2' },
                },

            ],
            totalResults: 2,
        };
        setArticles(dummyData.articles);
        setTotalResults(dummyData.totalResults);
        setLoading(false);
        props.setProgress(100);
    };

    useEffect(() => {
        updateNews();
    }, []);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setPage(nextPage); // Update the page after the API call
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <div>
            <>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='row my-3'>
                            {articles.map((element, index) => {
                                return (
                                    <div className='col-md-4' key={index}>
                                        <NewsItem
                                            title={element.title ? element.title.slice(0, 45) : ''}
                                            description={
                                                element.description
                                                    ? element.description.slice(0, 88)
                                                    : ''
                                            }
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            authour={element.authour}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        </div>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
