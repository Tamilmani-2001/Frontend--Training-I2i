(function () {


    const categoryId = 0;

    const category = [
        {id:'day', icon:'<i class="fa fa-sun-o"></i>', text:'My Day'},
        {id:'important', icon:'<i class="fa fa-star-o"></i>', text:'Important'},
        {id:'plan', icon:'<i class="fa fa-calendar"></i>', text:'Planned'},
        {id:'assign', icon:'<i class="fa fa-user-o"></i>', text:'Assigned to me'},
        {id:'flagged-email', icon:'<i class="fa fa-flag-o"></i>', text:'Flagged email'},
        {id:'day-tasks', icon:'<i class="fa fa-home"></i>', text:'Tasks'}
    ]

    // function setUpCategory() {
    //     const category = [
    //         {id:'day', },
    //         {id:'plan', },
    //         {id:'assign', },
    //         {id:'important', },
    //         {id:'flagged-email', },
    //         {id:'day-tasks', }
    //     ]
    // }

    function createElement(element) {
        return document.createElement(element);
    }

    function createTextNode(text) {
        return document.createTextNode(text);
    }

    function getElementById(id) {
        return document.getElementById(id);
    }

    function getElementByClassName(className) {
        return document.getElementsByClassName(className);
    }
    function init() {
        // setUpHelp();
        createNewList();
        createNewTask();
    }
    init();

    function createNewList() {
        let listDetails = getElementById("list-addition");
        listDetails.addEventListener("keypress", function createListOrGroup(event) {
            if ('Enter' === event.key) {
                const list = createElement("li");
                const icon = createElement("i");
                const span = createElement("span");
                list.className = "icon";
                icon.className = "fa fa-bars";
                span.className = "icon-chamber-text";
                span.innerText = event.target.value;
                list.appendChild(icon);
                list.appendChild(span);
                getElementById("list-and-group").appendChild(list);
                listDetails.value = "";
            }
        });
    }

    function createNewTask() {
        let listDetails = getElementById("create-task");
        listDetails.addEventListener("keypress", function createTask(event) {
            if ('Enter' === event.key) {
                const list = createElement("li");
                const icon = createElement("i");
                const span = createElement("span");
                list.className = "icon";
                icon.className = "fa fa-circle-o";
                span.className = "task-list-text";
                span.innerText = event.target.value;
                list.appendChild(icon);
                list.appendChild(span);
                getElementById("task-list").appendChild(list);
                listDetails.value = "";
            }
        });
    }

    // function create() {
    //     var iconChamberList = document.getElementById("icon-chamber-list");
    //     function getIconChamberList() {
    //         return iconChamberList;
    //     }
    //     function setIconChamberList(listItem) {
    //         iconChamberList = listItem;
    //     }
    // }

})();


