!(function(e, z) {
  'use strict';
  var n = {};
  function o(e) {
    z.GeographicTilingScheme.call(this, e), (this._numberOfLevelZeroTiles = this._numberOfLevelZeroTilesX * this._numberOfLevelZeroTilesY);
  }
  function s(e, t) {
    var i = { url: e.url, retryAttempts: 1 };
    z.Resource.call(this, i), (this._bmEndpoint = e), (this._bmEndpointDomain = new z.Uri(e.url).authority), (this._bmEndpointResource = t), (this._bmRoot = void 0), (this._pendingPromise = void 0), (this._credits = void 0);
  }
  (n.accessToken = void 0),
    (n.URL = 'http://localhost:9000'),
    z.defined(Object.create) && ((o.prototype = Object.create(z.GeographicTilingScheme.prototype)).constructor = o),
    (o.prototype.getNumberOfYTilesAtLevel = function(e) {
      return 1 === this._numberOfLevelZeroTiles ? this._numberOfLevelZeroTilesY << (0 < e ? e - 1 : 0) : this._numberOfLevelZeroTilesY << e;
    }),
    z.defined(Object.create) && ((s.prototype = Object.create(z.Resource.prototype)).constructor = s),
    (s.fromId = function(t, i) {
      return z.defined(n.accessToken)
        ? Promise.resolve(s._createJsonResource(t, i))
        : s
            ._getAccessToken(i)
            .fetchJson()
            .then(function(e) {
              return (n.accessToken = e.token), s._createJsonResource(t, i);
            });
    }),
    (s.prototype.clone = function(e) {
      var t = z.defaultValue(this._bmRoot, this);
      return z.defined(e) || (e = new s(t._bmEndpoint, t._bmEndpointResource)), ((e = z.Resource.prototype.clone.call(this, e))._bmRoot = t), e;
    }),
    (s.prototype.fetchImage = function(e) {
      var t = e;
      return (e = { preferBlob: !0 }), z.defined(t) && ((e.flipY = t.flipY), (e.preferImageBitmap = t.preferImageBitmap)), z.Resource.prototype.fetchImage.call(this, e);
    }),
    (s.prototype._makeRequest = function(e) {
      return new z.Uri(this.url).authority !== this._bmEndpointDomain || z.defined(e.headers) || (e.headers = {}), z.Resource.prototype._makeRequest.call(this, e);
    }),
    (s._createJsonResource = function(e, t) {
      var i = n.URL,
        i = ((t = z.defaultValue(t, z.defaultValue.EMPTY_OBJECT)), z.defaultValue(t.server, i)),
        r = z.defaultValue(t.accessToken, n.accessToken),
        i = z.Resource.createIfNeeded(i),
        e = { url: 'v3/' + e + '.json', queryParameters: {} };
      return z.defined(r) && (e.queryParameters.access_token = r), z.defined(t.combineMode) && (e.queryParameters.mode = t.combineMode), i.getDerivedResource(e);
    }),
    (s._getAccessToken = function(e) {
      var t = n.URL,
        e = ((e = z.defaultValue(e, z.defaultValue.EMPTY_OBJECT)), z.defaultValue(e.server, t));
      return (e = z.Resource.createIfNeeded(e)).getDerivedResource({ url: 'tokens/v1' });
    });
  var r,
    a = /((?:.*\/)|^)cesium-bigemap\.js$/;
  function t(e, t) {
    var i,
      e =
        (function() {
          for (var e = document.getElementsByTagName('script'), t = 0, i = e.length; t < i; ++t) {
            var r = e[t].getAttribute('src'),
              r = a.exec(r);
            if (null !== r) return r[1];
          }
        })() +
        'Workers/' +
        e +
        '.js';
    (i = e), (e = 'undefined' == typeof document ? i : (((r = z.defined(r) ? r : document.createElement('a')).href = i), (r.href = r.href), r.href)), z.TaskProcessor.call(this, e, t);
  }
  function g(e) {
    (e = z.defaultValue(e, z.defaultValue.EMPTY_OBJECT)), (this._buffer = e.buffer), (this._credits = e.credits), (this._negativeAltitudeExponentBias = e.negativeAltitudeExponentBias), (this._negativeElevationThreshold = e.negativeElevationThreshold);
    var t = z.defaultValue(e.childTileMask, 15),
      i = 3 & t;
    (this._childTileMask = i | (4 & t ? 8 : 0) | (8 & t ? 4 : 0)),
      (this._createdByUpsampling = z.defaultValue(e.createdByUpsampling, !1)),
      (this._skirtHeight = void 0),
      (this._bufferType = this._buffer.constructor),
      (this._mesh = void 0),
      (this._minimumHeight = void 0),
      (this._maximumHeight = void 0);
  }
  z.defined(Object.create) && ((t.prototype = Object.create(z.TaskProcessor.prototype)).constructor = t),
    Object.defineProperties(g.prototype, {
      credits: {
        get: function() {
          return this._credits;
        }
      },
      waterMask: { get: function() {} }
    });
  var c = new t('createVerticesFromBMBuffer'),
    d =
      ((g.prototype.createMesh = function(e) {
        const t = (e = z.defaultValue(e, z.defaultValue.EMPTY_OBJECT)).tilingScheme;
        var i,
          r = e.x,
          n = e.y,
          o = e.level,
          a = z.defaultValue(e.exaggeration, 1),
          e = z.defaultValue(e.exaggerationRelativeHeight, 0),
          s = t.ellipsoid,
          l = t.tileXYToNativeRectangle(r, n, o),
          r = t.tileXYToRectangle(r, n, o),
          u = s.cartographicToCartesian(z.Rectangle.center(r));
        this._skirtHeight = Math.min(8 * (40075.16 / (1 << o)), 1e3);
        const d = c.scheduleTask({
          buffer: this._buffer,
          nativeRectangle: l,
          rectangle: r,
          relativeToCenter: u,
          ellipsoid: s,
          skirtHeight: this._skirtHeight,
          exaggeration: a,
          exaggerationRelativeHeight: e,
          includeWebMercatorT: !0,
          negativeAltitudeExponentBias: this._negativeAltitudeExponentBias,
          negativeElevationThreshold: this._negativeElevationThreshold
        });
        if (z.defined(d))
          return (
            (i = this),
            d.then(function(e) {
              return (
                (i._mesh = new z.TerrainMesh(
                  u,
                  new Float32Array(e.vertices),
                  new Uint16Array(e.indices),
                  e.indexCountWithoutSkirts,
                  e.vertexCountWithoutSkirts,
                  e.minimumHeight,
                  e.maximumHeight,
                  z.BoundingSphere.clone(e.boundingSphere3D),
                  z.Cartesian3.clone(e.occludeePointInScaledSpace),
                  e.numberOfAttributes,
                  z.OrientedBoundingBox.clone(e.orientedBoundingBox),
                  z.TerrainEncoding.clone(e.encoding),
                  e.westIndicesSouthToNorth,
                  e.southIndicesEastToWest,
                  e.eastIndicesNorthToSouth,
                  e.northIndicesWestToEast
                )),
                (i._minimumHeight = e.minimumHeight),
                (i._maximumHeight = e.maximumHeight),
                (i._buffer = void 0),
                i._mesh
              );
            })
          );
      }),
      (g.prototype.interpolateHeight = function(e, t, i) {
        (t = z.Math.clamp((t - e.west) / e.width, 0, 1)), (i = z.Math.clamp((i - e.south) / e.height, 0, 1));
        if (z.defined(this._mesh))
          for (var r = this, n = t, O = i, o = (r = r._mesh).vertices, a = r.encoding, s = r.indices, l = 0, D = s.length; l < D; l += 3) {
            var u = s[l],
              d = s[l + 1],
              c = s[l + 2],
              h = a.decodeTextureCoordinates(o, u, W),
              m = a.decodeTextureCoordinates(o, d, q),
              f = a.decodeTextureCoordinates(o, c, Z),
              h = z.Intersections2D.computeBarycentricCoordinates(n, O, h.x, h.y, m.x, m.y, f.x, f.y, G);
            if (-1e-15 <= h.x && -1e-15 <= h.y && -1e-15 <= h.z) return (m = a.decodeHeight(o, u)), (f = a.decodeHeight(o, d)), (u = a.decodeHeight(o, c)), h.x * m + h.y * f + h.z * u;
          }
        else {
          var v = this,
            g = t,
            p = i,
            r = e,
            t = v._buffer,
            _ = 0,
            y = 0,
            T = 0;
          0.5 < p ? (0.5 < g ? ((_ = 2), (y = 0.5)) : (_ = 3), (T = 0.5)) : 0.5 < g && ((_ = 1), (y = 0.5));
          for (var E = new DataView(t), b = 0, x = 0; x < _; ++x) b = (b += E.getUint32(b, !0)) + Q;
          b = b + Q + 2 * ee;
          var P,
            t = z.Math.toRadians(180 * E.getFloat64(b, !0)),
            i = ((b += ee), z.Math.toRadians(180 * E.getFloat64(b, !0))),
            Y = ((b += ee), t / r.width),
            V = i / r.height,
            M = E.getInt32(b, !0),
            B = ((b += $), 3 * E.getInt32(b, !0)),
            w = ((b = b + $ + $), new Array(M)),
            R = new Array(M),
            C = new Array(M);
          for (P = 0; P < M; ++P) {
            (w[P] = y + E.getUint8(b++) * Y), (R[P] = T + E.getUint8(b++) * V);
            var A = E.getFloat32(b, !0);
            (b += K), 0 !== A && A < v._negativeElevationThreshold && (A *= -Math.pow(2, v._negativeAltitudeExponentBias)), (C[P] = 6371010 * A);
          }
          var k = new Array(B);
          for (P = 0; P < B; ++P) (k[P] = E.getUint16(b, !0)), (b += X);
          for (P = 0; P < B; P += 3) {
            var S = k[P],
              L = k[P + 1],
              I = k[P + 2],
              H = w[S],
              U = w[L],
              j = w[I],
              J = R[S],
              N = R[L],
              F = R[I],
              H = z.Intersections2D.computeBarycentricCoordinates(g, p, H, J, U, N, j, F, G);
            if (-1e-15 <= H.x && -1e-15 <= H.y && -1e-15 <= H.z) return H.x * C[S] + H.y * C[L] + H.z * C[I];
          }
        }
      }),
      new z.TaskProcessor('upsampleQuantizedTerrainMesh', z.TerrainData.maximumAsynchronousTasks)),
    W =
      ((g.prototype.upsample = function(e, t, i, r, n, o, a) {
        var s = this._mesh;
        if (z.defined(this._mesh)) {
          var l,
            t = 2 * t !== n,
            i = 2 * i === o,
            u = e.ellipsoid,
            e = e.tileXYToRectangle(n, o, a),
            n = d.scheduleTask({
              vertices: s.vertices,
              indices: s.indices,
              indexCountWithoutSkirts: s.indexCountWithoutSkirts,
              vertexCountWithoutSkirts: s.vertexCountWithoutSkirts,
              encoding: s.encoding,
              minimumHeight: this._minimumHeight,
              maximumHeight: this._maximumHeight,
              isEastChild: t,
              isNorthChild: i,
              childRectangle: e,
              ellipsoid: u
            });
          if (z.defined(n))
            return (
              (l = this),
              n.then(function(e) {
                var t = new Uint16Array(e.vertices),
                  i = z.IndexDatatype.createTypedArray(t.length / 3, e.indices),
                  r = l._skirtHeight;
                return new z.QuantizedMeshTerrainData({
                  quantizedVertices: t,
                  indices: i,
                  minimumHeight: e.minimumHeight,
                  maximumHeight: e.maximumHeight,
                  boundingSphere: z.BoundingSphere.clone(e.boundingSphere),
                  orientedBoundingBox: z.OrientedBoundingBox.clone(e.orientedBoundingBox),
                  horizonOcclusionPoint: z.Cartesian3.clone(e.horizonOcclusionPoint),
                  westIndices: e.westIndices,
                  southIndices: e.southIndices,
                  eastIndices: e.eastIndices,
                  northIndices: e.northIndices,
                  westSkirtHeight: r,
                  southSkirtHeight: r,
                  eastSkirtHeight: r,
                  northSkirtHeight: r,
                  childTileMask: 0,
                  createdByUpsampling: !0,
                  credits: l._credits
                });
              })
            );
        }
      }),
      (g.prototype.isChildAvailable = function(e, t, i, r) {
        var n = 2;
        return i !== 2 * e && ++n, r !== 2 * t && (n -= 2), 0 != (this._childTileMask & (1 << n));
      }),
      (g.prototype.wasCreatedByUpsampling = function() {
        return this._createdByUpsampling;
      }),
      new z.Cartesian2()),
    q = new z.Cartesian2(),
    Z = new z.Cartesian2(),
    G = new z.Cartesian3();
  var X = Uint16Array.BYTES_PER_ELEMENT,
    Q = Uint32Array.BYTES_PER_ELEMENT,
    $ = Int32Array.BYTES_PER_ELEMENT,
    K = Float32Array.BYTES_PER_ELEMENT,
    ee = Float64Array.BYTES_PER_ELEMENT;
  var l = new z.JulianDate();
  function u() {
    (this._terrainCache = {}), (this._lastTidy = z.JulianDate.now());
  }
  function i(e) {
    var o,
      t = (e = z.defaultValue(e, z.defaultValue.EMPTY_OBJECT)).terrainId,
      i = ((this._tilingScheme = new z.GeographicTilingScheme({ numberOfLevelZeroTilesX: 2, numberOfLevelZeroTilesY: 1, ellipsoid: e.ellipsoid })), (this._negativeAltitudeExponentBias = 32), (this._negativeAltitudeThreshold = z.Math.EPSILON12), e.credit),
      a =
        ('string' == typeof i && (i = new z.Credit(i)),
        (this._credit = i),
        (this._availability = void 0),
        (this._levelZeroMaximumGeometricError = 40075.16),
        (this._terrainCache = new u()),
        (this._terrainPromises = {}),
        (this._terrainRequests = {}),
        (this._errorEvent = new z.Event()),
        (this._ready = !1),
        (this._overallMaxLevel = 0),
        (this._overallMinLevel = 32),
        this._resource,
        this);
    this._readyPromise = s
      .fromId(t, e)
      .then(function(e) {
        return (a._resource = e), a._resource.fetchJson();
      })
      .then(function(e) {
        var t, i, r, n;
        if (e.format)
          if (e.tiles && 0 !== e.tiles.length) {
            if (0 === e.format.indexOf('bmele'))
              return (
                (a._tileUrlTemplates = e.tiles),
                (t = e.minzoom),
                (i = e.maxzoom),
                (t -= t % 2 == 0 ? 2 : 1),
                (i -= i % 2 == 0 ? 2 : 1),
                (t = Math.max(t, 5)),
                (i = Math.max(i, 5)),
                (a._overallMinLevel = Math.min(a._overallMinLevel, t)),
                (a._overallMaxLevel = Math.max(a._overallMaxLevel, i)),
                (n = e.bounds),
                (r = new z.TileAvailability(a._tilingScheme, i)).addAvailableTileRange(0, 0, 0, 1, 1),
                r.computeAvailableTileRangeFromBounds(n, t, i),
                (a._availability = r),
                z.defined(e.attribution) && ((n = new z.Credit(e.attribution)), z.defined(a._tileCredits) ? a._tileCredits.push(n) : (a._tileCredits = [n])),
                !0
              );
            (t = 'The tile format "' + e.format + '" is invalid or not supported.'), (o = z.TileProviderError.handleError(o, a, a._errorEvent, t, void 0, void 0, void 0));
          } else (t = 'The json file does not specify any tile URL templates.'), (o = z.TileProviderError.handleError(o, a, a._errorEvent, t, void 0, void 0, void 0));
        else (t = 'The tile format is not specified in the json file.'), (o = z.TileProviderError.handleError(o, a, a._errorEvent, t, void 0, void 0, void 0));
      })
      .then(function(e) {
        a._ready = e;
      })
      .catch(function(e) {
        return (o = z.TileProviderError.handleError(o, a, a._errorEvent, e.message, void 0, void 0, void 0, e)), Promise.reject(e);
      });
  }
  (u.prototype.add = function(e, t) {
    this._terrainCache[e] = { buffer: t, timestamp: z.JulianDate.now() };
  }),
    (u.prototype.get = function(e) {
      e = this._terrainCache[e];
      if (z.defined(e)) return e.buffer;
    }),
    (u.prototype.tidy = function() {
      if ((z.JulianDate.now(l), 10 < z.JulianDate.secondsDifference(l, this._lastTidy))) {
        for (var e = this._terrainCache, t = Object.keys(e), i = t.length, r = 0; r < i; ++r) {
          var n = t[r],
            o = e[n];
          10 < z.JulianDate.secondsDifference(l, o.timestamp) && delete e[n];
        }
        z.JulianDate.clone(l, this._lastTidy);
      }
    }),
    Object.defineProperties(i.prototype, {
      tilingScheme: {
        get: function() {
          return this._tilingScheme;
        }
      },
      errorEvent: {
        get: function() {
          return this._errorEvent;
        }
      },
      ready: {
        get: function() {
          return this._ready;
        }
      },
      readyPromise: {
        get: function() {
          return this._readyPromise;
        }
      },
      credit: {
        get: function() {
          return this._credit;
        }
      },
      hasWaterMask: {
        get: function() {
          return !1;
        }
      },
      hasVertexNormals: {
        get: function() {
          return !1;
        }
      },
      availability: {
        get: function() {
          return this._availability;
        }
      }
    });
  var p = new t('decodeBMServerPacket');
  function h(e) {
    var r = (e = z.defaultValue(e, z.defaultValue.EMPTY_OBJECT)).mapId,
      n =
        ((this.defaultAlpha = void 0),
        (this.defaultBrightness = void 0),
        (this.defaultContrast = void 0),
        (this.defaultHue = void 0),
        (this.defaultSaturation = void 0),
        (this.defaultGamma = void 0),
        (this.defaultMinificationFilter = void 0),
        (this.defaultMagnificationFilter = void 0),
        (this._ready = !1),
        (this._tileCredits = void 0),
        (this._errorEvent = new z.Event()),
        this._resource,
        this);
    this._readyPromise = s
      .fromId(r, e)
      .then(function(e) {
        return (n._resource = e), n._resource.fetchJson();
      })
      .then(function(e) {
        if ('IMAGERY' !== e.type) return Promise.reject(new z.RuntimeError('The id of map ' + r + ' is invalid.'));
        var t = {},
          i = e.tiles[0];
        if (
          ('tms' === e.scheme && (i = i.replace('{y}', '{reverseY}')),
          (t.url = new s({ url: i }, n._resource)),
          (t.srs = e.srs),
          (t.minimumLevel = e.minzoom),
          (t.maximumLevel = e.maxzoom),
          (t.rectangle = z.Rectangle.fromDegrees(e.bounds[0], e.bounds[1], e.bounds[2], e.bounds[3])),
          'webmercator' === e.srs)
        )
          t.tilingScheme = new z.WebMercatorTilingScheme();
        else {
          if ('wgs84' !== e.srs) throw new z.DeveloperError('Currently not support this map.');
          (t.tilingScheme = new o({ numberOfLevelZeroTilesX: 1, numberOfLevelZeroTilesY: 1 })), (t.minimumLevel = Math.max(t.minimumLevel, 2));
        }
        i = new z.UrlTemplateImageryProvider(t);
        return (
          i.errorEvent.addEventListener(function(e) {
            (e.provider = n)._errorEvent.raiseEvent(e);
          }),
          (n._imageryProvider = i).readyPromise.then(function(e) {
            return (n._ready = e), !0;
          })
        );
      })
      .catch(function(e) {
        var t = 'An error occurred while accessing ' + n._resource.url + '.';
        return z.TileProviderError.handleError(void 0, n, n._errorEvent, t), Promise.reject(e);
      });
  }
  (i.prototype.requestTileGeometry = function(e, t, i, r) {
    var n = this,
      o = (function(e, t, i) {
        for (var r = '', n = i; 0 <= n; --n) {
          var o = 1 << n,
            a = 0;
          z.isBitSet(t, o) ? z.isBitSet(e, o) && (a |= 1) : ((a |= 2), z.isBitSet(e, o) || (a |= 1)), (r += a);
        }
        return r;
      })(e, t, i),
      a = n._terrainCache,
      s = a.get(o);
    if (z.defined(s)) return Promise.resolve(new g({ buffer: s, childTileMask: void 0, credits: void 0, negativeAltitudeExponentBias: n._negativeAltitudeExponentBias, negativeElevationThreshold: n._negativeAltitudeThreshold }));
    if ((a.tidy(), i < n._overallMinLevel)) return Promise.resolve(new z.HeightmapTerrainData({ buffer: new Uint8Array(256), width: 16, height: 16 }));
    var l = o.substring(0, o.length - (i % 2 == 0 ? 1 : 0)),
      s = i + 1,
      u = s % 2 == 0 ? 0 : 1,
      d = e >> u,
      c = t >> u,
      s = s - u,
      u = n._tileUrlTemplates;
    if (0 !== u.length) {
      var h,
        e = u[(e + t + i) % u.length],
        m = n._terrainPromises,
        f = n._terrainRequests;
      if (z.defined(m[l])) (h = m[l]), (v = f[l]);
      else {
        var v = r,
          t = n._resource.getDerivedResource({ url: e, templateValues: { x: d, y: c, z: s }, request: v }).fetchArrayBuffer();
        if (!z.defined(t)) return;
        (h = t.then(function(e) {
          return z.defined(e)
            ? p.scheduleTask({ buffer: e, type: 'Terrain' }, [e]).then(function(e) {
                a.add(l, e[0]);
                for (var t = e.length - 1, i = 0; i < t; ++i) {
                  var r = l + i.toString();
                  a.add(r, e[i + 1]);
                }
              })
            : Promise.reject(new z.RuntimeError('Failed to load terrain.'));
        })),
          (m[l] = h),
          (f[l] = v),
          (h = h.finally(function() {
            delete m[l], delete f[l];
          }));
      }
      return h
        .then(function() {
          var e = a.get(o);
          return z.defined(e) ? new g({ buffer: e, childTileMask: void 0, credits: void 0, negativeAltitudeExponentBias: n._negativeAltitudeExponentBias, negativeElevationThreshold: n._negativeAltitudeThreshold }) : Promise.reject(new z.RuntimeError('Failed to load terrain.'));
        })
        .catch(function(e) {
          return v && r && v.state === z.RequestState.CANCELLED && (r.state = v.state), Promise.reject(e);
        });
    }
  }),
    (i.prototype.getLevelMaximumGeometricError = function(e) {
      return this._levelZeroMaximumGeometricError / (1 << e);
    }),
    (i.prototype.getTileDataAvailable = function(e, t, i) {
      return !(i > this._overallMaxLevel) && ((0 <= i && i < this._overallMinLevel) || this._availability.isTileAvailable(i, e, t));
    }),
    (i.prototype.loadTileDataAvailability = function(e, t, i) {}),
    (z.TileAvailability.prototype.computeAvailableTileRangeFromBounds = function(e, t, i) {
      var r = this._tilingScheme,
        n = z.Rectangle.fromDegrees(e[0], e[1], e[2], e[3]),
        o = r.positionToTileXY(z.Rectangle.northwest(n), 0),
        a = r.positionToTileXY(z.Rectangle.southeast(n), 0);
      this.addAvailableTileRange(0, o.x, o.y, a.x, a.y);
      for (var s = Math.max(t, 1); s <= i; s++) (o = r.positionToTileXY(z.Rectangle.northwest(n), s)), (a = r.positionToTileXY(z.Rectangle.southeast(n), s)), this.addAvailableTileRange(s, o.x, o.y, a.x, a.y);
    }),
    Object.defineProperties(h.prototype, {
      ready: {
        get: function() {
          return this._ready;
        }
      },
      readyPromise: {
        get: function() {
          return this._readyPromise;
        }
      },
      rectangle: {
        get: function() {
          return this._imageryProvider.rectangle;
        }
      },
      tileWidth: {
        get: function() {
          return this._imageryProvider.tileWidth;
        }
      },
      tileHeight: {
        get: function() {
          return this._imageryProvider.tileHeight;
        }
      },
      maximumLevel: {
        get: function() {
          return this._imageryProvider.maximumLevel;
        }
      },
      minimumLevel: {
        get: function() {
          return this._imageryProvider.minimumLevel;
        }
      },
      tilingScheme: {
        get: function() {
          return this._imageryProvider.tilingScheme;
        }
      },
      tileDiscardPolicy: {
        get: function() {
          return this._imageryProvider.tileDiscardPolicy;
        }
      },
      errorEvent: {
        get: function() {
          return this._errorEvent;
        }
      },
      credit: {
        get: function() {
          return this._imageryProvider.credit;
        }
      },
      hasAlphaChannel: {
        get: function() {
          return this._imageryProvider.hasAlphaChannel;
        }
      }
    }),
    (h.prototype.getTileCredits = function(e, t, i) {
      e = this._imageryProvider.getTileCredits(e, t, i);
      return z.defined(e) ? this._tileCredits.concat(e) : this._tileCredits;
    }),
    (h.prototype.requestImage = function(e, t, i, r) {
      return this._imageryProvider.requestImage(e, t, i, r);
    }),
    (h.prototype.pickFeatures = function(e, t, i, r, n) {
      return this._imageryProvider.pickFeatures(e, t, i, r, n);
    }),
    (h._endpointCache = {});
  (e.BMConfig = n), (e.BMGeographicTilingScheme = o), (e.BMImageryProvider = h), (e.BMResource = s), (e.BMTaskProcessor = t), (e.BMTerrainData = g), (e.BMTerrainProvider = i), (e.BMVERSION = '1.0'), (e.TileAvailability = z.TileAvailability);
})((this.Cesium = this.Cesium || {}), Cesium);
