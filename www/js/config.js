/**
 * Created by Sloong on 2015/10/16.
 */
(function () {
  "use strict";

  //setter zeus`s config
  angular.module("zeus.config", [])

    .constant("$ionicLoadingConfig", {
      "template": "请求中..."
    })

    .constant("ENV", {
      "version": "1.0.1",
      "name": "production",
      "debug": true,
      "accessToken": "22e5a6bd-8e5d-4207-9a8b-95de05a09d68",
      "api": "https://cnodejs.org/api/v1"
    })

    .constant("ENV_d", {
      "version": "1.0.1",
      "name": "development",
      "debug": true,
      "accessToken": "22e5a6bd-8e5d-4207-9a8b-95de05a09d68",
      "api": "https://cnodejs.org/api/v1"
    })
})();
