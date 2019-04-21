/** 颜色设置 */
var config = {
	data : {latlondata:null,isabs:false,mpstep:100},
	map : null,
	paletteCanvas : null,
	window : null,
	width:null,
	step:null,
	opacity : null,
	range : {
		max : null,
		min : null,
	},
	colors : null,
	// data:从服务端返回的二维数组,color颜色与对应的值,window:window对象,opacity:不透明度(0-1之间,越大越不透明)
	Draw : function(data, colors, map, window, opacity) {
		this.map = map;
		this.data = data;
		this.opacity = opacity;
		this.colors = colors;
		this.window = window;
		// 查找数据最大值和最小值
		var range = getrange(colors);
		this.range.max = range.max;
		this.range.min = range.min;
		// console.log(config.data);
		// 初始化色板
		config.paletteCanvas = initPalette();
		debugger;
		var layer = L.canvasLayer().delegate(t2m).addTo(config.map);
		return layer;
	},
	// 鼠标移动获取图层数据事件
	mousemove:function(callbackFunction){
		config.map.on('mousemove', function (e) {
	
			var lat = e.latlng.lat;
			var lng = e.latlng.lng;
			if(lat>=config.data.latlondata.lat2&&lat<=config.data.latlondata.lat1&&lng>=config.data.latlondata.lon1
					&&lng<=config.data.latlondata.lon2){
				var simple = getsample(lat,lng);
				var v00=simple.v00;
				var v01=simple.v01;
				var v10=simple.v10
				var v11=simple.v11;
				var xx =simple.x;
				var yy=simple.y;
				var value= bilinear(v00, v01, v10, v11, xx, yy);
				var values={latlng:{lat:lat,lng:lng},value:value};
				return callbackFunction(values);	
			}			 
		})
		
	},
    pop:function(callbackFunction){
    	config.map.on('click', function (e) {
    		var lat = e.latlng.lat;
			var lng = e.latlng.lng;
    		if(lat>=config.data.latlondata.lat2&&lat<=config.data.latlondata.lat1&&lng>=
    			config.data.latlondata.lon1&&lng<=config.data.latlondata.lon2){
    			var simple = getsample(lat,lng);
				var v00=simple.v00;
				var v01=simple.v01;
				var v10=simple.v10
				var v11=simple.v11;
				var xx =simple.x;
				var yy=simple.y;
				var value= bilinear(v00, v01, v10, v11, xx, yy);
				var values={latlng:{lat:lat,lng:lng},value:value};
    			return callbackFunction(values);
    		}
    		
    	});
    },
    
    getrange:function(data){
    	var values = [];   	
    	for (var i = 0; i < data.length; i++) {
    		for(var j=0;j<data[i].length;j++){
    			  var value = data[i][j];
    		         values.push(value);	
    		   }
    	}
    	 var max=Math.max.apply(null,values);
    	 var min=Math.min.apply(null,values);
    	 var range={max:max,min:min};
    	 return range;	
    }
};

var t2m = {


/**
 * 画图，刷新界面
 *
 * @param info
 */
onDrawLayer: function (info) {

  if (config.data == null) {
    return;
  }

  var ctx = info.canvas.getContext('2d');
  ctx.clearRect(0, 0, config.map.getSize().x, config.map.getSize().y);

  var size = {
    x: Math.round(config.map.getSize().x),
    y: Math.round(config.map.getSize().y)
  };

  // 双线性插值准备的内容，每个定点坐标位置
  var latArray = [];
  var lonArray = [];

  // y轴，从上到下
  for (var y = 0; y < config.data.latlondata.data.length; y++) {
    var _lat = config.data.latlondata.lat1 + (config.data.latlondata.dy) * y;
    var pLat = config.map.latLngToContainerPoint({
      lat: _lat,
      lon: 0
    });
    latArray.push(Math.round(pLat.y));
  }

  // x轴，从做到右
  for (var x = 0; x < config.data.latlondata.data[0].length; x++) {
    var _lon = config.data.latlondata.lon1 + config.data.latlondata.dx * x;
    var pLon = config.map.latLngToContainerPoint({
      lat: config.data.latlondata.lat1,
      lon: _lon
    });
    lonArray.push(Math.round(pLon.x));
  }

  var canvasX0 = lonArray[0];
  var canvasY0 = latArray[0];
  var canvasX1 = lonArray[config.data.latlondata.data[0].length - 1];
  var canvasY1 = latArray[config.data.latlondata.data.length - 1];

  canvasX0 = Math.max(canvasX0, 0);
  canvasX1 = Math.min(canvasX1, size.x);

  canvasY0 = Math.max(canvasY0, 0);
  canvasY1 = Math.min(canvasY1, size.y);

  if (canvasX0 >= size.x || canvasX1 <= 0 || canvasY0 >= size.y
    || canvasY1 <= 0) {
    return;
  }

  var canvasW = canvasX1 - canvasX0;
  var canvasH = canvasY1 - canvasY0;

  console.log("w: " + canvasW);
  console.log("h: " + canvasH);

  var img = ctx.createImageData(canvasW, canvasH);

  var imgData = img.data;
  console.log("imgData: " + imgData.length);
  var count = 0;
  for (var y = 0; y < config.data.latlondata.data.length - 1; y++) {

    var y0 = latArray[y];
    var y1 = latArray[y + 1];

    if (y1 <= 0 || y0 >= size.y) {
      continue;
    }

    for (var x = 0; x < config.data.latlondata.data[0].length - 1; x++) {

      var x0 = lonArray[x];
      var x1 = lonArray[x + 1];

      if (x0 >= size.x || x1 <= 0) {
        continue;
      }

      // 4个顶点值有了
      var v00 = config.data.latlondata.data[y][x];
      var v01 = config.data.latlondata.data[y][x + 1];
      var v10 = config.data.latlondata.data[y + 1][x];
      var v11 = config.data.latlondata.data[y + 1][x + 1];

      if (config.data.isabs) {
        v00 = Math.abs(v00);
        v01 = Math.abs(v01);
        v10 = Math.abs(v10);
        v11 = Math.abs(v11);
      }
      if (v00 == 9999 || v01 == 9999 || v10 == 9999 || v11 == 9999) {
        continue;
      }
      // 当前小格子内的像素高度和宽度
      var ch = (y1 - y0);
      var cw = (x1 - x0);

      // 4个顶点坐标
      // 循环行
      for (var cy = y0; cy < y1; cy++) {

        if (cy < 0 || cy > size.y) {
          continue;
        }

        //
        var yy = (cy - y0) / ch;

        // 循环列
        for (var cx = x0; cx < x1; cx++) {

          if (cx < 0 || cx > size.x) {
            continue;
          }

          var xx = (cx - x0) / cw;

          var vxy = bilinear(v00, v01, v10, v11, xx, yy);
          // 不能小于0，不能超出范围
          var offset = Math.round(Math.min(Math.max((vxy
            - config.range.min), 0), (config.range.max
            - config.range.min)) * config.step) * 4;
          if (offset >= config.paletteCanvas.length - 1) {
            offset = offset - 4;
          }
          var i = ((cy - canvasY0) * canvasW + cx - canvasX0) * 4;
          /*	if (vxy>0.5&&count <= 100) {
                          count++;
                          console.log("vxy",vxy);
                          console.log("offset", offset)
                          console.log(config.paletteCanvas[offset]);
                      }*/

          imgData[i] = config.paletteCanvas[offset];
          imgData[i + 1] = config.paletteCanvas[offset + 1];
          imgData[i + 2] = config.paletteCanvas[offset + 2];
          imgData[i + 3] = config.opacity * 256;
        }
      }

    }

  }

  ctx.putImageData(img, canvasX0, canvasY0);
}
};

