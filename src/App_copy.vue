<template>
  <div id="myMap"></div>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<script setup>
import {
  BigemapConfig,
  BigemapImageryProvider,
  BigemapTerrainProvider,
} from "@bigemap/cesium";
import {
  Cartesian3,
  Terrain,
  Viewer,
  ImageryLayer,
  Ion,
} from "cesium";
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted } from "vue";
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4OWQ2ZGQ4YS03ZDliLTQzYmQtOWE2NC00NDZmNzZkZGY1NDMiLCJpZCI6Mjc4NjUwLCJpYXQiOjE3NDAzOTA3NDJ9.qWmrZNrX60GOdR9wdhlP4NQYzkafz54orDQghP4ymGc";

// window.CESIUM_BASE_URL = "/";

// ------------------------- 全局变量区 -------------------------
let viewer;
let terrainProvider;

// 轨迹相关全局变量
const newTrailSettings = {
  color: Cesium.Color.BLUE.withAlpha(0.6),
  glowPower: 0.3,
  trailWidth: 8.0
};
let trailEntity;
let newTrailPositions = [];
let trailPoints = []; // 存储点实体引用
const MAX_TRAIL_POINTS = 50; // 最大轨迹点数
let lastUpdateTime = 0;
const UPDATE_INTERVAL = 0.5; // 更新间隔（秒）


//初始位置
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  89.5,
  20.4,
  110.4,
  50.2
);

const height = 300;
const straightFlyTime = 10;
const start = Cesium.JulianDate.fromDate(new Date(2025, 2, 25, 16));
const center = Cesium.Cartesian3.fromDegrees(117.1607235, 40.6205, height);
const stop = Cesium.JulianDate.addSeconds(
  start,
  straightFlyTime,
  new Cesium.JulianDate()
);
const radius = 50; // 盘旋半径（米）
const airplaneStartPosition = Cesium.Cartesian3.fromDegrees(
  117.1597229,
  40.6215,
  height
);
const airplaneEndPosition = new Cesium.Cartesian3(
  -2213177.9684422547,
  4313720.740207525,
  4130753.4165029027
);

const fireTruckDriveTime = 15;
const fireTruckStartPosition = new Cesium.Cartesian3.fromDegrees(
  117.16298601043349,
  40.619906185074505,
  227.39733325423546
);
const fireTruckMidPosition1 = new Cesium.Cartesian3.fromDegrees(
  117.16235073319166,
  40.620028415425686,
  230.94459042735912
);
const fireTruckMidPosition2 = new Cesium.Cartesian3.fromDegrees(
  117.161946583731,
  40.62062206129788,
  235.37710577624964
);
const fireTruckMidPosition3 = new Cesium.Cartesian3.fromDegrees(
  117.16110643315945,
  40.62050736943747,
  235.47685338437446
);
const fireTruckEndPosition = Cesium.Cartesian3.fromDegrees(
  117.16054505224896,
  40.62081570297024,
  240.24193195159992
);
const fireTruckPositions = [
  fireTruckStartPosition,
  fireTruckMidPosition1,
  fireTruckMidPosition2,
  fireTruckMidPosition3,
  fireTruckEndPosition,
];
const fireTruckPathKeyNum = [10, 10, 10, 10];
let fireTruckPath = [];

const sandbagSetting = {
  sandbagNum: 5,
  startPosition: Cesium.Cartesian3.fromDegrees(
    117.16027941013309,
    40.62096736712664,
    238.7861852060524
  ),
  endPosition: Cesium.Cartesian3.fromDegrees(
    117.15985624228456,
    40.62064822370052,
    244.51231461650886
  ),
};
let sandbags = [];
let isSetSandbags = [];

const firefighterStartPosition = new Cesium.Cartesian3.fromDegrees(
  117.1604846493126,
  40.620896897084776,
  239.62435972970988
);
const firefighterEndPosition = new Cesium.Cartesian3.fromDegrees(
  117.16054830594268,
  40.62051337201442,
  239.07359578708287
);
let firefighterPath = [];
//初始化消防员路径
const firefighterPositions = [
  firefighterStartPosition,
  sandbagSetting.startPosition,
  sandbagSetting.endPosition,
  firefighterEndPosition,
];
const firefighterPathKeyNum = [10, 5, 10];

