window.addEventListener("DOMContentLoaded", async () => {
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
                    const educationData = data.data.Education;

                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;
                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;

                    if (educationData) {
                        document.getElementById("degree-input").value = educationData.degree;
                        document.getElementById("institution-input").value = educationData.institution;
                        document.getElementById("start-date-edu-input").value = educationData.start_date_edu;
                        document.getElementById("end-date-edu-input").value = educationData.end_date_edu;
                    }

                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        const updatedData = {
                            degree: document.getElementById("degree-input").value,
                            institution: document.getElementById("institution-input").value,
                            start_date_edu: document.getElementById("start-date-edu-input").value,
                            end_date_edu: document.getElementById("end-date-edu-input").value,
                        };

                        if (educationData) {
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
                        } else {
                            const createResponse = await fetch(`http://localhost:8001/create/${id}`, {
                                method: "POST",
                                headers: {
                                    "Authorization": token,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(updatedData),
                            });

                            if (createResponse.ok) {
                                alert("Данните бяха успешно създадени.");
                            } else {
                                alert("Възникна грешка при създаването на данните.");
                            }
                        }
                    });
                } else {
                    console.error("Грешка при извличане на данни на модел Education с ID " + id);
                }
            } catch (error) {
                console.error("Грешка при изпращане на заявка:", error);
            }
        }
    }
});

document.getElementById("logout-button").addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");

    window.location.href = "../login.html";
});

document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "../index.html";
});
