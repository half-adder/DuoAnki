function apiCall(url, onSuccess, onError) {
  $.getJSON({url: url, success: onSuccess}).fail(onError);
}

function getUserData(username, callback, onError) {
  var url = "https://crossorigin.me/https://www.duolingo.com/users/" + username;
  apiCall(url, callback, function() {onError("Couldn't find that user!")});
}

function getKnownWords(username, lang, callback, onError) {
  getUserData(username, function(data) {
    var words = new Set();
    try {
      var skills = data.language_data[lang].skills;
    }
    catch(e) {
      onError("Oops, that language isn't available for this user");
    }

    for (i = 0; i < skills.length; i++){
      var skill = skills[i];
      if (skill.learned) {
        for (j = 0; j < skill.words.length; j++) {
          words.add(skill.words[j]);
        }
      }
    }

    callback(words);
  }, onError);
}

// Expects wordList to be a Set
function getTranslations(wordList, source, dest, callback, onError) {
  url = "https://crossorigin.me/https://d2.duolingo.com/api/1/dictionary/hints/{0}/{1}?tokens={wrds}".formatUnicorn({
    "0": source, 
    "1": dest, 
    "wrds": JSON.stringify(Array.from(wordList.values()))
  });
  apiCall(url, callback, function() {onError("oops... something went wrong. please try again")});
}
