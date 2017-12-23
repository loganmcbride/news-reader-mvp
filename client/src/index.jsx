import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['First story','Second story'],
      value: '',
      data: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('Mount err', err);
      }
    });
  }

  handleChange(e) {
    this.setState({value: e.target.value})
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
          data: data.data.response.docs
        })
      })
      .catch(err => console.log('error in submit', err))

  }

  render () {
    return (<div>
      <h1>Logans News</h1>
      <form onSubmit={this.handleSubmit}>
        <label>
          Keywords:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
