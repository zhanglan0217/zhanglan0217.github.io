define(["./createTaskProcessorWorker-46481b6c.js"], function (ge) {
    "use strict";
    function o(e) {
        (this.name = "DeveloperError"), (this.message = e);
        let t;
        try {
            throw new Error();
        } catch (e) {
            t = e.stack;
        }
        this.stack = t;
    }
    ge.defined(Object.create) &&
        ((o.prototype = Object.create(Error.prototype)).constructor = o),
        (o.prototype.toString = function () {
            let e = this.name + ": " + this.message;
            return (
                ge.defined(this.stack) &&
                    (e +=
                        `
` + this.stack.toString()),
                e
            );
        }),
        (o.throwInstantiationError = function () {
            throw new o(
                "This function defines an interface and should not be called directly."
            );
        });
    const i = {};
    function r(e, t, n) {
        return `Expected ${n} to be typeof ${t}, actual typeof was ` + e;
    }
    (i.typeOf = {}),
        (i.defined = function (e, t) {
            if (!ge.defined(t))
                throw new o(e + " is required, actual value was undefined");
        }),
        (i.typeOf.func = function (e, t) {
            if ("function" != typeof t) throw new o(r(typeof t, "function", e));
        }),
        (i.typeOf.string = function (e, t) {
            if ("string" != typeof t) throw new o(r(typeof t, "string", e));
        }),
        (i.typeOf.number = function (e, t) {
            if ("number" != typeof t) throw new o(r(typeof t, "number", e));
        }),
        (i.typeOf.number.lessThan = function (e, t, n) {
            if ((i.typeOf.number(e, t), n <= t))
                throw new o(
                    `Expected ${e} to be less than ${n}, actual value was ` + t
                );
        }),
        (i.typeOf.number.lessThanOrEquals = function (e, t, n) {
            if ((i.typeOf.number(e, t), n < t))
                throw new o(
                    `Expected ${e} to be less than or equal to ${n}, actual value was ` +
                        t
                );
        }),
        (i.typeOf.number.greaterThan = function (e, t, n) {
            if ((i.typeOf.number(e, t), t <= n))
                throw new o(
                    `Expected ${e} to be greater than ${n}, actual value was ` +
                        t
                );
        }),
        (i.typeOf.number.greaterThanOrEquals = function (e, t, n) {
            if ((i.typeOf.number(e, t), t < n))
                throw new o(
                    `Expected ${e} to be greater than or equal to ${n}, actual value was ` +
                        t
                );
        }),
        (i.typeOf.object = function (e, t) {
            if ("object" != typeof t) throw new o(r(typeof t, "object", e));
        }),
        (i.typeOf.bool = function (e, t) {
            if ("boolean" != typeof t) throw new o(r(typeof t, "boolean", e));
        }),
        (i.typeOf.bigint = function (e, t) {
            if ("bigint" != typeof t) throw new o(r(typeof t, "bigint", e));
        }),
        (i.typeOf.number.equals = function (e, t, n, r) {
            if ((i.typeOf.number(e, n), i.typeOf.number(t, r), n !== r))
                throw new o(
                    e +
                        ` must be equal to ${t}, the actual values are ${n} and ` +
                        r
                );
        });
    function R(e) {
        null == e && (e = new Date().getTime()),
            (this.N = 624),
            (this.M = 397),
            (this.MATRIX_A = 2567483615),
            (this.UPPER_MASK = 2147483648),
            (this.LOWER_MASK = 2147483647),
            (this.mt = new Array(this.N)),
            (this.mti = this.N + 1),
            e.constructor == Array
                ? this.init_by_array(e, e.length)
                : this.init_seed(e);
    }
    (R.prototype.init_seed = function (e) {
        for (
            this.mt[0] = e >>> 0, this.mti = 1;
            this.mti < this.N;
            this.mti++
        ) {
            e = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            (this.mt[this.mti] =
                ((1812433253 * ((4294901760 & e) >>> 16)) << 16) +
                1812433253 * (65535 & e) +
                this.mti),
                (this.mt[this.mti] >>>= 0);
        }
    }),
        (R.prototype.init_by_array = function (e, t) {
            var n, r, o;
            for (
                this.init_seed(19650218),
                    n = 1,
                    r = 0,
                    o = this.N > t ? this.N : t;
                o;
                o--
            ) {
                var i = this.mt[n - 1] ^ (this.mt[n - 1] >>> 30);
                (this.mt[n] =
                    (this.mt[n] ^
                        (((1664525 * ((4294901760 & i) >>> 16)) << 16) +
                            1664525 * (65535 & i))) +
                    e[r] +
                    r),
                    (this.mt[n] >>>= 0),
                    r++,
                    ++n >= this.N &&
                        ((this.mt[0] = this.mt[this.N - 1]), (n = 1)),
                    t <= r && (r = 0);
            }
            for (o = this.N - 1; o; o--) {
                i = this.mt[n - 1] ^ (this.mt[n - 1] >>> 30);
                (this.mt[n] =
                    (this.mt[n] ^
                        (((1566083941 * ((4294901760 & i) >>> 16)) << 16) +
                            1566083941 * (65535 & i))) -
                    n),
                    (this.mt[n] >>>= 0),
                    ++n >= this.N &&
                        ((this.mt[0] = this.mt[this.N - 1]), (n = 1));
            }
            this.mt[0] = 2147483648;
        }),
        (R.prototype.random_int = function () {
            var e,
                t,
                n = new Array(0, this.MATRIX_A);
            if (this.mti >= this.N) {
                for (
                    this.mti == this.N + 1 && this.init_seed(5489), t = 0;
                    t < this.N - this.M;
                    t++
                )
                    (e =
                        (this.mt[t] & this.UPPER_MASK) |
                        (this.mt[t + 1] & this.LOWER_MASK)),
                        (this.mt[t] =
                            this.mt[t + this.M] ^ (e >>> 1) ^ n[1 & e]);
                for (; t < this.N - 1; t++)
                    (e =
                        (this.mt[t] & this.UPPER_MASK) |
                        (this.mt[t + 1] & this.LOWER_MASK)),
                        (this.mt[t] =
                            this.mt[t + (this.M - this.N)] ^
                            (e >>> 1) ^
                            n[1 & e]);
                (e =
                    (this.mt[this.N - 1] & this.UPPER_MASK) |
                    (this.mt[0] & this.LOWER_MASK)),
                    (this.mt[this.N - 1] =
                        this.mt[this.M - 1] ^ (e >>> 1) ^ n[1 & e]),
                    (this.mti = 0);
            }
            return (
                (e = this.mt[this.mti++]),
                (e =
                    (e =
                        (e = (e ^= e >>> 11) ^ ((e << 7) & 2636928640)) ^
                        ((e << 15) & 4022730752)) ^
                    (e >>> 18)) >>> 0
            );
        }),
        (R.prototype.random_int31 = function () {
            return this.random_int() >>> 1;
        }),
        (R.prototype.random_incl = function () {
            return this.random_int() * (1 / 4294967295);
        }),
        (R.prototype.random = function () {
            return this.random_int() * (1 / 4294967296);
        }),
        (R.prototype.random_excl = function () {
            return (this.random_int() + 0.5) * (1 / 4294967296);
        }),
        (R.prototype.random_long = function () {
            return (
                (1 / 9007199254740992) *
                (67108864 * (this.random_int() >>> 5) +
                    (this.random_int() >>> 6))
            );
        });
    var A = R;
    const Te = {
            EPSILON1: 0.1,
            EPSILON2: 0.01,
            EPSILON3: 0.001,
            EPSILON4: 1e-4,
            EPSILON5: 1e-5,
            EPSILON6: 1e-6,
            EPSILON7: 1e-7,
            EPSILON8: 1e-8,
            EPSILON9: 1e-9,
            EPSILON10: 1e-10,
            EPSILON11: 1e-11,
            EPSILON12: 1e-12,
            EPSILON13: 1e-13,
            EPSILON14: 1e-14,
            EPSILON15: 1e-15,
            EPSILON16: 1e-16,
            EPSILON17: 1e-17,
            EPSILON18: 1e-18,
            EPSILON19: 1e-19,
            EPSILON20: 1e-20,
            EPSILON21: 1e-21,
            GRAVITATIONALPARAMETER: 3986004418e5,
            SOLAR_RADIUS: 6955e5,
            LUNAR_RADIUS: 1737400,
            SIXTY_FOUR_KILOBYTES: 65536,
            FOUR_GIGABYTES: 4294967296,
        },
        v =
            ((Te.sign = ge.defaultValue(Math.sign, function (e) {
                return 0 === (e = +e) || e != e ? e : 0 < e ? 1 : -1;
            })),
            (Te.signNotZero = function (e) {
                return e < 0 ? -1 : 1;
            }),
            (Te.toSNorm = function (e, t) {
                return (
                    (t = ge.defaultValue(t, 255)),
                    Math.round((0.5 * Te.clamp(e, -1, 1) + 0.5) * t)
                );
            }),
            (Te.fromSNorm = function (e, t) {
                return (
                    (t = ge.defaultValue(t, 255)),
                    (Te.clamp(e, 0, t) / t) * 2 - 1
                );
            }),
            (Te.normalize = function (e, t, n) {
                return 0 === (n = Math.max(n - t, 0))
                    ? 0
                    : Te.clamp((e - t) / n, 0, 1);
            }),
            (Te.sinh = ge.defaultValue(Math.sinh, function (e) {
                return (Math.exp(e) - Math.exp(-e)) / 2;
            })),
            (Te.cosh = ge.defaultValue(Math.cosh, function (e) {
                return (Math.exp(e) + Math.exp(-e)) / 2;
            })),
            (Te.lerp = function (e, t, n) {
                return (1 - n) * e + n * t;
            }),
            (Te.PI = Math.PI),
            (Te.ONE_OVER_PI = 1 / Math.PI),
            (Te.PI_OVER_TWO = Math.PI / 2),
            (Te.PI_OVER_THREE = Math.PI / 3),
            (Te.PI_OVER_FOUR = Math.PI / 4),
            (Te.PI_OVER_SIX = Math.PI / 6),
            (Te.THREE_PI_OVER_TWO = (3 * Math.PI) / 2),
            (Te.TWO_PI = 2 * Math.PI),
            (Te.ONE_OVER_TWO_PI = 1 / (2 * Math.PI)),
            (Te.RADIANS_PER_DEGREE = Math.PI / 180),
            (Te.DEGREES_PER_RADIAN = 180 / Math.PI),
            (Te.RADIANS_PER_ARCSECOND = Te.RADIANS_PER_DEGREE / 3600),
            (Te.toRadians = function (e) {
                return e * Te.RADIANS_PER_DEGREE;
            }),
            (Te.toDegrees = function (e) {
                return e * Te.DEGREES_PER_RADIAN;
            }),
            (Te.convertLongitudeRange = function (e) {
                var t = Te.TWO_PI,
                    e = e - Math.floor(e / t) * t;
                return e < -Math.PI ? e + t : e >= Math.PI ? e - t : e;
            }),
            (Te.clampToLatitudeRange = function (e) {
                return Te.clamp(e, -1 * Te.PI_OVER_TWO, Te.PI_OVER_TWO);
            }),
            (Te.negativePiToPi = function (e) {
                return e >= -Te.PI && e <= Te.PI
                    ? e
                    : Te.zeroToTwoPi(e + Te.PI) - Te.PI;
            }),
            (Te.zeroToTwoPi = function (e) {
                if (0 <= e && e <= Te.TWO_PI) return e;
                var t = Te.mod(e, Te.TWO_PI);
                return Math.abs(t) < Te.EPSILON14 && Math.abs(e) > Te.EPSILON14
                    ? Te.TWO_PI
                    : t;
            }),
            (Te.mod = function (e, t) {
                return Te.sign(e) === Te.sign(t) && Math.abs(e) < Math.abs(t)
                    ? e
                    : ((e % t) + t) % t;
            }),
            (Te.equalsEpsilon = function (e, t, n, r) {
                (n = ge.defaultValue(n, 0)), (r = ge.defaultValue(r, n));
                var o = Math.abs(e - t);
                return o <= r || o <= n * Math.max(Math.abs(e), Math.abs(t));
            }),
            (Te.lessThan = function (e, t, n) {
                return e - t < -n;
            }),
            (Te.lessThanOrEquals = function (e, t, n) {
                return e - t < n;
            }),
            (Te.greaterThan = function (e, t, n) {
                return n < e - t;
            }),
            (Te.greaterThanOrEquals = function (e, t, n) {
                return -n < e - t;
            }),
            [1]);
    (Te.factorial = function (n) {
        var r = v.length;
        if (r <= n) {
            let t = v[r - 1];
            for (let e = r; e <= n; e++) {
                var o = t * e;
                v.push(o), (t = o);
            }
        }
        return v[n];
    }),
        (Te.incrementWrap = function (e, t, n) {
            return (n = ge.defaultValue(n, 0)), (e = t < ++e ? n : e);
        }),
        (Te.isPowerOfTwo = function (e) {
            return 0 !== e && 0 == (e & (e - 1));
        }),
        (Te.nextPowerOfTwo = function (e) {
            return (
                --e,
                (e =
                    (e =
                        (e = (e = (e |= e >> 1) | (e >> 2)) | (e >> 4)) |
                        (e >> 8)) |
                    (e >> 16)),
                ++e
            );
        }),
        (Te.previousPowerOfTwo = function (e) {
            return (e =
                ((e =
                    (e =
                        (e =
                            (e = (e = (e |= e >> 1) | (e >> 2)) | (e >> 4)) |
                            (e >> 8)) |
                        (e >> 16)) |
                    (e >> 32)) >>>
                    0) -
                (e >>> 1));
        }),
        (Te.clamp = function (e, t, n) {
            return e < t ? t : n < e ? n : e;
        });
    let O = new A();
    function Re(e, t, n) {
        (this.x = ge.defaultValue(e, 0)),
            (this.y = ge.defaultValue(t, 0)),
            (this.z = ge.defaultValue(n, 0));
    }
    (Te.setRandomNumberSeed = function (e) {
        O = new A(e);
    }),
        (Te.nextRandomNumber = function () {
            return O.random();
        }),
        (Te.randomBetween = function (e, t) {
            return Te.nextRandomNumber() * (t - e) + e;
        }),
        (Te.acosClamped = function (e) {
            return Math.acos(Te.clamp(e, -1, 1));
        }),
        (Te.asinClamped = function (e) {
            return Math.asin(Te.clamp(e, -1, 1));
        }),
        (Te.chordLength = function (e, t) {
            return 2 * t * Math.sin(0.5 * e);
        }),
        (Te.logBase = function (e, t) {
            return Math.log(e) / Math.log(t);
        }),
        (Te.cbrt = ge.defaultValue(Math.cbrt, function (e) {
            var t = Math.pow(Math.abs(e), 1 / 3);
            return e < 0 ? -t : t;
        })),
        (Te.log2 = ge.defaultValue(Math.log2, function (e) {
            return Math.log(e) * Math.LOG2E;
        })),
        (Te.fog = function (e, t) {
            e *= t;
            return 1 - Math.exp(-e * e);
        }),
        (Te.fastApproximateAtan = function (e) {
            return e * (-0.1784 * Math.abs(e) - 0.0663 * e * e + 1.0301);
        }),
        (Te.fastApproximateAtan2 = function (e, t) {
            let n = Math.abs(e);
            var r = Math.abs(t),
                o = Math.max(n, r),
                r = Math.min(n, r) / o;
            return (
                (n = Te.fastApproximateAtan(r)),
                (n = Math.abs(t) > Math.abs(e) ? Te.PI_OVER_TWO - n : n),
                (n = e < 0 ? Te.PI - n : n),
                (n = t < 0 ? -n : n)
            );
        }),
        (Re.fromSpherical = function (e, t) {
            ge.defined(t) || (t = new Re());
            var n = e.clock,
                r = e.cone,
                e = ge.defaultValue(e.magnitude, 1),
                o = e * Math.sin(r);
            return (
                (t.x = o * Math.cos(n)),
                (t.y = o * Math.sin(n)),
                (t.z = e * Math.cos(r)),
                t
            );
        }),
        (Re.fromElements = function (e, t, n, r) {
            return ge.defined(r)
                ? ((r.x = e), (r.y = t), (r.z = n), r)
                : new Re(e, t, n);
        }),
        (Re.fromCartesian4 = Re.clone =
            function (e, t) {
                if (ge.defined(e))
                    return ge.defined(t)
                        ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), t)
                        : new Re(e.x, e.y, e.z);
            }),
        (Re.packedLength = 3),
        (Re.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e.x),
                (t[n++] = e.y),
                (t[n] = e.z),
                t
            );
        }),
        (Re.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new Re()).x = e[t++]),
                (n.y = e[t++]),
                (n.z = e[t]),
                n
            );
        }),
        (Re.packArray = function (t, n) {
            var r = t.length,
                e = 3 * r;
            ge.defined(n)
                ? (!Array.isArray(n) && n.length !== e) ||
                  n.length === e ||
                  (n.length = e)
                : (n = new Array(e));
            for (let e = 0; e < r; ++e) Re.pack(t[e], n, 3 * e);
            return n;
        }),
        (Re.unpackArray = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r / 3) : (n = new Array(r / 3));
            for (let e = 0; e < r; e += 3) {
                var o = e / 3;
                n[o] = Re.unpack(t, e, n[o]);
            }
            return n;
        }),
        (Re.fromArray = Re.unpack),
        (Re.maximumComponent = function (e) {
            return Math.max(e.x, e.y, e.z);
        }),
        (Re.minimumComponent = function (e) {
            return Math.min(e.x, e.y, e.z);
        }),
        (Re.minimumByComponent = function (e, t, n) {
            return (
                (n.x = Math.min(e.x, t.x)),
                (n.y = Math.min(e.y, t.y)),
                (n.z = Math.min(e.z, t.z)),
                n
            );
        }),
        (Re.maximumByComponent = function (e, t, n) {
            return (
                (n.x = Math.max(e.x, t.x)),
                (n.y = Math.max(e.y, t.y)),
                (n.z = Math.max(e.z, t.z)),
                n
            );
        }),
        (Re.clamp = function (e, t, n, r) {
            var o = Te.clamp(e.x, t.x, n.x),
                i = Te.clamp(e.y, t.y, n.y),
                e = Te.clamp(e.z, t.z, n.z);
            return (r.x = o), (r.y = i), (r.z = e), r;
        }),
        (Re.magnitudeSquared = function (e) {
            return e.x * e.x + e.y * e.y + e.z * e.z;
        }),
        (Re.magnitude = function (e) {
            return Math.sqrt(Re.magnitudeSquared(e));
        });
    const N = new Re(),
        x =
            ((Re.distance = function (e, t) {
                return Re.subtract(e, t, N), Re.magnitude(N);
            }),
            (Re.distanceSquared = function (e, t) {
                return Re.subtract(e, t, N), Re.magnitudeSquared(N);
            }),
            (Re.normalize = function (e, t) {
                var n = Re.magnitude(e);
                return (t.x = e.x / n), (t.y = e.y / n), (t.z = e.z / n), t;
            }),
            (Re.dot = function (e, t) {
                return e.x * t.x + e.y * t.y + e.z * t.z;
            }),
            (Re.multiplyComponents = function (e, t, n) {
                return (
                    (n.x = e.x * t.x), (n.y = e.y * t.y), (n.z = e.z * t.z), n
                );
            }),
            (Re.divideComponents = function (e, t, n) {
                return (
                    (n.x = e.x / t.x), (n.y = e.y / t.y), (n.z = e.z / t.z), n
                );
            }),
            (Re.add = function (e, t, n) {
                return (
                    (n.x = e.x + t.x), (n.y = e.y + t.y), (n.z = e.z + t.z), n
                );
            }),
            (Re.subtract = function (e, t, n) {
                return (
                    (n.x = e.x - t.x), (n.y = e.y - t.y), (n.z = e.z - t.z), n
                );
            }),
            (Re.multiplyByScalar = function (e, t, n) {
                return (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), n;
            }),
            (Re.divideByScalar = function (e, t, n) {
                return (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), n;
            }),
            (Re.negate = function (e, t) {
                return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), t;
            }),
            (Re.abs = function (e, t) {
                return (
                    (t.x = Math.abs(e.x)),
                    (t.y = Math.abs(e.y)),
                    (t.z = Math.abs(e.z)),
                    t
                );
            }),
            new Re()),
        M =
            ((Re.lerp = function (e, t, n, r) {
                return (
                    Re.multiplyByScalar(t, n, x),
                    (r = Re.multiplyByScalar(e, 1 - n, r)),
                    Re.add(x, r, r)
                );
            }),
            new Re()),
        b = new Re(),
        C =
            ((Re.angleBetween = function (e, t) {
                Re.normalize(e, M), Re.normalize(t, b);
                (e = Re.dot(M, b)), (t = Re.magnitude(Re.cross(M, b, M)));
                return Math.atan2(t, e);
            }),
            new Re());
    (Re.mostOrthogonalAxis = function (e, t) {
        e = Re.normalize(e, C);
        return (
            Re.abs(e, e),
            (t =
                e.x <= e.y
                    ? e.x <= e.z
                        ? Re.clone(Re.UNIT_X, t)
                        : Re.clone(Re.UNIT_Z, t)
                    : e.y <= e.z
                    ? Re.clone(Re.UNIT_Y, t)
                    : Re.clone(Re.UNIT_Z, t))
        );
    }),
        (Re.projectVector = function (e, t, n) {
            e = Re.dot(e, t) / Re.dot(t, t);
            return Re.multiplyByScalar(t, e, n);
        }),
        (Re.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e.x === t.x &&
                    e.y === t.y &&
                    e.z === t.z)
            );
        }),
        (Re.equalsArray = function (e, t, n) {
            return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2];
        }),
        (Re.equalsEpsilon = function (e, t, n, r) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    Te.equalsEpsilon(e.x, t.x, n, r) &&
                    Te.equalsEpsilon(e.y, t.y, n, r) &&
                    Te.equalsEpsilon(e.z, t.z, n, r))
            );
        }),
        (Re.cross = function (e, t, n) {
            var r = e.x,
                o = e.y,
                e = e.z,
                i = t.x,
                a = t.y,
                t = t.z,
                s = e * i - r * t,
                r = r * a - o * i;
            return (n.x = o * t - e * a), (n.y = s), (n.z = r), n;
        }),
        (Re.midpoint = function (e, t, n) {
            return (
                (n.x = 0.5 * (e.x + t.x)),
                (n.y = 0.5 * (e.y + t.y)),
                (n.z = 0.5 * (e.z + t.z)),
                n
            );
        }),
        (Re.fromDegrees = function (e, t, n, r, o) {
            return (
                (e = Te.toRadians(e)),
                (t = Te.toRadians(t)),
                Re.fromRadians(e, t, n, r, o)
            );
        });
    let U = new Re(),
        D = new Re();
    const z = new Re(40680631590769, 40680631590769, 40408299984661.445);
    (Re.fromRadians = function (e, t, n, r, o) {
        n = ge.defaultValue(n, 0);
        var r = ge.defined(r) ? r.radiiSquared : z,
            i = Math.cos(t),
            i =
                ((U.x = i * Math.cos(e)),
                (U.y = i * Math.sin(e)),
                (U.z = Math.sin(t)),
                (U = Re.normalize(U, U)),
                Re.multiplyComponents(r, U, D),
                Math.sqrt(Re.dot(U, D)));
        return (
            (D = Re.divideByScalar(D, i, D)),
            (U = Re.multiplyByScalar(U, n, U)),
            ge.defined(o) || (o = new Re()),
            Re.add(D, U, o)
        );
    }),
        (Re.fromDegreesArray = function (t, n, r) {
            var o = t.length;
            ge.defined(r) ? (r.length = o / 2) : (r = new Array(o / 2));
            for (let e = 0; e < o; e += 2) {
                var i = t[e],
                    a = t[e + 1],
                    s = e / 2;
                r[s] = Re.fromDegrees(i, a, 0, n, r[s]);
            }
            return r;
        }),
        (Re.fromRadiansArray = function (t, n, r) {
            var o = t.length;
            ge.defined(r) ? (r.length = o / 2) : (r = new Array(o / 2));
            for (let e = 0; e < o; e += 2) {
                var i = t[e],
                    a = t[e + 1],
                    s = e / 2;
                r[s] = Re.fromRadians(i, a, 0, n, r[s]);
            }
            return r;
        }),
        (Re.fromDegreesArrayHeights = function (t, n, r) {
            var o = t.length;
            ge.defined(r) ? (r.length = o / 3) : (r = new Array(o / 3));
            for (let e = 0; e < o; e += 3) {
                var i = t[e],
                    a = t[e + 1],
                    s = t[e + 2],
                    u = e / 3;
                r[u] = Re.fromDegrees(i, a, s, n, r[u]);
            }
            return r;
        }),
        (Re.fromRadiansArrayHeights = function (t, n, r) {
            var o = t.length;
            ge.defined(r) ? (r.length = o / 3) : (r = new Array(o / 3));
            for (let e = 0; e < o; e += 3) {
                var i = t[e],
                    a = t[e + 1],
                    s = t[e + 2],
                    u = e / 3;
                r[u] = Re.fromRadians(i, a, s, n, r[u]);
            }
            return r;
        }),
        (Re.ZERO = Object.freeze(new Re(0, 0, 0))),
        (Re.ONE = Object.freeze(new Re(1, 1, 1))),
        (Re.UNIT_X = Object.freeze(new Re(1, 0, 0))),
        (Re.UNIT_Y = Object.freeze(new Re(0, 1, 0))),
        (Re.UNIT_Z = Object.freeze(new Re(0, 0, 1))),
        (Re.prototype.clone = function (e) {
            return Re.clone(this, e);
        }),
        (Re.prototype.equals = function (e) {
            return Re.equals(this, e);
        }),
        (Re.prototype.equalsEpsilon = function (e, t, n) {
            return Re.equalsEpsilon(this, e, t, n);
        }),
        (Re.prototype.toString = function () {
            return `(${this.x}, ${this.y}, ${this.z})`;
        });
    var F = Object.freeze({ OUTSIDE: -1, INTERSECTING: 0, INSIDE: 1 });
    function Ae(e, t, n) {
        (this.minimum = Re.clone(ge.defaultValue(e, Re.ZERO))),
            (this.maximum = Re.clone(ge.defaultValue(t, Re.ZERO))),
            (n = ge.defined(n)
                ? Re.clone(n)
                : Re.midpoint(this.minimum, this.maximum, new Re())),
            (this.center = n);
    }
    (Ae.fromCorners = function (e, t, n) {
        return (
            ((n = ge.defined(n) ? n : new Ae()).minimum = Re.clone(
                e,
                n.minimum
            )),
            (n.maximum = Re.clone(t, n.maximum)),
            (n.center = Re.midpoint(e, t, n.center)),
            n
        );
    }),
        (Ae.fromPoints = function (t, e) {
            if (
                (ge.defined(e) || (e = new Ae()),
                !ge.defined(t) || 0 === t.length)
            )
                return (
                    (e.minimum = Re.clone(Re.ZERO, e.minimum)),
                    (e.maximum = Re.clone(Re.ZERO, e.maximum)),
                    (e.center = Re.clone(Re.ZERO, e.center)),
                    e
                );
            let n = t[0].x,
                r = t[0].y,
                o = t[0].z,
                i = t[0].x,
                a = t[0].y,
                s = t[0].z;
            var u = t.length;
            for (let e = 1; e < u; e++) {
                var c = t[e],
                    l = c.x,
                    d = c.y,
                    c = c.z;
                (n = Math.min(l, n)),
                    (i = Math.max(l, i)),
                    (r = Math.min(d, r)),
                    (a = Math.max(d, a)),
                    (o = Math.min(c, o)),
                    (s = Math.max(c, s));
            }
            const f = e.minimum,
                h = ((f.x = n), (f.y = r), (f.z = o), e.maximum);
            return (
                (h.x = i),
                (h.y = a),
                (h.z = s),
                (e.center = Re.midpoint(f, h, e.center)),
                e
            );
        }),
        (Ae.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.minimum = Re.clone(e.minimum, t.minimum)),
                      (t.maximum = Re.clone(e.maximum, t.maximum)),
                      (t.center = Re.clone(e.center, t.center)),
                      t)
                    : new Ae(e.minimum, e.maximum, e.center);
        }),
        (Ae.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    Re.equals(e.center, t.center) &&
                    Re.equals(e.minimum, t.minimum) &&
                    Re.equals(e.maximum, t.maximum))
            );
        });
    let L = new Re();
    (Ae.intersectPlane = function (e, t) {
        L = Re.subtract(e.maximum, e.minimum, L);
        var n = Re.multiplyByScalar(L, 0.5, L),
            r = t.normal,
            n = n.x * Math.abs(r.x) + n.y * Math.abs(r.y) + n.z * Math.abs(r.z),
            e = Re.dot(e.center, r) + t.distance;
        return 0 < e - n ? F.INSIDE : e + n < 0 ? F.OUTSIDE : F.INTERSECTING;
    }),
        (Ae.prototype.clone = function (e) {
            return Ae.clone(this, e);
        }),
        (Ae.prototype.intersectPlane = function (e) {
            return Ae.intersectPlane(this, e);
        }),
        (Ae.prototype.equals = function (e) {
            return Ae.equals(this, e);
        });
    const V = new Re(),
        k = new Re();
    function G(e, t, n, r, o) {
        var i = e.x,
            a = e.y,
            s = e.z,
            u = t.x,
            c = t.y,
            t = t.z,
            l = i * i * u * u,
            d = a * a * c * c,
            f = s * s * t * t,
            u = l + d + f,
            c = Math.sqrt(1 / u),
            t = Re.multiplyByScalar(e, c, V);
        if (u < r) return isFinite(c) ? Re.clone(t, o) : void 0;
        var h = n.x,
            p = n.y,
            m = n.z;
        const E = k;
        (E.x = t.x * h * 2), (E.y = t.y * p * 2), (E.z = t.z * m * 2);
        let _ = ((1 - c) * Re.magnitude(e)) / (0.5 * Re.magnitude(E)),
            y = 0,
            g,
            T,
            R;
        do {
            (_ -= y),
                (g = 1 / (1 + _ * h)),
                (T = 1 / (1 + _ * p)),
                (R = 1 / (1 + _ * m));
            var A = g * g,
                S = T * T,
                w = R * R,
                I = A * g,
                v = S * T,
                O = w * R,
                A = l * A + d * S + f * w - 1;
        } while (
            ((y = A / (-2 * (l * I * h + d * v * p + f * O * m))),
            Math.abs(A) > Te.EPSILON12)
        );
        return ge.defined(o)
            ? ((o.x = i * g), (o.y = a * T), (o.z = s * R), o)
            : new Re(i * g, a * T, s * R);
    }
    function Se(e, t, n) {
        (this.longitude = ge.defaultValue(e, 0)),
            (this.latitude = ge.defaultValue(t, 0)),
            (this.height = ge.defaultValue(n, 0));
    }
    (Se.fromRadians = function (e, t, n, r) {
        return (
            (n = ge.defaultValue(n, 0)),
            ge.defined(r)
                ? ((r.longitude = e), (r.latitude = t), (r.height = n), r)
                : new Se(e, t, n)
        );
    }),
        (Se.fromDegrees = function (e, t, n, r) {
            return (
                (e = Te.toRadians(e)),
                (t = Te.toRadians(t)),
                Se.fromRadians(e, t, n, r)
            );
        });
    const W = new Re(),
        H = new Re(),
        X = new Re(),
        j = new Re(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
        Y = new Re(
            1 / 40680631590769,
            1 / 40680631590769,
            1 / 40408299984661.445
        ),
        Q = Te.EPSILON1;
    function Z(e, t, n, r) {
        (t = ge.defaultValue(t, 0)),
            (n = ge.defaultValue(n, 0)),
            (r = ge.defaultValue(r, 0)),
            (e._radii = new Re(t, n, r)),
            (e._radiiSquared = new Re(t * t, n * n, r * r)),
            (e._radiiToTheFourth = new Re(
                t * t * t * t,
                n * n * n * n,
                r * r * r * r
            )),
            (e._oneOverRadii = new Re(
                0 === t ? 0 : 1 / t,
                0 === n ? 0 : 1 / n,
                0 === r ? 0 : 1 / r
            )),
            (e._oneOverRadiiSquared = new Re(
                0 === t ? 0 : 1 / (t * t),
                0 === n ? 0 : 1 / (n * n),
                0 === r ? 0 : 1 / (r * r)
            )),
            (e._minimumRadius = Math.min(t, n, r)),
            (e._maximumRadius = Math.max(t, n, r)),
            (e._centerToleranceSquared = Te.EPSILON1),
            0 !== e._radiiSquared.z &&
                (e._squaredXOverSquaredZ =
                    e._radiiSquared.x / e._radiiSquared.z);
    }
    function S(e, t, n) {
        (this._radii = void 0),
            (this._radiiSquared = void 0),
            (this._radiiToTheFourth = void 0),
            (this._oneOverRadii = void 0),
            (this._oneOverRadiiSquared = void 0),
            (this._minimumRadius = void 0),
            (this._maximumRadius = void 0),
            (this._centerToleranceSquared = void 0),
            (this._squaredXOverSquaredZ = void 0),
            Z(this, e, t, n);
    }
    (Se.fromCartesian = function (e, t, n) {
        var r = ge.defined(t) ? t.oneOverRadii : j,
            o = ge.defined(t) ? t.oneOverRadiiSquared : Y,
            r = G(e, r, o, ge.defined(t) ? t._centerToleranceSquared : Q, H);
        if (ge.defined(r))
            return (
                (t = Re.multiplyComponents(r, o, W)),
                (t = Re.normalize(t, t)),
                (o = Re.subtract(e, r, X)),
                (r = Math.atan2(t.y, t.x)),
                (t = Math.asin(t.z)),
                (e = Te.sign(Re.dot(o, e)) * Re.magnitude(o)),
                ge.defined(n)
                    ? ((n.longitude = r), (n.latitude = t), (n.height = e), n)
                    : new Se(r, t, e)
            );
    }),
        (Se.toCartesian = function (e, t, n) {
            return Re.fromRadians(e.longitude, e.latitude, e.height, t, n);
        }),
        (Se.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.longitude = e.longitude),
                      (t.latitude = e.latitude),
                      (t.height = e.height),
                      t)
                    : new Se(e.longitude, e.latitude, e.height);
        }),
        (Se.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e.longitude === t.longitude &&
                    e.latitude === t.latitude &&
                    e.height === t.height)
            );
        }),
        (Se.equalsEpsilon = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        Math.abs(e.longitude - t.longitude) <= n &&
                        Math.abs(e.latitude - t.latitude) <= n &&
                        Math.abs(e.height - t.height) <= n)
            );
        }),
        (Se.ZERO = Object.freeze(new Se(0, 0, 0))),
        (Se.prototype.clone = function (e) {
            return Se.clone(this, e);
        }),
        (Se.prototype.equals = function (e) {
            return Se.equals(this, e);
        }),
        (Se.prototype.equalsEpsilon = function (e, t) {
            return Se.equalsEpsilon(this, e, t);
        }),
        (Se.prototype.toString = function () {
            return `(${this.longitude}, ${this.latitude}, ${this.height})`;
        }),
        Object.defineProperties(S.prototype, {
            radii: {
                get: function () {
                    return this._radii;
                },
            },
            radiiSquared: {
                get: function () {
                    return this._radiiSquared;
                },
            },
            radiiToTheFourth: {
                get: function () {
                    return this._radiiToTheFourth;
                },
            },
            oneOverRadii: {
                get: function () {
                    return this._oneOverRadii;
                },
            },
            oneOverRadiiSquared: {
                get: function () {
                    return this._oneOverRadiiSquared;
                },
            },
            minimumRadius: {
                get: function () {
                    return this._minimumRadius;
                },
            },
            maximumRadius: {
                get: function () {
                    return this._maximumRadius;
                },
            },
        }),
        (S.clone = function (e, t) {
            var n;
            if (ge.defined(e))
                return (
                    (n = e._radii),
                    ge.defined(t)
                        ? (Re.clone(n, t._radii),
                          Re.clone(e._radiiSquared, t._radiiSquared),
                          Re.clone(e._radiiToTheFourth, t._radiiToTheFourth),
                          Re.clone(e._oneOverRadii, t._oneOverRadii),
                          Re.clone(
                              e._oneOverRadiiSquared,
                              t._oneOverRadiiSquared
                          ),
                          (t._minimumRadius = e._minimumRadius),
                          (t._maximumRadius = e._maximumRadius),
                          (t._centerToleranceSquared =
                              e._centerToleranceSquared),
                          t)
                        : new S(n.x, n.y, n.z)
                );
        }),
        (S.fromCartesian3 = function (e, t) {
            return (
                ge.defined(t) || (t = new S()),
                ge.defined(e) && Z(t, e.x, e.y, e.z),
                t
            );
        }),
        (S.WGS84 = Object.freeze(new S(6378137, 6378137, 6356752.314245179))),
        (S.UNIT_SPHERE = Object.freeze(new S(1, 1, 1))),
        (S.MOON = Object.freeze(
            new S(Te.LUNAR_RADIUS, Te.LUNAR_RADIUS, Te.LUNAR_RADIUS)
        )),
        (S.prototype.clone = function (e) {
            return S.clone(this, e);
        }),
        (S.packedLength = Re.packedLength),
        (S.pack = function (e, t, n) {
            return (n = ge.defaultValue(n, 0)), Re.pack(e._radii, t, n), t;
        }),
        (S.unpack = function (e, t, n) {
            t = ge.defaultValue(t, 0);
            e = Re.unpack(e, t);
            return S.fromCartesian3(e, n);
        }),
        (S.prototype.geocentricSurfaceNormal = Re.normalize),
        (S.prototype.geodeticSurfaceNormalCartographic = function (e, t) {
            var n = e.longitude,
                e = e.latitude,
                r = Math.cos(e),
                o = r * Math.cos(n),
                r = r * Math.sin(n),
                n = Math.sin(e);
            return (
                ((t = ge.defined(t) ? t : new Re()).x = o),
                (t.y = r),
                (t.z = n),
                Re.normalize(t, t)
            );
        }),
        (S.prototype.geodeticSurfaceNormal = function (e, t) {
            if (!Re.equalsEpsilon(e, Re.ZERO, Te.EPSILON14))
                return (
                    ge.defined(t) || (t = new Re()),
                    (t = Re.multiplyComponents(
                        e,
                        this._oneOverRadiiSquared,
                        t
                    )),
                    Re.normalize(t, t)
                );
        });
    const $ = new Re(),
        K = new Re(),
        J =
            ((S.prototype.cartographicToCartesian = function (e, t) {
                var n = $,
                    r = K,
                    o =
                        (this.geodeticSurfaceNormalCartographic(e, n),
                        Re.multiplyComponents(this._radiiSquared, n, r),
                        Math.sqrt(Re.dot(n, r)));
                return (
                    Re.divideByScalar(r, o, r),
                    Re.multiplyByScalar(n, e.height, n),
                    ge.defined(t) || (t = new Re()),
                    Re.add(r, n, t)
                );
            }),
            (S.prototype.cartographicArrayToCartesianArray = function (t, n) {
                var r = t.length;
                ge.defined(n) ? (n.length = r) : (n = new Array(r));
                for (let e = 0; e < r; e++)
                    n[e] = this.cartographicToCartesian(t[e], n[e]);
                return n;
            }),
            new Re()),
        ee = new Re(),
        te = new Re(),
        ne =
            ((S.prototype.cartesianToCartographic = function (e, t) {
                var n,
                    r,
                    o = this.scaleToGeodeticSurface(e, ee);
                if (ge.defined(o))
                    return (
                        (r = this.geodeticSurfaceNormal(o, J)),
                        (o = Re.subtract(e, o, te)),
                        (n = Math.atan2(r.y, r.x)),
                        (r = Math.asin(r.z)),
                        (e = Te.sign(Re.dot(o, e)) * Re.magnitude(o)),
                        ge.defined(t)
                            ? ((t.longitude = n),
                              (t.latitude = r),
                              (t.height = e),
                              t)
                            : new Se(n, r, e)
                    );
            }),
            (S.prototype.cartesianArrayToCartographicArray = function (t, n) {
                var r = t.length;
                ge.defined(n) ? (n.length = r) : (n = new Array(r));
                for (let e = 0; e < r; ++e)
                    n[e] = this.cartesianToCartographic(t[e], n[e]);
                return n;
            }),
            (S.prototype.scaleToGeodeticSurface = function (e, t) {
                return G(
                    e,
                    this._oneOverRadii,
                    this._oneOverRadiiSquared,
                    this._centerToleranceSquared,
                    t
                );
            }),
            (S.prototype.scaleToGeocentricSurface = function (e, t) {
                ge.defined(t) || (t = new Re());
                var n = e.x,
                    r = e.y,
                    o = e.z,
                    i = this._oneOverRadiiSquared,
                    n = 1 / Math.sqrt(n * n * i.x + r * r * i.y + o * o * i.z);
                return Re.multiplyByScalar(e, n, t);
            }),
            (S.prototype.transformPositionToScaledSpace = function (e, t) {
                return (
                    ge.defined(t) || (t = new Re()),
                    Re.multiplyComponents(e, this._oneOverRadii, t)
                );
            }),
            (S.prototype.transformPositionFromScaledSpace = function (e, t) {
                return (
                    ge.defined(t) || (t = new Re()),
                    Re.multiplyComponents(e, this._radii, t)
                );
            }),
            (S.prototype.equals = function (e) {
                return (
                    this === e ||
                    (ge.defined(e) && Re.equals(this._radii, e._radii))
                );
            }),
            (S.prototype.toString = function () {
                return this._radii.toString();
            }),
            (S.prototype.getSurfaceNormalIntersectionWithZAxis = function (
                e,
                t,
                n
            ) {
                t = ge.defaultValue(t, 0);
                var r = this._squaredXOverSquaredZ;
                if (
                    (((n = ge.defined(n) ? n : new Re()).x = 0),
                    (n.y = 0),
                    (n.z = e.z * (1 - r)),
                    !(Math.abs(n.z) >= this._radii.z - t))
                )
                    return n;
            }),
            [
                0.14887433898163, 0.43339539412925, 0.67940956829902,
                0.86506336668898, 0.97390652851717, 0,
            ]),
        re = [
            0.29552422471475, 0.26926671930999, 0.21908636251598,
            0.14945134915058, 0.066671344308684, 0,
        ];
    function oe(e, t, n) {
        var r = 0.5 * (t + e),
            o = 0.5 * (t - e);
        let i = 0;
        for (let e = 0; e < 5; e++) {
            var a = o * ne[e];
            i += re[e] * (n(r + a) + n(r - a));
        }
        return (i *= o);
    }
    function ie(e) {
        (this._ellipsoid = ge.defaultValue(e, S.WGS84)),
            (this._semimajorAxis = this._ellipsoid.maximumRadius),
            (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
    }
    function ae(e, t) {
        (this.start = ge.defaultValue(e, 0)),
            (this.stop = ge.defaultValue(t, 0));
    }
    function B(e, t, n, r, o, i, a, s, u) {
        (this[0] = ge.defaultValue(e, 0)),
            (this[1] = ge.defaultValue(r, 0)),
            (this[2] = ge.defaultValue(a, 0)),
            (this[3] = ge.defaultValue(t, 0)),
            (this[4] = ge.defaultValue(o, 0)),
            (this[5] = ge.defaultValue(s, 0)),
            (this[6] = ge.defaultValue(n, 0)),
            (this[7] = ge.defaultValue(i, 0)),
            (this[8] = ge.defaultValue(u, 0));
    }
    (S.prototype.surfaceArea = function (e) {
        const t = e.west;
        let o = e.east;
        for (var n = e.south, e = e.north; o < t; ) o += Te.TWO_PI;
        var r = this._radiiSquared;
        const i = r.x,
            a = r.y,
            s = r.z,
            u = i * a;
        return oe(n, e, function (e) {
            const n = Math.cos(e),
                r = Math.sin(e);
            return (
                Math.cos(e) *
                oe(t, o, function (e) {
                    var t = Math.cos(e),
                        e = Math.sin(e);
                    return Math.sqrt(
                        u * r * r + s * (a * t * t + i * e * e) * n * n
                    );
                })
            );
        });
    }),
        Object.defineProperties(ie.prototype, {
            ellipsoid: {
                get: function () {
                    return this._ellipsoid;
                },
            },
        }),
        (ie.prototype.project = function (e, t) {
            var n = this._semimajorAxis,
                r = e.longitude * n,
                n = e.latitude * n,
                e = e.height;
            return ge.defined(t)
                ? ((t.x = r), (t.y = n), (t.z = e), t)
                : new Re(r, n, e);
        }),
        (ie.prototype.unproject = function (e, t) {
            var n = this._oneOverSemimajorAxis,
                r = e.x * n,
                n = e.y * n,
                e = e.z;
            return ge.defined(t)
                ? ((t.longitude = r), (t.latitude = n), (t.height = e), t)
                : new Se(r, n, e);
        }),
        (B.packedLength = 9),
        (B.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e[0]),
                (t[n++] = e[1]),
                (t[n++] = e[2]),
                (t[n++] = e[3]),
                (t[n++] = e[4]),
                (t[n++] = e[5]),
                (t[n++] = e[6]),
                (t[n++] = e[7]),
                (t[n++] = e[8]),
                t
            );
        }),
        (B.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new B())[0] = e[t++]),
                (n[1] = e[t++]),
                (n[2] = e[t++]),
                (n[3] = e[t++]),
                (n[4] = e[t++]),
                (n[5] = e[t++]),
                (n[6] = e[t++]),
                (n[7] = e[t++]),
                (n[8] = e[t++]),
                n
            );
        }),
        (B.packArray = function (t, n) {
            var r = t.length,
                e = 9 * r;
            ge.defined(n)
                ? (!Array.isArray(n) && n.length !== e) ||
                  n.length === e ||
                  (n.length = e)
                : (n = new Array(e));
            for (let e = 0; e < r; ++e) B.pack(t[e], n, 9 * e);
            return n;
        }),
        (B.unpackArray = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r / 9) : (n = new Array(r / 9));
            for (let e = 0; e < r; e += 9) {
                var o = e / 9;
                n[o] = B.unpack(t, e, n[o]);
            }
            return n;
        }),
        (B.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t[0] = e[0]),
                      (t[1] = e[1]),
                      (t[2] = e[2]),
                      (t[3] = e[3]),
                      (t[4] = e[4]),
                      (t[5] = e[5]),
                      (t[6] = e[6]),
                      (t[7] = e[7]),
                      (t[8] = e[8]),
                      t)
                    : new B(
                          e[0],
                          e[3],
                          e[6],
                          e[1],
                          e[4],
                          e[7],
                          e[2],
                          e[5],
                          e[8]
                      );
        }),
        (B.fromArray = B.unpack),
        (B.fromColumnMajorArray = function (e, t) {
            return B.clone(e, t);
        }),
        (B.fromRowMajorArray = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e[0]),
                  (t[1] = e[3]),
                  (t[2] = e[6]),
                  (t[3] = e[1]),
                  (t[4] = e[4]),
                  (t[5] = e[7]),
                  (t[6] = e[2]),
                  (t[7] = e[5]),
                  (t[8] = e[8]),
                  t)
                : new B(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
        }),
        (B.fromQuaternion = function (e, t) {
            var n = e.x * e.x,
                r = e.x * e.y,
                o = e.x * e.z,
                i = e.x * e.w,
                a = e.y * e.y,
                s = e.y * e.z,
                u = e.y * e.w,
                c = e.z * e.z,
                l = e.z * e.w,
                e = e.w * e.w,
                d = n - a - c + e,
                f = 2 * (r - l),
                h = 2 * (o + u),
                r = 2 * (r + l),
                l = a - n - c + e,
                p = 2 * (s - i),
                o = 2 * (o - u),
                u = 2 * (s + i),
                s = -n - a + c + e;
            return ge.defined(t)
                ? ((t[0] = d),
                  (t[1] = r),
                  (t[2] = o),
                  (t[3] = f),
                  (t[4] = l),
                  (t[5] = u),
                  (t[6] = h),
                  (t[7] = p),
                  (t[8] = s),
                  t)
                : new B(d, f, h, r, l, p, o, u, s);
        }),
        (B.fromHeadingPitchRoll = function (e, t) {
            var n = Math.cos(-e.pitch),
                r = Math.cos(-e.heading),
                o = Math.cos(e.roll),
                i = Math.sin(-e.pitch),
                a = Math.sin(-e.heading),
                e = Math.sin(e.roll),
                s = n * r,
                u = -o * a + e * i * r,
                c = e * a + o * i * r,
                l = n * a,
                d = o * r + e * i * a,
                r = -e * r + o * i * a,
                a = -i,
                i = e * n,
                e = o * n;
            return ge.defined(t)
                ? ((t[0] = s),
                  (t[1] = l),
                  (t[2] = a),
                  (t[3] = u),
                  (t[4] = d),
                  (t[5] = i),
                  (t[6] = c),
                  (t[7] = r),
                  (t[8] = e),
                  t)
                : new B(s, u, c, l, d, r, a, i, e);
        }),
        (B.fromScale = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e.x),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = e.y),
                  (t[5] = 0),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = e.z),
                  t)
                : new B(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z);
        }),
        (B.fromUniformScale = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = e),
                  (t[5] = 0),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = e),
                  t)
                : new B(e, 0, 0, 0, e, 0, 0, 0, e);
        }),
        (B.fromCrossProduct = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = 0),
                  (t[1] = e.z),
                  (t[2] = -e.y),
                  (t[3] = -e.z),
                  (t[4] = 0),
                  (t[5] = e.x),
                  (t[6] = e.y),
                  (t[7] = -e.x),
                  (t[8] = 0),
                  t)
                : new B(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0);
        }),
        (B.fromRotationX = function (e, t) {
            var n = Math.cos(e),
                e = Math.sin(e);
            return ge.defined(t)
                ? ((t[0] = 1),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = n),
                  (t[5] = e),
                  (t[6] = 0),
                  (t[7] = -e),
                  (t[8] = n),
                  t)
                : new B(1, 0, 0, 0, n, -e, 0, e, n);
        }),
        (B.fromRotationY = function (e, t) {
            var n = Math.cos(e),
                e = Math.sin(e);
            return ge.defined(t)
                ? ((t[0] = n),
                  (t[1] = 0),
                  (t[2] = -e),
                  (t[3] = 0),
                  (t[4] = 1),
                  (t[5] = 0),
                  (t[6] = e),
                  (t[7] = 0),
                  (t[8] = n),
                  t)
                : new B(n, 0, e, 0, 1, 0, -e, 0, n);
        }),
        (B.fromRotationZ = function (e, t) {
            var n = Math.cos(e),
                e = Math.sin(e);
            return ge.defined(t)
                ? ((t[0] = n),
                  (t[1] = e),
                  (t[2] = 0),
                  (t[3] = -e),
                  (t[4] = n),
                  (t[5] = 0),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = 1),
                  t)
                : new B(n, -e, 0, e, n, 0, 0, 0, 1);
        }),
        (B.toArray = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e[0]),
                  (t[1] = e[1]),
                  (t[2] = e[2]),
                  (t[3] = e[3]),
                  (t[4] = e[4]),
                  (t[5] = e[5]),
                  (t[6] = e[6]),
                  (t[7] = e[7]),
                  (t[8] = e[8]),
                  t)
                : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]];
        }),
        (B.getElementIndex = function (e, t) {
            return 3 * e + t;
        }),
        (B.getColumn = function (e, t, n) {
            var t = 3 * t,
                r = e[t],
                o = e[1 + t],
                e = e[2 + t];
            return (n.x = r), (n.y = o), (n.z = e), n;
        }),
        (B.setColumn = function (e, t, n, r) {
            t *= 3;
            return (
                ((r = B.clone(e, r))[t] = n.x),
                (r[1 + t] = n.y),
                (r[2 + t] = n.z),
                r
            );
        }),
        (B.getRow = function (e, t, n) {
            var r = e[t],
                o = e[t + 3],
                e = e[t + 6];
            return (n.x = r), (n.y = o), (n.z = e), n;
        }),
        (B.setRow = function (e, t, n, r) {
            return (
                ((r = B.clone(e, r))[t] = n.x),
                (r[t + 3] = n.y),
                (r[t + 6] = n.z),
                r
            );
        });
    const se = new Re(),
        ue =
            ((B.setScale = function (e, t, n) {
                var r = B.getScale(e, se),
                    o = t.x / r.x,
                    i = t.y / r.y,
                    t = t.z / r.z;
                return (
                    (n[0] = e[0] * o),
                    (n[1] = e[1] * o),
                    (n[2] = e[2] * o),
                    (n[3] = e[3] * i),
                    (n[4] = e[4] * i),
                    (n[5] = e[5] * i),
                    (n[6] = e[6] * t),
                    (n[7] = e[7] * t),
                    (n[8] = e[8] * t),
                    n
                );
            }),
            new Re()),
        ce =
            ((B.setUniformScale = function (e, t, n) {
                var r = B.getScale(e, ue),
                    o = t / r.x,
                    i = t / r.y,
                    t = t / r.z;
                return (
                    (n[0] = e[0] * o),
                    (n[1] = e[1] * o),
                    (n[2] = e[2] * o),
                    (n[3] = e[3] * i),
                    (n[4] = e[4] * i),
                    (n[5] = e[5] * i),
                    (n[6] = e[6] * t),
                    (n[7] = e[7] * t),
                    (n[8] = e[8] * t),
                    n
                );
            }),
            new Re()),
        le =
            ((B.getScale = function (e, t) {
                return (
                    (t.x = Re.magnitude(Re.fromElements(e[0], e[1], e[2], ce))),
                    (t.y = Re.magnitude(Re.fromElements(e[3], e[4], e[5], ce))),
                    (t.z = Re.magnitude(Re.fromElements(e[6], e[7], e[8], ce))),
                    t
                );
            }),
            new Re()),
        de =
            ((B.getMaximumScale = function (e) {
                return B.getScale(e, le), Re.maximumComponent(le);
            }),
            new Re()),
        fe =
            ((B.setRotation = function (e, t, n) {
                e = B.getScale(e, de);
                return (
                    (n[0] = t[0] * e.x),
                    (n[1] = t[1] * e.x),
                    (n[2] = t[2] * e.x),
                    (n[3] = t[3] * e.y),
                    (n[4] = t[4] * e.y),
                    (n[5] = t[5] * e.y),
                    (n[6] = t[6] * e.z),
                    (n[7] = t[7] * e.z),
                    (n[8] = t[8] * e.z),
                    n
                );
            }),
            new Re());
    (B.getRotation = function (e, t) {
        var n = B.getScale(e, fe);
        return (
            (t[0] = e[0] / n.x),
            (t[1] = e[1] / n.x),
            (t[2] = e[2] / n.x),
            (t[3] = e[3] / n.y),
            (t[4] = e[4] / n.y),
            (t[5] = e[5] / n.y),
            (t[6] = e[6] / n.z),
            (t[7] = e[7] / n.z),
            (t[8] = e[8] / n.z),
            t
        );
    }),
        (B.multiply = function (e, t, n) {
            var r = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
                o = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
                i = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
                a = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
                s = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
                u = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
                c = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
                l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
                e = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
            return (
                (n[0] = r),
                (n[1] = o),
                (n[2] = i),
                (n[3] = a),
                (n[4] = s),
                (n[5] = u),
                (n[6] = c),
                (n[7] = l),
                (n[8] = e),
                n
            );
        }),
        (B.add = function (e, t, n) {
            return (
                (n[0] = e[0] + t[0]),
                (n[1] = e[1] + t[1]),
                (n[2] = e[2] + t[2]),
                (n[3] = e[3] + t[3]),
                (n[4] = e[4] + t[4]),
                (n[5] = e[5] + t[5]),
                (n[6] = e[6] + t[6]),
                (n[7] = e[7] + t[7]),
                (n[8] = e[8] + t[8]),
                n
            );
        }),
        (B.subtract = function (e, t, n) {
            return (
                (n[0] = e[0] - t[0]),
                (n[1] = e[1] - t[1]),
                (n[2] = e[2] - t[2]),
                (n[3] = e[3] - t[3]),
                (n[4] = e[4] - t[4]),
                (n[5] = e[5] - t[5]),
                (n[6] = e[6] - t[6]),
                (n[7] = e[7] - t[7]),
                (n[8] = e[8] - t[8]),
                n
            );
        }),
        (B.multiplyByVector = function (e, t, n) {
            var r = t.x,
                o = t.y,
                t = t.z,
                i = e[0] * r + e[3] * o + e[6] * t,
                a = e[1] * r + e[4] * o + e[7] * t,
                r = e[2] * r + e[5] * o + e[8] * t;
            return (n.x = i), (n.y = a), (n.z = r), n;
        }),
        (B.multiplyByScalar = function (e, t, n) {
            return (
                (n[0] = e[0] * t),
                (n[1] = e[1] * t),
                (n[2] = e[2] * t),
                (n[3] = e[3] * t),
                (n[4] = e[4] * t),
                (n[5] = e[5] * t),
                (n[6] = e[6] * t),
                (n[7] = e[7] * t),
                (n[8] = e[8] * t),
                n
            );
        }),
        (B.multiplyByScale = function (e, t, n) {
            return (
                (n[0] = e[0] * t.x),
                (n[1] = e[1] * t.x),
                (n[2] = e[2] * t.x),
                (n[3] = e[3] * t.y),
                (n[4] = e[4] * t.y),
                (n[5] = e[5] * t.y),
                (n[6] = e[6] * t.z),
                (n[7] = e[7] * t.z),
                (n[8] = e[8] * t.z),
                n
            );
        }),
        (B.multiplyByUniformScale = function (e, t, n) {
            return (
                (n[0] = e[0] * t),
                (n[1] = e[1] * t),
                (n[2] = e[2] * t),
                (n[3] = e[3] * t),
                (n[4] = e[4] * t),
                (n[5] = e[5] * t),
                (n[6] = e[6] * t),
                (n[7] = e[7] * t),
                (n[8] = e[8] * t),
                n
            );
        }),
        (B.negate = function (e, t) {
            return (
                (t[0] = -e[0]),
                (t[1] = -e[1]),
                (t[2] = -e[2]),
                (t[3] = -e[3]),
                (t[4] = -e[4]),
                (t[5] = -e[5]),
                (t[6] = -e[6]),
                (t[7] = -e[7]),
                (t[8] = -e[8]),
                t
            );
        }),
        (B.transpose = function (e, t) {
            var n = e[0],
                r = e[3],
                o = e[6],
                i = e[1],
                a = e[4],
                s = e[7],
                u = e[2],
                c = e[5],
                e = e[8];
            return (
                (t[0] = n),
                (t[1] = r),
                (t[2] = o),
                (t[3] = i),
                (t[4] = a),
                (t[5] = s),
                (t[6] = u),
                (t[7] = c),
                (t[8] = e),
                t
            );
        });
    const he = [1, 0, 0],
        pe = [2, 2, 1];
    const me = new B(),
        Ee = new B(),
        _e =
            ((B.computeEigenDecomposition = function (e, t) {
                var n = Te.EPSILON20;
                let r = 0,
                    o = 0;
                for (
                    var i = ((t = ge.defined(t) ? t : {}).unitary = B.clone(
                            B.IDENTITY,
                            t.unitary
                        )),
                        a = (t.diagonal = B.clone(e, t.diagonal)),
                        s =
                            n *
                            (function (t) {
                                let n = 0;
                                for (let e = 0; e < 9; ++e) {
                                    var r = t[e];
                                    n += r * r;
                                }
                                return Math.sqrt(n);
                            })(a);
                    o < 10 &&
                    (function (t) {
                        let n = 0;
                        for (let e = 0; e < 3; ++e) {
                            var r = t[B.getElementIndex(pe[e], he[e])];
                            n += 2 * r * r;
                        }
                        return Math.sqrt(n);
                    })(a) > s;

                ) {
                    {
                        u = void 0;
                        c = void 0;
                        l = void 0;
                        f = void 0;
                        h = void 0;
                        d = void 0;
                        l = void 0;
                        var u = a;
                        var c = me;
                        var l = Te.EPSILON15;
                        let t = 0,
                            n = 1;
                        for (let e = 0; e < 3; ++e) {
                            var d = Math.abs(
                                u[B.getElementIndex(pe[e], he[e])]
                            );
                            d > t && ((n = e), (t = d));
                        }
                        let r = 1,
                            o = 0;
                        var f = he[n],
                            h = pe[n];
                        if (Math.abs(u[B.getElementIndex(h, f)]) > l) {
                            l =
                                (u[B.getElementIndex(h, h)] -
                                    u[B.getElementIndex(f, f)]) /
                                2 /
                                u[B.getElementIndex(h, f)];
                            let e;
                            (e =
                                l < 0
                                    ? -1 / (-l + Math.sqrt(1 + l * l))
                                    : 1 / (l + Math.sqrt(1 + l * l))),
                                (r = 1 / Math.sqrt(1 + e * e)),
                                (o = e * r);
                        }
                        ((c = B.clone(B.IDENTITY, c))[B.getElementIndex(f, f)] =
                            c[B.getElementIndex(h, h)] =
                                r),
                            (c[B.getElementIndex(h, f)] = o),
                            (c[B.getElementIndex(f, h)] = -o);
                    }
                    B.transpose(me, Ee),
                        B.multiply(a, me, a),
                        B.multiply(Ee, a, a),
                        B.multiply(i, me, i),
                        2 < ++r && (++o, (r = 0));
                }
                return t;
            }),
            (B.abs = function (e, t) {
                return (
                    (t[0] = Math.abs(e[0])),
                    (t[1] = Math.abs(e[1])),
                    (t[2] = Math.abs(e[2])),
                    (t[3] = Math.abs(e[3])),
                    (t[4] = Math.abs(e[4])),
                    (t[5] = Math.abs(e[5])),
                    (t[6] = Math.abs(e[6])),
                    (t[7] = Math.abs(e[7])),
                    (t[8] = Math.abs(e[8])),
                    t
                );
            }),
            (B.determinant = function (e) {
                var t = e[0],
                    n = e[3],
                    r = e[6],
                    o = e[1],
                    i = e[4],
                    a = e[7],
                    s = e[2],
                    u = e[5],
                    e = e[8];
                return (
                    t * (i * e - u * a) +
                    o * (u * r - n * e) +
                    s * (n * a - i * r)
                );
            }),
            (B.inverse = function (e, t) {
                var n = e[0],
                    r = e[1],
                    o = e[2],
                    i = e[3],
                    a = e[4],
                    s = e[5],
                    u = e[6],
                    c = e[7],
                    l = e[8],
                    e = B.determinant(e),
                    l =
                        ((t[0] = a * l - c * s),
                        (t[1] = c * o - r * l),
                        (t[2] = r * s - a * o),
                        (t[3] = u * s - i * l),
                        (t[4] = n * l - u * o),
                        (t[5] = i * o - n * s),
                        (t[6] = i * c - u * a),
                        (t[7] = u * r - n * c),
                        (t[8] = n * a - i * r),
                        1 / e);
                return B.multiplyByScalar(t, l, t);
            }),
            new B());
    function q(e, t, n, r) {
        (this.x = ge.defaultValue(e, 0)),
            (this.y = ge.defaultValue(t, 0)),
            (this.z = ge.defaultValue(n, 0)),
            (this.w = ge.defaultValue(r, 0));
    }
    (B.inverseTranspose = function (e, t) {
        return B.inverse(B.transpose(e, _e), t);
    }),
        (B.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e[0] === t[0] &&
                    e[1] === t[1] &&
                    e[2] === t[2] &&
                    e[3] === t[3] &&
                    e[4] === t[4] &&
                    e[5] === t[5] &&
                    e[6] === t[6] &&
                    e[7] === t[7] &&
                    e[8] === t[8])
            );
        }),
        (B.equalsEpsilon = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        Math.abs(e[0] - t[0]) <= n &&
                        Math.abs(e[1] - t[1]) <= n &&
                        Math.abs(e[2] - t[2]) <= n &&
                        Math.abs(e[3] - t[3]) <= n &&
                        Math.abs(e[4] - t[4]) <= n &&
                        Math.abs(e[5] - t[5]) <= n &&
                        Math.abs(e[6] - t[6]) <= n &&
                        Math.abs(e[7] - t[7]) <= n &&
                        Math.abs(e[8] - t[8]) <= n)
            );
        }),
        (B.IDENTITY = Object.freeze(new B(1, 0, 0, 0, 1, 0, 0, 0, 1))),
        (B.ZERO = Object.freeze(new B(0, 0, 0, 0, 0, 0, 0, 0, 0))),
        (B.COLUMN0ROW0 = 0),
        (B.COLUMN0ROW1 = 1),
        (B.COLUMN0ROW2 = 2),
        (B.COLUMN1ROW0 = 3),
        (B.COLUMN1ROW1 = 4),
        (B.COLUMN1ROW2 = 5),
        (B.COLUMN2ROW0 = 6),
        (B.COLUMN2ROW1 = 7),
        (B.COLUMN2ROW2 = 8),
        Object.defineProperties(B.prototype, {
            length: {
                get: function () {
                    return B.packedLength;
                },
            },
        }),
        (B.prototype.clone = function (e) {
            return B.clone(this, e);
        }),
        (B.prototype.equals = function (e) {
            return B.equals(this, e);
        }),
        (B.equalsArray = function (e, t, n) {
            return (
                e[0] === t[n] &&
                e[1] === t[n + 1] &&
                e[2] === t[n + 2] &&
                e[3] === t[n + 3] &&
                e[4] === t[n + 4] &&
                e[5] === t[n + 5] &&
                e[6] === t[n + 6] &&
                e[7] === t[n + 7] &&
                e[8] === t[n + 8]
            );
        }),
        (B.prototype.equalsEpsilon = function (e, t) {
            return B.equalsEpsilon(this, e, t);
        }),
        (B.prototype.toString = function () {
            return (
                `(${this[0]}, ${this[3]}, ${this[6]})
` +
                `(${this[1]}, ${this[4]}, ${this[7]})
` +
                `(${this[2]}, ${this[5]}, ${this[8]})`
            );
        }),
        (q.fromElements = function (e, t, n, r, o) {
            return ge.defined(o)
                ? ((o.x = e), (o.y = t), (o.z = n), (o.w = r), o)
                : new q(e, t, n, r);
        }),
        (q.fromColor = function (e, t) {
            return ge.defined(t)
                ? ((t.x = e.red),
                  (t.y = e.green),
                  (t.z = e.blue),
                  (t.w = e.alpha),
                  t)
                : new q(e.red, e.green, e.blue, e.alpha);
        }),
        (q.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t)
                    : new q(e.x, e.y, e.z, e.w);
        }),
        (q.packedLength = 4),
        (q.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e.x),
                (t[n++] = e.y),
                (t[n++] = e.z),
                (t[n] = e.w),
                t
            );
        }),
        (q.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new q()).x = e[t++]),
                (n.y = e[t++]),
                (n.z = e[t++]),
                (n.w = e[t]),
                n
            );
        }),
        (q.packArray = function (t, n) {
            var r = t.length,
                e = 4 * r;
            ge.defined(n)
                ? (!Array.isArray(n) && n.length !== e) ||
                  n.length === e ||
                  (n.length = e)
                : (n = new Array(e));
            for (let e = 0; e < r; ++e) q.pack(t[e], n, 4 * e);
            return n;
        }),
        (q.unpackArray = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r / 4) : (n = new Array(r / 4));
            for (let e = 0; e < r; e += 4) {
                var o = e / 4;
                n[o] = q.unpack(t, e, n[o]);
            }
            return n;
        }),
        (q.fromArray = q.unpack),
        (q.maximumComponent = function (e) {
            return Math.max(e.x, e.y, e.z, e.w);
        }),
        (q.minimumComponent = function (e) {
            return Math.min(e.x, e.y, e.z, e.w);
        }),
        (q.minimumByComponent = function (e, t, n) {
            return (
                (n.x = Math.min(e.x, t.x)),
                (n.y = Math.min(e.y, t.y)),
                (n.z = Math.min(e.z, t.z)),
                (n.w = Math.min(e.w, t.w)),
                n
            );
        }),
        (q.maximumByComponent = function (e, t, n) {
            return (
                (n.x = Math.max(e.x, t.x)),
                (n.y = Math.max(e.y, t.y)),
                (n.z = Math.max(e.z, t.z)),
                (n.w = Math.max(e.w, t.w)),
                n
            );
        }),
        (q.clamp = function (e, t, n, r) {
            var o = Te.clamp(e.x, t.x, n.x),
                i = Te.clamp(e.y, t.y, n.y),
                a = Te.clamp(e.z, t.z, n.z),
                e = Te.clamp(e.w, t.w, n.w);
            return (r.x = o), (r.y = i), (r.z = a), (r.w = e), r;
        }),
        (q.magnitudeSquared = function (e) {
            return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
        }),
        (q.magnitude = function (e) {
            return Math.sqrt(q.magnitudeSquared(e));
        });
    const ye = new q(),
        xe =
            ((q.distance = function (e, t) {
                return q.subtract(e, t, ye), q.magnitude(ye);
            }),
            (q.distanceSquared = function (e, t) {
                return q.subtract(e, t, ye), q.magnitudeSquared(ye);
            }),
            (q.normalize = function (e, t) {
                var n = q.magnitude(e);
                return (
                    (t.x = e.x / n),
                    (t.y = e.y / n),
                    (t.z = e.z / n),
                    (t.w = e.w / n),
                    t
                );
            }),
            (q.dot = function (e, t) {
                return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
            }),
            (q.multiplyComponents = function (e, t, n) {
                return (
                    (n.x = e.x * t.x),
                    (n.y = e.y * t.y),
                    (n.z = e.z * t.z),
                    (n.w = e.w * t.w),
                    n
                );
            }),
            (q.divideComponents = function (e, t, n) {
                return (
                    (n.x = e.x / t.x),
                    (n.y = e.y / t.y),
                    (n.z = e.z / t.z),
                    (n.w = e.w / t.w),
                    n
                );
            }),
            (q.add = function (e, t, n) {
                return (
                    (n.x = e.x + t.x),
                    (n.y = e.y + t.y),
                    (n.z = e.z + t.z),
                    (n.w = e.w + t.w),
                    n
                );
            }),
            (q.subtract = function (e, t, n) {
                return (
                    (n.x = e.x - t.x),
                    (n.y = e.y - t.y),
                    (n.z = e.z - t.z),
                    (n.w = e.w - t.w),
                    n
                );
            }),
            (q.multiplyByScalar = function (e, t, n) {
                return (
                    (n.x = e.x * t),
                    (n.y = e.y * t),
                    (n.z = e.z * t),
                    (n.w = e.w * t),
                    n
                );
            }),
            (q.divideByScalar = function (e, t, n) {
                return (
                    (n.x = e.x / t),
                    (n.y = e.y / t),
                    (n.z = e.z / t),
                    (n.w = e.w / t),
                    n
                );
            }),
            (q.negate = function (e, t) {
                return (
                    (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t
                );
            }),
            (q.abs = function (e, t) {
                return (
                    (t.x = Math.abs(e.x)),
                    (t.y = Math.abs(e.y)),
                    (t.z = Math.abs(e.z)),
                    (t.w = Math.abs(e.w)),
                    t
                );
            }),
            new q()),
        Me =
            ((q.lerp = function (e, t, n, r) {
                return (
                    q.multiplyByScalar(t, n, xe),
                    (r = q.multiplyByScalar(e, 1 - n, r)),
                    q.add(xe, r, r)
                );
            }),
            new q()),
        Pe =
            ((q.mostOrthogonalAxis = function (e, t) {
                e = q.normalize(e, Me);
                return (
                    q.abs(e, e),
                    (t =
                        e.x <= e.y
                            ? e.x <= e.z
                                ? e.x <= e.w
                                    ? q.clone(q.UNIT_X, t)
                                    : q.clone(q.UNIT_W, t)
                                : e.z <= e.w
                                ? q.clone(q.UNIT_Z, t)
                                : q.clone(q.UNIT_W, t)
                            : e.y <= e.z
                            ? e.y <= e.w
                                ? q.clone(q.UNIT_Y, t)
                                : q.clone(q.UNIT_W, t)
                            : e.z <= e.w
                            ? q.clone(q.UNIT_Z, t)
                            : q.clone(q.UNIT_W, t))
                );
            }),
            (q.equals = function (e, t) {
                return (
                    e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        e.x === t.x &&
                        e.y === t.y &&
                        e.z === t.z &&
                        e.w === t.w)
                );
            }),
            (q.equalsArray = function (e, t, n) {
                return (
                    e.x === t[n] &&
                    e.y === t[n + 1] &&
                    e.z === t[n + 2] &&
                    e.w === t[n + 3]
                );
            }),
            (q.equalsEpsilon = function (e, t, n, r) {
                return (
                    e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        Te.equalsEpsilon(e.x, t.x, n, r) &&
                        Te.equalsEpsilon(e.y, t.y, n, r) &&
                        Te.equalsEpsilon(e.z, t.z, n, r) &&
                        Te.equalsEpsilon(e.w, t.w, n, r))
                );
            }),
            (q.ZERO = Object.freeze(new q(0, 0, 0, 0))),
            (q.ONE = Object.freeze(new q(1, 1, 1, 1))),
            (q.UNIT_X = Object.freeze(new q(1, 0, 0, 0))),
            (q.UNIT_Y = Object.freeze(new q(0, 1, 0, 0))),
            (q.UNIT_Z = Object.freeze(new q(0, 0, 1, 0))),
            (q.UNIT_W = Object.freeze(new q(0, 0, 0, 1))),
            (q.prototype.clone = function (e) {
                return q.clone(this, e);
            }),
            (q.prototype.equals = function (e) {
                return q.equals(this, e);
            }),
            (q.prototype.equalsEpsilon = function (e, t, n) {
                return q.equalsEpsilon(this, e, t, n);
            }),
            (q.prototype.toString = function () {
                return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
            }),
            new Float32Array(1)),
        n = new Uint8Array(Pe.buffer);
    var e = new Uint32Array([287454020]);
    const be = 68 === new Uint8Array(e.buffer)[0];
    function Ce(e) {
        (this.name = "RuntimeError"), (this.message = e);
        let t;
        try {
            throw new Error();
        } catch (e) {
            t = e.stack;
        }
        this.stack = t;
    }
    function we(e, t, n, r, o, i, a, s, u, c, l, d, f, h, p, m) {
        (this[0] = ge.defaultValue(e, 0)),
            (this[1] = ge.defaultValue(o, 0)),
            (this[2] = ge.defaultValue(u, 0)),
            (this[3] = ge.defaultValue(f, 0)),
            (this[4] = ge.defaultValue(t, 0)),
            (this[5] = ge.defaultValue(i, 0)),
            (this[6] = ge.defaultValue(c, 0)),
            (this[7] = ge.defaultValue(h, 0)),
            (this[8] = ge.defaultValue(n, 0)),
            (this[9] = ge.defaultValue(a, 0)),
            (this[10] = ge.defaultValue(l, 0)),
            (this[11] = ge.defaultValue(p, 0)),
            (this[12] = ge.defaultValue(r, 0)),
            (this[13] = ge.defaultValue(s, 0)),
            (this[14] = ge.defaultValue(d, 0)),
            (this[15] = ge.defaultValue(m, 0));
    }
    (q.packFloat = function (e, t) {
        return (
            ge.defined(t) || (t = new q()),
            (Pe[0] = e),
            be
                ? ((t.x = n[0]), (t.y = n[1]), (t.z = n[2]), (t.w = n[3]))
                : ((t.x = n[3]), (t.y = n[2]), (t.z = n[1]), (t.w = n[0])),
            t
        );
    }),
        (q.unpackFloat = function (e) {
            return (
                be
                    ? ((n[0] = e.x), (n[1] = e.y), (n[2] = e.z), (n[3] = e.w))
                    : ((n[0] = e.w), (n[1] = e.z), (n[2] = e.y), (n[3] = e.x)),
                Pe[0]
            );
        }),
        ge.defined(Object.create) &&
            ((Ce.prototype = Object.create(Error.prototype)).constructor = Ce),
        (Ce.prototype.toString = function () {
            let e = this.name + ": " + this.message;
            return (
                ge.defined(this.stack) &&
                    (e +=
                        `
` + this.stack.toString()),
                e
            );
        }),
        (we.packedLength = 16),
        (we.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e[0]),
                (t[n++] = e[1]),
                (t[n++] = e[2]),
                (t[n++] = e[3]),
                (t[n++] = e[4]),
                (t[n++] = e[5]),
                (t[n++] = e[6]),
                (t[n++] = e[7]),
                (t[n++] = e[8]),
                (t[n++] = e[9]),
                (t[n++] = e[10]),
                (t[n++] = e[11]),
                (t[n++] = e[12]),
                (t[n++] = e[13]),
                (t[n++] = e[14]),
                (t[n] = e[15]),
                t
            );
        }),
        (we.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new we())[0] = e[t++]),
                (n[1] = e[t++]),
                (n[2] = e[t++]),
                (n[3] = e[t++]),
                (n[4] = e[t++]),
                (n[5] = e[t++]),
                (n[6] = e[t++]),
                (n[7] = e[t++]),
                (n[8] = e[t++]),
                (n[9] = e[t++]),
                (n[10] = e[t++]),
                (n[11] = e[t++]),
                (n[12] = e[t++]),
                (n[13] = e[t++]),
                (n[14] = e[t++]),
                (n[15] = e[t]),
                n
            );
        }),
        (we.packArray = function (t, n) {
            var r = t.length,
                e = 16 * r;
            ge.defined(n)
                ? (!Array.isArray(n) && n.length !== e) ||
                  n.length === e ||
                  (n.length = e)
                : (n = new Array(e));
            for (let e = 0; e < r; ++e) we.pack(t[e], n, 16 * e);
            return n;
        }),
        (we.unpackArray = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r / 16) : (n = new Array(r / 16));
            for (let e = 0; e < r; e += 16) {
                var o = e / 16;
                n[o] = we.unpack(t, e, n[o]);
            }
            return n;
        }),
        (we.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t[0] = e[0]),
                      (t[1] = e[1]),
                      (t[2] = e[2]),
                      (t[3] = e[3]),
                      (t[4] = e[4]),
                      (t[5] = e[5]),
                      (t[6] = e[6]),
                      (t[7] = e[7]),
                      (t[8] = e[8]),
                      (t[9] = e[9]),
                      (t[10] = e[10]),
                      (t[11] = e[11]),
                      (t[12] = e[12]),
                      (t[13] = e[13]),
                      (t[14] = e[14]),
                      (t[15] = e[15]),
                      t)
                    : new we(
                          e[0],
                          e[4],
                          e[8],
                          e[12],
                          e[1],
                          e[5],
                          e[9],
                          e[13],
                          e[2],
                          e[6],
                          e[10],
                          e[14],
                          e[3],
                          e[7],
                          e[11],
                          e[15]
                      );
        }),
        (we.fromArray = we.unpack),
        (we.fromColumnMajorArray = function (e, t) {
            return we.clone(e, t);
        }),
        (we.fromRowMajorArray = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e[0]),
                  (t[1] = e[4]),
                  (t[2] = e[8]),
                  (t[3] = e[12]),
                  (t[4] = e[1]),
                  (t[5] = e[5]),
                  (t[6] = e[9]),
                  (t[7] = e[13]),
                  (t[8] = e[2]),
                  (t[9] = e[6]),
                  (t[10] = e[10]),
                  (t[11] = e[14]),
                  (t[12] = e[3]),
                  (t[13] = e[7]),
                  (t[14] = e[11]),
                  (t[15] = e[15]),
                  t)
                : new we(
                      e[0],
                      e[1],
                      e[2],
                      e[3],
                      e[4],
                      e[5],
                      e[6],
                      e[7],
                      e[8],
                      e[9],
                      e[10],
                      e[11],
                      e[12],
                      e[13],
                      e[14],
                      e[15]
                  );
        }),
        (we.fromRotationTranslation = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, Re.ZERO)),
                ge.defined(n)
                    ? ((n[0] = e[0]),
                      (n[1] = e[1]),
                      (n[2] = e[2]),
                      (n[3] = 0),
                      (n[4] = e[3]),
                      (n[5] = e[4]),
                      (n[6] = e[5]),
                      (n[7] = 0),
                      (n[8] = e[6]),
                      (n[9] = e[7]),
                      (n[10] = e[8]),
                      (n[11] = 0),
                      (n[12] = t.x),
                      (n[13] = t.y),
                      (n[14] = t.z),
                      (n[15] = 1),
                      n)
                    : new we(
                          e[0],
                          e[3],
                          e[6],
                          t.x,
                          e[1],
                          e[4],
                          e[7],
                          t.y,
                          e[2],
                          e[5],
                          e[8],
                          t.z,
                          0,
                          0,
                          0,
                          1
                      )
            );
        }),
        (we.fromTranslationQuaternionRotationScale = function (e, t, n, r) {
            ge.defined(r) || (r = new we());
            var o = n.x,
                i = n.y,
                n = n.z,
                a = t.x * t.x,
                s = t.x * t.y,
                u = t.x * t.z,
                c = t.x * t.w,
                l = t.y * t.y,
                d = t.y * t.z,
                f = t.y * t.w,
                h = t.z * t.z,
                p = t.z * t.w,
                t = t.w * t.w,
                m = 2 * (s - p),
                E = 2 * (u + f),
                s = 2 * (s + p),
                p = l - a - h + t,
                _ = 2 * (d - c),
                u = 2 * (u - f),
                f = 2 * (d + c),
                d = -a - l + h + t;
            return (
                (r[0] = (a - l - h + t) * o),
                (r[1] = s * o),
                (r[2] = u * o),
                (r[3] = 0),
                (r[4] = m * i),
                (r[5] = p * i),
                (r[6] = f * i),
                (r[7] = 0),
                (r[8] = E * n),
                (r[9] = _ * n),
                (r[10] = d * n),
                (r[11] = 0),
                (r[12] = e.x),
                (r[13] = e.y),
                (r[14] = e.z),
                (r[15] = 1),
                r
            );
        }),
        (we.fromTranslationRotationScale = function (e, t) {
            return we.fromTranslationQuaternionRotationScale(
                e.translation,
                e.rotation,
                e.scale,
                t
            );
        }),
        (we.fromTranslation = function (e, t) {
            return we.fromRotationTranslation(B.IDENTITY, e, t);
        }),
        (we.fromScale = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e.x),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = 0),
                  (t[5] = e.y),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = 0),
                  (t[9] = 0),
                  (t[10] = e.z),
                  (t[11] = 0),
                  (t[12] = 0),
                  (t[13] = 0),
                  (t[14] = 0),
                  (t[15] = 1),
                  t)
                : new we(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1);
        }),
        (we.fromUniformScale = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e),
                  (t[1] = 0),
                  (t[2] = 0),
                  (t[3] = 0),
                  (t[4] = 0),
                  (t[5] = e),
                  (t[6] = 0),
                  (t[7] = 0),
                  (t[8] = 0),
                  (t[9] = 0),
                  (t[10] = e),
                  (t[11] = 0),
                  (t[12] = 0),
                  (t[13] = 0),
                  (t[14] = 0),
                  (t[15] = 1),
                  t)
                : new we(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
        }),
        (we.fromRotation = function (e, t) {
            return (
                ((t = ge.defined(t) ? t : new we())[0] = e[0]),
                (t[1] = e[1]),
                (t[2] = e[2]),
                (t[3] = 0),
                (t[4] = e[3]),
                (t[5] = e[4]),
                (t[6] = e[5]),
                (t[7] = 0),
                (t[8] = e[6]),
                (t[9] = e[7]),
                (t[10] = e[8]),
                (t[11] = 0),
                (t[12] = 0),
                (t[13] = 0),
                (t[14] = 0),
                (t[15] = 1),
                t
            );
        });
    const Ue = new Re(),
        De = new Re(),
        ze = new Re(),
        Fe =
            ((we.fromCamera = function (e, t) {
                var n = e.position,
                    r = e.direction,
                    e = e.up,
                    r =
                        (Re.normalize(r, Ue),
                        Re.normalize(Re.cross(Ue, e, De), De),
                        Re.normalize(Re.cross(De, Ue, ze), ze),
                        De.x),
                    e = De.y,
                    o = De.z,
                    i = Ue.x,
                    a = Ue.y,
                    s = Ue.z,
                    u = ze.x,
                    c = ze.y,
                    l = ze.z,
                    d = n.x,
                    f = n.y,
                    n = n.z,
                    h = r * -d + e * -f + o * -n,
                    p = u * -d + c * -f + l * -n,
                    d = i * d + a * f + s * n;
                return ge.defined(t)
                    ? ((t[0] = r),
                      (t[1] = u),
                      (t[2] = -i),
                      (t[3] = 0),
                      (t[4] = e),
                      (t[5] = c),
                      (t[6] = -a),
                      (t[7] = 0),
                      (t[8] = o),
                      (t[9] = l),
                      (t[10] = -s),
                      (t[11] = 0),
                      (t[12] = h),
                      (t[13] = p),
                      (t[14] = d),
                      (t[15] = 1),
                      t)
                    : new we(r, e, o, h, u, c, l, p, -i, -a, -s, d, 0, 0, 0, 1);
            }),
            (we.computePerspectiveFieldOfView = function (e, t, n, r, o) {
                var e = 1 / Math.tan(0.5 * e),
                    i = (r + n) / (n - r),
                    n = (2 * r * n) / (n - r);
                return (
                    (o[0] = e / t),
                    (o[1] = 0),
                    (o[2] = 0),
                    (o[3] = 0),
                    (o[4] = 0),
                    (o[5] = e),
                    (o[6] = 0),
                    (o[7] = 0),
                    (o[8] = 0),
                    (o[9] = 0),
                    (o[10] = i),
                    (o[11] = -1),
                    (o[12] = 0),
                    (o[13] = 0),
                    (o[14] = n),
                    (o[15] = 0),
                    o
                );
            }),
            (we.computeOrthographicOffCenter = function (e, t, n, r, o, i, a) {
                var s = 1 / (t - e),
                    u = 1 / (r - n),
                    c = 1 / (i - o),
                    t = -(t + e) * s,
                    e = -(r + n) * u,
                    r = -(i + o) * c;
                return (
                    (u *= 2),
                    (c *= -2),
                    (a[0] = s *= 2),
                    (a[1] = 0),
                    (a[2] = 0),
                    (a[3] = 0),
                    (a[4] = 0),
                    (a[5] = u),
                    (a[6] = 0),
                    (a[7] = 0),
                    (a[8] = 0),
                    (a[9] = 0),
                    (a[10] = c),
                    (a[11] = 0),
                    (a[12] = t),
                    (a[13] = e),
                    (a[14] = r),
                    (a[15] = 1),
                    a
                );
            }),
            (we.computePerspectiveOffCenter = function (e, t, n, r, o, i, a) {
                var s = (2 * o) / (r - n),
                    u = (t + e) / (t - e),
                    r = (r + n) / (r - n),
                    n = -(i + o) / (i - o),
                    i = (-2 * i * o) / (i - o);
                return (
                    (a[0] = (2 * o) / (t - e)),
                    (a[1] = 0),
                    (a[2] = 0),
                    (a[3] = 0),
                    (a[4] = 0),
                    (a[5] = s),
                    (a[6] = 0),
                    (a[7] = 0),
                    (a[8] = u),
                    (a[9] = r),
                    (a[10] = n),
                    (a[11] = -1),
                    (a[12] = 0),
                    (a[13] = 0),
                    (a[14] = i),
                    (a[15] = 0),
                    a
                );
            }),
            (we.computeInfinitePerspectiveOffCenter = function (
                e,
                t,
                n,
                r,
                o,
                i
            ) {
                var a = (2 * o) / (r - n),
                    s = (t + e) / (t - e),
                    r = (r + n) / (r - n),
                    n = -2 * o;
                return (
                    (i[0] = (2 * o) / (t - e)),
                    (i[1] = 0),
                    (i[2] = 0),
                    (i[3] = 0),
                    (i[4] = 0),
                    (i[5] = a),
                    (i[6] = 0),
                    (i[7] = 0),
                    (i[8] = s),
                    (i[9] = r),
                    (i[10] = -1),
                    (i[11] = -1),
                    (i[12] = 0),
                    (i[13] = 0),
                    (i[14] = n),
                    (i[15] = 0),
                    i
                );
            }),
            (we.computeViewportTransformation = function (e, t, n, r) {
                ge.defined(r) || (r = new we()),
                    (e = ge.defaultValue(e, ge.defaultValue.EMPTY_OBJECT));
                var o = ge.defaultValue(e.x, 0),
                    i = ge.defaultValue(e.y, 0),
                    a = ge.defaultValue(e.width, 0),
                    e = ge.defaultValue(e.height, 0),
                    a = ((t = ge.defaultValue(t, 0)), 0.5 * a),
                    e = 0.5 * e,
                    n = 0.5 * ((n = ge.defaultValue(n, 1)) - t),
                    s = e,
                    u = n,
                    o = o + a,
                    i = i + e,
                    e = t + n;
                return (
                    (r[0] = a),
                    (r[1] = 0),
                    (r[2] = 0),
                    (r[3] = 0),
                    (r[4] = 0),
                    (r[5] = s),
                    (r[6] = 0),
                    (r[7] = 0),
                    (r[8] = 0),
                    (r[9] = 0),
                    (r[10] = u),
                    (r[11] = 0),
                    (r[12] = o),
                    (r[13] = i),
                    (r[14] = e),
                    (r[15] = 1),
                    r
                );
            }),
            (we.computeView = function (e, t, n, r, o) {
                return (
                    (o[0] = r.x),
                    (o[1] = n.x),
                    (o[2] = -t.x),
                    (o[3] = 0),
                    (o[4] = r.y),
                    (o[5] = n.y),
                    (o[6] = -t.y),
                    (o[7] = 0),
                    (o[8] = r.z),
                    (o[9] = n.z),
                    (o[10] = -t.z),
                    (o[11] = 0),
                    (o[12] = -Re.dot(r, e)),
                    (o[13] = -Re.dot(n, e)),
                    (o[14] = Re.dot(t, e)),
                    (o[15] = 1),
                    o
                );
            }),
            (we.toArray = function (e, t) {
                return ge.defined(t)
                    ? ((t[0] = e[0]),
                      (t[1] = e[1]),
                      (t[2] = e[2]),
                      (t[3] = e[3]),
                      (t[4] = e[4]),
                      (t[5] = e[5]),
                      (t[6] = e[6]),
                      (t[7] = e[7]),
                      (t[8] = e[8]),
                      (t[9] = e[9]),
                      (t[10] = e[10]),
                      (t[11] = e[11]),
                      (t[12] = e[12]),
                      (t[13] = e[13]),
                      (t[14] = e[14]),
                      (t[15] = e[15]),
                      t)
                    : [
                          e[0],
                          e[1],
                          e[2],
                          e[3],
                          e[4],
                          e[5],
                          e[6],
                          e[7],
                          e[8],
                          e[9],
                          e[10],
                          e[11],
                          e[12],
                          e[13],
                          e[14],
                          e[15],
                      ];
            }),
            (we.getElementIndex = function (e, t) {
                return 4 * e + t;
            }),
            (we.getColumn = function (e, t, n) {
                var t = 4 * t,
                    r = e[t],
                    o = e[1 + t],
                    i = e[2 + t],
                    e = e[3 + t];
                return (n.x = r), (n.y = o), (n.z = i), (n.w = e), n;
            }),
            (we.setColumn = function (e, t, n, r) {
                t *= 4;
                return (
                    ((r = we.clone(e, r))[t] = n.x),
                    (r[1 + t] = n.y),
                    (r[2 + t] = n.z),
                    (r[3 + t] = n.w),
                    r
                );
            }),
            (we.getRow = function (e, t, n) {
                var r = e[t],
                    o = e[t + 4],
                    i = e[t + 8],
                    e = e[t + 12];
                return (n.x = r), (n.y = o), (n.z = i), (n.w = e), n;
            }),
            (we.setRow = function (e, t, n, r) {
                return (
                    ((r = we.clone(e, r))[t] = n.x),
                    (r[t + 4] = n.y),
                    (r[t + 8] = n.z),
                    (r[t + 12] = n.w),
                    r
                );
            }),
            (we.setTranslation = function (e, t, n) {
                return (
                    (n[0] = e[0]),
                    (n[1] = e[1]),
                    (n[2] = e[2]),
                    (n[3] = e[3]),
                    (n[4] = e[4]),
                    (n[5] = e[5]),
                    (n[6] = e[6]),
                    (n[7] = e[7]),
                    (n[8] = e[8]),
                    (n[9] = e[9]),
                    (n[10] = e[10]),
                    (n[11] = e[11]),
                    (n[12] = t.x),
                    (n[13] = t.y),
                    (n[14] = t.z),
                    (n[15] = e[15]),
                    n
                );
            }),
            new Re()),
        Le =
            ((we.setScale = function (e, t, n) {
                var r = we.getScale(e, Fe),
                    o = t.x / r.x,
                    i = t.y / r.y,
                    t = t.z / r.z;
                return (
                    (n[0] = e[0] * o),
                    (n[1] = e[1] * o),
                    (n[2] = e[2] * o),
                    (n[3] = e[3]),
                    (n[4] = e[4] * i),
                    (n[5] = e[5] * i),
                    (n[6] = e[6] * i),
                    (n[7] = e[7]),
                    (n[8] = e[8] * t),
                    (n[9] = e[9] * t),
                    (n[10] = e[10] * t),
                    (n[11] = e[11]),
                    (n[12] = e[12]),
                    (n[13] = e[13]),
                    (n[14] = e[14]),
                    (n[15] = e[15]),
                    n
                );
            }),
            new Re()),
        Be =
            ((we.setUniformScale = function (e, t, n) {
                var r = we.getScale(e, Le),
                    o = t / r.x,
                    i = t / r.y,
                    t = t / r.z;
                return (
                    (n[0] = e[0] * o),
                    (n[1] = e[1] * o),
                    (n[2] = e[2] * o),
                    (n[3] = e[3]),
                    (n[4] = e[4] * i),
                    (n[5] = e[5] * i),
                    (n[6] = e[6] * i),
                    (n[7] = e[7]),
                    (n[8] = e[8] * t),
                    (n[9] = e[9] * t),
                    (n[10] = e[10] * t),
                    (n[11] = e[11]),
                    (n[12] = e[12]),
                    (n[13] = e[13]),
                    (n[14] = e[14]),
                    (n[15] = e[15]),
                    n
                );
            }),
            new Re()),
        qe =
            ((we.getScale = function (e, t) {
                return (
                    (t.x = Re.magnitude(Re.fromElements(e[0], e[1], e[2], Be))),
                    (t.y = Re.magnitude(Re.fromElements(e[4], e[5], e[6], Be))),
                    (t.z = Re.magnitude(
                        Re.fromElements(e[8], e[9], e[10], Be)
                    )),
                    t
                );
            }),
            new Re()),
        Ve =
            ((we.getMaximumScale = function (e) {
                return we.getScale(e, qe), Re.maximumComponent(qe);
            }),
            new Re()),
        ke =
            ((we.setRotation = function (e, t, n) {
                var r = we.getScale(e, Ve);
                return (
                    (n[0] = t[0] * r.x),
                    (n[1] = t[1] * r.x),
                    (n[2] = t[2] * r.x),
                    (n[3] = e[3]),
                    (n[4] = t[3] * r.y),
                    (n[5] = t[4] * r.y),
                    (n[6] = t[5] * r.y),
                    (n[7] = e[7]),
                    (n[8] = t[6] * r.z),
                    (n[9] = t[7] * r.z),
                    (n[10] = t[8] * r.z),
                    (n[11] = e[11]),
                    (n[12] = e[12]),
                    (n[13] = e[13]),
                    (n[14] = e[14]),
                    (n[15] = e[15]),
                    n
                );
            }),
            new Re()),
        Ge =
            ((we.getRotation = function (e, t) {
                var n = we.getScale(e, ke);
                return (
                    (t[0] = e[0] / n.x),
                    (t[1] = e[1] / n.x),
                    (t[2] = e[2] / n.x),
                    (t[3] = e[4] / n.y),
                    (t[4] = e[5] / n.y),
                    (t[5] = e[6] / n.y),
                    (t[6] = e[8] / n.z),
                    (t[7] = e[9] / n.z),
                    (t[8] = e[10] / n.z),
                    t
                );
            }),
            (we.multiply = function (e, t, n) {
                var r = e[0],
                    o = e[1],
                    i = e[2],
                    a = e[3],
                    s = e[4],
                    u = e[5],
                    c = e[6],
                    l = e[7],
                    d = e[8],
                    f = e[9],
                    h = e[10],
                    p = e[11],
                    m = e[12],
                    E = e[13],
                    _ = e[14],
                    e = e[15],
                    y = t[0],
                    g = t[1],
                    T = t[2],
                    R = t[3],
                    A = t[4],
                    S = t[5],
                    w = t[6],
                    I = t[7],
                    v = t[8],
                    O = t[9],
                    N = t[10],
                    x = t[11],
                    M = t[12],
                    P = t[13],
                    b = t[14],
                    t = t[15],
                    C = o * y + u * g + f * T + E * R,
                    U = i * y + c * g + h * T + _ * R,
                    D = a * y + l * g + p * T + e * R,
                    z = r * A + s * S + d * w + m * I,
                    F = o * A + u * S + f * w + E * I,
                    L = i * A + c * S + h * w + _ * I,
                    A = a * A + l * S + p * w + e * I,
                    S = r * v + s * O + d * N + m * x,
                    w = o * v + u * O + f * N + E * x,
                    I = i * v + c * O + h * N + _ * x,
                    v = a * v + l * O + p * N + e * x,
                    O = r * M + s * P + d * b + m * t,
                    N = o * M + u * P + f * b + E * t,
                    x = i * M + c * P + h * b + _ * t,
                    o = a * M + l * P + p * b + e * t;
                return (
                    (n[0] = r * y + s * g + d * T + m * R),
                    (n[1] = C),
                    (n[2] = U),
                    (n[3] = D),
                    (n[4] = z),
                    (n[5] = F),
                    (n[6] = L),
                    (n[7] = A),
                    (n[8] = S),
                    (n[9] = w),
                    (n[10] = I),
                    (n[11] = v),
                    (n[12] = O),
                    (n[13] = N),
                    (n[14] = x),
                    (n[15] = o),
                    n
                );
            }),
            (we.add = function (e, t, n) {
                return (
                    (n[0] = e[0] + t[0]),
                    (n[1] = e[1] + t[1]),
                    (n[2] = e[2] + t[2]),
                    (n[3] = e[3] + t[3]),
                    (n[4] = e[4] + t[4]),
                    (n[5] = e[5] + t[5]),
                    (n[6] = e[6] + t[6]),
                    (n[7] = e[7] + t[7]),
                    (n[8] = e[8] + t[8]),
                    (n[9] = e[9] + t[9]),
                    (n[10] = e[10] + t[10]),
                    (n[11] = e[11] + t[11]),
                    (n[12] = e[12] + t[12]),
                    (n[13] = e[13] + t[13]),
                    (n[14] = e[14] + t[14]),
                    (n[15] = e[15] + t[15]),
                    n
                );
            }),
            (we.subtract = function (e, t, n) {
                return (
                    (n[0] = e[0] - t[0]),
                    (n[1] = e[1] - t[1]),
                    (n[2] = e[2] - t[2]),
                    (n[3] = e[3] - t[3]),
                    (n[4] = e[4] - t[4]),
                    (n[5] = e[5] - t[5]),
                    (n[6] = e[6] - t[6]),
                    (n[7] = e[7] - t[7]),
                    (n[8] = e[8] - t[8]),
                    (n[9] = e[9] - t[9]),
                    (n[10] = e[10] - t[10]),
                    (n[11] = e[11] - t[11]),
                    (n[12] = e[12] - t[12]),
                    (n[13] = e[13] - t[13]),
                    (n[14] = e[14] - t[14]),
                    (n[15] = e[15] - t[15]),
                    n
                );
            }),
            (we.multiplyTransformation = function (e, t, n) {
                var r = e[0],
                    o = e[1],
                    i = e[2],
                    a = e[4],
                    s = e[5],
                    u = e[6],
                    c = e[8],
                    l = e[9],
                    d = e[10],
                    f = e[12],
                    h = e[13],
                    e = e[14],
                    p = t[0],
                    m = t[1],
                    E = t[2],
                    _ = t[4],
                    y = t[5],
                    g = t[6],
                    T = t[8],
                    R = t[9],
                    A = t[10],
                    S = t[12],
                    w = t[13],
                    t = t[14],
                    I = o * p + s * m + l * E,
                    v = i * p + u * m + d * E,
                    O = r * _ + a * y + c * g,
                    N = o * _ + s * y + l * g,
                    _ = i * _ + u * y + d * g,
                    y = r * T + a * R + c * A,
                    g = o * T + s * R + l * A,
                    T = i * T + u * R + d * A,
                    R = r * S + a * w + c * t + f,
                    A = o * S + s * w + l * t + h,
                    f = i * S + u * w + d * t + e;
                return (
                    (n[0] = r * p + a * m + c * E),
                    (n[1] = I),
                    (n[2] = v),
                    (n[3] = 0),
                    (n[4] = O),
                    (n[5] = N),
                    (n[6] = _),
                    (n[7] = 0),
                    (n[8] = y),
                    (n[9] = g),
                    (n[10] = T),
                    (n[11] = 0),
                    (n[12] = R),
                    (n[13] = A),
                    (n[14] = f),
                    (n[15] = 1),
                    n
                );
            }),
            (we.multiplyByMatrix3 = function (e, t, n) {
                var r = e[0],
                    o = e[1],
                    i = e[2],
                    a = e[4],
                    s = e[5],
                    u = e[6],
                    c = e[8],
                    l = e[9],
                    d = e[10],
                    f = t[0],
                    h = t[1],
                    p = t[2],
                    m = t[3],
                    E = t[4],
                    _ = t[5],
                    y = t[6],
                    g = t[7],
                    t = t[8],
                    T = o * f + s * h + l * p,
                    R = i * f + u * h + d * p,
                    A = r * m + a * E + c * _,
                    S = o * m + s * E + l * _,
                    m = i * m + u * E + d * _,
                    E = r * y + a * g + c * t,
                    _ = o * y + s * g + l * t,
                    o = i * y + u * g + d * t;
                return (
                    (n[0] = r * f + a * h + c * p),
                    (n[1] = T),
                    (n[2] = R),
                    (n[3] = 0),
                    (n[4] = A),
                    (n[5] = S),
                    (n[6] = m),
                    (n[7] = 0),
                    (n[8] = E),
                    (n[9] = _),
                    (n[10] = o),
                    (n[11] = 0),
                    (n[12] = e[12]),
                    (n[13] = e[13]),
                    (n[14] = e[14]),
                    (n[15] = e[15]),
                    n
                );
            }),
            (we.multiplyByTranslation = function (e, t, n) {
                var r = t.x,
                    o = t.y,
                    t = t.z,
                    i = r * e[0] + o * e[4] + t * e[8] + e[12],
                    a = r * e[1] + o * e[5] + t * e[9] + e[13],
                    r = r * e[2] + o * e[6] + t * e[10] + e[14];
                return (
                    (n[0] = e[0]),
                    (n[1] = e[1]),
                    (n[2] = e[2]),
                    (n[3] = e[3]),
                    (n[4] = e[4]),
                    (n[5] = e[5]),
                    (n[6] = e[6]),
                    (n[7] = e[7]),
                    (n[8] = e[8]),
                    (n[9] = e[9]),
                    (n[10] = e[10]),
                    (n[11] = e[11]),
                    (n[12] = i),
                    (n[13] = a),
                    (n[14] = r),
                    (n[15] = e[15]),
                    n
                );
            }),
            (we.multiplyByScale = function (e, t, n) {
                var r = t.x,
                    o = t.y,
                    t = t.z;
                return 1 === r && 1 === o && 1 === t
                    ? we.clone(e, n)
                    : ((n[0] = r * e[0]),
                      (n[1] = r * e[1]),
                      (n[2] = r * e[2]),
                      (n[3] = e[3]),
                      (n[4] = o * e[4]),
                      (n[5] = o * e[5]),
                      (n[6] = o * e[6]),
                      (n[7] = e[7]),
                      (n[8] = t * e[8]),
                      (n[9] = t * e[9]),
                      (n[10] = t * e[10]),
                      (n[11] = e[11]),
                      (n[12] = e[12]),
                      (n[13] = e[13]),
                      (n[14] = e[14]),
                      (n[15] = e[15]),
                      n);
            }),
            (we.multiplyByUniformScale = function (e, t, n) {
                return (
                    (n[0] = e[0] * t),
                    (n[1] = e[1] * t),
                    (n[2] = e[2] * t),
                    (n[3] = e[3]),
                    (n[4] = e[4] * t),
                    (n[5] = e[5] * t),
                    (n[6] = e[6] * t),
                    (n[7] = e[7]),
                    (n[8] = e[8] * t),
                    (n[9] = e[9] * t),
                    (n[10] = e[10] * t),
                    (n[11] = e[11]),
                    (n[12] = e[12]),
                    (n[13] = e[13]),
                    (n[14] = e[14]),
                    (n[15] = e[15]),
                    n
                );
            }),
            (we.multiplyByVector = function (e, t, n) {
                var r = t.x,
                    o = t.y,
                    i = t.z,
                    t = t.w,
                    a = e[0] * r + e[4] * o + e[8] * i + e[12] * t,
                    s = e[1] * r + e[5] * o + e[9] * i + e[13] * t,
                    u = e[2] * r + e[6] * o + e[10] * i + e[14] * t,
                    r = e[3] * r + e[7] * o + e[11] * i + e[15] * t;
                return (n.x = a), (n.y = s), (n.z = u), (n.w = r), n;
            }),
            (we.multiplyByPointAsVector = function (e, t, n) {
                var r = t.x,
                    o = t.y,
                    t = t.z,
                    i = e[0] * r + e[4] * o + e[8] * t,
                    a = e[1] * r + e[5] * o + e[9] * t,
                    r = e[2] * r + e[6] * o + e[10] * t;
                return (n.x = i), (n.y = a), (n.z = r), n;
            }),
            (we.multiplyByPoint = function (e, t, n) {
                var r = t.x,
                    o = t.y,
                    t = t.z,
                    i = e[0] * r + e[4] * o + e[8] * t + e[12],
                    a = e[1] * r + e[5] * o + e[9] * t + e[13],
                    r = e[2] * r + e[6] * o + e[10] * t + e[14];
                return (n.x = i), (n.y = a), (n.z = r), n;
            }),
            (we.multiplyByScalar = function (e, t, n) {
                return (
                    (n[0] = e[0] * t),
                    (n[1] = e[1] * t),
                    (n[2] = e[2] * t),
                    (n[3] = e[3] * t),
                    (n[4] = e[4] * t),
                    (n[5] = e[5] * t),
                    (n[6] = e[6] * t),
                    (n[7] = e[7] * t),
                    (n[8] = e[8] * t),
                    (n[9] = e[9] * t),
                    (n[10] = e[10] * t),
                    (n[11] = e[11] * t),
                    (n[12] = e[12] * t),
                    (n[13] = e[13] * t),
                    (n[14] = e[14] * t),
                    (n[15] = e[15] * t),
                    n
                );
            }),
            (we.negate = function (e, t) {
                return (
                    (t[0] = -e[0]),
                    (t[1] = -e[1]),
                    (t[2] = -e[2]),
                    (t[3] = -e[3]),
                    (t[4] = -e[4]),
                    (t[5] = -e[5]),
                    (t[6] = -e[6]),
                    (t[7] = -e[7]),
                    (t[8] = -e[8]),
                    (t[9] = -e[9]),
                    (t[10] = -e[10]),
                    (t[11] = -e[11]),
                    (t[12] = -e[12]),
                    (t[13] = -e[13]),
                    (t[14] = -e[14]),
                    (t[15] = -e[15]),
                    t
                );
            }),
            (we.transpose = function (e, t) {
                var n = e[1],
                    r = e[2],
                    o = e[3],
                    i = e[6],
                    a = e[7],
                    s = e[11];
                return (
                    (t[0] = e[0]),
                    (t[1] = e[4]),
                    (t[2] = e[8]),
                    (t[3] = e[12]),
                    (t[4] = n),
                    (t[5] = e[5]),
                    (t[6] = e[9]),
                    (t[7] = e[13]),
                    (t[8] = r),
                    (t[9] = i),
                    (t[10] = e[10]),
                    (t[11] = e[14]),
                    (t[12] = o),
                    (t[13] = a),
                    (t[14] = s),
                    (t[15] = e[15]),
                    t
                );
            }),
            (we.abs = function (e, t) {
                return (
                    (t[0] = Math.abs(e[0])),
                    (t[1] = Math.abs(e[1])),
                    (t[2] = Math.abs(e[2])),
                    (t[3] = Math.abs(e[3])),
                    (t[4] = Math.abs(e[4])),
                    (t[5] = Math.abs(e[5])),
                    (t[6] = Math.abs(e[6])),
                    (t[7] = Math.abs(e[7])),
                    (t[8] = Math.abs(e[8])),
                    (t[9] = Math.abs(e[9])),
                    (t[10] = Math.abs(e[10])),
                    (t[11] = Math.abs(e[11])),
                    (t[12] = Math.abs(e[12])),
                    (t[13] = Math.abs(e[13])),
                    (t[14] = Math.abs(e[14])),
                    (t[15] = Math.abs(e[15])),
                    t
                );
            }),
            (we.equals = function (e, t) {
                return (
                    e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        e[12] === t[12] &&
                        e[13] === t[13] &&
                        e[14] === t[14] &&
                        e[0] === t[0] &&
                        e[1] === t[1] &&
                        e[2] === t[2] &&
                        e[4] === t[4] &&
                        e[5] === t[5] &&
                        e[6] === t[6] &&
                        e[8] === t[8] &&
                        e[9] === t[9] &&
                        e[10] === t[10] &&
                        e[3] === t[3] &&
                        e[7] === t[7] &&
                        e[11] === t[11] &&
                        e[15] === t[15])
                );
            }),
            (we.equalsEpsilon = function (e, t, n) {
                return (
                    (n = ge.defaultValue(n, 0)),
                    e === t ||
                        (ge.defined(e) &&
                            ge.defined(t) &&
                            Math.abs(e[0] - t[0]) <= n &&
                            Math.abs(e[1] - t[1]) <= n &&
                            Math.abs(e[2] - t[2]) <= n &&
                            Math.abs(e[3] - t[3]) <= n &&
                            Math.abs(e[4] - t[4]) <= n &&
                            Math.abs(e[5] - t[5]) <= n &&
                            Math.abs(e[6] - t[6]) <= n &&
                            Math.abs(e[7] - t[7]) <= n &&
                            Math.abs(e[8] - t[8]) <= n &&
                            Math.abs(e[9] - t[9]) <= n &&
                            Math.abs(e[10] - t[10]) <= n &&
                            Math.abs(e[11] - t[11]) <= n &&
                            Math.abs(e[12] - t[12]) <= n &&
                            Math.abs(e[13] - t[13]) <= n &&
                            Math.abs(e[14] - t[14]) <= n &&
                            Math.abs(e[15] - t[15]) <= n)
                );
            }),
            (we.getTranslation = function (e, t) {
                return (t.x = e[12]), (t.y = e[13]), (t.z = e[14]), t;
            }),
            (we.getMatrix3 = function (e, t) {
                return (
                    (t[0] = e[0]),
                    (t[1] = e[1]),
                    (t[2] = e[2]),
                    (t[3] = e[4]),
                    (t[4] = e[5]),
                    (t[5] = e[6]),
                    (t[6] = e[8]),
                    (t[7] = e[9]),
                    (t[8] = e[10]),
                    t
                );
            }),
            new B()),
        We = new B(),
        He = new q(),
        Xe = new q(0, 0, 0, 1),
        je =
            ((we.inverse = function (e, t) {
                var n = e[0],
                    r = e[4],
                    o = e[8],
                    i = e[12],
                    a = e[1],
                    s = e[5],
                    u = e[9],
                    c = e[13],
                    l = e[2],
                    d = e[6],
                    f = e[10],
                    h = e[14],
                    p = e[3],
                    m = e[7],
                    E = e[11],
                    _ = e[15],
                    y = f * _,
                    g = h * E,
                    T = d * _,
                    R = h * m,
                    A = d * E,
                    S = f * m,
                    w = l * _,
                    I = h * p,
                    v = l * E,
                    O = f * p,
                    N = l * m,
                    x = d * p,
                    M = y * s + R * u + A * c - (g * s + T * u + S * c),
                    P = g * a + w * u + O * c - (y * a + I * u + v * c),
                    b = T * a + I * s + N * c - (R * a + w * s + x * c),
                    C = S * a + v * s + x * u - (A * a + O * s + N * u),
                    U = g * r + T * o + S * i - (y * r + R * o + A * i),
                    D = y * n + I * o + v * i - (g * n + w * o + O * i),
                    z = R * n + w * r + x * i - (T * n + I * r + N * i),
                    F = A * n + O * r + N * o - (S * n + v * r + x * o),
                    L =
                        (y = o * c) * m +
                        (R = i * s) * E +
                        (A = r * u) * _ -
                        ((g = i * u) * m + (T = r * c) * E + (S = o * s) * _),
                    c =
                        g * p +
                        (w = n * c) * E +
                        (O = o * a) * _ -
                        (y * p + (I = i * a) * E + (v = n * u) * _),
                    u =
                        T * p +
                        I * m +
                        (N = n * s) * _ -
                        (R * p + w * m + (x = r * a) * _),
                    s = S * p + v * m + x * E - (A * p + O * m + N * E),
                    a = T * f + S * h + g * d - (A * h + y * d + R * f),
                    _ = v * h + y * l + I * f - (w * f + O * h + g * l),
                    p = w * d + x * h + R * l - (N * h + T * l + I * d),
                    m = N * f + A * l + O * d - (v * d + x * f + S * l),
                    E = n * M + r * P + o * b + i * C;
                if (Math.abs(E) < Te.EPSILON21) {
                    if (
                        B.equalsEpsilon(
                            we.getMatrix3(e, Ge),
                            We,
                            Te.EPSILON7
                        ) &&
                        q.equals(we.getRow(e, 3, He), Xe)
                    )
                        return (
                            (t[0] = 0),
                            (t[1] = 0),
                            (t[2] = 0),
                            (t[3] = 0),
                            (t[4] = 0),
                            (t[5] = 0),
                            (t[6] = 0),
                            (t[7] = 0),
                            (t[8] = 0),
                            (t[9] = 0),
                            (t[10] = 0),
                            (t[11] = 0),
                            (t[12] = -e[12]),
                            (t[13] = -e[13]),
                            (t[14] = -e[14]),
                            (t[15] = 1),
                            t
                        );
                    throw new Ce(
                        "matrix is not invertible because its determinate is zero."
                    );
                }
                return (
                    (t[0] = M * (E = 1 / E)),
                    (t[1] = P * E),
                    (t[2] = b * E),
                    (t[3] = C * E),
                    (t[4] = U * E),
                    (t[5] = D * E),
                    (t[6] = z * E),
                    (t[7] = F * E),
                    (t[8] = L * E),
                    (t[9] = c * E),
                    (t[10] = u * E),
                    (t[11] = s * E),
                    (t[12] = a * E),
                    (t[13] = _ * E),
                    (t[14] = p * E),
                    (t[15] = m * E),
                    t
                );
            }),
            (we.inverseTransformation = function (e, t) {
                var n = e[0],
                    r = e[1],
                    o = e[2],
                    i = e[4],
                    a = e[5],
                    s = e[6],
                    u = e[8],
                    c = e[9],
                    l = e[10],
                    d = e[12],
                    f = e[13],
                    e = e[14],
                    h = -n * d - r * f - o * e,
                    p = -i * d - a * f - s * e,
                    d = -u * d - c * f - l * e;
                return (
                    (t[0] = n),
                    (t[1] = i),
                    (t[2] = u),
                    (t[3] = 0),
                    (t[4] = r),
                    (t[5] = a),
                    (t[6] = c),
                    (t[7] = 0),
                    (t[8] = o),
                    (t[9] = s),
                    (t[10] = l),
                    (t[11] = 0),
                    (t[12] = h),
                    (t[13] = p),
                    (t[14] = d),
                    (t[15] = 1),
                    t
                );
            }),
            new we());
    function w(e, t, n, r) {
        (this.west = ge.defaultValue(e, 0)),
            (this.south = ge.defaultValue(t, 0)),
            (this.east = ge.defaultValue(n, 0)),
            (this.north = ge.defaultValue(r, 0));
    }
    (we.inverseTranspose = function (e, t) {
        return we.inverse(we.transpose(e, je), t);
    }),
        (we.IDENTITY = Object.freeze(
            new we(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
        )),
        (we.ZERO = Object.freeze(
            new we(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        )),
        (we.COLUMN0ROW0 = 0),
        (we.COLUMN0ROW1 = 1),
        (we.COLUMN0ROW2 = 2),
        (we.COLUMN0ROW3 = 3),
        (we.COLUMN1ROW0 = 4),
        (we.COLUMN1ROW1 = 5),
        (we.COLUMN1ROW2 = 6),
        (we.COLUMN1ROW3 = 7),
        (we.COLUMN2ROW0 = 8),
        (we.COLUMN2ROW1 = 9),
        (we.COLUMN2ROW2 = 10),
        (we.COLUMN2ROW3 = 11),
        (we.COLUMN3ROW0 = 12),
        (we.COLUMN3ROW1 = 13),
        (we.COLUMN3ROW2 = 14),
        (we.COLUMN3ROW3 = 15),
        Object.defineProperties(we.prototype, {
            length: {
                get: function () {
                    return we.packedLength;
                },
            },
        }),
        (we.prototype.clone = function (e) {
            return we.clone(this, e);
        }),
        (we.prototype.equals = function (e) {
            return we.equals(this, e);
        }),
        (we.equalsArray = function (e, t, n) {
            return (
                e[0] === t[n] &&
                e[1] === t[n + 1] &&
                e[2] === t[n + 2] &&
                e[3] === t[n + 3] &&
                e[4] === t[n + 4] &&
                e[5] === t[n + 5] &&
                e[6] === t[n + 6] &&
                e[7] === t[n + 7] &&
                e[8] === t[n + 8] &&
                e[9] === t[n + 9] &&
                e[10] === t[n + 10] &&
                e[11] === t[n + 11] &&
                e[12] === t[n + 12] &&
                e[13] === t[n + 13] &&
                e[14] === t[n + 14] &&
                e[15] === t[n + 15]
            );
        }),
        (we.prototype.equalsEpsilon = function (e, t) {
            return we.equalsEpsilon(this, e, t);
        }),
        (we.prototype.toString = function () {
            return (
                `(${this[0]}, ${this[4]}, ${this[8]}, ${this[12]})
` +
                `(${this[1]}, ${this[5]}, ${this[9]}, ${this[13]})
` +
                `(${this[2]}, ${this[6]}, ${this[10]}, ${this[14]})
` +
                `(${this[3]}, ${this[7]}, ${this[11]}, ${this[15]})`
            );
        }),
        Object.defineProperties(w.prototype, {
            width: {
                get: function () {
                    return w.computeWidth(this);
                },
            },
            height: {
                get: function () {
                    return w.computeHeight(this);
                },
            },
        }),
        (w.packedLength = 4),
        (w.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e.west),
                (t[n++] = e.south),
                (t[n++] = e.east),
                (t[n] = e.north),
                t
            );
        }),
        (w.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new w()).west = e[t++]),
                (n.south = e[t++]),
                (n.east = e[t++]),
                (n.north = e[t]),
                n
            );
        }),
        (w.computeWidth = function (e) {
            let t = e.east;
            e = e.west;
            return t < e && (t += Te.TWO_PI), t - e;
        }),
        (w.computeHeight = function (e) {
            return e.north - e.south;
        }),
        (w.fromDegrees = function (e, t, n, r, o) {
            return (
                (e = Te.toRadians(ge.defaultValue(e, 0))),
                (t = Te.toRadians(ge.defaultValue(t, 0))),
                (n = Te.toRadians(ge.defaultValue(n, 0))),
                (r = Te.toRadians(ge.defaultValue(r, 0))),
                ge.defined(o)
                    ? ((o.west = e),
                      (o.south = t),
                      (o.east = n),
                      (o.north = r),
                      o)
                    : new w(e, t, n, r)
            );
        }),
        (w.fromRadians = function (e, t, n, r, o) {
            return ge.defined(o)
                ? ((o.west = ge.defaultValue(e, 0)),
                  (o.south = ge.defaultValue(t, 0)),
                  (o.east = ge.defaultValue(n, 0)),
                  (o.north = ge.defaultValue(r, 0)),
                  o)
                : new w(e, t, n, r);
        }),
        (w.fromCartographicArray = function (n, e) {
            let r = Number.MAX_VALUE,
                o = -Number.MAX_VALUE,
                i = Number.MAX_VALUE,
                a = -Number.MAX_VALUE,
                s = Number.MAX_VALUE,
                u = -Number.MAX_VALUE;
            for (let e = 0, t = n.length; e < t; e++) {
                var c = n[e],
                    c =
                        ((r = Math.min(r, c.longitude)),
                        (o = Math.max(o, c.longitude)),
                        (s = Math.min(s, c.latitude)),
                        (u = Math.max(u, c.latitude)),
                        0 <= c.longitude
                            ? c.longitude
                            : c.longitude + Te.TWO_PI);
                (i = Math.min(i, c)), (a = Math.max(a, c));
            }
            return (
                o - r > a - i &&
                    ((r = i),
                    (o = a) > Te.PI && (o -= Te.TWO_PI),
                    r > Te.PI && (r -= Te.TWO_PI)),
                ge.defined(e)
                    ? ((e.west = r),
                      (e.south = s),
                      (e.east = o),
                      (e.north = u),
                      e)
                    : new w(r, s, o, u)
            );
        }),
        (w.fromCartesianArray = function (n, r, e) {
            r = ge.defaultValue(r, S.WGS84);
            let o = Number.MAX_VALUE,
                i = -Number.MAX_VALUE,
                a = Number.MAX_VALUE,
                s = -Number.MAX_VALUE,
                u = Number.MAX_VALUE,
                c = -Number.MAX_VALUE;
            for (let e = 0, t = n.length; e < t; e++) {
                var l = r.cartesianToCartographic(n[e]),
                    l =
                        ((o = Math.min(o, l.longitude)),
                        (i = Math.max(i, l.longitude)),
                        (u = Math.min(u, l.latitude)),
                        (c = Math.max(c, l.latitude)),
                        0 <= l.longitude
                            ? l.longitude
                            : l.longitude + Te.TWO_PI);
                (a = Math.min(a, l)), (s = Math.max(s, l));
            }
            return (
                i - o > s - a &&
                    ((o = a),
                    (i = s) > Te.PI && (i -= Te.TWO_PI),
                    o > Te.PI && (o -= Te.TWO_PI)),
                ge.defined(e)
                    ? ((e.west = o),
                      (e.south = u),
                      (e.east = i),
                      (e.north = c),
                      e)
                    : new w(o, u, i, c)
            );
        }),
        (w.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.west = e.west),
                      (t.south = e.south),
                      (t.east = e.east),
                      (t.north = e.north),
                      t)
                    : new w(e.west, e.south, e.east, e.north);
        }),
        (w.equalsEpsilon = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        Math.abs(e.west - t.west) <= n &&
                        Math.abs(e.south - t.south) <= n &&
                        Math.abs(e.east - t.east) <= n &&
                        Math.abs(e.north - t.north) <= n)
            );
        }),
        (w.prototype.clone = function (e) {
            return w.clone(this, e);
        }),
        (w.prototype.equals = function (e) {
            return w.equals(this, e);
        }),
        (w.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e.west === t.west &&
                    e.south === t.south &&
                    e.east === t.east &&
                    e.north === t.north)
            );
        }),
        (w.prototype.equalsEpsilon = function (e, t) {
            return w.equalsEpsilon(this, e, t);
        }),
        (w.validate = function (e) {}),
        (w.southwest = function (e, t) {
            return ge.defined(t)
                ? ((t.longitude = e.west),
                  (t.latitude = e.south),
                  (t.height = 0),
                  t)
                : new Se(e.west, e.south);
        }),
        (w.northwest = function (e, t) {
            return ge.defined(t)
                ? ((t.longitude = e.west),
                  (t.latitude = e.north),
                  (t.height = 0),
                  t)
                : new Se(e.west, e.north);
        }),
        (w.northeast = function (e, t) {
            return ge.defined(t)
                ? ((t.longitude = e.east),
                  (t.latitude = e.north),
                  (t.height = 0),
                  t)
                : new Se(e.east, e.north);
        }),
        (w.southeast = function (e, t) {
            return ge.defined(t)
                ? ((t.longitude = e.east),
                  (t.latitude = e.south),
                  (t.height = 0),
                  t)
                : new Se(e.east, e.south);
        }),
        (w.center = function (e, t) {
            let n = e.east;
            var r = e.west,
                r =
                    (n < r && (n += Te.TWO_PI),
                    Te.negativePiToPi(0.5 * (r + n))),
                e = 0.5 * (e.south + e.north);
            return ge.defined(t)
                ? ((t.longitude = r), (t.latitude = e), (t.height = 0), t)
                : new Se(r, e);
        }),
        (w.intersection = function (e, t, n) {
            let r = e.east,
                o = e.west,
                i = t.east,
                a = t.west;
            r < o && 0 < i
                ? (r += Te.TWO_PI)
                : i < a && 0 < r && (i += Te.TWO_PI),
                r < o && a < 0
                    ? (a += Te.TWO_PI)
                    : i < a && o < 0 && (o += Te.TWO_PI);
            var s = Te.negativePiToPi(Math.max(o, a)),
                u = Te.negativePiToPi(Math.min(r, i));
            if (!((e.west < e.east || t.west < t.east) && u <= s)) {
                var c = Math.max(e.south, t.south),
                    e = Math.min(e.north, t.north);
                if (!(e <= c))
                    return ge.defined(n)
                        ? ((n.west = s),
                          (n.south = c),
                          (n.east = u),
                          (n.north = e),
                          n)
                        : new w(s, c, u, e);
            }
        }),
        (w.simpleIntersection = function (e, t, n) {
            var r = Math.max(e.west, t.west),
                o = Math.max(e.south, t.south),
                i = Math.min(e.east, t.east),
                e = Math.min(e.north, t.north);
            if (!(e <= o || i <= r))
                return ge.defined(n)
                    ? ((n.west = r),
                      (n.south = o),
                      (n.east = i),
                      (n.north = e),
                      n)
                    : new w(r, o, i, e);
        }),
        (w.union = function (e, t, n) {
            ge.defined(n) || (n = new w());
            let r = e.east,
                o = e.west,
                i = t.east,
                a = t.west;
            r < o && 0 < i
                ? (r += Te.TWO_PI)
                : i < a && 0 < r && (i += Te.TWO_PI),
                r < o && a < 0
                    ? (a += Te.TWO_PI)
                    : i < a && o < 0 && (o += Te.TWO_PI);
            var s = Te.negativePiToPi(Math.min(o, a)),
                u = Te.negativePiToPi(Math.max(r, i));
            return (
                (n.west = s),
                (n.south = Math.min(e.south, t.south)),
                (n.east = u),
                (n.north = Math.max(e.north, t.north)),
                n
            );
        }),
        (w.expand = function (e, t, n) {
            return (
                ((n = ge.defined(n) ? n : new w()).west = Math.min(
                    e.west,
                    t.longitude
                )),
                (n.south = Math.min(e.south, t.latitude)),
                (n.east = Math.max(e.east, t.longitude)),
                (n.north = Math.max(e.north, t.latitude)),
                n
            );
        }),
        (w.contains = function (e, t) {
            let n = t.longitude;
            var t = t.latitude,
                r = e.west;
            let o = e.east;
            return (
                o < r && ((o += Te.TWO_PI), n < 0 && (n += Te.TWO_PI)),
                (n > r || Te.equalsEpsilon(n, r, Te.EPSILON14)) &&
                    (n < o || Te.equalsEpsilon(n, o, Te.EPSILON14)) &&
                    t >= e.south &&
                    t <= e.north
            );
        });
    const Ye = new Se();
    function Ie(e, t) {
        (this.center = Re.clone(ge.defaultValue(e, Re.ZERO))),
            (this.radius = ge.defaultValue(t, 0));
    }
    (w.subsample = function (t, n, e, r) {
        (n = ge.defaultValue(n, S.WGS84)),
            (e = ge.defaultValue(e, 0)),
            ge.defined(r) || (r = []);
        let o = 0;
        var i = t.north,
            a = t.south,
            s = t.east,
            u = t.west;
        const c = Ye;
        (c.height = e),
            (c.longitude = u),
            (c.latitude = i),
            (r[o] = n.cartographicToCartesian(c, r[o])),
            o++,
            (c.longitude = s),
            (r[o] = n.cartographicToCartesian(c, r[o])),
            o++,
            (c.latitude = a),
            (r[o] = n.cartographicToCartesian(c, r[o])),
            o++,
            (c.longitude = u),
            (r[o] = n.cartographicToCartesian(c, r[o])),
            o++,
            (c.latitude = i < 0 ? i : 0 < a ? a : 0);
        for (let e = 1; e < 8; ++e)
            (c.longitude = -Math.PI + e * Te.PI_OVER_TWO),
                w.contains(t, c) &&
                    ((r[o] = n.cartographicToCartesian(c, r[o])), o++);
        return (
            0 === c.latitude &&
                ((c.longitude = u),
                (r[o] = n.cartographicToCartesian(c, r[o])),
                o++,
                (c.longitude = s),
                (r[o] = n.cartographicToCartesian(c, r[o])),
                o++),
            (r.length = o),
            r
        );
    }),
        (w.subsection = function (e, t, n, r, o, i) {
            ge.defined(i) || (i = new w()),
                e.west <= e.east
                    ? ((a = e.east - e.west),
                      (i.west = e.west + t * a),
                      (i.east = e.west + r * a))
                    : ((a = Te.TWO_PI + e.east - e.west),
                      (i.west = Te.negativePiToPi(e.west + t * a)),
                      (i.east = Te.negativePiToPi(e.west + r * a)));
            var a = e.north - e.south;
            return (
                (i.south = e.south + n * a),
                (i.north = e.south + o * a),
                1 === t && (i.west = e.east),
                1 === r && (i.east = e.east),
                1 === n && (i.south = e.north),
                1 === o && (i.north = e.north),
                i
            );
        }),
        (w.MAX_VALUE = Object.freeze(
            new w(-Math.PI, -Te.PI_OVER_TWO, Math.PI, Te.PI_OVER_TWO)
        ));
    const Qe = new Re(),
        Ze = new Re(),
        $e = new Re(),
        Ke = new Re(),
        Je = new Re(),
        et = new Re(),
        tt = new Re(),
        P = new Re(),
        nt = new Re(),
        rt = new Re(),
        ot = new Re(),
        it = new Re(),
        at = (4 / 3) * Te.PI,
        st =
            ((Ie.fromPoints = function (e, t) {
                if (
                    (ge.defined(t) || (t = new Ie()),
                    !ge.defined(e) || 0 === e.length)
                )
                    return (
                        (t.center = Re.clone(Re.ZERO, t.center)),
                        (t.radius = 0),
                        t
                    );
                var n = Re.clone(e[0], tt),
                    r = Re.clone(n, Qe),
                    o = Re.clone(n, Ze),
                    i = Re.clone(n, $e),
                    a = Re.clone(n, Ke),
                    s = Re.clone(n, Je),
                    u = Re.clone(n, et),
                    c = e.length;
                let l;
                for (l = 1; l < c; l++) {
                    Re.clone(e[l], n);
                    var d = n.x,
                        f = n.y,
                        h = n.z;
                    d < r.x && Re.clone(n, r),
                        d > a.x && Re.clone(n, a),
                        f < o.y && Re.clone(n, o),
                        f > s.y && Re.clone(n, s),
                        h < i.z && Re.clone(n, i),
                        h > u.z && Re.clone(n, u);
                }
                var p = Re.magnitudeSquared(Re.subtract(a, r, P)),
                    m = Re.magnitudeSquared(Re.subtract(s, o, P)),
                    E = Re.magnitudeSquared(Re.subtract(u, i, P));
                let _ = r,
                    y = a,
                    g = p;
                m > g && ((g = m), (_ = o), (y = s)),
                    E > g && ((g = E), (_ = i), (y = u));
                const T = nt;
                (T.x = 0.5 * (_.x + y.x)),
                    (T.y = 0.5 * (_.y + y.y)),
                    (T.z = 0.5 * (_.z + y.z));
                let R = Re.magnitudeSquared(Re.subtract(y, T, P)),
                    A = Math.sqrt(R);
                const S = rt,
                    w = ((S.x = r.x), (S.y = o.y), (S.z = i.z), ot);
                (w.x = a.x), (w.y = s.y), (w.z = u.z);
                var I = Re.midpoint(S, w, it);
                let v = 0;
                for (l = 0; l < c; l++) {
                    Re.clone(e[l], n);
                    var O,
                        N = Re.magnitude(Re.subtract(n, I, P)),
                        N =
                            (N > v && (v = N),
                            Re.magnitudeSquared(Re.subtract(n, T, P)));
                    N > R &&
                        ((N = Math.sqrt(N)),
                        (A = 0.5 * (A + N)),
                        (R = A * A),
                        (O = N - A),
                        (T.x = (A * T.x + O * n.x) / N),
                        (T.y = (A * T.y + O * n.y) / N),
                        (T.z = (A * T.z + O * n.z) / N));
                }
                return (
                    A < v
                        ? (Re.clone(T, t.center), (t.radius = A))
                        : (Re.clone(I, t.center), (t.radius = v)),
                    t
                );
            }),
            new ie()),
        ut = new Re(),
        ct = new Re(),
        lt = new Se(),
        dt = new Se(),
        ft =
            ((Ie.fromRectangle2D = function (e, t, n) {
                return Ie.fromRectangleWithHeights2D(e, t, 0, 0, n);
            }),
            (Ie.fromRectangleWithHeights2D = function (e, t, n, r, o) {
                if ((ge.defined(o) || (o = new Ie()), !ge.defined(e)))
                    return (
                        (o.center = Re.clone(Re.ZERO, o.center)),
                        (o.radius = 0),
                        o
                    );
                (t = ge.defaultValue(t, st)),
                    w.southwest(e, lt),
                    (lt.height = n),
                    w.northeast(e, dt),
                    (dt.height = r);
                (n = t.project(lt, ut)),
                    (e = t.project(dt, ct)),
                    (r = e.x - n.x),
                    (t = e.y - n.y),
                    (e = e.z - n.z);
                o.radius = 0.5 * Math.sqrt(r * r + t * t + e * e);
                const i = o.center;
                return (
                    (i.x = n.x + 0.5 * r),
                    (i.y = n.y + 0.5 * t),
                    (i.z = n.z + 0.5 * e),
                    o
                );
            }),
            []),
        ht =
            ((Ie.fromRectangle3D = function (e, t, n, r) {
                if (
                    ((t = ge.defaultValue(t, S.WGS84)),
                    (n = ge.defaultValue(n, 0)),
                    ge.defined(r) || (r = new Ie()),
                    !ge.defined(e))
                )
                    return (
                        (r.center = Re.clone(Re.ZERO, r.center)),
                        (r.radius = 0),
                        r
                    );
                e = w.subsample(e, t, n, ft);
                return Ie.fromPoints(e, r);
            }),
            (Ie.fromVertices = function (e, t, n, r) {
                if (
                    (ge.defined(r) || (r = new Ie()),
                    !ge.defined(e) || 0 === e.length)
                )
                    return (
                        (r.center = Re.clone(Re.ZERO, r.center)),
                        (r.radius = 0),
                        r
                    );
                (t = ge.defaultValue(t, Re.ZERO)), (n = ge.defaultValue(n, 3));
                const o = tt;
                (o.x = e[0] + t.x), (o.y = e[1] + t.y), (o.z = e[2] + t.z);
                var i = Re.clone(o, Qe),
                    a = Re.clone(o, Ze),
                    s = Re.clone(o, $e),
                    u = Re.clone(o, Ke),
                    c = Re.clone(o, Je),
                    l = Re.clone(o, et),
                    d = e.length;
                let f;
                for (f = 0; f < d; f += n) {
                    var h = e[f] + t.x,
                        p = e[f + 1] + t.y,
                        m = e[f + 2] + t.z;
                    (o.x = h),
                        (o.y = p),
                        (o.z = m),
                        h < i.x && Re.clone(o, i),
                        h > u.x && Re.clone(o, u),
                        p < a.y && Re.clone(o, a),
                        p > c.y && Re.clone(o, c),
                        m < s.z && Re.clone(o, s),
                        m > l.z && Re.clone(o, l);
                }
                var E = Re.magnitudeSquared(Re.subtract(u, i, P)),
                    _ = Re.magnitudeSquared(Re.subtract(c, a, P)),
                    y = Re.magnitudeSquared(Re.subtract(l, s, P));
                let g = i,
                    T = u,
                    R = E;
                _ > R && ((R = _), (g = a), (T = c)),
                    y > R && ((R = y), (g = s), (T = l));
                const A = nt;
                (A.x = 0.5 * (g.x + T.x)),
                    (A.y = 0.5 * (g.y + T.y)),
                    (A.z = 0.5 * (g.z + T.z));
                let S = Re.magnitudeSquared(Re.subtract(T, A, P)),
                    w = Math.sqrt(S);
                const I = rt,
                    v = ((I.x = i.x), (I.y = a.y), (I.z = s.z), ot);
                (v.x = u.x), (v.y = c.y), (v.z = l.z);
                var O = Re.midpoint(I, v, it);
                let N = 0;
                for (f = 0; f < d; f += n) {
                    (o.x = e[f] + t.x),
                        (o.y = e[f + 1] + t.y),
                        (o.z = e[f + 2] + t.z);
                    var x,
                        M = Re.magnitude(Re.subtract(o, O, P)),
                        M =
                            (M > N && (N = M),
                            Re.magnitudeSquared(Re.subtract(o, A, P)));
                    M > S &&
                        ((M = Math.sqrt(M)),
                        (w = 0.5 * (w + M)),
                        (S = w * w),
                        (x = M - w),
                        (A.x = (w * A.x + x * o.x) / M),
                        (A.y = (w * A.y + x * o.y) / M),
                        (A.z = (w * A.z + x * o.z) / M));
                }
                return (
                    w < N
                        ? (Re.clone(A, r.center), (r.radius = w))
                        : (Re.clone(O, r.center), (r.radius = N)),
                    r
                );
            }),
            (Ie.fromEncodedCartesianVertices = function (e, t, n) {
                if (
                    (ge.defined(n) || (n = new Ie()),
                    !ge.defined(e) ||
                        !ge.defined(t) ||
                        e.length !== t.length ||
                        0 === e.length)
                )
                    return (
                        (n.center = Re.clone(Re.ZERO, n.center)),
                        (n.radius = 0),
                        n
                    );
                const r = tt;
                (r.x = e[0] + t[0]), (r.y = e[1] + t[1]), (r.z = e[2] + t[2]);
                var o = Re.clone(r, Qe),
                    i = Re.clone(r, Ze),
                    a = Re.clone(r, $e),
                    s = Re.clone(r, Ke),
                    u = Re.clone(r, Je),
                    c = Re.clone(r, et),
                    l = e.length;
                let d;
                for (d = 0; d < l; d += 3) {
                    var f = e[d] + t[d],
                        h = e[d + 1] + t[d + 1],
                        p = e[d + 2] + t[d + 2];
                    (r.x = f),
                        (r.y = h),
                        (r.z = p),
                        f < o.x && Re.clone(r, o),
                        f > s.x && Re.clone(r, s),
                        h < i.y && Re.clone(r, i),
                        h > u.y && Re.clone(r, u),
                        p < a.z && Re.clone(r, a),
                        p > c.z && Re.clone(r, c);
                }
                var m = Re.magnitudeSquared(Re.subtract(s, o, P)),
                    E = Re.magnitudeSquared(Re.subtract(u, i, P)),
                    _ = Re.magnitudeSquared(Re.subtract(c, a, P));
                let y = o,
                    g = s,
                    T = m;
                E > T && ((T = E), (y = i), (g = u)),
                    _ > T && ((T = _), (y = a), (g = c));
                const R = nt;
                (R.x = 0.5 * (y.x + g.x)),
                    (R.y = 0.5 * (y.y + g.y)),
                    (R.z = 0.5 * (y.z + g.z));
                let A = Re.magnitudeSquared(Re.subtract(g, R, P)),
                    S = Math.sqrt(A);
                const w = rt,
                    I = ((w.x = o.x), (w.y = i.y), (w.z = a.z), ot);
                (I.x = s.x), (I.y = u.y), (I.z = c.z);
                var v = Re.midpoint(w, I, it);
                let O = 0;
                for (d = 0; d < l; d += 3) {
                    (r.x = e[d] + t[d]),
                        (r.y = e[d + 1] + t[d + 1]),
                        (r.z = e[d + 2] + t[d + 2]);
                    var N,
                        x = Re.magnitude(Re.subtract(r, v, P)),
                        x =
                            (x > O && (O = x),
                            Re.magnitudeSquared(Re.subtract(r, R, P)));
                    x > A &&
                        ((x = Math.sqrt(x)),
                        (S = 0.5 * (S + x)),
                        (A = S * S),
                        (N = x - S),
                        (R.x = (S * R.x + N * r.x) / x),
                        (R.y = (S * R.y + N * r.y) / x),
                        (R.z = (S * R.z + N * r.z) / x));
                }
                return (
                    S < O
                        ? (Re.clone(R, n.center), (n.radius = S))
                        : (Re.clone(v, n.center), (n.radius = O)),
                    n
                );
            }),
            (Ie.fromCornerPoints = function (e, t, n) {
                ge.defined(n) || (n = new Ie());
                e = Re.midpoint(e, t, n.center);
                return (n.radius = Re.distance(e, t)), n;
            }),
            (Ie.fromEllipsoid = function (e, t) {
                return (
                    ge.defined(t) || (t = new Ie()),
                    Re.clone(Re.ZERO, t.center),
                    (t.radius = e.maximumRadius),
                    t
                );
            }),
            new Re()),
        pt =
            ((Ie.fromBoundingSpheres = function (e, t) {
                if (
                    (ge.defined(t) || (t = new Ie()),
                    !ge.defined(e) || 0 === e.length)
                )
                    return (
                        (t.center = Re.clone(Re.ZERO, t.center)),
                        (t.radius = 0),
                        t
                    );
                var n = e.length;
                if (1 === n) return Ie.clone(e[0], t);
                if (2 === n) return Ie.union(e[0], e[1], t);
                const r = [];
                let o;
                for (o = 0; o < n; o++) r.push(e[o].center);
                var i = (t = Ie.fromPoints(r, t)).center;
                let a = t.radius;
                for (o = 0; o < n; o++) {
                    var s = e[o];
                    a = Math.max(a, Re.distance(i, s.center, ht) + s.radius);
                }
                return (t.radius = a), t;
            }),
            new Re()),
        mt = new Re(),
        Et = new Re(),
        _t =
            ((Ie.fromOrientedBoundingBox = function (e, t) {
                ge.defined(t) || (t = new Ie());
                var n = e.halfAxes,
                    r = B.getColumn(n, 0, pt),
                    o = B.getColumn(n, 1, mt),
                    n = B.getColumn(n, 2, Et);
                return (
                    Re.add(r, o, r),
                    Re.add(r, n, r),
                    (t.center = Re.clone(e.center, t.center)),
                    (t.radius = Re.magnitude(r)),
                    t
                );
            }),
            new Re()),
        yt = new Re(),
        gt =
            ((Ie.fromTransformation = function (e, t) {
                ge.defined(t) || (t = new Ie());
                var n = we.getTranslation(e, _t),
                    e = we.getScale(e, yt),
                    e = 0.5 * Re.magnitude(e);
                return (t.center = Re.clone(n, t.center)), (t.radius = e), t;
            }),
            (Ie.clone = function (e, t) {
                if (ge.defined(e))
                    return ge.defined(t)
                        ? ((t.center = Re.clone(e.center, t.center)),
                          (t.radius = e.radius),
                          t)
                        : new Ie(e.center, e.radius);
            }),
            (Ie.packedLength = 4),
            (Ie.pack = function (e, t, n) {
                n = ge.defaultValue(n, 0);
                var r = e.center;
                return (
                    (t[n++] = r.x),
                    (t[n++] = r.y),
                    (t[n++] = r.z),
                    (t[n] = e.radius),
                    t
                );
            }),
            (Ie.unpack = function (e, t, n) {
                t = ge.defaultValue(t, 0);
                const r = (n = ge.defined(n) ? n : new Ie()).center;
                return (
                    (r.x = e[t++]),
                    (r.y = e[t++]),
                    (r.z = e[t++]),
                    (n.radius = e[t]),
                    n
                );
            }),
            new Re()),
        Tt = new Re(),
        Rt =
            ((Ie.union = function (e, t, n) {
                ge.defined(n) || (n = new Ie());
                var r = e.center,
                    o = e.radius,
                    i = t.center,
                    a = t.radius,
                    i = Re.subtract(i, r, gt),
                    s = Re.magnitude(i);
                if (s + a <= o) return e.clone(n), n;
                if (s + o <= a) return t.clone(n), n;
                (e = 0.5 * (o + s + a)),
                    (t = Re.multiplyByScalar(i, (e - o) / s, Tt));
                return (
                    Re.add(t, r, t), Re.clone(t, n.center), (n.radius = e), n
                );
            }),
            new Re()),
        At =
            ((Ie.expand = function (e, t, n) {
                n = Ie.clone(e, n);
                e = Re.magnitude(Re.subtract(t, n.center, Rt));
                return e > n.radius && (n.radius = e), n;
            }),
            (Ie.intersectPlane = function (e, t) {
                var n = e.center,
                    e = e.radius,
                    r = t.normal,
                    r = Re.dot(r, n) + t.distance;
                return r < -e ? F.OUTSIDE : r < e ? F.INTERSECTING : F.INSIDE;
            }),
            (Ie.transform = function (e, t, n) {
                return (
                    ((n = ge.defined(n) ? n : new Ie()).center =
                        we.multiplyByPoint(t, e.center, n.center)),
                    (n.radius = we.getMaximumScale(t) * e.radius),
                    n
                );
            }),
            new Re()),
        St =
            ((Ie.distanceSquaredTo = function (e, t) {
                (t = Re.subtract(e.center, t, At)),
                    (t = Re.magnitude(t) - e.radius);
                return t <= 0 ? 0 : t * t;
            }),
            (Ie.transformWithoutScale = function (e, t, n) {
                return (
                    ((n = ge.defined(n) ? n : new Ie()).center =
                        we.multiplyByPoint(t, e.center, n.center)),
                    (n.radius = e.radius),
                    n
                );
            }),
            new Re()),
        wt =
            ((Ie.computePlaneDistances = function (e, t, n, r) {
                ge.defined(r) || (r = new ae());
                (t = Re.subtract(e.center, t, St)), (n = Re.dot(n, t));
                return (r.start = n - e.radius), (r.stop = n + e.radius), r;
            }),
            new Re()),
        It = new Re(),
        vt = new Re(),
        Ot = new Re(),
        Nt = new Re(),
        xt = new Se(),
        Mt = new Array(8);
    for (let e = 0; e < 8; ++e) Mt[e] = new Re();
    const Pt = new ie();
    function ve(e, t) {
        (this.x = ge.defaultValue(e, 0)), (this.y = ge.defaultValue(t, 0));
    }
    (Ie.projectTo2D = function (e, t, n) {
        const r = (t = ge.defaultValue(t, Pt)).ellipsoid;
        let o = e.center;
        e = e.radius;
        let i;
        i = Re.equals(o, Re.ZERO)
            ? Re.clone(Re.UNIT_X, wt)
            : r.geodeticSurfaceNormal(o, wt);
        var a = Re.cross(Re.UNIT_Z, i, It),
            s = (Re.normalize(a, a), Re.cross(i, a, vt)),
            e =
                (Re.normalize(s, s),
                Re.multiplyByScalar(i, e, i),
                Re.multiplyByScalar(s, e, s),
                Re.multiplyByScalar(a, e, a),
                Re.negate(s, Nt)),
            u = Re.negate(a, Ot),
            c = Mt,
            l = c[0],
            d =
                (Re.add(i, s, l),
                Re.add(l, a, l),
                (l = c[1]),
                Re.add(i, s, l),
                Re.add(l, u, l),
                (l = c[2]),
                Re.add(i, e, l),
                Re.add(l, u, l),
                (l = c[3]),
                Re.add(i, e, l),
                Re.add(l, a, l),
                Re.negate(i, i),
                (l = c[4]),
                Re.add(i, s, l),
                Re.add(l, a, l),
                (l = c[5]),
                Re.add(i, s, l),
                Re.add(l, u, l),
                (l = c[6]),
                Re.add(i, e, l),
                Re.add(l, u, l),
                (l = c[7]),
                Re.add(i, e, l),
                Re.add(l, a, l),
                c.length);
        for (let e = 0; e < d; ++e) {
            var f = c[e],
                h = (Re.add(o, f, f), r.cartesianToCartographic(f, xt));
            t.project(h, f);
        }
        n = Ie.fromPoints(c, n);
        (s = (o = n.center).x), (u = o.y), (e = o.z);
        return (o.x = e), (o.y = s), (o.z = u), n;
    }),
        (Ie.isOccluded = function (e, t) {
            return !t.isBoundingSphereVisible(e);
        }),
        (Ie.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    Re.equals(e.center, t.center) &&
                    e.radius === t.radius)
            );
        }),
        (Ie.prototype.intersectPlane = function (e) {
            return Ie.intersectPlane(this, e);
        }),
        (Ie.prototype.distanceSquaredTo = function (e) {
            return Ie.distanceSquaredTo(this, e);
        }),
        (Ie.prototype.computePlaneDistances = function (e, t, n) {
            return Ie.computePlaneDistances(this, e, t, n);
        }),
        (Ie.prototype.isOccluded = function (e) {
            return Ie.isOccluded(this, e);
        }),
        (Ie.prototype.equals = function (e) {
            return Ie.equals(this, e);
        }),
        (Ie.prototype.clone = function (e) {
            return Ie.clone(this, e);
        }),
        (Ie.prototype.volume = function () {
            var e = this.radius;
            return at * e * e * e;
        }),
        (ve.fromElements = function (e, t, n) {
            return ge.defined(n) ? ((n.x = e), (n.y = t), n) : new ve(e, t);
        }),
        (ve.fromCartesian3 = ve.clone =
            function (e, t) {
                if (ge.defined(e))
                    return ge.defined(t)
                        ? ((t.x = e.x), (t.y = e.y), t)
                        : new ve(e.x, e.y);
            }),
        (ve.fromCartesian4 = ve.clone),
        (ve.packedLength = 2),
        (ve.pack = function (e, t, n) {
            return (n = ge.defaultValue(n, 0)), (t[n++] = e.x), (t[n] = e.y), t;
        }),
        (ve.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new ve()).x = e[t++]),
                (n.y = e[t]),
                n
            );
        }),
        (ve.packArray = function (t, n) {
            var r = t.length,
                e = 2 * r;
            ge.defined(n)
                ? (!Array.isArray(n) && n.length !== e) ||
                  n.length === e ||
                  (n.length = e)
                : (n = new Array(e));
            for (let e = 0; e < r; ++e) ve.pack(t[e], n, 2 * e);
            return n;
        }),
        (ve.unpackArray = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r / 2) : (n = new Array(r / 2));
            for (let e = 0; e < r; e += 2) {
                var o = e / 2;
                n[o] = ve.unpack(t, e, n[o]);
            }
            return n;
        }),
        (ve.fromArray = ve.unpack),
        (ve.maximumComponent = function (e) {
            return Math.max(e.x, e.y);
        }),
        (ve.minimumComponent = function (e) {
            return Math.min(e.x, e.y);
        }),
        (ve.minimumByComponent = function (e, t, n) {
            return (n.x = Math.min(e.x, t.x)), (n.y = Math.min(e.y, t.y)), n;
        }),
        (ve.maximumByComponent = function (e, t, n) {
            return (n.x = Math.max(e.x, t.x)), (n.y = Math.max(e.y, t.y)), n;
        }),
        (ve.clamp = function (e, t, n, r) {
            var o = Te.clamp(e.x, t.x, n.x),
                e = Te.clamp(e.y, t.y, n.y);
            return (r.x = o), (r.y = e), r;
        }),
        (ve.magnitudeSquared = function (e) {
            return e.x * e.x + e.y * e.y;
        }),
        (ve.magnitude = function (e) {
            return Math.sqrt(ve.magnitudeSquared(e));
        });
    const bt = new ve(),
        Ct =
            ((ve.distance = function (e, t) {
                return ve.subtract(e, t, bt), ve.magnitude(bt);
            }),
            (ve.distanceSquared = function (e, t) {
                return ve.subtract(e, t, bt), ve.magnitudeSquared(bt);
            }),
            (ve.normalize = function (e, t) {
                var n = ve.magnitude(e);
                return (t.x = e.x / n), (t.y = e.y / n), t;
            }),
            (ve.dot = function (e, t) {
                return e.x * t.x + e.y * t.y;
            }),
            (ve.cross = function (e, t) {
                return e.x * t.y - e.y * t.x;
            }),
            (ve.multiplyComponents = function (e, t, n) {
                return (n.x = e.x * t.x), (n.y = e.y * t.y), n;
            }),
            (ve.divideComponents = function (e, t, n) {
                return (n.x = e.x / t.x), (n.y = e.y / t.y), n;
            }),
            (ve.add = function (e, t, n) {
                return (n.x = e.x + t.x), (n.y = e.y + t.y), n;
            }),
            (ve.subtract = function (e, t, n) {
                return (n.x = e.x - t.x), (n.y = e.y - t.y), n;
            }),
            (ve.multiplyByScalar = function (e, t, n) {
                return (n.x = e.x * t), (n.y = e.y * t), n;
            }),
            (ve.divideByScalar = function (e, t, n) {
                return (n.x = e.x / t), (n.y = e.y / t), n;
            }),
            (ve.negate = function (e, t) {
                return (t.x = -e.x), (t.y = -e.y), t;
            }),
            (ve.abs = function (e, t) {
                return (t.x = Math.abs(e.x)), (t.y = Math.abs(e.y)), t;
            }),
            new ve()),
        Ut =
            ((ve.lerp = function (e, t, n, r) {
                return (
                    ve.multiplyByScalar(t, n, Ct),
                    (r = ve.multiplyByScalar(e, 1 - n, r)),
                    ve.add(Ct, r, r)
                );
            }),
            new ve()),
        Dt = new ve(),
        zt =
            ((ve.angleBetween = function (e, t) {
                return (
                    ve.normalize(e, Ut),
                    ve.normalize(t, Dt),
                    Te.acosClamped(ve.dot(Ut, Dt))
                );
            }),
            new ve());
    function Ft(e, t) {
        (this._ellipsoid = e),
            (this._cameraPosition = new Re()),
            (this._cameraPositionInScaledSpace = new Re()),
            (this._distanceToLimbInScaledSpaceSquared = 0),
            ge.defined(t) && (this.cameraPosition = t);
    }
    (ve.mostOrthogonalAxis = function (e, t) {
        e = ve.normalize(e, zt);
        return (
            ve.abs(e, e),
            (t = e.x <= e.y ? ve.clone(ve.UNIT_X, t) : ve.clone(ve.UNIT_Y, t))
        );
    }),
        (ve.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) && ge.defined(t) && e.x === t.x && e.y === t.y)
            );
        }),
        (ve.equalsArray = function (e, t, n) {
            return e.x === t[n] && e.y === t[n + 1];
        }),
        (ve.equalsEpsilon = function (e, t, n, r) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    Te.equalsEpsilon(e.x, t.x, n, r) &&
                    Te.equalsEpsilon(e.y, t.y, n, r))
            );
        }),
        (ve.ZERO = Object.freeze(new ve(0, 0))),
        (ve.ONE = Object.freeze(new ve(1, 1))),
        (ve.UNIT_X = Object.freeze(new ve(1, 0))),
        (ve.UNIT_Y = Object.freeze(new ve(0, 1))),
        (ve.prototype.clone = function (e) {
            return ve.clone(this, e);
        }),
        (ve.prototype.equals = function (e) {
            return ve.equals(this, e);
        }),
        (ve.prototype.equalsEpsilon = function (e, t, n) {
            return ve.equalsEpsilon(this, e, t, n);
        }),
        (ve.prototype.toString = function () {
            return `(${this.x}, ${this.y})`;
        }),
        Object.defineProperties(Ft.prototype, {
            ellipsoid: {
                get: function () {
                    return this._ellipsoid;
                },
            },
            cameraPosition: {
                get: function () {
                    return this._cameraPosition;
                },
                set: function (e) {
                    const t = this._ellipsoid;
                    var n = t.transformPositionToScaledSpace(
                            e,
                            this._cameraPositionInScaledSpace
                        ),
                        r = Re.magnitudeSquared(n) - 1;
                    Re.clone(e, this._cameraPosition),
                        (this._cameraPositionInScaledSpace = n),
                        (this._distanceToLimbInScaledSpaceSquared = r);
                },
            },
        });
    const Lt = new Re(),
        Bt =
            ((Ft.prototype.isPointVisible = function (e) {
                const t = this._ellipsoid;
                return jt(
                    t.transformPositionToScaledSpace(e, Lt),
                    this._cameraPositionInScaledSpace,
                    this._distanceToLimbInScaledSpaceSquared
                );
            }),
            (Ft.prototype.isScaledSpacePointVisible = function (e) {
                return jt(
                    e,
                    this._cameraPositionInScaledSpace,
                    this._distanceToLimbInScaledSpaceSquared
                );
            }),
            new Re()),
        qt =
            ((Ft.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid =
                function (e, t) {
                    var n = this._ellipsoid;
                    let r, o;
                    return (
                        (r =
                            ge.defined(t) && t < 0 && n.minimumRadius > -t
                                ? (((o = Bt).x =
                                      this._cameraPosition.x / (n.radii.x + t)),
                                  (o.y =
                                      this._cameraPosition.y / (n.radii.y + t)),
                                  (o.z =
                                      this._cameraPosition.z / (n.radii.z + t)),
                                  o.x * o.x + o.y * o.y + o.z * o.z - 1)
                                : ((o = this._cameraPositionInScaledSpace),
                                  this._distanceToLimbInScaledSpaceSquared)),
                        jt(e, o, r)
                    );
                }),
            (Ft.prototype.computeHorizonCullingPoint = function (e, t, n) {
                return Wt(this._ellipsoid, e, t, n);
            }),
            S.clone(S.UNIT_SPHERE)),
        Vt =
            ((Ft.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid =
                function (e, t, n, r) {
                    return Wt(Gt(this._ellipsoid, n, qt), e, t, r);
                }),
            (Ft.prototype.computeHorizonCullingPointFromVertices = function (
                e,
                t,
                n,
                r,
                o
            ) {
                return Xt(this._ellipsoid, e, t, n, r, o);
            }),
            (Ft.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid =
                function (e, t, n, r, o, i) {
                    return Xt(Gt(this._ellipsoid, o, qt), e, t, n, r, i);
                }),
            []),
        kt =
            ((Ft.prototype.computeHorizonCullingPointFromRectangle = function (
                e,
                t,
                n
            ) {
                var e = w.subsample(e, t, 0, Vt),
                    r = Ie.fromPoints(e);
                if (!(Re.magnitude(r.center) < 0.1 * t.minimumRadius))
                    return this.computeHorizonCullingPoint(r.center, e, n);
            }),
            new Re());
    function Gt(e, t, n) {
        return (
            ge.defined(t) &&
                t < 0 &&
                e.minimumRadius > -t &&
                ((t = Re.fromElements(
                    e.radii.x + t,
                    e.radii.y + t,
                    e.radii.z + t,
                    kt
                )),
                (e = S.fromCartesian3(t, n))),
            e
        );
    }
    function Wt(n, e, r, t) {
        ge.defined(t) || (t = new Re());
        var o = Jt(n, e);
        let i = 0;
        for (let e = 0, t = r.length; e < t; ++e) {
            var a = Zt(n, r[e], o);
            if (a < 0) return;
            i = Math.max(i, a);
        }
        return $t(o, i, t);
    }
    const Ht = new Re();
    function Xt(n, e, r, o, i, t) {
        ge.defined(t) || (t = new Re()),
            (o = ge.defaultValue(o, 3)),
            (i = ge.defaultValue(i, Re.ZERO));
        var a = Jt(n, e);
        let s = 0;
        for (let e = 0, t = r.length; e < t; e += o) {
            (Ht.x = r[e] + i.x),
                (Ht.y = r[e + 1] + i.y),
                (Ht.z = r[e + 2] + i.z);
            var u = Zt(n, Ht, a);
            if (u < 0) return;
            s = Math.max(s, u);
        }
        return $t(a, s, t);
    }
    function jt(e, t, n) {
        (e = Re.subtract(e, t, Lt)), (t = -Re.dot(e, t));
        return !(n < 0 ? 0 < t : n < t && (t * t) / Re.magnitudeSquared(e) > n);
    }
    const Yt = new Re(),
        Qt = new Re();
    function Zt(e, t, n) {
        var e = e.transformPositionToScaledSpace(t, Yt),
            t = Re.magnitudeSquared(e),
            r = Math.sqrt(t),
            e = Re.divideByScalar(e, r, Qt),
            t = Math.max(1, t),
            r = 1 / Math.max(1, r);
        return (
            1 /
            (Re.dot(e, n) * r -
                Re.magnitude(Re.cross(e, n, e)) * (Math.sqrt(t - 1) * r))
        );
    }
    function $t(e, t, n) {
        if (!(t <= 0 || t === 1 / 0 || t != t))
            return Re.multiplyByScalar(e, t, n);
    }
    const Kt = new Re();
    function Jt(e, t) {
        return Re.equals(t, Re.ZERO)
            ? t
            : (e.transformPositionToScaledSpace(t, Kt), Re.normalize(Kt, Kt));
    }
    const en = {};
    function tn(e, t, n) {
        var r = e + t;
        return Te.sign(e) !== Te.sign(t) &&
            Math.abs(r / Math.max(Math.abs(e), Math.abs(t))) < n
            ? 0
            : r;
    }
    (en.computeDiscriminant = function (e, t, n) {
        return t * t - 4 * e * n;
    }),
        (en.computeRealRoots = function (e, t, n) {
            let r;
            if (0 === e) return 0 === t ? [] : [-n / t];
            if (0 === t) {
                if (0 === n) return [0, 0];
                var o = Math.abs(n),
                    i = Math.abs(e);
                if (o < i && o / i < Te.EPSILON14) return [0, 0];
                if (i < o && i / o < Te.EPSILON14) return [];
                if ((r = -n / e) < 0) return [];
                i = Math.sqrt(r);
                return [-i, i];
            }
            if (0 === n) return (r = -t / e) < 0 ? [r, 0] : [0, r];
            o = tn(t * t, -(4 * e * n), Te.EPSILON14);
            if (o < 0) return [];
            i = -0.5 * tn(t, Te.sign(t) * Math.sqrt(o), Te.EPSILON14);
            return 0 < t ? [i / e, n / i] : [n / i, i / e];
        });
    const nn = {};
    function rn(r, o, i, a) {
        var o = o / 3,
            i = i / 3,
            s = r * i,
            u = o * a,
            c = o * o,
            l = i * i,
            d = r * i - c,
            f = r * a - o * i,
            h = o * a - l,
            p = 4 * d * h - f * f;
        let m, E;
        if (p < 0) {
            let e, t, n;
            var _ =
                    -((n =
                        s * l <= c * u
                            ? ((e = r), -2 * o * (t = d) + r * f)
                            : -(e = a) * f + 2 * i * (t = h)) < 0
                        ? -1
                        : 1) *
                    Math.abs(e) *
                    Math.sqrt(-p),
                y = (E = -n + _) / 2,
                y = y < 0 ? -Math.pow(-y, 1 / 3) : Math.pow(y, 1 / 3),
                _ = E === _ ? -y : -t / y;
            return (
                (m = t <= 0 ? y + _ : -n / (y * y + _ * _ + t)),
                s * l <= c * u ? [(m - o) / r] : [-a / (m + i)]
            );
        }
        (y = d),
            (_ = -2 * o * d + r * f),
            (s = h),
            (l = -a * f + 2 * i * h),
            (c = Math.sqrt(p)),
            (u = Math.sqrt(3) / 2),
            (d = Math.abs(Math.atan2(r * c, -_) / 3)),
            (m = 2 * Math.sqrt(-y)),
            (f = Math.cos(d));
        E = m * f;
        let e = m * (-f / 2 - u * Math.sin(d));
        (h = E + e > 2 * o ? E - o : e - o),
            (p = r),
            (_ = h / p),
            (d = Math.abs(Math.atan2(a * c, -l) / 3)),
            (m = 2 * Math.sqrt(-s)),
            (f = Math.cos(d)),
            (E = m * f),
            (e = m * (-f / 2 - u * Math.sin(d))),
            (y = -a),
            (r = E + e < 2 * i ? E + i : e + i),
            (c = y / r),
            (l = -h * r - p * y),
            (s = (i * l - o * (h * y)) / (-o * l + i * (p * r)));
        return _ <= s
            ? _ <= c
                ? s <= c
                    ? [_, s, c]
                    : [_, c, s]
                : [c, _, s]
            : _ <= c
            ? [s, _, c]
            : s <= c
            ? [s, c, _]
            : [c, s, _];
    }
    (nn.computeDiscriminant = function (e, t, n, r) {
        var o = t * t,
            i = n * n;
        return (
            18 * e * t * n * r +
            o * i -
            27 * (e * e) * (r * r) -
            4 * (e * i * n + o * t * r)
        );
    }),
        (nn.computeRealRoots = function (e, t, n, r) {
            let o, i;
            if (0 === e) return en.computeRealRoots(t, n, r);
            if (0 !== t)
                return 0 === n
                    ? 0 === r
                        ? (i = -t / e) < 0
                            ? [i, 0, 0]
                            : [0, 0, i]
                        : rn(e, t, 0, r)
                    : 0 === r
                    ? 0 === (o = en.computeRealRoots(e, t, n)).length
                        ? [0]
                        : o[1] <= 0
                        ? [o[0], o[1], 0]
                        : 0 <= o[0]
                        ? [0, o[0], o[1]]
                        : [o[0], 0, o[1]]
                    : rn(e, t, n, r);
            if (0 !== n)
                return 0 === r
                    ? 0 === (o = en.computeRealRoots(e, 0, n)).Length
                        ? [0]
                        : [o[0], 0, o[1]]
                    : rn(e, 0, n, r);
            if (0 === r) return [0, 0, 0];
            t = (i = -r / e) < 0 ? -Math.pow(-i, 1 / 3) : Math.pow(i, 1 / 3);
            return [t, t, t];
        });
    const on = {};
    function an(t, n, r, o) {
        var e = t * t,
            i = n - (3 * e) / 8,
            a = r - (n * t) / 2 + (e * t) / 8,
            o = o - (r * t) / 4 + (n * e) / 16 - (3 * e * e) / 256,
            r = nn.computeRealRoots(1, 2 * i, i * i - 4 * o, -a * a);
        if (0 < r.length) {
            (n = -t / 4), (e = r[r.length - 1]);
            if (Math.abs(e) < Te.EPSILON14) {
                t = en.computeRealRoots(1, i, o);
                if (2 === t.length) {
                    (r = t[0]), (o = t[1]);
                    let e;
                    if (0 <= r && 0 <= o)
                        return (
                            (t = Math.sqrt(r)),
                            [n - (s = Math.sqrt(o)), n - t, n + t, n + s]
                        );
                    if (0 <= r && o < 0) return [n - (e = Math.sqrt(r)), n + e];
                    if (r < 0 && 0 <= o) return [n - (e = Math.sqrt(o)), n + e];
                }
                return [];
            }
            if (0 < e) {
                var t = Math.sqrt(e),
                    s = (i + e - a / t) / 2,
                    r = (i + e + a / t) / 2;
                const u = en.computeRealRoots(1, t, s),
                    c = en.computeRealRoots(1, -t, r);
                return 0 !== u.length
                    ? ((u[0] += n),
                      (u[1] += n),
                      0 !== c.length
                          ? ((c[0] += n),
                            (c[1] += n),
                            u[1] <= c[0]
                                ? [u[0], u[1], c[0], c[1]]
                                : c[1] <= u[0]
                                ? [c[0], c[1], u[0], u[1]]
                                : u[0] >= c[0] && u[1] <= c[1]
                                ? [c[0], u[0], u[1], c[1]]
                                : c[0] >= u[0] && c[1] <= u[1]
                                ? [u[0], c[0], c[1], u[1]]
                                : u[0] > c[0] && u[0] < c[1]
                                ? [c[0], u[0], c[1], u[1]]
                                : [u[0], c[0], u[1], c[1]])
                          : u)
                    : 0 !== c.length
                    ? ((c[0] += n), (c[1] += n), c)
                    : [];
            }
        }
        return [];
    }
    function sn(a, s, u, c) {
        var l = a * a,
            d = -2 * s,
            f = u * a + s * s - 4 * c,
            h = l * c - u * s * a + u * u,
            d = nn.computeRealRoots(1, d, f, h);
        if (0 < d.length) {
            var f = d[0],
                h = s - f,
                d = h * h,
                s = a / 2,
                h = h / 2,
                p = d - 4 * c,
                d = d + 4 * Math.abs(c),
                m = l - 4 * f,
                l = l + 4 * Math.abs(f);
            let e, t;
            t =
                f < 0 || p * l < m * d
                    ? ((l = Math.sqrt(m)),
                      (e = l / 2),
                      0 === l ? 0 : (a * h - u) / l)
                    : ((d = Math.sqrt(p)),
                      (e = 0 === d ? 0 : (a * h - u) / d),
                      d / 2);
            let n, r;
            0 == s && 0 === e
                ? ((n = 0), (r = 0))
                : Te.sign(s) === Te.sign(e)
                ? ((n = s + e), (r = f / n))
                : ((r = s - e), (n = f / r));
            let o, i;
            0 == h && 0 === t
                ? ((o = 0), (i = 0))
                : Te.sign(h) === Te.sign(t)
                ? ((o = h + t), (i = c / o))
                : ((i = h - t), (o = c / i));
            (m = en.computeRealRoots(1, n, o)),
                (l = en.computeRealRoots(1, r, i));
            if (0 !== m.length)
                return 0 !== l.length
                    ? m[1] <= l[0]
                        ? [m[0], m[1], l[0], l[1]]
                        : l[1] <= m[0]
                        ? [l[0], l[1], m[0], m[1]]
                        : m[0] >= l[0] && m[1] <= l[1]
                        ? [l[0], m[0], m[1], l[1]]
                        : l[0] >= m[0] && l[1] <= m[1]
                        ? [m[0], l[0], l[1], m[1]]
                        : m[0] > l[0] && m[0] < l[1]
                        ? [l[0], m[0], l[1], m[1]]
                        : [m[0], l[0], m[1], l[1]]
                    : m;
            if (0 !== l.length) return l;
        }
        return [];
    }
    function un(e, t) {
        (t = Re.clone(ge.defaultValue(t, Re.ZERO))),
            Re.equals(t, Re.ZERO) || Re.normalize(t, t),
            (this.origin = Re.clone(ge.defaultValue(e, Re.ZERO))),
            (this.direction = t);
    }
    (on.computeDiscriminant = function (e, t, n, r, o) {
        var i = e * e,
            a = t * t,
            s = a * t,
            u = n * n,
            c = u * n,
            l = r * r,
            d = l * r,
            f = o * o;
        return (
            a * u * l -
            4 * s * d -
            4 * e * c * l +
            18 * e * t * n * d -
            27 * i * l * l +
            256 * (i * e) * (f * o) +
            o *
                (18 * s * n * r -
                    4 * a * c +
                    16 * e * u * u -
                    80 * e * t * u * r -
                    6 * e * a * l +
                    144 * i * n * l) +
            f * (144 * e * a * n - 27 * a * a - 128 * i * u - 192 * i * t * r)
        );
    }),
        (on.computeRealRoots = function (e, t, n, r, o) {
            if (Math.abs(e) < Te.EPSILON15)
                return nn.computeRealRoots(t, n, r, o);
            var i = t / e,
                a = n / e,
                s = r / e,
                u = o / e;
            let c = i < 0 ? 1 : 0;
            switch (
                (c =
                    (c = (c += a < 0 ? c + 1 : c) + (s < 0 ? c + 1 : c)) +
                    (u < 0 ? c + 1 : c))
            ) {
                case 0:
                    return an(i, a, s, u);
                case 1:
                case 2:
                    return sn(i, a, s, u);
                case 3:
                case 4:
                    return an(i, a, s, u);
                case 5:
                    return sn(i, a, s, u);
                case 6:
                case 7:
                    return an(i, a, s, u);
                case 8:
                    return sn(i, a, s, u);
                case 9:
                case 10:
                    return an(i, a, s, u);
                case 11:
                    return sn(i, a, s, u);
                case 12:
                case 13:
                case 14:
                case 15:
                    return an(i, a, s, u);
                default:
                    return;
            }
        }),
        (un.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.origin = Re.clone(e.origin)),
                      (t.direction = Re.clone(e.direction)),
                      t)
                    : new un(e.origin, e.direction);
        }),
        (un.getPoint = function (e, t, n) {
            return (
                ge.defined(n) || (n = new Re()),
                (n = Re.multiplyByScalar(e.direction, t, n)),
                Re.add(e.origin, n, n)
            );
        });
    const l = {
            rayPlane: function (e, t, n) {
                ge.defined(n) || (n = new Re());
                var r = e.origin,
                    e = e.direction,
                    o = t.normal,
                    i = Re.dot(o, e);
                if (!(Math.abs(i) < Te.EPSILON15)) {
                    t = (-t.distance - Re.dot(o, r)) / i;
                    if (!(t < 0))
                        return (
                            (n = Re.multiplyByScalar(e, t, n)), Re.add(r, n, n)
                        );
                }
            },
        },
        cn = new Re(),
        ln = new Re(),
        dn = new Re(),
        fn = new Re(),
        hn = new Re(),
        pn =
            ((l.rayTriangleParametric = function (e, t, n, r, o) {
                o = ge.defaultValue(o, !1);
                var i = e.origin,
                    e = e.direction,
                    n = Re.subtract(n, t, cn),
                    r = Re.subtract(r, t, ln),
                    a = Re.cross(e, r, dn),
                    s = Re.dot(n, a);
                let u, c, l, d, f;
                if (o) {
                    if (s < Te.EPSILON6) return;
                    if (
                        ((u = Re.subtract(i, t, fn)),
                        (l = Re.dot(u, a)) < 0 || l > s)
                    )
                        return;
                    if (
                        ((c = Re.cross(u, n, hn)),
                        (d = Re.dot(e, c)) < 0 || l + d > s)
                    )
                        return;
                    f = Re.dot(r, c) / s;
                } else {
                    if (Math.abs(s) < Te.EPSILON6) return;
                    o = 1 / s;
                    if (
                        ((u = Re.subtract(i, t, fn)),
                        (l = Re.dot(u, a) * o) < 0 || 1 < l)
                    )
                        return;
                    if (
                        ((c = Re.cross(u, n, hn)),
                        (d = Re.dot(e, c) * o) < 0 || 1 < l + d)
                    )
                        return;
                    f = Re.dot(r, c) * o;
                }
                return f;
            }),
            (l.rayTriangle = function (e, t, n, r, o, i) {
                t = l.rayTriangleParametric(e, t, n, r, o);
                if (ge.defined(t) && !(t < 0))
                    return (
                        ge.defined(i) || (i = new Re()),
                        Re.multiplyByScalar(e.direction, t, i),
                        Re.add(e.origin, i, i)
                    );
            }),
            new un());
    l.lineSegmentTriangle = function (e, t, n, r, o, i, a) {
        var s = pn,
            n =
                (Re.clone(e, s.origin),
                Re.subtract(t, e, s.direction),
                Re.normalize(s.direction, s.direction),
                l.rayTriangleParametric(s, n, r, o, i));
        if (!(!ge.defined(n) || n < 0 || n > Re.distance(e, t)))
            return (
                ge.defined(a) || (a = new Re()),
                Re.multiplyByScalar(s.direction, n, a),
                Re.add(s.origin, a, a)
            );
    };
    const mn = { root0: 0, root1: 0 };
    function En(e, t, n) {
        ge.defined(n) || (n = new ae());
        var r = e.origin,
            e = e.direction,
            o = t.center,
            t = t.radius * t.radius,
            r = Re.subtract(r, o, dn),
            o = (function (e, t, n, r) {
                var o,
                    n = t * t - 4 * e * n;
                if (!(n < 0)) {
                    if (0 < n)
                        return (
                            (i = 1 / (2 * e)),
                            (o = (-t + (n = Math.sqrt(n))) * i) <
                            (n = (-t - n) * i)
                                ? ((r.root0 = o), (r.root1 = n))
                                : ((r.root0 = n), (r.root1 = o)),
                            r
                        );
                    var i = -t / (2 * e);
                    return 0 != i ? ((r.root0 = r.root1 = i), r) : void 0;
                }
            })(Re.dot(e, e), 2 * Re.dot(e, r), Re.magnitudeSquared(r) - t, mn);
        if (ge.defined(o)) return (n.start = o.root0), (n.stop = o.root1), n;
    }
    l.raySphere = function (e, t, n) {
        if (((n = En(e, t, n)), ge.defined(n) && !(n.stop < 0)))
            return (n.start = Math.max(n.start, 0)), n;
    };
    const _n = new un(),
        yn =
            ((l.lineSegmentSphere = function (e, t, n, r) {
                var o = _n,
                    t = (Re.clone(e, o.origin), Re.subtract(t, e, o.direction)),
                    e = Re.magnitude(t);
                if (
                    (Re.normalize(t, t),
                    (r = En(o, n, r)),
                    !(!ge.defined(r) || r.stop < 0 || r.start > e))
                )
                    return (
                        (r.start = Math.max(r.start, 0)),
                        (r.stop = Math.min(r.stop, e)),
                        r
                    );
            }),
            new Re()),
        gn = new Re();
    function Tn(e, t, n) {
        var r = e + t;
        return Te.sign(e) !== Te.sign(t) &&
            Math.abs(r / Math.max(Math.abs(e), Math.abs(t))) < n
            ? 0
            : r;
    }
    l.rayEllipsoid = function (e, t) {
        var t = t.oneOverRadii,
            n = Re.multiplyComponents(t, e.origin, yn),
            t = Re.multiplyComponents(t, e.direction, gn),
            e = Re.magnitudeSquared(n),
            n = Re.dot(n, t);
        let r, o, i, a, s;
        if (1 < e) {
            if (0 <= n) return;
            var u = n * n;
            if (((r = e - 1), (o = Re.magnitudeSquared(t)), u < (i = o * r)))
                return;
            if (u > i)
                return (
                    (a = n * n - i),
                    (u = (s = -n + Math.sqrt(a)) / o) < (c = r / s)
                        ? new ae(u, c)
                        : { start: c, stop: u }
                );
            var c = Math.sqrt(r / o);
            return new ae(c, c);
        }
        return e < 1
            ? ((r = e - 1),
              (o = Re.magnitudeSquared(t)),
              (i = o * r),
              (a = n * n - i),
              new ae(0, (s = -n + Math.sqrt(a)) / o))
            : n < 0
            ? new ae(0, -n / (o = Re.magnitudeSquared(t)))
            : void 0;
    };
    const Rn = new Re(),
        An = new Re(),
        Sn = new Re(),
        wn = new Re(),
        In = new Re(),
        vn = new B(),
        On = new B(),
        Nn = new B(),
        xn = new B(),
        Mn = new B(),
        Pn = new B(),
        bn = new B(),
        Cn = new Re(),
        Un = new Re(),
        Dn = new Se(),
        zn =
            ((l.grazingAltitudeLocation = function (e, r) {
                var o = e.origin,
                    i = e.direction;
                if (!Re.equals(o, Re.ZERO)) {
                    var a = r.geodeticSurfaceNormal(o, Rn);
                    if (0 <= Re.dot(i, a)) return o;
                }
                var a = ge.defined(this.rayEllipsoid(e, r)),
                    e = r.transformPositionToScaledSpace(i, Rn),
                    t = Re.normalize(e, e),
                    e = Re.mostOrthogonalAxis(e, wn),
                    e = Re.normalize(Re.cross(e, t, An), An),
                    n = Re.normalize(Re.cross(t, e, Sn), Sn);
                const s = vn;
                (s[0] = t.x),
                    (s[1] = t.y),
                    (s[2] = t.z),
                    (s[3] = e.x),
                    (s[4] = e.y),
                    (s[5] = e.z),
                    (s[6] = n.x),
                    (s[7] = n.y),
                    (s[8] = n.z);
                var t = B.transpose(s, On),
                    u = B.fromScale(r.radii, Nn),
                    e = B.fromScale(r.oneOverRadii, xn);
                const c = Mn;
                (c[0] = 0),
                    (c[1] = -i.z),
                    (c[2] = i.y),
                    (c[3] = i.z),
                    (c[4] = 0),
                    (c[5] = -i.x),
                    (c[6] = -i.y),
                    (c[7] = i.x),
                    (c[8] = 0);
                var n = B.multiply(B.multiply(t, e, Pn), c, Pn),
                    t = B.multiply(B.multiply(n, u, bn), s, bn),
                    e = B.multiplyByVector(n, o, In),
                    l = (function (e, t, n, r, o) {
                        var i = r * r,
                            a = o * o,
                            s = (e[B.COLUMN1ROW1] - e[B.COLUMN2ROW2]) * a,
                            u =
                                o *
                                (r *
                                    Tn(
                                        e[B.COLUMN1ROW0],
                                        e[B.COLUMN0ROW1],
                                        Te.EPSILON15
                                    ) +
                                    t.y),
                            c =
                                e[B.COLUMN0ROW0] * i +
                                e[B.COLUMN2ROW2] * a +
                                r * t.x +
                                n,
                            l =
                                a *
                                Tn(
                                    e[B.COLUMN2ROW1],
                                    e[B.COLUMN1ROW2],
                                    Te.EPSILON15
                                ),
                            d =
                                o *
                                (r * Tn(e[B.COLUMN2ROW0], e[B.COLUMN0ROW2]) +
                                    t.z);
                        let f;
                        const h = [];
                        if (0 == d && 0 == l)
                            return (
                                0 !==
                                    (f = en.computeRealRoots(s, u, c)).length &&
                                    ((i = f[0]),
                                    (n = Math.sqrt(Math.max(1 - i * i, 0))),
                                    h.push(new Re(r, o * i, o * -n)),
                                    h.push(new Re(r, o * i, o * n)),
                                    2 === f.length &&
                                        ((a = f[1]),
                                        (e = Math.sqrt(Math.max(1 - a * a, 0))),
                                        h.push(new Re(r, o * a, o * -e)),
                                        h.push(new Re(r, o * a, o * e)))),
                                h
                            );
                        if (
                            ((a = s * s + (i = l * l)),
                            (e = 2 * (u * s + (n = d * l))),
                            (i = 2 * c * s + u * u - i + (t = d * d)),
                            (n = 2 * (c * u - n)),
                            (t = c * c - t),
                            0 != a || 0 != e || 0 != i || 0 != n)
                        ) {
                            var p = (f = on.computeRealRoots(a, e, i, n, t))
                                .length;
                            if (0 !== p)
                                for (let t = 0; t < p; ++t) {
                                    var m = f[t],
                                        E = m * m,
                                        _ = Math.max(1 - E, 0),
                                        _ = Math.sqrt(_);
                                    let e;
                                    e =
                                        Te.sign(s) === Te.sign(c)
                                            ? Tn(s * E + c, u * m, Te.EPSILON12)
                                            : Te.sign(c) === Te.sign(u * m)
                                            ? Tn(s * E, u * m + c, Te.EPSILON12)
                                            : Tn(
                                                  s * E + u * m,
                                                  c,
                                                  Te.EPSILON12
                                              );
                                    (E = Tn(l * m, d, Te.EPSILON15)),
                                        (E = e * E);
                                    E < 0
                                        ? h.push(new Re(r, o * m, o * _))
                                        : 0 < E
                                        ? h.push(new Re(r, o * m, o * -_))
                                        : 0 !== _
                                        ? (h.push(new Re(r, o * m, o * -_)),
                                          h.push(new Re(r, o * m, o * _)),
                                          ++t)
                                        : h.push(new Re(r, o * m, o * _));
                                }
                        }
                        return h;
                    })(t, Re.negate(e, Rn), 0, 0, 1);
                let d;
                var f = l.length;
                if (0 < f) {
                    let t = Re.clone(Re.ZERO, Un),
                        n = Number.NEGATIVE_INFINITY;
                    for (let e = 0; e < f; ++e) {
                        var h = B.multiplyByVector(
                                u,
                                B.multiplyByVector(s, l[e], Cn),
                                Cn
                            ),
                            p = Re.normalize(Re.subtract(h, o, wn), wn),
                            p = Re.dot(p, i);
                        p > n && ((n = p), (t = Re.clone(h, t)));
                    }
                    const m = r.cartesianToCartographic(t, Dn);
                    return (
                        (n = Te.clamp(n, 0, 1)),
                        (d =
                            Re.magnitude(Re.subtract(t, o, wn)) *
                            Math.sqrt(1 - n * n)),
                        (d = a ? -d : d),
                        (m.height = d),
                        r.cartographicToCartesian(m, new Re())
                    );
                }
            }),
            new Re());
    function I(e, t) {
        (this.normal = Re.clone(e)), (this.distance = t);
    }
    (l.lineSegmentPlane = function (e, t, n, r) {
        ge.defined(r) || (r = new Re());
        var t = Re.subtract(t, e, zn),
            o = n.normal,
            i = Re.dot(o, t);
        if (!(Math.abs(i) < Te.EPSILON6)) {
            (o = Re.dot(o, e)), (n = -(n.distance + o) / i);
            if (!(n < 0 || 1 < n))
                return Re.multiplyByScalar(t, n, r), Re.add(e, r, r), r;
        }
    }),
        (l.trianglePlaneIntersection = function (e, t, n, r) {
            var o = r.normal,
                i = r.distance,
                a = Re.dot(o, e) + i < 0,
                s = Re.dot(o, t) + i < 0,
                o = Re.dot(o, n) + i < 0,
                i = 0;
            let u, c;
            if (
                ((1 != (i = (i += a ? 1 : 0) + (s ? 1 : 0) + (o ? 1 : 0)) &&
                    2 != i) ||
                    ((u = new Re()), (c = new Re())),
                1 == i)
            ) {
                if (a)
                    return (
                        l.lineSegmentPlane(e, t, r, u),
                        l.lineSegmentPlane(e, n, r, c),
                        {
                            positions: [e, t, n, u, c],
                            indices: [0, 3, 4, 1, 2, 4, 1, 4, 3],
                        }
                    );
                if (s)
                    return (
                        l.lineSegmentPlane(t, n, r, u),
                        l.lineSegmentPlane(t, e, r, c),
                        {
                            positions: [e, t, n, u, c],
                            indices: [1, 3, 4, 2, 0, 4, 2, 4, 3],
                        }
                    );
                if (o)
                    return (
                        l.lineSegmentPlane(n, e, r, u),
                        l.lineSegmentPlane(n, t, r, c),
                        {
                            positions: [e, t, n, u, c],
                            indices: [2, 3, 4, 0, 1, 4, 0, 4, 3],
                        }
                    );
            } else if (2 == i) {
                if (!a)
                    return (
                        l.lineSegmentPlane(t, e, r, u),
                        l.lineSegmentPlane(n, e, r, c),
                        {
                            positions: [e, t, n, u, c],
                            indices: [1, 2, 4, 1, 4, 3, 0, 3, 4],
                        }
                    );
                if (!s)
                    return (
                        l.lineSegmentPlane(n, t, r, u),
                        l.lineSegmentPlane(e, t, r, c),
                        {
                            positions: [e, t, n, u, c],
                            indices: [2, 0, 4, 2, 4, 3, 1, 3, 4],
                        }
                    );
                if (!o)
                    return (
                        l.lineSegmentPlane(e, n, r, u),
                        l.lineSegmentPlane(t, n, r, c),
                        {
                            positions: [e, t, n, u, c],
                            indices: [0, 1, 4, 0, 4, 3, 2, 3, 4],
                        }
                    );
            }
        }),
        (I.fromPointNormal = function (e, t, n) {
            e = -Re.dot(t, e);
            return ge.defined(n)
                ? (Re.clone(t, n.normal), (n.distance = e), n)
                : new I(t, e);
        });
    const Fn = new Re(),
        Ln =
            ((I.fromCartesian4 = function (e, t) {
                var n = Re.fromCartesian4(e, Fn),
                    e = e.w;
                return ge.defined(t)
                    ? (Re.clone(n, t.normal), (t.distance = e), t)
                    : new I(n, e);
            }),
            (I.getPointDistance = function (e, t) {
                return Re.dot(e.normal, t) + e.distance;
            }),
            new Re()),
        Bn =
            ((I.projectPointOntoPlane = function (e, t, n) {
                ge.defined(n) || (n = new Re());
                var r = I.getPointDistance(e, t),
                    e = Re.multiplyByScalar(e.normal, r, Ln);
                return Re.subtract(t, e, n);
            }),
            new we()),
        qn = new q(),
        Vn = new Re();
    function kn(e, t, n) {
        let r = 0,
            o = e.length - 1;
        for (var i, a; r <= o; )
            if ((a = n(e[(i = ~~((r + o) / 2))], t)) < 0) r = 1 + i;
            else {
                if (!(0 < a)) return i;
                o = i - 1;
            }
        return ~(o + 1);
    }
    function Gn(e, t, n, r, o) {
        (this.xPoleWander = e),
            (this.yPoleWander = t),
            (this.xPoleOffset = n),
            (this.yPoleOffset = r),
            (this.ut1MinusUtc = o);
    }
    function Wn(e, t, n, r, o, i, a, s) {
        (this.year = e),
            (this.month = t),
            (this.day = n),
            (this.hour = r),
            (this.minute = o),
            (this.second = i),
            (this.millisecond = a),
            (this.isLeapSecond = s);
    }
    function Hn(e) {
        return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
    }
    function _(e, t) {
        (this.julianDate = e), (this.offset = t);
    }
    (I.transform = function (e, t, n) {
        var r = e.normal,
            e = e.distance,
            t = we.inverseTranspose(t, Bn),
            r = q.fromElements(r.x, r.y, r.z, e, qn),
            r = we.multiplyByVector(t, r, r),
            e = Re.fromCartesian4(r, Vn);
        return (
            (r = q.divideByScalar(r, Re.magnitude(e), r)),
            I.fromCartesian4(r, n)
        );
    }),
        (I.clone = function (e, t) {
            return ge.defined(t)
                ? (Re.clone(e.normal, t.normal), (t.distance = e.distance), t)
                : new I(e.normal, e.distance);
        }),
        (I.equals = function (e, t) {
            return e.distance === t.distance && Re.equals(e.normal, t.normal);
        }),
        (I.ORIGIN_XY_PLANE = Object.freeze(new I(Re.UNIT_Z, 0))),
        (I.ORIGIN_YZ_PLANE = Object.freeze(new I(Re.UNIT_X, 0))),
        (I.ORIGIN_ZX_PLANE = Object.freeze(new I(Re.UNIT_Y, 0)));
    var y = Object.freeze({
            SECONDS_PER_MILLISECOND: 0.001,
            SECONDS_PER_MINUTE: 60,
            MINUTES_PER_HOUR: 60,
            HOURS_PER_DAY: 24,
            SECONDS_PER_HOUR: 3600,
            MINUTES_PER_DAY: 1440,
            SECONDS_PER_DAY: 86400,
            DAYS_PER_JULIAN_CENTURY: 36525,
            PICOSECOND: 1e-9,
            MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5,
        }),
        g = Object.freeze({ UTC: 0, TAI: 1 });
    const Xn = new Wn(),
        jn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Yn(e, t) {
        return T.compare(e.julianDate, t.julianDate);
    }
    const Qn = new _();
    function Zn(e) {
        Qn.julianDate = e;
        var t = T.leapSeconds;
        let n = kn(t, Qn, Yn),
            r =
                t[(n = (n = n < 0 ? ~n : n) >= t.length ? t.length - 1 : n)]
                    .offset;
        0 < n &&
            T.secondsDifference(t[n].julianDate, e) > r &&
            (n--, (r = t[n].offset)),
            T.addSeconds(e, r, e);
    }
    function $n(e, t) {
        Qn.julianDate = e;
        var n = T.leapSeconds;
        let r = kn(n, Qn, Yn);
        if (0 === (r = r < 0 ? ~r : r)) return T.addSeconds(e, -n[0].offset, t);
        if (r >= n.length) return T.addSeconds(e, -n[r - 1].offset, t);
        var o = T.secondsDifference(n[r].julianDate, e);
        return 0 === o
            ? T.addSeconds(e, -n[r].offset, t)
            : o <= 1
            ? void 0
            : T.addSeconds(e, -n[--r].offset, t);
    }
    function Kn(e, t, n) {
        var r = (t / y.SECONDS_PER_DAY) | 0;
        return (
            (e += r),
            (t -= y.SECONDS_PER_DAY * r) < 0 && (e--, (t += y.SECONDS_PER_DAY)),
            (n.dayNumber = e),
            (n.secondsOfDay = t),
            n
        );
    }
    function Jn(e, t, n, r, o, i, a) {
        var s = ((t - 14) / 12) | 0,
            e = e + 4800 + s;
        let u =
            (((1461 * e) / 4) | 0) +
            (((367 * (t - 2 - 12 * s)) / 12) | 0) -
            (((3 * (((e + 100) / 100) | 0)) / 4) | 0) +
            n -
            32075;
        (r -= 12) < 0 && (r += 24);
        t =
            i +
            (r * y.SECONDS_PER_HOUR +
                o * y.SECONDS_PER_MINUTE +
                a * y.SECONDS_PER_MILLISECOND);
        return 43200 <= t && --u, [u, t];
    }
    const er = /^(\d{4})$/,
        tr = /^(\d{4})-(\d{2})$/,
        nr = /^(\d{4})-?(\d{3})$/,
        rr = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
        or = /^(\d{4})-?(\d{2})-?(\d{2})$/;
    e = /([Z+\-])?(\d{2})?:?(\d{2})?$/;
    const ir = /^(\d{2})(\.\d+)?/.source + e.source,
        ar = /^(\d{2}):?(\d{2})(\.\d+)?/.source + e.source,
        sr = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + e.source;
    function T(e, t, n) {
        (this.dayNumber = void 0),
            (this.secondsOfDay = void 0),
            (e = ge.defaultValue(e, 0)),
            (t = ge.defaultValue(t, 0)),
            (n = ge.defaultValue(n, g.UTC));
        var r = 0 | e;
        Kn(r, (t += (e - r) * y.SECONDS_PER_DAY), this),
            n === g.UTC && Zn(this);
    }
    (T.fromGregorianDate = function (e, t) {
        e = Jn(
            e.year,
            e.month,
            e.day,
            e.hour,
            e.minute,
            e.second,
            e.millisecond
        );
        return ge.defined(t)
            ? (Kn(e[0], e[1], t), Zn(t), t)
            : new T(e[0], e[1], g.UTC);
    }),
        (T.fromDate = function (e, t) {
            e = Jn(
                e.getUTCFullYear(),
                e.getUTCMonth() + 1,
                e.getUTCDate(),
                e.getUTCHours(),
                e.getUTCMinutes(),
                e.getUTCSeconds(),
                e.getUTCMilliseconds()
            );
            return ge.defined(t)
                ? (Kn(e[0], e[1], t), Zn(t), t)
                : new T(e[0], e[1], g.UTC);
        }),
        (T.fromIso8601 = function (t, e) {
            let n = (t = t.replace(",", ".")).split("T"),
                r,
                o = 1,
                i = 1,
                a = 0,
                s = 0,
                u = 0,
                c = 0;
            const l = n[0],
                d = n[1];
            let f, h;
            if (null !== (n = l.match(or)))
                (r = +n[1]), (o = +n[2]), (i = +n[3]);
            else if (null !== (n = l.match(tr))) (r = +n[1]), (o = +n[2]);
            else if (null !== (n = l.match(er))) r = +n[1];
            else {
                let e;
                if (null !== (n = l.match(nr)))
                    (r = +n[1]), (e = +n[2]), (h = Hn(r));
                else if (null !== (n = l.match(rr))) {
                    r = +n[1];
                    var t = +n[2],
                        p = +n[3] || 0;
                    const y = new Date(Date.UTC(r, 0, 4));
                    e = 7 * t + p - y.getUTCDay() - 3;
                }
                (f = new Date(Date.UTC(r, 0, 1))).setUTCDate(e),
                    (o = f.getUTCMonth() + 1),
                    (i = f.getUTCDate());
            }
            h = Hn(r);
            let m;
            if (ge.defined(d)) {
                null !== (n = d.match(sr))
                    ? ((a = +n[1]),
                      (s = +n[2]),
                      (u = +n[3]),
                      (c = 1e3 * +(n[4] || 0)),
                      (m = 5))
                    : null !== (n = d.match(ar))
                    ? ((a = +n[1]),
                      (s = +n[2]),
                      (u = 60 * +(n[3] || 0)),
                      (m = 4))
                    : null !== (n = d.match(ir)) &&
                      ((a = +n[1]), (s = 60 * +(n[2] || 0)), (m = 3));
                var t = n[m],
                    E = +n[m + 1],
                    _ = +(n[m + 2] || 0);
                switch (t) {
                    case "+":
                        (a -= E), (s -= _);
                        break;
                    case "-":
                        (a += E), (s += _);
                        break;
                    case "Z":
                        break;
                    default:
                        s += new Date(
                            Date.UTC(r, o - 1, i, a, s)
                        ).getTimezoneOffset();
                }
            }
            p = 60 === u;
            for (p && u--; 60 <= s; ) (s -= 60), a++;
            for (; 24 <= a; ) (a -= 24), i++;
            for (f = h && 2 === o ? 29 : jn[o - 1]; i > f; )
                (i -= f),
                    12 < ++o && ((o -= 12), r++),
                    (f = h && 2 === o ? 29 : jn[o - 1]);
            for (; s < 0; ) (s += 60), a--;
            for (; a < 0; ) (a += 24), i--;
            for (; i < 1; )
                --o < 1 && ((o += 12), r--),
                    (f = h && 2 === o ? 29 : jn[o - 1]),
                    (i += f);
            t = Jn(r, o, i, a, s, u, c);
            return (
                ge.defined(e)
                    ? (Kn(t[0], t[1], e), Zn(e))
                    : (e = new T(t[0], t[1], g.UTC)),
                p && T.addSeconds(e, 1, e),
                e
            );
        }),
        (T.now = function (e) {
            return T.fromDate(new Date(), e);
        });
    const ur = new T(0, 0, g.TAI);
    (T.toGregorianDate = function (e, t) {
        let n = !1,
            r = $n(e, ur),
            o =
                (ge.defined(r) ||
                    (T.addSeconds(e, -1, ur), (r = $n(ur, ur)), (n = !0)),
                r.dayNumber);
        var e = r.secondsOfDay,
            i = (43200 <= e && (o += 1), (o + 68569) | 0),
            a = ((4 * i) / 146097) | 0,
            s =
                ((4e3 * (1 + (i = (i - (((146097 * a + 3) / 4) | 0)) | 0))) /
                    1461001) |
                0,
            u = ((80 * (i = (i - (((1461 * s) / 4) | 0) + 31) | 0)) / 2447) | 0,
            c = (i - (((2447 * u) / 80) | 0)) | 0,
            u = (2 + u - 12 * (i = (u / 11) | 0)) | 0,
            a = (100 * (a - 49) + s + i) | 0;
        let l = (e / y.SECONDS_PER_HOUR) | 0;
        (s = e - l * y.SECONDS_PER_HOUR), (i = (s / y.SECONDS_PER_MINUTE) | 0);
        let d = 0 | (s -= i * y.SECONDS_PER_MINUTE);
        e = (s - d) / y.SECONDS_PER_MILLISECOND;
        return (
            23 < (l += 12) && (l -= 24),
            n && (d += 1),
            ge.defined(t)
                ? ((t.year = a),
                  (t.month = u),
                  (t.day = c),
                  (t.hour = l),
                  (t.minute = i),
                  (t.second = d),
                  (t.millisecond = e),
                  (t.isLeapSecond = n),
                  t)
                : new Wn(a, u, c, l, i, d, e, n)
        );
    }),
        (T.toDate = function (e) {
            e = T.toGregorianDate(e, Xn);
            let t = e.second;
            return (
                e.isLeapSecond && --t,
                new Date(
                    Date.UTC(
                        e.year,
                        e.month - 1,
                        e.day,
                        e.hour,
                        e.minute,
                        t,
                        e.millisecond
                    )
                )
            );
        }),
        (T.toIso8601 = function (e, t) {
            e = T.toGregorianDate(e, Xn);
            let n = e.year,
                r = e.month,
                o = e.day,
                i = e.hour;
            const a = e.minute,
                s = e.second;
            e = e.millisecond;
            1e4 === n &&
                1 === r &&
                1 === o &&
                0 === i &&
                0 === a &&
                0 === s &&
                0 === e &&
                ((n = 9999), (r = 12), (o = 31), (i = 24));
            let u;
            return ge.defined(t) || 0 === e
                ? ge.defined(t) && 0 !== t
                    ? ((u = (0.01 * e).toFixed(t).replace(".", "").slice(0, t)),
                      `${n.toString().padStart(4, "0")}-${r
                          .toString()
                          .padStart(2, "0")}-${o
                          .toString()
                          .padStart(2, "0")}T${i
                          .toString()
                          .padStart(2, "0")}:${a
                          .toString()
                          .padStart(2, "0")}:${s
                          .toString()
                          .padStart(2, "0")}.${u}Z`)
                    : `${n.toString().padStart(4, "0")}-${r
                          .toString()
                          .padStart(2, "0")}-${o
                          .toString()
                          .padStart(2, "0")}T${i
                          .toString()
                          .padStart(2, "0")}:${a
                          .toString()
                          .padStart(2, "0")}:${s.toString().padStart(2, "0")}Z`
                : ((u = (0.01 * e).toString().replace(".", "")),
                  `${n.toString().padStart(4, "0")}-${r
                      .toString()
                      .padStart(2, "0")}-${o.toString().padStart(2, "0")}T${i
                      .toString()
                      .padStart(2, "0")}:${a.toString().padStart(2, "0")}:${s
                      .toString()
                      .padStart(2, "0")}.${u}Z`);
        }),
        (T.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.dayNumber = e.dayNumber),
                      (t.secondsOfDay = e.secondsOfDay),
                      t)
                    : new T(e.dayNumber, e.secondsOfDay, g.TAI);
        }),
        (T.compare = function (e, t) {
            var n = e.dayNumber - t.dayNumber;
            return 0 != n ? n : e.secondsOfDay - t.secondsOfDay;
        }),
        (T.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e.dayNumber === t.dayNumber &&
                    e.secondsOfDay === t.secondsOfDay)
            );
        }),
        (T.equalsEpsilon = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        Math.abs(T.secondsDifference(e, t)) <= n)
            );
        }),
        (T.totalDays = function (e) {
            return e.dayNumber + e.secondsOfDay / y.SECONDS_PER_DAY;
        }),
        (T.secondsDifference = function (e, t) {
            return (
                (e.dayNumber - t.dayNumber) * y.SECONDS_PER_DAY +
                (e.secondsOfDay - t.secondsOfDay)
            );
        }),
        (T.daysDifference = function (e, t) {
            return (
                e.dayNumber -
                t.dayNumber +
                (e.secondsOfDay - t.secondsOfDay) / y.SECONDS_PER_DAY
            );
        }),
        (T.computeTaiMinusUtc = function (e) {
            Qn.julianDate = e;
            e = T.leapSeconds;
            let t = kn(e, Qn, Yn);
            return t < 0 && ((t = ~t), --t < 0 && (t = 0)), e[t].offset;
        }),
        (T.addSeconds = function (e, t, n) {
            return Kn(e.dayNumber, e.secondsOfDay + t, n);
        }),
        (T.addMinutes = function (e, t, n) {
            t = e.secondsOfDay + t * y.SECONDS_PER_MINUTE;
            return Kn(e.dayNumber, t, n);
        }),
        (T.addHours = function (e, t, n) {
            t = e.secondsOfDay + t * y.SECONDS_PER_HOUR;
            return Kn(e.dayNumber, t, n);
        }),
        (T.addDays = function (e, t, n) {
            return Kn(e.dayNumber + t, e.secondsOfDay, n);
        }),
        (T.lessThan = function (e, t) {
            return T.compare(e, t) < 0;
        }),
        (T.lessThanOrEquals = function (e, t) {
            return T.compare(e, t) <= 0;
        }),
        (T.greaterThan = function (e, t) {
            return 0 < T.compare(e, t);
        }),
        (T.greaterThanOrEquals = function (e, t) {
            return 0 <= T.compare(e, t);
        }),
        (T.prototype.clone = function (e) {
            return T.clone(this, e);
        }),
        (T.prototype.equals = function (e) {
            return T.equals(this, e);
        }),
        (T.prototype.equalsEpsilon = function (e, t) {
            return T.equalsEpsilon(this, e, t);
        }),
        (T.prototype.toString = function () {
            return T.toIso8601(this);
        }),
        (T.leapSeconds = [
            new _(new T(2441317, 43210, g.TAI), 10),
            new _(new T(2441499, 43211, g.TAI), 11),
            new _(new T(2441683, 43212, g.TAI), 12),
            new _(new T(2442048, 43213, g.TAI), 13),
            new _(new T(2442413, 43214, g.TAI), 14),
            new _(new T(2442778, 43215, g.TAI), 15),
            new _(new T(2443144, 43216, g.TAI), 16),
            new _(new T(2443509, 43217, g.TAI), 17),
            new _(new T(2443874, 43218, g.TAI), 18),
            new _(new T(2444239, 43219, g.TAI), 19),
            new _(new T(2444786, 43220, g.TAI), 20),
            new _(new T(2445151, 43221, g.TAI), 21),
            new _(new T(2445516, 43222, g.TAI), 22),
            new _(new T(2446247, 43223, g.TAI), 23),
            new _(new T(2447161, 43224, g.TAI), 24),
            new _(new T(2447892, 43225, g.TAI), 25),
            new _(new T(2448257, 43226, g.TAI), 26),
            new _(new T(2448804, 43227, g.TAI), 27),
            new _(new T(2449169, 43228, g.TAI), 28),
            new _(new T(2449534, 43229, g.TAI), 29),
            new _(new T(2450083, 43230, g.TAI), 30),
            new _(new T(2450630, 43231, g.TAI), 31),
            new _(new T(2451179, 43232, g.TAI), 32),
            new _(new T(2453736, 43233, g.TAI), 33),
            new _(new T(2454832, 43234, g.TAI), 34),
            new _(new T(2456109, 43235, g.TAI), 35),
            new _(new T(2457204, 43236, g.TAI), 36),
            new _(new T(2457754, 43237, g.TAI), 37),
        ]);
    var cr =
        "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {};
    function lr(e, t, n) {
        return (
            e(
                (n = {
                    path: t,
                    exports: {},
                    require: function (e, t) {
                        throw (
                            (null == t && n.path,
                            new Error(
                                "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
                            ))
                        );
                    },
                }),
                n.exports
            ),
            n.exports
        );
    }
    var dr = lr(function (e, t) {
            var n = cr,
                r = t && !t.nodeType && t,
                t = e && !e.nodeType && e,
                o = "object" == typeof cr && cr;
            (o.global !== o && o.window !== o && o.self !== o) || (n = o);
            var i,
                a,
                E = 2147483647,
                _ = 36,
                y = 26,
                s = 38,
                u = 700,
                c = /^xn--/,
                l = /[^\x20-\x7E]/,
                d = /[\x2E\u3002\uFF0E\uFF61]/g,
                f = {
                    overflow: "Overflow: input needs wider integers to process",
                    "not-basic":
                        "Illegal input >= 0x80 (not a basic code point)",
                    "invalid-input": "Invalid input",
                },
                h = _ - 1,
                g = Math.floor,
                T = String.fromCharCode;
            function R(e) {
                throw new RangeError(f[e]);
            }
            function p(e, t) {
                for (var n = e.length, r = []; n--; ) r[n] = t(e[n]);
                return r;
            }
            function m(e, t) {
                var n = e.split("@"),
                    r = "",
                    n =
                        (1 < n.length && ((r = n[0] + "@"), (e = n[1])),
                        (e = e.replace(d, ".")).split("."));
                return r + p(n, t).join(".");
            }
            function A(e) {
                for (var t, n, r = [], o = 0, i = e.length; o < i; )
                    55296 <= (t = e.charCodeAt(o++)) && t <= 56319 && o < i
                        ? 56320 == (64512 & (n = e.charCodeAt(o++)))
                            ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                            : (r.push(t), o--)
                        : r.push(t);
                return r;
            }
            function S(e) {
                return p(e, function (e) {
                    var t = "";
                    return (
                        65535 < e &&
                            ((t += T((((e -= 65536) >>> 10) & 1023) | 55296)),
                            (e = 56320 | (1023 & e))),
                        (t += T(e))
                    );
                }).join("");
            }
            function w(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
            }
            function I(e, t, n) {
                var r = 0;
                for (
                    e = n ? g(e / u) : e >> 1, e += g(e / t);
                    (h * y) >> 1 < e;
                    r += _
                )
                    e = g(e / h);
                return g(r + ((h + 1) * e) / (e + s));
            }
            function v(e) {
                var t,
                    n,
                    r,
                    o,
                    i,
                    a,
                    s,
                    u = [],
                    c = e.length,
                    l = 0,
                    d = 128,
                    f = 72,
                    h = e.lastIndexOf("-");
                for (h < 0 && (h = 0), n = 0; n < h; ++n)
                    128 <= e.charCodeAt(n) && R("not-basic"),
                        u.push(e.charCodeAt(n));
                for (r = 0 < h ? h + 1 : 0; r < c; ) {
                    for (
                        o = l, i = 1, a = _;
                        c <= r && R("invalid-input"),
                            (s = e.charCodeAt(r++)),
                            (_ <=
                                (s =
                                    s - 48 < 10
                                        ? s - 22
                                        : s - 65 < 26
                                        ? s - 65
                                        : s - 97 < 26
                                        ? s - 97
                                        : _) ||
                                s > g((E - l) / i)) &&
                                R("overflow"),
                            (l += s * i),
                            !(s < (s = a <= f ? 1 : f + y <= a ? y : a - f));
                        a += _
                    )
                        i > g(E / (s = _ - s)) && R("overflow"), (i *= s);
                    (f = I(l - o, (t = u.length + 1), 0 == o)),
                        g(l / t) > E - d && R("overflow"),
                        (d += g(l / t)),
                        (l %= t),
                        u.splice(l++, 0, d);
                }
                return S(u);
            }
            function O(e) {
                for (
                    var t,
                        n,
                        r,
                        o,
                        i,
                        a,
                        s,
                        u,
                        c,
                        l,
                        d = [],
                        f = (e = A(e)).length,
                        h = 128,
                        p = 72,
                        m = (t = 0);
                    m < f;
                    ++m
                )
                    (s = e[m]) < 128 && d.push(T(s));
                for (n = r = d.length, r && d.push("-"); n < f; ) {
                    for (o = E, m = 0; m < f; ++m)
                        h <= (s = e[m]) && s < o && (o = s);
                    for (
                        o - h > g((E - t) / (u = n + 1)) && R("overflow"),
                            t += (o - h) * u,
                            h = o,
                            m = 0;
                        m < f;
                        ++m
                    )
                        if (
                            ((s = e[m]) < h && ++t > E && R("overflow"), s == h)
                        ) {
                            for (
                                i = t, a = _;
                                !(
                                    i <
                                    (c = a <= p ? 1 : p + y <= a ? y : a - p)
                                );
                                a += _
                            )
                                d.push(
                                    T(w(c + ((l = i - c) % (c = _ - c)), 0))
                                ),
                                    (i = g(l / c));
                            d.push(T(w(i, 0))),
                                (p = I(t, u, n == r)),
                                (t = 0),
                                ++n;
                        }
                    ++t, ++h;
                }
                return d.join("");
            }
            if (
                ((i = {
                    version: "1.3.2",
                    ucs2: { decode: A, encode: S },
                    decode: v,
                    encode: O,
                    toASCII: function (e) {
                        return m(e, function (e) {
                            return l.test(e) ? "xn--" + O(e) : e;
                        });
                    },
                    toUnicode: function (e) {
                        return m(e, function (e) {
                            return c.test(e) ? v(e.slice(4).toLowerCase()) : e;
                        });
                    },
                }),
                r && t)
            )
                if (e.exports == r) t.exports = i;
                else for (a in i) i.hasOwnProperty(a) && (r[a] = i[a]);
            else n.punycode = i;
        }),
        fr = lr(function (e) {
            var t, n;
            (t = cr),
                (n = function (e) {
                    var t = e && e.IPv6;
                    return {
                        best: function (e) {
                            var t,
                                n = e.toLowerCase().split(":"),
                                r = n.length,
                                o = 8;
                            for (
                                "" === n[0] && "" === n[1] && "" === n[2]
                                    ? (n.shift(), n.shift())
                                    : "" === n[0] && "" === n[1]
                                    ? n.shift()
                                    : "" === n[r - 1] &&
                                      "" === n[r - 2] &&
                                      n.pop(),
                                    -1 !== n[(r = n.length) - 1].indexOf(".") &&
                                        (o = 7),
                                    t = 0;
                                t < r && "" !== n[t];
                                t++
                            );
                            if (t < o)
                                for (n.splice(t, 1, "0000"); n.length < o; )
                                    n.splice(t, 0, "0000");
                            for (var i = 0; i < o; i++) {
                                for (
                                    var a = n[i].split(""), s = 0;
                                    s < 3 && "0" === a[0] && 1 < a.length;
                                    s++
                                )
                                    a.splice(0, 1);
                                n[i] = a.join("");
                            }
                            for (
                                var u = -1, c = 0, l = 0, d = -1, f = !1, i = 0;
                                i < o;
                                i++
                            )
                                f
                                    ? "0" === n[i]
                                        ? (l += 1)
                                        : ((f = !1),
                                          c < l && ((u = d), (c = l)))
                                    : "0" === n[i] &&
                                      ((f = !0), (d = i), (l = 1));
                            c < l && ((u = d), (c = l)),
                                1 < c && n.splice(u, c, "");
                            var r = n.length,
                                h = "";
                            for (
                                "" === n[0] && (h = ":"), i = 0;
                                i < r && ((h += n[i]), i !== r - 1);
                                i++
                            )
                                h += ":";
                            return "" === n[r - 1] && (h += ":"), h;
                        },
                        noConflict: function () {
                            return e.IPv6 === this && (e.IPv6 = t), this;
                        },
                    };
                }),
                e.exports ? (e.exports = n()) : (t.IPv6 = n(t));
        }),
        hr = lr(function (e) {
            var t, n;
            (t = cr),
                (n = function (e) {
                    var t = e && e.SecondLevelDomains,
                        o = {
                            list: {
                                ac: " com gov mil net org ",
                                ae: " ac co gov mil name net org pro sch ",
                                af: " com edu gov net org ",
                                al: " com edu gov mil net org ",
                                ao: " co ed gv it og pb ",
                                ar: " com edu gob gov int mil net org tur ",
                                at: " ac co gv or ",
                                au: " asn com csiro edu gov id net org ",
                                ba: " co com edu gov mil net org rs unbi unmo unsa untz unze ",
                                bb: " biz co com edu gov info net org store tv ",
                                bh: " biz cc com edu gov info net org ",
                                bn: " com edu gov net org ",
                                bo: " com edu gob gov int mil net org tv ",
                                br: " adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ",
                                bs: " com edu gov net org ",
                                bz: " du et om ov rg ",
                                ca: " ab bc mb nb nf nl ns nt nu on pe qc sk yk ",
                                ck: " biz co edu gen gov info net org ",
                                cn: " ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ",
                                co: " com edu gov mil net nom org ",
                                cr: " ac c co ed fi go or sa ",
                                cy: " ac biz com ekloges gov ltd name net org parliament press pro tm ",
                                do: " art com edu gob gov mil net org sld web ",
                                dz: " art asso com edu gov net org pol ",
                                ec: " com edu fin gov info med mil net org pro ",
                                eg: " com edu eun gov mil name net org sci ",
                                er: " com edu gov ind mil net org rochest w ",
                                es: " com edu gob nom org ",
                                et: " biz com edu gov info name net org ",
                                fj: " ac biz com info mil name net org pro ",
                                fk: " ac co gov net nom org ",
                                fr: " asso com f gouv nom prd presse tm ",
                                gg: " co net org ",
                                gh: " com edu gov mil org ",
                                gn: " ac com gov net org ",
                                gr: " com edu gov mil net org ",
                                gt: " com edu gob ind mil net org ",
                                gu: " com edu gov net org ",
                                hk: " com edu gov idv net org ",
                                hu: " 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ",
                                id: " ac co go mil net or sch web ",
                                il: " ac co gov idf k12 muni net org ",
                                in: " ac co edu ernet firm gen gov i ind mil net nic org res ",
                                iq: " com edu gov i mil net org ",
                                ir: " ac co dnssec gov i id net org sch ",
                                it: " edu gov ",
                                je: " co net org ",
                                jo: " com edu gov mil name net org sch ",
                                jp: " ac ad co ed go gr lg ne or ",
                                ke: " ac co go info me mobi ne or sc ",
                                kh: " com edu gov mil net org per ",
                                ki: " biz com de edu gov info mob net org tel ",
                                km: " asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ",
                                kn: " edu gov net org ",
                                kr: " ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ",
                                kw: " com edu gov net org ",
                                ky: " com edu gov net org ",
                                kz: " com edu gov mil net org ",
                                lb: " com edu gov net org ",
                                lk: " assn com edu gov grp hotel int ltd net ngo org sch soc web ",
                                lr: " com edu gov net org ",
                                lv: " asn com conf edu gov id mil net org ",
                                ly: " com edu gov id med net org plc sch ",
                                ma: " ac co gov m net org press ",
                                mc: " asso tm ",
                                me: " ac co edu gov its net org priv ",
                                mg: " com edu gov mil nom org prd tm ",
                                mk: " com edu gov inf name net org pro ",
                                ml: " com edu gov net org presse ",
                                mn: " edu gov org ",
                                mo: " com edu gov net org ",
                                mt: " com edu gov net org ",
                                mv: " aero biz com coop edu gov info int mil museum name net org pro ",
                                mw: " ac co com coop edu gov int museum net org ",
                                mx: " com edu gob net org ",
                                my: " com edu gov mil name net org sch ",
                                nf: " arts com firm info net other per rec store web ",
                                ng: " biz com edu gov mil mobi name net org sch ",
                                ni: " ac co com edu gob mil net nom org ",
                                np: " com edu gov mil net org ",
                                nr: " biz com edu gov info net org ",
                                om: " ac biz co com edu gov med mil museum net org pro sch ",
                                pe: " com edu gob mil net nom org sld ",
                                ph: " com edu gov i mil net ngo org ",
                                pk: " biz com edu fam gob gok gon gop gos gov net org web ",
                                pl: " art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ",
                                pr: " ac biz com edu est gov info isla name net org pro prof ",
                                ps: " com edu gov net org plo sec ",
                                pw: " belau co ed go ne or ",
                                ro: " arts com firm info nom nt org rec store tm www ",
                                rs: " ac co edu gov in org ",
                                sb: " com edu gov net org ",
                                sc: " com edu gov net org ",
                                sh: " co com edu gov net nom org ",
                                sl: " com edu gov net org ",
                                st: " co com consulado edu embaixada gov mil net org principe saotome store ",
                                sv: " com edu gob org red ",
                                sz: " ac co org ",
                                tr: " av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ",
                                tt: " aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ",
                                tw: " club com ebiz edu game gov idv mil net org ",
                                mu: " ac co com gov net or org ",
                                mz: " ac co edu gov org ",
                                na: " co com ",
                                nz: " ac co cri geek gen govt health iwi maori mil net org parliament school ",
                                pa: " abo ac com edu gob ing med net nom org sld ",
                                pt: " com edu gov int net nome org publ ",
                                py: " com edu gov mil net org ",
                                qa: " com edu gov mil net org ",
                                re: " asso com nom ",
                                ru: " ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ",
                                rw: " ac co com edu gouv gov int mil net ",
                                sa: " com edu gov med net org pub sch ",
                                sd: " com edu gov info med net org tv ",
                                se: " a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ",
                                sg: " com edu gov idn net org per ",
                                sn: " art com edu gouv org perso univ ",
                                sy: " com edu gov mil net news org ",
                                th: " ac co go in mi net or ",
                                tj: " ac biz co com edu go gov info int mil name net nic org test web ",
                                tn: " agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ",
                                tz: " ac co go ne or ",
                                ua: " biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ",
                                ug: " ac co go ne or org sc ",
                                uk: " ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ",
                                us: " dni fed isa kids nsn ",
                                uy: " com edu gub mil net org ",
                                ve: " co com edu gob info mil net org web ",
                                vi: " co com k12 net org ",
                                vn: " ac biz com edu gov health info int name net org pro ",
                                ye: " co com gov ltd me net org plc ",
                                yu: " ac co edu gov org ",
                                za: " ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ",
                                zm: " ac co com edu gov net org sch ",
                                com: "ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ",
                                net: "gb jp se uk ",
                                org: "ae",
                                de: "com ",
                            },
                            has: function (e) {
                                var t = e.lastIndexOf(".");
                                if (t <= 0 || t >= e.length - 1) return !1;
                                var n = e.lastIndexOf(".", t - 1);
                                if (n <= 0 || t - 1 <= n) return !1;
                                var r = o.list[e.slice(t + 1)];
                                return (
                                    !!r &&
                                    0 <=
                                        r.indexOf(" " + e.slice(n + 1, t) + " ")
                                );
                            },
                            is: function (e) {
                                var t = e.lastIndexOf(".");
                                if (t <= 0 || t >= e.length - 1) return !1;
                                if (0 <= e.lastIndexOf(".", t - 1)) return !1;
                                var n = o.list[e.slice(t + 1)];
                                return (
                                    !!n &&
                                    0 <= n.indexOf(" " + e.slice(0, t) + " ")
                                );
                            },
                            get: function (e) {
                                var t = e.lastIndexOf(".");
                                if (t <= 0 || t >= e.length - 1) return null;
                                var n = e.lastIndexOf(".", t - 1);
                                if (n <= 0 || t - 1 <= n) return null;
                                var r = o.list[e.slice(t + 1)];
                                return !r ||
                                    r.indexOf(" " + e.slice(n + 1, t) + " ") < 0
                                    ? null
                                    : e.slice(n + 1);
                            },
                            noConflict: function () {
                                return (
                                    e.SecondLevelDomains === this &&
                                        (e.SecondLevelDomains = t),
                                    this
                                );
                            },
                        };
                    return o;
                }),
                e.exports ? (e.exports = n()) : (t.SecondLevelDomains = n(t));
        }),
        pr = lr(function (e) {
            var t, n;
            (t = cr),
                (n = function (s, t, c, n) {
                    var r = n && n.URI;
                    function p(e, t) {
                        var n = 1 <= arguments.length;
                        if (!(this instanceof p))
                            return n
                                ? 2 <= arguments.length
                                    ? new p(e, t)
                                    : new p(e)
                                : new p();
                        if (void 0 === e) {
                            if (n)
                                throw new TypeError(
                                    "undefined is not a valid argument for URI"
                                );
                            e =
                                "undefined" != typeof location
                                    ? location.href + ""
                                    : "";
                        }
                        if (null === e && n)
                            throw new TypeError(
                                "null is not a valid argument for URI"
                            );
                        return (
                            this.href(e),
                            void 0 !== t ? this.absoluteTo(t) : this
                        );
                    }
                    p.version = "1.19.11";
                    var e = p.prototype,
                        u = Object.prototype.hasOwnProperty;
                    function i(e) {
                        return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
                    }
                    function a(e) {
                        return void 0 === e
                            ? "Undefined"
                            : String(Object.prototype.toString.call(e)).slice(
                                  8,
                                  -1
                              );
                    }
                    function l(e) {
                        return "Array" === a(e);
                    }
                    function d(e, t) {
                        var n,
                            r,
                            o = {};
                        if ("RegExp" === a(t)) o = null;
                        else if (l(t))
                            for (n = 0, r = t.length; n < r; n++) o[t[n]] = !0;
                        else o[t] = !0;
                        for (n = 0, r = e.length; n < r; n++)
                            ((o && void 0 !== o[e[n]]) ||
                                (!o && t.test(e[n]))) &&
                                (e.splice(n, 1), r--, n--);
                        return e;
                    }
                    function f(e, t) {
                        if (l(t)) {
                            for (r = 0, o = t.length; r < o; r++)
                                if (!f(e, t[r])) return !1;
                            return !0;
                        }
                        for (var n = a(t), r = 0, o = e.length; r < o; r++)
                            if ("RegExp" === n) {
                                if ("string" == typeof e[r] && e[r].match(t))
                                    return !0;
                            } else if (e[r] === t) return !0;
                        return !1;
                    }
                    function h(e, t) {
                        if (!l(e) || !l(t)) return !1;
                        if (e.length !== t.length) return !1;
                        e.sort(), t.sort();
                        for (var n = 0, r = e.length; n < r; n++)
                            if (e[n] !== t[n]) return !1;
                        return !0;
                    }
                    function m(e) {
                        return e.replace(/^\/+|\/+$/g, "");
                    }
                    function o(e) {
                        return escape(e);
                    }
                    function E(e) {
                        return encodeURIComponent(e)
                            .replace(/[!'()*]/g, o)
                            .replace(/\*/g, "%2A");
                    }
                    (p._parts = function () {
                        return {
                            protocol: null,
                            username: null,
                            password: null,
                            hostname: null,
                            urn: null,
                            port: null,
                            path: null,
                            query: null,
                            fragment: null,
                            preventInvalidHostname: p.preventInvalidHostname,
                            duplicateQueryParameters:
                                p.duplicateQueryParameters,
                            escapeQuerySpace: p.escapeQuerySpace,
                        };
                    }),
                        (p.preventInvalidHostname = !1),
                        (p.duplicateQueryParameters = !1),
                        (p.escapeQuerySpace = !0),
                        (p.protocol_expression = /^[a-z][a-z0-9.+-]*$/i),
                        (p.idn_expression = /[^a-z0-9\._-]/i),
                        (p.punycode_expression = /(xn--)/i),
                        (p.ip4_expression =
                            /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
                        (p.ip6_expression =
                            /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),
                        (p.find_uri_expression =
                            /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi),
                        (p.findUri = {
                            start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
                            end: /[\s\r\n]|$/,
                            trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
                            parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
                        }),
                        (p.leading_whitespace_expression =
                            /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/),
                        (p.ascii_tab_whitespace = /[\u0009\u000A\u000D]+/g),
                        (p.defaultPorts = {
                            http: "80",
                            https: "443",
                            ftp: "21",
                            gopher: "70",
                            ws: "80",
                            wss: "443",
                        }),
                        (p.hostProtocols = ["http", "https"]),
                        (p.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/),
                        (p.domAttributes = {
                            a: "href",
                            blockquote: "cite",
                            link: "href",
                            base: "href",
                            script: "src",
                            form: "action",
                            img: "src",
                            area: "href",
                            iframe: "src",
                            embed: "src",
                            source: "src",
                            track: "src",
                            input: "src",
                            audio: "src",
                            video: "src",
                        }),
                        (p.getDomAttribute = function (e) {
                            if (e && e.nodeName) {
                                var t = e.nodeName.toLowerCase();
                                if ("input" !== t || "image" === e.type)
                                    return p.domAttributes[t];
                            }
                        }),
                        (p.encode = E),
                        (p.decode = decodeURIComponent),
                        (p.iso8859 = function () {
                            (p.encode = escape), (p.decode = unescape);
                        }),
                        (p.unicode = function () {
                            (p.encode = E), (p.decode = decodeURIComponent);
                        }),
                        (p.characters = {
                            pathname: {
                                encode: {
                                    expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
                                    map: {
                                        "%24": "$",
                                        "%26": "&",
                                        "%2B": "+",
                                        "%2C": ",",
                                        "%3B": ";",
                                        "%3D": "=",
                                        "%3A": ":",
                                        "%40": "@",
                                    },
                                },
                                decode: {
                                    expression: /[\/\?#]/g,
                                    map: { "/": "%2F", "?": "%3F", "#": "%23" },
                                },
                            },
                            reserved: {
                                encode: {
                                    expression:
                                        /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
                                    map: {
                                        "%3A": ":",
                                        "%2F": "/",
                                        "%3F": "?",
                                        "%23": "#",
                                        "%5B": "[",
                                        "%5D": "]",
                                        "%40": "@",
                                        "%21": "!",
                                        "%24": "$",
                                        "%26": "&",
                                        "%27": "'",
                                        "%28": "(",
                                        "%29": ")",
                                        "%2A": "*",
                                        "%2B": "+",
                                        "%2C": ",",
                                        "%3B": ";",
                                        "%3D": "=",
                                    },
                                },
                            },
                            urnpath: {
                                encode: {
                                    expression:
                                        /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
                                    map: {
                                        "%21": "!",
                                        "%24": "$",
                                        "%27": "'",
                                        "%28": "(",
                                        "%29": ")",
                                        "%2A": "*",
                                        "%2B": "+",
                                        "%2C": ",",
                                        "%3B": ";",
                                        "%3D": "=",
                                        "%40": "@",
                                    },
                                },
                                decode: {
                                    expression: /[\/\?#:]/g,
                                    map: {
                                        "/": "%2F",
                                        "?": "%3F",
                                        "#": "%23",
                                        ":": "%3A",
                                    },
                                },
                            },
                        }),
                        (p.encodeQuery = function (e, t) {
                            e = p.encode(e + "");
                            return (t = void 0 === t ? p.escapeQuerySpace : t)
                                ? e.replace(/%20/g, "+")
                                : e;
                        }),
                        (p.decodeQuery = function (t, e) {
                            (t += ""), void 0 === e && (e = p.escapeQuerySpace);
                            try {
                                return p.decode(
                                    e ? t.replace(/\+/g, "%20") : t
                                );
                            } catch (e) {
                                return t;
                            }
                        });
                    function _(n, r) {
                        return function (t) {
                            try {
                                return p[r](t + "").replace(
                                    p.characters[n][r].expression,
                                    function (e) {
                                        return p.characters[n][r].map[e];
                                    }
                                );
                            } catch (e) {
                                return t;
                            }
                        };
                    }
                    var y,
                        g = { encode: "encode", decode: "decode" };
                    for (y in g)
                        (p[y + "PathSegment"] = _("pathname", g[y])),
                            (p[y + "UrnPathSegment"] = _("urnpath", g[y]));
                    function T(i, a, s) {
                        return function (e) {
                            for (
                                var t = s
                                        ? function (e) {
                                              return p[a](p[s](e));
                                          }
                                        : p[a],
                                    n = (e + "").split(i),
                                    r = 0,
                                    o = n.length;
                                r < o;
                                r++
                            )
                                n[r] = t(n[r]);
                            return n.join(i);
                        };
                    }
                    function R(n) {
                        return function (e, t) {
                            return void 0 === e
                                ? this._parts[n] || ""
                                : ((this._parts[n] = e || null),
                                  this.build(!t),
                                  this);
                        };
                    }
                    function A(n, r) {
                        return function (e, t) {
                            return void 0 === e
                                ? this._parts[n] || ""
                                : (null !== e &&
                                      (e += "").charAt(0) === r &&
                                      (e = e.substring(1)),
                                  (this._parts[n] = e),
                                  this.build(!t),
                                  this);
                        };
                    }
                    (p.decodePath = T("/", "decodePathSegment")),
                        (p.decodeUrnPath = T(":", "decodeUrnPathSegment")),
                        (p.recodePath = T("/", "encodePathSegment", "decode")),
                        (p.recodeUrnPath = T(
                            ":",
                            "encodeUrnPathSegment",
                            "decode"
                        )),
                        (p.encodeReserved = _("reserved", "encode")),
                        (p.parse = function (e, t) {
                            var n;
                            return (
                                (t = t || {
                                    preventInvalidHostname:
                                        p.preventInvalidHostname,
                                }),
                                -1 <
                                    (n = (e = (e = e.replace(
                                        p.leading_whitespace_expression,
                                        ""
                                    )).replace(
                                        p.ascii_tab_whitespace,
                                        ""
                                    )).indexOf("#")) &&
                                    ((t.fragment = e.substring(n + 1) || null),
                                    (e = e.substring(0, n))),
                                -1 < (n = e.indexOf("?")) &&
                                    ((t.query = e.substring(n + 1) || null),
                                    (e = e.substring(0, n))),
                                "//" ===
                                (e = (e = e.replace(
                                    /^(https?|ftp|wss?)?:+[/\\]*/i,
                                    "$1://"
                                )).replace(/^[/\\]{2,}/i, "//")).substring(0, 2)
                                    ? ((t.protocol = null),
                                      (e = e.substring(2)),
                                      (e = p.parseAuthority(e, t)))
                                    : -1 < (n = e.indexOf(":")) &&
                                      ((t.protocol = e.substring(0, n) || null),
                                      t.protocol &&
                                      !t.protocol.match(p.protocol_expression)
                                          ? (t.protocol = void 0)
                                          : "//" ===
                                            e
                                                .substring(n + 1, n + 3)
                                                .replace(/\\/g, "/")
                                          ? ((e = e.substring(n + 3)),
                                            (e = p.parseAuthority(e, t)))
                                          : ((e = e.substring(n + 1)),
                                            (t.urn = !0))),
                                (t.path = e),
                                t
                            );
                        }),
                        (p.parseHost = function (e, t) {
                            var n,
                                r,
                                o = (e = (e = e || "").replace(
                                    /\\/g,
                                    "/"
                                )).indexOf("/");
                            return (
                                -1 === o && (o = e.length),
                                "[" === e.charAt(0)
                                    ? ((r = e.indexOf("]")),
                                      (t.hostname = e.substring(1, r) || null),
                                      (t.port = e.substring(r + 2, o) || null),
                                      "/" === t.port && (t.port = null))
                                    : ((r = e.indexOf(":")),
                                      (n = e.indexOf("/")),
                                      -1 !== (r = e.indexOf(":", r + 1)) &&
                                      (-1 === n || r < n)
                                          ? ((t.hostname =
                                                e.substring(0, o) || null),
                                            (t.port = null))
                                          : ((r = e.substring(0, o).split(":")),
                                            (t.hostname = r[0] || null),
                                            (t.port = r[1] || null))),
                                t.hostname &&
                                    "/" !== e.substring(o).charAt(0) &&
                                    (o++, (e = "/" + e)),
                                t.preventInvalidHostname &&
                                    p.ensureValidHostname(
                                        t.hostname,
                                        t.protocol
                                    ),
                                t.port && p.ensureValidPort(t.port),
                                e.substring(o) || "/"
                            );
                        }),
                        (p.parseAuthority = function (e, t) {
                            return (
                                (e = p.parseUserinfo(e, t)), p.parseHost(e, t)
                            );
                        }),
                        (p.parseUserinfo = function (e, t) {
                            var n = e,
                                r = (e =
                                    -1 !== e.indexOf("\\")
                                        ? e.replace(/\\/g, "/")
                                        : e).indexOf("/"),
                                o = e.lastIndexOf(
                                    "@",
                                    -1 < r ? r : e.length - 1
                                );
                            return (
                                -1 < o && (-1 === r || o < r)
                                    ? ((r = e.substring(0, o).split(":")),
                                      (t.username = r[0]
                                          ? p.decode(r[0])
                                          : null),
                                      r.shift(),
                                      (t.password = r[0]
                                          ? p.decode(r.join(":"))
                                          : null),
                                      (e = n.substring(o + 1)))
                                    : ((t.username = null),
                                      (t.password = null)),
                                e
                            );
                        }),
                        (p.parseQuery = function (e, t) {
                            if (!e) return {};
                            if (
                                !(e = e
                                    .replace(/&+/g, "&")
                                    .replace(/^\?*&*|&+$/g, ""))
                            )
                                return {};
                            for (
                                var n,
                                    r,
                                    o = {},
                                    i = e.split("&"),
                                    a = i.length,
                                    s = 0;
                                s < a;
                                s++
                            )
                                (r = i[s].split("=")),
                                    (n = p.decodeQuery(r.shift(), t)),
                                    (r = r.length
                                        ? p.decodeQuery(r.join("="), t)
                                        : null),
                                    "__proto__" !== n &&
                                        (u.call(o, n)
                                            ? (("string" != typeof o[n] &&
                                                  null !== o[n]) ||
                                                  (o[n] = [o[n]]),
                                              o[n].push(r))
                                            : (o[n] = r));
                            return o;
                        }),
                        (p.build = function (e) {
                            var t = "",
                                n = !1;
                            return (
                                e.protocol && (t += e.protocol + ":"),
                                e.urn ||
                                    (!t && !e.hostname) ||
                                    ((t += "//"), (n = !0)),
                                (t += p.buildAuthority(e) || ""),
                                "string" == typeof e.path &&
                                    ("/" !== e.path.charAt(0) &&
                                        n &&
                                        (t += "/"),
                                    (t += e.path)),
                                "string" == typeof e.query &&
                                    e.query &&
                                    (t += "?" + e.query),
                                "string" == typeof e.fragment &&
                                    e.fragment &&
                                    (t += "#" + e.fragment),
                                t
                            );
                        }),
                        (p.buildHost = function (e) {
                            var t = "";
                            return e.hostname
                                ? (p.ip6_expression.test(e.hostname)
                                      ? (t += "[" + e.hostname + "]")
                                      : (t += e.hostname),
                                  e.port && (t += ":" + e.port),
                                  t)
                                : "";
                        }),
                        (p.buildAuthority = function (e) {
                            return p.buildUserinfo(e) + p.buildHost(e);
                        }),
                        (p.buildUserinfo = function (e) {
                            var t = "";
                            return (
                                e.username && (t += p.encode(e.username)),
                                e.password && (t += ":" + p.encode(e.password)),
                                t && (t += "@"),
                                t
                            );
                        }),
                        (p.buildQuery = function (e, t, n) {
                            var r,
                                o,
                                i,
                                a,
                                s = "";
                            for (o in e)
                                if ("__proto__" !== o && u.call(e, o))
                                    if (l(e[o]))
                                        for (
                                            r = {}, i = 0, a = e[o].length;
                                            i < a;
                                            i++
                                        )
                                            void 0 !== e[o][i] &&
                                                void 0 === r[e[o][i] + ""] &&
                                                ((s +=
                                                    "&" +
                                                    p.buildQueryParameter(
                                                        o,
                                                        e[o][i],
                                                        n
                                                    )),
                                                !0 !== t &&
                                                    (r[e[o][i] + ""] = !0));
                                    else
                                        void 0 !== e[o] &&
                                            (s +=
                                                "&" +
                                                p.buildQueryParameter(
                                                    o,
                                                    e[o],
                                                    n
                                                ));
                            return s.substring(1);
                        }),
                        (p.buildQueryParameter = function (e, t, n) {
                            return (
                                p.encodeQuery(e, n) +
                                (null !== t ? "=" + p.encodeQuery(t, n) : "")
                            );
                        }),
                        (p.addQuery = function (e, t, n) {
                            if ("object" == typeof t)
                                for (var r in t)
                                    u.call(t, r) && p.addQuery(e, r, t[r]);
                            else {
                                if ("string" != typeof t)
                                    throw new TypeError(
                                        "URI.addQuery() accepts an object, string as the name parameter"
                                    );
                                void 0 === e[t]
                                    ? (e[t] = n)
                                    : ("string" == typeof e[t] &&
                                          (e[t] = [e[t]]),
                                      l(n) || (n = [n]),
                                      (e[t] = (e[t] || []).concat(n)));
                            }
                        }),
                        (p.setQuery = function (e, t, n) {
                            if ("object" == typeof t)
                                for (var r in t)
                                    u.call(t, r) && p.setQuery(e, r, t[r]);
                            else {
                                if ("string" != typeof t)
                                    throw new TypeError(
                                        "URI.setQuery() accepts an object, string as the name parameter"
                                    );
                                e[t] = void 0 === n ? null : n;
                            }
                        }),
                        (p.removeQuery = function (e, t, n) {
                            var r, o, i;
                            if (l(t))
                                for (r = 0, o = t.length; r < o; r++)
                                    e[t[r]] = void 0;
                            else if ("RegExp" === a(t))
                                for (i in e) t.test(i) && (e[i] = void 0);
                            else if ("object" == typeof t)
                                for (i in t)
                                    u.call(t, i) && p.removeQuery(e, i, t[i]);
                            else {
                                if ("string" != typeof t)
                                    throw new TypeError(
                                        "URI.removeQuery() accepts an object, string, RegExp as the first parameter"
                                    );
                                void 0 !== n
                                    ? "RegExp" === a(n)
                                        ? !l(e[t]) && n.test(e[t])
                                            ? (e[t] = void 0)
                                            : (e[t] = d(e[t], n))
                                        : e[t] !== String(n) ||
                                          (l(n) && 1 !== n.length)
                                        ? l(e[t]) && (e[t] = d(e[t], n))
                                        : (e[t] = void 0)
                                    : (e[t] = void 0);
                            }
                        }),
                        (p.hasQuery = function (e, t, n, r) {
                            switch (a(t)) {
                                case "String":
                                    break;
                                case "RegExp":
                                    for (var o in e)
                                        if (
                                            u.call(e, o) &&
                                            t.test(o) &&
                                            (void 0 === n ||
                                                p.hasQuery(e, o, n))
                                        )
                                            return !0;
                                    return !1;
                                case "Object":
                                    for (var i in t)
                                        if (
                                            u.call(t, i) &&
                                            !p.hasQuery(e, i, t[i])
                                        )
                                            return !1;
                                    return !0;
                                default:
                                    throw new TypeError(
                                        "URI.hasQuery() accepts a string, regular expression or object as the name parameter"
                                    );
                            }
                            switch (a(n)) {
                                case "Undefined":
                                    return t in e;
                                case "Boolean":
                                    return (
                                        n ===
                                        Boolean(l(e[t]) ? e[t].length : e[t])
                                    );
                                case "Function":
                                    return !!n(e[t], t, e);
                                case "Array":
                                    return l(e[t]) ? (r ? f : h)(e[t], n) : !1;
                                case "RegExp":
                                    return l(e[t])
                                        ? !!r && f(e[t], n)
                                        : Boolean(e[t] && e[t].match(n));
                                case "Number":
                                    n = String(n);
                                case "String":
                                    return l(e[t])
                                        ? !!r && f(e[t], n)
                                        : e[t] === n;
                                default:
                                    throw new TypeError(
                                        "URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter"
                                    );
                            }
                        }),
                        (p.joinPaths = function () {
                            for (
                                var e = [], t = [], n = 0, r = 0;
                                r < arguments.length;
                                r++
                            )
                                for (
                                    var o = new p(arguments[r]),
                                        i = (e.push(o), o.segment()),
                                        a = 0;
                                    a < i.length;
                                    a++
                                )
                                    "string" == typeof i[a] && t.push(i[a]),
                                        i[a] && n++;
                            if (!t.length || !n) return new p("");
                            var s = new p("").segment(t);
                            return (
                                ("" !== e[0].path() &&
                                    "/" !== e[0].path().slice(0, 1)) ||
                                    s.path("/" + s.path()),
                                s.normalize()
                            );
                        }),
                        (p.commonPath = function (e, t) {
                            for (
                                var n = Math.min(e.length, t.length), r = 0;
                                r < n;
                                r++
                            )
                                if (e.charAt(r) !== t.charAt(r)) {
                                    r--;
                                    break;
                                }
                            return r < 1
                                ? e.charAt(0) === t.charAt(0) &&
                                  "/" === e.charAt(0)
                                    ? "/"
                                    : ""
                                : (("/" === e.charAt(r) &&
                                      "/" === t.charAt(r)) ||
                                      (r = e.substring(0, r).lastIndexOf("/")),
                                  e.substring(0, r + 1));
                        }),
                        (p.withinString = function (e, t, n) {
                            var r = (n = n || {}).start || p.findUri.start,
                                o = n.end || p.findUri.end,
                                i = n.trim || p.findUri.trim,
                                a = n.parens || p.findUri.parens,
                                s = /[a-z0-9-]=["']?$/i;
                            for (r.lastIndex = 0; ; ) {
                                var u = r.exec(e);
                                if (!u) break;
                                var c = u.index;
                                if (n.ignoreHtml) {
                                    var l = e.slice(Math.max(c - 3, 0), c);
                                    if (l && s.test(l)) continue;
                                }
                                for (
                                    var l = c + e.slice(c).search(o),
                                        d = e.slice(c, l),
                                        f = -1;
                                    ;

                                ) {
                                    var h = a.exec(d);
                                    if (!h) break;
                                    (h = h.index + h[0].length),
                                        (f = Math.max(f, h));
                                }
                                (d =
                                    -1 < f
                                        ? d.slice(0, f) +
                                          d.slice(f).replace(i, "")
                                        : d.replace(i, "")).length <=
                                    u[0].length ||
                                    (n.ignore && n.ignore.test(d)) ||
                                    (void 0 ===
                                    (u = t(d, c, (l = c + d.length), e))
                                        ? (r.lastIndex = l)
                                        : ((u = String(u)),
                                          (e = e.slice(0, c) + u + e.slice(l)),
                                          (r.lastIndex = c + u.length)));
                            }
                            return (r.lastIndex = 0), e;
                        }),
                        (p.ensureValidHostname = function (e, t) {
                            var n = !!e,
                                r = !1;
                            if ((r = !!t ? f(p.hostProtocols, t) : r) && !n)
                                throw new TypeError(
                                    "Hostname cannot be empty, if protocol is " +
                                        t
                                );
                            if (e && e.match(p.invalid_hostname_characters)) {
                                if (!s)
                                    throw new TypeError(
                                        'Hostname "' +
                                            e +
                                            '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available'
                                    );
                                if (
                                    s
                                        .toASCII(e)
                                        .match(p.invalid_hostname_characters)
                                )
                                    throw new TypeError(
                                        'Hostname "' +
                                            e +
                                            '" contains characters other than [A-Z0-9.-:_]'
                                    );
                            }
                        }),
                        (p.ensureValidPort = function (e) {
                            if (e) {
                                var t = Number(e);
                                if (!(/^[0-9]+$/.test(t) && 0 < t && t < 65536))
                                    throw new TypeError(
                                        'Port "' + e + '" is not a valid port'
                                    );
                            }
                        }),
                        (p.noConflict = function (e) {
                            return e
                                ? ((e = { URI: this.noConflict() }),
                                  n.URITemplate &&
                                      "function" ==
                                          typeof n.URITemplate.noConflict &&
                                      (e.URITemplate =
                                          n.URITemplate.noConflict()),
                                  n.IPv6 &&
                                      "function" == typeof n.IPv6.noConflict &&
                                      (e.IPv6 = n.IPv6.noConflict()),
                                  n.SecondLevelDomains &&
                                      "function" ==
                                          typeof n.SecondLevelDomains
                                              .noConflict &&
                                      (e.SecondLevelDomains =
                                          n.SecondLevelDomains.noConflict()),
                                  e)
                                : (n.URI === this && (n.URI = r), this);
                        }),
                        (e.build = function (e) {
                            return (
                                !0 === e
                                    ? (this._deferred_build = !0)
                                    : (void 0 !== e && !this._deferred_build) ||
                                      ((this._string = p.build(this._parts)),
                                      (this._deferred_build = !1)),
                                this
                            );
                        }),
                        (e.clone = function () {
                            return new p(this);
                        }),
                        (e.valueOf = e.toString =
                            function () {
                                return this.build(!1)._string;
                            }),
                        (e.protocol = R("protocol")),
                        (e.username = R("username")),
                        (e.password = R("password")),
                        (e.hostname = R("hostname")),
                        (e.port = R("port")),
                        (e.query = A("query", "?")),
                        (e.fragment = A("fragment", "#")),
                        (e.search = function (e, t) {
                            e = this.query(e, t);
                            return "string" == typeof e && e.length
                                ? "?" + e
                                : e;
                        }),
                        (e.hash = function (e, t) {
                            e = this.fragment(e, t);
                            return "string" == typeof e && e.length
                                ? "#" + e
                                : e;
                        }),
                        (e.pathname = function (e, t) {
                            var n;
                            return void 0 === e || !0 === e
                                ? ((n =
                                      this._parts.path ||
                                      (this._parts.hostname ? "/" : "")),
                                  e
                                      ? (this._parts.urn
                                            ? p.decodeUrnPath
                                            : p.decodePath)(n)
                                      : n)
                                : (this._parts.urn
                                      ? (this._parts.path = e
                                            ? p.recodeUrnPath(e)
                                            : "")
                                      : (this._parts.path = e
                                            ? p.recodePath(e)
                                            : "/"),
                                  this.build(!t),
                                  this);
                        }),
                        (e.path = e.pathname),
                        (e.href = function (e, t) {
                            if (void 0 === e) return this.toString();
                            (this._string = ""), (this._parts = p._parts());
                            var n = e instanceof p,
                                r =
                                    "object" == typeof e &&
                                    (e.hostname || e.path || e.pathname);
                            if (
                                (e.nodeName &&
                                    ((e = e[p.getDomAttribute(e)] || ""),
                                    (r = !1)),
                                "string" ==
                                    typeof (e =
                                        !n && r && void 0 !== e.pathname
                                            ? e.toString()
                                            : e) || e instanceof String)
                            )
                                this._parts = p.parse(String(e), this._parts);
                            else {
                                if (!n && !r)
                                    throw new TypeError("invalid input");
                                var o = n ? e._parts : e;
                                for (var i in o)
                                    "query" !== i &&
                                        u.call(this._parts, i) &&
                                        (this._parts[i] = o[i]);
                                o.query && this.query(o.query, !1);
                            }
                            return this.build(!t), this;
                        }),
                        (e.is = function (e) {
                            var t = !1,
                                n = !1,
                                r = !1,
                                o = !1,
                                i = !1,
                                a = !1,
                                s = !1,
                                u = !this._parts.urn;
                            switch (
                                (this._parts.hostname &&
                                    ((u = !1),
                                    (n = p.ip4_expression.test(
                                        this._parts.hostname
                                    )),
                                    (r = p.ip6_expression.test(
                                        this._parts.hostname
                                    )),
                                    (i =
                                        (o = !(t = n || r)) &&
                                        c &&
                                        c.has(this._parts.hostname)),
                                    (a =
                                        o &&
                                        p.idn_expression.test(
                                            this._parts.hostname
                                        )),
                                    (s =
                                        o &&
                                        p.punycode_expression.test(
                                            this._parts.hostname
                                        ))),
                                e.toLowerCase())
                            ) {
                                case "relative":
                                    return u;
                                case "absolute":
                                    return !u;
                                case "domain":
                                case "name":
                                    return o;
                                case "sld":
                                    return i;
                                case "ip":
                                    return t;
                                case "ip4":
                                case "ipv4":
                                case "inet4":
                                    return n;
                                case "ip6":
                                case "ipv6":
                                case "inet6":
                                    return r;
                                case "idn":
                                    return a;
                                case "url":
                                    return !this._parts.urn;
                                case "urn":
                                    return !!this._parts.urn;
                                case "punycode":
                                    return s;
                            }
                            return null;
                        });
                    var S = e.protocol,
                        w = e.port,
                        I = e.hostname,
                        v =
                            ((e.protocol = function (e, t) {
                                if (
                                    e &&
                                    !(e = e.replace(/:(\/\/)?$/, "")).match(
                                        p.protocol_expression
                                    )
                                )
                                    throw new TypeError(
                                        'Protocol "' +
                                            e +
                                            "\" contains characters other than [A-Z0-9.+-] or doesn't start with [A-Z]"
                                    );
                                return S.call(this, e, t);
                            }),
                            (e.scheme = e.protocol),
                            (e.port = function (e, t) {
                                return this._parts.urn
                                    ? void 0 === e
                                        ? ""
                                        : this
                                    : (void 0 !== e &&
                                          (e = 0 === e ? null : e) &&
                                          (":" === (e += "").charAt(0) &&
                                              (e = e.substring(1)),
                                          p.ensureValidPort(e)),
                                      w.call(this, e, t));
                            }),
                            (e.hostname = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (void 0 !== e) {
                                    var n = {
                                        preventInvalidHostname:
                                            this._parts.preventInvalidHostname,
                                    };
                                    if ("/" !== p.parseHost(e, n))
                                        throw new TypeError(
                                            'Hostname "' +
                                                e +
                                                '" contains characters other than [A-Z0-9.-]'
                                        );
                                    (e = n.hostname),
                                        this._parts.preventInvalidHostname &&
                                            p.ensureValidHostname(
                                                e,
                                                this._parts.protocol
                                            );
                                }
                                return I.call(this, e, t);
                            }),
                            (e.origin = function (e, t) {
                                return this._parts.urn
                                    ? void 0 === e
                                        ? ""
                                        : this
                                    : void 0 === e
                                    ? ((n = this.protocol()),
                                      this.authority()
                                          ? (n ? n + "://" : "") +
                                            this.authority()
                                          : "")
                                    : ((n = p(e)),
                                      this.protocol(n.protocol())
                                          .authority(n.authority())
                                          .build(!t),
                                      this);
                                var n;
                            }),
                            (e.host = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (void 0 === e)
                                    return this._parts.hostname
                                        ? p.buildHost(this._parts)
                                        : "";
                                if ("/" !== p.parseHost(e, this._parts))
                                    throw new TypeError(
                                        'Hostname "' +
                                            e +
                                            '" contains characters other than [A-Z0-9.-]'
                                    );
                                return this.build(!t), this;
                            }),
                            (e.authority = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (void 0 === e)
                                    return this._parts.hostname
                                        ? p.buildAuthority(this._parts)
                                        : "";
                                if ("/" !== p.parseAuthority(e, this._parts))
                                    throw new TypeError(
                                        'Hostname "' +
                                            e +
                                            '" contains characters other than [A-Z0-9.-]'
                                    );
                                return this.build(!t), this;
                            }),
                            (e.userinfo = function (e, t) {
                                return this._parts.urn
                                    ? void 0 === e
                                        ? ""
                                        : this
                                    : void 0 === e
                                    ? (n = p.buildUserinfo(this._parts)) &&
                                      n.substring(0, n.length - 1)
                                    : ("@" !== e[e.length - 1] && (e += "@"),
                                      p.parseUserinfo(e, this._parts),
                                      this.build(!t),
                                      this);
                                var n;
                            }),
                            (e.resource = function (e, t) {
                                return void 0 === e
                                    ? this.path() + this.search() + this.hash()
                                    : ((e = p.parse(e)),
                                      (this._parts.path = e.path),
                                      (this._parts.query = e.query),
                                      (this._parts.fragment = e.fragment),
                                      this.build(!t),
                                      this);
                            }),
                            (e.subdomain = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (void 0 === e) {
                                    if (!this._parts.hostname || this.is("IP"))
                                        return "";
                                    var n =
                                        this._parts.hostname.length -
                                        this.domain().length -
                                        1;
                                    return (
                                        this._parts.hostname.substring(0, n) ||
                                        ""
                                    );
                                }
                                (n =
                                    this._parts.hostname.length -
                                    this.domain().length),
                                    (n = this._parts.hostname.substring(0, n)),
                                    (n = new RegExp("^" + i(n)));
                                if (
                                    (e &&
                                        "." !== e.charAt(e.length - 1) &&
                                        (e += "."),
                                    -1 !== e.indexOf(":"))
                                )
                                    throw new TypeError(
                                        "Domains cannot contain colons"
                                    );
                                return (
                                    e &&
                                        p.ensureValidHostname(
                                            e,
                                            this._parts.protocol
                                        ),
                                    (this._parts.hostname =
                                        this._parts.hostname.replace(n, e)),
                                    this.build(!t),
                                    this
                                );
                            }),
                            (e.domain = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (
                                    ("boolean" == typeof e &&
                                        ((t = e), (e = void 0)),
                                    void 0 === e)
                                ) {
                                    if (!this._parts.hostname || this.is("IP"))
                                        return "";
                                    var n = this._parts.hostname.match(/\./g);
                                    if (n && n.length < 2)
                                        return this._parts.hostname;
                                    (n =
                                        this._parts.hostname.length -
                                        this.tld(t).length -
                                        1),
                                        (n =
                                            this._parts.hostname.lastIndexOf(
                                                ".",
                                                n - 1
                                            ) + 1);
                                    return (
                                        this._parts.hostname.substring(n) || ""
                                    );
                                }
                                if (!e)
                                    throw new TypeError(
                                        "cannot set domain empty"
                                    );
                                if (-1 !== e.indexOf(":"))
                                    throw new TypeError(
                                        "Domains cannot contain colons"
                                    );
                                return (
                                    p.ensureValidHostname(
                                        e,
                                        this._parts.protocol
                                    ),
                                    !this._parts.hostname || this.is("IP")
                                        ? (this._parts.hostname = e)
                                        : ((n = new RegExp(
                                              i(this.domain()) + "$"
                                          )),
                                          (this._parts.hostname =
                                              this._parts.hostname.replace(
                                                  n,
                                                  e
                                              ))),
                                    this.build(!t),
                                    this
                                );
                            }),
                            (e.tld = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (
                                    ("boolean" == typeof e &&
                                        ((t = e), (e = void 0)),
                                    void 0 === e)
                                ) {
                                    if (!this._parts.hostname || this.is("IP"))
                                        return "";
                                    var n =
                                            this._parts.hostname.lastIndexOf(
                                                "."
                                            ),
                                        n = this._parts.hostname.substring(
                                            n + 1
                                        );
                                    return !0 !== t &&
                                        c &&
                                        c.list[n.toLowerCase()]
                                        ? c.get(this._parts.hostname) || n
                                        : n;
                                }
                                var r;
                                if (!e)
                                    throw new TypeError("cannot set TLD empty");
                                if (e.match(/[^a-zA-Z0-9-]/)) {
                                    if (!c || !c.is(e))
                                        throw new TypeError(
                                            'TLD "' +
                                                e +
                                                '" contains characters other than [A-Z0-9]'
                                        );
                                    (r = new RegExp(i(this.tld()) + "$")),
                                        (this._parts.hostname =
                                            this._parts.hostname.replace(r, e));
                                } else {
                                    if (!this._parts.hostname || this.is("IP"))
                                        throw new ReferenceError(
                                            "cannot set TLD on non-domain host"
                                        );
                                    (r = new RegExp(i(this.tld()) + "$")),
                                        (this._parts.hostname =
                                            this._parts.hostname.replace(r, e));
                                }
                                return this.build(!t), this;
                            }),
                            (e.directory = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (void 0 !== e && !0 !== e)
                                    return (
                                        (n =
                                            this._parts.path.length -
                                            this.filename().length),
                                        (n = this._parts.path.substring(0, n)),
                                        (n = new RegExp("^" + i(n))),
                                        this.is("relative") ||
                                            ("/" !== (e = e || "/").charAt(0) &&
                                                (e = "/" + e)),
                                        e &&
                                            "/" !== e.charAt(e.length - 1) &&
                                            (e += "/"),
                                        (e = p.recodePath(e)),
                                        (this._parts.path =
                                            this._parts.path.replace(n, e)),
                                        this.build(!t),
                                        this
                                    );
                                if (!this._parts.path && !this._parts.hostname)
                                    return "";
                                if ("/" === this._parts.path) return "/";
                                var n =
                                        this._parts.path.length -
                                        this.filename().length -
                                        1,
                                    t =
                                        this._parts.path.substring(0, n) ||
                                        (this._parts.hostname ? "/" : "");
                                return e ? p.decodePath(t) : t;
                            }),
                            (e.filename = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if ("string" == typeof e)
                                    return (
                                        (r = !1),
                                        (e =
                                            "/" === e.charAt(0)
                                                ? e.substring(1)
                                                : e).match(/\.?\//) && (r = !0),
                                        (n = new RegExp(
                                            i(this.filename()) + "$"
                                        )),
                                        (e = p.recodePath(e)),
                                        (this._parts.path =
                                            this._parts.path.replace(n, e)),
                                        r
                                            ? this.normalizePath(t)
                                            : this.build(!t),
                                        this
                                    );
                                if (
                                    !this._parts.path ||
                                    "/" === this._parts.path
                                )
                                    return "";
                                var n = this._parts.path.lastIndexOf("/"),
                                    r = this._parts.path.substring(n + 1);
                                return e ? p.decodePathSegment(r) : r;
                            }),
                            (e.suffix = function (e, t) {
                                if (this._parts.urn)
                                    return void 0 === e ? "" : this;
                                if (void 0 === e || !0 === e) {
                                    if (
                                        !this._parts.path ||
                                        "/" === this._parts.path
                                    )
                                        return "";
                                    var n = this.filename(),
                                        r = n.lastIndexOf(".");
                                    return -1 === r
                                        ? ""
                                        : ((n = n.substring(r + 1)),
                                          (r = /^[a-z0-9%]+$/i.test(n)
                                              ? n
                                              : ""),
                                          e ? p.decodePathSegment(r) : r);
                                }
                                "." === e.charAt(0) && (e = e.substring(1));
                                var o,
                                    n = this.suffix();
                                if (n)
                                    o = e
                                        ? new RegExp(i(n) + "$")
                                        : new RegExp(i("." + n) + "$");
                                else {
                                    if (!e) return this;
                                    this._parts.path += "." + p.recodePath(e);
                                }
                                return (
                                    o &&
                                        ((e = p.recodePath(e)),
                                        (this._parts.path =
                                            this._parts.path.replace(o, e))),
                                    this.build(!t),
                                    this
                                );
                            }),
                            (e.segment = function (e, t, n) {
                                var r = this._parts.urn ? ":" : "/",
                                    o = this.path(),
                                    i = "/" === o.substring(0, 1),
                                    a = o.split(r);
                                if (
                                    (void 0 !== e &&
                                        "number" != typeof e &&
                                        ((n = t), (t = e), (e = void 0)),
                                    void 0 !== e && "number" != typeof e)
                                )
                                    throw new Error(
                                        'Bad segment "' +
                                            e +
                                            '", must be 0-based integer'
                                    );
                                if (
                                    (i && a.shift(),
                                    e < 0 && (e = Math.max(a.length + e, 0)),
                                    void 0 === t)
                                )
                                    return void 0 === e ? a : a[e];
                                if (null === e || void 0 === a[e])
                                    if (l(t))
                                        for (
                                            var a = [], s = 0, u = t.length;
                                            s < u;
                                            s++
                                        )
                                            (t[s].length ||
                                                (a.length &&
                                                    a[a.length - 1].length)) &&
                                                (a.length &&
                                                    !a[a.length - 1].length &&
                                                    a.pop(),
                                                a.push(m(t[s])));
                                    else
                                        (!t && "string" != typeof t) ||
                                            ((t = m(t)),
                                            "" === a[a.length - 1]
                                                ? (a[a.length - 1] = t)
                                                : a.push(t));
                                else t ? (a[e] = m(t)) : a.splice(e, 1);
                                return (
                                    i && a.unshift(""), this.path(a.join(r), n)
                                );
                            }),
                            (e.segmentCoded = function (e, t, n) {
                                var r, o, i;
                                if (
                                    ("number" != typeof e &&
                                        ((n = t), (t = e), (e = void 0)),
                                    void 0 === t)
                                ) {
                                    if (l((r = this.segment(e, t, n))))
                                        for (o = 0, i = r.length; o < i; o++)
                                            r[o] = p.decode(r[o]);
                                    else
                                        r = void 0 !== r ? p.decode(r) : void 0;
                                    return r;
                                }
                                if (l(t))
                                    for (o = 0, i = t.length; o < i; o++)
                                        t[o] = p.encode(t[o]);
                                else
                                    t =
                                        "string" == typeof t ||
                                        t instanceof String
                                            ? p.encode(t)
                                            : t;
                                return this.segment(e, t, n);
                            }),
                            e.query);
                    return (
                        (e.query = function (e, t) {
                            var n, r;
                            return !0 === e
                                ? p.parseQuery(
                                      this._parts.query,
                                      this._parts.escapeQuerySpace
                                  )
                                : "function" == typeof e
                                ? ((n = p.parseQuery(
                                      this._parts.query,
                                      this._parts.escapeQuerySpace
                                  )),
                                  (r = e.call(this, n)),
                                  (this._parts.query = p.buildQuery(
                                      r || n,
                                      this._parts.duplicateQueryParameters,
                                      this._parts.escapeQuerySpace
                                  )),
                                  this.build(!t),
                                  this)
                                : void 0 !== e && "string" != typeof e
                                ? ((this._parts.query = p.buildQuery(
                                      e,
                                      this._parts.duplicateQueryParameters,
                                      this._parts.escapeQuerySpace
                                  )),
                                  this.build(!t),
                                  this)
                                : v.call(this, e, t);
                        }),
                        (e.setQuery = function (e, t, n) {
                            var r = p.parseQuery(
                                this._parts.query,
                                this._parts.escapeQuerySpace
                            );
                            if ("string" == typeof e || e instanceof String)
                                r[e] = void 0 !== t ? t : null;
                            else {
                                if ("object" != typeof e)
                                    throw new TypeError(
                                        "URI.addQuery() accepts an object, string as the name parameter"
                                    );
                                for (var o in e) u.call(e, o) && (r[o] = e[o]);
                            }
                            return (
                                (this._parts.query = p.buildQuery(
                                    r,
                                    this._parts.duplicateQueryParameters,
                                    this._parts.escapeQuerySpace
                                )),
                                this.build(!(n = "string" != typeof e ? t : n)),
                                this
                            );
                        }),
                        (e.addQuery = function (e, t, n) {
                            var r = p.parseQuery(
                                this._parts.query,
                                this._parts.escapeQuerySpace
                            );
                            return (
                                p.addQuery(r, e, void 0 === t ? null : t),
                                (this._parts.query = p.buildQuery(
                                    r,
                                    this._parts.duplicateQueryParameters,
                                    this._parts.escapeQuerySpace
                                )),
                                this.build(!(n = "string" != typeof e ? t : n)),
                                this
                            );
                        }),
                        (e.removeQuery = function (e, t, n) {
                            var r = p.parseQuery(
                                this._parts.query,
                                this._parts.escapeQuerySpace
                            );
                            return (
                                p.removeQuery(r, e, t),
                                (this._parts.query = p.buildQuery(
                                    r,
                                    this._parts.duplicateQueryParameters,
                                    this._parts.escapeQuerySpace
                                )),
                                this.build(!(n = "string" != typeof e ? t : n)),
                                this
                            );
                        }),
                        (e.hasQuery = function (e, t, n) {
                            var r = p.parseQuery(
                                this._parts.query,
                                this._parts.escapeQuerySpace
                            );
                            return p.hasQuery(r, e, t, n);
                        }),
                        (e.setSearch = e.setQuery),
                        (e.addSearch = e.addQuery),
                        (e.removeSearch = e.removeQuery),
                        (e.hasSearch = e.hasQuery),
                        (e.normalize = function () {
                            return (
                                this._parts.urn
                                    ? this.normalizeProtocol(!1)
                                    : this.normalizeProtocol(!1)
                                          .normalizeHostname(!1)
                                          .normalizePort(!1)
                            )
                                .normalizePath(!1)
                                .normalizeQuery(!1)
                                .normalizeFragment(!1)
                                .build();
                        }),
                        (e.normalizeProtocol = function (e) {
                            return (
                                "string" == typeof this._parts.protocol &&
                                    ((this._parts.protocol =
                                        this._parts.protocol.toLowerCase()),
                                    this.build(!e)),
                                this
                            );
                        }),
                        (e.normalizeHostname = function (e) {
                            return (
                                this._parts.hostname &&
                                    (this.is("IDN") && s
                                        ? (this._parts.hostname = s.toASCII(
                                              this._parts.hostname
                                          ))
                                        : this.is("IPv6") &&
                                          t &&
                                          (this._parts.hostname = t.best(
                                              this._parts.hostname
                                          )),
                                    (this._parts.hostname =
                                        this._parts.hostname.toLowerCase()),
                                    this.build(!e)),
                                this
                            );
                        }),
                        (e.normalizePort = function (e) {
                            return (
                                "string" == typeof this._parts.protocol &&
                                    this._parts.port ===
                                        p.defaultPorts[this._parts.protocol] &&
                                    ((this._parts.port = null), this.build(!e)),
                                this
                            );
                        }),
                        (e.normalizePath = function (e) {
                            if ((n = this._parts.path)) {
                                if (this._parts.urn)
                                    return (
                                        (this._parts.path = p.recodeUrnPath(
                                            this._parts.path
                                        )),
                                        this.build(!e),
                                        this
                                    );
                                if ("/" !== this._parts.path) {
                                    var t,
                                        n,
                                        r,
                                        o,
                                        i = "";
                                    for (
                                        "/" !==
                                            (n = p.recodePath(n)).charAt(0) &&
                                            ((t = !0), (n = "/" + n)),
                                            ("/.." !== n.slice(-3) &&
                                                "/." !== n.slice(-2)) ||
                                                (n += "/"),
                                            n = n
                                                .replace(
                                                    /(\/(\.\/)+)|(\/\.$)/g,
                                                    "/"
                                                )
                                                .replace(/\/{2,}/g, "/"),
                                            t &&
                                                (i =
                                                    (i =
                                                        n
                                                            .substring(1)
                                                            .match(
                                                                /^(\.\.\/)+/
                                                            ) || "") && i[0]);
                                        ;

                                    ) {
                                        if (
                                            -1 ===
                                            (r = n.search(/\/\.\.(\/|$)/))
                                        )
                                            break;
                                        0 === r
                                            ? (n = n.substring(3))
                                            : (-1 ===
                                                  (o = n
                                                      .substring(0, r)
                                                      .lastIndexOf("/")) &&
                                                  (o = r),
                                              (n =
                                                  n.substring(0, o) +
                                                  n.substring(r + 3)));
                                    }
                                    t &&
                                        this.is("relative") &&
                                        (n = i + n.substring(1)),
                                        (this._parts.path = n),
                                        this.build(!e);
                                }
                            }
                            return this;
                        }),
                        (e.normalizePathname = e.normalizePath),
                        (e.normalizeQuery = function (e) {
                            return (
                                "string" == typeof this._parts.query &&
                                    (this._parts.query.length
                                        ? this.query(
                                              p.parseQuery(
                                                  this._parts.query,
                                                  this._parts.escapeQuerySpace
                                              )
                                          )
                                        : (this._parts.query = null),
                                    this.build(!e)),
                                this
                            );
                        }),
                        (e.normalizeFragment = function (e) {
                            return (
                                this._parts.fragment ||
                                    ((this._parts.fragment = null),
                                    this.build(!e)),
                                this
                            );
                        }),
                        (e.normalizeSearch = e.normalizeQuery),
                        (e.normalizeHash = e.normalizeFragment),
                        (e.iso8859 = function () {
                            var e = p.encode,
                                t = p.decode;
                            (p.encode = escape),
                                (p.decode = decodeURIComponent);
                            try {
                                this.normalize();
                            } finally {
                                (p.encode = e), (p.decode = t);
                            }
                            return this;
                        }),
                        (e.unicode = function () {
                            var e = p.encode,
                                t = p.decode;
                            (p.encode = E), (p.decode = unescape);
                            try {
                                this.normalize();
                            } finally {
                                (p.encode = e), (p.decode = t);
                            }
                            return this;
                        }),
                        (e.readable = function () {
                            var e = this.clone(),
                                t =
                                    (e.username("").password("").normalize(),
                                    "");
                            if (
                                (e._parts.protocol &&
                                    (t += e._parts.protocol + "://"),
                                e._parts.hostname &&
                                    (e.is("punycode") && s
                                        ? ((t += s.toUnicode(
                                              e._parts.hostname
                                          )),
                                          e._parts.port &&
                                              (t += ":" + e._parts.port))
                                        : (t += e.host())),
                                e._parts.hostname &&
                                    e._parts.path &&
                                    "/" !== e._parts.path.charAt(0) &&
                                    (t += "/"),
                                (t += e.path(!0)),
                                e._parts.query)
                            ) {
                                for (
                                    var n = "",
                                        r = 0,
                                        o = e._parts.query.split("&"),
                                        i = o.length;
                                    r < i;
                                    r++
                                ) {
                                    var a = (o[r] || "").split("=");
                                    (n +=
                                        "&" +
                                        p
                                            .decodeQuery(
                                                a[0],
                                                this._parts.escapeQuerySpace
                                            )
                                            .replace(/&/g, "%26")),
                                        void 0 !== a[1] &&
                                            (n +=
                                                "=" +
                                                p
                                                    .decodeQuery(
                                                        a[1],
                                                        this._parts
                                                            .escapeQuerySpace
                                                    )
                                                    .replace(/&/g, "%26"));
                                }
                                t += "?" + n.substring(1);
                            }
                            return (t += p.decodeQuery(e.hash(), !0));
                        }),
                        (e.absoluteTo = function (e) {
                            var t,
                                n,
                                r,
                                o = this.clone(),
                                i = [
                                    "protocol",
                                    "username",
                                    "password",
                                    "hostname",
                                    "port",
                                ];
                            if (this._parts.urn)
                                throw new Error(
                                    "URNs do not have any generally defined hierarchical components"
                                );
                            if (
                                (e instanceof p || (e = new p(e)),
                                !o._parts.protocol &&
                                    ((o._parts.protocol = e._parts.protocol),
                                    !this._parts.hostname))
                            ) {
                                for (n = 0; (r = i[n]); n++)
                                    o._parts[r] = e._parts[r];
                                o._parts.path
                                    ? (".." === o._parts.path.substring(-2) &&
                                          (o._parts.path += "/"),
                                      "/" !== o.path().charAt(0) &&
                                          ((t =
                                              (t = e.directory()) ||
                                              (0 === e.path().indexOf("/")
                                                  ? "/"
                                                  : "")),
                                          (o._parts.path =
                                              (t ? t + "/" : "") +
                                              o._parts.path),
                                          o.normalizePath()))
                                    : ((o._parts.path = e._parts.path),
                                      o._parts.query ||
                                          (o._parts.query = e._parts.query)),
                                    o.build();
                            }
                            return o;
                        }),
                        (e.relativeTo = function (e) {
                            var t,
                                n,
                                r,
                                o = this.clone().normalize();
                            if (o._parts.urn)
                                throw new Error(
                                    "URNs do not have any generally defined hierarchical components"
                                );
                            if (
                                ((e = new p(e).normalize()),
                                (t = o._parts),
                                (n = e._parts),
                                (r = o.path()),
                                (e = e.path()),
                                "/" !== r.charAt(0))
                            )
                                throw new Error("URI is already relative");
                            if ("/" !== e.charAt(0))
                                throw new Error(
                                    "Cannot calculate a URI relative to another relative URI"
                                );
                            if (
                                (t.protocol === n.protocol &&
                                    (t.protocol = null),
                                t.username === n.username &&
                                    t.password === n.password &&
                                    null === t.protocol &&
                                    null === t.username &&
                                    null === t.password &&
                                    t.hostname === n.hostname &&
                                    t.port === n.port)
                            ) {
                                if (
                                    ((t.hostname = null),
                                    (t.port = null),
                                    r === e)
                                )
                                    return (t.path = ""), o.build();
                                (r = p.commonPath(r, e)) &&
                                    ((e = n.path
                                        .substring(r.length)
                                        .replace(/[^\/]*$/, "")
                                        .replace(/.*?\//g, "../")),
                                    (t.path =
                                        e + t.path.substring(r.length) ||
                                        "./"));
                            }
                            return o.build();
                        }),
                        (e.equals = function (e) {
                            var t,
                                n,
                                r,
                                o,
                                i,
                                a = this.clone(),
                                e = new p(e),
                                s = {};
                            if (
                                (a.normalize(),
                                e.normalize(),
                                a.toString() !== e.toString())
                            ) {
                                if (
                                    ((r = a.query()),
                                    (o = e.query()),
                                    a.query(""),
                                    e.query(""),
                                    a.toString() !== e.toString())
                                )
                                    return !1;
                                if (r.length !== o.length) return !1;
                                for (i in ((t = p.parseQuery(
                                    r,
                                    this._parts.escapeQuerySpace
                                )),
                                (n = p.parseQuery(
                                    o,
                                    this._parts.escapeQuerySpace
                                )),
                                t))
                                    if (u.call(t, i)) {
                                        if (l(t[i])) {
                                            if (!h(t[i], n[i])) return !1;
                                        } else if (t[i] !== n[i]) return !1;
                                        s[i] = !0;
                                    }
                                for (i in n)
                                    if (u.call(n, i) && !s[i]) return !1;
                            }
                            return !0;
                        }),
                        (e.preventInvalidHostname = function (e) {
                            return (
                                (this._parts.preventInvalidHostname = !!e), this
                            );
                        }),
                        (e.duplicateQueryParameters = function (e) {
                            return (
                                (this._parts.duplicateQueryParameters = !!e),
                                this
                            );
                        }),
                        (e.escapeQuerySpace = function (e) {
                            return (this._parts.escapeQuerySpace = !!e), this;
                        }),
                        p
                    );
                }),
                e.exports
                    ? (e.exports = n(dr, fr, hr))
                    : (t.URI = n(t.punycode, t.IPv6, t.SecondLevelDomains, t));
        });
    function mr(t, n) {
        if (null === t || "object" != typeof t) return t;
        n = ge.defaultValue(n, !1);
        const r = new t.constructor();
        for (const o in t)
            if (t.hasOwnProperty(o)) {
                let e = t[o];
                n && (e = mr(e, n)), (r[o] = e);
            }
        return r;
    }
    function Er(e, t, n) {
        n = ge.defaultValue(n, !1);
        const r = {};
        var o,
            i = ge.defined(e),
            a = ge.defined(t);
        let s, u;
        if (i)
            for (s in e)
                e.hasOwnProperty(s) &&
                    ((o = e[s]),
                    a &&
                    n &&
                    "object" == typeof o &&
                    t.hasOwnProperty(s) &&
                    "object" == typeof (u = t[s])
                        ? (r[s] = Er(o, u, n))
                        : (r[s] = o));
        if (a)
            for (s in t)
                t.hasOwnProperty(s) &&
                    !r.hasOwnProperty(s) &&
                    ((u = t[s]), (r[s] = u));
        return r;
    }
    function _r() {
        let n, r;
        var e = new Promise(function (e, t) {
            (n = e), (r = t);
        });
        return { resolve: n, reject: r, promise: e };
    }
    function yr(e, t) {
        let n;
        return (
            "undefined" != typeof document && (n = document),
            yr._implementation(e, t, n)
        );
    }
    yr._implementation = function (e, t, n) {
        if (!ge.defined(t)) {
            if (void 0 === n) return e;
            t = ge.defaultValue(n.baseURI, n.location.href);
        }
        const r = new pr(e);
        return ("" !== r.scheme() ? r : r.absoluteTo(t)).toString();
    };
    const gr = {};
    function Tr(e, t, n) {
        ge.defined(t) || (t = e.width), ge.defined(n) || (n = e.height);
        let r = gr[t],
            o = (ge.defined(r) || ((r = {}), (gr[t] = r)), r[n]);
        if (!ge.defined(o)) {
            const i = document.createElement("canvas");
            (i.width = t),
                (i.height = n),
                ((o = i.getContext("2d")).globalCompositeOperation = "copy"),
                (r[n] = o);
        }
        return o.drawImage(e, 0, 0, t, n), o.getImageData(0, 0, t, n).data;
    }
    const Rr = /^blob:/i;
    function Ar(e) {
        return Rr.test(e);
    }
    let Sr;
    const wr = /^data:/i;
    function Ir(e) {
        return wr.test(e);
    }
    var d = Object.freeze({
            UNISSUED: 0,
            ISSUED: 1,
            ACTIVE: 2,
            RECEIVED: 3,
            CANCELLED: 4,
            FAILED: 5,
        }),
        vr = Object.freeze({ TERRAIN: 0, IMAGERY: 1, TILES3D: 2, OTHER: 3 });
    function Or(e) {
        e = ge.defaultValue(e, ge.defaultValue.EMPTY_OBJECT);
        var t = ge.defaultValue(e.throttleByServer, !1),
            n = ge.defaultValue(e.throttle, !1);
        (this.url = e.url),
            (this.requestFunction = e.requestFunction),
            (this.cancelFunction = e.cancelFunction),
            (this.priorityFunction = e.priorityFunction),
            (this.priority = ge.defaultValue(e.priority, 0)),
            (this.throttle = n),
            (this.throttleByServer = t),
            (this.type = ge.defaultValue(e.type, vr.OTHER)),
            (this.serverKey = void 0),
            (this.state = d.UNISSUED),
            (this.deferred = void 0),
            (this.cancelled = !1);
    }
    function Nr(e, t, n) {
        (this.statusCode = e),
            (this.response = t),
            (this.responseHeaders = n),
            "string" == typeof this.responseHeaders &&
                (this.responseHeaders = (function (e) {
                    const t = {};
                    if (e) {
                        var n = e.split("\r\n");
                        for (let e = 0; e < n.length; ++e) {
                            const i = n[e];
                            var r,
                                o = i.indexOf(": ");
                            0 < o &&
                                ((r = i.substring(0, o)),
                                (o = i.substring(o + 2)),
                                (t[r] = o));
                        }
                    }
                    return t;
                })(this.responseHeaders));
    }
    function xr() {
        (this._listeners = []),
            (this._scopes = []),
            (this._toRemove = []),
            (this._insideRaiseEvent = !1);
    }
    function Mr(e, t) {
        return t - e;
    }
    function Pr(e) {
        (this._comparator = e.comparator),
            (this._array = []),
            (this._length = 0),
            (this._maximumLength = void 0);
    }
    function br(e, t, n) {
        var r = e[t];
        (e[t] = e[n]), (e[n] = r);
    }
    (Or.prototype.cancel = function () {
        this.cancelled = !0;
    }),
        (Or.prototype.clone = function (e) {
            return ge.defined(e)
                ? ((e.url = this.url),
                  (e.requestFunction = this.requestFunction),
                  (e.cancelFunction = this.cancelFunction),
                  (e.priorityFunction = this.priorityFunction),
                  (e.priority = this.priority),
                  (e.throttle = this.throttle),
                  (e.throttleByServer = this.throttleByServer),
                  (e.type = this.type),
                  (e.serverKey = this.serverKey),
                  (e.state = this.RequestState.UNISSUED),
                  (e.deferred = void 0),
                  (e.cancelled = !1),
                  e)
                : new Or(this);
        }),
        (Nr.prototype.toString = function () {
            let e = "Request has failed.";
            return (
                ge.defined(this.statusCode) &&
                    (e += " Status Code: " + this.statusCode),
                e
            );
        }),
        Object.defineProperties(xr.prototype, {
            numberOfListeners: {
                get: function () {
                    return this._listeners.length - this._toRemove.length;
                },
            },
        }),
        (xr.prototype.addEventListener = function (e, t) {
            this._listeners.push(e), this._scopes.push(t);
            const n = this;
            return function () {
                n.removeEventListener(e, t);
            };
        }),
        (xr.prototype.removeEventListener = function (t, n) {
            const r = this._listeners,
                o = this._scopes;
            let i = -1;
            for (let e = 0; e < r.length; e++)
                if (r[e] === t && o[e] === n) {
                    i = e;
                    break;
                }
            return (
                -1 !== i &&
                (this._insideRaiseEvent
                    ? (this._toRemove.push(i), (r[i] = void 0), (o[i] = void 0))
                    : (r.splice(i, 1), o.splice(i, 1)),
                !0)
            );
        }),
        (xr.prototype.raiseEvent = function () {
            this._insideRaiseEvent = !0;
            let e;
            const t = this._listeners,
                n = this._scopes;
            let r = t.length;
            for (e = 0; e < r; e++) {
                var o = t[e];
                ge.defined(o) && t[e].apply(n[e], arguments);
            }
            const i = this._toRemove;
            if (0 < (r = i.length)) {
                for (i.sort(Mr), e = 0; e < r; e++) {
                    var a = i[e];
                    t.splice(a, 1), n.splice(a, 1);
                }
                i.length = 0;
            }
            this._insideRaiseEvent = !1;
        }),
        Object.defineProperties(Pr.prototype, {
            length: {
                get: function () {
                    return this._length;
                },
            },
            internalArray: {
                get: function () {
                    return this._array;
                },
            },
            maximumLength: {
                get: function () {
                    return this._maximumLength;
                },
                set: function (t) {
                    var n = this._length;
                    if (t < n) {
                        const r = this._array;
                        for (let e = t; e < n; ++e) r[e] = void 0;
                        (this._length = t), (r.length = t);
                    }
                    this._maximumLength = t;
                },
            },
            comparator: {
                get: function () {
                    return this._comparator;
                },
            },
        }),
        (Pr.prototype.reserve = function (e) {
            (e = ge.defaultValue(e, this._length)), (this._array.length = e);
        }),
        (Pr.prototype.heapify = function (e) {
            e = ge.defaultValue(e, 0);
            var t = this._length;
            const n = this._comparator;
            var r = this._array;
            let o = -1,
                i = !0;
            for (; i; ) {
                var a = 2 * (e + 1),
                    s = a - 1;
                (o = s < t && n(r[s], r[e]) < 0 ? s : e),
                    (o = a < t && n(r[a], r[o]) < 0 ? a : o) !== e
                        ? (br(r, o, e), (e = o))
                        : (i = !1);
            }
        }),
        (Pr.prototype.resort = function () {
            var t = this._length;
            for (let e = Math.ceil(t / 2); 0 <= e; --e) this.heapify(e);
        }),
        (Pr.prototype.insert = function (e) {
            const t = this._array,
                n = this._comparator;
            var r = this._maximumLength;
            let o = this._length++;
            for (o < t.length ? (t[o] = e) : t.push(e); 0 !== o; ) {
                var i = Math.floor((o - 1) / 2);
                if (!(n(t[o], t[i]) < 0)) break;
                br(t, o, i), (o = i);
            }
            let a;
            return (
                ge.defined(r) &&
                    this._length > r &&
                    ((a = t[r]), (this._length = r)),
                a
            );
        }),
        (Pr.prototype.pop = function (e) {
            if (((e = ge.defaultValue(e, 0)), 0 !== this._length)) {
                const n = this._array;
                var t = n[e];
                return (
                    br(n, e, --this._length),
                    this.heapify(e),
                    (n[this._length] = void 0),
                    t
                );
            }
        });
    const u = {
        numberOfAttemptedRequests: 0,
        numberOfActiveRequests: 0,
        numberOfCancelledRequests: 0,
        numberOfCancelledActiveRequests: 0,
        numberOfFailedRequests: 0,
        numberOfActiveRequestsEver: 0,
        lastNumberOfActiveRequests: 0,
    };
    let Cr = 20;
    const Ur = new Pr({
            comparator: function (e, t) {
                return e.priority - t.priority;
            },
        }),
        Dr = ((Ur.maximumLength = Cr), Ur.reserve(Cr), []);
    let zr = {};
    const Fr =
            "undefined" != typeof document
                ? new pr(document.location.href)
                : new pr(),
        Lr = new xr();
    function f() {}
    function Br(e) {
        ge.defined(e.priorityFunction) && (e.priority = e.priorityFunction());
    }
    function qr(e) {
        return (
            e.state === d.UNISSUED &&
                ((e.state = d.ISSUED), (e.deferred = _r())),
            e.deferred.promise
        );
    }
    function Vr(e) {
        var t,
            n,
            r = qr(e);
        return (
            (e.state = d.ACTIVE),
            Dr.push(e),
            ++u.numberOfActiveRequests,
            ++u.numberOfActiveRequestsEver,
            ++zr[e.serverKey],
            e
                .requestFunction()
                .then(
                    ((n = e),
                    function (e) {
                        if (n.state !== d.CANCELLED) {
                            const t = n.deferred;
                            --u.numberOfActiveRequests,
                                --zr[n.serverKey],
                                Lr.raiseEvent(),
                                (n.state = d.RECEIVED),
                                (n.deferred = void 0),
                                t.resolve(e);
                        }
                    })
                )
                .catch(
                    ((t = e),
                    function (e) {
                        t.state !== d.CANCELLED &&
                            (++u.numberOfFailedRequests,
                            --u.numberOfActiveRequests,
                            --zr[t.serverKey],
                            Lr.raiseEvent(e),
                            (t.state = d.FAILED),
                            t.deferred.reject(e));
                    })
                ),
            r
        );
    }
    function kr(e) {
        var t = e.state === d.ACTIVE;
        if (
            ((e.state = d.CANCELLED),
            ++u.numberOfCancelledRequests,
            ge.defined(e.deferred))
        ) {
            const n = e.deferred;
            (e.deferred = void 0), n.reject();
        }
        t &&
            (--u.numberOfActiveRequests,
            --zr[e.serverKey],
            ++u.numberOfCancelledActiveRequests),
            ge.defined(e.cancelFunction) && e.cancelFunction();
    }
    (f.maximumRequests = 50),
        (f.maximumRequestsPerServer = 6),
        (f.requestsByServer = {
            "api.cesium.com:443": 18,
            "assets.cesium.com:443": 18,
        }),
        (f.throttleRequests = !0),
        (f.debugShowStatistics = !1),
        (f.requestCompletedEvent = Lr),
        Object.defineProperties(f, {
            statistics: {
                get: function () {
                    return u;
                },
            },
            priorityHeapLength: {
                get: function () {
                    return Cr;
                },
                set: function (e) {
                    if (e < Cr) for (; Ur.length > e; ) kr(Ur.pop());
                    (Cr = e), (Ur.maximumLength = e), Ur.reserve(e);
                },
            },
        }),
        (f.serverHasOpenSlots = function (e, t) {
            t = ge.defaultValue(t, 1);
            var n = ge.defaultValue(
                f.requestsByServer[e],
                f.maximumRequestsPerServer
            );
            return zr[e] + t <= n;
        }),
        (f.heapHasOpenSlots = function (e) {
            return Ur.length + e <= Cr;
        }),
        (f.update = function () {
            let e,
                t,
                n = 0;
            var r = Dr.length;
            for (e = 0; e < r; ++e)
                (t = Dr[e]).cancelled && kr(t),
                    t.state !== d.ACTIVE ? ++n : 0 < n && (Dr[e - n] = t);
            Dr.length -= n;
            var o = Ur.internalArray,
                i = Ur.length;
            for (e = 0; e < i; ++e) Br(o[e]);
            Ur.resort();
            var a = Math.max(f.maximumRequests - Dr.length, 0);
            let s = 0;
            for (; s < a && 0 < Ur.length; )
                (t = Ur.pop()).cancelled ||
                (t.throttleByServer && !f.serverHasOpenSlots(t.serverKey))
                    ? kr(t)
                    : (Vr(t), ++s);
            f.debugShowStatistics &&
                (0 === u.numberOfActiveRequests &&
                    0 < u.lastNumberOfActiveRequests &&
                    (0 < u.numberOfAttemptedRequests &&
                        (console.log(
                            "Number of attempted requests: " +
                                u.numberOfAttemptedRequests
                        ),
                        (u.numberOfAttemptedRequests = 0)),
                    0 < u.numberOfCancelledRequests &&
                        (console.log(
                            "Number of cancelled requests: " +
                                u.numberOfCancelledRequests
                        ),
                        (u.numberOfCancelledRequests = 0)),
                    0 < u.numberOfCancelledActiveRequests &&
                        (console.log(
                            "Number of cancelled active requests: " +
                                u.numberOfCancelledActiveRequests
                        ),
                        (u.numberOfCancelledActiveRequests = 0)),
                    0 < u.numberOfFailedRequests &&
                        (console.log(
                            "Number of failed requests: " +
                                u.numberOfFailedRequests
                        ),
                        (u.numberOfFailedRequests = 0))),
                (u.lastNumberOfActiveRequests = u.numberOfActiveRequests));
        }),
        (f.getServerKey = function (e) {
            let t = new pr(e),
                n =
                    ("" === t.scheme() &&
                        (t = new pr(e).absoluteTo(Fr)).normalize(),
                    t.authority());
            /:/.test(n) ||
                (n = n + ":" + ("https" === t.scheme() ? "443" : "80"));
            e = zr[n];
            return ge.defined(e) || (zr[n] = 0), n;
        }),
        (f.request = function (e) {
            if (Ir(e.url) || Ar(e.url))
                return (
                    Lr.raiseEvent(), (e.state = d.RECEIVED), e.requestFunction()
                );
            if (
                (++u.numberOfAttemptedRequests,
                ge.defined(e.serverKey) ||
                    (e.serverKey = f.getServerKey(e.url)),
                !f.throttleRequests ||
                    !e.throttleByServer ||
                    f.serverHasOpenSlots(e.serverKey))
            ) {
                if (!f.throttleRequests || !e.throttle) return Vr(e);
                if (!(Dr.length >= f.maximumRequests)) {
                    Br(e);
                    var t = Ur.insert(e);
                    if (ge.defined(t)) {
                        if (t === e) return;
                        kr(t);
                    }
                    return qr(e);
                }
            }
        }),
        (f.clearForSpecs = function () {
            for (; 0 < Ur.length; ) kr(Ur.pop());
            var t = Dr.length;
            for (let e = 0; e < t; ++e) kr(Dr[e]);
            (Dr.length = 0),
                (zr = {}),
                (u.numberOfAttemptedRequests = 0),
                (u.numberOfActiveRequests = 0),
                (u.numberOfCancelledRequests = 0),
                (u.numberOfCancelledActiveRequests = 0),
                (u.numberOfFailedRequests = 0),
                (u.numberOfActiveRequestsEver = 0),
                (u.lastNumberOfActiveRequests = 0);
        }),
        (f.numberOfActiveRequestsByServer = function (e) {
            return zr[e];
        }),
        (f.requestHeap = Ur);
    const Gr = {};
    let Wr = {};
    (Gr.add = function (e, t) {
        e = e.toLowerCase() + ":" + t;
        ge.defined(Wr[e]) || (Wr[e] = !0);
    }),
        (Gr.remove = function (e, t) {
            e = e.toLowerCase() + ":" + t;
            ge.defined(Wr[e]) && delete Wr[e];
        }),
        (Gr.contains = function (e) {
            e = (function (e) {
                const t = new pr(e);
                t.normalize();
                let n = t.authority();
                if (0 !== n.length) {
                    if (
                        (t.authority(n),
                        -1 !== n.indexOf("@") &&
                            ((e = n.split("@")), (n = e[1])),
                        -1 === n.indexOf(":"))
                    ) {
                        let e = t.scheme();
                        if (
                            "http" ===
                            (e =
                                0 === e.length
                                    ? (e = window.location.protocol).substring(
                                          0,
                                          e.length - 1
                                      )
                                    : e)
                        )
                            n += ":80";
                        else {
                            if ("https" !== e) return;
                            n += ":443";
                        }
                    }
                    return n;
                }
            })(e);
            return !(!ge.defined(e) || !ge.defined(Wr[e]));
        }),
        (Gr.clear = function () {
            Wr = {};
        });
    const Hr = (function () {
        try {
            const e = new XMLHttpRequest();
            return (
                e.open("GET", "#", !0),
                (e.responseType = "blob") === e.responseType
            );
        } catch (e) {
            return !1;
        }
    })();
    function Xr(t, n, r, o) {
        const i = t.query();
        if (0 !== i.length) {
            let e;
            if (-1 === i.indexOf("=")) {
                const a = {};
                (a[i] = void 0), (e = a);
            } else
                e = (function (e) {
                    const n = {};
                    if ("" !== e) {
                        const i = e.replace(/\+/g, "%20").split(/[&;]/);
                        for (let t = 0, e = i.length; t < e; ++t) {
                            var r = i[t].split("="),
                                o = decodeURIComponent(r[0]);
                            let e = r[1];
                            e = ge.defined(e) ? decodeURIComponent(e) : "";
                            const a = n[o];
                            "string" == typeof a
                                ? (n[o] = [a, e])
                                : Array.isArray(a)
                                ? a.push(e)
                                : (n[o] = e);
                        }
                    }
                    return n;
                })(i);
            (n._queryParameters = r ? Zr(e, n._queryParameters, o) : e),
                t.search("");
        }
    }
    function jr(e, t) {
        var t = t._queryParameters,
            n = Object.keys(t);
        1 !== n.length || ge.defined(t[n[0]])
            ? e.search(
                  (function (e) {
                      let n = "";
                      for (const t in e)
                          if (e.hasOwnProperty(t)) {
                              var r = e[t],
                                  o = encodeURIComponent(t) + "=";
                              if (Array.isArray(r))
                                  for (let e = 0, t = r.length; e < t; ++e)
                                      n += o + encodeURIComponent(r[e]) + "&";
                              else n += o + encodeURIComponent(r) + "&";
                          }
                      return (n = n.slice(0, -1));
                  })(t)
              )
            : e.search(n[0]);
    }
    function Yr(e, t) {
        return ge.defined(e) ? (ge.defined(e.clone) ? e.clone() : mr(e)) : t;
    }
    function Qr(e) {
        if (e.state === d.ISSUED || e.state === d.ACTIVE)
            throw new Ce("The Resource is already being fetched.");
        (e.state = d.UNISSUED), (e.deferred = void 0);
    }
    function Zr(e, t, n) {
        if (!n) return Er(e, t);
        const r = mr(e, !0);
        for (const o in t)
            if (t.hasOwnProperty(o)) {
                let e = r[o];
                const i = t[o];
                ge.defined(e)
                    ? (Array.isArray(e) || (e = r[o] = [e]),
                      (r[o] = e.concat(i)))
                    : (r[o] = Array.isArray(i) ? i.slice() : i);
            }
        return r;
    }
    function h(e) {
        "string" ==
            typeof (e = ge.defaultValue(e, ge.defaultValue.EMPTY_OBJECT)) &&
            (e = { url: e }),
            (this._url = void 0),
            (this._templateValues = Yr(e.templateValues, {})),
            (this._queryParameters = Yr(e.queryParameters, {})),
            (this.headers = Yr(e.headers, {})),
            (this.request = ge.defaultValue(e.request, new Or())),
            (this.proxy = e.proxy),
            (this.retryCallback = e.retryCallback),
            (this.retryAttempts = ge.defaultValue(e.retryAttempts, 0)),
            (this._retryCount = 0);
        const t = new pr(e.url);
        Xr(t, this, !0, !0), t.fragment(""), (this._url = t.toString());
    }
    h.createIfNeeded = function (e) {
        return e instanceof h
            ? e.getDerivedResource({ request: e.request })
            : "string" != typeof e
            ? e
            : new h({ url: e });
    };
    let $r;
    function Kr(e) {
        const n = e.resource,
            r = e.flipY,
            o = e.skipColorSpaceConversion,
            i = e.preferImageBitmap,
            a = n.request,
            t =
                ((a.url = n.url),
                (a.requestFunction = function () {
                    let e = !1;
                    n.isDataUri || n.isBlobUri || (e = n.isCrossOriginUrl);
                    var t = _r();
                    return (
                        h._Implementations.createImage(a, e, t, r, o, i),
                        t.promise
                    );
                }),
                f.request(a));
        if (ge.defined(t))
            return t.catch(function (t) {
                return a.state !== d.FAILED
                    ? Promise.reject(t)
                    : n.retryOnError(t).then(function (e) {
                          return e
                              ? ((a.state = d.UNISSUED),
                                (a.deferred = void 0),
                                Kr({
                                    resource: n,
                                    flipY: r,
                                    skipColorSpaceConversion: o,
                                    preferImageBitmap: i,
                                }))
                              : Promise.reject(t);
                      });
            });
    }
    (h.supportsImageBitmapOptions = function () {
        if (!ge.defined($r)) {
            if ("function" != typeof createImageBitmap)
                return ($r = Promise.resolve(!1));
            $r = h
                .fetchBlob({
                    url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAAE4g3rEiDgAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADElEQVQI12Ng6GAAAAEUAIngE3ZiAAAAAElFTkSuQmCC",
                })
                .then(function (e) {
                    return Promise.all([
                        createImageBitmap(e, {
                            imageOrientation: "flipY",
                            premultiplyAlpha: "none",
                            colorSpaceConversion: "none",
                        }),
                        createImageBitmap(e),
                    ]);
                })
                .then(function (e) {
                    var t = Tr(e[0]),
                        e = Tr(e[1]);
                    return t[1] !== e[1];
                })
                .catch(function () {
                    return !1;
                });
        }
        return $r;
    }),
        Object.defineProperties(h, {
            isBlobSupported: {
                get: function () {
                    return Hr;
                },
            },
        }),
        Object.defineProperties(h.prototype, {
            queryParameters: {
                get: function () {
                    return this._queryParameters;
                },
            },
            templateValues: {
                get: function () {
                    return this._templateValues;
                },
            },
            url: {
                get: function () {
                    return this.getUrlComponent(!0, !0);
                },
                set: function (e) {
                    const t = new pr(e);
                    Xr(t, this, !1), t.fragment(""), (this._url = t.toString());
                },
            },
            extension: {
                get: function () {
                    {
                        var n = this._url;
                        const r = new pr(n);
                        r.normalize();
                        let e = r.path(),
                            t = e.lastIndexOf("/");
                        return (
                            -1 !== t && (e = e.substr(t + 1)),
                            (t = e.lastIndexOf(".")),
                            (e = -1 === t ? "" : e.substr(t + 1))
                        );
                    }
                },
            },
            isDataUri: {
                get: function () {
                    return Ir(this._url);
                },
            },
            isBlobUri: {
                get: function () {
                    return Ar(this._url);
                },
            },
            isCrossOriginUrl: {
                get: function () {
                    return (
                        (e = this._url),
                        ((Sr = ge.defined(Sr)
                            ? Sr
                            : document.createElement("a")).href =
                            window.location.href),
                        (t = Sr.host),
                        (n = Sr.protocol),
                        (Sr.href = e),
                        (Sr.href = Sr.href),
                        n !== Sr.protocol || t !== Sr.host
                    );
                    var e, t, n;
                },
            },
            hasHeaders: {
                get: function () {
                    return 0 < Object.keys(this.headers).length;
                },
            },
        }),
        (h.prototype.toString = function () {
            return this.getUrlComponent(!0, !0);
        }),
        (h.prototype.getUrlComponent = function (e, t) {
            if (this.isDataUri) return this._url;
            const n = new pr(this._url);
            e && jr(n, this);
            let r = n.toString().replace(/%7B/g, "{").replace(/%7D/g, "}");
            const o = this._templateValues;
            return (
                (r = r.replace(/{(.*?)}/g, function (e, t) {
                    t = o[t];
                    return ge.defined(t) ? encodeURIComponent(t) : e;
                })),
                (r = t && ge.defined(this.proxy) ? this.proxy.getURL(r) : r)
            );
        }),
        (h.prototype.setQueryParameters = function (e, t) {
            this._queryParameters = t
                ? Zr(this._queryParameters, e, !1)
                : Zr(e, this._queryParameters, !1);
        }),
        (h.prototype.appendQueryParameters = function (e) {
            this._queryParameters = Zr(e, this._queryParameters, !0);
        }),
        (h.prototype.setTemplateValues = function (e, t) {
            this._templateValues = t
                ? Er(this._templateValues, e)
                : Er(e, this._templateValues);
        }),
        (h.prototype.getDerivedResource = function (e) {
            const t = this.clone();
            if (((t._retryCount = 0), ge.defined(e.url))) {
                const r = new pr(e.url);
                var n = ge.defaultValue(e.preserveQueryParameters, !1);
                Xr(r, t, !0, n),
                    r.fragment(""),
                    "" !== r.scheme()
                        ? (t._url = r.toString())
                        : (t._url = r
                              .absoluteTo(new pr(yr(this._url)))
                              .toString());
            }
            return (
                ge.defined(e.queryParameters) &&
                    (t._queryParameters = Er(
                        e.queryParameters,
                        t._queryParameters
                    )),
                ge.defined(e.templateValues) &&
                    (t._templateValues = Er(
                        e.templateValues,
                        t.templateValues
                    )),
                ge.defined(e.headers) && (t.headers = Er(e.headers, t.headers)),
                ge.defined(e.proxy) && (t.proxy = e.proxy),
                ge.defined(e.request) && (t.request = e.request),
                ge.defined(e.retryCallback) &&
                    (t.retryCallback = e.retryCallback),
                ge.defined(e.retryAttempts) &&
                    (t.retryAttempts = e.retryAttempts),
                t
            );
        }),
        (h.prototype.retryOnError = function (e) {
            const t = this.retryCallback;
            if (
                "function" != typeof t ||
                this._retryCount >= this.retryAttempts
            )
                return Promise.resolve(!1);
            const n = this;
            return Promise.resolve(t(this, e)).then(function (e) {
                return ++n._retryCount, e;
            });
        }),
        (h.prototype.clone = function (e) {
            return (
                ((e = ge.defined(e) ? e : new h({ url: this._url }))._url =
                    this._url),
                (e._queryParameters = mr(this._queryParameters)),
                (e._templateValues = mr(this._templateValues)),
                (e.headers = mr(this.headers)),
                (e.proxy = this.proxy),
                (e.retryCallback = this.retryCallback),
                (e.retryAttempts = this.retryAttempts),
                (e._retryCount = 0),
                (e.request = this.request.clone()),
                e
            );
        }),
        (h.prototype.getBaseUri = function (t) {
            {
                var n = this.getUrlComponent(t);
                let e = "";
                var r = n.lastIndexOf("/");
                return (
                    -1 !== r && (e = n.substring(0, r + 1)),
                    t &&
                        (0 !== (n = new pr(n)).query().length &&
                            (e += "?" + n.query()),
                        0 !== n.fragment().length && (e += "#" + n.fragment())),
                    e
                );
            }
        }),
        (h.prototype.appendForwardSlash = function () {
            var e;
            this._url =
                ((0 !== (e = this._url).length && "/" === e[e.length - 1]) ||
                    (e += "/"),
                e);
        }),
        (h.prototype.fetchArrayBuffer = function () {
            return this.fetch({ responseType: "arraybuffer" });
        }),
        (h.fetchArrayBuffer = function (e) {
            const t = new h(e);
            return t.fetchArrayBuffer();
        }),
        (h.prototype.fetchBlob = function () {
            return this.fetch({ responseType: "blob" });
        }),
        (h.fetchBlob = function (e) {
            const t = new h(e);
            return t.fetchBlob();
        }),
        (h.prototype.fetchImage = function (e) {
            e = ge.defaultValue(e, ge.defaultValue.EMPTY_OBJECT);
            const i = ge.defaultValue(e.preferImageBitmap, !1);
            var t = ge.defaultValue(e.preferBlob, !1);
            const a = ge.defaultValue(e.flipY, !1),
                s = ge.defaultValue(e.skipColorSpaceConversion, !1);
            if (
                (Qr(this.request),
                !Hr ||
                    this.isDataUri ||
                    this.isBlobUri ||
                    (!this.hasHeaders && !t))
            )
                return Kr({
                    resource: this,
                    flipY: a,
                    skipColorSpaceConversion: s,
                    preferImageBitmap: i,
                });
            const u = this.fetchBlob();
            if (ge.defined(u)) {
                let t, n, r, o;
                return h
                    .supportsImageBitmapOptions()
                    .then(function (e) {
                        return (t = e), (n = t && i), u;
                    })
                    .then(function (e) {
                        if (ge.defined(e)) {
                            if (((o = e), n))
                                return h.createImageBitmapFromBlob(e, {
                                    flipY: a,
                                    premultiplyAlpha: !1,
                                    skipColorSpaceConversion: s,
                                });
                            e = window.URL.createObjectURL(e);
                            return Kr({
                                resource: (r = new h({ url: e })),
                                flipY: a,
                                skipColorSpaceConversion: s,
                                preferImageBitmap: !1,
                            });
                        }
                    })
                    .then(function (e) {
                        if (ge.defined(e))
                            return (
                                (e.blob = o),
                                n || window.URL.revokeObjectURL(r.url),
                                e
                            );
                    })
                    .catch(function (e) {
                        return (
                            ge.defined(r) && window.URL.revokeObjectURL(r.url),
                            (e.blob = o),
                            Promise.reject(e)
                        );
                    });
            }
        }),
        (h.fetchImage = function (e) {
            const t = new h(e);
            return t.fetchImage({
                flipY: e.flipY,
                skipColorSpaceConversion: e.skipColorSpaceConversion,
                preferBlob: e.preferBlob,
                preferImageBitmap: e.preferImageBitmap,
            });
        }),
        (h.prototype.fetchText = function () {
            return this.fetch({ responseType: "text" });
        }),
        (h.fetchText = function (e) {
            const t = new h(e);
            return t.fetchText();
        }),
        (h.prototype.fetchJson = function () {
            const e = this.fetch({
                responseType: "text",
                headers: { Accept: "application/json,*/*;q=0.01" },
            });
            if (ge.defined(e))
                return e.then(function (e) {
                    if (ge.defined(e)) return JSON.parse(e);
                });
        }),
        (h.fetchJson = function (e) {
            const t = new h(e);
            return t.fetchJson();
        }),
        (h.prototype.fetchXML = function () {
            return this.fetch({
                responseType: "document",
                overrideMimeType: "text/xml",
            });
        }),
        (h.fetchXML = function (e) {
            const t = new h(e);
            return t.fetchXML();
        }),
        (h.prototype.fetchJsonp = function (e) {
            (e = ge.defaultValue(e, "callback")), Qr(this.request);
            let t;
            for (
                ;
                (t =
                    "loadJsonp" +
                    Te.nextRandomNumber().toString().substring(2, 8)),
                    ge.defined(window[t]);

            );
            return (function n(r, o, i) {
                const e = {};
                e[o] = i;
                r.setQueryParameters(e);
                const a = r.request;
                a.url = r.url;
                a.requestFunction = function () {
                    const t = _r();
                    return (
                        (window[i] = function (e) {
                            t.resolve(e);
                            try {
                                delete window[i];
                            } catch (e) {
                                window[i] = void 0;
                            }
                        }),
                        h._Implementations.loadAndExecuteScript(r.url, i, t),
                        t.promise
                    );
                };
                const t = f.request(a);
                if (!ge.defined(t)) return;
                return t.catch(function (t) {
                    return a.state !== d.FAILED
                        ? Promise.reject(t)
                        : r.retryOnError(t).then(function (e) {
                              return e
                                  ? ((a.state = d.UNISSUED),
                                    (a.deferred = void 0),
                                    n(r, o, i))
                                  : Promise.reject(t);
                          });
                });
            })(this, e, t);
        }),
        (h.fetchJsonp = function (e) {
            const t = new h(e);
            return t.fetchJsonp(e.callbackParameterName);
        }),
        (h.prototype._makeRequest = function (s) {
            const u = this,
                c = (Qr(u.request), u.request),
                e =
                    ((c.url = u.url),
                    (c.requestFunction = function () {
                        var e = s.responseType,
                            t = Er(s.headers, u.headers),
                            n = s.overrideMimeType,
                            r = s.method,
                            o = s.data,
                            i = _r();
                        const a = h._Implementations.loadWithXhr(
                            u.url,
                            e,
                            r,
                            o,
                            t,
                            i,
                            n
                        );
                        return (
                            ge.defined(a) &&
                                ge.defined(a.abort) &&
                                (c.cancelFunction = function () {
                                    a.abort();
                                }),
                            i.promise
                        );
                    }),
                    f.request(c));
            if (ge.defined(e))
                return e
                    .then(function (e) {
                        return (c.cancelFunction = void 0), e;
                    })
                    .catch(function (t) {
                        return (
                            (c.cancelFunction = void 0),
                            c.state !== d.FAILED
                                ? Promise.reject(t)
                                : u.retryOnError(t).then(function (e) {
                                      return e
                                          ? ((c.state = d.UNISSUED),
                                            (c.deferred = void 0),
                                            u.fetch(s))
                                          : Promise.reject(t);
                                  })
                        );
                    });
        });
    const Jr = /^data:(.*?)(;base64)?,(.*)$/;
    function eo(e, t) {
        t = decodeURIComponent(t);
        return e ? atob(t) : t;
    }
    function to(e, t) {
        const n = eo(e, t);
        e = new ArrayBuffer(n.length);
        const r = new Uint8Array(e);
        for (let e = 0; e < n.length; e++) r[e] = n.charCodeAt(e);
        return e;
    }
    function no(e, t) {
        switch (t) {
            case "text":
                return e.toString("utf8");
            case "json":
                return JSON.parse(e.toString("utf8"));
            default:
                return new Uint8Array(e).buffer;
        }
    }
    (h.prototype.fetch = function (e) {
        return ((e = Yr(e, {})).method = "GET"), this._makeRequest(e);
    }),
        (h.fetch = function (e) {
            const t = new h(e);
            return t.fetch({
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
            });
        }),
        (h.prototype.delete = function (e) {
            return ((e = Yr(e, {})).method = "DELETE"), this._makeRequest(e);
        }),
        (h.delete = function (e) {
            const t = new h(e);
            return t.delete({
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
                data: e.data,
            });
        }),
        (h.prototype.head = function (e) {
            return ((e = Yr(e, {})).method = "HEAD"), this._makeRequest(e);
        }),
        (h.head = function (e) {
            const t = new h(e);
            return t.head({
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
            });
        }),
        (h.prototype.options = function (e) {
            return ((e = Yr(e, {})).method = "OPTIONS"), this._makeRequest(e);
        }),
        (h.options = function (e) {
            const t = new h(e);
            return t.options({
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
            });
        }),
        (h.prototype.post = function (e, t) {
            return (
                i.defined("data", e),
                ((t = Yr(t, {})).method = "POST"),
                (t.data = e),
                this._makeRequest(t)
            );
        }),
        (h.post = function (e) {
            const t = new h(e);
            return t.post(e.data, {
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
            });
        }),
        (h.prototype.put = function (e, t) {
            return (
                i.defined("data", e),
                ((t = Yr(t, {})).method = "PUT"),
                (t.data = e),
                this._makeRequest(t)
            );
        }),
        (h.put = function (e) {
            const t = new h(e);
            return t.put(e.data, {
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
            });
        }),
        (h.prototype.patch = function (e, t) {
            return (
                i.defined("data", e),
                ((t = Yr(t, {})).method = "PATCH"),
                (t.data = e),
                this._makeRequest(t)
            );
        }),
        (h.patch = function (e) {
            const t = new h(e);
            return t.patch(e.data, {
                responseType: e.responseType,
                overrideMimeType: e.overrideMimeType,
            });
        }),
        ((h._Implementations = {}).loadImageElement = function (e, t, n) {
            const r = new Image();
            (r.onload = function () {
                0 === r.naturalWidth &&
                    0 === r.naturalHeight &&
                    0 === r.width &&
                    0 === r.height &&
                    ((r.width = 300), (r.height = 150)),
                    n.resolve(r);
            }),
                (r.onerror = function (e) {
                    n.reject(e);
                }),
                t &&
                    (Gr.contains(e)
                        ? (r.crossOrigin = "use-credentials")
                        : (r.crossOrigin = "")),
                (r.src = e);
        }),
        (h._Implementations.createImage = function (r, o, i, a, s, u) {
            const c = r.url;
            h.supportsImageBitmapOptions()
                .then(function (e) {
                    if (e && u) {
                        const t = _r(),
                            n = h._Implementations.loadWithXhr(
                                c,
                                "blob",
                                "GET",
                                void 0,
                                void 0,
                                t,
                                void 0,
                                void 0,
                                void 0
                            );
                        return (
                            ge.defined(n) &&
                                ge.defined(n.abort) &&
                                (r.cancelFunction = function () {
                                    n.abort();
                                }),
                            t.promise
                                .then(function (e) {
                                    if (ge.defined(e))
                                        return h.createImageBitmapFromBlob(e, {
                                            flipY: a,
                                            premultiplyAlpha: !1,
                                            skipColorSpaceConversion: s,
                                        });
                                    i.reject(
                                        new Ce(
                                            `Successfully retrieved ${c} but it contained no content.`
                                        )
                                    );
                                })
                                .then(function (e) {
                                    i.resolve(e);
                                })
                        );
                    }
                    h._Implementations.loadImageElement(c, o, i);
                })
                .catch(function (e) {
                    i.reject(e);
                });
        }),
        (h.createImageBitmapFromBlob = function (e, t) {
            return (
                i.defined("options", t),
                i.typeOf.bool("options.flipY", t.flipY),
                i.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha),
                i.typeOf.bool(
                    "options.skipColorSpaceConversion",
                    t.skipColorSpaceConversion
                ),
                createImageBitmap(e, {
                    imageOrientation: t.flipY ? "flipY" : "none",
                    premultiplyAlpha: t.premultiplyAlpha
                        ? "premultiply"
                        : "none",
                    colorSpaceConversion: t.skipColorSpaceConversion
                        ? "none"
                        : "default",
                })
            );
        });
    const ro = "undefined" == typeof XMLHttpRequest;
    function oo(e) {
        if (
            ((e = ge.defaultValue(e, ge.defaultValue.EMPTY_OBJECT)),
            (this._dates = void 0),
            (this._samples = void 0),
            (this._dateColumn = -1),
            (this._xPoleWanderRadiansColumn = -1),
            (this._yPoleWanderRadiansColumn = -1),
            (this._ut1MinusUtcSecondsColumn = -1),
            (this._xCelestialPoleOffsetRadiansColumn = -1),
            (this._yCelestialPoleOffsetRadiansColumn = -1),
            (this._taiMinusUtcSecondsColumn = -1),
            (this._columnCount = 0),
            (this._lastIndex = -1),
            (this._downloadPromise = void 0),
            (this._dataError = void 0),
            (this._addNewLeapSeconds = ge.defaultValue(
                e.addNewLeapSeconds,
                !0
            )),
            ge.defined(e.data))
        )
            ao(this, e.data);
        else if (ge.defined(e.url)) {
            const t = h.createIfNeeded(e.url),
                n = this;
            this._downloadPromise = t
                .fetchJson()
                .then(function (e) {
                    ao(n, e);
                })
                .catch(function () {
                    n._dataError = `An error occurred while retrieving the EOP data from the URL ${t.url}.`;
                });
        } else
            ao(this, {
                columnNames: [
                    "dateIso8601",
                    "modifiedJulianDateUtc",
                    "xPoleWanderRadians",
                    "yPoleWanderRadians",
                    "ut1MinusUtcSeconds",
                    "lengthOfDayCorrectionSeconds",
                    "xCelestialPoleOffsetRadians",
                    "yCelestialPoleOffsetRadians",
                    "taiMinusUtcSeconds",
                ],
                samples: [],
            });
    }
    function io(e, t) {
        return T.compare(e.julianDate, t);
    }
    function ao(r, e) {
        if (ge.defined(e.columnNames))
            if (ge.defined(e.samples)) {
                var o = e.columnNames.indexOf("modifiedJulianDateUtc"),
                    t = e.columnNames.indexOf("xPoleWanderRadians"),
                    i = e.columnNames.indexOf("yPoleWanderRadians"),
                    a = e.columnNames.indexOf("ut1MinusUtcSeconds"),
                    s = e.columnNames.indexOf("xCelestialPoleOffsetRadians"),
                    u = e.columnNames.indexOf("yCelestialPoleOffsetRadians"),
                    c = e.columnNames.indexOf("taiMinusUtcSeconds");
                if (o < 0 || t < 0 || i < 0 || a < 0 || s < 0 || u < 0 || c < 0)
                    r._dataError =
                        "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns";
                else {
                    var l = (r._samples = e.samples);
                    const m = (r._dates = []);
                    (r._dateColumn = o),
                        (r._xPoleWanderRadiansColumn = t),
                        (r._yPoleWanderRadiansColumn = i),
                        (r._ut1MinusUtcSecondsColumn = a),
                        (r._xCelestialPoleOffsetRadiansColumn = s),
                        (r._yCelestialPoleOffsetRadiansColumn = u),
                        (r._taiMinusUtcSecondsColumn = c),
                        (r._columnCount = e.columnNames.length),
                        (r._lastIndex = void 0);
                    let n;
                    var d = r._addNewLeapSeconds;
                    for (let e = 0, t = l.length; e < t; e += r._columnCount) {
                        var f = l[e + o],
                            h = l[e + c],
                            f = new T(
                                f + y.MODIFIED_JULIAN_DATE_DIFFERENCE,
                                h,
                                g.TAI
                            );
                        if ((m.push(f), d)) {
                            if (h !== n && ge.defined(n)) {
                                const E = T.leapSeconds;
                                var p = kn(E, f, io);
                                p < 0 &&
                                    ((f = new _(f, h)), E.splice(~p, 0, f));
                            }
                            n = h;
                        }
                    }
                }
            } else
                r._dataError =
                    "Error in loaded EOP data: The samples property is required.";
        else
            r._dataError =
                "Error in loaded EOP data: The columnNames property is required.";
    }
    function so(e, t, n, r, o) {
        n *= r;
        (o.xPoleWander = t[n + e._xPoleWanderRadiansColumn]),
            (o.yPoleWander = t[n + e._yPoleWanderRadiansColumn]),
            (o.xPoleOffset = t[n + e._xCelestialPoleOffsetRadiansColumn]),
            (o.yPoleOffset = t[n + e._yCelestialPoleOffsetRadiansColumn]),
            (o.ut1MinusUtc = t[n + e._ut1MinusUtcSecondsColumn]);
    }
    function uo(e, t, n) {
        return t + e * (n - t);
    }
    function co(n, r, o, i, a, s, u) {
        var c = n._columnCount;
        if (s > r.length - 1)
            return (
                (u.xPoleWander = 0),
                (u.yPoleWander = 0),
                (u.xPoleOffset = 0),
                (u.yPoleOffset = 0),
                void (u.ut1MinusUtc = 0)
            );
        const l = r[a],
            d = r[s];
        if (l.equals(d) || i.equals(l)) so(n, o, a, c, u);
        else if (i.equals(d)) so(n, o, s, c, u);
        else {
            (r = T.secondsDifference(i, l) / T.secondsDifference(d, l)),
                (a = a * c),
                (s = s * c);
            let e = o[a + n._ut1MinusUtcSecondsColumn],
                t = o[s + n._ut1MinusUtcSecondsColumn];
            var f,
                c = t - e;
            !(0.5 < c || c < -0.5) ||
                ((c = o[a + n._taiMinusUtcSecondsColumn]) !==
                    (f = o[s + n._taiMinusUtcSecondsColumn]) &&
                    (d.equals(i) ? (e = t) : (t -= f - c))),
                (u.xPoleWander = uo(
                    r,
                    o[a + n._xPoleWanderRadiansColumn],
                    o[s + n._xPoleWanderRadiansColumn]
                )),
                (u.yPoleWander = uo(
                    r,
                    o[a + n._yPoleWanderRadiansColumn],
                    o[s + n._yPoleWanderRadiansColumn]
                )),
                (u.xPoleOffset = uo(
                    r,
                    o[a + n._xCelestialPoleOffsetRadiansColumn],
                    o[s + n._xCelestialPoleOffsetRadiansColumn]
                )),
                (u.yPoleOffset = uo(
                    r,
                    o[a + n._yCelestialPoleOffsetRadiansColumn],
                    o[s + n._yCelestialPoleOffsetRadiansColumn]
                )),
                (u.ut1MinusUtc = uo(r, e, t));
        }
    }
    function a(e, t, n) {
        (this.heading = ge.defaultValue(e, 0)),
            (this.pitch = ge.defaultValue(t, 0)),
            (this.roll = ge.defaultValue(n, 0));
    }
    (h._Implementations.loadWithXhr = function (e, a, s, t, n, u, r) {
        var o = Jr.exec(e);
        if (null !== o)
            u.resolve(
                (function (e, t) {
                    t = ge.defaultValue(t, "");
                    var n,
                        r = e[1],
                        o = !!e[2],
                        i = e[3];
                    let a;
                    switch (t) {
                        case "":
                        case "text":
                            return eo(o, i);
                        case "arraybuffer":
                            return to(o, i);
                        case "blob":
                            return (n = to(o, i)), new Blob([n], { type: r });
                        case "document":
                            return (a = new DOMParser()).parseFromString(
                                eo(o, i),
                                r
                            );
                        case "json":
                            return JSON.parse(eo(o, i));
                    }
                })(o, a)
            );
        else {
            if (!ro) {
                const l = new XMLHttpRequest();
                if (
                    (Gr.contains(e) && (l.withCredentials = !0),
                    l.open(s, e, !0),
                    ge.defined(r) &&
                        ge.defined(l.overrideMimeType) &&
                        l.overrideMimeType(r),
                    ge.defined(n))
                )
                    for (const d in n)
                        n.hasOwnProperty(d) && l.setRequestHeader(d, n[d]);
                ge.defined(a) && (l.responseType = a);
                let i = !1;
                return (
                    "string" == typeof e &&
                        (i =
                            0 === e.indexOf("file://") ||
                            ("undefined" != typeof window &&
                                "file://" === window.location.origin)),
                    (l.onload = function () {
                        if (
                            !(l.status < 200 || 300 <= l.status) ||
                            (i && 0 === l.status)
                        ) {
                            var e = l.response,
                                t = l.responseType;
                            if ("HEAD" === s || "OPTIONS" === s) {
                                const n = l.getAllResponseHeaders(),
                                    r = n.trim().split(/[\r\n]+/),
                                    o = {};
                                return (
                                    r.forEach(function (e) {
                                        const t = e.split(": ");
                                        e = t.shift();
                                        o[e] = t.join(": ");
                                    }),
                                    void u.resolve(o)
                                );
                            }
                            if (204 === l.status) u.resolve();
                            else if (
                                !ge.defined(e) ||
                                (ge.defined(a) && t !== a)
                            )
                                if ("json" === a && "string" == typeof e)
                                    try {
                                        u.resolve(JSON.parse(e));
                                    } catch (e) {
                                        u.reject(e);
                                    }
                                else
                                    ("" === t || "document" === t) &&
                                    ge.defined(l.responseXML) &&
                                    l.responseXML.hasChildNodes()
                                        ? u.resolve(l.responseXML)
                                        : ("" !== t && "text" !== t) ||
                                          !ge.defined(l.responseText)
                                        ? u.reject(
                                              new Ce(
                                                  "Invalid XMLHttpRequest response type."
                                              )
                                          )
                                        : u.resolve(l.responseText);
                            else u.resolve(e);
                        } else
                            u.reject(
                                new Nr(
                                    l.status,
                                    l.response,
                                    l.getAllResponseHeaders()
                                )
                            );
                    }),
                    (l.onerror = function (e) {
                        u.reject(new Nr());
                    }),
                    l.send(t),
                    l
                );
            }
            {
                var o = e,
                    i = a,
                    r = s,
                    t = n,
                    c = u;
                const f =
                        "https:" === (o = require("url").parse(o)).protocol
                            ? require("https")
                            : require("http"),
                    h = require("zlib");
                (o = {
                    protocol: o.protocol,
                    hostname: o.hostname,
                    port: o.port,
                    path: o.path,
                    query: o.query,
                    method: r,
                    headers: t,
                }),
                    f
                        .request(o)
                        .on("response", function (t) {
                            if (t.statusCode < 200 || 300 <= t.statusCode)
                                c.reject(new Nr(t.statusCode, t, t.headers));
                            else {
                                const n = [];
                                t.on("data", function (e) {
                                    n.push(e);
                                }),
                                    t.on("end", function () {
                                        var e = Buffer.concat(n);
                                        "gzip" === t.headers["content-encoding"]
                                            ? h.gunzip(e, function (e, t) {
                                                  e
                                                      ? c.reject(
                                                            new Ce(
                                                                "Error decompressing response."
                                                            )
                                                        )
                                                      : c.resolve(no(t, i));
                                              })
                                            : c.resolve(no(e, i));
                                    });
                            }
                        })
                        .on("error", function (e) {
                            c.reject(new Nr());
                        })
                        .end();
            }
        }
    }),
        (h._Implementations.loadAndExecuteScript = function (e, t, n) {
            return (function (e) {
                const t = _r(),
                    n = document.createElement("script"),
                    r =
                        ((n.async = !0),
                        (n.src = e),
                        document.getElementsByTagName("head")[0]);
                return (
                    (n.onload = function () {
                        (n.onload = void 0), r.removeChild(n), t.resolve();
                    }),
                    (n.onerror = function (e) {
                        t.reject(e);
                    }),
                    r.appendChild(n),
                    t.promise
                );
            })(e).catch(function (e) {
                n.reject(e);
            });
        }),
        ((h._DefaultImplementations = {}).createImage =
            h._Implementations.createImage),
        (h._DefaultImplementations.loadWithXhr =
            h._Implementations.loadWithXhr),
        (h._DefaultImplementations.loadAndExecuteScript =
            h._Implementations.loadAndExecuteScript),
        (h.DEFAULT = Object.freeze(
            new h({
                url:
                    "undefined" == typeof document
                        ? ""
                        : document.location.href.split("?")[0],
            })
        )),
        (oo.NONE = Object.freeze({
            getPromiseToLoad: function () {
                return Promise.resolve();
            },
            compute: function (e, t) {
                return (
                    ge.defined(t)
                        ? ((t.xPoleWander = 0),
                          (t.yPoleWander = 0),
                          (t.xPoleOffset = 0),
                          (t.yPoleOffset = 0),
                          (t.ut1MinusUtc = 0))
                        : (t = new Gn(0, 0, 0, 0, 0)),
                    t
                );
            },
        })),
        (oo.prototype.getPromiseToLoad = function () {
            return Promise.resolve(this._downloadPromise);
        }),
        (oo.prototype.compute = function (r, o) {
            if (ge.defined(this._samples)) {
                if (
                    (ge.defined(o) || (o = new Gn(0, 0, 0, 0, 0)),
                    0 === this._samples.length)
                )
                    return (
                        (o.xPoleWander = 0),
                        (o.yPoleWander = 0),
                        (o.xPoleOffset = 0),
                        (o.yPoleOffset = 0),
                        (o.ut1MinusUtc = 0),
                        o
                    );
                const c = this._dates;
                var i = this._lastIndex;
                let e = 0,
                    t = 0;
                if (ge.defined(i)) {
                    var a = c[i];
                    const l = c[i + 1];
                    var a = T.lessThanOrEquals(a, r),
                        s = !ge.defined(l),
                        u = s || T.greaterThanOrEquals(l, r);
                    if (a && u)
                        return (
                            (e = i),
                            !s && l.equals(r) && ++e,
                            (t = e + 1),
                            co(this, c, this._samples, r, e, t, o),
                            o
                        );
                }
                let n = kn(c, r, T.compare, this._dateColumn);
                return (
                    0 <= n
                        ? (n < c.length - 1 && c[n + 1].equals(r) && ++n,
                          (e = n),
                          (t = n))
                        : ((t = ~n), (e = t - 1) < 0 && (e = 0)),
                    (this._lastIndex = e),
                    co(this, c, this._samples, r, e, t, o),
                    o
                );
            }
            if (ge.defined(this._dataError)) throw new Ce(this._dataError);
        }),
        (a.fromQuaternion = function (e, t) {
            ge.defined(t) || (t = new a());
            var n = 2 * (e.w * e.y - e.z * e.x),
                r = 1 - 2 * (e.x * e.x + e.y * e.y),
                o = 2 * (e.w * e.x + e.y * e.z),
                i = 1 - 2 * (e.y * e.y + e.z * e.z),
                e = 2 * (e.w * e.z + e.x * e.y);
            return (
                (t.heading = -Math.atan2(e, i)),
                (t.roll = Math.atan2(o, r)),
                (t.pitch = -Te.asinClamped(n)),
                t
            );
        }),
        (a.fromDegrees = function (e, t, n, r) {
            return (
                ((r = ge.defined(r) ? r : new a()).heading =
                    e * Te.RADIANS_PER_DEGREE),
                (r.pitch = t * Te.RADIANS_PER_DEGREE),
                (r.roll = n * Te.RADIANS_PER_DEGREE),
                r
            );
        }),
        (a.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.heading = e.heading),
                      (t.pitch = e.pitch),
                      (t.roll = e.roll),
                      t)
                    : new a(e.heading, e.pitch, e.roll);
        }),
        (a.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e.heading === t.heading &&
                    e.pitch === t.pitch &&
                    e.roll === t.roll)
            );
        }),
        (a.equalsEpsilon = function (e, t, n, r) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    Te.equalsEpsilon(e.heading, t.heading, n, r) &&
                    Te.equalsEpsilon(e.pitch, t.pitch, n, r) &&
                    Te.equalsEpsilon(e.roll, t.roll, n, r))
            );
        }),
        (a.prototype.clone = function (e) {
            return a.clone(this, e);
        }),
        (a.prototype.equals = function (e) {
            return a.equals(this, e);
        }),
        (a.prototype.equalsEpsilon = function (e, t, n) {
            return a.equalsEpsilon(this, e, t, n);
        }),
        (a.prototype.toString = function () {
            return `(${this.heading}, ${this.pitch}, ${this.roll})`;
        });
    const lo = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/;
    let fo;
    function ho(e) {
        return "undefined" == typeof document
            ? e
            : (((fo = ge.defined(fo) ? fo : document.createElement("a")).href =
                  e),
              (fo.href = fo.href),
              fo.href);
    }
    let po;
    function mo() {
        if (!ge.defined(po)) {
            let e;
            (e =
                "undefined" != typeof CESIUM_BASE_URL
                    ? CESIUM_BASE_URL
                    : "object" == typeof define &&
                      ge.defined(define.amd) &&
                      !define.amd.toUrlUndefined &&
                      ge.defined(require.toUrl)
                    ? yr("..", go("Core/buildModuleUrl.js"))
                    : (function () {
                          const n = document.getElementsByTagName("script");
                          for (let e = 0, t = n.length; e < t; ++e) {
                              var r = n[e].getAttribute("src"),
                                  r = lo.exec(r);
                              if (null !== r) return r[1];
                          }
                      })()),
                (po = new h({ url: ho(e) })).appendForwardSlash();
        }
        return po;
    }
    function Eo(e) {
        return ho(require.toUrl("../" + e));
    }
    function _o(e) {
        return mo().getDerivedResource({ url: e }).url;
    }
    let yo;
    function go(e) {
        return (yo = ge.defined(yo)
            ? yo
            : "object" == typeof define &&
              ge.defined(define.amd) &&
              !define.amd.toUrlUndefined &&
              ge.defined(require.toUrl)
            ? Eo
            : _o)(e);
    }
    function To(e, t, n) {
        (this.x = e), (this.y = t), (this.s = n);
    }
    function Ro(e) {
        (e = ge.defaultValue(e, ge.defaultValue.EMPTY_OBJECT)),
            (this._xysFileUrlTemplate = h.createIfNeeded(e.xysFileUrlTemplate)),
            (this._interpolationOrder = ge.defaultValue(
                e.interpolationOrder,
                9
            )),
            (this._sampleZeroJulianEphemerisDate = ge.defaultValue(
                e.sampleZeroJulianEphemerisDate,
                2442396.5
            )),
            (this._sampleZeroDateTT = new T(
                this._sampleZeroJulianEphemerisDate,
                0,
                g.TAI
            )),
            (this._stepSizeDays = ge.defaultValue(e.stepSizeDays, 1)),
            (this._samplesPerXysFile = ge.defaultValue(
                e.samplesPerXysFile,
                1e3
            )),
            (this._totalSamples = ge.defaultValue(e.totalSamples, 27426)),
            (this._samples = new Array(3 * this._totalSamples)),
            (this._chunkDownloadsInProgress = []);
        var n = this._interpolationOrder;
        const r = (this._denominators = new Array(n + 1)),
            o = (this._xTable = new Array(n + 1));
        var i = Math.pow(this._stepSizeDays, n);
        for (let t = 0; t <= n; ++t) {
            (r[t] = i), (o[t] = t * this._stepSizeDays);
            for (let e = 0; e <= n; ++e) e !== t && (r[t] *= t - e);
            r[t] = 1 / r[t];
        }
        (this._work = new Array(n + 1)), (this._coef = new Array(n + 1));
    }
    (go._cesiumScriptRegex = lo),
        (go._buildModuleUrlFromBaseUrl = _o),
        (go._clearBaseResource = function () {
            po = void 0;
        }),
        (go.setBaseUrl = function (e) {
            po = h.DEFAULT.getDerivedResource({ url: e });
        }),
        (go.getCesiumBaseUrl = mo);
    const Ao = new T(0, 0, g.TAI);
    function So(e, t, n) {
        const r = Ao;
        return (
            (r.dayNumber = t),
            (r.secondsOfDay = n),
            T.daysDifference(r, e._sampleZeroDateTT)
        );
    }
    function wo(t, i) {
        if (t._chunkDownloadsInProgress[i])
            return t._chunkDownloadsInProgress[i];
        const a = _r();
        t._chunkDownloadsInProgress[i] = a;
        let e;
        const n = t._xysFileUrlTemplate;
        return (
            (e = ge.defined(n)
                ? n.getDerivedResource({ templateValues: { 0: i } })
                : new h({
                      url: go(`Assets/IAU2006_XYS/IAU2006_XYS_${i}.json`),
                  }))
                .fetchJson()
                .then(function (e) {
                    t._chunkDownloadsInProgress[i] = !1;
                    const n = t._samples;
                    var r = e.samples,
                        o = i * t._samplesPerXysFile * 3;
                    for (let e = 0, t = r.length; e < t; ++e) n[o + e] = r[e];
                    a.resolve();
                }),
            a.promise
        );
    }
    (Ro.prototype.preload = function (e, t, n, r) {
        (e = So(this, e, t)), (t = So(this, n, r));
        let o = (e / this._stepSizeDays - this._interpolationOrder / 2) | 0,
            i =
                (o < 0 && (o = 0),
                (t / this._stepSizeDays - this._interpolationOrder / 2) |
                    (0 + this._interpolationOrder));
        i >= this._totalSamples && (i = this._totalSamples - 1);
        var n = (o / this._samplesPerXysFile) | 0,
            a = (i / this._samplesPerXysFile) | 0;
        const s = [];
        for (let e = n; e <= a; ++e) s.push(wo(this, e));
        return Promise.all(s);
    }),
        (Ro.prototype.computeXysRadians = function (r, o, i) {
            r = So(this, r, o);
            if (!(r < 0)) {
                o = (r / this._stepSizeDays) | 0;
                if (!(o >= this._totalSamples)) {
                    var a = this._interpolationOrder;
                    let n = o - ((a / 2) | 0),
                        e = (n = n < 0 ? 0 : n) + a,
                        t =
                            (e >= this._totalSamples &&
                                ((e = this._totalSamples - 1),
                                (n = e - a) < 0 && (n = 0)),
                            !1);
                    var s = this._samples;
                    if (
                        (ge.defined(s[3 * n]) ||
                            (wo(this, (n / this._samplesPerXysFile) | 0),
                            (t = !0)),
                        ge.defined(s[3 * e]) ||
                            (wo(this, (e / this._samplesPerXysFile) | 0),
                            (t = !0)),
                        !t)
                    ) {
                        ge.defined(i)
                            ? ((i.x = 0), (i.y = 0), (i.s = 0))
                            : (i = new To(0, 0, 0));
                        var u = r - n * this._stepSizeDays;
                        const f = this._work;
                        var c = this._denominators;
                        const h = this._coef;
                        var l = this._xTable;
                        let e, t;
                        for (e = 0; e <= a; ++e) f[e] = u - l[e];
                        for (e = 0; e <= a; ++e) {
                            for (h[e] = 1, t = 0; t <= a; ++t)
                                t !== e && (h[e] *= f[t]);
                            h[e] *= c[e];
                            var d = 3 * (n + e);
                            (i.x += h[e] * s[d++]),
                                (i.y += h[e] * s[d++]),
                                (i.s += h[e] * s[d]);
                        }
                        return i;
                    }
                }
            }
        });
    let Io;
    const s = {
            requestFullscreen: void 0,
            exitFullscreen: void 0,
            fullscreenEnabled: void 0,
            fullscreenElement: void 0,
            fullscreenchange: void 0,
            fullscreenerror: void 0,
        },
        vo = {};
    Object.defineProperties(vo, {
        element: {
            get: function () {
                if (vo.supportsFullscreen())
                    return document[s.fullscreenElement];
            },
        },
        changeEventName: {
            get: function () {
                if (vo.supportsFullscreen()) return s.fullscreenchange;
            },
        },
        errorEventName: {
            get: function () {
                if (vo.supportsFullscreen()) return s.fullscreenerror;
            },
        },
        enabled: {
            get: function () {
                if (vo.supportsFullscreen())
                    return document[s.fullscreenEnabled];
            },
        },
        fullscreen: {
            get: function () {
                if (vo.supportsFullscreen()) return null !== vo.element;
            },
        },
    }),
        (vo.supportsFullscreen = function () {
            if (!ge.defined(Io)) {
                Io = !1;
                var r = document.body;
                if ("function" == typeof r.requestFullscreen)
                    return (
                        (s.requestFullscreen = "requestFullscreen"),
                        (s.exitFullscreen = "exitFullscreen"),
                        (s.fullscreenEnabled = "fullscreenEnabled"),
                        (s.fullscreenElement = "fullscreenElement"),
                        (s.fullscreenchange = "fullscreenchange"),
                        (s.fullscreenerror = "fullscreenerror"),
                        (Io = !0)
                    );
                var o = ["webkit", "moz", "o", "ms", "khtml"];
                let n;
                for (let e = 0, t = o.length; e < t; ++e) {
                    var i = o[e];
                    ("function" == typeof r[(n = i + "RequestFullscreen")] ||
                        "function" ==
                            typeof r[(n = i + "RequestFullScreen")]) &&
                        ((s.requestFullscreen = n), (Io = !0)),
                        (n = i + "ExitFullscreen"),
                        "function" == typeof document[n]
                            ? (s.exitFullscreen = n)
                            : ((n = i + "CancelFullScreen"),
                              "function" == typeof document[n] &&
                                  (s.exitFullscreen = n)),
                        (n = i + "FullscreenEnabled"),
                        void 0 !== document[n]
                            ? (s.fullscreenEnabled = n)
                            : ((n = i + "FullScreenEnabled"),
                              void 0 !== document[n] &&
                                  (s.fullscreenEnabled = n)),
                        (n = i + "FullscreenElement"),
                        void 0 !== document[n]
                            ? (s.fullscreenElement = n)
                            : ((n = i + "FullScreenElement"),
                              void 0 !== document[n] &&
                                  (s.fullscreenElement = n)),
                        (n = i + "fullscreenchange"),
                        void 0 !== document["on" + n] &&
                            ("ms" === i && (n = "MSFullscreenChange"),
                            (s.fullscreenchange = n)),
                        (n = i + "fullscreenerror"),
                        void 0 !== document["on" + n] &&
                            ("ms" === i && (n = "MSFullscreenError"),
                            (s.fullscreenerror = n));
                }
            }
            return Io;
        }),
        (vo.requestFullscreen = function (e, t) {
            vo.supportsFullscreen() && e[s.requestFullscreen]({ vrDisplay: t });
        }),
        (vo.exitFullscreen = function () {
            vo.supportsFullscreen() && document[s.exitFullscreen]();
        }),
        (vo._names = s);
    let Oo;
    function No(e) {
        const n = e.split(".");
        for (let e = 0, t = n.length; e < t; ++e) n[e] = parseInt(n[e], 10);
        return n;
    }
    Oo = "undefined" != typeof navigator ? navigator : {};
    let xo, Mo;
    function Po() {
        var e;
        return (
            ge.defined(xo) ||
                ((xo = !1),
                Go() ||
                    (null !== (e = / Chrome\/([\.0-9]+)/.exec(Oo.userAgent)) &&
                        ((xo = !0), (Mo = No(e[1]))))),
            xo
        );
    }
    let bo, Co;
    function Uo() {
        var e;
        return (
            ge.defined(bo) ||
                ((bo = !1),
                Po() ||
                    Go() ||
                    !/ Safari\/[\.0-9]+/.test(Oo.userAgent) ||
                    (null !== (e = / Version\/([\.0-9]+)/.exec(Oo.userAgent)) &&
                        ((bo = !0), (Co = No(e[1]))))),
            bo
        );
    }
    let Do, zo;
    function Fo() {
        var e;
        return (
            ge.defined(Do) ||
                ((Do = !1),
                null !==
                    (e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(Oo.userAgent)) &&
                    ((Do = !0), ((zo = No(e[1])).isNightly = !!e[2]))),
            Do
        );
    }
    let Lo, Bo;
    function qo() {
        if (!ge.defined(Lo)) {
            Lo = !1;
            let e;
            "Microsoft Internet Explorer" === Oo.appName
                ? null !==
                      (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Oo.userAgent)) &&
                  ((Lo = !0), (Bo = No(e[1])))
                : "Netscape" === Oo.appName &&
                  null !==
                      (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(
                          Oo.userAgent
                      )) &&
                  ((Lo = !0), (Bo = No(e[1])));
        }
        return Lo;
    }
    let Vo, ko;
    function Go() {
        var e;
        return (
            ge.defined(Vo) ||
                ((Vo = !1),
                null !== (e = / Edg\/([\.0-9]+)/.exec(Oo.userAgent)) &&
                    ((Vo = !0), (ko = No(e[1])))),
            Vo
        );
    }
    let Wo, Ho;
    function Xo() {
        var e;
        return (
            ge.defined(Wo) ||
                ((Wo = !1),
                null !== (e = /Firefox\/([\.0-9]+)/.exec(Oo.userAgent)) &&
                    ((Wo = !0), (Ho = No(e[1])))),
            Wo
        );
    }
    let jo;
    let Yo;
    let Qo;
    let Zo, $o;
    function Ko() {
        if (!ge.defined($o)) {
            const t = document.createElement("canvas");
            t.setAttribute(
                "style",
                "image-rendering: -moz-crisp-edges;image-rendering: pixelated;"
            );
            var e = t.style.imageRendering;
            ($o = ge.defined(e) && "" !== e) && (Zo = e);
        }
        return $o;
    }
    function Jo() {
        return Jo._result;
    }
    (Jo._promise = void 0),
        (Jo._result = void 0),
        (Jo.initialize = function () {
            if (ge.defined(Jo._promise)) return Jo._promise;
            const e = _r();
            if (((Jo._promise = e.promise), Go()))
                return (Jo._result = !1), e.resolve(Jo._result), e.promise;
            const t = new Image();
            return (
                (t.onload = function () {
                    (Jo._result = 0 < t.width && 0 < t.height),
                        e.resolve(Jo._result);
                }),
                (t.onerror = function () {
                    (Jo._result = !1), e.resolve(Jo._result);
                }),
                (t.src =
                    "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
                e.promise
            );
        }),
        Object.defineProperties(Jo, {
            initialized: {
                get: function () {
                    return ge.defined(Jo._result);
                },
            },
        });
    const ei = [],
        ti =
            ("undefined" != typeof ArrayBuffer &&
                (ei.push(
                    Int8Array,
                    Uint8Array,
                    Int16Array,
                    Uint16Array,
                    Int32Array,
                    Uint32Array,
                    Float32Array,
                    Float64Array
                ),
                "undefined" != typeof Uint8ClampedArray &&
                    ei.push(Uint8ClampedArray),
                "undefined" != typeof Uint8ClampedArray &&
                    ei.push(Uint8ClampedArray),
                "undefined" != typeof BigInt64Array && ei.push(BigInt64Array),
                "undefined" != typeof BigUint64Array &&
                    ei.push(BigUint64Array)),
            {
                isChrome: Po,
                chromeVersion: function () {
                    return Po() && Mo;
                },
                isSafari: Uo,
                safariVersion: function () {
                    return Uo() && Co;
                },
                isWebkit: Fo,
                webkitVersion: function () {
                    return Fo() && zo;
                },
                isInternetExplorer: qo,
                internetExplorerVersion: function () {
                    return qo() && Bo;
                },
                isEdge: Go,
                edgeVersion: function () {
                    return Go() && ko;
                },
                isFirefox: Xo,
                firefoxVersion: function () {
                    return Xo() && Ho;
                },
                isWindows: function () {
                    return (jo = ge.defined(jo)
                        ? jo
                        : /Windows/i.test(Oo.appVersion));
                },
                isIPadOrIOS: function () {
                    return (Yo = ge.defined(Yo)
                        ? Yo
                        : "iPhone" === navigator.platform ||
                          "iPod" === navigator.platform ||
                          "iPad" === navigator.platform);
                },
                hardwareConcurrency: ge.defaultValue(Oo.hardwareConcurrency, 3),
                supportsPointerEvents: function () {
                    return (Qo = ge.defined(Qo)
                        ? Qo
                        : !Xo() &&
                          "undefined" != typeof PointerEvent &&
                          (!ge.defined(Oo.pointerEnabled) ||
                              Oo.pointerEnabled));
                },
                supportsImageRenderingPixelated: Ko,
                supportsWebP: Jo,
                imageRenderingValue: function () {
                    return Ko() ? Zo : void 0;
                },
                typedArrayTypes: ei,
            });
    function p(e, t, n, r) {
        (this.x = ge.defaultValue(e, 0)),
            (this.y = ge.defaultValue(t, 0)),
            (this.z = ge.defaultValue(n, 0)),
            (this.w = ge.defaultValue(r, 0));
    }
    (ti.supportsBasis = function (e) {
        return ti.supportsWebAssembly() && e.context.supportsBasis;
    }),
        (ti.supportsFullscreen = function () {
            return vo.supportsFullscreen();
        }),
        (ti.supportsTypedArrays = function () {
            return "undefined" != typeof ArrayBuffer;
        }),
        (ti.supportsBigInt64Array = function () {
            return "undefined" != typeof BigInt64Array;
        }),
        (ti.supportsBigUint64Array = function () {
            return "undefined" != typeof BigUint64Array;
        }),
        (ti.supportsBigInt = function () {
            return "undefined" != typeof BigInt;
        }),
        (ti.supportsWebWorkers = function () {
            return "undefined" != typeof Worker;
        }),
        (ti.supportsWebAssembly = function () {
            return "undefined" != typeof WebAssembly;
        });
    let ni = new Re();
    p.fromAxisAngle = function (e, t, n) {
        var t = t / 2,
            r = Math.sin(t),
            e = (ni = Re.normalize(e, ni)).x * r,
            o = ni.y * r,
            r = ni.z * r,
            t = Math.cos(t);
        return ge.defined(n)
            ? ((n.x = e), (n.y = o), (n.z = r), (n.w = t), n)
            : new p(e, o, r, t);
    };
    const ri = [1, 2, 0],
        oi = new Array(3),
        ii =
            ((p.fromRotationMatrix = function (t, e) {
                let n, r, o, i, a;
                var s = t[B.COLUMN0ROW0],
                    u = t[B.COLUMN1ROW1],
                    c = t[B.COLUMN2ROW2],
                    l = s + u + c;
                if (0 < l)
                    (n = Math.sqrt(l + 1)),
                        (a = 0.5 * n),
                        (n = 0.5 / n),
                        (r = (t[B.COLUMN1ROW2] - t[B.COLUMN2ROW1]) * n),
                        (o = (t[B.COLUMN2ROW0] - t[B.COLUMN0ROW2]) * n),
                        (i = (t[B.COLUMN0ROW1] - t[B.COLUMN1ROW0]) * n);
                else {
                    l = ri;
                    let e = s < c && u < c ? 2 : s < u ? 1 : 0;
                    (c = l[e]), (s = l[c]);
                    n = Math.sqrt(
                        t[B.getElementIndex(e, e)] -
                            t[B.getElementIndex(c, c)] -
                            t[B.getElementIndex(s, s)] +
                            1
                    );
                    const d = oi;
                    (d[e] = 0.5 * n),
                        (n = 0.5 / n),
                        (a =
                            (t[B.getElementIndex(s, c)] -
                                t[B.getElementIndex(c, s)]) *
                            n),
                        (d[c] =
                            (t[B.getElementIndex(c, e)] +
                                t[B.getElementIndex(e, c)]) *
                            n),
                        (d[s] =
                            (t[B.getElementIndex(s, e)] +
                                t[B.getElementIndex(e, s)]) *
                            n),
                        (r = -d[0]),
                        (o = -d[1]),
                        (i = -d[2]);
                }
                return ge.defined(e)
                    ? ((e.x = r), (e.y = o), (e.z = i), (e.w = a), e)
                    : new p(r, o, i, a);
            }),
            new p());
    new p();
    let ai,
        si = void new p(),
        ui = void new p();
    p.fromHeadingPitchRoll = function (e, t) {
        return (
            (ui = p.fromAxisAngle(Re.UNIT_X, e.roll, ii)),
            (si = p.fromAxisAngle(Re.UNIT_Y, -e.pitch, t)),
            (t = p.multiply(si, ui, si)),
            (ai = p.fromAxisAngle(Re.UNIT_Z, -e.heading, ii)),
            p.multiply(ai, t, t)
        );
    };
    const ci = new Re(),
        li = new Re(),
        di = new p(),
        fi = new p(),
        hi = new p();
    (p.packedLength = 4),
        (p.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e.x),
                (t[n++] = e.y),
                (t[n++] = e.z),
                (t[n] = e.w),
                t
            );
        }),
        (p.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new p()).x = e[t]),
                (n.y = e[t + 1]),
                (n.z = e[t + 2]),
                (n.w = e[t + 3]),
                n
            );
        }),
        (p.packedInterpolationLength = 3),
        (p.convertPackedArrayForInterpolation = function (n, r, o, i) {
            p.unpack(n, 4 * o, hi), p.conjugate(hi, hi);
            for (let e = 0, t = o - r + 1; e < t; e++) {
                var a = 3 * e,
                    s =
                        (p.unpack(n, 4 * (r + e), di),
                        p.multiply(di, hi, di),
                        di.w < 0 && p.negate(di, di),
                        p.computeAxis(di, ci),
                        p.computeAngle(di));
                ((i = ge.defined(i) ? i : [])[a] = ci.x * s),
                    (i[1 + a] = ci.y * s),
                    (i[2 + a] = ci.z * s);
            }
        }),
        (p.unpackInterpolationResult = function (e, t, n, r, o) {
            ge.defined(o) || (o = new p()), Re.fromArray(e, 0, li);
            e = Re.magnitude(li);
            return (
                p.unpack(t, 4 * r, fi),
                0 === e ? p.clone(p.IDENTITY, di) : p.fromAxisAngle(li, e, di),
                p.multiply(di, fi, o)
            );
        }),
        (p.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t)
                    : new p(e.x, e.y, e.z, e.w);
        }),
        (p.conjugate = function (e, t) {
            return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = e.w), t;
        }),
        (p.magnitudeSquared = function (e) {
            return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
        }),
        (p.magnitude = function (e) {
            return Math.sqrt(p.magnitudeSquared(e));
        }),
        (p.normalize = function (e, t) {
            var n = 1 / p.magnitude(e),
                r = e.x * n,
                o = e.y * n,
                i = e.z * n,
                e = e.w * n;
            return (t.x = r), (t.y = o), (t.z = i), (t.w = e), t;
        }),
        (p.inverse = function (e, t) {
            var n = p.magnitudeSquared(e);
            return (t = p.conjugate(e, t)), p.multiplyByScalar(t, 1 / n, t);
        }),
        (p.add = function (e, t, n) {
            return (
                (n.x = e.x + t.x),
                (n.y = e.y + t.y),
                (n.z = e.z + t.z),
                (n.w = e.w + t.w),
                n
            );
        }),
        (p.subtract = function (e, t, n) {
            return (
                (n.x = e.x - t.x),
                (n.y = e.y - t.y),
                (n.z = e.z - t.z),
                (n.w = e.w - t.w),
                n
            );
        }),
        (p.negate = function (e, t) {
            return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t;
        }),
        (p.dot = function (e, t) {
            return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
        }),
        (p.multiply = function (e, t, n) {
            var r = e.x,
                o = e.y,
                i = e.z,
                e = e.w,
                a = t.x,
                s = t.y,
                u = t.z,
                t = t.w,
                c = e * s - r * u + o * t + i * a,
                l = e * u + r * s - o * a + i * t,
                d = e * t - r * a - o * s - i * u;
            return (
                (n.x = e * a + r * t + o * u - i * s),
                (n.y = c),
                (n.z = l),
                (n.w = d),
                n
            );
        }),
        (p.multiplyByScalar = function (e, t, n) {
            return (
                (n.x = e.x * t),
                (n.y = e.y * t),
                (n.z = e.z * t),
                (n.w = e.w * t),
                n
            );
        }),
        (p.divideByScalar = function (e, t, n) {
            return (
                (n.x = e.x / t),
                (n.y = e.y / t),
                (n.z = e.z / t),
                (n.w = e.w / t),
                n
            );
        }),
        (p.computeAxis = function (e, t) {
            var n = e.w;
            if (Math.abs(n - 1) < Te.EPSILON6) return (t.x = t.y = t.z = 0), t;
            n = 1 / Math.sqrt(1 - n * n);
            return (t.x = e.x * n), (t.y = e.y * n), (t.z = e.z * n), t;
        }),
        (p.computeAngle = function (e) {
            return Math.abs(e.w - 1) < Te.EPSILON6 ? 0 : 2 * Math.acos(e.w);
        });
    let pi = new p(),
        mi =
            ((p.lerp = function (e, t, n, r) {
                return (
                    (pi = p.multiplyByScalar(t, n, pi)),
                    (r = p.multiplyByScalar(e, 1 - n, r)),
                    p.add(pi, r, r)
                );
            }),
            new p()),
        Ei = new p(),
        _i = new p();
    (p.slerp = function (e, t, n, r) {
        let o = p.dot(e, t),
            i = t;
        if (
            (o < 0 && ((o = -o), (i = mi = p.negate(t, mi))),
            1 - o < Te.EPSILON6)
        )
            return p.lerp(e, i, n, r);
        t = Math.acos(o);
        return (
            (Ei = p.multiplyByScalar(e, Math.sin((1 - n) * t), Ei)),
            (_i = p.multiplyByScalar(i, Math.sin(n * t), _i)),
            (r = p.add(Ei, _i, r)),
            p.multiplyByScalar(r, 1 / Math.sin(t), r)
        );
    }),
        (p.log = function (e, t) {
            var n = Te.acosClamped(e.w);
            let r = 0;
            return (
                0 !== n && (r = n / Math.sin(n)), Re.multiplyByScalar(e, r, t)
            );
        }),
        (p.exp = function (e, t) {
            var n = Re.magnitude(e);
            let r = 0;
            return (
                0 !== n && (r = Math.sin(n) / n),
                (t.x = e.x * r),
                (t.y = e.y * r),
                (t.z = e.z * r),
                (t.w = Math.cos(n)),
                t
            );
        });
    const yi = new Re(),
        gi = new Re(),
        Ti = new p(),
        Ri = new p(),
        Ai =
            ((p.computeInnerQuadrangle = function (e, t, n, r) {
                var o = p.conjugate(t, Ti),
                    n = (p.multiply(o, n, Ri), p.log(Ri, yi)),
                    o = (p.multiply(o, e, Ri), p.log(Ri, gi));
                return (
                    Re.add(n, o, n),
                    Re.multiplyByScalar(n, 0.25, n),
                    Re.negate(n, n),
                    p.exp(n, Ti),
                    p.multiply(t, Ti, r)
                );
            }),
            (p.squad = function (e, t, n, r, o, i) {
                (e = p.slerp(e, t, o, Ti)), (t = p.slerp(n, r, o, Ri));
                return p.slerp(e, t, 2 * o * (1 - o), i);
            }),
            new p());
    e = 1.9011074535173003;
    const Si = ti.supportsTypedArrays() ? new Float32Array(8) : [],
        wi = ti.supportsTypedArrays() ? new Float32Array(8) : [],
        Ii = ti.supportsTypedArrays() ? new Float32Array(8) : [],
        vi = ti.supportsTypedArrays() ? new Float32Array(8) : [];
    for (let e = 0; e < 7; ++e) {
        var Oi = e + 1,
            Ni = 2 * Oi + 1;
        (Si[e] = 1 / (Oi * Ni)), (wi[e] = Oi / Ni);
    }
    (Si[7] = e / 136),
        (wi[7] = (8 * e) / 17),
        (p.fastSlerp = function (e, t, n, r) {
            let o = p.dot(e, t),
                i;
            0 <= o ? (i = 1) : ((i = -1), (o = -o));
            var a = o - 1,
                s = 1 - n,
                u = n * n,
                c = s * s;
            for (let e = 7; 0 <= e; --e)
                (Ii[e] = (Si[e] * u - wi[e]) * a),
                    (vi[e] = (Si[e] * c - wi[e]) * a);
            (n =
                i *
                n *
                (1 +
                    Ii[0] *
                        (1 +
                            Ii[1] *
                                (1 +
                                    Ii[2] *
                                        (1 +
                                            Ii[3] *
                                                (1 +
                                                    Ii[4] *
                                                        (1 +
                                                            Ii[5] *
                                                                (1 +
                                                                    Ii[6] *
                                                                        (1 +
                                                                            Ii[7]))))))))),
                (s *=
                    1 +
                    vi[0] *
                        (1 +
                            vi[1] *
                                (1 +
                                    vi[2] *
                                        (1 +
                                            vi[3] *
                                                (1 +
                                                    vi[4] *
                                                        (1 +
                                                            vi[5] *
                                                                (1 +
                                                                    vi[6] *
                                                                        (1 +
                                                                            vi[7])))))))),
                (e = p.multiplyByScalar(e, s, Ai));
            return p.multiplyByScalar(t, n, r), p.add(e, r, r);
        }),
        (p.fastSquad = function (e, t, n, r, o, i) {
            (e = p.fastSlerp(e, t, o, Ti)), (t = p.fastSlerp(n, r, o, Ri));
            return p.fastSlerp(e, t, 2 * o * (1 - o), i);
        }),
        (p.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    e.x === t.x &&
                    e.y === t.y &&
                    e.z === t.z &&
                    e.w === t.w)
            );
        }),
        (p.equalsEpsilon = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        Math.abs(e.x - t.x) <= n &&
                        Math.abs(e.y - t.y) <= n &&
                        Math.abs(e.z - t.z) <= n &&
                        Math.abs(e.w - t.w) <= n)
            );
        }),
        (p.ZERO = Object.freeze(new p(0, 0, 0, 0))),
        (p.IDENTITY = Object.freeze(new p(0, 0, 0, 1))),
        (p.prototype.clone = function (e) {
            return p.clone(this, e);
        }),
        (p.prototype.equals = function (e) {
            return p.equals(this, e);
        }),
        (p.prototype.equalsEpsilon = function (e, t) {
            return p.equalsEpsilon(this, e, t);
        }),
        (p.prototype.toString = function () {
            return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
        });
    const Oe = {},
        xi = {
            up: { south: "east", north: "west", west: "south", east: "north" },
            down: {
                south: "west",
                north: "east",
                west: "north",
                east: "south",
            },
            south: { up: "west", down: "east", west: "down", east: "up" },
            north: { up: "east", down: "west", west: "up", east: "down" },
            west: { up: "north", down: "south", north: "down", south: "up" },
            east: { up: "south", down: "north", north: "up", south: "down" },
        },
        Mi = {
            north: [-1, 0, 0],
            east: [0, 1, 0],
            up: [0, 0, 1],
            south: [1, 0, 0],
            west: [0, -1, 0],
            down: [0, 0, -1],
        },
        Pi = {},
        bi = {
            east: new Re(),
            north: new Re(),
            up: new Re(),
            west: new Re(),
            south: new Re(),
            down: new Re(),
        };
    let Ci = new Re(),
        Ui = new Re(),
        Di = new Re();
    (Oe.localFrameToFixedFrameGenerator = function (i, a) {
        if (!xi.hasOwnProperty(i) || !xi[i].hasOwnProperty(a))
            throw new o(
                "firstAxis and secondAxis must be east, north, up, west, south or down."
            );
        const s = xi[i][a];
        let e;
        var t = i + a;
        return (
            ge.defined(Pi[t])
                ? (e = Pi[t])
                : ((e = function (e, t, n) {
                      if (
                          (ge.defined(n) || (n = new we()),
                          Re.equalsEpsilon(e, Re.ZERO, Te.EPSILON14))
                      )
                          Re.unpack(Mi[i], 0, Ci),
                              Re.unpack(Mi[a], 0, Ui),
                              Re.unpack(Mi[s], 0, Di);
                      else if (
                          Te.equalsEpsilon(e.x, 0, Te.EPSILON14) &&
                          Te.equalsEpsilon(e.y, 0, Te.EPSILON14)
                      ) {
                          var r = Te.sign(e.z);
                          Re.unpack(Mi[i], 0, Ci),
                              "east" !== i &&
                                  "west" !== i &&
                                  Re.multiplyByScalar(Ci, r, Ci),
                              Re.unpack(Mi[a], 0, Ui),
                              "east" !== a &&
                                  "west" !== a &&
                                  Re.multiplyByScalar(Ui, r, Ui),
                              Re.unpack(Mi[s], 0, Di),
                              "east" !== s &&
                                  "west" !== s &&
                                  Re.multiplyByScalar(Di, r, Di);
                      } else {
                          (t = ge.defaultValue(
                              t,
                              S.WGS84
                          )).geodeticSurfaceNormal(e, bi.up);
                          r = bi.up;
                          const o = bi.east;
                          (o.x = -e.y),
                              (o.y = e.x),
                              (o.z = 0),
                              Re.normalize(o, bi.east),
                              Re.cross(r, o, bi.north),
                              Re.multiplyByScalar(bi.up, -1, bi.down),
                              Re.multiplyByScalar(bi.east, -1, bi.west),
                              Re.multiplyByScalar(bi.north, -1, bi.south),
                              (Ci = bi[i]),
                              (Ui = bi[a]),
                              (Di = bi[s]);
                      }
                      return (
                          (n[0] = Ci.x),
                          (n[1] = Ci.y),
                          (n[2] = Ci.z),
                          (n[3] = 0),
                          (n[4] = Ui.x),
                          (n[5] = Ui.y),
                          (n[6] = Ui.z),
                          (n[7] = 0),
                          (n[8] = Di.x),
                          (n[9] = Di.y),
                          (n[10] = Di.z),
                          (n[11] = 0),
                          (n[12] = e.x),
                          (n[13] = e.y),
                          (n[14] = e.z),
                          (n[15] = 1),
                          n
                      );
                  }),
                  (Pi[t] = e)),
            e
        );
    }),
        (Oe.eastNorthUpToFixedFrame = Oe.localFrameToFixedFrameGenerator(
            "east",
            "north"
        )),
        (Oe.northEastDownToFixedFrame = Oe.localFrameToFixedFrameGenerator(
            "north",
            "east"
        )),
        (Oe.northUpEastToFixedFrame = Oe.localFrameToFixedFrameGenerator(
            "north",
            "up"
        )),
        (Oe.northWestUpToFixedFrame = Oe.localFrameToFixedFrameGenerator(
            "north",
            "west"
        ));
    const zi = new p(),
        Fi = new Re(1, 1, 1),
        Li = new we(),
        Bi =
            ((Oe.headingPitchRollToFixedFrame = function (e, t, n, r, o) {
                r = ge.defaultValue(r, Oe.eastNorthUpToFixedFrame);
                (t = p.fromHeadingPitchRoll(t, zi)),
                    (t = we.fromTranslationQuaternionRotationScale(
                        Re.ZERO,
                        t,
                        Fi,
                        Li
                    ));
                return (o = r(e, n, o)), we.multiply(o, t, o);
            }),
            new we()),
        qi = new B(),
        Vi =
            ((Oe.headingPitchRollQuaternion = function (e, t, n, r, o) {
                (e = Oe.headingPitchRollToFixedFrame(e, t, n, r, Bi)),
                    (t = we.getMatrix3(e, qi));
                return p.fromRotationMatrix(t, o);
            }),
            new Re(1, 1, 1)),
        ki = new Re(),
        Gi = new we(),
        Wi = new we(),
        Hi = new B(),
        Xi = new p(),
        ji =
            ((Oe.fixedFrameToHeadingPitchRoll = function (e, t, n, r) {
                (t = ge.defaultValue(t, S.WGS84)),
                    (n = ge.defaultValue(n, Oe.eastNorthUpToFixedFrame)),
                    ge.defined(r) || (r = new a());
                var o = we.getTranslation(e, ki);
                if (Re.equals(o, Re.ZERO))
                    return (r.heading = 0), (r.pitch = 0), (r.roll = 0), r;
                (n = we.inverseTransformation(n(o, t, Gi), Gi)),
                    (o = we.setScale(e, Vi, Wi)),
                    (o = we.setTranslation(o, Re.ZERO, o)),
                    (n = we.multiply(n, o, n)),
                    (t = p.fromRotationMatrix(we.getMatrix3(n, Hi), Xi)),
                    (t = p.normalize(t, t));
                return a.fromQuaternion(t, r);
            }),
            Te.TWO_PI / 86400);
    let Yi = new T();
    (Oe.computeTemeToPseudoFixedMatrix = function (e, t) {
        var e = (Yi = T.addSeconds(e, -T.computeTaiMinusUtc(e), Yi)).dayNumber,
            n = Yi.secondsOfDay;
        let r;
        var o = e - 2451545,
            o =
                (((24110.54841 +
                    (r =
                        43200 <= n
                            ? (0.5 + o) / y.DAYS_PER_JULIAN_CENTURY
                            : (o - 0.5) / y.DAYS_PER_JULIAN_CENTURY) *
                        (8640184.812866 + r * (0.093104 + -62e-7 * r))) *
                    ji) %
                    Te.TWO_PI) +
                (72921158553e-15 + 11772758384668e-32 * (e - 2451545.5)) *
                    ((n + 0.5 * y.SECONDS_PER_DAY) % y.SECONDS_PER_DAY),
            e = Math.cos(o),
            n = Math.sin(o);
        return ge.defined(t)
            ? ((t[0] = e),
              (t[1] = -n),
              (t[2] = 0),
              (t[3] = n),
              (t[4] = e),
              (t[5] = 0),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = 1),
              t)
            : new B(e, n, 0, -n, e, 0, 0, 0, 1);
    }),
        (Oe.iau2006XysData = new Ro()),
        (Oe.earthOrientationParameters = oo.NONE);
    const Qi = 32.184,
        Zi =
            ((Oe.preloadIcrfFixed = function (e) {
                var t = e.start.dayNumber,
                    n = e.start.secondsOfDay + Qi,
                    r = e.stop.dayNumber,
                    e = e.stop.secondsOfDay + Qi,
                    t = Oe.iau2006XysData.preload(t, n, r, e),
                    n = Oe.earthOrientationParameters.getPromiseToLoad();
                return Promise.all([t, n]);
            }),
            (Oe.computeIcrfToFixedMatrix = function (e, t) {
                ge.defined(t) || (t = new B());
                e = Oe.computeFixedToIcrfMatrix(e, t);
                if (ge.defined(e)) return B.transpose(e, t);
            }),
            new To(0, 0, 0)),
        $i = new Gn(0, 0, 0, 0, 0),
        Ki = new B(),
        Ji = new B(),
        ea =
            ((Oe.computeFixedToIcrfMatrix = function (e, t) {
                ge.defined(t) || (t = new B());
                var n = Oe.earthOrientationParameters.compute(e, $i);
                if (ge.defined(n)) {
                    var r = e.dayNumber,
                        o = e.secondsOfDay + Qi,
                        i = Oe.iau2006XysData.computeXysRadians(r, o, Zi);
                    if (ge.defined(i)) {
                        var a = i.x + n.xPoleOffset,
                            s = i.y + n.yPoleOffset,
                            u = 1 / (1 + Math.sqrt(1 - a * a - s * s));
                        const c = Ki;
                        (c[0] = 1 - u * a * a),
                            (c[3] = -u * a * s),
                            (c[6] = a),
                            (c[1] = -u * a * s),
                            (c[4] = 1 - u * s * s),
                            (c[7] = s),
                            (c[2] = -a),
                            (c[5] = -s),
                            (c[8] = 1 - u * (a * a + s * s));
                        (u = B.fromRotationZ(-i.s, Ji)),
                            (a = B.multiply(c, u, Ki)),
                            (s = e.dayNumber),
                            (i =
                                (e.secondsOfDay -
                                    T.computeTaiMinusUtc(e) +
                                    n.ut1MinusUtc) /
                                y.SECONDS_PER_DAY),
                            (u =
                                ((0.779057273264 +
                                    i +
                                    0.00273781191135448 * (s - 2451545 + i)) %
                                    1) *
                                Te.TWO_PI),
                            (e = B.fromRotationZ(u, Ji)),
                            (s = B.multiply(a, e, Ki)),
                            (i = Math.cos(n.xPoleWander)),
                            (u = Math.cos(n.yPoleWander)),
                            (a = Math.sin(n.xPoleWander)),
                            (e = Math.sin(n.yPoleWander)),
                            (n = r - 2451545 + o / y.SECONDS_PER_DAY),
                            (r =
                                (-47e-6 *
                                    (n /= 36525) *
                                    Te.RADIANS_PER_DEGREE) /
                                3600),
                            (o = Math.cos(r)),
                            (n = Math.sin(r));
                        const l = Ji;
                        return (
                            (l[0] = i * o),
                            (l[1] = i * n),
                            (l[2] = a),
                            (l[3] = -u * n + e * a * o),
                            (l[4] = u * o + e * a * n),
                            (l[5] = -e * i),
                            (l[6] = -e * n - u * a * o),
                            (l[7] = e * o - u * a * n),
                            (l[8] = u * i),
                            B.multiply(s, l, t)
                        );
                    }
                }
            }),
            new q()),
        ta =
            ((Oe.pointToWindowCoordinates = function (e, t, n, r) {
                return (
                    ((r = Oe.pointToGLWindowCoordinates(e, t, n, r)).y =
                        2 * t[5] - r.y),
                    r
                );
            }),
            (Oe.pointToGLWindowCoordinates = function (e, t, n, r) {
                ge.defined(r) || (r = new ve());
                var o = ea;
                return (
                    we.multiplyByVector(
                        e,
                        q.fromElements(n.x, n.y, n.z, 1, o),
                        o
                    ),
                    q.multiplyByScalar(o, 1 / o.w, o),
                    we.multiplyByVector(t, o, o),
                    ve.fromCartesian4(o, r)
                );
            }),
            new Re()),
        na = new Re(),
        ra = new Re(),
        oa =
            ((Oe.rotationMatrixFromPositionVelocity = function (e, t, n, r) {
                n = ge.defaultValue(n, S.WGS84).geodeticSurfaceNormal(e, ta);
                let o = Re.cross(t, n, na);
                Re.equalsEpsilon(o, Re.ZERO, Te.EPSILON6) &&
                    (o = Re.clone(Re.UNIT_X, o));
                e = Re.cross(o, t, ra);
                return (
                    Re.normalize(e, e),
                    Re.cross(t, e, o),
                    Re.negate(o, o),
                    Re.normalize(o, o),
                    ((r = ge.defined(r) ? r : new B())[0] = t.x),
                    (r[1] = t.y),
                    (r[2] = t.z),
                    (r[3] = o.x),
                    (r[4] = o.y),
                    (r[5] = o.z),
                    (r[6] = e.x),
                    (r[7] = e.y),
                    (r[8] = e.z),
                    r
                );
            }),
            new we(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1)),
        ia = new Se(),
        aa = new Re(),
        sa = new Re(),
        ua = new B(),
        ca = new we(),
        la = new we(),
        da =
            ((Oe.basisTo2D = function (e, t, n) {
                var r = we.getTranslation(t, sa);
                const o = e.ellipsoid;
                var i = o.cartesianToCartographic(r, ia),
                    e = e.project(i, aa),
                    i =
                        (Re.fromElements(e.z, e.x, e.y, e),
                        Oe.eastNorthUpToFixedFrame(r, o, ca)),
                    r = we.inverseTransformation(i, la),
                    i = we.getMatrix3(t, ua),
                    t = we.multiplyByMatrix3(r, i, n);
                return we.multiply(oa, t, n), we.setTranslation(n, e, n), n;
            }),
            (Oe.wgs84To2DModelMatrix = function (e, t, n) {
                const r = e.ellipsoid;
                var o = Oe.eastNorthUpToFixedFrame(t, r, ca),
                    o = we.inverseTransformation(o, la),
                    t = r.cartesianToCartographic(t, ia),
                    e = e.project(t, aa),
                    t =
                        (Re.fromElements(e.z, e.x, e.y, e),
                        we.fromTranslation(e, ca));
                return we.multiply(oa, o, n), we.multiply(t, n, n), n;
            }),
            new q());
    function fa(e, t) {
        e = (t = ge.defaultValue(t, S.WGS84)).scaleToGeodeticSurface(e);
        var n = Oe.eastNorthUpToFixedFrame(e, t),
            t =
                ((this._ellipsoid = t),
                (this._origin = e),
                (this._xAxis = Re.fromCartesian4(we.getColumn(n, 0, da))),
                (this._yAxis = Re.fromCartesian4(we.getColumn(n, 1, da))),
                Re.fromCartesian4(we.getColumn(n, 2, da)));
        this._plane = I.fromPointNormal(e, t);
    }
    Object.defineProperties(fa.prototype, {
        ellipsoid: {
            get: function () {
                return this._ellipsoid;
            },
        },
        origin: {
            get: function () {
                return this._origin;
            },
        },
        plane: {
            get: function () {
                return this._plane;
            },
        },
        xAxis: {
            get: function () {
                return this._xAxis;
            },
        },
        yAxis: {
            get: function () {
                return this._yAxis;
            },
        },
        zAxis: {
            get: function () {
                return this._plane.normal;
            },
        },
    });
    const ha = new Ae(),
        pa =
            ((fa.fromPoints = function (e, t) {
                return new fa(Ae.fromPoints(e, ha).center, t);
            }),
            new un()),
        ma = new Re(),
        Ea =
            ((fa.prototype.projectPointOntoPlane = function (e, t) {
                const n = pa;
                (n.origin = e), Re.normalize(e, n.direction);
                let r = l.rayPlane(n, this._plane, ma);
                var o;
                if (
                    (ge.defined(r) ||
                        (Re.negate(n.direction, n.direction),
                        (r = l.rayPlane(n, this._plane, ma))),
                    ge.defined(r))
                )
                    return (
                        (e = Re.subtract(r, this._origin, r)),
                        (o = Re.dot(this._xAxis, e)),
                        (e = Re.dot(this._yAxis, e)),
                        ge.defined(t) ? ((t.x = o), (t.y = e), t) : new ve(o, e)
                    );
            }),
            (fa.prototype.projectPointsOntoPlane = function (t, n) {
                ge.defined(n) || (n = []);
                let r = 0;
                var o = t.length;
                for (let e = 0; e < o; e++) {
                    var i = this.projectPointOntoPlane(t[e], n[r]);
                    ge.defined(i) && ((n[r] = i), r++);
                }
                return (n.length = r), n;
            }),
            (fa.prototype.projectPointToNearestOnPlane = function (e, t) {
                ge.defined(t) || (t = new ve());
                const n = pa;
                (n.origin = e), Re.clone(this._plane.normal, n.direction);
                let r = l.rayPlane(n, this._plane, ma);
                ge.defined(r) ||
                    (Re.negate(n.direction, n.direction),
                    (r = l.rayPlane(n, this._plane, ma)));
                var e = Re.subtract(r, this._origin, r),
                    o = Re.dot(this._xAxis, e),
                    e = Re.dot(this._yAxis, e);
                return (t.x = o), (t.y = e), t;
            }),
            (fa.prototype.projectPointsToNearestOnPlane = function (t, n) {
                ge.defined(n) || (n = []);
                var r = t.length;
                n.length = r;
                for (let e = 0; e < r; e++)
                    n[e] = this.projectPointToNearestOnPlane(t[e], n[e]);
                return n;
            }),
            new Re());
    function Ne(e, t) {
        (this.center = Re.clone(ge.defaultValue(e, Re.ZERO))),
            (this.halfAxes = B.clone(ge.defaultValue(t, B.ZERO)));
    }
    (fa.prototype.projectPointOntoEllipsoid = function (e, t) {
        ge.defined(t) || (t = new Re());
        const n = this._ellipsoid;
        var r = this._origin,
            o = this._xAxis,
            i = this._yAxis,
            a = Ea;
        return (
            Re.multiplyByScalar(o, e.x, a),
            (t = Re.add(r, a, t)),
            Re.multiplyByScalar(i, e.y, a),
            Re.add(t, a, t),
            n.scaleToGeocentricSurface(t, t),
            t
        );
    }),
        (fa.prototype.projectPointsOntoEllipsoid = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r) : (n = new Array(r));
            for (let e = 0; e < r; ++e)
                n[e] = this.projectPointOntoEllipsoid(t[e], n[e]);
            return n;
        }),
        (Ne.packedLength = Re.packedLength + B.packedLength),
        (Ne.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                Re.pack(e.center, t, n),
                B.pack(e.halfAxes, t, n + Re.packedLength),
                t
            );
        }),
        (Ne.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ge.defined(n) || (n = new Ne()),
                Re.unpack(e, t, n.center),
                B.unpack(e, t + Re.packedLength, n.halfAxes),
                n
            );
        });
    const _a = new Re(),
        ya = new Re(),
        ga = new Re(),
        Ta = new Re(),
        Ra = new Re(),
        Aa = new Re(),
        Sa = new B(),
        wa = { unitary: new B(), diagonal: new B() },
        Ia =
            ((Ne.fromPoints = function (e, t) {
                if (
                    (ge.defined(t) || (t = new Ne()),
                    !ge.defined(e) || 0 === e.length)
                )
                    return (t.halfAxes = B.ZERO), (t.center = Re.ZERO), t;
                let n;
                var r = e.length,
                    o = Re.clone(e[0], _a);
                for (n = 1; n < r; n++) Re.add(o, e[n], o);
                var i = 1 / r;
                Re.multiplyByScalar(o, i, o);
                let a = 0,
                    s = 0,
                    u = 0,
                    c = 0,
                    l = 0,
                    d = 0,
                    f;
                for (n = 0; n < r; n++)
                    (f = Re.subtract(e[n], o, ya)),
                        (a += f.x * f.x),
                        (s += f.x * f.y),
                        (u += f.x * f.z),
                        (c += f.y * f.y),
                        (l += f.y * f.z),
                        (d += f.z * f.z);
                (a *= i), (s *= i), (u *= i), (c *= i), (l *= i), (d *= i);
                const h = Sa;
                (h[0] = a),
                    (h[1] = s),
                    (h[2] = u),
                    (h[3] = s),
                    (h[4] = c),
                    (h[5] = l),
                    (h[6] = u),
                    (h[7] = l),
                    (h[8] = d);
                (i = B.computeEigenDecomposition(h, wa)),
                    (i = B.clone(i.unitary, t.halfAxes));
                let p = B.getColumn(i, 0, Ta),
                    m = B.getColumn(i, 1, Ra),
                    E = B.getColumn(i, 2, Aa),
                    _ = -Number.MAX_VALUE,
                    y = -Number.MAX_VALUE,
                    g = -Number.MAX_VALUE,
                    T = Number.MAX_VALUE,
                    R = Number.MAX_VALUE,
                    A = Number.MAX_VALUE;
                for (n = 0; n < r; n++)
                    (f = e[n]),
                        (_ = Math.max(Re.dot(p, f), _)),
                        (y = Math.max(Re.dot(m, f), y)),
                        (g = Math.max(Re.dot(E, f), g)),
                        (T = Math.min(Re.dot(p, f), T)),
                        (R = Math.min(Re.dot(m, f), R)),
                        (A = Math.min(Re.dot(E, f), A));
                (p = Re.multiplyByScalar(p, 0.5 * (T + _), p)),
                    (m = Re.multiplyByScalar(m, 0.5 * (R + y), m)),
                    (E = Re.multiplyByScalar(E, 0.5 * (A + g), E));
                i = Re.add(p, m, t.center);
                Re.add(i, E, i);
                const S = ga;
                return (
                    (S.x = _ - T),
                    (S.y = y - R),
                    (S.z = g - A),
                    Re.multiplyByScalar(S, 0.5, S),
                    B.multiplyByScale(t.halfAxes, S, t.halfAxes),
                    t
                );
            }),
            new Re()),
        va = new Re();
    function Oa(e, t, n, r, o, i, a, s, u, c, l) {
        var d = (l = ge.defined(l) ? l : new Ne()).halfAxes;
        B.setColumn(d, 0, t, d),
            B.setColumn(d, 1, n, d),
            B.setColumn(d, 2, r, d);
        let f = Ia;
        (f.x = (o + i) / 2), (f.y = (a + s) / 2), (f.z = (u + c) / 2);
        const h = va;
        (h.x = (i - o) / 2), (h.y = (s - a) / 2), (h.z = (c - u) / 2);
        t = l.center;
        return (
            (f = B.multiplyByVector(d, f, f)),
            Re.add(e, f, t),
            B.multiplyByScale(d, h, d),
            l
        );
    }
    const Na = new Se(),
        xa = new Re(),
        Ma = new Se(),
        Pa = new Se(),
        ba = new Se(),
        Ca = new Se(),
        Ua = new Se(),
        Da = new Re(),
        za = new Re(),
        Fa = new Re(),
        La = new Re(),
        Ba = new Re(),
        qa = new ve(),
        Va = new ve(),
        ka = new ve(),
        Ga = new ve(),
        Wa = new ve(),
        Ha = new Re(),
        Xa = new Re(),
        ja = new Re(),
        Ya = new Re(),
        Qa = new ve(),
        Za = new Re(),
        $a = new Re(),
        Ka = new Re(),
        Ja = new I(Re.UNIT_X, 0),
        es =
            ((Ne.fromRectangle = function (e, t, n, r, o) {
                (t = ge.defaultValue(t, 0)),
                    (n = ge.defaultValue(n, 0)),
                    (r = ge.defaultValue(r, S.WGS84));
                let i, a, s, u, c, l, d;
                if (e.width <= Te.PI) {
                    var f = w.center(e, Na);
                    const T = new fa(r.cartographicToCartesian(f, xa), r);
                    d = T.plane;
                    var h = f.longitude,
                        f = e.south < 0 && 0 < e.north ? 0 : f.latitude,
                        p = Se.fromRadians(h, e.north, n, Ma);
                    const R = Se.fromRadians(e.west, e.north, n, Pa);
                    f = Se.fromRadians(e.west, f, n, ba);
                    const A = Se.fromRadians(e.west, e.south, n, Ca);
                    var h = Se.fromRadians(h, e.south, n, Ua),
                        p = r.cartographicToCartesian(p, Da),
                        m = r.cartographicToCartesian(R, za),
                        f = r.cartographicToCartesian(f, Fa),
                        E = r.cartographicToCartesian(A, La),
                        h = r.cartographicToCartesian(h, Ba),
                        p = T.projectPointToNearestOnPlane(p, qa),
                        _ = T.projectPointToNearestOnPlane(m, Va),
                        f = T.projectPointToNearestOnPlane(f, ka),
                        y = T.projectPointToNearestOnPlane(E, Ga),
                        h = T.projectPointToNearestOnPlane(h, Wa);
                    return (
                        (i = Math.min(_.x, f.x, y.x)),
                        (a = -i),
                        (u = Math.max(_.y, p.y)),
                        (s = Math.min(y.y, h.y)),
                        (R.height = A.height = t),
                        (m = r.cartographicToCartesian(R, za)),
                        (E = r.cartographicToCartesian(A, La)),
                        (c = Math.min(
                            I.getPointDistance(d, m),
                            I.getPointDistance(d, E)
                        )),
                        (l = n),
                        Oa(
                            T.origin,
                            T.xAxis,
                            T.yAxis,
                            T.zAxis,
                            i,
                            a,
                            s,
                            u,
                            c,
                            l,
                            o
                        )
                    );
                }
                (f = 0 < e.south),
                    (_ = e.north < 0),
                    (p = f ? e.south : _ ? e.north : 0),
                    (y = w.center(e, Na).longitude);
                const g = Re.fromRadians(y, p, n, r, Ha);
                g.z = 0;
                (h =
                    Math.abs(g.x) < Te.EPSILON10 && Math.abs(g.y) < Te.EPSILON10
                        ? Re.UNIT_X
                        : Re.normalize(g, Xa)),
                    (m = Re.UNIT_Z),
                    (E = Re.cross(h, m, ja)),
                    (d = I.fromPointNormal(g, h, Ja)),
                    (y = Re.fromRadians(y + Te.PI_OVER_TWO, p, n, r, Ya)),
                    (a = Re.dot(I.projectPointOntoPlane(d, y, Qa), E)),
                    (i = -a),
                    (u = Re.fromRadians(0, e.north, _ ? t : n, r, Za).z),
                    (s = Re.fromRadians(0, e.south, f ? t : n, r, $a).z),
                    (y = Re.fromRadians(e.east, p, n, r, Ka));
                return (
                    (c = I.getPointDistance(d, y)),
                    (l = 0),
                    Oa(g, E, m, h, i, a, s, u, c, l, o)
                );
            }),
            (Ne.fromTransformation = function (e, t) {
                return (
                    ((t = ge.defined(t) ? t : new Ne()).center =
                        we.getTranslation(e, t.center)),
                    (t.halfAxes = we.getMatrix3(e, t.halfAxes)),
                    (t.halfAxes = B.multiplyByScalar(
                        t.halfAxes,
                        0.5,
                        t.halfAxes
                    )),
                    t
                );
            }),
            (Ne.clone = function (e, t) {
                if (ge.defined(e))
                    return ge.defined(t)
                        ? (Re.clone(e.center, t.center),
                          B.clone(e.halfAxes, t.halfAxes),
                          t)
                        : new Ne(e.center, e.halfAxes);
            }),
            (Ne.intersectPlane = function (e, t) {
                var n = e.center,
                    r = t.normal,
                    e = e.halfAxes,
                    o = r.x,
                    i = r.y,
                    a = r.z,
                    o =
                        Math.abs(
                            o * e[B.COLUMN0ROW0] +
                                i * e[B.COLUMN0ROW1] +
                                a * e[B.COLUMN0ROW2]
                        ) +
                        Math.abs(
                            o * e[B.COLUMN1ROW0] +
                                i * e[B.COLUMN1ROW1] +
                                a * e[B.COLUMN1ROW2]
                        ) +
                        Math.abs(
                            o * e[B.COLUMN2ROW0] +
                                i * e[B.COLUMN2ROW1] +
                                a * e[B.COLUMN2ROW2]
                        ),
                    i = Re.dot(r, n) + t.distance;
                return i <= -o ? F.OUTSIDE : o <= i ? F.INSIDE : F.INTERSECTING;
            }),
            new Re()),
        ts = new Re(),
        ns = new Re(),
        rs = new Re(),
        os = new Re(),
        is = new Re(),
        as =
            ((Ne.distanceSquaredTo = function (e, t) {
                (t = Re.subtract(t, e.center, Ia)), (e = e.halfAxes);
                let n = B.getColumn(e, 0, es),
                    r = B.getColumn(e, 1, ts),
                    o = B.getColumn(e, 2, ns);
                var e = Re.magnitude(n),
                    i = Re.magnitude(r),
                    a = Re.magnitude(o);
                let s = !0,
                    u = !0,
                    c = !0;
                0 < e ? Re.divideByScalar(n, e, n) : (s = !1),
                    0 < i ? Re.divideByScalar(r, i, r) : (u = !1),
                    0 < a ? Re.divideByScalar(o, a, o) : (c = !1);
                var l = !s + !u + !c;
                let d, f, h;
                if (1 == l) {
                    let e = n;
                    (d = r),
                        (f = o),
                        u ? c || ((e = o), (f = n)) : ((e = r), (d = n)),
                        (h = Re.cross(d, f, os)),
                        e === n
                            ? (n = h)
                            : e === r
                            ? (r = h)
                            : e === o && (o = h);
                } else if (2 == l) {
                    (d = n), u ? (d = r) : c && (d = o);
                    let e = Re.UNIT_Y;
                    e.equalsEpsilon(d, Te.EPSILON3) && (e = Re.UNIT_X),
                        (f = Re.cross(d, e, rs)),
                        Re.normalize(f, f),
                        (h = Re.cross(d, f, os)),
                        Re.normalize(h, h),
                        d === n
                            ? ((r = f), (o = h))
                            : d === r
                            ? ((o = f), (n = h))
                            : d === o && ((n = f), (r = h));
                } else
                    3 == l &&
                        ((n = Re.UNIT_X), (r = Re.UNIT_Y), (o = Re.UNIT_Z));
                const p = is;
                (p.x = Re.dot(t, n)),
                    (p.y = Re.dot(t, r)),
                    (p.z = Re.dot(t, o));
                let m = 0,
                    E;
                return (
                    p.x < -e
                        ? ((E = p.x + e), (m += E * E))
                        : p.x > e && ((E = p.x - e), (m += E * E)),
                    p.y < -i
                        ? ((E = p.y + i), (m += E * E))
                        : p.y > i && ((E = p.y - i), (m += E * E)),
                    p.z < -a
                        ? ((E = p.z + a), (m += E * E))
                        : p.z > a && ((E = p.z - a), (m += E * E)),
                    m
                );
            }),
            new Re()),
        ss = new Re(),
        us =
            ((Ne.computePlaneDistances = function (e, t, n, r) {
                ge.defined(r) || (r = new ae());
                var o = Number.POSITIVE_INFINITY,
                    i = Number.NEGATIVE_INFINITY,
                    a = e.center,
                    e = e.halfAxes,
                    s = B.getColumn(e, 0, es),
                    u = B.getColumn(e, 1, ts),
                    e = B.getColumn(e, 2, ns),
                    c = Re.add(s, u, as),
                    l =
                        (Re.add(c, e, c),
                        Re.add(c, a, c),
                        Re.subtract(c, t, ss)),
                    d = Re.dot(n, l),
                    o = Math.min(d, o),
                    i = Math.max(d, i);
                return (
                    Re.add(a, s, c),
                    Re.add(c, u, c),
                    Re.subtract(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    Re.add(a, s, c),
                    Re.subtract(c, u, c),
                    Re.add(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    Re.add(a, s, c),
                    Re.subtract(c, u, c),
                    Re.subtract(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    Re.subtract(a, s, c),
                    Re.add(c, u, c),
                    Re.add(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    Re.subtract(a, s, c),
                    Re.add(c, u, c),
                    Re.subtract(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    Re.subtract(a, s, c),
                    Re.subtract(c, u, c),
                    Re.add(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    Re.subtract(a, s, c),
                    Re.subtract(c, u, c),
                    Re.subtract(c, e, c),
                    Re.subtract(c, t, l),
                    (d = Re.dot(n, l)),
                    (o = Math.min(d, o)),
                    (i = Math.max(d, i)),
                    (r.start = o),
                    (r.stop = i),
                    r
                );
            }),
            new Re()),
        cs = new Re(),
        ls = new Re(),
        ds =
            ((Ne.computeCorners = function (e, t) {
                ge.defined(t) ||
                    (t = [
                        new Re(),
                        new Re(),
                        new Re(),
                        new Re(),
                        new Re(),
                        new Re(),
                        new Re(),
                        new Re(),
                    ]);
                var n = e.center,
                    e = e.halfAxes,
                    r = B.getColumn(e, 0, us),
                    o = B.getColumn(e, 1, cs),
                    e = B.getColumn(e, 2, ls);
                return (
                    Re.clone(n, t[0]),
                    Re.subtract(t[0], r, t[0]),
                    Re.subtract(t[0], o, t[0]),
                    Re.subtract(t[0], e, t[0]),
                    Re.clone(n, t[1]),
                    Re.subtract(t[1], r, t[1]),
                    Re.subtract(t[1], o, t[1]),
                    Re.add(t[1], e, t[1]),
                    Re.clone(n, t[2]),
                    Re.subtract(t[2], r, t[2]),
                    Re.add(t[2], o, t[2]),
                    Re.subtract(t[2], e, t[2]),
                    Re.clone(n, t[3]),
                    Re.subtract(t[3], r, t[3]),
                    Re.add(t[3], o, t[3]),
                    Re.add(t[3], e, t[3]),
                    Re.clone(n, t[4]),
                    Re.add(t[4], r, t[4]),
                    Re.subtract(t[4], o, t[4]),
                    Re.subtract(t[4], e, t[4]),
                    Re.clone(n, t[5]),
                    Re.add(t[5], r, t[5]),
                    Re.subtract(t[5], o, t[5]),
                    Re.add(t[5], e, t[5]),
                    Re.clone(n, t[6]),
                    Re.add(t[6], r, t[6]),
                    Re.add(t[6], o, t[6]),
                    Re.subtract(t[6], e, t[6]),
                    Re.clone(n, t[7]),
                    Re.add(t[7], r, t[7]),
                    Re.add(t[7], o, t[7]),
                    Re.add(t[7], e, t[7]),
                    t
                );
            }),
            new B()),
        fs =
            ((Ne.computeTransformation = function (e, t) {
                ge.defined(t) || (t = new we());
                var n = e.center,
                    e = B.multiplyByUniformScale(e.halfAxes, 2, ds);
                return we.fromRotationTranslation(e, n, t);
            }),
            new Ie());
    (Ne.isOccluded = function (e, t) {
        e = Ie.fromOrientedBoundingBox(e, fs);
        return !t.isBoundingSphereVisible(e);
    }),
        (Ne.prototype.intersectPlane = function (e) {
            return Ne.intersectPlane(this, e);
        }),
        (Ne.prototype.distanceSquaredTo = function (e) {
            return Ne.distanceSquaredTo(this, e);
        }),
        (Ne.prototype.computePlaneDistances = function (e, t, n) {
            return Ne.computePlaneDistances(this, e, t, n);
        }),
        (Ne.prototype.computeCorners = function (e) {
            return Ne.computeCorners(this, e);
        }),
        (Ne.prototype.computeTransformation = function (e) {
            return Ne.computeTransformation(this, e);
        }),
        (Ne.prototype.isOccluded = function (e) {
            return Ne.isOccluded(this, e);
        }),
        (Ne.equals = function (e, t) {
            return (
                e === t ||
                (ge.defined(e) &&
                    ge.defined(t) &&
                    Re.equals(e.center, t.center) &&
                    B.equals(e.halfAxes, t.halfAxes))
            );
        }),
        (Ne.prototype.clone = function (e) {
            return Ne.clone(this, e);
        }),
        (Ne.prototype.equals = function (e) {
            return Ne.equals(this, e);
        });
    e = Object.freeze({
        DEPTH_BUFFER_BIT: 256,
        STENCIL_BUFFER_BIT: 1024,
        COLOR_BUFFER_BIT: 16384,
        POINTS: 0,
        LINES: 1,
        LINE_LOOP: 2,
        LINE_STRIP: 3,
        TRIANGLES: 4,
        TRIANGLE_STRIP: 5,
        TRIANGLE_FAN: 6,
        ZERO: 0,
        ONE: 1,
        SRC_COLOR: 768,
        ONE_MINUS_SRC_COLOR: 769,
        SRC_ALPHA: 770,
        ONE_MINUS_SRC_ALPHA: 771,
        DST_ALPHA: 772,
        ONE_MINUS_DST_ALPHA: 773,
        DST_COLOR: 774,
        ONE_MINUS_DST_COLOR: 775,
        SRC_ALPHA_SATURATE: 776,
        FUNC_ADD: 32774,
        BLEND_EQUATION: 32777,
        BLEND_EQUATION_RGB: 32777,
        BLEND_EQUATION_ALPHA: 34877,
        FUNC_SUBTRACT: 32778,
        FUNC_REVERSE_SUBTRACT: 32779,
        BLEND_DST_RGB: 32968,
        BLEND_SRC_RGB: 32969,
        BLEND_DST_ALPHA: 32970,
        BLEND_SRC_ALPHA: 32971,
        CONSTANT_COLOR: 32769,
        ONE_MINUS_CONSTANT_COLOR: 32770,
        CONSTANT_ALPHA: 32771,
        ONE_MINUS_CONSTANT_ALPHA: 32772,
        BLEND_COLOR: 32773,
        ARRAY_BUFFER: 34962,
        ELEMENT_ARRAY_BUFFER: 34963,
        ARRAY_BUFFER_BINDING: 34964,
        ELEMENT_ARRAY_BUFFER_BINDING: 34965,
        STREAM_DRAW: 35040,
        STATIC_DRAW: 35044,
        DYNAMIC_DRAW: 35048,
        BUFFER_SIZE: 34660,
        BUFFER_USAGE: 34661,
        CURRENT_VERTEX_ATTRIB: 34342,
        FRONT: 1028,
        BACK: 1029,
        FRONT_AND_BACK: 1032,
        CULL_FACE: 2884,
        BLEND: 3042,
        DITHER: 3024,
        STENCIL_TEST: 2960,
        DEPTH_TEST: 2929,
        SCISSOR_TEST: 3089,
        POLYGON_OFFSET_FILL: 32823,
        SAMPLE_ALPHA_TO_COVERAGE: 32926,
        SAMPLE_COVERAGE: 32928,
        NO_ERROR: 0,
        INVALID_ENUM: 1280,
        INVALID_VALUE: 1281,
        INVALID_OPERATION: 1282,
        OUT_OF_MEMORY: 1285,
        CW: 2304,
        CCW: 2305,
        LINE_WIDTH: 2849,
        ALIASED_POINT_SIZE_RANGE: 33901,
        ALIASED_LINE_WIDTH_RANGE: 33902,
        CULL_FACE_MODE: 2885,
        FRONT_FACE: 2886,
        DEPTH_RANGE: 2928,
        DEPTH_WRITEMASK: 2930,
        DEPTH_CLEAR_VALUE: 2931,
        DEPTH_FUNC: 2932,
        STENCIL_CLEAR_VALUE: 2961,
        STENCIL_FUNC: 2962,
        STENCIL_FAIL: 2964,
        STENCIL_PASS_DEPTH_FAIL: 2965,
        STENCIL_PASS_DEPTH_PASS: 2966,
        STENCIL_REF: 2967,
        STENCIL_VALUE_MASK: 2963,
        STENCIL_WRITEMASK: 2968,
        STENCIL_BACK_FUNC: 34816,
        STENCIL_BACK_FAIL: 34817,
        STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
        STENCIL_BACK_PASS_DEPTH_PASS: 34819,
        STENCIL_BACK_REF: 36003,
        STENCIL_BACK_VALUE_MASK: 36004,
        STENCIL_BACK_WRITEMASK: 36005,
        VIEWPORT: 2978,
        SCISSOR_BOX: 3088,
        COLOR_CLEAR_VALUE: 3106,
        COLOR_WRITEMASK: 3107,
        UNPACK_ALIGNMENT: 3317,
        PACK_ALIGNMENT: 3333,
        MAX_TEXTURE_SIZE: 3379,
        MAX_VIEWPORT_DIMS: 3386,
        SUBPIXEL_BITS: 3408,
        RED_BITS: 3410,
        GREEN_BITS: 3411,
        BLUE_BITS: 3412,
        ALPHA_BITS: 3413,
        DEPTH_BITS: 3414,
        STENCIL_BITS: 3415,
        POLYGON_OFFSET_UNITS: 10752,
        POLYGON_OFFSET_FACTOR: 32824,
        TEXTURE_BINDING_2D: 32873,
        SAMPLE_BUFFERS: 32936,
        SAMPLES: 32937,
        SAMPLE_COVERAGE_VALUE: 32938,
        SAMPLE_COVERAGE_INVERT: 32939,
        COMPRESSED_TEXTURE_FORMATS: 34467,
        DONT_CARE: 4352,
        FASTEST: 4353,
        NICEST: 4354,
        GENERATE_MIPMAP_HINT: 33170,
        BYTE: 5120,
        UNSIGNED_BYTE: 5121,
        SHORT: 5122,
        UNSIGNED_SHORT: 5123,
        INT: 5124,
        UNSIGNED_INT: 5125,
        FLOAT: 5126,
        DEPTH_COMPONENT: 6402,
        ALPHA: 6406,
        RGB: 6407,
        RGBA: 6408,
        LUMINANCE: 6409,
        LUMINANCE_ALPHA: 6410,
        UNSIGNED_SHORT_4_4_4_4: 32819,
        UNSIGNED_SHORT_5_5_5_1: 32820,
        UNSIGNED_SHORT_5_6_5: 33635,
        FRAGMENT_SHADER: 35632,
        VERTEX_SHADER: 35633,
        MAX_VERTEX_ATTRIBS: 34921,
        MAX_VERTEX_UNIFORM_VECTORS: 36347,
        MAX_VARYING_VECTORS: 36348,
        MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
        MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
        MAX_TEXTURE_IMAGE_UNITS: 34930,
        MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
        SHADER_TYPE: 35663,
        DELETE_STATUS: 35712,
        LINK_STATUS: 35714,
        VALIDATE_STATUS: 35715,
        ATTACHED_SHADERS: 35717,
        ACTIVE_UNIFORMS: 35718,
        ACTIVE_ATTRIBUTES: 35721,
        SHADING_LANGUAGE_VERSION: 35724,
        CURRENT_PROGRAM: 35725,
        NEVER: 512,
        LESS: 513,
        EQUAL: 514,
        LEQUAL: 515,
        GREATER: 516,
        NOTEQUAL: 517,
        GEQUAL: 518,
        ALWAYS: 519,
        KEEP: 7680,
        REPLACE: 7681,
        INCR: 7682,
        DECR: 7683,
        INVERT: 5386,
        INCR_WRAP: 34055,
        DECR_WRAP: 34056,
        VENDOR: 7936,
        RENDERER: 7937,
        VERSION: 7938,
        NEAREST: 9728,
        LINEAR: 9729,
        NEAREST_MIPMAP_NEAREST: 9984,
        LINEAR_MIPMAP_NEAREST: 9985,
        NEAREST_MIPMAP_LINEAR: 9986,
        LINEAR_MIPMAP_LINEAR: 9987,
        TEXTURE_MAG_FILTER: 10240,
        TEXTURE_MIN_FILTER: 10241,
        TEXTURE_WRAP_S: 10242,
        TEXTURE_WRAP_T: 10243,
        TEXTURE_2D: 3553,
        TEXTURE: 5890,
        TEXTURE_CUBE_MAP: 34067,
        TEXTURE_BINDING_CUBE_MAP: 34068,
        TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
        TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
        TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
        TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
        TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
        TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
        MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
        TEXTURE0: 33984,
        TEXTURE1: 33985,
        TEXTURE2: 33986,
        TEXTURE3: 33987,
        TEXTURE4: 33988,
        TEXTURE5: 33989,
        TEXTURE6: 33990,
        TEXTURE7: 33991,
        TEXTURE8: 33992,
        TEXTURE9: 33993,
        TEXTURE10: 33994,
        TEXTURE11: 33995,
        TEXTURE12: 33996,
        TEXTURE13: 33997,
        TEXTURE14: 33998,
        TEXTURE15: 33999,
        TEXTURE16: 34e3,
        TEXTURE17: 34001,
        TEXTURE18: 34002,
        TEXTURE19: 34003,
        TEXTURE20: 34004,
        TEXTURE21: 34005,
        TEXTURE22: 34006,
        TEXTURE23: 34007,
        TEXTURE24: 34008,
        TEXTURE25: 34009,
        TEXTURE26: 34010,
        TEXTURE27: 34011,
        TEXTURE28: 34012,
        TEXTURE29: 34013,
        TEXTURE30: 34014,
        TEXTURE31: 34015,
        ACTIVE_TEXTURE: 34016,
        REPEAT: 10497,
        CLAMP_TO_EDGE: 33071,
        MIRRORED_REPEAT: 33648,
        FLOAT_VEC2: 35664,
        FLOAT_VEC3: 35665,
        FLOAT_VEC4: 35666,
        INT_VEC2: 35667,
        INT_VEC3: 35668,
        INT_VEC4: 35669,
        BOOL: 35670,
        BOOL_VEC2: 35671,
        BOOL_VEC3: 35672,
        BOOL_VEC4: 35673,
        FLOAT_MAT2: 35674,
        FLOAT_MAT3: 35675,
        FLOAT_MAT4: 35676,
        SAMPLER_2D: 35678,
        SAMPLER_CUBE: 35680,
        VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
        VERTEX_ATTRIB_ARRAY_SIZE: 34339,
        VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
        VERTEX_ATTRIB_ARRAY_TYPE: 34341,
        VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
        VERTEX_ATTRIB_ARRAY_POINTER: 34373,
        VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
        IMPLEMENTATION_COLOR_READ_TYPE: 35738,
        IMPLEMENTATION_COLOR_READ_FORMAT: 35739,
        COMPILE_STATUS: 35713,
        LOW_FLOAT: 36336,
        MEDIUM_FLOAT: 36337,
        HIGH_FLOAT: 36338,
        LOW_INT: 36339,
        MEDIUM_INT: 36340,
        HIGH_INT: 36341,
        FRAMEBUFFER: 36160,
        RENDERBUFFER: 36161,
        RGBA4: 32854,
        RGB5_A1: 32855,
        RGB565: 36194,
        DEPTH_COMPONENT16: 33189,
        STENCIL_INDEX: 6401,
        STENCIL_INDEX8: 36168,
        DEPTH_STENCIL: 34041,
        RENDERBUFFER_WIDTH: 36162,
        RENDERBUFFER_HEIGHT: 36163,
        RENDERBUFFER_INTERNAL_FORMAT: 36164,
        RENDERBUFFER_RED_SIZE: 36176,
        RENDERBUFFER_GREEN_SIZE: 36177,
        RENDERBUFFER_BLUE_SIZE: 36178,
        RENDERBUFFER_ALPHA_SIZE: 36179,
        RENDERBUFFER_DEPTH_SIZE: 36180,
        RENDERBUFFER_STENCIL_SIZE: 36181,
        FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
        FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
        FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
        FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
        COLOR_ATTACHMENT0: 36064,
        DEPTH_ATTACHMENT: 36096,
        STENCIL_ATTACHMENT: 36128,
        DEPTH_STENCIL_ATTACHMENT: 33306,
        NONE: 0,
        FRAMEBUFFER_COMPLETE: 36053,
        FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
        FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
        FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
        FRAMEBUFFER_UNSUPPORTED: 36061,
        FRAMEBUFFER_BINDING: 36006,
        RENDERBUFFER_BINDING: 36007,
        MAX_RENDERBUFFER_SIZE: 34024,
        INVALID_FRAMEBUFFER_OPERATION: 1286,
        UNPACK_FLIP_Y_WEBGL: 37440,
        UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
        CONTEXT_LOST_WEBGL: 37442,
        UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
        BROWSER_DEFAULT_WEBGL: 37444,
        COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
        COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
        COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
        COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
        COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
        COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
        COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
        COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
        COMPRESSED_RGBA_ASTC_4x4_WEBGL: 37808,
        COMPRESSED_RGB_ETC1_WEBGL: 36196,
        COMPRESSED_RGBA_BPTC_UNORM: 36492,
        HALF_FLOAT_OES: 36193,
        DOUBLE: 5130,
        READ_BUFFER: 3074,
        UNPACK_ROW_LENGTH: 3314,
        UNPACK_SKIP_ROWS: 3315,
        UNPACK_SKIP_PIXELS: 3316,
        PACK_ROW_LENGTH: 3330,
        PACK_SKIP_ROWS: 3331,
        PACK_SKIP_PIXELS: 3332,
        COLOR: 6144,
        DEPTH: 6145,
        STENCIL: 6146,
        RED: 6403,
        RGB8: 32849,
        RGBA8: 32856,
        RGB10_A2: 32857,
        TEXTURE_BINDING_3D: 32874,
        UNPACK_SKIP_IMAGES: 32877,
        UNPACK_IMAGE_HEIGHT: 32878,
        TEXTURE_3D: 32879,
        TEXTURE_WRAP_R: 32882,
        MAX_3D_TEXTURE_SIZE: 32883,
        UNSIGNED_INT_2_10_10_10_REV: 33640,
        MAX_ELEMENTS_VERTICES: 33e3,
        MAX_ELEMENTS_INDICES: 33001,
        TEXTURE_MIN_LOD: 33082,
        TEXTURE_MAX_LOD: 33083,
        TEXTURE_BASE_LEVEL: 33084,
        TEXTURE_MAX_LEVEL: 33085,
        MIN: 32775,
        MAX: 32776,
        DEPTH_COMPONENT24: 33190,
        MAX_TEXTURE_LOD_BIAS: 34045,
        TEXTURE_COMPARE_MODE: 34892,
        TEXTURE_COMPARE_FUNC: 34893,
        CURRENT_QUERY: 34917,
        QUERY_RESULT: 34918,
        QUERY_RESULT_AVAILABLE: 34919,
        STREAM_READ: 35041,
        STREAM_COPY: 35042,
        STATIC_READ: 35045,
        STATIC_COPY: 35046,
        DYNAMIC_READ: 35049,
        DYNAMIC_COPY: 35050,
        MAX_DRAW_BUFFERS: 34852,
        DRAW_BUFFER0: 34853,
        DRAW_BUFFER1: 34854,
        DRAW_BUFFER2: 34855,
        DRAW_BUFFER3: 34856,
        DRAW_BUFFER4: 34857,
        DRAW_BUFFER5: 34858,
        DRAW_BUFFER6: 34859,
        DRAW_BUFFER7: 34860,
        DRAW_BUFFER8: 34861,
        DRAW_BUFFER9: 34862,
        DRAW_BUFFER10: 34863,
        DRAW_BUFFER11: 34864,
        DRAW_BUFFER12: 34865,
        DRAW_BUFFER13: 34866,
        DRAW_BUFFER14: 34867,
        DRAW_BUFFER15: 34868,
        MAX_FRAGMENT_UNIFORM_COMPONENTS: 35657,
        MAX_VERTEX_UNIFORM_COMPONENTS: 35658,
        SAMPLER_3D: 35679,
        SAMPLER_2D_SHADOW: 35682,
        FRAGMENT_SHADER_DERIVATIVE_HINT: 35723,
        PIXEL_PACK_BUFFER: 35051,
        PIXEL_UNPACK_BUFFER: 35052,
        PIXEL_PACK_BUFFER_BINDING: 35053,
        PIXEL_UNPACK_BUFFER_BINDING: 35055,
        FLOAT_MAT2x3: 35685,
        FLOAT_MAT2x4: 35686,
        FLOAT_MAT3x2: 35687,
        FLOAT_MAT3x4: 35688,
        FLOAT_MAT4x2: 35689,
        FLOAT_MAT4x3: 35690,
        SRGB: 35904,
        SRGB8: 35905,
        SRGB8_ALPHA8: 35907,
        COMPARE_REF_TO_TEXTURE: 34894,
        RGBA32F: 34836,
        RGB32F: 34837,
        RGBA16F: 34842,
        RGB16F: 34843,
        VERTEX_ATTRIB_ARRAY_INTEGER: 35069,
        MAX_ARRAY_TEXTURE_LAYERS: 35071,
        MIN_PROGRAM_TEXEL_OFFSET: 35076,
        MAX_PROGRAM_TEXEL_OFFSET: 35077,
        MAX_VARYING_COMPONENTS: 35659,
        TEXTURE_2D_ARRAY: 35866,
        TEXTURE_BINDING_2D_ARRAY: 35869,
        R11F_G11F_B10F: 35898,
        UNSIGNED_INT_10F_11F_11F_REV: 35899,
        RGB9_E5: 35901,
        UNSIGNED_INT_5_9_9_9_REV: 35902,
        TRANSFORM_FEEDBACK_BUFFER_MODE: 35967,
        MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 35968,
        TRANSFORM_FEEDBACK_VARYINGS: 35971,
        TRANSFORM_FEEDBACK_BUFFER_START: 35972,
        TRANSFORM_FEEDBACK_BUFFER_SIZE: 35973,
        TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 35976,
        RASTERIZER_DISCARD: 35977,
        MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 35978,
        MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 35979,
        INTERLEAVED_ATTRIBS: 35980,
        SEPARATE_ATTRIBS: 35981,
        TRANSFORM_FEEDBACK_BUFFER: 35982,
        TRANSFORM_FEEDBACK_BUFFER_BINDING: 35983,
        RGBA32UI: 36208,
        RGB32UI: 36209,
        RGBA16UI: 36214,
        RGB16UI: 36215,
        RGBA8UI: 36220,
        RGB8UI: 36221,
        RGBA32I: 36226,
        RGB32I: 36227,
        RGBA16I: 36232,
        RGB16I: 36233,
        RGBA8I: 36238,
        RGB8I: 36239,
        RED_INTEGER: 36244,
        RGB_INTEGER: 36248,
        RGBA_INTEGER: 36249,
        SAMPLER_2D_ARRAY: 36289,
        SAMPLER_2D_ARRAY_SHADOW: 36292,
        SAMPLER_CUBE_SHADOW: 36293,
        UNSIGNED_INT_VEC2: 36294,
        UNSIGNED_INT_VEC3: 36295,
        UNSIGNED_INT_VEC4: 36296,
        INT_SAMPLER_2D: 36298,
        INT_SAMPLER_3D: 36299,
        INT_SAMPLER_CUBE: 36300,
        INT_SAMPLER_2D_ARRAY: 36303,
        UNSIGNED_INT_SAMPLER_2D: 36306,
        UNSIGNED_INT_SAMPLER_3D: 36307,
        UNSIGNED_INT_SAMPLER_CUBE: 36308,
        UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311,
        DEPTH_COMPONENT32F: 36012,
        DEPTH32F_STENCIL8: 36013,
        FLOAT_32_UNSIGNED_INT_24_8_REV: 36269,
        FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 33296,
        FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 33297,
        FRAMEBUFFER_ATTACHMENT_RED_SIZE: 33298,
        FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 33299,
        FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 33300,
        FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 33301,
        FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 33302,
        FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 33303,
        FRAMEBUFFER_DEFAULT: 33304,
        UNSIGNED_INT_24_8: 34042,
        DEPTH24_STENCIL8: 35056,
        UNSIGNED_NORMALIZED: 35863,
        DRAW_FRAMEBUFFER_BINDING: 36006,
        READ_FRAMEBUFFER: 36008,
        DRAW_FRAMEBUFFER: 36009,
        READ_FRAMEBUFFER_BINDING: 36010,
        RENDERBUFFER_SAMPLES: 36011,
        FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 36052,
        MAX_COLOR_ATTACHMENTS: 36063,
        COLOR_ATTACHMENT1: 36065,
        COLOR_ATTACHMENT2: 36066,
        COLOR_ATTACHMENT3: 36067,
        COLOR_ATTACHMENT4: 36068,
        COLOR_ATTACHMENT5: 36069,
        COLOR_ATTACHMENT6: 36070,
        COLOR_ATTACHMENT7: 36071,
        COLOR_ATTACHMENT8: 36072,
        COLOR_ATTACHMENT9: 36073,
        COLOR_ATTACHMENT10: 36074,
        COLOR_ATTACHMENT11: 36075,
        COLOR_ATTACHMENT12: 36076,
        COLOR_ATTACHMENT13: 36077,
        COLOR_ATTACHMENT14: 36078,
        COLOR_ATTACHMENT15: 36079,
        FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 36182,
        MAX_SAMPLES: 36183,
        HALF_FLOAT: 5131,
        RG: 33319,
        RG_INTEGER: 33320,
        R8: 33321,
        RG8: 33323,
        R16F: 33325,
        R32F: 33326,
        RG16F: 33327,
        RG32F: 33328,
        R8I: 33329,
        R8UI: 33330,
        R16I: 33331,
        R16UI: 33332,
        R32I: 33333,
        R32UI: 33334,
        RG8I: 33335,
        RG8UI: 33336,
        RG16I: 33337,
        RG16UI: 33338,
        RG32I: 33339,
        RG32UI: 33340,
        VERTEX_ARRAY_BINDING: 34229,
        R8_SNORM: 36756,
        RG8_SNORM: 36757,
        RGB8_SNORM: 36758,
        RGBA8_SNORM: 36759,
        SIGNED_NORMALIZED: 36764,
        COPY_READ_BUFFER: 36662,
        COPY_WRITE_BUFFER: 36663,
        COPY_READ_BUFFER_BINDING: 36662,
        COPY_WRITE_BUFFER_BINDING: 36663,
        UNIFORM_BUFFER: 35345,
        UNIFORM_BUFFER_BINDING: 35368,
        UNIFORM_BUFFER_START: 35369,
        UNIFORM_BUFFER_SIZE: 35370,
        MAX_VERTEX_UNIFORM_BLOCKS: 35371,
        MAX_FRAGMENT_UNIFORM_BLOCKS: 35373,
        MAX_COMBINED_UNIFORM_BLOCKS: 35374,
        MAX_UNIFORM_BUFFER_BINDINGS: 35375,
        MAX_UNIFORM_BLOCK_SIZE: 35376,
        MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 35377,
        MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 35379,
        UNIFORM_BUFFER_OFFSET_ALIGNMENT: 35380,
        ACTIVE_UNIFORM_BLOCKS: 35382,
        UNIFORM_TYPE: 35383,
        UNIFORM_SIZE: 35384,
        UNIFORM_BLOCK_INDEX: 35386,
        UNIFORM_OFFSET: 35387,
        UNIFORM_ARRAY_STRIDE: 35388,
        UNIFORM_MATRIX_STRIDE: 35389,
        UNIFORM_IS_ROW_MAJOR: 35390,
        UNIFORM_BLOCK_BINDING: 35391,
        UNIFORM_BLOCK_DATA_SIZE: 35392,
        UNIFORM_BLOCK_ACTIVE_UNIFORMS: 35394,
        UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 35395,
        UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 35396,
        UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 35398,
        INVALID_INDEX: 4294967295,
        MAX_VERTEX_OUTPUT_COMPONENTS: 37154,
        MAX_FRAGMENT_INPUT_COMPONENTS: 37157,
        MAX_SERVER_WAIT_TIMEOUT: 37137,
        OBJECT_TYPE: 37138,
        SYNC_CONDITION: 37139,
        SYNC_STATUS: 37140,
        SYNC_FLAGS: 37141,
        SYNC_FENCE: 37142,
        SYNC_GPU_COMMANDS_COMPLETE: 37143,
        UNSIGNALED: 37144,
        SIGNALED: 37145,
        ALREADY_SIGNALED: 37146,
        TIMEOUT_EXPIRED: 37147,
        CONDITION_SATISFIED: 37148,
        WAIT_FAILED: 37149,
        SYNC_FLUSH_COMMANDS_BIT: 1,
        VERTEX_ATTRIB_ARRAY_DIVISOR: 35070,
        ANY_SAMPLES_PASSED: 35887,
        ANY_SAMPLES_PASSED_CONSERVATIVE: 36202,
        SAMPLER_BINDING: 35097,
        RGB10_A2UI: 36975,
        INT_2_10_10_10_REV: 36255,
        TRANSFORM_FEEDBACK: 36386,
        TRANSFORM_FEEDBACK_PAUSED: 36387,
        TRANSFORM_FEEDBACK_ACTIVE: 36388,
        TRANSFORM_FEEDBACK_BINDING: 36389,
        COMPRESSED_R11_EAC: 37488,
        COMPRESSED_SIGNED_R11_EAC: 37489,
        COMPRESSED_RG11_EAC: 37490,
        COMPRESSED_SIGNED_RG11_EAC: 37491,
        COMPRESSED_RGB8_ETC2: 37492,
        COMPRESSED_SRGB8_ETC2: 37493,
        COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37494,
        COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37495,
        COMPRESSED_RGBA8_ETC2_EAC: 37496,
        COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37497,
        TEXTURE_IMMUTABLE_FORMAT: 37167,
        MAX_ELEMENT_INDEX: 36203,
        TEXTURE_IMMUTABLE_LEVELS: 33503,
        MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047,
    });
    const c = {
        BYTE: e.BYTE,
        UNSIGNED_BYTE: e.UNSIGNED_BYTE,
        SHORT: e.SHORT,
        UNSIGNED_SHORT: e.UNSIGNED_SHORT,
        INT: e.INT,
        UNSIGNED_INT: e.UNSIGNED_INT,
        FLOAT: e.FLOAT,
        DOUBLE: e.DOUBLE,
        getSizeInBytes: function (e) {
            switch (e) {
                case c.BYTE:
                    return Int8Array.BYTES_PER_ELEMENT;
                case c.UNSIGNED_BYTE:
                    return Uint8Array.BYTES_PER_ELEMENT;
                case c.SHORT:
                    return Int16Array.BYTES_PER_ELEMENT;
                case c.UNSIGNED_SHORT:
                    return Uint16Array.BYTES_PER_ELEMENT;
                case c.INT:
                    return Int32Array.BYTES_PER_ELEMENT;
                case c.UNSIGNED_INT:
                    return Uint32Array.BYTES_PER_ELEMENT;
                case c.FLOAT:
                    return Float32Array.BYTES_PER_ELEMENT;
                case c.DOUBLE:
                    return Float64Array.BYTES_PER_ELEMENT;
            }
        },
        fromTypedArray: function (e) {
            return e instanceof Int8Array
                ? c.BYTE
                : e instanceof Uint8Array
                ? c.UNSIGNED_BYTE
                : e instanceof Int16Array
                ? c.SHORT
                : e instanceof Uint16Array
                ? c.UNSIGNED_SHORT
                : e instanceof Int32Array
                ? c.INT
                : e instanceof Uint32Array
                ? c.UNSIGNED_INT
                : e instanceof Float32Array
                ? c.FLOAT
                : e instanceof Float64Array
                ? c.DOUBLE
                : void 0;
        },
        validate: function (e) {
            return (
                ge.defined(e) &&
                (e === c.BYTE ||
                    e === c.UNSIGNED_BYTE ||
                    e === c.SHORT ||
                    e === c.UNSIGNED_SHORT ||
                    e === c.INT ||
                    e === c.UNSIGNED_INT ||
                    e === c.FLOAT ||
                    e === c.DOUBLE)
            );
        },
        createTypedArray: function (e, t) {
            switch (e) {
                case c.BYTE:
                    return new Int8Array(t);
                case c.UNSIGNED_BYTE:
                    return new Uint8Array(t);
                case c.SHORT:
                    return new Int16Array(t);
                case c.UNSIGNED_SHORT:
                    return new Uint16Array(t);
                case c.INT:
                    return new Int32Array(t);
                case c.UNSIGNED_INT:
                    return new Uint32Array(t);
                case c.FLOAT:
                    return new Float32Array(t);
                case c.DOUBLE:
                    return new Float64Array(t);
            }
        },
        createArrayBufferView: function (e, t, n, r) {
            switch (
                ((n = ge.defaultValue(n, 0)),
                (r = ge.defaultValue(
                    r,
                    (t.byteLength - n) / c.getSizeInBytes(e)
                )),
                e)
            ) {
                case c.BYTE:
                    return new Int8Array(t, n, r);
                case c.UNSIGNED_BYTE:
                    return new Uint8Array(t, n, r);
                case c.SHORT:
                    return new Int16Array(t, n, r);
                case c.UNSIGNED_SHORT:
                    return new Uint16Array(t, n, r);
                case c.INT:
                    return new Int32Array(t, n, r);
                case c.UNSIGNED_INT:
                    return new Uint32Array(t, n, r);
                case c.FLOAT:
                    return new Float32Array(t, n, r);
                case c.DOUBLE:
                    return new Float64Array(t, n, r);
            }
        },
        fromName: function (e) {
            switch (e) {
                case "BYTE":
                    return c.BYTE;
                case "UNSIGNED_BYTE":
                    return c.UNSIGNED_BYTE;
                case "SHORT":
                    return c.SHORT;
                case "UNSIGNED_SHORT":
                    return c.UNSIGNED_SHORT;
                case "INT":
                    return c.INT;
                case "UNSIGNED_INT":
                    return c.UNSIGNED_INT;
                case "FLOAT":
                    return c.FLOAT;
                case "DOUBLE":
                    return c.DOUBLE;
            }
        },
    };
    var hs = Object.freeze(c);
    function m(e, t, n, r) {
        (this[0] = ge.defaultValue(e, 0)),
            (this[1] = ge.defaultValue(n, 0)),
            (this[2] = ge.defaultValue(t, 0)),
            (this[3] = ge.defaultValue(r, 0));
    }
    (m.packedLength = 4),
        (m.pack = function (e, t, n) {
            return (
                (n = ge.defaultValue(n, 0)),
                (t[n++] = e[0]),
                (t[n++] = e[1]),
                (t[n++] = e[2]),
                (t[n++] = e[3]),
                t
            );
        }),
        (m.unpack = function (e, t, n) {
            return (
                (t = ge.defaultValue(t, 0)),
                ((n = ge.defined(n) ? n : new m())[0] = e[t++]),
                (n[1] = e[t++]),
                (n[2] = e[t++]),
                (n[3] = e[t++]),
                n
            );
        }),
        (m.packArray = function (t, n) {
            var r = t.length,
                e = 4 * r;
            ge.defined(n)
                ? (!Array.isArray(n) && n.length !== e) ||
                  n.length === e ||
                  (n.length = e)
                : (n = new Array(e));
            for (let e = 0; e < r; ++e) m.pack(t[e], n, 4 * e);
            return n;
        }),
        (m.unpackArray = function (t, n) {
            var r = t.length;
            ge.defined(n) ? (n.length = r / 4) : (n = new Array(r / 4));
            for (let e = 0; e < r; e += 4) {
                var o = e / 4;
                n[o] = m.unpack(t, e, n[o]);
            }
            return n;
        }),
        (m.clone = function (e, t) {
            if (ge.defined(e))
                return ge.defined(t)
                    ? ((t[0] = e[0]),
                      (t[1] = e[1]),
                      (t[2] = e[2]),
                      (t[3] = e[3]),
                      t)
                    : new m(e[0], e[2], e[1], e[3]);
        }),
        (m.fromArray = m.unpack),
        (m.fromColumnMajorArray = function (e, t) {
            return m.clone(e, t);
        }),
        (m.fromRowMajorArray = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e[0]),
                  (t[1] = e[2]),
                  (t[2] = e[1]),
                  (t[3] = e[3]),
                  t)
                : new m(e[0], e[1], e[2], e[3]);
        }),
        (m.fromScale = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e.x), (t[1] = 0), (t[2] = 0), (t[3] = e.y), t)
                : new m(e.x, 0, 0, e.y);
        }),
        (m.fromUniformScale = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e), (t[1] = 0), (t[2] = 0), (t[3] = e), t)
                : new m(e, 0, 0, e);
        }),
        (m.fromRotation = function (e, t) {
            var n = Math.cos(e),
                e = Math.sin(e);
            return ge.defined(t)
                ? ((t[0] = n), (t[1] = e), (t[2] = -e), (t[3] = n), t)
                : new m(n, -e, e, n);
        }),
        (m.toArray = function (e, t) {
            return ge.defined(t)
                ? ((t[0] = e[0]),
                  (t[1] = e[1]),
                  (t[2] = e[2]),
                  (t[3] = e[3]),
                  t)
                : [e[0], e[1], e[2], e[3]];
        }),
        (m.getElementIndex = function (e, t) {
            return 2 * e + t;
        }),
        (m.getColumn = function (e, t, n) {
            var t = 2 * t,
                r = e[t],
                e = e[1 + t];
            return (n.x = r), (n.y = e), n;
        }),
        (m.setColumn = function (e, t, n, r) {
            t *= 2;
            return ((r = m.clone(e, r))[t] = n.x), (r[1 + t] = n.y), r;
        }),
        (m.getRow = function (e, t, n) {
            var r = e[t],
                e = e[t + 2];
            return (n.x = r), (n.y = e), n;
        }),
        (m.setRow = function (e, t, n, r) {
            return ((r = m.clone(e, r))[t] = n.x), (r[t + 2] = n.y), r;
        });
    const ps = new ve(),
        ms =
            ((m.setScale = function (e, t, n) {
                var r = m.getScale(e, ps),
                    o = t.x / r.x,
                    t = t.y / r.y;
                return (
                    (n[0] = e[0] * o),
                    (n[1] = e[1] * o),
                    (n[2] = e[2] * t),
                    (n[3] = e[3] * t),
                    n
                );
            }),
            new ve()),
        Es =
            ((m.setUniformScale = function (e, t, n) {
                var r = m.getScale(e, ms),
                    o = t / r.x,
                    t = t / r.y;
                return (
                    (n[0] = e[0] * o),
                    (n[1] = e[1] * o),
                    (n[2] = e[2] * t),
                    (n[3] = e[3] * t),
                    n
                );
            }),
            new ve()),
        _s =
            ((m.getScale = function (e, t) {
                return (
                    (t.x = ve.magnitude(ve.fromElements(e[0], e[1], Es))),
                    (t.y = ve.magnitude(ve.fromElements(e[2], e[3], Es))),
                    t
                );
            }),
            new ve()),
        ys =
            ((m.getMaximumScale = function (e) {
                return m.getScale(e, _s), ve.maximumComponent(_s);
            }),
            new ve()),
        gs =
            ((m.setRotation = function (e, t, n) {
                e = m.getScale(e, ys);
                return (
                    (n[0] = t[0] * e.x),
                    (n[1] = t[1] * e.x),
                    (n[2] = t[2] * e.y),
                    (n[3] = t[3] * e.y),
                    n
                );
            }),
            new ve()),
        t =
            ((m.getRotation = function (e, t) {
                var n = m.getScale(e, gs);
                return (
                    (t[0] = e[0] / n.x),
                    (t[1] = e[1] / n.x),
                    (t[2] = e[2] / n.y),
                    (t[3] = e[3] / n.y),
                    t
                );
            }),
            (m.multiply = function (e, t, n) {
                var r = e[0] * t[0] + e[2] * t[1],
                    o = e[0] * t[2] + e[2] * t[3],
                    i = e[1] * t[0] + e[3] * t[1],
                    e = e[1] * t[2] + e[3] * t[3];
                return (n[0] = r), (n[1] = i), (n[2] = o), (n[3] = e), n;
            }),
            (m.add = function (e, t, n) {
                return (
                    (n[0] = e[0] + t[0]),
                    (n[1] = e[1] + t[1]),
                    (n[2] = e[2] + t[2]),
                    (n[3] = e[3] + t[3]),
                    n
                );
            }),
            (m.subtract = function (e, t, n) {
                return (
                    (n[0] = e[0] - t[0]),
                    (n[1] = e[1] - t[1]),
                    (n[2] = e[2] - t[2]),
                    (n[3] = e[3] - t[3]),
                    n
                );
            }),
            (m.multiplyByVector = function (e, t, n) {
                var r = e[0] * t.x + e[2] * t.y,
                    e = e[1] * t.x + e[3] * t.y;
                return (n.x = r), (n.y = e), n;
            }),
            (m.multiplyByScalar = function (e, t, n) {
                return (
                    (n[0] = e[0] * t),
                    (n[1] = e[1] * t),
                    (n[2] = e[2] * t),
                    (n[3] = e[3] * t),
                    n
                );
            }),
            (m.multiplyByScale = function (e, t, n) {
                return (
                    (n[0] = e[0] * t.x),
                    (n[1] = e[1] * t.x),
                    (n[2] = e[2] * t.y),
                    (n[3] = e[3] * t.y),
                    n
                );
            }),
            (m.multiplyByUniformScale = function (e, t, n) {
                return (
                    (n[0] = e[0] * t),
                    (n[1] = e[1] * t),
                    (n[2] = e[2] * t),
                    (n[3] = e[3] * t),
                    n
                );
            }),
            (m.negate = function (e, t) {
                return (
                    (t[0] = -e[0]),
                    (t[1] = -e[1]),
                    (t[2] = -e[2]),
                    (t[3] = -e[3]),
                    t
                );
            }),
            (m.transpose = function (e, t) {
                var n = e[0],
                    r = e[2],
                    o = e[1],
                    e = e[3];
                return (t[0] = n), (t[1] = r), (t[2] = o), (t[3] = e), t;
            }),
            (m.abs = function (e, t) {
                return (
                    (t[0] = Math.abs(e[0])),
                    (t[1] = Math.abs(e[1])),
                    (t[2] = Math.abs(e[2])),
                    (t[3] = Math.abs(e[3])),
                    t
                );
            }),
            (m.equals = function (e, t) {
                return (
                    e === t ||
                    (ge.defined(e) &&
                        ge.defined(t) &&
                        e[0] === t[0] &&
                        e[1] === t[1] &&
                        e[2] === t[2] &&
                        e[3] === t[3])
                );
            }),
            (m.equalsArray = function (e, t, n) {
                return (
                    e[0] === t[n] &&
                    e[1] === t[n + 1] &&
                    e[2] === t[n + 2] &&
                    e[3] === t[n + 3]
                );
            }),
            (m.equalsEpsilon = function (e, t, n) {
                return (
                    (n = ge.defaultValue(n, 0)),
                    e === t ||
                        (ge.defined(e) &&
                            ge.defined(t) &&
                            Math.abs(e[0] - t[0]) <= n &&
                            Math.abs(e[1] - t[1]) <= n &&
                            Math.abs(e[2] - t[2]) <= n &&
                            Math.abs(e[3] - t[3]) <= n)
                );
            }),
            (m.IDENTITY = Object.freeze(new m(1, 0, 0, 1))),
            (m.ZERO = Object.freeze(new m(0, 0, 0, 0))),
            (m.COLUMN0ROW0 = 0),
            (m.COLUMN0ROW1 = 1),
            (m.COLUMN1ROW0 = 2),
            (m.COLUMN1ROW1 = 3),
            Object.defineProperties(m.prototype, {
                length: {
                    get: function () {
                        return m.packedLength;
                    },
                },
            }),
            (m.prototype.clone = function (e) {
                return m.clone(this, e);
            }),
            (m.prototype.equals = function (e) {
                return m.equals(this, e);
            }),
            (m.prototype.equalsEpsilon = function (e, t) {
                return m.equalsEpsilon(this, e, t);
            }),
            (m.prototype.toString = function () {
                return (
                    `(${this[0]}, ${this[2]})
` + `(${this[1]}, ${this[3]})`
                );
            }),
            {
                SCALAR: "SCALAR",
                VEC2: "VEC2",
                VEC3: "VEC3",
                VEC4: "VEC4",
                MAT2: "MAT2",
                MAT3: "MAT3",
                MAT4: "MAT4",
            });
    (t.getMathType = function (e) {
        switch (e) {
            case t.SCALAR:
                return Number;
            case t.VEC2:
                return ve;
            case t.VEC3:
                return Re;
            case t.VEC4:
                return q;
            case t.MAT2:
                return m;
            case t.MAT3:
                return B;
            case t.MAT4:
                return we;
        }
    }),
        (t.getNumberOfComponents = function (e) {
            switch (e) {
                case t.SCALAR:
                    return 1;
                case t.VEC2:
                    return 2;
                case t.VEC3:
                    return 3;
                case t.VEC4:
                case t.MAT2:
                    return 4;
                case t.MAT3:
                    return 9;
                case t.MAT4:
                    return 16;
            }
        }),
        (t.getAttributeLocationCount = function (e) {
            switch (e) {
                case t.SCALAR:
                case t.VEC2:
                case t.VEC3:
                case t.VEC4:
                    return 1;
                case t.MAT2:
                    return 2;
                case t.MAT3:
                    return 3;
                case t.MAT4:
                    return 4;
            }
        }),
        (t.getGlslType = function (e) {
            switch (e) {
                case t.SCALAR:
                    return "float";
                case t.VEC2:
                    return "vec2";
                case t.VEC3:
                    return "vec3";
                case t.VEC4:
                    return "vec4";
                case t.MAT2:
                    return "mat2";
                case t.MAT3:
                    return "mat3";
                case t.MAT4:
                    return "mat4";
            }
        });
    var Ts = Object.freeze(t);
    const E = {
            octEncodeInRange: function (e, t, n) {
                var r;
                return (
                    (n.x =
                        e.x / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z))),
                    (n.y =
                        e.y / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z))),
                    e.z < 0 &&
                        ((e = n.x),
                        (r = n.y),
                        (n.x = (1 - Math.abs(r)) * Te.signNotZero(e)),
                        (n.y = (1 - Math.abs(e)) * Te.signNotZero(r))),
                    (n.x = Te.toSNorm(n.x, t)),
                    (n.y = Te.toSNorm(n.y, t)),
                    n
                );
            },
            octEncode: function (e, t) {
                return E.octEncodeInRange(e, 255, t);
            },
        },
        Rs = new ve(),
        As = new Uint8Array(1);
    function Ss(e) {
        return (As[0] = e), As[0];
    }
    (E.octEncodeToCartesian4 = function (e, t) {
        return (
            E.octEncodeInRange(e, 65535, Rs),
            (t.x = Ss(Rs.x * (1 / 256))),
            (t.y = Ss(Rs.x)),
            (t.z = Ss(Rs.y * (1 / 256))),
            (t.w = Ss(Rs.y)),
            t
        );
    }),
        (E.octDecodeInRange = function (e, t, n, r) {
            return (
                (r.x = Te.fromSNorm(e, n)),
                (r.y = Te.fromSNorm(t, n)),
                (r.z = 1 - (Math.abs(r.x) + Math.abs(r.y))),
                r.z < 0 &&
                    ((e = r.x),
                    (r.x = (1 - Math.abs(r.y)) * Te.signNotZero(e)),
                    (r.y = (1 - Math.abs(e)) * Te.signNotZero(r.y))),
                Re.normalize(r, r)
            );
        }),
        (E.octDecode = function (e, t, n) {
            return E.octDecodeInRange(e, t, 255, n);
        }),
        (E.octDecodeFromCartesian4 = function (e, t) {
            var n = 256 * e.x + e.y,
                e = 256 * e.z + e.w;
            return E.octDecodeInRange(n, e, 65535, t);
        }),
        (E.octPackFloat = function (e) {
            return 256 * e.x + e.y;
        });
    const ws = new ve();
    function Is(e) {
        return (e >> 1) ^ -(1 & e);
    }
    (E.octEncodeFloat = function (e) {
        return E.octEncode(e, ws), E.octPackFloat(ws);
    }),
        (E.octDecodeFloat = function (e, t) {
            var e = e / 256,
                n = Math.floor(e),
                e = 256 * (e - n);
            return E.octDecode(n, e, t);
        }),
        (E.octPack = function (e, t, n, r) {
            (e = E.octEncodeFloat(e)),
                (t = E.octEncodeFloat(t)),
                (n = E.octEncode(n, ws));
            return (r.x = 65536 * n.x + e), (r.y = 65536 * n.y + t), r;
        }),
        (E.octUnpack = function (e, t, n, r) {
            var o = e.x / 65536,
                i = Math.floor(o),
                a = 65536 * (o - i),
                o = e.y / 65536,
                e = Math.floor(o),
                o = 65536 * (o - e);
            E.octDecodeFloat(a, t),
                E.octDecodeFloat(o, n),
                E.octDecode(i, e, r);
        }),
        (E.compressTextureCoordinates = function (e) {
            return 4096 * ((4095 * e.x) | 0) + ((4095 * e.y) | 0);
        }),
        (E.decompressTextureCoordinates = function (e, t) {
            var n = Math.floor(e / 4096);
            return (t.x = n / 4095), (t.y = (e - 4096 * n) / 4095), t;
        }),
        (E.zigZagDeltaDecode = function (t, n, r) {
            var o = t.length;
            let i = 0,
                a = 0,
                s = 0;
            for (let e = 0; e < o; ++e)
                (i += Is(t[e])),
                    (a += Is(n[e])),
                    (t[e] = i),
                    (n[e] = a),
                    ge.defined(r) && ((s += Is(r[e])), (r[e] = s));
        }),
        (E.dequantize = function (n, e, t, r) {
            var o = Ts.getNumberOfComponents(t);
            let i;
            switch (e) {
                case hs.BYTE:
                    i = 127;
                    break;
                case hs.UNSIGNED_BYTE:
                    i = 255;
                    break;
                case hs.SHORT:
                    i = 32767;
                    break;
                case hs.UNSIGNED_SHORT:
                    i = 65535;
                    break;
                case hs.INT:
                    i = 2147483647;
                    break;
                case hs.UNSIGNED_INT:
                    i = 4294967295;
            }
            const a = new Float32Array(r * o);
            for (let t = 0; t < r; t++)
                for (let e = 0; e < o; e++) {
                    var s = t * o + e;
                    a[s] = Math.max(n[s] / i, -1);
                }
            return a;
        }),
        (E.decodeRGB565 = function (t, n) {
            var r = t.length;
            ge.defined(n) || (n = new Float32Array(3 * r));
            for (let e = 0; e < r; e++) {
                var o = t[e],
                    i = (o >> 5) & 63,
                    a = 31 & o,
                    s = 3 * e;
                (n[s] = (1 / 31) * (o >> 11)),
                    (n[1 + s] = (1 / 63) * i),
                    (n[2 + s] = (1 / 31) * a);
            }
            return n;
        });
    const vs = {
            getHeight: function (e, t, n) {
                return (e - n) * t + n;
            },
        },
        Os = new Re();
    vs.getPosition = function (e, t, n, r, o) {
        (e = t.cartesianToCartographic(e, Os)),
            (n = vs.getHeight(e.height, n, r));
        return Re.fromRadians(e.longitude, e.latitude, n, t, o);
    };
    var Ns = Object.freeze({ NONE: 0, BITS12: 1 });
    const xs = new Re(),
        Ms = new Re(),
        Ps = new ve(),
        bs = new we(),
        Cs = new we(),
        Us = Math.pow(2, 12);
    function Ds(e, t, n, r, o, i, a, s, u, c) {
        let l = Ns.NONE,
            d,
            f;
        if (ge.defined(t) && ge.defined(n) && ge.defined(r) && ge.defined(o)) {
            var h = t.minimum,
                t = t.maximum,
                t = Re.subtract(t, h, Ms),
                p = r - n,
                p = Math.max(Re.maximumComponent(t), p),
                p =
                    ((l = p < Us - 1 ? Ns.BITS12 : Ns.NONE),
                    (d = we.inverseTransformation(o, new we())),
                    Re.negate(h, xs));
            we.multiply(we.fromTranslation(p, bs), d, d);
            const m = xs;
            (m.x = 1 / t.x),
                (m.y = 1 / t.y),
                (m.z = 1 / t.z),
                we.multiply(we.fromScale(m, bs), d, d),
                (f = we.clone(o)),
                we.setTranslation(f, Re.ZERO, f),
                (o = we.clone(o, new we()));
            (p = we.fromTranslation(h, bs)),
                (h = we.fromScale(t, Cs)),
                (t = we.multiply(p, h, bs));
            we.multiply(o, t, o), we.multiply(f, t, f);
        }
        (this.quantization = l),
            (this.minimumHeight = n),
            (this.maximumHeight = r),
            (this.center = Re.clone(e)),
            (this.toScaledENU = d),
            (this.fromScaledENU = o),
            (this.matrix = f),
            (this.hasVertexNormals = i),
            (this.hasWebMercatorT = ge.defaultValue(a, !1)),
            (this.hasGeodeticSurfaceNormals = ge.defaultValue(s, !1)),
            (this.exaggeration = ge.defaultValue(u, 1)),
            (this.exaggerationRelativeHeight = ge.defaultValue(c, 0)),
            (this.stride = 0),
            (this._offsetGeodeticSurfaceNormal = 0),
            (this._offsetVertexNormal = 0),
            this._calculateStrideAndOffsets();
    }
    Ds.prototype.encode = function (e, t, n, r, o, i, a, s) {
        var u,
            c,
            l,
            d = r.x,
            r = r.y;
        return (
            this.quantization === Ns.BITS12
                ? (((n = we.multiplyByPoint(this.toScaledENU, n, xs)).x =
                      Te.clamp(n.x, 0, 1)),
                  (n.y = Te.clamp(n.y, 0, 1)),
                  (n.z = Te.clamp(n.z, 0, 1)),
                  (u = this.maximumHeight - this.minimumHeight),
                  (u = Te.clamp((o - this.minimumHeight) / u, 0, 1)),
                  ve.fromElements(n.x, n.y, Ps),
                  (l = E.compressTextureCoordinates(Ps)),
                  ve.fromElements(n.z, u, Ps),
                  (u = E.compressTextureCoordinates(Ps)),
                  ve.fromElements(d, r, Ps),
                  (c = E.compressTextureCoordinates(Ps)),
                  (e[t++] = l),
                  (e[t++] = u),
                  (e[t++] = c),
                  this.hasWebMercatorT &&
                      (ve.fromElements(a, 0, Ps),
                      (l = E.compressTextureCoordinates(Ps)),
                      (e[t++] = l)))
                : (Re.subtract(n, this.center, xs),
                  (e[t++] = xs.x),
                  (e[t++] = xs.y),
                  (e[t++] = xs.z),
                  (e[t++] = o),
                  (e[t++] = d),
                  (e[t++] = r),
                  this.hasWebMercatorT && (e[t++] = a)),
            this.hasVertexNormals && (e[t++] = E.octPackFloat(i)),
            this.hasGeodeticSurfaceNormals &&
                ((e[t++] = s.x), (e[t++] = s.y), (e[t++] = s.z)),
            t
        );
    };
    const zs = new Re(),
        Fs = new Re(),
        Ls =
            ((Ds.prototype.addGeodeticSurfaceNormals = function (n, r, e) {
                if (!this.hasGeodeticSurfaceNormals) {
                    var o = this.stride,
                        i = n.length / o,
                        a =
                            ((this.hasGeodeticSurfaceNormals = !0),
                            this._calculateStrideAndOffsets(),
                            this.stride);
                    for (let t = 0; t < i; t++) {
                        for (let e = 0; e < o; e++) {
                            var s = t * o + e;
                            r[t * a + e] = n[s];
                        }
                        var u = this.decodePosition(r, t, zs),
                            u = e.geodeticSurfaceNormal(u, Fs),
                            c = t * a + this._offsetGeodeticSurfaceNormal;
                        (r[c] = u.x), (r[c + 1] = u.y), (r[c + 2] = u.z);
                    }
                }
            }),
            (Ds.prototype.removeGeodeticSurfaceNormals = function (n, r) {
                if (this.hasGeodeticSurfaceNormals) {
                    var o = this.stride,
                        e = n.length / o,
                        i =
                            ((this.hasGeodeticSurfaceNormals = !1),
                            this._calculateStrideAndOffsets(),
                            this.stride);
                    for (let t = 0; t < e; t++)
                        for (let e = 0; e < i; e++) {
                            var a = t * o + e;
                            r[t * i + e] = n[a];
                        }
                }
            }),
            (Ds.prototype.decodePosition = function (e, t, n) {
                var r;
                return (
                    ge.defined(n) || (n = new Re()),
                    (t *= this.stride),
                    this.quantization === Ns.BITS12
                        ? ((r = E.decompressTextureCoordinates(e[t], Ps)),
                          (n.x = r.x),
                          (n.y = r.y),
                          (r = E.decompressTextureCoordinates(e[t + 1], Ps)),
                          (n.z = r.x),
                          we.multiplyByPoint(this.fromScaledENU, n, n))
                        : ((n.x = e[t]),
                          (n.y = e[t + 1]),
                          (n.z = e[t + 2]),
                          Re.add(n, this.center, n))
                );
            }),
            (Ds.prototype.getExaggeratedPosition = function (e, t, n) {
                n = this.decodePosition(e, t, n);
                var r,
                    o = this.exaggeration,
                    i = this.exaggerationRelativeHeight;
                return (
                    1 !== o &&
                        this.hasGeodeticSurfaceNormals &&
                        ((r = this.decodeGeodeticSurfaceNormal(e, t, Fs)),
                        (e = this.decodeHeight(e, t)),
                        (t = vs.getHeight(e, o, i) - e),
                        (n.x += r.x * t),
                        (n.y += r.y * t),
                        (n.z += r.z * t)),
                    n
                );
            }),
            (Ds.prototype.decodeTextureCoordinates = function (e, t, n) {
                return (
                    ge.defined(n) || (n = new ve()),
                    (t *= this.stride),
                    this.quantization === Ns.BITS12
                        ? E.decompressTextureCoordinates(e[t + 2], n)
                        : ve.fromElements(e[t + 4], e[t + 5], n)
                );
            }),
            (Ds.prototype.decodeHeight = function (e, t) {
                return (
                    (t *= this.stride),
                    this.quantization === Ns.BITS12
                        ? E.decompressTextureCoordinates(e[t + 1], Ps).y *
                              (this.maximumHeight - this.minimumHeight) +
                          this.minimumHeight
                        : e[t + 3]
                );
            }),
            (Ds.prototype.decodeWebMercatorT = function (e, t) {
                return (
                    (t *= this.stride),
                    this.quantization === Ns.BITS12
                        ? E.decompressTextureCoordinates(e[t + 3], Ps).x
                        : e[t + 6]
                );
            }),
            (Ds.prototype.getOctEncodedNormal = function (e, t, n) {
                (e = e[(t = t * this.stride + this._offsetVertexNormal)] / 256),
                    (t = Math.floor(e));
                return ve.fromElements(t, 256 * (e - t), n);
            }),
            (Ds.prototype.decodeGeodeticSurfaceNormal = function (e, t, n) {
                return (
                    (t = t * this.stride + this._offsetGeodeticSurfaceNormal),
                    (n.x = e[t]),
                    (n.y = e[t + 1]),
                    (n.z = e[t + 2]),
                    n
                );
            }),
            (Ds.prototype._calculateStrideAndOffsets = function () {
                let e = 0;
                this.quantization === Ns.BITS12 ? (e += 3) : (e += 6),
                    this.hasWebMercatorT && (e += 1),
                    this.hasVertexNormals &&
                        ((this._offsetVertexNormal = e), (e += 1)),
                    this.hasGeodeticSurfaceNormals &&
                        ((this._offsetGeodeticSurfaceNormal = e), (e += 3)),
                    (this.stride = e);
            }),
            {
                position3DAndHeight: 0,
                textureCoordAndEncodedNormals: 1,
                geodeticSurfaceNormal: 2,
            }),
        Bs = { compressed0: 0, compressed1: 1, geodeticSurfaceNormal: 2 };
    function qs(e) {
        (this._ellipsoid = ge.defaultValue(e, S.WGS84)),
            (this._semimajorAxis = this._ellipsoid.maximumRadius),
            (this._oneOverSemimajorAxis = 1 / this._semimajorAxis);
    }
    (Ds.prototype.getAttributes = function (n) {
        const r = hs.FLOAT,
            o = hs.getSizeInBytes(r),
            i = this.stride * o;
        let a = 0;
        const s = [];
        function e(e, t) {
            s.push({
                index: e,
                vertexBuffer: n,
                componentDatatype: r,
                componentsPerAttribute: t,
                offsetInBytes: a,
                strideInBytes: i,
            }),
                (a += t * o);
        }
        var t, u;
        return (
            this.quantization === Ns.NONE
                ? (e(Ls.position3DAndHeight, 4),
                  (t = 2),
                  (t =
                      (t += this.hasWebMercatorT ? 1 : 0) +
                      (this.hasVertexNormals ? 1 : 0)),
                  e(Ls.textureCoordAndEncodedNormals, t),
                  this.hasGeodeticSurfaceNormals &&
                      e(Ls.geodeticSurfaceNormal, 3))
                : ((t = this.hasWebMercatorT || this.hasVertexNormals),
                  (u = this.hasWebMercatorT && this.hasVertexNormals),
                  e(Bs.compressed0, t ? 4 : 3),
                  u && e(Bs.compressed1, 1),
                  this.hasGeodeticSurfaceNormals &&
                      e(Bs.geodeticSurfaceNormal, 3)),
            s
        );
    }),
        (Ds.prototype.getAttributeLocations = function () {
            return this.quantization === Ns.NONE ? Ls : Bs;
        }),
        (Ds.clone = function (e, t) {
            if (ge.defined(e))
                return (
                    ((t = ge.defined(t) ? t : new Ds()).quantization =
                        e.quantization),
                    (t.minimumHeight = e.minimumHeight),
                    (t.maximumHeight = e.maximumHeight),
                    (t.center = Re.clone(e.center)),
                    (t.toScaledENU = we.clone(e.toScaledENU)),
                    (t.fromScaledENU = we.clone(e.fromScaledENU)),
                    (t.matrix = we.clone(e.matrix)),
                    (t.hasVertexNormals = e.hasVertexNormals),
                    (t.hasWebMercatorT = e.hasWebMercatorT),
                    (t.hasGeodeticSurfaceNormals = e.hasGeodeticSurfaceNormals),
                    (t.exaggeration = e.exaggeration),
                    (t.exaggerationRelativeHeight =
                        e.exaggerationRelativeHeight),
                    t._calculateStrideAndOffsets(),
                    t
                );
        }),
        Object.defineProperties(qs.prototype, {
            ellipsoid: {
                get: function () {
                    return this._ellipsoid;
                },
            },
        }),
        (qs.mercatorAngleToGeodeticLatitude = function (e) {
            return Te.PI_OVER_TWO - 2 * Math.atan(Math.exp(-e));
        }),
        (qs.geodeticLatitudeToMercatorAngle = function (e) {
            qs.MaximumLatitude < e
                ? (e = qs.MaximumLatitude)
                : e < -qs.MaximumLatitude && (e = -qs.MaximumLatitude);
            e = Math.sin(e);
            return 0.5 * Math.log((1 + e) / (1 - e));
        }),
        (qs.MaximumLatitude = qs.mercatorAngleToGeodeticLatitude(Math.PI)),
        (qs.prototype.project = function (e, t) {
            var n = this._semimajorAxis,
                r = e.longitude * n,
                n = qs.geodeticLatitudeToMercatorAngle(e.latitude) * n,
                e = e.height;
            return ge.defined(t)
                ? ((t.x = r), (t.y = n), (t.z = e), t)
                : new Re(r, n, e);
        }),
        (qs.prototype.unproject = function (e, t) {
            var n = this._oneOverSemimajorAxis,
                r = e.x * n,
                n = qs.mercatorAngleToGeodeticLatitude(e.y * n),
                e = e.z;
            return ge.defined(t)
                ? ((t.longitude = r), (t.latitude = n), (t.height = e), t)
                : new Se(r, n, e);
        });
    var Vs = Uint16Array.BYTES_PER_ELEMENT,
        ks = Int32Array.BYTES_PER_ELEMENT,
        Gs = Uint32Array.BYTES_PER_ELEMENT,
        Ws = Float32Array.BYTES_PER_ELEMENT,
        Hs = Float64Array.BYTES_PER_ELEMENT;
    function Xs(e, t, n) {
        n = ge.defaultValue(n, Te);
        for (var r = e.length, o = 0; o < r; ++o)
            if (n.equalsEpsilon(e[o], t, Te.EPSILON12)) return o;
        return -1;
    }
    var js = new Se(),
        Ys = new Re(),
        Qs = new Re(),
        Zs = new Re(),
        $s = new we();
    function Ks(e, t, n, r, o, i, a, s, u, c, l) {
        for (var d = s.length, f = 0; f < d; ++f) {
            var h = s[f],
                p = h.cartographic,
                m = h.index,
                E = e.length,
                _ = p.longitude,
                y = p.latitude,
                y = Te.clamp(y, -Te.PI_OVER_TWO, Te.PI_OVER_TWO),
                p = p.height - a.skirtHeight,
                _ =
                    ((a.hMin = Math.min(a.hMin, p)),
                    Se.fromRadians(_, y, p, js),
                    c && (js.longitude += u),
                    c
                        ? f === d - 1
                            ? (js.latitude += l)
                            : 0 === f && (js.latitude -= l)
                        : (js.latitude += u),
                    a.ellipsoid.cartographicToCartesian(js)),
                y =
                    (e.push(_),
                    t.push(p),
                    n.push(ve.clone(n[m])),
                    0 < r.length && r.push(r[m]),
                    0 < o.length && o.push(o[m]),
                    we.multiplyByPoint(a.toENU, _, Ys),
                    a.minimum),
                p = a.maximum,
                _ =
                    (Re.minimumByComponent(Ys, y, y),
                    Re.maximumByComponent(Ys, p, p),
                    a.lastBorderPoint);
            ge.defined(_) && ((y = _.index), i.push(y, E - 1, E, E, m, y)),
                (a.lastBorderPoint = h);
        }
    }
    return ge.createTaskProcessorWorker(function (e, t) {
        (e.ellipsoid = S.clone(e.ellipsoid)),
            (e.rectangle = w.clone(e.rectangle));
        var n = (e = (function (e, t, n, r, o, z, F, i, a, L, B) {
                var s, u, c, l;
                o = ge.defined(r)
                    ? ((s = r.west),
                      (u = r.south),
                      (c = r.east),
                      (l = r.north),
                      (U = r.width),
                      r.height)
                    : ((s = Te.toRadians(o.west)),
                      (u = Te.toRadians(o.south)),
                      (c = Te.toRadians(o.east)),
                      (l = Te.toRadians(o.north)),
                      (U = Te.toRadians(r.width)),
                      Te.toRadians(r.height));
                var q,
                    V,
                    k = [u, l],
                    G = [s, c],
                    W = Oe.eastNorthUpToFixedFrame(t, n),
                    H = we.inverseTransformation(W, $s);
                a &&
                    ((q = qs.geodeticLatitudeToMercatorAngle(u)),
                    (V = 1 / (qs.geodeticLatitudeToMercatorAngle(l) - q)));
                var X,
                    d,
                    j = 1 !== z,
                    f = new DataView(e),
                    h = Number.POSITIVE_INFINITY,
                    p = Number.NEGATIVE_INFINITY,
                    m = Qs,
                    E =
                        ((m.x = Number.POSITIVE_INFINITY),
                        (m.y = Number.POSITIVE_INFINITY),
                        (m.z = Number.POSITIVE_INFINITY),
                        Zs),
                    _ =
                        ((E.x = Number.NEGATIVE_INFINITY),
                        (E.y = Number.NEGATIVE_INFINITY),
                        (E.z = Number.NEGATIVE_INFINITY),
                        0),
                    y = 0,
                    Y = 0;
                for (d = 0; d < 4; ++d) {
                    var g = _,
                        T =
                            ((X = f.getUint32(g, !0)),
                            (g += Gs),
                            Te.toRadians(180 * f.getFloat64(g, !0))),
                        T =
                            ((g += Hs),
                            -1 === Xs(G, T) && G.push(T),
                            Te.toRadians(180 * f.getFloat64(g, !0))),
                        T =
                            ((g += Hs),
                            -1 === Xs(k, T) && k.push(T),
                            (g += 2 * Hs),
                            f.getInt32(g, !0));
                    (g += ks),
                        (y += T),
                        (T = f.getInt32(g, !0)),
                        (Y += 3 * T),
                        (_ += X + Gs);
                }
                var Q = [],
                    Z = [],
                    R = new Array(y),
                    A = new Array(y),
                    S = new Array(y),
                    w = a ? new Array(y) : [],
                    I = j ? new Array(y) : [],
                    v = new Array(Y),
                    O = [],
                    $ = [],
                    K = [],
                    N = [],
                    x = 0,
                    J = 0;
                for (d = _ = 0; d < 4; ++d) {
                    X = f.getUint32(_, !0);
                    for (
                        var ee = (_ += Gs),
                            te = Te.toRadians(180 * f.getFloat64(_, !0)),
                            ne =
                                ((_ += Hs),
                                Te.toRadians(180 * f.getFloat64(_, !0))),
                            re =
                                ((_ += Hs),
                                Te.toRadians(180 * f.getFloat64(_, !0))),
                            oe = 0.5 * re,
                            ie =
                                ((_ += Hs),
                                Te.toRadians(180 * f.getFloat64(_, !0))),
                            ae = 0.5 * ie,
                            se = ((_ += Hs), f.getInt32(_, !0)),
                            ue = ((_ += ks), f.getInt32(_, !0)),
                            ce = ((_ = _ + ks + ks), new Array(se)),
                            le = 0;
                        le < se;
                        ++le
                    ) {
                        var M = te + f.getUint8(_++) * re,
                            P = ((js.longitude = M), ne + f.getUint8(_++) * ie),
                            b = ((js.latitude = P), f.getFloat32(_, !0));
                        if (
                            ((_ += Ws),
                            0 !== (b = Number.isFinite(b) ? b : 0) &&
                                b < B &&
                                (b *= -Math.pow(2, L)),
                            (b *= 6371010),
                            (js.height = b),
                            -1 !== Xs(G, M) || -1 !== Xs(k, P))
                        ) {
                            var C = Xs(Q, js, Se);
                            if (-1 !== C) {
                                ce[le] = Z[C];
                                continue;
                            }
                            Q.push(Se.clone(js)), Z.push(x);
                        }
                        (ce[le] = x),
                            Math.abs(M - s) < oe
                                ? O.push({
                                      index: x,
                                      cartographic: Se.clone(js),
                                  })
                                : Math.abs(M - c) < oe
                                ? K.push({
                                      index: x,
                                      cartographic: Se.clone(js),
                                  })
                                : Math.abs(P - u) < ae
                                ? $.push({
                                      index: x,
                                      cartographic: Se.clone(js),
                                  })
                                : Math.abs(P - l) < ae &&
                                  N.push({
                                      index: x,
                                      cartographic: Se.clone(js),
                                  }),
                            (h = Math.min(b, h)),
                            (p = Math.max(b, p)),
                            (S[x] = b);
                        (C = n.cartographicToCartesian(js)),
                            (b =
                                ((R[x] = C),
                                a &&
                                    (w[x] =
                                        (qs.geodeticLatitudeToMercatorAngle(P) -
                                            q) *
                                        V),
                                j &&
                                    ((b = n.geodeticSurfaceNormal(C)),
                                    (I[x] = b)),
                                we.multiplyByPoint(H, C, Ys),
                                Re.minimumByComponent(Ys, m, m),
                                Re.maximumByComponent(Ys, E, E),
                                (M - s) / (c - s))),
                            (M = ((b = Te.clamp(b, 0, 1)), (P - u) / (l - u)));
                        (M = Te.clamp(M, 0, 1)), (A[x] = new ve(b, M)), ++x;
                    }
                    for (var de = 3 * ue, fe = 0; fe < de; ++fe, ++J)
                        (v[J] = ce[f.getUint16(_, !0)]), (_ += Vs);
                    if (X !== _ - ee) throw new Ce("Invalid terrain tile.");
                }
                (R.length = x),
                    (A.length = x),
                    (S.length = x),
                    a && (w.length = x);
                j && (I.length = x);
                var e = x,
                    he = J,
                    i = {
                        hMin: h,
                        lastBorderPoint: void 0,
                        skirtHeight: i,
                        toENU: H,
                        ellipsoid: n,
                        minimum: m,
                        maximum: E,
                    };
                O.sort(function (e, t) {
                    return t.cartographic.latitude - e.cartographic.latitude;
                }),
                    $.sort(function (e, t) {
                        return (
                            e.cartographic.longitude - t.cartographic.longitude
                        );
                    }),
                    K.sort(function (e, t) {
                        return (
                            e.cartographic.latitude - t.cartographic.latitude
                        );
                    }),
                    N.sort(function (e, t) {
                        return (
                            t.cartographic.longitude - e.cartographic.longitude
                        );
                    });
                Ks(R, S, A, w, I, v, i, O, -1e-5 * U, !0, -1e-5 * o),
                    Ks(R, S, A, w, I, v, i, $, -1e-5 * o, !1),
                    Ks(R, S, A, w, I, v, i, K, 1e-5 * U, !0, 1e-5 * o),
                    Ks(R, S, A, w, I, v, i, N, 1e-5 * o, !1),
                    0 < O.length &&
                        0 < N.length &&
                        ((U = O[0].index),
                        (o = N[N.length - 1].index),
                        (me = R.length - 1),
                        v.push(o, me, e, e, U, o));
                y = R.length;
                var pe,
                    me = Ie.fromPoints(R);
                ge.defined(r) && (pe = Ne.fromRectangle(r, h, p, n));
                for (
                    var U = new Ft(
                            n
                        ).computeHorizonCullingPointPossiblyUnderEllipsoid(
                            t,
                            R,
                            h
                        ),
                        o = new Ae(m, E, t),
                        Ee = new Ds(t, o, i.hMin, p, W, !1, a, j, z, F),
                        _e = new Float32Array(y * Ee.stride),
                        ye = 0,
                        D = 0;
                    D < y;
                    ++D
                )
                    ye = Ee.encode(
                        _e,
                        ye,
                        R[D],
                        A[D],
                        S[D],
                        void 0,
                        w[D],
                        I[D]
                    );
                (r = O.map(function (e) {
                    return e.index;
                }).reverse()),
                    (t = $.map(function (e) {
                        return e.index;
                    }).reverse()),
                    (o = K.map(function (e) {
                        return e.index;
                    }).reverse()),
                    (i = N.map(function (e) {
                        return e.index;
                    }).reverse());
                return (
                    t.unshift(o[o.length - 1]),
                    t.push(r[0]),
                    i.unshift(r[r.length - 1]),
                    i.push(o[0]),
                    {
                        vertices: _e,
                        indices: new Uint16Array(v),
                        maximumHeight: p,
                        minimumHeight: h,
                        encoding: Ee,
                        boundingSphere3D: me,
                        orientedBoundingBox: pe,
                        occludeePointInScaledSpace: U,
                        vertexCountWithoutSkirts: e,
                        indexCountWithoutSkirts: he,
                        westIndicesSouthToNorth: r,
                        southIndicesEastToWest: t,
                        eastIndicesNorthToSouth: o,
                        northIndicesWestToEast: i,
                    }
                );
            })(
                e.buffer,
                e.relativeToCenter,
                e.ellipsoid,
                e.rectangle,
                e.nativeRectangle,
                e.exaggeration,
                e.exaggerationRelativeHeight,
                e.skirtHeight,
                e.includeWebMercatorT,
                e.negativeAltitudeExponentBias,
                e.negativeElevationThreshold
            )).vertices,
            r = (t.push(n.buffer), e.indices);
        return (
            t.push(r.buffer),
            {
                vertices: n.buffer,
                indices: r.buffer,
                numberOfAttributes: e.encoding.stride,
                minimumHeight: e.minimumHeight,
                maximumHeight: e.maximumHeight,
                boundingSphere3D: e.boundingSphere3D,
                orientedBoundingBox: e.orientedBoundingBox,
                occludeePointInScaledSpace: e.occludeePointInScaledSpace,
                encoding: e.encoding,
                vertexCountWithoutSkirts: e.vertexCountWithoutSkirts,
                indexCountWithoutSkirts: e.indexCountWithoutSkirts,
                westIndicesSouthToNorth: e.westIndicesSouthToNorth,
                southIndicesEastToWest: e.southIndicesEastToWest,
                eastIndicesNorthToSouth: e.eastIndicesNorthToSouth,
                northIndicesWestToEast: e.northIndicesWestToEast,
            }
        );
    });
});
