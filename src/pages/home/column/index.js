/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';

export default class Column extends PureComponent {

    render() {
        const {leftPictureUrl, rightPictureUrl} = this.props;
        return (
            <div className="column-main">
                <span>栏目</span>
                <div>
                    <div>
                        <img src={leftPictureUrl}/>
                    </div>
                    <div>
                        <img src={rightPictureUrl}/>
                    </div>
                </div>
            </div>
        )
    }
}
