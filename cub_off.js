(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    var v10 = 0;
    function f() {
      Lampa.Controller.listener.follow("toggle", function (p7) {
        if (p7.name == "select") {
          setTimeout(function () {
            if (Lampa.Activity.active().component == "full") {
              if (document.querySelector(".ad-server") !== null) {
                $(".ad-server").remove();
              }
            }
            if (Lampa.Activity.active().component === "modss_online") {
              $(".selectbox-item--icon").remove();
            }
          }, 20);
        }
      });
    }
    function f2() {
      setTimeout(function () {
        $(".selectbox-item__lock").parent().css("display", "none");
        if (!$("[data-name=\"account_use\"]").length) {
          $("div > span:contains(\"Статус\")").parent().remove();
        }
      }, 10);
    }
    function f3() {
      document.addEventListener("DOMSubtreeModified", function f4(p8) {
        var v11 = document.getElementsByClassName("card");
        if (v11.length > 0) {
          if (v10 == 0) {
            v10 = 1;
            f2();
            setTimeout(function () {
              v10 = 0;
            }, 500);
          }
        }
      }, false);
    }
    function f5() {
      var v21 = document.createElement("style");
      v21.innerHTML = ".button--subscribe { display: none; }";
      document.body.appendChild(v21);
      $(document).ready(function () {
        var v22 = new Date();
        var v23 = v22.getTime();
        localStorage.setItem("region", "{\"code\":\"uk\",\"time\":" + v23 + "}");
      });
      $("[data-action=\"tv\"]").on("hover:enter hover:click hover:touch", function () {
        var vSetInterval = setInterval(function () {
          if (document.querySelector(".ad-bot") !== null) {
            $(".ad-bot").remove();
            clearInterval(vSetInterval);
          }
        }, 100);
        var vSetInterval2 = setInterval(function () {
          if (document.querySelector(".card__textbox") !== null) {
            $(".card__textbox").parent().parent().remove();
            clearInterval(vSetInterval2);
          }
        }, 100);
      });
      setTimeout(function () {
        $(".open--feed").remove();
        $(".open--premium").remove();
        $(".open--notice").remove();
      }, 1000);
      Lampa.Settings.listener.follow("open", function (p9) {
        if (p9.name == "account") {
          setTimeout(function () {
            $(".settings--account-premium").remove();
            $("div > span:contains(\"CUB Premium\")").remove();
          }, 0);
        }
        if (p9.name == "server") {
          if (document.querySelector(".ad-server") !== null) {
            $(".ad-server").remove();
          }
        }
      });
      Lampa.Listener.follow("full", function (p10) {
        if (p10.type == "complite") {
          $(".button--book").on("hover:enter", function () {
            f2();
          });
        }
      });
      Lampa.Storage.listener.follow("change", function (p11) {
        if (p11.name == "activity") {
          if (Lampa.Activity.active().component === "bookmarks") {
            $(".register:nth-child(4)").hide();
            $(".register:nth-child(5)").hide();
            $(".register:nth-child(6)").hide();
            $(".register:nth-child(7)").hide();
            $(".register:nth-child(8)").hide();
          }
          setTimeout(function () {
            f3();
          }, 200);
        }
      });
    }
    if (window.appready) {
      f5();
      f3();
      f();
    } else {
      Lampa.Listener.follow("app", function (p12) {
        if (p12.type == "ready") {
          f5();
          f3();
          f();
          $("[data-action=feed]").eq(0).remove();
          $("[data-action=subscribes]").eq(0).remove();
          $("[data-action=myperson]").eq(0).remove();
        }
      });
    }
  })();
})();
