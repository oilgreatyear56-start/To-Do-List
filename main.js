/*
= To Do List Add
= By: 3liaymn
= v 1.5
*/

let inputTittle = document.querySelector("#tittle")
let addBtn = document.querySelector(".addBtn")
let box = document.querySelector(".box")
let completBox = document.querySelector(".complet")
let yet = document.querySelector(".impty")


// localStorage.clear()
chickItem()
addOldItem()
addOldItemcomplet()

// completBox.style.display = "flex"
addBtn.addEventListener("click", addTodo)


function creatItem (text, id) {
    // create box to content the tittle and button remove
    let item = document.createElement("div")
    item.className = "item"

    let content = document.createElement("div")
    content.className = "content"

    // create span For tittle
    let tittle = document.createElement("span")
    tittle.className = "tittle"
    tittle.textContent = text
    content.appendChild(tittle)
    

    // create div to continer the buttons
    let butotnsBox = document.createElement("div")
    butotnsBox.className = "butotnsBox"

    // create edit button to remove tittle
    let editBtn = document.createElement("button")
    editBtn.className = "editBtn"
    editBtn.textContent = "Edit"
    butotnsBox.appendChild(editBtn)
    

    // create remove button to remove tittle
    let removeBtn = document.createElement("button")
    removeBtn.className = "removeBtn"
    removeBtn.textContent = "Delate"
    butotnsBox.appendChild(removeBtn)
    
    // Add item to box content
    content.appendChild(butotnsBox)
    item.appendChild(content)
    box.appendChild(item)
    // Remove item from box
    removeBtn.addEventListener("click", () => {
        item.remove()
        deleteTodo(id)
    })
    editBtn.addEventListener("click", () => {
      createEditItem(item, tittle.textContent, tittle, id)
    })
    tittle.addEventListener("click", () => {
      item.remove()
      deleteTodo(id)
      addComplet(text,id)
    })
    chickItem()
}
function addTodo() {
    const tittle = inputTittle.value.trim();
    if (tittle === "") return;

  // 1) هات الداتا القديمة أو Object فاضي
    let todolist = JSON.parse(localStorage.getItem("todolist")) || {};

  // 2) اعمل ID جديد
  let id = Date.now(); // مضمون يكون unique

  // 3) أضف المهمة
    todolist[id] = {
    tittle: tittle,
    };

  // 4) خزّن تاني
    localStorage.setItem("todolist", JSON.stringify(todolist));
// 5) جلب بعد التخزين
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
// 6) ارسال البيانات للانشاء
    creatItem(savedTodos[id].tittle, id )

  // 5) فضّي الانبوت
    inputTittle.value = "";
}
function addOldItem () {
    let todolist = JSON.parse(localStorage.getItem("todolist"))
    for (let حمص in todolist) {
        creatItem(todolist[حمص].tittle, حمص)
    }
}
function createEditItem (item, text, tittle, id) {
  let boxEdit = document.createElement("div")
  boxEdit.className = "boxEdit"
// input
  let input = document.createElement("Input")
  input.setAttribute("type","text")
  input.setAttribute("id","inputId")
  input.className = "inputEdit"
  input.value = text
  boxEdit.appendChild(input)
// saveButten
  let saveButton = document.createElement("button")
  saveButton.className = "saveButton"
  saveButton.textContent = "save"
// cancelButten
  let cancelButton = document.createElement("button")
  cancelButton.className = "cancelButton"
  cancelButton.textContent = "cancel"

  let editbuttons = document.createElement("div")
  editbuttons.className = "editbuttons"
  editbuttons.appendChild(saveButton)
  editbuttons.appendChild(cancelButton)
  boxEdit.appendChild(editbuttons)
  item.appendChild(boxEdit)

cancelButton.addEventListener("click", () => {
  boxEdit.remove()
})
saveButton.addEventListener("click", () => {
tittle.textContent = input.value
editTodo(id, input.value)
boxEdit.remove()
})

}
function deleteTodo(id) {
  // 1) هات الداتا
  let todolist = JSON.parse(localStorage.getItem("todolist")) || {};

  // 2) امسح العنصر
  delete todolist[id];

  // 3) خزّن التعديل
  localStorage.setItem("todolist", JSON.stringify(todolist));

  chickItem()
}
function editTodo(id,newtittle) {
  // 1) هات الداتا
  let todolist = JSON.parse(localStorage.getItem("todolist")) || {};

  todolist[id] = {
    tittle: newtittle,
  };

  // 3) خزّن التعديل
  localStorage.setItem("todolist", JSON.stringify(todolist));
}
function chickItem() {
  if(localStorage.getItem("todolist") !== null)
  {
    let todolist = JSON.parse(localStorage.getItem("todolist"))
    if(Object.keys(todolist).length === 0 )
    {
      completBox.style.display = "none"
    }else{
      completBox.style.display = "flex"
    }
  }

  if(localStorage.getItem("complet") !== null)
  {
    let complet = JSON.parse(localStorage.getItem("complet"))
    if(!Object.keys(complet).length === 0 )
    {
      completBox.style.display = "none"
    }else{
      completBox.style.display = "flex"
    }
  }
}
function addComplet(text,id){
console.log(text + id)
let complet = JSON.parse(localStorage.getItem("complet")) || {}

complet[id] = {
  tittle: text,
}

localStorage.setItem("complet", JSON.stringify(complet))

    let savedTodos = JSON.parse(localStorage.getItem("complet"));
// 6) ارسال البيانات للانشاء
    createCompletItems(savedTodos[id].tittle, id )

}
function createCompletItems(text,id){

  yet.style.display = "none"
  let item = document.createElement("div")
  item.className = "completItem"

  let span = document.createElement("span")
  span.className = "completText"
  span.textContent = text
  item.appendChild(span)

  let btn = document.createElement("button")
  btn.textContent = "Delete"
  btn.className = "completBtnRem"
  item.appendChild(btn)
  completBox.appendChild(item)

  btn.addEventListener("click" , () => {
    item.remove()
    deleteCompletItem(id)
  })

  }

function addOldItemcomplet() {
    let complet = JSON.parse(localStorage.getItem("complet"))
    if(Object.keys(complet).length === 0)
    {
      yet.style.display = "inline-block"
    }
    for (let حمص in complet) {
        createCompletItems(complet[حمص].tittle, حمص)
    }
}
function deleteCompletItem(id) {
  // 1) هات الداتا
  let complet = JSON.parse(localStorage.getItem("complet")) || {};

  // 2) امسح العنصر
  delete complet[id];

  // 3) خزّن التعديل
  localStorage.setItem("complet", JSON.stringify(complet));
  
  let complet2 = JSON.parse(localStorage.getItem("complet"))

    if(Object.keys(complet2).length === 0)
    {
      yet.style.display = "inline-block"
    }
}

