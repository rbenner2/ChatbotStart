const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    GREETING:   Symbol("greeting"),
    ITEM1: Symbol("item1"),
    SIZE1:   Symbol("size1"),
    TOPPINGS1:   Symbol("toppings1"),
    ITEM2GREETING: Symbol("item2greeting"),
    ITEM2: Symbol("item2"),
    SIZE2: Symbol("size2"),
    TOPPINGS2: Symbol("toppings2"),
    DRINKS:  Symbol("drinks"),
    CHURROS: Symbol("churros")
});

module.exports = class TacoOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.GREETING;
        this.item1 = ""; //menu has 2 items. will validate which is ordered based on user input
        this.size1 = "";
        this.toppings1 = "";
        this.item2 = "";
        this.size2 = "";
        this.toppings2 = "";
        this.drinks = "";
        this.churros = "";
        this.total = 0;
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.GREETING:
                this.stateCur = OrderState.ITEM1;
                aReturn.push("Welcome to Regan's Taco Truck. &#127790;"); //adding taco emoji
                aReturn.push("What item from the menu would you like? \n 1. Taco \n 2. Nachos"); //2 main menu items available for purchase
                break;
            case OrderState.ITEM1:
                if(sInput.toLowerCase() == "taco"){ //validating menu item
                    this.item1 = sInput; //only saving item input if its valid
                    this.stateCur = OrderState.SIZE1;
                    aReturn.push("What size would you like? \n Small Taco - $5.00 \n Medium Taco - $7.00 \n Large Taco - $9.00");
                }
                else if(sInput.toLowerCase() == "nachos"){
                    this.item1 = sInput;
                    this.stateCur = OrderState.SIZE1;
                    aReturn.push("What size would you like? \n Small Nachos - $4.00 \n Medium Nachos - $6.00 \n Large Nachos - $8.00");
                }
                else{
                    aReturn.push("Please enter a valid menu item") //error handling if they type something not on the menu
                    aReturn.push("What item from the menu would you like? \n 1. Taco \n 2. Nachos"); 
                    this.stateCur = OrderState.ITEM1;
                    break;
                }
                break;
            case OrderState.SIZE1:
                if(sInput.toLowerCase() == "small"){ //validating size
                    this.size1 = sInput; //only saving item input if its valid
                    this.stateCur = OrderState.TOPPINGS1
                    aReturn.push("What toppings would you like?");
                }
                else if(sInput.toLowerCase() == "medium"){
                    this.size1 = sInput;
                    this.stateCur = OrderState.TOPPINGS1
                    aReturn.push("What toppings would you like?");
                }
                else if(sInput.toLowerCase() == "large"){
                    this.size1 = sInput;
                    this.stateCur = OrderState.TOPPINGS1
                    aReturn.push("What toppings would you like?");
                }
                else{
                    aReturn.push("Please enter a valid size. Small, medium or large.") //error handling
                    this.stateCur = OrderState.SIZE1;
                    break;
                }
                break;
            case OrderState.TOPPINGS1:
                this.stateCur = OrderState.ITEM2GREETING; 
                this.toppings1 = sInput;
                aReturn.push("Would you like to add a second item to your order? \n 1. Yes \n 2. No"); //2 main menu items available for purchase
                break;
            case OrderState.ITEM2GREETING:
                if(sInput.toLowerCase() == "yes"){ //confirming second item
                    this.stateCur = OrderState.ITEM2; //if they would like to add a second item, we switch to this case
                    aReturn.push("What second item from the menu would you like? \n 1. Taco \n 2. Nachos");
                }
                if (sInput.toLowerCase() == "no"){
                    this.stateCur = OrderState.CHURROS; //if no, we go straight to upsell
                    aReturn.push("Would you like churros with that? \n 1. Caramel Churros - $2.00 \n 2. Chocolate Churros - $2.00"); //second up-sell item
                }
                break;
            case OrderState.ITEM2:
                if (sInput.toLowerCase() == "taco"){
                    this.item2 = sInput; //only saving item input if its valid
                    this.stateCur = OrderState.SIZE2;
                    aReturn.push("What size would you like? \n Small Taco - $5.00 \n Medium Taco - $7.00 \n Large Taco - $9.00");
                }
                else if(sInput.toLowerCase() == "nachos"){
                    this.item2 = sInput;
                    this.stateCur = OrderState.SIZE2;
                    aReturn.push("What size would you like? \n Small Nachos - $4.00 \n Medium Nachos - $6.00 \n Large Nachos - $8.00");
                }
                else{
                    aReturn.push("Please enter a valid menu item") //error handling if they type something not on the menu
                    aReturn.push("What second item from the menu would you like? \n 1. Taco \n 2. Nachos"); 
                    this.stateCur = OrderState.ITEM2;
                    break;
                }
                break;
            case OrderState.SIZE2:
                    if(sInput.toLowerCase() == "small"){ //validating size
                        this.size2 = sInput; //only saving item input if its valid
                        this.stateCur = OrderState.TOPPINGS2
                        aReturn.push("What toppings would you like?");
                    }
                    else if(sInput.toLowerCase() == "medium"){
                        this.size2 = sInput;
                        this.stateCur = OrderState.TOPPINGS2
                        aReturn.push("What toppings would you like?");
                    }
                    else if(sInput.toLowerCase() == "large"){
                        this.size2 = sInput;
                        this.stateCur = OrderState.TOPPINGS2
                        aReturn.push("What toppings would you like?");
                    }
                    else{
                        aReturn.push("Please enter a valid size. Small, medium or large.") //error handling
                        this.stateCur = OrderState.SIZE2;
                        break;
                    }
                    break;
            case OrderState.TOPPINGS2:
                    this.stateCur = OrderState.CHURROS; 
                    this.toppings2 = sInput;
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
               if(this.item1.toLowerCase() == "taco"){ //Calculating cost if taco was ordered for first item
                    if(this.size1.toLowerCase() == "small"){ 
                    preTaxTotal += smallTaco;
                    }
                    if(this.size1.toLowerCase() == "medium"){ 
                        preTaxTotal += mediumTaco;
                    }
                    if(this.size1.toLowerCase() == "large"){ 
                        preTaxTotal += largeTaco;
                    }        
                }
                if(this.item1.toLowerCase() == "nachos"){ //Calculating cost if nachos was ordered for first item
                    if(this.size1.toLowerCase() == "small"){ 
                    preTaxTotal += smallNachos;
                    }
                    if(this.size1.toLowerCase() == "medium"){ 
                        preTaxTotal += mediumNachos;
                    }
                    if(this.size1.toLowerCase() == "large"){ 
                        preTaxTotal += largeNachos;
                    }        
                }
                if(this.item2.toLowerCase() == "taco"){ //Calculating cost if taco was ordered for second item
                    if(this.size2.toLowerCase() == "small"){ 
                    preTaxTotal += smallTaco;
                    }
                    if(this.size2.toLowerCase() == "medium"){ 
                        preTaxTotal += mediumTaco;
                    }
                    if(this.size2.toLowerCase() == "large"){ 
                        preTaxTotal += largeTaco;
                    }        
                }
                if(this.item2.toLowerCase() == "nachos"){ //Calculating cost if nachos was ordered for second item
                    if(this.size2.toLowerCase() == "small"){ 
                    preTaxTotal += smallNachos;
                    }
                    if(this.size2.toLowerCase() == "medium"){ 
                        preTaxTotal += mediumNachos;
                    }
                    if(this.size2.toLowerCase() == "large"){ 
                        preTaxTotal += largeNachos;
                    }        
                }
                let tax = 0.13;
                this.total = tax * preTaxTotal + preTaxTotal; //total of items with tax included

                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.size1} ${this.item1} with ${this.toppings1}`);
                if(this.item2){ //only displaying if a second item was added
                aReturn.push(`${this.size2} ${this.item2} with ${this.toppings2}`);
                }
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