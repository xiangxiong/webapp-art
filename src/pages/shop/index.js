import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import Letters from '../home/letters/index';
import Column from '../home/column/index';
import ProductionItem from '../home/production/index';
import {Carousel, WingBlank} from 'antd-mobile';

export default class Shop extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            columnList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    title: '「 好货推荐 」',
                    describe: '上千件好物等你来选'
                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    title: '「 超值团购 」',
                    describe: '邀请好友一起拼团'
                }
            ],

            salesProductionList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',

                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                },
            ],

            likeProductionList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',

                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                },
            ],

            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        };
    }

    render() {
        const {columnList, salesProductionList, likeProductionList} = this.state;

        return (
            <Fragment>
                <div className="art-shop__header">
                    <div></div>

                    <div>
                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                        <span>分类</span>

                    </div>
                </div>

                <div className="art-shop__carousel">
                    <Carousel
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href="http://www.alipay.com"
                                style={{
                                    display: 'inline-block',
                                    width: '100%',
                                    height: '148px',
                                }}
                            >
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                    alt=""
                                    style={{width: '100%', height: '148px'}}
                                    onLoad={() => {
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>

                <div className="art-shop__special">
                    <Letters/>
                </div>

                <div className="art-shop__recomand">
                    <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                </div>

                <div className="art-shop__column">
                    <Column columnList={columnList}/>
                </div>

                <div className="art-shop__recommend">
                    <div className="art-shop__recommend___title">
                        <span>热销作品</span>
                        <div>
                            <span>更多</span>
                        </div>
                    </div>
                    <div className="art-shop__recommend___content">
                        {salesProductionList.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                    <ProductionItem {...production}/>
                                </div>)
                        })}
                    </div>
                </div>


                <div className="art-shop__recommend">
                    <div className="art-shop__recommend___title">
                        <span>为你推荐</span>
                        <div>
                            <span>更多</span>
                        </div>
                    </div>
                    <div className="art-shop__recommend___content">
                        {salesProductionList.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                    <ProductionItem {...production}/>
                                </div>)
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }
}