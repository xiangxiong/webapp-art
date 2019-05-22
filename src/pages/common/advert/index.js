import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/common';

const Advert = (props) => {

    const {commonAdList} = props;

    return (
        <div className="art-main__banner"
                            style={{
                                background:`url(${ commonAdList && commonAdList.length > 0 ? pictureUrl(commonAdList[0].ImgUrl) : ''}) 0% 0% / cover`,
                            }}
                        >
        </div>
    )
}

export default Advert;