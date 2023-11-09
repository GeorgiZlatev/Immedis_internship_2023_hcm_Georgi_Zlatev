const JWT = require("jsonwebtoken");
const jwtConfig = require("./jwt-config");

// Създаване на масив, в който ще се съхраняват обновените токени
const refreshedTokens = [];

let validateToken = (req, res, next) => {
  let tokenValue = req.headers["authorization"];
  if (tokenValue) {
    // Проверете дали токена не е в списъка с обновени токени
    if (refreshedTokens.includes(tokenValue)) {
      return res.status(401).json({
        status: false,
        message: "Max token refresh count exceeded. Please log in again.",
      });
    }

    JWT.verify(tokenValue, jwtConfig.secret, (error, data) => {
      if (error) {
        return res.status(500).json({
          status: false,
          message: "Invalid token found",
        });
      } else {
        req.data = data;

        // Проверка за близкото изтичане на токена
        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExp = data.exp;
        const refreshThreshold = jwtConfig.refreshThreshold; // Настройте подходящ  за обновление

        if (tokenExp - currentTime <= refreshThreshold) {
          // Токенът е близо до изтичане - може да се обнови
          if (!refreshedTokens.includes(tokenValue)) {
            // Генериране на нов токен
            const newToken = JWT.sign(
              { id: data.id, role: data.role },
              jwtConfig.secret,
              {
                expiresIn: jwtConfig.expiresIn,
              }
            );
            refreshedTokens.push(tokenValue); // Добавете текущия токен към списъка с обновени токени
            res.setHeader("Authorization", newToken); // Задайте новия токен в заглавието
          }
        }

        next();
      }
    });
  } else {
    return res.status(404).json({
      // We have no token passed inside header
      status: false,
      message: "Token needed",
    });
  }
};

module.exports = {
  checkToken: validateToken,
};
