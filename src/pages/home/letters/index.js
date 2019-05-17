/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';
import {Carousel} from 'antd-mobile';

export default class Letters extends PureComponent{
    
    render() {
        const {data} = this.props;
        return (
            <div className="art-letters__main">
                <img src={`${PICTUREURL}6.png`}/>
                {data && data.length > 0 ? (
                    <Carousel className="my-carousel"
                              dots={false}
                              dragging={false}
                              swiping={false}
                              autoplay
                              infinite>
                        {data.map((item, index) => {
                            return (
                                <div className="v-item" key={index.toString()}>
                                    <a href={item.LinkUrl}>
                                        {item.Title}
                                    </a>
                                </div>
                            )
                        })}
                    </Carousel>
                ) : null}
            </div>
        )
    }
}