/**
 * 初始化色板
 */
function initPalette() {
	var paletteCanvas = document.createElement('canvas');
	var compare = (config.range.max - config.range.min);
	config.step= (config.colors.length*config.data.mpstep)/compare;
	var w = config.colors.length*config.data.mpstep;
	//var w = compare/0.01;
	 w=Math.round(w);
	// 0.1°C间隔
	paletteCanvas.height = 1;
	paletteCanvas.width = w;
	console.log("w:", w);
	
	var paletteCtx = paletteCanvas.getContext('2d');

	paletteCtx.width = w;
	paletteCtx.height = 1;

	var gradient = paletteCtx.createLinearGradient(0, 0, w, 1);

	for ( var key in config.colors) {
		var c = config.colors[key];
		gradient.addColorStop((c[0] - config.range.min)/compare, 'rgb(' + c[1]
				+ ',' + c[2] + ',' + c[3] + ')');
		console.log("s: " + ((c[0] - config.range.min)/compare) + " c:" + 'rgb('
				+ c[1] + ',' + c[2] + ',' + c[3] + ')');
	}

	paletteCtx.fillStyle = gradient;
	paletteCtx.fillRect(0, 0, w, 1);

	console.log("p w: " + w);
	console.log("p length: " + paletteCtx.getImageData(0, 0, w, 1).data.length);

	return paletteCtx.getImageData(0, 0, w, 1).data;
}

/**
 * 
 * V10 V11 V00 V01
 * 
 * x: 0~1 y: 0~1
 * 
 * @param v00
 * @param v01
 * @param v10
 * @param v11
 * @param x
 * @param y
 */
function bilinear(v00, v01, v10, v11, x, y) {
	var v0x = (v01 - v00) * x + v00;
	var v1x = (v11 - v10) * x + v10;
	var vxy = (v1x - v0x) * y + v0x;
	return vxy;
}

/**
 * 
 * @param data
 * @returns
 */
function getrange(data) {
	var values = [];
	
	for (var i = 0; i < data.length; i++) {
     var value = data[i][0];
     values.push(value);
	}
	var max=Math.max.apply(null,values);
	var min=Math.min.apply(null,values);
	 var range={max:max,min:min};
	 return range;
}

/**
 * 根据当前点的经纬度获取周围四个参考点的值和采样点的占比
 * 
 * @param lat
 * @param lng
 * @returns
 */
function getsample(lat,lng){
	var y1=parseInt(Math.abs((lat-config.data.latlondata.lat1)/config.data.latlondata.dy));
	var y2=y1+1;
	var x1=parseInt(Math.abs((lng-config.data.latlondata.lon1)/config.data.latlondata.dx));
	var x2=x1+1;
	var v00 = config.data.latlondata.data[y1][x1];	
	var v01 = config.data.latlondata.data[y1][x2];
	var v10 = config.data.latlondata.data[y2][x1];
	var v11 = config.data.latlondata.data[y2][x2];
    var wh=lng-(config.data.latlondata.lon1+x1*config.data.latlondata.dx);// 经度差
    var hh=(config.data.latlondata.lat1+y1*config.data.latlondata.dy)-lat;// 纬度差
	var xx=wh/Math.abs(config.data.latlondata.dy);
	var yy=hh/Math.abs(config.data.latlondata.dx);
	var simple={v00:v00,v01:v01,v10:v10,v11:v11,x:xx,y:yy};
	return simple;
}

/**
 *
 * @param data
 * @param colors
 * @param map
 * @param window
 * @param opacity
 */
function canvase(data, colors, map, window, opacity) {
config.Draw(data,colors,map,window,opacity);
}
export default {
  canvase
}


