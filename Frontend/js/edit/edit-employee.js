// Функция за изпращане на POST заявка за създаване на запис или PUT заявка за актуализация на запис
async function saveEmployeeData(id, token, data) {
    try {

        const response = await fetch(`http://localhost:8001/dashboard-view/${id}`, {
            method: "GET",
            headers: {
                "Authorization": token,
            }
        });



        if (response.ok) {

            const putResponse = await fetch(`http://localhost:8001/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (putResponse.ok) {

                return "Данните бяха успешно актуализирани.";
            } else {
                // return "Грешка при актуализация на данни: " + putResponse.statusText;
                const postResponse = await fetch(`http://localhost:8001/create/${id}`, {
                    method: "POST",
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (postResponse.ok) {
                    return "Данните бяха успешно създадени.";
                } else {
                    return "Грешка при създаване на данни: " + postResponse.statusText;
                }
            }

        } else {

        }
    } catch (error) {
        return "Възникна грешка при изпращане на заявка: " + error;
    }
}

window.onload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {

        window.location.href = "../login.html";
    } else {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');


        if (id) {
            try {
                const response = await fetch(`http://localhost:8001/dashboard-view/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": token,
                    }
                });

                if (response.ok) {

                    const data = await response.json();
                    const employeeData = data.data.Employee;

                    document.getElementById("firstName-input").value = employeeData ? employeeData.firstName : "";
                    document.getElementById("surName-input").value = employeeData ? employeeData.surName : "";
                    document.getElementById("lastName-input").value = employeeData ? employeeData.lastName : "";
                    document.getElementById("dateOfBirth-input").value = employeeData ? employeeData.dateOfBirth : "";
                    document.getElementById("address-input").value = employeeData ? employeeData.address : "";
                    document.getElementById("phoneNo-input").value = employeeData ? employeeData.phoneNo : "";

                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();


                        const updatedData = {
                            firstName: document.getElementById("firstName-input").value,
                            surName: document.getElementById("surName-input").value,
                            lastName: document.getElementById("lastName-input").value,
                            dateOfBirth: document.getElementById("dateOfBirth-input").value,
                            address: document.getElementById("address-input").value,
                            phoneNo: document.getElementById("phoneNo-input").value,

                        };

                        const saveResponse = await saveEmployeeData(id, token, updatedData);

                        alert(saveResponse);
                    });
                } else {
                    console.error("Грешка при извличане на данни на модел Employee с ID " + id);
                }
            } catch (error) {
                console.error("Грешка при изпращане на заявка:", error);
            }
        }
    }
}

document.getElementById("logout-button").addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");

    window.location.href = "../login.html";
});

document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "../index.html";
});
