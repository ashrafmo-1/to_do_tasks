// all content work
let inp_title = <HTMLInputElement> document.querySelector('.to_do_title');
let inp_description = <HTMLInputElement> document.querySelector('.to_do_description');
let btn_add_task = <HTMLButtonElement> document.querySelector('.addTask');
let task_boxes = <HTMLDivElement> document.querySelector('.to_do_boxes');
let empty_array: any = [];

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
}

const add_task_to_page = (empty_array: any) => {
    task_boxes.innerHTML = '';
    // add contebt task to page;
    empty_array.forEach((task: any) => {
        let task_box = document.createElement('div');
        task_box.className = 'to_do_box';
        let box_title = document.createElement('h3'); // task title
        box_title.className = 'to_do_box_title';
        box_title.setAttribute('data-id', task.id);
        box_title.appendChild(document.createTextNode(task.title));
        task_box.appendChild(box_title);
        let box_description = document.createElement('h3'); // task description
        box_description.className = 'to_do_box_description';
        box_description.setAttribute('data-d', task.id);
        box_description.appendChild(document.createTextNode(task.description))
        task_box.appendChild(box_description);
        task_box.appendChild(box_title);
        task_box.appendChild(box_description);
        task_boxes.appendChild(task_box);
        let footer_controls = document.createElement('div') as HTMLDivElement; // contrles on task
        footer_controls.className = 'footer_controls'
        let finally_btn = document.createElement('button') as HTMLButtonElement; // finally task
        finally_btn.className = 'remove';
        finally_btn.appendChild(document.createTextNode('remove'));
        footer_controls.appendChild(finally_btn)
        task_box.appendChild(footer_controls)
        // task completed
        if (task.finally === true) {
            task_box.id = 'done';
        }
    });
}

task_boxes.addEventListener('click', (e: any) => {
    if (e.target.classList.contains("to_do_box")) {
        e.target.classList.toggle("done");
    }
})