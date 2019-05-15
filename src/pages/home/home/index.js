import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import NavItem from './../nav/index';
import Column from '../column/index';
import ProductionItem from './../production/index';
import Letters from './../letters/index';
import {PICTUREURL} from '../../../utils/api';
import {Carousel, WingBlank} from 'antd-mobile';

export default class Main extends PureComponent {

    constructor(props) {
        super(props);

        this.navDataList = [
            {imageUrl: `${PICTUREURL}2.png`, name: '大师云集'},
            {imageUrl: `${PICTUREURL}3.png`, name: '市集'},
            {imageUrl: `${PICTUREURL}4.png`, name: '艺商城'},
            {imageUrl: `${PICTUREURL}5.png`, name: '艺社区'},
        ];

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

            productionList: [
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

        const {columnList, productionList} = this.state;

        return (
            <Fragment>
                <div className="art-main__header">
                    <div>
                        <WingBlank>
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
                                            height: '176px',
                                        }}
                                    >
                                        <img
                                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                            alt=""
                                            style={{width: '100%', height: '176px'}}
                                            onLoad={() => {
                                            }}
                                        />
                                    </a>
                                ))}
                            </Carousel>
                        </WingBlank>
                    </div>

                    <div>
                        <span>上海</span>
                        <input placeholder="大家都在搜紫砂壶" type="text"/>
                        <img src={`${PICTUREURL}2.png`}/>
                    </div>
                </div>

                <section className="art-main__navitem">
                    {this.navDataList.map((navData, index) => {
                        return (
                            <div key={index.toString()}>
                                <NavItem {...navData}/>
                            </div>)
                    })}

                </section>

                <div className="art-main__special">
                    <Letters/>
                </div>

                <div className="art-main__recomand">
                    <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                </div>

                <div className="art-main__interval"/>

                <div className="art-main__column">
                    <Column columnList={columnList}/>
                </div>

                <div className="art-main__recommend">
                    <span>为你推荐</span>
                    <div>
                        {productionList.map((production, index) => {
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