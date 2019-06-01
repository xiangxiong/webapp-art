import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';

function handleJumpUrl(ProductId) {
    history.push('./detail', {ProductId})
}

const Artist = (props) => {
    let {ImgPath = '', ProductName = '111', index = 0, ProductId} = props;

    return (
        <div className="art-main__recommend-item" key={index.toString()} onClick={() => {
            handleJumpUrl(ProductId)
        }}>
            <div className="art-main__recommend-img img-mrg-right"
                 style={{
                     //background: `url(${pictureUrl(ImgPath)}) 0% 0% / cover`
                 }}>
            </div>
            <p>
                <i>{ProductName}</i>
                <i>省级大师</i>
            </p>
            <div className="art-main__recommend-label">
                {['11', '222'].map((data, index) => {
                    return <span key={index.toString()}>檀木</span>
                })}
            </div>
        </div>
    )
};

Artist.defaultProps = {};

Artist.propTypes = {};

export default Artist;