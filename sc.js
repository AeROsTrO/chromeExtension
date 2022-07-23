let myLeads = [];
const inputEl = document.getElementById('input-el');
const saveBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const delBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');

//local storage
//save a key-value pair in localStorage
//refresh the page and get the value and log it to the console
//clear local storage

//hints:
//localStorage.getItem(key);
//localStorage.setItem(key, value);
//localStorage.clear()
//both key and val should be strings

let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}
//for deleting: when double clicked clear local Storage myLeads and DOM
saveBtn.addEventListener('click', saveLead);
inputEl.addEventListener('keyup', detect);
delBtn.addEventListener('dblclick', function () {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
});
tabBtn.addEventListener('click', function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
        function (tabs) {
            myLeads.push(tabs[0].url);
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
            renderLeads(myLeads);
        }
    )

})
function detect(e) {
    if (e.code === 'Enter') {
        const val = inputEl.value;
        myLeads.push(val);
        inputEl.value = "";
        renderLeads(myLeads);
    }

}

function saveLead() {
    const val = inputEl.value;
    myLeads.push(val);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    inputEl.value = "";
    console.log(localStorage.getItem('myLeads'));
    renderLeads(myLeads);
}
function renderLeads(leads) {
    let listItems = '';
    for (var i = leads.length - 1; i >= 0; i--) {
        // ulEl.innerHTML += '<li>' + myLeads[i] + '</li>';
        //create element
        //set text element
        //append to ul
        // const lchi = document.createElement('li');
        // lchi.textContent = myLeads[i];
        // ulEl.appendChild(lchi);
        listItems += `<li><a target='_blank' href='${leads[i]}'>${leads[i]}</a></li>`
    }
    ulEl.innerHTML = listItems;//improves performance and render time
}

//template strings/literals
// const re = 'james';
// const email = `hey
// ${re} how's i
// t going`;
// console.log(email);