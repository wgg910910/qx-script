// caiyun-ios27.js
// Quantumult X + Apple WeatherKit v2

const url = $request.url || "";

const reg = /\/api\/v2\/weather\/[^/]+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/;

const m = url.match(reg);

if (m) {

  let lat = m[1];
  let lon = m[2];

  $prefs.setValueForKey(lat, "caiyun_latitude");
  $prefs.setValueForKey(lon, "caiyun_longitude");

  $prefs.setValueForKey(
    JSON.stringify({
      latitude: lat,
      longitude: lon
    }),
    "location"
  );


  $notify(
    "彩云天气",
    "定位成功",
    `${lat}, ${lon}`
  );

  console.log(
    "WeatherKit:",
    lat,
    lon
  );

} else {

  console.log(
    "没有匹配到:",
    url
  );

}

$done({});
