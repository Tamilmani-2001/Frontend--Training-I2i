(function () {

    const category = [];
    const selectedCategory = [];
    const tasks = [];

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

    function querySelectorAll(value) {
        return document.querySelectorAll(value);
    }

    function helpCategoryList() {

        let categoryList = [];

        function getCategoryByGivenId(value) {
            let categoryDetail;
            for (let i = 0; i < categoryList.length; i++) {
                if (value === categoryList[i].categoryName) {
                    categoryDetail = categoryList[i].categoryName;
                }
            }
            return categoryDetail;
        }

        return {
            pushCategory(value) {
                categoryList.push(value);
                console.log(categoryList);
            },

            getCategory() {
                return categoryList;
            },

            getCategoryById(value) {
                return getCategoryByGivenId(value);
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

    const categoryId = makeCounter();
    const taskId = makeCounter();
    const untitledListCounter = makeCounter();
    const categoryHelper = helpCategoryList();

    function createCategoryList() {
        let category = [
            { id: 'day', icon: "fa fa-sun-o", text: 'My Day' },
            { id: 'important', icon: "fa fa-star-o", text: 'Important' },
            { id: 'plan', icon: "fa fa-calendar", text: 'Planned' },
            { id: 'assign', icon: "fa fa-user-o", text: 'Assigned to me' },
            { id: 'flagged-email', icon: "fa fa-flag-o", text: 'Flagged email' },
            { id: 'day-tasks', icon: "fa fa-home", text: 'Tasks' }
        ]
        return category;
    }

    function createCategory() {
        let iconChamber = getElementById("icon-chamber");
        iconChamber.innerHTML = "";
        let newCategory = createCategoryList();
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
        }
    }

    function setCategoryList(value) {
        categoryId.increment();
        const category = {
            categoryId: categoryId.getValue(),
            categoryName: value,
            categoryTask: []
        }
        categoryHelper.pushCategory(category);
        return categoryId.getValue();
    }

    function helpListName(value) {
        if ("" === value) {
            value = "Untitled List";
        }
        let newValue = categoryHelper.getCategoryById(value);
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
                createCategory();
                getElementById("list-and-group").appendChild(list);
                listDetails.value = "";
                addEventToList();
            }
        });
    }

    function addEventToList() {
        let categoryList = getElementById("list-and-group").querySelectorAll("[data-category-id]");
        for (let i = 0; i < categoryList.length; i++) {
            let category = categoryList[i].onclick = function () {
                
            };
            //let value = category.attributes.getNamedItem("data-category-id").value;
        }
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

    function init() {
        addEventToList();
        makeCounter();
        createCategoryList();
        createCategory();
        createNewList();
        createNewTask();
        helpCategoryList();
    }
    init();

})();


