//DATA
//в массив передаем функцию которая сохр в LS
const budjet = getFromLS(); //все данные будут в виде массива объектов record
console.log(budjet);

//получаем массив
function getBudjet(){
   return budjet;
}


function createRecord(formData) {
   //расчет id
   let id = 1;
   if (budjet.length > 0) {
      //найти посл эл в массиве
      const lastElement = budjet[budjet.length - 1];
      //узнать его id
      const lastElementId = lastElement.id;
      //сформировать нов id = старый+1
      id = lastElementId + 1;
   }

   //запись расх/дох
   const record = {
      id: id,
      type: formData.type,
      title: formData.title.trim(),
      value: +formData.value,
   };
   //Добавляем запись в массив бюджет
   budjet.push(record);
   return record;
}



//удаление из модели по id
function deleteRecord(id) {
   //поиск в массиве по id
   const index = budjet.findIndex(function (element) {
      if (id === element.id) {
         return true;
      }
   });
   console.log(index);
   //удаляем из массива по индексу
   budjet.splice(index, 1);
   console.log(budjet);
}

//считаем бюджет складываем весь type="inc"
function calcBudjet() {
   const totalIncone = budjet.reduce(function (total, element) {
      //считаем доход
      if (element.type === 'inc') {
         return total + element.value;
      } else {
         return total;
      }
   }, 0);
   //считаем расход
   const totalExpance = budjet.reduce(function (total, element) {
      if (element.type === 'exp') {
         return total + element.value;
      } else {
         return total;
      }
   }, 0)

   const totalBudjet = totalIncone - totalExpance;

   //считаем бюджет и %
   let expensePercents;
   if (totalIncone) {
      expensePercents = Math.round((totalExpance * 100) / totalIncone);
   }
   return {
      totalIncone, totalExpance, totalBudjet, expensePercents
   }
}

//тетсовые данные
function getTestData() {
   const testData = [
      { type: 'inc', title: 'фриланс', value: 15000 },
      { type: 'inc', title: 'аванс', value: 35000 },
      { type: 'inc', title: 'зарплата', value: 50000 },
      { type: 'exp', title: 'транспорт', value: 200 },
      { type: 'exp', title: 'квартплата', value: 8000 },
      { type: 'exp', title: 'детский сад', value: 6000 },
   ];
   //получаем рандомный индекс от 0 до 7 testData.lenght-1
   function getRandomInt(max) {
      return Math.floor(Math.random() * max)
   }
   const randomIndex = getRandomInt(testData.length);
   //console.log(testData[randomIndex]);
   const randomData = testData[randomIndex];
   return randomData;
}

//вывод месяца и года
function getMonthYear() {
   const now = new Date();
   const yeare = now.getUTCFullYear();
   const timeFormater = new Intl.DateTimeFormat('ru-RU', {
      month: 'long'
   })
   const month = timeFormater.format(now);
   return { month, yeare };
}


//сохранение в локалстор чтобы при обновлении данные не удалялись
function saveToLocalStorage() {
   localStorage.setItem("budjet", JSON.stringify(budjet));
}
function getFromLS(){
let data= localStorage.getItem('budjet');
if (data) {
return JSON.parse(data);
} else {
   return [];
}
}
function clearToLocalStorage() {
   if (window.confirm("Все данные будут удалены. Продолжить?")) {
     localStorage.removeItem("budget");
     location.reload();
   }
 }
 

export { createRecord, deleteRecord, calcBudjet, getTestData, getMonthYear, saveToLocalStorage, getFromLS,getBudjet }