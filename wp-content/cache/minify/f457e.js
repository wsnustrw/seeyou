var ewww_webp_supported = !1;

function lazysizesWebP(e, t) {
    var a = new Image;
    a.onload = function() {
        ewww_webp_supported = 0 < a.width && 0 < a.height, t()
    }, a.onerror = function() {
        t()
    }, a.src = "data:image/webp;base64," + {
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    }[e]
}

function shouldAutoScale(e) {
    if (1 == eio_lazy_vars.skip_autoscale) return !1;
    if (e.hasAttributes())
        for (var t = e.attributes, a = /skip-autoscale/, i = t.length - 1; 0 <= i; i--) {
            if (a.test(t[i].name)) return !1;
            if (a.test(t[i].value)) return !1
        }
    return !0
}

function constrainSrc(e, t, a, i) {
    if (null === e) return e;
    var r = /w=(\d+)/,
        n = /fit=(\d+),(\d+)/,
        o = /resize=(\d+),(\d+)/,
        s = decodeURIComponent(e);
    if ("undefined" == typeof eio_lazy_vars && (eio_lazy_vars = {
            exactdn_domain: ".exactdn.com"
        }), 0 < e.search("\\?") && 0 < e.search(eio_lazy_vars.exactdn_domain)) {
        var l = o.exec(s);
        if (l && t < l[1]) return s.replace(o, "resize=" + t + "," + a);
        var d = r.exec(e);
        if (d && t <= d[1]) {
            if ("bg-cover" !== i && "img-crop" !== i) return e.replace(r, "w=" + t);
            var c = d[1] - t;
            return 20 < c || a < 1080 ? e.replace(r, "resize=" + t + "," + a) : e
        }
        var u = n.exec(s);
        if (u && t < u[1]) {
            if ("bg-cover" !== i && "img-crop" !== i) return s.replace(n, "fit=" + t + "," + a);
            var f = u[1] - t,
                A = u[2] - a;
            return 20 < f || 20 < A ? e.replace(r, "resize=" + t + "," + a) : e
        }
        if (!d && !u && !l) return "img" === i ? e + "&fit=" + t + "," + a : "bg-cover" === i || "img-crop" === i ? e + "?resize=" + t + "," + a : t < a ? e + "&h=" + a : e + "&w=" + t
    }
    return -1 == e.search("\\?") && 0 < e.search(eio_lazy_vars.exactdn_domain) ? "img" === i ? e + "?fit=" + t + "," + a : "bg-cover" === i || "img-crop" === i ? e + "?resize=" + t + "," + a : t < a ? e + "?h=" + a : e + "?w=" + t : e
}
window.lazySizesConfig = window.lazySizesConfig || {}, window.lazySizesConfig.init = !1, window.lazySizesConfig.expand = 500 < document.documentElement.clientHeight && 500 < document.documentElement.clientWidth ? 1e3 : 740, 50 < eio_lazy_vars.threshold && (window.lazySizesConfig.expand = eio_lazy_vars.threshold),
    function(e, t) {
        var a = function(i, A, n) {
            "use strict";
            var g, h;
            if (function() {
                    var e, t = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
                        fastLoadedClass: "ls-is-cached",
                        iframeLoadMode: 0,
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
                        ricTimeout: 0,
                        throttleDelay: 125
                    };
                    for (e in h = i.lazySizesConfig || i.lazysizesConfig || {}, t) e in h || (h[e] = t[e])
                }(), !A || !A.getElementsByClassName) return {
                init: function() {},
                cfg: h,
                noSupport: !0
            };
            var z = A.documentElement,
                r = i.HTMLPictureElement,
                o = "addEventListener",
                v = "getAttribute",
                e = i[o].bind(i),
                m = i.setTimeout,
                a = i.requestAnimationFrame || m,
                s = i.requestIdleCallback,
                p = /^picture$/i,
                l = ["load", "error", "lazyincluded", "_lazyloaded"],
                d = {},
                y = Array.prototype.forEach,
                c = function(e, t) {
                    return d[t] || (d[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), d[t].test(e[v]("class") || "") && d[t]
                },
                b = function(e, t) {
                    c(e, t) || e.setAttribute("class", (e[v]("class") || "").trim() + " " + t)
                },
                w = function(e, t) {
                    var a;
                    (a = c(e, t)) && e.setAttribute("class", (e[v]("class") || "").replace(a, " "))
                },
                _ = function(t, a, e) {
                    var i = e ? o : "removeEventListener";
                    e && _(t, a), l.forEach(function(e) {
                        t[i](e, a)
                    })
                },
                C = function(e, t, a, i, r) {
                    var n = A.createEvent("Event");
                    return a || (a = {}), a.instance = g, n.initEvent(t, !i, !r), n.detail = a, e.dispatchEvent(n), n
                },
                E = function(e, t) {
                    var a;
                    !r && (a = i.picturefill || h.pf) ? (t && t.src && !e[v]("srcset") && e.setAttribute("srcset", t.src), a({
                        reevaluate: !0,
                        elements: [e]
                    })) : t && t.src && (e.src = t.src)
                },
                u = function(e, t) {
                    return (getComputedStyle(e, null) || {})[t]
                },
                f = function(e, t, a) {
                    for (a = a || e.offsetWidth; a < h.minSize && t && !e._lazysizesWidth;) a = t.offsetWidth, t = t.parentNode;
                    return a
                },
                S = (we = [], _e = [], Ce = we, Ee = function() {
                    var e = Ce;
                    for (Ce = we.length ? _e : we, be = !(ye = !0); e.length;) e.shift()();
                    ye = !1
                }, Se = function(e, t) {
                    ye && !t ? e.apply(this, arguments) : (Ce.push(e), be || (be = !0, (A.hidden ? m : a)(Ee)))
                }, Se._lsFlush = Ee, Se),
                t = function(a, e) {
                    return e ? function() {
                        S(a)
                    } : function() {
                        var e = this,
                            t = arguments;
                        S(function() {
                            a.apply(e, t)
                        })
                    }
                },
                W = function(e) {
                    var t, a, i = function() {
                            t = null, e()
                        },
                        r = function() {
                            var e = n.now() - a;
                            e < 99 ? m(r, 99 - e) : (s || i)(i)
                        };
                    return function() {
                        a = n.now(), t || (t = m(r, 99))
                    }
                },
                x = (ee = /^img$/i, te = /^iframe$/i, ae = "onscroll" in i && !/(gle|ing)bot/.test(navigator.userAgent), ie = 0, re = 0, ne = -1, oe = function(e) {
                    re--, (!e || re < 0 || !e.target) && (re = 0)
                }, se = function(e) {
                    return null == $ && ($ = "hidden" == u(A.body, "visibility")), $ || !("hidden" == u(e.parentNode, "visibility") && "hidden" == u(e, "visibility"))
                }, le = function(e, t) {
                    var a, i = e,
                        r = se(e);
                    for (I -= t, G += t, J -= t, O += t; r && (i = i.offsetParent) && i != A.body && i != z;)(r = 0 < (u(i, "opacity") || 1)) && "visible" != u(i, "overflow") && (a = i.getBoundingClientRect(), r = O > a.left && J < a.right && G > a.top - 1 && I < a.bottom + 1);
                    return r
                }, de = function() {
                    var e, t, a, i, r, n, o, s, l, d, c, u, f = g.elements;
                    if ((D = h.loadMode) && re < 8 && (e = f.length)) {
                        for (t = 0, ne++; t < e; t++)
                            if (f[t] && !f[t]._lazyRace)
                                if (!ae || g.prematureUnveil && g.prematureUnveil(f[t])) ze(f[t]);
                                else if ((s = f[t][v]("data-expand")) && (n = 1 * s) || (n = ie), d || (d = !h.expand || h.expand < 1 ? 500 < z.clientHeight && 500 < z.clientWidth ? 500 : 370 : h.expand, g._defEx = d, c = d * h.expFactor, u = h.hFac, $ = null, ie < c && re < 1 && 2 < ne && 2 < D && !A.hidden ? (ie = c, ne = 0) : ie = 1 < D && 1 < ne && re < 6 ? d : 0), l !== n && (U = innerWidth + n * u, F = innerHeight + n, o = -1 * n, l = n), a = f[t].getBoundingClientRect(), (G = a.bottom) >= o && (I = a.top) <= F && (O = a.right) >= o * u && (J = a.left) <= U && (G || O || J || I) && (h.loadHidden || se(f[t])) && (P && re < 3 && !s && (D < 3 || ne < 4) || le(f[t], n))) {
                            if (ze(f[t]), r = !0, 9 < re) break
                        } else !r && P && !i && re < 4 && ne < 4 && 2 < D && (k[0] || h.preloadAfterLoad) && (k[0] || !s && (G || O || J || I || "auto" != f[t][v](h.sizesAttr))) && (i = k[0] || f[t]);
                        i && !r && ze(i)
                    }
                }, q = de, V = 0, X = h.throttleDelay, Y = h.ricTimeout, K = function() {
                    j = !1, V = n.now(), q()
                }, Z = s && 49 < Y ? function() {
                    s(K, {
                        timeout: Y
                    }), Y !== h.ricTimeout && (Y = h.ricTimeout)
                } : t(function() {
                    m(K)
                }, !0), ce = function(e) {
                    var t;
                    (e = !0 === e) && (Y = 33), j || (j = !0, (t = X - (n.now() - V)) < 0 && (t = 0), e || t < 9 ? Z() : m(Z, t))
                }, ue = function(e) {
                    var t = e.target;
                    t._lazyCache ? delete t._lazyCache : (oe(e), b(t, h.loadedClass), w(t, h.loadingClass), _(t, Ae), C(t, "lazyloaded"))
                }, fe = t(ue), Ae = function(e) {
                    fe({
                        target: e.target
                    })
                }, ge = function(e) {
                    var t, a = e[v](h.srcsetAttr);
                    (t = h.customMedia[e[v]("data-media") || e[v]("media")]) && e.setAttribute("media", t), a && e.setAttribute("srcset", a)
                }, he = t(function(t, e, a, i, r) {
                    var n, o, s, l, d, c, u, f, A;
                    (d = C(t, "lazybeforeunveil", e)).defaultPrevented || (i && (a ? b(t, h.autosizesClass) : t.setAttribute("sizes", i)), o = t[v](h.srcsetAttr), n = t[v](h.srcAttr), r && (s = t.parentNode, l = s && p.test(s.nodeName || "")), c = e.firesLoad || "src" in t && (o || n || l), d = {
                        target: t
                    }, b(t, h.loadingClass), c && (clearTimeout(H), H = m(oe, 2500), _(t, Ae, !0)), l && y.call(s.getElementsByTagName("source"), ge), o ? t.setAttribute("srcset", o) : n && !l && (te.test(t.nodeName) ? (f = n, 0 == (A = (u = t).getAttribute("data-load-mode") || h.iframeLoadMode) ? u.contentWindow.location.replace(f) : 1 == A && (u.src = f)) : t.src = n), r && (o || l) && E(t, {
                        src: n
                    })), t._lazyRace && delete t._lazyRace, w(t, h.lazyClass), S(function() {
                        var e = t.complete && 1 < t.naturalWidth;
                        c && !e || (e && b(t, h.fastLoadedClass), ue(d), t._lazyCache = !0, m(function() {
                            "_lazyCache" in t && delete t._lazyCache
                        }, 9)), "lazy" == t.loading && re--
                    }, !0)
                }), ze = function(e) {
                    if (!e._lazyRace) {
                        var t, a = ee.test(e.nodeName),
                            i = a && (e[v](h.sizesAttr) || e[v]("sizes")),
                            r = "auto" == i;
                        (!r && P || !a || !e[v]("src") && !e.srcset || e.complete || c(e, h.errorClass) || !c(e, h.lazyClass)) && (t = C(e, "lazyunveilread").detail, r && M.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, re++, he(e, t, r, i, a))
                    }
                }, ve = W(function() {
                    h.loadMode = 3, ce()
                }), me = function() {
                    3 == h.loadMode && (h.loadMode = 2), ve()
                }, pe = function() {
                    P || (n.now() - T < 999 ? m(pe, 999) : (P = !0, h.loadMode = 3, ce(), e("scroll", me, !0)))
                }, {
                    _: function() {
                        T = n.now(), g.elements = A.getElementsByClassName(h.lazyClass), k = A.getElementsByClassName(h.lazyClass + " " + h.preloadClass), e("scroll", ce, !0), e("resize", ce, !0), e("pageshow", function(e) {
                            if (e.persisted) {
                                var t = A.querySelectorAll("." + h.loadingClass);
                                t.length && t.forEach && a(function() {
                                    t.forEach(function(e) {
                                        e.complete && ze(e)
                                    })
                                })
                            }
                        }), i.MutationObserver ? new MutationObserver(ce).observe(z, {
                            childList: !0,
                            subtree: !0,
                            attributes: !0
                        }) : (z[o]("DOMNodeInserted", ce, !0), z[o]("DOMAttrModified", ce, !0), setInterval(ce, 999)), e("hashchange", ce, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                            A[o](e, ce, !0)
                        }), /d$|^c/.test(A.readyState) ? pe() : (e("load", pe), A[o]("DOMContentLoaded", ce), m(pe, 2e4)), g.elements.length ? (de(), S._lsFlush()) : ce()
                    },
                    checkElems: ce,
                    unveil: ze,
                    _aLSL: me
                }),
                M = (N = t(function(e, t, a, i) {
                    var r, n, o;
                    if (e._lazysizesWidth = i, i += "px", e.setAttribute("sizes", i), p.test(t.nodeName || ""))
                        for (r = t.getElementsByTagName("source"), n = 0, o = r.length; n < o; n++) r[n].setAttribute("sizes", i);
                    a.detail.dataAttr || E(e, a.detail)
                }), R = function(e, t, a) {
                    var i, r = e.parentNode;
                    r && (a = f(e, r, a), (i = C(e, "lazybeforesizes", {
                        width: a,
                        dataAttr: !!t
                    })).defaultPrevented || (a = i.detail.width) && a !== e._lazysizesWidth && N(e, r, i, a))
                }, Q = W(function() {
                    var e, t = L.length;
                    if (t)
                        for (e = 0; e < t; e++) R(L[e])
                }), {
                    _: function() {
                        L = A.getElementsByClassName(h.autosizesClass), e("resize", Q)
                    },
                    checkElems: Q,
                    updateElem: R
                }),
                B = function() {
                    !B.i && A.getElementsByClassName && (B.i = !0, M._(), x._())
                };
            var L, N, R, Q;
            var k, P, H, D, T, U, F, I, J, O, G, $, q, j, V, X, Y, K, Z, ee, te, ae, ie, re, ne, oe, se, le, de, ce, ue, fe, Ae, ge, he, ze, ve, me, pe;
            var ye, be, we, _e, Ce, Ee, Se;
            return m(function() {
                h.init && B()
            }), g = {
                cfg: h,
                autoSizer: M,
                loader: x,
                init: B,
                uP: E,
                aC: b,
                rC: w,
                hC: c,
                fire: C,
                gW: f,
                rAF: S
            }
        }(e, e.document, Date);
        e.lazySizes = a, "object" == typeof module && module.exports && (module.exports = a)
    }("undefined" != typeof window ? window : {}), lazysizesWebP("alpha", lazySizes.init), document.addEventListener("lazybeforesizes", function(e) {
        e.target.getAttribute("data-src");
        void 0 !== e.target._lazysizesWidth && e.detail.width < e.target._lazysizesWidth && (e.detail.width = e.target._lazysizesWidth)
    }), document.addEventListener("lazybeforeunveil", function(e) {
        var t = e.target,
            a = t.getAttribute("data-srcset");
        if (t.naturalWidth && !a && 1 < t.naturalWidth && 1 < t.naturalHeight) {
            var i = window.devicePixelRatio || 1,
                r = t.naturalWidth,
                n = t.naturalHeight,
                o = t.getAttribute("data-eio-rwidth"),
                s = t.getAttribute("data-eio-rheight");
            o && r < o && (r = o, n = s);
            var l = t.clientWidth && 1.25 * t.clientWidth < r,
                d = t.clientHeight && 1.25 * t.clientHeight < n;
            if (l || d) {
                var c = Math.round(t.offsetWidth * i),
                    u = Math.round(t.offsetHeight * i),
                    f = t.getAttribute("data-src"),
                    A = t.getAttribute("data-src-webp");
                if (ewww_webp_supported && A && -1 == f.search("webp=1") && (f = A), shouldAutoScale(t) && shouldAutoScale(t.parentNode))
                    if (window.lazySizes.hC(t, "et_pb_jt_filterable_grid_item_image") || window.lazySizes.hC(t, "ss-foreground-image")) g = constrainSrc(f, c, u, "img-crop");
                    else g = constrainSrc(f, c, u, "img");
                else var g = !1;
                g && f != g && t.setAttribute("data-src", g)
            }
        }
        if (ewww_webp_supported) {
            if (a) {
                var h = t.getAttribute("data-srcset-webp");
                h && t.setAttribute("data-srcset", h)
            }
            if (!(A = t.getAttribute("data-src-webp"))) return;
            t.setAttribute("data-src", A)
        }
    }),
    function(e, t) {
        var a = function() {
            t(e.lazySizes), e.removeEventListener("lazyunveilread", a, !0)
        };
        t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : e.lazySizes ? a() : e.addEventListener("lazyunveilread", a, !0)
    }(window, function(o, e, s) {
        "use strict";
        var l;
        e.addEventListener && (l = /\(|\)|\s|'/, addEventListener("lazybeforeunveil", function(e) {
            var t, a;
            if (e.detail.instance == s && (!e.defaultPrevented && ("none" == e.target.preload && (e.target.preload = "auto"), t = e.target.getAttribute("data-bg")))) {
                ewww_webp_supported && (a = e.target.getAttribute("data-bg-webp")) && (t = a);
                var i = o.devicePixelRatio || 1,
                    r = Math.round(e.target.offsetWidth * i),
                    n = Math.round(e.target.offsetHeight * i);
                shouldAutoScale(e.target) && shouldAutoScale(e.target.parentNode) && (t = o.lazySizes.hC(e.target, "wp-block-cover") ? (o.lazySizes.hC(e.target, "has-parallax") && (r = Math.round(o.screen.width * i), n = Math.round(o.screen.height * i)), constrainSrc(t, r, n, "bg-cover")) : o.lazySizes.hC(e.target, "elementor-bg") ? constrainSrc(t, r, n, "bg-cover") : constrainSrc(t, r, n, "bg")), e.target.style.backgroundImage = "url(" + (l.test(t) ? JSON.stringify(t) : t) + ")"
            }
        }, !1))
    });;
! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    var n = [],
        r = e.document,
        o = Object.getPrototypeOf,
        i = n.slice,
        s = n.concat,
        a = n.push,
        u = n.indexOf,
        c = {},
        l = c.toString,
        f = c.hasOwnProperty,
        p = f.toString,
        d = p.call(Object),
        h = {},
        g = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        m = function(e) {
            return null != e && e === e.window
        },
        v = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function y(e, t, n) {
        var o, i, s = (n = n || r).createElement("script");
        if (s.text = e, t)
            for (o in v)(i = t[o] || t.getAttribute && t.getAttribute(o)) && s.setAttribute(o, i);
        n.head.appendChild(s).parentNode.removeChild(s)
    }

    function x(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? c[l.call(e)] || "object" : typeof e
    }
    var b = "3.4.1",
        w = function(e, t) {
            return new w.fn.init(e, t)
        },
        T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function j(e) {
        var t = !!e && "length" in e && e.length,
            n = x(e);
        return !g(e) && !m(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    w.fn = w.prototype = {
        jquery: b,
        constructor: w,
        length: 0,
        toArray: function() {
            return i.call(this)
        },
        get: function(e) {
            return null == e ? i.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = w.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return w.each(this, e)
        },
        map: function(e) {
            return this.pushStack(w.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(i.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: n.sort,
        splice: n.splice
    }, w.extend = w.fn.extend = function() {
        var e, t, n, r, o, i, s = arguments[0] || {},
            a = 1,
            u = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" == typeof s || g(s) || (s = {}), a === u && (s = this, a--); a < u; a++)
            if (null != (e = arguments[a]))
                for (t in e) r = e[t], "__proto__" !== t && s !== r && (c && r && (w.isPlainObject(r) || (o = Array.isArray(r))) ? (n = s[t], i = o && !Array.isArray(n) ? [] : o || w.isPlainObject(n) ? n : {}, o = !1, s[t] = w.extend(c, i, r)) : void 0 !== r && (s[t] = r));
        return s
    }, w.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isPlainObject: function(e) {
            var t, n;
            return !(!e || "[object Object]" !== l.call(e) || (t = o(e)) && ("function" != typeof(n = f.call(t, "constructor") && t.constructor) || p.call(n) !== d))
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function(e, t) {
            y(e, {
                nonce: t && t.nonce
            })
        },
        each: function(e, t) {
            var n, r = 0;
            if (j(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(T, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (j(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : u.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, o = e.length; r < n; r++) e[o++] = t[r];
            return e.length = o, e
        },
        grep: function(e, t, n) {
            for (var r = [], o = 0, i = e.length, s = !n; o < i; o++) !t(e[o], o) !== s && r.push(e[o]);
            return r
        },
        map: function(e, t, n) {
            var r, o, i = 0,
                a = [];
            if (j(e))
                for (r = e.length; i < r; i++) null != (o = t(e[i], i, n)) && a.push(o);
            else
                for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
            return s.apply([], a)
        },
        guid: 1,
        support: h
    }), "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        c["[object " + t + "]"] = t.toLowerCase()
    });
    var C = function(e) {
        var t, n, r, o, i, s, a, u, c, l, f, p, d, h, g, m, v, y, x, b = "sizzle" + 1 * new Date,
            w = e.document,
            T = 0,
            j = 0,
            C = ue(),
            E = ue(),
            S = ue(),
            k = ue(),
            A = function(e, t) {
                return e === t && (f = !0), 0
            },
            N = {}.hasOwnProperty,
            D = [],
            L = D.pop,
            q = D.push,
            H = D.push,
            O = D.slice,
            P = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            _ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            R = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            I = "\\[" + R + "*(" + M + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + R + "*\\]",
            W = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
            F = new RegExp(R + "+", "g"),
            $ = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
            B = new RegExp("^" + R + "*," + R + "*"),
            z = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
            U = new RegExp(R + "|>"),
            X = new RegExp(W),
            V = new RegExp("^" + M + "$"),
            G = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M + "|[*])"),
                ATTR: new RegExp("^" + I),
                PSEUDO: new RegExp("^" + W),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + _ + ")$", "i"),
                needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /HTML$/i,
            Q = /^(?:input|select|textarea|button)$/i,
            J = /^h\d$/i,
            K = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ee = /[+~]/,
            te = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
            ne = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            oe = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ie = function() {
                p()
            },
            se = be(function(e) {
                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            H.apply(D = O.call(w.childNodes), w.childNodes), D[w.childNodes.length].nodeType
        } catch (t) {
            H = {
                apply: D.length ? function(e, t) {
                    q.apply(e, O.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }

        function ae(e, t, r, o) {
            var i, a, c, l, f, h, v, y = t && t.ownerDocument,
                T = t ? t.nodeType : 9;
            if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;
            if (!o && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
                if (11 !== T && (f = Z.exec(e)))
                    if (i = f[1]) {
                        if (9 === T) {
                            if (!(c = t.getElementById(i))) return r;
                            if (c.id === i) return r.push(c), r
                        } else if (y && (c = y.getElementById(i)) && x(t, c) && c.id === i) return r.push(c), r
                    } else {
                        if (f[2]) return H.apply(r, t.getElementsByTagName(e)), r;
                        if ((i = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return H.apply(r, t.getElementsByClassName(i)), r
                    }
                if (n.qsa && !k[e + " "] && (!m || !m.test(e)) && (1 !== T || "object" !== t.nodeName.toLowerCase())) {
                    if (v = e, y = t, 1 === T && U.test(e)) {
                        for ((l = t.getAttribute("id")) ? l = l.replace(re, oe) : t.setAttribute("id", l = b), a = (h = s(e)).length; a--;) h[a] = "#" + l + " " + xe(h[a]);
                        v = h.join(","), y = ee.test(e) && ve(t.parentNode) || t
                    }
                    try {
                        return H.apply(r, y.querySelectorAll(v)), r
                    } catch (t) {
                        k(e, !0)
                    } finally {
                        l === b && t.removeAttribute("id")
                    }
                }
            }
            return u(e.replace($, "$1"), t, r, o)
        }

        function ue() {
            var e = [];
            return function t(n, o) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = o
            }
        }

        function ce(e) {
            return e[b] = !0, e
        }

        function le(e) {
            var t = d.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function fe(e, t) {
            for (var n = e.split("|"), o = n.length; o--;) r.attrHandle[n[o]] = t
        }

        function pe(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function de(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }

        function he(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function ge(e) {
            return function(t) {
                return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && se(t) === e : t.disabled === e : "label" in t && t.disabled === e
            }
        }

        function me(e) {
            return ce(function(t) {
                return t = +t, ce(function(n, r) {
                    for (var o, i = e([], n.length, t), s = i.length; s--;) n[o = i[s]] && (n[o] = !(r[o] = n[o]))
                })
            })
        }

        function ve(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (t in n = ae.support = {}, i = ae.isXML = function(e) {
                var t = e.namespaceURI,
                    n = (e.ownerDocument || e).documentElement;
                return !Y.test(t || n && n.nodeName || "HTML")
            }, p = ae.setDocument = function(e) {
                var t, o, s = e ? e.ownerDocument || e : w;
                return s !== d && 9 === s.nodeType && s.documentElement && (h = (d = s).documentElement, g = !i(d), w !== d && (o = d.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", ie, !1) : o.attachEvent && o.attachEvent("onunload", ie)), n.attributes = le(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), n.getElementsByTagName = le(function(e) {
                    return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length
                }), n.getElementsByClassName = K.test(d.getElementsByClassName), n.getById = le(function(e) {
                    return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length
                }), n.getById ? (r.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }, r.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && g) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (r.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }, r.find.ID = function(e, t) {
                    if (void 0 !== t.getElementById && g) {
                        var n, r, o, i = t.getElementById(e);
                        if (i) {
                            if ((n = i.getAttributeNode("id")) && n.value === e) return [i];
                            for (o = t.getElementsByName(e), r = 0; i = o[r++];)
                                if ((n = i.getAttributeNode("id")) && n.value === e) return [i]
                        }
                        return []
                    }
                }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                    return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, r = [],
                        o = 0,
                        i = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = i[o++];) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return i
                }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                    if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e)
                }, v = [], m = [], (n.qsa = K.test(d.querySelectorAll)) && (le(function(e) {
                    h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + R + "*(?:value|" + _ + ")"), e.querySelectorAll("[id~=" + b + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || m.push(".#.+[+~]")
                }), le(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = d.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + R + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                })), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && le(function(e) {
                    n.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), v.push("!=", W)
                }), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = K.test(h.compareDocumentPosition), x = t || K.test(h.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, A = t ? function(e, t) {
                    if (e === t) return f = !0, 0;
                    var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : l ? P(l, e) - P(l, t) : 0 : 4 & r ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return f = !0, 0;
                    var n, r = 0,
                        o = e.parentNode,
                        i = t.parentNode,
                        s = [e],
                        a = [t];
                    if (!o || !i) return e === d ? -1 : t === d ? 1 : o ? -1 : i ? 1 : l ? P(l, e) - P(l, t) : 0;
                    if (o === i) return pe(e, t);
                    for (n = e; n = n.parentNode;) s.unshift(n);
                    for (n = t; n = n.parentNode;) a.unshift(n);
                    for (; s[r] === a[r];) r++;
                    return r ? pe(s[r], a[r]) : s[r] === w ? -1 : a[r] === w ? 1 : 0
                }), d
            }, ae.matches = function(e, t) {
                return ae(e, null, null, t)
            }, ae.matchesSelector = function(e, t) {
                if ((e.ownerDocument || e) !== d && p(e), n.matchesSelector && g && !k[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) try {
                    var r = y.call(e, t);
                    if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                } catch (e) {
                    k(t, !0)
                }
                return 0 < ae(t, d, null, [e]).length
            }, ae.contains = function(e, t) {
                return (e.ownerDocument || e) !== d && p(e), x(e, t)
            }, ae.attr = function(e, t) {
                (e.ownerDocument || e) !== d && p(e);
                var o = r.attrHandle[t.toLowerCase()],
                    i = o && N.call(r.attrHandle, t.toLowerCase()) ? o(e, t, !g) : void 0;
                return void 0 !== i ? i : n.attributes || !g ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, ae.escape = function(e) {
                return (e + "").replace(re, oe)
            }, ae.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, ae.uniqueSort = function(e) {
                var t, r = [],
                    o = 0,
                    i = 0;
                if (f = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(A), f) {
                    for (; t = e[i++];) t === e[i] && (o = r.push(i));
                    for (; o--;) e.splice(r[o], 1)
                }
                return l = null, e
            }, o = ae.getText = function(e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    for (; t = e[r++];) n += o(t);
                return n
            }, (r = ae.selectors = {
                cacheLength: 50,
                createPseudo: ce,
                match: G,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = s(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(te, ne).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = C[e + " "];
                        return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && C(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, t, n) {
                        return function(r) {
                            var o = ae.attr(r, e);
                            return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && -1 < o.indexOf(n) : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? -1 < (" " + o.replace(F, " ") + " ").indexOf(n) : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(e, t, n, r, o) {
                        var i = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === r && 0 === o ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var c, l, f, p, d, h, g = i !== s ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                v = a && t.nodeName.toLowerCase(),
                                y = !u && !a,
                                x = !1;
                            if (m) {
                                if (i) {
                                    for (; g;) {
                                        for (p = t; p = p[g];)
                                            if (a ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                        h = g = "only" === e && !h && "nextSibling"
                                    }
                                    return !0
                                }
                                if (h = [s ? m.firstChild : m.lastChild], s && y) {
                                    for (x = (d = (c = (l = (f = (p = m)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && c[1]) && c[2], p = d && m.childNodes[d]; p = ++d && p && p[g] || (x = d = 0) || h.pop();)
                                        if (1 === p.nodeType && ++x && p === t) {
                                            l[e] = [T, d, x];
                                            break
                                        }
                                } else if (y && (x = d = (c = (l = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && c[1]), !1 === x)
                                    for (;
                                        (p = ++d && p && p[g] || (x = d = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++x || (y && ((l = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p !== t)););
                                return (x -= o) === r || x % r == 0 && 0 <= x / r
                            }
                        }
                    },
                    PSEUDO: function(e, t) {
                        var n, o = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
                        return o[b] ? o(t) : 1 < o.length ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function(e, n) {
                            for (var r, i = o(e, t), s = i.length; s--;) e[r = P(e, i[s])] = !(n[r] = i[s])
                        }) : function(e) {
                            return o(e, 0, n)
                        }) : o
                    }
                },
                pseudos: {
                    not: ce(function(e) {
                        var t = [],
                            n = [],
                            r = a(e.replace($, "$1"));
                        return r[b] ? ce(function(e, t, n, o) {
                            for (var i, s = r(e, null, o, []), a = e.length; a--;)(i = s[a]) && (e[a] = !(t[a] = i))
                        }) : function(e, o, i) {
                            return t[0] = e, r(t, null, i, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: ce(function(e) {
                        return function(t) {
                            return 0 < ae(e, t).length
                        }
                    }),
                    contains: ce(function(e) {
                        return e = e.replace(te, ne),
                            function(t) {
                                return -1 < (t.textContent || o(t)).indexOf(e)
                            }
                    }),
                    lang: ce(function(e) {
                        return V.test(e || "") || ae.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
                            function(t) {
                                var n;
                                do {
                                    if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === h
                    },
                    focus: function(e) {
                        return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: ge(!1),
                    disabled: ge(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !r.pseudos.empty(e)
                    },
                    header: function(e) {
                        return J.test(e.nodeName)
                    },
                    input: function(e) {
                        return Q.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: me(function() {
                        return [0]
                    }),
                    last: me(function(e, t) {
                        return [t - 1]
                    }),
                    eq: me(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: me(function(e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: me(function(e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: me(function(e, t, n) {
                        for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: me(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = r.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[t] = de(t);
        for (t in {
                submit: !0,
                reset: !0
            }) r.pseudos[t] = he(t);

        function ye() {}

        function xe(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function be(e, t, n) {
            var r = t.dir,
                o = t.next,
                i = o || r,
                s = n && "parentNode" === i,
                a = j++;
            return t.first ? function(t, n, o) {
                for (; t = t[r];)
                    if (1 === t.nodeType || s) return e(t, n, o);
                return !1
            } : function(t, n, u) {
                var c, l, f, p = [T, a];
                if (u) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || s) && e(t, n, u)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || s)
                            if (l = (f = t[b] || (t[b] = {}))[t.uniqueID] || (f[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[r] || t;
                            else {
                                if ((c = l[i]) && c[0] === T && c[1] === a) return p[2] = c[2];
                                if ((l[i] = p)[2] = e(t, n, u)) return !0
                            } return !1
            }
        }

        function we(e) {
            return 1 < e.length ? function(t, n, r) {
                for (var o = e.length; o--;)
                    if (!e[o](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function Te(e, t, n, r, o) {
            for (var i, s = [], a = 0, u = e.length, c = null != t; a < u; a++)(i = e[a]) && (n && !n(i, r, o) || (s.push(i), c && t.push(a)));
            return s
        }

        function je(e, t, n, r, o, i) {
            return r && !r[b] && (r = je(r)), o && !o[b] && (o = je(o, i)), ce(function(i, s, a, u) {
                var c, l, f, p = [],
                    d = [],
                    h = s.length,
                    g = i || function(e, t, n) {
                        for (var r = 0, o = t.length; r < o; r++) ae(e, t[r], n);
                        return n
                    }(t || "*", a.nodeType ? [a] : a, []),
                    m = !e || !i && t ? g : Te(g, p, e, a, u),
                    v = n ? o || (i ? e : h || r) ? [] : s : m;
                if (n && n(m, v, a, u), r)
                    for (c = Te(v, d), r(c, [], a, u), l = c.length; l--;)(f = c[l]) && (v[d[l]] = !(m[d[l]] = f));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (c = [], l = v.length; l--;)(f = v[l]) && c.push(m[l] = f);
                            o(null, v = [], c, u)
                        }
                        for (l = v.length; l--;)(f = v[l]) && -1 < (c = o ? P(i, f) : p[l]) && (i[c] = !(s[c] = f))
                    }
                } else v = Te(v === s ? v.splice(h, v.length) : v), o ? o(null, s, v, u) : H.apply(s, v)
            })
        }

        function Ce(e) {
            for (var t, n, o, i = e.length, s = r.relative[e[0].type], a = s || r.relative[" "], u = s ? 1 : 0, l = be(function(e) {
                    return e === t
                }, a, !0), f = be(function(e) {
                    return -1 < P(t, e)
                }, a, !0), p = [function(e, n, r) {
                    var o = !s && (r || n !== c) || ((t = n).nodeType ? l(e, n, r) : f(e, n, r));
                    return t = null, o
                }]; u < i; u++)
                if (n = r.relative[e[u].type]) p = [be(we(p), n)];
                else {
                    if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                        for (o = ++u; o < i && !r.relative[e[o].type]; o++);
                        return je(1 < u && we(p), 1 < u && xe(e.slice(0, u - 1).concat({
                            value: " " === e[u - 2].type ? "*" : ""
                        })).replace($, "$1"), n, u < o && Ce(e.slice(u, o)), o < i && Ce(e = e.slice(o)), o < i && xe(e))
                    }
                    p.push(n)
                }
            return we(p)
        }
        return ye.prototype = r.filters = r.pseudos, r.setFilters = new ye, s = ae.tokenize = function(e, t) {
            var n, o, i, s, a, u, c, l = E[e + " "];
            if (l) return t ? 0 : l.slice(0);
            for (a = e, u = [], c = r.preFilter; a;) {
                for (s in n && !(o = B.exec(a)) || (o && (a = a.slice(o[0].length) || a), u.push(i = [])), n = !1, (o = z.exec(a)) && (n = o.shift(), i.push({
                        value: n,
                        type: o[0].replace($, " ")
                    }), a = a.slice(n.length)), r.filter) !(o = G[s].exec(a)) || c[s] && !(o = c[s](o)) || (n = o.shift(), i.push({
                    value: n,
                    type: s,
                    matches: o
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? ae.error(e) : E(e, u).slice(0)
        }, a = ae.compile = function(e, t) {
            var n, o, i, a, u, l, f = [],
                h = [],
                m = S[e + " "];
            if (!m) {
                for (t || (t = s(e)), n = t.length; n--;)(m = Ce(t[n]))[b] ? f.push(m) : h.push(m);
                (m = S(e, (o = h, a = 0 < (i = f).length, u = 0 < o.length, l = function(e, t, n, s, l) {
                    var f, h, m, v = 0,
                        y = "0",
                        x = e && [],
                        b = [],
                        w = c,
                        j = e || u && r.find.TAG("*", l),
                        C = T += null == w ? 1 : Math.random() || .1,
                        E = j.length;
                    for (l && (c = t === d || t || l); y !== E && null != (f = j[y]); y++) {
                        if (u && f) {
                            for (h = 0, t || f.ownerDocument === d || (p(f), n = !g); m = o[h++];)
                                if (m(f, t || d, n)) {
                                    s.push(f);
                                    break
                                }
                            l && (T = C)
                        }
                        a && ((f = !m && f) && v--, e && x.push(f))
                    }
                    if (v += y, a && y !== v) {
                        for (h = 0; m = i[h++];) m(x, b, t, n);
                        if (e) {
                            if (0 < v)
                                for (; y--;) x[y] || b[y] || (b[y] = L.call(s));
                            b = Te(b)
                        }
                        H.apply(s, b), l && !e && 0 < b.length && 1 < v + i.length && ae.uniqueSort(s)
                    }
                    return l && (T = C, c = w), x
                }, a ? ce(l) : l))).selector = e
            }
            return m
        }, u = ae.select = function(e, t, n, o) {
            var i, u, c, l, f, p = "function" == typeof e && e,
                d = !o && s(e = p.selector || e);
            if (n = n || [], 1 === d.length) {
                if (2 < (u = d[0] = d[0].slice(0)).length && "ID" === (c = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
                    if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
                    p && (t = t.parentNode), e = e.slice(u.shift().value.length)
                }
                for (i = G.needsContext.test(e) ? 0 : u.length; i-- && (c = u[i], !r.relative[l = c.type]);)
                    if ((f = r.find[l]) && (o = f(c.matches[0].replace(te, ne), ee.test(u[0].type) && ve(t.parentNode) || t))) {
                        if (u.splice(i, 1), !(e = o.length && xe(u))) return H.apply(n, o), n;
                        break
                    }
            }
            return (p || a(e, d))(o, t, !g, n, !t || ee.test(e) && ve(t.parentNode) || t), n
        }, n.sortStable = b.split("").sort(A).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = le(function(e) {
            return 1 & e.compareDocumentPosition(d.createElement("fieldset"))
        }), le(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && le(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || fe("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), le(function(e) {
            return null == e.getAttribute("disabled")
        }) || fe(_, function(e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), ae
    }(e);
    w.find = C, w.expr = C.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = C.uniqueSort, w.text = C.getText, w.isXMLDoc = C.isXML, w.contains = C.contains, w.escapeSelector = C.escape;
    var E = function(e, t, n) {
            for (var r = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && w(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        S = function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        k = w.expr.match.needsContext;

    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function D(e, t, n) {
        return g(t) ? w.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        }) : t.nodeType ? w.grep(e, function(e) {
            return e === t !== n
        }) : "string" != typeof t ? w.grep(e, function(e) {
            return -1 < u.call(t, e) !== n
        }) : w.filter(t, e, n)
    }
    w.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, w.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                o = this;
            if ("string" != typeof e) return this.pushStack(w(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (w.contains(o[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) w.find(e, o[t], n);
            return 1 < r ? w.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(D(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(D(this, e || [], !0))
        },
        is: function(e) {
            return !!D(this, "string" == typeof e && k.test(e) ? w(e) : e || [], !1).length
        }
    });
    var L, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (w.fn.init = function(e, t, n) {
        var o, i;
        if (!e) return this;
        if (n = n || L, "string" == typeof e) {
            if (!(o = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !o[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (o[1]) {
                if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(o[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), N.test(o[1]) && w.isPlainObject(t))
                    for (o in t) g(this[o]) ? this[o](t[o]) : this.attr(o, t[o]);
                return this
            }
            return (i = r.getElementById(o[2])) && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this)
    }).prototype = w.fn, L = w(r);
    var H = /^(?:parents|prev(?:Until|All))/,
        O = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function P(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }
    w.fn.extend({
        has: function(e) {
            var t = w(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (w.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                o = this.length,
                i = [],
                s = "string" != typeof e && w(e);
            if (!k.test(e))
                for (; r < o; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
                            i.push(n);
                            break
                        }
            return this.pushStack(1 < i.length ? w.uniqueSort(i) : i)
        },
        index: function(e) {
            return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), w.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return E(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return E(e, "parentNode", n)
        },
        next: function(e) {
            return P(e, "nextSibling")
        },
        prev: function(e) {
            return P(e, "previousSibling")
        },
        nextAll: function(e) {
            return E(e, "nextSibling")
        },
        prevAll: function(e) {
            return E(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return E(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return E(e, "previousSibling", n)
        },
        siblings: function(e) {
            return S((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return S(e.firstChild)
        },
        contents: function(e) {
            return void 0 !== e.contentDocument ? e.contentDocument : (A(e, "template") && (e = e.content || e), w.merge([], e.childNodes))
        }
    }, function(e, t) {
        w.fn[e] = function(n, r) {
            var o = w.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = w.filter(r, o)), 1 < this.length && (O[e] || w.uniqueSort(o), H.test(e) && o.reverse()), this.pushStack(o)
        }
    });
    var _ = /[^\x20\t\r\n\f]+/g;

    function R(e) {
        return e
    }

    function M(e) {
        throw e
    }

    function I(e, t, n, r) {
        var o;
        try {
            e && g(o = e.promise) ? o.call(e).done(t).fail(n) : e && g(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    w.Callbacks = function(e) {
        var t, n;
        e = "string" == typeof e ? (t = e, n = {}, w.each(t.match(_) || [], function(e, t) {
            n[t] = !0
        }), n) : w.extend({}, e);
        var r, o, i, s, a = [],
            u = [],
            c = -1,
            l = function() {
                for (s = s || e.once, i = r = !0; u.length; c = -1)
                    for (o = u.shift(); ++c < a.length;) !1 === a[c].apply(o[0], o[1]) && e.stopOnFalse && (c = a.length, o = !1);
                e.memory || (o = !1), r = !1, s && (a = o ? [] : "")
            },
            f = {
                add: function() {
                    return a && (o && !r && (c = a.length - 1, u.push(o)), function t(n) {
                        w.each(n, function(n, r) {
                            g(r) ? e.unique && f.has(r) || a.push(r) : r && r.length && "string" !== x(r) && t(r)
                        })
                    }(arguments), o && !r && l()), this
                },
                remove: function() {
                    return w.each(arguments, function(e, t) {
                        for (var n; - 1 < (n = w.inArray(t, a, n));) a.splice(n, 1), n <= c && c--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < w.inArray(e, a) : 0 < a.length
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return s = u = [], a = o = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return s = u = [], o || r || (a = o = ""), this
                },
                locked: function() {
                    return !!s
                },
                fireWith: function(e, t) {
                    return s || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), r || l()), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return f
    }, w.extend({
        Deferred: function(t) {
            var n = [
                    ["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2],
                    ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]
                ],
                r = "pending",
                o = {
                    state: function() {
                        return r
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return o.then(null, e)
                    },
                    pipe: function() {
                        var e = arguments;
                        return w.Deferred(function(t) {
                            w.each(n, function(n, r) {
                                var o = g(e[r[4]]) && e[r[4]];
                                i[r[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    then: function(t, r, o) {
                        var i = 0;

                        function s(t, n, r, o) {
                            return function() {
                                var a = this,
                                    u = arguments,
                                    c = function() {
                                        var e, c;
                                        if (!(t < i)) {
                                            if ((e = r.apply(a, u)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                            c = e && ("object" == typeof e || "function" == typeof e) && e.then, g(c) ? o ? c.call(e, s(i, n, R, o), s(i, n, M, o)) : (i++, c.call(e, s(i, n, R, o), s(i, n, M, o), s(i, n, R, n.notifyWith))) : (r !== R && (a = void 0, u = [e]), (o || n.resolveWith)(a, u))
                                        }
                                    },
                                    l = o ? c : function() {
                                        try {
                                            c()
                                        } catch (e) {
                                            w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, l.stackTrace), i <= t + 1 && (r !== M && (a = void 0, u = [e]), n.rejectWith(a, u))
                                        }
                                    };
                                t ? l() : (w.Deferred.getStackHook && (l.stackTrace = w.Deferred.getStackHook()), e.setTimeout(l))
                            }
                        }
                        return w.Deferred(function(e) {
                            n[0][3].add(s(0, e, g(o) ? o : R, e.notifyWith)), n[1][3].add(s(0, e, g(t) ? t : R)), n[2][3].add(s(0, e, g(r) ? r : M))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? w.extend(e, o) : o
                    }
                },
                i = {};
            return w.each(n, function(e, t) {
                var s = t[2],
                    a = t[5];
                o[t[1]] = s.add, a && s.add(function() {
                    r = a
                }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), s.add(t[3].fire), i[t[0]] = function() {
                    return i[t[0] + "With"](this === i ? void 0 : this, arguments), this
                }, i[t[0] + "With"] = s.fireWith
            }), o.promise(i), t && t.call(i, i), i
        },
        when: function(e) {
            var t = arguments.length,
                n = t,
                r = Array(n),
                o = i.call(arguments),
                s = w.Deferred(),
                a = function(e) {
                    return function(n) {
                        r[e] = this, o[e] = 1 < arguments.length ? i.call(arguments) : n, --t || s.resolveWith(r, o)
                    }
                };
            if (t <= 1 && (I(e, s.done(a(n)).resolve, s.reject, !t), "pending" === s.state() || g(o[n] && o[n].then))) return s.then();
            for (; n--;) I(o[n], a(n), s.reject);
            return s.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    w.Deferred.exceptionHook = function(t, n) {
        e.console && e.console.warn && t && W.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n)
    }, w.readyException = function(t) {
        e.setTimeout(function() {
            throw t
        })
    };
    var F = w.Deferred();

    function $() {
        r.removeEventListener("DOMContentLoaded", $), e.removeEventListener("load", $), w.ready()
    }
    w.fn.ready = function(e) {
        return F.then(e).catch(function(e) {
            w.readyException(e)
        }), this
    }, w.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0) !== e && 0 < --w.readyWait || F.resolveWith(r, [w])
        }
    }), w.ready.then = F.then, "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", $), e.addEventListener("load", $));
    var B = function(e, t, n, r, o, i, s) {
            var a = 0,
                u = e.length,
                c = null == n;
            if ("object" === x(n))
                for (a in o = !0, n) B(e, t, a, n[a], !0, i, s);
            else if (void 0 !== r && (o = !0, g(r) || (s = !0), c && (s ? (t.call(e, r), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(w(e), n)
                })), t))
                for (; a < u; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            return o ? e : c ? t.call(e) : u ? t(e[0], n) : i
        },
        z = /^-ms-/,
        U = /-([a-z])/g;

    function X(e, t) {
        return t.toUpperCase()
    }

    function V(e) {
        return e.replace(z, "ms-").replace(U, X)
    }
    var G = function(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function Y() {
        this.expando = w.expando + Y.uid++
    }
    Y.uid = 1, Y.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, G(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, o = this.cache(e);
            if ("string" == typeof t) o[V(t)] = n;
            else
                for (r in t) o[V(r)] = t[r];
            return o
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(V) : (t = V(t)) in r ? [t] : t.match(_) || []).length;
                    for (; n--;) delete r[t[n]]
                }(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return void 0 !== t && !w.isEmptyObject(t)
        }
    };
    var Q = new Y,
        J = new Y,
        K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Z = /[A-Z]/g;

    function ee(e, t, n) {
        var r, o;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Z, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === (o = n) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : K.test(o) ? JSON.parse(o) : o)
                } catch (e) {}
                J.set(e, t, n)
            } else n = void 0;
        return n
    }
    w.extend({
        hasData: function(e) {
            return J.hasData(e) || Q.hasData(e)
        },
        data: function(e, t, n) {
            return J.access(e, t, n)
        },
        removeData: function(e, t) {
            J.remove(e, t)
        },
        _data: function(e, t, n) {
            return Q.access(e, t, n)
        },
        _removeData: function(e, t) {
            Q.remove(e, t)
        }
    }), w.fn.extend({
        data: function(e, t) {
            var n, r, o, i = this[0],
                s = i && i.attributes;
            if (void 0 === e) {
                if (this.length && (o = J.get(i), 1 === i.nodeType && !Q.get(i, "hasDataAttrs"))) {
                    for (n = s.length; n--;) s[n] && 0 === (r = s[n].name).indexOf("data-") && (r = V(r.slice(5)), ee(i, r, o[r]));
                    Q.set(i, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                J.set(this, e)
            }) : B(this, function(t) {
                var n;
                if (i && void 0 === t) return void 0 !== (n = J.get(i, e)) ? n : void 0 !== (n = ee(i, e)) ? n : void 0;
                this.each(function() {
                    J.set(this, e, t)
                })
            }, null, t, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                J.remove(this, e)
            })
        }
    }), w.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = Q.get(e, t), n && (!r || Array.isArray(n) ? r = Q.access(e, t, w.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = w.queue(e, t),
                r = n.length,
                o = n.shift(),
                i = w._queueHooks(e, t);
            "inprogress" === o && (o = n.shift(), r--), o && ("fx" === t && n.unshift("inprogress"), delete i.stop, o.call(e, function() {
                w.dequeue(e, t)
            }, i)), !r && i && i.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return Q.get(e, n) || Q.access(e, n, {
                empty: w.Callbacks("once memory").add(function() {
                    Q.remove(e, [t + "queue", n])
                })
            })
        }
    }), w.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                var n = w.queue(this, e, t);
                w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                w.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                o = w.Deferred(),
                i = this,
                s = this.length,
                a = function() {
                    --r || o.resolveWith(i, [i])
                };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = Q.get(i[s], e + "queueHooks")) && n.empty && (r++, n.empty.add(a));
            return a(), o.promise(t)
        }
    });
    var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ne = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$", "i"),
        re = ["Top", "Right", "Bottom", "Left"],
        oe = r.documentElement,
        ie = function(e) {
            return w.contains(e.ownerDocument, e)
        },
        se = {
            composed: !0
        };
    oe.getRootNode && (ie = function(e) {
        return w.contains(e.ownerDocument, e) || e.getRootNode(se) === e.ownerDocument
    });
    var ae = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === w.css(e, "display")
        },
        ue = function(e, t, n, r) {
            var o, i, s = {};
            for (i in t) s[i] = e.style[i], e.style[i] = t[i];
            for (i in o = n.apply(e, r || []), t) e.style[i] = s[i];
            return o
        };

    function ce(e, t, n, r) {
        var o, i, s = 20,
            a = r ? function() {
                return r.cur()
            } : function() {
                return w.css(e, t, "")
            },
            u = a(),
            c = n && n[3] || (w.cssNumber[t] ? "" : "px"),
            l = e.nodeType && (w.cssNumber[t] || "px" !== c && +u) && ne.exec(w.css(e, t));
        if (l && l[3] !== c) {
            for (u /= 2, c = c || l[3], l = +u || 1; s--;) w.style(e, t, l + c), (1 - i) * (1 - (i = a() / u || .5)) <= 0 && (s = 0), l /= i;
            l *= 2, w.style(e, t, l + c), n = n || []
        }
        return n && (l = +l || +u || 0, o = n[1] ? l + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = l, r.end = o)), o
    }
    var le = {};

    function fe(e, t) {
        for (var n, r, o, i, s, a, u, c = [], l = 0, f = e.length; l < f; l++)(r = e[l]).style && (n = r.style.display, t ? ("none" === n && (c[l] = Q.get(r, "display") || null, c[l] || (r.style.display = "")), "" === r.style.display && ae(r) && (c[l] = (u = s = i = void 0, s = (o = r).ownerDocument, a = o.nodeName, (u = le[a]) || (i = s.body.appendChild(s.createElement(a)), u = w.css(i, "display"), i.parentNode.removeChild(i), "none" === u && (u = "block"), le[a] = u)))) : "none" !== n && (c[l] = "none", Q.set(r, "display", n)));
        for (l = 0; l < f; l++) null != c[l] && (e[l].style.display = c[l]);
        return e
    }
    w.fn.extend({
        show: function() {
            return fe(this, !0)
        },
        hide: function() {
            return fe(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ae(this) ? w(this).show() : w(this).hide()
            })
        }
    });
    var pe = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i,
        ge = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };

    function me(e, t) {
        var n;
        return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? w.merge([e], n) : n
    }

    function ve(e, t) {
        for (var n = 0, r = e.length; n < r; n++) Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
    }
    ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;
    var ye, xe, be = /<|&#?\w+;/;

    function we(e, t, n, r, o) {
        for (var i, s, a, u, c, l, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((i = e[d]) || 0 === i)
                if ("object" === x(i)) w.merge(p, i.nodeType ? [i] : i);
                else if (be.test(i)) {
            for (s = s || f.appendChild(t.createElement("div")), a = (de.exec(i) || ["", ""])[1].toLowerCase(), u = ge[a] || ge._default, s.innerHTML = u[1] + w.htmlPrefilter(i) + u[2], l = u[0]; l--;) s = s.lastChild;
            w.merge(p, s.childNodes), (s = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(i));
        for (f.textContent = "", d = 0; i = p[d++];)
            if (r && -1 < w.inArray(i, r)) o && o.push(i);
            else if (c = ie(i), s = me(f.appendChild(i), "script"), c && ve(s), n)
            for (l = 0; i = s[l++];) he.test(i.type || "") && n.push(i);
        return f
    }
    ye = r.createDocumentFragment().appendChild(r.createElement("div")), (xe = r.createElement("input")).setAttribute("type", "radio"), xe.setAttribute("checked", "checked"), xe.setAttribute("name", "t"), ye.appendChild(xe), h.checkClone = ye.cloneNode(!0).cloneNode(!0).lastChild.checked, ye.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!ye.cloneNode(!0).lastChild.defaultValue;
    var Te = /^key/,
        je = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ce = /^([^.]*)(?:\.(.+)|)/;

    function Ee() {
        return !0
    }

    function Se() {
        return !1
    }

    function ke(e, t) {
        return e === function() {
            try {
                return r.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }

    function Ae(e, t, n, r, o, i) {
        var s, a;
        if ("object" == typeof t) {
            for (a in "string" != typeof n && (r = r || n, n = void 0), t) Ae(e, a, n, r, t[a], i);
            return e
        }
        if (null == r && null == o ? (o = n, r = n = void 0) : null == o && ("string" == typeof n ? (o = r, r = void 0) : (o = r, r = n, n = void 0)), !1 === o) o = Se;
        else if (!o) return e;
        return 1 === i && (s = o, (o = function(e) {
            return w().off(e), s.apply(this, arguments)
        }).guid = s.guid || (s.guid = w.guid++)), e.each(function() {
            w.event.add(this, t, o, r, n)
        })
    }

    function Ne(e, t, n) {
        n ? (Q.set(e, t, !1), w.event.add(e, t, {
            namespace: !1,
            handler: function(e) {
                var r, o, s = Q.get(this, t);
                if (1 & e.isTrigger && this[t]) {
                    if (s.length)(w.event.special[t] || {}).delegateType && e.stopPropagation();
                    else if (s = i.call(arguments), Q.set(this, t, s), r = n(this, t), this[t](), s !== (o = Q.get(this, t)) || r ? Q.set(this, t, !1) : o = {}, s !== o) return e.stopImmediatePropagation(), e.preventDefault(), o.value
                } else s.length && (Q.set(this, t, {
                    value: w.event.trigger(w.extend(s[0], w.Event.prototype), s.slice(1), this)
                }), e.stopImmediatePropagation())
            }
        })) : void 0 === Q.get(e, t) && w.event.add(e, t, Ee)
    }
    w.event = {
        global: {},
        add: function(e, t, n, r, o) {
            var i, s, a, u, c, l, f, p, d, h, g, m = Q.get(e);
            if (m)
                for (n.handler && (n = (i = n).handler, o = i.selector), o && w.find.matchesSelector(oe, o), n.guid || (n.guid = w.guid++), (u = m.events) || (u = m.events = {}), (s = m.handle) || (s = m.handle = function(t) {
                        return void 0 !== w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0
                    }), c = (t = (t || "").match(_) || [""]).length; c--;) d = g = (a = Ce.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (o ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, l = w.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: o,
                    needsContext: o && w.expr.match.needsContext.test(o),
                    namespace: h.join(".")
                }, i), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, s) || e.addEventListener && e.addEventListener(d, s)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, l) : p.push(l), w.event.global[d] = !0)
        },
        remove: function(e, t, n, r, o) {
            var i, s, a, u, c, l, f, p, d, h, g, m = Q.hasData(e) && Q.get(e);
            if (m && (u = m.events)) {
                for (c = (t = (t || "").match(_) || [""]).length; c--;)
                    if (d = g = (a = Ce.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), d) {
                        for (f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = i = p.length; i--;) l = p[i], !o && g !== l.origType || n && n.guid !== l.guid || a && !a.test(l.namespace) || r && r !== l.selector && ("**" !== r || !l.selector) || (p.splice(i, 1), l.selector && p.delegateCount--, f.remove && f.remove.call(e, l));
                        s && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, m.handle) || w.removeEvent(e, d, m.handle), delete u[d])
                    } else
                        for (d in u) w.event.remove(e, d + t[c], n, r, !0);
                w.isEmptyObject(u) && Q.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, o, i, s, a = w.event.fix(e),
                u = new Array(arguments.length),
                c = (Q.get(this, "events") || {})[a.type] || [],
                l = w.event.special[a.type] || {};
            for (u[0] = a, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (a.delegateTarget = this, !l.preDispatch || !1 !== l.preDispatch.call(this, a)) {
                for (s = w.event.handlers.call(this, a, c), t = 0;
                    (o = s[t++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = o.elem, n = 0;
                        (i = o.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !1 !== i.namespace && !a.rnamespace.test(i.namespace) || (a.handleObj = i, a.data = i.data, void 0 !== (r = ((w.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u)) && !1 === (a.result = r) && (a.preventDefault(), a.stopPropagation()));
                return l.postDispatch && l.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(e, t) {
            var n, r, o, i, s, a = [],
                u = t.delegateCount,
                c = e.target;
            if (u && c.nodeType && !("click" === e.type && 1 <= e.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (i = [], s = {}, n = 0; n < u; n++) void 0 === s[o = (r = t[n]).selector + " "] && (s[o] = r.needsContext ? -1 < w(o, this).index(c) : w.find(o, this, null, [c]).length), s[o] && i.push(r);
                        i.length && a.push({
                            elem: c,
                            handlers: i
                        })
                    }
            return c = this, u < t.length && a.push({
                elem: c,
                handlers: t.slice(u)
            }), a
        },
        addProp: function(e, t) {
            Object.defineProperty(w.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: g(t) ? function() {
                    if (this.originalEvent) return t(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[e]
                },
                set: function(t) {
                    Object.defineProperty(this, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: t
                    })
                }
            })
        },
        fix: function(e) {
            return e[w.expando] ? e : new w.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && Ne(t, "click", Ee), !1
                },
                trigger: function(e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && Ne(t, "click"), !0
                },
                _default: function(e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && A(t, "input") && Q.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, w.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, w.Event = function(e, t) {
        if (!(this instanceof w.Event)) return new w.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : Se, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0
    }, w.Event.prototype = {
        constructor: w.Event,
        isDefaultPrevented: Se,
        isPropagationStopped: Se,
        isImmediatePropagationStopped: Se,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, w.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && Te.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && je.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, w.event.addProp), w.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        w.event.special[e] = {
            setup: function() {
                return Ne(this, e, ke), !1
            },
            trigger: function() {
                return Ne(this, e), !0
            },
            delegateType: t
        }
    }), w.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        w.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = e.relatedTarget,
                    o = e.handleObj;
                return r && (r === this || w.contains(this, r)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), w.fn.extend({
        on: function(e, t, n, r) {
            return Ae(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Ae(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, o;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, t, e[o]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Se), this.each(function() {
                w.event.remove(this, e, n, t)
            })
        }
    });
    var De = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Le = /<script|<style|<link/i,
        qe = /checked\s*(?:[^=]|=\s*.checked.)/i,
        He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Oe(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && w(e).children("tbody")[0] || e
    }

    function Pe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function _e(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Re(e, t) {
        var n, r, o, i, s, a, u, c;
        if (1 === t.nodeType) {
            if (Q.hasData(e) && (i = Q.access(e), s = Q.set(t, i), c = i.events))
                for (o in delete s.handle, s.events = {}, c)
                    for (n = 0, r = c[o].length; n < r; n++) w.event.add(t, o, c[o][n]);
            J.hasData(e) && (a = J.access(e), u = w.extend({}, a), J.set(t, u))
        }
    }

    function Me(e, t, n, r) {
        t = s.apply([], t);
        var o, i, a, u, c, l, f = 0,
            p = e.length,
            d = p - 1,
            m = t[0],
            v = g(m);
        if (v || 1 < p && "string" == typeof m && !h.checkClone && qe.test(m)) return e.each(function(o) {
            var i = e.eq(o);
            v && (t[0] = m.call(this, o, i.html())), Me(i, t, n, r)
        });
        if (p && (i = (o = we(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === o.childNodes.length && (o = i), i || r)) {
            for (u = (a = w.map(me(o, "script"), Pe)).length; f < p; f++) c = o, f !== d && (c = w.clone(c, !0, !0), u && w.merge(a, me(c, "script"))), n.call(e[f], c, f);
            if (u)
                for (l = a[a.length - 1].ownerDocument, w.map(a, _e), f = 0; f < u; f++) c = a[f], he.test(c.type || "") && !Q.access(c, "globalEval") && w.contains(l, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? w._evalUrl && !c.noModule && w._evalUrl(c.src, {
                    nonce: c.nonce || c.getAttribute("nonce")
                }) : y(c.textContent.replace(He, ""), c, l))
        }
        return e
    }

    function Ie(e, t, n) {
        for (var r, o = t ? w.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || w.cleanData(me(r)), r.parentNode && (n && ie(r) && ve(me(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    w.extend({
        htmlPrefilter: function(e) {
            return e.replace(De, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, o, i, s, a, u, c, l = e.cloneNode(!0),
                f = ie(e);
            if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e)))
                for (s = me(l), r = 0, o = (i = me(e)).length; r < o; r++) a = i[r], "input" === (c = (u = s[r]).nodeName.toLowerCase()) && pe.test(a.type) ? u.checked = a.checked : "input" !== c && "textarea" !== c || (u.defaultValue = a.defaultValue);
            if (t)
                if (n)
                    for (i = i || me(e), s = s || me(l), r = 0, o = i.length; r < o; r++) Re(i[r], s[r]);
                else Re(e, l);
            return 0 < (s = me(l, "script")).length && ve(s, !f && me(e, "script")), l
        },
        cleanData: function(e) {
            for (var t, n, r, o = w.event.special, i = 0; void 0 !== (n = e[i]); i++)
                if (G(n)) {
                    if (t = n[Q.expando]) {
                        if (t.events)
                            for (r in t.events) o[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
                        n[Q.expando] = void 0
                    }
                    n[J.expando] && (n[J.expando] = void 0)
                }
        }
    }), w.fn.extend({
        detach: function(e) {
            return Ie(this, e, !0)
        },
        remove: function(e) {
            return Ie(this, e)
        },
        text: function(e) {
            return B(this, function(e) {
                return void 0 === e ? w.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Me(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Oe(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Me(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Oe(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Me(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Me(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (w.cleanData(me(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return w.clone(this, e, t)
            })
        },
        html: function(e) {
            return B(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !Le.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = w.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (w.cleanData(me(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = [];
            return Me(this, arguments, function(t) {
                var n = this.parentNode;
                w.inArray(this, e) < 0 && (w.cleanData(me(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), w.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        w.fn[e] = function(e) {
            for (var n, r = [], o = w(e), i = o.length - 1, s = 0; s <= i; s++) n = s === i ? this : this.clone(!0), w(o[s])[t](n), a.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var We = new RegExp("^(" + te + ")(?!px)[a-z%]+$", "i"),
        Fe = function(t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        },
        $e = new RegExp(re.join("|"), "i");

    function Be(e, t, n) {
        var r, o, i, s, a = e.style;
        return (n = n || Fe(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || ie(e) || (s = w.style(e, t)), !h.pixelBoxStyles() && We.test(s) && $e.test(t) && (r = a.width, o = a.minWidth, i = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = r, a.minWidth = o, a.maxWidth = i)), void 0 !== s ? s + "" : s
    }

    function ze(e, t) {
        return {
            get: function() {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }! function() {
        function t() {
            if (l) {
                c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", oe.appendChild(c).appendChild(l);
                var t = e.getComputedStyle(l);
                o = "1%" !== t.top, u = 12 === n(t.marginLeft), l.style.right = "60%", a = 36 === n(t.right), i = 36 === n(t.width), l.style.position = "absolute", s = 12 === n(l.offsetWidth / 3), oe.removeChild(c), l = null
            }
        }

        function n(e) {
            return Math.round(parseFloat(e))
        }
        var o, i, s, a, u, c = r.createElement("div"),
            l = r.createElement("div");
        l.style && (l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === l.style.backgroundClip, w.extend(h, {
            boxSizingReliable: function() {
                return t(), i
            },
            pixelBoxStyles: function() {
                return t(), a
            },
            pixelPosition: function() {
                return t(), o
            },
            reliableMarginLeft: function() {
                return t(), u
            },
            scrollboxSize: function() {
                return t(), s
            }
        }))
    }();
    var Ue = ["Webkit", "Moz", "ms"],
        Xe = r.createElement("div").style,
        Ve = {};

    function Ge(e) {
        return w.cssProps[e] || Ve[e] || (e in Xe ? e : Ve[e] = function(e) {
            for (var t = e[0].toUpperCase() + e.slice(1), n = Ue.length; n--;)
                if ((e = Ue[n] + t) in Xe) return e
        }(e) || e)
    }
    var Ye = /^(none|table(?!-c[ea]).+)/,
        Qe = /^--/,
        Je = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ke = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function Ze(e, t, n) {
        var r = ne.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function et(e, t, n, r, o, i) {
        var s = "width" === t ? 1 : 0,
            a = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; s < 4; s += 2) "margin" === n && (u += w.css(e, n + re[s], !0, o)), r ? ("content" === n && (u -= w.css(e, "padding" + re[s], !0, o)), "margin" !== n && (u -= w.css(e, "border" + re[s] + "Width", !0, o))) : (u += w.css(e, "padding" + re[s], !0, o), "padding" !== n ? u += w.css(e, "border" + re[s] + "Width", !0, o) : a += w.css(e, "border" + re[s] + "Width", !0, o));
        return !r && 0 <= i && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - i - u - a - .5)) || 0), u
    }

    function tt(e, t, n) {
        var r = Fe(e),
            o = (!h.boxSizingReliable() || n) && "border-box" === w.css(e, "boxSizing", !1, r),
            i = o,
            s = Be(e, t, r),
            a = "offset" + t[0].toUpperCase() + t.slice(1);
        if (We.test(s)) {
            if (!n) return s;
            s = "auto"
        }
        return (!h.boxSizingReliable() && o || "auto" === s || !parseFloat(s) && "inline" === w.css(e, "display", !1, r)) && e.getClientRects().length && (o = "border-box" === w.css(e, "boxSizing", !1, r), (i = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + et(e, t, n || (o ? "border" : "content"), i, r, s) + "px"
    }

    function nt(e, t, n, r, o) {
        return new nt.prototype.init(e, t, n, r, o)
    }
    w.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Be(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, i, s, a = V(t),
                    u = Qe.test(t),
                    c = e.style;
                if (u || (t = Ge(a)), s = w.cssHooks[t] || w.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, r)) ? o : c[t];
                "string" == (i = typeof n) && (o = ne.exec(n)) && o[1] && (n = ce(e, t, o), i = "number"), null != n && n == n && ("number" !== i || u || (n += o && o[3] || (w.cssNumber[a] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, r)) || (u ? c.setProperty(t, n) : c[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var o, i, s, a = V(t);
            return Qe.test(t) || (t = Ge(a)), (s = w.cssHooks[t] || w.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = Be(e, t, r)), "normal" === o && t in Ke && (o = Ke[t]), "" === n || n ? (i = parseFloat(o), !0 === n || isFinite(i) ? i || 0 : o) : o
        }
    }), w.each(["height", "width"], function(e, t) {
        w.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return !Ye.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, t, r) : ue(e, Je, function() {
                    return tt(e, t, r)
                })
            },
            set: function(e, n, r) {
                var o, i = Fe(e),
                    s = !h.scrollboxSize() && "absolute" === i.position,
                    a = (s || r) && "border-box" === w.css(e, "boxSizing", !1, i),
                    u = r ? et(e, t, r, a, i) : 0;
                return a && s && (u -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(i[t]) - et(e, t, "border", !1, i) - .5)), u && (o = ne.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ze(0, n, u)
            }
        }
    }), w.cssHooks.marginLeft = ze(h.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - ue(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), w.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        w.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) o[e + re[r] + t] = i[r] || i[r - 2] || i[0];
                return o
            }
        }, "margin" !== e && (w.cssHooks[e + t].set = Ze)
    }), w.fn.extend({
        css: function(e, t) {
            return B(this, function(e, t, n) {
                var r, o, i = {},
                    s = 0;
                if (Array.isArray(t)) {
                    for (r = Fe(e), o = t.length; s < o; s++) i[t[s]] = w.css(e, t[s], !1, r);
                    return i
                }
                return void 0 !== n ? w.style(e, t, n) : w.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), ((w.Tween = nt).prototype = {
        constructor: nt,
        init: function(e, t, n, r, o, i) {
            this.elem = e, this.prop = n, this.easing = o || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = i || (w.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = nt.propHooks[this.prop];
            return e && e.get ? e.get(this) : nt.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = nt.propHooks[this.prop];
            return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : nt.propHooks._default.set(this), this
        }
    }).init.prototype = nt.prototype, (nt.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !w.cssHooks[e.prop] && null == e.elem.style[Ge(e.prop)] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = nt.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, w.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, w.fx = nt.prototype.init, w.fx.step = {};
    var rt, ot, it, st, at = /^(?:toggle|show|hide)$/,
        ut = /queueHooks$/;

    function ct() {
        ot && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(ct) : e.setTimeout(ct, w.fx.interval), w.fx.tick())
    }

    function lt() {
        return e.setTimeout(function() {
            rt = void 0
        }), rt = Date.now()
    }

    function ft(e, t) {
        var n, r = 0,
            o = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) o["margin" + (n = re[r])] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function pt(e, t, n) {
        for (var r, o = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), i = 0, s = o.length; i < s; i++)
            if (r = o[i].call(n, t, e)) return r
    }

    function dt(e, t, n) {
        var r, o, i = 0,
            s = dt.prefilters.length,
            a = w.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (o) return !1;
                for (var t = rt || lt(), n = Math.max(0, c.startTime + c.duration - t), r = 1 - (n / c.duration || 0), i = 0, s = c.tweens.length; i < s; i++) c.tweens[i].run(r);
                return a.notifyWith(e, [c, r, n]), r < 1 && s ? n : (s || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
            },
            c = a.promise({
                elem: e,
                props: w.extend({}, t),
                opts: w.extend(!0, {
                    specialEasing: {},
                    easing: w.easing._default
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: rt || lt(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = w.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < r; n++) c.tweens[n].run(1);
                    return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
                }
            }),
            l = c.props;
        for (function(e, t) {
                var n, r, o, i, s;
                for (n in e)
                    if (o = t[r = V(n)], i = e[n], Array.isArray(i) && (o = i[1], i = e[n] = i[0]), n !== r && (e[r] = i, delete e[n]), (s = w.cssHooks[r]) && "expand" in s)
                        for (n in i = s.expand(i), delete e[r], i) n in e || (e[n] = i[n], t[n] = o);
                    else t[r] = o
            }(l, c.opts.specialEasing); i < s; i++)
            if (r = dt.prefilters[i].call(c, e, l, c.opts)) return g(r.stop) && (w._queueHooks(c.elem, c.opts.queue).stop = r.stop.bind(r)), r;
        return w.map(l, pt, c), g(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), w.fx.timer(w.extend(u, {
            elem: e,
            anim: c,
            queue: c.opts.queue
        })), c
    }
    w.Animation = w.extend(dt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return ce(n.elem, e, ne.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            g(e) ? (t = e, e = ["*"]) : e = e.match(_);
            for (var n, r = 0, o = e.length; r < o; r++) n = e[r], dt.tweeners[n] = dt.tweeners[n] || [], dt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, o, i, s, a, u, c, l, f = "width" in t || "height" in t,
                p = this,
                d = {},
                h = e.style,
                g = e.nodeType && ae(e),
                m = Q.get(e, "fxshow");
            for (r in n.queue || (null == (s = w._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function() {
                    s.unqueued || a()
                }), s.unqueued++, p.always(function() {
                    p.always(function() {
                        s.unqueued--, w.queue(e, "fx").length || s.empty.fire()
                    })
                })), t)
                if (o = t[r], at.test(o)) {
                    if (delete t[r], i = i || "toggle" === o, o === (g ? "hide" : "show")) {
                        if ("show" !== o || !m || void 0 === m[r]) continue;
                        g = !0
                    }
                    d[r] = m && m[r] || w.style(e, r)
                }
            if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = m && m.display) && (c = Q.get(e, "display")), "none" === (l = w.css(e, "display")) && (c ? l = c : (fe([e], !0), c = e.style.display || c, l = w.css(e, "display"), fe([e]))), ("inline" === l || "inline-block" === l && null != c) && "none" === w.css(e, "float") && (u || (p.done(function() {
                        h.display = c
                    }), null == c && (l = h.display, c = "none" === l ? "" : l)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), u = !1, d) u || (m ? "hidden" in m && (g = m.hidden) : m = Q.access(e, "fxshow", {
                    display: c
                }), i && (m.hidden = !g), g && fe([e], !0), p.done(function() {
                    for (r in g || fe([e]), Q.remove(e, "fxshow"), d) w.style(e, r, d[r])
                })), u = pt(g ? m[r] : 0, r, p), r in m || (m[r] = u.start, g && (u.end = u.start, u.start = 0))
        }],
        prefilter: function(e, t) {
            t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
        }
    }), w.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? w.extend({}, e) : {
            complete: n || !n && t || g(e) && e,
            duration: e,
            easing: n && t || t && !g(t) && t
        };
        return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue)
        }, r
    }, w.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ae).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var o = w.isEmptyObject(e),
                i = w.speed(t, n, r),
                s = function() {
                    var t = dt(this, w.extend({}, e), i);
                    (o || Q.get(this, "finish")) && t.stop(!0)
                };
            return s.finish = s, o || !1 === i.queue ? this.each(s) : this.queue(i.queue, s)
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    o = null != e && e + "queueHooks",
                    i = w.timers,
                    s = Q.get(this);
                if (o) s[o] && s[o].stop && r(s[o]);
                else
                    for (o in s) s[o] && s[o].stop && ut.test(o) && r(s[o]);
                for (o = i.length; o--;) i[o].elem !== this || null != e && i[o].queue !== e || (i[o].anim.stop(n), t = !1, i.splice(o, 1));
                !t && n || w.dequeue(this, e)
            })
        },
        finish: function(e) {
            return !1 !== e && (e = e || "fx"), this.each(function() {
                var t, n = Q.get(this),
                    r = n[e + "queue"],
                    o = n[e + "queueHooks"],
                    i = w.timers,
                    s = r ? r.length : 0;
                for (n.finish = !0, w.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--;) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                for (t = 0; t < s; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), w.each(["toggle", "show", "hide"], function(e, t) {
        var n = w.fn[t];
        w.fn[t] = function(e, r, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ft(t, !0), e, r, o)
        }
    }), w.each({
        slideDown: ft("show"),
        slideUp: ft("hide"),
        slideToggle: ft("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        w.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), w.timers = [], w.fx.tick = function() {
        var e, t = 0,
            n = w.timers;
        for (rt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || w.fx.stop(), rt = void 0
    }, w.fx.timer = function(e) {
        w.timers.push(e), w.fx.start()
    }, w.fx.interval = 13, w.fx.start = function() {
        ot || (ot = !0, ct())
    }, w.fx.stop = function() {
        ot = null
    }, w.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, w.fn.delay = function(t, n) {
        return t = w.fx && w.fx.speeds[t] || t, n = n || "fx", this.queue(n, function(n, r) {
            var o = e.setTimeout(n, t);
            r.stop = function() {
                e.clearTimeout(o)
            }
        })
    }, it = r.createElement("input"), st = r.createElement("select").appendChild(r.createElement("option")), it.type = "checkbox", h.checkOn = "" !== it.value, h.optSelected = st.selected, (it = r.createElement("input")).value = "t", it.type = "radio", h.radioValue = "t" === it.value;
    var ht, gt = w.expr.attrHandle;
    w.fn.extend({
        attr: function(e, t) {
            return B(this, w.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                w.removeAttr(this, e)
            })
        }
    }), w.extend({
        attr: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return void 0 === e.getAttribute ? w.prop(e, t, n) : (1 === i && w.isXMLDoc(e) || (o = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? ht : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (r = o.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!h.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                o = t && t.match(_);
            if (o && 1 === e.nodeType)
                for (; n = o[r++];) e.removeAttribute(n)
        }
    }), ht = {
        set: function(e, t, n) {
            return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, w.each(w.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = gt[t] || w.find.attr;
        gt[t] = function(e, t, r) {
            var o, i, s = t.toLowerCase();
            return r || (i = gt[s], gt[s] = o, o = null != n(e, t, r) ? s : null, gt[s] = i), o
        }
    });
    var mt = /^(?:input|select|textarea|button)$/i,
        vt = /^(?:a|area)$/i;

    function yt(e) {
        return (e.match(_) || []).join(" ")
    }

    function xt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function bt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(_) || []
    }
    w.fn.extend({
        prop: function(e, t) {
            return B(this, w.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[w.propFix[e] || e]
            })
        }
    }), w.extend({
        prop: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) return 1 === i && w.isXMLDoc(e) || (t = w.propFix[t] || t, o = w.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : e[t] = n : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = w.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : mt.test(e.nodeName) || vt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), h.optSelected || (w.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        w.propFix[this.toLowerCase()] = this
    }), w.fn.extend({
        addClass: function(e) {
            var t, n, r, o, i, s, a, u = 0;
            if (g(e)) return this.each(function(t) {
                w(this).addClass(e.call(this, t, xt(this)))
            });
            if ((t = bt(e)).length)
                for (; n = this[u++];)
                    if (o = xt(n), r = 1 === n.nodeType && " " + yt(o) + " ") {
                        for (s = 0; i = t[s++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        o !== (a = yt(r)) && n.setAttribute("class", a)
                    }
            return this
        },
        removeClass: function(e) {
            var t, n, r, o, i, s, a, u = 0;
            if (g(e)) return this.each(function(t) {
                w(this).removeClass(e.call(this, t, xt(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((t = bt(e)).length)
                for (; n = this[u++];)
                    if (o = xt(n), r = 1 === n.nodeType && " " + yt(o) + " ") {
                        for (s = 0; i = t[s++];)
                            for (; - 1 < r.indexOf(" " + i + " ");) r = r.replace(" " + i + " ", " ");
                        o !== (a = yt(r)) && n.setAttribute("class", a)
                    }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = "string" === n || Array.isArray(e);
            return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function(n) {
                w(this).toggleClass(e.call(this, n, xt(this), t), t)
            }) : this.each(function() {
                var t, o, i, s;
                if (r)
                    for (o = 0, i = w(this), s = bt(e); t = s[o++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else void 0 !== e && "boolean" !== n || ((t = xt(this)) && Q.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Q.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && -1 < (" " + yt(xt(n)) + " ").indexOf(t)) return !0;
            return !1
        }
    });
    var wt = /\r/g;
    w.fn.extend({
        val: function(e) {
            var t, n, r, o = this[0];
            return arguments.length ? (r = g(e), this.each(function(n) {
                var o;
                1 === this.nodeType && (null == (o = r ? e.call(this, n, w(this).val()) : e) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = w.map(o, function(e) {
                    return null == e ? "" : e + ""
                })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
            })) : o ? (t = w.valHooks[o.type] || w.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" == typeof(n = o.value) ? n.replace(wt, "") : null == n ? "" : n : void 0
        }
    }), w.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = w.find.attr(e, "value");
                    return null != t ? t : yt(w.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r, o = e.options,
                        i = e.selectedIndex,
                        s = "select-one" === e.type,
                        a = s ? null : [],
                        u = s ? i + 1 : o.length;
                    for (r = i < 0 ? u : s ? i : 0; r < u; r++)
                        if (((n = o[r]).selected || r === i) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = w(n).val(), s) return t;
                            a.push(t)
                        }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, o = e.options, i = w.makeArray(t), s = o.length; s--;)((r = o[s]).selected = -1 < w.inArray(w.valHooks.option.get(r), i)) && (n = !0);
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), w.each(["radio", "checkbox"], function() {
        w.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < w.inArray(w(e).val(), t)
            }
        }, h.checkOn || (w.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), h.focusin = "onfocusin" in e;
    var Tt = /^(?:focusinfocus|focusoutblur)$/,
        jt = function(e) {
            e.stopPropagation()
        };
    w.extend(w.event, {
        trigger: function(t, n, o, i) {
            var s, a, u, c, l, p, d, h, v = [o || r],
                y = f.call(t, "type") ? t.type : t,
                x = f.call(t, "namespace") ? t.namespace.split(".") : [];
            if (a = h = u = o = o || r, 3 !== o.nodeType && 8 !== o.nodeType && !Tt.test(y + w.event.triggered) && (-1 < y.indexOf(".") && (y = (x = y.split(".")).shift(), x.sort()), l = y.indexOf(":") < 0 && "on" + y, (t = t[w.expando] ? t : new w.Event(y, "object" == typeof t && t)).isTrigger = i ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = o), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[y] || {}, i || !d.trigger || !1 !== d.trigger.apply(o, n))) {
                if (!i && !d.noBubble && !m(o)) {
                    for (c = d.delegateType || y, Tt.test(c + y) || (a = a.parentNode); a; a = a.parentNode) v.push(a), u = a;
                    u === (o.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e)
                }
                for (s = 0;
                    (a = v[s++]) && !t.isPropagationStopped();) h = a, t.type = 1 < s ? c : d.bindType || y, (p = (Q.get(a, "events") || {})[t.type] && Q.get(a, "handle")) && p.apply(a, n), (p = l && a[l]) && p.apply && G(a) && (t.result = p.apply(a, n), !1 === t.result && t.preventDefault());
                return t.type = y, i || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !G(o) || l && g(o[y]) && !m(o) && ((u = o[l]) && (o[l] = null), w.event.triggered = y, t.isPropagationStopped() && h.addEventListener(y, jt), o[y](), t.isPropagationStopped() && h.removeEventListener(y, jt), w.event.triggered = void 0, u && (o[l] = u)), t.result
            }
        },
        simulate: function(e, t, n) {
            var r = w.extend(new w.Event, n, {
                type: e,
                isSimulated: !0
            });
            w.event.trigger(r, null, t)
        }
    }), w.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                w.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return w.event.trigger(e, t, n, !0)
        }
    }), h.focusin || w.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            w.event.simulate(t, e.target, w.event.fix(e))
        };
        w.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    o = Q.access(r, t);
                o || r.addEventListener(e, n, !0), Q.access(r, t, (o || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    o = Q.access(r, t) - 1;
                o ? Q.access(r, t, o) : (r.removeEventListener(e, n, !0), Q.remove(r, t))
            }
        }
    });
    var Ct = e.location,
        Et = Date.now(),
        St = /\?/;
    w.parseXML = function(t) {
        var n;
        if (!t || "string" != typeof t) return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (t) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n
    };
    var kt = /\[\]$/,
        At = /\r?\n/g,
        Nt = /^(?:submit|button|image|reset|file)$/i,
        Dt = /^(?:input|select|textarea|keygen)/i;

    function Lt(e, t, n, r) {
        var o;
        if (Array.isArray(t)) w.each(t, function(t, o) {
            n || kt.test(e) ? r(e, o) : Lt(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, r)
        });
        else if (n || "object" !== x(t)) r(e, t);
        else
            for (o in t) Lt(e + "[" + o + "]", t[o], n, r)
    }
    w.param = function(e, t) {
        var n, r = [],
            o = function(e, t) {
                var n = g(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == e) return "";
        if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function() {
            o(this.name, this.value)
        });
        else
            for (n in e) Lt(n, e[n], t, o);
        return r.join("&")
    }, w.fn.extend({
        serialize: function() {
            return w.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = w.prop(this, "elements");
                return e ? w.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !w(this).is(":disabled") && Dt.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e))
            }).map(function(e, t) {
                var n = w(this).val();
                return null == n ? null : Array.isArray(n) ? w.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(At, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(At, "\r\n")
                }
            }).get()
        }
    });
    var qt = /%20/g,
        Ht = /#.*$/,
        Ot = /([?&])_=[^&]*/,
        Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        _t = /^(?:GET|HEAD)$/,
        Rt = /^\/\//,
        Mt = {},
        It = {},
        Wt = "*/".concat("*"),
        Ft = r.createElement("a");

    function $t(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, o = 0,
                i = t.toLowerCase().match(_) || [];
            if (g(n))
                for (; r = i[o++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Bt(e, t, n, r) {
        var o = {},
            i = e === It;

        function s(a) {
            var u;
            return o[a] = !0, w.each(e[a] || [], function(e, a) {
                var c = a(t, n, r);
                return "string" != typeof c || i || o[c] ? i ? !(u = c) : void 0 : (t.dataTypes.unshift(c), s(c), !1)
            }), u
        }
        return s(t.dataTypes[0]) || !o["*"] && s("*")
    }

    function zt(e, t) {
        var n, r, o = w.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
        return r && w.extend(!0, e, r), e
    }
    Ft.href = Ct.href, w.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ct.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ct.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Wt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": w.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e)
        },
        ajaxPrefilter: $t(Mt),
        ajaxTransport: $t(It),
        ajax: function(t, n) {
            "object" == typeof t && (n = t, t = void 0), n = n || {};
            var o, i, s, a, u, c, l, f, p, d, h = w.ajaxSetup({}, n),
                g = h.context || h,
                m = h.context && (g.nodeType || g.jquery) ? w(g) : w.event,
                v = w.Deferred(),
                y = w.Callbacks("once memory"),
                x = h.statusCode || {},
                b = {},
                T = {},
                j = "canceled",
                C = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (l) {
                            if (!a)
                                for (a = {}; t = Pt.exec(s);) a[t[1].toLowerCase() + " "] = (a[t[1].toLowerCase() + " "] || []).concat(t[2]);
                            t = a[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return l ? s : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == l && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == l && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (l) C.always(e[C.status]);
                            else
                                for (t in e) x[t] = [x[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || j;
                        return o && o.abort(t), E(0, t), this
                    }
                };
            if (v.promise(C), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(_) || [""], null == h.crossDomain) {
                c = r.createElement("a");
                try {
                    c.href = h.url, c.href = c.href, h.crossDomain = Ft.protocol + "//" + Ft.host != c.protocol + "//" + c.host
                } catch (t) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), Bt(Mt, h, n, C), l) return C;
            for (p in (f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !_t.test(h.type), i = h.url.replace(Ht, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(i.length), h.data && (h.processData || "string" == typeof h.data) && (i += (St.test(i) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (i = i.replace(Ot, "$1"), d = (St.test(i) ? "&" : "?") + "_=" + Et++ + d), h.url = i + d), h.ifModified && (w.lastModified[i] && C.setRequestHeader("If-Modified-Since", w.lastModified[i]), w.etag[i] && C.setRequestHeader("If-None-Match", w.etag[i])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && C.setRequestHeader("Content-Type", h.contentType), C.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Wt + "; q=0.01" : "") : h.accepts["*"]), h.headers) C.setRequestHeader(p, h.headers[p]);
            if (h.beforeSend && (!1 === h.beforeSend.call(g, C, h) || l)) return C.abort();
            if (j = "abort", y.add(h.complete), C.done(h.success), C.fail(h.error), o = Bt(It, h, n, C)) {
                if (C.readyState = 1, f && m.trigger("ajaxSend", [C, h]), l) return C;
                h.async && 0 < h.timeout && (u = e.setTimeout(function() {
                    C.abort("timeout")
                }, h.timeout));
                try {
                    l = !1, o.send(b, E)
                } catch (t) {
                    if (l) throw t;
                    E(-1, t)
                }
            } else E(-1, "No Transport");

            function E(t, n, r, a) {
                var c, p, d, b, T, j = n;
                l || (l = !0, u && e.clearTimeout(u), o = void 0, s = a || "", C.readyState = 0 < t ? 4 : 0, c = 200 <= t && t < 300 || 304 === t, r && (b = function(e, t, n) {
                    for (var r, o, i, s, a = e.contents, u = e.dataTypes;
                        "*" === u[0];) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (o in a)
                            if (a[o] && a[o].test(r)) {
                                u.unshift(o);
                                break
                            }
                    if (u[0] in n) i = u[0];
                    else {
                        for (o in n) {
                            if (!u[0] || e.converters[o + " " + u[0]]) {
                                i = o;
                                break
                            }
                            s || (s = o)
                        }
                        i = i || s
                    }
                    if (i) return i !== u[0] && u.unshift(i), n[i]
                }(h, C, r)), b = function(e, t, n, r) {
                    var o, i, s, a, u, c = {},
                        l = e.dataTypes.slice();
                    if (l[1])
                        for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                    for (i = l.shift(); i;)
                        if (e.responseFields[i] && (n[e.responseFields[i]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = i, i = l.shift())
                            if ("*" === i) i = u;
                            else if ("*" !== u && u !== i) {
                        if (!(s = c[u + " " + i] || c["* " + i]))
                            for (o in c)
                                if ((a = o.split(" "))[1] === i && (s = c[u + " " + a[0]] || c["* " + a[0]])) {
                                    !0 === s ? s = c[o] : !0 !== c[o] && (i = a[0], l.unshift(a[1]));
                                    break
                                }
                        if (!0 !== s)
                            if (s && e.throws) t = s(t);
                            else try {
                                t = s(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: s ? e : "No conversion from " + u + " to " + i
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(h, b, C, c), c ? (h.ifModified && ((T = C.getResponseHeader("Last-Modified")) && (w.lastModified[i] = T), (T = C.getResponseHeader("etag")) && (w.etag[i] = T)), 204 === t || "HEAD" === h.type ? j = "nocontent" : 304 === t ? j = "notmodified" : (j = b.state, p = b.data, c = !(d = b.error))) : (d = j, !t && j || (j = "error", t < 0 && (t = 0))), C.status = t, C.statusText = (n || j) + "", c ? v.resolveWith(g, [p, j, C]) : v.rejectWith(g, [C, j, d]), C.statusCode(x), x = void 0, f && m.trigger(c ? "ajaxSuccess" : "ajaxError", [C, h, c ? p : d]), y.fireWith(g, [C, j]), f && (m.trigger("ajaxComplete", [C, h]), --w.active || w.event.trigger("ajaxStop")))
            }
            return C
        },
        getJSON: function(e, t, n) {
            return w.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return w.get(e, void 0, t, "script")
        }
    }), w.each(["get", "post"], function(e, t) {
        w[t] = function(e, n, r, o) {
            return g(n) && (o = o || r, r = n, n = void 0), w.ajax(w.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: r
            }, w.isPlainObject(e) && e))
        }
    }), w._evalUrl = function(e, t) {
        return w.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(e) {
                w.globalEval(e, t)
            }
        })
    }, w.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            return g(e) ? this.each(function(t) {
                w(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = w(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = g(e);
            return this.each(function(n) {
                w(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                w(this).replaceWith(this.childNodes)
            }), this
        }
    }), w.expr.pseudos.hidden = function(e) {
        return !w.expr.pseudos.visible(e)
    }, w.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, w.ajaxSettings.xhr = function() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    };
    var Ut = {
            0: 200,
            1223: 204
        },
        Xt = w.ajaxSettings.xhr();
    h.cors = !!Xt && "withCredentials" in Xt, h.ajax = Xt = !!Xt, w.ajaxTransport(function(t) {
        var n, r;
        if (h.cors || Xt && !t.crossDomain) return {
            send: function(o, i) {
                var s, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
                    for (s in t.xhrFields) a[s] = t.xhrFields[s];
                for (s in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"), o) a.setRequestHeader(s, o[s]);
                n = function(e) {
                    return function() {
                        n && (n = r = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? i(0, "error") : i(a.status, a.statusText) : i(Ut[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                            binary: a.response
                        } : {
                            text: a.responseText
                        }, a.getAllResponseHeaders()))
                    }
                }, a.onload = n(), r = a.onerror = a.ontimeout = n("error"), void 0 !== a.onabort ? a.onabort = r : a.onreadystatechange = function() {
                    4 === a.readyState && e.setTimeout(function() {
                        n && r()
                    })
                }, n = n("abort");
                try {
                    a.send(t.hasContent && t.data || null)
                } catch (o) {
                    if (n) throw o
                }
            },
            abort: function() {
                n && n()
            }
        }
    }), w.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), w.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return w.globalEval(e), e
            }
        }
    }), w.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), w.ajaxTransport("script", function(e) {
        var t, n;
        if (e.crossDomain || e.scriptAttrs) return {
            send: function(o, i) {
                t = w("<script>").attr(e.scriptAttrs || {}).prop({
                    charset: e.scriptCharset,
                    src: e.url
                }).on("load error", n = function(e) {
                    t.remove(), n = null, e && i("error" === e.type ? 404 : 200, e.type)
                }), r.head.appendChild(t[0])
            },
            abort: function() {
                n && n()
            }
        }
    });
    var Vt, Gt = [],
        Yt = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Gt.pop() || w.expando + "_" + Et++;
            return this[e] = !0, e
        }
    }), w.ajaxPrefilter("json jsonp", function(t, n, r) {
        var o, i, s, a = !1 !== t.jsonp && (Yt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0]) return o = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Yt, "$1" + o) : !1 !== t.jsonp && (t.url += (St.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function() {
            return s || w.error(o + " was not called"), s[0]
        }, t.dataTypes[0] = "json", i = e[o], e[o] = function() {
            s = arguments
        }, r.always(function() {
            void 0 === i ? w(e).removeProp(o) : e[o] = i, t[o] && (t.jsonpCallback = n.jsonpCallback, Gt.push(o)), s && g(i) && i(s[0]), s = i = void 0
        }), "script"
    }), h.createHTMLDocument = ((Vt = r.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Vt.childNodes.length), w.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (h.createHTMLDocument ? ((o = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(o)) : t = r), s = !n && [], (i = N.exec(e)) ? [t.createElement(i[1])] : (i = we([e], t, s), s && s.length && w(s).remove(), w.merge([], i.childNodes)));
        var o, i, s
    }, w.fn.load = function(e, t, n) {
        var r, o, i, s = this,
            a = e.indexOf(" ");
        return -1 < a && (r = yt(e.slice(a)), e = e.slice(0, a)), g(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), 0 < s.length && w.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            i = arguments, s.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            s.each(function() {
                n.apply(this, i || [e.responseText, t, e])
            })
        }), this
    }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        w.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), w.expr.pseudos.animated = function(e) {
        return w.grep(w.timers, function(t) {
            return e === t.elem
        }).length
    }, w.offset = {
        setOffset: function(e, t, n) {
            var r, o, i, s, a, u, c = w.css(e, "position"),
                l = w(e),
                f = {};
            "static" === c && (e.style.position = "relative"), a = l.offset(), i = w.css(e, "top"), u = w.css(e, "left"), ("absolute" === c || "fixed" === c) && -1 < (i + u).indexOf("auto") ? (s = (r = l.position()).top, o = r.left) : (s = parseFloat(i) || 0, o = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, a))), null != t.top && (f.top = t.top - a.top + s), null != t.left && (f.left = t.left - a.left + o), "using" in t ? t.using.call(e, f) : l.css(f)
        }
    }, w.fn.extend({
        offset: function(e) {
            if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                w.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0];
            return r ? r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: t.top + n.pageYOffset,
                left: t.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n, r = this[0],
                    o = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position");) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((o = w(e).offset()).top += w.css(e, "borderTopWidth", !0), o.left += w.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - o.top - w.css(r, "marginTop", !0),
                    left: t.left - o.left - w.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === w.css(e, "position");) e = e.offsetParent;
                return e || oe
            })
        }
    }), w.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        w.fn[e] = function(r) {
            return B(this, function(e, r, o) {
                var i;
                if (m(e) ? i = e : 9 === e.nodeType && (i = e.defaultView), void 0 === o) return i ? i[t] : e[r];
                i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : e[r] = o
            }, e, r, arguments.length)
        }
    }), w.each(["top", "left"], function(e, t) {
        w.cssHooks[t] = ze(h.pixelPosition, function(e, n) {
            if (n) return n = Be(e, t), We.test(n) ? w(e).position()[t] + "px" : n
        })
    }), w.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        w.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            w.fn[r] = function(o, i) {
                var s = arguments.length && (n || "boolean" != typeof o),
                    a = n || (!0 === o || !0 === i ? "margin" : "border");
                return B(this, function(t, n, o) {
                    var i;
                    return m(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === o ? w.css(t, n, a) : w.style(t, n, o, a)
                }, t, s ? o : void 0, s)
            }
        })
    }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
        w.fn[t] = function(e, n) {
            return 0 < arguments.length ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), w.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), w.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), w.proxy = function(e, t) {
        var n, r, o;
        if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = i.call(arguments, 2), (o = function() {
            return e.apply(t || this, r.concat(i.call(arguments)))
        }).guid = e.guid = e.guid || w.guid++, o
    }, w.holdReady = function(e) {
        e ? w.readyWait++ : w.ready(!0)
    }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = A, w.isFunction = g, w.isWindow = m, w.camelCase = V, w.type = x, w.now = Date.now, w.isNumeric = function(e) {
        var t = w.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return w
    });
    var Qt = e.jQuery,
        Jt = e.$;
    return w.noConflict = function(t) {
        return e.$ === w && (e.$ = Jt), t && e.jQuery === w && (e.jQuery = Qt), w
    }, t || (e.jQuery = e.$ = w), w
}),
function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 1)
}({
    "./components/com_accordion/js/critical.js": function(e, t) {},
    "./components/com_animated-svg/js/critical.js": function(e, t) {},
    "./components/com_awards/js/critical.js": function(e, t) {},
    "./components/com_colorpalette/js/critical.js": function(e, t) {},
    "./components/com_content-block-list/js/critical.js": function(e, t) {},
    "./components/com_content-box/js/critical.js": function(e, t) {},
    "./components/com_customer-review/js/critical.js": function(e, t) {},
    "./components/com_icon-circle/js/critical.js": function(e, t) {},
    "./components/com_icon-text-cols/js/critical.js": function(e, t) {},
    "./components/com_imageslider/js/critical.js": function(e, t) {},
    "./components/com_job-list/js/critical.js": function(e, t) {},
    "./components/com_logo-grid/js/critical.js": function(e, t) {},
    "./components/com_personcard/js/critical.js": function(e, t) {},
    "./components/com_references-list/js/critical.js": function(e, t) {},
    "./components/com_step-by-step/js/critical.js": function(e, t) {},
    "./components/com_video-background-content/js/critical.js": function(e, t) {},
    "./resources/js/critical.js": function(e, t) {
        "objectFit" in document.documentElement.style == 0 && document.addEventListener("DOMContentLoaded", function() {
            for (var e = document.querySelectorAll("img[data-object-fit]"), t = 0; t < e.length; t++) {
                var n = e[t],
                    r = n.hasAttribute("data-src") ? n.getAttribute("data-src") : n.src;
                (n.runtimeStyle || n.style).background = 'url("'.concat(r, '") no-repeat 50%/').concat(n.currentStyle ? n.currentStyle["object-fit"] : n.getAttribute("data-object-fit")), n.className = "", n.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='".concat(n.width, "' height='").concat(n.height, "'%3E%3C/svg%3E")
            }
        })
    },
    1: function(e, t, n) {
        n("./components/com_accordion/js/critical.js"), n("./components/com_animated-svg/js/critical.js"), n("./components/com_awards/js/critical.js"), n("./components/com_colorpalette/js/critical.js"), n("./components/com_content-block-list/js/critical.js"), n("./components/com_content-box/js/critical.js"), n("./components/com_customer-review/js/critical.js"), n("./components/com_icon-circle/js/critical.js"), n("./components/com_icon-text-cols/js/critical.js"), n("./components/com_imageslider/js/critical.js"), n("./components/com_job-list/js/critical.js"), n("./components/com_logo-grid/js/critical.js"), n("./components/com_personcard/js/critical.js"), n("./components/com_references-list/js/critical.js"), n("./components/com_step-by-step/js/critical.js"), n("./components/com_video-background-content/js/critical.js"), e.exports = n("./resources/js/critical.js")
    }
});