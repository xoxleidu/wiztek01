'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * Generic Canvas Layer for leaflet 0.7 and 1.0-rc, copyright Stanislav Sumbera,
 * 2016 , sumbera.com , license MIT originally created and motivated by
 * L.CanvasOverlay available here: https://gist.github.com/Sumbera/11114288
 * 
 */

// -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
// ------------------------------------------------------------------------------
L.DomUtil.setTransform = L.DomUtil.setTransform || function (el, offset, scale) {
	var pos = offset || new L.Point(0, 0);
	el.style[L.DomUtil.TRANSFORM] = (L.Browser.ie3d ? 'translate(' + pos.x + 'px,' + pos.y + 'px)' : 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') + (scale ? ' scale(' + scale + ')' : '');
};

// -- support for both 0.0.7 and 1.0.0 rc2 leaflet
L.CanvasLayer = (L.Layer ? L.Layer : L.Class).extend({
	// -- initialized is called on prototype
	initialize: function initialize(options) {
		this._map = null;
		this._canvas = null;
		this._frame = null;
		this._delegate = null;
		L.setOptions(this, options);
	},

	delegate: function delegate(del) {
		this._delegate = del;
		return this;
	},

	needRedraw: function needRedraw() {
		if (!this._frame) {
			this._frame = L.Util.requestAnimFrame(this.drawLayer, this);
		}
		return this;
	},

	// -------------------------------------------------------------
	_onLayerDidResize: function _onLayerDidResize(resizeEvent) {
		this._canvas.width = resizeEvent.newSize.x;
		this._canvas.height = resizeEvent.newSize.y;
	},
	// -------------------------------------------------------------
	_onLayerDidMove: function _onLayerDidMove() {
		var topLeft = this._map.containerPointToLayerPoint([0, 0]);
		L.DomUtil.setPosition(this._canvas, topLeft);
		this.drawLayer();
	},
	// -------------------------------------------------------------
	getEvents: function getEvents() {
		var events = {
			resize: this._onLayerDidResize,
			moveend: this._onLayerDidMove
		};
		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},
	// -------------------------------------------------------------
	onAdd: function onAdd(map) {
		this._map = map;
		this._canvas = L.DomUtil.create('canvas', 'leaflet-layer');
		this.tiles = {};

		var size = this._map.getSize();
		this._canvas.width = size.x;
		this._canvas.height = size.y;

		var animated = this._map.options.zoomAnimation && L.Browser.any3d;
		L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'));
		L.DomUtil.addClass(this._canvas, 'toplayer');
		
		map._panes.overlayPane.appendChild(this._canvas);

		map.on(this.getEvents(), this);

		var del = this._delegate || this;
		del.onLayerDidMount && del.onLayerDidMount(); // -- callback
		this.needRedraw();
	},

	// -------------------------------------------------------------
	onRemove: function onRemove(map) {
		var del = this._delegate || this;
		del.onLayerWillUnmount && del.onLayerWillUnmount(); // -- callback

		map.getPanes().overlayPane.removeChild(this._canvas);

		map.off(this.getEvents(), this);

		this._canvas = null;
	},

	// ------------------------------------------------------------
	addTo: function addTo(map) {
		map.addLayer(this);
		return this;
	},
	// --------------------------------------------------------------------------------
	LatLonToMercator: function LatLonToMercator(latlon) {
		return {
			x: latlon.lng * 6378137 * Math.PI / 180,
			y: Math.log(Math.tan((90 + latlon.lat) * Math.PI / 360)) * 6378137
		};
	},

	// ------------------------------------------------------------------------------
	drawLayer: function drawLayer() {
		// -- todo make the viewInfo properties flat objects.
		var size = this._map.getSize();
		var bounds = this._map.getBounds();
		var zoom = this._map.getZoom();

		var center = this.LatLonToMercator(this._map.getCenter());
		var corner = this.LatLonToMercator(this._map.containerPointToLatLng(this._map.getSize()));

		var del = this._delegate || this;
		del.onDrawLayer && del.onDrawLayer({
			layer: this,
			canvas: this._canvas,
			bounds: bounds,
			size: size,
			zoom: zoom,
			center: center,
			corner: corner
		});
		this._frame = null;
	},
	// -- L.DomUtil.setTransform from leaflet 1.0.0 to work on 0.0.7
	// ------------------------------------------------------------------------------
	_setTransform: function _setTransform(el, offset, scale) {
		var pos = offset || new L.Point(0, 0);

		el.style[L.DomUtil.TRANSFORM] = (L.Browser.ie3d ? 'translate(' + pos.x + 'px,' + pos.y + 'px)' : 'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') + (scale ? ' scale(' + scale + ')' : '');
	},

	// ------------------------------------------------------------------------------
	_animateZoom: function _animateZoom(e) {
		var scale = this._map.getZoomScale(e.zoom);
		// -- different calc of offset in leaflet 1.0.0 and 0.0.7 thanks for
		// 1.0.0-rc2 calc @jduggan1
		var offset = L.Layer ? this._map._latLngToNewLayerPoint(this._map.getBounds().getNorthWest(), e.zoom, e.center) : this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

		L.DomUtil.setTransform(this._canvas, offset, scale);
	}
});

L.canvasLayer = function () {
	return new L.CanvasLayer();
};
/*
 * Global class for simulating the movement of particle through a 1km wind grid
 * 
 * credit: All the credit for this work goes to: https://github.com/cambecc for
 * creating the repo: https://github.com/cambecc/earth. The majority of this
 * code is directly take nfrom there, since its awesome.
 * 
 * This class takes a canvas element and an array of data (1km GFS from
 * http://www.emc.ncep.noaa.gov/index.php?branch=GFS) and then uses a mercator
 * (forward/reverse) projection to correctly map wind vectors in "map space".
 * 
 * The "start" method takes the bounds of the map at its current extent and
 * starts the whole gridding, interpolation and animation process.
 */

var Windy = function Windy(params) {

	var VELOCITY_SCALE = 0.01 * (Math.pow(window.devicePixelRatio, 1 / 3) || 1); // scale
																					// for
																					// wind
																					// velocity
																					// (completely
																					// arbitrary--this
																					// value
																					// looks
																					// nice)
	var MAX_PARTICLE_AGE = 60; // max number of frames a particle is drawn
								// before regeneration
	var PARTICLE_LINE_WIDTH = 0.9; // line width of a drawn particle
	var PARTICLE_MULTIPLIER = 1 / 300; // particle count scalar (completely
										// arbitrary--this values looks nice)
	var PARTICLE_REDUCTION = Math.pow(window.devicePixelRatio, 1 / 3) || 1.6; // multiply
																				// particle
																				// count
																				// for
																				// mobiles
																				// by
																				// this
																				// amount
	var FRAME_RATE = 15,
	    FRAME_TIME = 1000 / FRAME_RATE; // desired frames per second

	var NULL_WIND_VECTOR = [NaN, NaN, null]; // singleton for no wind in the
												// form: [u, v, magnitude]

	var builder;
	var grid;
	var date;
	var λ0, φ0, Δλ, Δφ, ni, nj;

	// interpolation for vectors like wind (u,v,m)
	var bilinearInterpolateVector = function bilinearInterpolateVector(x, y, g00, g10, g01, g11) {
		var rx = 1 - x;
		var ry = 1 - y;
		var a = rx * ry,
		    b = x * ry,
		    c = rx * y,
		    d = x * y;
		var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d;
		var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d;
		var s = Math.sqrt( u*u+v*v ); 
		return [u, v, s];
	};

	var createWindBuilder = function createWindBuilder(uComp, vComp) {
		var uData = uComp.data,
		    vData = vComp.data;
		return {
			header: uComp.header,
			data: function data(i) {
				return [uData[i], vData[i]];
			},
			interpolate: bilinearInterpolateVector
		};
	};

	var createBuilder = function createBuilder(data) {
		var uComp = null,
		    vComp = null,
		    scalar = null;

		data.forEach(function (record) {
			switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
				case "2,2":
					uComp = record;break;
				case "2,3":
					vComp = record;break;
				default:
					scalar = record;
			}
		});

		return createWindBuilder(uComp, vComp);
	};

	var buildGrid = function buildGrid(data, callback) {

		builder = createBuilder(data);
		var header = builder.header;

		λ0 = header.lo1;
		φ0 = header.la1; // the grid's origin (e.g., 0.0E, 90.0N)

		Δλ = header.dx;
		Δφ = header.dy; // distance between grid points (e.g., 2.5 deg lon, 2.5
						// deg lat)

		ni = header.nx;
		nj = header.ny; // number of grid points W-E and N-S (e.g., 144 x 73)

		date = new Date(header.refTime);
		date.setHours(date.getHours() + header.forecastTime);

		// Scan mode 0 assumed. Longitude increases from λ0, and latitude
		// decreases from φ0.
		// http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
		grid = [];
		var p = 0;
		var isContinuous = Math.floor(ni * Δλ) >= 360;

		for (var j = 0; j < nj; j++) {
			var row = [];
			for (var i = 0; i < ni; i++, p++) {
				row[i] = builder.data(p);
			}
			if (isContinuous) {
				// For wrapped grids, duplicate first column as last column to
				// simplify interpolation logic
				row.push(row[0]);
			}
			grid[j] = row;
		}

		callback({
			date: date,
			interpolate: interpolate
		});
	};

	/**
	 * Get interpolated grid value from Lon/Lat position
	 * 
	 * @param λ
	 *            {Float} Longitude
	 * @param φ
	 *            {Float} Latitude
	 * @returns {Object}
	 */
	var interpolate = function interpolate(λ, φ) {

		if (!grid) return null;

		var i = floorMod(λ - λ0, 360) / Δλ; // calculate longitude index in
											// wrapped range [0, 360)
		var j = (φ0 - φ) / Δφ; // calculate latitude index in direction +90 to
								// -90

		var fi = Math.floor(i),
		    ci = fi + 1;
		var fj = Math.floor(j),
		    cj = fj + 1;

		var row;
		if (row = grid[fj]) {
			var g00 = row[fi];
			var g10 = row[ci];
			if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
				var g01 = row[fi];
				var g11 = row[ci];
				if (isValue(g01) && isValue(g11)) {
					// All four points found, so interpolate the value.
					return builder.interpolate(i - fi, j - fj, g00, g10, g01, g11);
				}
			}
		}
		return null;
	};

	/**
	 * @returns {Boolean} true if the specified value is not null and not
	 *          undefined.
	 */
	var isValue = function isValue(x) {
		return x !== null && x !== undefined;
	};

	/**
	 * @returns {Number} returns remainder of floored division, i.e., floor(a /
	 *          n). Useful for consistent modulo of negative numbers. See
	 *          http://en.wikipedia.org/wiki/Modulo_operation.
	 */
	var floorMod = function floorMod(a, n) {
		return a - n * Math.floor(a / n);
	};

	/**
	 * @returns {Number} the value x clamped to the range [low, high].
	 */
	var clamp = function clamp(x, range) {
		return Math.max(range[0], Math.min(x, range[1]));
	};

	/**
	 * @returns {Boolean} true if agent is probably a mobile device. Don't
	 *          really care if this is accurate.
	 */
	var isMobile = function isMobile() {
		return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(navigator.userAgent)
		);
	};

	/**
	 * Calculate distortion of the wind vector caused by the shape of the
	 * projection at point (x, y). The wind vector is modified in place and
	 * returned by this function.
	 */
	var distort = function distort(projection, λ, φ, x, y, scale, wind, windy) {
		var u = wind[0] * scale;
		var v = wind[1] * scale;
		var d = distortion(projection, λ, φ, x, y, windy);

		// Scale distortion vectors by u and v, then add.
		wind[0] = d[0] * u + d[2] * v;
		wind[1] = d[1] * u + d[3] * v;
		return wind;
	};

	var distortion = function distortion(projection, λ, φ, x, y, windy) {
		var τ = 2 * Math.PI;
		var H = Math.pow(10, -5.2);
		var hλ = λ < 0 ? H : -H;
		var hφ = φ < 0 ? H : -H;

		var pλ = project(φ, λ + hλ, windy);
		var pφ = project(φ + hφ, λ, windy);

		// Meridian scale factor (see Snyder, equation 4-3), where R = 1. This
		// handles issue where length of 1º λ
		// changes depending on φ. Without this, there is a pinching effect at
		// the poles.
		var k = Math.cos(φ / 360 * τ);
		return [(pλ[0] - x) / hλ / k, (pλ[1] - y) / hλ / k, (pφ[0] - x) / hφ, (pφ[1] - y) / hφ];
	};

	var createField = function createField(columns, bounds, callback) {

		/**
		 * @returns {Array} wind vector [u, v, magnitude] at the point (x, y),
		 *          or [NaN, NaN, null] if wind is undefined at that point.
		 */
		function field(x, y) {
			if (!columns) return [NaN, NaN, null];
			var column = columns[Math.round(x)];
			return column && column[Math.round(y)] || NULL_WIND_VECTOR;
		}

		// Frees the massive "columns" array for GC. Without this, the array is
		// leaked (in Chrome) each time a new
		// field is interpolated because the field closure's context is leaked,
		// for reasons that defy explanation.
		field.release = function () {
			// delete columns;
			columns = [];
		};

		field.randomize = function (o) {
			// UNDONE: this method is terrible
			var x, y;
			var safetyNet = 0;
			do {
				x = Math.round(Math.floor(Math.random() * bounds.width) + bounds.x);
				y = Math.round(Math.floor(Math.random() * bounds.height) + bounds.y);
			} while (field(x, y)[2] === null && safetyNet++ < 30);
			o.x = x;
			o.y = y;
			return o;
		};

		// field.overlay = mask.imageData;
		// return field;
		callback(bounds, field);
	};

	var buildBounds = function buildBounds(bounds, width, height) {
		var upperLeft = bounds[0];
		var lowerRight = bounds[1];
		var x = Math.round(upperLeft[0]); // Math.max(Math.floor(upperLeft[0],
											// 0), 0);
		var y = Math.max(Math.floor(upperLeft[1], 0), 0);
		var xMax = Math.min(Math.ceil(lowerRight[0], width), width - 1);
		var yMax = Math.min(Math.ceil(lowerRight[1], height), height - 1);
		return { x: x, y: y, xMax: width, yMax: yMax, width: width, height: height };
	};

	var deg2rad = function deg2rad(deg) {
		return deg / 180 * Math.PI;
	};

	var rad2deg = function rad2deg(ang) {
		return ang / (Math.PI / 180.0);
	};

	var invert = function invert(x, y, windy) {
		var mapLonDelta = windy.east - windy.west;
		var worldMapRadius = windy.width / rad2deg(mapLonDelta) * 360 / (2 * Math.PI);
		var mapOffsetY = worldMapRadius / 2 * Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south)));
		var equatorY = windy.height + mapOffsetY;
		var a = (equatorY - y) / worldMapRadius;

		var lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI / 2);
		var lon = rad2deg(windy.west) + x / windy.width * rad2deg(mapLonDelta);
		return [lon, lat];
	};

	var mercY = function mercY(lat) {
		return Math.log(Math.tan(lat / 2 + Math.PI / 4));
	};

	var project = function project(lat, lon, windy) {
		// both in radians, use deg2rad if neccessary
		var ymin = mercY(windy.south);
		var ymax = mercY(windy.north);
		var xFactor = windy.width / (windy.east - windy.west);
		var yFactor = windy.height / (ymax - ymin);

		var y = mercY(deg2rad(lat));
		var x = (deg2rad(lon) - windy.west) * xFactor;
		var y = (ymax - y) * yFactor; // y points south
		return [x, y];
	};

	var interpolateField = function interpolateField(grid, bounds, extent, callback) {

		var projection = {};

		var mapArea = (extent.south - extent.north) * (extent.west - extent.east);
		var velocityScale = VELOCITY_SCALE * Math.pow(mapArea, 0.3);

		var columns = [];
		var x = bounds.x;

		function interpolateColumn(x) {
			var column = [];
			for (var y = bounds.y; y <= bounds.yMax; y += 2) {
				var coord = invert(x, y, extent);
				if (coord) {
					var λ = coord[0],
					    φ = coord[1];
					if (isFinite(λ)) {
						var wind = grid.interpolate(λ, φ);
						if (wind) {
							wind = distort(projection, λ, φ, x, y, velocityScale, wind, extent);
							column[y + 1] = column[y] = wind;
						}
					}
				}
			}
			columns[x + 1] = columns[x] = column;
		}

		for (; x < bounds.width; x += 2) {
			interpolateColumn(x);
		}
		createField(columns, bounds, callback);
	};

	var particles, animationLoop;
	var animate = function animate(bounds, field, extent) {

		function asColorStyle(r, g, b, a) {
			return "rgba(" + 243 + ", " + 243 + ", " + 238 + ", " + a + ")";
		}

		function hexToR(h) {
			return parseInt(cutHex(h).substring(0, 2), 16);
		}
		function hexToG(h) {
			return parseInt(cutHex(h).substring(2, 4), 16);
		}
		function hexToB(h) {
			return parseInt(cutHex(h).substring(4, 6), 16);
		}
		function cutHex(h) {
			return h.charAt(0) == "#" ? h.substring(1, 7) : h;
		}

		function windColorScale(minV, maxV) {

			var result = ["rgb(255,255,255)", "rgb(255,255,255)"];
			result.indexFor = function (m) {
				// map wind speed to a style
				if(m==undefined){
					m=0;
				}
				var r = Math.max(0, Math.min(result.length - 1, Math.round((m - minV) / (maxV - minV) * (result.length - 1))));
				return r;
			};
			return result;
		}

		var colorStyles = windColorScale(0, 10);
		var buckets = colorStyles.map(function () {
			return [];
		});
		var mapArea = (extent.south - extent.north) * (extent.west - extent.east);
		var particleCount = Math.round(bounds.width * bounds.height * PARTICLE_MULTIPLIER * Math.pow(mapArea, 0.24));
		if (isMobile()) {
			particleCount /= PARTICLE_REDUCTION;
		}

		particles = particles || [];
		if (particles.length > particleCount) particles = particles.slice(0, particleCount);
		for (var i = particles.length; i < particleCount; i++) {
			particles.push(field.randomize({ age: ~~(Math.random() * MAX_PARTICLE_AGE) + 0 }));
		}

		function evolve() {
			buckets.forEach(function (bucket) {
				bucket.length = 0;
			});
			particles.forEach(function (particle) {
				if (particle.age > MAX_PARTICLE_AGE) {
					field.randomize(particle).age = ~~(Math.random() * MAX_PARTICLE_AGE / 2);
				}
				var x = particle.x;
				var y = particle.y;
				var v = field(x, y); // vector at current position
				var m = v[2];
				if (m === null) {
					particle.age = MAX_PARTICLE_AGE; // particle has escaped
														// the grid, never to
														// return...
				} else {
					var xt = x + v[0];
					var yt = y + v[1];
					if (field(xt, yt)[0] !== null) {
						// Path from (x,y) to (xt,yt) is visible, so add this
						// particle to the appropriate draw bucket.
						particle.xt = xt;
						particle.yt = yt;
						buckets[colorStyles.indexFor(m)].push(particle);
					} else {
						// Particle isn't visible, but it still moves through
						// the field.
						particle.x = xt;
						particle.y = yt;
					}
				}
				particle.age += 1;
			});
		}

		var g = params.canvas.getContext("2d");
		
		g.lineWidth = PARTICLE_LINE_WIDTH;

		function draw() {
			// Fade existing particle trails.
			g.save();
			g.globalAlpha = .16;
			g.globalCompositeOperation = 'destination-out';
			g.fillStyle = '#000';
			g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
			g.restore();
			
			
			// Draw new particle trails.
			buckets.forEach(function (bucket, i) {
				if (bucket.length > 0) {
					g.beginPath();
					g.strokeStyle = colorStyles[i];
					bucket.forEach(function (particle) {
						g.moveTo(particle.x, particle.y);
						g.lineTo(particle.xt, particle.yt);
						particle.x = particle.xt;
						particle.y = particle.yt;
					});
					g.stroke();
				}
			});
		}

		var then = Date.now();
		(function frame() {
			animationLoop = requestAnimationFrame(frame);
			var now = Date.now();
			var delta = now - then;
			if (delta > FRAME_TIME) {
				then = now - delta % FRAME_TIME;
				evolve();
				draw();
			}
		})();
	};

	var updateData = function updateData(data, bounds, width, height, extent) {
		delete params.data;
		params.data = data;
		if (extent) start(bounds, width, height, extent);
	};

	var start = function start(bounds, width, height, extent) {
		var mapBounds = {
			south: deg2rad(extent[0][1]),
			north: deg2rad(extent[1][1]),
			east: deg2rad(extent[1][0]),
			west: deg2rad(extent[0][0]),
			width: width,
			height: height
		};
		stop();
		// build grid
		buildGrid(params.data, function (grid) {
			// interpolateField
			interpolateField(grid, buildBounds(bounds, width, height), mapBounds, function (bounds, field) {
				// animate the canvas with random points
				windy.field = field;
				animate(bounds, field, mapBounds);
			});
		});
	};

	var stop = function stop() {
		if (windy.field) windy.field.release();
		if (animationLoop) cancelAnimationFrame(animationLoop);
	};

	var shift = function shift(dx, dy) {
		var canvas = params.canvas,
		    w = canvas.width,
		    h = canvas.height,
		    ctx = canvas.getContext("2d");
		if (w > dx && h > dy) {
			var clamp = function clamp(high, value) {
				return Math.max(0, Math.min(high, value));
			};
			var imageData = ctx.getImageData(clamp(w, -dx), clamp(h, -dy), clamp(w, w - dx), clamp(h, h - dy));
			ctx.clearRect(0, 0, w, h);
			ctx.putImageData(imageData, clamp(w, dx), clamp(h, dy));
			for (var i = 0, pLength = particles.length; i < pLength; i++) {
				particles[i].x += dx;
				particles[i].y += dy;
			}
		}
	};

	var windy = {
		params: params,
		start: start,
		stop: stop,
		update: updateData,
		shift: shift,
		createField: createField,
		interpolatePoint: interpolate
	};

	return windy;
};

