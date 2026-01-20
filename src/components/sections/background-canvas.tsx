"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    // The subtle background effect is typically a fine noise or particle field 
    // in these brutalist minimalist websites. We'll implement a subtle floating
    // particle system that matches the "No Fear" aesthetic.
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a subtle grain/stars effect 
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
      // For dark theme, we use white particles
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Subtle rotation for organic feel
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 mix-blend-multiply"
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default BackgroundCanvas;