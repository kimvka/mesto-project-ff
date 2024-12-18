import './index.css';

import { createCard, deleteCard, cardTemplate, addLikeCard } from './scripts/card.js';

import { initialCards } from './scripts/cards.js';

import { enableValidation, clearValidation } from './scripts/validation.js';

import { 
    getUserInfo, 
    getInitialCards, 
    editUserInfo,
    editNewCard,
    updateNewAvatar
} from './scripts/api.js';

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageImg = popupTypeImage.querySelector('.popup__image');
const popupTypeImageCaption = popupTypeImage.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['avatar_edit'];
const avatarFormInput = avatarForm.elements.link;
const avatarEditButton = document.querySelector('.profile__avatar-button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

/// Функция button loading пока данные загружаются
const renderLoading = (isLoading, button) => {
    button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

avatarEditButton.addEventListener('click', () => {
    clearValidation(avatarForm, validationConfig);
    openModal(popupTypeAvatar);
});

import { openModal, closeModal } from './scripts/modal.js';

//Открытие попапов
profileEditButton.addEventListener('click', () => {
    nameInput.value = personName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(popupTypeEdit, validationConfig);
    openModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => {
    namePlaceInput.value = '';
    linkPlaceInput.value = '';
    clearValidation(popupTypeNewCard, validationConfig);
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
const popupProfileForm = document.forms['edit-profile'];
const popupNewCardForm = document.forms['new-place'];

//форма личных данных
function formPersonSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupProfileForm.querySelector('.popup__button'));
    editUserInfo(nameInput.value, jobInput.value)
        .then(userData => {
            const newPersoneName = nameInput.value;
            const newProfileDescription = jobInput.value;
            
            personName.textContent = userData.name;
            profileDescription.textContent = userData.about;

            closeModal(popupTypeEdit);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, popupProfileForm.querySelector('.popup__button'));
        });
}

profilePersonForm.addEventListener('submit', formPersonSubmit);

const namePlaceInput = document.querySelector('.popup__input_type_card-name');
const linkPlaceInput = document.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const formPlace = popupTypeNewCard.querySelector('.popup__form');

//Форма добавления карточки
function formNewCardSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupNewCardForm.querySelector('.popup__button'));
    editNewCard(namePlaceInput.value, linkPlaceInput.value)
        .then(newCardData => {
            const newPlaceName = newCardData.name;
            const newPlaceLink = newCardData.link;
            
            placesList.prepend(createCard(newCardData, cardTemplate, profileId, deleteCard, openPlacePopup, addLikeCard));
            closeModal(popupTypeNewCard);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, popupNewCardForm.querySelector('.popup__button'));
        });
}

formPlace.addEventListener('submit', formNewCardSubmit);

//Обработка формы аватара
function formAvatarSubmit (evt) {
    evt.preventDefault();
    renderLoading(true, avatarForm.querySelector('.popup__button'));
    updateNewAvatar(avatarFormInput.value)
        .then(userData => {
            profileImage.style.backgroundImage = `url('${userData.avatar}')`;
            closeModal(popupTypeAvatar);  
            avatarForm.reset();  
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, avatarForm.querySelector('.popup__button'));
        });
}

avatarForm.addEventListener('submit', formAvatarSubmit);

///вызов функции получение информации о пользователе и карточках с сервера и заполнение ими страницы
let profileId;

Promise.all([getUserInfo(),getInitialCards()])
    .then(([userData, cards]) => {
        profileId = userData._id;
        personName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;

        cards.forEach((item) => {
            const cardElement = createCard(item, cardTemplate, profileId, deleteCard, openPlacePopup, addLikeCard);
            placesList.append(cardElement);
        });
    })
    .catch((error) => {
        console.log(error);
    });


//Валидация
enableValidation(validationConfig);

