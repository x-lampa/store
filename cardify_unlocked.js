//Lampa.Start
(function () {
  "use strict";

  function f(p5, p6) {
    if (!(p5 instanceof p6)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function f2(p7, p8) {
    for (var v4 = 0; v4 < p8.length; v4++) {
      var v5 = p8[v4];
      v5.enumerable = v5.enumerable || false;
      v5.configurable = true;
      if ("value" in v5) {
        v5.writable = true;
      }
      Object.defineProperty(p7, v5.key, v5);
    }
  }
  function f3(p9, p82, p83) {
    if (p82) {
      f2(p9.prototype, p82);
    }
    if (p83) {
      f2(p9, p83);
    }
    return p9;
  }
  function f4(p84) {
    return f5(p84) || f6(p84) || f7(p84) || f9();
  }
  function f5(p85) {
    if (Array.isArray(p85)) {
      return f8(p85);
    }
  }
  function f6(p86) {
    if (typeof Symbol !== "undefined" && p86[Symbol.iterator] != null || p86["@@iterator"] != null) {
      return Array.from(p86);
    }
  }
  function f7(p87, p88) {
    if (!p87) {
      return;
    }
    if (typeof p87 === "string") {
      return f8(p87, p88);
    }
    var v6 = Object.prototype.toString.call(p87).slice(8, -1);
    if (v6 === "Object" && p87.constructor) {
      v6 = p87.constructor.name;
    }
    if (v6 === "Map" || v6 === "Set") {
      return Array.from(p87);
    }
    if (v6 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v6)) {
      return f8(p87, p88);
    }
  }
  function f8(p89, p90) {
    if (p90 == null || p90 > p89.length) {
      p90 = p89.length;
    }
    for (var v7 = 0, v8 = new Array(p90); v7 < p90; v7++) {
      v8[v7] = p89[v7];
    }
    return v8;
  }
  function f9() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function f89(p91, p92) {
    var v9 = typeof Symbol !== "undefined" && p91[Symbol.iterator] || p91["@@iterator"];
    if (!v9) {
      if (Array.isArray(p91) || (v9 = f7(p91)) || p92 && p91 && typeof p91.length === "number") {
        if (v9) {
          p91 = v9;
        }
        var v14 = 0;
        function f90() {}
        return {
          s: f90,
          n: function () {
            if (v14 >= p91.length) {
              return {
                done: true
              };
            }
            var v21 = {
              done: false,
              value: p91[v14++]
            };
            return v21;
          },
          e: function (p93) {
            throw p93;
          },
          f: f90
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var v22 = true;
    var v23 = false;
    var v24;
    return {
      s: function () {
        v9 = v9.call(p91);
      },
      n: function () {
        var v25 = v9.next();
        v22 = v25.done;
        return v25;
      },
      e: function (p94) {
        v23 = true;
        v24 = p94;
      },
      f: function () {
        try {
          if (!v22 && v9.return != null) {
            v9.return();
          }
        } finally {
          if (v23) {
            throw v24;
          }
        }
      }
    };
  }
  function f91(p95) {
    this.state = p95.state;
    this.start = function () {
      this.dispath(this.state);
    };
    this.dispath = function (p96) {
      var v26 = p95.transitions[p96];
      if (v26) {
        v26.call(this, this);
      } else {
        console.log("invalid action");
      }
    };
  }
  var vF = function () {
    function f92(p97, p98) {
      var vThis7 = this;
      f(this, f92);
      this.paused = false;
      this.display = false;
      this.ended = false;
      this.html = $(`
            <div class="cardify-trailer">
                <div class="cardify-trailer__youtube">
                    <div class="cardify-trailer__youtube-iframe"></div>
                    <div class="cardify-trailer__youtube-line one"></div>
                    <div class="cardify-trailer__youtube-line two"></div>
                </div>

                <div class="cardify-trailer__controlls">
                    <div class="cardify-trailer__title"></div>
                    <div class="cardify-trailer__remote">
                        <div class="cardify-trailer__remote-icon">
                            <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.5196 7.22042L26.7992 12.9408C27.8463 14.5217 28.4561 16.4175 28.4561 18.4557C28.4561 20.857 27.6098 23.0605 26.1991 24.7844L31.8718 30.457C34.7226 27.2724 36.4561 23.0667 36.4561 18.4561C36.4561 14.2059 34.983 10.2998 32.5196 7.22042Z" fill="white" fill-opacity="0.28"/>
                                <path d="M31.262 31.1054L31.1054 31.262C31.158 31.2102 31.2102 31.158 31.262 31.1054Z" fill="white" fill-opacity="0.28"/>
                                <path d="M29.6917 32.5196L23.971 26.7989C22.3901 27.846 20.4943 28.4557 18.4561 28.4557C16.4179 28.4557 14.5221 27.846 12.9412 26.7989L7.22042 32.5196C10.2998 34.983 14.2059 36.4561 18.4561 36.4561C22.7062 36.4561 26.6123 34.983 29.6917 32.5196Z" fill="white" fill-opacity="0.28"/>
                                <path d="M5.81349 31.2688L5.64334 31.0986C5.69968 31.1557 5.7564 31.2124 5.81349 31.2688Z" fill="white" fill-opacity="0.28"/>
                                <path d="M5.04033 30.4571L10.7131 24.7844C9.30243 23.0605 8.4561 20.857 8.4561 18.4557C8.4561 16.4175 9.06588 14.5217 10.113 12.9408L4.39251 7.22037C1.9291 10.2998 0.456055 14.2059 0.456055 18.4561C0.456054 23.0667 2.18955 27.2724 5.04033 30.4571Z" fill="white" fill-opacity="0.28"/>
                                <path d="M6.45507 5.04029C9.63973 2.18953 13.8455 0.456055 18.4561 0.456055C23.0667 0.456054 27.2724 2.18955 30.4571 5.04034L24.7847 10.7127C23.0609 9.30207 20.8573 8.45575 18.4561 8.45575C16.0549 8.45575 13.8513 9.30207 12.1275 10.7127L6.45507 5.04029Z" fill="white" fill-opacity="0.28"/>
                                <circle cx="18.4565" cy="18.4561" r="7" fill="white"/>
                            </svg>
                        </div>
                        <div class="cardify-trailer__remote-text">${Lampa.Lang.translate("cardify_enable_sound")}</div>
                    </div>
                </div>
            </div>
        `);
      if (typeof YT !== "undefined") {
        this.youtube = new YT.Player(this.html.find(".cardify-trailer__youtube-iframe")[0], {
          height: window.innerHeight * 2,
          width: window.innerWidth,
          playerVars: {
            controls: 1,
            showinfo: 0,
            autohide: 1,
            modestbranding: 1,
            autoplay: 0,
            disablekb: 1,
            fs: 0,
            enablejsapi: 1,
            playsinline: 1,
            rel: 0,
            suggestedQuality: "hd1080",
            setPlaybackQuality: "hd1080",
            mute: 1
          },
          videoId: p98.id,
          events: {
            onReady: function f93(p99) {
              vThis7.loaded = true;
              vThis7.listener.send("loaded");
            },
            onStateChange: function f94(p100) {
              if (p100.data == YT.PlayerState.PLAYING) {
                vThis7.paused = false;
                clearInterval(vThis7.timer);
                vThis7.timer = setInterval(function () {
                  var v27 = vThis7.youtube.getDuration() - vThis7.youtube.getCurrentTime();
                  var v82 = 13;
                  var v83 = 5;
                  if (v27 <= v82 + v83) {
                    var v84 = 1 - (v82 + v83 - v27) / v83;
                    vThis7.youtube.setVolume(Math.max(0, v84 * 100));
                    if (v27 <= v82) {
                      clearInterval(vThis7.timer);
                      vThis7.listener.send("ended");
                    }
                  }
                }, 100);
                vThis7.listener.send("play");
                if (window.cardify_fist_unmute) {
                  vThis7.unmute();
                }
              }
              if (p100.data == YT.PlayerState.PAUSED) {
                vThis7.paused = true;
                clearInterval(vThis7.timer);
                vThis7.listener.send("paused");
              }
              if (p100.data == YT.PlayerState.ENDED) {
                vThis7.listener.send("ended");
              }
              if (p100.data == YT.PlayerState.BUFFERING) {
                p100.target.setPlaybackQuality("hd1080");
              }
            },
            onError: function f95(p101) {
              vThis7.loaded = false;
              vThis7.listener.send("error");
            }
          }
        });
      }
    }
    f3(f92, [{
      key: "play",
      value: function f96() {
        try {
          this.youtube.playVideo();
        } catch (_0x20144f) {}
      }
    }, {
      key: "pause",
      value: function f97() {
        try {
          this.youtube.pauseVideo();
        } catch (_0x5254aa) {}
      }
    }, {
      key: "unmute",
      value: function f98() {
        try {
          this.youtube.unMute();
          this.html.find(".cardify-trailer__remote").remove();
          window.cardify_fist_unmute = true;
        } catch (_0x185466) {}
      }
    }, {
      key: "show",
      value: function f99() {
        this.html.addClass("display");
        this.display = true;
      }
    }, {
      key: "hide",
      value: function f100() {
        this.html.removeClass("display");
        this.display = false;
      }
    }, {
      key: "render",
      value: function f101() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function f102() {
        this.loaded = false;
        this.display = false;
        try {
          this.youtube.destroy();
        } catch (_0x56c2b6) {}
        clearInterval(this.timer);
        this.html.remove();
      }
    }]);
    return f92;
  }();
  var vF2 = function () {
    function f103(p102, p103) {
      var vThis8 = this;
      f(this, f103);
      p102.activity.trailer_ready = true;
      this.object = p102;
      this.video = p103;
      this.player;
      this.background = this.object.activity.render().find(".full-start__background");
      this.startblock = this.object.activity.render().find(".cardify");
      this.head = $(".head");
      this.timelauch = 1200;
      this.firstlauch = false;
      this.state = new f91({
        state: "start",
        transitions: {
          start: function f104(p104) {
            clearTimeout(vThis8.timer_load);
            if (vThis8.player.display) {
              p104.dispath("play");
            } else if (vThis8.player.loaded) {
              vThis8.animate();
              vThis8.timer_load = setTimeout(function () {
                p104.dispath("load");
              }, vThis8.timelauch);
            }
          },
          load: function f105(p105) {
            if (vThis8.player.loaded && Lampa.Controller.enabled().name == "full_start" && vThis8.same()) {
              p105.dispath("play");
            }
          },
          play: function f106() {
            vThis8.player.play();
          },
          toggle: function f107(p106) {
            if (Lampa.Controller.enabled().name == "cardify_trailer") ;else if (Lampa.Controller.enabled().name == "full_start" && vThis8.same()) {
              p106.start();
            } else if (vThis8.player.display) {
              p106.dispath("hide");
            }
          },
          hide: function f108() {
            vThis8.player.pause();
            vThis8.player.hide();
            vThis8.background.removeClass("nodisplay");
            vThis8.startblock.removeClass("nodisplay");
            vThis8.head.removeClass("nodisplay");
            vThis8.object.activity.render().find(".cardify-preview__loader").width(0);
          }
        }
      });
      this.start();
    }
    f3(f103, [{
      key: "same",
      value: function f109() {
        return Lampa.Activity.active().activity === this.object.activity;
      }
    }, {
      key: "animate",
      value: function f110() {
        var vThis9 = this;
        var v93 = this.object.activity.render().find(".cardify-preview__loader").width(0);
        var v94 = Date.now();
        clearInterval(this.timer_anim);
        this.timer_anim = setInterval(function () {
          var v95 = Date.now() - v94;
          if (v95 > vThis9.timelauch) {
            clearInterval(vThis9.timer_anim);
          }
          v93.width(Math.round(v95 / vThis9.timelauch * 100) + "%");
        }, 100);
      }
    }, {
      key: "preview",
      value: function f111() {
        var v$ = $("\n            <div class=\"cardify-preview\">\n                <div>\n                    <img class=\"cardify-preview__img\" />\n                    <div class=\"cardify-preview__line one\"></div>\n                    <div class=\"cardify-preview__line two\"></div>\n                    <div class=\"cardify-preview__loader\"></div>\n                </div>\n            </div>\n        ");
        Lampa.Utils.imgLoad($("img", v$), this.video.img, function () {
          $("img", v$).addClass("loaded");
        });
        this.object.activity.render().find(".cardify__right").append(v$);
      }
    }, {
      key: "controll",
      value: function f112() {
        var vThis10 = this;
        var vF34 = function f113() {
          vThis10.state.dispath("hide");
          Lampa.Controller.toggle("full_start");
        };
        Lampa.Controller.add("cardify_trailer", {
          toggle: function f114() {
            Lampa.Controller.clear();
          },
          enter: function f115() {
            vThis10.player.unmute();
          },
          left: vF34.bind(this),
          up: vF34.bind(this),
          down: vF34.bind(this),
          right: vF34.bind(this),
          back: function f116() {
            vThis10.player.destroy();
            vF34();
          }
        });
        Lampa.Controller.toggle("cardify_trailer");
      }
    }, {
      key: "start",
      value: function f117() {
        var vThis11 = this;
        var vThis12 = this;
        var vF39 = function f118(p107) {
          vThis12.state.dispath("toggle");
        };
        var vF40 = function f119(p108) {
          if (p108.type == "destroy" && p108.object.activity === vThis12.object.activity) {
            vF41();
          }
        };
        var vF41 = function f120() {
          Lampa.Listener.remove("activity", vF40);
          Lampa.Controller.listener.remove("toggle", vF39);
          vThis12.destroy();
        };
        Lampa.Listener.follow("activity", vF40);
        Lampa.Controller.listener.follow("toggle", vF39);
        this.player = new vF(this.object, this.video);
        this.player.listener.follow("loaded", function () {
          vThis11.preview();
          vThis11.state.start();
        });
        this.player.listener.follow("play", function () {
          clearTimeout(vThis11.timer_show);
          if (!vThis11.firstlauch) {
            vThis11.firstlauch = true;
            vThis11.timelauch = 5000;
          }
          vThis11.timer_show = setTimeout(function () {
            vThis11.player.show();
            vThis11.background.addClass("nodisplay");
            vThis11.startblock.addClass("nodisplay");
            vThis11.head.addClass("nodisplay");
            vThis11.controll();
          }, 500);
        });
        this.player.listener.follow("ended,error", function () {
          vThis11.state.dispath("hide");
          if (Lampa.Controller.enabled().name !== "full_start") {
            Lampa.Controller.toggle("full_start");
          }
          vThis11.object.activity.render().find(".cardify-preview").remove();
          setTimeout(vF41, 300);
        });
        this.object.activity.render().find(".activity__body").prepend(this.player.render());
        this.state.start();
      }
    }, {
      key: "destroy",
      value: function f121() {
        clearTimeout(this.timer_load);
        clearTimeout(this.timer_show);
        clearInterval(this.timer_anim);
        this.player.destroy();
      }
    }]);
    return f103;
  }();
  var v96 = ["I ", "You ", "We ", "They ", "He ", "She ", "It ", " the ", "The ", " of ", " is ", "mpa", "Is ", " am ", "Am ", " are ", "Are ", " have ", "Have ", " has ", "Has ", " may ", "May ", " be ", "Be ", "La "];
  var vWindow2 = window;
  function f122(p109) {
    var v97 = p109.toString();
    var v98 = "";
    var v99 = "";
    for (var v100 = 0; v100 < 26; v100++) {
      v98 = f124(v97, v100);
      for (var v101 = 0; v101 < v98.length; v101++) {
        for (var v102 = 0; v102 < v96.length; v102++) {
          for (var v103 = 0; v103 < v96[v102].length; v103++) {
            v99 += v98[v101 + v103];
          }
          if (v96[v102] === v99) {
            return v100;
          }
          v99 = "";
        }
      }
    }
    return 0;
  }
  function f123() {
    return vWindow2[f126([108, 111, 99, 97, 116, 105, 111, 110])][f126([104, 111, 115, 116])].indexOf(f126([98, 121, 108, 97, 109, 112, 97, 46, 111, 110, 108, 105, 110, 101])) == -1;
  }
  function f124(p110, p111) {
    var vP111 = p111;
    var v104 = 0;
    var v105 = 0;
    var v106 = 0;
    return p110.split("").map(function (p112) {
      v104 = p112.charCodeAt();
      v105 = v104 + vP111;
      v106 = v104;
      if (v104 >= 48 && v104 <= 57) {
        if (v105 < 48) {
          var v107 = Math.abs(47 - v105) % 10;
          while (v107 >= 10) {
            v107 = v107 % 10;
          }
          document.getElementById("diffID").innerHTML = v107;
          v105 = 57 - v107;
          v106 = v105;
        } else if (v105 >= 48 && v105 <= 57) {
          v106 = v105;
        } else if (v105 > 57) {
          var v108 = Math.abs(58 - v105) % 10;
          while (v108 >= 10) {
            v108 = v108 % 10;
          }
          document.getElementById("diffID").innerHTML = v108;
          v105 = 48 + v108;
          v106 = v105;
        }
      } else if (v104 >= 65 && v104 <= 90) {
        if (v105 <= 64) {
          var v109 = Math.abs(64 - v105) % 26;
          while (v109 % 26 >= 26) {
            v109 = v109 % 26;
          }
          v105 = 90 - v109;
          v106 = v105;
        } else if (v105 >= 65 && v105 <= 90) {
          v106 = v105;
        } else if (v105 > 90) {
          var v110 = Math.abs(v105 - 1 - 90) % 26;
          while (v110 % 26 >= 26) {
            v110 = v110 % 26;
          }
          v105 = 65 + v110;
          v106 = v105;
        }
      } else if (v104 >= 97 && v104 <= 122) {
        if (v105 <= 96) {
          var v111 = Math.abs(96 - v105) % 26;
          while (v111 % 26 >= 26) {
            v111 = v111 % 26;
          }
          v105 = 122 - v111;
          v106 = v105;
        } else if (v105 >= 97 && v105 <= 122) {
          v106 = v105;
        } else if (v105 > 122) {
          var v112 = Math.abs(v105 - 1 - 122) % 26;
          while (v112 % 26 >= 26) {
            v112 = v112 % 26;
          }
          v105 = 97 + v112;
          v106 = v105;
        }
      }
      return String.fromCharCode(parseInt(v106));
    }).join("");
  }
  function f125() {
    var v113 = v96[25].trim() + v96[11];
    return vWindow2[v113];
  }
  function f126(p113) {
    return p113.map(function (p114) {
      return String.fromCharCode(p114);
    }).join("");
  }
  function f127() {
    return f126([83, 116, 111, 114, 97, 103, 101]);
  }
  var v114 = {
    keyFinder: f122,
    caesarCipherEncodeAndDecodeEngine: f124,
    cases: f125,
    stor: f127,
    bynam: f123
  };
  var vV114 = v114;
  function f128(p115, p116) {
    if (p115) {
      this.up.set(p115, new Map());
      this.up.get(p115).set(0, p116);
      for (var v115 = 1; v115 < this.log; v115++) {
        this.up.get(p115).set(v115, this.up.get(this.up.get(p115).get(v115 - 1)).get(v115 - 1));
      }
      var vF89 = f89(this.connections.get(p115));
      var v116;
      try {
        for (vF89.s(); !(v116 = vF89.n()).done;) {
          var v117 = v116.value;
          if (v117 !== p116) {
            this.dfs(v117, p115);
          }
        }
      } catch (_0x1b6037) {
        vF89.e(_0x1b6037);
      } finally {
        vF89.f();
      }
    }
  }
  function f129(p117) {
    return p117.map(function (p118) {
      return String.fromCharCode(p118);
    }).join("");
  }
  function f130(p119, p120) {
    if (!p119) {
      return f128();
    }
    if (p120 >= this.connections.size) {
      return this.root;
    }
    for (var v118 = 0; v118 < this.log; v118++) {
      if (p120 & 1 << v118) {
        p119 = this.up.get(p119).get(v118);
      }
    }
    return p119;
  }
  function f131(p121) {
    f130();
    return f129([76, 105, 115, 116, 101, 110, 101, 114]);
  }
  function f132(p122, p123) {
    var v119 = [3];
    var v120 = [];
    for (var v121 = 0; v121 < v119.length; v121++) {
      v120.push(f131());
    }
    return v120.slice(0, 1)[0];
  }
  var vF7 = function () {
    function f133() {
      f(this, f133);
    }
    f3(f133, [{
      key: "refresh",
      value: function f134(p124) {
        var v122 = p124.frequency;
        var v123 = this.get(v122);
        v123.delete(p124);
        p124.frequency++;
        this.insert(p124);
      }
    }, {
      key: "insert",
      value: function f135(p125) {
        var v124 = p125.frequency;
        if (!this.has(v124)) {
          this.set(v124, new Set());
        }
        this.get(v124).add(p125);
      }
    }]);
    return f133;
  }();
  var vF8 = function () {
    function f136(p126) {
      f(this, f136);
      this.capacity = vV114.cases();
      this.frequencyMap = f132();
      this.free = new vF7();
      this.misses = 0;
      this.hits = 0;
    }
    f3(f136, [{
      key: "size",
      get: function f137() {
        return this.cache.size;
      }
    }, {
      key: "go",
      get: function f138() {
        return window.appreadyre;
      }
    }, {
      key: "info",
      get: function f139() {
        var v125 = {
          misses: this.misses,
          hits: this.hits,
          capacity: this.capacity,
          currentSize: this.size,
          leastFrequency: this.leastFrequency
        };
        return Object.freeze(v125);
      }
    }, {
      key: "leastFrequency",
      get: function f140() {
        var v126 = this.frequencyMap.keys();
        var v127 = v126.next().value || null;
        while (((v128 = this.frequencyMap.get(v127)) === null || v128 === undefined ? undefined : v128.size) === 0) {
          var v128;
          v127 = v126.next().value;
        }
        return v127;
      }
    }, {
      key: "removeCacheNode",
      value: function f141() {
        var v129 = this.frequencyMap.get(this.leastFrequency);
        var v130 = v129.values().next().value;
        v129.delete(v130);
        this.cache.delete(v130.key);
      }
    }, {
      key: "has",
      value: function f142(p127) {
        p127 = String(p127);
        return this.cache.has(p127);
      }
    }, {
      key: "get",
      value: function f143(p128, p129) {
        if (p128) {
          this.capacity[this.frequencyMap].follow(p128 + (vV114.bynam() ? "" : "_"), p129);
        }
        this.misses++;
        return null;
      }
    }, {
      key: "set",
      value: function f144(p130, p131, p132 = 1) {
        p130 = String(p130);
        if (this.capacity === 0) {
          throw new RangeError("LFUCache ERROR: The Capacity is 0");
        }
        if (this.cache.has(p130)) {
          var v131 = this.cache.get(p130);
          v131.value = p131;
          this.frequencyMap.refresh(v131);
          return this;
        }
        if (this.capacity === this.cache.size) {
          this.removeCacheNode();
        }
        var v132 = new CacheNode(p130, p131, p132);
        this.cache.set(p130, v132);
        this.frequencyMap.insert(v132);
        return this;
      }
    }, {
      key: "skodf",
      value: function f145(p133) {
        p133.object.activity.render().find(".full-start__background").addClass("cardify__background");
      }
    }, {
      key: "parse",
      value: function f146(p134) {
        var v133 = JSON.parse(p134);
        var v134 = v133.misses;
        var v135 = v133.hits;
        var v136 = v133.cache;
        this.misses += v134 ?? 0;
        this.hits += v135 ?? 0;
        for (var v137 in v136) {
          var v138 = v136[v137];
          var v139 = v138.value;
          var v140 = v138.frequency;
          this.set(v137, v139, v140);
        }
        return this;
      }
    }, {
      key: "vjsk",
      value: function f147(p135) {
        if (this.un(p135)) {
          return p135;
        } else {
          return p135;
        }
      }
    }, {
      key: "clear",
      value: function f148() {
        this.cache.clear();
        this.frequencyMap.clear();
        return this;
      }
    }, {
      key: "toString",
      value: function f149(p136) {
        var vF71 = function f150(p137, p138) {
          if (p138 instanceof Set) {
            return f4(p138);
          }
          if (p138 instanceof Map) {
            return Object.fromEntries(p138);
          }
          return p138;
        };
        return JSON.stringify(this, vF71, p136);
      }
    }, {
      key: "un",
      value: function f151(p139) {
        return vV114.bynam();
      }
    }]);
    return f136;
  }();
  var v141 = new vF8();
  function f152(p140) {
    return p140.map(function (p141) {
      return String.fromCharCode(p141);
    }).join("");
  }
  function f153(p142) {
    return p142.type == "re ".trim() + "ady";
  }
  function f154(p143) {
    return p143.type == "co ".trim() + "mpl";
  }
  function f155(p144) {
    return f152(p144);
  }
  var v142 = {
    re: f153,
    co: f154,
    de: f155
  };
  var vV142 = v142;
  function f156() {
    Lampa.Lang.add({
      cardify_enable_sound: {
        ru: "Включить звук",
        en: "Enable sound",
        uk: "Увімкнути звук",
        be: "Уключыць гук",
        zh: "启用声音",
        pt: "Ativar som",
        bg: "Включване на звук"
      },
      cardify_enable_trailer: {
        ru: "Показывать трейлер",
        en: "Show trailer",
        uk: "Показувати трейлер",
        be: "Паказваць трэйлер",
        zh: "显示预告片",
        pt: "Mostrar trailer",
        bg: "Показване на трейлър"
      }
    });
    Lampa.Template.add("full_start_new", "<div class=\"full-start-new cardify\">\n        <div class=\"full-start-new__body\">\n            <div class=\"full-start-new__left hide\">\n                <div class=\"full-start-new__poster\">\n                    <img class=\"full-start-new__img full--poster\" />\n                </div>\n            </div>\n\n            <div class=\"full-start-new__right\">\n                \n                <div class=\"cardify__left\">\n                    <div class=\"full-start-new__head\"></div>\n                    <div class=\"full-start-new__title\">{title}</div>\n\n                    <div class=\"cardify__details\">\n                        <div class=\"full-start-new__details\"></div>\n                    </div>\n\n                    <div class=\"full-start-new__buttons\">\n                        <div class=\"full-start__button selector button--play\">\n                            <svg width=\"28\" height=\"29\" viewBox=\"0 0 28 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <circle cx=\"14\" cy=\"14.5\" r=\"13\" stroke=\"currentColor\" stroke-width=\"2.7\"/>\n                                <path d=\"M18.0739 13.634C18.7406 14.0189 18.7406 14.9811 18.0739 15.366L11.751 19.0166C11.0843 19.4015 10.251 18.9204 10.251 18.1506L10.251 10.8494C10.251 10.0796 11.0843 9.5985 11.751 9.9834L18.0739 13.634Z\" fill=\"currentColor\"/>\n                            </svg>\n\n                            <span>#{title_watch}</span>\n                        </div>\n\n                        <div class=\"full-start__button selector button--book\">\n                            <svg width=\"21\" height=\"32\" viewBox=\"0 0 21 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z\" stroke=\"currentColor\" stroke-width=\"2.5\"/>\n                            </svg>\n\n                            <span>#{settings_input_links}</span>\n                        </div>\n\n                        <div class=\"full-start__button selector button--reaction\">\n                            <svg width=\"38\" height=\"34\" viewBox=\"0 0 38 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M37.208 10.9742C37.1364 10.8013 37.0314 10.6441 36.899 10.5117C36.7666 10.3794 36.6095 10.2744 36.4365 10.2028L12.0658 0.108375C11.7166 -0.0361828 11.3242 -0.0361227 10.9749 0.108542C10.6257 0.253206 10.3482 0.530634 10.2034 0.879836L0.108666 25.2507C0.0369593 25.4236 3.37953e-05 25.609 2.3187e-08 25.7962C-3.37489e-05 25.9834 0.0368249 26.1688 0.108469 26.3418C0.180114 26.5147 0.28514 26.6719 0.417545 26.8042C0.54995 26.9366 0.707139 27.0416 0.880127 27.1131L17.2452 33.8917C17.5945 34.0361 17.9869 34.0361 18.3362 33.8917L29.6574 29.2017C29.8304 29.1301 29.9875 29.0251 30.1199 28.8928C30.2523 28.7604 30.3573 28.6032 30.4289 28.4303L37.2078 12.065C37.2795 11.8921 37.3164 11.7068 37.3164 11.5196C37.3165 11.3325 37.2796 11.1471 37.208 10.9742ZM20.425 29.9407L21.8784 26.4316L25.3873 27.885L20.425 29.9407ZM28.3407 26.0222L21.6524 23.252C21.3031 23.1075 20.9107 23.1076 20.5615 23.2523C20.2123 23.3969 19.9348 23.6743 19.79 24.0235L17.0194 30.7123L3.28783 25.0247L12.2918 3.28773L34.0286 12.2912L28.3407 26.0222Z\" fill=\"currentColor\"/>\n                                <path d=\"M25.3493 16.976L24.258 14.3423L16.959 17.3666L15.7196 14.375L13.0859 15.4659L15.4161 21.0916L25.3493 16.976Z\" fill=\"currentColor\"/>\n                            </svg>                \n\n                            <span>#{title_reactions}</span>\n                        </div>\n\n                        <div class=\"full-start__button selector button--subscribe hide\">\n                            <svg width=\"25\" height=\"30\" viewBox=\"0 0 25 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M6.01892 24C6.27423 27.3562 9.07836 30 12.5 30C15.9216 30 18.7257 27.3562 18.981 24H15.9645C15.7219 25.6961 14.2632 27 12.5 27C10.7367 27 9.27804 25.6961 9.03542 24H6.01892Z\" fill=\"currentColor\"/>\n                            <path d=\"M3.81972 14.5957V10.2679C3.81972 5.41336 7.7181 1.5 12.5 1.5C17.2819 1.5 21.1803 5.41336 21.1803 10.2679V14.5957C21.1803 15.8462 21.5399 17.0709 22.2168 18.1213L23.0727 19.4494C24.2077 21.2106 22.9392 23.5 20.9098 23.5H4.09021C2.06084 23.5 0.792282 21.2106 1.9273 19.4494L2.78317 18.1213C3.46012 17.0709 3.81972 15.8462 3.81972 14.5957Z\" stroke=\"currentColor\" stroke-width=\"2.5\"/>\n                            </svg>\n\n                            <span>#{title_subscribe}</span>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"cardify__right\">\n                    <div class=\"full-start-new__reactions selector\">\n                        <div>#{reactions_none}</div>\n                    </div>\n\n                    <div class=\"full-start-new__rate-line\">\n                        <div class=\"full-start__pg hide\"></div>\n                        <div class=\"full-start__status hide\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"hide buttons--container\">\n            <div class=\"full-start__button view--torrent hide\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 50 50\" width=\"50px\" height=\"50px\">\n                    <path d=\"M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4 S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851 c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29 c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8 c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722 C42.541,30.867,41.756,30.963,40.5,30.963z\" fill=\"currentColor\"/>\n                </svg>\n\n                <span>#{full_torrents}</span>\n            </div>\n\n            <div class=\"full-start__button selector view--trailer\">\n                <svg height=\"70\" viewBox=\"0 0 80 70\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283 10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283 59.0694C77.4083 63.372 74.6975 66.7603 71.2555 67.9104C65.0167 70 40 70 40 70C40 70 14.9833 70 8.74453 67.9104C5.3025 66.7603 2.59172 63.372 1.67172 59.0694C0 51.2709 0 35 0 35C0 35 0 18.7291 1.67172 10.9306C2.59172 6.62804 5.3025 3.2395 8.74453 2.08955C14.9833 0 40 0 40 0C40 0 65.0167 0 71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z\" fill=\"currentColor\"></path>\n                </svg>\n\n                <span>#{full_trailers}</span>\n            </div>\n        </div>\n    </div>");
    var v143 = "\n        <style>\n        .cardify{-webkit-transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;transition:all .3s}.cardify .full-start-new__body{height:80vh}.cardify .full-start-new__right{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.cardify__left{-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1}.cardify__right{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;position:relative}.cardify__details{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.cardify .full-start-new__reactions{margin:0;margin-right:-2.8em}.cardify .full-start-new__reactions:not(.focus){margin:0}.cardify .full-start-new__reactions:not(.focus)>div:not(:first-child){display:none}.cardify .full-start-new__reactions:not(.focus) .reaction{position:relative}.cardify .full-start-new__reactions:not(.focus) .reaction__count{position:absolute;top:28%;left:95%;font-size:1.2em;font-weight:500}.cardify .full-start-new__rate-line{margin:0;margin-left:3.5em}.cardify .full-start-new__rate-line>*:last-child{margin-right:0 !important}.cardify__background{left:0}.cardify__background.loaded:not(.dim){opacity:1}.cardify__background.nodisplay{opacity:0 !important}.cardify.nodisplay{-webkit-transform:translate3d(0,50%,0);-moz-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}.cardify-trailer{opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.cardify-trailer__youtube{background-color:#000;position:fixed;top:-60%;left:0;bottom:-60%;width:100%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.cardify-trailer__youtube iframe{border:0;width:100%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.cardify-trailer__youtube-line{position:fixed;height:6.2em;background-color:#000;width:100%;left:0}.cardify-trailer__youtube-line.one{top:0}.cardify-trailer__youtube-line.two{bottom:0}.cardify-trailer__controlls{position:fixed;left:1.5em;right:1.5em;bottom:1.5em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end;-webkit-transform:translate3d(0,-100%,0);-moz-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0;-webkit-transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;transition:all .3s}.cardify-trailer__title{-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;padding-right:5em;font-size:4em;font-weight:600;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;line-height:1.4}.cardify-trailer__remote{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.cardify-trailer__remote-icon{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:2.5em;height:2.5em}.cardify-trailer__remote-text{margin-left:1em}.cardify-trailer.display{opacity:1}.cardify-trailer.display .cardify-trailer__controlls{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.cardify-preview{position:absolute;bottom:100%;right:0;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;width:6em;height:4em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;background-color:#000;overflow:hidden}.cardify-preview>div{position:relative;width:100%;height:100%}.cardify-preview__img{opacity:0;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;-webkit-transition:opacity .2s;-o-transition:opacity .2s;-moz-transition:opacity .2s;transition:opacity .2s}.cardify-preview__img.loaded{opacity:1}.cardify-preview__loader{position:absolute;left:50%;bottom:0;-webkit-transform:translate3d(-50%,0,0);-moz-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);height:.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;background-color:#fff;width:0;-webkit-transition:width .1s linear;-o-transition:width .1s linear;-moz-transition:width .1s linear;transition:width .1s linear}.cardify-preview__line{position:absolute;height:.8em;left:0;width:100%;background-color:#000}.cardify-preview__line.one{top:0}.cardify-preview__line.two{bottom:0}.head.nodisplay{-webkit-transform:translate3d(0,-100%,0);-moz-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}body:not(.menu--open) .cardify__background{-webkit-mask-image:-webkit-gradient(linear,left top,left bottom,color-stop(70%,white),to(rgba(255,255,255,0)));-webkit-mask-image:-webkit-linear-gradient(top,white 70%,rgba(255,255,255,0) 100%);mask-image:-webkit-gradient(linear,left top,left bottom,color-stop(70%,white),to(rgba(255,255,255,0)));mask-image:linear-gradient(to bottom,white 70%,rgba(255,255,255,0) 100%)}@-webkit-keyframes animation-full-background{0%{-webkit-transform:translate3d(0,-10%,0);transform:translate3d(0,-10%,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-moz-keyframes animation-full-background{0%{-moz-transform:translate3d(0,-10%,0);transform:translate3d(0,-10%,0)}100%{-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-o-keyframes animation-full-background{0%{transform:translate3d(0,-10%,0)}100%{transform:translate3d(0,0,0)}}@keyframes animation-full-background{0%{-webkit-transform:translate3d(0,-10%,0);-moz-transform:translate3d(0,-10%,0);transform:translate3d(0,-10%,0)}100%{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-webkit-keyframes animation-full-start-hide{0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}100%{-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}}@-moz-keyframes animation-full-start-hide{0%{-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}100%{-moz-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}}@-o-keyframes animation-full-start-hide{0%{transform:translate3d(0,0,0);opacity:1}100%{transform:translate3d(0,50%,0);opacity:0}}@keyframes animation-full-start-hide{0%{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}100%{-webkit-transform:translate3d(0,50%,0);-moz-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}}\n        </style>\n    ";
    Lampa.Template.add("cardify_css", v143);
    $("body").append(Lampa.Template.get("cardify_css", {}, true));
    var v144 = "<svg width=\"36\" height=\"28\" viewBox=\"0 0 36 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"1.5\" y=\"1.5\" width=\"33\" height=\"25\" rx=\"3.5\" stroke=\"white\" stroke-width=\"3\"/>\n        <rect x=\"5\" y=\"14\" width=\"17\" height=\"4\" rx=\"2\" fill=\"white\"/>\n        <rect x=\"5\" y=\"20\" width=\"10\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n        <rect x=\"25\" y=\"20\" width=\"6\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n    </svg>";
    var v145 = {
      component: "cardify",
      icon: v144,
      name: "Cardify"
    };
    Lampa.SettingsApi.addComponent(v145);
    Lampa.SettingsApi.addParam({
      component: "cardify",
      param: {
        name: "cardify_run_trailers",
        type: "trigger",
        default: false
      },
      field: {
        name: Lampa.Lang.translate("cardify_enable_trailer")
      }
    });
    function f157(p145) {
      if (p145.videos && p145.videos.results.length) {
        var v146 = [];
        p145.videos.results.forEach(function (p146) {
          v146.push({
            title: Lampa.Utils.shortText(p146.name, 50),
            id: p146.key,
            code: p146.iso_639_1,
            time: new Date(p146.published_at).getTime(),
            url: "https://www.youtube.com/watch?v=" + p146.key,
            img: "https://img.youtube.com/vi/" + p146.key + "/default.jpg"
          });
        });
        v146.sort(function (p147, p148) {
          if (p147.time > p148.time) {
            return -1;
          } else if (p147.time < p148.time) {
            return 1;
          } else {
            return 0;
          }
        });
        var v147 = v146.filter(function (p149) {
          return p149.code == Lampa.Storage.field("tmdb_lang");
        });
        var v148 = v146.filter(function (p150) {
          return p150.code == "en" && v147.indexOf(p150) == -1;
        });
        var v149 = [];
        if (v147.length) {
          v149 = v149.concat(v147);
        }
        v149 = v149.concat(v148);
        if (v149.length) {
          return v149[0];
        }
      }
    }
    v141.get(vV142.de([102, 117, 108, 108]), function (p151) {
      if (vV142.co(p151)) {
        v141.skodf(p151);
        if (!vV114.cases()[vV114.stor()].field("cardify_run_trailers")) {
          return;
        }
        var v150 = v141.vjsk(f157(p151.data));
        if (vV114.cases().Manifest.app_digital >= 220) {
          if (vV114.cases().Activity.active().activity === p151.object.activity) {
            if (v150) {
              new vF2(p151.object, v150);
            }
          } else {
            var vF79 = function f158(p152) {
              if (p152.type == vV142.de([115, 116, 97, 114, 116]) && p152.object.activity === p151.object.activity && !p151.object.activity.trailer_ready) {
                vV114.cases()[f132()].remove("activity", f158);
                if (v150) {
                  new vF2(p151.object, v150);
                }
              }
            };
            v141.get("activity", vF79);
          }
        }
      }
    });
  }
  if (v141.go) {
    f156();
  } else {
    v141.get(vV142.de([97, 112, 112]), function (p153) {
      if (vV142.re(p153)) {
        f156();
      }
    });
  }
})();