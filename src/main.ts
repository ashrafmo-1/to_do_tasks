// all content work
let inp_title = <HTMLInputElement> document.querySelector('.to_do_title');
let inp_description = <HTMLInputElement> document.querySelector('.to_do_description');
let btn_add_task = <HTMLButtonElement> document.querySelector('.addTask');
let task_boxes = <HTMLDivElement> document.querySelector('.to_do_boxes');
let empty_array: any[] = [];

let storedData = window.localStorage.getItem("tasks");
if (storedData) {
    empty_array = JSON.parse(storedData);
}

// start on click "btn_add_task"
btn_add_task.addEventListener('click', (e) => {
    e.preventDefault();
    if(inp_description.value === '') {
        alert('must type description');
    } else if (inp_title.value !== '' && inp_description.value !== '') {
        add_task_to_arr(inp_title.value, inp_description.value);// push all data to empty array
        inp_title.value = '';
        inp_description.value = '';
    } else {
        console.error('you hava error i dont we will fix this soon');
    }
})

const add_task_to_arr = (title: string | number, desc: string | number) => {
    // data of task
    let task = {
        id: Date.now(),
        title: title,
        description: desc,
        finally: false,
    }
    // push task to array
    empty_array.push(task);
    console.log(empty_array);
    // add data to page
    add_task_to_page(empty_array);
    // add data to local storage
    set_data_localStorage(empty_array)
}

const add_task_to_page = (empty_array: any) => {
    task_boxes.innerHTML = '';
    // add contebt task to page;
    empty_array.forEach((task: any) => {
        let task_box = document.createElement('div');
        task_box.className = 'to_do_box';
        task_box.setAttribute('id_data', task.id);
        let box_title = document.createElement('h3'); // task title
        box_title.className = 'to_do_box_title';
        box_title.appendChild(document.createTextNode(task.title));
        task_box.appendChild(box_title);
        let box_description = document.createElement('h3'); // task description
        box_description.className = 'to_do_box_description';
        box_description.setAttribute('data-d', task.id);
        box_description.appendChild(document.createTextNode(task.description))
        let remove_task = document.createElement('span');
        remove_task.className = 'delete';
        remove_task.appendChild(document.createTextNode('remove'))

        let finally_task = document.createElement('img');
        finally_task.className = 'finally';
        finally_task.src = "../assets/check-mark.png";

        task_box.appendChild(box_description);
        task_box.appendChild(box_title);
        task_box.appendChild(remove_task);
        task_box.appendChild(finally_task);

        task_box.appendChild(box_description);
        task_boxes.appendChild(task_box);
        // task completed
        if (task.finally) {
            task_box.className = 'to_do_box done';
        }

        //* remove task */
        remove_task.onclick = (e: any): void => {
            e.target.parentElement.remove();
            removeTask_fromLocalStorage(e.target.parentElement.getAttribute('id_data'));
        }

        //* task is done or no */
        finally_task.addEventListener('click', (e: any) => {
            task_box.classList.toggle('done');
            finallyTask_localStorage(e.target.parentElement.getAttribute('id_data'));
        })
    });
}
// set data on localStorage
function set_data_localStorage(empty_array: any) {
    let set_data= window.localStorage.setItem("tasks", JSON.stringify(empty_array))
    console.log(set_data);
}
// get data on localStorage
function get_data_localStorage() {
    let data = window.localStorage.getItem("tasks");
    if(data) {
        let tasks = JSON.parse(data);
        add_task_to_page(tasks)
    }
}
// treger function
get_data_localStorage()
// remove task from localStorage
const removeTask_fromLocalStorage = (id_tasks: any) => {
    empty_array = empty_array.filter((allTasks: any) => allTasks.id != id_tasks)
    set_data_localStorage(empty_array)
}

const finallyTask_localStorage = (id_tasks: any) => {
    for (let i = 0; i < empty_array.length; i++) {
        if(empty_array[i].id == id_tasks) {
            empty_array[i].finally == false ? empty_array[i].finally = true : empty_array[i].finally = false
        }
    }
    set_data_localStorage(empty_array)
}

// controls all threme
let controls_theme = <HTMLDivElement> document.querySelector('.controls_theme');
let gears_btn = <HTMLImageElement> document.querySelector('.gears .btn_gears');
gears_btn.addEventListener("click", () => {
    controls_theme.classList.toggle('active')
})


// start changes themes
let themesChanger = document.querySelectorAll('.change_theme div');
themesChanger.forEach((div) => {
    div.addEventListener("click", (element: any) => {
        activeAction(element)
        console.log(`currently color is ${element.target.dataset.color}`);
        document.documentElement.style.setProperty("--main-color", element.target.dataset.color);
        window.sessionStorage.setItem("color_theme", element.target.dataset.color)
    })
})
// get data from local storage
let theme = window.sessionStorage.getItem("color_theme");
if (theme !== null) {
    document.documentElement.style.setProperty("--main-color", theme);
    //* handel active class on sessionStorage */
    themesChanger.forEach((element: any) => {
        element.classList.remove("active");
        if (element.dataset.color === theme) element.classList.add("active");
    })
}

// handle Active class
function activeAction(e: any) {
    e.target.parentElement.querySelectorAll('.active').forEach((el: Element) => {
        el.classList.remove('active');
    })
    e.target.classList.add('active');
}