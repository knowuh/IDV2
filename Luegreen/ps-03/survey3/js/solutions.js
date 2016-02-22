var studentsS =
  "frankenbits jessier08 odonnel-p severli93 tangdru "
  + "xiaoyunver KiniLuo Luegreen egunn navarjun "
  + "liapetronio jiani rcmorrill"

var students = studentsS.split(" ").sort();

var addSolution = function (student, problemset) {
  var url = "../" + student + "/" + problemset + "/index.html";
  var tag = "<li><a href='" + url + "' target='_blank'>" + student + "</a></li>";
  $('#solutions').append($(tag));
};

var solutions = function (problemset) {
  $('#dynamic-content').append($("<ul className='solutions' id='solutions'>"));
  var i = 0;
  var student = null;
  for (i = 0; i < students.length; i++) {
    student = students[i];
    addSolution(student, problemset);
  }
};

