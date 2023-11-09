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



                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;


                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;


                    const tableBody = document.getElementById("table-body");

                    const compensationData = data.data.Education;

                    const row = document.createElement("tr");

                    const idCell = document.createElement("td");
                    idCell.textContent = data.data.id;

                    const institutionCell = document.createElement("td");
                    institutionCell.textContent = compensationData.institution;

                    const degreeCell = document.createElement("td");
                    degreeCell.textContent = compensationData.degree;

                    const start_date_eduCell = document.createElement("td");
                    start_date_eduCell.textContent = compensationData.start_date_edu;

                    const end_date_eduCell = document.createElement("td");
                    end_date_eduCell.textContent = compensationData.end_date_edu;



                    row.appendChild(idCell);
                    row.appendChild(institutionCell);
                    row.appendChild(degreeCell);
                    row.appendChild(start_date_eduCell);
                    row.appendChild(end_date_eduCell);

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

    // Пренасочване към страницата за вход (login.html)
    window.location.href = "../login.html";
});
document.getElementById("home-button").addEventListener("click", () => {
    // Пренасочване към началната страница (index.html)
    window.location.href = "../index.html";
});