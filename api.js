function getUserData(username, callback, onError) {
  $.getJSON({
    url: "https://www.duolingo.com/users/" + username,
    success: callback
  }).fail(onError);
}

function getKnownWords(username, lang, callback, onError) {
  getUserData(username, function(data) {
    var words = new Set();
    var skills = data.language_data[lang].skills;

    for (i = 0; i < skills.length; i++){
      var skill = skills[i];
      if (skill.learned) {
        for (j = 0; j < skill.words.length; j++) {
          words.add(skill.words[j]);
        }
      }
    }
    callback(words)
  }, onError);
}

// Expects wordList to be a Set
function getTranslations(wordList, source, dest, callback, onError) {
  url = "https://crossorigin.me/https://d2.duolingo.com/api/1/dictionary/hints/{0}/{1}?tokens={wrds}".formatUnicorn({
    "0": source, 
    "1": dest, 
    "wrds": JSON.stringify(Array.from(wordList.values()))
  });
  $.getJSON(url, callback).fail(onError);
}
