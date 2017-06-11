/**
 * Created by shu on 8/6/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import Tippy from 'tippy.js'
import $ from 'jquery'
import CartStyles from 'tippy.js/dist/tippy.css'

export default class extends Component {
  componentDidMount() {
    Tippy('.tippy', {
      html: '#cart-template',
      arrow: true,
      theme: 'dark'
    })

    // dirty
    window.addToCart = function (url) {
      let $screenshot = $(`<img src="${url}" class="screenshot"/>`)
      $screenshot.appendTo('.container .scroll-content > div')
      $screenshot.css({
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      })
      setTimeout(() => {
        let box = $('#cart-icon')[0].getBoundingClientRect()
        $screenshot.css({
          width: 30,
          height: 30,
          left: box.left,
          top: box.top + 20,
          opacity: 0,
        })

        setTimeout(() => {
          $screenshot.remove()
        }, 1000)
      }, 300)
    }
  }
  render() {
    return <div
      id="cart-icon"
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
