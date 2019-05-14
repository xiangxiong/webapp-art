/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';

export default class ColumnProductItem extends PureComponent {

    render() {
        return (
            <div className="column-product"
                 style={{backgroundImage: 'url(' + this.props.imageUrl + ')', backgroundRepeat: 'no-repeat'}}>
                <span>{this.props.title}</span>
                <span>{this.props.describe}</span>
            </div>
        )
    }
}
