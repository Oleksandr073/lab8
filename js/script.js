class Employee {
    constructor(firstName, secondName, baseSalary, experience) {
        this.firstName = firstName;
        this.secondName = secondName;
        this["base salary"] = baseSalary;
        this.experience = experience;
    }
    countedSalary() {
        if (this.experience > 2 && this.experience < 5) {
            return this["base salary"] + 200;
        }
        if (this.experience >= 5) {
            return this["base salary"] * 1.2 + 500;
        }
        return this["base salary"];
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
        if (this.team.filter((teammate) => Object.keys(teammate).length == 4).length > this.team.length / 2) {
            salary *= 1.1;
        }
        return salary.toFixed();
    }
}

const department = {
    managers: [],
    giveSalary: function () {
        for (let manager of this.managers) {
            console.log(`${manager.firstName} ${manager.secondName} отримав ${manager.countedSalary()} шекєлей`);
            for (let teammate of manager.team) {
                console.log(`${teammate.firstName} ${teammate.secondName} отримав ${teammate.countedSalary()} шекєлей`);
            }
        }
    },
};


let firstTeamDesigner1 = new Designer('Джейкоб', "Вазовскі", 2000, 4, 0.2);
let firstTeamDesigner2 = new Designer('Томас', "Емблер", 2500, 3, 0.777777);
let firstTeamDeveloper1 = new Developer('Боб', "Малков", 3000, 1);
let firstTeamManager = new Manager('Андрій', "Ковальський", 1500, 2, [firstTeamDesigner1, firstTeamDesigner2, firstTeamDeveloper1]);

let secondTeamDesigner1 = new Designer('Арон', "Бовс", 3500, 3, 0.5);
let secondTeamDeveloper1 = new Developer('Семюел', "Кук", 1500, 0);
let secondTeamDeveloper2 = new Developer('Ітан', "Бренсон", 2000, 6);
let secondTeamManager = new Manager('Генрі', "Девіс", 2500, 4, [secondTeamDesigner1, secondTeamDeveloper1, secondTeamDeveloper2]);

department.managers.push(firstTeamManager, secondTeamManager);

department.giveSalary();