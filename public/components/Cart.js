/**
 * Created by shu on 8/6/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import Tippy from 'tippy.js'
import CartStyles from 'tippy.js/dist/tippy.css'

export default class extends Component {
  componentDidMount() {
    Tippy('.tippy', {
      html: '#cart-template',
      arrow: true,
      theme: 'dark'
    })
  }
  render() {
    return <div
      className="tippy"
      data-duration="300"
      data-animation="shift"
      data-trigger="click"
      data-position="bottom">
      <Head>
        <style dangerouslySetInnerHTML={{__html: CartStyles}} />
      </Head>

      {this.props.children}
      <div id="cart-template" style={{display: 'none'}}>
        <p>Cart (0)</p>
      </div>
    </div>
  }
}
