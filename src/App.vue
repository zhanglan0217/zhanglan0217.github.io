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
  Terrain,
  ImageryLayer,
  Ion,
  Cartesian3,
  Viewer,
} from "cesium";
import * as Cesium from "cesium";
import "./Widgets/widgets.css";
import { onMounted } from "vue";
// import positionService from '@/services/positionService';  // 注释掉：引入API服务

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4OWQ2ZGQ4YS03ZDliLTQzYmQtOWE2NC00NDZmNzZkZGY1NDMiLCJpZCI6Mjc4NjUwLCJpYXQiOjE3NDAzOTA3NDJ9.qWmrZNrX60GOdR9wdhlP4NQYzkafz54orDQghP4ymGc";

// ------------------------- 全局变量区 -------------------------
let viewer;
let terrainProvider;
// let fireTruckData = [];  // 注释掉：存储消防车位置数据

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
let fireTruckStartPosition = new Cesium.Cartesian3.fromDegrees(
  117.16298601043349,
  40.619906185074505,
  227.39733325423546
);
let fireTruckMidPosition1 = new Cesium.Cartesian3.fromDegrees(
  117.16235073319166,
  40.620028415425686,
  230.94459042735912
);
let fireTruckMidPosition2 = new Cesium.Cartesian3.fromDegrees(
  117.161946583731,
  40.62062206129788,
  235.37710577624964
);
let fireTruckMidPosition3 = new Cesium.Cartesian3.fromDegrees(
  117.16110643315945,
  40.62050736943747,
  235.47685338437446
);
let fireTruckEndPosition = Cesium.Cartesian3.fromDegrees(
  117.16054505224896,
  40.62081570297024,
  240.24193195159992
);
let fireTruckPositions = [
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
  await addWorldTerrainAndImageryAsync();

  // 注释掉：加载数据库数据（放在地形加载完成后）
  // await loadFireTruckPositions();

  // 保持原有逻辑
  addEntitiesAndparticleSystemAsync();
});

