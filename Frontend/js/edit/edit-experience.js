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
                    const experienceData = data.data.Experience;


                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;


                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;


                    document.getElementById("company-input").value = experienceData ? experienceData.company : "";
                    document.getElementById("position-input").value = experienceData ? experienceData.position : "";
                    document.getElementById("start-date-exp-input").value = experienceData ? experienceData.start_date_exp : "";
                    document.getElementById("end-date-exp-input").value = experienceData ? experienceData.end_date_exp : "";


                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();


                        const updatedData = {
                            company: document.getElementById("company-input").value,
                            position: document.getElementById("position-input").value,
                            start_date_exp: document.getElementById("start-date-exp-input").value,
                            end_date_exp: document.getElementById("end-date-exp-input").value,
                        };


                        if (experienceData) {
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

                            const postResponse = await fetch(`http://localhost:8001/create/${id}`, {
                                method: "POST",
                                headers: {
                                    "Authorization": token,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(updatedData),
                            });

                            if (postResponse.ok) {
                                alert("Данните бяха успешно създадени.");
                            } else {
                                alert("Възникна грешка при създаване на данните.");
                            }
                        }
                    });
                } else {
                    console.error("Грешка при извличане на данни на модел Experience с ID " + id);
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
