import * as model from './model.js'; //импортировали под общим объектом * - все
import * as view from './view.js'; //импортировали под общим объектом * - все


init()

//Добавление записи
view.elements.form.addEventListener("submit", function (e) {
   e.preventDefault();
   //проверяем форму на пустые поля
   if (view.checkEmptyFields() === false) {
      return;
   }
   //получаем данные из формы
   const formData = view.getFormData();
   const record = model.createRecord(formData);
   //отображение записей на странице
   view.renderRecord(record);
   view.clearForm();
   insertTestData();
   view.renderBudget(model.calcBudjet());
   model.saveToLocalStorage();
});

//Удаление записи

document.body.addEventListener('click', function (e) {
   //усл для кнопки удалить
   //console.log(e.target);
   // console.log(e.target.closest('button.item__remove'));
   if (e.target.closest('button.item__remove')) {
      const id = view.removeRecordId(e);
      model.deleteRecord(id);
      view.renderBudget(model.calcBudjet());
      model.saveToLocalStorage();
   }
});

//Добавление записи
function init() {
   displayMonth();
   insertTestData();
   view.renderBudget(model.calcBudjet());
   //получаем в контроллер массив из LS
const budjet = model.getBudjet();
//выводим на стр черех рендер
budjet.forEach((element) => {
   view.renderRecord(element);
});

}
//вывод тестов данных
function insertTestData() {
   const randomData = model.getTestData();
   view.renderTestData(randomData);
}

//вывод месяца и года
function displayMonth() {
   const monthYear = model.getMonthYear()
   view.renderMounth(monthYear.month, monthYear.yeare);
}