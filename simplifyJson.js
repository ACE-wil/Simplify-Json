const fs = require('fs');
const simplify = require('simplify-geojson');

// 读取并解析 JSON 文件
fs.readFile('d:\\shen\\front-site\\src\\assets\\twCounty2010.geo.json', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件出错:', err);
    return;
  }

  try {
    const geoJson = JSON.parse(data);
    console.log('原始数据特征数量:', geoJson.features.length);

    // 过滤数据，只保留指定的市
    const provinceCityNames = [
      '台東縣',
      '宜蘭縣',
      '台北市',
      '雲林縣',
      '桃園縣',
      '屏東縣',
      '台中市',
      '台南市',
      '基隆市',
      '連江縣',
      '南投縣',
      '澎湖縣',
      '苗栗縣',
      '嘉義市',
      '新竹縣',
      '新北市',
      '花蓮縣',
      '高雄市',
      '彰化縣',
      '嘉義縣',
      '金門縣',
      '新竹市',
    ];

    const simplifiedFeatures = geoJson.features.filter((feature) => {
      return provinceCityNames.includes(feature.properties.COUNTYNAME);
    });

    console.log('简化后数据特征数量:', simplifiedFeatures.length);

    // 使用 simplify-geojson 简化坐标点
    const simplifiedGeoJson = simplify(
      {
        ...geoJson,
        features: simplifiedFeatures,
      },
      0.01
    ); // 0.01 是简化的容差值，可以根据需要调整

    // 保存简化后的数据
    fs.writeFile(
      'd:\\shen\\front-site\\src\\assets\\twCounty2010_simplified.geo.json',
      JSON.stringify(simplifiedGeoJson),
      'utf8',
      (err) => {
        if (err) {
          console.error('写入文件出错:', err);
        } else {
          console.log('简化后的 GeoJSON 文件已保存。');
        }
      }
    );
  } catch (parseError) {
    console.error('解析 JSON 出错:', parseError);
  }
});
