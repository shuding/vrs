/**
 * Created by shu on 7/5/2017.
 */

import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'VRS' }) =>
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    { children }
  </div>
