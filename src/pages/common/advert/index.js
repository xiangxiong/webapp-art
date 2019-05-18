import React from 'react';
import './index.scss';
import  {pictureUrl} from '../../../utils/stringUtil';

const Advert = (props) => {

    const {commonAdList} = props;

    return (
        <div className="art-main__banner"
                            style={{
                                background:`url(${ commonAdList && commonAdList.length > 0 ? pictureUrl(commonAdList[0].ImgUrl) : ''})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain"
                            }}
                        >
        </div>
    )
}

export default Advert;