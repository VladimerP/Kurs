//подгрузка локалстор
window.onload=function(){
  if(localStorage.getItem ("objects1")!=null)
    infoNameScor(JSON.parse (localStorage.getItem ("objects1")));
}



//функция отображения счета
function infoNameScor(object){ 
  //проход по массиву обьекта учасстников и вывод их имен и счета
  let par;
  for(key in object.Name){
    par=document.createElement("p");
    par.className="col-md-6 h3 infoName";
    par.innerHTML=object.Name[key];
    document.getElementById("information").appendChild(par);
    par=document.createElement("p");
    par.className="col-md-6 h3 infoScore";
    par.innerHTML=object.Score[key];
    document.getElementById("information").appendChild(par);
  }  
}

//вывод последнего участника
function lastInfo(object){
  let par;
  par=document.createElement("p");
  par.className="col-md-6 h3 infoName";
  par.innerHTML=object.Name[object.Name.length-1];
  document.getElementById("information").appendChild(par);
  par=document.createElement("p");
  par.className="col-md-6 h3 infoScore";
  par.innerHTML=object.Score[object.Score.length-1];
  document.getElementById("information").appendChild(par);
}

//переменные для таймера и паузы
var timer;
var pause=false;

//функция для старта игры
function sTart() {
  
  //получение оставшегося времени
  let display = document.querySelector('.display');
  let timeLeft = parseInt(display.innerHTML); 

  //прверка ставит ли пользователь на паузу или начинает играть
  if(pause==false){
    pause=true;
    //создание нескольких блоков для игры на поле
    create_elem("id1");
    create_elem("id2");
    create_elem("id3");

    //запуск таймера
    timer = setInterval(function(){
      if (--timeLeft >= 0) { // если таймер всё еще больше нуля
        display.innerHTML = timeLeft; // обновляем цифру
      } else {
        //обновление преключателя паузы и времени
        pause=false;
        display.innerHTML=60;
        let element = document.getElementById("pole");
        //очещение поля от блоков
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
        clearInterval(timer);// удаляем таймер
        //проверка обьекта в локалстор и его создание или получение даных с локалстор
        let objects;
        if(localStorage.getItem ("objects1")==null)
          objects={
            Name:[],
            Score:[]
          }
        else{
          objects=JSON.parse (localStorage.getItem ("objects1"));
        }
        //Вывод счета и ввод имени
        alert("Ваш счет: " + document.querySelector('#score').innerHTML);
        let name=prompt('Введите ваше имя:', 'None');
        //добавление в обьект счета и имени игрока
        objects.Name.push(name);
        objects.Score.push(document.querySelector('#score').innerHTML);
        //Добавление в таблицу последнего игравшего
        lastInfo(objects);
        localStorage.setItem ("objects1", JSON.stringify(objects));
        //обнуление счета
        document.querySelector('#score').innerHTML="0"
         
      }
    }, 1000);
  }
  //установка на паузу
  else{
    pause=false;
    let element = document.getElementById("pole");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    clearInterval(timer);  
  }
}

//функция для начала игры заново
function again(){
  let display = document.querySelector('.display');
  display.innerHTML=60;
  let element = document.getElementById("pole");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  alert("Ваш счет: " + document.querySelector('#score').innerHTML);
  document.querySelector('#score').innerHTML="0"
  clearInterval(timer);
  sTart();
}

//функция для создания елемента игры
function create_elem(id_elem){
  //функция для создания последующего элемента при нажатии на элемент
  let func_rem_creat=function(ids){
    //обновление счета в зависимости от размера кубика
    if(document.getElementById(ids.target.id).style.width=="30px")
      document.querySelector('#score').innerHTML=parseInt(document.querySelector('#score').innerHTML)+3;
    else if(document.getElementById(ids.target.id).style.width=="60px")
      document.querySelector('#score').innerHTML=parseInt(document.querySelector('#score').innerHTML)+2;
    else
      document.querySelector('#score').innerHTML=parseInt(document.querySelector('#score').innerHTML)+1;
    document.getElementById(ids.target.id).remove(); 
    create_elem(ids.target.id) ;
  }
  //создание элемента
  let block_heg_wid=30*Math.round(1 - 0.5 + Math.random() * (3 - 1 + 1));
  let div=document.createElement("div");
  div.className="block_score";
  div.onclick=func_rem_creat;
  div.id=id_elem;
  div.style.backgroundColor='rgb(' + (Math.random() * (255 - 0) + 0) + ',' + (Math.random() * (255 - 0) + 0) + ',' + (Math.random() * (255 - 0) + 0) + ')';
  div.style.top=(Math.random() * (400 - 10) + 10)+"px";
  div.style.left=(Math.random() * (800 - 10) + 10)+"px";
  div.style.width=block_heg_wid+"px"
  div.style.height=block_heg_wid+"px"
  document.getElementById("pole").appendChild(div);
}