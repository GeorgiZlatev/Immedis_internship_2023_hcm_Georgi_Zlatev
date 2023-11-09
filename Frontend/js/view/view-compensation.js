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
                        "Authorization": `${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();

                    const emailElement = document.getElementById("login-email");
                    const email = data.data.email; // Извлечете email от първия запис в данните
                    // console.log(email)
                    if (email) {
                        emailElement.textContent = "Влезли сте с email: " + email;
                    } else {
                        emailElement.textContent = "Не сте влезли в системата.";
                    }


                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;


                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;


                    const tableBody = document.getElementById("table-body");

                    const compensationData = data.data.Compensation;

                    const row = document.createElement("tr");

                    const idCell = document.createElement("td");
                    idCell.textContent = data.data.id;

                    const salaryCell = document.createElement("td");
                    salaryCell.textContent = compensationData.salary;

                    const currencyCell = document.createElement("td");
                    currencyCell.textContent = compensationData.currency;

                    const bonusesCell = document.createElement("td");
                    bonusesCell.textContent = compensationData.bonuses;



                    row.appendChild(idCell);
                    row.appendChild(salaryCell);
                    row.appendChild(currencyCell);
                    row.appendChild(bonusesCell);

                    tableBody.appendChild(row);
                } else {
                    console.error("Грешка при извличане на данни на модел Leave с ID " + id);
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