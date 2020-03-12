import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Article extends React.Component {
  state = {
    article: null,
    questions:null
  };

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    axios
      .get("./article.json")
      .then(res => {
        const articles = res.data.articles;
        const questions = res.data.questions;
        const article = articles[Math.floor(Math.random() * articles.length)];
        this.setState({
          article: article,
          questions: questions.find(
            question => question.articleId === article.id
          )
        });
      })
      .catch(e => console.log(e));
  };

  onSubmit = () => {
    this.props.history.push('/thankyou');
  }

  onTextChange = (index, event) => {
    const {questions } =  this.state;
    questions.questions[index].ans = event.target.value;
    this.setState({
      questions: {
        ...questions,
      }
    })
  }

  render() {
    const { questions, article } = this.state;
    if (!article) {
      return <div> Loading.....</div>;
    }
    return (
      <React.Fragment>
        <div className="container mt-4">
          <div className="card" width="100%">
            <img
              className="card-img-top"
              src={article.urlToImage}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              {questions.questions.map((question, index) => {
                return (
                  <div className="form-group" key={index}>
                    <label>{index + 1}. {question.que}</label>
                    <input type="text" className="form-control" value={question.ans} onChange={(e) => this.onTextChange(index, e)} />
                  </div>
                );
              })}
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" onClick={() => this.onSubmit()}>Submit</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Article);