(() => {
    var t = {
        484: function (t) {
            t.exports = function () {
                "use strict";
                var t = 1e3, e = 6e4, n = 36e5, i = "millisecond", o = "second", r = "minute", s = "hour", a = "day",
                    c = "week", u = "month", l = "quarter", d = "year", f = "date", p = "Invalid Date",
                    h = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
                    m = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
                        name: "en",
                        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
                        ordinal: function (t) {
                            var e = ["th", "st", "nd", "rd"], n = t % 100;
                            return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]"
                        }
                    }, v = function (t, e, n) {
                        var i = String(t);
                        return !i || i.length >= e ? t : "" + Array(e + 1 - i.length).join(n) + t
                    }, b = {
                        s: v, z: function (t) {
                            var e = -t.utcOffset(), n = Math.abs(e), i = Math.floor(n / 60), o = n % 60;
                            return (e <= 0 ? "+" : "-") + v(i, 2, "0") + ":" + v(o, 2, "0")
                        }, m: function t(e, n) {
                            if (e.date() < n.date()) return -t(n, e);
                            var i = 12 * (n.year() - e.year()) + (n.month() - e.month()), o = e.clone().add(i, u),
                                r = n - o < 0, s = e.clone().add(i + (r ? -1 : 1), u);
                            return +(-(i + (n - o) / (r ? o - s : s - o)) || 0)
                        }, a: function (t) {
                            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
                        }, p: function (t) {
                            return {
                                M: u,
                                y: d,
                                w: c,
                                d: a,
                                D: f,
                                h: s,
                                m: r,
                                s: o,
                                ms: i,
                                Q: l
                            }[t] || String(t || "").toLowerCase().replace(/s$/, "")
                        }, u: function (t) {
                            return void 0 === t
                        }
                    }, y = "en", w = {};
                w[y] = g;
                var _ = function (t) {
                    return t instanceof k
                }, x = function t(e, n, i) {
                    var o;
                    if (!e) return y;
                    if ("string" == typeof e) {
                        var r = e.toLowerCase();
                        w[r] && (o = r), n && (w[r] = n, o = r);
                        var s = e.split("-");
                        if (!o && s.length > 1) return t(s[0])
                    } else {
                        var a = e.name;
                        w[a] = e, o = a
                    }
                    return !i && o && (y = o), o || !i && y
                }, $ = function (t, e) {
                    if (_(t)) return t.clone();
                    var n = "object" == typeof e ? e : {};
                    return n.date = t, n.args = arguments, new k(n)
                }, O = b;
                O.l = x, O.i = _, O.w = function (t, e) {
                    return $(t, {locale: e.$L, utc: e.$u, x: e.$x, $offset: e.$offset})
                };
                var k = function () {
                    function g(t) {
                        this.$L = x(t.locale, null, !0), this.parse(t)
                    }

                    var v = g.prototype;
                    return v.parse = function (t) {
                        this.$d = function (t) {
                            var e = t.date, n = t.utc;
                            if (null === e) return new Date(NaN);
                            if (O.u(e)) return new Date;
                            if (e instanceof Date) return new Date(e);
                            if ("string" == typeof e && !/Z$/i.test(e)) {
                                var i = e.match(h);
                                if (i) {
                                    var o = i[2] - 1 || 0, r = (i[7] || "0").substring(0, 3);
                                    return n ? new Date(Date.UTC(i[1], o, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, r)) : new Date(i[1], o, i[3] || 1, i[4] || 0, i[5] || 0, i[6] || 0, r)
                                }
                            }
                            return new Date(e)
                        }(t), this.$x = t.x || {}, this.init()
                    }, v.init = function () {
                        var t = this.$d;
                        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds()
                    }, v.$utils = function () {
                        return O
                    }, v.isValid = function () {
                        return !(this.$d.toString() === p)
                    }, v.isSame = function (t, e) {
                        var n = $(t);
                        return this.startOf(e) <= n && n <= this.endOf(e)
                    }, v.isAfter = function (t, e) {
                        return $(t) < this.startOf(e)
                    }, v.isBefore = function (t, e) {
                        return this.endOf(e) < $(t)
                    }, v.$g = function (t, e, n) {
                        return O.u(t) ? this[e] : this.set(n, t)
                    }, v.unix = function () {
                        return Math.floor(this.valueOf() / 1e3)
                    }, v.valueOf = function () {
                        return this.$d.getTime()
                    }, v.startOf = function (t, e) {
                        var n = this, i = !!O.u(e) || e, l = O.p(t), p = function (t, e) {
                            var o = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
                            return i ? o : o.endOf(a)
                        }, h = function (t, e) {
                            return O.w(n.toDate()[t].apply(n.toDate("s"), (i ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n)
                        }, m = this.$W, g = this.$M, v = this.$D, b = "set" + (this.$u ? "UTC" : "");
                        switch (l) {
                            case d:
                                return i ? p(1, 0) : p(31, 11);
                            case u:
                                return i ? p(1, g) : p(0, g + 1);
                            case c:
                                var y = this.$locale().weekStart || 0, w = (m < y ? m + 7 : m) - y;
                                return p(i ? v - w : v + (6 - w), g);
                            case a:
                            case f:
                                return h(b + "Hours", 0);
                            case s:
                                return h(b + "Minutes", 1);
                            case r:
                                return h(b + "Seconds", 2);
                            case o:
                                return h(b + "Milliseconds", 3);
                            default:
                                return this.clone()
                        }
                    }, v.endOf = function (t) {
                        return this.startOf(t, !1)
                    }, v.$set = function (t, e) {
                        var n, c = O.p(t), l = "set" + (this.$u ? "UTC" : ""),
                            p = (n = {}, n[a] = l + "Date", n[f] = l + "Date", n[u] = l + "Month", n[d] = l + "FullYear", n[s] = l + "Hours", n[r] = l + "Minutes", n[o] = l + "Seconds", n[i] = l + "Milliseconds", n)[c],
                            h = c === a ? this.$D + (e - this.$W) : e;
                        if (c === u || c === d) {
                            var m = this.clone().set(f, 1);
                            m.$d[p](h), m.init(), this.$d = m.set(f, Math.min(this.$D, m.daysInMonth())).$d
                        } else p && this.$d[p](h);
                        return this.init(), this
                    }, v.set = function (t, e) {
                        return this.clone().$set(t, e)
                    }, v.get = function (t) {
                        return this[O.p(t)]()
                    }, v.add = function (i, l) {
                        var f, p = this;
                        i = Number(i);
                        var h = O.p(l), m = function (t) {
                            var e = $(p);
                            return O.w(e.date(e.date() + Math.round(t * i)), p)
                        };
                        if (h === u) return this.set(u, this.$M + i);
                        if (h === d) return this.set(d, this.$y + i);
                        if (h === a) return m(1);
                        if (h === c) return m(7);
                        var g = (f = {}, f[r] = e, f[s] = n, f[o] = t, f)[h] || 1, v = this.$d.getTime() + i * g;
                        return O.w(v, this)
                    }, v.subtract = function (t, e) {
                        return this.add(-1 * t, e)
                    }, v.format = function (t) {
                        var e = this, n = this.$locale();
                        if (!this.isValid()) return n.invalidDate || p;
                        var i = t || "YYYY-MM-DDTHH:mm:ssZ", o = O.z(this), r = this.$H, s = this.$m, a = this.$M,
                            c = n.weekdays, u = n.months, l = function (t, n, o, r) {
                                return t && (t[n] || t(e, i)) || o[n].slice(0, r)
                            }, d = function (t) {
                                return O.s(r % 12 || 12, t, "0")
                            }, f = n.meridiem || function (t, e, n) {
                                var i = t < 12 ? "AM" : "PM";
                                return n ? i.toLowerCase() : i
                            }, h = {
                                YY: String(this.$y).slice(-2),
                                YYYY: this.$y,
                                M: a + 1,
                                MM: O.s(a + 1, 2, "0"),
                                MMM: l(n.monthsShort, a, u, 3),
                                MMMM: l(u, a),
                                D: this.$D,
                                DD: O.s(this.$D, 2, "0"),
                                d: String(this.$W),
                                dd: l(n.weekdaysMin, this.$W, c, 2),
                                ddd: l(n.weekdaysShort, this.$W, c, 3),
                                dddd: c[this.$W],
                                H: String(r),
                                HH: O.s(r, 2, "0"),
                                h: d(1),
                                hh: d(2),
                                a: f(r, s, !0),
                                A: f(r, s, !1),
                                m: String(s),
                                mm: O.s(s, 2, "0"),
                                s: String(this.$s),
                                ss: O.s(this.$s, 2, "0"),
                                SSS: O.s(this.$ms, 3, "0"),
                                Z: o
                            };
                        return i.replace(m, (function (t, e) {
                            return e || h[t] || o.replace(":", "")
                        }))
                    }, v.utcOffset = function () {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
                    }, v.diff = function (i, f, p) {
                        var h, m = O.p(f), g = $(i), v = (g.utcOffset() - this.utcOffset()) * e, b = this - g,
                            y = O.m(this, g);
                        return y = (h = {}, h[d] = y / 12, h[u] = y, h[l] = y / 3, h[c] = (b - v) / 6048e5, h[a] = (b - v) / 864e5, h[s] = b / n, h[r] = b / e, h[o] = b / t, h)[m] || b, p ? y : O.a(y)
                    }, v.daysInMonth = function () {
                        return this.endOf(u).$D
                    }, v.$locale = function () {
                        return w[this.$L]
                    }, v.locale = function (t, e) {
                        if (!t) return this.$L;
                        var n = this.clone(), i = x(t, e, !0);
                        return i && (n.$L = i), n
                    }, v.clone = function () {
                        return O.w(this.$d, this)
                    }, v.toDate = function () {
                        return new Date(this.valueOf())
                    }, v.toJSON = function () {
                        return this.isValid() ? this.toISOString() : null
                    }, v.toISOString = function () {
                        return this.$d.toISOString()
                    }, v.toString = function () {
                        return this.$d.toUTCString()
                    }, g
                }(), T = k.prototype;
                return $.prototype = T, [["$ms", i], ["$s", o], ["$m", r], ["$H", s], ["$W", a], ["$M", u], ["$y", d], ["$D", f]].forEach((function (t) {
                    T[t[1]] = function (e) {
                        return this.$g(e, t[0], t[1])
                    }
                })), $.extend = function (t, e) {
                    return t.$i || (t(e, k, $), t.$i = !0), $
                }, $.locale = x, $.isDayjs = _, $.unix = function (t) {
                    return $(1e3 * t)
                }, $.en = w[y], $.Ls = w, $.p = {}, $
            }()
        }, 646: function (t) {
            t.exports = function () {
                "use strict";
                var t, e, n = 1e3, i = 6e4, o = 36e5, r = 864e5,
                    s = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
                    a = 31536e6, c = 2592e6,
                    u = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,
                    l = {
                        years: a,
                        months: c,
                        days: r,
                        hours: o,
                        minutes: i,
                        seconds: n,
                        milliseconds: 1,
                        weeks: 6048e5
                    }, d = function (t) {
                        return t instanceof b
                    }, f = function (t, e, n) {
                        return new b(t, n, e.$l)
                    }, p = function (t) {
                        return e.p(t) + "s"
                    }, h = function (t) {
                        return t < 0
                    }, m = function (t) {
                        return h(t) ? Math.ceil(t) : Math.floor(t)
                    }, g = function (t) {
                        return Math.abs(t)
                    }, v = function (t, e) {
                        return t ? h(t) ? {negative: !0, format: "" + g(t) + e} : {
                            negative: !1,
                            format: "" + t + e
                        } : {negative: !1, format: ""}
                    }, b = function () {
                        function h(t, e, n) {
                            var i = this;
                            if (this.$d = {}, this.$l = n, void 0 === t && (this.$ms = 0, this.parseFromMilliseconds()), e) return f(t * l[p(e)], this);
                            if ("number" == typeof t) return this.$ms = t, this.parseFromMilliseconds(), this;
                            if ("object" == typeof t) return Object.keys(t).forEach((function (e) {
                                i.$d[p(e)] = t[e]
                            })), this.calMilliseconds(), this;
                            if ("string" == typeof t) {
                                var o = t.match(u);
                                if (o) {
                                    var r = o.slice(2).map((function (t) {
                                        return null != t ? Number(t) : 0
                                    }));
                                    return this.$d.years = r[0], this.$d.months = r[1], this.$d.weeks = r[2], this.$d.days = r[3], this.$d.hours = r[4], this.$d.minutes = r[5], this.$d.seconds = r[6], this.calMilliseconds(), this
                                }
                            }
                            return this
                        }

                        var g = h.prototype;
                        return g.calMilliseconds = function () {
                            var t = this;
                            this.$ms = Object.keys(this.$d).reduce((function (e, n) {
                                return e + (t.$d[n] || 0) * l[n]
                            }), 0)
                        }, g.parseFromMilliseconds = function () {
                            var t = this.$ms;
                            this.$d.years = m(t / a), t %= a, this.$d.months = m(t / c), t %= c, this.$d.days = m(t / r), t %= r, this.$d.hours = m(t / o), t %= o, this.$d.minutes = m(t / i), t %= i, this.$d.seconds = m(t / n), t %= n, this.$d.milliseconds = t
                        }, g.toISOString = function () {
                            var t = v(this.$d.years, "Y"), e = v(this.$d.months, "M"), n = +this.$d.days || 0;
                            this.$d.weeks && (n += 7 * this.$d.weeks);
                            var i = v(n, "D"), o = v(this.$d.hours, "H"), r = v(this.$d.minutes, "M"),
                                s = this.$d.seconds || 0;
                            this.$d.milliseconds && (s += this.$d.milliseconds / 1e3);
                            var a = v(s, "S"),
                                c = t.negative || e.negative || i.negative || o.negative || r.negative || a.negative,
                                u = o.format || r.format || a.format ? "T" : "",
                                l = (c ? "-" : "") + "P" + t.format + e.format + i.format + u + o.format + r.format + a.format;
                            return "P" === l || "-P" === l ? "P0D" : l
                        }, g.toJSON = function () {
                            return this.toISOString()
                        }, g.format = function (t) {
                            var n = t || "YYYY-MM-DDTHH:mm:ss", i = {
                                Y: this.$d.years,
                                YY: e.s(this.$d.years, 2, "0"),
                                YYYY: e.s(this.$d.years, 4, "0"),
                                M: this.$d.months,
                                MM: e.s(this.$d.months, 2, "0"),
                                D: this.$d.days,
                                DD: e.s(this.$d.days, 2, "0"),
                                H: this.$d.hours,
                                HH: e.s(this.$d.hours, 2, "0"),
                                m: this.$d.minutes,
                                mm: e.s(this.$d.minutes, 2, "0"),
                                s: this.$d.seconds,
                                ss: e.s(this.$d.seconds, 2, "0"),
                                SSS: e.s(this.$d.milliseconds, 3, "0")
                            };
                            return n.replace(s, (function (t, e) {
                                return e || String(i[t])
                            }))
                        }, g.as = function (t) {
                            return this.$ms / l[p(t)]
                        }, g.get = function (t) {
                            var e = this.$ms, n = p(t);
                            return "milliseconds" === n ? e %= 1e3 : e = "weeks" === n ? m(e / l[n]) : this.$d[n], 0 === e ? 0 : e
                        }, g.add = function (t, e, n) {
                            var i;
                            return i = e ? t * l[p(e)] : d(t) ? t.$ms : f(t, this).$ms, f(this.$ms + i * (n ? -1 : 1), this)
                        }, g.subtract = function (t, e) {
                            return this.add(t, e, !0)
                        }, g.locale = function (t) {
                            var e = this.clone();
                            return e.$l = t, e
                        }, g.clone = function () {
                            return f(this.$ms, this)
                        }, g.humanize = function (e) {
                            return t().add(this.$ms, "ms").locale(this.$l).fromNow(!e)
                        }, g.milliseconds = function () {
                            return this.get("milliseconds")
                        }, g.asMilliseconds = function () {
                            return this.as("milliseconds")
                        }, g.seconds = function () {
                            return this.get("seconds")
                        }, g.asSeconds = function () {
                            return this.as("seconds")
                        }, g.minutes = function () {
                            return this.get("minutes")
                        }, g.asMinutes = function () {
                            return this.as("minutes")
                        }, g.hours = function () {
                            return this.get("hours")
                        }, g.asHours = function () {
                            return this.as("hours")
                        }, g.days = function () {
                            return this.get("days")
                        }, g.asDays = function () {
                            return this.as("days")
                        }, g.weeks = function () {
                            return this.get("weeks")
                        }, g.asWeeks = function () {
                            return this.as("weeks")
                        }, g.months = function () {
                            return this.get("months")
                        }, g.asMonths = function () {
                            return this.as("months")
                        }, g.years = function () {
                            return this.get("years")
                        }, g.asYears = function () {
                            return this.as("years")
                        }, h
                    }();
                return function (n, i, o) {
                    t = o, e = o().$utils(), o.duration = function (t, e) {
                        var n = o.locale();
                        return f(t, {$l: n}, e)
                    }, o.isDuration = d;
                    var r = i.prototype.add, s = i.prototype.subtract;
                    i.prototype.add = function (t, e) {
                        return d(t) && (t = t.asMilliseconds()), r.bind(this)(t, e)
                    }, i.prototype.subtract = function (t, e) {
                        return d(t) && (t = t.asMilliseconds()), s.bind(this)(t, e)
                    }
                }
            }()
        }, 387: function (t) {
            t.exports = function () {
                "use strict";
                var t = {year: 0, month: 1, day: 2, hour: 3, minute: 4, second: 5}, e = {};
                return function (n, i, o) {
                    var r, s = function (t, n, i) {
                        void 0 === i && (i = {});
                        var o = new Date(t), r = function (t, n) {
                            void 0 === n && (n = {});
                            var i = n.timeZoneName || "short", o = t + "|" + i, r = e[o];
                            return r || (r = new Intl.DateTimeFormat("en-US", {
                                hour12: !1,
                                timeZone: t,
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                timeZoneName: i
                            }), e[o] = r), r
                        }(n, i);
                        return r.formatToParts(o)
                    }, a = function (e, n) {
                        for (var i = s(e, n), r = [], a = 0; a < i.length; a += 1) {
                            var c = i[a], u = c.type, l = c.value, d = t[u];
                            d >= 0 && (r[d] = parseInt(l, 10))
                        }
                        var f = r[3], p = 24 === f ? 0 : f,
                            h = r[0] + "-" + r[1] + "-" + r[2] + " " + p + ":" + r[4] + ":" + r[5] + ":000", m = +e;
                        return (o.utc(h).valueOf() - (m -= m % 1e3)) / 6e4
                    }, c = i.prototype;
                    c.tz = function (t, e) {
                        void 0 === t && (t = r);
                        var n = this.utcOffset(), i = this.toDate(), s = i.toLocaleString("en-US", {timeZone: t}),
                            a = Math.round((i - new Date(s)) / 1e3 / 60),
                            c = o(s).$set("millisecond", this.$ms).utcOffset(15 * -Math.round(i.getTimezoneOffset() / 15) - a, !0);
                        if (e) {
                            var u = c.utcOffset();
                            c = c.add(n - u, "minute")
                        }
                        return c.$x.$timezone = t, c
                    }, c.offsetName = function (t) {
                        var e = this.$x.$timezone || o.tz.guess(),
                            n = s(this.valueOf(), e, {timeZoneName: t}).find((function (t) {
                                return "timezonename" === t.type.toLowerCase()
                            }));
                        return n && n.value
                    };
                    var u = c.startOf;
                    c.startOf = function (t, e) {
                        if (!this.$x || !this.$x.$timezone) return u.call(this, t, e);
                        var n = o(this.format("YYYY-MM-DD HH:mm:ss:SSS"));
                        return u.call(n, t, e).tz(this.$x.$timezone, !0)
                    }, o.tz = function (t, e, n) {
                        var i = n && e, s = n || e || r, c = a(+o(), s);
                        if ("string" != typeof t) return o(t).tz(s);
                        var u = function (t, e, n) {
                            var i = t - 60 * e * 1e3, o = a(i, n);
                            if (e === o) return [i, e];
                            var r = a(i -= 60 * (o - e) * 1e3, n);
                            return o === r ? [i, o] : [t - 60 * Math.min(o, r) * 1e3, Math.max(o, r)]
                        }(o.utc(t, i).valueOf(), c, s), l = u[0], d = u[1], f = o(l).utcOffset(d);
                        return f.$x.$timezone = s, f
                    }, o.tz.guess = function () {
                        return Intl.DateTimeFormat().resolvedOptions().timeZone
                    }, o.tz.setDefault = function (t) {
                        r = t
                    }
                }
            }()
        }, 178: function (t) {
            t.exports = function () {
                "use strict";
                var t = "minute", e = /[+-]\d\d(?::?\d\d)?/g, n = /([+-]|\d\d)/g;
                return function (i, o, r) {
                    var s = o.prototype;
                    r.utc = function (t) {
                        return new o({date: t, utc: !0, args: arguments})
                    }, s.utc = function (e) {
                        var n = r(this.toDate(), {locale: this.$L, utc: !0});
                        return e ? n.add(this.utcOffset(), t) : n
                    }, s.local = function () {
                        return r(this.toDate(), {locale: this.$L, utc: !1})
                    };
                    var a = s.parse;
                    s.parse = function (t) {
                        t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), a.call(this, t)
                    };
                    var c = s.init;
                    s.init = function () {
                        if (this.$u) {
                            var t = this.$d;
                            this.$y = t.getUTCFullYear(), this.$M = t.getUTCMonth(), this.$D = t.getUTCDate(), this.$W = t.getUTCDay(), this.$H = t.getUTCHours(), this.$m = t.getUTCMinutes(), this.$s = t.getUTCSeconds(), this.$ms = t.getUTCMilliseconds()
                        } else c.call(this)
                    };
                    var u = s.utcOffset;
                    s.utcOffset = function (i, o) {
                        var r = this.$utils().u;
                        if (r(i)) return this.$u ? 0 : r(this.$offset) ? u.call(this) : this.$offset;
                        if ("string" == typeof i && (i = function (t) {
                            void 0 === t && (t = "");
                            var i = t.match(e);
                            if (!i) return null;
                            var o = ("" + i[0]).match(n) || ["-", 0, 0], r = o[0], s = 60 * +o[1] + +o[2];
                            return 0 === s ? 0 : "+" === r ? s : -s
                        }(i), null === i)) return this;
                        var s = Math.abs(i) <= 16 ? 60 * i : i, a = this;
                        if (o) return a.$offset = s, a.$u = 0 === i, a;
                        if (0 !== i) {
                            var c = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
                            (a = this.local().add(s + c, t)).$offset = s, a.$x.$localOffset = c
                        } else a = this.utc();
                        return a
                    };
                    var l = s.format;
                    s.format = function (t) {
                        var e = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
                        return l.call(this, e)
                    }, s.valueOf = function () {
                        var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
                        return this.$d.valueOf() - 6e4 * t
                    }, s.isUTC = function () {
                        return !!this.$u
                    }, s.toISOString = function () {
                        return this.toDate().toISOString()
                    }, s.toString = function () {
                        return this.toDate().toUTCString()
                    };
                    var d = s.toDate;
                    s.toDate = function (t) {
                        return "s" === t && this.$offset ? r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : d.call(this)
                    };
                    var f = s.diff;
                    s.diff = function (t, e, n) {
                        if (t && this.$u === t.$u) return f.call(this, t, e, n);
                        var i = this.local(), o = r(t).local();
                        return f.call(i, o, e, n)
                    }
                }
            }()
        }
    }, e = {};

    function n(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var r = e[i] = {exports: {}};
        return t[i].call(r.exports, r, r.exports, n), r.exports
    }

    n.n = t => {
        var e = t && t.__esModule ? () => t.default : () => t;
        return n.d(e, {a: e}), e
    }, n.d = (t, e) => {
        for (var i in e) n.o(e, i) && !n.o(t, i) && Object.defineProperty(t, i, {enumerable: !0, get: e[i]})
    }, n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), (() => {
        "use strict";
        var t = n(484), e = n.n(t), i = n(178), o = n.n(i), r = n(646), s = n.n(r), a = n(387), c = n.n(a);
        e().extend(o()), e().extend(s()), e().extend(c());
        const u = e(), l = window.jQuery,
            d = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], f = {
                autocompleteLoading: function (t) {
                    !0 !== t ? l("#input-users").removeClass("ui-autocomplete-loading") : l("#input-users").addClass("ui-autocomplete-loading")
                }, saveLoading: function (t) {
                    t ? (l(".wa-save").addClass("disabled"), l(".wa-save span").addClass("dashicons dashicons-update wa-save-loading")) : (l(".wa-save").removeClass("disabled"), l(".wa-save span").removeClass("dashicons dashicons-update wa-save-loading"))
                }, parseUtcOffset: function (t) {
                    const e = t.split(":");
                    let n, i;
                    return 2 === e.length ? (n = parseInt(e[0]), i = parseInt(e[1])) : (n = parseInt(e[0]), i = 0), -1 !== t.indexOf("-") ? -(60 * Math.abs(n) + i) : 60 * n + i
                }, parseTime: function (t) {
                    const e = (t || "").split(":");
                    if (e.length >= 2) {
                        return {hours: parseInt(e[0], 10), minutes: parseInt(e[1], 10)}
                    }
                    return null
                }, compareTime: function (t, e) {
                    const n = this.parseTime(t), i = this.parseTime(e), o = n.minutes + 60 * n.hours,
                        r = i.minutes + 60 * i.hours;
                    return o === r ? 0 : o > r ? 1 : -1
                }, hasNumber: function (t) {
                    return /\d/.test(t)
                }, calcDiffDuration: function (t, e) {
                    return 1e3 * (3600 * (t.hour - e.hour) + 60 * (t.minute - e.minute))
                }, getBackTime: function (t) {
                    let e;
                    if ("ON" === t.isAlwaysAvailable) return "online";
                    e = this.hasNumber(cat_wa.timezone) ? u().utcOffset(this.parseUtcOffset(cat_wa.timezone)) : u(u()).tz(cat_wa.timezone, !0);
                    const n = d[e.get("day")], i = t.daysOfWeekWorking[n];
                    if ("OFF" === i.isWorkingOnDay) return t.dayOffsText;
                    for (let n = 0; n < i.workHours.length; n++) {
                        const o = e.get("hour") + ":" + e.get("minute"), r = i.workHours[n].startTime,
                            s = i.workHours[n].endTime;
                        if (-1 === this.compareTime(o, r)) {
                            const n = this.parseTime(r), i = this.calcDiffDuration({hour: n.hours, minute: n.minutes}, {
                                hour: e.get("hour"),
                                minute: e.get("minute")
                            }), o = u.duration(i), s = " " + o.get("hours") + ":" + o.get("minutes") + " ";
                            return t.willBeBackText.replace(/\[catwa_time_work\]/gi, s)
                        }
                        if (0 === this.compareTime(o, r) || 0 === this.compareTime(o, s)) return "online";
                        if (1 === this.compareTime(o, r) && -1 === this.compareTime(o, s)) return "online"
                    }
                    return t.dayOffsText
                }
            }, p = f, h = window.jQuery;
        var m = [["sunday", "Sun"], ["monday", "Mon"], ["tuesday", "Tue"], ["wednesday", "Wed"], ["thursday", "Thur"], ["friday", "Fri"], ["saturday", "Sat"]];
        const g = function (t = null) {
                if (null !== t) return Backbone.View.extend({
                    el: t,
                    template: _.template(h("#selectedAccountTemplate").html()),
                    events: {"click a.btn-remove-account": "setDeactive", "click #input-users": "focusInputUser"},
                    initialize: function () {
                        const t = this;
                        this.collection.fetch({
                            reset: !0,
                            data: {action: "cat_wa_load_accounts_ajax", nonce: cat_wa.nonce},
                            type: "POST",
                            beforeSend: function () {
                                p.autocompleteLoading(!0)
                            },
                            success: function () {
                                p.autocompleteLoading(!1), t.registerAutocomplete()
                            },
                            error: function () {
                                console.log("error")
                            }
                        }), this.accountsListView = new (function (t = null) {
                            if (null !== t) return Backbone.View.extend({
                                template: _.template(h(t).html()),
                                initialize: function () {
                                    this.render()
                                },
                                registerSortable() {
                                    void 0 === h("#sortable").sortable("instance") && h("#sortable").sortable({
                                        update: function (t, e) {
                                            const n = h("#sortable").sortable("toArray", {attribute: "data-index"});
                                            h.ajax({
                                                url: cat_wa.url,
                                                type: "POST",
                                                data: {
                                                    action: "cat_wa_set_account_position",
                                                    type: cat_wa.selectedAccounts.attrPosition,
                                                    positions: n,
                                                    nonce: cat_wa.nonce
                                                },
                                                beforeSend: function () {
                                                    p.autocompleteLoading(!0)
                                                }
                                            }).done((function (t) {
                                                p.autocompleteLoading(!1), t.success
                                            }))
                                        }
                                    })
                                },
                                render: function () {
                                    const t = _.sortBy(this.collection.active(), cat_wa.selectedAccounts.attrPosition);
                                    return this.$el.html(this.template({
                                        activeAccounts: t,
                                        daysOfWeek: m
                                    })), this.registerSortable(), this
                                }
                            })
                        }("#accountListTemplate"))({collection: this.collection}), this.listenTo(this.collection, "sync", this.renderAccountList), this.render()
                    },
                    registerAutocomplete: function () {
                        const t = this;
                        h("#input-users").autocomplete({
                            minLength: 0,
                            source: this.collection.deactive(),
                            classes: {"ui-autocomplete": "cat-list-box-select"},
                            select: function (e, n) {
                                return t.collection.get(n.item.accountId).setActive({
                                    onDone: function () {
                                        h("#input-users").autocomplete("option", "source", t.collection.deactive())
                                    }
                                }), !1
                            }
                        }).autocomplete("instance")._renderItem = function (t, e) {
                            const n = new (function (t = null) {
                                if (null !== t) return Backbone.View.extend({
                                    template: _.template(h(t).html()),
                                    initialize: function () {
                                        this.render()
                                    },
                                    render: function () {
                                        return this.$el.html(this.template({account: this.model, daysOfWeek: m})), this
                                    }
                                })
                            }("#accountItemView"))({model: e});
                            return h("<li>").append(n.$el).appendTo(t)
                        }
                    },
                    setDeactive(t) {
                        const e = h(t.target).data("remove"), n = this.collection.get(e), i = this;
                        n.setDeactive({
                            onDone: function () {
                                h("#input-users").autocomplete("option", "source", i.collection.deactive())
                            }
                        })
                    },
                    focusInputUser() {
                        h("#input-users").autocomplete("search", "")
                    },
                    renderAccountList: function () {
                        this.accountsListView.render()
                    },
                    render: function () {
                        return this.$el.html(this.template()), this.$el.append(this.accountsListView.$el), this
                    }
                })
            }, v = window.jQuery, {styles: b} = window.cat_wa.settings.widget, y = window.buttonStyles,
            w = Backbone.Model.extend({defaults: {...b}, isLaunch: !1}), x = Backbone.Model.extend({defaults: {...y}}),
            $ = Backbone.Model.extend({
                idAttribute: "accountId",
                url: cat_wa.url,
                defaults: {
                    accountId: "",
                    avatar: "",
                    accountName: "",
                    dayOffsText: "",
                    daysOfWeekWorking: [],
                    isAlwaysAvailable: "ON",
                    number: "",
                    predefinedText: "",
                    title: "",
                    wc_position: "",
                    wc_show: "OFF",
                    widget_position: "",
                    widget_show: "OFF",
                    willBeBackText: ""
                },
                setActive: function (t) {
                    this.save(null, {
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded",
                        data: v.param({
                            action: "cat_wa_set_account_status",
                            nonce: cat_wa.nonce,
                            status: "ON",
                            accountId: this.get("accountId"),
                            type: cat_wa.selectedAccounts.attrActive
                        }),
                        beforeSend: function () {
                            p.autocompleteLoading(!0)
                        },
                        success: function (e, n) {
                            p.autocompleteLoading(!1), n.success ? (e.set(cat_wa.selectedAccounts.attrActive, "ON"), t.onDone()) : console.log("Can't update active!")
                        },
                        error: function (t, e) {
                            p.autocompleteLoading(!1), console.log("Something went wrong!")
                        }
                    })
                },
                setDeactive: function (t) {
                    this.save(null, {
                        type: "POST",
                        contentType: "application/x-www-form-urlencoded",
                        data: v.param({
                            action: "cat_wa_set_account_status",
                            nonce: cat_wa.nonce,
                            status: "OFF",
                            accountId: this.get("accountId"),
                            type: cat_wa.selectedAccounts.attrActive
                        }),
                        beforeSend: function () {
                            p.autocompleteLoading(!0)
                        },
                        success: function (e, n) {
                            p.autocompleteLoading(!1), n.success ? (e.set(cat_wa.selectedAccounts.attrActive, "OFF"), t.onDone()) : console.log("Can't update active!")
                        },
                        error: function (t, e) {
                            p.autocompleteLoading(!1), console.log("Something went wrong!")
                        }
                    })
                }
            }), O = Backbone.Collection.extend({
                url: cat_wa.url, parse: function (t) {
                    return t.data
                }, deactive: function () {
                    return this.where({[cat_wa.selectedAccounts.attrActive]: "OFF"}).map((function (t) {
                        return t.toJSON()
                    }))
                }, active: function () {
                    return this.where({[cat_wa.selectedAccounts.attrActive]: "ON"}).map((function (t) {
                        return t.attributes.status = p.getBackTime(t.attributes), t.toJSON()
                    }))
                }, model: $
            });

        function k(t) {
            if (null == t) return window;
            if ("[object Window]" !== t.toString()) {
                var e = t.ownerDocument;
                return e && e.defaultView || window
            }
            return t
        }

        function T(t) {
            return t instanceof k(t).Element || t instanceof Element
        }

        function D(t) {
            return t instanceof k(t).HTMLElement || t instanceof HTMLElement
        }

        function C(t) {
            return "undefined" != typeof ShadowRoot && (t instanceof k(t).ShadowRoot || t instanceof ShadowRoot)
        }

        var A = Math.max, S = Math.min, M = Math.round;

        function j() {
            var t = navigator.userAgentData;
            return null != t && t.brands ? t.brands.map((function (t) {
                return t.brand + "/" + t.version
            })).join(" ") : navigator.userAgent
        }

        function E() {
            return !/^((?!chrome|android).)*safari/i.test(j())
        }

        function L(t, e, n) {
            void 0 === e && (e = !1), void 0 === n && (n = !1);
            var i = t.getBoundingClientRect(), o = 1, r = 1;
            e && D(t) && (o = t.offsetWidth > 0 && M(i.width) / t.offsetWidth || 1, r = t.offsetHeight > 0 && M(i.height) / t.offsetHeight || 1);
            var s = (T(t) ? k(t) : window).visualViewport, a = !E() && n,
                c = (i.left + (a && s ? s.offsetLeft : 0)) / o, u = (i.top + (a && s ? s.offsetTop : 0)) / r,
                l = i.width / o, d = i.height / r;
            return {width: l, height: d, top: u, right: c + l, bottom: u + d, left: c, x: c, y: u}
        }

        function P(t) {
            var e = k(t);
            return {scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset}
        }

        function B(t) {
            return t ? (t.nodeName || "").toLowerCase() : null
        }

        function H(t) {
            return ((T(t) ? t.ownerDocument : t.document) || window.document).documentElement
        }

        function I(t) {
            return L(H(t)).left + P(t).scrollLeft
        }

        function W(t) {
            return k(t).getComputedStyle(t)
        }

        function N(t) {
            var e = W(t), n = e.overflow, i = e.overflowX, o = e.overflowY;
            return /auto|scroll|overlay|hidden/.test(n + o + i)
        }

        function V(t, e, n) {
            void 0 === n && (n = !1);
            var i, o, r = D(e), s = D(e) && function (t) {
                var e = t.getBoundingClientRect(), n = M(e.width) / t.offsetWidth || 1,
                    i = M(e.height) / t.offsetHeight || 1;
                return 1 !== n || 1 !== i
            }(e), a = H(e), c = L(t, s, n), u = {scrollLeft: 0, scrollTop: 0}, l = {x: 0, y: 0};
            return (r || !r && !n) && (("body" !== B(e) || N(a)) && (u = (i = e) !== k(i) && D(i) ? {
                scrollLeft: (o = i).scrollLeft,
                scrollTop: o.scrollTop
            } : P(i)), D(e) ? ((l = L(e, !0)).x += e.clientLeft, l.y += e.clientTop) : a && (l.x = I(a))), {
                x: c.left + u.scrollLeft - l.x,
                y: c.top + u.scrollTop - l.y,
                width: c.width,
                height: c.height
            }
        }

        function Y(t) {
            var e = L(t), n = t.offsetWidth, i = t.offsetHeight;
            return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - i) <= 1 && (i = e.height), {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: n,
                height: i
            }
        }

        function z(t) {
            return "html" === B(t) ? t : t.assignedSlot || t.parentNode || (C(t) ? t.host : null) || H(t)
        }

        function F(t) {
            return ["html", "body", "#document"].indexOf(B(t)) >= 0 ? t.ownerDocument.body : D(t) && N(t) ? t : F(z(t))
        }

        function U(t, e) {
            var n;
            void 0 === e && (e = []);
            var i = F(t), o = i === (null == (n = t.ownerDocument) ? void 0 : n.body), r = k(i),
                s = o ? [r].concat(r.visualViewport || [], N(i) ? i : []) : i, a = e.concat(s);
            return o ? a : a.concat(U(z(s)))
        }

        function R(t) {
            return ["table", "td", "th"].indexOf(B(t)) >= 0
        }

        function q(t) {
            return D(t) && "fixed" !== W(t).position ? t.offsetParent : null
        }

        function Q(t) {
            for (var e = k(t), n = q(t); n && R(n) && "static" === W(n).position;) n = q(n);
            return n && ("html" === B(n) || "body" === B(n) && "static" === W(n).position) ? e : n || function (t) {
                var e = /firefox/i.test(j());
                if (/Trident/i.test(j()) && D(t) && "fixed" === W(t).position) return null;
                var n = z(t);
                for (C(n) && (n = n.host); D(n) && ["html", "body"].indexOf(B(n)) < 0;) {
                    var i = W(n);
                    if ("none" !== i.transform || "none" !== i.perspective || "paint" === i.contain || -1 !== ["transform", "perspective"].indexOf(i.willChange) || e && "filter" === i.willChange || e && i.filter && "none" !== i.filter) return n;
                    n = n.parentNode
                }
                return null
            }(t) || e
        }

        var Z = "top", J = "bottom", G = "right", X = "left", K = "auto", tt = [Z, J, G, X], et = "start", nt = "end",
            it = "clippingParents", ot = "viewport", rt = "popper", st = "reference", at = tt.reduce((function (t, e) {
                return t.concat([e + "-" + et, e + "-" + nt])
            }), []), ct = [].concat(tt, [K]).reduce((function (t, e) {
                return t.concat([e, e + "-" + et, e + "-" + nt])
            }), []),
            ut = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

        function lt(t) {
            var e = new Map, n = new Set, i = [];

            function o(t) {
                n.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function (t) {
                    if (!n.has(t)) {
                        var i = e.get(t);
                        i && o(i)
                    }
                })), i.push(t)
            }

            return t.forEach((function (t) {
                e.set(t.name, t)
            })), t.forEach((function (t) {
                n.has(t.name) || o(t)
            })), i
        }

        var dt = {placement: "bottom", modifiers: [], strategy: "absolute"};

        function ft() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            return !e.some((function (t) {
                return !(t && "function" == typeof t.getBoundingClientRect)
            }))
        }

        function pt(t) {
            void 0 === t && (t = {});
            var e = t, n = e.defaultModifiers, i = void 0 === n ? [] : n, o = e.defaultOptions,
                r = void 0 === o ? dt : o;
            return function (t, e, n) {
                void 0 === n && (n = r);
                var o, s, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, dt, r),
                    modifiersData: {},
                    elements: {reference: t, popper: e},
                    attributes: {},
                    styles: {}
                }, c = [], u = !1, l = {
                    state: a, setOptions: function (n) {
                        var o = "function" == typeof n ? n(a.options) : n;
                        d(), a.options = Object.assign({}, r, a.options, o), a.scrollParents = {
                            reference: T(t) ? U(t) : t.contextElement ? U(t.contextElement) : [],
                            popper: U(e)
                        };
                        var s = function (t) {
                            var e = lt(t);
                            return ut.reduce((function (t, n) {
                                return t.concat(e.filter((function (t) {
                                    return t.phase === n
                                })))
                            }), [])
                        }(function (t) {
                            var e = t.reduce((function (t, e) {
                                var n = t[e.name];
                                return t[e.name] = n ? Object.assign({}, n, e, {
                                    options: Object.assign({}, n.options, e.options),
                                    data: Object.assign({}, n.data, e.data)
                                }) : e, t
                            }), {});
                            return Object.keys(e).map((function (t) {
                                return e[t]
                            }))
                        }([].concat(i, a.options.modifiers)));
                        return a.orderedModifiers = s.filter((function (t) {
                            return t.enabled
                        })), a.orderedModifiers.forEach((function (t) {
                            var e = t.name, n = t.options, i = void 0 === n ? {} : n, o = t.effect;
                            if ("function" == typeof o) {
                                var r = o({state: a, name: e, instance: l, options: i}), s = function () {
                                };
                                c.push(r || s)
                            }
                        })), l.update()
                    }, forceUpdate: function () {
                        if (!u) {
                            var t = a.elements, e = t.reference, n = t.popper;
                            if (ft(e, n)) {
                                a.rects = {
                                    reference: V(e, Q(n), "fixed" === a.options.strategy),
                                    popper: Y(n)
                                }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function (t) {
                                    return a.modifiersData[t.name] = Object.assign({}, t.data)
                                }));
                                for (var i = 0; i < a.orderedModifiers.length; i++) if (!0 !== a.reset) {
                                    var o = a.orderedModifiers[i], r = o.fn, s = o.options, c = void 0 === s ? {} : s,
                                        d = o.name;
                                    "function" == typeof r && (a = r({state: a, options: c, name: d, instance: l}) || a)
                                } else a.reset = !1, i = -1
                            }
                        }
                    }, update: (o = function () {
                        return new Promise((function (t) {
                            l.forceUpdate(), t(a)
                        }))
                    }, function () {
                        return s || (s = new Promise((function (t) {
                            Promise.resolve().then((function () {
                                s = void 0, t(o())
                            }))
                        }))), s
                    }), destroy: function () {
                        d(), u = !0
                    }
                };
                if (!ft(t, e)) return l;

                function d() {
                    c.forEach((function (t) {
                        return t()
                    })), c = []
                }

                return l.setOptions(n).then((function (t) {
                    !u && n.onFirstUpdate && n.onFirstUpdate(t)
                })), l
            }
        }

        var ht = {passive: !0};

        function mt(t) {
            return t.split("-")[0]
        }

        function gt(t) {
            return t.split("-")[1]
        }

        function vt(t) {
            return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y"
        }

        function bt(t) {
            var e, n = t.reference, i = t.element, o = t.placement, r = o ? mt(o) : null, s = o ? gt(o) : null,
                a = n.x + n.width / 2 - i.width / 2, c = n.y + n.height / 2 - i.height / 2;
            switch (r) {
                case Z:
                    e = {x: a, y: n.y - i.height};
                    break;
                case J:
                    e = {x: a, y: n.y + n.height};
                    break;
                case G:
                    e = {x: n.x + n.width, y: c};
                    break;
                case X:
                    e = {x: n.x - i.width, y: c};
                    break;
                default:
                    e = {x: n.x, y: n.y}
            }
            var u = r ? vt(r) : null;
            if (null != u) {
                var l = "y" === u ? "height" : "width";
                switch (s) {
                    case et:
                        e[u] = e[u] - (n[l] / 2 - i[l] / 2);
                        break;
                    case nt:
                        e[u] = e[u] + (n[l] / 2 - i[l] / 2)
                }
            }
            return e
        }

        var yt = {top: "auto", right: "auto", bottom: "auto", left: "auto"};

        function wt(t) {
            var e, n = t.popper, i = t.popperRect, o = t.placement, r = t.variation, s = t.offsets, a = t.position,
                c = t.gpuAcceleration, u = t.adaptive, l = t.roundOffsets, d = t.isFixed, f = s.x,
                p = void 0 === f ? 0 : f, h = s.y, m = void 0 === h ? 0 : h,
                g = "function" == typeof l ? l({x: p, y: m}) : {x: p, y: m};
            p = g.x, m = g.y;
            var v = s.hasOwnProperty("x"), b = s.hasOwnProperty("y"), y = X, w = Z, _ = window;
            if (u) {
                var x = Q(n), $ = "clientHeight", O = "clientWidth";
                if (x === k(n) && "static" !== W(x = H(n)).position && "absolute" === a && ($ = "scrollHeight", O = "scrollWidth"), o === Z || (o === X || o === G) && r === nt) w = J, m -= (d && x === _ && _.visualViewport ? _.visualViewport.height : x[$]) - i.height, m *= c ? 1 : -1;
                if (o === X || (o === Z || o === J) && r === nt) y = G, p -= (d && x === _ && _.visualViewport ? _.visualViewport.width : x[O]) - i.width, p *= c ? 1 : -1
            }
            var T, D = Object.assign({position: a}, u && yt), C = !0 === l ? function (t) {
                var e = t.x, n = t.y, i = window.devicePixelRatio || 1;
                return {x: M(e * i) / i || 0, y: M(n * i) / i || 0}
            }({x: p, y: m}) : {x: p, y: m};
            return p = C.x, m = C.y, c ? Object.assign({}, D, ((T = {})[w] = b ? "0" : "", T[y] = v ? "0" : "", T.transform = (_.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", T)) : Object.assign({}, D, ((e = {})[w] = b ? m + "px" : "", e[y] = v ? p + "px" : "", e.transform = "", e))
        }

        const _t = {
            name: "applyStyles", enabled: !0, phase: "write", fn: function (t) {
                var e = t.state;
                Object.keys(e.elements).forEach((function (t) {
                    var n = e.styles[t] || {}, i = e.attributes[t] || {}, o = e.elements[t];
                    D(o) && B(o) && (Object.assign(o.style, n), Object.keys(i).forEach((function (t) {
                        var e = i[t];
                        !1 === e ? o.removeAttribute(t) : o.setAttribute(t, !0 === e ? "" : e)
                    })))
                }))
            }, effect: function (t) {
                var e = t.state, n = {
                    popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function () {
                    Object.keys(e.elements).forEach((function (t) {
                        var i = e.elements[t], o = e.attributes[t] || {},
                            r = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]).reduce((function (t, e) {
                                return t[e] = "", t
                            }), {});
                        D(i) && B(i) && (Object.assign(i.style, r), Object.keys(o).forEach((function (t) {
                            i.removeAttribute(t)
                        })))
                    }))
                }
            }, requires: ["computeStyles"]
        };
        const xt = {
            name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: function (t) {
                var e = t.state, n = t.options, i = t.name, o = n.offset, r = void 0 === o ? [0, 0] : o,
                    s = ct.reduce((function (t, n) {
                        return t[n] = function (t, e, n) {
                            var i = mt(t), o = [X, Z].indexOf(i) >= 0 ? -1 : 1,
                                r = "function" == typeof n ? n(Object.assign({}, e, {placement: t})) : n, s = r[0],
                                a = r[1];
                            return s = s || 0, a = (a || 0) * o, [X, G].indexOf(i) >= 0 ? {x: a, y: s} : {x: s, y: a}
                        }(n, e.rects, r), t
                    }), {}), a = s[e.placement], c = a.x, u = a.y;
                null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += u), e.modifiersData[i] = s
            }
        };
        var $t = {left: "right", right: "left", bottom: "top", top: "bottom"};

        function Ot(t) {
            return t.replace(/left|right|bottom|top/g, (function (t) {
                return $t[t]
            }))
        }

        var kt = {start: "end", end: "start"};

        function Tt(t) {
            return t.replace(/start|end/g, (function (t) {
                return kt[t]
            }))
        }

        function Dt(t, e) {
            var n = e.getRootNode && e.getRootNode();
            if (t.contains(e)) return !0;
            if (n && C(n)) {
                var i = e;
                do {
                    if (i && t.isSameNode(i)) return !0;
                    i = i.parentNode || i.host
                } while (i)
            }
            return !1
        }

        function Ct(t) {
            return Object.assign({}, t, {left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height})
        }

        function At(t, e, n) {
            return e === ot ? Ct(function (t, e) {
                var n = k(t), i = H(t), o = n.visualViewport, r = i.clientWidth, s = i.clientHeight, a = 0, c = 0;
                if (o) {
                    r = o.width, s = o.height;
                    var u = E();
                    (u || !u && "fixed" === e) && (a = o.offsetLeft, c = o.offsetTop)
                }
                return {width: r, height: s, x: a + I(t), y: c}
            }(t, n)) : T(e) ? function (t, e) {
                var n = L(t, !1, "fixed" === e);
                return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n
            }(e, n) : Ct(function (t) {
                var e, n = H(t), i = P(t), o = null == (e = t.ownerDocument) ? void 0 : e.body,
                    r = A(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0),
                    s = A(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0),
                    a = -i.scrollLeft + I(t), c = -i.scrollTop;
                return "rtl" === W(o || n).direction && (a += A(n.clientWidth, o ? o.clientWidth : 0) - r), {
                    width: r,
                    height: s,
                    x: a,
                    y: c
                }
            }(H(t)))
        }

        function St(t, e, n, i) {
            var o = "clippingParents" === e ? function (t) {
                var e = U(z(t)), n = ["absolute", "fixed"].indexOf(W(t).position) >= 0 && D(t) ? Q(t) : t;
                return T(n) ? e.filter((function (t) {
                    return T(t) && Dt(t, n) && "body" !== B(t)
                })) : []
            }(t) : [].concat(e), r = [].concat(o, [n]), s = r[0], a = r.reduce((function (e, n) {
                var o = At(t, n, i);
                return e.top = A(o.top, e.top), e.right = S(o.right, e.right), e.bottom = S(o.bottom, e.bottom), e.left = A(o.left, e.left), e
            }), At(t, s, i));
            return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a
        }

        function Mt(t) {
            return Object.assign({}, {top: 0, right: 0, bottom: 0, left: 0}, t)
        }

        function jt(t, e) {
            return e.reduce((function (e, n) {
                return e[n] = t, e
            }), {})
        }

        function Et(t, e) {
            void 0 === e && (e = {});
            var n = e, i = n.placement, o = void 0 === i ? t.placement : i, r = n.strategy,
                s = void 0 === r ? t.strategy : r, a = n.boundary, c = void 0 === a ? it : a, u = n.rootBoundary,
                l = void 0 === u ? ot : u, d = n.elementContext, f = void 0 === d ? rt : d, p = n.altBoundary,
                h = void 0 !== p && p, m = n.padding, g = void 0 === m ? 0 : m,
                v = Mt("number" != typeof g ? g : jt(g, tt)), b = f === rt ? st : rt, y = t.rects.popper,
                w = t.elements[h ? b : f], _ = St(T(w) ? w : w.contextElement || H(t.elements.popper), c, l, s),
                x = L(t.elements.reference), $ = bt({reference: x, element: y, strategy: "absolute", placement: o}),
                O = Ct(Object.assign({}, y, $)), k = f === rt ? O : x, D = {
                    top: _.top - k.top + v.top,
                    bottom: k.bottom - _.bottom + v.bottom,
                    left: _.left - k.left + v.left,
                    right: k.right - _.right + v.right
                }, C = t.modifiersData.offset;
            if (f === rt && C) {
                var A = C[o];
                Object.keys(D).forEach((function (t) {
                    var e = [G, J].indexOf(t) >= 0 ? 1 : -1, n = [Z, J].indexOf(t) >= 0 ? "y" : "x";
                    D[t] += A[n] * e
                }))
            }
            return D
        }

        function Lt(t, e, n) {
            return A(t, S(e, n))
        }

        const Pt = {
            name: "preventOverflow", enabled: !0, phase: "main", fn: function (t) {
                var e = t.state, n = t.options, i = t.name, o = n.mainAxis, r = void 0 === o || o, s = n.altAxis,
                    a = void 0 !== s && s, c = n.boundary, u = n.rootBoundary, l = n.altBoundary, d = n.padding,
                    f = n.tether, p = void 0 === f || f, h = n.tetherOffset, m = void 0 === h ? 0 : h,
                    g = Et(e, {boundary: c, rootBoundary: u, padding: d, altBoundary: l}), v = mt(e.placement),
                    b = gt(e.placement), y = !b, w = vt(v), _ = "x" === w ? "y" : "x",
                    x = e.modifiersData.popperOffsets, $ = e.rects.reference, O = e.rects.popper,
                    k = "function" == typeof m ? m(Object.assign({}, e.rects, {placement: e.placement})) : m,
                    T = "number" == typeof k ? {mainAxis: k, altAxis: k} : Object.assign({mainAxis: 0, altAxis: 0}, k),
                    D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, C = {x: 0, y: 0};
                if (x) {
                    if (r) {
                        var M, j = "y" === w ? Z : X, E = "y" === w ? J : G, L = "y" === w ? "height" : "width",
                            P = x[w], B = P + g[j], H = P - g[E], I = p ? -O[L] / 2 : 0, W = b === et ? $[L] : O[L],
                            N = b === et ? -O[L] : -$[L], V = e.elements.arrow,
                            z = p && V ? Y(V) : {width: 0, height: 0},
                            F = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }, U = F[j], R = F[E], q = Lt(0, $[L], z[L]),
                            K = y ? $[L] / 2 - I - q - U - T.mainAxis : W - q - U - T.mainAxis,
                            tt = y ? -$[L] / 2 + I + q + R + T.mainAxis : N + q + R + T.mainAxis,
                            nt = e.elements.arrow && Q(e.elements.arrow),
                            it = nt ? "y" === w ? nt.clientTop || 0 : nt.clientLeft || 0 : 0,
                            ot = null != (M = null == D ? void 0 : D[w]) ? M : 0, rt = P + tt - ot,
                            st = Lt(p ? S(B, P + K - ot - it) : B, P, p ? A(H, rt) : H);
                        x[w] = st, C[w] = st - P
                    }
                    if (a) {
                        var at, ct = "x" === w ? Z : X, ut = "x" === w ? J : G, lt = x[_],
                            dt = "y" === _ ? "height" : "width", ft = lt + g[ct], pt = lt - g[ut],
                            ht = -1 !== [Z, X].indexOf(v), bt = null != (at = null == D ? void 0 : D[_]) ? at : 0,
                            yt = ht ? ft : lt - $[dt] - O[dt] - bt + T.altAxis,
                            wt = ht ? lt + $[dt] + O[dt] - bt - T.altAxis : pt, _t = p && ht ? function (t, e, n) {
                                var i = Lt(t, e, n);
                                return i > n ? n : i
                            }(yt, lt, wt) : Lt(p ? yt : ft, lt, p ? wt : pt);
                        x[_] = _t, C[_] = _t - lt
                    }
                    e.modifiersData[i] = C
                }
            }, requiresIfExists: ["offset"]
        };
        var Bt = function (t, e) {
            return Mt("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {placement: e.placement})) : t) ? t : jt(t, tt))
        };
        const Ht = {
            name: "arrow", enabled: !0, phase: "main", fn: function (t) {
                var e, n = t.state, i = t.name, o = t.options, r = n.elements.arrow, s = n.modifiersData.popperOffsets,
                    a = mt(n.placement), c = vt(a), u = [X, G].indexOf(a) >= 0 ? "height" : "width";
                if (r && s) {
                    var l = Bt(o.padding, n), d = Y(r), f = "y" === c ? Z : X, p = "y" === c ? J : G,
                        h = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u],
                        m = s[c] - n.rects.reference[c], g = Q(r),
                        v = g ? "y" === c ? g.clientHeight || 0 : g.clientWidth || 0 : 0, b = h / 2 - m / 2, y = l[f],
                        w = v - d[u] - l[p], _ = v / 2 - d[u] / 2 + b, x = Lt(y, _, w), $ = c;
                    n.modifiersData[i] = ((e = {})[$] = x, e.centerOffset = x - _, e)
                }
            }, effect: function (t) {
                var e = t.state, n = t.options.element, i = void 0 === n ? "[data-popper-arrow]" : n;
                null != i && ("string" != typeof i || (i = e.elements.popper.querySelector(i))) && Dt(e.elements.popper, i) && (e.elements.arrow = i)
            }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"]
        };

        function It(t, e, n) {
            return void 0 === n && (n = {x: 0, y: 0}), {
                top: t.top - e.height - n.y,
                right: t.right - e.width + n.x,
                bottom: t.bottom - e.height + n.y,
                left: t.left - e.width - n.x
            }
        }

        function Wt(t) {
            return [Z, G, J, X].some((function (e) {
                return t[e] >= 0
            }))
        }

        var Nt = pt({
                defaultModifiers: [{
                    name: "eventListeners", enabled: !0, phase: "write", fn: function () {
                    }, effect: function (t) {
                        var e = t.state, n = t.instance, i = t.options, o = i.scroll, r = void 0 === o || o, s = i.resize,
                            a = void 0 === s || s, c = k(e.elements.popper),
                            u = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                        return r && u.forEach((function (t) {
                            t.addEventListener("scroll", n.update, ht)
                        })), a && c.addEventListener("resize", n.update, ht), function () {
                            r && u.forEach((function (t) {
                                t.removeEventListener("scroll", n.update, ht)
                            })), a && c.removeEventListener("resize", n.update, ht)
                        }
                    }, data: {}
                }, {
                    name: "popperOffsets", enabled: !0, phase: "read", fn: function (t) {
                        var e = t.state, n = t.name;
                        e.modifiersData[n] = bt({
                            reference: e.rects.reference,
                            element: e.rects.popper,
                            strategy: "absolute",
                            placement: e.placement
                        })
                    }, data: {}
                }, {
                    name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: function (t) {
                        var e = t.state, n = t.options, i = n.gpuAcceleration, o = void 0 === i || i, r = n.adaptive,
                            s = void 0 === r || r, a = n.roundOffsets, c = void 0 === a || a, u = {
                                placement: mt(e.placement),
                                variation: gt(e.placement),
                                popper: e.elements.popper,
                                popperRect: e.rects.popper,
                                gpuAcceleration: o,
                                isFixed: "fixed" === e.options.strategy
                            };
                        null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, wt(Object.assign({}, u, {
                            offsets: e.modifiersData.popperOffsets,
                            position: e.options.strategy,
                            adaptive: s,
                            roundOffsets: c
                        })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, wt(Object.assign({}, u, {
                            offsets: e.modifiersData.arrow,
                            position: "absolute",
                            adaptive: !1,
                            roundOffsets: c
                        })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {"data-popper-placement": e.placement})
                    }, data: {}
                }, _t, xt, {
                    name: "flip", enabled: !0, phase: "main", fn: function (t) {
                        var e = t.state, n = t.options, i = t.name;
                        if (!e.modifiersData[i]._skip) {
                            for (var o = n.mainAxis, r = void 0 === o || o, s = n.altAxis, a = void 0 === s || s, c = n.fallbackPlacements, u = n.padding, l = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, h = void 0 === p || p, m = n.allowedAutoPlacements, g = e.options.placement, v = mt(g), b = c || (v === g || !h ? [Ot(g)] : function (t) {
                                if (mt(t) === K) return [];
                                var e = Ot(t);
                                return [Tt(t), e, Tt(e)]
                            }(g)), y = [g].concat(b).reduce((function (t, n) {
                                return t.concat(mt(n) === K ? function (t, e) {
                                    void 0 === e && (e = {});
                                    var n = e, i = n.placement, o = n.boundary, r = n.rootBoundary, s = n.padding,
                                        a = n.flipVariations, c = n.allowedAutoPlacements, u = void 0 === c ? ct : c,
                                        l = gt(i), d = l ? a ? at : at.filter((function (t) {
                                            return gt(t) === l
                                        })) : tt, f = d.filter((function (t) {
                                            return u.indexOf(t) >= 0
                                        }));
                                    0 === f.length && (f = d);
                                    var p = f.reduce((function (e, n) {
                                        return e[n] = Et(t, {
                                            placement: n,
                                            boundary: o,
                                            rootBoundary: r,
                                            padding: s
                                        })[mt(n)], e
                                    }), {});
                                    return Object.keys(p).sort((function (t, e) {
                                        return p[t] - p[e]
                                    }))
                                }(e, {
                                    placement: n,
                                    boundary: l,
                                    rootBoundary: d,
                                    padding: u,
                                    flipVariations: h,
                                    allowedAutoPlacements: m
                                }) : n)
                            }), []), w = e.rects.reference, _ = e.rects.popper, x = new Map, $ = !0, O = y[0], k = 0; k < y.length; k++) {
                                var T = y[k], D = mt(T), C = gt(T) === et, A = [Z, J].indexOf(D) >= 0,
                                    S = A ? "width" : "height",
                                    M = Et(e, {placement: T, boundary: l, rootBoundary: d, altBoundary: f, padding: u}),
                                    j = A ? C ? G : X : C ? J : Z;
                                w[S] > _[S] && (j = Ot(j));
                                var E = Ot(j), L = [];
                                if (r && L.push(M[D] <= 0), a && L.push(M[j] <= 0, M[E] <= 0), L.every((function (t) {
                                    return t
                                }))) {
                                    O = T, $ = !1;
                                    break
                                }
                                x.set(T, L)
                            }
                            if ($) for (var P = function (t) {
                                var e = y.find((function (e) {
                                    var n = x.get(e);
                                    if (n) return n.slice(0, t).every((function (t) {
                                        return t
                                    }))
                                }));
                                if (e) return O = e, "break"
                            }, B = h ? 3 : 1; B > 0; B--) {
                                if ("break" === P(B)) break
                            }
                            e.placement !== O && (e.modifiersData[i]._skip = !0, e.placement = O, e.reset = !0)
                        }
                    }, requiresIfExists: ["offset"], data: {_skip: !1}
                }, Pt, Ht, {
                    name: "hide",
                    enabled: !0,
                    phase: "main",
                    requiresIfExists: ["preventOverflow"],
                    fn: function (t) {
                        var e = t.state, n = t.name, i = e.rects.reference, o = e.rects.popper,
                            r = e.modifiersData.preventOverflow, s = Et(e, {elementContext: "reference"}),
                            a = Et(e, {altBoundary: !0}), c = It(s, i), u = It(a, o, r), l = Wt(c), d = Wt(u);
                        e.modifiersData[n] = {
                            referenceClippingOffsets: c,
                            popperEscapeOffsets: u,
                            isReferenceHidden: l,
                            hasPopperEscaped: d
                        }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                            "data-popper-reference-hidden": l,
                            "data-popper-escaped": d
                        })
                    }
                }]
            }), Vt = "cat_tippy-box", Yt = "cat_tippy-content", zt = "cat_tippy-backdrop", Ft = "cat_tippy-arrow",
            Ut = "cat_tippy-svg-arrow", Rt = {passive: !0, capture: !0};

        function qt(t, e, n) {
            if (Array.isArray(t)) {
                var i = t[e];
                return null == i ? Array.isArray(n) ? n[e] : n : i
            }
            return t
        }

        function Qt(t, e) {
            var n = {}.toString.call(t);
            return 0 === n.indexOf("[object") && n.indexOf(e + "]") > -1
        }

        function Zt(t, e) {
            return "function" == typeof t ? t.apply(void 0, e) : t
        }

        function Jt(t, e) {
            return 0 === e ? t : function (i) {
                clearTimeout(n), n = setTimeout((function () {
                    t(i)
                }), e)
            };
            var n
        }

        function Gt(t) {
            return [].concat(t)
        }

        function Xt(t, e) {
            -1 === t.indexOf(e) && t.push(e)
        }

        function Kt(t) {
            return t.split("-")[0]
        }

        function te(t) {
            return [].slice.call(t)
        }

        function ee() {
            return document.createElement("div")
        }

        function ne(t) {
            return ["Element", "Fragment"].some((function (e) {
                return Qt(t, e)
            }))
        }

        function ie(t) {
            return Qt(t, "MouseEvent")
        }

        function oe(t) {
            return !(!t || !t._tippy || t._tippy.reference !== t)
        }

        function re(t) {
            return ne(t) ? [t] : function (t) {
                return Qt(t, "NodeList")
            }(t) ? te(t) : Array.isArray(t) ? t : te(document.querySelectorAll(t))
        }

        function se(t, e) {
            t.forEach((function (t) {
                t && (t.style.transitionDuration = e + "ms")
            }))
        }

        function ae(t, e) {
            t.forEach((function (t) {
                t && t.setAttribute("data-state", e)
            }))
        }

        function ce(t) {
            var e, n = Gt(t)[0];
            return (null == n || null == (e = n.ownerDocument) ? void 0 : e.body) ? n.ownerDocument : document
        }

        function ue(t, e, n) {
            var i = e + "EventListener";
            ["transitionend", "webkitTransitionEnd"].forEach((function (e) {
                t[i](e, n)
            }))
        }

        var le = {isTouch: !1}, de = 0;

        function fe() {
            le.isTouch || (le.isTouch = !0, window.performance && document.addEventListener("mousemove", pe))
        }

        function pe() {
            var t = performance.now();
            t - de < 20 && (le.isTouch = !1, document.removeEventListener("mousemove", pe)), de = t
        }

        function he() {
            var t = document.activeElement;
            if (oe(t)) {
                var e = t._tippy;
                t.blur && !e.state.isVisible && t.blur()
            }
        }

        var me = "undefined" != typeof window && "undefined" != typeof document ? navigator.userAgent : "",
            ge = /MSIE |Trident\//.test(me);
        var ve = {animateFill: !1, followCursor: !1, inlinePositioning: !1, sticky: !1}, be = Object.assign({
            appendTo: function () {
                return document.body
            },
            aria: {content: "auto", expanded: "auto"},
            delay: 0,
            duration: [300, 250],
            getReferenceClientRect: null,
            hideOnClick: !0,
            ignoreAttributes: !1,
            interactive: !1,
            interactiveBorder: 2,
            interactiveDebounce: 0,
            moveTransition: "",
            offset: [0, 10],
            onAfterUpdate: function () {
            },
            onBeforeUpdate: function () {
            },
            onCreate: function () {
            },
            onDestroy: function () {
            },
            onHidden: function () {
            },
            onHide: function () {
            },
            onMount: function () {
            },
            onShow: function () {
            },
            onShown: function () {
            },
            onTrigger: function () {
            },
            onUntrigger: function () {
            },
            onClickOutside: function () {
            },
            placement: "top",
            plugins: [],
            popperOptions: {},
            render: null,
            showOnCreate: !1,
            touch: !0,
            trigger: "mouseenter focus",
            triggerTarget: null
        }, ve, {}, {
            allowHTML: !1,
            animation: "fade",
            arrow: !0,
            content: "",
            inertia: !1,
            maxWidth: 350,
            role: "tooltip",
            theme: "",
            zIndex: 9999
        }), ye = Object.keys(be);

        function we(t) {
            var e = (t.plugins || []).reduce((function (e, n) {
                var i = n.name, o = n.defaultValue;
                return i && (e[i] = void 0 !== t[i] ? t[i] : o), e
            }), {});
            return Object.assign({}, t, {}, e)
        }

        function _e(t, e) {
            var n = Object.assign({}, e, {content: Zt(e.content, [t])}, e.ignoreAttributes ? {} : function (t, e) {
                return (e ? Object.keys(we(Object.assign({}, be, {plugins: e}))) : ye).reduce((function (e, n) {
                    var i = (t.getAttribute("data-tippy-" + n) || "").trim();
                    if (!i) return e;
                    if ("content" === n) e[n] = i; else try {
                        e[n] = JSON.parse(i)
                    } catch (t) {
                        e[n] = i
                    }
                    return e
                }), {})
            }(t, e.plugins));
            return n.aria = Object.assign({}, be.aria, {}, n.aria), n.aria = {
                expanded: "auto" === n.aria.expanded ? e.interactive : n.aria.expanded,
                content: "auto" === n.aria.content ? e.interactive ? null : "describedby" : n.aria.content
            }, n
        }

        var xe = function () {
            return "innerHTML"
        };

        function $e(t, e) {
            t[xe()] = e
        }

        function Oe(t) {
            var e = ee();
            return !0 === t ? e.className = Ft : (e.className = Ut, ne(t) ? e.appendChild(t) : $e(e, t)), e
        }

        function ke(t, e) {
            ne(e.content) ? ($e(t, ""), t.appendChild(e.content)) : "function" != typeof e.content && (e.allowHTML ? $e(t, e.content) : t.textContent = e.content)
        }

        function Te(t) {
            var e = t.firstElementChild, n = te(e.children);
            return {
                box: e, content: n.find((function (t) {
                    return t.classList.contains(Yt)
                })), arrow: n.find((function (t) {
                    return t.classList.contains(Ft) || t.classList.contains(Ut)
                })), backdrop: n.find((function (t) {
                    return t.classList.contains(zt)
                }))
            }
        }

        function De(t) {
            var e = ee(), n = ee();
            n.className = Vt, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
            var i = ee();

            function o(n, i) {
                var o = Te(e), r = o.box, s = o.content, a = o.arrow;
                i.theme ? r.setAttribute("data-theme", i.theme) : r.removeAttribute("data-theme"), "string" == typeof i.animation ? r.setAttribute("data-animation", i.animation) : r.removeAttribute("data-animation"), i.inertia ? r.setAttribute("data-inertia", "") : r.removeAttribute("data-inertia"), r.style.maxWidth = "number" == typeof i.maxWidth ? i.maxWidth + "px" : i.maxWidth, i.role ? r.setAttribute("role", i.role) : r.removeAttribute("role"), n.content === i.content && n.allowHTML === i.allowHTML || ke(s, t.props), i.arrow ? a ? n.arrow !== i.arrow && (r.removeChild(a), r.appendChild(Oe(i.arrow))) : r.appendChild(Oe(i.arrow)) : a && r.removeChild(a)
            }

            return i.className = Yt, i.setAttribute("data-state", "hidden"), ke(i, t.props), e.appendChild(n), n.appendChild(i), o(t.props, t.props), {
                popper: e,
                onUpdate: o
            }
        }

        De.$$tippy = !0;
        var Ce = 1, Ae = [], Se = [];

        function Me(t, e) {
            var n, i, o, r, s, a, c, u, l,
                d = _e(t, Object.assign({}, be, {}, we((n = e, Object.keys(n).reduce((function (t, e) {
                    return void 0 !== n[e] && (t[e] = n[e]), t
                }), {}))))), f = !1, p = !1, h = !1, m = !1, g = [], v = Jt(Q, d.interactiveDebounce), b = Ce++,
                y = (l = d.plugins).filter((function (t, e) {
                    return l.indexOf(t) === e
                })), w = {
                    id: b,
                    reference: t,
                    popper: ee(),
                    popperInstance: null,
                    props: d,
                    state: {isEnabled: !0, isVisible: !1, isDestroyed: !1, isMounted: !1, isShown: !1},
                    plugins: y,
                    clearDelayTimeouts: function () {
                        clearTimeout(i), clearTimeout(o), cancelAnimationFrame(r)
                    },
                    setProps: function (e) {
                        0;
                        if (w.state.isDestroyed) return;
                        L("onBeforeUpdate", [w, e]), R();
                        var n = w.props, i = _e(t, Object.assign({}, w.props, {}, e, {ignoreAttributes: !0}));
                        w.props = i, U(), n.interactiveDebounce !== i.interactiveDebounce && (H(), v = Jt(Q, i.interactiveDebounce));
                        n.triggerTarget && !i.triggerTarget ? Gt(n.triggerTarget).forEach((function (t) {
                            t.removeAttribute("aria-expanded")
                        })) : i.triggerTarget && t.removeAttribute("aria-expanded");
                        B(), E(), $ && $(n, i);
                        w.popperInstance && (X(), tt().forEach((function (t) {
                            requestAnimationFrame(t._tippy.popperInstance.forceUpdate)
                        })));
                        L("onAfterUpdate", [w, e])
                    },
                    setContent: function (t) {
                        w.setProps({content: t})
                    },
                    show: function () {
                        0;
                        var t = w.state.isVisible, e = w.state.isDestroyed, n = !w.state.isEnabled,
                            i = le.isTouch && !w.props.touch, o = qt(w.props.duration, 0, be.duration);
                        if (t || e || n || i) return;
                        if (A().hasAttribute("disabled")) return;
                        if (L("onShow", [w], !1), !1 === w.props.onShow(w)) return;
                        w.state.isVisible = !0, C() && (x.style.visibility = "visible");
                        E(), V(), w.state.isMounted || (x.style.transition = "none");
                        if (C()) {
                            var r = M();
                            se([r.box, r.content], 0)
                        }
                        c = function () {
                            var t;
                            if (w.state.isVisible && !m) {
                                if (m = !0, x.offsetHeight, x.style.transition = w.props.moveTransition, C() && w.props.animation) {
                                    var e = M(), n = e.box, i = e.content;
                                    se([n, i], o), ae([n, i], "visible")
                                }
                                P(), B(), Xt(Se, w), null == (t = w.popperInstance) || t.forceUpdate(), w.state.isMounted = !0, L("onMount", [w]), w.props.animation && C() && function (t, e) {
                                    z(t, e)
                                }(o, (function () {
                                    w.state.isShown = !0, L("onShown", [w])
                                }))
                            }
                        }, function () {
                            var t, e = w.props.appendTo, n = A();
                            t = w.props.interactive && e === be.appendTo || "parent" === e ? n.parentNode : Zt(e, [n]);
                            t.contains(x) || t.appendChild(x);
                            X(), !1
                        }()
                    },
                    hide: function () {
                        0;
                        var t = !w.state.isVisible, e = w.state.isDestroyed, n = !w.state.isEnabled,
                            i = qt(w.props.duration, 1, be.duration);
                        if (t || e || n) return;
                        if (L("onHide", [w], !1), !1 === w.props.onHide(w)) return;
                        w.state.isVisible = !1, w.state.isShown = !1, m = !1, f = !1, C() && (x.style.visibility = "hidden");
                        if (H(), Y(), E(), C()) {
                            var o = M(), r = o.box, s = o.content;
                            w.props.animation && (se([r, s], i), ae([r, s], "hidden"))
                        }
                        P(), B(), w.props.animation ? C() && function (t, e) {
                            z(t, (function () {
                                !w.state.isVisible && x.parentNode && x.parentNode.contains(x) && e()
                            }))
                        }(i, w.unmount) : w.unmount()
                    },
                    hideWithInteractivity: function (t) {
                        0;
                        S().addEventListener("mousemove", v), Xt(Ae, v), v(t)
                    },
                    enable: function () {
                        w.state.isEnabled = !0
                    },
                    disable: function () {
                        w.hide(), w.state.isEnabled = !1
                    },
                    unmount: function () {
                        0;
                        w.state.isVisible && w.hide();
                        if (!w.state.isMounted) return;
                        K(), tt().forEach((function (t) {
                            t._tippy.unmount()
                        })), x.parentNode && x.parentNode.removeChild(x);
                        Se = Se.filter((function (t) {
                            return t !== w
                        })), w.state.isMounted = !1, L("onHidden", [w])
                    },
                    destroy: function () {
                        0;
                        if (w.state.isDestroyed) return;
                        w.clearDelayTimeouts(), w.unmount(), R(), delete t._tippy, w.state.isDestroyed = !0, L("onDestroy", [w])
                    }
                };
            if (!d.render) return w;
            var _ = d.render(w), x = _.popper, $ = _.onUpdate;
            x.setAttribute("data-tippy-root", ""), x.id = "tippy-" + w.id, w.popper = x, t._tippy = w, x._tippy = w;
            var O = y.map((function (t) {
                return t.fn(w)
            })), k = t.hasAttribute("aria-expanded");
            return U(), B(), E(), L("onCreate", [w]), d.showOnCreate && et(), x.addEventListener("mouseenter", (function () {
                w.props.interactive && w.state.isVisible && w.clearDelayTimeouts()
            })), x.addEventListener("mouseleave", (function (t) {
                w.props.interactive && w.props.trigger.indexOf("mouseenter") >= 0 && (S().addEventListener("mousemove", v), v(t))
            })), w;

            function T() {
                var t = w.props.touch;
                return Array.isArray(t) ? t : [t, 0]
            }

            function D() {
                return "hold" === T()[0]
            }

            function C() {
                var t;
                return !!(null == (t = w.props.render) ? void 0 : t.$$tippy)
            }

            function A() {
                return u || t
            }

            function S() {
                var t = A().parentNode;
                return t ? ce(t) : document
            }

            function M() {
                return Te(x)
            }

            function j(t) {
                return w.state.isMounted && !w.state.isVisible || le.isTouch || s && "focus" === s.type ? 0 : qt(w.props.delay, t ? 0 : 1, be.delay)
            }

            function E() {
                x.style.pointerEvents = w.props.interactive && w.state.isVisible ? "" : "none", x.style.zIndex = "" + w.props.zIndex
            }

            function L(t, e, n) {
                var i;
                (void 0 === n && (n = !0), O.forEach((function (n) {
                    n[t] && n[t].apply(void 0, e)
                })), n) && (i = w.props)[t].apply(i, e)
            }

            function P() {
                var e = w.props.aria;
                if (e.content) {
                    var n = "aria-" + e.content, i = x.id;
                    Gt(w.props.triggerTarget || t).forEach((function (t) {
                        var e = t.getAttribute(n);
                        if (w.state.isVisible) t.setAttribute(n, e ? e + " " + i : i); else {
                            var o = e && e.replace(i, "").trim();
                            o ? t.setAttribute(n, o) : t.removeAttribute(n)
                        }
                    }))
                }
            }

            function B() {
                !k && w.props.aria.expanded && Gt(w.props.triggerTarget || t).forEach((function (t) {
                    w.props.interactive ? t.setAttribute("aria-expanded", w.state.isVisible && t === A() ? "true" : "false") : t.removeAttribute("aria-expanded")
                }))
            }

            function H() {
                S().removeEventListener("mousemove", v), Ae = Ae.filter((function (t) {
                    return t !== v
                }))
            }

            function I(t) {
                if (!(le.isTouch && (h || "mousedown" === t.type) || w.props.interactive && x.contains(t.target))) {
                    if (A().contains(t.target)) {
                        if (le.isTouch) return;
                        if (w.state.isVisible && w.props.trigger.indexOf("click") >= 0) return
                    } else L("onClickOutside", [w, t]);
                    !0 === w.props.hideOnClick && (w.clearDelayTimeouts(), w.hide(), p = !0, setTimeout((function () {
                        p = !1
                    })), w.state.isMounted || Y())
                }
            }

            function W() {
                h = !0
            }

            function N() {
                h = !1
            }

            function V() {
                var t = S();
                t.addEventListener("mousedown", I, !0), t.addEventListener("touchend", I, Rt), t.addEventListener("touchstart", N, Rt), t.addEventListener("touchmove", W, Rt)
            }

            function Y() {
                var t = S();
                t.removeEventListener("mousedown", I, !0), t.removeEventListener("touchend", I, Rt), t.removeEventListener("touchstart", N, Rt), t.removeEventListener("touchmove", W, Rt)
            }

            function z(t, e) {
                var n = M().box;

                function i(t) {
                    t.target === n && (ue(n, "remove", i), e())
                }

                if (0 === t) return e();
                ue(n, "remove", a), ue(n, "add", i), a = i
            }

            function F(e, n, i) {
                void 0 === i && (i = !1), Gt(w.props.triggerTarget || t).forEach((function (t) {
                    t.addEventListener(e, n, i), g.push({node: t, eventType: e, handler: n, options: i})
                }))
            }

            function U() {
                var t;
                D() && (F("touchstart", q, {passive: !0}), F("touchend", Z, {passive: !0})), (t = w.props.trigger, t.split(/\s+/).filter(Boolean)).forEach((function (t) {
                    if ("manual" !== t) switch (F(t, q), t) {
                        case"mouseenter":
                            F("mouseleave", Z);
                            break;
                        case"focus":
                            F(ge ? "focusout" : "blur", J);
                            break;
                        case"focusin":
                            F("focusout", J)
                    }
                }))
            }

            function R() {
                g.forEach((function (t) {
                    var e = t.node, n = t.eventType, i = t.handler, o = t.options;
                    e.removeEventListener(n, i, o)
                })), g = []
            }

            function q(t) {
                var e, n = !1;
                if (w.state.isEnabled && !G(t) && !p) {
                    var i = "focus" === (null == (e = s) ? void 0 : e.type);
                    s = t, u = t.currentTarget, B(), !w.state.isVisible && ie(t) && Ae.forEach((function (e) {
                        return e(t)
                    })), "click" === t.type && (w.props.trigger.indexOf("mouseenter") < 0 || f) && !1 !== w.props.hideOnClick && w.state.isVisible ? n = !0 : et(t), "click" === t.type && (f = !n), n && !i && nt(t)
                }
            }

            function Q(t) {
                var e = t.target, n = A().contains(e) || x.contains(e);
                if ("mousemove" !== t.type || !n) {
                    var i = tt().concat(x).map((function (t) {
                        var e, n = null == (e = t._tippy.popperInstance) ? void 0 : e.state;
                        return n ? {popperRect: t.getBoundingClientRect(), popperState: n, props: d} : null
                    })).filter(Boolean);
                    (function (t, e) {
                        var n = e.clientX, i = e.clientY;
                        return t.every((function (t) {
                            var e = t.popperRect, o = t.popperState, r = t.props.interactiveBorder, s = Kt(o.placement),
                                a = o.modifiersData.offset;
                            if (!a) return !0;
                            var c = "bottom" === s ? a.top.y : 0, u = "top" === s ? a.bottom.y : 0,
                                l = "right" === s ? a.left.x : 0, d = "left" === s ? a.right.x : 0,
                                f = e.top - i + c > r, p = i - e.bottom - u > r, h = e.left - n + l > r,
                                m = n - e.right - d > r;
                            return f || p || h || m
                        }))
                    })(i, t) && (H(), nt(t))
                }
            }

            function Z(t) {
                G(t) || w.props.trigger.indexOf("click") >= 0 && f || (w.props.interactive ? w.hideWithInteractivity(t) : nt(t))
            }

            function J(t) {
                w.props.trigger.indexOf("focusin") < 0 && t.target !== A() || w.props.interactive && t.relatedTarget && x.contains(t.relatedTarget) || nt(t)
            }

            function G(t) {
                return !!le.isTouch && D() !== t.type.indexOf("touch") >= 0
            }

            function X() {
                K();
                var e = w.props, n = e.popperOptions, i = e.placement, o = e.offset, r = e.getReferenceClientRect,
                    s = e.moveTransition, a = C() ? Te(x).arrow : null,
                    u = r ? {getBoundingClientRect: r, contextElement: r.contextElement || A()} : t, l = {
                        name: "$$tippy",
                        enabled: !0,
                        phase: "beforeWrite",
                        requires: ["computeStyles"],
                        fn: function (t) {
                            var e = t.state;
                            if (C()) {
                                var n = M().box;
                                ["placement", "reference-hidden", "escaped"].forEach((function (t) {
                                    "placement" === t ? n.setAttribute("data-placement", e.placement) : e.attributes.popper["data-popper-" + t] ? n.setAttribute("data-" + t, "") : n.removeAttribute("data-" + t)
                                })), e.attributes.popper = {}
                            }
                        }
                    }, d = [{name: "offset", options: {offset: o}}, {
                        name: "preventOverflow",
                        options: {padding: {top: 2, bottom: 2, left: 5, right: 5}}
                    }, {name: "flip", options: {padding: 5}}, {name: "computeStyles", options: {adaptive: !s}}, l];
                C() && a && d.push({
                    name: "arrow",
                    options: {element: a, padding: 3}
                }), d.push.apply(d, (null == n ? void 0 : n.modifiers) || []), w.popperInstance = Nt(u, x, Object.assign({}, n, {
                    placement: i,
                    onFirstUpdate: c,
                    modifiers: d
                }))
            }

            function K() {
                w.popperInstance && (w.popperInstance.destroy(), w.popperInstance = null)
            }

            function tt() {
                return te(x.querySelectorAll("[data-tippy-root]"))
            }

            function et(t) {
                w.clearDelayTimeouts(), t && L("onTrigger", [w, t]), V();
                var e = j(!0), n = T(), o = n[0], r = n[1];
                le.isTouch && "hold" === o && r && (e = r), e ? i = setTimeout((function () {
                    w.show()
                }), e) : w.show()
            }

            function nt(t) {
                if (w.clearDelayTimeouts(), L("onUntrigger", [w, t]), w.state.isVisible) {
                    if (!(w.props.trigger.indexOf("mouseenter") >= 0 && w.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(t.type) >= 0 && f)) {
                        var e = j(!1);
                        e ? o = setTimeout((function () {
                            w.state.isVisible && w.hide()
                        }), e) : r = requestAnimationFrame((function () {
                            w.hide()
                        }))
                    }
                } else Y()
            }
        }

        function je(t, e) {
            void 0 === e && (e = {});
            var n = be.plugins.concat(e.plugins || []);
            document.addEventListener("touchstart", fe, Rt), window.addEventListener("blur", he);
            var i = Object.assign({}, e, {plugins: n}), o = re(t).reduce((function (t, e) {
                var n = e && Me(e, i);
                return n && t.push(n), t
            }), []);
            return ne(t) ? o[0] : o
        }

        je.defaultProps = be, je.setDefaultProps = function (t) {
            Object.keys(t).forEach((function (e) {
                be[e] = t[e]
            }))
        }, je.currentInput = le;
        Object.assign({}, _t, {
            effect: function (t) {
                var e = t.state, n = {
                    popper: {position: e.options.strategy, left: "0", top: "0", margin: "0"},
                    arrow: {position: "absolute"},
                    reference: {}
                };
                Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow)
            }
        });
        je.setDefaultProps({render: De});
        const Ee = je, Le = window.jQuery, Pe = {
            reorder_attribute_for_custom_time: function () {
                ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach((t => {
                    const e = jQuery(".working-" + t);
                    for (let n = 1; n < e.length; n++) Le(".start-time", e[n]).attr("name", `daysOfWeekWorking[${t}][workHours][${n}][startTime]`), Le(".end-time", e[n]).attr("name", `daysOfWeekWorking[${t}][workHours][${n}][endTime]`)
                }))
            }, add_custom_time: function () {
                Le(".cat-btncustom-offline").on("click", ".add-custom-time", (function () {
                    const t = Le(this).closest("tr"), e = Le("." + t.attr("class"));
                    if (e.length >= 3) return;
                    const n = t.clone();
                    Le("#btn-apply-time", n).closest("td").remove(), Le("td", n).first().empty(), Le("td", n).last().remove(), n.append('<td><a style="color: #a00" href="javascript:;" class="remove-custom-time">Remove</a></td>'), Le(n).insertAfter(e.last()), Pe.reorder_attribute_for_custom_time()
                }))
            }, remove_custom_time: function () {
                Le(".cat-btncustom-offline").on("click", ".remove-custom-time", (function () {
                    Le(this).closest("tr").remove(), Pe.reorder_attribute_for_custom_time()
                }))
            }, copy_clipboard_shortcode: function () {
                Le("#cat-button-shortcode-copy").click((function () {
                    Le(this).focus(), Le(this).select(), document.execCommand("copy"), Le(".cat-shortcode-copy-status").show()
                }))
            }, selectAll_table_input_shortcode: function () {
                Le(".cat-shortcode-table").click((function () {
                    Le(this).focus(), Le(this).select()
                }))
            }, btn_apply_time_all: function () {
                Le("#btn-apply-time").on("click", (function () {
                    const t = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
                        e = Le(".working-sunday");
                    for (let n = 0; n < e.length; n++) {
                        const i = Le(".start-time", e[n]).val(), o = Le(".end-time", e[n]).val();
                        t.forEach((t => {
                            Le(".working-" + t).slice(n + 1).remove();
                            const e = Le(".working-" + t)[n];
                            if (void 0 === e) {
                                Le(".add-custom-time", Le(".working-" + t)[0]).trigger("click");
                                const e = Le(".working-" + t)[n];
                                Le(".start-time", e).val(i), Le(".end-time", e).val(o)
                            } else Le(".start-time", e).val(i), Le(".end-time", e).val(o)
                        }))
                    }
                }))
            }, btn_always_available: function () {
                Le("body.post-type-cat_wa_accounts input#cat-wa-switch").click((function () {
                    Le(this).prop("checked") ? Le(".cat-btncustom-offline").hide() : Le(".cat-btncustom-offline").show()
                }))
            }, select_display_pages_option: function () {
                Le("#displayCondition").change((function () {
                    "includePages" == Le(this).val() ? (Le(".cat-wa-pages-content.include-pages").removeClass("hide-select"), Le(".cat-wa-pages-content.exclude-pages").addClass("hide-select")) : (Le(".cat-wa-pages-content.exclude-pages").removeClass("hide-select"), Le(".cat-wa-pages-content.include-pages").addClass("hide-select"))
                }))
            }, checkAll_SelectPages_List: function () {
                Le("#exclude-pages-checkall").change((function () {
                    Le(".excludePages").prop("checked", Le(this).prop("checked"))
                })), Le("#include-pages-checkall").change((function () {
                    Le(".includePages").prop("checked", Le(this).prop("checked"))
                }))
            }, registerTab: function () {
                Le("#tabs").tabs({
                    active: 0, create: function (t, e) {
                        const n = Le("#tabs").tabs("option", "active");
                        e.tab.children().addClass("nav-tab-active"), 1 != n ? Le("#app-preview").hide() : Le("#app-preview").show()
                    }, activate: function (t, e) {
                        1 != Le("#tabs").tabs("option", "active") ? Le("#app-preview").hide() : Le("#app-preview").show(), e.oldTab.children().removeClass("nav-tab-active"), e.newTab.children().addClass("nav-tab-active")
                    }
                }), Le("#tabs-setting").tabs({active: 0})
            }, changeUrlSetting: function (t) {
                const e = 'div[data-setting="onDesktop"] button';
                Le(e).click((function (t) {
                    Le(e).removeClass("active"), Le(t.target).addClass("active"), Le("#urlOnDesktop").val(t.target.value)
                }));
                const n = 'div[data-setting="onMobile"] button';
                Le(n).click((function (t) {
                    Le(n).removeClass("active"), Le(t.target).addClass("active"), Le("#urlOnMobile").val(t.target.value)
                }))
            }, changeAnalytics: function () {
                const t = "#enabledGoogleGA4";
                Le("#enabledGoogle").change((function (e) {
                    e.target.checked ? Le(t).closest("tr").show() : Le(t).closest("tr").hide()
                }))
            }, saveSetting: function () {
                Le(".wa-save").click((function (t) {
                    t.preventDefault(), "undefined" != typeof tinyMCE && tinyMCE.triggerSave();
                    const e = Le(".cat-tab-wrapper .nav-tab-active").data("action");
                    let n = Le(".cat-tabs-content form").serializeArray();
                    n.push({name: "action", value: e}, {
                        name: "nonce",
                        value: cat_wa.nonce
                    }), n = Le.param(n), Le.ajax({
                        url: cat_wa.url, type: "POST", data: n, beforeSend: function () {
                            p.saveLoading(!0)
                        }
                    }).done((function (t) {
                        const e = Le("<p/>", {
                            html: Le("<strong/>", {html: "Settings saved."}).append(Le("<button/>", {
                                class: "notice-dismiss",
                                html: Le("<span/>", {class: "screen-reader-text", html: "Dismiss this notice."}),
                                click: function () {
                                    Le(".cat_wa-alert").hide("slow")
                                }
                            }))
                        }), n = Le("<div/>", {
                            class: "notice notice-success settings-error is-dismissible cat_wa-alert",
                            html: Le("<div/>", {class: "wa__popup_notice"}).append(e)
                        });
                        Le(".cat-tab-wrapper").before(n), setTimeout((() => {
                            n.first().hide("slow")
                        }), 3e3), p.saveLoading(!1)
                    }))
                }))
            }, registerTooltip: function () {
                Ee(".cat_wa-tooltip", {
                    content: "Add a scroll bar to your widget in case you have many agents",
                    animation: "shift-away",
                    maxWidth: 250
                }), Ee('div[data-setting="onDesktop"] .btn-api', {
                    content: "https://api.whatsapp.com/",
                    animation: "shift-away"
                }), Ee('div[data-setting="onDesktop"] .btn-web', {
                    content: "https://web.whatsapp.com/",
                    animation: "shift-away"
                }), Ee('div[data-setting="onMobile"] .btn-api', {
                    content: "https://api.whatsapp.com/",
                    animation: "shift-away"
                }), Ee('div[data-setting="onMobile"] .btn-protocol', {
                    content: "whatsapp://send?phone=",
                    animation: "shift-away"
                })
            }, registerPost: function () {
                Le("#cat_post-selector").select2({
                    multiple: !0,
                    placeholder: cat_wa.i18n.select_post,
                    width: "100%",
                    allowClear: !0,
                    minimumInputLength: 1,
                    ajax: {
                        url: window.cat_wa.url, delay: 250, data: function (t) {
                            const e = Le(this).select2("data").map((t => t.id));
                            return {term: t.term, action: "cat_wa_get_posts", nonce: window.cat_wa.nonce, exclude: e}
                        }, processResults: function (t) {
                            var e = [];
                            return t && Le.each(t, (function (t, n) {
                                e.push({id: t, text: n})
                            })), {results: e}
                        }, cache: !0
                    }
                })
            }
        }, Be = function () {
            Object.values(Pe).forEach((t => t())), jQuery.validator.addMethod("domain", (function (t, e) {
                return this.optional(e) || /^https:\/\/chat.whatsapp.com/.test(t) || /^(\+)\d+$/.test(t)
            }), "Please enter a valid phone number or group link"), jQuery.validator.setDefaults({
                errorClass: "wa-validate-error",
                success: "valid"
            }), Le(".post-type-cat_wa_accounts #post").validate({
                rules: {
                    number: {required: !0, domain: !0},
                    title: {maxlength: 60},
                    predefinedText: {maxlength: 200},
                    post_title: {maxlength: 60}
                }
            })
        };
        !function (t) {
            t(document).ready((function () {
                const e = jQuery("#app, #app-woo"), n = e.attr("id"), i = new O;
                if (Be(), t.extend(cat_wa, {
                    selectedAccounts: {
                        renderId: "#" + n,
                        attrActive: "app" === n ? "widget_show" : "wc_show",
                        attrPosition: "app" === n ? "widget_position" : "wc_position",
                        init() {
                            new (g(this.renderId))({collection: i})
                        }
                    }
                }), e.length && cat_wa.selectedAccounts.init(), t("#app-design, #app-preview").length) {
                    const e = new w;
                    t("#app-design").length && new (function (t = null) {
                        if (null !== t) return Backbone.View.extend({
                            el: t,
                            events: {
                                "keypress #title": "setAttributeByEvent",
                                "keyup #title": "setAttributeByEvent",
                                "keypress #btnLabel": "setAttributeByEvent",
                                "keyup #btnLabel": "setAttributeByEvent",
                                "change #cat-wa-switch-gdpr": "setGDPR",
                                "change #isShowBtnLabel": "setAttributeByCheck",
                                "change #isShowScroll": "setAttributeByCheck",
                                "input .range input": "setRangeSlider",
                                "click .btn-left": "changeWidgetPosition",
                                "click .btn-right": "changeWidgetPosition",
                                "click .btn-expandable": "changeWidgetType",
                                "click .btn-simple": "changeWidgetType"
                            },
                            initialize: function () {
                                var t = this, e = "{ margin: 0 !important; font-size: 16px !important}";
                                jQuery(document).on("tinymce-editor-init", (function (n, i) {
                                    i && "description" == i.id && (i.on("keypress keyup", (function () {
                                        t.setAttributeByEditor("description")
                                    })), i.dom.addStyle(`p ${e}`)), i && "gdprContent" == i.id && (i.on("keypress keyup", (function () {
                                        t.setAttributeByEditor("gdprContent")
                                    })), i.dom.addStyle(`p ${e}`)), i && "responseText" == i.id && (i.on("keypress keyup", (function () {
                                        t.setAttributeByEditor("responseText")
                                    })), i.dom.addStyle(`p ${e}`))
                                })), h(".textColor").wpColorPicker({
                                    defaultColor: t.model.get("textColor"),
                                    change: function (e, n) {
                                        t.setAttribute("textColor", n.color.toString())
                                    }
                                }), h(".backgroundColor").wpColorPicker({
                                    defaultColor: t.model.get("backgroundColor"),
                                    change: function (e, n) {
                                        t.setAttribute("backgroundColor", n.color.toString())
                                    }
                                }), h("body").on("click", ".wa__btn_popup", (function () {
                                    t.changeWidgetLaunch()
                                })), this.model.view = this, this.listenTo(this.collection, "sync", this.checkWidgetType)
                            },
                            changeWidgetLaunch() {
                                const t = this;
                                var e, n;
                                h(".wa__popup_chat_box").hasClass("wa__active") ? (h(".wa__popup_chat_box").removeClass("wa__active"), h(".wa__btn_popup").removeClass("wa__active"), clearTimeout(e), h(".wa__popup_chat_box").hasClass("wa__lauch") && new Promise(((t, e) => {
                                    n = setTimeout((function () {
                                        h(".wa__popup_chat_box").removeClass("wa__pending"), h(".wa__popup_chat_box").removeClass("wa__lauch"), t(n)
                                    }), 400)
                                })).then((() => {
                                    t.setAttribute("isLaunch", !1)
                                }))) : (h(".wa__popup_chat_box").addClass("wa__pending"), h(".wa__popup_chat_box").addClass("wa__active"), h(".wa__btn_popup").addClass("wa__active"), clearTimeout(n), h(".wa__popup_chat_box").hasClass("wa__lauch") || (h(".wa__popup_chat_box").addClass("wa__pending"), h(".wa__popup_chat_box").addClass("wa__active"), h(".wa__btn_popup").addClass("wa__active"), new Promise(((t, n) => {
                                    e = setTimeout((function () {
                                        h(".wa__popup_chat_box").addClass("wa__lauch"), t(e)
                                    }), 300)
                                })).then((() => {
                                    t.setAttribute("isLaunch", !0)
                                }))))
                            },
                            changeWidgetPosition(t) {
                                const e = t.target.value;
                                h(".setting.align button").removeClass("active"), h(t.target).addClass("active"), h("#btnPosition").val(e), this.setAttribute("btnPosition", e), "left" == e && (h("#left-range-slider").show(), h("#right-range-slider").hide()), "right" == e && (h("#left-range-slider").hide(), h("#right-range-slider").show())
                            },
                            checkWidgetType() {
                                1 === this.collection.active().length ? (h(".setting.type button.btn-simple").prop("disabled", !1), h(".setting.type .btn-expandable").attr("style", ""), "simple" === this.model.get("widgetType") && h(".setting.type .btn-simple").trigger("click", [!0])) : (h(".setting.type .btn-expandable").trigger("click", [!0]), h(".setting.type .btn-simple").prop("disabled", !0), h(".setting.type .btn-expandable").css("margin-right", 0))
                            },
                            changeWidgetType(t, e = !1) {
                                const n = t.target.value;
                                h(".setting.type button").removeClass("active"), h(t.target).addClass("active"), h("#widgetType").val(n), e || this.setAttribute("widgetType", n);
                                const i = [".setting.widget-text", ".setting.widget-scrollbar", ".setting.widget-scrollbar-control", ".setting.widget-powered-by", ".setting.response-text", ".setting.description", ".setting.gdpr-content"].join(",");
                                "expandable" === n ? h(i).show() : h(i).hide()
                            },
                            setAttribute(t, e) {
                                this.model.set({[t]: e})
                            },
                            setGDPR(t) {
                                const e = t.target.checked;
                                e ? h("#cat-gdpr-editor").removeClass("hidden").show() : h("#cat-gdpr-editor").hide(), this.setAttribute("isShowGDPR", e ? "ON" : "OFF")
                            },
                            setAttributeByCheck: function (t) {
                                const e = jQuery(t.target).attr("id");
                                let n = t.target.checked;
                                "isShowBtnLabel" === e && (n = n ? "ON" : "OFF", "ON" == n ? jQuery("#btnLabelWidth, #btnLabel").closest("tr").show() : jQuery("#btnLabelWidth, #btnLabel").closest("tr").hide()), "isShowScroll" === e && (n ? jQuery("#scrollHeight").closest("tr").show() : jQuery("#scrollHeight").closest("tr").hide()), this.setAttribute(e, n)
                            },
                            setAttributeByEvent: function (t) {
                                const e = jQuery(t.target).attr("id"), n = jQuery(t.target).val();
                                this.setAttribute(e, n)
                            },
                            setAttributeByEditor: function (t) {
                                const e = tinyMCE.get(t).getContent();
                                this.setAttribute(t, e)
                            },
                            setRangeSlider: function (t) {
                                this.setAttribute(t.target.name, t.target.value)
                            }
                        })
                    }("#app-design"))({model: e, collection: i}), t("#app-preview").length && new (function (t = null) {
                        if (null !== t) return Backbone.View.extend({
                            el: t, template: _.template(h("#widget-preview").html()), initialize: function () {
                                this.listenTo(this.model, "change", this.render), this.listenTo(this.collection, "sync", this.render), this.render()
                            }, render: function () {
                                const t = this.model.toJSON();
                                return t.responseText = t.responseText.replaceAll(/\r\n\r\n/gm, "<br/>"), t.gdprContent = t.gdprContent.replaceAll(/\r\n\r\n/gm, "<br/>"), t.description = t.description.replaceAll(/\r\n\r\n/gm, "<br/>"), this.$el.html(this.template({
                                    settings: t,
                                    accounts: this.collection.active()
                                })), this.wgIcon = this.$el.find(".wa__btn_popup_icon"), this.wgBtnIcon = this.$el.find(".wa__btn_popup"), this.wgLabel = this.$el.find(".wa__btn_popup_txt"), this.wgPopup = this.$el.find(".wa__popup_chat_box"), this.wgPopupHeading = this.$el.find(".wa__popup_heading"), this.wgPopupContent = this.$el.find(".wa__popup_content"), this.wgTitle = this.$el.find(".wa__popup_title"), this.wgIntro = this.$el.find(".wa__popup_intro"), this.wgTitle.css({color: this.model.get("textColor")}), this.wgIntro.css({
                                    color: "#fff" == this.model.get("textColor") || "#ffffff" == this.model.get("textColor") ? "#D9EBC6" : this.model.get("textColor"),
                                    opacity: "#fff" == this.model.get("textColor") || "#ffffff" == this.model.get("textColor") ? 1 : .8
                                }), this.wgIcon.css({background: this.model.get("backgroundColor")}), this.wgBtnIcon.css({
                                    left: "left" === this.model.get("btnPosition") ? parseInt(this.model.get("btnLeftDistance")) : "unset",
                                    right: "right" === this.model.get("btnPosition") ? parseInt(this.model.get("btnRightDistance")) : "unset",
                                    bottom: parseInt(this.model.get("btnBottomDistance"))
                                }), this.wgLabel.css({
                                    display: "ON" === this.model.get("isShowBtnLabel") ? "block" : "none",
                                    left: "left" === this.model.get("btnPosition") ? "100%" : "unset",
                                    right: "right" === this.model.get("btnPosition") ? "100%" : "unset",
                                    marginRight: "right" === this.model.get("btnPosition") ? "7px" : "0px",
                                    marginLeft: "left" === this.model.get("btnPosition") ? "7px" : "0px",
                                    width: this.model.get("btnLabelWidth")
                                }), this.wgPopup.css({
                                    left: "left" === this.model.get("btnPosition") ? parseInt(this.model.get("btnLeftDistance")) : "unset",
                                    right: "right" === this.model.get("btnPosition") ? parseInt(this.model.get("btnRightDistance")) : "unset",
                                    bottom: parseInt(this.model.get("btnBottomDistance")) + 72
                                }), this.wgPopupHeading.css({background: this.model.get("backgroundColor")}), "ON" !== this.model.get("isShowScroll") && 1 != this.model.get("isShowScroll") || this.wgPopupContent.css({
                                    maxHeight: parseInt(this.model.get("scrollHeight")),
                                    overflow: "auto"
                                }), "left" == this.model.get("btnPosition") ? (h("#left-range-slider").show(), h("#right-range-slider").hide()) : (h("#left-range-slider").hide(), h("#right-range-slider").show()), "OFF" == this.model.get("isShowGDPR") ? h(".cat-wa-gdpr").hide() : h(".cat-wa-gdpr").show(), this
                            }
                        })
                    }("#app-preview"))({model: e, collection: i})
                }
                if (t("#wa-button, #button-design").length) {
                    const e = new x;
                    t("#wa-button").length && new (function (t = null) {
                        if (null !== t) return Backbone.View.extend({
                            el: t,
                            template: _.template(h("#button-preview").html()),
                            initialize: function () {
                                this.render(), this.listenTo(this.model, "change", this.render)
                            },
                            render: function () {
                                let t = "";
                                return t += "round" === this.model.get("type") ? "wa__r_button " : "wa__sq_button ", t += _.isEmpty(this.model.get("avatar")) ? "wa__btn_w_icon " : "wa__btn_w_img ", t += _.isEmpty(this.model.get("title")) ? "wa__button_text_only" : "", this.model.attributes.buttonClass = t, this.$el.html(this.template({buttonStyles: this.model.toJSON()})), this.btn = this.$el.find(".wa__button").css({background: this.model.get("backgroundColor")}), this.$el.find(".wa__btn_txt .wa__cs_name").css({
                                    color: "#fff" == this.model.get("textColor") || "#ffffff" == this.model.get("textColor") ? "#d5f0d9" : this.model.get("textColor"),
                                    opacity: "#fff" == this.model.get("textColor") || "#ffffff" == this.model.get("textColor") ? 1 : "0.8"
                                }), this.$el.find(".wa__btn_txt .wa__btn_title").css({color: this.model.get("textColor")}), this
                            }
                        })
                    }("#wa-button"))({model: e}), t("#button-design").length && new (function (t = null) {
                        if (null !== t) return Backbone.View.extend({
                            el: t,
                            events: {
                                "change #textColor": "setAttributeByEvent",
                                "change #backgroundColor": "setAttributeByEvent",
                                "change #label": "setAttributeByEvent",
                                "click .btn-round": "changeButtonType",
                                "click .btn-square": "changeButtonType"
                            },
                            initialize: function () {
                                const t = this;
                                this.model.view = this, h("#textColor").wpColorPicker({
                                    defaultColor: t.model.get("textColor"),
                                    change: function (e, n) {
                                        t.setAttribute("textColor", n.color.toString())
                                    }
                                }), h("#backgroundColor").wpColorPicker({
                                    defaultColor: t.model.get("backgroundColor"),
                                    change: function (e, n) {
                                        t.setAttribute("backgroundColor", n.color.toString())
                                    }
                                })
                            },
                            setAttribute(t, e) {
                                this.model.set({[t]: e})
                            },
                            setAttributeByEvent: function (t) {
                                const e = jQuery(t.target).attr("id"), n = jQuery(t.target).val();
                                this.setAttribute(e, n)
                            },
                            changeButtonType(t) {
                                const e = t.target.value;
                                h(".setting.align button").removeClass("active"), h(t.target).addClass("active"), h("#btnType").val(e);
                                const n = "round" == e ? "wa__sq_button" : "wa__r_button",
                                    i = "round" == e ? "wa__r_button" : "wa__sq_button";
                                h("#cat_wabutton > a").removeClass(n).addClass(i), setTimeout((() => {
                                    this.setAttribute("type", e)
                                }), 300)
                            },
                            render: function () {
                                let t = "";
                                return t += "round" === this.model.get("type") ? "wa__r_button " : "wa__sq_button ", t += _.isEmpty(this.model.get("avatar")) ? "wa__btn_w_icon " : "wa__btn_w_img ", t += _.isEmpty(this.model.get("title")) ? "wa__button_text_only" : "", this.model.attributes.buttonClass = t, this.$el.html(this.template({buttonStyles: this.model.toJSON()})), this
                            }
                        })
                    }("#button-design"))({model: e})
                }
            }))
        }(jQuery)
    })()
})();