onMounted(async () => {
  BigemapConfig.URL = "http://127.0.0.1:9000";
  viewer = new Cesium.Viewer("cesiumContainer", {
    baseLayer: ImageryLayer.fromProviderAsync(
      // 指定离线服务器上的地图服务的Id，点击地图服务开发使用即可获取
      BigemapImageryProvider.fromId("bigemap.5uplskwy")
    ),
    // 指定离线服务器上的高程服务的Id，点击高程服务开发使用即可获取
    terrainProvider: await BigemapTerrainProvider.fromId('bigemap.5tb46ubk'),
    baseLayerPicker: false,
    infoBox: false, //信息窗口
    geocoder: false, //查询按钮
    homeButton: false, //home按钮
    sceneModePicker: false, //查看器显示模式
    baseLayerPicker: false, //图层显示器
    navigationHelpButton: false, //帮助按钮
    animation: false, //播放动画
    timeline: true, //时间轴
    fullscreenButton: false, //全屏按钮
    shadows: true,
    terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY,
  });
  viewer.cesiumWidget.creditContainer.style.display = "none";
  getPosition(viewer);

  // 加载地形和影像
  addWorldTerrainAndImageryAsync();

});

// 异步加载世界地形和纹理数据
BigemapConfig.URL = "http://127.0.0.1:9000";
const addWorldTerrainAndImageryAsync = async () => {
  try {

    // ------------------------- 初始化地形服务 -------------------------
    terrainProvider = new Cesium.CesiumTerrainProvider({
      url: Cesium.IonResource.fromAssetId(3165832),
      requestWaterMask: true,
      requestVertexNormals: true
    });

    // 必须等待服务就绪
    await terrainProvider.readyPromise;
    console.log("地形服务状态:", terrainProvider.ready); // true



    terrainProvider = await Cesium.CesiumTerrainProvider.fromIonAssetId(
      3165832
    );


    // 添加服务状态验证
    console.log("地形服务是否可用:", terrainProvider.ready); // 应为 true
    console.log("地形服务错误信息:", terrainProvider.error); // 应为 undefined
    console.log("地形服务元数据:", terrainProvider.availability);

    //   let url1 = "http://127.0.0.1:9000/bigemap.5uplskwy/tiles/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3VzX2FmMzhyenIxIiwiYSI6IjA0NzM5NWZycjluM2xoamNvNWJuN3lhMTcifQ.grRvHTYpTr-59yDrZrjuMA"
    //  // let url2 = "http://127.0.0.1:9000/v3/bigemap.5tb46ubk.json?access_token=pk.eyJ1IjoiY3VzX2FmMzhyenIxIiwiYSI6IjA0NzM5NWZycjluM2xoamNvNWJuN3lhMTcifQ.grRvHTYpTr-59yDrZrjuMA"//viewer.imageryLayers.removeAll();
    //           viewer.imageryLayers.addImageryProvider(
    //               new Cesium.UrlTemplateImageryProvider({
    //                   url:url1,

    //               })
    //           );






    //----------------------------------------获取高程值---------------------------------------------------
    viewer.screenSpaceEventHandler.setInputAction(function (e) {
      var cartesian3 = viewer.scene.globe.pick(
        viewer.camera.getPickRay(e.endPosition),
        viewer.scene
      );
      if (!Cesium.defined(cartesian3)) {
        document.getElementById("position").innerHTML = "";
        return;
      }
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian3);
      document.getElementById("position").innerHTML =
        "高程值:" + cartographic.height.toFixed(0);
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //-------------------------------------------------------------------
    viewer.terrainProvider = terrainProvider; // 设置地形提供者
    viewer.scene.globe.enableLighting = true; // 启用光照效果

    const imageryProvider = viewer.imageryLayers.addImageryProvider(
      await Cesium.IonImageryProvider.fromAssetId(3165931)
    );

    // 等待地形服务完全就绪
    await terrainProvider.readyPromise;
    console.log("地形服务是否可用:", terrainProvider.ready); // true
    console.log("最大细节级别:", terrainProvider.availability.maximumLevel);

    addEntitiesAndparticleSystemAsync();

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        102.1695556640625, 24.51711082458496, 10000
      ),
      orientation: {
        heading: Cesium.Math.toRadians(0), // 相机的朝向（弧度）
        pitch: Cesium.Math.toRadians(-45), // 相机的俯仰角（弧度）
        roll: 0.0, // 相机的翻滚角（弧度）
      },
    });

    // 强制等待就绪
    await terrainProvider.readyPromise;

    // --------------- 服务状态验证 ---------------
    console.log("地形服务是否可用:", terrainProvider.ready);
    console.log("可用级别:", terrainProvider.availability._maximumLevel);

    // --------------- 高程采样测试 ---------------
    const testPoint = Cesium.Cartographic.fromDegrees(117.160, 40.620);
    const [sampled] = await Cesium.sampleTerrainMostDetailed(terrainProvider, [testPoint]);
    console.log('测试点高程:', sampled.height);

    // --------------- 设置地形 ---------------
    viewer.terrainProvider = terrainProvider;
    viewer.scene.globe.enableLighting = true;


    window.debugViewer = viewer;
  } catch (error) {
    console.error("Failed to add world terrain:", error);
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
  }
};

