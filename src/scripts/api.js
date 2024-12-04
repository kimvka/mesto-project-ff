export const apiConfig = {
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
        authorization: '7142095e-ec2c-4fa3-a23d-333f130bf28a',
        'Content-Type': 'application/json'
    }
}

//Загрузка информации о пользователе с сервера
export const getUserInfo = () => {
    return fetch(`${apiConfig.baseURL}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers,
    }).then((res) => res.json());
};

//Загрузка карточек с сервера
export const getInitialCards = () => {
    return fetch(`${apiConfig.baseURL}/cards`, {
        method: 'GET',
        headers: apiConfig.headers,
    }).then((res) => res.json);
};