/**
 * Created by shu on 10/5/2017.
 */

import Head from 'next/head'
import Router from 'next/router'
import Promise from 'bluebird'

import { Component } from 'react'
import throttle from 'lodash/throttle'

import editorStyles from '../styles/editor.less'

// utils
const traverse = (object, callback) => {
  if (object && typeof object.children !== 'undefined') {
    for (let i = 0; i < object.children.length; ++i) {
      traverse(object.children[i], callback)
    }
  }
  if (object) {
    callback(object)
  }
}

// the main component which renders a highly customized threejs model viewer

class Editor extends Component {
  constructor(props) {
    super(props)

    this.three = {}
    this.objects = []
    this.wireframeObjects = []
    this.shapeObjects = []

    this.meshes = []
    this.materials = {}

    this.renderThree = this.renderThree.bind(this)
    this.rotateToLeftView = this.rotateToLeftView.bind(this)
    this.renderLoop = this.renderLoop.bind(this)
    this.handleResize = throttle(this.handleResize.bind(this), 100, false)
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    this.initThree(window.innerWidth, window.innerHeight)
    this.initScene()
    this.initMaterials()
    this.initEffects()
    this.initModel().then(() => this.renderLoop())
  }
  componentWillUnmount() {
    this.renderLoop = () => {}
  }

  // user event handlers
  handleResize() {
    const { renderer, camera } = this.three

    let width = window.innerWidth, height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  // initializations
  initThree(width, height) {
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    renderer.setSize(width, height)

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
    camera.lookAt(new THREE.Vector3())

    const controls = new THREE.OrbitControls(camera, this.canvas)
    controls.enableZoom = true
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.12

    const composer = new THREE.EffectComposer(renderer)

    this.three.renderer = renderer
    this.three.camera = camera
    this.three.controls = controls
    this.three.composer = composer
  }
  initMaterials() {
    const shapeMaterial = new THREE.ShaderMaterial( {
      uniforms: {},
      vertexShader: `
      attribute vec3 center;
      varying vec3 vCenter;
      varying vec3 vNormal;
      void main() {
				vCenter = center;
        vNormal = normalize(normalMatrix * normal);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
      `,
      fragmentShader: `
      varying vec3 vCenter;
      varying vec3 vNormal;
      float edgeFactorTri() {
				vec3 d = fwidth(vCenter.xyz);
				vec3 a3 = smoothstep(vec3(0.0), d * 1.3, vCenter.xyz);
				return min(min(a3.x, a3.y), a3.z);
      }
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0.5, 0.5, 0.5)), 1.1) + 0.6; 
				gl_FragColor.rgb = mix(vec3(1.0), vec3(0.2), edgeFactorTri()) * intensity;
				gl_FragColor.a = 1.0;
      }
      `,
      blending: THREE.AdditiveBlending
    })
    shapeMaterial.extensions.derivatives = true

    const wireFrameMaterial = new THREE.MeshDepthMaterial({
      wireframe: true,
      opacity: 0,
      transparent: true
    })

    const pointsMaterial = new THREE.PointsMaterial({size: 8 / (window.devicePixelRatio || 1), sizeAttenuation: false})
    pointsMaterial.color.setRGB(.5, 1.0, .5)

    this.materials.shapeMaterial = shapeMaterial
    this.materials.wireFrameMaterial = wireFrameMaterial
    this.materials.pointsMaterial = pointsMaterial
  }
  initScene() {
    const { renderer } = this.three
    const scene = new THREE.Scene()

    scene.background = new THREE.Color(0x000000, 0)

    scene.add(new THREE.GridHelper(100, 100, 0xcccccc, 0x444444))
    // scene.add(new THREE.AxisHelper(20))

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(50, 50, 50)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xaaaaaa))

    let hemiLight = new THREE.HemisphereLight(0xcccccc, 0xffffff, 1)
    hemiLight.groundColor.setHSL(1, 0.6, 0.5)
    hemiLight.position.set(0, 500, 0)
    scene.add(hemiLight)

    const groundMirror = new THREE.Mirror(100, 100, {
      clipBias: 0.1,
      textureWidth: window.innerWidth,
      textureHeight: window.innerHeight,
      color: 0x222222
    })
    groundMirror.rotateX(- Math.PI / 2 )
    groundMirror.translateZ(-0.1)
    scene.add(groundMirror)

    scene.fog = new THREE.FogExp2(0x050505, 0.005)
    renderer.setClearColor(scene.fog.color)

