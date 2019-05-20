import React,{PureComponent,Fragment} from 'react';
import PublicHeader from './../../../components/header';
import './index.scss';
import {ImagePicker,Flex} from 'antd-mobile'

const data = [];

export default class Works extends PureComponent{

    state = {
        files: data,
        multiple: false,
      }
      onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
      onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
          multiple: index === 1,
        });
      }

    render(){
        const { files } = this.state;

        return (
            <Fragment>
                 <PublicHeader title="发布艺术家作品" bgColor="#E87908"/>
                 <Flex>
                        <Flex.Item>

                        <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 7}
                                multiple={this.state.multiple}
                    />
                        </Flex.Item>
                        <Flex.Item>
                        <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 7}
                                multiple={this.state.multiple}
                    />

                        </Flex.Item>
                        <Flex.Item>
                        <ImagePicker
                                    files={files}
                                    onChange={this.onChange}
                                    onImageClick={(index, fs) => console.log(index, fs)}
                                    selectable={files.length < 7}
                                    multiple={this.state.multiple}
                        />
                        </Flex.Item>
                </Flex>
            </Fragment>
        )
    }
}