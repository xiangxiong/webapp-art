import React from 'react';
import './index.scss';
import history from './../../../utils/history';


function jumpUrl(){
    history.push('./category');
}

const SearchCategory = (props) =>{

    return (
        <div className="art-shop__search">
            <div>
                <input type="text" placeholder="大家多在搜紫砂壶" className="art-shop__input" readonly = "readonly" onClick={()=>{
                    history.push('./search');
                }}/>
            </div>
            <div className="art-icon art-icon-category">
                    <div onClick={jumpUrl}  className="art-shop__input-text">分  类</div>
            </div>
        </div>
    )
}

export default SearchCategory;