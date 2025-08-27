// // src/services/positionService.js
// import axios from 'axios';

// // 后端API基础URL（与Vite代理配置一致）
// const API_BASE_URL = '/api';

// export default {
//   // 获取所有消防车位置点（对应后端/positions接口）
//   getFireTruckPositions() {
//     return axios.get(`${API_BASE_URL}/positions`);
//   },
  
//   // 添加新位置点（可选）
//   addFireTruckPosition(position) {
//     return axios.post(`${API_BASE_URL}/positions`, position);
//   }
// };

// src/services/positionService.js



import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001/api'; // 直接访问后端，跳过代理
//curl http://localhost:3001/api/positions

export default {
  getFireTruckPositions() {
    return axios.get(`${API_BASE_URL}/positions`);
  }
};