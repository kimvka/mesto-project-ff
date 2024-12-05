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
    }).then((res) => res.json());
};

//Редактирование профиля
export const editUserInfo = (userProfileName,userProfileAbout) => {
    return fetch(`${apiConfig.baseURL}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: userProfileName,
            about: userProfileAbout
        })
    }).then((res) => res.json());
};

//Добавление новой карточки
export const editNewCard = (cadrName, cardLink) => {
    return fetch(`${apiConfig.baseURL}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: cadrName,
            link: cardLink
        })
    }).then((res) => res.json());
};

//лайк карточки
export const likeCard = (cardId, isLikedCard) => {
    return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
        method: isLikedCard? 'DELETE': 'PUT',
        headers: apiConfig.headers,
    }).then((res) => res.json());
};

//удаление карточки
export const deleteMyCard = (cardId) => {
    return fetch(`${apiConfig.baseURL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers,
    }).then((res) => res.json());
};

//Обновление аватара пользователя
export const updateNewAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then((res) => res.json());
  };

