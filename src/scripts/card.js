import { deleteMyCard, likeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, cardTemplate, userId, deleteCallback, openPlacePopup, addLikeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like_count');
   
    const cardId = item._id;

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    likeCounter.textContent = item.likes.length;

    const deleteButton = cardElement.querySelector('.card__delete-button');
   
    if (userId !== item.owner._id) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => {
            deleteCallback(cardElement, cardId);
        });
    }

    cardImage.addEventListener('click', () => {
        openPlacePopup(item);
    })
    
    //Условия лайка
    const isCardLiked = item.likes.some(user => user._id === userId);
    
    if (isCardLiked) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    //лайк кнопки
    cardLikeButton.addEventListener('click', () => {
        addLikeCard(cardLikeButton, cardId, likeCounter); // Переключаем состояние лайка
    });
    
    return cardElement;
}

function deleteCard(cardElement, id) {
    deleteMyCard(id).then(data => {
        cardElement.remove();
    })  
}

//функция лайка карточки
function addLikeCard(cardLikeButton, cardId, likeCounter) {
    const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
   
    likeCard(cardId, isLiked)
        .then((data) => {
            cardLikeButton.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = data.likes.length;
        })
}

export { createCard, deleteCard, cardTemplate, addLikeCard };


