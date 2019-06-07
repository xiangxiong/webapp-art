import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import {pictureUrl} from '../../../utils/common';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getSearchAll} from '../store/actionCreators';

class SearchResults extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Fragment>
                <div className="art-searchResults">

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

