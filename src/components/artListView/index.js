import React, {PureComponent, Fragment} from 'react';
import {ListView} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.scss';

class ArtListView extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: dataSource,
            upLoading: false,
            pullLoading: false
        }
    }

    onEndReached = () => {
        let {onEndReached} = this.props;
    };

    render() {
        let {data = [], renderHeader, renderFooter, separator, renderRow} = this.props;
        let {dataSource} = this.state;

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={dataSource.cloneWithRows(data)}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
                renderRow={(rowData, id1, i) => renderRow(rowData, i)}
                renderSeparator={separator}
                className="am-list"
                useBodyScroll
                scrollRenderAheadDistance={500}
                onEndReached={() => {
                    this.onEndReached()
                }}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default ArtListView;
