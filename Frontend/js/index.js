window.onload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        // пренасочваме към login.html
        window.location.href = "./login.html";
    } else {
        try {
            const dashboardResponse = await fetch("http://localhost:8001/dashboard", {
                method: "GET",
                headers: {
                    "Authorization": `${token}`
                }
            });

            if (dashboardResponse.ok) {
                const dashboardData = await dashboardResponse.json();

             


                const tableBody = document.getElementById("table-body");


                dashboardData.data.forEach(dataItem => {

                    // Създаване на нов ред
                    const row = document.createElement("tr");


                    const idCell = document.createElement("td");
                    idCell.textContent = dataItem.id;

                    const firstNameCell = document.createElement("td");
                    firstNameCell.textContent = dataItem.Employee ? dataItem.Employee.firstName : "N/A";

                    const emailCell = document.createElement("td");
                    emailCell.textContent = dataItem.email;

                    const statusCell = document.createElement("td");
                    statusCell.textContent = dataItem.status;
                    statusCell.classList.add(dataItem.status === "active" ? "active-status" : "inactive-status");

                    const roleCell = document.createElement("td");
                    roleCell.textContent = dataItem.role;
                    roleCell.classList.add(getRoleClass(dataItem.role));

                    const viewButtonCell = createButtonCell("View", "btn-success", () => {
                        window.location.href = `./view/view.html?id=${dataItem.id}`;
                    });

                    const editButtonCell = createButtonCell("Edit", "btn-warning", () => {
                        window.location.href = `./edit/edit.html?id=${dataItem.id}`;
                    });

                    const deleteButtonCell = createButtonCell("Delete User", "btn-danger", async () => {
                        try {
                            const response = await fetch(`http://localhost:8001/delete/${dataItem.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `${token}`
                                }
                            });

                            if (response.ok) {

                                alert("Служителят беше успешно изтрит.");
                                row.remove();
                            } else {
                                const errorData = await response.json();
                                if (errorData.status === false && errorData.message) {

                                    alert(errorData.message);
                                } else {

                                    alert("Грешка при изтриване на служител");
                                }
                            }
                        } catch (error) {
                            alert("Грешка при изпращане на заявка: " + error.message);
                        }
                    });

                    const deleteEmployeeButtonCell = createButtonCell("Delete Employee", "btn-danger", async () => {
                        try {
                            const response = await fetch(`http://localhost:8001/delete/employee/${dataItem.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Authorization": `${token}`
                                }
                            });

                            if (response.ok) {

                                alert("Служителят беше успешно изтрит.");
                                row.remove();
                            } else {
                                const errorData = await response.json();
                                if (errorData.status === false && errorData.message) {

                                    alert(errorData.message);
                                } else {

                                    alert("Грешка при изтриване на служител");
                                }
                            }
                        } catch (error) {
                            alert("Грешка при изпращане на заявка: " + error.message);
                        }
                    });


                    row.appendChild(idCell);
                    row.appendChild(firstNameCell);
                    row.appendChild(emailCell);
                    row.appendChild(statusCell);
                    row.appendChild(roleCell);
                    row.appendChild(viewButtonCell);
                    row.appendChild(editButtonCell);
                    row.appendChild(deleteButtonCell);
                    row.appendChild(deleteEmployeeButtonCell);

                    // Добавяне на реда към таблицата
                    tableBody.appendChild(row);
                });
            } else {
                throw new Error("Грешка при извличане на данни от dashboard");
            }
        } catch (error) {
            console.error("Грешка при извличане на данни:", error);
        }
    }
};

function getRoleClass(role) {
    if (role === "admin") {
        return "admin-role";
    } else if ( role === "mod" ) {
        return "mod-role";
    } else {
        return "user-role";
    }
}

function createButtonCell(text, className, clickHandler) {
    const cell = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = text;
    button.className = `btn ${className}`;
    button.addEventListener("click", clickHandler);
    cell.appendChild(button);
    return cell;
}

document.getElementById("logout-button").addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");

    // Пренасочване към страницата за вход (login.html)
    window.location.href = "login.html";
});

document.getElementById("reg-button").addEventListener("click", () => {
    // Пренасочване към началната страница (index.html)
    window.location.href = "./signup.html";
});


