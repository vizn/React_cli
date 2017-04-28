import React, { Component }from 'react'
import { render } from 'react-dom'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from 'Actions'

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  render() {
    return (
      <div>
        <WhiteSpace />
        <WingBlank>
          <Button onClick={this.showModal('modal')}> {this.props.example.title}</Button>
        </WingBlank>
        <WhiteSpace />
        <Modal
          title="ReactJS"
          transparent
          maskClosable={false}
          visible={this.state.modal}
          onClose={this.onClose('modal')}
          footer={[{ text: '确定', onPress: () => { this.props.actions.changeTitle("React世界"); this.onClose('modal')(); } }]}
          platform="ios"
        >
          欢迎您来到React!
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    example: state.example.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(Example)
