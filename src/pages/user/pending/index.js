import React,{Fragment} from 'react';
import PublicHeader from './../../../components/header';
import history from './../../../utils/history';
import './index.scss';

function goBack(){
    history.push('/home?tab=User');
}

const Pending = (props) => {
    return (
        <Fragment>
            <PublicHeader title="申请合作"/>
            <p className="art-pending__success">申请成功！资料审核中...</p>
            <p className="art-pending__content">
                 您的申请已提交成功，我们会尽快审核你的资料
            </p>
            <div className="art-pending__contact" onClick={goBack}>返回个人中心</div>
        </Fragment>
    )
};
export default Pending;