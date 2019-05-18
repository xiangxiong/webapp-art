/**
 * Created by huhaibin on 2019/5/13.
 */
import React from 'react';
import './index.scss';

const Column = (props) => {

        const {imgUrl} = props;

        return (
            <>
                    <div className="art-main__column">
                            <h2>栏目</h2>
                            <div className="art-main__column-content">
                                <div className="art-main__column-content-recomand"
                                style={{
                                    background:`url(${imgUrl}30.png)`,
                                    marginRight: "3px",
                                    backgroundRepeat: "repeat",
                                    backgroundSize: "contain"
                                }}>
                                    {/*<h3>「 大师云集 」 </h3>
                                    <p>上千件好物等你来选</p>*/}
                                </div>
                                <div className="art-main__column-content-invent"
                                style={{
                                    background:`url(${imgUrl}31.png)`,
                                    marginLeft: "3px",
                                    backgroundRepeat: "repeat",
                                    backgroundSize: "contain"
                                }}>
                                    {/*<h3>「 大师印象 」 </h3>
                                    <p>邀请好友一起拼团</p>*/}
                                </div>
                            </div>
                    </div>

                    <div className="art-main__column-border"></div>
            </>
        )
}

export default Column;
