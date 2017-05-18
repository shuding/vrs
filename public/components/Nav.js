/**
 * Created by shu on 7/5/2017.
 */

import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import NProgressStyles from 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default () =>
  <header className={`${Router.router && Router.router.pathname === '/edit' ? '' : 'bg-black-80 '}fixed w-100 ph3 pv3 pv3-ns ph3-m ph4-l fixed z-9999`}>
    <Head>
      <style dangerouslySetInnerHTML={{__html: NProgressStyles + '#nprogress .peg { display: none } #nprogress .bar { background: white; height: 3px; z-index: 10000; }'}} />
    </Head>
    <nav className="f6 fw6 ttu tracked dt-l w-100 mw8 center">
      <div className="w-100 w-10-l dtc-l tc tl-l">
        <Link href="/">
          <a className="link dim white dib mr3" title="Home">
          {
            (() => {
              if (!Router.router) {
                return 'V R S'
              }
              switch (Router.router.pathname) {
                case '/store':
                  return <span>V R S</span>
                case '/edit':
                  return <span>V R S</span>
                case '/about':
                  return <span>V R S</span>
                default:
                  return <span>V R S</span>
              }
            })()
          }
          </a>
        </Link>
      </div>
      <div className="w-100 w-90-l dtc-l tc tr-l v-mid">
        <Link href="/store">
          <a className="link dim white dib mr3 v-mid" title="Store">Store</a>
        </Link>
        <Link href="/about">
          <a className="link dim white dib mr3 v-mid" title="About">About</a>
        </Link>
        <a className="link dim white dib mr3 v-mid" href="https://github.com/quietshu/vrs" target="_blank" title="GitHub">GitHub</a>
        <a className="link dim white dib v-mid" href="#" title="Contact"><i className="material-icons md-18">shopping_cart</i></a>
      </div>
    </nav>
  </header>
