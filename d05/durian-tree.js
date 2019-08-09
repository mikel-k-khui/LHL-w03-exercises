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

  getCEO(employee) {
    let currentEmployee = employee;
    // climb "up" the tree (using iteration), counting nodes, until no boss is found
    if (employee.boss) {
      currentEmployee = employee.getCEO(employee.boss);
    }

    return currentEmployee;
  }

  hasSameBoss(employee) {
    return this.boss === employee.boss;
  }
}

const ada      = new Employee("Ada", "CEO", 3000000.00);
const craig    = new Employee("Craig", "VP Software", 1000000);
const arvinder = new Employee("Arvinder", "Chief Design Officer", 1000000);
const angela   = new Employee("Angela", "VP Retail", 1000000);
const phil     = new Employee("Phil", "VP Marketing", 1000000);

const simone   = new Employee("Simone", "", 70000.00);
const ali      = new Employee("Ali", "", 70000.00);
const florida  = new Employee("Florida", "", 70000.00);
const david    = new Employee("David", "", 70000.00);
const brian    = new Employee("Brian", "", 70000.00);
const karia    = new Employee("Karia", "", 70000.00);

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

console.log(`Craig's boss is: ${craig.boss["name"]}`);
console.log(`Craig has ${craig.subordinates.length} employees reporting to him`);
console.log(`Karia has ${karia.numberOfPeopleToCEO} people between him and CEO ${craig.getCEO(karia).name}`);