function initViewerTime() {
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = Cesium.JulianDate.addHours(
    stop,
    1,
    new Cesium.JulianDate()
  ); // 延长总时间
  viewer.clock.currentTime = start.clone();
  viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED; // 允许时间无限推进
  viewer.clock.multiplier = 1;
  viewer.clock.shouldAnimate = true;
}

//添加模型和粒子系统
const addEntitiesAndparticleSystemAsync = async () => {
  initViewerTime();

  await initPath();

  // 添加飞机
  const airplane = viewer.entities.add({
    position: new Cesium.CallbackProperty(airplaneTrajectory, false),
    model: {
      uri: "/Assets/models/fireHelecopter2.glb",
      minimumPixelSize: 128,
      scale: 0.1,
    },
  });
  airplane.orientation = new Cesium.VelocityOrientationProperty(
    airplane.position
  );
  //viewer.trackedEntity = airplane;

  //雨点粒子系统
  var rainParticleSystem = new Cesium.ParticleSystem({
    image: "/Assets/Images/particle/water.png",
    colorBlendMode: Cesium.ColorBlendMode.MIX,
    color: Cesium.Color.BLUE.withAlpha(0.5),
    startScale: 0.1,
    endScale: 0.2,
    minimumParticleLife: 2.0,
    maximumParticleLife: 5.0,
    minimumSpeed: 5.0,
    maximumSpeed: 10.0,
    imageSize: new Cesium.Cartesian2(20, 20),
    emissionRate: 50,
    lifetime: 30,
    emitter: new Cesium.CircleEmitter(30.0),
    sizeInMeters: true,
  });
  viewer.scene.primitives.add(rainParticleSystem);

  const fireTruck = viewer.entities.add({
    position: new Cesium.CallbackProperty(fireTruckTrajectory, false),
    model: {
      uri: "/Assets/models/fire_truck.glb",
      scale: 0.4,
    },
  });
  fireTruck.orientation = new Cesium.VelocityOrientationProperty(
    fireTruck.position
  );

  var fireParticleSystem = new Cesium.ParticleSystem({
    image: "/Assets/Images/particle/fire3.png",
    colorBlendMode: Cesium.ColorBlendMode.MIX,
    //color: new Cesium.Color(234, 115, 35, 0.5),
    startScale: 0.7,
    endScale: 0.1,
    minimumParticleLife: 2.0,
    maximumParticleLife: 5.0,
    minimumSpeed: 5.0,
    maximumSpeed: 10.0,
    imageSize: new Cesium.Cartesian2(15, 25),
    emissionRate: 15,
    lifetime: 30,
    emitter: new Cesium.CircleEmitter(7.0),
    sizeInMeters: true,
  });
  fireParticleSystem.modelMatrix = Cesium.Matrix4.fromTranslation(
    Cesium.Cartesian3.fromDegrees(
      117.16074624765609,
      40.62053322927935,
      237.26081456393044
    )
  );
  viewer.scene.primitives.add(fireParticleSystem);

  //添加隔离带
  for (let i = 0; i < sandbagSetting.sandbagNum; i++) {
    sandbags.push(
      new Cesium.Entity({
        model: {
          uri: "/Assets/models/sandbag.glb",
          scale: 10.0,
        },
      })
    );
    isSetSandbags.push(false);
  }

  // 添加消防员
  const firefighter = viewer.entities.add({
    position: new Cesium.CallbackProperty(firefighterTrajectory, false),
    model: {
      uri: "/Assets/models/firefighter.glb",
      scale: 0.05,
    },
  });
  firefighter.orientation = new Cesium.VelocityOrientationProperty(
    firefighter.position
  );

  viewer.scene.preUpdate.addEventListener(function (scene, time) {
    rainParticleSystem.modelMatrix = computeModelMatrix(airplane, time);

    // Account for any changes to the emitter model matrix.
    rainParticleSystem.emitterModelMatrix = computeEmitterModelMatrix();

    const flyTime = Cesium.JulianDate.secondsDifference(time, start);
    if (flyTime <= straightFlyTime) {
      rainParticleSystem.show = false;
    } else {
      rainParticleSystem.show = true;
    }
  });
  //-------------------------zl-------test-------new_car----------------？？？？？----------------
  // ------------------------- 添加新消防车 -------------------------
  // 添加新消防车（确保在 viewer 初始化之后）
  const newFireTruck = viewer.entities.add({
    position: new Cesium.CallbackProperty(newFireTruckTrajectory, false),
    model: {
      uri: "/Assets/models/fire_truck.glb",
      scale: 0.4,
      color: Cesium.Color.BLUE // 模型颜色设为蓝色
    }
  });

  // //添加隔离素材---------
  // const gelibox = viewer.entities.add({
  //   position: new Cesium.CallbackProperty(newFireTruckTrajectory, false),
  //   model: {
  //     uri: "/Assets/models/Shadow_Transparent.glb",
  //     scale: 0.4,
  //     color: Cesium.Color.RED // 模型颜色设为蓝色
  //   }
  // });

  // 添加尾迹实体
  // newFireTruckPath.forEach((pos, index) => {
  //     viewer.entities.add({
  //       position: new Cesium.CallbackProperty(() => newTrailPositions, false), // 动态绑定位置数组,
  //       point: { pixelSize: 10, color: Cesium.Color.BLUE },
  //       //label: { text: `NewPath-${index}` }
  //     });
  //   });

  // 修正轨迹实体创建参数
  // trailEntity = viewer.entities.add({
  //   polyline: {
  //     positions: new Cesium.CallbackProperty(() => newTrailPositions, false),
  //     width: newTrailSettings.trailWidth, // 使用预定义宽度
  //     clampToGround: true,
  //     material: new Cesium.PolylineGlowMaterialProperty({
  //       color: newTrailSettings.color,
  //       glowPower: newTrailSettings.glowPower // 使用预定义发光强度
  //     })
  //   }
  // });

  // 绑定位置更新事件
  // newFireTruck.definitionChanged.addEventListener(() => {
  //   const currentPos = newFireTruck.position.getValue(viewer.clock.currentTime);
  //   updateNewFireTruckTrail(currentPos);
  // });


  //新消防车运动方向
  newFireTruck.orientation = new Cesium.VelocityOrientationProperty(
    newFireTruck.position
  );

  // viewer.scene.primitives.add(newTrailPrimitive);
  viewer.scene.postUpdate.addEventListener(() => {
    // // 控制更新频率(use time)
    const currentTime = Cesium.JulianDate.toDate(viewer.clock.currentTime).getTime() / 1000;
    if (currentTime - lastUpdateTime > UPDATE_INTERVAL) {
      const currentPosition = newFireTruck.position.getValue(viewer.clock.currentTime);
      updateNewFireTruckTrail(currentPosition);
      lastUpdateTime = currentTime;
    }

    // 使用距离检测代替时间间隔
    // const currentPosition = newFireTruck.position.getValue(viewer.clock.currentTime);
    // if (newTrailPositions.length === 0 || 
    //     Cesium.Cartesian3.distance(currentPosition, newTrailPositions[newTrailPositions.length - 1]) > 500.0) { // 5米间距
    //     updateNewFireTruckTrail(currentPosition);
    // }
  });

};

