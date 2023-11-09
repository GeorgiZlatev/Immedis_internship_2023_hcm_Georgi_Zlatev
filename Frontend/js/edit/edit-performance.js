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
                    const performanceData = data.data.Performance;

                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;

                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;

                    if (performanceData) {
                        document.getElementById("performance-score-input").value = performanceData.performance_score;
                        document.getElementById("comments-input").value = performanceData.comments;
                        document.getElementById("review-date-input").value = performanceData.review_date;
                    }

                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        const updatedData = {
                            performance_score: document.getElementById("performance-score-input").value,
                            comments: document.getElementById("comments-input").value,
                            review_date: document.getElementById("review-date-input").value,
                        };

                        if (performanceData) {
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
                    console.error("Грешка при извличане на данни на модел Performance с ID " + id);
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
