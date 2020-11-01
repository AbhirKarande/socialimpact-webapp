import './App.css';
import React from "react";
import axios from "axios";
import ReactDOM from 'react-dom'
//import 'boostrap/dist/css/bootstrap.css'
var query = "";
const url = "https://newsapi.org/v2/everything?q=US-Presidential-Election&apiKey=" + (process.env.REACT_APP_NEWSAPI_TOKEN);
class App extends React.Component {
  //constructor(props) {
  //  super(props)
  //  this.state = {
  //    value: '',
  //  }
  //}
  //handleChange(event) {
   // this.setState({value: event.target.value})
    //query = value;
  //}
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
    return (
      <React.Fragment>
        <h2 class="page-header">The latest on the 2020 United Presidential Election</h2>
        <div>
          {!isLoading ? (
            articles.map(article => {
              const { date, title, url } = article;
              return (
                <div class="posts" key={title}>
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
