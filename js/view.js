//DOM
//создаем объект с нахождением всех дом-элементов
const elements = {
   form: document.querySelector("#form"),
   type: document.querySelector("#type"),
   title: document.querySelector("#title"),
   value: document.querySelector("#value"),
   incomesList: document.querySelector("#incomes-list"),
   expenseList: document.querySelector("#expenses-list"),
   budjetEl: document.querySelector('#budget'),
   totalInconeEl: document.querySelector('#total-income'),
   totalExpenseEl: document.querySelector('#total-expense'),
   percentWrapper: document.querySelector('#expense-percents-wrapper'),
   monthEl: document.querySelector('#month'),
   yearEl: document.querySelector('#year'),
}
//=============================================================================
//проверка формы на заполненность
function checkEmptyFields() {

   if (elements.title.value.trim() === '') {
      //trim() обрезает пустые символы
      elements.title.classList.add("form__input--error");
      return false;
   } else {
      elements.title.classList.remove("form__input--error");
   }
   if (elements.value.value.trim() === "" || +elements.value.value <= 0) {
      elements.value.classList.add("form__input--error");
      return false;
   } else {
      elements.value.classList.remove("form__input--error");
   }
   return true;
}

//форматирование суммы
const priceFormater = new Intl.NumberFormat('ru-RU', {
   style: 'currency',
   currency: 'RUB',
   maximumFractionDigits: 0
})

//отображение на стр дохода/расхода
function renderRecord(record) {
   //отображаем доход на стр
   if (record.type === "inc") {
      const html = `<li data-id="${record.id}" class="budget-list__item item item--income">
    <div class="item__title">${record.title}</div>
    <div class="item__right">
      <div class="item__amount">+ ${priceFormater.format(record.value)}</div>
      <button class="item__remove">
        <img src="./img/circle-green.svg" alt="delete" />
      </button>
    </div>
  </li>`;
      elements.incomesList.insertAdjacentHTML("afterbegin", html);
   }
   //отображаем расходы на стр
   if (record.type === "exp") {
      const html = ` <li data-id="${record.id}" class="budget-list__item item item--expense">
    <div class="item__title">${record.title}</div>
    <div class="item__right">
      <div class="item__amount">- ${priceFormater.format(record.value)}</div>
      <button class="item__remove">
        <img src="./img/circle-red.svg" alt="delete" />
      </button>
    </div>
  </li>`;
      elements.expenseList.insertAdjacentHTML("afterbegin", html);
   }
}

//отбражение на стр бюджета
function renderBudget({ totalIncone, totalExpance, totalBudjet, expensePercents }) { // деструктуризацция obj
   elements.budjetEl.innerHTML = priceFormater.format(totalBudjet);
   elements.totalInconeEl.innerHTML = '+ ' + priceFormater.format(totalIncone);
   elements.totalExpenseEl.innerHTML = '- ' + priceFormater.format(totalExpance);
   if (expensePercents) {
      const html = `<div class="badge">${expensePercents}%</div>`;
      elements.percentWrapper.innerHTML = html;
   } else {
      elements.percentWrapper.innerHTML = '';
   }
}
//очистка формы
function clearForm() {
   elements.form.reset()
}
//отображение мес и года
function renderMounth(month, yeare) {
   elements.monthEl.innerHTML = month;
   elements.yearEl.innerHTML = yeare;
}
//рендеринг тестового контента
function renderTestData(data) {
   elements.type.value = data.type;
   elements.title.value = data.title;
   elements.value.value = data.value;
}

//обращается к эл на стр формирует из них obj и возвращает его
function getFormData() {
   const formData = {
      //id: id,
      type: elements.type.value,
      title: elements.title.value,
      value: elements.value.value,
   }
   return formData;
}
//
function removeRecordId(e) {
   const recordElement = e.target.closest('li.budget-list__item');

   const id = +recordElement.dataset.id;
   //удаляем со страницы
   recordElement.remove();
   //получаем id от li на который кликнули   

   return id;
}
export {
   elements,
   priceFormater,
   checkEmptyFields,
   renderRecord,
   renderBudget,
   clearForm,
   renderMounth,
   renderTestData,
   getFormData,
   removeRecordId
};