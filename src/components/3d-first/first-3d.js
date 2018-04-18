import React, { Component } from 'react';
import * as THREE from 'three';

class Three extends Component {
  constructor() {
    super()
  }

  ani() {
    let me = this;
    window.requestAnimationFrame(me.ani.bind(this));
    me.cube.rotation.x += 0.1;
    me.cube.rotation.y += 0.1;
    me.renderer.render(me.scene, me.camera);
  }

  componentDidMount() {
    let me = this;
    let width = 500;
    let height = 500;
    me.scene = new THREE.Scene();
    me.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    me.renderer = new THREE.WebGLRenderer();
    me.renderer.setSize(width, height);
    me.refs.threeWrap.appendChild(me.renderer.domElement);

    me.geometry = new THREE.BoxGeometry(1, 1, 1);
    me.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    me.cube = new THREE.Mesh(me.geometry, me.material);
    me.scene.add(me.cube);

    me.camera.position.z = 5;

    me.ani();
  }

  render() {
    let me = this;
    return (
      <div ref={'threeWrap'} style={{ width: 800, height: 800, background: 'pink' }}>
      </div>
    )
  }
};

export default Three;
