const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    GREETING:   Symbol("greeting"),
    ITEM: Symbol("item"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    CHURROS: Symbol("churros")
});

module.exports = class TacoOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.GREETING;
        this.item = ""; //menu has 2 items. will validate which is ordered based on user input
        this.size = "";
        this.toppings = "";
        this.drinks = "";
        this.churros = "";
        this.total = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.GREETING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Regan's Taco Truck. &#127790;"); //adding taco emoji
                aReturn.push("What item from the menu would you like? \n 1. Taco \n 2. Nachos"); //2 main menu items available for purchase
                break;
            case OrderState.ITEM:
                if(sInput.toLowerCase() == "taco"){ //validating menu item
                    this.item = sInput; //only saving item input if its valid
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("What size would you like? \n Small Taco - $5.00 \n Medium Taco - $7.00 \n Large Taco - $9.00");
                }
                else if(sInput.toLowerCase() == "nachos"){
                    this.item = sInput;
                    this.stateCur = OrderState.SIZE;
                    aReturn.push("What size would you like? \n Small Nachos - $4.00 \n Medium Nachos - $6.00 \n Large Nachos - $8.00");
                }
                else{
                    aReturn.push("Please enter a valid menu item") //error handling if they type something not on the menu
                    aReturn.push("What item from the menu would you like? \n 1. Taco \n 2. Nachos"); 
                    this.stateCur = OrderState.ITEM;
                    break;
                }
                break;
            case OrderState.SIZE:
                if(sInput.toLowerCase() == "small"){ //validating size
                    this.size = sInput; //only saving item input if its valid
                    this.stateCur = OrderState.TOPPINGS
                    aReturn.push("What toppings would you like?");
                }
                else if(sInput.toLowerCase() == "medium"){
                    this.size = sInput;
                    this.stateCur = OrderState.TOPPINGS
                    aReturn.push("What toppings would you like?");
                }
                else{
                    aReturn.push("Please enter a valid size. Small, medium or large.") //error handling
                    this.stateCur = OrderState.SIZE;
                    break;
                }
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.CHURROS; 
                this.toppings = sInput;
                aReturn.push("Would you like churros with that? \n 1. Caramel Churros - $2.00 \n 2. Chocolate Churros - $2.00"); //second up-sell item
                break;
            case OrderState.CHURROS:
                this.stateCur = OrderState.DRINKS;
                if(sInput.toLowerCase() != "no"){ //Case insensitive string comparison
                    this.churros = sInput;
                }
                aReturn.push("Would you like a drink with that?"); //basic up-sell item
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.drinks = sInput;
                }

                //calculating order total
                let preTaxTotal = 0;
                let smallTaco = 5.00;
                let mediumTaco = 7.00;
                let largeTaco = 9.00;
                let smallNachos = 4.00;
                let mediumNachos = 6.00;
                let largeNachos = 8.00;
                let churrosCost = 2.00;
                let sDrinksCost = 2.50;

                if(this.churros){ //if churros were ordered, adding to the cost
                    preTaxTotal += churrosCost;
                }
                if(this.drinks){ //if drink was ordered, adding to the cost
                    preTaxTotal += sDrinksCost;
                }
               if(this.item.toLowerCase() == "taco"){ //Calculating cost if taco was ordered
                    if(this.size.toLowerCase() == "small"){ 
                    preTaxTotal += smallTaco;
                    }
                    if(this.size.toLowerCase() == "medium"){ 
                        preTaxTotal += mediumTaco;
                    }
                    if(this.size.toLowerCase() == "large"){ 
                        preTaxTotal += largeTaco;
                    }        
                }
                if(this.item.toLowerCase() == "nachos"){ //Calculating cost if nachos was ordered
                    if(this.size.toLowerCase() == "small"){ 
                    preTaxTotal += smallNachos;
                    }
                    if(this.size.toLowerCase() == "medium"){ 
                        preTaxTotal += mediumNachos;
                    }
                    if(this.size.toLowerCase() == "large"){ 
                        preTaxTotal += largeNachos;
                    }        
                }
                let tax = 0.13;
                this.total = tax * preTaxTotal + preTaxTotal; //total of items with tax included

                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.size} ${this.item} with ${this.toppings}`);
                if(this.churros){
                    aReturn.push(this.churros);
                }
                if(this.drinks){
                    aReturn.push(this.drinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                //displaying order total to customer
                aReturn.push(`Please pick it up at ${d.toTimeString()}. Your order total is $${this.total.toFixed(2)}`); 
                break;
        }
        return aReturn;
    }
}