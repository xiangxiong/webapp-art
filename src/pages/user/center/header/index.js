import React,{Fragment} from 'react';
import './index.scss';
import history from './../../../../utils/history';

const Header = (props) =>{
    const {src, UserName, Money, CollectCount, FollowCount, VisitCount, GroupCount, CustomerType, ProviderId} = props;
    return (
        <Fragment>
                <div className="art-user__info">
                     <div>
                           <img src={src == null ? "" : src}/>
                     </div>
                     <div>
                         <div>{UserName}</div>
                         <div>{`账户余额: ${Money}`}</div>
                     </div>
                    {CustomerType == 1 ? (
                        <div
                            className="art-icon art-icon-user-arrow"
                            onClick={() => {
                                history.push('./modifyInfo', {src, ProviderId, UserName})
                            }}>
                        </div>
                    ) : null}
                </div>

                <div className="art-user__action">
                    <div>
                        <h4>{CollectCount}</h4>
                        <p>收藏</p>
                    </div>
                    <div>
                        <h4>{FollowCount}</h4>
                        <p>关注</p>
                    </div>
                    <div>
                    <h4>{VisitCount}</h4>
                        <p>足迹</p>
                    </div>
                    <div> <h4>{GroupCount}</h4>
                        <p>团购</p></div>
                </div>
               
        </Fragment>
    )
}
export default Header;