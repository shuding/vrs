/**
 * Created by shu on 7/5/2017.
 */

import Link from 'next/link'

import Layout from '../components/Layout'
import Footer from '../components/Footer'

export default () =>
  <Layout>
    <article className="pt5 bg-white ph3">
      <Link href="/store"><a className="link black hover-gray tc">
        <p><i className="material-icons md-48 v-top">store</i></p>
        <h1 className="tc f3 mb4">Model Store</h1>
      </a></Link>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons red">fiber_new</i></h2>
      <div className="cf pa2">
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=1">
            <a className="db link dim tc">
              <img src="/static/models/1/thumbnail.png" alt="A Cabin" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">A Cabin</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">lordscry</dd>
              </dl>
            </a>
          </Link>
        </div>
      </div>
      <br/>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons">account_balance</i></h2>
      <div className="cf pa2">
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=1">
            <a className="db link dim tc">
              <img src="/static/models/1/thumbnail.png" alt="A Cabin" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">A Cabin</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">lordscry</dd>
              </dl>
            </a>
          </Link>
        </div>
      </div>
      <br/>
    </article>
    <Footer/>
  </Layout>
