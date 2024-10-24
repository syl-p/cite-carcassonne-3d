<template>
  <primitive :object="scene" :scale="0.01"></primitive>
  <Spot v-if="scene"/>
  <LazyBakeShadows />
</template>

<script setup lang="ts">
import * as THREE from "three";
const { scene, materials } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf",
);
const { alphaMap } = await useTexture({ alphaMap: "/alpha-map.png" });

const emit = defineEmits(["select"]);
const { camera } = useTresContext();

// Apply alpha texture on material
["material_0", "wall"].forEach(name => {
  materials[name].onBeforeCompile = (shader) => {
    shader.uniforms.alphaTexture = {
      value: alphaMap,
    };
    shader.vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    ${shader.vertexShader}
  `.replace(
      `#include <uv_vertex>`,
      `#include <uv_vertex>
      vUv = uv;
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    `,
    );

    shader.fragmentShader = `
        uniform sampler2D alphaTexture;
        varying vec3 vPosition;

        ${shader.fragmentShader}
      `.replace(
      `#include <dithering_fragment>`,
      `
          // Calcul des coordonnées de la texture alpha
          vec2 textureCoords = (vPosition.xz * 0.09) + 0.5;
          vec4 textureColor = texture2D(alphaTexture, textureCoords);
          float alpha = textureColor.a;

          // Appliquer l'alpha de la texture externe sans toucher à la couleur ou à la texture
          gl_FragColor.a *= alpha;

          #include <dithering_fragment>
        `
    );
  };
})

scene.traverse((child: THREE.Object3D) => {
  if (child.isMesh && child.material) {
    child.material =
      child.name == "Terrain" ? materials["material_0"] : materials["wall"];
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener("click", (event) => {
  if (!camera.value) return;

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera.value);

  const intersects = raycaster.intersectObjects(scene.children);
  emit(
    "select",
    intersects.map((o) => o.object),
  );
});
</script>
