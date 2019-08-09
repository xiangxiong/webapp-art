// import './style.less'
import React, {Component} from 'react';
import './index.scss';

class Waterfall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 1,
      list: [[]]
    }
    this.layout = this.layout.bind(this)
  }
  componentDidMount () {
    let { children } = this.props
    this.layout(children)
  }
  layout (children) {
    const { colCount, margin } = this.props
    let remain = React.Children.toArray(children)
    let width = this.dom.getBoundingClientRect().width

    let ceilWidth = (width - margin * (colCount - 1)) / colCount
    let list = []
    for (let i = 0; i < colCount; i++) {
      let top = remain.shift()
      let col = top ? [top] : []
      list.push(col)
    }
    this.setState({
      remain,
      count: colCount,
      list,
      ceilWidth
    })
  }
  componentDidUpdate (prevProps, prevState) {
    let { list, remain } = this.state
    if (remain.length) {
      let lowest = Infinity
      let lowestIndex = 0
      list.forEach((v, i) => {
        let height = this['col' + i].getBoundingClientRect().height
        if (height < lowest) {
          lowest = height
          lowestIndex = i
        }
      })
      list[lowestIndex].push(remain.shift())
      setTimeout(() => {
        this.setState({
          list,
          remain
        })
      }, 100)
    }
  }
  render () {
    const { margin } = this.props
    const { list, ceilWidth } = this.state
    const listLength = list.length
    return (
      <div
        ref={dom => { this.dom = dom }}
        className='waterfall'
        style={{
          overflow: 'hidden'
        }}
      >
        {list.map((col, i) => {
          if (col && col.length) {
            return (
              <div
                key={i}
                className='waterfall-col'
                ref={dom => { this['col' + i] = dom }}
                style={{
                  float: 'left',
                  width: ceilWidth,
                  marginRight: i === listLength - 1 ? 0 : margin
                }}
              >
                {col.map((v, key) => (
                  <div
                    key={key}
                    className='waterfall-ceil'
                    style={{
                      marginBottom: margin
                    }}
                  >
                    {v}
                  </div>
                ))}
              </div>
            )
          } else {
            return null
          }
        })}
      </div>
    )
  }
}

Waterfall.defaultProps = {
  margin: 10,
  ceilWidth: 0,
  colCount: 3
}

export default Waterfall
