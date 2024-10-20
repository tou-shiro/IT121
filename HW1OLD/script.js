function Person(first, last, years, goal) {
  this.firstName = first;
  this.lastName = last;
  this.yearsOfStudy = years;
  this.goalOfStudy = goal;
}

const shiro = new Person("Shiro", "Ishii", 1, "continue my IT carrer");

document.getElementById("week1").innerHTML =
"My name is " + shiro.firstName + " " + shiro.lastName + "." + "I have been at SCC for " + shiro.yearsOfStudy + " year and plan to " + shiro.goalOfStudy + " after completing my courses.";