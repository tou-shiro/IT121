// IT121 HW3 by Shiro 10/13/2024
// HW 3 - Making the grade.
// display each student's name and score 
// capitalize the first letter of each student name
// display total # of students, 
// display the lowest, highest, and average scores

// This is not an array; this is just a long string
const grades = "jim|25, sue|32, mary|34, ann|22, ted|28, frank|15, lisa|19, mike|30, ahn|26, vishaya|27";

// Split the string into an array of student data
const students = grades.split(", ");

const studentNames = [];
const studentScores = [];
let lowest = 100;
let highest = 0;
let totalStudent = 0;

let i = 0;
while (i < students.length) {
    const studentData = students[i].split("|"); // Split by the pipe character
    studentNames[i] = studentData[0].charAt(0).toUpperCase() + studentData[0].slice(1); // Get the name
    const score = parseInt(studentData[1]); // Convert the score to an integer
    studentScores[i] = score; // Store the score

    document.write(studentNames[i] + ": " + studentScores[i] + "<br>");

    if (highest < studentScores[i]) {
        highest = studentScores[i];
    }
    if (lowest > studentScores[i]) {
        lowest = studentScores[i];
    }    
    totalStudent += studentScores[i];
    i++;
}

// output all results
document.write("Lowest: " + lowest + "<br>");
document.write("Highest: " + highest + "<br>");
document.write("Number of students: " + students.length + "<br>");
document.write("Average: " + (totalStudent / studentScores.length).toFixed(2));