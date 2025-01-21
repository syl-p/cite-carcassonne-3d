<template>
  <primitive :object="scene" :scale="0.01"></primitive>
  <Spot v-if="scene" />
</template>

<script setup lang="ts">
import * as THREE from "three";
const { scene, materials } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf",
  { draco: true },
);

const currentElementMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const { alphaMap } = await useTexture({ alphaMap: "/alpha-map.png" });
const emit = defineEmits(["select"]);
const { page } = useContent();

// Apply alpha texture on material
["material_0.001", "wall"].forEach((name) => {
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
          vec2 textureCoords = (vPosition.xz * 0.1) + 0.5;
          vec4 textureColor = texture2D(alphaTexture, textureCoords);
          float alpha = textureColor.a;

          // Appliquer l'alpha de la texture externe sans toucher à la couleur ou à la texture
          gl_FragColor.a *= alpha;

          #include <dithering_fragment>
        `,
    );
  };
});

// scene.traverse((child: THREE.Mesh) => {
//   if (child.isMesh && child.material) {
//     child.material =
//       child.name == "Terrain" ? materials["material_0.001"] : materials["wall"];
//   }
// });

/*watchEffect(() => {
  if (page.value.title) {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.name === page.value.object_name) {
          child.material = currentElementMaterial;
        } else {
          child.material =
            child.name == "Terrain"
              ? materials["material_0"]
              : materials["wall"];
        }
      }
    });
  } else {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material =
          child.name == "Terrain" ? materials["material_0"] : materials["wall"];
      }
    });
  }
});*/
</script>
