import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../utils/history';
import _ from 'lodash';
import {Toast} from 'antd-mobile';

export default class Search extends PureComponent {

    constructor(props) {
        super(props);

        let searchHistory = localStorage.getItem('searchHistory');
        let searchHistoryArray = [];

        if (!_.isEmpty(searchHistory)) {
            searchHistoryArray = JSON.parse(searchHistory);
        }

        this.state = {
            searchHistoryArray: searchHistoryArray,
        };
    }

    render() {
        const {searchHistoryArray} = this.state;

        return (
            <Fragment>
                <div className="art-search">

                    <div className="art-search__head">
                        <div
                            className="art-icon art-icon-arrow-left"
                            onClick={() => {
                                history.go(-1);
                            }}>

                        </div>
                        <div>
                            <input
                                ref={input => this.input = input}
                                type="text"
                                placeholder="大家多在搜紫砂壶"/>
                        </div>
                        <div
                            onClick={() => {
                                const inpVal = this.input.value;
                                if (_.isEmpty(inpVal)) {
                                    Toast.info('请输入搜索内容', 1);
                                    return;
                                }
                                let newSearchHistoryArray = _.clone(searchHistoryArray);

                                newSearchHistoryArray.push(inpVal);
                                localStorage.setItem('searchHistory', JSON.stringify(newSearchHistoryArray));
                                history.push('./searchResults', {inpVal});
                            }}>
                            确定
                        </div>
                    </div>

                    <div className="art-search__hot">
                        <h2>历史记录</h2>

                        <div
                            className="art-icon art-icon-cart-del"
                            onClick={() => {
                                localStorage.clear();
                                this.setState({searchHistoryArray: []});
                            }}/>
                    </div>

                    <div className="art-search__item">
                        {searchHistoryArray.map((searchHistory, index) => {
                            return (
                                <span
                                    key={index.toString()}
                                    className="art-search__item-text"
                                    onClick={() => {
                                        history.push('./searchResults', {inpVal: searchHistory});
                                    }}>
                                    {searchHistory}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {

    }
}
