import React,{PureComponent} from 'react';
import {Carousel} from 'antd-mobile';
import './index.scss';
import PropTypes from 'prop-types';
import  {pictureUrl} from '../../../utils/common';

export default class CarouselBanner extends PureComponent{
    render(){
        const {data,imgHeight} = this.props;
        const  aimgHeight = imgHeight === 'auto' ? '1.76rem': imgHeight;

        return (
            <div className="art-main__header">
            <Carousel
                speed={200}
                autoplay
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                dotStyle={{width:'15px',height:'15px',backgroundColor:'#999999',marginBottom:'20px'}}
                dotActiveStyle={{width:'15px',height:'15px',backgroundColor:'#ffffff',marginBottom:'20px'}}
                >
                {data.map((item, index) => (
                    <a
                    key={index.toString()}
                    href={item.SkipUrl}
                    style={{ display: 'inline-block', width: '100%', height: aimgHeight }}
                    >
                    <img
                        src={pictureUrl(item.ImgUrl)}
                        alt=""
                        style={{
                            width:'100%',
                            height: aimgHeight
                        }}
                        // className="art-main__header-img"
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                    />
                    </a>
                ))}
                </Carousel>
            </div>
        )
    }
}

CarouselBanner.defaultProps = {
    data: [],
    imgHeight:'1.76rem'
};

CarouselBanner.propTypes = {
    data:PropTypes.array
};
