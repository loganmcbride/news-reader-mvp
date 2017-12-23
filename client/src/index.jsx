import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: '',
      history: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateQueryHistory = this.updateQueryHistory.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  updateQueryHistory() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          history: data
        })
      },
      error: (err) => {
        console.log('Mount err', err);
      }
    });
  }

  componentDidMount() {
    this.updateQueryHistory();
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  clearHistory(e) {
    axios.delete('/stories', {
      params: {}
    })
    .then(data => {
      this.updateQueryHistory();
    })
    .catch(err => console.log('error in clear Hist', err))
  }

  handleSubmit(e) {
      e.preventDefault();
      axios.get('/stories', {
        params: {
          data: this.state.value
        }
      })
      .then(data => {
        console.log('this is the data from client', data.data.response.docs)
        this.setState({
          items: data.data.response.docs
        })
        this.updateQueryHistory();
      })
      .catch(err => console.log('error in submit', err))
  }

  render () {
    return (<div>
      <h1>All the News thats fit to be displayed digitally onscreen</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          Search by keyword:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <List items={this.state.items} history={this.state.history} clickHandle={this.clearHistory}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
