import React,{PureComponent} from 'react';
import {Carousel} from 'antd-mobile';
import './index.scss';
import PropTypes from 'prop-types';

export default class CarouselBanner extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
                imgHeight: 176
        };
    }
    render(){
        const {data} = this.props;

        return (
            <div className="art-main__header">
            <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                {data.map(val => (
                    <a
                    key={val}
                    href="#"
                    style={{ display: 'inline-block', width: '100%', height: '1.76rem' }}
                    >
                    <img
                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                        alt=""
                        className="art-main__header-img"
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
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
}

CarouselBanner.propTypes = {
    data:PropTypes.array
}
