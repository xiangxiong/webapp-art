/**
 * Created by huhaibin on 2019/5/13.
 */
import React from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';
import {Carousel} from 'antd-mobile';
import PropTypes from 'prop-types';

const Letters = (props) => {
    const {data = []} = props;

    return (
        <div className="art-letters__main">

            <img src={`${PICTUREURL}6.png`}/>

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
        </div>
    )
};

Letters.defaultProps = {
    data: []
};

Letters.propTypes = {
    data: PropTypes.array
};

export default Letters;
