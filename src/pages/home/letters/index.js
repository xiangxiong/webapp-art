/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';
import {Carousel} from 'antd-mobile';

export default class Letters extends PureComponent {

    render() {
        const {data} = this.props;

        return (
            <div className="letters-main">
                <img src={`${PICTUREURL}6.png`}/>

                {(data && data.length > 0) ? (
                    <div>
                        <Carousel
                            dots={false}
                            vertical={true}
                            infinite
                        >
                            {this.props.data.map((item, index) => (
                                <a
                                    key={index.toString()}
                                    href={item.LinkUrl}
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                        height: '18px',
                                        backgroundColor: '#0e80d2',
                                    }}
                                >
                                    <span style={{
                                        fontFamily: 'PingFangSC-Regular',
                                        fontSize: '13px',
                                        color: ' #666666',
                                        letterSpacing: '-0.09px',
                                        textAlign: 'left',
                                        width: '100%',
                                        height: '18px',
                                        backgroundColor: '#C30F22',
                                    }}>
                                        {item.Title}
                                        </span>
                                </a>
                            ))}
                        </Carousel>
                    </div>
                ) : null}
            </div>
        )
    }
}
