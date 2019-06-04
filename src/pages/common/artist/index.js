import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';

function handleJumpUrl(AuthorId) {
    history.push('./detail', {AuthorId})
}

const Artist = (props) => {
    let {ImageName = '', ProviderName = '', AuthorTypeName = '', index = 0, AuthorId} = props;

    return (
        <div className="art-main__recommend-item" key={index.toString()} onClick={() => {
            handleJumpUrl(AuthorId)
        }}>
            <div className="art-main__recommend-img img-mrg-right"
                 style={{
                     background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`
                 }}>
            </div>
            <p>
                <i>{ProviderName}</i>
                <i>{AuthorTypeName}</i>
            </p>
        </div>
    )
};

Artist.defaultProps = {};

Artist.propTypes = {};

export default Artist;