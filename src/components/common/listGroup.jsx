import React from 'react';

const ListGroup = (props) => {
 
    const {items, selectedItem, onItemSelect} = props;

    console.log(items);
    return ( 
        <ul className="list-group">
            {items.map(item =>
                <li key = {item._id} className={item === selectedItem ? "list-group-item active" : "list-group-item"} onClick={() => onItemSelect(item)}> {item.name} </li>
            )}
        </ul>
     );
}
 
export default ListGroup;