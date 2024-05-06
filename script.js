const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateButton");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols='></?!@#$%^&*()_+}{[]';

let password="";
let passwordLength=10;
let checkCount=0;

handleSlider();


//set circle color to grey
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

 }
 
 function setIndicator(color){
    indicator.style.backgroundColor=color;
 }

 function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;//floor make value roundoff
 }

 function generateRandomNumber(){
    return getRndInteger(0,9);
 }



 function generateLowerCase(){
 return   String.fromCharCode(getRndInteger(97,123));//with the help of ASCII value we get lower case it give ascii value and string,fromcharcode convert it
 }


 function generateUpperCase(){
    return   String.fromCharCode(getRndInteger(65,91));//with the help of ASCII value we get lower case it give ascii value and string,fromcharcode convert it
    }


function generateSymbols(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}


function calcStrength(){
    //copy karna hai
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);//this method write on clipboard and return promise
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");//it will remove copied text after 2 sec
    },2000);
}

function handleCheckBoxChange(){
checkCount=0;
allCheckBox.forEach((checkBox)=>{
    if(checkBox.checked)
    checkCount++;
});
//specialCondition
if(passwordLength<checkCount){
    passwordLength=checkCount;
handleSlider();
}
} 

allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheckBoxChange);
})


inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})


generateBtn.addEventListener('click',()=>{
    //none of the checkbox are selected
    if(checkCount<=0)return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
//lets start the journey to find new passwrd

//remove old password
password="";
//lets put the stuff mentioned by checkboxes
/*if(uppercaseCheck.checked){
    password+=generateUpperCase();
}


if(lowercaseCheck.checked){
    password+=generatLowerCase();
}

if(numberCheck.checked){
    password+=generateRandomNumber();
}

if(symbolCheck.checked){
    password+=generateSymbols();
}*/

function shufflePassword(Array){
    //fisher yates method
    for(let i=Array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=Array[i];
        Array[i]=Array[j];
        Array[j]=temp;
    }
    let str="";
    Array.forEach((el)=>(str+=el));
    return str;}




let funcArr=[];
if(uppercaseCheck.checked)
funcArr.push(generateUpperCase);

if(lowercaseCheck.checked)
funcArr.push(generateLowerCase);

if(numberCheck.checked)
funcArr.push(generateRandomNumber);

if(symbolCheck.checked)
funcArr.push(generateSymbols);


//compulsary addition

for(let i=0;i<funcArr.length;i++){
    password+=funcArr[i]();
}

//remaining addition
for(let i=0;i<passwordLength-funcArr.length;i++){
    let randIndex=getRndInteger(0,funcArr.length);
    password+=funcArr[randIndex]();
}


//shuffle the password
password=shufflePassword(Array.from(password));

//display shuffle psswd in UI
passwordDisplay.value=password;

//calculate strength
calcStrength();
















});











