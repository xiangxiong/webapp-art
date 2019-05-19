import React,{Fragment} from 'react';
import './index.scss';

const Header = (props) =>{
    return (
        <Fragment>
                <div className="art-user__info">
                     <div>
                         <img src={props.src}/>
                     </div>
                     <div>
                         <div>柳大海</div>
                         <div>账户余额: 80000</div>
                     </div>
                     <div className="art-icon art-icon-user-arrow"></div>
                </div>
                
                <div className="art-user__action">
                    <div>
                        <h4>45</h4>
                        <p>收藏</p>
                    </div>
                    <div>
                        <h4>45</h4>
                        <p>关注</p>
                    </div>
                    <div>
                    <h4>45</h4>
                        <p>足迹</p>
                    </div>
                    <div> <h4>45</h4>
                        <p>团购</p></div>
                </div>
               
        </Fragment>
    )
}

export default Header;