import React,{useState,Fragment,PureComponent} from 'react';
import PublicHeader from '@/components/header';
import './index.scss';

class Pay extends PureComponent{
    constructor(props){
        super(props);
        console.log('props',this.props.location.state);
    }

    render(){
        const {type} = this.props.location.state;
        const title = type === "art" ? "成为合作艺术家" : "成为艺术商城商户";

        return (
            <Fragment>
               <PublicHeader title={title}/>
               <p className="art-add__pay">
                    你已通过入驻艺术家信息审核
                    请选择入驻
               </p>
               <div className="art-add__desc">
                    <div>￥5000</div>
                    <div>
                    1、艺术家在线主页商城  <br/>
                    2、艺术家视频宣传 <br/>
                    3、6月起3个月艺术家流量扶持（入驻加送1个
                    月艺术家流量扶持） <br/>
                    </div>
                    <div>
                        <div className="art-add__option-cnt"> 
                                <div className="art-add__icon-cnt">
                                    <div className="art-add__option--selected">
                                    </div>
                                </div>
                        </div>
                    </div>
               </div>
               <div className="art-add__desc">
                    <div>￥10000</div>
                    <div>
                        1、艺术家在线主页商城<br/>
                        2、艺术家视频宣传<br/>
                        3、6月起5个月艺术家流量扶持（入驻加送3个<br/>
                        月艺术家流量扶持） <br/>
                        4、艺术家商品不定期参加官方社群宣传<br/>
                        5、不定期邀请艺术家参加线下活动（将会有报
                        名窗口）
                    </div>
                    <div>3</div>
               </div>
               <div className="art-add__desc">
                    <div>￥15000</div>
                    <div>
                        1、艺术家在线主页商城<br/>
                        2、艺术家视频宣传<br/>
                        3、6月起7个月艺术家流量扶持（入驻加送5个
                        月艺术家流量扶持）<br/>
                        4、艺术家商品不定期参加官方社群宣传<br/>
                        5、不定期邀请艺术家参加线下活动（将会有报
                        名窗口）<br/>
                        6、用户评选喜爱艺术家个人专访将在一些流量
                        较大的自媒体平台展现、<br/>
                        7、有机会成为“艺术加大”官方直播特邀嘉宾
                    </div>
                    <div>3</div>
               </div>

               <div className="art-add__paysure">
                确认并支付保障金
               </div>

            </Fragment>
        )
    }
}

export default Pay;