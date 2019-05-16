/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';

export default class Column extends PureComponent {

    render() {
        const {leftPictureUrl, rightPictureUrl} = this.props;
        return (
            <div className="art-column__main">
                <h3>栏目</h3>
                <div className="art-column__main___left">
                    <img src={leftPictureUrl}/>
                </div>

                <div className="art-column__main___right">
                    <img src={rightPictureUrl}/>
                </div>
            </div>
        )
    }
}
