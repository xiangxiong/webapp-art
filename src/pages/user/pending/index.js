import React,{Fragment} from 'react';
import PublicHeader from './../../../components/header';
import history from './../../../utils/history';
import './index.scss';


const Pending = (props) => {
    return (
        <Fragment>
            <PublicHeader title="申请加盟店"/>
            <p className="art-pending__success">申请成功！资料审核中...</p>
            <p className="art-pending__content">
                    您的申请已成功提交，我们会尽快审核您的资料
                    如有疑问请拨打客服电话：4002343546
            </p>
            <div className="art-pending__contact">联系客服 400-234-3534</div>
        </Fragment>
    )
};
export default Pending;