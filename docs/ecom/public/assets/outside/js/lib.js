! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.domDelegate = t()
    }
}(function() {
    return function t(e, i, n) {
        function r(o, a) {
            if (!i[o]) {
                if (!e[o]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(o, !0);
                    if (s) return s(o, !0);
                    var h = new Error("Cannot find module '" + o + "'");
                    throw h.code = "MODULE_NOT_FOUND", h
                }
                var c = i[o] = {
                    exports: {}
                };
                e[o][0].call(c.exports, function(t) {
                    var i = e[o][1][t];
                    return r(i ? i : t)
                }, c, c.exports, t, e, i, n)
            }
            return i[o].exports
        }
        for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
        return r
    }({
        1: [function(t, e, i) {
            "use strict";

            function n(t) {
                this.listenerMap = [{}, {}], t && this.root(t), this.handle = n.prototype.handle.bind(this)
            }

            function r(t, e) {
                return t.toLowerCase() === e.tagName.toLowerCase()
            }

            function s(t, e) {
                return this.rootElement === window ? e === document : this.rootElement === e
            }

            function o(t, e) {
                return t === e.id
            }
            e.exports = n, n.prototype.root = function(t) {
                var e, i = this.listenerMap;
                if (this.rootElement) {
                    for (e in i[1]) i[1].hasOwnProperty(e) && this.rootElement.removeEventListener(e, this.handle, !0);
                    for (e in i[0]) i[0].hasOwnProperty(e) && this.rootElement.removeEventListener(e, this.handle, !1)
                }
                if (!t || !t.addEventListener) return this.rootElement && delete this.rootElement, this;
                this.rootElement = t;
                for (e in i[1]) i[1].hasOwnProperty(e) && this.rootElement.addEventListener(e, this.handle, !0);
                for (e in i[0]) i[0].hasOwnProperty(e) && this.rootElement.addEventListener(e, this.handle, !1);
                return this
            }, n.prototype.captureForType = function(t) {
                return ["blur", "error", "focus", "load", "resize", "scroll"].indexOf(t) !== -1
            }, n.prototype.on = function(t, e, i, n) {
                var l, h, c, u;
                if (!t) throw new TypeError("Invalid event type: " + t);
                if ("function" == typeof e && (n = i, i = e, e = null), void 0 === n && (n = this.captureForType(t)), "function" != typeof i) throw new TypeError("Handler must be a type of Function");
                return l = this.rootElement, h = this.listenerMap[n ? 1 : 0], h[t] || (l && l.addEventListener(t, this.handle, n), h[t] = []), e ? /^[a-z]+$/i.test(e) ? (u = e, c = r) : /^#[a-z0-9\-_]+$/i.test(e) ? (u = e.slice(1), c = o) : (u = e, c = a) : (u = null, c = s.bind(this)), h[t].push({
                    selector: e,
                    handler: i,
                    matcher: c,
                    matcherParam: u
                }), this
            }, n.prototype.off = function(t, e, i, n) {
                var r, s, o, a, l;
                if ("function" == typeof e && (n = i, i = e, e = null), void 0 === n) return this.off(t, e, i, !0), this.off(t, e, i, !1), this;
                if (o = this.listenerMap[n ? 1 : 0], !t) {
                    for (l in o) o.hasOwnProperty(l) && this.off(l, e, i);
                    return this
                }
                if (a = o[t], !a || !a.length) return this;
                for (r = a.length - 1; r >= 0; r--) s = a[r], e && e !== s.selector || i && i !== s.handler || a.splice(r, 1);
                return a.length || (delete o[t], this.rootElement && this.rootElement.removeEventListener(t, this.handle, n)), this
            }, n.prototype.handle = function(t) {
                var e, i, n, r, s, o, a, l = t.type,
                    h = [],
                    c = "ftLabsDelegateIgnore";
                if (t[c] !== !0) {
                    switch (a = t.target, 3 === a.nodeType && (a = a.parentNode), n = this.rootElement, r = t.eventPhase || (t.target !== t.currentTarget ? 3 : 2)) {
                        case 1:
                            h = this.listenerMap[1][l];
                            break;
                        case 2:
                            this.listenerMap[0] && this.listenerMap[0][l] && (h = h.concat(this.listenerMap[0][l])), this.listenerMap[1] && this.listenerMap[1][l] && (h = h.concat(this.listenerMap[1][l]));
                            break;
                        case 3:
                            h = this.listenerMap[0][l]
                    }
                    for (i = h.length; a && i;) {
                        for (e = 0; e < i && (s = h[e]); e++)
                            if (s.matcher.call(a, s.matcherParam, a) && (o = this.fire(t, a, s)), o === !1) return t[c] = !0, void t.preventDefault();
                        if (a === n) break;
                        i = h.length, a = a.parentElement
                    }
                }
            }, n.prototype.fire = function(t, e, i) {
                return i.handler.call(e, t, e)
            };
            var a = function(t) {
                if (t) {
                    var e = t.prototype;
                    return e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector
                }
            }(Element);
            n.prototype.destroy = function() {
                this.off(), this.root()
            }
        }, {}],
        2: [function(t, e, i) {
            "use strict";
            var n = t("./delegate");
            e.exports = function(t) {
                return new n(t)
            }, e.exports.Delegate = n
        }, {
            "./delegate": 1
        }]
    }, {}, [2])(2)
});
var disableBodyScroll = function() {
    var t, e = !1,
        i = !1,
        n = function(t) {
            !1 !== i && t.target.closest(e) || t.preventDefault()
        },
        r = function(e) {
            1 === e.targetTouches.length && (t = e.targetTouches[0].clientY)
        },
        s = function(e) {
            if (1 === e.targetTouches.length) {
                var n = e.targetTouches[0].clientY - t;
                0 === i.scrollTop && n > 0 && e.preventDefault(), i.scrollHeight - i.scrollTop <= i.clientHeight && n < 0 && e.preventDefault()
            }
        };
    return function(t, o) {
        "undefined" != typeof o && (e = o, i = document.querySelector(o));
        var a = !1;
        try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            }))
        } catch (l) {}!0 === t ? (i && (i.addEventListener("touchstart", r, !1), i.addEventListener("touchmove", s, !1)), document.body.addEventListener("touchmove", n, !!a && {
            capture: !1,
            passive: !1
        })) : (i && (i.removeEventListener("touchstart", r, !1), i.removeEventListener("touchmove", s, !1)), document.body.removeEventListener("touchmove", n, !!a && {
            capture: !1,
            passive: !1
        }))
    }
}();
! function(t) {
    "use strict";

    function e() {
        var e = this;
        e.reads = [], e.writes = [], e.raf = l.bind(t), a("initialized", e)
    }

    function i(t) {
        t.scheduled || (t.scheduled = !0, t.raf(n.bind(null, t)), a("flush scheduled"))
    }

    function n(t) {
        a("flush");
        var e, n = t.writes,
            s = t.reads;
        try {
            a("flushing reads", s.length), r(s), a("flushing writes", n.length), r(n)
        } catch (o) {
            e = o
        }
        if (t.scheduled = !1, (s.length || n.length) && i(t), e) {
            if (a("task errored", e.message), !t["catch"]) throw e;
            t["catch"](e)
        }
    }

    function r(t) {
        a("run tasks");
        for (var e; e = t.shift();) e()
    }

    function s(t, e) {
        var i = t.indexOf(e);
        return !!~i && !!t.splice(i, 1)
    }

    function o(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
    }
    var a = function() {},
        l = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || function(t) {
            return setTimeout(t, 16)
        };
    e.prototype = {
        constructor: e,
        measure: function(t, e) {
            a("measure");
            var n = e ? t.bind(e) : t;
            return this.reads.push(n), i(this), n
        },
        mutate: function(t, e) {
            a("mutate");
            var n = e ? t.bind(e) : t;
            return this.writes.push(n), i(this), n
        },
        clear: function(t) {
            return a("clear", t), s(this.reads, t) || s(this.writes, t)
        },
        extend: function(t) {
            if (a("extend", t), "object" != typeof t) throw new Error("expected object");
            var e = Object.create(this);
            return o(e, t), e.fastdom = this, e.initialize && e.initialize(), e
        },
        "catch": null
    };
    var h = t.fastdom = t.fastdom || new e;
    "function" == typeof define ? define(function() {
        return h
    }) : "object" == typeof module && (module.exports = h)
}("undefined" != typeof window ? window : this),
function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function l(t, e, n) {
            var r, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, l) {
                var h = a.data(l, i);
                if (!h) return void o(i + " not initialized. Cannot call methods, i.e. " + s);
                var c = h[e];
                if (!c || "_" == e.charAt(0)) return void o(s + " is not a valid method");
                var u = c.apply(h, n);
                r = void 0 === r ? u : r
            }), void 0 !== r ? r : t
        }

        function h(t, e) {
            t.each(function(t, n) {
                var r = a.data(n, i);
                r ? (r.option(e), r._init()) : (r = new s(n, e), a.data(n, i, r))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = r.call(arguments, 1);
                return l(this, t, e)
            }
            return h(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var r = Array.prototype.slice,
        s = t.console,
        o = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return n(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return n.indexOf(e) == -1 && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return n != -1 && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], r = 0; r < i.length; r++) {
                var s = i[r],
                    o = n && n[s];
                o && (this.off(t, s), delete n[s]), s.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = l[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function r() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var r = n(e);
            s.isBoxSizeOuter = o = 200 == t(r.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (r(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = n(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == s.boxSizing, u = 0; u < h; u++) {
                var f = l[u],
                    d = s[f],
                    p = parseFloat(d);
                a[f] = isNaN(p) ? 0 : p
            }
            var m = a.paddingLeft + a.paddingRight,
                g = a.paddingTop + a.paddingBottom,
                v = a.marginLeft + a.marginRight,
                y = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                x = a.borderTopWidth + a.borderBottomWidth,
                w = c && o,
                b = t(s.width);
            b !== !1 && (a.width = b + (w ? 0 : m + _));
            var T = t(s.height);
            return T !== !1 && (a.height = T + (w ? 0 : g + x)), a.innerWidth = a.width - (m + _), a.innerHeight = a.height - (g + x), a.outerWidth = a.width + v, a.outerHeight = a.height + y, a
        }
    }
    var o, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = l.length,
        c = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
                r = n + "MatchesSelector";
            if (t[r]) return r
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var r = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n) return void r.push(t);
                e(t, n) && r.push(t);
                for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) r.push(i[s])
            }
        }), r
    }, i.debounceMethod = function(t, e, i) {
        var n = t.prototype[e],
            r = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[r];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[r] = setTimeout(function() {
                n.apply(s, e), delete s[r]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function(e, r) {
        i.docReady(function() {
            var s = i.toDashed(r),
                o = "data-" + s,
                a = document.querySelectorAll("[" + o + "]"),
                l = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(l)),
                c = o + "-options",
                u = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(o) || t.getAttribute(c);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(n && n.error("Error parsing " + o + " on " + t.className + ": " + a))
                }
                var l = new e(t, i);
                u && u.data(t, r, l)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t, this.parent = e, this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute", this.x = 0, this.shift = 0
    }, n.destroy = function() {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = ""
    }, n.getSize = function() {
        this.size = e(this.element)
    }, n.setPosition = function(t) {
        this.x = t, this.updateTarget(), this.renderPosition(t)
    }, n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }, n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }, n.wrapShift = function(t) {
        this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
    }, n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e())
}(window, function() {
    "use strict";

    function t(t) {
        this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }, e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft",
            e = this.getLastCell(),
            i = e ? e.size[t] : 0,
            n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }, e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, e.select = function() {
        this.changeSelectedClass("add")
    }, e.unselect = function() {
        this.changeSelectedClass("remove")
    }, e.changeSelectedClass = function(t) {
        this.cells.forEach(function(e) {
            e.element.classList[t]("is-selected")
        })
    }, e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, function(t, e) {
    var i = t.requestAnimationFrame || t.webkitRequestAnimationFrame,
        n = 0;
    i || (i = function(t) {
        var e = (new Date).getTime(),
            i = Math.max(0, 16 - (e - n)),
            r = setTimeout(t, i);
        return n = e + i, r
    });
    var r = {};
    r.startAnimation = function() {
        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
    }, r.animate = function() {
        this.applyDragForce(), this.applySelectedAttraction();
        var t = this.x;
        if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
            var e = this;
            i(function() {
                e.animate()
            })
        }
    };
    var s = function() {
        var t = document.documentElement.style;
        return "string" == typeof t.transform ? "transform" : "WebkitTransform"
    }();
    return r.positionSlider = function() {
        var t = this.x;
        this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft && s ? -t : t;
        var i = this.getPositionValue(t);
        this.slider.style[s] = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
        var n = this.slides[0];
        if (n) {
            var r = -this.x - n.target,
                o = r / this.slidesWidth;
            this.dispatchEvent("scroll", null, [o, r])
        }
    }, r.positionSliderAtSelected = function() {
        this.cells.length && (this.x = -this.selectedSlide.target, this.positionSlider())
    }, r.getPositionValue = function(t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }, r.settle = function(t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle"))
    }, r.shiftWrapCells = function(t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1)
    }, r._shiftCells = function(t, e, i) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                s = e > 0 ? i : 0;
            r.wrapShift(s), e -= r.size.outerWidth
        }
    }, r._unshiftCells = function(t) {
        if (t && t.length)
            for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
    }, r.integratePhysics = function() {
        this.x += this.velocity, this.velocity *= this.getFrictionFactor()
    }, r.applyForce = function(t) {
        this.velocity += t
    }, r.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, r.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, r.applyDragForce = function() {
        if (this.isPointerDown) {
            var t = this.dragX - this.x,
                e = t - this.velocity;
            this.applyForce(e)
        }
    }, r.applySelectedAttraction = function() {
        if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
            var t = this.selectedSlide.target * -1 - this.x,
                e = t * this.options.selectedAttraction;
            this.applyForce(e)
        }
    }, r
}),
function(t, e) {
    if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(i, n, r, s, o, a) {
        return e(t, i, n, r, s, o, a)
    });
    else if ("object" == typeof module && module.exports) module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var i = t.Flickity;
        t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, function(t, e, i, n, r, s, o) {
    function a(t, e) {
        for (t = n.makeArray(t); t.length;) e.appendChild(t.shift())
    }

    function l(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for Flickity: " + (i || t)));
        if (this.element = i, this.element.flickityGUID) {
            var r = d[this.element.flickityGUID];
            return r.option(e), r
        }
        h && (this.$element = h(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), this._create()
    }
    var h = t.jQuery,
        c = t.getComputedStyle,
        u = t.console,
        f = 0,
        d = {};
    l.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    }, l.createMethods = [];
    var p = l.prototype;
    n.extend(p, e.prototype), p._create = function() {
        var e = this.guid = ++f;
        this.element.flickityGUID = e, d[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this), l.createMethods.forEach(function(t) {
            this[t]()
        }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, p.option = function(t) {
        n.extend(this.options, t)
    }, p.activate = function() {
        if (!this.isActive) {
            this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
            var t = this._filterFindCellElements(this.element.children);
            a(t, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
            var e, i = this.options.initialIndex;
            e = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0, this.select(e, !1, !0), this.isInitActivated = !0
        }
    }, p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
    }, p._filterFindCellElements = function(t) {
        return n.filterFindElements(t, this.options.cellSelector)
    }, p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
    }, p._makeCells = function(t) {
        var e = this._filterFindCellElements(t),
            i = e.map(function(t) {
                return new r(t, this)
            }, this);
        return i
    }, p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }, p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }, p.positionCells = function() {
        this._sizeCells(this.cells), this._positionCells(0)
    }, p._positionCells = function(t) {
        t = t || 0, this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, r = t; r < n; r++) {
            var s = this.cells[r];
            s.setPosition(e), e += s.size.outerWidth, this.maxCellHeight = Math.max(s.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }, p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }, p.updateSlides = function() {
        if (this.slides = [], this.cells.length) {
            var t = new s(this);
            this.slides.push(t);
            var e = "left" == this.originSide,
                i = e ? "marginRight" : "marginLeft",
                n = this._getCanCellFit();
            this.cells.forEach(function(e, r) {
                if (!t.cells.length) return void t.addCell(e);
                var o = t.outerWidth - t.firstMargin + (e.size.outerWidth - e.size[i]);
                n.call(this, r, o) ? t.addCell(e) : (t.updateTarget(), t = new s(this), this.slides.push(t), t.addCell(e))
            }, this), t.updateTarget(), this.updateSelectedSlide()
        }
    }, p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t) return function() {
            return !1
        };
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e !== 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/),
            n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }, p._init = p.reposition = function() {
        this.positionCells(), this.positionSliderAtSelected()
    }, p.getSize = function() {
        this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var m = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = m[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }, p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }, p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition,
                e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }, p._getGapCells = function(t, e, i) {
        for (var n = []; t > 0;) {
            var r = this.cells[e];
            if (!r) break;
            n.push(r), e += i, t -= r.size.outerWidth
        }
        return n
    }, p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft,
                e = t ? "marginRight" : "marginLeft",
                i = t ? "marginLeft" : "marginRight",
                n = this.slideableWidth - this.getLastCell().size[i],
                r = n < this.size.innerWidth,
                s = this.cursorPosition + this.cells[0].size[e],
                o = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                r ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, s), t.target = Math.min(t.target, o))
            }, this)
        }
    }, p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), h && this.$element) {
            t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            var r = t;
            if (e) {
                var s = h.Event(e);
                s.type = t, r = s
            }
            this.$element.trigger(r, i)
        }
    }, p.select = function(t, e, i) {
        this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t] && (this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select"), this.dispatchEvent("cellSelect")))
    }, p._wrapSelect = function(t) {
        var e = this.slides.length,
            i = this.options.wrapAround && e > 1;
        if (!i) return t;
        var r = n.modulo(t, e),
            s = Math.abs(r - this.selectedIndex),
            o = Math.abs(r + e - this.selectedIndex),
            a = Math.abs(r - e - this.selectedIndex);
        !this.isDragSelect && o < s ? t += e : !this.isDragSelect && a < s && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
    }, p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }, p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }, p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
    }, p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }, p.selectCell = function(t, e, i) {
        var n;
        "number" == typeof t ? n = this.cells[t] : ("string" == typeof t && (t = this.element.querySelector(t)), n = this.getCell(t));
        for (var r = 0; n && r < this.slides.length; r++) {
            var s = this.slides[r],
                o = s.cells.indexOf(n);
            if (o != -1) return void this.select(r, e, i)
        }
    }, p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t) return i
        }
    }, p.getCells = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getCell(t);
            i && e.push(i)
        }, this), e
    }, p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }, p.getParentCell = function(t) {
        var e = this.getCell(t);
        return e ? e : (t = n.getParent(t, ".flickity-slider > *"), this.getCell(t))
    }, p.getAdjacentCellElements = function(t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + 2 * t >= i) return this.getCellElements();
        for (var r = [], s = e - t; s <= e + t; s++) {
            var o = this.options.wrapAround ? n.modulo(s, i) : s,
                a = this.slides[o];
            a && (r = r.concat(a.getCellElements()))
        }
        return r
    }, p.uiChange = function() {
        this.emitEvent("uiChange")
    }, p.childUIPointerDown = function(t) {
        this.emitEvent("childUIPointerDown", [t])
    }, p.onresize = function() {
        this.watchCSS(), this.resize()
    }, n.debounceMethod(l, "onresize", 150), p.resize = function() {
        if (this.isActive) {
            this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }, p.watchCSS = function() {
        var t = this.options.watchCSS;
        if (t) {
            var e = c(this.element, ":after").content;
            e.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
        }
    }, p.onkeydown = function(t) {
        if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))
            if (37 == t.keyCode) {
                var e = this.options.rightToLeft ? "next" : "previous";
                this.uiChange(), this[e]()
            } else if (39 == t.keyCode) {
            var i = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[i]()
        }
    }, p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.cells.forEach(function(t) {
            t.destroy()
        }), this.unselectSelectedSlide(), this.element.removeChild(this.viewport), a(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
    }, p.destroy = function() {
        this.deactivate(), t.removeEventListener("resize", this), this.emitEvent("destroy"), h && this.$element && h.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete d[this.guid]
    }, n.extend(p, o), l.data = function(t) {
        t = n.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && d[e]
    }, n.htmlInit(l, "flickity"), h && h.bridget && h.bridget("flickity", l), l.setJQuery = function(t) {
        h = t
    }, l.Cell = r, l
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i() {}

    function n() {}
    var r = n.prototype = Object.create(e.prototype);
    r.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }, r.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }, r._bindStartEvent = function(e, i) {
        i = void 0 === i || !!i;
        var n = i ? "addEventListener" : "removeEventListener";
        t.PointerEvent ? e[n]("pointerdown", this) : (e[n]("mousedown", this), e[n]("touchstart", this))
    }, r.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier) return i
        }
    }, r.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }, r.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }, r.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }, r._pointerDown = function(t, e) {
        this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
    }, r.pointerDown = function(t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    };
    var s = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return r._bindPostStartEvents = function(e) {
        if (e) {
            var i = s[e.type];
            i.forEach(function(e) {
                t.addEventListener(e, this)
            }, this), this._boundPointerEvents = i
        }
    }, r._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(e) {
            t.removeEventListener(e, this)
        }, this), delete this._boundPointerEvents)
    }, r.onmousemove = function(t) {
        this._pointerMove(t, t)
    }, r.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, r.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }, r._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }, r.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }, r.onmouseup = function(t) {
        this._pointerUp(t, t)
    }, r.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, r.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }, r._pointerUp = function(t, e) {
        this._pointerDone(), this.pointerUp(t, e)
    }, r.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }, r._pointerDone = function() {
        this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
    }, r.pointerDone = i, r.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }, r.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }, r._pointerCancel = function(t, e) {
        this._pointerDone(), this.pointerCancel(t, e)
    }, r.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }, n.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }, n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, function(t, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    return n.bindHandles = function() {
        this._bindHandles(!0)
    }, n.unbindHandles = function() {
        this._bindHandles(!1)
    }, n._bindHandles = function(e) {
        e = void 0 === e || !!e;
        for (var i = e ? "addEventListener" : "removeEventListener", n = 0; n < this.handles.length; n++) {
            var r = this.handles[n];
            this._bindStartEvent(r, e), r[i]("click", this), t.PointerEvent && (r.style.touchAction = e ? this._touchActionValue : "")
        }
    }, n._touchActionValue = "none", n.pointerDown = function(t, e) {
        if ("INPUT" == t.target.nodeName && "range" == t.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(t, e);
        var i = document.activeElement;
        i && i.blur && i.blur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
    }, n._dragPointerDown = function(t, i) {
        this.pointerDownPoint = e.getPointerPoint(i);
        var n = this.canPreventDefaultOnPointerDown(t, i);
        n && t.preventDefault()
    }, n.canPreventDefaultOnPointerDown = function(t) {
        return "SELECT" != t.target.nodeName
    }, n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
    }, n._dragPointerMove = function(t, i) {
        var n = e.getPointerPoint(i),
            r = {
                x: n.x - this.pointerDownPoint.x,
                y: n.y - this.pointerDownPoint.y
            };
        return !this.isDragging && this.hasDragStarted(r) && this._dragStart(t, i), r
    }, n.hasDragStarted = function(t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
    }, n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
    }, n._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }, n._dragStart = function(t, i) {
        this.isDragging = !0, this.dragStartPoint = e.getPointerPoint(i), this.isPreventingClicks = !0, this.dragStart(t, i)
    }, n.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }, n._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }, n.dragMove = function(t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
    }, n._dragEnd = function(t, e) {
        this.isDragging = !1, setTimeout(function() {
            delete this.isPreventingClicks
        }.bind(this)), this.dragEnd(t, e)
    }, n.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }, n.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }, n._staticClick = function(t, e) {
        if (!this.isIgnoringMouseUp || "mouseup" != t.type) {
            var i = t.target.nodeName;
            "INPUT" != i && "TEXTAREA" != i || t.target.focus(), this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
                delete this.isIgnoringMouseUp
            }.bind(this), 400))
        }
    }, n.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }, i.getPointerPoint = e.getPointerPoint, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, r) {
        return e(t, i, n, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function r(t) {
        var e = "touchstart" == t.type,
            i = "touch" == t.pointerType,
            n = u[t.target.nodeName];
        return e || i || n
    }

    function s() {
        return {
            x: t.pageXOffset,
            y: t.pageYOffset
        }
    }
    n.extend(e.defaults, {
        draggable: !0,
        dragThreshold: 3
    }), e.createMethods.push("_createDrag");
    var o = e.prototype;
    n.extend(o, i.prototype), o._touchActionValue = "pan-y";
    var a = "createTouch" in document,
        l = !1;
    o._createDrag = function() {
        this.on("activate", this.bindDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), a && !l && (t.addEventListener("touchmove", function() {}), l = !0)
    }, o.bindDrag = function() {
        this.options.draggable && !this.isDragBound && (this.element.classList.add("is-draggable"), this.handles = [this.viewport], this.bindHandles(), this.isDragBound = !0)
    }, o.unbindDrag = function() {
        this.isDragBound && (this.element.classList.remove("is-draggable"), this.unbindHandles(), delete this.isDragBound)
    }, o._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }, o._childUIPointerDownDrag = function(t) {
        t.preventDefault(), this.pointerDownFocus(t)
    };
    var h = {
            TEXTAREA: !0,
            INPUT: !0,
            OPTION: !0
        },
        c = {
            radio: !0,
            checkbox: !0,
            button: !0,
            submit: !0,
            image: !0,
            file: !0
        };
    o.pointerDown = function(e, i) {
        var n = h[e.target.nodeName] && !c[e.target.type];
        if (n) return this.isPointerDown = !1, void delete this.pointerIdentifier;
        this._dragPointerDown(e, i);
        var r = document.activeElement;
        r && r.blur && r != this.element && r != document.body && r.blur(), this.pointerDownFocus(e), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this._bindPostStartEvents(e), this.pointerDownScroll = s(), t.addEventListener("scroll", this), this.dispatchEvent("pointerDown", e, [i])
    }, o.pointerDownFocus = function(e) {
        var i = r(e);
        if (this.options.accessibility && !i) {
            var n = t.pageYOffset;
            this.element.focus(), t.pageYOffset != n && t.scrollTo(t.pageXOffset, n)
        }
    };
    var u = {
        INPUT: !0,
        SELECT: !0
    };
    return o.canPreventDefaultOnPointerDown = function(t) {
        var e = r(t);
        return !e
    }, o.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }, o.pointerUp = function(t, e) {
        delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
    }, o.pointerDone = function() {
        t.removeEventListener("scroll", this), delete this.pointerDownScroll
    }, o.dragStart = function(e, i) {
        this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i])
    }, o.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
    }, o.dragMove = function(t, e, i) {
        t.preventDefault(), this.previousDragX = this.dragX;
        var n = this.options.rightToLeft ? -1 : 1,
            r = this.dragStartPosition + i.x * n;
        if (!this.options.wrapAround && this.slides.length) {
            var s = Math.max(-this.slides[0].target, this.dragStartPosition);
            r = r > s ? .5 * (r + s) : r;
            var o = Math.min(-this.getLastSlide().target, this.dragStartPosition);
            r = r < o ? .5 * (r + o) : r
        }
        this.dragX = r, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
    }, o.dragEnd = function(t, e) {
        this.options.freeScroll && (this.isFreeScrolling = !0);
        var i = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
        } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
        delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
    }, o.dragEndRestingSelect = function() {
        var t = this.getRestingPosition(),
            e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
            i = this._getClosestResting(t, e, 1),
            n = this._getClosestResting(t, e, -1),
            r = i.distance < n.distance ? i.index : n.index;
        return r
    }, o._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, r = 1 / 0, s = this.options.contain && !this.options.wrapAround ? function(t, e) {
                return t <= e
            } : function(t, e) {
                return t < e
            }; s(e, r) && (n += i, r = e, e = this.getSlideDistance(-t, n), null !== e);) e = Math.abs(e);
        return {
            distance: r,
            index: n - i
        }
    }, o.getSlideDistance = function(t, e) {
        var i = this.slides.length,
            r = this.options.wrapAround && i > 1,
            s = r ? n.modulo(e, i) : e,
            o = this.slides[s];
        if (!o) return null;
        var a = r ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (o.target + a)
    }, o.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
            e = this.previousDragX - this.dragX;
        return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
    }, o.staticClick = function(t, e) {
        var i = this.getParentCell(t.target),
            n = i && i.element,
            r = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, r])
    }, o.onscroll = function() {
        var t = s(),
            e = this.pointerDownScroll.x - t.x,
            i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.TapListener = e(t, t.Unipointer)
}(window, function(t, e) {
    function i(t) {
        this.bindTap(t)
    }
    var n = i.prototype = Object.create(e.prototype);
    return n.bindTap = function(t) {
        t && (this.unbindTap(), this.tapElement = t, this._bindStartEvent(t, !0))
    }, n.unbindTap = function() {
        this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
    }, n.pointerUp = function(i, n) {
        if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
            var r = e.getPointerPoint(n),
                s = this.tapElement.getBoundingClientRect(),
                o = t.pageXOffset,
                a = t.pageYOffset,
                l = r.x >= s.left + o && r.x <= s.right + o && r.y >= s.top + a && r.y <= s.bottom + a;
            if (l && this.emitEvent("tap", [i, n]), "mouseup" != i.type) {
                this.isIgnoringMouseUp = !0;
                var h = this;
                setTimeout(function() {
                    delete h.isIgnoringMouseUp
                }, 400)
            }
        }
    }, n.destroy = function() {
        this.pointerDone(), this.unbindTap()
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, r) {
        return e(t, i, n, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";

    function r(t, e) {
        this.direction = t, this.parent = e, this._create()
    }

    function s(t) {
        return "string" == typeof t ? t : "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
    }
    var o = "http://www.w3.org/2000/svg";
    r.prototype = new i, r.prototype._create = function() {
        this.isEnabled = !0, this.isPrevious = this.direction == -1;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "previous" : "next");
        var i = this.createSVG();
        e.appendChild(i), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, r.prototype.activate = function() {
        this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
    }, r.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element), i.prototype.destroy.call(this), this.element.removeEventListener("click", this)
    }, r.prototype.createSVG = function() {
        var t = document.createElementNS(o, "svg");
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(o, "path"),
            i = s(this.parent.options.arrowShape);
        return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
    }, r.prototype.onTap = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }, r.prototype.handleEvent = n.handleEvent, r.prototype.onclick = function() {
        var t = document.activeElement;
        t && t == this.element && this.onTap()
    }, r.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, r.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, r.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1) return void this.enable();
        var e = t.length ? t.length - 1 : 0,
            i = this.isPrevious ? 0 : e,
            n = this.parent.selectedIndex == i ? "disable" : "enable";
        this[n]()
    }, r.prototype.destroy = function() {
        this.deactivate()
    }, n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }), e.createMethods.push("_createPrevNextButtons");
    var a = e.prototype;
    return a._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new r((-1), this), this.nextButton = new r(1, this), this.on("activate", this.activatePrevNextButtons))
    }, a.activatePrevNextButtons = function() {
        this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
    }, a.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
    }, e.PrevNextButton = r, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, r) {
        return e(t, i, n, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.TapListener, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function r(t) {
        this.parent = t, this._create()
    }
    r.prototype = new i, r.prototype._create = function() {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }, r.prototype.activate = function() {
        this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
    }, r.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder), i.prototype.destroy.call(this)
    }, r.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }, r.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = []; t;) {
            var n = document.createElement("li");
            n.className = "dot", e.appendChild(n), i.push(n), t--
        }
        this.holder.appendChild(e), this.dots = this.dots.concat(i)
    }, r.prototype.removeDots = function(t) {
        var e = this.dots.splice(this.dots.length - t, t);
        e.forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }, r.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot"), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected")
    }, r.prototype.onTap = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }, r.prototype.destroy = function() {
        this.deactivate()
    }, e.PageDots = r, n.extend(e.defaults, {
        pageDots: !0
    }), e.createMethods.push("_createPageDots");
    var s = e.prototype;
    return s._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new r(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
    }, s.activatePageDots = function() {
        this.pageDots.activate()
    }, s.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }, s.updatePageDots = function() {
        this.pageDots.setDots()
    }, s.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }, e.PageDots = r, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t, this.state = "stopped", s && (this.onVisibilityChange = function() {
            this.visibilityChange()
        }.bind(this), this.onVisibilityPlay = function() {
            this.visibilityPlay()
        }.bind(this))
    }
    var r, s;
    "hidden" in document ? (r = "hidden", s = "visibilitychange") : "webkitHidden" in document && (r = "webkitHidden", s = "webkitvisibilitychange"), n.prototype = Object.create(t.prototype), n.prototype.play = function() {
        if ("playing" != this.state) {
            var t = document[r];
            if (s && t) return void document.addEventListener(s, this.onVisibilityPlay);
            this.state = "playing", s && document.addEventListener(s, this.onVisibilityChange), this.tick()
        }
    }, n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(), this.timeout = setTimeout(function() {
                e.parent.next(!0), e.tick()
            }, t)
        }
    }, n.prototype.stop = function() {
        this.state = "stopped", this.clear(), s && document.removeEventListener(s, this.onVisibilityChange)
    }, n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }, n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused", this.clear())
    }, n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }, n.prototype.visibilityChange = function() {
        var t = document[r];
        this[t ? "pause" : "unpause"]()
    }, n.prototype.visibilityPlay = function() {
        this.play(), document.removeEventListener(s, this.onVisibilityPlay)
    }, e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }), i.createMethods.push("_createPlayer");
    var o = i.prototype;
    return o._createPlayer = function() {
        this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
    }, o.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
    }, o.playPlayer = function() {
        this.player.play()
    }, o.stopPlayer = function() {
        this.player.stop()
    }, o.pausePlayer = function() {
        this.player.pause()
    }, o.unpausePlayer = function() {
        this.player.unpause()
    }, o.deactivatePlayer = function() {
        this.player.stop(), this.element.removeEventListener("mouseenter", this)
    }, o.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
    }, o.onmouseleave = function() {
        this.player.unpause(), this.element.removeEventListener("mouseleave", this)
    }, i.Player = n, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    function n(t) {
        var e = document.createDocumentFragment();
        return t.forEach(function(t) {
            e.appendChild(t.element)
        }), e
    }
    var r = e.prototype;
    return r.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var r = this.cells.length;
            e = void 0 === e ? r : e;
            var s = n(i),
                o = e == r;
            if (o) this.slider.appendChild(s);
            else {
                var a = this.cells[e].element;
                this.slider.insertBefore(s, a)
            }
            if (0 === e) this.cells = i.concat(this.cells);
            else if (o) this.cells = this.cells.concat(i);
            else {
                var l = this.cells.splice(e, r - e);
                this.cells = this.cells.concat(i).concat(l)
            }
            this._sizeCells(i);
            var h = e > this.selectedIndex ? 0 : i.length;
            this._cellAddedRemoved(e, h)
        }
    }, r.append = function(t) {
        this.insert(t, this.cells.length)
    }, r.prepend = function(t) {
        this.insert(t, 0)
    }, r.remove = function(t) {
        var e, n, r = this.getCells(t),
            s = 0,
            o = r.length;
        for (e = 0; e < o; e++) {
            n = r[e];
            var a = this.cells.indexOf(n) < this.selectedIndex;
            s -= a ? 1 : 0
        }
        for (e = 0; e < o; e++) n = r[e], n.remove(), i.removeFrom(this.cells, n);
        r.length && this._cellAddedRemoved(0, s)
    }, r._cellAddedRemoved = function(t, e) {
        e = e || 0, this.selectedIndex += e, this.selectedIndex = Math.max(0, Math.min(this.slides.length - 1, this.selectedIndex)), this.cellChange(t, !0), this.emitEvent("cellAddedRemoved", [t, e])
    }, r.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }, r.cellChange = function(t, e) {
        var i = this.slideableWidth;
        if (this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("cellChange", [t]), this.options.freeScroll) {
            var n = i - this.slideableWidth;
            this.x += n * this.cellAlign, this.positionSlider()
        } else e && this.positionSliderAtSelected(), this.select(this.selectedIndex)
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    "use strict";

    function n(t) {
        if ("IMG" == t.nodeName && t.getAttribute("data-flickity-lazyload")) return [t];
        var e = t.querySelectorAll("img[data-flickity-lazyload]");
        return i.makeArray(e)
    }

    function r(t, e) {
        this.img = t, this.flickity = e, this.load()
    }
    e.createMethods.push("_createLazyload");
    var s = e.prototype;
    return s._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }, s.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0,
                i = this.getAdjacentCellElements(e),
                s = [];
            i.forEach(function(t) {
                var e = n(t);
                s = s.concat(e)
            }), s.forEach(function(t) {
                new r(t, this)
            }, this)
        }
    }, r.prototype.handleEvent = i.handleEvent, r.prototype.load = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload")
    }, r.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }, r.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }, r.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
            n = i && i.element;
        this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
    }, e.LazyLoader = r, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(t, e) {
    function i(t, e, i) {
        return (e - t) * i + t
    }
    t.createMethods.push("_createAsNavFor");
    var n = t.prototype;
    return n._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }, n.setNavCompanion = function(i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var r = this;
            this.onNavCompanionSelect = function() {
                r.navCompanionSelect()
            }, n.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
        }
    }, n.navCompanionSelect = function(t) {
        if (this.navCompanion) {
            var e = this.navCompanion.selectedCells[0],
                n = this.navCompanion.cells.indexOf(e),
                r = n + this.navCompanion.selectedCells.length - 1,
                s = Math.floor(i(n, r, this.navCompanion.cellAlign));
            if (this.selectCell(s, !1, t), this.removeNavSelectedElements(), !(s >= this.cells.length)) {
                var o = this.cells.slice(n, r + 1);
                this.navSelectedElements = o.map(function(t) {
                    return t.element
                }), this.changeNavSelectedClass("add")
            }
        }
    }, n.changeNavSelectedClass = function(t) {
        this.navSelectedElements.forEach(function(e) {
            e.classList[t]("is-nav-selected")
        })
    }, n.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }, n.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
    }, n.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }, n.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }, n.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
    }, t
}),
function() {
    var t;
    t = function() {
            function t(t, e) {
                var i, n;
                if (this.options = {
                        target: "instafeed",
                        get: "popular",
                        resolution: "thumbnail",
                        sortBy: "none",
                        links: !0,
                        mock: !1,
                        useHttp: !1
                    }, "object" == typeof t)
                    for (i in t) n = t[i], this.options[i] = n;
                this.context = null != e ? e : this, this.unique = this._genKey()
            }
            return t.prototype.hasNext = function() {
                return "string" == typeof this.context.nextUrl && this.context.nextUrl.length > 0
            }, t.prototype.next = function() {
                return !!this.hasNext() && this.run(this.context.nextUrl)
            }, t.prototype.run = function(e) {
                var i, n, r;
                if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
                if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
                return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && (r = document.createElement("script"), r.id = "instafeed-fetcher", r.src = e || this._buildUrl(), i = document.getElementsByTagName("head"), i[0].appendChild(r), n = "instafeedCache" + this.unique, window[n] = new t(this.options, this), window[n].unique = this.unique), !0
            }, t.prototype.parse = function(t) {
                var e, i, n, r, s, o, a, l, h, c, u, f, d, p, m, g, v, y, _, x, w, b, T, S, P, C, k, E, O, A, D, M, z;
                if ("object" != typeof t) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                    throw new Error("Invalid JSON response")
                }
                if (200 !== t.meta.code) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, t.meta.error_message), !1;
                    throw new Error("Error from Instagram: " + t.meta.error_message)
                }
                if (0 === t.data.length) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                    throw new Error("No images were returned from Instagram")
                }
                if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, t), this.context.nextUrl = "", null != t.pagination && (this.context.nextUrl = t.pagination.next_url), "none" !== this.options.sortBy) switch (D = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"), A = "least" === D[0], D[1]) {
                    case "random":
                        t.data.sort(function() {
                            return .5 - Math.random()
                        });
                        break;
                    case "recent":
                        t.data = this._sortBy(t.data, "created_time", A);
                        break;
                    case "liked":
                        t.data = this._sortBy(t.data, "likes.count", A);
                        break;
                    case "commented":
                        t.data = this._sortBy(t.data, "comments.count", A);
                        break;
                    default:
                        throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
                }
                if ("undefined" != typeof document && null !== document && this.options.mock === !1) {
                    if (g = t.data, O = parseInt(this.options.limit, 10), null != this.options.limit && g.length > O && (g = g.slice(0, O)), a = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (g = this._filter(g, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                        for (h = "", p = "", x = "", z = document.createElement("div"), u = 0, P = g.length; u < P; u++) {
                            if (f = g[u], d = f.images[this.options.resolution], "object" != typeof d) throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
                            w = d.width, y = d.height, _ = "square", w > y && (_ = "landscape"), w < y && (_ = "portrait"), m = d.url, c = window.location.protocol.indexOf("http") >= 0, c && !this.options.useHttp && (m = m.replace(/https?:\/\//, "//")), p = this._makeTemplate(this.options.template, {
                                model: f,
                                id: f.id,
                                link: f.link,
                                type: f.type,
                                image: m,
                                width: w,
                                height: y,
                                orientation: _,
                                caption: this._getObjectProperty(f, "caption.text"),
                                likes: f.likes.count,
                                comments: f.comments.count,
                                location: this._getObjectProperty(f, "location.name")
                            }), h += p
                        }
                        for (z.innerHTML = h, r = [], n = 0, i = z.childNodes.length; n < i;) r.push(z.childNodes[n]), n += 1;
                        for (T = 0, C = r.length; T < C; T++) E = r[T], a.appendChild(E)
                    } else
                        for (S = 0, k = g.length; S < k; S++) {
                            if (f = g[S], v = document.createElement("img"), d = f.images[this.options.resolution], "object" != typeof d) throw o = "No image found for resolution: " + this.options.resolution + ".", new Error(o);
                            m = d.url, c = window.location.protocol.indexOf("http") >= 0, c && !this.options.useHttp && (m = m.replace(/https?:\/\//, "//")), v.src = m, this.options.links === !0 ? (e = document.createElement("a"), e.href = f.link, e.appendChild(v), a.appendChild(e)) : a.appendChild(v)
                        }
                    if (M = this.options.target, "string" == typeof M && (M = document.getElementById(M)), null == M) throw o = 'No element with id="' + this.options.target + '" on page.', new Error(o);
                    M.appendChild(a), l = document.getElementsByTagName("head")[0], l.removeChild(document.getElementById("instafeed-fetcher")), b = "instafeedCache" + this.unique, window[b] = void 0;
                    try {
                        delete window[b]
                    } catch (I) {
                        s = I
                    }
                }
                return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
            }, t.prototype._buildUrl = function() {
                var t, e, i;
                switch (t = "https://api.instagram.com/v1", this.options.get) {
                    case "popular":
                        e = "media/popular";
                        break;
                    case "tagged":
                        if (!this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                        e = "tags/" + this.options.tagName + "/media/recent";
                        break;
                    case "location":
                        if (!this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                        e = "locations/" + this.options.locationId + "/media/recent";
                        break;
                    case "user":
                        if (!this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                        e = "users/" + this.options.userId + "/media/recent";
                        break;
                    default:
                        throw new Error("Invalid option for get: '" + this.options.get + "'.")
                }
                return i = t + "/" + e, i += null != this.options.accessToken ? "?access_token=" + this.options.accessToken : "?client_id=" + this.options.clientId, null != this.options.limit && (i += "&count=" + this.options.limit), i += "&callback=instafeedCache" + this.unique + ".parse"
            }, t.prototype._genKey = function() {
                var t;
                return t = function() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                }, "" + t() + t() + t() + t()
            }, t.prototype._makeTemplate = function(t, e) {
                var i, n, r, s, o;
                for (n = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, i = t; n.test(i);) s = i.match(n)[1], o = null != (r = this._getObjectProperty(e, s)) ? r : "", i = i.replace(n, function() {
                    return "" + o
                });
                return i
            }, t.prototype._getObjectProperty = function(t, e) {
                var i, n;
                for (e = e.replace(/\[(\w+)\]/g, ".$1"), n = e.split("."); n.length;) {
                    if (i = n.shift(), !(null != t && i in t)) return null;
                    t = t[i]
                }
                return t
            }, t.prototype._sortBy = function(t, e, i) {
                var n;
                return n = function(t, n) {
                    var r, s;
                    return r = this._getObjectProperty(t, e), s = this._getObjectProperty(n, e), i ? r > s ? 1 : -1 : r < s ? 1 : -1
                }, t.sort(n.bind(this)), t
            }, t.prototype._filter = function(t, e) {
                var i, n, r, s, o;
                for (i = [], n = function(t) {
                        if (e(t)) return i.push(t)
                    }, r = 0, o = t.length; r < o; r++) s = t[r], n(s);
                return i
            }, t
        }(),
        function(t, e) {
            return "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Instafeed = e()
        }(this, function() {
            return t
        })
}.call(this),
    function(t, e) {
        "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.PhotoSwipe = e()
    }(this, function() {
        "use strict";
        var t = function(t, e, i, n) {
            var r = {
                features: null,
                bind: function(t, e, i, n) {
                    var r = (n ? "remove" : "add") + "EventListener";
                    e = e.split(" ");
                    for (var s = 0; s < e.length; s++) e[s] && t[r](e[s], i, !1)
                },
                isArray: function(t) {
                    return t instanceof Array
                },
                createEl: function(t, e) {
                    var i = document.createElement(e || "div");
                    return t && (i.className = t), i
                },
                getScrollY: function() {
                    var t = window.pageYOffset;
                    return void 0 !== t ? t : document.documentElement.scrollTop
                },
                unbind: function(t, e, i) {
                    r.bind(t, e, i, !0)
                },
                removeClass: function(t, e) {
                    var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
                    t.className = t.className.replace(i, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                },
                addClass: function(t, e) {
                    r.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
                },
                hasClass: function(t, e) {
                    return t.className && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
                },
                getChildByClass: function(t, e) {
                    for (var i = t.firstChild; i;) {
                        if (r.hasClass(i, e)) return i;
                        i = i.nextSibling
                    }
                },
                arraySearch: function(t, e, i) {
                    for (var n = t.length; n--;)
                        if (t[n][i] === e) return n;
                    return -1
                },
                extend: function(t, e, i) {
                    for (var n in e)
                        if (e.hasOwnProperty(n)) {
                            if (i && t.hasOwnProperty(n)) continue;
                            t[n] = e[n]
                        }
                },
                easing: {
                    sine: {
                        out: function(t) {
                            return Math.sin(t * (Math.PI / 2))
                        },
                        inOut: function(t) {
                            return -(Math.cos(Math.PI * t) - 1) / 2
                        }
                    },
                    cubic: {
                        out: function(t) {
                            return --t * t * t + 1
                        }
                    }
                },
                detectFeatures: function() {
                    if (r.features) return r.features;
                    var t = r.createEl(),
                        e = t.style,
                        i = "",
                        n = {};
                    if (n.oldIE = document.all && !document.addEventListener, n.touch = "ontouchstart" in window, window.requestAnimationFrame && (n.raf = window.requestAnimationFrame, n.caf = window.cancelAnimationFrame), n.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !n.pointerEvent) {
                        var s = navigator.userAgent;
                        if (/iP(hone|od)/.test(navigator.platform)) {
                            var o = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                            o && o.length > 0 && (o = parseInt(o[1], 10), o >= 1 && o < 8 && (n.isOldIOSPhone = !0))
                        }
                        var a = s.match(/Android\s([0-9\.]*)/),
                            l = a ? a[1] : 0;
                        l = parseFloat(l), l >= 1 && (l < 4.4 && (n.isOldAndroid = !0), n.androidVersion = l), n.isMobileOpera = /opera mini|opera mobi/i.test(s)
                    }
                    for (var h, c, u = ["transform", "perspective", "animationName"], f = ["", "webkit", "Moz", "ms", "O"], d = 0; d < 4; d++) {
                        i = f[d];
                        for (var p = 0; p < 3; p++) h = u[p], c = i + (i ? h.charAt(0).toUpperCase() + h.slice(1) : h), !n[h] && c in e && (n[h] = c);
                        i && !n.raf && (i = i.toLowerCase(), n.raf = window[i + "RequestAnimationFrame"], n.raf && (n.caf = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]));
                    }
                    if (!n.raf) {
                        var m = 0;
                        n.raf = function(t) {
                            var e = (new Date).getTime(),
                                i = Math.max(0, 16 - (e - m)),
                                n = window.setTimeout(function() {
                                    t(e + i)
                                }, i);
                            return m = e + i, n
                        }, n.caf = function(t) {
                            clearTimeout(t)
                        }
                    }
                    return n.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, r.features = n, n
                }
            };
            r.detectFeatures(), r.features.oldIE && (r.bind = function(t, e, i, n) {
                e = e.split(" ");
                for (var r, s = (n ? "detach" : "attach") + "Event", o = function() {
                        i.handleEvent.call(i)
                    }, a = 0; a < e.length; a++)
                    if (r = e[a])
                        if ("object" == typeof i && i.handleEvent) {
                            if (n) {
                                if (!i["oldIE" + r]) return !1
                            } else i["oldIE" + r] = o;
                            t[s]("on" + r, i["oldIE" + r])
                        } else t[s]("on" + r, i)
            });
            var s = this,
                o = 25,
                a = 3,
                l = {
                    allowPanToNext: !0,
                    spacing: .12,
                    bgOpacity: 1,
                    mouseUsed: !1,
                    loop: !0,
                    pinchToClose: !0,
                    closeOnScroll: !0,
                    closeOnVerticalDrag: !0,
                    verticalDragRange: .75,
                    hideAnimationDuration: 333,
                    showAnimationDuration: 333,
                    showHideOpacity: !1,
                    focus: !0,
                    escKey: !0,
                    arrowKeys: !0,
                    mainScrollEndFriction: .35,
                    panEndFriction: .35,
                    isClickableElement: function(t) {
                        return "A" === t.tagName
                    },
                    getDoubleTapZoom: function(t, e) {
                        return t ? 1 : e.initialZoomLevel < .7 ? 1 : 1.33
                    },
                    maxSpreadZoom: 1.33,
                    modal: !0,
                    scaleMode: "fit"
                };
            r.extend(l, n);
            var h, c, u, f, d, p, m, g, v, y, _, x, w, b, T, S, P, C, k, E, O, A, D, M, z, I, L, R, F, N, j, B, X, U, W, Y, q, H, Z, V, G, Q, $, K, J, tt, et, it, nt, rt, st, ot, at, lt, ht, ct, ut, ft = function() {
                    return {
                        x: 0,
                        y: 0
                    }
                },
                dt = ft(),
                pt = ft(),
                mt = ft(),
                gt = {},
                vt = 0,
                yt = {},
                _t = ft(),
                xt = 0,
                wt = !0,
                bt = [],
                Tt = {},
                St = !1,
                Pt = function(t, e) {
                    r.extend(s, e.publicMethods), bt.push(t)
                },
                Ct = function(t) {
                    var e = ti();
                    return t > e - 1 ? t - e : t < 0 ? e + t : t
                },
                kt = {},
                Et = function(t, e) {
                    return kt[t] || (kt[t] = []), kt[t].push(e)
                },
                Ot = function(t) {
                    var e = kt[t];
                    if (e) {
                        var i = Array.prototype.slice.call(arguments);
                        i.shift();
                        for (var n = 0; n < e.length; n++) e[n].apply(s, i)
                    }
                },
                At = function() {
                    return (new Date).getTime()
                },
                Dt = function(t) {
                    ht = t, s.bg.style.opacity = t * l.bgOpacity
                },
                Mt = function(t, e, i, n, r) {
                    (!St || r && r !== s.currItem) && (n /= r ? r.fitRatio : s.currItem.fitRatio), t[A] = x + e + "px, " + i + "px" + w + " scale(" + n + ")"
                },
                zt = function(t) {
                    rt && (t && (y > s.currItem.fitRatio ? St || (fi(s.currItem, !1, !0), St = !0) : St && (fi(s.currItem), St = !1)), Mt(rt, mt.x, mt.y, y))
                },
                It = function(t) {
                    t.container && Mt(t.container.style, t.initialPosition.x, t.initialPosition.y, t.initialZoomLevel, t)
                },
                Lt = function(t, e) {
                    e[A] = x + t + "px, 0px" + w
                },
                Rt = function(t, e) {
                    if (!l.loop && e) {
                        var i = f + (_t.x * vt - t) / _t.x,
                            n = Math.round(t - _e.x);
                        (i < 0 && n > 0 || i >= ti() - 1 && n < 0) && (t = _e.x + n * l.mainScrollEndFriction)
                    }
                    _e.x = t, Lt(t, d)
                },
                Ft = function(t, e) {
                    var i = xe[t] - yt[t];
                    return pt[t] + dt[t] + i - i * (e / _)
                },
                Nt = function(t, e) {
                    t.x = e.x, t.y = e.y, e.id && (t.id = e.id)
                },
                jt = function(t) {
                    t.x = Math.round(t.x), t.y = Math.round(t.y)
                },
                Bt = null,
                Xt = function() {
                    Bt && (r.unbind(document, "mousemove", Xt), r.addClass(t, "pswp--has_mouse"), l.mouseUsed = !0, Ot("mouseUsed")), Bt = setTimeout(function() {
                        Bt = null
                    }, 100)
                },
                Ut = function() {
                    r.bind(document, "keydown", s), j.transform && r.bind(s.scrollWrap, "click", s), l.mouseUsed || r.bind(document, "mousemove", Xt), r.bind(window, "resize scroll orientationchange", s), Ot("bindEvents")
                },
                Wt = function() {
                    r.unbind(window, "resize scroll orientationchange", s), r.unbind(window, "scroll", v.scroll), r.unbind(document, "keydown", s), r.unbind(document, "mousemove", Xt), j.transform && r.unbind(s.scrollWrap, "click", s), Z && r.unbind(window, m, s), clearTimeout(B), Ot("unbindEvents")
                },
                Yt = function(t, e) {
                    var i = li(s.currItem, gt, t);
                    return e && (nt = i), i
                },
                qt = function(t) {
                    return t || (t = s.currItem), t.fitRatio
                },
                Ht = function(t) {
                    return t || (t = s.currItem), t.w > 0 ? l.maxSpreadZoom : 1
                },
                Zt = function(t, e, i, n) {
                    return n === s.currItem.initialZoomLevel ? (i[t] = s.currItem.initialPosition[t], !0) : (i[t] = Ft(t, n), i[t] > e.min[t] ? (i[t] = e.min[t], !0) : i[t] < e.max[t] && (i[t] = e.max[t], !0))
                },
                Vt = function() {
                    if (A) {
                        var e = j.perspective && !M;
                        return x = "translate" + (e ? "3d(" : "("), void(w = j.perspective ? ", 0px)" : ")")
                    }
                    A = "left", r.addClass(t, "pswp--ie"), Lt = function(t, e) {
                        e.left = t + "px"
                    }, It = function(t) {
                        var e = t.fitRatio > 1 ? 1 : t.fitRatio,
                            i = t.container.style,
                            n = e * t.w,
                            r = e * t.h;
                        i.width = n + "px", i.height = r + "px", i.left = t.initialPosition.x + "px", i.top = t.initialPosition.y + "px"
                    }, zt = function() {
                        if (rt) {
                            var t = rt,
                                e = s.currItem,
                                i = e.fitRatio > 1 ? 1 : e.fitRatio,
                                n = i * e.w,
                                r = i * e.h;
                            t.width = n + "px", t.height = r + "px", t.left = mt.x + "px", t.top = mt.y + "px"
                        }
                    }
                },
                Gt = function(t) {
                    var e = "";
                    l.escKey && 27 === t.keyCode ? e = "close" : l.arrowKeys && (37 === t.keyCode ? e = "prev" : 39 === t.keyCode && (e = "next")), e && (t.ctrlKey || t.altKey || t.shiftKey || t.metaKey || (t.preventDefault ? t.preventDefault() : t.returnValue = !1, s[e]()))
                },
                Qt = function(t) {
                    t && (Q || G || st || q) && (t.preventDefault(), t.stopPropagation())
                },
                $t = function() {
                    s.setScrollOffset(0, r.getScrollY())
                },
                Kt = {},
                Jt = 0,
                te = function(t) {
                    Kt[t] && (Kt[t].raf && I(Kt[t].raf), Jt--, delete Kt[t])
                },
                ee = function(t) {
                    Kt[t] && te(t), Kt[t] || (Jt++, Kt[t] = {})
                },
                ie = function() {
                    for (var t in Kt) Kt.hasOwnProperty(t) && te(t)
                },
                ne = function(t, e, i, n, r, s, o) {
                    var a, l = At();
                    ee(t);
                    var h = function() {
                        if (Kt[t]) {
                            if (a = At() - l, a >= n) return te(t), s(i), void(o && o());
                            s((i - e) * r(a / n) + e), Kt[t].raf = z(h)
                        }
                    };
                    h()
                },
                re = {
                    shout: Ot,
                    listen: Et,
                    viewportSize: gt,
                    options: l,
                    isMainScrollAnimating: function() {
                        return st
                    },
                    getZoomLevel: function() {
                        return y
                    },
                    getCurrentIndex: function() {
                        return f
                    },
                    isDragging: function() {
                        return Z
                    },
                    isZooming: function() {
                        return tt
                    },
                    setScrollOffset: function(t, e) {
                        yt.x = t, N = yt.y = e, Ot("updateScrollOffset", yt)
                    },
                    applyZoomPan: function(t, e, i, n) {
                        mt.x = e, mt.y = i, y = t, zt(n)
                    },
                    init: function() {
                        if (!h && !c) {
                            var i;
                            s.framework = r, s.template = t, s.bg = r.getChildByClass(t, "pswp__bg"), L = t.className, h = !0, j = r.detectFeatures(), z = j.raf, I = j.caf, A = j.transform, F = j.oldIE, s.scrollWrap = r.getChildByClass(t, "pswp__scroll-wrap"), s.container = r.getChildByClass(s.scrollWrap, "pswp__container"), d = s.container.style, s.itemHolders = S = [{
                                el: s.container.children[0],
                                wrap: 0,
                                index: -1
                            }, {
                                el: s.container.children[1],
                                wrap: 0,
                                index: -1
                            }, {
                                el: s.container.children[2],
                                wrap: 0,
                                index: -1
                            }], S[0].el.style.display = S[2].el.style.display = "none", Vt(), v = {
                                resize: s.updateSize,
                                orientationchange: function() {
                                    clearTimeout(B), B = setTimeout(function() {
                                        gt.x !== s.scrollWrap.clientWidth && s.updateSize()
                                    }, 500)
                                },
                                scroll: $t,
                                keydown: Gt,
                                click: Qt
                            };
                            var n = j.isOldIOSPhone || j.isOldAndroid || j.isMobileOpera;
                            for (j.animationName && j.transform && !n || (l.showAnimationDuration = l.hideAnimationDuration = 0), i = 0; i < bt.length; i++) s["init" + bt[i]]();
                            if (e) {
                                var o = s.ui = new e(s, r);
                                o.init()
                            }
                            Ot("firstUpdate"), f = f || l.index || 0, (isNaN(f) || f < 0 || f >= ti()) && (f = 0), s.currItem = Je(f), (j.isOldIOSPhone || j.isOldAndroid) && (wt = !1), t.setAttribute("aria-hidden", "false"), l.modal && (wt ? t.style.position = "fixed" : (t.style.position = "absolute", t.style.top = r.getScrollY() + "px")), void 0 === N && (Ot("initialLayout"), N = R = r.getScrollY());
                            var u = "pswp--open ";
                            for (l.mainClass && (u += l.mainClass + " "), l.showHideOpacity && (u += "pswp--animate_opacity "), u += M ? "pswp--touch" : "pswp--notouch", u += j.animationName ? " pswp--css_animation" : "", u += j.svg ? " pswp--svg" : "", r.addClass(t, u), s.updateSize(), p = -1, xt = null, i = 0; i < a; i++) Lt((i + p) * _t.x, S[i].el.style);
                            F || r.bind(s.scrollWrap, g, s), Et("initialZoomInEnd", function() {
                                s.setContent(S[0], f - 1), s.setContent(S[2], f + 1), S[0].el.style.display = S[2].el.style.display = "block", l.focus && t.focus(), Ut()
                            }), s.setContent(S[1], f), s.updateCurrItem(), Ot("afterInit"), wt || (b = setInterval(function() {
                                Jt || Z || tt || y !== s.currItem.initialZoomLevel || s.updateSize()
                            }, 1e3)), r.addClass(t, "pswp--visible")
                        }
                    },
                    close: function() {
                        h && (h = !1, c = !0, Ot("close"), Wt(), ii(s.currItem, null, !0, s.destroy))
                    },
                    destroy: function() {
                        Ot("destroy"), Ge && clearTimeout(Ge), t.setAttribute("aria-hidden", "true"), t.className = L, b && clearInterval(b), r.unbind(s.scrollWrap, g, s), r.unbind(window, "scroll", s), Pe(), ie(), kt = null
                    },
                    panTo: function(t, e, i) {
                        i || (t > nt.min.x ? t = nt.min.x : t < nt.max.x && (t = nt.max.x), e > nt.min.y ? e = nt.min.y : e < nt.max.y && (e = nt.max.y)), mt.x = t, mt.y = e, zt()
                    },
                    handleEvent: function(t) {
                        t = t || window.event, v[t.type] && v[t.type](t)
                    },
                    goTo: function(t) {
                        t = Ct(t);
                        var e = t - f;
                        xt = e, f = t, s.currItem = Je(f), vt -= e, Rt(_t.x * vt), ie(), st = !1, s.updateCurrItem()
                    },
                    next: function() {
                        s.goTo(f + 1)
                    },
                    prev: function() {
                        s.goTo(f - 1)
                    },
                    updateCurrZoomItem: function(t) {
                        if (t && Ot("beforeChange", 0), S[1].el.children.length) {
                            var e = S[1].el.children[0];
                            rt = r.hasClass(e, "pswp__zoom-wrap") ? e.style : null
                        } else rt = null;
                        nt = s.currItem.bounds, _ = y = s.currItem.initialZoomLevel, mt.x = nt.center.x, mt.y = nt.center.y, t && Ot("afterChange")
                    },
                    invalidateCurrItems: function() {
                        T = !0;
                        for (var t = 0; t < a; t++) S[t].item && (S[t].item.needsUpdate = !0)
                    },
                    updateCurrItem: function(t) {
                        if (0 !== xt) {
                            var e, i = Math.abs(xt);
                            if (!(t && i < 2)) {
                                s.currItem = Je(f), St = !1, Ot("beforeChange", xt), i >= a && (p += xt + (xt > 0 ? -a : a), i = a);
                                for (var n = 0; n < i; n++) xt > 0 ? (e = S.shift(), S[a - 1] = e, p++, Lt((p + 2) * _t.x, e.el.style), s.setContent(e, f - i + n + 1 + 1)) : (e = S.pop(), S.unshift(e), p--, Lt(p * _t.x, e.el.style), s.setContent(e, f + i - n - 1 - 1));
                                if (rt && 1 === Math.abs(xt)) {
                                    var r = Je(P);
                                    r.initialZoomLevel !== y && (li(r, gt), fi(r), It(r))
                                }
                                xt = 0, s.updateCurrZoomItem(), P = f, Ot("afterChange")
                            }
                        }
                    },
                    updateSize: function(e) {
                        if (!wt && l.modal) {
                            var i = r.getScrollY();
                            if (N !== i && (t.style.top = i + "px", N = i), !e && Tt.x === window.innerWidth && Tt.y === window.innerHeight) return;
                            Tt.x = window.innerWidth, Tt.y = window.innerHeight, t.style.height = Tt.y + "px"
                        }
                        if (gt.x = s.scrollWrap.clientWidth, gt.y = s.scrollWrap.clientHeight, $t(), _t.x = gt.x + Math.round(gt.x * l.spacing), _t.y = gt.y, Rt(_t.x * vt), Ot("beforeResize"), void 0 !== p) {
                            for (var n, o, h, c = 0; c < a; c++) n = S[c], Lt((c + p) * _t.x, n.el.style), h = f + c - 1, l.loop && ti() > 2 && (h = Ct(h)), o = Je(h), o && (T || o.needsUpdate || !o.bounds) ? (s.cleanSlide(o), s.setContent(n, h), 1 === c && (s.currItem = o, s.updateCurrZoomItem(!0)), o.needsUpdate = !1) : n.index === -1 && h >= 0 && s.setContent(n, h), o && o.container && (li(o, gt), fi(o), It(o));
                            T = !1
                        }
                        _ = y = s.currItem.initialZoomLevel, nt = s.currItem.bounds, nt && (mt.x = nt.center.x, mt.y = nt.center.y, zt(!0)), Ot("resize")
                    },
                    zoomTo: function(t, e, i, n, s) {
                        e && (_ = y, xe.x = Math.abs(e.x) - mt.x, xe.y = Math.abs(e.y) - mt.y, Nt(pt, mt));
                        var o = Yt(t, !1),
                            a = {};
                        Zt("x", o, a, t), Zt("y", o, a, t);
                        var l = y,
                            h = {
                                x: mt.x,
                                y: mt.y
                            };
                        jt(a);
                        var c = function(e) {
                            1 === e ? (y = t, mt.x = a.x, mt.y = a.y) : (y = (t - l) * e + l, mt.x = (a.x - h.x) * e + h.x, mt.y = (a.y - h.y) * e + h.y), s && s(e), zt(1 === e)
                        };
                        i ? ne("customZoomTo", 0, 1, i, n || r.easing.sine.inOut, c) : c(1)
                    }
                },
                se = 30,
                oe = 10,
                ae = {},
                le = {},
                he = {},
                ce = {},
                ue = {},
                fe = [],
                de = {},
                pe = [],
                me = {},
                ge = 0,
                ve = ft(),
                ye = 0,
                _e = ft(),
                xe = ft(),
                we = ft(),
                be = function(t, e) {
                    return t.x === e.x && t.y === e.y
                },
                Te = function(t, e) {
                    return Math.abs(t.x - e.x) < o && Math.abs(t.y - e.y) < o
                },
                Se = function(t, e) {
                    return me.x = Math.abs(t.x - e.x), me.y = Math.abs(t.y - e.y), Math.sqrt(me.x * me.x + me.y * me.y)
                },
                Pe = function() {
                    $ && (I($), $ = null)
                },
                Ce = function() {
                    Z && ($ = z(Ce), Ue())
                },
                ke = function() {
                    return !("fit" === l.scaleMode && y === s.currItem.initialZoomLevel)
                },
                Ee = function(t, e) {
                    return !(!t || t === document) && (!(t.getAttribute("class") && t.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (e(t) ? t : Ee(t.parentNode, e)))
                },
                Oe = {},
                Ae = function(t, e) {
                    return Oe.prevent = !Ee(t.target, l.isClickableElement), Ot("preventDragEvent", t, e, Oe), Oe.prevent
                },
                De = function(t, e) {
                    return e.x = t.pageX, e.y = t.pageY, e.id = t.identifier, e
                },
                Me = function(t, e, i) {
                    i.x = .5 * (t.x + e.x), i.y = .5 * (t.y + e.y)
                },
                ze = function(t, e, i) {
                    if (t - U > 50) {
                        var n = pe.length > 2 ? pe.shift() : {};
                        n.x = e, n.y = i, pe.push(n), U = t
                    }
                },
                Ie = function() {
                    var t = mt.y - s.currItem.initialPosition.y;
                    return 1 - Math.abs(t / (gt.y / 2))
                },
                Le = {},
                Re = {},
                Fe = [],
                Ne = function(t) {
                    for (; Fe.length > 0;) Fe.pop();
                    return D ? (ut = 0, fe.forEach(function(t) {
                        0 === ut ? Fe[0] = t : 1 === ut && (Fe[1] = t), ut++
                    })) : t.type.indexOf("touch") > -1 ? t.touches && t.touches.length > 0 && (Fe[0] = De(t.touches[0], Le), t.touches.length > 1 && (Fe[1] = De(t.touches[1], Re))) : (Le.x = t.pageX, Le.y = t.pageY, Le.id = "", Fe[0] = Le), Fe
                },
                je = function(t, e) {
                    var i, n, r, o, a = 0,
                        h = mt[t] + e[t],
                        c = e[t] > 0,
                        u = _e.x + e.x,
                        f = _e.x - de.x;
                    return i = h > nt.min[t] || h < nt.max[t] ? l.panEndFriction : 1, h = mt[t] + e[t] * i, l.allowPanToNext && (rt ? "h" !== ot || "x" !== t || G || (c ? (h > nt.min[t] && (i = l.panEndFriction, a = nt.min[t] - h, n = nt.min[t] - pt[t]), (n <= 0 || f < 0) && ti() > 1 ? (o = u, f < 0 && u > de.x && (o = de.x)) : nt.min.x !== nt.max.x && (r = h)) : (h < nt.max[t] && (i = l.panEndFriction, a = h - nt.max[t], n = pt[t] - nt.max[t]), (n <= 0 || f > 0) && ti() > 1 ? (o = u, f > 0 && u < de.x && (o = de.x)) : nt.min.x !== nt.max.x && (r = h))) : o = u, "x" === t) ? (void 0 !== o && (Rt(o, !0), K = o !== de.x), nt.min.x !== nt.max.x && (void 0 !== r ? mt.x = r : K || (mt.x += e.x * i)), void 0 !== o) : void(st || K || y > s.currItem.fitRatio && (mt[t] += e[t] * i))
                },
                Be = function(t) {
                    if (!("mousedown" === t.type && t.button > 0)) {
                        if (Ke) return void t.preventDefault();
                        if (!H || "mousedown" !== t.type) {
                            if (Ae(t, !0) && t.preventDefault(), Ot("pointerDown"), D) {
                                var e = r.arraySearch(fe, t.pointerId, "id");
                                e < 0 && (e = fe.length), fe[e] = {
                                    x: t.pageX,
                                    y: t.pageY,
                                    id: t.pointerId
                                }
                            }
                            var i = Ne(t),
                                n = i.length;
                            J = null, ie(), Z && 1 !== n || (Z = at = !0, r.bind(window, m, s), Y = ct = lt = q = K = Q = V = G = !1, ot = null, Ot("firstTouchStart", i), Nt(pt, mt), dt.x = dt.y = 0, Nt(ce, i[0]), Nt(ue, ce), de.x = _t.x * vt, pe = [{
                                x: ce.x,
                                y: ce.y
                            }], U = X = At(), Yt(y, !0), Pe(), Ce()), !tt && n > 1 && !st && !K && (_ = y, G = !1, tt = V = !0, dt.y = dt.x = 0, Nt(pt, mt), Nt(ae, i[0]), Nt(le, i[1]), Me(ae, le, we), xe.x = Math.abs(we.x) - mt.x, xe.y = Math.abs(we.y) - mt.y, et = it = Se(ae, le))
                        }
                    }
                },
                Xe = function(t) {
                    if (t.preventDefault(), D) {
                        var e = r.arraySearch(fe, t.pointerId, "id");
                        if (e > -1) {
                            var i = fe[e];
                            i.x = t.pageX, i.y = t.pageY
                        }
                    }
                    if (Z) {
                        var n = Ne(t);
                        if (ot || Q || tt) J = n;
                        else if (_e.x !== _t.x * vt) ot = "h";
                        else {
                            var s = Math.abs(n[0].x - ce.x) - Math.abs(n[0].y - ce.y);
                            Math.abs(s) >= oe && (ot = s > 0 ? "h" : "v", J = n)
                        }
                    }
                },
                Ue = function() {
                    if (J) {
                        var t = J.length;
                        if (0 !== t)
                            if (Nt(ae, J[0]), he.x = ae.x - ce.x, he.y = ae.y - ce.y, tt && t > 1) {
                                if (ce.x = ae.x, ce.y = ae.y, !he.x && !he.y && be(J[1], le)) return;
                                Nt(le, J[1]), G || (G = !0, Ot("zoomGestureStarted"));
                                var e = Se(ae, le),
                                    i = Ze(e);
                                i > s.currItem.initialZoomLevel + s.currItem.initialZoomLevel / 15 && (ct = !0);
                                var n = 1,
                                    r = qt(),
                                    o = Ht();
                                if (i < r)
                                    if (l.pinchToClose && !ct && _ <= s.currItem.initialZoomLevel) {
                                        var a = r - i,
                                            h = 1 - a / (r / 1.2);
                                        Dt(h), Ot("onPinchClose", h), lt = !0
                                    } else n = (r - i) / r, n > 1 && (n = 1), i = r - n * (r / 3);
                                else i > o && (n = (i - o) / (6 * r), n > 1 && (n = 1), i = o + n * r);
                                n < 0 && (n = 0), et = e, Me(ae, le, ve), dt.x += ve.x - we.x, dt.y += ve.y - we.y, Nt(we, ve), mt.x = Ft("x", i), mt.y = Ft("y", i), Y = i > y, y = i, zt()
                            } else {
                                if (!ot) return;
                                if (at && (at = !1, Math.abs(he.x) >= oe && (he.x -= J[0].x - ue.x), Math.abs(he.y) >= oe && (he.y -= J[0].y - ue.y)), ce.x = ae.x, ce.y = ae.y, 0 === he.x && 0 === he.y) return;
                                if ("v" === ot && l.closeOnVerticalDrag && !ke()) {
                                    dt.y += he.y, mt.y += he.y;
                                    var c = Ie();
                                    return q = !0, Ot("onVerticalDrag", c), Dt(c), void zt()
                                }
                                ze(At(), ae.x, ae.y), Q = !0, nt = s.currItem.bounds;
                                var u = je("x", he);
                                u || (je("y", he), jt(mt), zt())
                            }
                    }
                },
                We = function(t) {
                    if (j.isOldAndroid) {
                        if (H && "mouseup" === t.type) return;
                        t.type.indexOf("touch") > -1 && (clearTimeout(H), H = setTimeout(function() {
                            H = 0
                        }, 600))
                    }
                    Ot("pointerUp"), Ae(t, !1) && t.preventDefault();
                    var e;
                    if (D) {
                        var i = r.arraySearch(fe, t.pointerId, "id");
                        if (i > -1)
                            if (e = fe.splice(i, 1)[0], navigator.pointerEnabled) e.type = t.pointerType || "mouse";
                            else {
                                var n = {
                                    4: "mouse",
                                    2: "touch",
                                    3: "pen"
                                };
                                e.type = n[t.pointerType], e.type || (e.type = t.pointerType || "mouse")
                            }
                    }
                    var o, a = Ne(t),
                        h = a.length;
                    if ("mouseup" === t.type && (h = 0), 2 === h) return J = null, !0;
                    1 === h && Nt(ue, a[0]), 0 !== h || ot || st || (e || ("mouseup" === t.type ? e = {
                        x: t.pageX,
                        y: t.pageY,
                        type: "mouse"
                    } : t.changedTouches && t.changedTouches[0] && (e = {
                        x: t.changedTouches[0].pageX,
                        y: t.changedTouches[0].pageY,
                        type: "touch"
                    })), Ot("touchRelease", t, e));
                    var c = -1;
                    if (0 === h && (Z = !1, r.unbind(window, m, s), Pe(), tt ? c = 0 : ye !== -1 && (c = At() - ye)), ye = 1 === h ? At() : -1, o = c !== -1 && c < 150 ? "zoom" : "swipe", tt && h < 2 && (tt = !1, 1 === h && (o = "zoomPointerUp"), Ot("zoomGestureEnded")), J = null, Q || G || st || q)
                        if (ie(), W || (W = Ye()), W.calculateSwipeSpeed("x"), q) {
                            var u = Ie();
                            if (u < l.verticalDragRange) s.close();
                            else {
                                var f = mt.y,
                                    d = ht;
                                ne("verticalDrag", 0, 1, 300, r.easing.cubic.out, function(t) {
                                    mt.y = (s.currItem.initialPosition.y - f) * t + f, Dt((1 - d) * t + d), zt()
                                }), Ot("onVerticalDrag", 1)
                            }
                        } else {
                            if ((K || st) && 0 === h) {
                                var p = He(o, W);
                                if (p) return;
                                o = "zoomPointerUp"
                            }
                            if (!st) return "swipe" !== o ? void Ve() : void(!K && y > s.currItem.fitRatio && qe(W))
                        }
                },
                Ye = function() {
                    var t, e, i = {
                        lastFlickOffset: {},
                        lastFlickDist: {},
                        lastFlickSpeed: {},
                        slowDownRatio: {},
                        slowDownRatioReverse: {},
                        speedDecelerationRatio: {},
                        speedDecelerationRatioAbs: {},
                        distanceOffset: {},
                        backAnimDestination: {},
                        backAnimStarted: {},
                        calculateSwipeSpeed: function(n) {
                            pe.length > 1 ? (t = At() - U + 50, e = pe[pe.length - 2][n]) : (t = At() - X, e = ue[n]), i.lastFlickOffset[n] = ce[n] - e, i.lastFlickDist[n] = Math.abs(i.lastFlickOffset[n]), i.lastFlickDist[n] > 20 ? i.lastFlickSpeed[n] = i.lastFlickOffset[n] / t : i.lastFlickSpeed[n] = 0, Math.abs(i.lastFlickSpeed[n]) < .1 && (i.lastFlickSpeed[n] = 0), i.slowDownRatio[n] = .95, i.slowDownRatioReverse[n] = 1 - i.slowDownRatio[n], i.speedDecelerationRatio[n] = 1
                        },
                        calculateOverBoundsAnimOffset: function(t, e) {
                            i.backAnimStarted[t] || (mt[t] > nt.min[t] ? i.backAnimDestination[t] = nt.min[t] : mt[t] < nt.max[t] && (i.backAnimDestination[t] = nt.max[t]), void 0 !== i.backAnimDestination[t] && (i.slowDownRatio[t] = .7, i.slowDownRatioReverse[t] = 1 - i.slowDownRatio[t], i.speedDecelerationRatioAbs[t] < .05 && (i.lastFlickSpeed[t] = 0, i.backAnimStarted[t] = !0, ne("bounceZoomPan" + t, mt[t], i.backAnimDestination[t], e || 300, r.easing.sine.out, function(e) {
                                mt[t] = e, zt()
                            }))))
                        },
                        calculateAnimOffset: function(t) {
                            i.backAnimStarted[t] || (i.speedDecelerationRatio[t] = i.speedDecelerationRatio[t] * (i.slowDownRatio[t] + i.slowDownRatioReverse[t] - i.slowDownRatioReverse[t] * i.timeDiff / 10), i.speedDecelerationRatioAbs[t] = Math.abs(i.lastFlickSpeed[t] * i.speedDecelerationRatio[t]), i.distanceOffset[t] = i.lastFlickSpeed[t] * i.speedDecelerationRatio[t] * i.timeDiff, mt[t] += i.distanceOffset[t])
                        },
                        panAnimLoop: function() {
                            if (Kt.zoomPan && (Kt.zoomPan.raf = z(i.panAnimLoop), i.now = At(), i.timeDiff = i.now - i.lastNow, i.lastNow = i.now, i.calculateAnimOffset("x"), i.calculateAnimOffset("y"), zt(), i.calculateOverBoundsAnimOffset("x"), i.calculateOverBoundsAnimOffset("y"), i.speedDecelerationRatioAbs.x < .05 && i.speedDecelerationRatioAbs.y < .05)) return mt.x = Math.round(mt.x), mt.y = Math.round(mt.y), zt(), void te("zoomPan")
                        }
                    };
                    return i
                },
                qe = function(t) {
                    return t.calculateSwipeSpeed("y"), nt = s.currItem.bounds, t.backAnimDestination = {}, t.backAnimStarted = {}, Math.abs(t.lastFlickSpeed.x) <= .05 && Math.abs(t.lastFlickSpeed.y) <= .05 ? (t.speedDecelerationRatioAbs.x = t.speedDecelerationRatioAbs.y = 0, t.calculateOverBoundsAnimOffset("x"), t.calculateOverBoundsAnimOffset("y"), !0) : (ee("zoomPan"), t.lastNow = At(), void t.panAnimLoop())
                },
                He = function(t, e) {
                    var i;
                    st || (ge = f);
                    var n;
                    if ("swipe" === t) {
                        var o = ce.x - ue.x,
                            a = e.lastFlickDist.x < 10;
                        o > se && (a || e.lastFlickOffset.x > 20) ? n = -1 : o < -se && (a || e.lastFlickOffset.x < -20) && (n = 1)
                    }
                    var h;
                    n && (f += n, f < 0 ? (f = l.loop ? ti() - 1 : 0, h = !0) : f >= ti() && (f = l.loop ? 0 : ti() - 1, h = !0), h && !l.loop || (xt += n, vt -= n, i = !0));
                    var c, u = _t.x * vt,
                        d = Math.abs(u - _e.x);
                    return i || u > _e.x == e.lastFlickSpeed.x > 0 ? (c = Math.abs(e.lastFlickSpeed.x) > 0 ? d / Math.abs(e.lastFlickSpeed.x) : 333, c = Math.min(c, 400), c = Math.max(c, 250)) : c = 333, ge === f && (i = !1), st = !0, Ot("mainScrollAnimStart"), ne("mainScroll", _e.x, u, c, r.easing.cubic.out, Rt, function() {
                        ie(), st = !1, ge = -1, (i || ge !== f) && s.updateCurrItem(), Ot("mainScrollAnimComplete")
                    }), i && s.updateCurrItem(!0), i
                },
                Ze = function(t) {
                    return 1 / it * t * _
                },
                Ve = function() {
                    var t = y,
                        e = qt(),
                        i = Ht();
                    y < e ? t = e : y > i && (t = i);
                    var n, o = 1,
                        a = ht;
                    return lt && !Y && !ct && y < e ? (s.close(), !0) : (lt && (n = function(t) {
                        Dt((o - a) * t + a)
                    }), s.zoomTo(t, 0, 200, r.easing.cubic.out, n), !0)
                };
            Pt("Gestures", {
                publicMethods: {
                    initGestures: function() {
                        var t = function(t, e, i, n, r) {
                            C = t + e, k = t + i, E = t + n, O = r ? t + r : ""
                        };
                        D = j.pointerEvent, D && j.touch && (j.touch = !1), D ? navigator.pointerEnabled ? t("pointer", "down", "move", "up", "cancel") : t("MSPointer", "Down", "Move", "Up", "Cancel") : j.touch ? (t("touch", "start", "move", "end", "cancel"), M = !0) : t("mouse", "down", "move", "up"), m = k + " " + E + " " + O, g = C, D && !M && (M = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), s.likelyTouchDevice = M, v[C] = Be, v[k] = Xe, v[E] = We, O && (v[O] = v[E]), j.touch && (g += " mousedown", m += " mousemove mouseup", v.mousedown = v[C], v.mousemove = v[k], v.mouseup = v[E]), M || (l.allowPanToNext = !1)
                    }
                }
            });
            var Ge, Qe, $e, Ke, Je, ti, ei, ii = function(e, i, n, o) {
                    Ge && clearTimeout(Ge), Ke = !0, $e = !0;
                    var a;
                    e.initialLayout ? (a = e.initialLayout, e.initialLayout = null) : a = l.getThumbBoundsFn && l.getThumbBoundsFn(f);
                    var h = n ? l.hideAnimationDuration : l.showAnimationDuration,
                        c = function() {
                            te("initialZoom"), n ? (s.template.removeAttribute("style"), s.bg.removeAttribute("style")) : (Dt(1), i && (i.style.display = "block"), r.addClass(t, "pswp--animated-in"), Ot("initialZoom" + (n ? "OutEnd" : "InEnd"))), o && o(), Ke = !1
                        };
                    if (!h || !a || void 0 === a.x) return Ot("initialZoom" + (n ? "Out" : "In")), y = e.initialZoomLevel, Nt(mt, e.initialPosition), zt(), t.style.opacity = n ? 0 : 1, Dt(1), void(h ? setTimeout(function() {
                        c()
                    }, h) : c());
                    var d = function() {
                        var i = u,
                            o = !s.currItem.src || s.currItem.loadError || l.showHideOpacity;
                        e.miniImg && (e.miniImg.style.webkitBackfaceVisibility = "hidden"), n || (y = a.w / e.w, mt.x = a.x, mt.y = a.y - R, s[o ? "template" : "bg"].style.opacity = .001, zt()), ee("initialZoom"), n && !i && r.removeClass(t, "pswp--animated-in"), o && (n ? r[(i ? "remove" : "add") + "Class"](t, "pswp--animate_opacity") : setTimeout(function() {
                            r.addClass(t, "pswp--animate_opacity")
                        }, 30)), Ge = setTimeout(function() {
                            if (Ot("initialZoom" + (n ? "Out" : "In")), n) {
                                var s = a.w / e.w,
                                    l = {
                                        x: mt.x,
                                        y: mt.y
                                    },
                                    u = y,
                                    f = ht,
                                    d = function(e) {
                                        1 === e ? (y = s, mt.x = a.x, mt.y = a.y - N) : (y = (s - u) * e + u, mt.x = (a.x - l.x) * e + l.x, mt.y = (a.y - N - l.y) * e + l.y), zt(), o ? t.style.opacity = 1 - e : Dt(f - e * f)
                                    };
                                i ? ne("initialZoom", 0, 1, h, r.easing.cubic.out, d, c) : (d(1), Ge = setTimeout(c, h + 20))
                            } else y = e.initialZoomLevel, Nt(mt, e.initialPosition), zt(), Dt(1), o ? t.style.opacity = 1 : Dt(1), Ge = setTimeout(c, h + 20)
                        }, n ? 25 : 90)
                    };
                    d()
                },
                ni = {},
                ri = [],
                si = {
                    index: 0,
                    errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">Ảnh</a> không tải được.</div>',
                    forceProgressiveLoading: !1,
                    preload: [1, 1],
                    getNumItemsFn: function() {
                        return Qe.length
                    }
                },
                oi = function() {
                    return {
                        center: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 0,
                            y: 0
                        },
                        min: {
                            x: 0,
                            y: 0
                        }
                    }
                },
                ai = function(t, e, i) {
                    var n = t.bounds;
                    n.center.x = Math.round((ni.x - e) / 2), n.center.y = Math.round((ni.y - i) / 2) + t.vGap.top, n.max.x = e > ni.x ? Math.round(ni.x - e) : n.center.x, n.max.y = i > ni.y ? Math.round(ni.y - i) + t.vGap.top : n.center.y, n.min.x = e > ni.x ? 0 : n.center.x, n.min.y = i > ni.y ? t.vGap.top : n.center.y
                },
                li = function(t, e, i) {
                    if (t.src && !t.loadError) {
                        var n = !i;
                        if (n && (t.vGap || (t.vGap = {
                                top: 0,
                                bottom: 0
                            }), Ot("parseVerticalMargin", t)), ni.x = e.x, ni.y = e.y - t.vGap.top - t.vGap.bottom, n) {
                            var r = ni.x / t.w,
                                s = ni.y / t.h;
                            t.fitRatio = r < s ? r : s;
                            var o = l.scaleMode;
                            "orig" === o ? i = 1 : "fit" === o ? i = t.fitRatio : "zoom" === o && (i = Math.max(t.initialZoomLevel || 1, t.fitRatio)), i > 1 && (i = 1), t.initialZoomLevel = i, t.bounds || (t.bounds = oi())
                        }
                        if (!i) return;
                        return ai(t, t.w * i, t.h * i), n && i === t.initialZoomLevel && (t.initialPosition = t.bounds.center), t.bounds
                    }
                    return t.w = t.h = 0, t.initialZoomLevel = t.fitRatio = 1, t.bounds = oi(), t.initialPosition = t.bounds.center, t.bounds
                },
                hi = function(t, e, i, n, r, o) {
                    e.loadError || n && (e.imageAppended = !0, fi(e, n, e === s.currItem && St), i.appendChild(n), o && setTimeout(function() {
                        e && e.loaded && e.placeholder && (e.placeholder.style.display = "none", e.placeholder = null)
                    }, 500))
                },
                ci = function(t) {
                    t.loading = !0, t.loaded = !1;
                    t.src = t.msrc;
                    var e = t.img = r.createEl("pswp__img", "img"),
                        i = function() {
                            t.loading = !1, t.loaded = !0, t.loadComplete ? t.loadComplete(t) : t.img = null, e.onload = e.onerror = null, e = null
                        };
                    return e.onload = i, e.onerror = function() {
                        t.loadError = !0, i()
                    }, e.src = t.src, e
                },
                ui = function(t, e) {
                    if (t.src && t.loadError && t.container) return e && (t.container.innerHTML = ""), t.container.innerHTML = l.errorMsg.replace("%url%", t.src), !0
                },
                fi = function(t, e, i) {
                    if (t.src) {
                        e || (e = t.container.lastChild);
                        var n = i ? t.w : Math.round(t.w * t.fitRatio),
                            r = i ? t.h : Math.round(t.h * t.fitRatio);
                        t.placeholder && !t.loaded && (t.placeholder.style.width = n + "px", t.placeholder.style.height = r + "px"), e.style.width = n + "px", e.style.height = r + "px"
                    }
                },
                di = function() {
                    if (ri.length) {
                        for (var t, e = 0; e < ri.length; e++) t = ri[e], t.holder.index === t.index && hi(t.index, t.item, t.baseDiv, t.img, !1, t.clearPlaceholder);
                        ri = []
                    }
                };
            Pt("Controller", {
                publicMethods: {
                    lazyLoadItem: function(t) {
                        t = Ct(t);
                        var e = Je(t);
                        e && (!e.loaded && !e.loading || T) && (Ot("gettingData", t, e), e.src && ci(e))
                    },
                    initController: function() {
                        r.extend(l, si, !0), s.items = Qe = i, Je = s.getItemAt, ti = l.getNumItemsFn, ei = l.loop, ti() < 3 && (l.loop = !1), Et("beforeChange", function(t) {
                            var e, i = l.preload,
                                n = null === t || t >= 0,
                                r = Math.min(i[0], ti()),
                                o = Math.min(i[1], ti());
                            for (e = 1; e <= (n ? o : r); e++) s.lazyLoadItem(f + e);
                            for (e = 1; e <= (n ? r : o); e++) s.lazyLoadItem(f - e)
                        }), Et("initialLayout", function() {
                            s.currItem.initialLayout = l.getThumbBoundsFn && l.getThumbBoundsFn(f)
                        }), Et("mainScrollAnimComplete", di), Et("initialZoomInEnd", di), Et("destroy", function() {
                            for (var t, e = 0; e < Qe.length; e++) t = Qe[e], t.container && (t.container = null), t.placeholder && (t.placeholder = null), t.img && (t.img = null), t.preloader && (t.preloader = null), t.loadError && (t.loaded = t.loadError = !1);
                            ri = null
                        })
                    },
                    getItemAt: function(t) {
                        return t >= 0 && (void 0 !== Qe[t] && Qe[t])
                    },
                    allowProgressiveImg: function() {
                        return l.forceProgressiveLoading || !M || l.mouseUsed || screen.width > 1200
                    },
                    setContent: function(t, e) {
                        l.loop && (e = Ct(e));
                        var i = s.getItemAt(t.index);
                        i && (i.container = null);
                        var n, o = s.getItemAt(e);
                        if (!o) return void(t.el.innerHTML = "");
                        Ot("gettingData", e, o), t.index = e, t.item = o;
                        var a = o.container = r.createEl("pswp__zoom-wrap");
                        if (!o.src && o.html && (o.html.tagName ? a.appendChild(o.html) : a.innerHTML = o.html), ui(o), li(o, gt), !o.src || o.loadError || o.loaded) o.src && !o.loadError && (n = r.createEl("pswp__img", "img"), n.style.opacity = 1, n.src = o.src, fi(o, n), hi(e, o, a, n, !0));
                        else {
                            if (o.loadComplete = function(i) {
                                    if (h) {
                                        if (t && t.index === e) {
                                            if (ui(i, !0)) return i.loadComplete = i.img = null, li(i, gt), It(i), void(t.index === f && s.updateCurrZoomItem());
                                            i.imageAppended ? !Ke && i.placeholder && (i.placeholder.style.display = "none", i.placeholder = null) : j.transform && (st || Ke) ? ri.push({
                                                item: i,
                                                baseDiv: a,
                                                img: i.img,
                                                index: e,
                                                holder: t,
                                                clearPlaceholder: !0
                                            }) : hi(e, i, a, i.img, st || Ke, !0)
                                        }
                                        i.loadComplete = null, i.img = null, Ot("imageLoadComplete", e, i)
                                    }
                                }, r.features.transform) {
                                var c = "pswp__img pswp__img--placeholder";
                                c += o.msrc ? "" : " pswp__img--placeholder--blank";
                                var u = r.createEl(c, o.msrc ? "img" : "");
                                o.msrc && (u.src = o.msrc), fi(o, u), a.appendChild(u), o.placeholder = u
                            }
                            o.loading || ci(o), s.allowProgressiveImg() && (!$e && j.transform ? ri.push({
                                item: o,
                                baseDiv: a,
                                img: o.img,
                                index: e,
                                holder: t
                            }) : hi(e, o, a, o.img, !0, !0))
                        }
                        $e || e !== f ? It(o) : (rt = a.style, ii(o, n || o.img)), t.el.innerHTML = "", t.el.appendChild(a)
                    },
                    cleanSlide: function(t) {
                        t.img && (t.img.onload = t.img.onerror = null), t.loaded = t.loading = t.img = t.imageAppended = !1
                    }
                }
            });
            var pi, mi = {},
                gi = function(t, e, i) {
                    var n = document.createEvent("CustomEvent"),
                        r = {
                            origEvent: t,
                            target: t.target,
                            releasePoint: e,
                            pointerType: i || "touch"
                        };
                    n.initCustomEvent("pswpTap", !0, !0, r), t.target.dispatchEvent(n)
                };
            Pt("Tap", {
                publicMethods: {
                    initTap: function() {
                        Et("firstTouchStart", s.onTapStart), Et("touchRelease", s.onTapRelease), Et("destroy", function() {
                            mi = {}, pi = null
                        })
                    },
                    onTapStart: function(t) {
                        t.length > 1 && (clearTimeout(pi), pi = null)
                    },
                    onTapRelease: function(t, e) {
                        if (e && !Q && !V && !Jt) {
                            var i = e;
                            if (pi && (clearTimeout(pi), pi = null, Te(i, mi))) return void Ot("doubleTap", i);
                            if ("mouse" === e.type) return void gi(t, e, "mouse");
                            var n = t.target.tagName.toUpperCase();
                            if ("BUTTON" === n || r.hasClass(t.target, "pswp__single-tap")) return void gi(t, e);
                            Nt(mi, i), pi = setTimeout(function() {
                                gi(t, e), pi = null
                            }, 300)
                        }
                    }
                }
            });
            var vi;
            Pt("DesktopZoom", {
                publicMethods: {
                    initDesktopZoom: function() {
                        F || (M ? Et("mouseUsed", function() {
                            s.setupDesktopZoom()
                        }) : s.setupDesktopZoom(!0))
                    },
                    setupDesktopZoom: function(e) {
                        vi = {};
                        var i = "wheel mousewheel DOMMouseScroll";
                        Et("bindEvents", function() {
                            r.bind(t, i, s.handleMouseWheel)
                        }), Et("unbindEvents", function() {
                            vi && r.unbind(t, i, s.handleMouseWheel)
                        }), s.mouseZoomedIn = !1;
                        var n, o = function() {
                                s.mouseZoomedIn && (r.removeClass(t, "pswp--zoomed-in"), s.mouseZoomedIn = !1), y < 1 ? r.addClass(t, "pswp--zoom-allowed") : r.removeClass(t, "pswp--zoom-allowed"), a()
                            },
                            a = function() {
                                n && (r.removeClass(t, "pswp--dragging"), n = !1)
                            };
                        Et("resize", o), Et("afterChange", o), Et("pointerDown", function() {
                            s.mouseZoomedIn && (n = !0, r.addClass(t, "pswp--dragging"))
                        }), Et("pointerUp", a), e || o()
                    },
                    handleMouseWheel: function(t) {
                        if (y <= s.currItem.fitRatio) return l.modal && (!l.closeOnScroll || Jt || Z ? t.preventDefault() : A && Math.abs(t.deltaY) > 2 && (u = !0, s.close())), !0;
                        if (t.stopPropagation(), vi.x = 0, "deltaX" in t) 1 === t.deltaMode ? (vi.x = 18 * t.deltaX, vi.y = 18 * t.deltaY) : (vi.x = t.deltaX, vi.y = t.deltaY);
                        else if ("wheelDelta" in t) t.wheelDeltaX && (vi.x = -.16 * t.wheelDeltaX), t.wheelDeltaY ? vi.y = -.16 * t.wheelDeltaY : vi.y = -.16 * t.wheelDelta;
                        else {
                            if (!("detail" in t)) return;
                            vi.y = t.detail
                        }
                        Yt(y, !0);
                        var e = mt.x - vi.x,
                            i = mt.y - vi.y;
                        (l.modal || e <= nt.min.x && e >= nt.max.x && i <= nt.min.y && i >= nt.max.y) && t.preventDefault(), s.panTo(e, i)
                    },
                    toggleDesktopZoom: function(e) {
                        e = e || {
                            x: gt.x / 2 + yt.x,
                            y: gt.y / 2 + yt.y
                        };
                        var i = l.getDoubleTapZoom(!0, s.currItem),
                            n = y === i;
                        s.mouseZoomedIn = !n, s.zoomTo(n ? s.currItem.initialZoomLevel : i, e, 333), r[(n ? "remove" : "add") + "Class"](t, "pswp--zoomed-in")
                    }
                }
            }), r.extend(s, re)
        };
        return t
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.Rellax = e()
    }(this, function() {
        var t = function(e, i) {
            "use strict";
            var n = Object.create(t.prototype),
                r = 0,
                s = 0,
                o = [],
                a = !1,
                l = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(t) {
                    setTimeout(t, 1e3 / 60)
                },
                h = window.transformProp || function() {
                    var t = document.createElement("div");
                    if (null == t.style.transform) {
                        var e = ["Webkit", "Moz", "ms"];
                        for (var i in e)
                            if (void 0 !== t.style[e[i] + "Transform"]) return e[i] + "Transform"
                    }
                    return "transform"
                }(),
                c = function(t, e, i) {
                    return t <= e ? e : t >= i ? i : t
                };
            n.options = {
                speed: -2,
                center: !1,
                round: !0,
                callback: function() {}
            }, i && Object.keys(i).forEach(function(t) {
                n.options[t] = i[t]
            }), n.options.speed = c(n.options.speed, -10, 10), e || (e = ".rellax");
            var u = document.querySelectorAll(e);
            if (!(u.length > 0)) throw new Error("The elements you're trying to select don't exist.");
            n.elems = u;
            var f = function() {
                    s = window.innerHeight, p();
                    for (var t = 0; t < n.elems.length; t++) {
                        var e = d(n.elems[t]);
                        o.push(e)
                    }
                    window.addEventListener("resize", function() {
                        v()
                    }), g(), v()
                },
                d = function(t) {
                    var e = t.getAttribute("data-rellax-percentage"),
                        i = t.getAttribute("data-rellax-speed"),
                        r = t.getAttribute("data-rellax-zindex") || 0,
                        o = e || n.options.center ? window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop : 0,
                        a = o + t.getBoundingClientRect().top,
                        l = t.clientHeight || t.offsetHeight || t.scrollHeight,
                        h = e ? e : (o - a + s) / (l + s);
                    n.options.center && (h = .5);
                    var u = i ? c(i, -10, 10) : n.options.speed;
                    (e || n.options.center) && (u = c(i || n.options.speed, -5, 5));
                    var f = m(h, u),
                        d = t.style.cssText,
                        p = "";
                    if (d.indexOf("transform") >= 0) {
                        var g = d.indexOf("transform"),
                            v = d.slice(g),
                            y = v.indexOf(";");
                        p = y ? " " + v.slice(11, y).replace(/\s/g, "") : " " + v.slice(11).replace(/\s/g, "")
                    }
                    return {
                        base: f,
                        top: a,
                        height: l,
                        speed: u,
                        style: d,
                        transform: p,
                        zindex: r
                    }
                },
                p = function() {
                    var t = r;
                    return r = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, t != r
                },
                m = function(t, e) {
                    var i = e * (100 * (1 - t));
                    return n.options.round ? Math.round(i) : Math.round(100 * i) / 100
                },
                g = function() {
                    p() && a === !1 && v(), l(g)
                },
                v = function() {
                    for (var t = 0; t < n.elems.length; t++) {
                        var e = (r - o[t].top + s) / (o[t].height + s),
                            i = m(e, o[t].speed) - o[t].base,
                            a = o[t].zindex,
                            l = "translate3d(0," + i + "px," + a + "px) " + o[t].transform;
                        n.elems[t].style[h] = l
                    }
                    n.options.callback(i)
                };
            return n.destroy = function() {
                for (var t = 0; t < n.elems.length; t++) n.elems[t].style.cssText = o[t].style;
                a = !0
            }, f(), n
        };
        return t
    }),
    function() {
        "use strict";

        function t(t) {
            var e = ["MSIE ", "Trident/", "Edge/"];
            return new RegExp(e.join("|")).test(t)
        }

        function e() {
            function e(t, e) {
                this.scrollLeft = t, this.scrollTop = e
            }

            function r(t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }

            function s(t) {
                if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
                if ("object" == typeof t && "smooth" === t.behavior) return !1;
                throw new TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.")
            }

            function o(t, e) {
                return "Y" === e ? t.clientHeight + p < t.scrollHeight : "X" === e ? t.clientWidth + p < t.scrollWidth : void 0
            }

            function a(t, e) {
                var n = i.getComputedStyle(t, null)["overflow" + e];
                return "auto" === n || "scroll" === n
            }

            function l(t) {
                var e = o(t, "Y") && a(t, "Y"),
                    i = o(t, "X") && a(t, "X");
                return e || i
            }

            function h(t) {
                var e;
                do t = t.parentNode, e = t === n.body; while (e === !1 && l(t) === !1);
                return e = null, t
            }

            function c(t) {
                var e, n, s, o = g(),
                    a = (o - t.startTime) / d;
                a = a > 1 ? 1 : a, e = r(a), n = t.startX + (t.x - t.startX) * e, s = t.startY + (t.y - t.startY) * e, t.method.call(t.scrollable, n, s), n === t.x && s === t.y || i.requestAnimationFrame(c.bind(i, t))
            }

            function u(t, r, s) {
                var o, a, l, h, u = g();
                t === n.body ? (o = i, a = i.scrollX || i.pageXOffset, l = i.scrollY || i.pageYOffset, h = m.scroll) : (o = t, a = t.scrollLeft, l = t.scrollTop, h = e), c({
                    scrollable: o,
                    method: h,
                    startTime: u,
                    startX: a,
                    startY: l,
                    x: r,
                    y: s
                })
            }
            if (!("scrollBehavior" in n.documentElement.style && i.__forceSmoothScrollPolyfill__ !== !0)) {
                var f = i.HTMLElement || i.Element,
                    d = 468,
                    p = t(i.navigator.userAgent) ? 1 : 0,
                    m = {
                        scroll: i.scroll || i.scrollTo,
                        scrollBy: i.scrollBy,
                        elementScroll: f.prototype.scroll || e,
                        scrollIntoView: f.prototype.scrollIntoView
                    },
                    g = i.performance && i.performance.now ? i.performance.now.bind(i.performance) : Date.now;
                i.scroll = i.scrollTo = function() {
                    if (void 0 !== arguments[0]) return s(arguments[0]) === !0 ? void m.scroll.call(i, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : i.scrollX || i.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : i.scrollY || i.pageYOffset) : void u.call(i, n.body, void 0 !== arguments[0].left ? ~~arguments[0].left : i.scrollX || i.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : i.scrollY || i.pageYOffset);
                }, i.scrollBy = function() {
                    if (void 0 !== arguments[0]) return s(arguments[0]) ? void m.scrollBy.call(i, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : void u.call(i, n.body, ~~arguments[0].left + (i.scrollX || i.pageXOffset), ~~arguments[0].top + (i.scrollY || i.pageYOffset))
                }, f.prototype.scroll = f.prototype.scrollTo = function() {
                    if (void 0 !== arguments[0]) {
                        if (s(arguments[0]) === !0) {
                            if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value couldn't be converted");
                            return void m.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                        }
                        var t = arguments[0].left,
                            e = arguments[0].top;
                        u.call(this, this, "undefined" == typeof t ? this.scrollLeft : ~~t, "undefined" == typeof e ? this.scrollTop : ~~e)
                    }
                }, f.prototype.scrollBy = function() {
                    if (void 0 !== arguments[0]) return s(arguments[0]) === !0 ? void m.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop) : void this.scroll({
                        left: ~~arguments[0].left + this.scrollLeft,
                        top: ~~arguments[0].top + this.scrollTop,
                        behavior: arguments[0].behavior
                    })
                }, f.prototype.scrollIntoView = function() {
                    if (s(arguments[0]) === !0) return void m.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
                    var t = h(this),
                        e = t.getBoundingClientRect(),
                        r = this.getBoundingClientRect();
                    t !== n.body ? (u.call(this, t, t.scrollLeft + r.left - e.left, t.scrollTop + r.top - e.top), "fixed" !== i.getComputedStyle(t).position && i.scrollBy({
                        left: e.left,
                        top: e.top,
                        behavior: "smooth"
                    })) : i.scrollBy({
                        left: r.left,
                        top: r.top,
                        behavior: "smooth"
                    })
                }
            }
        }
        var i = window,
            n = document;
        "object" == typeof exports ? module.exports = {
            polyfill: e
        } : e()
    }(),
    function(t, e) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function n(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
        }

        function r(t) {
            return parseFloat(t) || 0
        }

        function s(t) {
            for (var e = 0; t;) e += t.offsetTop, t = t.offsetParent;
            return e
        }

        function o() {
            function i() {
                t.pageXOffset != c.left ? (c.top = t.pageYOffset, c.left = t.pageXOffset, d.refreshAll()) : t.pageYOffset != c.top && (c.top = t.pageYOffset, c.left = t.pageXOffset, u.forEach(function(t) {
                    return t._recalcPosition()
                }))
            }

            function n() {
                s = setInterval(function() {
                    u.forEach(function(t) {
                        return t._fastCheck()
                    })
                }, 500)
            }

            function r() {
                clearInterval(s)
            }
            i(), t.addEventListener("scroll", i), t.addEventListener("resize", d.refreshAll), t.addEventListener("orientationchange", d.refreshAll);
            var s = void 0,
                o = void 0,
                a = void 0;
            "hidden" in e ? (o = "hidden", a = "visibilitychange") : "webkitHidden" in e && (o = "webkitHidden", a = "webkitvisibilitychange"), a ? (e[o] || n(), e.addEventListener(a, function() {
                e[o] ? r() : n()
            })) : n()
        }
        var a = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            l = !1;
        t.getComputedStyle ? ! function() {
            var t = e.createElement("div");
            ["", "-webkit-", "-moz-", "-ms-"].some(function(e) {
                try {
                    t.style.position = e + "sticky"
                } catch (i) {}
                return "" != t.style.position
            }) && (l = !0)
        }() : l = !0;
        var h = "undefined" != typeof ShadowRoot,
            c = {
                top: null,
                left: null
            },
            u = [],
            f = function() {
                function o(t) {
                    if (i(this, o), !(t instanceof HTMLElement)) throw new Error("First argument must be HTMLElement");
                    if (u.some(function(e) {
                            return e._node === t
                        })) throw new Error("Stickyfill is already applied to this node");
                    this._node = t, this._stickyMode = null, this._active = !1, u.push(this), this.refresh()
                }
                return a(o, [{
                    key: "refresh",
                    value: function() {
                        if (!l && !this._removed) {
                            this._active && this._deactivate();
                            var i = this._node,
                                o = getComputedStyle(i),
                                a = {
                                    top: o.top,
                                    display: o.display,
                                    marginTop: o.marginTop,
                                    marginBottom: o.marginBottom,
                                    marginLeft: o.marginLeft,
                                    marginRight: o.marginRight,
                                    cssFloat: o.cssFloat
                                };
                            if (!isNaN(parseFloat(a.top)) && "table-cell" != a.display && "none" != a.display) {
                                this._active = !0;
                                var c = i.parentNode,
                                    u = h && c instanceof ShadowRoot ? c.host : c,
                                    f = i.getBoundingClientRect(),
                                    d = u.getBoundingClientRect(),
                                    p = getComputedStyle(u);
                                this._parent = {
                                    node: u,
                                    styles: {
                                        position: u.style.position
                                    },
                                    offsetHeight: u.offsetHeight
                                }, this._offsetToWindow = {
                                    left: f.left,
                                    right: e.documentElement.clientWidth - f.right
                                }, this._offsetToParent = {
                                    top: f.top - d.top - r(p.borderTopWidth),
                                    left: f.left - d.left - r(p.borderLeftWidth),
                                    right: -f.right + d.right - r(p.borderRightWidth)
                                }, this._styles = {
                                    position: i.style.position,
                                    top: i.style.top,
                                    bottom: i.style.bottom,
                                    left: i.style.left,
                                    right: i.style.right,
                                    width: i.style.width,
                                    marginTop: i.style.marginTop,
                                    marginLeft: i.style.marginLeft,
                                    marginRight: i.style.marginRight
                                };
                                var m = r(a.top);
                                this._limits = {
                                    start: f.top + t.pageYOffset - m,
                                    end: d.top + t.pageYOffset + u.offsetHeight - r(p.borderBottomWidth) - i.offsetHeight - m - r(a.marginBottom)
                                };
                                var g = p.position;
                                "absolute" != g && "relative" != g && (u.style.position = "relative"), this._recalcPosition();
                                var v = this._clone = {};
                                v.node = e.createElement("div"), n(v.node.style, {
                                    width: f.right - f.left + "px",
                                    height: f.bottom - f.top + "px",
                                    marginTop: a.marginTop,
                                    marginBottom: a.marginBottom,
                                    marginLeft: a.marginLeft,
                                    marginRight: a.marginRight,
                                    cssFloat: a.cssFloat,
                                    padding: 0,
                                    border: 0,
                                    borderSpacing: 0,
                                    fontSize: "1em",
                                    position: "static"
                                }), c.insertBefore(v.node, i), v.docOffsetTop = s(v.node)
                            }
                        }
                    }
                }, {
                    key: "_recalcPosition",
                    value: function() {
                        if (this._active && !this._removed) {
                            var t = c.top <= this._limits.start ? "start" : c.top >= this._limits.end ? "end" : "middle";
                            if (this._stickyMode != t) {
                                switch (t) {
                                    case "start":
                                        n(this._node.style, {
                                            position: "absolute",
                                            left: this._offsetToParent.left + "px",
                                            right: this._offsetToParent.right + "px",
                                            top: this._offsetToParent.top + "px",
                                            bottom: "auto",
                                            width: "auto",
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginTop: 0
                                        });
                                        break;
                                    case "middle":
                                        n(this._node.style, {
                                            position: "fixed",
                                            left: this._offsetToWindow.left + "px",
                                            right: this._offsetToWindow.right + "px",
                                            top: this._styles.top,
                                            bottom: "auto",
                                            width: "auto",
                                            marginLeft: 0,
                                            marginRight: 0,
                                            marginTop: 0
                                        });
                                        break;
                                    case "end":
                                        n(this._node.style, {
                                            position: "absolute",
                                            left: this._offsetToParent.left + "px",
                                            right: this._offsetToParent.right + "px",
                                            top: "auto",
                                            bottom: 0,
                                            width: "auto",
                                            marginLeft: 0,
                                            marginRight: 0
                                        })
                                }
                                this._stickyMode = t
                            }
                        }
                    }
                }, {
                    key: "_fastCheck",
                    value: function() {
                        this._active && !this._removed && (Math.abs(s(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) && this.refresh()
                    }
                }, {
                    key: "_deactivate",
                    value: function() {
                        var t = this;
                        this._active && !this._removed && (this._clone.node.parentNode.removeChild(this._clone.node), delete this._clone, n(this._node.style, this._styles), delete this._styles, u.some(function(e) {
                            return e !== t && e._parent && e._parent.node === t._parent.node
                        }) || n(this._parent.node.style, this._parent.styles), delete this._parent, this._stickyMode = null, this._active = !1, delete this._offsetToWindow, delete this._offsetToParent, delete this._limits)
                    }
                }, {
                    key: "remove",
                    value: function() {
                        var t = this;
                        this._deactivate(), u.some(function(e, i) {
                            if (e._node === t._node) return u.splice(i, 1), !0
                        }), this._removed = !0
                    }
                }]), o
            }(),
            d = {
                stickies: u,
                Sticky: f,
                addOne: function(t) {
                    if (!(t instanceof HTMLElement)) {
                        if (!t.length || !t[0]) return;
                        t = t[0]
                    }
                    for (var e = 0; e < u.length; e++)
                        if (u[e]._node === t) return u[e];
                    return new f(t)
                },
                add: function(t) {
                    if (t instanceof HTMLElement && (t = [t]), t.length) {
                        for (var e = [], i = function(i) {
                                var n = t[i];
                                return n instanceof HTMLElement ? u.some(function(t) {
                                    if (t._node === n) return e.push(t), !0
                                }) ? "continue" : void e.push(new f(n)) : (e.push(void 0), "continue")
                            }, n = 0; n < t.length; n++) {
                            i(n)
                        }
                        return e
                    }
                },
                refreshAll: function() {
                    u.forEach(function(t) {
                        return t.refresh()
                    })
                },
                removeOne: function(t) {
                    if (!(t instanceof HTMLElement)) {
                        if (!t.length || !t[0]) return;
                        t = t[0]
                    }
                    u.some(function(e) {
                        if (e._node === t) return e.remove(), !0
                    })
                },
                remove: function(t) {
                    if (t instanceof HTMLElement && (t = [t]), t.length)
                        for (var e = function(e) {
                                var i = t[e];
                                u.some(function(t) {
                                    if (t._node === i) return t.remove(), !0
                                })
                            }, i = 0; i < t.length; i++) e(i)
                },
                removeAll: function() {
                    for (; u.length;) u[0].remove()
                }
            };
        l || o(), "undefined" != typeof module && module.exports ? module.exports = d : t.Stickyfill = d
    }(window, document),
    function(t, e) {
        "use strict";
        var i = {},
            n = t.document,
            r = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!r.TweenLite) {
            var s, o, a, l, h, c = function(t) {
                    var e, i = t.split("."),
                        n = r;
                    for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                    return n
                },
                u = c("com.greensock"),
                f = 1e-10,
                d = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                p = function() {},
                m = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                g = {},
                v = function(n, s, o, a) {
                    this.sc = g[n] ? g[n].sc : [], g[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(h) {
                        for (var u, f, d, p, m = s.length, y = m; --m > -1;)(u = g[s[m]] || new v(s[m], [])).gsClass ? (l[m] = u.gsClass, y--) : h && u.sc.push(this);
                        if (0 === y && o) {
                            if (f = ("com.greensock." + n).split("."), d = f.pop(), p = c(f.join("."))[d] = this.gsClass = o.apply(o, l), a)
                                if (r[d] = i[d] = p, "undefined" != typeof module && module.exports)
                                    if (n === e) {
                                        module.exports = i[e] = p;
                                        for (m in i) p[m] = i[m]
                                    } else i[e] && (i[e][d] = p);
                            else "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                return p
                            });
                            for (m = 0; m < this.sc.length; m++) this.sc[m].check()
                        }
                    }, this.check(!0)
                },
                y = t._gsDefine = function(t, e, i, n) {
                    return new v(t, e, i, n)
                },
                _ = u._class = function(t, e, i) {
                    return e = e || function() {}, y(t, [], function() {
                        return e
                    }, i), e
                };
            y.globals = r;
            var x = [0, 0, 1, 1],
                w = _("easing.Ease", function(t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? x.concat(e) : x
                }, !0),
                b = w.map = {},
                T = w.register = function(t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (s = l[h], r = n ? _("easing." + s, null, !0) : u.easing[s] || {}, o = c.length; --o > -1;) a = c[o], b[s + "." + a] = b[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
            for (a = w.prototype, a._calcEnd = !1, a.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) a = s[o] + ",Power" + o, T(new w(null, null, 1, o), a, "easeOut", !0), T(new w(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), T(new w(null, null, 3, o), a, "easeInOut");
            b.linear = u.easing.Linear.easeIn, b.swing = u.easing.Quad.easeInOut;
            var S = _("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            a = S.prototype, a.addEventListener = function(t, e, i, n, r) {
                r = r || 0;
                var s, o, a = this._listeners[t],
                    c = 0;
                for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) s = a[o], s.c === e && s.s === i ? a.splice(o, 1) : 0 === c && s.pr < r && (c = o + 1);
                a.splice(c, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                })
            }, a.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, a.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var P = t.requestAnimationFrame,
                C = t.cancelAnimationFrame,
                k = Date.now || function() {
                    return (new Date).getTime()
                },
                E = k();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !P;) P = t[s[o] + "RequestAnimationFrame"], C = t[s[o] + "CancelAnimationFrame"] || t[s[o] + "CancelRequestAnimationFrame"];
            _("Ticker", function(t, e) {
                var i, r, s, o, a, c = this,
                    u = k(),
                    d = !(e === !1 || !P) && "auto",
                    m = 500,
                    g = 33,
                    v = "tick",
                    y = function(t) {
                        var e, n, l = k() - E;
                        l > m && (u += l - g), E += l, c.time = (E - u) / 1e3, e = c.time - a, (!i || e > 0 || t === !0) && (c.frame++, a += e + (e >= o ? .004 : o - e), n = !0), t !== !0 && (s = r(y)), n && c.dispatchEvent(v)
                    };
                S.call(c), c.time = c.frame = 0, c.tick = function() {
                    y(!0)
                }, c.lagSmoothing = function(t, e) {
                    return arguments.length ? (m = t || 1 / f, void(g = Math.min(e, m, 0))) : m < 1 / f
                }, c.sleep = function() {
                    null != s && (d && C ? C(s) : clearTimeout(s), r = p, s = null, c === l && (h = !1))
                }, c.wake = function(t) {
                    null !== s ? c.sleep() : t ? u += -E + (E = k()) : c.frame > 10 && (E = k() - m + 5), r = 0 === i ? p : d && P ? P : function(t) {
                        return setTimeout(t, 1e3 * (a - c.time) + 1 | 0)
                    }, c === l && (h = !0), y(2)
                }, c.fps = function(t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), a = this.time + o, void c.wake()) : i
                }, c.useRAF = function(t) {
                    return arguments.length ? (c.sleep(), d = t, void c.fps(i)) : d
                }, c.fps(t), setTimeout(function() {
                    "auto" === d && c.frame < 5 && "hidden" !== n.visibilityState && c.useRAF(!1)
                }, 1500)
            }), a = u.Ticker.prototype = new u.events.EventDispatcher, a.constructor = u.Ticker;
            var O = _("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, G) {
                    h || l.wake();
                    var i = this.vars.useFrames ? V : G;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = O.ticker = new u.Ticker, a = O.prototype, a._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;
            var A = function() {
                h && k() - E > 2e3 && ("hidden" !== n.visibilityState || !l.lagSmoothing()) && l.wake();
                var t = setTimeout(A, 2e3);
                t.unref && t.unref()
            };
            A(), a.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, a.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, a.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, a.seek = function(t, e) {
                return this.totalTime(Number(t), e !== !1)
            }, a.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
            }, a.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, a.render = function(t, e, i) {}, a.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
            }, a.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
            }, a._enabled = function(t, e) {
                return h || l.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, a._kill = function(t, e) {
                return this._enabled(!1, !1)
            }, a.kill = function(t, e) {
                return this._kill(t, e), this
            }, a._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, a._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, a._callback = function(t) {
                var e = this.vars,
                    i = e[t],
                    n = e[t + "Params"],
                    r = e[t + "Scope"] || e.callbackScope || this,
                    s = n ? n.length : 0;
                switch (s) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, n[0]);
                        break;
                    case 2:
                        i.call(r, n[0], n[1]);
                        break;
                    default:
                        i.apply(r, n)
                }
            }, a.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = m(i) && i.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, a.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, a.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, a.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, a.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, a.totalTime = function(t, e, i) {
                if (h || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (L.length && $(), this.render(t, e, !1), L.length && $())
                }
                return this
            }, a.progress = a.totalProgress = function(t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, a.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, a.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, a.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                var e, i;
                for (t = t || f, this._timeline && this._timeline.smoothChildTiming && (e = this._pauseTime, i = e || 0 === e ? e : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / t), this._timeScale = t, i = this.timeline; i && i.timeline;) i._dirty = !0, i.totalDuration(), i = i.timeline;
                return this
            }, a.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, a.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, n = this._timeline;
                return t != this._paused && n && (h || t || l.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var D = _("core.SimpleTimeline", function(t) {
                O.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            a = D.prototype = new O, a.constructor = D, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function(t, e, i, n) {
                var r, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, a._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, a.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, a.rawTime = function() {
                return h || l.wake(), this._totalTime
            };
            var M = _("TweenLite", function(e, i, n) {
                    if (O.call(this, i, n), this.render = M.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : M.selector(e) || e;
                    var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Z[M.defaultOverwrite] : "number" == typeof l ? l >> 0 : Z[l], (a || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                        for (this._targets = o = d(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(d(s))) : (this._siblings[r] = K(s, this, !1), 1 === l && this._siblings[r].length > 1 && tt(s, this, null, 1, this._siblings[r])) : (s = o[r--] = M.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = K(e, this, !1), 1 === l && this._siblings.length > 1 && tt(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -f, this.render(Math.min(0, -this._delay)))
                }, !0),
                z = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                I = function(t, e) {
                    var i, n = {};
                    for (i in t) H[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!W[i] || W[i] && W[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            a = M.prototype = new O, a.constructor = M, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, M.version = "1.20.3", M.defaultEase = a._ease = new w(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = l, M.autoSleep = 120, M.lagSmoothing = function(t, e) {
                l.lagSmoothing(t, e)
            }, M.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (M.selector = i, i(e)) : "undefined" == typeof n ? e : n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var L = [],
                R = {},
                F = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                N = /[\+-]=-?[\.\d]/,
                j = function(t) {
                    for (var e, i = this._firstPT, n = 1e-6; i;) e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : e < n && e > -n && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                B = function(t, e, i, n) {
                    var r, s, o, a, l, h, c, u = [],
                        f = 0,
                        d = "",
                        p = 0;
                    for (u.start = t, u.end = e, t = u[0] = t + "", e = u[1] = e + "", i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(F) || [], s = e.match(F) || [], n && (n._next = null, n.blob = 1, u._firstPT = u._applyPT = n), l = s.length, a = 0; a < l; a++) c = s[a], h = e.substr(f, e.indexOf(c, f) - f), d += h || !a ? h : ",", f += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), c === r[a] || r.length <= a ? d += c : (d && (u.push(d), d = ""), o = parseFloat(r[a]), u.push(o), u._firstPT = {
                        _next: u._firstPT,
                        t: u,
                        p: u.length - 1,
                        s: o,
                        c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
                        f: 0,
                        m: p && p < 4 ? Math.round : 0
                    }), f += c.length;
                    return d += e.substr(f), d && u.push(d), u.setRatio = j, N.test(e) && (u.end = null), u
                },
                X = function(t, e, i, n, r, s, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, t));
                    var h, c = typeof t[e],
                        u = "function" !== c ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                        f = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
                        d = "string" == typeof n && "=" === n.charAt(1),
                        p = {
                            t: t,
                            p: e,
                            s: f,
                            f: "function" === c,
                            pg: 0,
                            n: r || e,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: d ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - f || 0
                        };
                    if (("number" != typeof f || "number" != typeof n && !d) && (o || isNaN(f) || !d && isNaN(n) || "boolean" == typeof f || "boolean" == typeof n ? (p.fp = o, h = B(f, d ? parseFloat(p.s) + p.c : n, a || M.defaultStringFilter, p), p = {
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: r || e,
                            pr: 0,
                            m: 0
                        }) : (p.s = parseFloat(f), d || (p.c = parseFloat(n) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p
                },
                U = M._internals = {
                    isArray: m,
                    isSelector: z,
                    lazyTweens: L,
                    blobDif: B
                },
                W = M._plugins = {},
                Y = U.tweenLookup = {},
                q = 0,
                H = U.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1
                },
                Z = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                V = O._rootFramesTimeline = new D,
                G = O._rootTimeline = new D,
                Q = 30,
                $ = U.lazyRender = function() {
                    var t, e = L.length;
                    for (R = {}; --e > -1;) t = L[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    L.length = 0
                };
            G._startTime = l.time, V._startTime = l.frame, G._active = V._active = !0, setTimeout($, 1), O._updateRoot = M.render = function() {
                var t, e, i;
                if (L.length && $(), G.render((l.time - G._startTime) * G._timeScale, !1, !1), V.render((l.frame - V._startTime) * V._timeScale, !1, !1), L.length && $(), l.frame >= Q) {
                    Q = l.frame + (parseInt(M.autoSleep, 10) || 120);
                    for (i in Y) {
                        for (e = Y[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete Y[i]
                    }
                    if (i = G._first, (!i || i._paused) && M.autoSleep && !V._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", O._updateRoot);
            var K = function(t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (Y[s || (t._gsTweenID = s = "t" + q++)] || (Y[s] = {
                            target: t,
                            tweens: []
                        }), e && (n = Y[s].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return Y[s].tweens
                },
                J = function(t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), o = M.onOverwrite, o && (s = o(t, e, i, n)), r !== !1 && s !== !1
                },
                tt = function(t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; s < l; s++)
                            if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var h, c = e._startTime + f,
                        u = [],
                        d = 0,
                        p = 0 === e._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || et(e, 0, p), 0 === et(a, h, p) && (u[d++] = a)) : a._startTime <= c && a._startTime + a.totalDuration() / a._timeScale > c && ((p || !a._initted) && c - a._startTime <= 2e-10 || (u[d++] = a)));
                    for (s = d; --s > -1;)
                        if (a = u[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !J(a, e)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                et = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > e ? s - e : i && s === e || !t._initted && s - e < 2 * f ? f : (s += t.totalDuration() / t._timeScale / r) > e + f ? 0 : s - e - f
                };
            a._init = function() {
                var t, e, i, n, r, s, o = this.vars,
                    a = this._overwrittenProps,
                    l = this._duration,
                    h = !!o.immediateRender,
                    c = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && o.lazy !== !1, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateParams = o.onUpdateParams, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = M.to(this.target, 0, r), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (h = !1), i = {};
                        for (n in o) H[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && o.lazy !== !1, i.immediateRender = h, this._startAt = M.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = c = c ? c instanceof w ? c : "function" == typeof c ? new w(c, o.easeParams) : b[c] || M.defaultEase : M.defaultEase, o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, t = 0; t < s; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (e && M._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, a._initProps = function(e, i, n, r, s) {
                var o, a, l, h, c, u;
                if (null == e) return !1;
                R[e._gsTweenID] && $(), this.vars.css || e.style && e !== t && e.nodeType && W.css && this.vars.autoCSS !== !1 && I(this.vars, e);
                for (o in this.vars)
                    if (u = this.vars[o], H[o]) u && (u instanceof Array || u.push && m(u)) && u.join("").indexOf("{self}") !== -1 && (this.vars[o] = u = this._swapSelfInParams(u, this));
                    else if (W[o] && (h = new W[o])._onInitTween(e, this.vars[o], this, s)) {
                    for (this._firstPT = c = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), c._next && (c._next._prev = c)
                } else i[o] = X.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, s);
                return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && tt(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (R[e._gsTweenID] = !0), l)
            }, a.render = function(t, e, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-7 || h === f && "isPause" !== this.data) && h !== t && (i = !0, h > f && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : f);
                else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== f || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : f)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / l,
                        u = this._easeType,
                        d = this._easePower;
                    (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : t / l < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, L.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (t < 0 && this._startAt && t !== -1e-4 && this._startAt.render(t, !0, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, !0, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === f && o !== f && (this._rawPrevTime = 0)))
                }
            }, a._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : M.selector(e) || e;
                var n, r, s, o, a, l, h, c, u, f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((m(e) || z(e)) && "number" != typeof e[0])
                    for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (h = t || a, c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (M.onOverwrite || this.vars.onOverwrite)) {
                            for (s in h) a[s] && (u || (u = []), u.push(s));
                            if ((u || !t) && !J(this, i, e, u)) return !1
                        }
                        for (s in h)(o = a[s]) && (f && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null),
                            delete a[s]), c && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, a.invalidate = function() {
                return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], O.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -f, this.render(Math.min(0, -this._delay))), this
            }, a._enabled = function(t, e) {
                if (h || l.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = K(n[i], this, !0);
                    else this._siblings = K(this.target, this, !0)
                }
                return O.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && M._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, M.to = function(t, e, i) {
                return new M(t, e, i)
            }, M.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new M(t, e, i)
            }, M.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new M(t, e, n)
            }, M.delayedCall = function(t, e, i, n, r) {
                return new M(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, M.set = function(t, e) {
                return new M(t, 0, e)
            }, M.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : M.selector(t) || t;
                var i, n, r, s;
                if ((m(t) || z(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(M.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else if (t._gsTweenID)
                    for (n = K(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n || []
            }, M.killTweensOf = M.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = M.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var it = _("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = it.prototype
            }, !0);
            if (a = it.prototype, it.version = "1.19.0", it.API = 2, a._firstPT = null, a._addTween = X, a.setRatio = j, a._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, a._mod = a._roundProps = function(t) {
                    for (var e, i = this._firstPT; i;) e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")], e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, M._onPluginEvent = function(t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, it.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === it.API && (W[(new t[e])._propName] = t[e]);
                    return !0
                }, y.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = _("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            it.call(this, i, n), this._overwriteProps = r || []
                        }, t.global === !0),
                        a = o.prototype = new it(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, it.activate([o]), o
                }, s = t._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (a in g) g[a].func || t.console.log("GSAP encountered missing dependency: " + a)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
            var n = function(t) {
                    e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var i, n, r = this.vars;
                    for (n in r) i = r[n], l(i) && i.join("").indexOf("{self}") !== -1 && (r[n] = this._swapSelfInParams(i));
                    l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                },
                r = 1e-10,
                s = i._internals,
                o = n._internals = {},
                a = s.isSelector,
                l = s.isArray,
                h = s.lazyTweens,
                c = s.lazyRender,
                u = _gsScope._gsDefine.globals,
                f = function(t) {
                    var e, i = {};
                    for (e in t) i[e] = t[e];
                    return i
                },
                d = function(t, e, i) {
                    var n, r, s = t.cycle;
                    for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                    delete t.cycle
                },
                p = o.pauseCallback = function() {},
                m = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                g = n.prototype = new e;
            return n.version = "1.20.3", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function(t, e, n, r) {
                var s = n.repeat && u.TweenMax || i;
                return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
            }, g.from = function(t, e, n, r) {
                return this.add((n.repeat && u.TweenMax || i).from(t, e, n), r)
            }, g.fromTo = function(t, e, n, r, s) {
                var o = r.repeat && u.TweenMax || i;
                return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
            }, g.staggerTo = function(t, e, r, s, o, l, h, c) {
                var u, p, g = new n({
                        onComplete: l,
                        onCompleteParams: h,
                        callbackScope: c,
                        smoothChildTiming: this.smoothChildTiming
                    }),
                    v = r.cycle;
                for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, s < 0 && (t = m(t), t.reverse(), s *= -1), p = 0; p < t.length; p++) u = f(r), u.startAt && (u.startAt = f(u.startAt), u.startAt.cycle && d(u.startAt, t, p)), v && (d(u, t, p), null != u.duration && (e = u.duration, delete u.duration)), g.to(t[p], e, u, p * s);
                return this.add(g, o)
            }, g.staggerFrom = function(t, e, i, n, r, s, o, a) {
                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
            }, g.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
            }, g.call = function(t, e, n, r) {
                return this.add(i.delayedCall(0, t, e, n), r)
            }, g.set = function(t, e, n) {
                return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
            }, n.exportRoot = function(t, e) {
                t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                var r, s, o, a, l = new n(t),
                    h = l._timeline;
                for (null == e && (e = !0), h._remove(l, !0), l._startTime = 0, l._rawPrevTime = l._time = l._totalTime = h._time, o = h._first; o;) a = o._next, e && o instanceof i && o.target === o.vars.onComplete || (s = o._startTime - o._delay, s < 0 && (r = 1), l.add(o, s)), o = a;
                return h.add(l, 0), r && l.totalDuration(), l
            }, g.add = function(r, s, o, a) {
                var h, c, u, f, d, p;
                if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                    if (r instanceof Array || r && r.push && l(r)) {
                        for (o = o || "normal", a = a || 0, h = s, c = r.length, u = 0; u < c; u++) l(f = r[u]) && (f = new n({
                            tweens: f
                        })), this.add(f, h), "string" != typeof f && "function" != typeof f && ("sequence" === o ? h = f._startTime + f.totalDuration() / f._timeScale : "start" === o && (f._startTime -= f.delay())), h += a;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof r) return this.addLabel(r, s);
                    if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                    r = i.delayedCall(0, r)
                }
                if (e.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (d = this, p = d.rawTime() > r._startTime; d._timeline;) p && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), d = d._timeline;
                return this
            }, g.remove = function(e) {
                if (e instanceof t) {
                    this._remove(e, !1);
                    var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                    return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                }
                if (e instanceof Array || e && e.push && l(e)) {
                    for (var n = e.length; --n > -1;) this.remove(e[n]);
                    return this
                }
                return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
            }, g._remove = function(t, i) {
                e.prototype._remove.call(this, t, i);
                var n = this._last;
                return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, g.append = function(t, e) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
            }, g.insert = g.insertMultiple = function(t, e, i, n) {
                return this.add(t, e || 0, i, n)
            }, g.appendMultiple = function(t, e, i, n) {
                return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
            }, g.addLabel = function(t, e) {
                return this._labels[t] = this._parseTimeOrLabel(e), this
            }, g.addPause = function(t, e, n, r) {
                var s = i.delayedCall(0, p, n, r || this);
                return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
            }, g.removeLabel = function(t) {
                return delete this._labels[t], this
            }, g.getLabelTime = function(t) {
                return null != this._labels[t] ? this._labels[t] : -1
            }, g._parseTimeOrLabel = function(e, i, n, r) {
                var s, o;
                if (r instanceof t && r.timeline === this) this.remove(r);
                else if (r && (r instanceof Array || r.push && l(r)))
                    for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
                if (s = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
                if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = s);
                else {
                    if (o = e.indexOf("="), o === -1) return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                    i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s
                }
                return Number(e) + i
            }, g.seek = function(t, e) {
                return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
            }, g.stop = function() {
                return this.paused(!0)
            }, g.gotoAndPlay = function(t, e) {
                return this.play(t, e)
            }, g.gotoAndStop = function(t, e) {
                return this.pause(t, e)
            }, g.render = function(t, e, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, o, a, l, u, f, d = this._time,
                    p = this._dirty ? this.totalDuration() : this._totalDuration,
                    m = this._startTime,
                    g = this._timeScale,
                    v = this._paused;
                if (d !== this._time && (t += this._time - d), t >= p - 1e-7 && t >= 0) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = p + 1e-4;
                else if (t < 1e-7)
                    if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                    else {
                        if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        t = 0, this._initted || (l = !0)
                    } else {
                    if (this._hasPause && !this._forcingPlayhead && !e) {
                        if (t >= d)
                            for (n = this._first; n && n._startTime <= t && !u;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= t && !u;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n), n = n._prev;
                        u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    this._totalTime = this._time = this._rawPrevTime = t
                }
                if (this._time !== d && this._first || i || l || u) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), f = this._time, f >= d)
                        for (n = this._first; n && (o = n._next, f === this._time && (!this._paused || v));)(n._active || n._startTime <= f && !n._paused && !n._gc) && (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                    else
                        for (n = this._last; n && (o = n._prev, f === this._time && (!this._paused || v));) {
                            if (n._active || n._startTime <= d && !n._paused && !n._gc) {
                                if (u === n) {
                                    for (u = n._prev; u && u.endTime() > this._time;) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;
                                    u = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = o
                        }
                    this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))), a && (this._gc || m !== this._startTime && g === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (s && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                }
            }, g._hasPausedChild = function() {
                for (var t = this._first; t;) {
                    if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                    t = t._next
                }
                return !1
            }, g.getChildren = function(t, e, n, r) {
                r = r || -9999999999;
                for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? e !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), t !== !1 && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
                return s
            }, g.getTweensOf = function(t, e) {
                var n, r, s = this._gc,
                    o = [],
                    a = 0;
                for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
                return s && this._enabled(!1, !0), o
            }, g.recent = function() {
                return this._recent
            }, g._contains = function(t) {
                for (var e = t.timeline; e;) {
                    if (e === this) return !0;
                    e = e.timeline
                }
                return !1
            }, g.shiftChildren = function(t, e, i) {
                i = i || 0;
                for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                if (e)
                    for (n in s) s[n] >= i && (s[n] += t);
                return this._uncache(!0)
            }, g._kill = function(t, e) {
                if (!t && !e) return this._enabled(!1, !1);
                for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                return r
            }, g.clear = function(t) {
                var e = this.getChildren(!1, !0, !0),
                    i = e.length;
                for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                return t !== !1 && (this._labels = {}), this._uncache(!0)
            }, g.invalidate = function() {
                for (var e = this._first; e;) e.invalidate(), e = e._next;
                return t.prototype.invalidate.call(this)
            }, g._enabled = function(t, i) {
                if (t === this._gc)
                    for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                return e.prototype._enabled.call(this, t, i)
            }, g.totalTime = function(e, i, n) {
                this._forcingPlayhead = !0;
                var r = t.prototype.totalTime.apply(this, arguments);
                return this._forcingPlayhead = !1, r
            }, g.duration = function(t) {
                return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
            }, g.totalDuration = function(t) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(r, r._startTime - r._delay), this._calculatingDuration = 0) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale, this._time -= r._startTime, this._totalTime -= r._startTime, this._rawPrevTime -= r._startTime), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                        this._duration = this._totalDuration = n, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
            }, g.paused = function(e) {
                if (!e)
                    for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                return t.prototype.paused.apply(this, arguments)
            }, g.usesFrames = function() {
                for (var e = this._timeline; e._timeline;) e = e._timeline;
                return e === t._rootFramesTimeline
            }, g.rawTime = function(t) {
                return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
            }, n
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "undefined" != typeof module && module.exports ? (require("./TweenLite.js"), module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite"], e)
    }("TimelineLite");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
            var i, n, r, s, o = function() {
                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                },
                a = _gsScope._gsDefine.globals,
                l = {},
                h = o.prototype = new t("css");
            h.constructor = o, o.version = "1.20.3", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, h = "px", o.suffixMap = {
                top: h,
                right: h,
                bottom: h,
                left: h,
                width: h,
                height: h,
                fontSize: h,
                padding: h,
                margin: h,
                perspective: h,
                lineHeight: ""
            };
            var c, u, f, d, p, m, g, v, y = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                _ = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                x = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                b = /(?:\d|\-|\+|=|#|\.)*/g,
                T = /opacity *= *([^)]*)/i,
                S = /opacity:([^;]*)/i,
                P = /alpha\(opacity *=.+?\)/i,
                C = /^(rgb|hsl)/,
                k = /([A-Z])/g,
                E = /-([a-z])/gi,
                O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                A = function(t, e) {
                    return e.toUpperCase()
                },
                D = /(?:Left|Right|Width)/i,
                M = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                z = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                I = /,(?=[^\)]*(?:\(|$))/gi,
                L = /[\s,\(]/i,
                R = Math.PI / 180,
                F = 180 / Math.PI,
                N = {},
                j = {
                    style: {}
                },
                B = _gsScope.document || {
                    createElement: function() {
                        return j
                    }
                },
                X = function(t, e) {
                    return B.createElementNS ? B.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : B.createElement(t)
                },
                U = X("div"),
                W = X("img"),
                Y = o._internals = {
                    _specialProps: l
                },
                q = (_gsScope.navigator || {}).userAgent || "",
                H = function() {
                    var t = q.indexOf("Android"),
                        e = X("a");
                    return f = q.indexOf("Safari") !== -1 && q.indexOf("Chrome") === -1 && (t === -1 || parseFloat(q.substr(t + 8, 2)) > 3), p = f && parseFloat(q.substr(q.indexOf("Version/") + 8, 2)) < 6, d = q.indexOf("Firefox") !== -1, (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(q) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(q)) && (m = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                }(),
                Z = function(t) {
                    return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                V = function(t) {
                    _gsScope.console && console.log(t)
                },
                G = "",
                Q = "",
                $ = function(t, e) {
                    e = e || U;
                    var i, n, r = e.style;
                    if (void 0 !== r[t]) return t;
                    for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                    return n >= 0 ? (Q = 3 === n ? "ms" : i[n], G = "-" + Q.toLowerCase() + "-", Q + t) : null
                },
                K = B.defaultView ? B.defaultView.getComputedStyle : function() {},
                J = o.getStyle = function(t, e, i, n, r) {
                    var s;
                    return H || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || K(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(k, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : Z(t)
                },
                tt = Y.convertToPixels = function(t, i, n, r, s) {
                    if ("px" === r || !r && "lineHeight" !== i) return n;
                    if ("auto" === r || !n) return 0;
                    var a, l, h, c = D.test(i),
                        u = t,
                        f = U.style,
                        d = n < 0,
                        p = 1 === n;
                    if (d && (n = -n), p && (n *= 100), "lineHeight" !== i || r)
                        if ("%" === r && i.indexOf("border") !== -1) a = n / 100 * (c ? t.clientWidth : t.clientHeight);
                        else {
                            if (f.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;", "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r) f[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                            else {
                                if (u = t.parentNode || B.body, J(u, "display").indexOf("flex") !== -1 && (f.position = "absolute"), l = u._gsCache, h = e.ticker.frame, l && c && l.time === h) return l.width * n / 100;
                                f[c ? "width" : "height"] = n + r
                            }
                            u.appendChild(U), a = parseFloat(U[c ? "offsetWidth" : "offsetHeight"]), u.removeChild(U), c && "%" === r && o.cacheWidths !== !1 && (l = u._gsCache = u._gsCache || {}, l.time = h, l.width = a / n * 100), 0 !== a || s || (a = tt(t, i, n, r, !0))
                        } else l = K(t).lineHeight, t.style.lineHeight = n, a = parseFloat(K(t).lineHeight), t.style.lineHeight = l;
                    return p && (a /= 100), d ? -a : a
                },
                et = Y.calculateOffset = function(t, e, i) {
                    if ("absolute" !== J(t, "position", i)) return 0;
                    var n = "left" === e ? "Left" : "Top",
                        r = J(t, "margin" + n, i);
                    return t["offset" + n] - (tt(t, e, parseFloat(r), r.replace(b, "")) || 0)
                },
                it = function(t, e) {
                    var i, n, r, s = {};
                    if (e = e || K(t, null))
                        if (i = e.length)
                            for (; --i > -1;) r = e[i], r.indexOf("-transform") !== -1 && Ot !== r || (s[r.replace(E, A)] = e.getPropertyValue(r));
                        else
                            for (i in e) i.indexOf("Transform") !== -1 && Et !== i || (s[i] = e[i]);
                    else if (e = t.currentStyle || t.style)
                        for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(E, A)] = e[i]);
                    return H || (s.opacity = Z(t)), n = Wt(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Dt && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                },
                nt = function(t, e, i, n, r) {
                    var s, o, a, l = {},
                        h = t.style;
                    for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && o.indexOf("Origin") === -1 && ("number" != typeof s && "string" != typeof s || (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(w, "") ? s : 0 : et(t, o), void 0 !== h[o] && (a = new yt(h, o, h[o], a))));
                    if (n)
                        for (o in n) "className" !== o && (l[o] = n[o]);
                    return {
                        difs: l,
                        firstMPT: a
                    }
                },
                rt = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                st = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                ot = function(t, e, i) {
                    if ("svg" === (t.nodeName + "").toLowerCase()) return (i || K(t))[e] || 0;
                    if (t.getCTM && Bt(t)) return t.getBBox()[e] || 0;
                    var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                        r = rt[e],
                        s = r.length;
                    for (i = i || K(t, null); --s > -1;) n -= parseFloat(J(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(J(t, "border" + r[s] + "Width", i, !0)) || 0;
                    return n
                },
                at = function(t, e) {
                    if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                    null != t && "" !== t || (t = "0 0");
                    var i, n = t.split(" "),
                        r = t.indexOf("left") !== -1 ? "0%" : t.indexOf("right") !== -1 ? "100%" : n[0],
                        s = t.indexOf("top") !== -1 ? "0%" : t.indexOf("bottom") !== -1 ? "100%" : n[1];
                    if (n.length > 3 && !e) {
                        for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(at(n[i]));
                        return t.join(",")
                    }
                    return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && (r + "").indexOf("=") === -1) && (r = "50%"), t = r + " " + s + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = r.indexOf("%") !== -1, e.oyp = s.indexOf("%") !== -1, e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(w, "")), e.oy = parseFloat(s.replace(w, "")), e.v = t), e || t
                },
                lt = function(t, e) {
                    return "function" == typeof t && (t = t(v, g)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
                },
                ht = function(t, e) {
                    return "function" == typeof t && (t = t(v, g)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
                },
                ct = function(t, e, i, n) {
                    var r, s, o, a, l, h = 1e-6;
                    return "function" == typeof t && (t = t(v, g)), null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), l = "=" === t.charAt(1), o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (t.indexOf("rad") === -1 ? 1 : F) - (l ? 0 : e), s.length && (n && (n[i] = e + o), t.indexOf("short") !== -1 && (o %= r, o !== o % (r / 2) && (o = o < 0 ? o + r : o - r)), t.indexOf("_cw") !== -1 && o < 0 ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : t.indexOf("ccw") !== -1 && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), a < h && a > -h && (a = 0), a
                },
                ut = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                ft = function(t, e, i) {
                    return t = t < 0 ? t + 1 : t > 1 ? t - 1 : t, 255 * (6 * t < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                },
                dt = o.parseColor = function(t, e) {
                    var i, n, r, s, o, a, l, h, c, u, f;
                    if (t)
                        if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                        else {
                            if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t];
                            else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), r = t.charAt(2), s = t.charAt(3), t = "#" + n + n + r + r + s + s), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
                            else if ("hsl" === t.substr(0, 3))
                                if (i = f = t.match(y), e) {
                                    if (t.indexOf("=") !== -1) return t.match(_)
                                } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = l <= .5 ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(i[3])), i[0] = ft(o + 1 / 3, n, r), i[1] = ft(o, n, r), i[2] = ft(o - 1 / 3, n, r);
                            else i = t.match(y) || ut.transparent;
                            i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                        } else i = ut.black;
                    return e && !f && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, h = Math.max(n, r, s), c = Math.min(n, r, s), l = (h + c) / 2, h === c ? o = a = 0 : (u = h - c, a = l > .5 ? u / (2 - h - c) : u / (h + c), o = h === n ? (r - s) / u + (r < s ? 6 : 0) : h === r ? (s - n) / u + 2 : (n - r) / u + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                },
                pt = function(t, e) {
                    var i, n, r, s = t.match(mt) || [],
                        o = 0,
                        a = "";
                    if (!s.length) return t;
                    for (i = 0; i < s.length; i++) n = s[i], r = t.substr(o, t.indexOf(n, o) - o), o += r.length + n.length, n = dt(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                    return a + t.substr(o)
                },
                mt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (h in ut) mt += "|" + h + "\\b";
            mt = new RegExp(mt + ")", "gi"), o.colorStringFilter = function(t) {
                var e, i = t[0] + " " + t[1];
                mt.test(i) && (e = i.indexOf("hsl(") !== -1 || i.indexOf("hsla(") !== -1, t[0] = pt(t[0], e), t[1] = pt(t[1], e)), mt.lastIndex = 0
            }, e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
            var gt = function(t, e, i, n) {
                    if (null == t) return function(t) {
                        return t
                    };
                    var r, s = e ? (t.match(mt) || [""])[0] : "",
                        o = t.split(s).join("").match(x) || [],
                        a = t.substr(0, t.indexOf(o[0])),
                        l = ")" === t.charAt(t.length - 1) ? ")" : "",
                        h = t.indexOf(" ") !== -1 ? " " : ",",
                        c = o.length,
                        u = c > 0 ? o[0].replace(y, "") : "";
                    return c ? r = e ? function(t) {
                        var e, f, d, p;
                        if ("number" == typeof t) t += u;
                        else if (n && I.test(t)) {
                            for (p = t.replace(I, "|").split("|"), d = 0; d < p.length; d++) p[d] = r(p[d]);
                            return p.join(",")
                        }
                        if (e = (t.match(mt) || [s])[0], f = t.split(e).join("").match(x) || [], d = f.length, c > d--)
                            for (; ++d < c;) f[d] = i ? f[(d - 1) / 2 | 0] : o[d];
                        return a + f.join(h) + h + e + l + (t.indexOf("inset") !== -1 ? " inset" : "")
                    } : function(t) {
                        var e, s, f;
                        if ("number" == typeof t) t += u;
                        else if (n && I.test(t)) {
                            for (s = t.replace(I, "|").split("|"), f = 0; f < s.length; f++) s[f] = r(s[f]);
                            return s.join(",")
                        }
                        if (e = t.match(x) || [], f = e.length, c > f--)
                            for (; ++f < c;) e[f] = i ? e[(f - 1) / 2 | 0] : o[f];
                        return a + e.join(h) + l
                    } : function(t) {
                        return t
                    }
                },
                vt = function(t) {
                    return t = t.split(","),
                        function(e, i, n, r, s, o, a) {
                            var l, h = (i + "").split(" ");
                            for (a = {}, l = 0; l < 4; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                            return r.parse(e, a, s, o)
                        }
                },
                yt = (Y._setPluginRatio = function(t) {
                    this.plugin.setRatio(t);
                    for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, h = 1e-6; l;) e = a[l.v], l.r ? e = Math.round(e) : e < h && e > -h && (e = 0), l.t[l.p] = e, l = l._next;
                    if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === t || 0 === t)
                        for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l;) {
                            if (i = l.t, i.type) {
                                if (1 === i.type) {
                                    for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                    i[s] = r
                                }
                            } else i[s] = i.s + i.xs0;
                            l = l._next
                        }
                }, function(t, e, i, n, r) {
                    this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                }),
                _t = (Y._parseToProxy = function(t, e, i, n, r, s) {
                    var o, a, l, h, c, u = n,
                        f = {},
                        d = {},
                        p = i._transform,
                        m = N;
                    for (i._transform = null, N = e, n = c = i.parse(t, e, n, r), N = m, s && (i._transform = p, u && (u._prev = null, u._prev && (u._prev._next = null))); n && n !== u;) {
                        if (n.type <= 1 && (a = n.p, d[a] = n.s + n.c, f[a] = n.s, s || (h = new yt(n, "s", a, h, n.r), n.c = 0), 1 === n.type))
                            for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, d[a] = n.data[l], f[a] = n[l], s || (h = new yt(n, l, a, h, n.rxp[l]));
                        n = n._next
                    }
                    return {
                        proxy: f,
                        end: d,
                        firstMPT: h,
                        pt: c
                    }
                }, Y.CSSPropTween = function(t, e, n, r, o, a, l, h, c, u, f) {
                    this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof _t || s.push(this.n), this.r = h, this.type = a || 0, c && (this.pr = c, i = !0), this.b = void 0 === u ? n : u, this.e = void 0 === f ? n + r : f, o && (this._next = o, o._prev = this)
                }),
                xt = function(t, e, i, n, r, s) {
                    var o = new _t(t, e, i, n - i, r, (-1), s);
                    return o.b = i, o.e = o.xs0 = n, o
                },
                wt = o.parseComplex = function(t, e, i, n, r, s, a, l, h, u) {
                    i = i || s || "", "function" == typeof n && (n = n(v, g)), a = new _t(t, e, 0, 0, a, u ? 2 : 1, null, (!1), l, i, n), n += "", r && mt.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                    var f, d, p, m, x, w, b, T, S, P, C, k, E, O = i.split(", ").join(",").split(" "),
                        A = n.split(", ").join(",").split(" "),
                        D = O.length,
                        M = c !== !1;
                    for (n.indexOf(",") === -1 && i.indexOf(",") === -1 || ((n + i).indexOf("rgb") !== -1 || (n + i).indexOf("hsl") !== -1 ? (O = O.join(" ").replace(I, ", ").split(" "), A = A.join(" ").replace(I, ", ").split(" ")) : (O = O.join(" ").split(",").join(", ").split(" "), A = A.join(" ").split(",").join(", ").split(" ")), D = O.length), D !== A.length && (O = (s || "").split(" "), D = O.length), a.plugin = h, a.setRatio = u, mt.lastIndex = 0, f = 0; f < D; f++)
                        if (m = O[f], x = A[f], T = parseFloat(m), T || 0 === T) a.appendXtra("", T, lt(x, T), x.replace(_, ""), M && x.indexOf("px") !== -1, !0);
                        else if (r && mt.test(m)) k = x.indexOf(")") + 1, k = ")" + (k ? x.substr(k) : ""), E = x.indexOf("hsl") !== -1 && H, P = x, m = dt(m, E), x = dt(x, E), S = m.length + x.length > 6, S && !H && 0 === x[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(A[f]).join("transparent")) : (H || (S = !1), E ? a.appendXtra(P.substr(0, P.indexOf("hsl")) + (S ? "hsla(" : "hsl("), m[0], lt(x[0], m[0]), ",", !1, !0).appendXtra("", m[1], lt(x[1], m[1]), "%,", !1).appendXtra("", m[2], lt(x[2], m[2]), S ? "%," : "%" + k, !1) : a.appendXtra(P.substr(0, P.indexOf("rgb")) + (S ? "rgba(" : "rgb("), m[0], x[0] - m[0], ",", !0, !0).appendXtra("", m[1], x[1] - m[1], ",", !0).appendXtra("", m[2], x[2] - m[2], S ? "," : k, !0), S && (m = m.length < 4 ? 1 : m[3], a.appendXtra("", m, (x.length < 4 ? 1 : x[3]) - m, k, !1))), mt.lastIndex = 0;
                    else if (w = m.match(y)) {
                        if (b = x.match(_), !b || b.length !== w.length) return a;
                        for (p = 0, d = 0; d < w.length; d++) C = w[d], P = m.indexOf(C, p), a.appendXtra(m.substr(p, P - p), Number(C), lt(b[d], C), "", M && "px" === m.substr(P + C.length, 2), 0 === d), p = P + C.length;
                        a["xs" + a.l] += m.substr(p)
                    } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + x : x;
                    if (n.indexOf("=") !== -1 && a.data) {
                        for (k = a.xs0 + a.data.s, f = 1; f < a.l; f++) k += a["xs" + f] + a.data["xn" + f];
                        a.e = k + a["xs" + f]
                    }
                    return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                },
                bt = 9;
            for (h = _t.prototype, h.l = h.pr = 0; --bt > 0;) h["xn" + bt] = 0, h["xs" + bt] = "";
            h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, n, r, s) {
                var o = this,
                    a = o.l;
                return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new _t(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                    s: e + i
                }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
            };
            var Tt = function(t, e) {
                    e = e || {}, this.p = e.prefix ? $(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || gt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                },
                St = Y._registerComplexSpecialProp = function(t, e, i) {
                    "object" != typeof e && (e = {
                        parser: i
                    });
                    var n, r, s = t.split(","),
                        o = e.defaultValue;
                    for (i = i || [o], n = 0; n < s.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, r = new Tt(s[n], e)
                },
                Pt = Y._registerPluginProp = function(t) {
                    if (!l[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        St(t, {
                            parser: function(t, i, n, r, s, o, h) {
                                var c = a.com.greensock.plugins[e];
                                return c ? (c._cssRegister(), l[n].parse(t, i, n, r, s, o, h)) : (V("Error: " + e + " js file not loaded."), s)
                            }
                        })
                    }
                };
            h = Tt.prototype, h.parseComplex = function(t, e, i, n, r, s) {
                var o, a, l, h, c, u, f = this.keyword;
                if (this.multi && (I.test(i) || I.test(e) ? (a = e.replace(I, "|").split("|"), l = i.replace(I, "|").split("|")) : f && (a = [e], l = [i])), l) {
                    for (h = l.length > a.length ? l.length : a.length, o = 0; o < h; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, f && (c = e.indexOf(f), u = i.indexOf(f), c !== u && (u === -1 ? a[o] = a[o].split(f).join("") : c === -1 && (a[o] += " " + f)));
                    e = a.join(", "), i = l.join(", ")
                }
                return wt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
            }, h.parse = function(t, e, i, n, s, o, a) {
                return this.parseComplex(t.style, this.format(J(t, this.p, r, !1, this.dflt)), this.format(e), s, o)
            }, o.registerSpecialProp = function(t, e, i) {
                St(t, {
                    parser: function(t, n, r, s, o, a, l) {
                        var h = new _t(t, r, 0, 0, o, 2, r, (!1), i);
                        return h.plugin = a, h.setRatio = e(t, n, s._tween, r), h
                    },
                    priority: i
                })
            }, o.useSVGTransformAttr = !0;
            var Ct, kt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Et = $("transform"),
                Ot = G + "transform",
                At = $("transformOrigin"),
                Dt = null !== $("perspective"),
                Mt = Y.Transform = function() {
                    this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(o.defaultForce3D === !1 || !Dt) && (o.defaultForce3D || "auto")
                },
                zt = _gsScope.SVGElement,
                It = function(t, e, i) {
                    var n, r = B.createElementNS("http://www.w3.org/2000/svg", t),
                        s = /([a-z])([A-Z])/g;
                    for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                    return e.appendChild(r), r
                },
                Lt = B.documentElement || {},
                Rt = function() {
                    var t, e, i, n = m || /Android/i.test(q) && !_gsScope.chrome;
                    return B.createElementNS && !n && (t = It("svg", Lt), e = It("rect", t, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), i = e.getBoundingClientRect().width, e.style[At] = "50% 50%", e.style[Et] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(d && Dt), Lt.removeChild(t)), n
                }(),
                Ft = function(t, e, i, n, r, s) {
                    var a, l, h, c, u, f, d, p, m, g, v, y, _, x, w = t._gsTransform,
                        b = Ut(t, !0);
                    w && (_ = w.xOrigin, x = w.yOrigin), (!n || (a = n.split(" ")).length < 2) && (d = t.getBBox(), 0 === d.x && 0 === d.y && d.width + d.height === 0 && (d = {
                        x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                        y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    }), e = at(e).split(" "), a = [(e[0].indexOf("%") !== -1 ? parseFloat(e[0]) / 100 * d.width : parseFloat(e[0])) + d.x, (e[1].indexOf("%") !== -1 ? parseFloat(e[1]) / 100 * d.height : parseFloat(e[1])) + d.y]), i.xOrigin = c = parseFloat(a[0]), i.yOrigin = u = parseFloat(a[1]), n && b !== Xt && (f = b[0], d = b[1], p = b[2], m = b[3], g = b[4], v = b[5], y = f * m - d * p, y && (l = c * (m / y) + u * (-p / y) + (p * v - m * g) / y, h = c * (-d / y) + u * (f / y) - (f * v - d * g) / y, c = i.xOrigin = a[0] = l, u = i.yOrigin = a[1] = h)), w && (s && (i.xOffset = w.xOffset, i.yOffset = w.yOffset, w = i), r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (l = c - _, h = u - x, w.xOffset += l * b[0] + h * b[2] - l, w.yOffset += l * b[1] + h * b[3] - h) : w.xOffset = w.yOffset = 0), s || t.setAttribute("data-svg-origin", a.join(" "))
                },
                Nt = function(t) {
                    var e, i = X("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                        n = this.parentNode,
                        r = this.nextSibling,
                        s = this.style.cssText;
                    if (Lt.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                        e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Nt
                    } catch (o) {} else this._originalGetBBox && (e = this._originalGetBBox());
                    return r ? n.insertBefore(this, r) : n.appendChild(this), Lt.removeChild(i), this.style.cssText = s, e
                },
                jt = function(t) {
                    try {
                        return t.getBBox()
                    } catch (e) {
                        return Nt.call(t, !0)
                    }
                },
                Bt = function(t) {
                    return !(!zt || !t.getCTM || t.parentNode && !t.ownerSVGElement || !jt(t))
                },
                Xt = [1, 0, 0, 1, 0, 0],
                Ut = function(t, e) {
                    var i, n, r, s, o, a, l = t._gsTransform || new Mt,
                        h = 1e5,
                        c = t.style;
                    if (Et ? n = J(t, Ot, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(M), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Et || !(a = !K(t) || "none" === K(t).display) && t.parentNode || (a && (s = c.display, c.display = "block"), t.parentNode || (o = 1, Lt.appendChild(t)), n = J(t, Ot, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? c.display = s : a && Zt(c, "display"), o && Lt.removeChild(t)), (l.svg || t.getCTM && Bt(t)) && (i && (c[Et] + "").indexOf("matrix") !== -1 && (n = c[Et], i = 0), r = t.getAttribute("transform"), i && r && (r.indexOf("matrix") !== -1 ? (n = r, i = 0) : r.indexOf("translate") !== -1 && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Xt;
                    for (r = (n || "").match(y) || [], bt = r.length; --bt > -1;) s = Number(r[bt]), r[bt] = (o = s - (s |= 0)) ? (o * h + (o < 0 ? -.5 : .5) | 0) / h + s : s;
                    return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                },
                Wt = Y.getTransform = function(t, i, n, r) {
                    if (t._gsTransform && n && !r) return t._gsTransform;
                    var s, a, l, h, c, u, f = n ? t._gsTransform || new Mt : new Mt,
                        d = f.scaleX < 0,
                        p = 2e-5,
                        m = 1e5,
                        g = Dt ? parseFloat(J(t, At, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin || 0 : 0,
                        v = parseFloat(o.defaultTransformPerspective) || 0;
                    if (f.svg = !(!t.getCTM || !Bt(t)), f.svg && (Ft(t, J(t, At, i, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), Ct = o.useSVGTransformAttr || Rt), s = Ut(t), s !== Xt) {
                        if (16 === s.length) {
                            var y, _, x, w, b, T = s[0],
                                S = s[1],
                                P = s[2],
                                C = s[3],
                                k = s[4],
                                E = s[5],
                                O = s[6],
                                A = s[7],
                                D = s[8],
                                M = s[9],
                                z = s[10],
                                I = s[12],
                                L = s[13],
                                R = s[14],
                                N = s[11],
                                j = Math.atan2(O, z);
                            f.zOrigin && (R = -f.zOrigin, I = D * R - s[12], L = M * R - s[13], R = z * R + f.zOrigin - s[14]), f.rotationX = j * F, j && (w = Math.cos(-j), b = Math.sin(-j), y = k * w + D * b, _ = E * w + M * b, x = O * w + z * b, D = k * -b + D * w, M = E * -b + M * w, z = O * -b + z * w, N = A * -b + N * w, k = y, E = _, O = x), j = Math.atan2(-P, z), f.rotationY = j * F, j && (w = Math.cos(-j), b = Math.sin(-j), y = T * w - D * b, _ = S * w - M * b, x = P * w - z * b, M = S * b + M * w, z = P * b + z * w, N = C * b + N * w, T = y, S = _, P = x), j = Math.atan2(S, T), f.rotation = j * F, j && (w = Math.cos(j), b = Math.sin(j), y = T * w + S * b, _ = k * w + E * b, x = D * w + M * b, S = S * w - T * b, E = E * w - k * b, M = M * w - D * b, T = y, k = _, D = x), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), j = Math.atan2(k, E), f.scaleX = (Math.sqrt(T * T + S * S + P * P) * m + .5 | 0) / m, f.scaleY = (Math.sqrt(E * E + O * O) * m + .5 | 0) / m, f.scaleZ = (Math.sqrt(D * D + M * M + z * z) * m + .5 | 0) / m, T /= f.scaleX, k /= f.scaleY, S /= f.scaleX, E /= f.scaleY, Math.abs(j) > p ? (f.skewX = j * F, k = 0, "simple" !== f.skewType && (f.scaleY *= 1 / Math.cos(j))) : f.skewX = 0, f.perspective = N ? 1 / (N < 0 ? -N : N) : 0, f.x = I, f.y = L, f.z = R, f.svg && (f.x -= f.xOrigin - (f.xOrigin * T - f.yOrigin * k), f.y -= f.yOrigin - (f.yOrigin * S - f.xOrigin * E))
                        } else if (!Dt || r || !s.length || f.x !== s[4] || f.y !== s[5] || !f.rotationX && !f.rotationY) {
                            var B = s.length >= 6,
                                X = B ? s[0] : 1,
                                U = s[1] || 0,
                                W = s[2] || 0,
                                Y = B ? s[3] : 1;
                            f.x = s[4] || 0, f.y = s[5] || 0, l = Math.sqrt(X * X + U * U), h = Math.sqrt(Y * Y + W * W), c = X || U ? Math.atan2(U, X) * F : f.rotation || 0, u = W || Y ? Math.atan2(W, Y) * F + c : f.skewX || 0, f.scaleX = l, f.scaleY = h, f.rotation = c, f.skewX = u, Dt && (f.rotationX = f.rotationY = f.z = 0, f.perspective = v, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * X + f.yOrigin * W), f.y -= f.yOrigin - (f.xOrigin * U + f.yOrigin * Y))
                        }
                        Math.abs(f.skewX) > 90 && Math.abs(f.skewX) < 270 && (d ? (f.scaleX *= -1, f.skewX += f.rotation <= 0 ? 180 : -180, f.rotation += f.rotation <= 0 ? 180 : -180) : (f.scaleY *= -1, f.skewX += f.skewX <= 0 ? 180 : -180)), f.zOrigin = g;
                        for (a in f) f[a] < p && f[a] > -p && (f[a] = 0)
                    }
                    return n && (t._gsTransform = f, f.svg && (Ct && t.style[Et] ? e.delayedCall(.001, function() {
                        Zt(t.style, Et)
                    }) : !Ct && t.getAttribute("transform") && e.delayedCall(.001, function() {
                        t.removeAttribute("transform")
                    }))), f
                },
                Yt = function(t) {
                    var e, i, n = this.data,
                        r = -n.rotation * R,
                        s = r + n.skewX * R,
                        o = 1e5,
                        a = (Math.cos(r) * n.scaleX * o | 0) / o,
                        l = (Math.sin(r) * n.scaleX * o | 0) / o,
                        h = (Math.sin(s) * -n.scaleY * o | 0) / o,
                        c = (Math.cos(s) * n.scaleY * o | 0) / o,
                        u = this.t.style,
                        f = this.t.currentStyle;
                    if (f) {
                        i = l, l = -h, h = -i, e = f.filter, u.filter = "";
                        var d, p, g = this.t.offsetWidth,
                            v = this.t.offsetHeight,
                            y = "absolute" !== f.position,
                            _ = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + c,
                            x = n.x + g * n.xPercent / 100,
                            w = n.y + v * n.yPercent / 100;
                        if (null != n.ox && (d = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, p = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, x += d - (d * a + p * l), w += p - (d * h + p * c)), y ? (d = g / 2, p = v / 2, _ += ", Dx=" + (d - (d * a + p * l) + x) + ", Dy=" + (p - (d * h + p * c) + w) + ")") : _ += ", sizingMethod='auto expand')", e.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? u.filter = e.replace(z, _) : u.filter = _ + " " + e, 0 !== t && 1 !== t || 1 === a && 0 === l && 0 === h && 1 === c && (y && _.indexOf("Dx=0, Dy=0") === -1 || T.test(e) && 100 !== parseFloat(RegExp.$1) || e.indexOf(e.indexOf("Alpha")) === -1 && u.removeAttribute("filter")), !y) {
                            var S, P, C, k = m < 8 ? 1 : -1;
                            for (d = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((a < 0 ? -a : a) * g + (l < 0 ? -l : l) * v)) / 2 + x), n.ieOffsetY = Math.round((v - ((c < 0 ? -c : c) * v + (h < 0 ? -h : h) * g)) / 2 + w), bt = 0; bt < 4; bt++) P = st[bt], S = f[P], i = S.indexOf("px") !== -1 ? parseFloat(S) : tt(this.t, P, parseFloat(S), S.replace(b, "")) || 0, C = i !== n[P] ? bt < 2 ? -n.ieOffsetX : -n.ieOffsetY : bt < 2 ? d - n.ieOffsetX : p - n.ieOffsetY, u[P] = (n[P] = Math.round(i - C * (0 === bt || 2 === bt ? 1 : k))) + "px"
                        }
                    }
                },
                qt = Y.set3DTransformRatio = Y.setTransformRatio = function(t) {
                    var e, i, n, r, s, o, a, l, h, c, u, f, p, m, g, v, y, _, x, w, b, T, S, P = this.data,
                        C = this.t.style,
                        k = P.rotation,
                        E = P.rotationX,
                        O = P.rotationY,
                        A = P.scaleX,
                        D = P.scaleY,
                        M = P.scaleZ,
                        z = P.x,
                        I = P.y,
                        L = P.z,
                        F = P.svg,
                        N = P.perspective,
                        j = P.force3D,
                        B = P.skewY,
                        X = P.skewX;
                    if (B && (X += B, k += B), ((1 === t || 0 === t) && "auto" === j && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !j) && !L && !N && !O && !E && 1 === M || Ct && F || !Dt) return void(k || X || F ? (k *= R, T = X * R, S = 1e5, i = Math.cos(k) * A, s = Math.sin(k) * A, n = Math.sin(k - T) * -D, o = Math.cos(k - T) * D, T && "simple" === P.skewType && (e = Math.tan(T - B * R), e = Math.sqrt(1 + e * e), n *= e, o *= e, B && (e = Math.tan(B * R), e = Math.sqrt(1 + e * e), i *= e, s *= e)), F && (z += P.xOrigin - (P.xOrigin * i + P.yOrigin * n) + P.xOffset, I += P.yOrigin - (P.xOrigin * s + P.yOrigin * o) + P.yOffset, Ct && (P.xPercent || P.yPercent) && (g = this.t.getBBox(), z += .01 * P.xPercent * g.width, I += .01 * P.yPercent * g.height), g = 1e-6, z < g && z > -g && (z = 0), I < g && I > -g && (I = 0)), x = (i * S | 0) / S + "," + (s * S | 0) / S + "," + (n * S | 0) / S + "," + (o * S | 0) / S + "," + z + "," + I + ")", F && Ct ? this.t.setAttribute("transform", "matrix(" + x) : C[Et] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + x) : C[Et] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix(" : "matrix(") + A + ",0,0," + D + "," + z + "," + I + ")");
                    if (d && (g = 1e-4, A < g && A > -g && (A = M = 2e-5), D < g && D > -g && (D = M = 2e-5), !N || P.z || P.rotationX || P.rotationY || (N = 0)), k || X) k *= R, v = i = Math.cos(k), y = s = Math.sin(k), X && (k -= X * R, v = Math.cos(k), y = Math.sin(k), "simple" === P.skewType && (e = Math.tan((X - B) * R), e = Math.sqrt(1 + e * e), v *= e, y *= e, P.skewY && (e = Math.tan(B * R), e = Math.sqrt(1 + e * e), i *= e, s *= e))), n = -y, o = v;
                    else {
                        if (!(O || E || 1 !== M || N || F)) return void(C[Et] = (P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) translate3d(" : "translate3d(") + z + "px," + I + "px," + L + "px)" + (1 !== A || 1 !== D ? " scale(" + A + "," + D + ")" : ""));
                        i = o = 1, n = s = 0
                    }
                    c = 1, r = a = l = h = u = f = 0, p = N ? -1 / N : 0, m = P.zOrigin, g = 1e-6, w = ",", b = "0", k = O * R, k && (v = Math.cos(k), y = Math.sin(k), l = -y, u = p * -y, r = i * y, a = s * y, c = v, p *= v, i *= v, s *= v), k = E * R, k && (v = Math.cos(k), y = Math.sin(k), e = n * v + r * y, _ = o * v + a * y, h = c * y, f = p * y, r = n * -y + r * v, a = o * -y + a * v, c *= v, p *= v, n = e, o = _), 1 !== M && (r *= M, a *= M, c *= M, p *= M), 1 !== D && (n *= D, o *= D, h *= D, f *= D), 1 !== A && (i *= A, s *= A, l *= A, u *= A), (m || F) && (m && (z += r * -m, I += a * -m, L += c * -m + m), F && (z += P.xOrigin - (P.xOrigin * i + P.yOrigin * n) + P.xOffset, I += P.yOrigin - (P.xOrigin * s + P.yOrigin * o) + P.yOffset), z < g && z > -g && (z = b), I < g && I > -g && (I = b), L < g && L > -g && (L = 0)), x = P.xPercent || P.yPercent ? "translate(" + P.xPercent + "%," + P.yPercent + "%) matrix3d(" : "matrix3d(", x += (i < g && i > -g ? b : i) + w + (s < g && s > -g ? b : s) + w + (l < g && l > -g ? b : l), x += w + (u < g && u > -g ? b : u) + w + (n < g && n > -g ? b : n) + w + (o < g && o > -g ? b : o), E || O || 1 !== M ? (x += w + (h < g && h > -g ? b : h) + w + (f < g && f > -g ? b : f) + w + (r < g && r > -g ? b : r), x += w + (a < g && a > -g ? b : a) + w + (c < g && c > -g ? b : c) + w + (p < g && p > -g ? b : p) + w) : x += ",0,0,0,0,1,0,", x += z + w + I + w + L + w + (N ? 1 + -L / N : 1) + ")", C[Et] = x
                };
            h = Mt.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, St("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(t, e, i, n, s, a, l) {
                    if (n._lastParsedTransform === l) return s;
                    n._lastParsedTransform = l;
                    var h, c = l.scale && "function" == typeof l.scale ? l.scale : 0;
                    "function" == typeof l[i] && (h = l[i], l[i] = e), c && (l.scale = c(v, t));
                    var u, f, d, p, m, y, _, x, w, b = t._gsTransform,
                        T = t.style,
                        S = 1e-6,
                        P = kt.length,
                        C = l,
                        k = {},
                        E = "transformOrigin",
                        O = Wt(t, r, !0, C.parseTransform),
                        A = C.transform && ("function" == typeof C.transform ? C.transform(v, g) : C.transform);
                    if (O.skewType = C.skewType || O.skewType || o.defaultSkewType, n._transform = O, A && "string" == typeof A && Et) f = U.style, f[Et] = A, f.display = "block", f.position = "absolute", B.body.appendChild(U), u = Wt(U, null, !1), "simple" === O.skewType && (u.scaleY *= Math.cos(u.skewX * R)), O.svg && (y = O.xOrigin, _ = O.yOrigin, u.x -= O.xOffset, u.y -= O.yOffset, (C.transformOrigin || C.svgOrigin) && (A = {}, Ft(t, at(C.transformOrigin), A, C.svgOrigin, C.smoothOrigin, !0), y = A.xOrigin, _ = A.yOrigin, u.x -= A.xOffset - O.xOffset, u.y -= A.yOffset - O.yOffset), (y || _) && (x = Ut(U, !0), u.x -= y - (y * x[0] + _ * x[2]), u.y -= _ - (y * x[1] + _ * x[3]))), B.body.removeChild(U), u.perspective || (u.perspective = O.perspective), null != C.xPercent && (u.xPercent = ht(C.xPercent, O.xPercent)), null != C.yPercent && (u.yPercent = ht(C.yPercent, O.yPercent));
                    else if ("object" == typeof C) {
                        if (u = {
                                scaleX: ht(null != C.scaleX ? C.scaleX : C.scale, O.scaleX),
                                scaleY: ht(null != C.scaleY ? C.scaleY : C.scale, O.scaleY),
                                scaleZ: ht(C.scaleZ, O.scaleZ),
                                x: ht(C.x, O.x),
                                y: ht(C.y, O.y),
                                z: ht(C.z, O.z),
                                xPercent: ht(C.xPercent, O.xPercent),
                                yPercent: ht(C.yPercent, O.yPercent),
                                perspective: ht(C.transformPerspective, O.perspective)
                            }, m = C.directionalRotation, null != m)
                            if ("object" == typeof m)
                                for (f in m) C[f] = m[f];
                            else C.rotation = m;
                            "string" == typeof C.x && C.x.indexOf("%") !== -1 && (u.x = 0, u.xPercent = ht(C.x, O.xPercent)), "string" == typeof C.y && C.y.indexOf("%") !== -1 && (u.y = 0, u.yPercent = ht(C.y, O.yPercent)), u.rotation = ct("rotation" in C ? C.rotation : "shortRotation" in C ? C.shortRotation + "_short" : "rotationZ" in C ? C.rotationZ : O.rotation, O.rotation, "rotation", k), Dt && (u.rotationX = ct("rotationX" in C ? C.rotationX : "shortRotationX" in C ? C.shortRotationX + "_short" : O.rotationX || 0, O.rotationX, "rotationX", k), u.rotationY = ct("rotationY" in C ? C.rotationY : "shortRotationY" in C ? C.shortRotationY + "_short" : O.rotationY || 0, O.rotationY, "rotationY", k)), u.skewX = ct(C.skewX, O.skewX), u.skewY = ct(C.skewY, O.skewY)
                    }
                    for (Dt && null != C.force3D && (O.force3D = C.force3D, p = !0), d = O.force3D || O.z || O.rotationX || O.rotationY || u.z || u.rotationX || u.rotationY || u.perspective, d || null == C.scale || (u.scaleZ = 1); --P > -1;) w = kt[P], A = u[w] - O[w], (A > S || A < -S || null != C[w] || null != N[w]) && (p = !0, s = new _t(O, w, O[w], A, s), w in k && (s.e = k[w]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                    return A = C.transformOrigin, O.svg && (A || C.svgOrigin) && (y = O.xOffset, _ = O.yOffset, Ft(t, at(A), u, C.svgOrigin, C.smoothOrigin), s = xt(O, "xOrigin", (b ? O : u).xOrigin, u.xOrigin, s, E), s = xt(O, "yOrigin", (b ? O : u).yOrigin, u.yOrigin, s, E), y === O.xOffset && _ === O.yOffset || (s = xt(O, "xOffset", b ? y : O.xOffset, O.xOffset, s, E), s = xt(O, "yOffset", b ? _ : O.yOffset, O.yOffset, s, E)), A = "0px 0px"), (A || Dt && d && O.zOrigin) && (Et ? (p = !0, w = At, A = (A || J(t, w, r, !1, "50% 50%")) + "", s = new _t(T, w, 0, 0, s, (-1), E), s.b = T[w], s.plugin = a, Dt ? (f = O.zOrigin, A = A.split(" "), O.zOrigin = (A.length > 2 && (0 === f || "0px" !== A[2]) ? parseFloat(A[2]) : f) || 0, s.xs0 = s.e = A[0] + " " + (A[1] || "50%") + " 0px", s = new _t(O, "zOrigin", 0, 0, s, (-1), s.n), s.b = f, s.xs0 = s.e = O.zOrigin) : s.xs0 = s.e = A) : at(A + "", O)), p && (n._transformType = O.svg && Ct || !d && 3 !== this._transformType ? 2 : 3), h && (l[i] = h), c && (l.scale = c), s
                },
                prefix: !0
            }), St("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), St("borderRadius", {
                defaultValue: "0px",
                parser: function(t, e, i, s, o, a) {
                    e = this.format(e);
                    var l, h, c, u, f, d, p, m, g, v, y, _, x, w, b, T, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        P = t.style;
                    for (g = parseFloat(t.offsetWidth), v = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < S.length; h++) this.p.indexOf("border") && (S[h] = $(S[h])), f = u = J(t, S[h], r, !1, "0px"), f.indexOf(" ") !== -1 && (u = f.split(" "), f = u[0], u = u[1]), d = c = l[h], p = parseFloat(f), _ = f.substr((p + "").length), x = "=" === d.charAt(1), x ? (m = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), m *= parseFloat(d), y = d.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(d), y = d.substr((m + "").length)), "" === y && (y = n[i] || _), y !== _ && (w = tt(t, "borderLeft", p, _), b = tt(t, "borderTop", p, _), "%" === y ? (f = w / g * 100 + "%", u = b / v * 100 + "%") : "em" === y ? (T = tt(t, "borderLeft", 1, "em"), f = w / T + "em", u = b / T + "em") : (f = w + "px", u = b + "px"), x && (d = parseFloat(f) + m + y, c = parseFloat(u) + m + y)), o = wt(P, S[h], f + " " + u, d + " " + c, !1, "0px", o);
                    return o
                },
                prefix: !0,
                formatter: gt("0px 0px 0px 0px", !1, !0)
            }), St("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function(t, e, i, n, s, o) {
                    return wt(t.style, i, this.format(J(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", s)
                },
                prefix: !0,
                formatter: gt("0px 0px", !1, !0)
            }), St("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(t, e, i, n, s, o) {
                    var a, l, h, c, u, f, d = "background-position",
                        p = r || K(t, null),
                        g = this.format((p ? m ? p.getPropertyValue(d + "-x") + " " + p.getPropertyValue(d + "-y") : p.getPropertyValue(d) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                        v = this.format(e);
                    if (g.indexOf("%") !== -1 != (v.indexOf("%") !== -1) && v.split(",").length < 2 && (f = J(t, "backgroundImage").replace(O, ""), f && "none" !== f)) {
                        for (a = g.split(" "), l = v.split(" "), W.setAttribute("src", f), h = 2; --h > -1;) g = a[h], c = g.indexOf("%") !== -1, c !== (l[h].indexOf("%") !== -1) && (u = 0 === h ? t.offsetWidth - W.width : t.offsetHeight - W.height, a[h] = c ? parseFloat(g) / 100 * u + "px" : parseFloat(g) / u * 100 + "%");
                        g = a.join(" ")
                    }
                    return this.parseComplex(t.style, g, v, s, o)
                },
                formatter: at
            }), St("backgroundSize", {
                defaultValue: "0 0",
                formatter: function(t) {
                    return t += "", at(t.indexOf(" ") === -1 ? t + " " + t : t)
                }
            }), St("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), St("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), St("transformStyle", {
                prefix: !0
            }), St("backfaceVisibility", {
                prefix: !0
            }), St("userSelect", {
                prefix: !0
            }), St("margin", {
                parser: vt("marginTop,marginRight,marginBottom,marginLeft")
            }), St("padding", {
                parser: vt("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), St("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(t, e, i, n, s, o) {
                    var a, l, h;
                    return m < 9 ? (l = t.currentStyle, h = m < 8 ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(J(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o)
                }
            }), St("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), St("autoRound,strictUnits", {
                parser: function(t, e, i, n, r) {
                    return r
                }
            }), St("border", {
                defaultValue: "0px solid #000",
                parser: function(t, e, i, n, s, o) {
                    var a = J(t, "borderTopWidth", r, !1, "0px"),
                        l = this.format(e).split(" "),
                        h = l[0].replace(b, "");
                    return "px" !== h && (a = parseFloat(a) / tt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(a + " " + J(t, "borderTopStyle", r, !1, "solid") + " " + J(t, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                },
                color: !0,
                formatter: function(t) {
                    var e = t.split(" ");
                    return e[0] + " " + (e[1] || "solid") + " " + (t.match(mt) || ["#000"])[0]
                }
            }), St("borderWidth", {
                parser: vt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), St("float,cssFloat,styleFloat", {
                parser: function(t, e, i, n, r, s) {
                    var o = t.style,
                        a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                    return new _t(o, a, 0, 0, r, (-1), i, (!1), 0, o[a], e)
                }
            });
            var Ht = function(t) {
                var e, i = this.t,
                    n = i.filter || J(this.data, "filter") || "",
                    r = this.s + this.c * t | 0;
                100 === r && (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1 && n.indexOf("oader(") === -1 ? (i.removeAttribute("filter"), e = !J(this.data, "filter")) : (i.filter = n.replace(P, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), n.indexOf("pacity") === -1 ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(T, "opacity=" + r))
            };
            St("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(t, e, i, n, s, o) {
                    var a = parseFloat(J(t, "opacity", r, !1, "1")),
                        l = t.style,
                        h = "autoAlpha" === i;
                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === J(t, "visibility", r) && 0 !== e && (a = 0), H ? s = new _t(l, "opacity", a, e - a, s) : (s = new _t(l, "opacity", 100 * a, 100 * (e - a), s), s.xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = Ht), h && (s = new _t(l, "visibility", 0, 0, s, (-1), null, (!1), 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                }
            });
            var Zt = function(t, e) {
                    e && (t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), t.removeProperty(e.replace(k, "-$1").toLowerCase())) : t.removeAttribute(e))
                },
                Vt = function(t) {
                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Zt(i, e.p), e = e._next;
                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            St("className", {
                parser: function(t, e, n, s, o, a, l) {
                    var h, c, u, f, d, p = t.getAttribute("class") || "",
                        m = t.style.cssText;
                    if (o = s._classNamePT = new _t(t, n, 0, 0, o, 2), o.setRatio = Vt, o.pr = -11, i = !0, o.b = p, c = it(t, r), u = t._gsClassPT) {
                        for (f = {}, d = u.data; d;) f[d.p] = 1, d = d._next;
                        u.setRatio(1)
                    }
                    return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), h = nt(t, c, it(t), l, f), t.setAttribute("class", p), o.data = h.firstMPT, t.style.cssText = m, o = o.xfirst = s.parse(t, h.difs, o, a)
                }
            });
            var Gt = function(t) {
                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var e, i, n, r, s, o = this.t.style,
                        a = l.transform.parse;
                    if ("all" === this.e) o.cssText = "", r = !0;
                    else
                        for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? At : l[i].p), Zt(o, i);
                    r && (Zt(o, Et), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (St("clearProps", {
                    parser: function(t, e, n, r, s) {
                        return s = new _t(t, n, 0, 0, s, 2), s.setRatio = Gt, s.e = e, s.pr = -10, s.data = r._tween, i = !0, s
                    }
                }), h = "bezier,throwProps,physicsProps,physics2D".split(","), bt = h.length; bt--;) Pt(h[bt]);
            h = o.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, a, h) {
                if (!t.nodeType) return !1;
                this._target = g = t, this._tween = a, this._vars = e, v = h, c = e.autoRound, i = !1, n = e.suffixMap || o.suffixMap, r = K(t, ""), s = this._overwriteProps;
                var d, m, y, _, x, w, b, T, P, C = t.style;
                if (u && "" === C.zIndex && (d = J(t, "zIndex", r), "auto" !== d && "" !== d || this._addLazySet(C, "zIndex", 0)), "string" == typeof e && (_ = C.cssText, d = it(t, r), C.cssText = _ + ";" + e, d = nt(t, d, it(t)).difs, !H && S.test(e) && (d.opacity = parseFloat(RegExp.$1)), e = d, C.cssText = _), e.className ? this._firstPT = m = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = m = this.parse(t, e, null), this._transformType) {
                    for (P = 3 === this._transformType, Et ? f && (u = !0, "" === C.zIndex && (b = J(t, "zIndex", r), "auto" !== b && "" !== b || this._addLazySet(C, "zIndex", 0)), p && this._addLazySet(C, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (P ? "visible" : "hidden"))) : C.zoom = 1, y = m; y && y._next;) y = y._next;
                    T = new _t(t, "transform", 0, 0, null, 2), this._linkCSSP(T, null, y), T.setRatio = Et ? qt : Yt, T.data = this._transform || Wt(t, r, !0), T.tween = a, T.pr = -1, s.pop()
                }
                if (i) {
                    for (; m;) {
                        for (w = m._next, y = _; y && y.pr > m.pr;) y = y._next;
                        (m._prev = y ? y._prev : x) ? m._prev._next = m: _ = m, (m._next = y) ? y._prev = m : x = m, m = w
                    }
                    this._firstPT = _
                }
                return !0
            }, h.parse = function(t, e, i, s) {
                var o, a, h, u, f, d, p, m, y, _, x = t.style;
                for (o in e) {
                    if (d = e[o], "function" == typeof d && (d = d(v, g)), a = l[o]) i = a.parse(t, d, o, this, i, s, e);
                    else {
                        if ("--" === o.substr(0, 2)) {
                            this._tween._propLookup[o] = this._addTween.call(this._tween, t.style, "setProperty", K(t).getPropertyValue(o) + "", d + "", o, !1, o);
                            continue
                        }
                        f = J(t, o, r) + "", y = "string" == typeof d, "color" === o || "fill" === o || "stroke" === o || o.indexOf("Color") !== -1 || y && C.test(d) ? (y || (d = dt(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = wt(x, o, f, d, !0, "transparent", i, 0, s)) : y && L.test(d) ? i = wt(x, o, f, d, !0, null, i, 0, s) : (h = parseFloat(f), p = h || 0 === h ? f.substr((h + "").length) : "", "" !== f && "auto" !== f || ("width" === o || "height" === o ? (h = ot(t, o, r), p = "px") : "left" === o || "top" === o ? (h = et(t, o, r), p = "px") : (h = "opacity" !== o ? 0 : 1, p = "")), _ = y && "=" === d.charAt(1), _ ? (u = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), u *= parseFloat(d), m = d.replace(b, "")) : (u = parseFloat(d), m = y ? d.replace(b, "") : ""), "" === m && (m = o in n ? n[o] : p), d = u || 0 === u ? (_ ? u + h : u) + m : e[o], p !== m && ("" === m && "lineHeight" !== o || (u || 0 === u) && h && (h = tt(t, o, h, p), "%" === m ? (h /= tt(t, o, 100, "%") / 100, e.strictUnits !== !0 && (f = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= tt(t, o, 1, m) : "px" !== m && (u = tt(t, o, u, m), m = "px"), _ && (u || 0 === u) && (d = u + h + m))), _ && (u += h), !h && 0 !== h || !u && 0 !== u ? void 0 !== x[o] && (d || d + "" != "NaN" && null != d) ? (i = new _t(x, o, u || h || 0, 0, i, (-1), o, (!1), 0, f, d), i.xs0 = "none" !== d || "display" !== o && o.indexOf("Style") === -1 ? d : f) : V("invalid " + o + " tween value: " + e[o]) : (i = new _t(x, o, h, u - h, i, 0, o, c !== !1 && ("px" === m || "zIndex" === o), 0, f, d), i.xs0 = m))
                    }
                    s && i && !i.plugin && (i.plugin = s)
                }
                return i
            }, h.setRatio = function(t) {
                var e, i, n, r = this._firstPT,
                    s = 1e-6;
                if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; r;) {
                            if (e = r.c * t + r.s, r.r ? e = Math.round(e) : e < s && e > -s && (e = 0), r.type)
                                if (1 === r.type)
                                    if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                    else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                            else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                            else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                            else {
                                for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                r.t[r.p] = i
                            } else r.type === -1 ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                            else r.t[r.p] = e + r.xs0;
                            r = r._next
                        } else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                    else
                        for (; r;) {
                            if (2 !== r.type)
                                if (r.r && r.type !== -1)
                                    if (e = Math.round(r.s + r.c), r.type) {
                                        if (1 === r.type) {
                                            for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                            r.t[r.p] = i
                                        }
                                    } else r.t[r.p] = e + r.xs0;
                            else r.t[r.p] = r.e;
                            else r.setRatio(t);
                            r = r._next
                        }
            }, h._enableTransforms = function(t) {
                this._transform = this._transform || Wt(this._target, r, !0), this._transformType = this._transform.svg && Ct || !t && 3 !== this._transformType ? 2 : 3
            };
            var Qt = function(t) {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            h._addLazySet = function(t, e, i) {
                var n = this._firstPT = new _t(t, e, 0, 0, this._firstPT, 2);
                n.e = i, n.setRatio = Qt, n.data = this
            }, h._linkCSSP = function(t, e, i, n) {
                return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
            }, h._mod = function(t) {
                for (var e = this._firstPT; e;) "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), e = e._next
            }, h._kill = function(e) {
                var i, n, r, s = e;
                if (e.autoAlpha || e.alpha) {
                    s = {};
                    for (n in e) s[n] = e[n];
                    s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                }
                for (e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e), n = i.plugin), i = i._next;
                return t.prototype._kill.call(this, s)
            };
            var $t = function(t, e, i) {
                var n, r, s, o;
                if (t.slice)
                    for (r = t.length; --r > -1;) $t(t[r], e, i);
                else
                    for (n = t.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (e.push(it(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || $t(s, e, i)
            };
            return o.cascadeTo = function(t, i, n) {
                var r, s, o, a, l = e.to(t, i, n),
                    h = [l],
                    c = [],
                    u = [],
                    f = [],
                    d = e._internals.reservedProps;
                for (t = l._targets || l.target, $t(t, c, f), l.render(i, !0, !0), $t(t, u), l.render(0, !0, !0), l._enabled(!0), r = f.length; --r > -1;)
                    if (s = nt(f[r], c[r], u[r]), s.firstMPT) {
                        s = s.difs;
                        for (o in n) d[o] && (s[o] = n[o]);
                        a = {};
                        for (o in s) a[o] = c[r][o];
                        h.push(e.fromTo(f[r], i, a, s))
                    }
                return h
            }, t.activate([o]), o
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite"], e)
    }("CSSPlugin");