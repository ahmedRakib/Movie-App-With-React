import React, { Component } from 'react';

//<i class="fa fa-heart-o" aria-hidden="true"></i> // for open heart

/*here we have used a stateless functional component instead of class component,
 as it is a controlled component. Its value is passed by its parent components via props 
 and it doesnt have any state. Also it doesnt have any event handler methods */

const Like = (props) => {
    let iconClass = "fa fa-heart"
    if(!props.liked) iconClass += "-o"

    return ( <i className={iconClass} style={{cursor: "pointer"}} onClick={props.onClick}></i> );
}
 
export default Like;