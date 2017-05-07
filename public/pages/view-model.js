/**
 * Created by shu on 7/5/2017.
 */

import { Component } from 'react'
import Head from 'next/head'

import Link from 'next/link'
import Router from 'next/router'

import Layout from '../components/Layout'
import Footer from '../components/Footer'

import viewStyles from '../styles/view.less'

class ViewModel extends Component {
  constructor() {
    super()
    this.state = {
      grid: false
    }

    this.tick = this.tick.bind(this)
    this.toggleGrid = this.toggleGrid.bind(this)
  }
  componentDidMount() {
    this.width = Math.min(window.innerWidth, 600)
    this.height = ~~(this.width / 4 * 3)

    this.initResources()
    this.initThree()
    this.loadModel()
      .then(scene => {
        this.scene = scene

        // add light
        let light = new THREE.DirectionalLight(0xeeeeee)
        light.position.set(1, 1, 1)
        this.scene.add(light)

        let effect = new THREE.RenderPass(this.scene, this.camera)
        this.composer.addPass(effect)

        effect = new THREE.ShaderPass(THREE.EdgeShader)
        effect.uniforms.aspect.value = new THREE.Vector2(800, 800)
        effect.renderToScreen = true
        this.composer.addPass(effect)

        this.tick()
      })
  }
  initResources() {
    // to be refactored
    this.id = Router.query.id
    this.model = `/static/models/${this.id}/data.json`
  }
  initThree() {
    let {width, height} = this

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true })
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.setPixelRatio(1)//window.devicePixelRatio)
    this.renderer.setSize(width, height)

    this.composer = new THREE.EffectComposer(this.renderer)

    this.camera = new THREE.PerspectiveCamera(5, width / height, 1, 10000)
    this.camera.position.z = 100

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.controls.addEventListener('change', this.tick)
    this.controls.enableZoom = true
  }
  loadModel() {
    const loader = new THREE.ObjectLoader()

    // TODO: error handling
    return new Promise(resolve => {
      loader.load(this.model, (scene) => resolve(scene))
    })
  }
  tick() {
    if (this.grid) {
      this.renderer.clear()
      this.composer.render()
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }
  toggleGrid() {
    this.grid = !this.state.grid
    this.tick()

    this.setState({ grid: !this.state.grid })
  }
  render() {
    return <Layout>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: viewStyles }} />
      </Head>

      <article className="pt5 bg-white ph3">
        <Link href="/store"><a className="link black hover-gray tl dib">
          <p><i className="material-icons md-36 v-mid">store</i></p>
        </a></Link>
        <i className="material-icons md-24 v-mid mh2">keyboard_arrow_right</i>
        <p className="dib f4 v-mid">A Cabin</p>
        <div className="tc flex viewer-container">
          <div className="sidebar ph3">
            <a className={`no-underline black hover-gray inline-flex items-center tc pa3 mb3 ba ${this.state.grid ? '' : 'b--transparent'}`} href="javascript:;" title="Show wireframe" onClick={this.toggleGrid}>
              <i className="material-icons">grid_on</i>
              <span className="f6 ml3 pr2">{ this.state.grid ? 'Hide' : 'Show'} wireframe</span>
            </a>
          </div>
          <canvas
            ref={canvas => this.canvas = canvas}
            className="mw-100 h-auto view-canvas mb3"/>
          <div className="sidebar purchase ph3 tc flex flex-column">
            <dl className="db dib-l w-auto-l lh-title tc">
              <dd className="f6 fw4 ml0">Model</dd>
              <dd className="f2 f-subheadline-l fw6 ml0">$35</dd>
            </dl>
            <div className="mv4">- - -</div>
            <a className="no-underline black hover-gray inline-flex items-center tc pa3 mb3" href="javascript:;" title="Share">
              <i className="material-icons">share</i>
              <span className="f6 ml3 pr2">Share</span>
            </a>
            <a className="no-underline near-white bg-red hover-bg-transparent hover-red inline-flex items-center tc pa3 mb3" href="javascript:;" title="Add to cart">
              <i className="material-icons">shopping_cart</i>
              <span className="f6 ml3 pr2">Add to cart</span>
            </a>
          </div>
        </div>
        <p className="tc"><span className="bg-light-yellow ph2"><i className="material-icons">mouse</i> Use mouse to rotate / scale / select</span></p>
        <hr/>
        <div>
          <h2>Discussion</h2>
        </div>
        <br/>
      </article>
      <Footer/>
    </Layout>
  }
}

export default ViewModel
