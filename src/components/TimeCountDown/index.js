import React,{Component} from 'react';

let delayTime;

// 倒计时组件
class TimeCountDown extends Component {
  state = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  }

  componentDidMount() {
    delayTime = this.props.time;
    this.startCountDown();
  }

  componentDidUpdate() {
    if (this.props.time !== delayTime) {
      delayTime = this.props.time;

      this.clearTimer();
      this.startCountDown();
    }
  }

  timer = null;

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // 开启计时
  startCountDown() {
    if (delayTime && !this.timer) {
      this.timer = setInterval(() => {
        this.doCount();
      }, 1000);
    }
  }

  doCount() {
    const {
      onTimeout,
    } = this.props;

    // 使用Math.floor((delayTime - Date.now()) / 1000)的话会导致这里值为0，前面delayTime - Date.now() > 0
    const timeDiffSecond = (delayTime - `${Date.now()}`.replace(/\d{3}$/, '000')) / 1000;

    if (timeDiffSecond <= 0) {
      this.clearTimer();
      if (typeof onTimeout === 'function') {
        onTimeout();
      }
      return;
    }

    const day = Math.floor(timeDiffSecond / 86400);
    const hour = Math.floor((timeDiffSecond % 86400) / 3600);
    const minute = Math.floor((timeDiffSecond % 3600) / 60);
    const second = Math.floor((timeDiffSecond % 3600) % 60);

    this.setState({
      day,
      hour,
      minute,
      second,
    });
  }

  render() {
    const {
      render,
    } = this.props;

    return render({
      ...this.state,
    });
  }
}

export default TimeCountDown;