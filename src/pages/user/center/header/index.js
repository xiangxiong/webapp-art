import React,{Fragment} from 'react';
import './index.scss';

const Header = (props) =>{
    const {src, UserName, Money, CollectCount, FollowCount, VisitCount, GroupCount} = props;
    return (
        <Fragment>
                <div className="art-user__info">
                     <div>
                         <img src={src}/>
                     </div>
                     <div>
                         <div>{UserName}</div>
                         <div>{`账户余额: ${Money}`}</div>
                     </div>
                     <div className="art-icon art-icon-user-arrow"></div>
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