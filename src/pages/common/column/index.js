/**
 * Created by huhaibin on 2019/5/13.
 */
import React from 'react';
import './index.scss';
import {PRODUCTURL} from '../../../utils/api';
import PropTypes from 'prop-types';
import history from './../../../utils/history';

const Column = (props) => {
        const {leftImgUrl, rightImgUrl,cloumnData} = props;
        console.log('cloumnData',cloumnData);
        
        return (
            <>
                    <div className="art-main__column">
                            <h2>栏目</h2>
                            <div className="art-main__column-content">
                                <div className="art-main__column-content-recomand"
                                onClick={()=>{ if(cloumnData && cloumnData[1].url){
                                    history.push(cloumnData[0].url);
                                }}}
                                style={{
                                    background:`url(${PRODUCTURL + leftImgUrl})`,
                                    marginRight: "3px",
                                    backgroundSize: "100%"
                                }}>
                                    <h3>{ cloumnData && cloumnData[0].title } </h3>
                                    <p>{ cloumnData && cloumnData[0].name } </p>
                                </div>
                                <div className="art-main__column-content-invent"
                                onClick={()=>{ if(cloumnData && cloumnData[1].url){
                                    history.push(cloumnData[1].url);
                                 }}}
                                style={{
                                    background:`url(${PRODUCTURL + rightImgUrl}) 100%`,
                                    marginLeft: "3px",
                                    backgroundSize: "100%"
                                }}>
                                    <h3>{ cloumnData && cloumnData[1].title } </h3>
                                    <p>{ cloumnData && cloumnData[1].name } </p>
                                </div>
                            </div>
                    </div>

                    <div className="art-main__column-border"></div>
            </>
        )
}

PropTypes.PropTypes = {
    cloumnData:PropTypes.object
}

export default Column;
