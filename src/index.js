import './index.css';

import { createCard, deleteCard, cardTemplate, addLikeCard } from './scripts/card.js';

import { initialCards } from './scripts/cards.js';

import { enableValidation, validationConfig, clearValidation } from './scripts/validation.js';

import { 
    getUserInfo, 
    getInitialCards, 
    editUserInfo,
    editNewCard,
    updateNewAvatar
} from './scripts/api.js';

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

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['avatar_edit'];
const avatarFormInput = avatarForm.elements.link;
const avatarEditButton = document.querySelector('.profile__avatar-button');
const formTypeAvatar = popupTypeAvatar.querySelector('.popup__form');
const popupInputTypeAvatarUrl = popupTypeAvatar.querySelector('.popup__input_type_avatar_url');


avatarEditButton.addEventListener('click', () => {
    popupInputTypeAvatarUrl.value = '';
    clearValidation(popupTypeAvatar, validationConfig);
    openModal(popupTypeAvatar);
})

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


function formPersonSubmit(evt) {
    evt.preventDefault();
    
    editUserInfo(nameInput.value, jobInput.value)
        .then(userData => {
            const newPersoneName = nameInput.value;
            const newProfileDescription = jobInput.value;
            
            personName.textContent = userData.name;
            profileDescription.textContent = userData.about;

            closeModal(popupTypeEdit);
        })
}

profilePersonForm.addEventListener('submit', formPersonSubmit);

const popupNewCard = document.querySelector('.popup_type_new-card');
const namePlaceInput = document.querySelector('.popup__input_type_card-name');
const linkPlaceInput = document.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const formPlace = popupNewCard.querySelector('.popup__form');

//Форма добавления карточки
function formNewCardSubmit(evt) {
    evt.preventDefault();

    editNewCard(namePlaceInput.value, linkPlaceInput.value)
        .then(newCardData => {
            const newPlaceName = newCardData.name;
            const newPlaceLink = newCardData.link;
            
            placesList.prepend(createCard(newCardData, cardTemplate, profileId, deleteCard, openPlacePopup, addLikeCard));
            closeModal(popupNewCard);
        })
}

formPlace.addEventListener('submit', formNewCardSubmit);

///вызов функции получение информации о пользователе и карточках с сервера и заполнение ими страницы
let profileId;

Promise.all([getUserInfo(),getInitialCards()])
    .then(([userData, cards]) => {
        profileId = userData._id;
        personName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;

        cards.forEach((item) => {
            const cardElement = createCard(item, cardTemplate, profileId, deleteCard, addLikeCard, openPlacePopup, profileId);
            cardList.append(cardElement);
        });
    })


//Валидация
enableValidation(validationConfig);

