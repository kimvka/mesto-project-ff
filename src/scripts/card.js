const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, deleteCallback, openPlacePopup, addLikeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    
    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    cardImage.addEventListener('click', () => {
        openPlacePopup(item);
    })
    
    deleteButton.addEventListener('click', () => {
        deleteCallback(cardElement);
    });

      //лайк кнопки
      cardLikeButton.addEventListener('click', () => {
        addLikeCard(cardLikeButton); // Переключаем состояние лайка
    });
    
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

//функция лайка карточки
function addLikeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active')
  }

export { createCard, deleteCard, cardTemplate, addLikeCard };


