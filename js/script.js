class Employee {
    constructor(firstName, secondName, baseSalary, experience) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }
    countedSalary() {
        if (this.experience > 2 && this.experience < 5) {
            return this.baseSalary + 200;
        }
        if (this.experience >= 5) {
            return this.baseSalary * 1.2 + 500;
        }
        return this.baseSalary;
    }
}

class Developer extends Employee {
    constructor(firstName, secondName, baseSalary, experience) {
        super(firstName, secondName, baseSalary, experience);
    }
}

class Designer extends Employee {
    constructor(firstName, secondName, baseSalary, experience, effCoeff) {
        super(firstName, secondName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }
    countedSalary() {
        return (super.countedSalary() * this.effCoeff).toFixed();
    }
}

class Manager extends Employee {
    constructor(firstName, secondName, baseSalary, experience, team) {
        super(firstName, secondName, baseSalary, experience);
        this.team = team;
    }
    countedSalary() {
        let salary = super.countedSalary();
        if (this.team.length > 5 && this.team.length < 10) {
            salary += 200;
        }
        if (this.team.length >= 10) {
            salary += 300;
        }
        if (this.team.filter((teammate) => teammate.constructor.name == 'Developer').length > this.team.length / 2) {
            salary *= 1.1;
        }
        return salary.toFixed();
    }
}

class Department {
    constructor(...managers) {
        this.managers = managers;
    }
    giveSalary() {
        for (let manager of this.managers) {
            console.log(`${manager.firstName} ${manager.secondName} отримав ${manager.countedSalary()} шекєлей`);
            for (let teammate of manager.team) {
                console.log(`${teammate.firstName} ${teammate.secondName} отримав ${teammate.countedSalary()} шекєлей`);
            }
        }
    }
};


const firstTeamDesigner1 = new Designer('Джейкоб', 'Вазовскі', 2000, 4, 0.2);
const firstTeamDesigner2 = new Designer('Томас', 'Емблер', 2500, 3, 0.777777);
const firstTeamDeveloper1 = new Developer('Боб', 'Малков', 3000, 1);
const firstTeamManager = new Manager('Андрій', 'Ковальський', 1500, 2, [firstTeamDesigner1, firstTeamDesigner2, firstTeamDeveloper1]);

const secondTeamDesigner1 = new Designer('Арон', 'Бовс', 3500, 3, 0.5);
const secondTeamDeveloper1 = new Developer('Семюел', 'Кук', 1500, 0);
const secondTeamDeveloper2 = new Developer('Ітан', 'Бренсон', 2000, 6);
const secondTeamManager = new Manager('Генрі', 'Девіс', 2500, 4, [secondTeamDesigner1, secondTeamDeveloper1, secondTeamDeveloper2]);

const department = new Department(firstTeamManager, secondTeamManager);

department.giveSalary();