document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8001/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.token || data.refreshToken) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("refreshtoken", data.refreshToken);

                if(localStorage){
                    console.log('Yes')
                }else{
                    console.log('No')
                }

                const dashboardResponse = await fetch("http://localhost:8001/dashboard", {
                    method: "GET",
                    headers: {
                        "Authorization": `${data.token}`
                    }
                });
                if (dashboardResponse.ok) {
                    const dashboardData = await dashboardResponse.json();
                    const tableBody = document.getElementById("table-body");

                    dashboardData.data.forEach(dataItem => {
                        const row = document.createElement("tr");

                        // Създаване на клетки с данни за "ID", "Email", "Статус" и "Роля"
                        const idCell = document.createElement("td");
                        idCell.textContent = dataItem.id;

                        const emailCell = document.createElement("td");
                        emailCell.textContent = dataItem.email;

                        const statusCell = document.createElement("td");
                        statusCell.textContent = dataItem.status;
                        statusCell.classList.add(dataItem.status === "active" ? "active-status" : "inactive-status");

                        const roleCell = document.createElement("td");
                        roleCell.textContent = dataItem.role;
                        roleCell.classList.add(getRoleClass(dataItem.role));

                        const viewButtonCell = createButtonCell("View", "btn-success", () => {
                            window.location.href = `view.html?id=${dataItem.id}`;
                        });

                        const editButtonCell = createButtonCell("Edit", "btn-warning", () => {
                            window.location.href = `edit.html?id=${dataItem.id}`;
                        });

                        const deleteButtonCell = createButtonCell("Delete User", "btn-danger", async () => {
                            try {
                                const response = await fetch(`http://localhost:8001/delete/${dataItem.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": `${data.token}`
                                    }
                                });

                                if (response.ok) {
                                    row.remove();
                                } else {
                                    console.error("Грешка при изтриване на служител");
                                }
                            } catch (error) {
                                console.error("Грешка при изпращане на заявка:", error);
                            }
                        });

                        const deleteEmployeeButtonCell = createButtonCell("Delete Employee", "btn-danger", async () => {
                            try {
                                const response = await fetch(`http://localhost:8001/delete/employee/${dataItem.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Authorization": `${data.token}`
                                    }
                                });

                                if (response.ok) {

                                    row.remove(); // Премахване на реда от таблицата
                                } else {
                                    console.error("Грешка при изтриване на служител");
                                }
                            } catch (error) {
                                console.error("Грешка при изпращане на заявка:", error);
                            }
                        });


                        row.appendChild(idCell);
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
            } else {
                console.error("Грешка при влизане. Няма токени.");
            }
        } else {
            throw aError("Грешка при вход. Невалиден отговор от сървъра.");
        }
    } catch (error) {
        console.error("Грешка при вход:", error);
    }
});

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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

