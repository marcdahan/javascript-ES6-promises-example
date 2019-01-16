'use strict';
let comptePromesse = 0;

function DOMCreate() {
    this.buttonNumber = 0;
    this.marginTop = 200;
    this.createButton = function(name, className, callback, styles) {
        name = name || "Click Me";
        this.buttonNumber += 1;
        this.marginTop += 100;
        let defaultStyles = "color: white;background: red;z-index: 100;width: 200px;padding: 10px;position: absolute;top: " + this.marginTop.toString() + "px;left: 50%;margin-left: -100px;";
        //title 
        let title = document.createElement("TITLE");
        title.appendChild(document.createTextNode("Test ES6"));
        document.head.appendChild(title);
        //styles
        styles = (styles ? defaultStyles + styles : defaultStyles);     
        let newButton = document.createElement("BUTTON");
        newButton.appendChild(document.createTextNode(name));
        newButton.setAttribute("style", styles);
        newButton.setAttribute("class", className + this.buttonNumber);
        newButton.setAttribute("id", className + this.buttonNumber);
        newButton.setAttribute("type", "button");
        document.body.appendChild(newButton);
        let buttonNumber = this.buttonNumber;
        newButton.addEventListener("click", function() {
            if (callback) {
                callback(className + buttonNumber);
            }
        });
    };
    this.createDIVLog = function name(txt, className, styles) {
        let log = document.createElement("DIV");
        styles = styles || "display: block;background: black;color: white;min-width: 250px;min-height: 250px;";
        log.appendChild(document.createTextNode(txt));
        log.setAttribute("style", styles);
        log.setAttribute("class", className);
        log.setAttribute("id", className);
        document.body.appendChild(log);
    }
}

function testPromise() {
    let comptePromesse = 0;
    let log = document.getElementById('log');

    let promise1 = new Promise(function(resolve, reject) {
        comptePromesse++;
        let promesseActuelle = comptePromesse;
        let request1 = new XMLHttpRequest();
        request1.onreadystatechange = function(event) {
            if (request1.readyState === XMLHttpRequest.DONE) {
                if (request1.status === 200) {
                    log.insertAdjacentHTML('beforeend', "<br/>Promesse N°" + promesseActuelle + " :  RÉSOLUE (responseText): " + request1.responseText + "<br/>");
                    resolve("résolu : " + request1.responseText);
                } else {
                    log.insertAdjacentHTML('beforeend', "<br/>Promesse N°" + promesseActuelle + " : REJET (statusText): " + request1.statusText + "<br/>");
                    reject("rejet : " + request1.status + ", " + request1.statusText);                }
            }
        };
        request1.open('GET', 'https://raw.githubusercontent.com/marcdahan/javascript-ES6-promises-example/master/file-1.json', true);
        request1.send(null);
    });

    let promise2 = new Promise(function(resolve, reject) {
        comptePromesse++;
        let promesseActuelle = comptePromesse;
        let request2 = new XMLHttpRequest();
        request2.onreadystatechange = function(event) {
            if (request2.readyState === XMLHttpRequest.DONE) {
                if (request2.status === 200) {
                    log.insertAdjacentHTML('beforeend', "<br/>Promesse N°" + promesseActuelle + " : RÉSOLUE (responseText): " + request2.responseText + "<br/>");
                    resolve("Réponse reçue: " + request2.responseText);
                } else {
                    log.insertAdjacentHTML('beforeend', "<br/>Promesse N°" + promesseActuelle + " : REJET (statusText): " + request2.statusText + "<br/>");
                    reject("rejet : Status , " + request2.status + ", " + request2.statusText);
                }
            }
        };
        request2.open('GET', 'https://raw.githubusercontent.com/marcdahan/javascript-ES6-promises-example/master/file-2.json', true);
        request2.send(null);
    });

    Promise.race([promise1, promise2]).then((value) => {
        console.log("race send : " + value);
    })
    
    Promise.all([promise1, promise2]).then((value) => {
        // onFulfilled
        }, (reason) => {
        // onRejected
    }).catch((reason) => {
        throw new TypeError("un problème est survenu : " + reason);
    }).finally(() => {
        console.log('finally');
    });
    


}

function emptyTheDOM() {
    if (document.body) {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }
}

emptyTheDOM();
let dom = new DOMCreate();
dom.createButton("testor", "btn-", testPromise);
dom.createDIVLog("ready to begin the test", "log");