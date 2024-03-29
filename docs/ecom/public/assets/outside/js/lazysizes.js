! function(e, t) {
    var r = t(e, e.document);
    e.lazySizes = r, "object" == typeof module && module.exports && (module.exports = r)
}(window, function(e, t) {
    "use strict";
    if (t.getElementsByClassName) {
        var r, i, a = t.documentElement,
            n = e.Date,
            s = e.HTMLPictureElement,
            o = "addEventListener",
            l = "getAttribute",
            u = e[o],
            c = e.setTimeout,
            d = e.requestAnimationFrame || c,
            f = e.requestIdleCallback,
            g = /^picture$/i,
            p = ["load", "error", "lazyincluded", "_lazyloaded"],
            y = {},
            z = Array.prototype.forEach,
            m = function(e, t) {
                return y[t] || (y[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), y[t].test(e[l]("class") || "") && y[t]
            },
            v = function(e, t) {
                m(e, t) || e.setAttribute("class", (e[l]("class") || "").trim() + " " + t)
            },
            b = function(e, t) {
                var r;
                (r = m(e, t)) && e.setAttribute("class", (e[l]("class") || "").replace(r, " "))
            },
            A = function(e, t, r) {
                var i = r ? o : "removeEventListener";
                r && A(e, t), p.forEach(function(r) {
                    e[i](r, t)
                })
            },
            h = function(e, i, a, n, s) {
                var o = t.createEvent("CustomEvent");
                return a || (a = {}), a.instance = r, o.initCustomEvent(i, !n, !s, a), e.dispatchEvent(o), o
            },
            E = function(t, r) {
                var a;
                !s && (a = e.picturefill || i.pf) ? a({
                    reevaluate: !0,
                    elements: [t]
                }) : r && r.src && (t.src = r.src)
            },
            C = function(e, t) {
                return (getComputedStyle(e, null) || {})[t]
            },
            w = function(e, t, r) {
                for (r = r || e.offsetWidth; r < i.minSize && t && !e._lazysizesWidth;) r = t.offsetWidth, t = t.parentNode;
                return r
            },
            _ = function() {
                var e, r, i = [],
                    a = [],
                    n = i,
                    s = function() {
                        var t = n;
                        for (n = i.length ? a : i, e = !0, r = !1; t.length;) t.shift()();
                        e = !1
                    },
                    o = function(i, a) {
                        e && !a ? i.apply(this, arguments) : (n.push(i), r || (r = !0, (t.hidden ? c : d)(s)))
                    };
                return o._lsFlush = s, o
            }(),
            S = function(e, t) {
                return t ? function() {
                    _(e)
                } : function() {
                    var t = this,
                        r = arguments;
                    _(function() {
                        e.apply(t, r)
                    })
                }
            },
            x = function(e) {
                var t, r = 0,
                    a = 125,
                    s = i.ricTimeout,
                    o = function() {
                        t = !1, r = n.now(), e()
                    },
                    l = f && i.ricTimeout ? function() {
                        f(o, {
                            timeout: s
                        }), s !== i.ricTimeout && (s = i.ricTimeout)
                    } : S(function() {
                        c(o)
                    }, !0);
                return function(e) {
                    var i;
                    (e = e === !0) && (s = 33), t || (t = !0, i = a - (n.now() - r), i < 0 && (i = 0), e || i < 9 && f ? l() : c(l, i))
                }
            },
            N = function(e) {
                var t, r, i = 99,
                    a = function() {
                        t = null, e()
                    },
                    s = function() {
                        var e = n.now() - r;
                        e < i ? c(s, i - e) : (f || a)(a)
                    };
                return function() {
                    r = n.now(), t || (t = c(s, i))
                }
            };
        ! function() {
            var t, r = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 300
            };
            i = e.lazySizesConfig || e.lazysizesConfig || {};
            for (t in r) t in i || (i[t] = r[t]);
            e.lazySizesConfig = i, c(function() {
                i.init && M()
            })
        }();
        var P = function() {
                var s, d, f, p, y, w, P, M, T, O, R, F, j, $, k = /^img$/i,
                    W = /^iframe$/i,
                    B = "onscroll" in e && !/glebot/.test(navigator.userAgent),
                    I = 0,
                    q = 0,
                    U = 0,
                    H = -1,
                    X = function(e) {
                        U--, e && e.target && A(e.target, X), (!e || U < 0 || !e.target) && (U = 0)
                    },
                    D = function(e, r) {
                        var i, n = e,
                            s = "hidden" == C(t.body, "visibility") || "hidden" != C(e, "visibility");
                        for (M -= r, R += r, T -= r, O += r; s && (n = n.offsetParent) && n != t.body && n != a;) s = (C(n, "opacity") || 1) > 0, s && "visible" != C(n, "overflow") && (i = n.getBoundingClientRect(), s = O > i.left && T < i.right && R > i.top - 1 && M < i.bottom + 1);
                        return s
                    },
                    J = function() {
                        var e, n, o, u, c, f, g, y, z, m = r.elements;
                        if ((p = i.loadMode) && U < 8 && (e = m.length)) {
                            n = 0, H++, null == j && ("expand" in i || (i.expand = a.clientHeight > 500 && a.clientWidth > 500 ? 500 : 370), F = i.expand, j = F * i.expFactor), q < j && U < 1 && H > 2 && p > 2 && !t.hidden ? (q = j, H = 0) : q = p > 1 && H > 1 && U < 6 ? F : I;
                            for (; n < e; n++)
                                if (m[n] && !m[n]._lazyRace)
                                    if (B)
                                        if ((y = m[n][l]("data-expand")) && (f = 1 * y) || (f = q), z !== f && (w = innerWidth + f * $, P = innerHeight + f, g = f * -1, z = f), o = m[n].getBoundingClientRect(), (R = o.bottom) >= g && (M = o.top) <= P && (O = o.right) >= g * $ && (T = o.left) <= w && (R || O || T || M) && (i.loadHidden || "hidden" != C(m[n], "visibility")) && (d && U < 3 && !y && (p < 3 || H < 4) || D(m[n], f))) {
                                            if (te(m[n]), c = !0, U > 9) break
                                        } else !c && d && !u && U < 4 && H < 4 && p > 2 && (s[0] || i.preloadAfterLoad) && (s[0] || !y && (R || O || T || M || "auto" != m[n][l](i.sizesAttr))) && (u = s[0] || m[n]);
                            else te(m[n]);
                            u && !c && te(u)
                        }
                    },
                    V = x(J),
                    G = function(e) {
                        v(e.target, i.loadedClass), b(e.target, i.loadingClass), A(e.target, Q), h(e.target, "lazyloaded")
                    },
                    K = S(G),
                    Q = function(e) {
                        K({
                            target: e.target
                        })
                    },
                    Y = function(e, t) {
                        try {
                            e.contentWindow.location.replace(t)
                        } catch (r) {
                            e.src = t
                        }
                    },
                    Z = function(e) {
                        var t, r = e[l](i.srcsetAttr);
                        (t = i.customMedia[e[l]("data-media") || e[l]("media")]) && e.setAttribute("media", t), r && e.setAttribute("srcset", r)
                    },
                    ee = S(function(e, t, r, a, n) {
                        var s, o, u, d, p, y;
                        (p = h(e, "lazybeforeunveil", t)).defaultPrevented || (a && (r ? v(e, i.autosizesClass) : e.setAttribute("sizes", a)), o = e[l](i.srcsetAttr), s = e[l](i.srcAttr), n && (u = e.parentNode, d = u && g.test(u.nodeName || "")), y = t.firesLoad || "src" in e && (o || s || d), p = {
                            target: e
                        }, y && (A(e, X, !0), clearTimeout(f), f = c(X, 2500), v(e, i.loadingClass), A(e, Q, !0)), d && z.call(u.getElementsByTagName("source"), Z), o ? e.setAttribute("srcset", o) : s && !d && (W.test(e.nodeName) ? Y(e, s) : e.src = s), n && (o || d) && E(e, {
                            src: s
                        })), e._lazyRace && delete e._lazyRace, b(e, i.lazyClass), _(function() {
                            (!y || e.complete && e.naturalWidth > 1) && (y ? X(p) : U--, G(p))
                        }, !0)
                    }),
                    te = function(e) {
                        var t, r = k.test(e.nodeName),
                            a = r && (e[l](i.sizesAttr) || e[l]("sizes")),
                            n = "auto" == a;
                        (!n && d || !r || !e[l]("src") && !e.srcset || e.complete || m(e, i.errorClass) || !m(e, i.lazyClass)) && (t = h(e, "lazyunveilread").detail, n && L.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, U++, ee(e, t, n, a, r))
                    },
                    re = function() {
                        if (!d) {
                            if (n.now() - y < 999) return void c(re, 999);
                            var e = N(function() {
                                i.loadMode = 3, V()
                            });
                            d = !0, i.loadMode = 3, V(), u("scroll", function() {
                                3 == i.loadMode && (i.loadMode = 2), e()
                            }, !0)
                        }
                    };
                return {
                    _: function() {
                        y = n.now(), r.elements = t.getElementsByClassName(i.lazyClass), s = t.getElementsByClassName(i.lazyClass + " " + i.preloadClass), $ = i.hFac, u("scroll", V, !0), u("resize", V, !0), e.MutationObserver ? new MutationObserver(V).observe(a, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (a[o]("DOMNodeInserted", V, !0), a[o]("DOMAttrModified", V, !0), setInterval(V, 999)), u("hashchange", V, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(e) {
                            t[o](e, V, !0)
                        }), /d$|^c/.test(t.readyState) ? re() : (u("load", re), t[o]("DOMContentLoaded", V), c(re, 2e4)), r.elements.length ? (J(), _._lsFlush()) : V()
                    },
                    checkElems: V,
                    unveil: te
                }
            }(),
            L = function() {
                var e, r = S(function(e, t, r, i) {
                        var a, n, s;
                        if (e._lazysizesWidth = i, i += "px", e.setAttribute("sizes", i), g.test(t.nodeName || ""))
                            for (a = t.getElementsByTagName("source"), n = 0, s = a.length; n < s; n++) a[n].setAttribute("sizes", i);
                        r.detail.dataAttr || E(e, r.detail)
                    }),
                    a = function(e, t, i) {
                        var a, n = e.parentNode;
                        n && (i = w(e, n, i), a = h(e, "lazybeforesizes", {
                            width: i,
                            dataAttr: !!t
                        }), a.defaultPrevented || (i = a.detail.width, i && i !== e._lazysizesWidth && r(e, n, a, i)))
                    },
                    n = function() {
                        var t, r = e.length;
                        if (r)
                            for (t = 0; t < r; t++) a(e[t])
                    },
                    s = N(n);
                return {
                    _: function() {
                        e = t.getElementsByClassName(i.autosizesClass), u("resize", s)
                    },
                    checkElems: s,
                    updateElem: a
                }
            }(),
            M = function() {
                M.i || (M.i = !0, L._(), P._())
            };
        return r = {
            cfg: i,
            autoSizer: L,
            loader: P,
            init: M,
            uP: E,
            aC: v,
            rC: b,
            hC: m,
            fire: h,
            gW: w,
            rAF: _
        }
    }
}),
function(e, t) {
    var r = function() {
        t(e.lazySizes), e.removeEventListener("lazyunveilread", r, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes"), require("../fix-ios-sizes/fix-ios-sizes")) : e.lazySizes ? r() : e.addEventListener("lazyunveilread", r, !0)
}(window, function(e, t, r) {
    "use strict";
    var i, a = r && r.cfg || e.lazySizesConfig,
        n = t.createElement("img"),
        s = "sizes" in n && "srcset" in n,
        o = /\s+\d+h/g,
        l = function() {
            var e = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                r = Array.prototype.forEach;
            return function(i) {
                var a = t.createElement("img"),
                    n = function(t) {
                        var r, i = t.getAttribute(lazySizesConfig.srcsetAttr);
                        i && (i.match(e) && (r = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1, r && t.setAttribute("data-aspectratio", r)), t.setAttribute(lazySizesConfig.srcsetAttr, i.replace(o, "")))
                    },
                    s = function(e) {
                        var t = e.target.parentNode;
                        t && "PICTURE" == t.nodeName && r.call(t.getElementsByTagName("source"), n), n(e.target)
                    },
                    l = function() {
                        a.currentSrc && t.removeEventListener("lazybeforeunveil", s)
                    };
                i[1] && (t.addEventListener("lazybeforeunveil", s), a.onload = l, a.onerror = l, a.srcset = "data:,a 1w 1h", a.complete && l())
            }
        }();
    if (a || (a = {}, e.lazySizesConfig = a), a.supportsType || (a.supportsType = function(e) {
            return !e
        }), !e.picturefill && !a.pf) {
        if (e.HTMLPictureElement && s) return t.msElementsFromPoint && l(navigator.userAgent.match(/Edge\/(\d+)/)), void(a.pf = function() {});
        a.pf = function(t) {
            var r, a;
            if (!e.picturefill)
                for (r = 0, a = t.elements.length; r < a; r++) i(t.elements[r])
        }, i = function() {
            var n = function(e, t) {
                    return e.w - t.w
                },
                l = /^\s*\d+\.*\d*px\s*$/,
                u = function(e) {
                    var t, r, i = e.length,
                        a = e[i - 1],
                        n = 0;
                    for (n; n < i; n++)
                        if (a = e[n], a.d = a.w / e.w, a.d >= e.d) {
                            !a.cached && (t = e[n - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (r = Math.pow(t.d - .6, 1.6), t.cached && (t.d += .15 * r), t.d + (a.d - e.d) * r > e.d && (a = t));
                            break
                        }
                    return a
                },
                c = function() {
                    var e, t = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                        r = /\s/,
                        i = function(t, r, i, a) {
                            e.push({
                                c: r,
                                u: i,
                                w: 1 * a
                            })
                        };
                    return function(a) {
                        return e = [], a = a.trim(), a.replace(o, "").replace(t, i), e.length || !a || r.test(a) || e.push({
                            c: a,
                            u: a,
                            w: 99
                        }), e
                    }
                }(),
                d = function() {
                    d.init || (d.init = !0, addEventListener("resize", function() {
                        var e, r = t.getElementsByClassName("lazymatchmedia"),
                            a = function() {
                                var e, t;
                                for (e = 0, t = r.length; e < t; e++) i(r[e])
                            };
                        return function() {
                            clearTimeout(e), e = setTimeout(a, 66)
                        }
                    }()))
                },
                f = function(t, i) {
                    var n, s = t.getAttribute("srcset") || t.getAttribute(a.srcsetAttr);
                    !s && i && (s = t._lazypolyfill ? t._lazypolyfill._set : t.getAttribute(a.srcAttr) || t.getAttribute("src")), t._lazypolyfill && t._lazypolyfill._set == s || (n = c(s || ""), i && t.parentNode && (n.isPicture = "PICTURE" == t.parentNode.nodeName.toUpperCase(), n.isPicture && e.matchMedia && (r.aC(t, "lazymatchmedia"), d())), n._set = s, Object.defineProperty(t, "_lazypolyfill", {
                        value: n,
                        writable: !0
                    }))
                },
                g = function(t) {
                    var i = e.devicePixelRatio || 1,
                        a = r.getX && r.getX(t);
                    return Math.min(a || i, 2.5, i)
                },
                p = function(t) {
                    return e.matchMedia ? (p = function(e) {
                        return !e || (matchMedia(e) || {}).matches
                    })(t) : !t
                },
                y = function(e) {
                    var t, i, s, o, c, d, y;
                    if (o = e, f(o, !0), c = o._lazypolyfill, c.isPicture)
                        for (i = 0, t = e.parentNode.getElementsByTagName("source"), s = t.length; i < s; i++)
                            if (a.supportsType(t[i].getAttribute("type"), e) && p(t[i].getAttribute("media"))) {
                                o = t[i], f(o), c = o._lazypolyfill;
                                break
                            }
                    return c.length > 1 ? (y = o.getAttribute("sizes") || "", y = l.test(y) && parseInt(y, 10) || r.gW(e, e.parentNode), c.d = g(e), !c.src || !c.w || c.w < y ? (c.w = y, d = u(c.sort(n)), c.src = d) : d = c.src) : d = c[0], d
                },
                z = function(e) {
                    if (!s || !e.parentNode || "PICTURE" == e.parentNode.nodeName.toUpperCase()) {
                        var t = y(e);
                        t && t.u && e._lazypolyfill.cur != t.u && (e._lazypolyfill.cur = t.u, t.cached = !0, e.setAttribute(a.srcAttr, t.u), e.setAttribute("src", t.u))
                    }
                };
            return z.parse = c, z
        }(), a.loadedClass && a.loadingClass && ! function() {
            var e = [];
            ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(t) {
                e.push(t + a.loadedClass), e.push(t + a.loadingClass)
            }), a.pf({
                elements: t.querySelectorAll(e.join(", "))
            })
        }()
    }
}),
function(e, t) {
    var r = function() {
        t(e.lazySizes), e.removeEventListener("lazyunveilread", r, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? r() : e.addEventListener("lazyunveilread", r, !0)
}(window, function(e, t, r) {
    "use strict";
    if (e.addEventListener) {
        var i, a = /^picture$/i,
            n = t.documentElement,
            s = function() {
                var e, t = /(([^,\s].[^\s]+)\s+(\d+)(w|h)(\s+(\d+)(w|h))?)/g,
                    r = function(t, r, i, a, n, s, o, l) {
                        e.push({
                            c: r,
                            u: i,
                            w: 1 * ("w" == l ? o : a)
                        })
                    };
                return function(i) {
                    return e = [], i.replace(t, r), e
                }
            }(),
            o = function() {
                var e = function(e, t) {
                        return e.w - t.w
                    },
                    t = function(t, i) {
                        var a = {
                                srcset: t.getAttribute(r.cfg.srcsetAttr) || ""
                            },
                            n = s(a.srcset);
                        return Object.defineProperty(t, i, {
                            value: a,
                            writable: !0
                        }), a.cands = n, a.index = 0, a.dirty = !1, n[0] && n[0].w ? (n.sort(e), a.cSrcset = [n[a.index].c]) : (a.cSrcset = a.srcset ? [a.srcset] : [], a.cands = []), a
                    };
                return function(e, r) {
                    var i, n, s, o;
                    if (!e[r] && (o = e.parentNode || {}, e[r] = t(e, r), e[r].isImg = !0, a.test(o.nodeName || "")))
                        for (e[r].picture = !0, i = o.getElementsByTagName("source"), n = 0, s = i.length; n < s; n++) t(i[n], r).isImg = !1;
                    return e[r]
                }
            }(),
            l = {
                _lazyOptimumx: function() {
                    var e = function(e, t, r) {
                        var i, a, n;
                        return !e || !e.d || (n = r > .7 ? .6 : .4, !(e.d >= r) && (a = Math.pow(e.d - n, 1.6) || .1, a < .1 ? a = .1 : a > 3 && (a = 3), i = e.d + (t - r) * a, i < r))
                    };
                    return function(t, r, i) {
                        var a, n;
                        for (a = 0; a < t.cands.length; a++)
                            if (n = t.cands[a], n.d = (n.w || 1) / r, !(t.index >= a)) {
                                if (!(n.d <= i || e(t.cands[a - 1], n.d, i))) break;
                                t.cSrcset.push(n.c), t.index = a
                            }
                    }
                }()
            },
            u = function() {
                var e = function(e, t, r, i, a) {
                    var n, s = e[a];
                    s && (n = s.index, l[a](s, t, r), s.dirty && n == s.index || (s.cSrcset.join(", "), e.setAttribute(i, s.cSrcset.join(", ")), s.dirty = !0))
                };
                return function(t, r, i, a, n) {
                    var s, o, l, u, c = t[n];
                    if (c.width = r, c.picture && (o = t.parentNode))
                        for (s = o.getElementsByTagName("source"), u = 0, l = s.length; u < l; u++) e(s[u], r, i, a, n);
                    e(t, r, i, a, n)
                }
            }(),
            c = function(e) {
                var t = e.getAttribute("data-optimumx") || e.getAttribute("data-maxdpr");
                return !t && i.constrainPixelDensity && (t = "auto"), t && (t = "auto" == t ? i.getOptimumX(e) : parseFloat(t, 10)), t
            },
            d = function() {
                r && !r.getOptimumX && (r.getX = c, r.pWS = s, n.removeEventListener("lazybeforeunveil", d))
            };
        n.addEventListener("lazybeforeunveil", d), setTimeout(d), i = r && r.cfg || e.lazySizesConfig, i || (i = {}, e.lazySizesConfig = i), "function" != typeof i.getOptimumX && (i.getOptimumX = function() {
            var t = e.devicePixelRatio || 1;
            return t > 2.6 ? t *= .6 : t > 1.9 ? t *= .8 : t -= .01, Math.min(Math.round(100 * t) / 100, 2)
        }), e.devicePixelRatio && addEventListener("lazybeforesizes", function(e) {
            if (e.detail.instance == r) {
                var t, a, n, s, l = e.target,
                    d = e.detail,
                    f = d.dataAttr;
                e.defaultPrevented || !(t = c(l)) || t >= devicePixelRatio || (!f || !l._lazyOptimumx || d.reloaded || i.unloadedClass && r.hC(l, i.unloadedClass) || (l._lazyOptimumx = null), a = o(l, "_lazyOptimumx"), n = d.width, n && (a.width || 0) < n && (s = f ? r.cfg.srcsetAttr : "srcset", r.rAF(function() {
                    u(l, n, t, s, "_lazyOptimumx")
                })))
            }
        })
    }
}),
function(e, t) {
    var r = function() {
        t(e.lazySizes), e.removeEventListener("lazyunveilread", r, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? r() : e.addEventListener("lazyunveilread", r, !0)
}(window, function(e, t, r) {
    "use strict";
    if (e.addEventListener) {
        var i = /\s+/g,
            a = /\s*\|\s+|\s+\|\s*/g,
            n = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
            s = /\(|\)|'/,
            o = {
                contain: 1,
                cover: 1
            },
            l = function(e) {
                var t = r.gW(e, e.parentNode);
                return (!e._lazysizesWidth || t > e._lazysizesWidth) && (e._lazysizesWidth = t), e._lazysizesWidth
            },
            u = function(e) {
                var t;
                return t = (getComputedStyle(e) || {
                    getPropertyValue: function() {}
                }).getPropertyValue("background-size"), !o[t] && o[e.style.backgroundSize] && (t = e.style.backgroundSize), t
            },
            c = function(e, r, s) {
                var o = t.createElement("picture"),
                    l = r.getAttribute(lazySizesConfig.sizesAttr),
                    u = r.getAttribute("data-ratio"),
                    c = r.getAttribute("data-optimumx");
                r._lazybgset && r._lazybgset.parentNode == r && r.removeChild(r._lazybgset), Object.defineProperty(s, "_lazybgset", {
                    value: r,
                    writable: !0
                }), Object.defineProperty(r, "_lazybgset", {
                    value: o,
                    writable: !0
                }), e = e.replace(i, " ").split(a), o.style.display = "none", s.className = lazySizesConfig.lazyClass, 1 != e.length || l || (l = "auto"), e.forEach(function(e) {
                    var r = t.createElement("source");
                    l && "auto" != l && r.setAttribute("sizes", l), e.match(n) && (r.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1), RegExp.$2 && r.setAttribute("media", lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2)), o.appendChild(r)
                }), l && (s.setAttribute(lazySizesConfig.sizesAttr, l), r.removeAttribute(lazySizesConfig.sizesAttr), r.removeAttribute("sizes")), c && s.setAttribute("data-optimumx", c), u && s.setAttribute("data-ratio", u), o.appendChild(s), r.appendChild(o)
            },
            d = function(e) {
                if (e.target._lazybgset) {
                    var t = e.target,
                        i = t._lazybgset,
                        a = t.currentSrc || t.src;
                    a && (i.style.backgroundImage = "url(" + (s.test(a) ? JSON.stringify(a) : a) + ")"), t._lazybgsetLoading && (r.fire(i, "_lazyloaded", {}, !1, !0), delete t._lazybgsetLoading)
                }
            };
        addEventListener("lazybeforeunveil", function(e) {
            var i, a, n;
            !e.defaultPrevented && (i = e.target.getAttribute("data-bgset")) && (n = e.target, a = t.createElement("img"), a.alt = "", a._lazybgsetLoading = !0, e.detail.firesLoad = !0, c(i, n, a), setTimeout(function() {
                r.loader.unveil(a), r.rAF(function() {
                    r.fire(a, "_lazyloaded", {}, !0, !0), a.complete && d({
                        target: a
                    })
                })
            }))
        }), t.addEventListener("load", d, !0), e.addEventListener("lazybeforesizes", function(e) {
            if (e.detail.instance == r && e.target._lazybgset && e.detail.dataAttr) {
                var t = e.target._lazybgset,
                    i = u(t);
                o[i] && (e.target._lazysizesParentFit = i, r.rAF(function() {
                    e.target.setAttribute("data-parent-fit", i), e.target._lazysizesParentFit && delete e.target._lazysizesParentFit
                }))
            }
        }, !0), t.documentElement.addEventListener("lazybeforesizes", function(e) {
            !e.defaultPrevented && e.target._lazybgset && e.detail.instance == r && (e.detail.width = l(e.target._lazybgset))
        })
    }
}),
function(e, t) {
    var r = function() {
        t(e.lazySizes), e.removeEventListener("lazyunveilread", r, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? r() : e.addEventListener("lazyunveilread", r, !0)
}(window, function(e, t, r) {
    "use strict";

    function i(t, r) {
        var i, a, n, s, o = e.getComputedStyle(t);
        a = t.parentNode, s = {
            isPicture: !(!a || !f.test(a.nodeName || ""))
        }, n = function(e, r) {
            var i = t.getAttribute("data-" + e);
            if (!i) {
                var a = o.getPropertyValue("--ls-" + e);
                a && (i = a.trim())
            }
            if (i) {
                if ("true" == i) i = !0;
                else if ("false" == i) i = !1;
                else if (d.test(i)) i = parseFloat(i);
                else if ("function" == typeof u[e]) i = u[e](t, i);
                else if (z.test(i)) try {
                    i = JSON.parse(i)
                } catch (n) {}
                s[e] = i
            } else e in u && "function" != typeof u[e] ? s[e] = u[e] : r && "function" == typeof u[e] && (s[e] = u[e](t, i))
        };
        for (i in u) n(i);
        return r.replace(y, function(e, t) {
            t in s || n(t, !0)
        }), s
    }

    function a(e, t) {
        var r = [],
            i = function(e, r) {
                return c[typeof t[r]] ? t[r] : e
            };
        return r.srcset = [], t.absUrl && (v.setAttribute("href", e), e = v.href), e = ((t.prefix || "") + e + (t.postfix || "")).replace(y, i), t.widths.forEach(function(i) {
            var a = t.widthmap[i] || i,
                n = {
                    u: e.replace(g, a).replace(p, t.ratio ? Math.round(i * t.ratio) : ""),
                    w: i
                };
            r.push(n), r.srcset.push(n.c = n.u + " " + i + "w")
        }), r
    }

    function n(e, r, i) {
        var n = 0,
            s = 0,
            o = i;
        if (e) {
            if ("container" === r.ratio) {
                for (n = o.scrollWidth, s = o.scrollHeight; !(n && s || o === t);) o = o.parentNode, n = o.scrollWidth, s = o.scrollHeight;
                n && s && (r.ratio = s / n)
            }
            e = a(e, r), e.isPicture = r.isPicture, A && "IMG" == i.nodeName.toUpperCase() ? i.removeAttribute(l.srcsetAttr) : i.setAttribute(l.srcsetAttr, e.srcset.join(", ")), Object.defineProperty(i, "_lazyrias", {
                value: e,
                writable: !0
            })
        }
    }

    function s(e, t) {
        var a = i(e, t);
        return u.modifyOptions.call(e, {
            target: e,
            details: a,
            detail: a
        }), r.fire(e, "lazyriasmodifyoptions", a), a
    }

    function o(e) {
        return e.getAttribute(e.getAttribute("data-srcattr") || u.srcAttr) || e.getAttribute(l.srcsetAttr) || e.getAttribute(l.srcAttr) || e.getAttribute("data-pfsrcset") || ""
    }
    var l, u, c = {
            string: 1,
            number: 1
        },
        d = /^\-*\+*\d+\.*\d*$/,
        f = /^picture$/i,
        g = /\s*\{\s*width\s*\}\s*/i,
        p = /\s*\{\s*height\s*\}\s*/i,
        y = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
        z = /^\[.*\]|\{.*\}$/,
        m = /^(?:auto|\d+(px)?)$/,
        v = t.createElement("a"),
        b = t.createElement("img"),
        A = "srcset" in b && !("sizes" in b),
        h = !!e.HTMLPictureElement && !A;
    ! function() {
        var t, i = function() {},
            a = {
                prefix: "",
                postfix: "",
                srcAttr: "data-src",
                absUrl: !1,
                modifyOptions: i,
                widthmap: {},
                ratio: !1
            };
        l = r && r.cfg || e.lazySizesConfig, l || (l = {}, e.lazySizesConfig = l), l.supportsType || (l.supportsType = function(e) {
            return !e
        }), l.rias || (l.rias = {}), u = l.rias, "widths" in u || (u.widths = [], function(e) {
            for (var t, r = 0; !t || t < 3e3;) r += 5, r > 30 && (r += 1), t = 36 * r, e.push(t)
        }(u.widths));
        for (t in a) t in u || (u[t] = a[t])
    }(), addEventListener("lazybeforesizes", function(e) {
        if (e.detail.instance == r) {
            var t, i, a, c, d, f, p, y, z, v, b, A, C;
            if (t = e.target, e.detail.dataAttr && !e.defaultPrevented && !u.disabled && (z = t.getAttribute(l.sizesAttr) || t.getAttribute("sizes")) && m.test(z)) {
                if (i = o(t), a = s(t, i), b = g.test(a.prefix) || g.test(a.postfix), a.isPicture && (c = t.parentNode))
                    for (d = c.getElementsByTagName("source"), f = 0, p = d.length; f < p; f++)(b || g.test(y = o(d[f]))) && (n(y, a, d[f]), A = !0);
                b || g.test(i) ? (n(i, a, t), A = !0) : A && (C = [], C.srcset = [], C.isPicture = !0, Object.defineProperty(t, "_lazyrias", {
                    value: C,
                    writable: !0
                })), A && (h ? t.removeAttribute(l.srcAttr) : "auto" != z && (v = {
                    width: parseInt(z, 10)
                }, E({
                    target: t,
                    detail: v
                })))
            }
        }
    }, !0);
    var E = function() {
        var i = function(e, t) {
                return e.w - t.w
            },
            a = function(e) {
                var t, r, i = e.length,
                    a = e[i - 1],
                    n = 0;
                for (n; n < i; n++)
                    if (a = e[n], a.d = a.w / e.w, a.d >= e.d) {
                        !a.cached && (t = e[n - 1]) && t.d > e.d - .13 * Math.pow(e.d, 2.2) && (r = Math.pow(t.d - .6, 1.6), t.cached && (t.d += .15 * r), t.d + (a.d - e.d) * r > e.d && (a = t));
                        break
                    }
                return a
            },
            n = function(e, t) {
                var i;
                return !e._lazyrias && r.pWS && (i = r.pWS(e.getAttribute(l.srcsetAttr || ""))).length && (Object.defineProperty(e, "_lazyrias", {
                    value: i,
                    writable: !0
                }), t && e.parentNode && (i.isPicture = "PICTURE" == e.parentNode.nodeName.toUpperCase())), e._lazyrias
            },
            s = function(t) {
                var i = e.devicePixelRatio || 1,
                    a = r.getX && r.getX(t);
                return Math.min(a || i, 2.4, i)
            },
            o = function(t, r) {
                var o, l, u, c, d, f;
                if (d = t._lazyrias, d.isPicture && e.matchMedia)
                    for (l = 0, o = t.parentNode.getElementsByTagName("source"), u = o.length; l < u; l++)
                        if (n(o[l]) && !o[l].getAttribute("type") && (!(c = o[l].getAttribute("media")) || (matchMedia(c) || {}).matches)) {
                            d = o[l]._lazyrias;
                            break
                        }
                return (!d.w || d.w < r) && (d.w = r, d.d = s(t), f = a(d.sort(i))), f
            },
            u = function(i) {
                if (i.detail.instance == r) {
                    var a, s = i.target;
                    return !A && (e.respimage || e.picturefill || lazySizesConfig.pf) ? void t.removeEventListener("lazybeforesizes", u) : void(("_lazyrias" in s || i.detail.dataAttr && n(s, !0)) && (a = o(s, i.detail.width), a && a.u && s._lazyrias.cur != a.u && (s._lazyrias.cur = a.u, a.cached = !0, r.rAF(function() {
                        s.setAttribute(l.srcAttr, a.u), s.setAttribute("src", a.u)
                    }))))
                }
            };
        return h ? u = function() {} : addEventListener("lazybeforesizes", u), u
    }()
}),
function(e, t) {
    var r = function() {
        t(e.lazySizes), e.removeEventListener("lazyunveilread", r, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? r() : e.addEventListener("lazyunveilread", r, !0)
}(window, function(e, t, r) {
    "use strict";

    function i(e, r) {
        if (!s[e]) {
            var i = t.createElement(r ? "link" : "script"),
                a = t.getElementsByTagName("script")[0];
            r ? (i.rel = "stylesheet", i.href = e) : i.src = e, s[e] = !0, s[i.src || i.href] = !0, a.parentNode.insertBefore(i, a)
        }
    }
    var a, n, s = {};
    t.addEventListener && (n = /\(|\)|\s|'/, a = function(e, r) {
        var i = t.createElement("img");
        i.onload = function() {
            i.onload = null, i.onerror = null, i = null, r()
        }, i.onerror = i.onload, i.src = e, i && i.complete && i.onload && i.onload()
    }, addEventListener("lazybeforeunveil", function(e) {
        if (e.detail.instance == r) {
            var t, s, o, l;
            e.defaultPrevented || ("none" == e.target.preload && (e.target.preload = "auto"), t = e.target.getAttribute("data-link"), t && i(t, !0), t = e.target.getAttribute("data-script"), t && i(t), t = e.target.getAttribute("data-require"), t && (r.cfg.requireJs ? r.cfg.requireJs([t]) : i(t)), o = e.target.getAttribute("data-bg"), o && (e.detail.firesLoad = !0, s = function() {
                e.target.style.backgroundImage = "url(" + (n.test(o) ? JSON.stringify(o) : o) + ")", e.detail.firesLoad = !1, r.fire(e.target, "_lazyloaded", {}, !0, !0)
            }, a(o, s)), l = e.target.getAttribute("data-poster"), l && (e.detail.firesLoad = !0, s = function() {
                e.target.poster = l, e.detail.firesLoad = !1, r.fire(e.target, "_lazyloaded", {}, !0, !0)
            }, a(l, s)))
        }
    }, !1))
}),
function(e, t) {
    var r = function(i) {
        t(e.lazySizes, i), e.removeEventListener("lazyunveilread", r, !0)
    };
    t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? r() : e.addEventListener("lazyunveilread", r, !0)
}(window, function(e, t, r, i) {
    "use strict";

    function a(e) {
        var t = getComputedStyle(e, null) || {},
            r = t.fontFamily || "",
            i = r.match(u) || "",
            a = i && r.match(c) || "";
        return a && (a = a[1]), {
            fit: i && i[1] || "",
            position: g[a] || a || "center"
        }
    }

    function n(e, t) {
        var i, a, n = r.cfg,
            s = e.cloneNode(!1),
            o = s.style,
            l = function() {
                var t = e.currentSrc || e.src;
                t && a !== t && (a = t, o.backgroundImage = "url(" + (f.test(t) ? JSON.stringify(t) : t) + ")", i || (i = !0, r.rC(s, n.loadingClass), r.aC(s, n.loadedClass)))
            },
            u = function() {
                r.rAF(l)
            };
        e._lazysizesParentFit = t.fit, e.addEventListener("lazyloaded", u, !0), e.addEventListener("load", u, !0), s.addEventListener("load", function() {
            var e = s.currentSrc || s.src;
            e && e != d && (s.src = d, s.srcset = "")
        }), r.rAF(function() {
            var i = e,
                a = e.parentNode;
            "PICTURE" == a.nodeName.toUpperCase() && (i = a, a = a.parentNode), r.rC(s, n.loadedClass), r.rC(s, n.lazyClass), r.aC(s, n.loadingClass), r.aC(s, n.objectFitClass || "lazysizes-display-clone"), s.getAttribute(n.srcsetAttr) && s.setAttribute(n.srcsetAttr, ""), s.getAttribute(n.srcAttr) && s.setAttribute(n.srcAttr, ""), s.src = d, s.srcset = "", o.backgroundRepeat = "no-repeat", o.backgroundPosition = t.position, o.backgroundSize = t.fit, i.style.display = "none", e.setAttribute("data-parent-fit", t.fit), e.setAttribute("data-parent-container", "prev"), a.insertBefore(s, i), e._lazysizesParentFit && delete e._lazysizesParentFit, e.complete && l()
        })
    }
    var s = t.createElement("a").style,
        o = "objectFit" in s,
        l = o && "objectPosition" in s,
        u = /object-fit["']*\s*:\s*["']*(contain|cover)/,
        c = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,
        d = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        f = /\(|\)|'/,
        g = {
            center: "center",
            "50% 50%": "center"
        };
    if (!o || !l) {
        var p = function(e) {
            if (e.detail.instance == r) {
                var t = e.target,
                    i = a(t);
                !i.fit || o && "center" == i.position || n(t, i)
            }
        };
        e.addEventListener("lazyunveilread", p, !0), i && i.detail && p(i)
    }
});