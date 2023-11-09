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
                    const employeeData = data.data;

                    document.getElementById("email-input").value = employeeData.email;
                    document.getElementById("status-input").value = employeeData.status;
                    document.getElementById("role-input").value = employeeData.role;


                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();


                        const updatedData = {
                            email: document.getElementById("email-input").value,
                            status: document.getElementById("status-input").value,
                            role: document.getElementById("role-input").value,
                        };


                        const updateResponse = await fetch(`http://localhost:8001/edit/${id}`, {
                            method: "PUT",
                            headers: {
                                "Authorization": `${token}`,
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

    window.location.href = "login.html";
});

document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "../index.html";
});