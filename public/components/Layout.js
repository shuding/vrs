/**
 * Created by shu on 7/5/2017.
 */

// include three.js
const THREE = require('three/build/three')
global.THREE = THREE

// three.js polyfills
require('three/examples/js/renderers/Projector')
require('three/examples/js/renderers/CanvasRenderer')
require('three/examples/js/shaders/CopyShader')
require('three/examples/js/shaders/DotScreenShader')
require('three/examples/js/shaders/RGBShiftShader')
require('three/examples/js/shaders/EdgeShader')
require('three/examples/js/postprocessing/EffectComposer')
require('three/examples/js/postprocessing/RenderPass')
require('three/examples/js/postprocessing/MaskPass')
require('three/examples/js/postprocessing/ShaderPass')

import Link from 'next/link'
import Head from 'next/head'

import Nav from './Nav'

import tachyonsStyles from 'tachyons/css/tachyons.css'
import layoutStyles from '../styles/layout.less'

export default ({ children, title = 'VRS' }) =>
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet"/>
      <style dangerouslySetInnerHTML={{ __html: tachyonsStyles + layoutStyles }} />
      <style>{`
        body {
          font-family: 'Space Mono', monospace;
        }
      `}</style>
    </Head>
    <Nav/>
    <div className="container">{children}</div>
  </div>
