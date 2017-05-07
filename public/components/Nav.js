/**
 * Created by shu on 7/5/2017.
 */

import Link from 'next/link'

export default () =>
  <header className="bg-black-80 fixed w-100 ph3 pv3 pv3-ns ph3-m ph4-l fixed z-9999">
    <nav className="f6 fw6 ttu tracked dt-l w-100 mw8 center">
      <div className="w-100 w-10-l dtc-l tc tl-l">
        <Link href="/">
          <a className="link dim white dib mr3" title="Home">V R S</a>
        </Link>
      </div>
      <div className="w-100 w-90-l dtc-l tc tr-l">
        <Link href="/store">
          <a className="link dim white dib mr3" title="Store">Store</a>
        </Link>
        <Link href="/about">
          <a className="link dim white dib mr3" title="About">About</a>
        </Link>
        <a className="link dim white dib mr3" href="#" title="Contact">Contact</a>
        <a className="link dim white dib v-mid" href="#" title="Contact"><i className="material-icons md-18">shopping_cart</i></a>
      </div>
    </nav>
  </header>
