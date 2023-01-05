(function () {

    function init() {
        makeCounter();
        createCategoryList();
        createCategory();
        createNewList();
        createNewTask();
        helpCategoryList();
        addTaskClickEvent();
    }

    const categoryId = makeCounter();
    const taskId = makeCounter();
    const untitledListCounter = makeCounter();
    const categoryHelper = helpCategoryList();
    const taskHelper = taskHelperList();
    const defaultCategoryHelper = createCategoryList();

    function createElement(element) {
        return document.createElement(element);
    }

    function createTextNode(categorytext) {
        return document.createTextNode(text);
    }

    function getElementById(id) {
        return document.getElementById(id);
    }

    function helpCategoryList() {

        let categoryList = [];

        function getCategoryByGivenId(value) {
            let categoryDetail;
            for (let i = 0; i < categoryList.length; i++) {
                if (value == categoryList[i].categoryId) {
                    categoryDetail = categoryList[i];
                }
            }
            return categoryDetail;
        }

        function getCategoryByGivenName(value) {
            let categoryDetail;
            for (let i = 0; i < categoryList.length; i++) {
                if (value == categoryList[i].categoryName) {
                    categoryDetail = categoryList[i];
                }
            }
            return categoryDetail;
        }

        return {
            pushCategory(value) {
                categoryList.push(value);
            },

            getCategory() {
                return categoryList;
            },

            getCategoryById(value) {
                return getCategoryByGivenId(value);
            },

            getCategoryByName(value) {
                return getCategoryByGivenName(value);
            }
        }
    }

    function taskHelperList() {

        let taskList = [];

        function getTaskByGivenId(value) {
            let taskDetail;
            for (let i = 0; i < taskList.length; i++) {
                if (value == taskList[i].taskId) {
                    taskDetail = taskList[i];
                }
            }
            return taskDetail;
        }

        function getTaskByGivenName(value) {
            let taskDetail;
            for (let i = 0; i < taskList.length; i++) {
                if (value == taskList[i].taskName) {
                    taskDetail = taskList[i];
                }
            }
            return taskDetail;
        }

        function getTaskByGivenCategoryId(value) {
            let taskDetails = [];
            for (let i = 0; i < taskList.length; i++) {
                if (value == taskList[i].categoryId) {
                    taskDetails.push(taskList[i]);
                }
            }
            return taskDetails;
        }

        return {
            pushTask(value) {
                taskList.push(value);
            },

            getTask() {
                return taskList;
            },

            getTaskById(value) {
                return getTaskByGivenId(value);
            },

            getTaskByName(value) {
                return getTaskByGivenName(value);
            },

            getTaskByCategoryId(value) {
                return getTaskByGivenCategoryId(value);
            }

        }
    }

    function makeCounter() {
        let privateCounter = 0;
        function changeBy(val) {
            privateCounter += val;
        }
        return {
            increment() {
                changeBy(1);
            },

            getValue() {
                return privateCounter;
            },

            setValue(value) {
                privateCounter = value;
            }
        };
    };

    function createCategoryList() {
        const category = [
            { id: 'day', icon: "fa fa-sun-o", text: 'My Day' },
            { id: 'important', icon: "fa fa-star-o", text: 'Important' },
            { id: 'plan', icon: "fa fa-calendar", text: 'Planned' },
            { id: 'assign', icon: "fa fa-user-o", text: 'Assigned to me' },
            { id: 'flagged-email', icon: "fa fa-flag-o", text: 'Flagged email' },
            { id: 'day-tasks', icon: "fa fa-home", text: 'Tasks' }
        ];

        function getCategoryByGivenId(value) {
            let categoryDetail;
            for (let i = 0; i < category.length; i++) {
                if (value == category[i].id) {
                    categoryDetail = category[i];
                }
            }
            return categoryDetail;
        }

        return {

            getCategory() {
                return category;
            },

            getCategoryById(value) {
                return getCategoryByGivenId(value);
            }
        }

    }

    function createCategory() {
        let iconChamber = getElementById("icon-chamber");
        let newCategory = defaultCategoryHelper.getCategory();
        for (let i = 0; i < newCategory.length; i++) {
            const list = createElement("li");
            const icon = createElement("i");
            const span = createElement("span");
            list.id = newCategory[i].id;
            list.className = "icon";
            icon.className = newCategory[i].icon;
            span.className = "icon-chamber-text";
            span.innerText = newCategory[i].text;
            list.appendChild(icon);
            list.appendChild(span);
            iconChamber.appendChild(list);
            addEventToDefaultCategory();
        }
    }

    function addEventToDefaultCategory() {
        let defaultCategorys = getElementById("icon-chamber").getElementsByTagName("li");
        for (let i = 0; i < defaultCategorys.length; i++) {
            defaultCategorys[i].onclick = getDefaultCategory(defaultCategorys[i].id);
        }
    }

    function getDefaultCategory(value) {
        return function () {
            let defaultCategory = defaultCategoryHelper.getCategoryById(value);
            let tasks = taskHelper.getTaskByCategoryId(value);
            let childNodesList = getElementById("category-tasks").childNodes;
            getElementById("list-tasks").dataset.categoryId = value;
            for (let i = 0; i < childNodesList.length; i++) {
                if (childNodesList[i].id == "home-icon") {
                    childNodesList[i].innerHTML = "";
                    let icon = createElement('i');
                    icon.className = defaultCategory.icon;
                    childNodesList[i].appendChild(icon);
                }
                if (childNodesList[i].id == "home-text") {
                    childNodesList[i].innerText = defaultCategory.text;
                }
            }
            renderTaskByCategory(tasks);
        }
    }

    function setCategoryList(value) {
        categoryId.increment();
        const category = {
            categoryId: categoryId.getValue(),
            categoryName: value
        }
        categoryHelper.pushCategory(category);
        return categoryId.getValue();
    }

    function helpListName(value) {
        if ("" === value) {
            value = "Untitled List";
        }
        let newValue = categoryHelper.getCategoryByName(value);
        if (undefined !== newValue) {
            untitledListCounter.increment();
            value += untitledListCounter.getValue();
        }
        return value;
    }

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
                const value = helpListName(event.target.value);
                span.innerText = value;
                list.dataset.categoryId = setCategoryList(value);
                list.appendChild(icon);
                list.appendChild(span);
                getElementById("list-and-group").appendChild(list);
                listDetails.value = "";
                addEventToList();
            }
        });
    }

    function addEventToList() {
        let categoryList = getElementById("list-and-group").getElementsByTagName('li');
        for (let i = 0; i < categoryList.length; i++) {
            categoryList[i].onclick = getCategory(categoryList[i].dataset.categoryId);
        }
    }

    function getCategory(value) {
        return function () {
            let category = categoryHelper.getCategoryById(value);
            let tasks = taskHelper.getTaskByCategoryId(value);
            let childNodesList = getElementById("category-tasks").childNodes;
            getElementById("list-tasks").dataset.categoryId = value;
            for (let i = 0; i < childNodesList.length; i++) {
                if (childNodesList[i].id == "home-icon") {
                    childNodesList[i].innerHTML = "";
                    let icon = createElement('i');
                    icon.className = "fa fa-bars";
                    childNodesList[i].appendChild(icon);
                }
                if (childNodesList[i].id == "home-text") {
                    childNodesList[i].innerText = category.categoryName;
                }
            }
            renderTaskByCategory(tasks);
        }
    }

    function renderTaskByCategory(tasks) {
        getElementById("task-list").innerHTML = "";
        for (let i = 0; i < tasks.length; i++) {
            renderTask(tasks[i]);
        }
    }

    function renderTask(task) {
        const list = createElement("li");
        const icon = createElement("i");
        const span = createElement("span");
        list.className = "icon";
        icon.className = "fa fa-circle-o";
        span.className = "task-list-text";
        span.innerText = task.taskName;
        list.dataset.taskId = task.taskId;
        list.appendChild(icon);
        list.appendChild(span);
        getElementById("task-list").prepend(list);
    }

    function createNewTask() {
        let listDetails = getElementById("create-task");
        listDetails.addEventListener("keypress", function createTask(event) {
            if ('Enter' === event.key) {

                let taskDetail = createTaskObject(event.target.value);
                let categoryId = getElementById("list-tasks").dataset.categoryId;
                if (undefined !== categoryId) {
                    taskDetail.categoryId = categoryId;
                }
                addTaskInTaslList(taskDetail);
                renderTask(taskDetail);
                // const list = createElement("li");
                // const icon = createElement("i");
                // const span = createElement("span");
                // list.className = "icon";
                // icon.className = "fa fa-circle-o";
                // span.className = "task-list-text";
                // span.innerText = taskDetail.taskName;
                // list.appendChild(icon);
                // list.appendChild(span);
                // list.dataset.taskId = taskDetail.taskId;
                // getElementById("task-list").prepend(list);
                listDetails.value = "";
            }
        });
    }

    function createTaskObject(name) {
        taskId.increment();
        return {
            taskId: taskId.getValue(),
            taskName: name,
            categoryId: null
        };
    }

    function addTaskInTaslList(taskDetail) {
        taskHelper.pushTask(taskDetail);
    }

    function addTaskClickEvent() {
        
    }

    init();

})();