// 注释掉：从数据库加载消防车位置点的整个函数
/*
const loadFireTruckPositions = async () => {
  try {
    const response = await positionService.getFireTruckPositions();
    fireTruckData = response.data;
    
    console.log('从数据库获取到', fireTruckData.length, '个消防车位置点');
    console.log('数据预览:', fireTruckData.slice(0, 2)); // 只打印前2条数据防止日志过长
    
    // 清空之前的实体
    viewer.entities.removeAll();
    
    // 批量处理数据并添加实体
    fireTruckData.forEach((pos, index) => {
      // 1. 强制类型转换
      const longitude = parseFloat(pos.longitude);
      const latitude = parseFloat(pos.latitude);
      const altitude = parseFloat(pos.altitude) || 0;
      
      // 2. 验证数据有效性
      if (isNaN(longitude) || isNaN(latitude)) {
        console.warn(`跳过无效坐标 [索引 ${index}]：经度=${pos.longitude}, 纬度=${pos.latitude}`);
        return;
      }
      
      // 3. 处理缺失字段
      const positionName = pos.position_name || `未命名位置_${index + 1}`;
      const positionOrder = pos.position_order || '无序号';
      
      try {
        // 4. 添加实体（使用转换后的数值）
        viewer.entities.add({
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
          point: {
            pixelSize: 14,
            color: Cesium.Color.RED.withAlpha(0.8),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
          },
          label: {
            text: positionName,
            font: '16px Microsoft YaHei',
            fillColor: Cesium.Color.WHITE,
            backgroundColor: Cesium.Color.BLACK.withAlpha(0.7),
            padding: new Cesium.Cartesian2(8, 8),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -25)
          },
          infoBox: {
            title: positionName,
            description: `
              <div style="font-size:14px;">
                <p><b>坐标:</b> ${longitude.toFixed(6)}, ${latitude.toFixed(6)}</p>
                <p><b>海拔:</b> ${altitude.toFixed(2)} 米</p>
                <p><b>序号:</b> ${positionOrder}</p>
              </div>
            `
          }
        });
        
        console.log(`成功添加位置点 [${index + 1}/${fireTruckData.length}]：${positionName}`);
        fireTruckPositions=fireTruckData;
      } catch (addError) {
        console.error(`添加位置点 [${index + 1}] 失败：`, addError);
      }
    });
    
    console.log('数据添加完成，共添加', viewer.entities.values.length, '个标记');
    
    // // 定位到第一个点（添加错误处理）
    // if (fireTruckData.length > 0) {
    //   const firstPos = fireTruckData[0];
    //   const firstLong = parseFloat(firstPos.longitude);
    //   const firstLat = parseFloat(firstPos.latitude);
      
    //   if (!isNaN(firstLong) && !isNaN(firstLat)) {
    //     viewer.camera.flyTo({
    //       destination: Cesium.Cartesian3.fromDegrees(firstLong, firstLat, 1000),
    //       duration: 2,
    //       complete: () => console.log('视角定位完成'),
    //       error: (flyError) => console.error('视角定位失败：', flyError)
    //     });
    //   } else {
    //     console.warn('第一个点坐标无效，无法定位');
    //   }
    // }

    //fireTruckPositions=fireTruckData;
    
  } catch (error) {
    console.error('加载消防车位置点失败:', error);
    alert('数据加载失败，请检查网络连接或后端服务');
  }
};
*/



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
        117.1606144721469,
        40.61600819327909,
        1000
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
    viewer.scene.globe.enableLighting = true;

    window.debugViewer = viewer;
  } catch (error) {
    console.error("Failed to add world terrain:", error);
    viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
  }
}

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

  // 添加新消防车
  const newFireTruck = viewer.entities.add({
    position: new Cesium.CallbackProperty(newFireTruckTrajectory, false),
    model: {
      uri: "/Assets/models/fire_truck.glb",
      scale: 0.4,
      color: Cesium.Color.BLUE // 模型颜色设为蓝色
    }
  });

  newFireTruck.orientation = new Cesium.VelocityOrientationProperty(
    newFireTruck.position
  );

  viewer.scene.postUpdate.addEventListener(() => {
    const currentTime = Cesium.JulianDate.toDate(viewer.clock.currentTime).getTime() / 1000;
    if (currentTime - lastUpdateTime > UPDATE_INTERVAL) {
      const currentPosition = newFireTruck.position.getValue(viewer.clock.currentTime);
      updateNewFireTruckTrail(currentPosition);
      lastUpdateTime = currentTime;
    }
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

  try {
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

    if (newFireTruckPath.length < 2) {
      throw new Error("新消防车路径点不足");
    }
    newFireTruckPath.forEach((pos, index) => {
      viewer.entities.add({
        position: pos,
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
      flyTime / straightFlyTime,
      result
    );
  }
  const centerCartographic = Cesium.Cartographic.fromCartesian(center);
  const angularSpeed = (2 * Cesium.Math.PI) / 10;

  const circlingTime = flyTime - straightFlyTime;

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
}

function makeTBNFromCartographic(CartesianPosition, CartographicPosition) {
  const phi = CartographicPosition.longitude;
  const theta = CartographicPosition.latitude;
  const normal = new Cesium.Cartesian3(
    Math.cos(theta) * Math.cos(phi),
    Math.cos(theta) * Math.sin(phi),
    Math.sin(theta)
  );
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
      currentMoveTime / moveTime,
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
      currentMoveTime / moveTime,
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
          k / keyNum[p],
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
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    const ray = viewer.camera.getPickRay(movement.position);
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (cartesian) {
      console.log(cartesian);
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude);
      const height = cartographic.height;
      console.log(`经度: ${longitude}, 纬度: ${latitude}, 高度: ${height}`);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

function getAroundTerrian(firePosition, flameDirection) {
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

function getIsolationZonePath(terrianPositions, num = 10) { }

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
    result.push({ startPosIndex: i + j * step, endPosIndex: -1 });
  }
}

//------------------------------ 在全局变量区域添加新消防车参数 ------------------------------
// 新消防车路径参数
const newFireTruckSettings = {
  driveTime: 20, // 行驶总时间（秒）
  startPosition: Cesium.Cartesian3.fromDegrees(117.1630, 40.6199, 227.4), // 新起点
  positions: [
    Cesium.Cartesian3.fromDegrees(117.1448, 40.6196, 480.7),
    Cesium.Cartesian3.fromDegrees(117.1444, 40.6204, 500.0),
    Cesium.Cartesian3.fromDegrees(117.1435, 40.6211, 509.6),
    Cesium.Cartesian3.fromDegrees(117.1418, 40.6227, 511.5),
    Cesium.Cartesian3.fromDegrees(117.1408, 40.6241, 561.9)
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

  for (let i = 0; i < path.length; i += TREE_SETTINGS.spacing) {
    const pathPoint = path[i];
    const direction = getForwardDirection(path, i);

    for (let j = 0; j < TREE_SETTINGS.density; j++) {
      const offset = (Math.random() * TREE_SETTINGS.offset) * (j % 2 === 0 ? 1 : -1);
      const treeCartographic = Cesium.Cartographic.fromCartesian(pathPoint);
      const treePosition = await getOffsetPosition(treeCartographic, direction, offset);
      treePositions.push(treePosition);
    }
  }

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
  const rightVector = Cesium.Cartesian3.cross(
    direction,
    Cesium.Cartesian3.UNIT_Z,
    new Cesium.Cartesian3()
  );
  Cesium.Cartesian3.normalize(rightVector, rightVector);

  const offsetVector = Cesium.Cartesian3.multiplyByScalar(
    rightVector,
    offset,
    new Cesium.Cartesian3()
  );

  const newPosition = Cesium.Cartesian3.add(
    Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0),
    offsetVector,
    new Cesium.Cartesian3()
  );

  const sampled = await Cesium.sampleTerrainMostDetailed(
    viewer.terrainProvider,
    [Cesium.Cartographic.fromCartesian(newPosition)]
  );

  return Cesium.Cartesian3.fromRadians(
    sampled[0].longitude,
    sampled[0].latitude,
    sampled[0].height + 0.3
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
    if (index % 5 !== 0) return;

    const offset = new Cesium.Cartesian3(
      (Math.random() - 0.5) * OFFSET_RANGE,
      (Math.random() - 0.5) * OFFSET_RANGE,
      0
    );
    const treePos = Cesium.Cartesian3.add(pos, offset, new Cesium.Cartesian3());

    viewer.entities.add({
      position: treePos,
      model: {
        uri: "/Assets/models/tree.glb",
        scale: 0.8 + Math.random() * 0.4,
        minimumPixelSize: 64
      },
      orientation: Cesium.Quaternion.fromAxisAngle(
        Cesium.Cartesian3.UNIT_Z,
        Math.random() * Math.PI
      )
    });
  });
}

//------------------------------ 新增轨迹处理函数 ------------------------------
async function updateNewFireTruckTrail(currentPosition) {
  try {
    if (newTrailPositions.length > 0) {
      const lastPos = newTrailPositions[newTrailPositions.length - 1];
      const distance = Cesium.Cartesian3.distance(lastPos, currentPosition);
      if (distance < 4.0) return;
    }

    const clonedPos = Cesium.Cartesian3.clone(currentPosition);
    const gelibox = viewer.entities.add({
      position: clonedPos,
      model: {
        uri: "/Assets/models/Shadow_Transparent.glb",
        scale: 0.4,
        color: Cesium.Color.RED
      }
    });

    console.log("当前位置:", position);
  } catch (error) {
    console.error("轨迹更新失败:", error);
  }
  generateRandomTreesAlongPath(newFireTruckPath);
}

//------------------------------ 新消防车运动逻辑 ------------------------------
function newFireTruckTrajectory(time, result) {
  const currentTime = Cesium.JulianDate.secondsDifference(time, start);

  if (newFireTruckPath.length < 2 || currentTime < 0) {
    return newFireTruckSettings.startPosition.clone(result);
  }

  if (!newFireTruckPath || newFireTruckPath.length < 2) {
    console.error("路径数据无效，使用初始位置");
    return newFireTruckSettings.startPosition.clone(result);
  }

  const totalTime = newFireTruckSettings.driveTime;
  const progress = Math.min(currentTime / totalTime, 1);
  const segmentIndex = Math.min(
    Math.floor(progress * (newFireTruckPath.length - 1)),
    newFireTruckPath.length - 2
  );
  const localProgress = (progress * (newFireTruckPath.length - 1)) % 1;

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
  margin: 0;
}
</style>