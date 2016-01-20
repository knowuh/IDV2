var addSolution = function (student, problemset) {
  var url = "../" + student + "/" + problemset + "/index.html";
  var tag = "<li><a href='" + url + "'>" + student + "</a></li>";
  $('#solutions').append($(tag));
};

var makeStudentLinks = function () {
  var i = 0;
  var student = null;
  var students =
    ("frankenbits jessier08 odonnel-p severli93 tangdru " +
      "xiaoyunver KiniLuo Luegreen egunn navarjun rcmorrill").split(" ").sort();

  for (i = 0; i < students.length; i++) {
    student = students[i];
    addSolution(student, "ps-01");
  }
};

$(document).ready(makeStudentLinks);