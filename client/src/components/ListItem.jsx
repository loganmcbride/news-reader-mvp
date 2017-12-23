import React from 'react';

const ListItem = (props) => (
  <div>
    <h3>
      { props.item.headline.main }
    </h3>
      { props.item.snippet }
  </div>
)

export default ListItem;
