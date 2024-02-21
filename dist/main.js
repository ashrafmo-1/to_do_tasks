"use strict";
let inp_title = document.querySelector('.to_do_title');
let inp_description = document.querySelector('.to_do_description');
let btn_add_task = document.querySelector('.addTask');
let task_boxes = document.querySelector('.to_do_boxes');
let empty_array = [];
let storedData = window.localStorage.getItem("tasks");
if (storedData) {
    empty_array = JSON.parse(storedData);
}
btn_add_task.addEventListener('click', (e) => {
    e.preventDefault();
    if (inp_description.value === '') {
        alert('must type description');
    }
    else if (inp_title.value !== '' && inp_description.value !== '') {
        add_task_to_arr(inp_title.value, inp_description.value);
        inp_title.value = '';
        inp_description.value = '';
    }
    else {
        console.error('you hava error i dont we will fix this soon');
    }
});
const add_task_to_arr = (title, desc) => {
    let task = {
        id: Date.now(),
        title: title,
        description: desc,
        finally: false,
    };
    empty_array.push(task);
    console.log(empty_array);
    add_task_to_page(empty_array);
    set_data_localStorage(empty_array);
};
const add_task_to_page = (empty_array) => {
    task_boxes.innerHTML = '';
    empty_array.forEach((task) => {
        let task_box = document.createElement('div');
        task_box.className = 'to_do_box';
        task_box.setAttribute('id_data', task.id);
        let box_title = document.createElement('h3');
        box_title.className = 'to_do_box_title';
        box_title.appendChild(document.createTextNode(task.title));
        task_box.appendChild(box_title);
        let box_description = document.createElement('h3');
        box_description.className = 'to_do_box_description';
        box_description.setAttribute('data-d', task.id);
        box_description.appendChild(document.createTextNode(task.description));
        let remove_task = document.createElement('span');
        remove_task.className = 'delete';
        remove_task.appendChild(document.createTextNode('remove'));
        let finally_task = document.createElement('img');
        finally_task.className = 'finally';
        finally_task.src = "../assets/check-mark.png";
        task_box.appendChild(box_description);
        task_box.appendChild(box_title);
        task_box.appendChild(remove_task);
        task_box.appendChild(finally_task);
        task_box.appendChild(box_description);
        task_boxes.appendChild(task_box);
        if (task.finally) {
            task_box.className = 'to_do_box done';
        }
        remove_task.onclick = (e) => {
            e.target.parentElement.remove();
            removeTask_fromLocalStorage(e.target.parentElement.getAttribute('id_data'));
        };
        finally_task.addEventListener('click', (e) => {
            task_box.classList.toggle('done');
            finallyTask_localStorage(e.target.parentElement.getAttribute('id_data'));
        });
    });
};
function set_data_localStorage(empty_array) {
    let set_data = window.localStorage.setItem("tasks", JSON.stringify(empty_array));
    console.log(set_data);
}
function get_data_localStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        add_task_to_page(tasks);
    }
}
get_data_localStorage();
const removeTask_fromLocalStorage = (id_tasks) => {
    empty_array = empty_array.filter((allTasks) => allTasks.id != id_tasks);
    set_data_localStorage(empty_array);
};
const finallyTask_localStorage = (id_tasks) => {
    for (let i = 0; i < empty_array.length; i++) {
        if (empty_array[i].id == id_tasks) {
            empty_array[i].finally == false ? empty_array[i].finally = true : empty_array[i].finally = false;
        }
    }
    set_data_localStorage(empty_array);
};
let controls_theme = document.querySelector('.controls_theme');
let gears_btn = document.querySelector('.gears .btn_gears');
gears_btn.addEventListener("click", () => {
    controls_theme.classList.toggle('active');
});
let themesChanger = document.querySelectorAll('.change_theme div');
themesChanger.forEach((div) => {
    div.addEventListener("click", (element) => {
        console.log(element.target.dataset.color);
        document.documentElement.style.setProperty("--main-color", element.target.dataset.color);
    });
});
function activeFunction(e) {
    e.target.parentElement.querySelectorAll('.active').forEach((el) => {
        el.classList.remove('active');
    });
    e.target.classList.add('active');
}
//# sourceMappingURL=main.js.map