//计算粒子发射器相对位置（相对粒子系统）
function computeEmitterModelMatrix() {
  const emitterModelMatrix = new Cesium.Matrix4();
  const translation = new Cesium.Cartesian3();
  const rotation = new Cesium.Quaternion();
  let hpr = new Cesium.HeadingPitchRoll();
  const trs = new Cesium.TranslationRotationScale();

  hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 180.0, hpr);
  trs.translation = Cesium.Cartesian3.fromElements(0.0, 0.0, -5.0, translation);
  trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

  return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
}

//计算粒子位置
function computeModelMatrix(entity, time) {
  return entity.computeModelMatrix(time, new Cesium.Matrix4());
}

//------------------------------------------------------模型运行轨迹-------------------------------------------------------‘’

async function initPath() {
  const positions = [firefighterPositions, fireTruckPositions];
  const keyNum = [firefighterPathKeyNum, fireTruckPathKeyNum];
  const paths = [firefighterPath, fireTruckPath];
  getPath(positions, keyNum).then((updatedPositions) => {
    let pathPositionsOffset = 0;
    for (let i = 0; i < positions.length; i++) {
      let pathPositionsNum = 0;
      for (let j = 0; j < keyNum[i].length; j++) {
        pathPositionsNum += keyNum[i][j];
      }
      const result = updatedPositions.slice(
        pathPositionsOffset,
        pathPositionsOffset + pathPositionsNum
      );
      for (let k = 0; k < result.length; k++) {
        paths[i].push(result[k]);
      }
      pathPositionsOffset += pathPositionsNum;
    }
  });

  //------------------------------ 在 initPath 函数中初始化新路径 -----------------------------

  try {

    // ------------------------- 新消防车路径初始化 -------------------------
    const newPathPoints = [];
    for (let i = 0; i < newFireTruckSettings.positions.length - 1; i++) {
      for (let k = 0; k < newFireTruckSettings.pathKeyNum[i]; k++) {
        const pos = Cesium.Cartesian3.lerp(
          newFireTruckSettings.positions[i],
          newFireTruckSettings.positions[i + 1],
          k / newFireTruckSettings.pathKeyNum[i],
          new Cesium.Cartesian3()
        );
        newPathPoints.push(pos);
      }
    }

    // 等待地形采样完成
    // 修改地形采样部分
    const cartographicPositions = newPathPoints.map(p => Cesium.Cartographic.fromCartesian(p));
    const sampledCarto = await Cesium.sampleTerrainMostDetailed(terrainProvider, cartographicPositions);
    newFireTruckPath = sampledCarto.map(cartographic =>
      Cesium.Cartesian3.fromRadians(
        cartographic.longitude,
        cartographic.latitude,
        cartographic.height
      )
    );
    console.log("新消防车有效路径点数:", newFireTruckPath.length);

    // 路径有效性检查
    if (newFireTruckPath.length < 2) {
      throw new Error("新消防车路径点不足");
    }
    newFireTruckPath.forEach((pos, index) => {
      viewer.entities.add({
        position: pos,
        //point: { pixelSize: 10, color: Cesium.Color.RED },
        //label: { text: `NewPath-${index}` }
      });
    });
  } catch (error) {
    console.error("路径初始化失败:", error);
    newFireTruckPath = [];
  }
}


