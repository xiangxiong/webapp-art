import React,{PureComponent} from 'react';
import './index.scss';
import history from './../../../utils/history';


class SearchCategory extends PureComponent{
    constructor(props) {
        super(props);
    }

    render() {
        console.log('this.props',this.props);
        return (
            <div className="art-shop__search">
                <div>
                    <input type="text" placeholder="大家多在搜紫砂壶22" className="art-shop__input" readonly = "readonly" onClick={()=>{
                        history.push('./search');
                    }}/>
                </div>
                <div className="art-icon art-icon-category">
                        <div onClick={()=>{
                           this.props.jumpUrl()
                        }} className="art-shop__input-text">分  类</div>
                </div>
            </div>
        )
    }
}


export default SearchCategory;