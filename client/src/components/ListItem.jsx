import React from 'react';

const ListItem = (props) => (
  <div>
    <h3>
      { props.item.headline.main }
    </h3>
      <p> { props.item.snippet } </p>
      { props.item.multimedia.length > 0 &&
        <img src={"http://graphics8.nytimes.com/"+ props.item.multimedia[0].url}/>
      }
  </div>
)

export default ListItem;
