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
                    const compensationData = data.data.Compensation;

                    const firstName = data.data.Employee.firstName;
                    const surName = data.data.Employee.surName;
                    const lastName = data.data.Employee.lastName;
                    const headerTitle = document.getElementById("header-title");
                    headerTitle.textContent = `${firstName} ${surName} ${lastName}`;

                    document.getElementById("salary-input").value = compensationData.salary;
                    document.getElementById("currency-input").value = compensationData.currency;
                    document.getElementById("bonuses-input").value = compensationData.bonuses;

                    const editForm = document.getElementById("edit-form");
                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        const updatedData = {
                            salary: parseFloat(document.getElementById("salary-input").value),
                            currency: document.getElementById("currency-input").value,
                            bonuses: parseFloat(document.getElementById("bonuses-input").value),
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
                    console.error("Грешка при извличане на данни на модел Compensation с ID " + id);
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
