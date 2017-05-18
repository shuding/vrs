/**
 * Created by shu on 7/5/2017.
 */

// include three.js
const THREE = require('three/build/three')
global.THREE = THREE

// three.js polyfills
require('three/examples/js/Mirror')
require('three/examples/js/loaders/ColladaLoader2')
require('three/examples/js/renderers/Projector')
require('three/examples/js/renderers/CanvasRenderer')
require('three/examples/js/effects/VREffect')
require('three/examples/js/shaders/CopyShader')
require('three/examples/js/shaders/DotScreenShader')
require('three/examples/js/shaders/RGBShiftShader')
require('three/examples/js/shaders/EdgeShader2')
require('three/examples/js/shaders/FilmShader')
require('three/examples/js/shaders/VignetteShader')
require('three/examples/js/shaders/DigitalGlitch')
require('three/examples/js/shaders/ToneMapShader')
require('three/examples/js/shaders/BokehShader')
require('three/examples/js/shaders/BlendShader')
require('three/examples/js/shaders/ColorCorrectionShader')
require('three/examples/js/shaders/HorizontalBlurShader')
require('three/examples/js/shaders/VerticalBlurShader')
require('three/examples/js/shaders/BleachBypassShader')
require('three/examples/js/shaders/HorizontalTiltShiftShader')
require('three/examples/js/shaders/VerticalTiltShiftShader')
require('three/examples/js/shaders/FocusShader')
require('three/examples/js/shaders/LuminosityHighPassShader')
require('three/examples/js/shaders/FXAAShader')
require('three/examples/js/postprocessing/EffectComposer')
require('three/examples/js/postprocessing/RenderPass')
require('three/examples/js/postprocessing/MaskPass')
require('three/examples/js/postprocessing/ShaderPass')
require('three/examples/js/postprocessing/FilmPass')
require('three/examples/js/postprocessing/GlitchPass')
require('three/examples/js/postprocessing/DotScreenPass')
require('three/examples/js/postprocessing/BokehPass')
require('three/examples/js/postprocessing/OutlinePass')
require('three/examples/js/postprocessing/UnrealBloomPass')
require('three/examples/js/controls/OrbitControls')
require('three/examples/js/controls/DeviceOrientationControls')

import { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import ScrollBar from 'smooth-scrollbar'

import Nav from './Nav'

import tachyonsStyles from 'tachyons/css/tachyons.min.css'
import layoutStyles from '../styles/layout.less'
import scrollBarStyles from 'smooth-scrollbar/dist/smooth-scrollbar.css'

import SliderWave from './SliderWave'
import ScrollIcon from './ScrollIcon'
import { Motion, spring } from 'react-motion'

export default class Layout extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.sbs = ScrollBar.initAll()
    if (window.scrollHandlers) {
      window.scrollHandlers.forEach(handler => {
        this.sbs[0].addListener(handler)
      })
    }
  }
  render () {
    let { children, title = 'VRS' } = this.props
    return <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: tachyonsStyles + scrollBarStyles + layoutStyles }} />
        <style>{`
          body {
            font-family: 'Space Mono', monospace;
            text-rendering: optimizeLegibility;
            word-break: break-word;
            word-wrap: break-word;
            -webkit-tap-highlight-color: transparent;
            -webkit-font-smoothing: antialiased;
          }
          .material-icons.md-18 { font-size: 18px; }
          .material-icons.md-24 { font-size: 24px; }
          .material-icons.md-36 { font-size: 36px; }
          .material-icons.md-48 { font-size: 48px; }
        `}</style>
      </Head>
      <Nav/>
      <Motion defaultStyle={{o: 0}} style={{o: spring(1)}}>
        {
          style =>
            <div style={{ opacity: style.o }}>
              {
                Router.router && Router.router.pathname === '/' &&
                  <div className="slider-item slider-item-bg fixed">
                    <SliderWave/>
                    <ScrollIcon key="scroll-icon"/>
                  </div>
              }
              <div className="container" data-scrollbar>{children}</div>
            </div>
        }
      </Motion>
    </div>
  }
}
