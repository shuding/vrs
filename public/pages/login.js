/**
 * Created by shu on 11/6/2017.
 */

import Layout from '../components/Layout'
import Footer from '../components/Footer'

export default () =>
  <Layout>
    <main className="pa3 pa5-ns vh-100 white dt">
      <p className="f4 lh-copy measure dtc v-mid">
        <a href="/auth/twitter">Sign in with Twitter</a>
      </p>
    </main>
    <Footer/>
  </Layout>
