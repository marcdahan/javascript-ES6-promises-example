'use strict';
var comptePromesse = 0;

function DOMCreate() {
    this.buttonNumber = 0;
    this.marginTop = 200;
    this.createButton = function(name, className, callback, styles) {
        name = name || "Click Me";
        this.buttonNumber += 1;
        this.marginTop += 100;
        var defaultStyles = "color:white;background: red;z-index: 100;width: 200px;padding: 10px;position:absolute;top: " + this.marginTop.toString() + "px;left: 50%;margin-left: -100px;";
        // //title 
        // var title = document.createElement("TITLE");
        // title.appendChild(document.createTextNode("Test ES6"));
        // document.body.appendChild(title);
        // //styles
        // styles = (styles ? defaultStyles + styles : defaultStyles);     
        //button
        var newButton = document.createElement("BUTTON");
        newButton.appendChild(document.createTextNode(name));
        newButton.setAttribute("style", styles);
        newButton.setAttribute("class", className + this.buttonNumber);
        newButton.setAttribute("id", className + this.buttonNumber);
        newButton.setAttribute("type", "button");
        document.body.appendChild(newButton);
        var buttonNumber = this.buttonNumber;
        newButton.addEventListener("click", function() {
        if (callback) {
            callback(className + buttonNumber);
        }
        });
    };
    this.createLog = function name(txt, className, styles) {
        var log = document.createElement("DIV");
        styles = styles || "display: block;background: black;color: white;min-width: 250px;min-height: 250px;";
        log.appendChild(document.createTextNode(txt));
        log.setAttribute("style", styles);
        log.setAttribute("class", className);
        log.setAttribute("id", className);
        document.body.appendChild(log);
    }
}

function testPromise() {
    var thisComptePromesse = ++comptePromesse;
    var log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisComptePromesse + ') Started (<small>Début du code synchrone</small>)<br/>');
    var p1 = new Promise(function(resolve, reject) {
        const req = new XMLHttpRequest();
        req.onreadystatechange = function(event) {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    console.log("Réponse reçue: %s", req.responseText);
                    resolve("Réponse reçue: %s", req.responseText)
                } else {
                    console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
                    reject("Status de la réponse: %d (%s)", req.status, req.statusTe);
                }
            }
        };
        req.open('GET', 'https://raw.githubusercontent.com/marcdahan/javascript-ES6-promises-example/master/file-1.json', true);
        req.send(null);
    });

    var p2 = new Promise(function(resolve, reject) {
        const req = new XMLHttpRequest();
        req.onreadystatechange = function(event) {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status === 200) {
                    console.log("Réponse reçue: %s", req.responseText);
                    resolve("Réponse reçue: %s", req.responseText)
                } else {
                    console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
                    reject("Status de la réponse: %d (%s)", req.status, req.statusTe);
                }
            }
        };
        req.open('GET', 'https://raw.githubusercontent.com/marcdahan/javascript-ES6-promises-example/master/file-2.json', true);
        req.send(null);
    });


    p1.then(function(val) {
        log.insertAdjacentHTML('beforeend', val + ') Promise fulfilled (<small>Fin du code asynchrone</small>)<br/>');
    }).catch(function() { 
        console.log("promesse rompue");
    });
    log.insertAdjacentHTML('beforeend', thisComptePromesse + ') Promise made (<small>Fin du code synchrone</small>)<br/>');
}

function emptyTheDOM() {
    if (document.body) {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }
}
emptyTheDOM();
var dom = new DOMCreate();
dom.createButton("testor", "btn-", testPromise);
dom.createLog("ready to begin the test", "log");