import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types'
//while importing lodash it is common convention to use "_". 
//coz it is an updated version of a popular js library called underscore.

const Pagination = (props) => {

    const {itemsCount, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if(pageCount == 1) return null;
    const pages = _.range(1, pageCount+1); 
    // we have to add +1 here coz this method will not add the N'th number here. 
    //so if the pageCount is 4 it will create an array from 1 to 3

    console.log(pages.length)

    return ( 
        <nav>
            <ul className="pagination">
                {pages.map (page => 
                     <li key={page} className={ page === currentPage  ? 'page-item active' : 'page-item'}>
                         <a className= "page-link" onClick = {() => onPageChange(page)}> {page} </a>
                    </li>
                     )}
            </ul>
        </nav>
     );
}

Pagination.propTypes = {
    itemsCount : PropTypes.number.isRequired,
    pageSize : PropTypes.number.isRequired, 
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired
}

export default Pagination;