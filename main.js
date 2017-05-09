var value = "";
var $loading = $('#loadingDiv').hide();

$(document).ready(function() {

  generateButton = $("#generateButton");
  usernameBox = $("#usernameBox");


  $("input").keyup(function() { value = $(this).val(); })

  generateButton.click(generateCardFile);
  $(".flag-icon").click(selectFlag);
});
$(document) .ajaxStart(function () { $loading.show(); }) .ajaxStop(function () { $loading.hide(); });

function generateCardFile() {
  showSpinner();
  //var lang = $("#langselection option:selected").attr("value");
  var lang = "fr";
  getKnownWords(value, lang, function(words) {
    getTranslations(words, lang, "en", function(data) {
      fileURL = makeFile(generateCsvRows(data));
      hideSpinner();
    }, handleError);
  }, handleError
  );
}

function handleError(jqXHR, textStatus, errorThrown) {
  console.log(textStatus);
  console.log(errorThrown);
}

function showSpinner() {
  $("#genButtonText").text('');
  $("#dotContainer").removeAttr('style');
  $("#downloadInfo").attr('style', 'display: none');
}

function hideSpinner() {
  $("#genButtonText").text('Generate');
  $("#dotContainer").attr('style', 'display: none');
  $("#downloadLink").attr('href', fileURL);
  $("#downloadInfo").removeAttr('style');
}

function selectFlag() {
  $(".flag-icon").removeClass("selected");
  $(".flag-icon").addClass("unselected");
  $(this).removeClass("unselected");
  $(this).addClass("selected");
}

// wordObj is {"word": ["transl0", "transl1"]}
function generateCsvRows(wordObj){
  rows = "";
  for (var from in wordObj) {
    row = from + ",";
    for (var i = 0; i < wordObj[from].length; i++) {
      row += " {to}<br>".formatUnicorn({"to": wordObj[from][i]});
    }
    row += "\n";
    rows += row;
  }
  return rows;
}

