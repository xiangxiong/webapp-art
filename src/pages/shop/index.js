import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import Letters from '../home/letters/index';
import Column from '../home/column/index';
import ProductionItem from '../home/production/index';

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
            ]
        };
    }

    render() {
        const {columnList, salesProductionList, likeProductionList} = this.state;

        return (
            <Fragment>
                <div className="art-shop__header">
                    <span>jfajk</span>
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