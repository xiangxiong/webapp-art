import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import history from './../../utils/history';
import {pictureUrl} from '../../utils/common';

class User extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className="art-search">
                    
                    <div className="art-search__hot">
                        <h2>历史记录</h2>
                        <div></div>
                    </div>

                    <div className="art-search__item">
                        {['11', '22', '33', '44', '55'].map(() => {
                            return (
                                <span className="art-search__item-text">
                                    女性保健品
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

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
