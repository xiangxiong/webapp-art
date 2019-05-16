/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';

export default class NavItem extends PureComponent {
    render() {
        return (
            <div className="art-nav__main">
                <img src={this.props.imageUrl}/>
                <span>{this.props.name}</span>
            </div>
        )
    }
}