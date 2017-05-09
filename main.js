var value = "";

$(document).ready(function() {

  generateButton = $("#generateButton");
  usernameBox = $("#usernameBox");


  $("input").keyup(function() { value = $(this).val(); })

  generateButton.click(generateCardFile);
  $(".flag-icon").click(selectFlag);
});
function generateCardFile() {
  showSpinner();
  //var lang = $("#langselection option:selected").attr("value");
  var lang = "fr";
  getKnownWords(value, lang, function(words) {
    getTranslations(words, lang, "en", function(data) {
      fileURL = makeFile(generateCsvRows(data));
      hideSpinner();
    }, handleError);
  }, handleError);
}

function handleError(message) {
  hideSpinner(true);
  if (message) {
    swal({
      title: 'Error!',
      text: message,
      type: 'error',
      confirmButtonText: 'Okay',
    });
  }
  else {
    alert('failed');
  }
}

function showSpinner() {
  $("#genButtonText").text('');
  $("#dotContainer").removeAttr('style');
  $("#downloadInfo").attr('style', 'display: none');
}

function hideSpinner(didFail) {
  $("#genButtonText").text('Generate');
  $("#dotContainer").attr('style', 'display: none');
  if (!didFail) {
    $("#downloadLink").attr('href', fileURL);
    $("#downloadInfo").removeAttr('style');
  }
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

