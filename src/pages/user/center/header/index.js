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
                        <h4>45</h4>
                        <p>{CollectCount}</p>
                    </div>
                    <div>
                        <h4>45</h4>
                        <p>{FollowCount}</p>
                    </div>
                    <div>
                    <h4>45</h4>
                        <p>{VisitCount}</p>
                    </div>
                    <div> <h4>45</h4>
                        <p>{GroupCount}</p></div>
                </div>
               
        </Fragment>
    )
}

export default Header;