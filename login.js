const loginLink = "https://www.hackerrank.com/"
let puppeteer  = require('puppeteer');

let  {answers}  = require("./code");

let browserStartPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:["--start-fullscreen", '--window-size=1920,1040',"--disable-notifications"]
});
let browser,page;
browserStartPromise
    .then(function (browserObj){
        console.log("browser opened");
        browser = browserObj;
        let browserTabOpenPromise =  browser.newPage();
        return browserTabOpenPromise
    }).then(function (newTab){
        page = newTab;
        console.log("new tab opened");
        let gPageOpenPromise = newTab.goto(loginLink);
        return gPageOpenPromise;
    }).then(function () {
        let waitPromise = page.waitFor(2000);
        return waitPromise;
    }).then(function (){
        let elementClickPromise = waitAndClick("a[data-event-action='Login']",page);
        return elementClickPromise;
    }).then(function () {
        let waitPromise = page.waitFor(2000);
        return waitPromise;
    }).then(function (){
        let elementClickPromise = page.$$("a[role='button']");
        return elementClickPromise;
    }).then(function (allElem){
        let elementWillBeClickedPromise = allElem[4].click();
        return elementWillBeClickedPromise;
    })
    // .then(function (){
    //     let elementClickPromise = page.click("a[href='https://www.hackerrank.com/login?h_r=login&h_l=body_middle_left_button']");
    //     return elementClickPromise;
    // })
    
    .then(function () {
        let waitPromise = page.waitFor(2000);
        return waitPromise;
    }).then(function (){
        console.log("username entered");
        let waitForTypingPromise = typing("input[name='username']","cavadoh821@macauvpn.com",page);
        return waitForTypingPromise;
    }).then(function (){
        console.log("password entered");
        let waitForTypingPromise = typing("input[type='password']","Pepcoding@12",page);
        return waitForTypingPromise;
    }) .then(function () {
        let waitPromise = page.waitFor(2000);
        return waitPromise;
    }).then(function (){
        console.log("log in success")
        let elementClickPromise = waitAndClick("button[data-analytics='LoginPassword']",page);
        return elementClickPromise;
    }).then(function () {
        let topicPromise = waitAndClick(".topic-card a[data-attr1='algorithms']",page)
        return topicPromise;
    }).then(function () {
        let waitPromise = page.waitFor(2000);
        return waitPromise;
    }).then(function () {
        let topicPromise = waitAndClick("input[value='warmup']",page,{delay : 100})
        return topicPromise;
    }).then(function () {
        let waitPromise = page.waitFor(2000);
        return waitPromise;
    }).then(function (){
        let allQuestionPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{visible : true});
        return allQuestionPromise;
    }).then(function (questionArr) {
        console.log("Question will be solved :", questionArr.length);
        let questionWillBeSolvedpromise = questionSolver(page, questionArr[0],answers[0]);
        return questionWillBeSolvedpromise;
    })

 
    function waitAndClick(selector,currentPage){
        return new Promise(function(resolve , reject){
            let waitForElementPromise = currentPage.waitForSelector(selector,{visible : true});
            waitForElementPromise.then(function (){
                let elementClickPromise = currentPage.click(selector,{delay : 100});
                return elementClickPromise;
            }).then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            })
        })
    }


    function typing(selector,data,cPage){
        return new Promise(function(resolve, reject){
            let waitForTypingPromise = cPage.type(selector,data,{delay: 100});
            waitForTypingPromise.then(function(){
                resolve();
            }).catch(function(err){
                reject(err);
            }) 
        })
    }

    // function questionSolver(page, question, answer){
    //     return new Promise(function(resolve, reject){
    //         let qWillBeClickedPromise = question.click();
    //         qWillBeClickedPromise.then(function(){
    //             let waitForEditorToBeInFocus = waitAndClick(".monaco-scrollable-element.editor-scrollable.vs.mac",page);
    //             return waitForEditorToBeInFocus;
    //         })
    //         .then(function(){
    //             let cmdPressP = page.keyboard.down("Meta");
    //             return cmdPressP;
    //         }).then(function(){
    //             return page.keyboard.press("A", {delay : 100});
    //         }).then(function(){
    //             return page.keyboard.press("X", {delay : 100});
    //         }).then(function(){
    //             return page.keyboard.up("Meta");
    //         })
    //         .then(function(){
    //             return page.keyboard.type(answer, {delay : 50});
    //         })
        
    //         .then(function(){
    //             resolve();
    //         })
    //         .catch(function(err){
    //             console.log("Error - ", err);
    //             reject(err);
    //         })
    //     })
    // }

    function questionSolver(page, question, answer) {
        return new Promise(function (resolve, reject) {
            let qWillBeCLickedPromise = question.click();
            qWillBeCLickedPromise
                //click
                // code type 
                // ctrl A+ ctrl x
                // click on editor 
                // ctrl A+ctrl v
                //  reached to editor
                .then(function () {
                    // focus 
                    let waitFOrEditorToBeInFocus =
                        waitAndClick(".monaco-editor.no-user-select.mac.vs", page);
                    return waitFOrEditorToBeInFocus;
                })
                // click
                .then(function () {
                    return waitAndClick(".checkbox-input", page);
                }).then(function () {
         return page.waitForSelector("textarea.custominput", { visible: true });
                })
                .then(function () {
                    return page.type("textarea.custominput", answer, { delay: 10 });
                }).then(function () {
                    // focus 
                    let waitFOrEditorToBeInFocus =
                        waitAndClick("textarea.custominput", page);
                    return waitFOrEditorToBeInFocus;
                })
                .then(function () {
                    let ctrlIsPressedP = page.keyboard.down("Meta");
                    return ctrlIsPressedP;
                }).then(function () {
                    let AIsPressedP = page.keyboard.press("A", {delay : 100});
                    return AIsPressedP;
                }).then(function () {
                    console.log("doneeeee")
                    return page.keyboard.press("X", {delay : 100});
                })
                // .then(function () {
                //     let ctrlIsPressedP = page.keyboard.up("Meta");
                //     return ctrlIsPressedP;
                // })
                .then(function () {
                    // focus 
                    let waitFOrEditorToBeInFocus =
                        waitAndClick(".monaco-editor.no-user-select.mac.vs", page);
                    return waitFOrEditorToBeInFocus;
                })
                // .then(function () {
                //     let ctrlIsPressedP = page.keyboard.down("Meta");
                //     return ctrlIsPressedP;
                // })
                .then(function () {
                    let AIsPressedP = page.keyboard.down("A", { delay: 100 });
                    return AIsPressedP;
                }).then(function () {
                    let VIsPressedP = page.keyboard.down("V", { delay: 100 });
                    return VIsPressedP;
                }).then(function () {
                    let ctrlIsPressedP = page.keyboard.up("Meta");
                    return ctrlIsPressedP;
                }).then(function () {
                    let AIsPressedP = page.keyboard.up("A", { delay: 100 });
                    return AIsPressedP;
                }).then(function () {
                    let VIsPressedP = page.keyboard.up("V", { delay: 100 });
                    return VIsPressedP;
                }).then(function () {
                    return page.click(".hr-monaco__run-code", { delay: 50 });
                })
                .then(function () {
                    resolve();
                }).catch(function (err) {
                    console.log(err)
                    reject(err);
                })
        })
    }
    
    
    function handleIfNotPresent(selector,currentPage){
        return new Promise(function(resolve, reject){
            let waitAndClickPromise = waitAndClick(selector,currentPage);
            waitAndClickPromise.then(function(){
                resolve();
            })
            waitAndClickPromise.catch(function(err){
                resolve();
            })
        })
    }   



  
