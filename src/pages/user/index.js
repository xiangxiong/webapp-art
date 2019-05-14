import React, {PureComponent, Fragment} from 'react';
import './index.scss';

export default class User extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {}
    }

    otherInfoItem(number, name) {
        return (
            <div>
                <span>{number}</span>
                <span>{name}</span>
            </div>
        )
    }

    orderInfoItem(number, name, url, isShowBorderRight = true) {

        return (
            <div style={{
                borderRightColor: '#DFDFDF',
                borderRightStyle: 'solid',
                borderRightWidth: isShowBorderRight ? '1px' : '0px'
            }}>
                {+number > 0 ? (
                    <div>
                        <span>{number}</span>
                    </div>
                ) : null}
                <img src={url}/>
                <span>{name}</span>
            </div>
        )
    }


    render() {

        return (
            <Fragment>
                <div className="art-user__header">
                    <div className="art-user__header___basicInfo">
                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                        <div>
                            <span>{'柳士勇'}</span>
                            <span>{'账户余额：8890元'}</span>
                        </div>
                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                    </div>

                    <div style={{width: '100%', height: '1px', backgroundColor: '#E7E7E7'}}/>

                    <div className="art-user__header___otherInfo">
                        {this.otherInfoItem(45, '收藏')}
                        {this.otherInfoItem(45, '关注')}
                        {this.otherInfoItem(45, '足记')}
                        {this.otherInfoItem(56, '团购')}
                    </div>


                </div>
                <div className="art-user__order">
                    <div className="art-user__order___title">
                        <span>我的订单</span>

                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                    </div>

                    <div style={{width: '97%', height: '1px', backgroundColor: '#E7E7E7', alignSelf: 'center'}}/>

                    <div className="art-user__order___stateList">
                        {this.orderInfoItem(0, '待付款', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(2, '待发货', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(0, '待收货', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(0, '待评价', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(0, '退货/售后', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg', false)}
                    </div>
                </div>
                <div style={{width: '100%', height: '20px', backgroundColor: '#F3F3F3'}}/>
            </Fragment>
        )
    }
}
