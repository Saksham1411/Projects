var input = document.getElementById('input');
var addBtn = document.getElementById('addbtn');
var list = document.querySelector('.display ul');
var filter = document.querySelector('.filter input');
var clearAll = document.querySelector('#clear');
let isEdit = false;

document.addEventListener('DOMContentLoaded', () => {
    let items = getItemFromStorage();
    items.forEach((i)=>{
        addItemToDisplay(i);
    })
})



addBtn.addEventListener('click', addBtnF);

// add button Function
function addBtnF(e) {
    //creating a list item
    let val = input.value.trim();
    if (input.value.trim() === "") {
        alert("your input is empty");
    }

    if (isEdit) {
        let olditem = document.querySelector('.edit-mode');
        olditem.remove();
        removeItemFromStorage(olditem.textContent);
        isEdit = false;
    }
    
    addItemToStorage(val);
    addItemToDisplay(val);

    display();
}
//adding item to list
function addItemToDisplay(val) {
    
    let item = document.createElement('li');
    item.innerHTML = val;
    list.appendChild(item);
    filter.style.display = 'block';
    clearAll.style.display = 'block';
    input.value = "";

    //creating del button
    let del = document.createElement('button');
    del.className = 'delete';
    let icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark';
    del.appendChild(icon);
    item.appendChild(del);
}



//deleting value
list.addEventListener('click', removeItem);

function removeItem(e) {
    if (e.target.parentElement.classList.contains('delete')) {
        if (confirm("Are you sure?")) {
            let li = e.target.parentElement.parentElement;
            console.log(li);
            list.removeChild(li);
            removeItemFromStorage(li.textContent);
            display();
        }
    } else {
        editMode(e.target);
    }
}

//edit item
function editMode(item) {
    isEdit = true;
    document.querySelectorAll('li').forEach((item) => {
        item.classList.remove('edit-mode');
    });
    item.classList.add('edit-mode');
    addBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
    addBtn.style.backgroundColor = '#228B22';
    console.log(item.textContent);
    input.value = item.textContent;
}


//removing search bar and clear all button if no item in list
function display() {
    let item = document.querySelectorAll('li');
    if (item.length == 0) {
        filter.style.display = 'none';
        clearAll.style.display = 'none';
    }
    addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>   Add';
    addBtn.style.backgroundColor = '#333333';

}

//searching items;
filter.addEventListener('keyup', searchItem);

function searchItem(e) {
    let val = e.target.value.toLowerCase();
    let items = document.querySelectorAll('li');
    items.forEach((item) => {
        let name = item.firstChild.textContent.toLowerCase();
        if (name.indexOf(val) == -1) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    })
}

//clear all

clearAll.addEventListener('click', removeAllItems);

function removeAllItems(e) {
    let items = document.querySelectorAll('li');
    items.forEach((item) => {
        item.remove();
        removeItemFromStorage(item.textContent);
    })
    display();
}


//local storage

function getItemFromStorage() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function addItemToStorage(item) {
    let items = getItemFromStorage();

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));

}
function removeItemFromStorage(item) {
    let items = getItemFromStorage();

    items = items.filter((i)=> i!==item );

    localStorage.setItem('items',JSON.stringify(items));
}