function airplaneTrajectory(time, result) {
  const flyTime = Cesium.JulianDate.secondsDifference(time, start);

  if (flyTime <= straightFlyTime) {
    return Cesium.Cartesian3.lerp(
      airplaneStartPosition,
      airplaneEndPosition,
      flyTime / straightFlyTime, // 0到1的插值比例
      result
    );
  }
  const centerCartographic = Cesium.Cartographic.fromCartesian(center);
  const angularSpeed = (2 * Cesium.Math.PI) / 10; // 角速度（弧度/秒）

  // 计算经过的盘旋时间
  const circlingTime = flyTime - straightFlyTime;

  // 生成东北方向偏移量
  const phi = angularSpeed * (circlingTime - 5);
  const cosPhi = radius * Math.cos(phi);
  const sinPhi = radius * Math.sin(phi);
  const localPosition = new Cesium.Cartesian4(cosPhi, sinPhi, 0, 1);

  const vec4 = Cesium.Matrix4.multiplyByVector(
    makeTBNFromCartographic(center, centerCartographic),
    localPosition,
    new Cesium.Cartesian3()
  );

  return new Cesium.Cartesian3(vec4.x, vec4.y, vec4.z);

  // 在Cartographic空间进行偏移
  const offsetCartographic = new Cesium.Cartographic(
    centerCartographic.longitude + Cesium.Math.toRadians(cosPhi / 111320), // 1度约等于111320米
    centerCartographic.latitude + Cesium.Math.toRadians(sinPhi / 111320),
    centerCartographic.height
  );

  // 将偏移后的Cartographic转换为Cartesian
  return Cesium.Ellipsoid.WGS84.cartographicToCartesian(
    offsetCartographic,
    result
  );
}

function makeTBNFromCartographic(CartesianPosition, CartographicPosition) {
  const phi = CartographicPosition.longitude;
  const theta = CartographicPosition.latitude;
  const normal = new Cesium.Cartesian3(
    Math.cos(theta) * Math.cos(phi),
    Math.cos(theta) * Math.sin(phi),
    Math.sin(theta)
  );
  //const normal = Cesium.Ellipsoid.WGS84.geodeticSurfaceNormal(position);
  const tangent = Cesium.Cartesian3.cross(
    new Cesium.Cartesian3(0, 0, 1),
    normal,
    new Cesium.Cartesian3()
  );
  const bitangent = Cesium.Cartesian3.cross(
    normal,
    tangent,
    new Cesium.Cartesian3()
  );
  return new Cesium.Matrix4(
    tangent.x,
    bitangent.y,
    normal.z,
    CartesianPosition.x,
    tangent.y,
    bitangent.y,
    normal.y,
    CartesianPosition.y,
    tangent.z,
    bitangent.z,
    normal.z,
    CartesianPosition.z,
    0,
    0,
    0,
    0
  );
}

function fireTruckTrajectory(time, result) {
  const currentTime = Cesium.JulianDate.secondsDifference(time, start);
  const moveTime = fireTruckDriveTime / 40;
  if (currentTime < moveTime * (fireTruckPath.length - 1)) {
    const currentSubPath = Math.floor(currentTime / moveTime);
    const currentMoveTime = currentTime % moveTime;
    return Cesium.Cartesian3.lerp(
      fireTruckPath[currentSubPath],
      fireTruckPath[currentSubPath + 1],
      currentMoveTime / moveTime, // 0到1的插值比例
      new Cesium.Cartesian3()
    );
  }
  return fireTruckEndPosition;
}

