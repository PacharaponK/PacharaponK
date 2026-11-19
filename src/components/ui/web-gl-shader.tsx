"use client"

import { useEffect, useRef, type RefObject } from "react"
import * as THREE from "three"

interface WebGLShaderProps {
  className?: string
  sectionRef: RefObject<HTMLElement | null>
}

export function WebGLShader({ className = "fixed top-0 left-0 w-full h-full block", sectionRef }: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const refs: {
      scene: THREE.Scene | null
      camera: THREE.OrthographicCamera | null
      renderer: THREE.WebGLRenderer | null
      mesh: THREE.Mesh | null
      uniforms: { [key: string]: THREE.IUniform } | null
      animationId: number | null
    } = {
      scene: null,
      camera: null,
      renderer: null,
      mesh: null,
      uniforms: null,
      animationId: null,
    }

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.06 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.06 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.06 / abs(p.y + sin((bx + time) * xScale) * yScale);

        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas })
      refs.renderer.setClearColor(new THREE.Color(0x000000))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: new THREE.Vector2() },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, -1.0, 0.0,
        -1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio, 1)
      if (canvas.width !== Math.floor(width * pixelRatio) || canvas.height !== Math.floor(height * pixelRatio)) {
        refs.renderer.setDrawingBufferSize(width, height, pixelRatio)
      }
      refs.uniforms.resolution.value.set(canvas.width, canvas.height)
    }

    const stop = () => {
      if (refs.animationId !== null) cancelAnimationFrame(refs.animationId)
      refs.animationId = null
      window.removeEventListener("resize", handleResize)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        stop()
      } else if (refs.animationId === null) {
        if (!refs.renderer) initScene()
        handleResize()
        window.addEventListener("resize", handleResize)
        refs.animationId = requestAnimationFrame(animate)
      }
    })
    observer.observe(section)

    return () => {
      observer.disconnect()
      stop()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [sectionRef])

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  )
}
