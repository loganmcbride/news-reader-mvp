import React from 'react';
import ListItem from './ListItem.jsx';
import HistoryItem from './HistoryItem.jsx';

const List = (props) => (
  <div>
    <h4> Query history: </h4>
    There are { props.history.length } queries in your history.
    <div>
    <button onClick={props.clickHandle}> Clear History </button>
    </div>
    { props.items.map((item, i) => <ListItem item={item} key={i}/>)}
  </div>
)

export default List;
