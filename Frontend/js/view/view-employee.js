window.onload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {

        window.location.href = "login.html";
    } else {

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');


        if (id) {
            try {

                const response = await fetch(`http://localhost:8001/dashboard-view/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    const emailElement = document.getElementById("login-email");
                    const email = data.data.email;

                    if (email) {
                        emailElement.textContent = "Влезли сте с email: " + email;
                    } else {
                        emailElement.textContent = "Не сте влезли в системата.";
                    }

                    const tableBody = document.getElementById("table-body");

                    const employeeData = data.data; // Данните са в data.data

                    const row = document.createElement("tr");

                    const idCell = document.createElement("td");
                    idCell.textContent = employeeData.id;

                    const firstNameCell = document.createElement("td");
                    firstNameCell.textContent = employeeData.Employee.firstName;

                    const surNameCell = document.createElement("td");
                    surNameCell.textContent = employeeData.Employee.surName;

                    const lastNameCell = document.createElement("td");
                    lastNameCell.textContent = employeeData.Employee.lastName;

                    const genderCell = document.createElement("td");
                    genderCell.textContent = employeeData.Employee.gender;

                    const dateOfBirthCell = document.createElement("td");
                    dateOfBirthCell.textContent = employeeData.Employee.dateOfBirth;

                    const addressCell = document.createElement("td");
                    addressCell.textContent = employeeData.Employee.address;

                    const phoneNoCell = document.createElement("td");
                    phoneNoCell.textContent = employeeData.Employee.phoneNo;

                    row.appendChild(idCell);
                    row.appendChild(firstNameCell);
                    row.appendChild(surNameCell);
                    row.appendChild(lastNameCell);
                    row.appendChild(genderCell);
                    row.appendChild(dateOfBirthCell);
                    row.appendChild(addressCell);
                    row.appendChild(phoneNoCell);



                    tableBody.appendChild(row);
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

    // Пренасочване към страницата за вход (login.html)
    window.location.href = "../login.html";
});

document.getElementById("home-button").addEventListener("click", () => {
    // Пренасочване към началната страница (index.html)
    window.location.href = "../index.html";
});
