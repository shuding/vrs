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
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=6">
            <a className="db link dim tc">
              <img src="/static/models/6/thumbnail.png" alt="Castle Tower" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Castle Tower</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">rpajo</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=10">
            <a className="db link dim tc">
              <img src="/static/models/10/thumbnail.png" alt="Minecraft Steve" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Minecraft Steve</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">Ben Houston</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=11">
            <a className="db link dim tc">
              <img src="/static/models/11/thumbnail.png" alt="Charizard" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Charizard</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">KieferUu</dd>
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
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=7">
            <a className="db link dim tc">
              <img src="/static/models/7/thumbnail.png" alt="Medieval House 2" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Medieval House 2</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">mebyz</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=6">
            <a className="db link dim tc">
              <img src="/static/models/6/thumbnail.png" alt="Castle Tower" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Castle Tower</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">rpajo</dd>
              </dl>
            </a>
          </Link>
        </div>
      </div>
      <br/>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons">directions_car</i></h2>
      <div className="cf pa2">
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=3">
            <a className="db link dim tc">
              <img src="/static/models/3/thumbnail.png" alt="Camero 2010" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Camero 2010</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">Jason Shoumar</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=4">
            <a className="db link dim tc">
              <img src="/static/models/4/thumbnail.png" alt="Camero 2010" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Camero 2010</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">Jason Shoumar</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=8">
            <a className="db link dim tc">
              <img src="/static/models/8/thumbnail.png" alt="Space Shuttle Orbiter" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Space Shuttle Orbiter</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">Jason Shoumar</dd>
              </dl>
            </a>
          </Link>
        </div>
      </div>
      <br/>
      <h2 className="f4 fw4 pa3 mv0 tc"><i className="material-icons">tag_faces</i></h2>
      <div className="cf pa2">
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=9">
            <a className="db link dim tc">
              <img src="/static/models/9/thumbnail.png" alt="Pikachu" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Pikachu</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">KieferU</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=10">
            <a className="db link dim tc">
              <img src="/static/models/10/thumbnail.png" alt="Minecraft Steve" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Minecraft Steve</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">Ben Houston</dd>
              </dl>
            </a>
          </Link>
        </div>
        <div className="fl w-50 w-25-m w-20-l pa2">
          <Link href="/view-model?id=11">
            <a className="db link dim tc">
              <img src="/static/models/11/thumbnail.png" alt="Charizard" className="w-100 db outline black-10"/>
              <dl className="mt2 f6 lh-copy">
                <dt className="clip">Title</dt>
                <dd className="ml0 black truncate w-100">Charizard</dd>
                <dt className="clip">Artist</dt>
                <dd className="ml0 gray truncate w-100">KieferUu</dd>
              </dl>
            </a>
          </Link>
        </div>
      </div>
      <br/>
    </article>
    <Footer/>
  </Layout>