function firefighterTrajectory(time, result) {
  const currentTime = Cesium.JulianDate.secondsDifference(time, start);
  if (currentTime < fireTruckDriveTime) {
    return new Cesium.Cartesian3(1, 1, 1);
  }
  //消防员从path中一个点到下一个点用时5秒
  const moveTime = 0.5;
  if (
    currentTime <
    fireTruckDriveTime + moveTime * (firefighterPath.length - 1)
  ) {
    const currentSubPath = Math.floor(
      (currentTime - fireTruckDriveTime) / moveTime
    );
    const currentMoveTime = (currentTime - fireTruckDriveTime) % moveTime;
    const firefighterPos = Cesium.Cartesian3.lerp(
      firefighterPath[currentSubPath],
      firefighterPath[currentSubPath + 1],
      currentMoveTime / moveTime, // 0到1的插值比例
      new Cesium.Cartesian3()
    );

    for (let i = 0; i < sandbagSetting.sandbagNum; i++) {
      if (
        isSetSandbags[i] == false &&
        currentTime >
        (firefighterPathKeyNum[0] + i) * moveTime + fireTruckDriveTime
      ) {
        isSetSandbags[i] = true;
        sandbags[i].position = firefighterPos;
        viewer.entities.add(sandbags[i]);
      }
    }
    return firefighterPos;
  }

  return firefighterEndPosition;
}

//给定起点和终点（经纬度），插值出k个点，得到这k个点的地形坐标形成路径
function getPath(entityPathKeyPoints, entityPathKeyNums) {
  let path = [];
  for (let i = 0; i < entityPathKeyPoints.length; i++) {
    let positions = entityPathKeyPoints[i];
    if (positions.length < 2) {
      alert("路径关键点不能少于2");
      return [];
    }
    let keyNum = entityPathKeyNums[i];
    if (positions.length - 1 > keyNum.length) {
      alert("子路径细分信息不全");
      return [];
    }
    for (let p = 0; p < positions.length - 1; p++) {
      for (let k = 0; k < keyNum[p]; k++) {
        const keyPos = Cesium.Cartesian3.lerp(
          positions[p],
          positions[p + 1],
          k / keyNum[p], // 0到1的插值比例
          new Cesium.Cartesian3()
        );
        path.push(keyPos);
      }
    }
  }
  return Cesium.sampleTerrainMostDetailed(terrainProvider, path);
}

//-------------------------------------------------------地形获取-------------------------------------------------------

function getPosition() {
  //创建事件处理器
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    // 获取鼠标位置
    const ray = viewer.camera.getPickRay(movement.position);
    // 射线与地形相交
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (cartesian) {
      console.log(cartesian);
      // 将笛卡尔坐标转换为经纬度
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude);
      const height = cartographic.height;
      console.log(`经度: ${longitude}, 纬度: ${latitude}, 高度: ${height}`);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  /*const positions = [startPos];
  const terrianHeight = await Cesium.sampleTerrain(
    terrainProvider,
    11,
    startPos
  );
  console.log(terrianHeight);*/
}

/*
这里有一个思考，就是一次性采样足够的细致的样本点好，还是先采样粗糙的，然后再采样精细的
这里有一个权衡，就是异步采样的性能消耗的多采样浪费的性能消耗哪个较大。
我采用先用最低层级采样，经过一轮粗筛得到一个区间，然后在用最精细层级在该区间上采样若干点，得到隔离带路径
*/
function getAroundTerrian(firePosition, flameDirection) {
  //将采样点放在火头方向，火头方向是一个二维相对空间向量
  let theta = flameDirection.y < 0 ? -1.0 : 0;
  let phi = flameDirection.x < 0 ? -1.0 : 0;
  sampleTerrianPositions = [];
  const thetaMax = theta + 2.0;
  const phiMax = phi + 2.0;
  for (; theta < thetaMax; theta += 0.2) {
    for (; phi < phiMax; phi += 0.2) {
      sampleTerrianPositions.push(
        new Cesium.Cartographic(
          firePosition.longitude + theta,
          firePosition.latitude + phi
        )
      );
    }
  }
  terrianPositions = Cesium.sampleTerrain(
    terrainProvider,
    11,
    sampleTerrianPositions
  );
}

/*
隔离带可以是最高点组成，如山脊；也可以是最低点组成，如谷间
因此，我们找到极值点区间就是隔离带所在区间（假设地形走势单调）
如果沿着经度一直单调，则可能采样范围太小，需要增大采样范围。
返回num*2的数组，其元素为包含隔离带路径的经纬度索引.
我需要先判断山是横向的还是纵向的，并且要考虑是找山脊还是谷间。
*/
function getIsolationZonePath(terrianPositions, num = 10) { }

