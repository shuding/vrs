/**
 * Created by shu on 8/6/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import Tippy from 'tippy.js'
import $ from 'jquery'
import CartStyles from 'tippy.js/dist/tippy.css'

function saveToLocalStorage(key, data) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.log(err)
  }
}

function loadFromLocalStorage(key) {
  try {
    return window.localStorage.getItem(key)
  } catch (err) {
    return null
  }
}

export default class extends Component {
  constructor() {
    super()

    this.state = {
      cnt: 0,
      items: []
    }
  }
  saveCart() {
    saveToLocalStorage('vrs:cart', this.state)
    // TODO: save to server
  }
  componentDidMount() {
    Tippy('.tippy', {
      html: '#cart-template',
      arrow: true,
      theme: 'dark',
      wait (show, event) {
        setTimeout(() => {
          show()
        }, 0)
      }
    })

    // dirty
    window.addToCart = url => {
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

        this.setState({
          cnt: this.state.cnt + 1,
          items: [...this.state.items, {
            url
          }]
        })

        this.saveCart()

        setTimeout(() => {
          $screenshot.remove()
        }, 1000)
      }, 300)
    }
  }
  render() {
    return <div style={{position: 'relative'}}>
      {
        this.state.cnt ? <div className="badge">{this.state.cnt}</div> : ''
      }
      <div
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
          <p>Cart ({this.state.cnt})</p>
          <ul>
            {
              this.state.items.map((item, index) => <li key={`item-${index}`}><img src={item.url}/></li>)
            }
          </ul>
        </div>
      </div>
    </div>
  }
}
