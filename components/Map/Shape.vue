<template>
    <TresMesh v-if="shape">
        <TresExtrudeGeometry :args="[shape, options]" ref="geometry" />
        <TresMeshStandardMaterial :color="color"/>
    </TresMesh>
</template>

<script setup lang="ts">
    import * as THREE from "three"
    const geometry = ref()
    const {coordinates, color, depth} = defineProps(["coordinates", "color", "depth"]);

    const options = {
      curveSegments: 1,
      depth: depth ? 0.05 * depth : 0,
      bevelEnabled: false
    }

    function genShape(points, center) {
        let shape = new THREE.Shape()
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const pointNormalized = GpsRelativePosition(point, center)
    
          if(i === 0) {
            shape.moveTo(pointNormalized[0], pointNormalized[1])
          } else {
            shape.lineTo(pointNormalized[0], pointNormalized[1])
          }
        }
        return shape
    }

    let shape = computed(() => {
      let shape = null
      const holes = []
      for (let i = 0; i < coordinates.length; i++) {
        const shapeIte = genShape(coordinates[i], CENTER);
        if(i === 0) {
          shape = shapeIte
        } else {
          holes.push(shapeIte)
        }
      }

      return shape
    })

    onMounted(() => {
      geometry.value.computeBoundingBox()
      geometry.value.rotateX(Math.PI/2)
      geometry.value.rotateZ(Math.PI)
      geometry.value.rotateY(- Math.PI/2)
    })
</script>