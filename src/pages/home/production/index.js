/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';

export default class ProductionItem extends PureComponent {

    render() {
        return (
            <div className='production-main'>
                <div className="production-main__picture"
                     style={{backgroundImage: 'url(' + this.props.imageUrl + ')', backgroundRepeat: 'no-repeat'}}>
                    <div>
                        <span>团购中</span>
                    </div>
                </div>
                <span>{this.props.name}</span>
                <div className="production-main__price">
                    <span>{this.props.salesPrice}</span>
                    <span>
                        <s>{this.props.marketPrice}</s>
                    </span>
                </div>

                <div className="production-main__author">
                    <span>{this.props.authorName}</span>
                    <img src={this.props.authorHead}/>
                </div>

            </div>
        )
    }
}