// shim layer with setTimeout fallback
window.requestAnimationFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
		return window.setTimeout(callback, 1000 / FRAME_RATE);
	};
}();

if (!window.cancelAnimationFrame) {
	window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
}


L.Map.mergeOptions({
	positionControl: false
});

L.Map.addInitHook(function () {
	if (this.options.positionControl) {
		this.positionControl = new L.Control.MousePosition();
		this.addControl(this.positionControl);
	}
});

(function (root, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {

		// CommonJS
		module.exports = factory(require('wind-js-leaflet'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['wind-js-leaflet'], function (WindJSLeaflet) {
			return root.returnExportsGlobal = factory(window);
		});
	} else {
		// Global Variables
		window.WindJSLeaflet = factory(window);
	}
})(undefined, function (window) {

	'use strict';

	var WindJSLeaflet = {

		_map: null,
		_data: null,
		_options: null,
		_canvasLayer: null,
		_windy: null,
		_context: null,
		_timer: 0,
		_mouseControl: null,

		init: function init(options) {

			// set properties
			WindJSLeaflet._map = options.map;
			WindJSLeaflet._options = options;

			if(WindJSLeaflet._canvasLayer){
				WindJSLeaflet._map.removeLayer(WindJSLeaflet._canvasLayer);
			}
			
			// create canvas, add overlay control
			WindJSLeaflet._canvasLayer = L.canvasLayer().delegate(WindJSLeaflet);

			WindJSLeaflet._canvasLayer.addTo(Product.map);
			
			// ensure clean up on deselect overlay
			WindJSLeaflet._map.on('overlayremove', function (e) {
				if (e.layer == WindJSLeaflet._canvasLayer) {
					WindJSLeaflet._destroyWind();
				}
			});
			
			return this;
		},

		reload : function reload(){
			WindJSLeaflet._clearWind();
			WindJSLeaflet._loadWindData();
		},
		
		/*------------------------------------ PRIVATE ------------------------------------------*/

		_getRequestUrl: function _getRequestUrl() {

			var params = {
				"time": time
			};

			return this._options.latestUrl + '?' + $.param(params);
		},

		_loadWindData: function _loadWindData() {

			var request = this._getRequestUrl();
			console.log(request);

			$.ajax({
				type: 'GET',
				url: request,
				error: function error(err) {
					console.log('error loading data');
					WindJSLeaflet._options.errorCallback(err) || console.log(err);
				},
				success: function success(data) {
					WindJSLeaflet._data = data;
					WindJSLeaflet._initWindy(data);
				}
			});
		},

		onDrawLayer: function onDrawLayer(overlay, params) {

			if (!WindJSLeaflet._windy) {
				WindJSLeaflet._loadWindData();
				return;
			}

			if (this._timer) clearTimeout(WindJSLeaflet._timer);

			this._timer = setTimeout(function () {

				var bounds = WindJSLeaflet._map.getBounds();
				var size = WindJSLeaflet._map.getSize();

				// bounds, width, height, extent
				WindJSLeaflet._windy.start([[0, 0], [size.x, size.y]], size.x, size.y, [[bounds._southWest.lng, bounds._southWest.lat], [bounds._northEast.lng, bounds._northEast.lat]]);
			}, 750); // showing wind is delayed
		},

		_initWindy: function _initWindy(data) {

			// windy object
			this._windy = new Windy({ canvas: WindJSLeaflet._canvasLayer._canvas, data: data });

			// prepare context global var, start drawing
			this._context = this._canvasLayer._canvas.getContext('2d');
			this._canvasLayer._canvas.classList.add("wind-overlay");
			this.onDrawLayer();

			this._map.on('dragstart', WindJSLeaflet._windy.stop);
			this._map.on('zoomstart', WindJSLeaflet._clearWind);
			this._map.on('resize', WindJSLeaflet._clearWind);
		},

		_clearWind: function _clearWind() {
			if (this._windy) this._windy.stop();
			if (this._context) this._context.clearRect(0, 0, 3000, 3000);
		},

		_destroyWind: function _destroyWind() {
			if (this._timer) clearTimeout(this._timer);
			if (this._windy) this._windy.stop();
			if (this._context) this._context.clearRect(0, 0, 3000, 3000);
			if (this._mouseControl) this._map.removeControl(this._mouseControl);
			this._mouseControl = null;
			this._windy = null;
			this._map.removeLayer(this._canvasLayer);
		}
	};

	return WindJSLeaflet;
});