/*
如果是横向的，那么需要按维度进行遍历；反之按经度进行遍历
而我们的数据是经度优先的，因此我们可以根据横向还是纵向来设置步长
*/
function getRidgePath(terrianPositions, num = 10, isHorizontal = true) {
  let result = [];
  const sortTerrianPositions = [];
  const step = isHorizontal ? num : 1;
  for (let i = 0; i < num; i++) {
    for (let j = 1; j < num; j++) {
      if (
        terrianPositions[i + j * step].height <
        terrianPositions[i + (j - 1) * step].height
      ) {
        result.push({
          startPosIndex: i + j * step,
          endPosIndex: i + (j - 1) * step,
        });
        break;
      }
    }
    result.push({ startPosIndex: i + j * step, endPosIndex: -1 }); //一直在上升，说明搜索范围不够
  }
}

//------------------------------ 在全局变量区域添加新消防车参数 ------------------------------
// 新消防车路径参数
const newFireTruckSettings = {
  driveTime: 20, // 行驶总时间（秒）
  startPosition: Cesium.Cartesian3.fromDegrees(117.1630, 40.6199, 227.4), // 新起点
  positions: [ // 新路径关键点
    Cesium.Cartesian3.fromDegrees(117.1448, 40.6196, 480.7),
    Cesium.Cartesian3.fromDegrees(117.1444, 40.6204, 500.0),
    Cesium.Cartesian3.fromDegrees(117.1435, 40.6211, 509.6),
    Cesium.Cartesian3.fromDegrees(117.1418, 40.6227, 511.5),
    Cesium.Cartesian3.fromDegrees(117.1408, 40.6241, 561.9)
    //经度: 117.14485846566502, 纬度: 40.619678114238916, 高度: 480.7740233846012
    //经度: 117.14441521836736, 纬度: 40.62047840310272, 高度: 500.051733660191
    //经度: 117.14359979666935, 纬度: 40.62119806103582, 高度: 509.6108213244797
    //经度: 117.1418886880724, 纬度: 40.62277908103131, 高度: 511.5719902803926
    //经度: 117.14080754774525, 纬度: 40.624175980374325, 高度: 561.9380948725252


  ],
  pathKeyNum: [8, 8, 8, 8] // 路径插值点数
};
let newFireTruckPath = []; // 新消防车插值路径

//--------------------------------------------------------------------------------------------------------------------------------
// 在全局定义树木参数
const TREE_SETTINGS = {
  spacing: 5,      // 每隔5个路径点生成一次树木
  offset: 8.0,     // 距离轨迹的横向偏移范围（米）
  density: 2       // 每点生成树木数量（左右两侧）
};

// 生成树木位置函数
async function generateRandomTreesAlongPath(path) {
  const treePositions = [];

  // 遍历路径点
  for (let i = 0; i < path.length; i += TREE_SETTINGS.spacing) {
    const pathPoint = path[i];

    // 获取当前点的前进方向（用于计算左右偏移方向）
    const direction = getForwardDirection(path, i);

    // 左右两侧生成树木
    for (let j = 0; j < TREE_SETTINGS.density; j++) {
      // 随机偏移量
      const offset = (Math.random() * TREE_SETTINGS.offset) * (j % 2 === 0 ? 1 : -1);

      // 生成横向偏移坐标
      const treeCartographic = Cesium.Cartographic.fromCartesian(pathPoint);
      const treePosition = await getOffsetPosition(treeCartographic, direction, offset);

      treePositions.push(treePosition);
    }
  }

  // 批量创建树木
  createTrees(treePositions);
}

// 获取前进方向（简化版）
function getForwardDirection(path, index) {
  if (index >= path.length - 1) index = path.length - 2;
  const nextPoint = path[index + 1];
  const currentPoint = path[index];
  return Cesium.Cartesian3.subtract(nextPoint, currentPoint, new Cesium.Cartesian3());
}

// 获取偏移后的实际位置（带地形高度）
async function getOffsetPosition(cartographic, direction, offset) {
  // 计算横向偏移方向（与前进方向垂直）
  const rightVector = Cesium.Cartesian3.cross(
    direction,
    Cesium.Cartesian3.UNIT_Z,
    new Cesium.Cartesian3()
  );
  Cesium.Cartesian3.normalize(rightVector, rightVector);

  // 应用偏移
  const offsetVector = Cesium.Cartesian3.multiplyByScalar(
    rightVector,
    offset,
    new Cesium.Cartesian3()
  );

  // 转换为新坐标
  const newPosition = Cesium.Cartesian3.add(
    Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0),
    offsetVector,
    new Cesium.Cartesian3()
  );

  // 采样地形高度
  const sampled = await Cesium.sampleTerrainMostDetailed(
    viewer.terrainProvider,
    [Cesium.Cartographic.fromCartesian(newPosition)]
  );

  return Cesium.Cartesian3.fromRadians(
    sampled[0].longitude,
    sampled[0].latitude,
    sampled[0].height + 0.3 // 提升0.3米防止穿模
  );
}

