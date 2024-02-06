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
        let box_title = document.createElement('h3');
        box_title.className = 'to_do_box_title';
        box_title.setAttribute('data-id', task.id);
        box_title.appendChild(document.createTextNode(task.title));
        task_box.appendChild(box_title);
        let box_description = document.createElement('h3');
        box_description.className = 'to_do_box_description';
        box_description.setAttribute('data-d', task.id);
        box_description.appendChild(document.createTextNode(task.description));
        task_box.appendChild(box_description);
        task_box.appendChild(box_title);
        task_box.appendChild(box_description);
        task_boxes.appendChild(task_box);
        if (task.finally === true) {
            task_box.id = 'done';
        }
    });
};
function set_data_localStorage(empty_array) {
    let x = window.localStorage.setItem("tasks", JSON.stringify(empty_array));
    console.log(x);
}
function get_data_localStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        add_task_to_page(tasks);
    }
}
get_data_localStorage();
let controls_theme = document.querySelector('.controls_theme');
let gears_btn = document.querySelector('.gears .btn_gears');
gears_btn.addEventListener("click", () => {
    controls_theme.classList.toggle('active');
});
//# sourceMappingURL=main.js.map