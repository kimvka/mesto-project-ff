import './index.css';

import { createCard, deleteCard, cardTemplate, addLikeCard } from './scripts/card.js';

import { initialCards } from './scripts/cards.js';

const cardList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageImg = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

import { openModal, closeModal } from './scripts/modal.js';

//Открытие попапов
profileEditButton.addEventListener('click', () => {
    nameInput.value = personName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
    namePlaceInput.value = '';
    linkPlaceInput.value = '';
    openModal(popupTypeNewCard);
});

function openPlacePopup(item) { 
    popupTypeImageImg.src = item.link;
    popupTypeImageImg.alt = item.name;
    popupTypeImageCaption.textContent = item.name
    openModal(popupTypeImage);
}

//Закрытие попапов
closeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      // Находим родительский элемент (модальное окно), к которому относится эта кнопка
      const modal = event.target.closest('.popup');
      closeModal(modal); // Закрываем это модальное окно
    });
});


//поля формы
const profilePersonForm = popupTypeEdit.querySelector('.popup__form');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');
const personName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


function formPersonSubmit(evt) {
    evt.preventDefault();
    
    const newPersoneName = nameInput.value;
    const newProfileDescription = jobInput.value;
    
    personName.textContent = newPersoneName;
    profileDescription.textContent = newProfileDescription;
   
    closeModal(popupTypeEdit);
}

profilePersonForm.addEventListener('submit', formPersonSubmit);

const popupNewCard = document.querySelector('.popup_type_new-card');
const namePlaceInput = document.querySelector('.popup__input_type_card-name');
const linkPlaceInput = document.querySelector('.popup__input_type_url');
const formPlace = popupNewCard.querySelector('.popup__form');

//Форма добавления карточки
function formNewCardSubmit(evt) {
    evt.preventDefault();

    const newPlaceName = namePlaceInput.value;
    const newPlaceLink = linkPlaceInput.value;

    const newPlace = {
        name: newPlaceName,
        link: newPlaceLink
    }

    placesList.prepend(createCard(newPlace, cardTemplate, deleteCard, openPlacePopup, addLikeCard));
    closeModal(popupNewCard);
}

formPlace.addEventListener('submit', formNewCardSubmit);

initialCards.forEach((item) => {
    const cardElement = createCard(item, cardTemplate, deleteCard, openPlacePopup, addLikeCard);
    cardList.append(cardElement);
});