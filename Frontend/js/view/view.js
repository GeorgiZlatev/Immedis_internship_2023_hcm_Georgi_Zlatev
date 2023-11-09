window.onload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        //  пренасочваме към login.html
        window.location.href = "login.html";
    } else {
        // Вземете параметъра 'id' от URL-а
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

                    const employeeData = data.data; // Предполагаме, че данните са в обект "data" съдържащ "employee"

                    const row = document.createElement("tr");

                    const idCell = document.createElement("td");
                    idCell.textContent = employeeData.id;

                    const emailCell = document.createElement("td");
                    emailCell.textContent = employeeData.email;

                    const statusCell = document.createElement("td");
                    statusCell.textContent = employeeData.status;

                    const roleCell = document.createElement("td");
                    roleCell.textContent = employeeData.role;



                    row.appendChild(idCell);
                    row.appendChild(emailCell);
                    row.appendChild(statusCell);
                    row.appendChild(roleCell);



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

    window.location.href = "../login.html";
});

document.getElementById("home-button").addEventListener("click", () => {

    window.location.href = "../index.html";
});