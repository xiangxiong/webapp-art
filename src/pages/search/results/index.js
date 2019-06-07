import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getSearchAll} from '../store/actionCreators';
import SearchProduct from '../../common/searchProduct/index';

class SearchResults extends PureComponent {

    constructor(props) {
        super(props);
    }

    showRecomandItem = () => {
        const {searchResultsList} = this.props;

        let items = [];
        if (searchResultsList.length <= 0) {
            return;
        }
        searchResultsList.DataList.map((item, key) => {
            items.push(<SearchProduct {...item} key={Math.random()}/>);
        });
        return items;
    };

    render() {
        const {inpVal} = this.props.location.state;

        return (
            <Fragment>
                <div className="art-searchResults">

                    <div className="art-searchResults__head">
                        <div
                            className="art-icon art-icon-kefu"
                            onClick={() => {
                                history.go(-1);
                            }}>

                        </div>
                        <div>
                            <input
                                readonly="readonly"
                                type="text"
                                value={inpVal}/>
                        </div>
                    </div>

                    <div className="art-searchResults__content">
                        {this.showRecomandItem()}
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {inpVal} = this.props.location.state;
        this.props.getSearchAll(inpVal);
    }
}

const mapStateToProps = ({search}) => {
    return {
        searchResultsList: search.searchResultsList,
    }
};

const mapDispatchToProps = dispatch => ({
    getSearchAll: (Key) => {
        dispatch(getSearchAll({Key}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

