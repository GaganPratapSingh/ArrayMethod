const main = document.getElementById('main');
const addUserBtn=document.getElementById('add_user');
const doubleBtn=document.getElementById('double_money');
const showMillionaireBtn=document.getElementById('show_only_Millionaires');
const sortBtn=document.getElementById('sort_by_richest');
const calculateWealthBtn=document.getElementById('calculate_entire_wealth');

getRandomUser();
getRandomUser();
getRandomUser();
let data=[];

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);
    const user = data.results[0];

    const newUser={
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000),
    };
    addData(newUser);
}

function doubleMoney(){
    data=data.map((user)=>{
        return {...user,money:user.money*2};
    });
    updateDOM();
}

function showMillionaires(){
    data=data.filter((user)=>user.money>1000000);
    updateDOM();
}

function sortbyrichest(){
    data=data.sort((a,b)=>b.money-a.money);
    updateDOM();
}


function calculateWealth(){
    const wealth=data.reduce((acc, user) => (acc += user.money),0);
    const wealthEle=document.createElement('div');
    wealthEle.innerHTML=`<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEle);
}

function addData(obj){
    data.push(obj);
    updateDOM();
}
 function updateDOM(providedData=data){
     main.innerHTML=' <h2><strong>Person</strong>Wealth</h2>'
    
     providedData.forEach( (item) => {
         const element=document.createElement('div');
         element.classList.add('person');
         element.innerHTML=`<strong>${item.name}</strong> ${formatMoney(item.money)}`;
         main.appendChild(element);
    });
}
function formatMoney(number){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}


addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortbyrichest);
calculateWealthBtn.addEventListener('click', calculateWealth);