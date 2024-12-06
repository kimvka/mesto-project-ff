//Функция добваляет элементу класс с ошибкой
const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
    

    inputElement.classList.add(inputErrorClass);
}

  //Функция удаляет у элемента класс с ошибкой
const hideInputError = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

  //Функция проверяет на корректность введенных данных
const checkInputValidity = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(
          formElement,
          inputElement,
          inputElement.validationMessage,
          inputErrorClass,
          errorClass
        );
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

//Добавление обработчиков всем полям формы
const setEventListeners = (
    formElement,
    inputSelector,
    inputErrorClass,
    errorClass,
    submitButtonSelector,
    inactiveButtonClass
) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity (
                formElement,
                inputElement,
                inputErrorClass,
                errorClass
            );

            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

//Функция, которая найдёт и переберёт все формы на странице
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (event) {
            event.preventDefault();
          });

        setEventListeners(
            formElement,
            validationConfig.inputSelector,
            validationConfig.inputErrorClass,
            validationConfig.errorClass,
            validationConfig.submitButtonSelector,
            validationConfig.inactiveButtonClass
        );
    });
};

//Функция, проверяющая наличие невалидного поля
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    }) 
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  };

  //Функция принимает массив полей ввода
//и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    } 
};

const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      hideInputError(
        formElement,
        inputElement,
        validationConfig.inputErrorClass,
        validationConfig.errorClass
      );
      inputElement.setCustomValidity("");
    });
  };

export { enableValidation, clearValidation };