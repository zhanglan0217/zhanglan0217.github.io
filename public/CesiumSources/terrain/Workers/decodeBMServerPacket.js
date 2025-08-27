define(["./createTaskProcessorWorker-46481b6c.js"], function (U) {
    "use strict";
    var Z = e;
    function e(t, e) {
        (this.x = t), (this.y = e);
    }
    (e.prototype = {
        clone: function () {
            return new e(this.x, this.y);
        },
        add: function (t) {
            return this.clone()._add(t);
        },
        sub: function (t) {
            return this.clone()._sub(t);
        },
        multByPoint: function (t) {
            return this.clone()._multByPoint(t);
        },
        divByPoint: function (t) {
            return this.clone()._divByPoint(t);
        },
        mult: function (t) {
            return this.clone()._mult(t);
        },
        div: function (t) {
            return this.clone()._div(t);
        },
        rotate: function (t) {
            return this.clone()._rotate(t);
        },
        rotateAround: function (t, e) {
            return this.clone()._rotateAround(t, e);
        },
        matMult: function (t) {
            return this.clone()._matMult(t);
        },
        unit: function () {
            return this.clone()._unit();
        },
        perp: function () {
            return this.clone()._perp();
        },
        round: function () {
            return this.clone()._round();
        },
        mag: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        equals: function (t) {
            return this.x === t.x && this.y === t.y;
        },
        dist: function (t) {
            return Math.sqrt(this.distSqr(t));
        },
        distSqr: function (t) {
            var e = t.x - this.x,
                t = t.y - this.y;
            return e * e + t * t;
        },
        angle: function () {
            return Math.atan2(this.y, this.x);
        },
        angleTo: function (t) {
            return Math.atan2(this.y - t.y, this.x - t.x);
        },
        angleWith: function (t) {
            return this.angleWithSep(t.x, t.y);
        },
        angleWithSep: function (t, e) {
            return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e);
        },
        _matMult: function (t) {
            var e = t[0] * this.x + t[1] * this.y,
                t = t[2] * this.x + t[3] * this.y;
            return (this.x = e), (this.y = t), this;
        },
        _add: function (t) {
            return (this.x += t.x), (this.y += t.y), this;
        },
        _sub: function (t) {
            return (this.x -= t.x), (this.y -= t.y), this;
        },
        _mult: function (t) {
            return (this.x *= t), (this.y *= t), this;
        },
        _div: function (t) {
            return (this.x /= t), (this.y /= t), this;
        },
        _multByPoint: function (t) {
            return (this.x *= t.x), (this.y *= t.y), this;
        },
        _divByPoint: function (t) {
            return (this.x /= t.x), (this.y /= t.y), this;
        },
        _unit: function () {
            return this._div(this.mag()), this;
        },
        _perp: function () {
            var t = this.y;
            return (this.y = this.x), (this.x = -t), this;
        },
        _rotate: function (t) {
            var e = Math.cos(t),
                t = Math.sin(t),
                i = e * this.x - t * this.y,
                t = t * this.x + e * this.y;
            return (this.x = i), (this.y = t), this;
        },
        _rotateAround: function (t, e) {
            var i = Math.cos(t),
                t = Math.sin(t),
                r = e.x + i * (this.x - e.x) - t * (this.y - e.y),
                t = e.y + t * (this.x - e.x) + i * (this.y - e.y);
            return (this.x = r), (this.y = t), this;
        },
        _round: function () {
            return (
                (this.x = Math.round(this.x)),
                (this.y = Math.round(this.y)),
                this
            );
        },
    }),
        (e.convert = function (t) {
            return !(t instanceof e) && Array.isArray(t)
                ? new e(t[0], t[1])
                : t;
        });
    var D = f;
    function f(t, e, i, r, a) {
        (this.properties = {}),
            (this.extent = i),
            (this.type = 0),
            (this._pbf = t),
            (this._geometry = -1),
            (this._keys = r),
            (this._values = a),
            t.readFields(V, this, e);
    }
    function V(t, e, i) {
        if (1 == t) e.id = i.readVarint();
        else if (2 == t)
            for (var r = i, a = e, n = r.readVarint() + r.pos; r.pos < n; ) {
                var s = a._keys[r.readVarint()],
                    o = a._values[r.readVarint()];
                a.properties[s] = o;
            }
        else
            3 == t
                ? (e.type = i.readVarint())
                : 4 == t && (e._geometry = i.pos);
    }
    (f.types = ["Unknown", "Point", "LineString", "Polygon"]),
        (f.prototype.loadGeometry = function () {
            for (
                var t,
                    e,
                    i = this._pbf,
                    r = ((i.pos = this._geometry), i.readVarint() + i.pos),
                    a = 1,
                    n = 0,
                    s = 0,
                    o = 0,
                    h = [];
                i.pos < r;

            )
                if (
                    (n <= 0 && ((a = 7 & (e = i.readVarint())), (n = e >> 3)),
                    n--,
                    1 === a || 2 === a)
                )
                    (s += i.readSVarint()),
                        (o += i.readSVarint()),
                        1 === a && (t && h.push(t), (t = [])),
                        t.push(new Z(s, o));
                else {
                    if (7 !== a) throw new Error("unknown command " + a);
                    t && t.push(t[0].clone());
                }
            return t && h.push(t), h;
        }),
        (f.prototype.bbox = function () {
            for (
                var t,
                    e = this._pbf,
                    i = ((e.pos = this._geometry), e.readVarint() + e.pos),
                    r = 1,
                    a = 0,
                    n = 0,
                    s = 0,
                    o = 1 / 0,
                    h = -1 / 0,
                    l = 1 / 0,
                    d = -1 / 0;
                e.pos < i;

            )
                if (
                    (a <= 0 && ((r = 7 & (t = e.readVarint())), (a = t >> 3)),
                    a--,
                    1 === r || 2 === r)
                )
                    (n += e.readSVarint()) < o && (o = n),
                        h < n && (h = n),
                        (s += e.readSVarint()) < l && (l = s),
                        d < s && (d = s);
                else if (7 !== r) throw new Error("unknown command " + r);
            return [o, l, h, d];
        }),
        (f.prototype.toGeoJSON = function (t, e, i) {
            var r,
                a = this.extent * Math.pow(2, i),
                n = this.extent * t,
                s = this.extent * e,
                o = this.loadGeometry(),
                i = f.types[this.type];
            function h(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = t[e],
                        r = 180 - (360 * (i.y + s)) / a;
                    t[e] = [
                        (360 * (i.x + n)) / a - 180,
                        (360 / Math.PI) *
                            Math.atan(Math.exp((r * Math.PI) / 180)) -
                            90,
                    ];
                }
            }
            switch (this.type) {
                case 1:
                    for (var l = [], d = 0; d < o.length; d++) l[d] = o[d][0];
                    h((o = l));
                    break;
                case 2:
                    for (d = 0; d < o.length; d++) h(o[d]);
                    break;
                case 3:
                    for (
                        o = (function (t) {
                            var e = t.length;
                            if (e <= 1) return [t];
                            for (var i, r, a = [], n = 0; n < e; n++) {
                                var s = (function (t) {
                                    for (
                                        var e,
                                            i,
                                            r = 0,
                                            a = 0,
                                            n = t.length,
                                            s = n - 1;
                                        a < n;
                                        s = a++
                                    )
                                        (e = t[a]),
                                            (i = t[s]),
                                            (r += (i.x - e.x) * (e.y + i.y));
                                    return r;
                                })(t[n]);
                                0 !== s &&
                                    ((r = void 0 === r ? s < 0 : r) === s < 0
                                        ? (i && a.push(i), (i = [t[n]]))
                                        : i.push(t[n]));
                            }
                            i && a.push(i);
                            return a;
                        })(o),
                            d = 0;
                        d < o.length;
                        d++
                    )
                        for (r = 0; r < o[d].length; r++) h(o[d][r]);
            }
            1 === o.length ? (o = o[0]) : (i = "Multi" + i);
            t = {
                type: "Feature",
                geometry: { type: i, coordinates: o },
                properties: this.properties,
            };
            return "id" in this && (t.id = this.id), t;
        });
    var N = O;
    function O(t, e) {
        (this.version = 1),
            (this.name = null),
            (this.extent = 4096),
            (this.length = 0),
            (this._pbf = t),
            (this._keys = []),
            (this._values = []),
            (this._features = []),
            t.readFields(I, this, e),
            (this.length = this._features.length);
    }
    function I(t, e, i) {
        15 === t
            ? (e.version = i.readVarint())
            : 1 === t
            ? (e.name = i.readString())
            : 5 === t
            ? (e.extent = i.readVarint())
            : 2 === t
            ? e._features.push(i.pos)
            : 3 === t
            ? e._keys.push(i.readString())
            : 4 === t &&
              e._values.push(
                  (function (t) {
                      var e = null,
                          i = t.readVarint() + t.pos;
                      for (; t.pos < i; ) {
                          var r = t.readVarint() >> 3;
                          e =
                              1 == r
                                  ? t.readString()
                                  : 2 == r
                                  ? t.readFloat()
                                  : 3 == r
                                  ? t.readDouble()
                                  : 4 == r
                                  ? t.readVarint64()
                                  : 5 == r
                                  ? t.readVarint()
                                  : 6 == r
                                  ? t.readSVarint()
                                  : 7 == r
                                  ? t.readBoolean()
                                  : null;
                      }
                      return e;
                  })(i)
              );
    }
    function L(t, e, i) {
        3 === t &&
            (t = new N(i, i.readVarint() + i.pos)).length &&
            (e[t.name] = t);
    }
    O.prototype.feature = function (t) {
        if (t < 0 || t >= this._features.length)
            throw new Error("feature index out of bounds");
        this._pbf.pos = this._features[t];
        t = this._pbf.readVarint() + this._pbf.pos;
        return new D(this._pbf, t, this.extent, this._keys, this._values);
    };
    var P = function (t, e) {
            this.layers = t.readFields(L, {}, e);
        },
        C = function (t, e, i, r, a) {
            var n,
                s,
                o = 8 * a - r - 1,
                h = (1 << o) - 1,
                l = h >> 1,
                d = -7,
                f = i ? a - 1 : 0,
                u = i ? -1 : 1,
                a = t[e + f];
            for (
                f += u, n = a & ((1 << -d) - 1), a >>= -d, d += o;
                0 < d;
                n = 256 * n + t[e + f], f += u, d -= 8
            );
            for (
                s = n & ((1 << -d) - 1), n >>= -d, d += r;
                0 < d;
                s = 256 * s + t[e + f], f += u, d -= 8
            );
            if (0 === n) n = 1 - l;
            else {
                if (n === h) return s ? NaN : (1 / 0) * (a ? -1 : 1);
                (s += Math.pow(2, r)), (n -= l);
            }
            return (a ? -1 : 1) * s * Math.pow(2, n - r);
        },
        H = function (t, e, i, r, a, n) {
            var s,
                o,
                h = 8 * n - a - 1,
                l = (1 << h) - 1,
                d = l >> 1,
                f = 23 === a ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                u = r ? 0 : n - 1,
                _ = r ? 1 : -1,
                n = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
            for (
                e = Math.abs(e),
                    isNaN(e) || e === 1 / 0
                        ? ((o = isNaN(e) ? 1 : 0), (s = l))
                        : ((s = Math.floor(Math.log(e) / Math.LN2)),
                          e * (r = Math.pow(2, -s)) < 1 && (s--, (r *= 2)),
                          2 <=
                              (e +=
                                  1 <= s + d ? f / r : f * Math.pow(2, 1 - d)) *
                                  r && (s++, (r /= 2)),
                          l <= s + d
                              ? ((o = 0), (s = l))
                              : 1 <= s + d
                              ? ((o = (e * r - 1) * Math.pow(2, a)), (s += d))
                              : ((o = e * Math.pow(2, d - 1) * Math.pow(2, a)),
                                (s = 0)));
                8 <= a;
                t[i + u] = 255 & o, u += _, o /= 256, a -= 8
            );
            for (
                s = (s << a) | o, h += a;
                0 < h;
                t[i + u] = 255 & s, u += _, s /= 256, h -= 8
            );
            t[i + u - _] |= 128 * n;
        },
        j = r;
    function r(t) {
        (this.buf =
            ArrayBuffer.isView && ArrayBuffer.isView(t)
                ? t
                : new Uint8Array(t || 0)),
            (this.pos = 0),
            (this.type = 0),
            (this.length = this.buf.length);
    }
    (r.Varint = 0), (r.Fixed64 = 1), (r.Bytes = 2), (r.Fixed32 = 5);
    var K = 4294967296,
        q = 1 / K,
        X = "undefined" == typeof TextDecoder ? null : new TextDecoder("utf8");
    function a(t) {
        return t.type === r.Bytes ? t.readVarint() + t.pos : t.pos + 1;
    }
    function s(t, e, i) {
        return i
            ? 4294967296 * e + (t >>> 0)
            : 4294967296 * (e >>> 0) + (t >>> 0);
    }
    function J(t, e, i) {
        var r =
            e <= 16383
                ? 1
                : e <= 2097151
                ? 2
                : e <= 268435455
                ? 3
                : Math.floor(Math.log(e) / (7 * Math.LN2));
        i.realloc(r);
        for (var a = i.pos - 1; t <= a; a--) i.buf[a + r] = i.buf[a];
    }
    function Q(t, e) {
        for (var i = 0; i < t.length; i++) e.writeVarint(t[i]);
    }
    function $(t, e) {
        for (var i = 0; i < t.length; i++) e.writeSVarint(t[i]);
    }
    function tt(t, e) {
        for (var i = 0; i < t.length; i++) e.writeFloat(t[i]);
    }
    function et(t, e) {
        for (var i = 0; i < t.length; i++) e.writeDouble(t[i]);
    }
    function it(t, e) {
        for (var i = 0; i < t.length; i++) e.writeBoolean(t[i]);
    }
    function rt(t, e) {
        for (var i = 0; i < t.length; i++) e.writeFixed32(t[i]);
    }
    function at(t, e) {
        for (var i = 0; i < t.length; i++) e.writeSFixed32(t[i]);
    }
    function nt(t, e) {
        for (var i = 0; i < t.length; i++) e.writeFixed64(t[i]);
    }
    function st(t, e) {
        for (var i = 0; i < t.length; i++) e.writeSFixed64(t[i]);
    }
    function ot(t, e) {
        return (
            (t[e] | (t[e + 1] << 8) | (t[e + 2] << 16)) + 16777216 * t[e + 3]
        );
    }
    function ht(t, e, i) {
        (t[i] = e),
            (t[i + 1] = e >>> 8),
            (t[i + 2] = e >>> 16),
            (t[i + 3] = e >>> 24);
    }
    function lt(t, e) {
        return (t[e] | (t[e + 1] << 8) | (t[e + 2] << 16)) + (t[e + 3] << 24);
    }
    r.prototype = {
        destroy: function () {
            this.buf = null;
        },
        readFields: function (t, e, i) {
            for (i = i || this.length; this.pos < i; ) {
                var r = this.readVarint(),
                    a = r >> 3,
                    n = this.pos;
                (this.type = 7 & r),
                    t(a, e, this),
                    this.pos === n && this.skip(r);
            }
            return e;
        },
        readMessage: function (t, e) {
            return this.readFields(t, e, this.readVarint() + this.pos);
        },
        readFixed32: function () {
            var t = ot(this.buf, this.pos);
            return (this.pos += 4), t;
        },
        readSFixed32: function () {
            var t = lt(this.buf, this.pos);
            return (this.pos += 4), t;
        },
        readFixed64: function () {
            var t = ot(this.buf, this.pos) + ot(this.buf, this.pos + 4) * K;
            return (this.pos += 8), t;
        },
        readSFixed64: function () {
            var t = ot(this.buf, this.pos) + lt(this.buf, this.pos + 4) * K;
            return (this.pos += 8), t;
        },
        readFloat: function () {
            var t = C(this.buf, this.pos, !0, 23, 4);
            return (this.pos += 4), t;
        },
        readDouble: function () {
            var t = C(this.buf, this.pos, !0, 52, 8);
            return (this.pos += 8), t;
        },
        readVarint: function (t) {
            var e = this.buf,
                i = e[this.pos++],
                r = 127 & i;
            if (i < 128) return r;
            if (((r |= (127 & (i = e[this.pos++])) << 7), i < 128)) return r;
            if (((r |= (127 & (i = e[this.pos++])) << 14), i < 128)) return r;
            if (((r |= (127 & (i = e[this.pos++])) << 21), i < 128)) return r;
            var a,
                n,
                i = (r |= (15 & e[this.pos]) << 28),
                e = t,
                r = this,
                t = r.buf;
            if (((n = t[r.pos++]), (a = (112 & n) >> 4), n < 128))
                return s(i, a, e);
            if (((n = t[r.pos++]), (a |= (127 & n) << 3), n < 128))
                return s(i, a, e);
            if (((n = t[r.pos++]), (a |= (127 & n) << 10), n < 128))
                return s(i, a, e);
            if (((n = t[r.pos++]), (a |= (127 & n) << 17), n < 128))
                return s(i, a, e);
            if (((n = t[r.pos++]), (a |= (127 & n) << 24), n < 128))
                return s(i, a, e);
            if (((n = t[r.pos++]), (a |= (1 & n) << 31), n < 128))
                return s(i, a, e);
            throw new Error("Expected varint not more than 10 bytes");
        },
        readVarint64: function () {
            return this.readVarint(!0);
        },
        readSVarint: function () {
            var t = this.readVarint();
            return t % 2 == 1 ? (t + 1) / -2 : t / 2;
        },
        readBoolean: function () {
            return Boolean(this.readVarint());
        },
        readString: function () {
            var t,
                e = this.readVarint() + this.pos,
                i = this.pos;
            if (12 <= (this.pos = e) - i && X)
                return (t = this.buf), X.decode(t.subarray(i, e));
            for (var r, a, n, s = this.buf, o = e, h = "", l = i; l < o; ) {
                var d = s[l],
                    f = null,
                    u = 239 < d ? 4 : 223 < d ? 3 : 191 < d ? 2 : 1;
                if (o < l + u) break;
                1 === u
                    ? d < 128 && (f = d)
                    : 2 === u
                    ? 128 == (192 & (r = s[l + 1])) &&
                      (f = ((31 & d) << 6) | (63 & r)) <= 127 &&
                      (f = null)
                    : 3 === u
                    ? ((r = s[l + 1]),
                      (a = s[l + 2]),
                      128 == (192 & r) &&
                          128 == (192 & a) &&
                          ((f =
                              ((15 & d) << 12) | ((63 & r) << 6) | (63 & a)) <=
                              2047 ||
                              (55296 <= f && f <= 57343)) &&
                          (f = null))
                    : 4 === u &&
                      ((r = s[l + 1]),
                      (a = s[l + 2]),
                      (n = s[l + 3]),
                      128 == (192 & r) &&
                          128 == (192 & a) &&
                          128 == (192 & n) &&
                          ((f =
                              ((15 & d) << 18) |
                              ((63 & r) << 12) |
                              ((63 & a) << 6) |
                              (63 & n)) <= 65535 ||
                              1114112 <= f) &&
                          (f = null)),
                    null === f
                        ? ((f = 65533), (u = 1))
                        : 65535 < f &&
                          ((f -= 65536),
                          (h += String.fromCharCode(
                              ((f >>> 10) & 1023) | 55296
                          )),
                          (f = 56320 | (1023 & f))),
                    (h += String.fromCharCode(f)),
                    (l += u);
            }
            return h;
        },
        readBytes: function () {
            var t = this.readVarint() + this.pos,
                e = this.buf.subarray(this.pos, t);
            return (this.pos = t), e;
        },
        readPackedVarint: function (t, e) {
            if (this.type !== r.Bytes) return t.push(this.readVarint(e));
            var i = a(this);
            for (t = t || []; this.pos < i; ) t.push(this.readVarint(e));
            return t;
        },
        readPackedSVarint: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readSVarint());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readSVarint());
            return t;
        },
        readPackedBoolean: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readBoolean());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readBoolean());
            return t;
        },
        readPackedFloat: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readFloat());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readFloat());
            return t;
        },
        readPackedDouble: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readDouble());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readDouble());
            return t;
        },
        readPackedFixed32: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readFixed32());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readFixed32());
            return t;
        },
        readPackedSFixed32: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readSFixed32());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readSFixed32());
            return t;
        },
        readPackedFixed64: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readFixed64());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readFixed64());
            return t;
        },
        readPackedSFixed64: function (t) {
            if (this.type !== r.Bytes) return t.push(this.readSFixed64());
            var e = a(this);
            for (t = t || []; this.pos < e; ) t.push(this.readSFixed64());
            return t;
        },
        skip: function (t) {
            t &= 7;
            if (t === r.Varint) for (; 127 < this.buf[this.pos++]; );
            else if (t === r.Bytes) this.pos = this.readVarint() + this.pos;
            else if (t === r.Fixed32) this.pos += 4;
            else {
                if (t !== r.Fixed64)
                    throw new Error("Unimplemented type: " + t);
                this.pos += 8;
            }
        },
        writeTag: function (t, e) {
            this.writeVarint((t << 3) | e);
        },
        realloc: function (t) {
            for (var e, i = this.length || 16; i < this.pos + t; ) i *= 2;
            i !== this.length &&
                ((e = new Uint8Array(i)).set(this.buf),
                (this.buf = e),
                (this.length = i));
        },
        finish: function () {
            return (
                (this.length = this.pos),
                (this.pos = 0),
                this.buf.subarray(0, this.length)
            );
        },
        writeFixed32: function (t) {
            this.realloc(4), ht(this.buf, t, this.pos), (this.pos += 4);
        },
        writeSFixed32: function (t) {
            this.realloc(4), ht(this.buf, t, this.pos), (this.pos += 4);
        },
        writeFixed64: function (t) {
            this.realloc(8),
                ht(this.buf, -1 & t, this.pos),
                ht(this.buf, Math.floor(t * q), this.pos + 4),
                (this.pos += 8);
        },
        writeSFixed64: function (t) {
            this.realloc(8),
                ht(this.buf, -1 & t, this.pos),
                ht(this.buf, Math.floor(t * q), this.pos + 4),
                (this.pos += 8);
        },
        writeVarint: function (t) {
            if (268435455 < (t = +t || 0) || t < 0) {
                var e = t,
                    i = this;
                if (
                    (0 <= e
                        ? ((r = e % 4294967296 | 0), (a = (e / 4294967296) | 0))
                        : ((a = ~(-e / 4294967296)),
                          4294967295 ^ (r = ~(-e % 4294967296))
                              ? (r = (r + 1) | 0)
                              : (a = (a + 1) | (r = 0))),
                    0x10000000000000000 <= e || e < -0x10000000000000000)
                )
                    throw new Error("Given varint doesn't fit into 10 bytes");
                i.realloc(10);
                var e = r,
                    r = i,
                    e =
                        ((r.buf[r.pos++] = (127 & e) | 128),
                        (e >>>= 7),
                        (r.buf[r.pos++] = (127 & e) | 128),
                        (e >>>= 7),
                        (r.buf[r.pos++] = (127 & e) | 128),
                        (e >>>= 7),
                        (r.buf[r.pos++] = (127 & e) | 128),
                        (e >>>= 7),
                        (r.buf[r.pos] = 127 & e),
                        a),
                    a = i,
                    i = (7 & e) << 4;
                return (
                    (a.buf[a.pos++] |= i | ((e >>>= 3) ? 128 : 0)),
                    void (
                        e &&
                        ((a.buf[a.pos++] = (127 & e) | ((e >>>= 7) ? 128 : 0)),
                        e &&
                            ((a.buf[a.pos++] =
                                (127 & e) | ((e >>>= 7) ? 128 : 0)),
                            e &&
                                ((a.buf[a.pos++] =
                                    (127 & e) | ((e >>>= 7) ? 128 : 0)),
                                e &&
                                    ((a.buf[a.pos++] =
                                        (127 & e) | ((e >>>= 7) ? 128 : 0)),
                                    e && (a.buf[a.pos++] = 127 & e)))))
                    )
                );
            }
            this.realloc(4),
                (this.buf[this.pos++] = (127 & t) | (127 < t ? 128 : 0)),
                t <= 127 ||
                    ((this.buf[this.pos++] =
                        (127 & (t >>>= 7)) | (127 < t ? 128 : 0)),
                    t <= 127 ||
                        ((this.buf[this.pos++] =
                            (127 & (t >>>= 7)) | (127 < t ? 128 : 0)),
                        t <= 127 || (this.buf[this.pos++] = (t >>> 7) & 127)));
        },
        writeSVarint: function (t) {
            this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t);
        },
        writeBoolean: function (t) {
            this.writeVarint(Boolean(t));
        },
        writeString: function (t) {
            (t = String(t)), this.realloc(4 * t.length), this.pos++;
            var e = this.pos,
                t =
                    ((this.pos = (function (t, e, i) {
                        for (var r, a, n = 0; n < e.length; n++) {
                            if (55295 < (r = e.charCodeAt(n)) && r < 57344) {
                                if (!a) {
                                    56319 < r || n + 1 === e.length
                                        ? ((t[i++] = 239),
                                          (t[i++] = 191),
                                          (t[i++] = 189))
                                        : (a = r);
                                    continue;
                                }
                                if (r < 56320) {
                                    (t[i++] = 239),
                                        (t[i++] = 191),
                                        (t[i++] = 189),
                                        (a = r);
                                    continue;
                                }
                                (r = ((a - 55296) << 10) | (r - 56320) | 65536),
                                    (a = null);
                            } else
                                a &&
                                    ((t[i++] = 239),
                                    (t[i++] = 191),
                                    (t[i++] = 189),
                                    (a = null));
                            r < 128
                                ? (t[i++] = r)
                                : (r < 2048
                                      ? (t[i++] = (r >> 6) | 192)
                                      : (r < 65536
                                            ? (t[i++] = (r >> 12) | 224)
                                            : ((t[i++] = (r >> 18) | 240),
                                              (t[i++] =
                                                  ((r >> 12) & 63) | 128)),
                                        (t[i++] = ((r >> 6) & 63) | 128)),
                                  (t[i++] = (63 & r) | 128));
                        }
                        return i;
                    })(this.buf, t, this.pos)),
                    this.pos - e);
            128 <= t && J(e, t, this),
                (this.pos = e - 1),
                this.writeVarint(t),
                (this.pos += t);
        },
        writeFloat: function (t) {
            this.realloc(4),
                H(this.buf, t, this.pos, !0, 23, 4),
                (this.pos += 4);
        },
        writeDouble: function (t) {
            this.realloc(8),
                H(this.buf, t, this.pos, !0, 52, 8),
                (this.pos += 8);
        },
        writeBytes: function (t) {
            var e = t.length;
            this.writeVarint(e), this.realloc(e);
            for (var i = 0; i < e; i++) this.buf[this.pos++] = t[i];
        },
        writeRawMessage: function (t, e) {
            this.pos++;
            var i = this.pos,
                t = (t(e, this), this.pos - i);
            128 <= t && J(i, t, this),
                (this.pos = i - 1),
                this.writeVarint(t),
                (this.pos += t);
        },
        writeMessage: function (t, e, i) {
            this.writeTag(t, r.Bytes), this.writeRawMessage(e, i);
        },
        writePackedVarint: function (t, e) {
            e.length && this.writeMessage(t, Q, e);
        },
        writePackedSVarint: function (t, e) {
            e.length && this.writeMessage(t, $, e);
        },
        writePackedBoolean: function (t, e) {
            e.length && this.writeMessage(t, it, e);
        },
        writePackedFloat: function (t, e) {
            e.length && this.writeMessage(t, tt, e);
        },
        writePackedDouble: function (t, e) {
            e.length && this.writeMessage(t, et, e);
        },
        writePackedFixed32: function (t, e) {
            e.length && this.writeMessage(t, rt, e);
        },
        writePackedSFixed32: function (t, e) {
            e.length && this.writeMessage(t, at, e);
        },
        writePackedFixed64: function (t, e) {
            e.length && this.writeMessage(t, nt, e);
        },
        writePackedSFixed64: function (t, e) {
            e.length && this.writeMessage(t, st, e);
        },
        writeBytesField: function (t, e) {
            this.writeTag(t, r.Bytes), this.writeBytes(e);
        },
        writeFixed32Field: function (t, e) {
            this.writeTag(t, r.Fixed32), this.writeFixed32(e);
        },
        writeSFixed32Field: function (t, e) {
            this.writeTag(t, r.Fixed32), this.writeSFixed32(e);
        },
        writeFixed64Field: function (t, e) {
            this.writeTag(t, r.Fixed64), this.writeFixed64(e);
        },
        writeSFixed64Field: function (t, e) {
            this.writeTag(t, r.Fixed64), this.writeSFixed64(e);
        },
        writeVarintField: function (t, e) {
            this.writeTag(t, r.Varint), this.writeVarint(e);
        },
        writeSVarintField: function (t, e) {
            this.writeTag(t, r.Varint), this.writeSVarint(e);
        },
        writeStringField: function (t, e) {
            this.writeTag(t, r.Bytes), this.writeString(e);
        },
        writeFloatField: function (t, e) {
            this.writeTag(t, r.Fixed32), this.writeFloat(e);
        },
        writeDoubleField: function (t, e) {
            this.writeTag(t, r.Fixed64), this.writeDouble(e);
        },
        writeBooleanField: function (t, e) {
            this.writeVarintField(t, Boolean(e));
        },
    };
    const dt = 0,
        ft = 1;
    function ut(t) {
        let e = t.length;
        for (; 0 <= --e; ) t[e] = 0;
    }
    const _t = 29,
        ct = 256,
        pt = ct + 1 + _t,
        wt = 30,
        gt = 19,
        bt = 2 * pt + 1,
        w = 15,
        vt = 16,
        mt = 7,
        yt = 256,
        kt = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4,
            4, 5, 5, 5, 5, 0,
        ]),
        xt = new Uint8Array([
            0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
            10, 10, 11, 11, 12, 12, 13, 13,
        ]),
        zt = new Uint8Array([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7,
        ]),
        At = new Uint8Array([
            16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
        ]);
    const l = new Array(2 * (pt + 2)),
        Et = (ut(l), new Array(2 * wt)),
        St = (ut(Et), new Array(512)),
        Ft = (ut(St), new Array(256)),
        Rt = (ut(Ft), new Array(_t)),
        Tt = (ut(Rt), new Array(wt));
    function Mt(t, e, i, r, a) {
        (this.static_tree = t),
            (this.extra_bits = e),
            (this.extra_base = i),
            (this.elems = r),
            (this.max_length = a),
            (this.has_stree = t && t.length);
    }
    ut(Tt);
    let Bt, Ut, Zt;
    function Dt(t, e) {
        (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
    }
    const Vt = (t) => (t < 256 ? St[t] : St[256 + (t >>> 7)]),
        Nt = (t, e) => {
            (t.pending_buf[t.pending++] = 255 & e),
                (t.pending_buf[t.pending++] = (e >>> 8) & 255);
        },
        d = (t, e, i) => {
            t.bi_valid > vt - i
                ? ((t.bi_buf |= (e << t.bi_valid) & 65535),
                  Nt(t, t.bi_buf),
                  (t.bi_buf = e >> (vt - t.bi_valid)),
                  (t.bi_valid += i - vt))
                : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += i));
        },
        u = (t, e, i) => {
            d(t, i[2 * e], i[2 * e + 1]);
        },
        Ot = (t, e) => {
            let i = 0;
            for (; (i |= 1 & t), (t >>>= 1), (i <<= 1), 0 < --e; );
            return i >>> 1;
        },
        It = (t, e) => {
            const i = e.dyn_tree;
            var r,
                a = e.max_code,
                n = e.stat_desc.static_tree,
                s = e.stat_desc.has_stree,
                o = e.stat_desc.extra_bits,
                h = e.stat_desc.extra_base,
                l = e.stat_desc.max_length;
            let d,
                f,
                u,
                _,
                c,
                p = 0;
            for (_ = 0; _ <= w; _++) t.bl_count[_] = 0;
            for (
                i[2 * t.heap[t.heap_max] + 1] = 0, d = t.heap_max + 1;
                d < bt;
                d++
            )
                (f = t.heap[d]),
                    (_ = i[2 * i[2 * f + 1] + 1] + 1) > l && ((_ = l), p++),
                    (i[2 * f + 1] = _),
                    f > a ||
                        (t.bl_count[_]++,
                        (c = 0),
                        f >= h && (c = o[f - h]),
                        (r = i[2 * f]),
                        (t.opt_len += r * (_ + c)),
                        s && (t.static_len += r * (n[2 * f + 1] + c)));
            if (0 !== p) {
                do {
                    for (_ = l - 1; 0 === t.bl_count[_]; ) _--;
                } while (
                    (t.bl_count[_]--,
                    (t.bl_count[_ + 1] += 2),
                    t.bl_count[l]--,
                    0 < (p -= 2))
                );
                for (_ = l; 0 !== _; _--)
                    for (f = t.bl_count[_]; 0 !== f; )
                        a < (u = t.heap[--d]) ||
                            (i[2 * u + 1] !== _ &&
                                ((t.opt_len += (_ - i[2 * u + 1]) * i[2 * u]),
                                (i[2 * u + 1] = _)),
                            f--);
            }
        },
        Lt = (t, e, i) => {
            const r = new Array(w + 1);
            let a = 0,
                n,
                s;
            for (n = 1; n <= w; n++) r[n] = a = (a + i[n - 1]) << 1;
            for (s = 0; s <= e; s++) {
                var o = t[2 * s + 1];
                0 !== o && (t[2 * s] = Ot(r[o]++, o));
            }
        },
        Pt = (t) => {
            let e;
            for (e = 0; e < pt; e++) t.dyn_ltree[2 * e] = 0;
            for (e = 0; e < wt; e++) t.dyn_dtree[2 * e] = 0;
            for (e = 0; e < gt; e++) t.bl_tree[2 * e] = 0;
            (t.dyn_ltree[2 * yt] = 1),
                (t.opt_len = t.static_len = 0),
                (t.last_lit = t.matches = 0);
        },
        Ct = (t) => {
            8 < t.bi_valid
                ? Nt(t, t.bi_buf)
                : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf),
                (t.bi_buf = 0),
                (t.bi_valid = 0);
        },
        Ht = (t, e, i, r) => {
            var a = 2 * e,
                n = 2 * i;
            return t[a] < t[n] || (t[a] === t[n] && r[e] <= r[i]);
        },
        jt = (t, e, i) => {
            var r = t.heap[i];
            let a = i << 1;
            for (
                ;
                a <= t.heap_len &&
                (a < t.heap_len &&
                    Ht(e, t.heap[a + 1], t.heap[a], t.depth) &&
                    a++,
                !Ht(e, r, t.heap[a], t.depth));

            )
                (t.heap[i] = t.heap[a]), (i = a), (a <<= 1);
            t.heap[i] = r;
        },
        Kt = (t, e, i) => {
            var r;
            let a,
                n = 0,
                s,
                o;
            if (0 !== t.last_lit)
                for (
                    ;
                    (r =
                        (t.pending_buf[t.d_buf + 2 * n] << 8) |
                        t.pending_buf[t.d_buf + 2 * n + 1]),
                        (a = t.pending_buf[t.l_buf + n]),
                        n++,
                        0 == r
                            ? u(t, a, e)
                            : ((s = Ft[a]),
                              u(t, s + ct + 1, e),
                              0 !== (o = kt[s]) && ((a -= Rt[s]), d(t, a, o)),
                              r--,
                              (s = Vt(r)),
                              u(t, s, i),
                              0 !== (o = xt[s]) && ((r -= Tt[s]), d(t, r, o))),
                        n < t.last_lit;

                );
            u(t, yt, e);
        },
        Gt = (t, e) => {
            const i = e.dyn_tree;
            var r = e.stat_desc.static_tree,
                a = e.stat_desc.has_stree,
                n = e.stat_desc.elems;
            let s,
                o,
                h = -1,
                l;
            for (t.heap_len = 0, t.heap_max = bt, s = 0; s < n; s++)
                0 !== i[2 * s]
                    ? ((t.heap[++t.heap_len] = h = s), (t.depth[s] = 0))
                    : (i[2 * s + 1] = 0);
            for (; t.heap_len < 2; )
                (l = t.heap[++t.heap_len] = h < 2 ? ++h : 0),
                    (i[2 * l] = 1),
                    (t.depth[l] = 0),
                    t.opt_len--,
                    a && (t.static_len -= r[2 * l + 1]);
            for (e.max_code = h, s = t.heap_len >> 1; 1 <= s; s--) jt(t, i, s);
            for (
                l = n;
                (s = t.heap[1]),
                    (t.heap[1] = t.heap[t.heap_len--]),
                    jt(t, i, 1),
                    (o = t.heap[1]),
                    (t.heap[--t.heap_max] = s),
                    (t.heap[--t.heap_max] = o),
                    (i[2 * l] = i[2 * s] + i[2 * o]),
                    (t.depth[l] =
                        (t.depth[s] >= t.depth[o] ? t.depth[s] : t.depth[o]) +
                        1),
                    (i[2 * s + 1] = i[2 * o + 1] = l),
                    (t.heap[1] = l++),
                    jt(t, i, 1),
                    2 <= t.heap_len;

            );
            (t.heap[--t.heap_max] = t.heap[1]), It(t, e), Lt(i, h, t.bl_count);
        },
        Yt = (t, e, i) => {
            let r,
                a = -1;
            var n;
            let s = e[1],
                o = 0,
                h = 7,
                l = 4;
            for (
                0 === s && ((h = 138), (l = 3)),
                    e[2 * (i + 1) + 1] = 65535,
                    r = 0;
                r <= i;
                r++
            )
                (n = s),
                    (s = e[2 * (r + 1) + 1]),
                    (++o < h && n === s) ||
                        (o < l
                            ? (t.bl_tree[2 * n] += o)
                            : 0 !== n
                            ? (n !== a && t.bl_tree[2 * n]++, t.bl_tree[32]++)
                            : o <= 10
                            ? t.bl_tree[34]++
                            : t.bl_tree[36]++,
                        (o = 0),
                        (a = n),
                        (l =
                            0 === s
                                ? ((h = 138), 3)
                                : n === s
                                ? ((h = 6), 3)
                                : ((h = 7), 4)));
        },
        Wt = (t, e, i) => {
            let r,
                a = -1;
            var n;
            let s = e[1],
                o = 0,
                h = 7,
                l = 4;
            for (0 === s && ((h = 138), (l = 3)), r = 0; r <= i; r++)
                if (
                    ((n = s), (s = e[2 * (r + 1) + 1]), !(++o < h && n === s))
                ) {
                    if (o < l) for (; u(t, n, t.bl_tree), 0 != --o; );
                    else
                        0 !== n
                            ? (n !== a && (u(t, n, t.bl_tree), o--),
                              u(t, 16, t.bl_tree),
                              d(t, o - 3, 2))
                            : o <= 10
                            ? (u(t, 17, t.bl_tree), d(t, o - 3, 3))
                            : (u(t, 18, t.bl_tree), d(t, o - 11, 7));
                    (o = 0),
                        (a = n),
                        (l =
                            0 === s
                                ? ((h = 138), 3)
                                : n === s
                                ? ((h = 6), 3)
                                : ((h = 7), 4));
                }
        };
    let qt = !1;
    const Xt = (t, e, i, r) => {
        d(t, 0 + (r ? 1 : 0), 3),
            (r = t),
            (t = e),
            (e = i),
            (i = !0),
            Ct(r),
            i && (Nt(r, e), Nt(r, ~e)),
            r.pending_buf.set(r.window.subarray(t, t + e), r.pending),
            (r.pending += e);
    };
    var t = {
            _tr_init: (t) => {
                if (!qt) {
                    {
                        let t, e, i, r, a;
                        const n = new Array(w + 1);
                        for (i = 0, r = 0; r < _t - 1; r++)
                            for (Rt[r] = i, t = 0; t < 1 << kt[r]; t++)
                                Ft[i++] = r;
                        for (Ft[i - 1] = r, a = 0, r = 0; r < 16; r++)
                            for (Tt[r] = a, t = 0; t < 1 << xt[r]; t++)
                                St[a++] = r;
                        for (a >>= 7; r < wt; r++)
                            for (
                                Tt[r] = a << 7, t = 0;
                                t < 1 << (xt[r] - 7);
                                t++
                            )
                                St[256 + a++] = r;
                        for (e = 0; e <= w; e++) n[e] = 0;
                        for (t = 0; t <= 143; ) (l[2 * t + 1] = 8), t++, n[8]++;
                        for (; t <= 255; ) (l[2 * t + 1] = 9), t++, n[9]++;
                        for (; t <= 279; ) (l[2 * t + 1] = 7), t++, n[7]++;
                        for (; t <= 287; ) (l[2 * t + 1] = 8), t++, n[8]++;
                        for (Lt(l, pt + 1, n), t = 0; t < wt; t++)
                            (Et[2 * t + 1] = 5), (Et[2 * t] = Ot(t, 5));
                        (Bt = new Mt(l, kt, ct + 1, pt, w)),
                            (Ut = new Mt(Et, xt, 0, wt, w)),
                            (Zt = new Mt(new Array(0), zt, 0, gt, mt));
                    }
                    qt = !0;
                }
                (t.l_desc = new Dt(t.dyn_ltree, Bt)),
                    (t.d_desc = new Dt(t.dyn_dtree, Ut)),
                    (t.bl_desc = new Dt(t.bl_tree, Zt)),
                    (t.bi_buf = 0),
                    (t.bi_valid = 0),
                    Pt(t);
            },
            _tr_stored_block: Xt,
            _tr_flush_block: (e, i, r, t) => {
                let a,
                    n,
                    s = 0;
                if (
                    (0 < e.level
                        ? (2 === e.strm.data_type &&
                              (e.strm.data_type = ((t) => {
                                  let e = 4093624447,
                                      i;
                                  for (i = 0; i <= 31; i++, e >>>= 1)
                                      if (1 & e && 0 !== t.dyn_ltree[2 * i])
                                          return dt;
                                  if (
                                      0 !== t.dyn_ltree[18] ||
                                      0 !== t.dyn_ltree[20] ||
                                      0 !== t.dyn_ltree[26]
                                  )
                                      return ft;
                                  for (i = 32; i < ct; i++)
                                      if (0 !== t.dyn_ltree[2 * i]) return ft;
                                  return dt;
                              })(e)),
                          Gt(e, e.l_desc),
                          Gt(e, e.d_desc),
                          (s = ((t) => {
                              let e;
                              for (
                                  Yt(t, t.dyn_ltree, t.l_desc.max_code),
                                      Yt(t, t.dyn_dtree, t.d_desc.max_code),
                                      Gt(t, t.bl_desc),
                                      e = gt - 1;
                                  3 <= e && 0 === t.bl_tree[2 * At[e] + 1];
                                  e--
                              );
                              return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
                          })(e)),
                          (a = (e.opt_len + 3 + 7) >>> 3),
                          (n = (e.static_len + 3 + 7) >>> 3) <= a && (a = n))
                        : (a = n = r + 5),
                    r + 4 <= a && -1 !== i)
                )
                    Xt(e, i, r, t);
                else if (4 === e.strategy || n === a)
                    d(e, 2 + (t ? 1 : 0), 3), Kt(e, l, Et);
                else {
                    d(e, 4 + (t ? 1 : 0), 3);
                    {
                        var o = e;
                        i = e.l_desc.max_code + 1;
                        r = e.d_desc.max_code + 1;
                        var h = s + 1;
                        let t;
                        for (
                            d(o, i - 257, 5),
                                d(o, r - 1, 5),
                                d(o, h - 4, 4),
                                t = 0;
                            t < h;
                            t++
                        )
                            d(o, o.bl_tree[2 * At[t] + 1], 3);
                        Wt(o, o.dyn_ltree, i - 1), Wt(o, o.dyn_dtree, r - 1);
                    }
                    Kt(e, e.dyn_ltree, e.dyn_dtree);
                }
                Pt(e), t && Ct(e);
            },
            _tr_tally: (t, e, i) => (
                (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
                (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
                (t.pending_buf[t.l_buf + t.last_lit] = 255 & i),
                t.last_lit++,
                0 === e
                    ? t.dyn_ltree[2 * i]++
                    : (t.matches++,
                      e--,
                      t.dyn_ltree[2 * (Ft[i] + ct + 1)]++,
                      t.dyn_dtree[2 * Vt(e)]++),
                t.last_lit === t.lit_bufsize - 1
            ),
            _tr_align: (t) => {
                d(t, 2, 3),
                    u(t, yt, l),
                    16 === (t = t).bi_valid
                        ? (Nt(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0))
                        : 8 <= t.bi_valid &&
                          ((t.pending_buf[t.pending++] = 255 & t.bi_buf),
                          (t.bi_buf >>= 8),
                          (t.bi_valid -= 8));
            },
        },
        Jt = (t, e, i, r) => {
            let a = (65535 & t) | 0,
                n = ((t >>> 16) & 65535) | 0,
                s = 0;
            for (; 0 !== i; ) {
                for (
                    i -= s = 2e3 < i ? 2e3 : i;
                    (a = (a + e[r++]) | 0), (n = (n + a) | 0), --s;

                );
                (a %= 65521), (n %= 65521);
            }
            return a | (n << 16) | 0;
        };
    const Qt = new Uint32Array(
        (() => {
            let t,
                e = [];
            for (var i = 0; i < 256; i++) {
                t = i;
                for (var r = 0; r < 8; r++)
                    t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
                e[i] = t;
            }
            return e;
        })()
    );
    var G = (e, i, t, r) => {
            var a = Qt,
                n = r + t;
            e ^= -1;
            for (let t = r; t < n; t++) e = (e >>> 8) ^ a[255 & (e ^ i[t])];
            return -1 ^ e;
        },
        n = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version",
        },
        $t = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_MEM_ERROR: -4,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8,
        };
    const {
            _tr_init: te,
            _tr_stored_block: ee,
            _tr_flush_block: ie,
            _tr_tally: o,
            _tr_align: re,
        } = t,
        {
            Z_NO_FLUSH: h,
            Z_PARTIAL_FLUSH: ae,
            Z_FULL_FLUSH: ne,
            Z_FINISH: _,
            Z_BLOCK: se,
            Z_OK: c,
            Z_STREAM_END: oe,
            Z_STREAM_ERROR: p,
            Z_DATA_ERROR: he,
            Z_BUF_ERROR: le,
            Z_DEFAULT_COMPRESSION: de,
            Z_FILTERED: fe,
            Z_HUFFMAN_ONLY: ue,
            Z_RLE: _e,
            Z_FIXED: ce,
            Z_DEFAULT_STRATEGY: pe,
            Z_UNKNOWN: we,
            Z_DEFLATED: ge,
        } = $t,
        be = 9;
    const ve = 286,
        me = 30,
        ye = 19,
        ke = 2 * ve + 1,
        xe = 15,
        g = 3,
        b = 258,
        v = b + g + 1,
        ze = 42,
        m = 113,
        y = 1,
        Ae = 2,
        k = 3,
        Ee = 4,
        x = (t, e) => ((t.msg = n[e]), e),
        Se = (t) => (t << 1) - (4 < t ? 9 : 0),
        z = (t) => {
            let e = t.length;
            for (; 0 <= --e; ) t[e] = 0;
        };
    let A = (t, e, i) => ((e << t.hash_shift) ^ i) & t.hash_mask;
    const E = (t) => {
            const e = t.state;
            let i = e.pending;
            0 !== (i = i > t.avail_out ? t.avail_out : i) &&
                (t.output.set(
                    e.pending_buf.subarray(e.pending_out, e.pending_out + i),
                    t.next_out
                ),
                (t.next_out += i),
                (e.pending_out += i),
                (t.total_out += i),
                (t.avail_out -= i),
                (e.pending -= i),
                0 === e.pending && (e.pending_out = 0));
        },
        S = (t, e) => {
            ie(
                t,
                0 <= t.block_start ? t.block_start : -1,
                t.strstart - t.block_start,
                e
            ),
                (t.block_start = t.strstart),
                E(t.strm);
        },
        F = (t, e) => {
            t.pending_buf[t.pending++] = e;
        },
        Fe = (t, e) => {
            (t.pending_buf[t.pending++] = (e >>> 8) & 255),
                (t.pending_buf[t.pending++] = 255 & e);
        },
        Re = (t, e, i, r) => {
            let a = t.avail_in;
            return 0 === (a = a > r ? r : a)
                ? 0
                : ((t.avail_in -= a),
                  e.set(t.input.subarray(t.next_in, t.next_in + a), i),
                  1 === t.state.wrap
                      ? (t.adler = Jt(t.adler, e, a, i))
                      : 2 === t.state.wrap && (t.adler = G(t.adler, e, a, i)),
                  (t.next_in += a),
                  (t.total_in += a),
                  a);
        },
        Te = (t, e) => {
            let i = t.max_chain_length,
                r = t.strstart,
                a;
            var n;
            let s = t.prev_length,
                o = t.nice_match;
            var h = t.strstart > t.w_size - v ? t.strstart - (t.w_size - v) : 0,
                l = t.window,
                d = t.w_mask,
                f = t.prev,
                u = t.strstart + b;
            let _ = l[r + s - 1],
                c = l[r + s];
            t.prev_length >= t.good_match && (i >>= 2),
                o > t.lookahead && (o = t.lookahead);
            do {
                if (
                    l[(a = e) + s] === c &&
                    l[a + s - 1] === _ &&
                    l[a] === l[r] &&
                    l[++a] === l[r + 1]
                ) {
                    for (
                        r += 2, a++;
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        l[++r] === l[++a] &&
                        r < u;

                    );
                    if (((n = b - (u - r)), (r = u - b), n > s)) {
                        if (((t.match_start = e), (s = n) >= o)) break;
                        (_ = l[r + s - 1]), (c = l[r + s]);
                    }
                }
            } while ((e = f[e & d]) > h && 0 != --i);
            return s <= t.lookahead ? s : t.lookahead;
        },
        R = (t) => {
            var e = t.w_size;
            let i, r, a, n, s;
            do {
                if (
                    ((n = t.window_size - t.lookahead - t.strstart),
                    t.strstart >= e + (e - v))
                ) {
                    for (
                        t.window.set(t.window.subarray(e, e + e), 0),
                            t.match_start -= e,
                            t.strstart -= e,
                            t.block_start -= e,
                            r = t.hash_size,
                            i = r;
                        (a = t.head[--i]),
                            (t.head[i] = a >= e ? a - e : 0),
                            --r;

                    );
                    for (
                        r = e, i = r;
                        (a = t.prev[--i]),
                            (t.prev[i] = a >= e ? a - e : 0),
                            --r;

                    );
                    n += e;
                }
                if (0 === t.strm.avail_in) break;
                if (
                    ((r = Re(t.strm, t.window, t.strstart + t.lookahead, n)),
                    (t.lookahead += r),
                    t.lookahead + t.insert >= g)
                )
                    for (
                        s = t.strstart - t.insert,
                            t.ins_h = t.window[s],
                            t.ins_h = A(t, t.ins_h, t.window[s + 1]);
                        t.insert &&
                        ((t.ins_h = A(t, t.ins_h, t.window[s + g - 1])),
                        (t.prev[s & t.w_mask] = t.head[t.ins_h]),
                        (t.head[t.ins_h] = s),
                        s++,
                        t.insert--,
                        !(t.lookahead + t.insert < g));

                    );
            } while (t.lookahead < v && 0 !== t.strm.avail_in);
        };
    var t = (t, e) => {
            let i, r;
            for (;;) {
                if (t.lookahead < v) {
                    if ((R(t), t.lookahead < v && e === h)) return y;
                    if (0 === t.lookahead) break;
                }
                if (
                    ((i = 0),
                    t.lookahead >= g &&
                        ((t.ins_h = A(
                            t,
                            t.ins_h,
                            t.window[t.strstart + g - 1]
                        )),
                        (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                        (t.head[t.ins_h] = t.strstart)),
                    0 !== i &&
                        t.strstart - i <= t.w_size - v &&
                        (t.match_length = Te(t, i)),
                    t.match_length >= g)
                )
                    if (
                        ((r = o(
                            t,
                            t.strstart - t.match_start,
                            t.match_length - g
                        )),
                        (t.lookahead -= t.match_length),
                        t.match_length <= t.max_lazy_match && t.lookahead >= g)
                    ) {
                        for (
                            t.match_length--;
                            t.strstart++,
                                (t.ins_h = A(
                                    t,
                                    t.ins_h,
                                    t.window[t.strstart + g - 1]
                                )),
                                (i = t.prev[t.strstart & t.w_mask] =
                                    t.head[t.ins_h]),
                                (t.head[t.ins_h] = t.strstart),
                                0 != --t.match_length;

                        );
                        t.strstart++;
                    } else
                        (t.strstart += t.match_length),
                            (t.match_length = 0),
                            (t.ins_h = t.window[t.strstart]),
                            (t.ins_h = A(t, t.ins_h, t.window[t.strstart + 1]));
                else
                    (r = o(t, 0, t.window[t.strstart])),
                        t.lookahead--,
                        t.strstart++;
                if (r && (S(t, !1), 0 === t.strm.avail_out)) return y;
            }
            return (
                (t.insert = t.strstart < g - 1 ? t.strstart : g - 1),
                e === _
                    ? (S(t, !0), 0 === t.strm.avail_out ? k : Ee)
                    : t.last_lit && (S(t, !1), 0 === t.strm.avail_out)
                    ? y
                    : Ae
            );
        },
        i = (t, e) => {
            let i, r;
            for (var a; ; ) {
                if (t.lookahead < v) {
                    if ((R(t), t.lookahead < v && e === h)) return y;
                    if (0 === t.lookahead) break;
                }
                if (
                    ((i = 0),
                    t.lookahead >= g &&
                        ((t.ins_h = A(
                            t,
                            t.ins_h,
                            t.window[t.strstart + g - 1]
                        )),
                        (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]),
                        (t.head[t.ins_h] = t.strstart)),
                    (t.prev_length = t.match_length),
                    (t.prev_match = t.match_start),
                    (t.match_length = g - 1),
                    0 !== i &&
                        t.prev_length < t.max_lazy_match &&
                        t.strstart - i <= t.w_size - v &&
                        ((t.match_length = Te(t, i)),
                        t.match_length <= 5 &&
                            (t.strategy === fe ||
                                (t.match_length === g &&
                                    4096 < t.strstart - t.match_start)) &&
                            (t.match_length = g - 1)),
                    t.prev_length >= g && t.match_length <= t.prev_length)
                ) {
                    for (
                        a = t.strstart + t.lookahead - g,
                            r = o(
                                t,
                                t.strstart - 1 - t.prev_match,
                                t.prev_length - g
                            ),
                            t.lookahead -= t.prev_length - 1,
                            t.prev_length -= 2;
                        ++t.strstart <= a &&
                            ((t.ins_h = A(
                                t,
                                t.ins_h,
                                t.window[t.strstart + g - 1]
                            )),
                            (i = t.prev[t.strstart & t.w_mask] =
                                t.head[t.ins_h]),
                            (t.head[t.ins_h] = t.strstart)),
                            0 != --t.prev_length;

                    );
                    if (
                        ((t.match_available = 0),
                        (t.match_length = g - 1),
                        t.strstart++,
                        r && (S(t, !1), 0 === t.strm.avail_out))
                    )
                        return y;
                } else if (t.match_available) {
                    if (
                        ((r = o(t, 0, t.window[t.strstart - 1])) && S(t, !1),
                        t.strstart++,
                        t.lookahead--,
                        0 === t.strm.avail_out)
                    )
                        return y;
                } else (t.match_available = 1), t.strstart++, t.lookahead--;
            }
            return (
                t.match_available &&
                    ((r = o(t, 0, t.window[t.strstart - 1])),
                    (t.match_available = 0)),
                (t.insert = t.strstart < g - 1 ? t.strstart : g - 1),
                e === _
                    ? (S(t, !0), 0 === t.strm.avail_out ? k : Ee)
                    : t.last_lit && (S(t, !1), 0 === t.strm.avail_out)
                    ? y
                    : Ae
            );
        };
    function T(t, e, i, r, a) {
        (this.good_length = t),
            (this.max_lazy = e),
            (this.nice_length = i),
            (this.max_chain = r),
            (this.func = a);
    }
    const Me = [
        new T(0, 0, 0, 0, (t, e) => {
            let i = 65535;
            for (
                i > t.pending_buf_size - 5 && (i = t.pending_buf_size - 5);
                ;

            ) {
                if (t.lookahead <= 1) {
                    if ((R(t), 0 === t.lookahead && e === h)) return y;
                    if (0 === t.lookahead) break;
                }
                (t.strstart += t.lookahead), (t.lookahead = 0);
                var r = t.block_start + i;
                if (
                    (0 === t.strstart || t.strstart >= r) &&
                    ((t.lookahead = t.strstart - r),
                    (t.strstart = r),
                    S(t, !1),
                    0 === t.strm.avail_out)
                )
                    return y;
                if (
                    t.strstart - t.block_start >= t.w_size - v &&
                    (S(t, !1), 0 === t.strm.avail_out)
                )
                    return y;
            }
            return (
                (t.insert = 0),
                e === _
                    ? (S(t, !0), 0 === t.strm.avail_out ? k : Ee)
                    : (t.strstart > t.block_start &&
                          (S(t, !1), t.strm.avail_out),
                      y)
            );
        }),
        new T(4, 4, 8, 4, t),
        new T(4, 5, 16, 8, t),
        new T(4, 6, 32, 32, t),
        new T(4, 4, 16, 16, i),
        new T(8, 16, 32, 32, i),
        new T(8, 16, 128, 128, i),
        new T(8, 32, 128, 256, i),
        new T(32, 128, 258, 1024, i),
        new T(32, 258, 258, 4096, i),
    ];
    function Be() {
        (this.strm = null),
            (this.status = 0),
            (this.pending_buf = null),
            (this.pending_buf_size = 0),
            (this.pending_out = 0),
            (this.pending = 0),
            (this.wrap = 0),
            (this.gzhead = null),
            (this.gzindex = 0),
            (this.method = ge),
            (this.last_flush = -1),
            (this.w_size = 0),
            (this.w_bits = 0),
            (this.w_mask = 0),
            (this.window = null),
            (this.window_size = 0),
            (this.prev = null),
            (this.head = null),
            (this.ins_h = 0),
            (this.hash_size = 0),
            (this.hash_bits = 0),
            (this.hash_mask = 0),
            (this.hash_shift = 0),
            (this.block_start = 0),
            (this.match_length = 0),
            (this.prev_match = 0),
            (this.match_available = 0),
            (this.strstart = 0),
            (this.match_start = 0),
            (this.lookahead = 0),
            (this.prev_length = 0),
            (this.max_chain_length = 0),
            (this.max_lazy_match = 0),
            (this.level = 0),
            (this.strategy = 0),
            (this.good_match = 0),
            (this.nice_match = 0),
            (this.dyn_ltree = new Uint16Array(2 * ke)),
            (this.dyn_dtree = new Uint16Array(2 * (2 * me + 1))),
            (this.bl_tree = new Uint16Array(2 * (2 * ye + 1))),
            z(this.dyn_ltree),
            z(this.dyn_dtree),
            z(this.bl_tree),
            (this.l_desc = null),
            (this.d_desc = null),
            (this.bl_desc = null),
            (this.bl_count = new Uint16Array(xe + 1)),
            (this.heap = new Uint16Array(2 * ve + 1)),
            z(this.heap),
            (this.heap_len = 0),
            (this.heap_max = 0),
            (this.depth = new Uint16Array(2 * ve + 1)),
            z(this.depth),
            (this.l_buf = 0),
            (this.lit_bufsize = 0),
            (this.last_lit = 0),
            (this.d_buf = 0),
            (this.opt_len = 0),
            (this.static_len = 0),
            (this.matches = 0),
            (this.insert = 0),
            (this.bi_buf = 0),
            (this.bi_valid = 0);
    }
    const Ue = (t) => {
            if (!t || !t.state) return x(t, p);
            (t.total_in = t.total_out = 0), (t.data_type = we);
            const e = t.state;
            return (
                (e.pending = 0),
                (e.pending_out = 0),
                e.wrap < 0 && (e.wrap = -e.wrap),
                (e.status = e.wrap ? ze : m),
                (t.adler = 2 === e.wrap ? 0 : 1),
                (e.last_flush = h),
                te(e),
                c
            );
        },
        Ze = (t) => {
            var e = Ue(t);
            return (
                e === c &&
                    (((t = t.state).window_size = 2 * t.w_size),
                    z(t.head),
                    (t.max_lazy_match = Me[t.level].max_lazy),
                    (t.good_match = Me[t.level].good_length),
                    (t.nice_match = Me[t.level].nice_length),
                    (t.max_chain_length = Me[t.level].max_chain),
                    (t.strstart = 0),
                    (t.block_start = 0),
                    (t.lookahead = 0),
                    (t.insert = 0),
                    (t.match_length = t.prev_length = g - 1),
                    (t.match_available = 0),
                    (t.ins_h = 0)),
                e
            );
        };
    const De = (t, e, i, r, a, n) => {
        if (!t) return p;
        let s = 1;
        if (
            (e === de && (e = 6),
            r < 0 ? ((s = 0), (r = -r)) : 15 < r && ((s = 2), (r -= 16)),
            a < 1 ||
                a > be ||
                i !== ge ||
                r < 8 ||
                15 < r ||
                e < 0 ||
                9 < e ||
                n < 0 ||
                n > ce)
        )
            return x(t, p);
        8 === r && (r = 9);
        const o = new Be();
        return (
            ((t.state = o).strm = t),
            (o.wrap = s),
            (o.gzhead = null),
            (o.w_bits = r),
            (o.w_size = 1 << o.w_bits),
            (o.w_mask = o.w_size - 1),
            (o.hash_bits = a + 7),
            (o.hash_size = 1 << o.hash_bits),
            (o.hash_mask = o.hash_size - 1),
            (o.hash_shift = ~~((o.hash_bits + g - 1) / g)),
            (o.window = new Uint8Array(2 * o.w_size)),
            (o.head = new Uint16Array(o.hash_size)),
            (o.prev = new Uint16Array(o.w_size)),
            (o.lit_bufsize = 1 << (a + 6)),
            (o.pending_buf_size = 4 * o.lit_bufsize),
            (o.pending_buf = new Uint8Array(o.pending_buf_size)),
            (o.d_buf = +o.lit_bufsize),
            (o.l_buf = 3 * o.lit_bufsize),
            (o.level = e),
            (o.strategy = n),
            (o.method = i),
            Ze(t)
        );
    };
    var Ve = {
        deflateInit: (t, e) => De(t, e, ge, 15, 8, pe),
        deflateInit2: De,
        deflateReset: Ze,
        deflateResetKeep: Ue,
        deflateSetHeader: (t, e) =>
            !t || !t.state || 2 !== t.state.wrap
                ? p
                : ((t.state.gzhead = e), c),
        deflate: (i, t) => {
            let e, r;
            if (!i || !i.state || t > se || t < 0) return i ? x(i, p) : p;
            const a = i.state;
            if (
                !i.output ||
                (!i.input && 0 !== i.avail_in) ||
                (666 === a.status && t !== _)
            )
                return x(i, 0 === i.avail_out ? le : p);
            a.strm = i;
            var n = a.last_flush;
            if (((a.last_flush = t), a.status === ze))
                if (2 === a.wrap)
                    (i.adler = 0),
                        F(a, 31),
                        F(a, 139),
                        F(a, 8),
                        a.gzhead
                            ? (F(
                                  a,
                                  (a.gzhead.text ? 1 : 0) +
                                      (a.gzhead.hcrc ? 2 : 0) +
                                      (a.gzhead.extra ? 4 : 0) +
                                      (a.gzhead.name ? 8 : 0) +
                                      (a.gzhead.comment ? 16 : 0)
                              ),
                              F(a, 255 & a.gzhead.time),
                              F(a, (a.gzhead.time >> 8) & 255),
                              F(a, (a.gzhead.time >> 16) & 255),
                              F(a, (a.gzhead.time >> 24) & 255),
                              F(
                                  a,
                                  9 === a.level
                                      ? 2
                                      : a.strategy >= ue || a.level < 2
                                      ? 4
                                      : 0
                              ),
                              F(a, 255 & a.gzhead.os),
                              a.gzhead.extra &&
                                  a.gzhead.extra.length &&
                                  (F(a, 255 & a.gzhead.extra.length),
                                  F(a, (a.gzhead.extra.length >> 8) & 255)),
                              a.gzhead.hcrc &&
                                  (i.adler = G(
                                      i.adler,
                                      a.pending_buf,
                                      a.pending,
                                      0
                                  )),
                              (a.gzindex = 0),
                              (a.status = 69))
                            : (F(a, 0),
                              F(a, 0),
                              F(a, 0),
                              F(a, 0),
                              F(a, 0),
                              F(
                                  a,
                                  9 === a.level
                                      ? 2
                                      : a.strategy >= ue || a.level < 2
                                      ? 4
                                      : 0
                              ),
                              F(a, 3),
                              (a.status = m));
                else {
                    let t = (ge + ((a.w_bits - 8) << 4)) << 8,
                        e = -1;
                    (e =
                        a.strategy >= ue || a.level < 2
                            ? 0
                            : a.level < 6
                            ? 1
                            : 6 === a.level
                            ? 2
                            : 3),
                        (t |= e << 6),
                        0 !== a.strstart && (t |= 32),
                        (t += 31 - (t % 31)),
                        (a.status = m),
                        Fe(a, t),
                        0 !== a.strstart &&
                            (Fe(a, i.adler >>> 16), Fe(a, 65535 & i.adler)),
                        (i.adler = 1);
                }
            if (69 === a.status)
                if (a.gzhead.extra) {
                    for (
                        e = a.pending;
                        a.gzindex < (65535 & a.gzhead.extra.length) &&
                        (a.pending !== a.pending_buf_size ||
                            (a.gzhead.hcrc &&
                                a.pending > e &&
                                (i.adler = G(
                                    i.adler,
                                    a.pending_buf,
                                    a.pending - e,
                                    e
                                )),
                            E(i),
                            (e = a.pending),
                            a.pending !== a.pending_buf_size));

                    )
                        F(a, 255 & a.gzhead.extra[a.gzindex]), a.gzindex++;
                    a.gzhead.hcrc &&
                        a.pending > e &&
                        (i.adler = G(i.adler, a.pending_buf, a.pending - e, e)),
                        a.gzindex === a.gzhead.extra.length &&
                            ((a.gzindex = 0), (a.status = 73));
                } else a.status = 73;
            if (73 === a.status)
                if (a.gzhead.name) {
                    e = a.pending;
                    do {
                        if (
                            a.pending === a.pending_buf_size &&
                            (a.gzhead.hcrc &&
                                a.pending > e &&
                                (i.adler = G(
                                    i.adler,
                                    a.pending_buf,
                                    a.pending - e,
                                    e
                                )),
                            E(i),
                            (e = a.pending),
                            a.pending === a.pending_buf_size)
                        ) {
                            r = 1;
                            break;
                        }
                    } while (
                        ((r =
                            a.gzindex < a.gzhead.name.length
                                ? 255 & a.gzhead.name.charCodeAt(a.gzindex++)
                                : 0),
                        F(a, r),
                        0 !== r)
                    );
                    a.gzhead.hcrc &&
                        a.pending > e &&
                        (i.adler = G(i.adler, a.pending_buf, a.pending - e, e)),
                        0 === r && ((a.gzindex = 0), (a.status = 91));
                } else a.status = 91;
            if (91 === a.status)
                if (a.gzhead.comment) {
                    e = a.pending;
                    do {
                        if (
                            a.pending === a.pending_buf_size &&
                            (a.gzhead.hcrc &&
                                a.pending > e &&
                                (i.adler = G(
                                    i.adler,
                                    a.pending_buf,
                                    a.pending - e,
                                    e
                                )),
                            E(i),
                            (e = a.pending),
                            a.pending === a.pending_buf_size)
                        ) {
                            r = 1;
                            break;
                        }
                    } while (
                        ((r =
                            a.gzindex < a.gzhead.comment.length
                                ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++)
                                : 0),
                        F(a, r),
                        0 !== r)
                    );
                    a.gzhead.hcrc &&
                        a.pending > e &&
                        (i.adler = G(i.adler, a.pending_buf, a.pending - e, e)),
                        0 === r && (a.status = 103);
                } else a.status = 103;
            if (
                (103 === a.status &&
                    (a.gzhead.hcrc
                        ? (a.pending + 2 > a.pending_buf_size && E(i),
                          a.pending + 2 <= a.pending_buf_size &&
                              (F(a, 255 & i.adler),
                              F(a, (i.adler >> 8) & 255),
                              (i.adler = 0),
                              (a.status = m)))
                        : (a.status = m)),
                0 !== a.pending)
            ) {
                if ((E(i), 0 === i.avail_out)) return (a.last_flush = -1), c;
            } else if (0 === i.avail_in && Se(t) <= Se(n) && t !== _)
                return x(i, le);
            if (666 === a.status && 0 !== i.avail_in) return x(i, le);
            if (
                0 !== i.avail_in ||
                0 !== a.lookahead ||
                (t !== h && 666 !== a.status)
            ) {
                n =
                    a.strategy === ue
                        ? ((t, e) => {
                              for (var i; ; ) {
                                  if (
                                      0 === t.lookahead &&
                                      (R(t), 0 === t.lookahead)
                                  ) {
                                      if (e === h) return y;
                                      break;
                                  }
                                  if (
                                      ((t.match_length = 0),
                                      (i = o(t, 0, t.window[t.strstart])),
                                      t.lookahead--,
                                      t.strstart++,
                                      i && (S(t, !1), 0 === t.strm.avail_out))
                                  )
                                      return y;
                              }
                              return (
                                  (t.insert = 0),
                                  e === _
                                      ? (S(t, !0),
                                        0 === t.strm.avail_out ? k : Ee)
                                      : t.last_lit &&
                                        (S(t, !1), 0 === t.strm.avail_out)
                                      ? y
                                      : Ae
                              );
                          })(a, t)
                        : a.strategy === _e
                        ? ((t, e) => {
                              let i;
                              var r;
                              let a, n;
                              for (var s = t.window; ; ) {
                                  if (t.lookahead <= b) {
                                      if ((R(t), t.lookahead <= b && e === h))
                                          return y;
                                      if (0 === t.lookahead) break;
                                  }
                                  if (
                                      ((t.match_length = 0),
                                      t.lookahead >= g &&
                                          0 < t.strstart &&
                                          (r = s[(a = t.strstart - 1)]) ===
                                              s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a])
                                  ) {
                                      for (
                                          n = t.strstart + b;
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          r === s[++a] &&
                                          a < n;

                                      );
                                      (t.match_length = b - (n - a)),
                                          t.match_length > t.lookahead &&
                                              (t.match_length = t.lookahead);
                                  }
                                  if (
                                      (t.match_length >= g
                                          ? ((i = o(t, 1, t.match_length - g)),
                                            (t.lookahead -= t.match_length),
                                            (t.strstart += t.match_length),
                                            (t.match_length = 0))
                                          : ((i = o(
                                                t,
                                                0,
                                                t.window[t.strstart]
                                            )),
                                            t.lookahead--,
                                            t.strstart++),
                                      i && (S(t, !1), 0 === t.strm.avail_out))
                                  )
                                      return y;
                              }
                              return (
                                  (t.insert = 0),
                                  e === _
                                      ? (S(t, !0),
                                        0 === t.strm.avail_out ? k : Ee)
                                      : t.last_lit &&
                                        (S(t, !1), 0 === t.strm.avail_out)
                                      ? y
                                      : Ae
                              );
                          })(a, t)
                        : Me[a.level].func(a, t);
                if (
                    ((n !== k && n !== Ee) || (a.status = 666),
                    n === y || n === k)
                )
                    return 0 === i.avail_out && (a.last_flush = -1), c;
                if (
                    n === Ae &&
                    (t === ae
                        ? re(a)
                        : t !== se &&
                          (ee(a, 0, 0, !1),
                          t === ne &&
                              (z(a.head),
                              0 === a.lookahead &&
                                  ((a.strstart = 0),
                                  (a.block_start = 0),
                                  (a.insert = 0)))),
                    E(i),
                    0 === i.avail_out)
                )
                    return (a.last_flush = -1), c;
            }
            return t !== _
                ? c
                : a.wrap <= 0
                ? oe
                : (2 === a.wrap
                      ? (F(a, 255 & i.adler),
                        F(a, (i.adler >> 8) & 255),
                        F(a, (i.adler >> 16) & 255),
                        F(a, (i.adler >> 24) & 255),
                        F(a, 255 & i.total_in),
                        F(a, (i.total_in >> 8) & 255),
                        F(a, (i.total_in >> 16) & 255),
                        F(a, (i.total_in >> 24) & 255))
                      : (Fe(a, i.adler >>> 16), Fe(a, 65535 & i.adler)),
                  E(i),
                  0 < a.wrap && (a.wrap = -a.wrap),
                  0 !== a.pending ? c : oe);
        },
        deflateEnd: (t) => {
            if (!t || !t.state) return p;
            var e = t.state.status;
            return e !== ze &&
                69 !== e &&
                73 !== e &&
                91 !== e &&
                103 !== e &&
                e !== m &&
                666 !== e
                ? x(t, p)
                : ((t.state = null), e === m ? x(t, he) : c);
        },
        deflateSetDictionary: (t, e) => {
            let i = e.length;
            if (!t || !t.state) return p;
            const r = t.state;
            var a = r.wrap;
            if (2 === a || (1 === a && r.status !== ze) || r.lookahead)
                return p;
            if (
                (1 === a && (t.adler = Jt(t.adler, e, i, 0)),
                (r.wrap = 0),
                i >= r.w_size)
            ) {
                0 === a &&
                    (z(r.head),
                    (r.strstart = 0),
                    (r.block_start = 0),
                    (r.insert = 0));
                let t = new Uint8Array(r.w_size);
                t.set(e.subarray(i - r.w_size, i), 0), (e = t), (i = r.w_size);
            }
            var n = t.avail_in,
                s = t.next_in,
                o = t.input;
            for (
                t.avail_in = i, t.next_in = 0, t.input = e, R(r);
                r.lookahead >= g;

            ) {
                let t = r.strstart,
                    e = r.lookahead - (g - 1);
                for (
                    ;
                    (r.ins_h = A(r, r.ins_h, r.window[t + g - 1])),
                        (r.prev[t & r.w_mask] = r.head[r.ins_h]),
                        (r.head[r.ins_h] = t),
                        t++,
                        --e;

                );
                (r.strstart = t), (r.lookahead = g - 1), R(r);
            }
            return (
                (r.strstart += r.lookahead),
                (r.block_start = r.strstart),
                (r.insert = r.lookahead),
                (r.lookahead = 0),
                (r.match_length = r.prev_length = g - 1),
                (r.match_available = 0),
                (t.next_in = s),
                (t.input = o),
                (t.avail_in = n),
                (r.wrap = a),
                c
            );
        },
        deflateInfo: "pako deflate (from Nodeca project)",
    };
    var Ne = function (t) {
            const e = Array.prototype.slice.call(arguments, 1);
            for (; e.length; ) {
                var i = e.shift();
                if (i) {
                    if ("object" != typeof i)
                        throw new TypeError(i + "must be non-object");
                    for (const n in i)
                        (r = i),
                            (a = n),
                            Object.prototype.hasOwnProperty.call(r, a) &&
                                (t[n] = i[n]);
                }
            }
            var r, a;
            return t;
        },
        Oe = (r) => {
            let i = 0;
            for (let t = 0, e = r.length; t < e; t++) i += r[t].length;
            const a = new Uint8Array(i);
            for (let t = 0, e = 0, i = r.length; t < i; t++) {
                var n = r[t];
                a.set(n, e), (e += n.length);
            }
            return a;
        };
    let Ie = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (t) {
        Ie = !1;
    }
    const Le = new Uint8Array(256);
    for (let t = 0; t < 256; t++)
        Le[t] =
            252 <= t
                ? 6
                : 248 <= t
                ? 5
                : 240 <= t
                ? 4
                : 224 <= t
                ? 3
                : 192 <= t
                ? 2
                : 1;
    Le[254] = Le[254] = 1;
    var Pe = (t) => {
            if (
                "function" == typeof TextEncoder &&
                TextEncoder.prototype.encode
            )
                return new TextEncoder().encode(t);
            let e,
                i,
                r,
                a,
                n,
                s = t.length,
                o = 0;
            for (a = 0; a < s; a++)
                55296 == (64512 & (i = t.charCodeAt(a))) &&
                    a + 1 < s &&
                    56320 == (64512 & (r = t.charCodeAt(a + 1))) &&
                    ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), a++),
                    (o += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
            for (e = new Uint8Array(o), n = 0, a = 0; n < o; a++)
                55296 == (64512 & (i = t.charCodeAt(a))) &&
                    a + 1 < s &&
                    56320 == (64512 & (r = t.charCodeAt(a + 1))) &&
                    ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), a++),
                    i < 128
                        ? (e[n++] = i)
                        : (i < 2048
                              ? (e[n++] = 192 | (i >>> 6))
                              : (i < 65536
                                    ? (e[n++] = 224 | (i >>> 12))
                                    : ((e[n++] = 240 | (i >>> 18)),
                                      (e[n++] = 128 | ((i >>> 12) & 63))),
                                (e[n++] = 128 | ((i >>> 6) & 63))),
                          (e[n++] = 128 | (63 & i)));
            return e;
        },
        Ce = (i, t) => {
            var r = t || i.length;
            if (
                "function" == typeof TextDecoder &&
                TextDecoder.prototype.decode
            )
                return new TextDecoder().decode(i.subarray(0, t));
            let a, n;
            const s = new Array(2 * r);
            for (n = 0, a = 0; a < r; ) {
                let e = i[a++];
                if (e < 128) s[n++] = e;
                else {
                    let t = Le[e];
                    if (4 < t) (s[n++] = 65533), (a += t - 1);
                    else {
                        for (
                            e &= 2 === t ? 31 : 3 === t ? 15 : 7;
                            1 < t && a < r;

                        )
                            (e = (e << 6) | (63 & i[a++])), t--;
                        1 < t
                            ? (s[n++] = 65533)
                            : e < 65536
                            ? (s[n++] = e)
                            : ((e -= 65536),
                              (s[n++] = 55296 | ((e >> 10) & 1023)),
                              (s[n++] = 56320 | (1023 & e)));
                    }
                }
            }
            {
                var o = s,
                    h = n;
                if (h < 65534 && o.subarray && Ie)
                    return String.fromCharCode.apply(
                        null,
                        o.length === h ? o : o.subarray(0, h)
                    );
                let e = "";
                for (let t = 0; t < h; t++) e += String.fromCharCode(o[t]);
                return e;
            }
        },
        He = (t, e) => {
            let i = (e = (e = e || t.length) > t.length ? t.length : e) - 1;
            for (; 0 <= i && 128 == (192 & t[i]); ) i--;
            return !(i < 0) && 0 !== i && i + Le[t[i]] > e ? i : e;
        };
    var je = function () {
        (this.input = null),
            (this.next_in = 0),
            (this.avail_in = 0),
            (this.total_in = 0),
            (this.output = null),
            (this.next_out = 0),
            (this.avail_out = 0),
            (this.total_out = 0),
            (this.msg = ""),
            (this.state = null),
            (this.data_type = 2),
            (this.adler = 0);
    };
    const Ke = Object.prototype.toString,
        {
            Z_NO_FLUSH: Ge,
            Z_SYNC_FLUSH: Ye,
            Z_FULL_FLUSH: We,
            Z_FINISH: qe,
            Z_OK: Xe,
            Z_STREAM_END: Je,
            Z_DEFAULT_COMPRESSION: Qe,
            Z_DEFAULT_STRATEGY: $e,
            Z_DEFLATED: ti,
        } = $t;
    function ei(t) {
        this.options = Ne(
            {
                level: Qe,
                method: ti,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: $e,
            },
            t || {}
        );
        let e = this.options,
            i =
                (e.raw && 0 < e.windowBits
                    ? (e.windowBits = -e.windowBits)
                    : e.gzip &&
                      0 < e.windowBits &&
                      e.windowBits < 16 &&
                      (e.windowBits += 16),
                (this.err = 0),
                (this.msg = ""),
                (this.ended = !1),
                (this.chunks = []),
                (this.strm = new je()),
                (this.strm.avail_out = 0),
                Ve.deflateInit2(
                    this.strm,
                    e.level,
                    e.method,
                    e.windowBits,
                    e.memLevel,
                    e.strategy
                ));
        if (i !== Xe) throw new Error(n[i]);
        if (
            (e.header && Ve.deflateSetHeader(this.strm, e.header), e.dictionary)
        ) {
            let t;
            if (
                ((t =
                    "string" == typeof e.dictionary
                        ? Pe(e.dictionary)
                        : "[object ArrayBuffer]" === Ke.call(e.dictionary)
                        ? new Uint8Array(e.dictionary)
                        : e.dictionary),
                (i = Ve.deflateSetDictionary(this.strm, t)) !== Xe)
            )
                throw new Error(n[i]);
            this._dict_set = !0;
        }
    }
    function ii(t, e) {
        const i = new ei(e);
        if ((i.push(t, !0), i.err)) throw i.msg || n[i.err];
        return i.result;
    }
    (ei.prototype.push = function (t, e) {
        const i = this.strm;
        var r = this.options.chunkSize;
        let a, n;
        if (this.ended) return !1;
        for (
            n = e === ~~e ? e : !0 === e ? qe : Ge,
                "string" == typeof t
                    ? (i.input = Pe(t))
                    : "[object ArrayBuffer]" === Ke.call(t)
                    ? (i.input = new Uint8Array(t))
                    : (i.input = t),
                i.next_in = 0,
                i.avail_in = i.input.length;
            ;

        )
            if (
                (0 === i.avail_out &&
                    ((i.output = new Uint8Array(r)),
                    (i.next_out = 0),
                    (i.avail_out = r)),
                (n === Ye || n === We) && i.avail_out <= 6)
            )
                this.onData(i.output.subarray(0, i.next_out)),
                    (i.avail_out = 0);
            else {
                if (Ve.deflate(i, n) === Je)
                    return (
                        0 < i.next_out &&
                            this.onData(i.output.subarray(0, i.next_out)),
                        (a = Ve.deflateEnd(this.strm)),
                        this.onEnd(a),
                        (this.ended = !0),
                        a === Xe
                    );
                if (0 === i.avail_out) this.onData(i.output);
                else if (0 < n && 0 < i.next_out)
                    this.onData(i.output.subarray(0, i.next_out)),
                        (i.avail_out = 0);
                else if (0 === i.avail_in) break;
            }
        return !0;
    }),
        (ei.prototype.onData = function (t) {
            this.chunks.push(t);
        }),
        (ei.prototype.onEnd = function (t) {
            t === Xe && (this.result = Oe(this.chunks)),
                (this.chunks = []),
                (this.err = t),
                (this.msg = this.strm.msg);
        });
    t = {
        Deflate: ei,
        deflate: ii,
        deflateRaw: function (t, e) {
            return ((e = e || {}).raw = !0), ii(t, e);
        },
        gzip: function (t, e) {
            return ((e = e || {}).gzip = !0), ii(t, e);
        },
        constants: $t,
    };
    const ri = 30,
        ai = 12;
    const ni = new Uint16Array([
            3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51,
            59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0,
        ]),
        si = new Uint8Array([
            16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19,
            19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78,
        ]),
        oi = new Uint16Array([
            1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
            513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385,
            24577, 0, 0,
        ]),
        hi = new Uint8Array([
            16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23,
            23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64,
        ]);
    var li = (t, e, i, r, a, n, s, o) => {
        var h,
            l = o.bits;
        let d = 0,
            f = 0,
            u = 0,
            _ = 0,
            c = 0,
            p = 0,
            w = 0,
            g = 0,
            b = 0,
            v = 0,
            m,
            y,
            k,
            x,
            z = null,
            A = 0,
            E;
        const S = new Uint16Array(16),
            F = new Uint16Array(16);
        let R = null,
            T = 0,
            M,
            B,
            U;
        for (d = 0; d <= 15; d++) S[d] = 0;
        for (f = 0; f < r; f++) S[e[i + f]]++;
        for (c = l, _ = 15; 1 <= _ && 0 === S[_]; _--);
        if ((c > _ && (c = _), 0 === _))
            return (a[n++] = 20971520), (a[n++] = 20971520), (o.bits = 1), 0;
        for (u = 1; u < _ && 0 === S[u]; u++);
        for (c < u && (c = u), g = 1, d = 1; d <= 15; d++)
            if ((g = (g <<= 1) - S[d]) < 0) return -1;
        if (0 < g && (0 === t || 1 !== _)) return -1;
        for (F[1] = 0, d = 1; d < 15; d++) F[d + 1] = F[d] + S[d];
        for (f = 0; f < r; f++) 0 !== e[i + f] && (s[F[e[i + f]]++] = f);
        if (
            ((E =
                0 === t
                    ? ((z = R = s), 19)
                    : 1 === t
                    ? ((z = ni), (A -= 257), (R = si), (T -= 257), 256)
                    : ((z = oi), (R = hi), -1)),
            (v = 0),
            (f = 0),
            (d = u),
            (x = n),
            (p = c),
            (w = 0),
            (k = -1),
            (h = (b = 1 << c) - 1),
            (1 === t && 852 < b) || (2 === t && 592 < b))
        )
            return 1;
        for (;;) {
            for (
                M = d - w,
                    U =
                        s[f] < E
                            ? ((B = 0), s[f])
                            : s[f] > E
                            ? ((B = R[T + s[f]]), z[A + s[f]])
                            : ((B = 96), 0),
                    m = 1 << (d - w),
                    y = 1 << p,
                    u = y;
                (y -= m),
                    (a[x + (v >> w) + y] = (M << 24) | (B << 16) | U | 0),
                    0 !== y;

            );
            for (m = 1 << (d - 1); v & m; ) m >>= 1;
            if (((v = 0 !== m ? (v &= m - 1) + m : 0), f++, 0 == --S[d])) {
                if (d === _) break;
                d = e[i + s[f]];
            }
            if (d > c && (v & h) !== k) {
                for (
                    0 === w && (w = c), x += u, p = d - w, g = 1 << p;
                    p + w < _ && !((g -= S[p + w]) <= 0);

                )
                    p++, (g <<= 1);
                if (
                    ((b += 1 << p),
                    (1 === t && 852 < b) || (2 === t && 592 < b))
                )
                    return 1;
                a[(k = v & h)] = (c << 24) | (p << 16) | (x - n) | 0;
            }
        }
        return (
            0 !== v && (a[x + v] = ((d - w) << 24) | (64 << 16) | 0),
            (o.bits = c),
            0
        );
    };
    const di = 1,
        fi = 2,
        {
            Z_FINISH: ui,
            Z_BLOCK: _i,
            Z_TREES: ci,
            Z_OK: Y,
            Z_STREAM_END: pi,
            Z_NEED_DICT: wi,
            Z_STREAM_ERROR: W,
            Z_DATA_ERROR: gi,
            Z_MEM_ERROR: bi,
            Z_BUF_ERROR: vi,
            Z_DEFLATED: mi,
        } = $t,
        yi = 1,
        ki = 852,
        xi = 592;
    const zi = (t) =>
        ((t >>> 24) & 255) +
        ((t >>> 8) & 65280) +
        ((65280 & t) << 8) +
        ((255 & t) << 24);
    function Ai() {
        (this.mode = 0),
            (this.last = !1),
            (this.wrap = 0),
            (this.havedict = !1),
            (this.flags = 0),
            (this.dmax = 0),
            (this.check = 0),
            (this.total = 0),
            (this.head = null),
            (this.wbits = 0),
            (this.wsize = 0),
            (this.whave = 0),
            (this.wnext = 0),
            (this.window = null),
            (this.hold = 0),
            (this.bits = 0),
            (this.length = 0),
            (this.offset = 0),
            (this.extra = 0),
            (this.lencode = null),
            (this.distcode = null),
            (this.lenbits = 0),
            (this.distbits = 0),
            (this.ncode = 0),
            (this.nlen = 0),
            (this.ndist = 0),
            (this.have = 0),
            (this.next = null),
            (this.lens = new Uint16Array(320)),
            (this.work = new Uint16Array(288)),
            (this.lendyn = null),
            (this.distdyn = null),
            (this.sane = 0),
            (this.back = 0),
            (this.was = 0);
    }
    const Ei = (t) => {
            if (!t || !t.state) return W;
            const e = t.state;
            return (
                (t.total_in = t.total_out = e.total = 0),
                (t.msg = ""),
                e.wrap && (t.adler = 1 & e.wrap),
                (e.mode = yi),
                (e.last = 0),
                (e.havedict = 0),
                (e.dmax = 32768),
                (e.head = null),
                (e.hold = 0),
                (e.bits = 0),
                (e.lencode = e.lendyn = new Int32Array(ki)),
                (e.distcode = e.distdyn = new Int32Array(xi)),
                (e.sane = 1),
                (e.back = -1),
                Y
            );
        },
        Si = (t) => {
            if (!t || !t.state) return W;
            const e = t.state;
            return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), Ei(t);
        },
        Fi = (t, e) => {
            let i;
            if (!t || !t.state) return W;
            const r = t.state;
            return (
                e < 0
                    ? ((i = 0), (e = -e))
                    : ((i = 1 + (e >> 4)), e < 48 && (e &= 15)),
                e && (e < 8 || 15 < e)
                    ? W
                    : (null !== r.window && r.wbits !== e && (r.window = null),
                      (r.wrap = i),
                      (r.wbits = e),
                      Si(t))
            );
        },
        Ri = (t, e) => {
            if (!t) return W;
            const i = new Ai();
            (t.state = i).window = null;
            e = Fi(t, e);
            return e !== Y && (t.state = null), e;
        };
    let Ti = !0,
        Mi,
        Bi;
    const Ui = (t, e, i, r) => {
        let a;
        const n = t.state;
        return (
            null === n.window &&
                ((n.wsize = 1 << n.wbits),
                (n.wnext = 0),
                (n.whave = 0),
                (n.window = new Uint8Array(n.wsize))),
            r >= n.wsize
                ? (n.window.set(e.subarray(i - n.wsize, i), 0),
                  (n.wnext = 0),
                  (n.whave = n.wsize))
                : ((a = n.wsize - n.wnext) > r && (a = r),
                  n.window.set(e.subarray(i - r, i - r + a), n.wnext),
                  (r -= a)
                      ? (n.window.set(e.subarray(i - r, i), 0),
                        (n.wnext = r),
                        (n.whave = n.wsize))
                      : ((n.wnext += a),
                        n.wnext === n.wsize && (n.wnext = 0),
                        n.whave < n.wsize && (n.whave += a))),
            0
        );
    };
    var M = {
        inflateReset: Si,
        inflateReset2: Fi,
        inflateResetKeep: Ei,
        inflateInit: (t) => Ri(t, 15),
        inflateInit2: Ri,
        inflate: (f, t) => {
            let e,
                i,
                r,
                a,
                n,
                s,
                o,
                h,
                l,
                d,
                u,
                _,
                V,
                N,
                c = 0,
                p,
                w,
                g,
                b,
                v,
                m,
                y,
                k;
            const x = new Uint8Array(4);
            let z, A;
            var E,
                O,
                S,
                I,
                F,
                L,
                R,
                T,
                M,
                P,
                C,
                H,
                B,
                j = new Uint8Array([
                    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14,
                    1, 15,
                ]);
            if (!f || !f.state || !f.output || (!f.input && 0 !== f.avail_in))
                return W;
            12 === (e = f.state).mode && (e.mode = 13),
                (n = f.next_out),
                (r = f.output),
                (o = f.avail_out),
                (a = f.next_in),
                (i = f.input),
                (s = f.avail_in),
                (h = e.hold),
                (l = e.bits),
                (d = s),
                (u = o),
                (k = Y);
            t: for (;;)
                switch (e.mode) {
                    case yi:
                        if (0 === e.wrap) {
                            e.mode = 13;
                            break;
                        }
                        for (; l < 16; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        if (2 & e.wrap && 35615 === h) {
                            (e.check = 0),
                                (x[0] = 255 & h),
                                (x[1] = (h >>> 8) & 255),
                                (e.check = G(e.check, x, 2, 0)),
                                (h = 0),
                                (l = 0),
                                (e.mode = 2);
                            break;
                        }
                        if (
                            ((e.flags = 0),
                            e.head && (e.head.done = !1),
                            !(1 & e.wrap) || (((255 & h) << 8) + (h >> 8)) % 31)
                        ) {
                            (f.msg = "incorrect header check"), (e.mode = 30);
                            break;
                        }
                        if ((15 & h) !== mi) {
                            (f.msg = "unknown compression method"),
                                (e.mode = 30);
                            break;
                        }
                        if (
                            ((h >>>= 4),
                            (l -= 4),
                            (y = 8 + (15 & h)),
                            0 === e.wbits)
                        )
                            e.wbits = y;
                        else if (y > e.wbits) {
                            (f.msg = "invalid window size"), (e.mode = 30);
                            break;
                        }
                        (e.dmax = 1 << e.wbits),
                            (f.adler = e.check = 1),
                            (e.mode = 512 & h ? 10 : 12),
                            (h = 0),
                            (l = 0);
                        break;
                    case 2:
                        for (; l < 16; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        if (((e.flags = h), (255 & e.flags) !== mi)) {
                            (f.msg = "unknown compression method"),
                                (e.mode = 30);
                            break;
                        }
                        if (57344 & e.flags) {
                            (f.msg = "unknown header flags set"), (e.mode = 30);
                            break;
                        }
                        e.head && (e.head.text = (h >> 8) & 1),
                            512 & e.flags &&
                                ((x[0] = 255 & h),
                                (x[1] = (h >>> 8) & 255),
                                (e.check = G(e.check, x, 2, 0))),
                            (h = 0),
                            (l = 0),
                            (e.mode = 3);
                    case 3:
                        for (; l < 32; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        e.head && (e.head.time = h),
                            512 & e.flags &&
                                ((x[0] = 255 & h),
                                (x[1] = (h >>> 8) & 255),
                                (x[2] = (h >>> 16) & 255),
                                (x[3] = (h >>> 24) & 255),
                                (e.check = G(e.check, x, 4, 0))),
                            (h = 0),
                            (l = 0),
                            (e.mode = 4);
                    case 4:
                        for (; l < 16; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        e.head &&
                            ((e.head.xflags = 255 & h), (e.head.os = h >> 8)),
                            512 & e.flags &&
                                ((x[0] = 255 & h),
                                (x[1] = (h >>> 8) & 255),
                                (e.check = G(e.check, x, 2, 0))),
                            (h = 0),
                            (l = 0),
                            (e.mode = 5);
                    case 5:
                        if (1024 & e.flags) {
                            for (; l < 16; ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            (e.length = h),
                                e.head && (e.head.extra_len = h),
                                512 & e.flags &&
                                    ((x[0] = 255 & h),
                                    (x[1] = (h >>> 8) & 255),
                                    (e.check = G(e.check, x, 2, 0))),
                                (h = 0),
                                (l = 0);
                        } else e.head && (e.head.extra = null);
                        e.mode = 6;
                    case 6:
                        if (
                            1024 & e.flags &&
                            ((_ = (_ = e.length) > s ? s : _) &&
                                (e.head &&
                                    ((y = e.head.extra_len - e.length),
                                    e.head.extra ||
                                        (e.head.extra = new Uint8Array(
                                            e.head.extra_len
                                        )),
                                    e.head.extra.set(i.subarray(a, a + _), y)),
                                512 & e.flags &&
                                    (e.check = G(e.check, i, _, a)),
                                (s -= _),
                                (a += _),
                                (e.length -= _)),
                            e.length)
                        )
                            break t;
                        (e.length = 0), (e.mode = 7);
                    case 7:
                        if (2048 & e.flags) {
                            if (0 === s) break t;
                            for (
                                _ = 0;
                                (y = i[a + _++]),
                                    e.head &&
                                        y &&
                                        e.length < 65536 &&
                                        (e.head.name += String.fromCharCode(y)),
                                    y && _ < s;

                            );
                            if (
                                (512 & e.flags &&
                                    (e.check = G(e.check, i, _, a)),
                                (s -= _),
                                (a += _),
                                y)
                            )
                                break t;
                        } else e.head && (e.head.name = null);
                        (e.length = 0), (e.mode = 8);
                    case 8:
                        if (4096 & e.flags) {
                            if (0 === s) break t;
                            for (
                                _ = 0;
                                (y = i[a + _++]),
                                    e.head &&
                                        y &&
                                        e.length < 65536 &&
                                        (e.head.comment +=
                                            String.fromCharCode(y)),
                                    y && _ < s;

                            );
                            if (
                                (512 & e.flags &&
                                    (e.check = G(e.check, i, _, a)),
                                (s -= _),
                                (a += _),
                                y)
                            )
                                break t;
                        } else e.head && (e.head.comment = null);
                        e.mode = 9;
                    case 9:
                        if (512 & e.flags) {
                            for (; l < 16; ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            if (h !== (65535 & e.check)) {
                                (f.msg = "header crc mismatch"), (e.mode = 30);
                                break;
                            }
                            (h = 0), (l = 0);
                        }
                        e.head &&
                            ((e.head.hcrc = (e.flags >> 9) & 1),
                            (e.head.done = !0)),
                            (f.adler = e.check = 0),
                            (e.mode = 12);
                        break;
                    case 10:
                        for (; l < 32; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        (f.adler = e.check = zi(h)),
                            (h = 0),
                            (l = 0),
                            (e.mode = 11);
                    case 11:
                        if (0 === e.havedict)
                            return (
                                (f.next_out = n),
                                (f.avail_out = o),
                                (f.next_in = a),
                                (f.avail_in = s),
                                (e.hold = h),
                                (e.bits = l),
                                wi
                            );
                        (f.adler = e.check = 1), (e.mode = 12);
                    case 12:
                        if (t === _i || t === ci) break t;
                    case 13:
                        if (e.last) {
                            (h >>>= 7 & l), (l -= 7 & l), (e.mode = 27);
                            break;
                        }
                        for (; l < 3; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        switch (((e.last = 1 & h), (h >>>= 1), --l, 3 & h)) {
                            case 0:
                                e.mode = 14;
                                break;
                            case 1:
                                var U = e;
                                if (Ti) {
                                    (Mi = new Int32Array(512)),
                                        (Bi = new Int32Array(32));
                                    let t = 0;
                                    for (; t < 144; ) U.lens[t++] = 8;
                                    for (; t < 256; ) U.lens[t++] = 9;
                                    for (; t < 280; ) U.lens[t++] = 7;
                                    for (; t < 288; ) U.lens[t++] = 8;
                                    for (
                                        li(di, U.lens, 0, 288, Mi, 0, U.work, {
                                            bits: 9,
                                        }),
                                            t = 0;
                                        t < 32;

                                    )
                                        U.lens[t++] = 5;
                                    li(fi, U.lens, 0, 32, Bi, 0, U.work, {
                                        bits: 5,
                                    }),
                                        (Ti = !1);
                                }
                                if (
                                    ((U.lencode = Mi),
                                    (U.lenbits = 9),
                                    (U.distcode = Bi),
                                    (U.distbits = 5),
                                    (e.mode = 20),
                                    t !== ci)
                                )
                                    break;
                                (h >>>= 2), (l -= 2);
                                break t;
                            case 2:
                                e.mode = 17;
                                break;
                            case 3:
                                (f.msg = "invalid block type"), (e.mode = 30);
                        }
                        (h >>>= 2), (l -= 2);
                        break;
                    case 14:
                        for (h >>>= 7 & l, l -= 7 & l; l < 32; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        if ((65535 & h) != ((h >>> 16) ^ 65535)) {
                            (f.msg = "invalid stored block lengths"),
                                (e.mode = 30);
                            break;
                        }
                        if (
                            ((e.length = 65535 & h),
                            (h = 0),
                            (l = 0),
                            (e.mode = 15),
                            t === ci)
                        )
                            break t;
                    case 15:
                        e.mode = 16;
                    case 16:
                        if ((_ = e.length)) {
                            if (0 === (_ = (_ = _ > s ? s : _) > o ? o : _))
                                break t;
                            r.set(i.subarray(a, a + _), n),
                                (s -= _),
                                (a += _),
                                (o -= _),
                                (n += _),
                                (e.length -= _);
                            break;
                        }
                        e.mode = 12;
                        break;
                    case 17:
                        for (; l < 14; ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        if (
                            ((e.nlen = 257 + (31 & h)),
                            (h >>>= 5),
                            (l -= 5),
                            (e.ndist = 1 + (31 & h)),
                            (h >>>= 5),
                            (l -= 5),
                            (e.ncode = 4 + (15 & h)),
                            (h >>>= 4),
                            (l -= 4),
                            286 < e.nlen || 30 < e.ndist)
                        ) {
                            (f.msg = "too many length or distance symbols"),
                                (e.mode = 30);
                            break;
                        }
                        (e.have = 0), (e.mode = 18);
                    case 18:
                        for (; e.have < e.ncode; ) {
                            for (; l < 3; ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            (e.lens[j[e.have++]] = 7 & h), (h >>>= 3), (l -= 3);
                        }
                        for (; e.have < 19; ) e.lens[j[e.have++]] = 0;
                        if (
                            ((e.lencode = e.lendyn),
                            (e.lenbits = 7),
                            (z = { bits: e.lenbits }),
                            (k = li(0, e.lens, 0, 19, e.lencode, 0, e.work, z)),
                            (e.lenbits = z.bits),
                            k)
                        ) {
                            (f.msg = "invalid code lengths set"), (e.mode = 30);
                            break;
                        }
                        (e.have = 0), (e.mode = 19);
                    case 19:
                        for (; e.have < e.nlen + e.ndist; ) {
                            for (
                                ;
                                (c = e.lencode[h & ((1 << e.lenbits) - 1)]),
                                    (p = c >>> 24),
                                    (w = (c >>> 16) & 255),
                                    (g = 65535 & c),
                                    !(p <= l);

                            ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            if (g < 16)
                                (h >>>= p), (l -= p), (e.lens[e.have++] = g);
                            else {
                                if (16 === g) {
                                    for (A = p + 2; l < A; ) {
                                        if (0 === s) break t;
                                        s--, (h += i[a++] << l), (l += 8);
                                    }
                                    if (((h >>>= p), (l -= p), 0 === e.have)) {
                                        (f.msg = "invalid bit length repeat"),
                                            (e.mode = 30);
                                        break;
                                    }
                                    (y = e.lens[e.have - 1]),
                                        (_ = 3 + (3 & h)),
                                        (h >>>= 2),
                                        (l -= 2);
                                } else if (17 === g) {
                                    for (A = p + 3; l < A; ) {
                                        if (0 === s) break t;
                                        s--, (h += i[a++] << l), (l += 8);
                                    }
                                    (h >>>= p),
                                        (l -= p),
                                        (y = 0),
                                        (_ = 3 + (7 & h)),
                                        (h >>>= 3),
                                        (l -= 3);
                                } else {
                                    for (A = p + 7; l < A; ) {
                                        if (0 === s) break t;
                                        s--, (h += i[a++] << l), (l += 8);
                                    }
                                    (h >>>= p),
                                        (l -= p),
                                        (y = 0),
                                        (_ = 11 + (127 & h)),
                                        (h >>>= 7),
                                        (l -= 7);
                                }
                                if (e.have + _ > e.nlen + e.ndist) {
                                    (f.msg = "invalid bit length repeat"),
                                        (e.mode = 30);
                                    break;
                                }
                                for (; _--; ) e.lens[e.have++] = y;
                            }
                        }
                        if (30 === e.mode) break;
                        if (0 === e.lens[256]) {
                            (f.msg = "invalid code -- missing end-of-block"),
                                (e.mode = 30);
                            break;
                        }
                        if (
                            ((e.lenbits = 9),
                            (z = { bits: e.lenbits }),
                            (k = li(
                                di,
                                e.lens,
                                0,
                                e.nlen,
                                e.lencode,
                                0,
                                e.work,
                                z
                            )),
                            (e.lenbits = z.bits),
                            k)
                        ) {
                            (f.msg = "invalid literal/lengths set"),
                                (e.mode = 30);
                            break;
                        }
                        if (
                            ((e.distbits = 6),
                            (e.distcode = e.distdyn),
                            (z = { bits: e.distbits }),
                            (k = li(
                                fi,
                                e.lens,
                                e.nlen,
                                e.ndist,
                                e.distcode,
                                0,
                                e.work,
                                z
                            )),
                            (e.distbits = z.bits),
                            k)
                        ) {
                            (f.msg = "invalid distances set"), (e.mode = 30);
                            break;
                        }
                        if (((e.mode = 20), t === ci)) break t;
                    case 20:
                        e.mode = 21;
                    case 21:
                        if (6 <= s && 258 <= o) {
                            (f.next_out = n),
                                (f.avail_out = o),
                                (f.next_in = a),
                                (f.avail_in = s),
                                (e.hold = h),
                                (e.bits = l);
                            {
                                E = void 0;
                                O = void 0;
                                S = void 0;
                                I = void 0;
                                F = void 0;
                                L = void 0;
                                R = void 0;
                                T = void 0;
                                M = void 0;
                                P = void 0;
                                C = void 0;
                                H = void 0;
                                B = void 0;
                                var Z = f;
                                var K = u;
                                let t;
                                let e, i, r, a, n, s, o, h, l, d;
                                const D = Z.state;
                                (t = Z.next_in),
                                    (l = Z.input),
                                    (E = t + (Z.avail_in - 5)),
                                    (e = Z.next_out),
                                    (d = Z.output),
                                    (O = e - (K - Z.avail_out)),
                                    (S = e + (Z.avail_out - 257)),
                                    (I = D.dmax),
                                    (F = D.wsize),
                                    (L = D.whave),
                                    (R = D.wnext),
                                    (T = D.window),
                                    (i = D.hold),
                                    (r = D.bits),
                                    (M = D.lencode),
                                    (P = D.distcode),
                                    (C = (1 << D.lenbits) - 1),
                                    (H = (1 << D.distbits) - 1);
                                e: do {
                                    for (
                                        r < 15 &&
                                            ((i += l[t++] << r),
                                            (r += 8),
                                            (i += l[t++] << r),
                                            (r += 8)),
                                            a = M[i & C];
                                        ;

                                    ) {
                                        if (
                                            ((n = a >>> 24),
                                            (i >>>= n),
                                            (r -= n),
                                            0 === (n = (a >>> 16) & 255))
                                        )
                                            d[e++] = 65535 & a;
                                        else {
                                            if (!(16 & n)) {
                                                if (0 == (64 & n)) {
                                                    a =
                                                        M[
                                                            (65535 & a) +
                                                                (i &
                                                                    ((1 << n) -
                                                                        1))
                                                        ];
                                                    continue;
                                                }
                                                if (32 & n) {
                                                    D.mode = ai;
                                                    break e;
                                                }
                                                (Z.msg =
                                                    "invalid literal/length code"),
                                                    (D.mode = ri);
                                                break e;
                                            }
                                            for (
                                                s = 65535 & a,
                                                    (n &= 15) &&
                                                        (r < n &&
                                                            ((i += l[t++] << r),
                                                            (r += 8)),
                                                        (s +=
                                                            i & ((1 << n) - 1)),
                                                        (i >>>= n),
                                                        (r -= n)),
                                                    r < 15 &&
                                                        ((i += l[t++] << r),
                                                        (r += 8),
                                                        (i += l[t++] << r),
                                                        (r += 8)),
                                                    a = P[i & H];
                                                ;

                                            ) {
                                                if (
                                                    ((n = a >>> 24),
                                                    (i >>>= n),
                                                    (r -= n),
                                                    !(
                                                        16 &
                                                        (n = (a >>> 16) & 255)
                                                    ))
                                                ) {
                                                    if (0 == (64 & n)) {
                                                        a =
                                                            P[
                                                                (65535 & a) +
                                                                    (i &
                                                                        ((1 <<
                                                                            n) -
                                                                            1))
                                                            ];
                                                        continue;
                                                    }
                                                    (Z.msg =
                                                        "invalid distance code"),
                                                        (D.mode = ri);
                                                    break e;
                                                }
                                                if (
                                                    ((B = 65535 & a),
                                                    (n &= 15),
                                                    r < n &&
                                                        ((i += l[t++] << r),
                                                        (r += 8) < n &&
                                                            ((i += l[t++] << r),
                                                            (r += 8))),
                                                    I <
                                                        (B +=
                                                            i & ((1 << n) - 1)))
                                                ) {
                                                    (Z.msg =
                                                        "invalid distance too far back"),
                                                        (D.mode = ri);
                                                    break e;
                                                }
                                                if (
                                                    ((i >>>= n),
                                                    (r -= n),
                                                    B > (n = e - O))
                                                ) {
                                                    if (
                                                        (n = B - n) > L &&
                                                        D.sane
                                                    ) {
                                                        (Z.msg =
                                                            "invalid distance too far back"),
                                                            (D.mode = ri);
                                                        break e;
                                                    }
                                                    if (
                                                        ((o = 0),
                                                        (h = T),
                                                        0 === R)
                                                    ) {
                                                        if (
                                                            ((o += F - n),
                                                            n < s)
                                                        ) {
                                                            for (
                                                                s -= n;
                                                                (d[e++] =
                                                                    T[o++]),
                                                                    --n;

                                                            );
                                                            (o = e - B),
                                                                (h = d);
                                                        }
                                                    } else if (R < n) {
                                                        if (
                                                            ((o += F + R - n),
                                                            (n -= R) < s)
                                                        ) {
                                                            for (
                                                                s -= n;
                                                                (d[e++] =
                                                                    T[o++]),
                                                                    --n;

                                                            );
                                                            if (
                                                                ((o = 0), R < s)
                                                            ) {
                                                                for (
                                                                    n = R,
                                                                        s -= n;
                                                                    (d[e++] =
                                                                        T[o++]),
                                                                        --n;

                                                                );
                                                                (o = e - B),
                                                                    (h = d);
                                                            }
                                                        }
                                                    } else if (
                                                        ((o += R - n), n < s)
                                                    ) {
                                                        for (
                                                            s -= n;
                                                            (d[e++] = T[o++]),
                                                                --n;

                                                        );
                                                        (o = e - B), (h = d);
                                                    }
                                                    for (; 2 < s; )
                                                        (d[e++] = h[o++]),
                                                            (d[e++] = h[o++]),
                                                            (d[e++] = h[o++]),
                                                            (s -= 3);
                                                    s &&
                                                        ((d[e++] = h[o++]),
                                                        1 < s &&
                                                            (d[e++] = h[o++]));
                                                } else {
                                                    for (
                                                        o = e - B;
                                                        (d[e++] = d[o++]),
                                                            (d[e++] = d[o++]),
                                                            (d[e++] = d[o++]),
                                                            2 < (s -= 3);

                                                    );
                                                    s &&
                                                        ((d[e++] = d[o++]),
                                                        1 < s &&
                                                            (d[e++] = d[o++]));
                                                }
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                } while (t < E && e < S);
                                (s = r >> 3),
                                    (t -= s),
                                    (r -= s << 3),
                                    (i &= (1 << r) - 1),
                                    (Z.next_in = t),
                                    (Z.next_out = e),
                                    (Z.avail_in =
                                        t < E ? E - t + 5 : 5 - (t - E)),
                                    (Z.avail_out =
                                        e < S ? S - e + 257 : 257 - (e - S)),
                                    (D.hold = i),
                                    (D.bits = r);
                            }
                            (n = f.next_out),
                                (r = f.output),
                                (o = f.avail_out),
                                (a = f.next_in),
                                (i = f.input),
                                (s = f.avail_in),
                                (h = e.hold),
                                (l = e.bits),
                                12 === e.mode && (e.back = -1);
                            break;
                        }
                        for (
                            e.back = 0;
                            (c = e.lencode[h & ((1 << e.lenbits) - 1)]),
                                (p = c >>> 24),
                                (w = (c >>> 16) & 255),
                                (g = 65535 & c),
                                !(p <= l);

                        ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        if (w && 0 == (240 & w)) {
                            for (
                                b = p, v = w, m = g;
                                (c =
                                    e.lencode[
                                        m + ((h & ((1 << (b + v)) - 1)) >> b)
                                    ]),
                                    (p = c >>> 24),
                                    (w = (c >>> 16) & 255),
                                    (g = 65535 & c),
                                    !(b + p <= l);

                            ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            (h >>>= b), (l -= b), (e.back += b);
                        }
                        if (
                            ((h >>>= p),
                            (l -= p),
                            (e.back += p),
                            (e.length = g),
                            0 === w)
                        ) {
                            e.mode = 26;
                            break;
                        }
                        if (32 & w) {
                            (e.back = -1), (e.mode = 12);
                            break;
                        }
                        if (64 & w) {
                            (f.msg = "invalid literal/length code"),
                                (e.mode = 30);
                            break;
                        }
                        (e.extra = 15 & w), (e.mode = 22);
                    case 22:
                        if (e.extra) {
                            for (A = e.extra; l < A; ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            (e.length += h & ((1 << e.extra) - 1)),
                                (h >>>= e.extra),
                                (l -= e.extra),
                                (e.back += e.extra);
                        }
                        (e.was = e.length), (e.mode = 23);
                    case 23:
                        for (
                            ;
                            (c = e.distcode[h & ((1 << e.distbits) - 1)]),
                                (p = c >>> 24),
                                (w = (c >>> 16) & 255),
                                (g = 65535 & c),
                                !(p <= l);

                        ) {
                            if (0 === s) break t;
                            s--, (h += i[a++] << l), (l += 8);
                        }
                        if (0 == (240 & w)) {
                            for (
                                b = p, v = w, m = g;
                                (c =
                                    e.distcode[
                                        m + ((h & ((1 << (b + v)) - 1)) >> b)
                                    ]),
                                    (p = c >>> 24),
                                    (w = (c >>> 16) & 255),
                                    (g = 65535 & c),
                                    !(b + p <= l);

                            ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            (h >>>= b), (l -= b), (e.back += b);
                        }
                        if (((h >>>= p), (l -= p), (e.back += p), 64 & w)) {
                            (f.msg = "invalid distance code"), (e.mode = 30);
                            break;
                        }
                        (e.offset = g), (e.extra = 15 & w), (e.mode = 24);
                    case 24:
                        if (e.extra) {
                            for (A = e.extra; l < A; ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            (e.offset += h & ((1 << e.extra) - 1)),
                                (h >>>= e.extra),
                                (l -= e.extra),
                                (e.back += e.extra);
                        }
                        if (e.offset > e.dmax) {
                            (f.msg = "invalid distance too far back"),
                                (e.mode = 30);
                            break;
                        }
                        e.mode = 25;
                    case 25:
                        if (0 === o) break t;
                        if (((_ = u - o), e.offset > _)) {
                            if ((_ = e.offset - _) > e.whave && e.sane) {
                                (f.msg = "invalid distance too far back"),
                                    (e.mode = 30);
                                break;
                            }
                            (V =
                                _ > e.wnext
                                    ? ((_ -= e.wnext), e.wsize - _)
                                    : e.wnext - _),
                                _ > e.length && (_ = e.length),
                                (N = e.window);
                        } else (N = r), (V = n - e.offset), (_ = e.length);
                        for (
                            _ > o && (_ = o), o -= _, e.length -= _;
                            (r[n++] = N[V++]), --_;

                        );
                        0 === e.length && (e.mode = 21);
                        break;
                    case 26:
                        if (0 === o) break t;
                        (r[n++] = e.length), o--, (e.mode = 21);
                        break;
                    case 27:
                        if (e.wrap) {
                            for (; l < 32; ) {
                                if (0 === s) break t;
                                s--, (h |= i[a++] << l), (l += 8);
                            }
                            if (
                                ((u -= o),
                                (f.total_out += u),
                                (e.total += u),
                                u &&
                                    (f.adler = e.check =
                                        (e.flags ? G : Jt)(
                                            e.check,
                                            r,
                                            u,
                                            n - u
                                        )),
                                (u = o),
                                (e.flags ? h : zi(h)) !== e.check)
                            ) {
                                (f.msg = "incorrect data check"), (e.mode = 30);
                                break;
                            }
                            (h = 0), (l = 0);
                        }
                        e.mode = 28;
                    case 28:
                        if (e.wrap && e.flags) {
                            for (; l < 32; ) {
                                if (0 === s) break t;
                                s--, (h += i[a++] << l), (l += 8);
                            }
                            if (h !== (4294967295 & e.total)) {
                                (f.msg = "incorrect length check"),
                                    (e.mode = 30);
                                break;
                            }
                            (h = 0), (l = 0);
                        }
                        e.mode = 29;
                    case 29:
                        k = pi;
                        break t;
                    case 30:
                        k = gi;
                        break t;
                    case 31:
                        return bi;
                    default:
                        return W;
                }
            return (
                (f.next_out = n),
                (f.avail_out = o),
                (f.next_in = a),
                (f.avail_in = s),
                (e.hold = h),
                (e.bits = l),
                (e.wsize ||
                    (u !== f.avail_out &&
                        e.mode < 30 &&
                        (e.mode < 27 || t !== ui))) &&
                    Ui(f, f.output, f.next_out, u - f.avail_out),
                (d -= f.avail_in),
                (u -= f.avail_out),
                (f.total_in += d),
                (f.total_out += u),
                (e.total += u),
                e.wrap &&
                    u &&
                    (f.adler = e.check =
                        (e.flags ? G : Jt)(e.check, r, u, f.next_out - u)),
                (f.data_type =
                    e.bits +
                    (e.last ? 64 : 0) +
                    (12 === e.mode ? 128 : 0) +
                    (20 === e.mode || 15 === e.mode ? 256 : 0)),
                (k = ((0 == d && 0 === u) || t === ui) && k === Y ? vi : k)
            );
        },
        inflateEnd: (t) => {
            if (!t || !t.state) return W;
            let e = t.state;
            return e.window && (e.window = null), (t.state = null), Y;
        },
        inflateGetHeader: (t, e) => {
            if (!t || !t.state) return W;
            const i = t.state;
            return 0 == (2 & i.wrap) ? W : (((i.head = e).done = !1), Y);
        },
        inflateSetDictionary: (t, e) => {
            var i = e.length;
            let r;
            return !t || !t.state || (0 !== (r = t.state).wrap && 11 !== r.mode)
                ? W
                : 11 === r.mode && Jt(1, e, i, 0) !== r.check
                ? gi
                : Ui(t, e, i, i)
                ? ((r.mode = 31), bi)
                : ((r.havedict = 1), Y);
        },
        inflateInfo: "pako inflate (from Nodeca project)",
    };
    var Zi = function () {
        (this.text = 0),
            (this.time = 0),
            (this.xflags = 0),
            (this.os = 0),
            (this.extra = null),
            (this.extra_len = 0),
            (this.name = ""),
            (this.comment = ""),
            (this.hcrc = 0),
            (this.done = !1);
    };
    const Di = Object.prototype.toString,
        {
            Z_NO_FLUSH: Vi,
            Z_FINISH: Ni,
            Z_OK: Oi,
            Z_STREAM_END: Ii,
            Z_NEED_DICT: Li,
            Z_STREAM_ERROR: Pi,
            Z_DATA_ERROR: Ci,
            Z_MEM_ERROR: Hi,
        } = $t;
    function ji(t) {
        this.options = Ne(
            { chunkSize: 65536, windowBits: 15, to: "" },
            t || {}
        );
        const e = this.options;
        e.raw &&
            0 <= e.windowBits &&
            e.windowBits < 16 &&
            ((e.windowBits = -e.windowBits),
            0 === e.windowBits && (e.windowBits = -15)),
            !(0 <= e.windowBits && e.windowBits < 16) ||
                (t && t.windowBits) ||
                (e.windowBits += 32),
            15 < e.windowBits &&
                e.windowBits < 48 &&
                0 == (15 & e.windowBits) &&
                (e.windowBits |= 15),
            (this.err = 0),
            (this.msg = ""),
            (this.ended = !1),
            (this.chunks = []),
            (this.strm = new je()),
            (this.strm.avail_out = 0);
        let i = M.inflateInit2(this.strm, e.windowBits);
        if (i !== Oi) throw new Error(n[i]);
        if (
            ((this.header = new Zi()),
            M.inflateGetHeader(this.strm, this.header),
            e.dictionary &&
                ("string" == typeof e.dictionary
                    ? (e.dictionary = Pe(e.dictionary))
                    : "[object ArrayBuffer]" === Di.call(e.dictionary) &&
                      (e.dictionary = new Uint8Array(e.dictionary)),
                e.raw &&
                    (i = M.inflateSetDictionary(this.strm, e.dictionary)) !==
                        Oi))
        )
            throw new Error(n[i]);
    }
    function Ki(t, e) {
        const i = new ji(e);
        if ((i.push(t), i.err)) throw i.msg || n[i.err];
        return i.result;
    }
    (ji.prototype.push = function (t, e) {
        const i = this.strm;
        var r,
            a,
            n,
            s = this.options.chunkSize,
            o = this.options.dictionary;
        let h, l, d;
        if (this.ended) return !1;
        for (
            l = e === ~~e ? e : !0 === e ? Ni : Vi,
                "[object ArrayBuffer]" === Di.call(t)
                    ? (i.input = new Uint8Array(t))
                    : (i.input = t),
                i.next_in = 0,
                i.avail_in = i.input.length;
            ;

        ) {
            for (
                0 === i.avail_out &&
                    ((i.output = new Uint8Array(s)),
                    (i.next_out = 0),
                    (i.avail_out = s)),
                    (h = M.inflate(i, l)) === Li &&
                        o &&
                        ((h = M.inflateSetDictionary(i, o)) === Oi
                            ? (h = M.inflate(i, l))
                            : h === Ci && (h = Li));
                0 < i.avail_in &&
                h === Ii &&
                0 < i.state.wrap &&
                0 !== t[i.next_in];

            )
                M.inflateReset(i), (h = M.inflate(i, l));
            switch (h) {
                case Pi:
                case Ci:
                case Li:
                case Hi:
                    return this.onEnd(h), !(this.ended = !0);
            }
            if (
                ((d = i.avail_out),
                !i.next_out ||
                    (0 !== i.avail_out && h !== Ii) ||
                    ("string" === this.options.to
                        ? ((r = He(i.output, i.next_out)),
                          (a = i.next_out - r),
                          (n = Ce(i.output, r)),
                          (i.next_out = a),
                          (i.avail_out = s - a),
                          a && i.output.set(i.output.subarray(r, r + a), 0),
                          this.onData(n))
                        : this.onData(
                              i.output.length === i.next_out
                                  ? i.output
                                  : i.output.subarray(0, i.next_out)
                          )),
                h !== Oi || 0 !== d)
            ) {
                if (h === Ii)
                    return (
                        (h = M.inflateEnd(this.strm)),
                        this.onEnd(h),
                        (this.ended = !0)
                    );
                if (0 === i.avail_in) break;
            }
        }
        return !0;
    }),
        (ji.prototype.onData = function (t) {
            this.chunks.push(t);
        }),
        (ji.prototype.onEnd = function (t) {
            t === Oi &&
                ("string" === this.options.to
                    ? (this.result = this.chunks.join(""))
                    : (this.result = Oe(this.chunks))),
                (this.chunks = []),
                (this.err = t),
                (this.msg = this.strm.msg);
        });
    var { Deflate: i, deflate: t, deflateRaw: Gi, gzip: Yi } = t,
        {
            Inflate: Wi,
            inflate: qi,
            inflateRaw: Xi,
            ungzip: Ji,
        } = {
            Inflate: ji,
            inflate: Ki,
            inflateRaw: function (t, e) {
                return ((e = e || {}).raw = !0), Ki(t, e);
            },
            ungzip: Ki,
        },
        Qi = {
            Deflate: i,
            deflate: t,
            deflateRaw: Gi,
            gzip: Yi,
            Inflate: Wi,
            inflate: qi,
            inflateRaw: Xi,
            ungzip: Ji,
            constants: $t,
        },
        $i = Uint32Array.BYTES_PER_ELEMENT,
        B = { METADATA: 0, TERRAIN: 1, VECTORTILE: 2 };
    B.fromString = function (t) {
        return "Metadata" === t
            ? B.METADATA
            : "Terrain" === t
            ? B.TERRAIN
            : "VectorTile" === t
            ? B.VECTORTILE
            : void 0;
    };
    var tr = 5,
        er = 4;
    function ir(t) {
        for (var e, i, r = 0, a = 0, n = t.length, s = n - 1; a < n; s = a++)
            (e = t[a]), (r += ((i = t[s]).x - e.x) * (e.y + i.y));
        return r;
    }
    var rr = 1953029805,
        ar = 2917034100;
    return U.createTaskProcessorWorker(function (t, e) {
        var i = B.fromString(t.type),
            r = (t = (function (t) {
                var e = new DataView(t),
                    i = 0,
                    r = e.getUint32(0, !0);
                if (((i += $i), r !== rr && r !== ar))
                    throw new Error("Invalid magic");
                (e = e.getUint32(i, r === rr)),
                    (i += $i),
                    (r = new Uint8Array(t, i)),
                    (t = Qi.inflate(r));
                if (t.length === e) return t;
                throw new Error("Size of packet doesn't match header");
            })(t.buffer)).buffer,
            a = t.length;
        switch (i) {
            case B.METADATA:
                return;
            case B.TERRAIN:
                for (
                    var n = r, s = a, o = e, h = new DataView(n), l = 0, d = [];
                    d.length < tr;

                ) {
                    var f = l,
                        f =
                            ((l = (function (t) {
                                for (var e = 0; e < er; ++e) {
                                    var i = h.getUint32(t, !0);
                                    if (s < (t = t + $i + i))
                                        throw new Error(
                                            "Malformed terrain packet found."
                                        );
                                }
                                return t;
                            })(l)),
                            n.slice(f, l));
                    o.push(f), d.push(f);
                }
                return d;
            case B.VECTORTILE:
                var u,
                    _ = new P(new j(r));
                for (u in _.layers)
                    if (Object.prototype.hasOwnProperty.call(_.layers, u)) {
                        var c = _.layers[u];
                        c.features = [];
                        for (var p = 0; p < c.length; p++) {
                            var w = c.feature(p);
                            (w.geometry = (function (t) {
                                var e = t.loadGeometry();
                                switch (t.type) {
                                    case 1:
                                        for (
                                            var i = [], r = 0;
                                            r < e.length;
                                            r++
                                        )
                                            i[r] = e[r][0];
                                        e = i;
                                        break;
                                    case 3:
                                        e = (function (t) {
                                            var e = t.length;
                                            if (e <= 1)
                                                return 0 === ir(t[0])
                                                    ? []
                                                    : [t];
                                            for (
                                                var i, r, a = [], n = 0;
                                                n < e;
                                                n++
                                            ) {
                                                var s = ir(t[n]);
                                                0 !== s &&
                                                    ((r =
                                                        void 0 === r
                                                            ? s < 0
                                                            : r) ===
                                                    s < 0
                                                        ? (i && a.push(i),
                                                          (i = [t[n]]))
                                                        : i.push(t[n]));
                                            }
                                            i && a.push(i);
                                            return a;
                                        })(e);
                                }
                                1 === e.length && (e = e[0]);
                                return e;
                            })(w)),
                                (w.bbox = w.bbox()),
                                c.features.push(w);
                        }
                    }
                return _;
        }
    });
});
