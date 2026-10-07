'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- Embedded GridDistortion Component ---
const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`;

function GridDistortion({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc, className = '' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planeRef = useRef(null);
  const imageAspectRef = useRef(1);
  const animationIdRef = useRef(null);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null }
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, texture => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      imageAspectRef.current = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;
      handleResize();
    });

    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;
    scene.add(plane);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const containerAspect = width / height;

      renderer.setSize(width, height);

      if (plane) {
        plane.scale.set(containerAspect, 1, 1);
      }

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);
    };

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;
    } else {
      window.addEventListener('resize', handleResize);
    }

    const mouseState = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0
    };

    const handleMouseMove = e => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    };

    const handleMouseLeave = () => {
      if (dataTexture) {
        dataTexture.needsUpdate = true;
      }
      Object.assign(mouseState, {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        vX: 0,
        vY: 0
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    handleResize();

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (!renderer || !scene || !camera) return;

      uniforms.time.value += 0.05;

      const data = dataTexture.image.data;
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
          if (distSq < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);
            data[index] += strength * 100 * mouseState.vX * power;
            data[index + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }

      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (dataTexture) dataTexture.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();

      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      planeRef.current = null;
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minWidth: '0',
        minHeight: '0'
      }}
    />
  );
}

// --- Main Footer Component ---
export default function Footer({ darkTheme = false }) {
  return (
    <footer
      className={`
        relative
        w-full
        overflow-hidden
        transition-colors
        duration-500
        ${darkTheme ? 'bg-[#0a0a0a] text-white' : 'bg-[#0a0a0a] text-white'}
      `}
    >
      {/* Interactive Grid Distortion Banner with Overlayed Text */}
      <div className="w-full min-h-screen relative pointer-events-auto flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* The 3D Grid Distortion Background */}
        <div className="absolute inset-0 z-0">
          <GridDistortion
            imageSrc="https://picsum.photos/1920/1080?grayscale"
            grid={12}
            mouse={0.2}
            strength={0.15}
            relaxation={0.9}
            className="w-full h-full opacity-45"
          />
        </div>

        {/* Overlay Content (Text & Button placed on top of distortion banner) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center justify-center my-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] max-w-4xl leading-[1.1] ">
            Designed to move things forward.
          </h2>
          <p className={`text-base sm:text-lg max-w-xl ${darkTheme ? 'text-neutral-300' : 'text-neutral-300'}`}>
            A creative studio template for brands, products, and ideas ready to move.
          </p>
          <div>
              <a
              target='_blank'
  href="https://digitalpaaji.com/contact"
  className={`cursor-pointer font-medium group inline-flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 shadow-lg w-fit mx-auto ${
    darkTheme
      ? 'bg-white text-black hover:bg-neutral-200'
      : 'bg-white text-black hover:bg-neutral-200'
  }`}
>
  <div className="relative overflow-hidden h-6 leading-6">
    <p className="group-hover:-translate-y-6 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
      Start a Project
    </p>
    <p className="absolute top-6 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
      Start a Project
    </p>
  </div>
</a>
          </div>
        </div>

        {/* Bottom copyright info inside the banner */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/40">
          <p>© {new Date().getFullYear()} Digital Paaji. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="/digitalpaaji.com" className="hover:underline">Digital Paaji</a>
            <a href="/digitalpaajiacademy.com" className="hover:underline">DP Academy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}