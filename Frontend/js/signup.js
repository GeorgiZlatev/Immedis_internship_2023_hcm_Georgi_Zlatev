document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8001/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Регистрацията беше успешна!");
        } else {
            const errorData = await response.json();
            alert("Грешка при регистрация: " + errorData.message);
        }
    } catch (error) {
        console.error("Грешка при вход:", error);
        alert("Грешка при регистрация: " + error.message);
    }
});
