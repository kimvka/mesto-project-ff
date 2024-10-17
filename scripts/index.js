// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });
    
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

const cardList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    cardList.append(cardElement);
});