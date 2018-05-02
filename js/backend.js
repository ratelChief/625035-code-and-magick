'use strict';

window.backend = (function () {
  var URL_DOWNLOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick';

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  return {
    load: function (onLoad, onError) {

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          console.log(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr. addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', URL_DOWNLOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
