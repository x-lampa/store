(function () {
  "use strict";

  Lampa.Storage.set("full_btn_priority", "{}");
  Lampa.Listener.follow("full", function (p3) {
    if (p3.type === "complite") {
      setTimeout(function () {
        var v8 = p3.object.activity.render();
        var v9 = v8.find(".full-start-new__buttons");
        v8.find(".button--play").remove();
        var v10 = v8.find(".buttons--container .full-start__button").add(v9.find(".full-start__button"));
        var v11 = v10.filter(function () {
          return $(this).attr("class").includes("torrent");
        });
        var v12 = v10.filter(function () {
          return $(this).attr("class").includes("online");
        });
        var v13 = v10.filter(function () {
          return $(this).attr("class").includes("trailer");
        });
        var vA2 = [];
        v11.each(function () {
          vA2.push($(this));
        });
        v12.each(function () {
          vA2.push($(this));
        });
        v13.each(function () {
          vA2.push($(this));
        });
        v10.filter(function () {
          return !$(this).attr("class").includes("online") && !$(this).attr("class").includes("torrent") && !$(this).attr("class").includes("trailer");
        }).each(function () {
          var v14 = $(this).clone(true);
          vA2.push(v14);
        });
        v9.empty();
        vA2.forEach(function (p4) {
          v9.append(p4);
        });
        Lampa.Controller.toggle("full_start");
      }, 100);
    }
  });
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {};
  }
})();
