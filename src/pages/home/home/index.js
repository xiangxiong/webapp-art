import React,{PureComponent,Fragment} from 'react';
import './index.scss';

export default class Main extends PureComponent{
    render(){
        return (
            <Fragment>
                 <div className="art-main__header">
                    <span>上海</span>
                    <span>
                        <input placeholder="大家都在搜紫砂壶"/>
                    </span>
                    <span>
                        帮助
                    </span>
                 </div>
                 
                 <section className="art-main__navitem">
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                 </section>

                 <div className="art-main__special">

                 </div>
                 <div className="art-main__recomand">

                 </div>
            </Fragment>
        )
    }
}