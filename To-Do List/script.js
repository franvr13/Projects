const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


function addTask(){
    if(inputBox.value === ''){
        alert("You have not added any tasks");
    } 
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

const element = document.getElementById("myElement");

if (screenWidth <= 480) {
  element.style.width = "100%";
  element.style.fontSize = "16px";
} else {
  element.style.width = "50%";
  element.style.fontSize = "24px";
}