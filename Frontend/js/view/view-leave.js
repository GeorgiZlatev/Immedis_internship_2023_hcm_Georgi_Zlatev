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
                    const email = data.data.email;

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

                    const leaveData = data.data; // Данните са в data.Leave

                    const row = document.createElement("tr");

                    const idCell = document.createElement("td");
                    idCell.textContent = leaveData.id;

                    const typeCell = document.createElement("td");
                    typeCell.textContent = leaveData.Leave.type;

                    const status_leaCell = document.createElement("td");
                    status_leaCell.textContent = leaveData.Leave.status_lea;

                    const start_date_leaCell = document.createElement("td");
                    start_date_leaCell.textContent = leaveData.Leave.start_date_lea;

                    const end_date_leapCell = document.createElement("td");
                    end_date_leapCell.textContent = leaveData.Leave.end_date_lea;

                    row.appendChild(idCell);
                    row.appendChild(typeCell);
                    row.appendChild(status_leaCell);
                    row.appendChild(start_date_leaCell);
                    row.appendChild(end_date_leapCell);

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