    this.three.scene = scene
  }
  initEffects() {
    const { scene, camera, composer } = this.three

    let effect = new THREE.RenderPass(scene, camera)
    // effect.renderToScreen = true
    composer.addPass(effect)

    effect = new THREE.ShaderPass(THREE.VignetteShader)
    effect.uniforms["offset"].value = 0.5
    effect.uniforms["darkness"].value = 5
    // effect.renderToScreen = true
    composer.addPass(effect)

    THREE.FilmShader.fragmentShader = [
      "#include <common>",
      "uniform float time;",
      "uniform bool grayscale;",
      "uniform float nIntensity;",
      "uniform float sIntensity;",
      "uniform float sCount;",
      "uniform sampler2D tDiffuse;",
      "varying vec2 vUv;",
      "void main() {",
      "vec4 cTextureScreen = texture2D( tDiffuse, vUv );",
      "float dx = rand( vUv + time );",
      "vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );",
      "vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );",
      "cResult += cTextureScreen.rgb * vec3( sc.x, sc.x, sc.x ) * sIntensity;", // use single color
      "cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );",
      "if( grayscale ) {",
      "cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );",
      "}",
      "gl_FragColor =  vec4( cResult, cTextureScreen.a );",
      "}"
    ].join("\n")

    effect = new THREE.ShaderPass(THREE.VerticalBlurShader)
    effect.uniforms["v"].value = 1 / 4096
    // effect.renderToScreen = true
    composer.addPass(effect)

    effect = new THREE.FilmPass(0.5, 0.2, 2000, false)
    // effect.renderToScreen = true
    composer.addPass(effect)

    // effect = new THREE.GlitchPass(1)
    // effect.renderToScreen = true
    // composer.addPass(effect)

    // effect = new THREE.ShaderPass(THREE.EdgeShader)
    // effect.uniforms.aspect.value = new THREE.Vector2(10000, 10000)
    // effect.renderToScreen = true
    // composer.addPass(effect)

    effect = new THREE.ShaderPass(THREE.RGBShiftShader)
    effect.uniforms.amount.value = 0.0006
    effect.renderToScreen = true
    composer.addPass(effect)
  }
  initModel() {
    const loader = new THREE.ObjectLoader()

    const id = Router.query.id || this.props.id
    const modelPath = `/static/models/${id}/data.json`

    return new Promise(resolve => {
      loader.load(modelPath, result => {
        if (result instanceof THREE.Scene) {
          this.initModelScene(result)
        } else {
          this.initModelObject(result)
        }
        resolve()
      })
    })
  }
  initModelControls() {
    // compute the rotation center from camera's target
    let { camera, controls } = this.three
    let camDirection = camera.getWorldDirection()
    let y = camera.position.y - camera.position.x / camDirection.x * camDirection.y
    controls.target.set(0, y, 0)
    controls.update()

  }
  initModelScene(scene) {
    // set an initial scale for camera/controls
    const { camera } = this.three
    let bBox = new THREE.Box3().setFromObject(scene)
    let {y: height, x: width, z: depth} = bBox.getSize()
    let modelSize = Math.max(height, width, depth)
    let scaleRatio = 10 / modelSize

    let dist = height / (2 * Math.tan(camera.fov * Math.PI / 360))
    scene.position.setY(0)
    let pos = scene.position.clone()

    pos.setY(height / 2)
    camera.position.set(pos.x + dist * 0.3, pos.y + dist * 0.3, -dist * 1.5)
    camera.lookAt(pos)
    camera.zoom = 0.8
    camera.updateProjectionMatrix()

    this.initModelControls()

    // parse the model scene and push all objects to the current scene
    while (scene.children.length) {
      let object = scene.children.pop()
      if (object) {
        if (object.position) {
          // move y-axis
          object.position.setY(object.position.y - bBox.min.y)
        }
        this.initModelObject(object)
      }
    }
  }
  initModelCamera(object) {
    const { camera } = this.three

    camera.fov = object.fov
    camera.far = object.far
    camera.focus = object.focus
    camera.zoom = 0.8
    camera.position.copy(object.position)
    camera.rotation.copy(object.rotation)
    camera.updateProjectionMatrix()

    this.initModelControls()
  }
  initModelObject(object) {
    // push an object from the model file to the current scene

    const { scene } = this.three

    if (object instanceof THREE.PerspectiveCamera) {
      this.initModelCamera(object)
    }

    // scene.add(object)

    let wireframeClone = object.clone()
    traverse(wireframeClone, child => {
      if (child instanceof THREE.Mesh) {
        let pointsGeo = new THREE.Geometry()
        pointsGeo.dynamic = true
        for (let i = 0; i < child.geometry.vertices.length; ++i) {
          pointsGeo.vertices.push(child.geometry.vertices[i])
        }
        child.material = this.materials.wireFrameMaterial
        child.add(new THREE.Points(pointsGeo, this.materials.pointsMaterial))
      }
    })
    scene.add(wireframeClone)

    let shapeClone = object.clone()
    shapeClone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        let geometry = new THREE.BufferGeometry().fromGeometry(child.geometry)

        let vectors = [
          new THREE.Vector3( 1, 0, 0 ),
          new THREE.Vector3( 0, 1, 0 ),
          new THREE.Vector3( 0, 0, 1 )
        ]
        let position = geometry.attributes.position
        let centers = new Float32Array(position.count * 3)
        for (let i = 0, l = position.count; i < l; i++) {
          vectors[i % 3].toArray(centers, i * 3)
        }

        geometry.addAttribute('center', new THREE.BufferAttribute(centers, 3))

        child.geometry = geometry
        child.material = this.materials.shapeMaterial
      }
    })
    // this.shapeObjects.push(shapeClone)
    scene.add(shapeClone)
  }

  // updating
  updateMaterial() {

  }
  rotateToLeftView() {

  }

  // rendering
  renderThree() {
    const { scene, renderer, camera, composer, controls } = this.three

    scene.updateMatrixWorld()

    controls.update()
    renderer.clear()
    composer.render()
  }
  renderLoop() {
    this.renderThree()
    requestAnimationFrame(this.renderLoop)
  }

  render() {
    return <div style={{ display: 'flex' }}>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: editorStyles }} />
      </Head>

      <canvas className="view-canvas" ref={canvas => this.canvas = canvas}/>

      <div className='control-bar fixed bottom-0 bg-black-80 white w-100 z-999 pv3 ph4'>
        <div className="fl">
          <a onClick={this.rotateToLeftView}>LEFT</a>
          <a>TOP</a>
        </div>

        <div className="key-info fr">
          <i className="material-icons">3d_rotation</i>
          <i className="material-icons">zoom_in</i>
          <i className="material-icons">open_with</i>
        </div>
      </div>
    </div>
  }
}

export default Editor
