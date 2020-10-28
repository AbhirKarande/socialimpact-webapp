import './App.css';
import React from "react";
import axios from "axios";
import { useState } from 'react';
var query = "";
const url = "https://newsapi.org/v2/everything?q="+query+"&apiKey=" + (process.env.REACT_APP_NEWSAPI_TOKEN);
class App extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null
  };
  getArticles() {
    axios
      .get(
        url
      )
      .then(response =>
        response.data.articles.map(article => ({
          date:`${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`
        }))
      )
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  
  componentDidMount(){
    this.getArticles();
  }
  render() {
    const { isLoading, articles } = this.state;
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleChange = event => {
      setSearchTerm(event.target.value);
      setSearchTerm = query;
    };
    return (
      <React.Fragment>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <h2>#Covid-19</h2>
        <div>
          {!isLoading ? (
            articles.map(article => {
              const { date, title, url } = article;
              return (
                <div key={title}>
                  <p>{date}</p>
                  <p>{title}</p>
                  <p>{url}</p>
                </div>
              );
            })
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
