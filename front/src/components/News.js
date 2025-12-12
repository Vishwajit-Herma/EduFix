import React from 'react';
import './News.css'; // Separate CSS file for news section
import Navbar from './Navbar';

const News = () => {
  return (<div><Navbar />
  <div className="news-container">
    <div className="news-section">
        <div className='box-1'>
        <h3 className='News'>News/Circulars:</h3></div>
      <div className="news-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0EOE4WEOTu1sIOxN08cA46XUgIPzJ_MI3zjNSlr1iIK2hNmTN4_1jSkTNX-1ckRwasZA&usqp=CAU"
          alt="News"
          className="news-image"
        />
        <div className="news-info">
          <h3 className="news-title">New Agricultural Policy </h3>
          <p className="news-description">
            The government has introduced a new policy aimed at ...
          </p>
          <a href="#!" className="see-more-link">See More</a>
        </div>
      </div>

      <div className="news-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRfktdqhQSWpJmqCfTzhHNjmvjgyFNbnLJ-w&s"
          alt="News"
          className="news-image"
        />
        <div className="news-info">
          <h3 className="news-title">Fertilizer Prices Drop Amidst </h3>
          <p className="news-description">
            Fertilizer prices have seen a significant drop due to new government subsidies...
          </p>
          <a href="#!" className="see-more-link">See More</a>
        </div>
      </div>
      <div className="news-card">
        <img
          src="https://ldce.ac.in/upload/ldce75news/2022/registration-open-for-ldce-global-alumni-convention-2023-m9yI4e.jpeg"
          alt="News"
          className="news-image"
        />
        <div className="news-info">
          <h3 className="news-title">Fertilizer Prices Drop Amidst </h3>
          <p className="news-description">
            Fertilizer prices have seen a significant drop due to new government subsidies...
          </p>
          <a href="#!" className="see-more-link">See More</a>
        </div>
      </div>
      <div className="news-card">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D22AQF-TvQ19Ceo_Q/feedshare-shrink_800/feedshare-shrink_800/0/1726553848066?e=2147483647&v=beta&t=SMFOCu2GKPYqUbUw1fVyhTMN4la5qWS7QeZwo_EXD24"
          alt="News"
          className="news-image"
        />
        <div className="news-info">
          <h3 className="news-title">Fertilizer Prices Drop Amidst</h3>
          <p className="news-description">
            Fertilizer prices have seen a significant drop due to new government subsidies...
          </p>
          <a href="#!" className="see-more-link">See More</a>
        </div>
      </div>
      <div className="news-card">
        <img
          src="https://pbs.twimg.com/media/GSrKkX3XoAEIUUv?format=jpg&name=900x900"
          alt="News"
          className="news-image"
        />
        <div className="news-info">
          <h3 className="news-title">Fertilizer Prices Drop Amidst </h3>
          <p className="news-description">
            Fertilizer prices have seen a significant drop due to new government subsidies
          </p>
          <a href="#!" className="see-more-link">See More</a>
        </div>
      </div>
      <div className="news-card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-vI28ru9U-8bViE_HENMxpfGGfq35VMFVzQ&s"
          alt="News"
          className="news-image"
        />
        <div className="news-info">
          <h3 className="news-title">Farmers Rally to Demand Better </h3>
          <p className="news-description">
            Farmers have taken to the streets to demand improvements in crop insurance schemes...
          </p>
          <a href="#!" className="see-more-link">See More</a>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default News;
