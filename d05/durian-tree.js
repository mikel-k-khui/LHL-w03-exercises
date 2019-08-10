class Employee {
  constructor(name, title, salary) {
    this.name = name;
    this.title = title;
    this.salary = salary;
    this.boss = null;
    this.subordinates = [];
  }

  addSubordinate(subordinate) {
    this.subordinates.push(subordinate);
    subordinate.boss = this;
  }

  get numberOfSubordinates() {
    return this.subordinates.length;
  }

  get numberOfPeopleToCEO() {
    let numberOfPeople = 0;
    let currentEmployee = this;

    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    while (currentEmployee.boss) {
      currentEmployee = currentEmployee.boss;
      numberOfPeople++;
    }

    return numberOfPeople;
  }

  getCEO() {
    let currentEmployee = this;
    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    if (this.boss) {
      currentEmployee = this.boss.getCEO();
    }

    return currentEmployee;
  }

  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }
  
  employeesThatMakeOver(amount) {

    let employees = []; // 1
  
    if (this.salary > amount) {
      employees.push(this.title); // 2
    }
  
    for (const subordinate of this.subordinates) {
      const subordinatesThatMakeOver = subordinate.employeesThatMakeOver(amount); // 3
      employees = employees.concat(subordinatesThatMakeOver);
    }
  
    return employees;
  }

  get totalEmployees() {
    let employeesCounts = 1;

    for (const sub in this.subordinates) {
      employeesCounts += this.subordinates[sub].totalEmployees;
    }

    return employeesCounts;
  }
}

const ada      = new Employee("Ada", "CEO", 3000000.00);
const craig    = new Employee("Craig", "VP Software", 1000000);
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
const angela   = new Employee("Angela", "VP Retail", 1000000);
const phil     = new Employee("Phil", "VP Marketing", 1000000);

const simone   = new Employee("Simone", "", 200000.00);
const ali      = new Employee("Ali", "", 100000.00);
const florida  = new Employee("Florida", "", 150000.00);
const david    = new Employee("David", "", 200000.00);
const brian    = new Employee("Brian", "", 100000.00);
const karia    = new Employee("Karia", "", 120000.00);

const sarah    = new Employee("Sarah", "", 95000.00);
const andrew    = new Employee("Andrew", "", 90000.00);
const emma    = new Employee("Emma", "", 60000.00);
const jeremy    = new Employee("jeremy", "", 60000.00);
const chandler    = new Employee("Chandler", "", 100000.00);

ada.addSubordinate(craig);
ada.addSubordinate(arvinder);
ada.addSubordinate(angela);
ada.addSubordinate(phil);

craig.addSubordinate(simone);
craig.addSubordinate(ali);

phil.addSubordinate(florida);
phil.addSubordinate(david);
phil.addSubordinate(brian);

angela.addSubordinate(karia);

ali.addSubordinate(sarah);
ali.addSubordinate(andrew);

david.addSubordinate(emma);
david.addSubordinate(jeremy);

karia.addSubordinate(chandler);

console.log(`Craig's boss is: ${craig.boss["name"]}`);
console.log(`Craig has ${craig.subordinates.length} employees reporting to him`);
console.log(`Karia has ${karia.numberOfPeopleToCEO} people between him and CEO ${craig.getCEO().name}`);

console.log("Wealthy Employees in the company includes: ", ada.employeesThatMakeOver(418401), ".");

console.log(`Total number of employees in the entire company is ${ada.totalEmployees}.`);
console.log(`Total number of employees working in software development is ${craig.totalEmployees}.`);