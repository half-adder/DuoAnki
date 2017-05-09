String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
  function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var key;
      var args = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(arguments)
        : arguments[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);

      }

    }
    return str;
  };


// Returns a URL to a textfile
function makeFile(text) {
  var data = new Blob([text], {type: 'text/plain'});
  return window.URL.createObjectURL(data);
};
