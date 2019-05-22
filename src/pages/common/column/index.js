/**
 * Created by huhaibin on 2019/5/13.
 */
import React from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';

const Column = (props) => {
        const {leftImgUrl, rightImgUrl} = props;
        
        return (
            <>
                    <div className="art-main__column">
                            <h2>栏目</h2>
                            <div className="art-main__column-content">
                                <div className="art-main__column-content-recomand"
                                style={{
                                    background:`url(${PICTUREURL + leftImgUrl})`,
                                    marginRight: "3px",
                                    backgroundSize: "100%"
                                }}>
                                    <h3>「 大师云集 」 </h3>
                                    <p>上千件好物等你来选</p>
                                </div>
                                <div className="art-main__column-content-invent"
                                style={{
                                    background:`url(${PICTUREURL + rightImgUrl}) 100%`,
                                    marginLeft: "3px",
                                    backgroundSize: "100%"
                                }}>
                                    <h3>「 大师印象 」 </h3>
                                    <p>邀请好友一起拼团</p>
                                </div>
                            </div>
                    </div>

                    <div className="art-main__column-border"></div>
            </>
        )
}

export default Column;
