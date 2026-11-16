import { useEffect, useRef } from "react";

export function FleetCanvas({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let stop = false;
    let dispose = () => {};

    void import("three").then((THREE) => {
      if (stop || !host.current) return;
      const root = host.current;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#1c1416");
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
      camera.position.set(4.2, 2.1, 5.4);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      root.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight("#f6f1ee", 0.55));
      const key = new THREE.DirectionalLight("#fff7f6", 1.4);
      key.position.set(4, 6, 3);
      scene.add(key);
      const rim = new THREE.PointLight("#9b1b2e", 8, 12);
      rim.position.set(-2, 1.4, -1);
      scene.add(rim);

      const ground = new THREE.Mesh(
        new THREE.CircleGeometry(6, 48),
        new THREE.MeshStandardMaterial({ color: "#2a1c1f", roughness: 0.9 }),
      );
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      const rig = new THREE.Group();
      scene.add(rig);

      const bodyMat = new THREE.MeshStandardMaterial({ color: "#f4ece8", roughness: 0.45, metalness: 0.05 });
      const redMat = new THREE.MeshStandardMaterial({ color: "#9b1b2e", roughness: 0.4, metalness: 0.1 });
      const darkMat = new THREE.MeshStandardMaterial({ color: "#24181a", roughness: 0.6 });
      const glass = new THREE.MeshStandardMaterial({ color: "#c9d4d8", roughness: 0.15, metalness: 0.2 });

      // Van Body Group
      const van = new THREE.Group();
      const hull = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.15, 1.15), bodyMat);
      hull.position.y = 0.95;
      van.add(hull);
      const cab = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 1.12), bodyMat);
      cab.position.set(1.35, 0.85, 0);
      van.add(cab);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 1.18), redMat);
      stripe.position.y = 0.72;
      van.add(stripe);
      const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.9), glass);
      windshield.position.set(1.78, 1.0, 0);
      van.add(windshield);
      
      const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.16, 20);
      for (const x of [-0.85, 0.95]) {
        const wheel = new THREE.Mesh(wheelGeo, darkMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, 0.28, 0.62);
        van.add(wheel);
        const wheel2 = wheel.clone();
        wheel2.position.z = -0.62;
        van.add(wheel2);
      }
      van.position.x = -0.4;
      rig.add(van);

      // Wheelchair Group (Dynamic Moving Model)
      const chair = new THREE.Group();
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.5), redMat);
      seat.position.y = 0.62;
      chair.add(seat);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.5), redMat);
      back.position.set(-0.24, 0.86, 0);
      chair.add(back);
      const big = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 10, 24), darkMat);
      big.position.set(0, 0.3, 0.28);
      chair.add(big);
      const big2 = big.clone();
      big2.position.z = -0.28;
      chair.add(big2);
      chair.position.set(1.7, 0, 0.15);
      rig.add(chair);

      // Stretcher Group
      const stretcher = new THREE.Group();
      const deck = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.48), bodyMat);
      deck.position.y = 0.7;
      stretcher.add(deck);
      stretcher.position.set(-0.2, 0, -1.55);
      rig.add(stretcher);

      const resize = () => {
        const w = root.clientWidth || 640;
        const h = root.clientHeight || 420;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(root);

      let frame = 0;
      let clock = new THREE.Clock();
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const elapsedTime = clock.getElapsedTime();
        
        // Complex 3D movements: Rig rotates while wheelchair oscillates in and out of the van lift
        rig.rotation.y += 0.003;
        chair.position.x = 1.7 + Math.sin(elapsedTime * 1.5) * 0.4;
        chair.rotation.y = Math.cos(elapsedTime * 1.5) * 0.2;

        renderer.render(scene, camera);
      };
      tick();

      dispose = () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      stop = true;
      dispose();
    };
  }, []);

  return (
    <div ref={host} className={`min-h-72 overflow-hidden bg-ink ${className}`} aria-hidden="true" />
  );
}