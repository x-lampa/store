//Lampa.Start
(function () {
  "use strict";
  function f(p5, p6) {
    if (!(p5 instanceof p6)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function f2(p7, p8) {
    for (var v7 = 0; v7 < p8.length; v7++) {
      var v8 = p8[v7];
      v8.enumerable = v8.enumerable || false;
      v8.configurable = true;
      if ("value" in v8) {
        v8.writable = true;
      }
      Object.defineProperty(p7, v8.key, v8);
    }
  }
  function f3(p9, p10, p11) {
    if (p10) {
      f2(p9.prototype, p10);
    }
    if (p11) {
      f2(p9, p11);
    }
    return p9;
  }
  function f4(p12) {
    if (Array.isArray(p12)) {
      return f7(p12);
    }
  }
  function f5(p13) {
    if (typeof Symbol !== "undefined" && p13[Symbol.iterator] != null || p13["@@iterator"] != null) {
      return Array.from(p13);
    }
  }
  function f6(p14, p15) {
    if (!p14) {
      return;
    }
    if (typeof p14 === "string") {
      return f7(p14, p15);
    }
    var v9 = Object.prototype.toString.call(p14).slice(8, -1);
    if (v9 === "Object" && p14.constructor) {
      v9 = p14.constructor.name;
    }
    if (v9 === "Map" || v9 === "Set") {
      return Array.from(p14);
    }
    if (v9 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(v9)) {
      return f7(p14, p15);
    }
  }
  function f7(p16, p17) {
    if (p17 == null || p17 > p16.length) {
      p17 = p16.length;
    }
    var v10 = 0;
    var v11 = new Array(p17);
    for (; v10 < p17; v10++) {
      v11[v10] = p16[v10];
    }
    return v11;
  }
  function f8() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function f9(p18, p19) {
    var v12 = typeof Symbol !== "undefined" && p18[Symbol.iterator] || p18["@@iterator"];
    if (!v12) {
      if (Array.isArray(p18) || (v12 = f6(p18)) || p19 && p18 && typeof p18.length === "number") {
        if (v12) {
          p18 = v12;
        }
        var v13 = 0;
        function f10() {}
        return {
          s: f10,
          n: function () {
            var v14 = {
              done: true
            };
            if (v13 >= p18.length) {
              return v14;
            }
            var v15 = {
              done: false,
              value: p18[v13++]
            };
            return v15;
          },
          e: function (p20) {
            throw p20;
          },
          f: f10
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var v16 = true;
    var v17 = false;
    var v18;
    return {
      s: function () {
        v12 = v12.call(p18);
      },
      n: function () {
        var v19 = v12.next();
        v16 = v19.done;
        return v19;
      },
      e: function (p21) {
        v17 = true;
        v18 = p21;
      },
      f: function () {
        try {
          if (!v16 && v12.return != null) {
            v12.return();
          }
        } finally {
          if (v17) {
            throw v18;
          }
        }
      }
    };
  }
  function f11(p22) {
    this.state = p22.state;
    this.start = function () {
      this.dispath(this.state);
    };
    this.dispath = function (p23) {
      var v20 = p22.transitions[p23];
      if (v20) {
        v20.call(this, this);
      } else {
        console.log("invalid action");
      }
    };
  }
  var vF3 = function () {
    function f12(p24, p25) {
      var vThis = this;
      f(this, f12);
      this.paused = false;
      this.display = false;
      this.ended = false;
      this.listener = Lampa.Subscribe();
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
          videoId: p25.id,
          events: {
            onReady: function f13(p26) {
              vThis.loaded = true;
              vThis.listener.send("loaded");
            },
            onStateChange: function f14(p27) {
              if (p27.data == YT.PlayerState.PLAYING) {
                vThis.paused = false;
                clearInterval(vThis.timer);
                vThis.timer = setInterval(function () {
                  var v28 = vThis.youtube.getDuration() - vThis.youtube.getCurrentTime();
                  if (v28 <= 18) {
                    var v29 = 1 - (18 - v28) / 5;
                    vThis.youtube.setVolume(Math.max(0, v29 * 100));
                    if (v28 <= 13) {
                      clearInterval(vThis.timer);
                      vThis.listener.send("ended");
                    }
                  }
                }, 100);
                vThis.listener.send("play");
                if (window.cardify_fist_unmute) {
                  vThis.unmute();
                }
              }
              if (p27.data == YT.PlayerState.PAUSED) {
                vThis.paused = true;
                clearInterval(vThis.timer);
                vThis.listener.send("paused");
              }
              if (p27.data == YT.PlayerState.ENDED) {
                vThis.listener.send("ended");
              }
              if (p27.data == YT.PlayerState.BUFFERING) {
                p27.target.setPlaybackQuality("hd1080");
              }
            },
            onError: function f15(p28) {
              vThis.loaded = false;
              vThis.listener.send("error");
            }
          }
        });
      }
    }
    f3(f12, [{
      key: "play",
      value: function f16() {
        try {
          this.youtube.playVideo();
        } catch (_0x20144f) {}
      }
    }, {
      key: "pause",
      value: function f17() {
        try {
          this.youtube.pauseVideo();
        } catch (_0x5254aa) {}
      }
    }, {
      key: "unmute",
      value: function f18() {
        try {
          this.youtube.unMute();
          this.html.find(".cardify-trailer__remote").remove();
          window.cardify_fist_unmute = true;
        } catch (_0x185466) {}
      }
    }, {
      key: "show",
      value: function f19() {
        this.html.addClass("display");
        this.display = true;
      }
    }, {
      key: "hide",
      value: function f20() {
        this.html.removeClass("display");
        this.display = false;
      }
    }, {
      key: "render",
      value: function f21() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function f22() {
        this.loaded = false;
        this.display = false;
        try {
          this.youtube.destroy();
        } catch (_0x56c2b6) {}
        clearInterval(this.timer);
        this.html.remove();
      }
    }]);
    return f12;
  }();
  var vF4 = function () {
    function f23(p29, p30) {
      var vThis2 = this;
      f(this, f23);
      p29.activity.trailer_ready = true;
      this.object = p29;
      this.video = p30;
      this.player;
      this.background = this.object.activity.render().find(".full-start__background");
      this.startblock = this.object.activity.render().find(".cardify");
      this.head = $(".head");
      this.timelauch = 1200;
      this.firstlauch = false;
      this.state = new f11({
        state: "start",
        transitions: {
          start: function f24(p31) {
            clearTimeout(vThis2.timer_load);
            if (vThis2.player.display) {
              p31.dispath("play");
            } else if (vThis2.player.loaded) {
              vThis2.animate();
              vThis2.timer_load = setTimeout(function () {
                p31.dispath("load");
              }, vThis2.timelauch);
            }
          },
          load: function f25(p32) {
            if (vThis2.player.loaded && Lampa.Controller.enabled().name == "full_start" && vThis2.same()) {
              p32.dispath("play");
            }
          },
          play: function f26() {
            vThis2.player.play();
          },
          toggle: function f27(p33) {
            if (Lampa.Controller.enabled().name == "cardify_trailer") {
              ;
            } else if (Lampa.Controller.enabled().name == "full_start" && vThis2.same()) {
              p33.start();
            } else if (vThis2.player.display) {
              p33.dispath("hide");
            }
          },
          hide: function f28() {
            vThis2.player.pause();
            vThis2.player.hide();
            vThis2.background.removeClass("nodisplay");
            vThis2.startblock.removeClass("nodisplay");
            vThis2.head.removeClass("nodisplay");
            vThis2.object.activity.render().find(".cardify-preview__loader").width(0);
          }
        }
      });
      this.start();
    }
    f3(f23, [{
      key: "same",
      value: function f29() {
        return Lampa.Activity.active().activity === this.object.activity;
      }
    }, {
      key: "animate",
      value: function f30() {
        var vThis3 = this;
        var v30 = this.object.activity.render().find(".cardify-preview__loader").width(0);
        var v31 = Date.now();
        clearInterval(this.timer_anim);
        this.timer_anim = setInterval(function () {
          var v32 = Date.now() - v31;
          if (v32 > vThis3.timelauch) {
            clearInterval(vThis3.timer_anim);
          }
          v30.width(Math.round(v32 / vThis3.timelauch * 100) + "%");
        }, 100);
      }
    }, {
      key: "preview",
      value: function f31() {
        var v$ = $("\n            <div class=\"cardify-preview\">\n                <div>\n                    <img class=\"cardify-preview__img\" />\n                    <div class=\"cardify-preview__line one\"></div>\n                    <div class=\"cardify-preview__line two\"></div>\n                    <div class=\"cardify-preview__loader\"></div>\n                </div>\n            </div>\n        ");
        Lampa.Utils.imgLoad($("img", v$), this.video.img, function () {
          $("img", v$).addClass("loaded");
        });
        this.object.activity.render().find(".cardify__right").append(v$);
      }
    }, {
      key: "controll",
      value: function f32() {
        var vThis4 = this;
        var v_0x44193a = function f33() {
          vThis4.state.dispath("hide");
          Lampa.Controller.toggle("full_start");
        };
        Lampa.Controller.add("cardify_trailer", {
          toggle: function f34() {
            Lampa.Controller.clear();
          },
          enter: function f35() {
            vThis4.player.unmute();
          },
          left: v_0x44193a.bind(this),
          up: v_0x44193a.bind(this),
          down: v_0x44193a.bind(this),
          right: v_0x44193a.bind(this),
          back: function f36() {
            vThis4.player.destroy();
            v_0x44193a();
          }
        });
        Lampa.Controller.toggle("cardify_trailer");
      }
    }, {
      key: "start",
      value: function f37() {
        var vThis5 = this;
        var vThis6 = this;
        var v_0x2b4908 = function f38(p34) {
          vThis6.state.dispath("toggle");
        };
        var v_0x209c96 = function f39(p35) {
          if (p35.type == "destroy" && p35.object.activity === vThis6.object.activity) {
            v_0x53e75b();
          }
        };
        var v_0x53e75b = function f40() {
          Lampa.Listener.remove("activity", v_0x209c96);
          Lampa.Controller.listener.remove("toggle", v_0x2b4908);
          vThis6.destroy();
        };
        Lampa.Listener.follow("activity", v_0x209c96);
        Lampa.Controller.listener.follow("toggle", v_0x2b4908);
        this.player = new vF3(this.object, this.video);
        this.player.listener.follow("loaded", function () {
          vThis5.preview();
          vThis5.state.start();
        });
        this.player.listener.follow("play", function () {
          clearTimeout(vThis5.timer_show);
          if (!vThis5.firstlauch) {
            vThis5.firstlauch = true;
            vThis5.timelauch = 5000;
          }
          vThis5.timer_show = setTimeout(function () {
            vThis5.player.show();
            vThis5.background.addClass("nodisplay");
            vThis5.startblock.addClass("nodisplay");
            vThis5.head.addClass("nodisplay");
            vThis5.controll();
          }, 500);
        });
        this.player.listener.follow("ended,error", function () {
          vThis5.state.dispath("hide");
          if (Lampa.Controller.enabled().name !== "full_start") {
            Lampa.Controller.toggle("full_start");
          }
          vThis5.object.activity.render().find(".cardify-preview").remove();
          setTimeout(v_0x53e75b, 300);
        });
        this.object.activity.render().find(".activity__body").prepend(this.player.render());
        this.state.start();
      }
    }, {
      key: "destroy",
      value: function f41() {
        clearTimeout(this.timer_load);
        clearTimeout(this.timer_show);
        clearInterval(this.timer_anim);
        this.player.destroy();
      }
    }]);
    return f23;
  }();
  var v33 = ["I ", "You ", "We ", "They ", "He ", "She ", "It ", " the ", "The ", " of ", " is ", "mpa", "Is ", " am ", "Am ", " are ", "Are ", " have ", "Have ", " has ", "Has ", " may ", "May ", " be ", "Be ", "La "];
  function f42(p36) {
    var v34 = p36.toString();
    var v35 = "";
    var v36 = "";
    for (var v37 = 0; v37 < 26; v37++) {
      v35 = f44(v34, v37);
      for (var v38 = 0; v38 < v35.length; v38++) {
        for (var v39 = 0; v39 < v33.length; v39++) {
          for (var v40 = 0; v40 < v33[v39].length; v40++) {
            v36 += v35[v38 + v40];
          }
          if (v33[v39] === v36) {
            return v37;
          }
          v36 = "";
        }
      }
    }
    return 0;
  }
  function f43() {
    return window[f46([108, 111, 99, 97, 116, 105, 111, 110])][f46([104, 111, 115, 116])].indexOf(f46([98, 121, 108, 97, 109, 112, 97, 46, 111, 110, 108, 105, 110, 101])) == -1;
  }
  function f44(p37, p38) {
    var v41 = 0;
    var v42 = 0;
    var v43 = 0;
    return p37.split("").map(function (p39) {
      v41 = p39.charCodeAt();
      v42 = v41 + p38;
      v43 = v41;
      if (v41 >= 48 && v41 <= 57) {
        if (v42 < 48) {
          var v44 = Math.abs(47 - v42) % 10;
          while (v44 >= 10) {
            v44 = v44 % 10;
          }
          document.getElementById("diffID").innerHTML = v44;
          v42 = 57 - v44;
          v43 = v42;
        } else if (v42 >= 48 && v42 <= 57) {
          v43 = v42;
        } else if (v42 > 57) {
          var v45 = Math.abs(58 - v42) % 10;
          while (v45 >= 10) {
            v45 = v45 % 10;
          }
          document.getElementById("diffID").innerHTML = v45;
          v42 = 48 + v45;
          v43 = v42;
        }
      } else if (v41 >= 65 && v41 <= 90) {
        if (v42 <= 64) {
          var v46 = Math.abs(64 - v42) % 26;
          while (v46 % 26 >= 26) {
            v46 = v46 % 26;
          }
          v42 = 90 - v46;
          v43 = v42;
        } else if (v42 >= 65 && v42 <= 90) {
          v43 = v42;
        } else if (v42 > 90) {
          var v47 = Math.abs(v42 - 1 - 90) % 26;
          while (v47 % 26 >= 26) {
            v47 = v47 % 26;
          }
          v42 = 65 + v47;
          v43 = v42;
        }
      } else if (v41 >= 97 && v41 <= 122) {
        if (v42 <= 96) {
          var v48 = Math.abs(96 - v42) % 26;
          while (v48 % 26 >= 26) {
            v48 = v48 % 26;
          }
          v42 = 122 - v48;
          v43 = v42;
        } else if (v42 >= 97 && v42 <= 122) {
          v43 = v42;
        } else if (v42 > 122) {
          var v49 = Math.abs(v42 - 1 - 122) % 26;
          while (v49 % 26 >= 26) {
            v49 = v49 % 26;
          }
          v42 = 97 + v49;
          v43 = v42;
        }
      }
      return String.fromCharCode(parseInt(v43));
    }).join("");
  }
  function f45() {
    var v50 = v33[25].trim() + v33[11];
    return window[v50];
  }
  function f46(p40) {
    return p40.map(function (p41) {
      return String.fromCharCode(p41);
    }).join("");
  }
  function f47() {
    return f46([83, 116, 111, 114, 97, 103, 101]);
  }
  var v51 = {
    keyFinder: f42,
    caesarCipherEncodeAndDecodeEngine: f44,
    cases: f45
  };
  v51.stor = f47;
  v51.bynam = f43;
  function f48(p42, p43) {
    if (p42) {
      this.up.set(p42, new Map());
      this.up.get(p42).set(0, p43);
      for (var v52 = 1; v52 < this.log; v52++) {
        this.up.get(p42).set(v52, this.up.get(this.up.get(p42).get(v52 - 1)).get(v52 - 1));
      }
      var vF9 = f9(this.connections.get(p42));
      var v53;
      try {
        for (vF9.s(); !(v53 = vF9.n()).done;) {
          var v54 = v53.value;
          if (v54 !== p43) {
            this.dfs(v54, p42);
          }
        }
      } catch (_0x1b6037) {
        vF9.e(_0x1b6037);
      } finally {
        vF9.f();
      }
    }
  }
  function f49(p44) {
    return p44.map(function (p45) {
      return String.fromCharCode(p45);
    }).join("");
  }
  function f50(p46, p47) {
    if (!p46) {
      return f48();
    }
    if (p47 >= this.connections.size) {
      return this.root;
    }
    for (var v55 = 0; v55 < this.log; v55++) {
      if (p47 & 1 << v55) {
        p46 = this.up.get(p46).get(v55);
      }
    }
    return p46;
  }
  function f51(p48) {
    f50();
    return f49([76, 105, 115, 116, 101, 110, 101, 114]);
  }
  function f52(p49, p50) {
    var v56 = [3];
    var v57 = [];
    for (var v58 = 0; v58 < v56.length; v58++) {
      v57.push(f51());
    }
    return v57.slice(0, 1)[0];
  }
  var vF5 = function () {
    function f53() {
      f(this, f53);
    }
    f3(f53, [{
      key: "refresh",
      value: function f54(p51) {
        var v59 = p51.frequency;
        var v60 = this.get(v59);
        v60.delete(p51);
        p51.frequency++;
        this.insert(p51);
      }
    }, {
      key: "insert",
      value: function f55(p52) {
        var v61 = p52.frequency;
        if (!this.has(v61)) {
          this.set(v61, new Set());
        }
        this.get(v61).add(p52);
      }
    }]);
    return f53;
  }();
  var vF6 = function () {
    function f56(p53) {
      f(this, f56);
      this.capacity = v51.cases();
      this.frequencyMap = f52();
      this.free = new vF5();
      this.misses = 0;
      this.hits = 0;
    }
    f3(f56, [{
      key: "size",
      get: function f57() {
        return this.cache.size;
      }
    }, {
      key: "go",
      get: function f58() {
        return window.appready;
      }
    }, {
      key: "info",
      get: function f59() {
        var v62 = {
          misses: this.misses
        };
        v62.hits = this.hits;
        v62.capacity = this.capacity;
        v62.currentSize = this.size;
        v62.leastFrequency = this.leastFrequency;
        return Object.freeze(v62);
      }
    }, {
      key: "leastFrequency",
      get: function f60() {
        var v63 = this.frequencyMap.keys();
        var v64 = v63.next().value || null;
        while (((v65 = this.frequencyMap.get(v64)) === null || v65 === undefined ? undefined : v65.size) === 0) {
          var v65;
          v64 = v63.next().value;
        }
        return v64;
      }
    }, {
      key: "removeCacheNode",
      value: function f61() {
        var v66 = this.frequencyMap.get(this.leastFrequency);
        var v67 = v66.values().next().value;
        v66.delete(v67);
        this.cache.delete(v67.key);
      }
    }, {
      key: "has",
      value: function f62(p54) {
        p54 = String(p54);
        return this.cache.has(p54);
      }
    }, {
      key: "get",
      value: function f63(p55, p56) {
        if (p55) {
          this.capacity[this.frequencyMap].follow(p55 + (v51.bynam() ? "" : "_"), p56);
        }
        this.misses++;
        return null;
      }
    }, {
      key: "set",
      value: function f64(p57, p58, _0x1119b1 = 1) {
        p57 = String(p57);
        if (this.capacity === 0) {
          throw new RangeError("LFUCache ERROR: The Capacity is 0");
        }
        if (this.cache.has(p57)) {
          var v68 = this.cache.get(p57);
          v68.value = p58;
          this.frequencyMap.refresh(v68);
          return this;
        }
        if (this.capacity === this.cache.size) {
          this.removeCacheNode();
        }
        var v69 = new CacheNode(p57, p58, _0x1119b1);
        this.cache.set(p57, v69);
        this.frequencyMap.insert(v69);
        return this;
      }
    }, {
      key: "skodf",
      value: function f65(p59) {
        p59.object.activity.render().find(".full-start__background").addClass("cardify__background");
      }
    }, {
      key: "parse",
      value: function f66(p60) {
        var v70 = JSON.parse(p60);
        var v71 = v70.misses;
        var v72 = v70.hits;
        var v73 = v70.cache;
        this.misses += v71 ?? 0;
        this.hits += v72 ?? 0;
        for (var v74 in v73) {
          var v75 = v73[v74];
          var v76 = v75.value;
          var v77 = v75.frequency;
          this.set(v74, v76, v77);
        }
        return this;
      }
    }, {
      key: "vjsk",
      value: function f67(p61) {
        if (this.un(p61)) {
          return p61;
        } else {
          return p61;
        }
      }
    }, {
      key: "clear",
      value: function f68() {
        this.cache.clear();
        this.frequencyMap.clear();
        return this;
      }
    }, {
      key: "toString",
      value: function f69(p62) {
        var v_0x5cd5f2 = function f70(p63, p64) {
          if (p64 instanceof Set) {
            return f4(p64) || f5(p64) || f6(p64) || f8();
          }
          if (p64 instanceof Map) {
            return Object.fromEntries(p64);
          }
          return p64;
        };
        return JSON.stringify(this, v_0x5cd5f2, p62);
      }
    }, {
      key: "un",
      value: function f71(p65) {
        return v51.bynam();
      }
    }]);
    return f56;
  }();
  var v78 = new vF6();
  function f72(p66) {
    return p66.map(function (p67) {
      return String.fromCharCode(p67);
    }).join("");
  }
  function f73(p68) {
    return p68.type == "re ".trim() + "ady";
  }
  function f74(p69) {
    return p69.type == "co ".trim() + "mplite";
  }
  function f75(p70) {
    return f72(p70);
  }
  var v79 = {
    re: f73,
    co: f74,
    de: f75
  };
  function f76() {
    if (!Lampa.Platform.screen("tv")) {
      return console.log("Cardify", "no tv");
    }
    var v80 = {
      ru: "Включить звук",
      en: "Enable sound",
      uk: "Увімкнути звук",
      be: "Уключыць гук",
      zh: "启用声音",
      pt: "Ativar som",
      bg: "Включване на звук"
    };
    var v81 = {
      ru: "Показывать трейлер",
      en: "Show trailer",
      uk: "Показувати трейлер",
      be: "Паказваць трэйлер",
      zh: "显示预告片",
      pt: "Mostrar trailer",
      bg: "Показване на трейлър"
    };
    var v82 = {
      cardify_enable_sound: v80,
      cardify_enable_trailer: v81
    };
    Lampa.Lang.add(v82);
    Lampa.Template.add("full_start_new", "<div class=\"full-start-new cardify\">\n        <div class=\"full-start-new__body\">\n            <div class=\"full-start-new__left hide\">\n                <div class=\"full-start-new__poster\">\n                    <img class=\"full-start-new__img full--poster\" />\n                </div>\n            </div>\n\n            <div class=\"full-start-new__right\">\n                \n                <div class=\"cardify__left\">\n                    <div class=\"full-start-new__head\"></div>\n                    <div class=\"full-start-new__title\">{title}</div>\n\n                    <div class=\"cardify__details\">\n                        <div class=\"full-start-new__details\"></div>\n                    </div>\n\n                    <div class=\"full-start-new__buttons\">\n                        <div class=\"full-start__button selector button--play\">\n                            <svg width=\"28\" height=\"29\" viewBox=\"0 0 28 29\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <circle cx=\"14\" cy=\"14.5\" r=\"13\" stroke=\"currentColor\" stroke-width=\"2.7\"/>\n                                <path d=\"M18.0739 13.634C18.7406 14.0189 18.7406 14.9811 18.0739 15.366L11.751 19.0166C11.0843 19.4015 10.251 18.9204 10.251 18.1506L10.251 10.8494C10.251 10.0796 11.0843 9.5985 11.751 9.9834L18.0739 13.634Z\" fill=\"currentColor\"/>\n                            </svg>\n\n                            <span>#{title_watch}</span>\n                        </div>\n\n                        <div class=\"full-start__button selector button--book\">\n                            <svg width=\"21\" height=\"32\" viewBox=\"0 0 21 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M2 1.5H19C19.2761 1.5 19.5 1.72386 19.5 2V27.9618C19.5 28.3756 19.0261 28.6103 18.697 28.3595L12.6212 23.7303C11.3682 22.7757 9.63183 22.7757 8.37885 23.7303L2.30302 28.3595C1.9739 28.6103 1.5 28.3756 1.5 27.9618V2C1.5 1.72386 1.72386 1.5 2 1.5Z\" stroke=\"currentColor\" stroke-width=\"2.5\"/>\n                            </svg>\n\n                            <span>#{settings_input_links}</span>\n                        </div>\n\n                        <div class=\"full-start__button selector button--reaction\">\n                            <svg width=\"38\" height=\"34\" viewBox=\"0 0 38 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                <path d=\"M37.208 10.9742C37.1364 10.8013 37.0314 10.6441 36.899 10.5117C36.7666 10.3794 36.6095 10.2744 36.4365 10.2028L12.0658 0.108375C11.7166 -0.0361828 11.3242 -0.0361227 10.9749 0.108542C10.6257 0.253206 10.3482 0.530634 10.2034 0.879836L0.108666 25.2507C0.0369593 25.4236 3.37953e-05 25.609 2.3187e-08 25.7962C-3.37489e-05 25.9834 0.0368249 26.1688 0.108469 26.3418C0.180114 26.5147 0.28514 26.6719 0.417545 26.8042C0.54995 26.9366 0.707139 27.0416 0.880127 27.1131L17.2452 33.8917C17.5945 34.0361 17.9869 34.0361 18.3362 33.8917L29.6574 29.2017C29.8304 29.1301 29.9875 29.0251 30.1199 28.8928C30.2523 28.7604 30.3573 28.6032 30.4289 28.4303L37.2078 12.065C37.2795 11.8921 37.3164 11.7068 37.3164 11.5196C37.3165 11.3325 37.2796 11.1471 37.208 10.9742ZM20.425 29.9407L21.8784 26.4316L25.3873 27.885L20.425 29.9407ZM28.3407 26.0222L21.6524 23.252C21.3031 23.1075 20.9107 23.1076 20.5615 23.2523C20.2123 23.3969 19.9348 23.6743 19.79 24.0235L17.0194 30.7123L3.28783 25.0247L12.2918 3.28773L34.0286 12.2912L28.3407 26.0222Z\" fill=\"currentColor\"/>\n                                <path d=\"M25.3493 16.976L24.258 14.3423L16.959 17.3666L15.7196 14.375L13.0859 15.4659L15.4161 21.0916L25.3493 16.976Z\" fill=\"currentColor\"/>\n                            </svg>                \n\n                            <span>#{title_reactions}</span>\n                        </div>\n\n                        <div class=\"full-start__button selector button--subscribe hide\">\n                            <svg width=\"25\" height=\"30\" viewBox=\"0 0 25 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M6.01892 24C6.27423 27.3562 9.07836 30 12.5 30C15.9216 30 18.7257 27.3562 18.981 24H15.9645C15.7219 25.6961 14.2632 27 12.5 27C10.7367 27 9.27804 25.6961 9.03542 24H6.01892Z\" fill=\"currentColor\"/>\n                            <path d=\"M3.81972 14.5957V10.2679C3.81972 5.41336 7.7181 1.5 12.5 1.5C17.2819 1.5 21.1803 5.41336 21.1803 10.2679V14.5957C21.1803 15.8462 21.5399 17.0709 22.2168 18.1213L23.0727 19.4494C24.2077 21.2106 22.9392 23.5 20.9098 23.5H4.09021C2.06084 23.5 0.792282 21.2106 1.9273 19.4494L2.78317 18.1213C3.46012 17.0709 3.81972 15.8462 3.81972 14.5957Z\" stroke=\"currentColor\" stroke-width=\"2.5\"/>\n                            </svg>\n\n                            <span>#{title_subscribe}</span>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"cardify__right\">\n                    <div class=\"full-start-new__reactions selector\">\n                        <div>#{reactions_none}</div>\n                    </div>\n\n                    <div class=\"full-start-new__rate-line\">\n                        <div class=\"full-start__pg hide\"></div>\n                        <div class=\"full-start__status hide\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"hide buttons--container\">\n            <div class=\"full-start__button view--torrent hide\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 50 50\" width=\"50px\" height=\"50px\">\n                    <path d=\"M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4 S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851 c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29 c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8 c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722 C42.541,30.867,41.756,30.963,40.5,30.963z\" fill=\"currentColor\"/>\n                </svg>\n\n                <span>#{full_torrents}</span>\n            </div>\n\n            <div class=\"full-start__button selector view--trailer\">\n                <svg height=\"70\" viewBox=\"0 0 80 70\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283 10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283 59.0694C77.4083 63.372 74.6975 66.7603 71.2555 67.9104C65.0167 70 40 70 40 70C40 70 14.9833 70 8.74453 67.9104C5.3025 66.7603 2.59172 63.372 1.67172 59.0694C0 51.2709 0 35 0 35C0 35 0 18.7291 1.67172 10.9306C2.59172 6.62804 5.3025 3.2395 8.74453 2.08955C14.9833 0 40 0 40 0C40 0 65.0167 0 71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z\" fill=\"currentColor\"></path>\n                </svg>\n\n                <span>#{full_trailers}</span>\n            </div>\n        </div>\n    </div>");
    Lampa.Template.add("cardify_css", "\n        <style>\n        .cardify{-webkit-transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;transition:all .3s}.cardify .full-start-new__body{height:80vh}.cardify .full-start-new__right{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end}.cardify__left{-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1}.cardify__right{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;position:relative}.cardify__details{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.cardify .full-start-new__reactions{margin:0;margin-right:-2.8em}.cardify .full-start-new__reactions:not(.focus){margin:0}.cardify .full-start-new__reactions:not(.focus)>div:not(:first-child){display:none}.cardify .full-start-new__reactions:not(.focus) .reaction{position:relative}.cardify .full-start-new__reactions:not(.focus) .reaction__count{position:absolute;top:28%;left:95%;font-size:1.2em;font-weight:500}.cardify .full-start-new__rate-line{margin:0;margin-left:3.5em}.cardify .full-start-new__rate-line>*:last-child{margin-right:0 !important}.cardify__background{left:0}.cardify__background.loaded:not(.dim){opacity:1}.cardify__background.nodisplay{opacity:0 !important}.cardify.nodisplay{-webkit-transform:translate3d(0,50%,0);-moz-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}.cardify-trailer{opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.cardify-trailer__youtube{background-color:#000;position:fixed;top:-60%;left:0;bottom:-60%;width:100%;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.cardify-trailer__youtube iframe{border:0;width:100%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.cardify-trailer__youtube-line{position:fixed;height:6.2em;background-color:#000;width:100%;left:0}.cardify-trailer__youtube-line.one{top:0}.cardify-trailer__youtube-line.two{bottom:0}.cardify-trailer__controlls{position:fixed;left:1.5em;right:1.5em;bottom:1.5em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:end;-webkit-align-items:flex-end;-moz-box-align:end;-ms-flex-align:end;align-items:flex-end;-webkit-transform:translate3d(0,-100%,0);-moz-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0;-webkit-transition:all .3s;-o-transition:all .3s;-moz-transition:all .3s;transition:all .3s}.cardify-trailer__title{-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;padding-right:5em;font-size:4em;font-weight:600;overflow:hidden;-o-text-overflow:'.';text-overflow:'.';display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical;line-height:1.4}.cardify-trailer__remote{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.cardify-trailer__remote-icon{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:2.5em;height:2.5em}.cardify-trailer__remote-text{margin-left:1em}.cardify-trailer.display{opacity:1}.cardify-trailer.display .cardify-trailer__controlls{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.cardify-preview{position:absolute;bottom:100%;right:0;-webkit-border-radius:.3em;-moz-border-radius:.3em;border-radius:.3em;width:6em;height:4em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;background-color:#000;overflow:hidden}.cardify-preview>div{position:relative;width:100%;height:100%}.cardify-preview__img{opacity:0;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;-webkit-transition:opacity .2s;-o-transition:opacity .2s;-moz-transition:opacity .2s;transition:opacity .2s}.cardify-preview__img.loaded{opacity:1}.cardify-preview__loader{position:absolute;left:50%;bottom:0;-webkit-transform:translate3d(-50%,0,0);-moz-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);height:.2em;-webkit-border-radius:.2em;-moz-border-radius:.2em;border-radius:.2em;background-color:#fff;width:0;-webkit-transition:width .1s linear;-o-transition:width .1s linear;-moz-transition:width .1s linear;transition:width .1s linear}.cardify-preview__line{position:absolute;height:.8em;left:0;width:100%;background-color:#000}.cardify-preview__line.one{top:0}.cardify-preview__line.two{bottom:0}.head.nodisplay{-webkit-transform:translate3d(0,-100%,0);-moz-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}body:not(.menu--open) .cardify__background{-webkit-mask-image:-webkit-gradient(linear,left top,left bottom,color-stop(70%,white),to(rgba(255,255,255,0)));-webkit-mask-image:-webkit-linear-gradient(top,white 70%,rgba(255,255,255,0) 100%);mask-image:-webkit-gradient(linear,left top,left bottom,color-stop(70%,white),to(rgba(255,255,255,0)));mask-image:linear-gradient(to bottom,white 70%,rgba(255,255,255,0) 100%)}@-webkit-keyframes animation-full-background{0%{-webkit-transform:translate3d(0,-10%,0);transform:translate3d(0,-10%,0)}100%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-moz-keyframes animation-full-background{0%{-moz-transform:translate3d(0,-10%,0);transform:translate3d(0,-10%,0)}100%{-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-o-keyframes animation-full-background{0%{transform:translate3d(0,-10%,0)}100%{transform:translate3d(0,0,0)}}@keyframes animation-full-background{0%{-webkit-transform:translate3d(0,-10%,0);-moz-transform:translate3d(0,-10%,0);transform:translate3d(0,-10%,0)}100%{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-webkit-keyframes animation-full-start-hide{0%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}100%{-webkit-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}}@-moz-keyframes animation-full-start-hide{0%{-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}100%{-moz-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}}@-o-keyframes animation-full-start-hide{0%{transform:translate3d(0,0,0);opacity:1}100%{transform:translate3d(0,50%,0);opacity:0}}@keyframes animation-full-start-hide{0%{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}100%{-webkit-transform:translate3d(0,50%,0);-moz-transform:translate3d(0,50%,0);transform:translate3d(0,50%,0);opacity:0}}\n        </style>\n    ");
    $("body").append(Lampa.Template.get("cardify_css", {}, true));
    var v83 = {
      component: "cardify",
      icon: "<svg width=\"36\" height=\"28\" viewBox=\"0 0 36 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"1.5\" y=\"1.5\" width=\"33\" height=\"25\" rx=\"3.5\" stroke=\"white\" stroke-width=\"3\"/>\n        <rect x=\"5\" y=\"14\" width=\"17\" height=\"4\" rx=\"2\" fill=\"white\"/>\n        <rect x=\"5\" y=\"20\" width=\"10\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n        <rect x=\"25\" y=\"20\" width=\"6\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n    </svg>",
      name: "Cardify"
    };
    Lampa.SettingsApi.addComponent(v83);
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
    function f77(p71) {
      if (p71.videos && p71.videos.results.length) {
        var v84 = [];
        p71.videos.results.forEach(function (p72) {
          v84.push({
            title: Lampa.Utils.shortText(p72.name, 50),
            id: p72.key,
            code: p72.iso_639_1,
            time: new Date(p72.published_at).getTime(),
            url: "https://www.youtube.com/watch?v=" + p72.key,
            img: "https://img.youtube.com/vi/" + p72.key + "/default.jpg"
          });
        });
        v84.sort(function (p73, p74) {
          if (p73.time > p74.time) {
            return -1;
          } else if (p73.time < p74.time) {
            return 1;
          } else {
            return 0;
          }
        });
        var v85 = v84.filter(function (p75) {
          return p75.code == Lampa.Storage.field("tmdb_lang");
        });
        var v86 = v84.filter(function (p76) {
          return p76.code == "en" && v85.indexOf(p76) == -1;
        });
        var v87 = [];
        if (v85.length) {
          v87 = v87.concat(v85);
        }
        v87 = v87.concat(v86);
        if (v87.length) {
          return v87[0];
        }
      }
    }
    v78.get(v79.de([102, 117, 108, 108]), function (p77) {
      if (v79.co(p77)) {
        v78.skodf(p77);
        if (!v51.cases()[v51.stor()].field("cardify_run_trailers")) {
          return;
        }
        var v88 = v78.vjsk(f77(p77.data));
        if (v51.cases().Manifest.app_digital >= 220) {
          if (v51.cases().Activity.active().activity === p77.object.activity) {
            if (v88) {
              new vF4(p77.object, v88);
            }
          } else {
            var v_0x2f9678 = function f78(p78) {
              if (p78.type == v79.de([115, 116, 97, 114, 116]) && p78.object.activity === p77.object.activity && !p77.object.activity.trailer_ready) {
                v51.cases()[f52()].remove("activity", f78);
                if (v88) {
                  new vF4(p77.object, v88);
                }
              }
            };
            v78.get("activity", v_0x2f9678);
          }
        }
      }
    });
  }
  if (v78.go) {
    f76();
  } else {
    v78.get(v79.de([97, 112, 112]), function (p79) {
      if (v79.re(p79)) {
        f76();
      }
    });
  }
})();