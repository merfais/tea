import React, { Component } from 'react';
import _ from 'lodash'
import './App.css';


import Input, {
  Textarea,
  InputTest,
} from 'components/input/index.js'

window.a=[]
window.aa = []
window.b=[]
window.bb = []

class App extends Component {

  state = {
    value: 2
  }

  handleChange = e => {
    this.state.value = e
    // console.log('Demo handleChange', this.state.value, e)
  }

  handleClick = () => {
    // console.log('handleClick', this.state.value)
    this.setState({
      value: Math.random()
      // value: 1,
    })
  }

  calc(arr) {
    let l = arr.length
    const a = _.sortBy(arr)
    a.splice(l - 1, 1)
    a.splice(0, 1)
    l = a.length
    const sum = _.reduce(a, (previous, current) => current += previous)
    const avg = sum / l
    const fl = Math.floor(l / 2)
    const fc = Math.ceil(l / 2)
    const mid = (a[fl] + a[fc]) / 2
    const min = a[0]
    const max = a[l -1]
    return {avg, mid, max, min, fl, fc, l, a}
  }

  log = () => {
    /*
    const sum_a = window.a.reduce((previous, current) => current += previous)
    const avg_a = window.a.length ? (sum_a / window.a.length) : 0
    const sum_aa = window.aa.reduce((previous, current) => current += previous)
    const avg_aa = window.aa.length ? (sum_aa / window.aa.length) : 0
    const sum_b = window.b.reduce((previous, current) => current += previous)
    const avg_b = window.b.length ? (sum_b / window.b.length) : 0
    const sum_bb = window.bb.reduce((previous, current) => current += previous)
    const avg_bb = window.bb.length ? (sum_bb / window.bb.length) : 0
    */
    const a = this.calc(window.a)
    const aa = this.calc(window.aa)
    const b = this.calc(window.b)
    const bb = this.calc(window.bb)
    console.log('a外部平均', a.avg, '中位数', a.mid, 'max', a.max, 'min', a.min,
      a.l, window.a.length, a.fl, a.fc, a.a[a.fl], a.a[a.fc])
    console.log('b外部平均', b.avg, 'b外部中位数', b.mid, window.b.length)
    console.log('aa内部平均', aa.avg,'aa外部中位数', aa.mid,  window.aa.length)
    console.log('bb内部平均', bb.avg,'bb外部中位数', bb.mid,  window.bb.length)
    console.log('---------------------------------------------')
  }
  handleAuto =() => {
    this.test()
  }

  test = (count =5000, q=23) => {
    window.a = []
    window.b = []
    let i = count * q
    while (i > 0) {
      setTimeout(() => {
        this.setState({
          value: Math.random()
          // value: 1,
        })
      }, i + 1000)
      i -= q
    }
  }

  componentDidMount() {
    this.test(10000, 600)
  }

  render() {
    const prefix = <i className='prefix'/>
    const suffix = 'suffix'
    const addonBefore = <button>addonBefore</button>
    const addonAfter = <button>addonAfter</button>
    const node = (
      <div className="App">
        <p>
          <Input value={this.state.value}
            data-ss='xxxx'
            style={{border: '1px', color: '#f00'}}
            className='ssss'
            addonBefore={addonBefore}
            addonAfter={addonAfter}
            prefix={prefix}
            suffix={suffix}
            onChange={this.handleChange}/>
          <button onClick={this.handleClick}>tttt</button>
        </p>
        <p>
          <InputTest value={this.state.value}
            data-ss='xxxx'
            style={{border: '1px', color: '#f00'}}
            className='ssss'
            addonBefore={addonBefore}
            addonAfter={addonAfter}
            prefix={prefix}
            suffix={suffix}
            onChange={this.handleChange}/>
          <button onClick={this.handleClick}>tttt</button>
        </p>
        <p>
          <Textarea value={this.state.value}
            data-ss='xxxx'
            style={{border: '1px', color: '#f00'}}
            className='ssss'
            onChange={this.handleChange}/>
          <button onClick={this.handleClick}>tttt</button>
        </p>
        <button onClick={this.handleAuto}>自动测试</button>
        <button onClick={this.log}>打印</button>
      </div>
    )
    return node
  }
}

export default App;
