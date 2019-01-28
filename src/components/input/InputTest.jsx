import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

export default class Input extends React.PureComponent {
  static defaultProps = {
    prefixCls: 'tea-input',
    disabled: false,
  }
  static propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  $input = null
  state = {
    value: ''
  }
  _stateHasChanged = false

  constructor(props) {
    super(props)
    if (_.has(props, 'defaultValue')) {
      this.state.value = props.defaultValue
    } else {
      this.state.value = props.value || ''
    }
    if (this.state.value === null || this.state.value === undefined) {
      this.state.value = ''
    }
  }

  componentDidMount() {
    // this.test(10)
  }

  test(count=5000, q = 20) {
    window.bb = []
    this._count = 0
    let i = count * q
    while (i > 0) {
      setTimeout(() => {
        this._caseByInner = true
        this._stateHasChanged = true
        this.setState({
          value: Math.random() * 1000
        })
        this._count += 1
        if (this._count >= count) {
          this.props.over()
        }
      }, i + 100)
      i -= q
    }
  }

  focus() {
    this.$input.focus()
  }

  blur() {
    this.$input.blur()
  }

  select() {
    this.$input.select()
  }

  setRef = node => {
    this.$input = node
  }

  handleChange = e => {
    const value = _.get(e, 'target.value')
    this.setState({ value })
    this._stateHasChanged = true
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(value, e)
    }
  }

  handleKeyDown = e => {
    const value = _.get(e, 'target.value')
    const {
      onPressEnter,
      onKeyDown
    } = this.props
    if (e.keyCode === 13 && _.isFunction(onPressEnter)) {
      onPressEnter(value, e)
    }
    if (_.isFunction(onKeyDown)) {
      onKeyDown(value, e)
    }
  }

  getInputCls(use) {
    const { prefixCls, disabled, className } = this.props
    return classNames(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
      [className]: !!use,
    })
  }

  getAffixCls(use) {
    const { prefixCls, className } = this.props
    return classNames(`${prefixCls}-affix-wrapper`, {
      [className]: !!use,
    })
  }

  withAddon(affixNode) {
    const {
      prefixCls,
      addonBefore,
      addonAfter,
      className,
      style,
    } = this.props
    const addonClassName = `${prefixCls}-group-addon`
    if (addonBefore !== null && addonBefore !== undefined) {
      this.addonBeforeNode = (
        <span className={addonClassName}>
          {addonBefore}
        </span>
      )
    } else {
      this.addonBeforeNode = null
    }
    if (addonAfter !== null && addonAfter !== undefined) {
      this.addonAfterNode = (
        <span className={addonClassName}>
          {addonAfter}
        </span>
      )
    } else {
      this.addonAfterNode = null
    }
    if (!this.addonBeforeNode && !this.addonAfterNode) {
      return affixNode
    }
    const groupCls = classNames(
      `${prefixCls}-group-wrapper`,
      className,
    )
    const addonCls = classNames(
      `${prefixCls}-group`,
      `${prefixCls}-addon-wrapper`,
    )
    const affixNodeClone = React.cloneElement(affixNode, {
      style: null,
      className: this.getAffixCls()
    })
    return (
      <span
        className={groupCls}
        style={style}
      >
        <span className={addonCls}>
          {this.addonBeforeNode}
          {affixNodeClone}
          {this.addonAfterNode}
        </span>
      </span>
    )
  }

  withAffix(inputNode) {
    const { prefixCls, prefix, suffix } = this.props
    if (prefix !== null && prefix !== undefined) {
      this.prefixNode = (
        <span className={`${prefixCls}-prefix`}>
          {prefix}
        </span>
      )
    } else {
      this.prefixNode = null
    }
    if (suffix !== null && suffix !== undefined) {
      this.suffixNode = (
        <span className={`${prefixCls}-suffix`}>
          {suffix}
        </span>
      )
    } else {
      this.suffixNode = null
    }
    if (!this.prefixNode && !this.suffixNode) {
      return inputNode
    }
    const affixWrapperCls = this.getAffixCls(true)
    const inputNodeClone = React.cloneElement(inputNode, {
      style: null,
      className: this.getInputCls()
    })
    return (
      <span
        className={affixWrapperCls}
        style={this.props.style}
      >
        {this.prefixNode}
        {inputNodeClone}
        {this.suffixNode}
      </span>
    )
  }

  render() {
    // console.time('input_test_render')
    const start = performance.now()
    // console.log('input_test_render', start)
    if (this.props.start && this.start !== true) {
      this.start = true
      this.test(10000, 879)
    }
    const inputProps = _.omit(this.props, [
      'value',
      'defaultValue',
      'type',
      'prefixCls',
      'className',
      'onPressEnter',
      'onKeyDown',
      'onChange',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'start',
      'over',
    ])
    const inputClassName = this.getInputCls(true)
    this.inputType = this.props.type
    if (this.inputType === 'button'
      || this.inputType === 'checkbox'
      || this.inputType === 'radio'
      || this.inputType === 'range'
      || this.inputType === 'submit'
      || this.inputType === 'reset'
    ) {
      this.inputType = 'text'
    }
    if (!this._stateHasChanged) {
      if (_.has(this.state, 'value') && _.has(this.props, 'value')) {
        this.state.value = this.props.value
      }
    } else {
      this._stateHasChanged = false
    }
    const node = this.withAddon(this.withAffix(
      <input ref={this.setRef}
        className={inputClassName}
        type={this.inputType}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        {...inputProps}
      />
    ))
    const end = performance.now()
    // console.log('input_test_render', end)
    // console.timeEnd('input_test_render')
    const t = end - start
    if (this._caseByInner) {
      window.bb.push(t)
    } else {
      window.b.push(t)
    }
    this._caseByInner = false
    return node
  }
}
