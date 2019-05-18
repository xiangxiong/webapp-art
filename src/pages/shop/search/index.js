import React from 'react';
import './index.scss';

const SearchCategory = (props) =>{
    
    return (
        <div className="art-shop__search">
            <div>
                <input type="text" placeholder="大家多在搜紫砂壶" className="art-shop__input"/>
            </div>
            <div className="art-icon art-icon-category">
                    <div className="art-shop__input-text">分  类</div>
            </div>
        </div>
    )
}

export default SearchCategory;