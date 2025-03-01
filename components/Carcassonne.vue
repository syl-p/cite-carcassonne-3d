<template>
  <primitive :object="scene" :scale="0.01"></primitive>
  <Spot v-if="scene" />
</template>

<script setup lang="ts">
const { scene, materials } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf",
  { draco: true },
);

const { alphaMap } = await useTexture({ alphaMap: "/alpha-map.png" });
const emit = defineEmits(["select"]);

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
          vec2 textureCoords = (vPosition.xz * 0.115) + 0.5;
          vec4 textureColor = texture2D(alphaTexture, textureCoords);
          float alpha = textureColor.a;

          // Appliquer l'alpha de la texture externe sans toucher à la couleur ou à la texture
          gl_FragColor.a *= alpha;

          #include <dithering_fragment>
        `,
    );
  };
});
</script>
