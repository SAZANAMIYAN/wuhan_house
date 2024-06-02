// kml转化为json
// const fs = require('fs');
// const tj = require('@mapbox/togeojson');
// const DOMParser = require('xmldom').DOMParser;
// const JSZip = require('jszip');

// // 读取 KMZ 文件
// fs.readFile('geojson/武汉_LayerToKML.kmz', function(err, data) {
//     if (err) throw err;
//     JSZip.loadAsync(data).then(function (zip) {
//         return zip.file(/\.kml$/)[0].async('string');  // 找到 KML 文件并读取内容
//     }).then(function (kml) {
//         // 解析 KML
//         const dom = new DOMParser().parseFromString(kml);
//         // 转换为 GeoJSON
//         const converted = tj.kml(dom);
//         // 将结果写入新的 GeoJSON 文件
//         fs.writeFileSync('geojson/武汉建筑.json', JSON.stringify(converted));
//     });
// });

// // 格式化 JSON 文件
// const fs = require('fs');

// // 读取 JSON 文件
// const data = fs.readFileSync('geojson/武汉建筑.json', 'utf8');

// // 解析 JSON
// const obj = JSON.parse(data);

// // 格式化 JSON
// const formatted = JSON.stringify(obj, null, 2);  // 2 是缩进的空格数

// // 将格式化的 JSON 写入新的文件
// fs.writeFileSync('geojson/武汉建筑_formatted.json', formatted);




// // 解析出高度属性
// const fs = require("fs");
// const cheerio = require("cheerio");

// // 读取 JSON 文件
// const data = fs.readFileSync("geojson/武汉建筑.json", "utf8");

// // 解析 JSON
// const obj = JSON.parse(data);

// // 遍历每个 feature
// obj.features.forEach((feature) => {
//   //   // 加载 description HTML
//   //   const $ = cheerio.load(feature.properties.description);

//   //   // 提取 Floor 和 height 的值
//   //   const floor = $('td:contains("Floor")').next().text();
//   //   const height = $('td:contains("height")').next().text();

//   //   // 添加 Floor 和 height 到 properties 对象
//   //   feature.properties.Floor = parseInt(floor, 10);
//   //   feature.properties.height = parseInt(height, 10);

//   var Floor = features.properties.Floor; // 假设 Floor 属性存储在 properties 对象中

//   features.geometry.coordinates = features.geometry.coordinates.map(function (
//     ring
//   ) {
//     return ring.map(function (coordinate) {
//       return [coordinate[0], coordinate[1], Floor];
//     });
//   });

//   //   // 删除 description 字段
//   //   delete feature.properties.description;
// });

// // 格式化 JSON
// const formatted = JSON.stringify(obj, null, 2); // 2 是缩进的空格数

// // 将格式化的 JSON 写入新的文件
// fs.writeFileSync("geojson/武汉建筑_formatted.json", formatted);



const fs = require("fs");

// 读取 JSON 文件
const data = fs.readFileSync("geojson/武汉建筑.json", "utf8");

// 解析 JSON
const obj = JSON.parse(data);

// 遍历每个 feature
obj.features.forEach((feature) => {
  var Floor = feature.properties.Floor; // 假设 Floor 属性存储在 properties 对象中

  if (feature.geometry && feature.geometry.coordinates) {
    if (feature.geometry.type === 'Polygon') {
      feature.geometry.coordinates = feature.geometry.coordinates.map(function (
        ring
      ) {
        return ring.map(function (coordinate) {
          // 保留原始的 coordinate 数组，并只修改第三个元素（Z坐标）
          coordinate[2] = Floor;
          return coordinate;
        });
      });
    } else if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates = feature.geometry.coordinates.map(function (
        polygon
      ) {
        return polygon.map(function (ring) {
          return ring.map(function (coordinate) {
            // 保留原始的 coordinate 数组，并只修改第三个元素（Z坐标）
            coordinate[2] = Floor;
            return coordinate;
          });
        });
      });
    }
  }
});

// 格式化 JSON
const formatted = JSON.stringify(obj, null, 2); // 2 是缩进的空格数

// 将格式化的 JSON 写入新的文件
fs.writeFileSync("geojson/武汉建筑_formatted.json", formatted);