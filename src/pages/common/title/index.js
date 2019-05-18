import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Title = (props) => {
    const {title,more} = props;
    return (
        <div className="art-main__recommend-title"> 
            <div>{title}</div> 
            {more && 
            <div className="art-main__recommend-more">{more}
            </div>
           } 
            {more && 
                <div className="art-icon art-icon-arrow position"></div>
            }
        </div>
    )
}

Title.defaultProps = {
    title:'栏目'
}

Title.propTypes = {
    title:PropTypes.string
}

export default Title;