// 创建树木实体（简单版）
function createTrees(positions) {
  positions.forEach(pos => {
    viewer.entities.add({
      position: pos,
      model: {
        uri: "/Assets/models/tree.glb",
        scale: 0.5 + Math.random() * 0.3,
        minimumPixelSize: 32
      },
      orientation: Cesium.Quaternion.fromAxisAngle(
        Cesium.Cartesian3.UNIT_Z,
        Math.random() * Math.PI
      )
    });
  });
}

// 在轨迹更新时生成树木
function generateTreesAlongPath(pathPositions) {
  const TREE_SPACING = 15.0; // 树木间距（米）
  const OFFSET_RANGE = 8.0;  // 随机位置偏移范围

  pathPositions.forEach((pos, index) => {
    if (index % 5 !== 0) return; // 控制密度

    // 生成随机偏移
    const offset = new Cesium.Cartesian3(
      (Math.random() - 0.5) * OFFSET_RANGE,
      (Math.random() - 0.5) * OFFSET_RANGE,
      0
    );
    const treePos = Cesium.Cartesian3.add(pos, offset, new Cesium.Cartesian3());

    // 添加树木实体
    viewer.entities.add({
      position: treePos,
      model: {
        uri: "/Assets/models/tree.glb",
        scale: 0.8 + Math.random() * 0.4,
        minimumPixelSize: 64 // 保证远距离可见
      },
      orientation: Cesium.Quaternion.fromAxisAngle(
        Cesium.Cartesian3.UNIT_Z,
        Math.random() * Math.PI // 随机旋转
      )
    });
  });
}

//------------------------------ 新增轨迹处理函数 ------------------------------
async function updateNewFireTruckTrail(currentPosition) {
  try {
    // 防抖：确保新点间距足够大
    if (newTrailPositions.length > 0) {
      const lastPos = newTrailPositions[newTrailPositions.length - 1];
      const distance = Cesium.Cartesian3.distance(lastPos, currentPosition);
      if (distance < 4.0) return; // 每2米添加一个点
    }

    // 克隆坐标（关键！）
    const clonedPos = Cesium.Cartesian3.clone(currentPosition);
    //添加隔离素材---------
    const gelibox = viewer.entities.add({
      position: clonedPos,
      model: {
        uri: "/Assets/models/Shadow_Transparent.glb",
        scale: 0.4,
        color: Cesium.Color.RED // 模型颜色设为蓝色
      }
    });
    // // 添加新点实体
    // const pointEntity = viewer.entities.add({
    //   position: clonedPos,
    //   point: {
    //    pixelSize: 12,
    //    color: Cesium.Color.BLUE.withAlpha(0.8),
    //    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 贴地显示
    //   }
    // });


    // 控制轨迹长度（保留最近50个点形成尾迹）
    // const maxPoints = 50;
    // if (newTrailPositions.length > maxPoints) {
    //   newTrailPositions.splice(0, newTrailPositions.length - maxPoints);
    // }
    // 强制渲染
    //viewer.scene.requestRender();
    console.log("当前位置:", position);
  } catch (error) {
    console.error("轨迹更新失败:", error);
  }
  //generateTreesAlongPath(newFireTruckPath);
  generateRandomTreesAlongPath(newFireTruckPath);
}

//------------------------------ 新消防车运动逻辑 ------------------------------
function newFireTruckTrajectory(time, result) {
  const currentTime = Cesium.JulianDate.secondsDifference(time, start);

  // 边界保护
  if (newFireTruckPath.length < 2 || currentTime < 0) {
    return newFireTruckSettings.startPosition.clone(result);
  }
  // 增强边界检查
  if (!newFireTruckPath || newFireTruckPath.length < 2) {
    console.error("路径数据无效，使用初始位置");
    return newFireTruckSettings.startPosition.clone(result);
  }

  const totalTime = newFireTruckSettings.driveTime;
  const progress = Math.min(currentTime / totalTime, 1);
  const segmentIndex = Math.min(
    Math.floor(progress * (newFireTruckPath.length - 1)),
    newFireTruckPath.length - 2 // 防止索引越界
  );
  const localProgress = (progress * (newFireTruckPath.length - 1)) % 1;

  // 坐标插值保护
  const startPoint = newFireTruckPath[segmentIndex] || newFireTruckSettings.startPosition;
  const endPoint = newFireTruckPath[segmentIndex + 1] || startPoint;




  return Cesium.Cartesian3.lerp(
    newFireTruckPath[segmentIndex],
    newFireTruckPath[segmentIndex + 1],
    localProgress,
    result || new Cesium.Cartesian3()
  );
}




</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100vh;
  /* 全屏显示 */
  margin: 0;
}
</style>
