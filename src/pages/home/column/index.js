/**
 * Created by huhaibin on 2019/5/13.
 */
import React, {PureComponent} from 'react';
import './index.scss';
import ColumnProductItem from './../columnProduct/index';

export default class Column extends PureComponent {

    render() {
        return (
            <div className="column-main">
                <span>栏目</span>
                <div>
                    {this.props.columnList.map((column, index) => {
                        return (
                            <div key={index.toString()}>
                                <ColumnProductItem {...column}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
