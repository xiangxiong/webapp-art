import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import NavItem from './../nav/index';
import ColumnItem from './../column/index';
import {ListView} from 'antd-mobile';

export default class Main extends PureComponent {
    constructor(props) {
        super(props);

        this.navDataList = [
            {imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg', name: '大师云集'},
            {imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg', name: '市集'},
            {imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg', name: '艺商城'},
            {imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg', name: '艺社区'},
        ];

        this.state = {
            columnList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    title: '好货推荐',
                    describe: '上千件好物等你来选'
                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    title: '超值团购',
                    describe: '邀请好友一起拼团'
                }
            ]
        };
    }

    render() {
        const {columnList} = this.state;

export default class Main extends PureComponent{

    render(){
        return (
            <Fragment>

                 <div className="art-main__header">
                    <span>上海</span>
                    <span>
                        <input placeholder="大家都在搜紫砂壶"/>
                    </span>
                    <span>
                        帮助
                    </span>
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
                    快报
                </div>

                <div className="art-main__recomand">
                    <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                </div>

                <div className="art-main__interval"/>

                <div className="art-main__column">
                    <span>栏目</span>
                    <div>
                        {columnList.map((column, index) => {
                            return (
                                <div key={index.toString()} >
                                    <ColumnItem {...column}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="art-main__recommend">
                    <span>为你推荐</span>
                    <div>
                    </div>
                </div>


            </Fragment>
        )
    }
}