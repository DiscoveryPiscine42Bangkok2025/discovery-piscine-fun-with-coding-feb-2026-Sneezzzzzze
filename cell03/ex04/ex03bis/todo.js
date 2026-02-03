function getListContainer() {
    return $('#ft_list');
}

$(function() {
    $('button').click(createNewTodo);

    const cookies = document.cookie.split(';');
    const todoCookie = cookies.find(row => row.trim().startsWith('ft_list='));

    if (todoCookie) {
        try {
            const jsonStr = decodeURIComponent(todoCookie.split('=')[1]);
            const tasks = JSON.parse(jsonStr);
            if (Array.isArray(tasks)) {
                 tasks.reverse().forEach(task => addTask(task, false));
            }
        } catch (e) {
            console.error("Cookie parsing error:", e);
        }
    }
});

function saveToCookie() {
    const $ftList = getListContainer();
    const tasks = [];
    const items = $ftList.find('div');

    items.each(function() {
        tasks.push($(this).text());
    });

    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    const expires = "expires="+d.toUTCString();
    
    document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(tasks)) + ";" + expires + ";path=/";
}

function createNewTodo() {
    const task = prompt("Enter a new TO DO:");
    if (task && $.trim(task) !== "") {
        addTask(task, true);
    }
}

function addTask(text, isNew) {
    const $ftList = getListContainer();
    const $div = $('<div>').text(text);

    $div.on('click', function () {
        if (confirm("Do you really want to delete this TO DO?")) {
            $(this).remove();
            saveToCookie();
        }
    });

    $ftList.prepend($div);

    if (isNew) {
        saveToCookie();
    }
}
