/* ============================================================
   NO RULES SOUND — LOGO 3D
   Estrude il logotipo NRS (dai contorni reali del font Chopsic,
   vedi js/logo-glyphs.js) in una mesh 3D che ruota lentamente
   nella nav. Usa Three.js da CDN (nessuna build necessaria).

   Tutto il modulo è avvolto in try/catch con import dinamico:
   se il CDN non è raggiungibile, WebGL non è supportato, o
   qualsiasi altra cosa fallisce, non succede nulla e resta
   visibile il normale logo testuale "NRS" (con il suo glitch).
   La classe "has-3d-logo" (che nasconde il testo) viene aggiunta
   solo DOPO il primo frame renderizzato con successo.
   ============================================================ */
(async function () {
  try {
    const DATA = window.NRS_LOGO_GLYPHS;
    const canvas = document.getElementById("logo3d");
    const wrap = canvas && canvas.closest(".nav__logo");
    if (!DATA || !canvas || !wrap) return;
    if (!window.WebGLRenderingContext) return;

    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function parseGlyphToShapePath(shapePath, d, offsetX) {
      const tokens = d.match(/[MLQZVH]|-?[0-9]*\.?[0-9]+(?:e-?\d+)?/g);
      if (!tokens) return;
      let i = 0;
      let cur = { x: 0, y: 0 };
      while (i < tokens.length) {
        const cmd = tokens[i++];
        if (cmd === "M") {
          const x = parseFloat(tokens[i++]) + offsetX, y = parseFloat(tokens[i++]);
          shapePath.moveTo(x, y); cur = { x, y };
        } else if (cmd === "L") {
          const x = parseFloat(tokens[i++]) + offsetX, y = parseFloat(tokens[i++]);
          shapePath.lineTo(x, y); cur = { x, y };
        } else if (cmd === "Q") {
          const cx = parseFloat(tokens[i++]) + offsetX, cy = parseFloat(tokens[i++]);
          const x = parseFloat(tokens[i++]) + offsetX, y = parseFloat(tokens[i++]);
          shapePath.quadraticCurveTo(cx, cy, x, y); cur = { x, y };
        } else if (cmd === "H") {
          const x = parseFloat(tokens[i++]) + offsetX;
          shapePath.lineTo(x, cur.y); cur = { x, y: cur.y };
        } else if (cmd === "V") {
          const y = parseFloat(tokens[i++]);
          shapePath.lineTo(cur.x, y); cur = { x: cur.x, y };
        }
        // "Z" non richiede azione: ShapePath chiude i subpath in toShapes()
      }
    }

    function buildGeometry() {
      const shapePath = new THREE.ShapePath();
      DATA.glyphs.forEach((g) => parseGlyphToShapePath(shapePath, g.d, g.x));
      const shapes = shapePath.toShapes(true);
      if (!shapes || !shapes.length) throw new Error("Nessuna shape generata dal logotipo");
      const geometry = new THREE.ExtrudeGeometry(shapes, {
        depth: 220,
        bevelEnabled: true,
        bevelThickness: 30,
        bevelSize: 20,
        bevelSegments: 3,
        curveSegments: 10,
      });
      geometry.computeBoundingBox();
      const bb = geometry.boundingBox;
      const cx = (bb.max.x + bb.min.x) / 2;
      const cy = (bb.max.y + bb.min.y) / 2;
      const cz = (bb.max.z + bb.min.z) / 2;
      geometry.translate(-cx, -cy, -cz);
      const width = bb.max.x - bb.min.x;
      if (!width) throw new Error("Larghezza geometria non valida");
      geometry.scale(1.7 / width, 1.7 / width, 1.7 / width);
      return geometry;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 10);
    camera.position.set(0, 0, 2.5);

    const geometry = buildGeometry();
    const material = new THREE.MeshStandardMaterial({
      color: 0xff2a2a,
      metalness: 0.45,
      roughness: 0.32,
      emissive: 0x300808,
      emissiveIntensity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0x402020, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(2, 2.2, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff5a5a, 1.1);
    rim.position.set(-2.2, -1.2, -1.8);
    scene.add(rim);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    let pointerX = 0;
    wrap.addEventListener("pointermove", (e) => {
      const rect = wrap.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
    });
    wrap.addEventListener("pointerleave", () => { pointerX = 0; });

    // Primo frame: solo se va a buon fine mostriamo il canvas al posto del testo.
    renderer.render(scene, camera);
    wrap.classList.add("has-3d-logo");

    let rot = 0;
    let running = true;
    function animate() {
      if (!running) return;
      if (!reduceMotion) {
        rot += 0.01;
        mesh.rotation.y = rot + pointerX * 0.6;
        mesh.rotation.x = Math.sin(rot * 0.6) * 0.1;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) requestAnimationFrame(animate);
    });
  } catch (err) {
    // Qualsiasi errore (CDN irraggiungibile, WebGL assente, parsing...):
    // nessuna azione. Il logo testuale con glitch resta l'unico visibile.
    if (window.console && console.warn) console.warn("Logo 3D non disponibile:", err);
  }
})();
