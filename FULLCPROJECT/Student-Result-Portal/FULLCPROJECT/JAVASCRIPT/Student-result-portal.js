const studentResultsArray = [
  {
    id: 224141933,
    studentName: "Nkosinathi",
    class: "SS02",
    Subjects: [
      { name: "Mathematics", score: 80 },
      { name: "Physical Scienses", score: 70 },
    ],
  },
  {
    id: 224141944,
    studentName: "Zinhle",
    class: "SZ02",
    Subjects: [
      { name: "Mathematics Literacy", score: 80 },
      { name: "Life Scienses", score: 70 },
    ],
  },
  {
    id: 224141955,
    studentName: "Snethemba",
    class: "SS05",
    Subjects: [
      { name: "Mathematics Literacy", score: 49 },
      { name: "Geography", score: 48 },
    ],
  },
];
localStorage.setItem(
  "studentsResultsArray",
  JSON.stringify(studentResultsArray),
);

//USER IDENTITY VARIABLE
let userIdentity = document.getElementById("js-student-identity");
function logIn() {
  const studentResultsArrayBack = JSON.parse(
    localStorage.getItem("studentsResultsArray") || "[]",
  );
  //LOGIN OUTPUT DIV
  let loginDisplayDiv = document.querySelector(".loginOutput");

  if (!loginDisplayDiv) {
    console.error("Element DisplayLogin not found!");
    return;
  }
  const student = studentResultsArrayBack.find(
    (result) => result.id == Number(userIdentity.value),
  );
  if (!student) {
    loginDisplayDiv.innerHTML =
      "<div class = 'incorrect-student-number'>Student number doesn't match our database...</div>";
    return;
  }
  localStorage.setItem("LoggedInStudentID", userIdentity.value);
  window.location.href = "Student-result-portal.html";

  loginDisplayDiv.innerHTML = "";
}

//
function resultStats() {
  let resultAccumulator = 0;
  let subjectCount = 0;
  const studentResultsArrayBack = JSON.parse(
    localStorage.getItem("studentsResultsArray") || "[]",
  );
  const loggedInId = localStorage.getItem("LoggedInStudentID");
  //DIVS OUTPUT VARIABLES
  const studentDetailsDiv = document.querySelector(
    ".js-student-details-display",
  );
  const studentResultDisplayDiv = document.querySelector(".js-results-display");
  const studentStatusDisplayDiv = document.querySelector(".js-status-display");

  if (
    !studentDetailsDiv ||
    !studentResultDisplayDiv ||
    !studentStatusDisplayDiv
  ) {
    console.error("Elements not found!");
    return;
  }

  //CLEAR THE DIVS CONTENT BEFORE DISPLAY THE NEW RESULTS
  studentDetailsDiv.innerHTML = "";
  studentResultDisplayDiv.innerHTML = "";
  studentStatusDisplayDiv.innerHTML = "";

  //CHECK IF THE USER IDENTITY EXIST IN THE ARRAY
  const student = studentResultsArrayBack.find(
    (result) => result.id == Number(loggedInId),
  );

  //IF IT EXIST RUN THIS CODE
  studentDetailsDiv.innerHTML = `
    <div class= "stu-query">Student Number: </div><div class= "stu-details">${student.id}</div>
    <div class= "stu-query">Name: </div><div class= "stu-details">${student.studentName}</div>
    <div class= "stu-query">Class: </div><div class= "stu-details">${student.class}</div>
  `;

  //CREATE A TABLE TO SORT THE RESULTS
  let resultTableHTML = `
  <table border="1" cellpadding="10">
    <tr>
      <th class = "subject-name-column">Subject Name</th>
      <th class = "score-column">Score</th>
      <th class = "grade-column">Grade</th>
    </tr>
  `;

  student.Subjects.forEach((subject) => {
    resultAccumulator += subject.score;
    subjectCount++;
    let grade = "";

    if (subject.score >= 75) grade = "A";
    else if (subject.score >= 65) grade = "B";
    else if (subject.score >= 50) grade = "C";
    else grade = "F";

    resultTableHTML += `
    <tr>
      <td class = "subject-name-row">${subject.name}</td>
      <td class = "score-row">${subject.score}</td>
      <td class = "grade-row">${grade}</td>
    </tr>
  `;
  });

  resultTableHTML += `</table>`;

  studentResultDisplayDiv.innerHTML = resultTableHTML;

  /*This calculates and checks if the average is greater than 50% then
   displays the Student status wherether he passed or not.*/
  let status = resultAccumulator / subjectCount < 50;
  let statusText = status ? "FAIL" : "PASS";
  let statusClass = status ? "fail-status" : "pass-status";

  let statusTableHTML = `<table border = "1" cellpadding = "10">
  <tr>
    <th class = "average-column">Average</th>
    <td class = "average-row">${resultAccumulator / subjectCount}</td>
  </tr>
  <tr>
    <th class = "status-column">Status</th>
    <td class="${statusClass}">${statusText}</td>
  </tr>`;
  statusTableHTML += `</table>`;

  studentStatusDisplayDiv.innerHTML = statusTableHTML;

  userIdentity.value = "";
}
function LogOut() {
  window.location.href = "student-index.html";
}
if (window.location.pathname.includes("Student-result-portal.html")) {
  resultStats();
}
