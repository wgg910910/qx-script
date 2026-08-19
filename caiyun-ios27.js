/************************************
 * caiyun-ios27.js
 * Quantumult X
 * Apple WeatherKit v2 + Caiyun
 ************************************/

const $ = new Env("彩云天气");

let url = $request.url || "";


// ===============================
// 1. 获取 Apple WeatherKit 经纬度
// ===============================

let match = url.match(
  /\/api\/v2\/weather\/[^/]+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)(?:\?|$)/
);


if (match) {

  let latitude = Number(match[1]);
  let longitude = Number(match[2]);


  if (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ) {

    let location = {
      latitude,
      longitude
    };


    // 兼容原彩云脚本
    $.write(
      JSON.stringify(location),
      "location"
    );


    $.write(
      String(latitude),
      "#latitude"
    );


    $.write(
      String(longitude),
      "#longitude"
    );


    $.notify(
      "彩云天气",
      "定位获取成功",
      `${latitude}, ${longitude}`
    );


    console.log(
      `✅ WeatherKit ${latitude},${longitude}`
    );
  }


  $done({});
}


// ===============================
// 2. 读取定位
// ===============================

let location = {};

try {

  location = JSON.parse(
    $.read("location") || "{}"
  );

}
catch(e){

  location = {};

}



if (
  !location.latitude ||
  !location.longitude
){

  $.notify(
    "彩云天气",
    "",
    "❌ 没有定位数据"
  );

  $done({});
}



// ===============================
// 3. 彩云天气 API
// ===============================

let api = 
`https://api.caiyunapp.com/v2.6/${location.longitude},${location.latitude}/weather.json`;



$httpClient.get(
{
  url: api,
  headers:{
    "User-Agent":"Quantumult X"
  }
},
function(error,response,data){

  if(error){

    $.notify(
      "彩云天气",
      "",
      "请求失败"
    );

  }
  else{

    console.log(data);

  }


  $done({});

});





function Env(name){

this.name=name;


this.write=function(value,key){

$prefs.setValueForKey(
value,
key
);

};


this.read=function(key){

return $prefs.valueForKey(key);

};


this.notify=function(title,subtitle,body){

$notify(
title,
subtitle,
body
);

};


this.done=function(){

$done();

};


this.httpClient={

get:function(options,callback){

$httpClient.get(
options,
callback
);

}

};


}