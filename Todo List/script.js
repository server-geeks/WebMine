content = document.getElementById("content");
content.addEventListener("mouseover", function () {
    content.innerHTML =
        "<br><center><b> Hey!! ... we will meet soon </b> </center>";
});
content.addEventListener("mouseout", function () {
    content.innerText = "";
});

function view(string) {
    content.innerHTML =
        "<br><center><b> Tasks included in the TODO-list are : <br> <p> " +
        string +
        "</b> </p> </center>  ";
}

function sample(string) {
    content.innerHTML =
        "<br><center><b> Sample Task added is  : <br> <p> " +
        string +
        "</b> </p> </center>  ";
}

function feedback(string) {
    content.innerHTML =
        "<br><center><b> Feedback given by you   : <br> <p> " +
        string +
        "</b> </p> </center>  ";
}
function cleared(string) {
    content.innerHTML = "<br><center><b> <p> " + string + "</b> </p> </center> ";
}

function clicked_1() {
    if (confirm("Do you want to see the entire list ? ")) {
        Str = document.getElementById("content").innerText = JSON.parse(
            localStorage.itemsJson
        );
        update();
        view(Str);
        alert("Reload to get to the main view !!");
    }
}

function clicked_2() {
    clearStorage();
    update();
}

function clicked_3() {
    alert(
        "This a sample in which you which will be going through how to use this simple TODO-list"
    );
    alert("This would not be added in the exisiting TODO-list");
    str = prompt("Enter your task name");
    str2 = prompt("Enter your task description");
    if (str != null && str2 != null) {
        document.createElement("table");
        table.innerHTML = `
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>${str}</td>
                <td>${str2}</td>
                <td><button class="btn btn-primary">Delete</button></td>
              </tr>
            </tbody >
          </table>`;

        sample(str + " , " + str2);
    } else {
        alert("You have not entered the required task and it's description");
    }
    alert("Reload to get to the main view !!");
}

function clicked_4() {
    str = prompt("Enter feedback");
    if (str != null) {
        feedback(str);
    } else {
        feedback("Not Given");
    }
    alert("Reload to get to the main view !!");
}

function clicked_5() {
    content.innerHTML =
        "<br><center><b> <p> Ohh.. we are working on that !! </p> </center>  ";
}

box = document.getElementById("abt");
box.addEventListener("click", function () {
    alert(
        "This is a site created using JS, HTMl and CSS . Please provide an honest feedback !! 😊✌️"
    );
    clicked_4();
});

function getAndupdate() {
    console.log("Updating list...");
    title = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem("itemsJson") == null) {
        itemsJsonArray = [];
        itemsJsonArray.push([title, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    } else {
        itemsJsonArrayStr = localStorage.getItem("itemsJson");
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([title, desc]);
        localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem("itemsJson") == null) {
        itemsJsonArray = [];
        localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
    } else {
        itemsJsonArrayStr = localStorage.getItem("itemsJson");
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    }
    // Populating the table
    let itemtable = document.getElementById("table");
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str += `
    <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
          </tr>`;
    });
    itemtable.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getAndupdate);
update();

function deleted(itemIndex) {
    if (confirm("Do you really want this task to be deleted ???")) {
        console.log("Delete", itemIndex + 1);
        itemsJsonArrayStr = localStorage.getItem("itemsJson");
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        // Delete itemIndex element from the array
        itemsJsonArray.splice(itemIndex, 1);
        localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
        update();
    } else {
        alert("Deletion canceled !! ");
    }
    alert("Reload to get to the main view !!");
}

function clearStorage() {
    if (confirm("Do you really want to clear the entire list ? ")) {
        localStorage.clear();
        console.log("Clearing the storage");
        cleared("The TODO-list data has been cleared now !! ");
        update();
    }
}
