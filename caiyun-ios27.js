/************************************
 * caiyun-ios27.js
 * Apple WeatherKit v2 定位获取
 * Quantumult X
 ************************************/

const url = $request.url || "";

const match = url.match(
  /\/api\/v2\/weather\/[^/]+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)(?:\?|$)/
);

if (!match) {
  console.log("❌ 未匹配 WeatherKit URL");
  console.log(url);
  $done({});
}

const latitude = Number(match[1]);
const longitude = Number(match[2]);

if (
  !Number.isFinite(latitude) ||
  !Number.isFinite(longitude)
) {
  console.log(
    `❌ 经纬度错误 latitude=${match[1]} longitude=${match[2]}`
  );
  $done({});
}


// 保存坐标
$prefs.setValueForKey(
  String(latitude),
  "caiyun_latitude"
);

$prefs.setValueForKey(
  String(longitude),
  "caiyun_longitude"
);


// 保存 JSON
$prefs.setValueForKey(
  JSON.stringify({
    latitude: latitude,
    longitude: longitude
  }),
  "caiyun_location"
);


console.log(
  `✅ WeatherKit 定位成功 ${latitude},${longitude}`
);


$notify(
  "彩云天气",
  "定位获取成功",
  `${latitude}, ${longitude}`
);


$done({});