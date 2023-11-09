document.getElementById("contact-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8001/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.token || data.refreshToken) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("refreshtoken", data.refreshToken);
                // Пренасочване след успешно вписване
                window.location.href = "./index.html";
            } else {
                alert("Грешка при влизане. Няма токени.");
            }
        } else {
            const errorData = await response.json();
            if (errorData.status === false && errorData.message) {
                // Покажете съобщението за грешка
                alert(errorData.message);
            } else {
                alert("Грешка при вход. Невалиден отговор от сървъра.");
            }
        }
    } catch (error) {
        alert("Грешка при влизане: " + error.message);
    }
});
