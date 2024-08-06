<template>
    <TresMesh :geometry="geometry" receive-shadow cast-shadow>
        <TresMeshStandardMaterial color="gray" wireframe/>
    </TresMesh>
</template>

<script setup lang="ts">
    import * as THREE from "three"
    import * as GeoTIFF from "geotiff";
    const rawTiff = await GeoTIFF.fromUrl("./terrain.tif")
    const tiffImage = await rawTiff.getImage()

    const start = [2.1673611111111111,43.1381944444444514]
    const end = [2.4331944444444442,43.3237500000000040]

    let leftBottom = GpsRelativePosition(start, CENTER)
    let rightTop = GpsRelativePosition(end, CENTER)
    let x = Math.abs(leftBottom[0]-rightTop[0])
    let y = Math.abs(leftBottom[1]-rightTop[1])

    const data = await tiffImage.readRasters(
                {width: Math.floor(x), height: Math.floor(y),
                  resampleMethod: 'bilinear', interleave: true})

    const geometry = new THREE.PlaneGeometry(x, y, x-1 , y-1)
    for (let i = 0; i < data.length; i++) {
        const el = data[i];
        geometry.getAttribute('position').setZ(i, - (el as number/30))
        geometry.getAttribute('position').needsUpdate = true
    }


    onMounted(() => {
      geometry.computeBoundingBox()
      geometry.rotateX(Math.PI/2)
      geometry.rotateZ(Math.PI)
      geometry.rotateY(- Math.PI/2)
    })
</script>