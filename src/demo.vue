<template>
    <div id="baseMap"></div>
</template>

<script setup>
import { onMounted } from "vue";
import {
    Cartesian3,
    Terrain,
    Viewer,
    ImageryLayer,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import {
    BigemapConfig,
    BigemapImageryProvider,
    BigemapTerrainProvider,
} from "@bigemap/cesium";
onMounted(async () => {
    // 指定离线服务器的IP和端口
    BigemapConfig.URL = "http://127.0.0.1:9000";
    try {
        const viewer = new Viewer("baseMap", {
            baseLayer: ImageryLayer.fromProviderAsync(
                // 指定离线服务器上的地图服务的Id，点击地图服务开发使用即可获取
                BigemapImageryProvider.fromId("bigemap.5uplskwy")
            ),
            // 指定离线服务器上的高程服务的Id，点击高程服务开发使用即可获取
            terrainProvider: await BigemapTerrainProvider.fromId('bigemap.5tb46ubk'),
            baseLayerPicker: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            geocoder: false,
            infoBox: false,
        });
        // 102.1695556640625, 24.51711082458496, 102.62205505371094, 25.104053497314453
        viewer.camera.setView({
            destination:Cartesian3.fromDegrees(102.1695556640625, 24.51711082458496,10000)
        })
    } catch (error) {
        console.log(error);
    }
});
</script>

<style scoped>
#baseMap {
    width: 100%;
    height: 100%;
}
</style>
