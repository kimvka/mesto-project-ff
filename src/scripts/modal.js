// Функция для открытия модального окна с таймером
function openModal(popup) {
    popup.classList.add('popup_is-animated');
   
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 0,1);
    
    document.addEventListener("keydown", closePressEscapeModal);
    popup.addEventListener("mousedown", closeOnOverlayModal);
}

// Функция для закрытия модального окна с таймером
function closeModal(item) {
    item.classList.remove('popup_is-opened');
    setTimeout(() => {
        item.classList.remove('popup_is-animated');
    }, 600);
    document.removeEventListener('keydown', closePressEscapeModal);
    item.addEventListener('mousedown', closeOnOverlayModal);
}

// Закрытие модального окна при клике вне его 
function closeOnOverlayModal(evt) {
    if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
    }
}

//Закрытие попапа нажатием на Esc
function closePressEscapeModal(evt) {
    if (evt.key === 'Escape') {
    closeModal(document.querySelector(".popup_is-opened"));
    }
}

export { openModal, closeModal, closeOnOverlayModal, closePressEscapeModal };