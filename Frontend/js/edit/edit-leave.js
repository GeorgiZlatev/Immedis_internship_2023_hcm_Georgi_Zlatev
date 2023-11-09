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
                    const leaveData = data.data.Leave;

                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;

                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;

                    document.getElementById("type-input").value = leaveData ? leaveData.type : "";
                    document.getElementById("status-lea-input").value = leaveData ? leaveData.status_lea : "";
                    document.getElementById("start-date-lea-input").value = leaveData ? leaveData.start_date_lea : "";
                    document.getElementById("end-date-lea-input").value = leaveData ? leaveData.end_date_lea : "";

                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        const updatedData = {
                            type: document.getElementById("type-input").value,
                            status_lea: document.getElementById("status-lea-input").value,
                            start_date_lea: document.getElementById("start-date-lea-input").value,
                            end_date_lea: document.getElementById("end-date-lea-input").value,
                        };

                        const updateResponse = await fetch(`http://localhost:8001/edit/${id}`, {
                            method: "PUT",
                            headers: {
                                "Authorization": token,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedData),
                        });

                        if (updateResponse.ok) {
                            alert("Данните бяха успешно актуализирани.");
                        } else {
                            alert("Възникна грешка при актуализацията на данните.");
                        }
                    });
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
