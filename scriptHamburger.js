'use strict';

class Hamburger {
    constructor(size, cost, calories) {
        this.size = size;
        this.cost = null;
        this.calories = null;
    }
    baseCost() {
        this.size === 'big' ? this.cost = 100 : this.cost = 50;
        //return cost;
    }
    baseCalories() {
        this.size === 'big' ? this.calories = 40 : this.calories = 20;
        //return calories;
    }
    addChees() {
        this.cost += 10;
        this.calories += 20;
    }
    addSalad() {
        this.cost += 20;
        this.calories += 5;
    }
    addPotatos() {
        this.cost += 15;
        this.calories += 10;
    }
    addSeasoning() {
        this.cost += 15;
        this.calories += 0;
    }
    addMayonnaise() {
        this.cost += 20;
        this.calories += 5;
    }
}

let sizeOrder = String(prompt("Введите размер гамбургера: big или small"));
let cheesOrder = String(prompt("Вам с сыром? Введите: yes или no"));
let saladOrder = String(prompt("Вам с салатом? Введите: yes или no"));
let potatoOrder = String(prompt("Вам с картошкой? Введите: yes или no"));
let seasoningOrder = String(prompt("Вам со специями? Введите: yes или no"));
let mayonnaiseOrder = String(prompt("Вам с майонезом? Введите: yes или no"));
const oderHamburger = new Hamburger(sizeOrder);
oderHamburger.baseCost();
oderHamburger.baseCalories();
if (cheesOrder === 'yes') oderHamburger.addChees();
if (saladOrder === 'yes') oderHamburger.addSalad();
if (potatoOrder === 'yes') oderHamburger.addPotatos();
if (seasoningOrder === 'yes') oderHamburger.addSeasoning();
if (mayonnaiseOrder === 'yes') oderHamburger.addMayonnaise();
let say = null;
oderHamburger.calories <= 50 ? say = "Приятного аппетита!" : say = "Эх..."
console.log(oderHamburger.cost + " " + oderHamburger.calories + "\n" + `${say}`);