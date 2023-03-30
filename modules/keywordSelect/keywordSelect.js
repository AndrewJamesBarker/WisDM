function keywordSelect(sentence) {
  
  let keywords = ["anxiety","change","choice","confidence","courage","dreams","exellence","failure","fairness","fear","forgiveness","freedom","future","happiness","inpiration","kindness","leadership","life","living","love","pain","past","success","time","today","truth","work"];

  let narrowed = [];
  for (let i = 0; i < keywords.length; i++) {
    if (sentence.includes(keywords[i])) {
      narrowed.push(keywords[i]);
    }
  }
  
  if (narrowed.length === 0) {
    let randomIndex = Math.floor(Math.random() * keywords.length);
    return keywords[randomIndex];
  } else {
    return narrowed[0];
  }
}

module.exports = {
  keywordSelect
}