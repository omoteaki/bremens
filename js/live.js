'use strict';

{

  const lists = document.querySelectorAll(".mn-list");
  // const top = document.getElementById("top");
  const btnMenu = document.getElementById("btn-menu");
  const menu = document.getElementById("menu");
  const back = document.getElementById("back");

  // メニューリンク
  lists.forEach((list, index) => {
    list.addEventListener('click', function(){
      const element = document.getElementById("list" + index);
      const rect =element.getBoundingClientRect();
      const elmtop = rect.top + window.pageYOffset;
      // top.classList.add("appear")
      btnMenu.classList.remove("disappear")
      btnMenu.classList.remove("close")
      menu.classList.remove("appear")
      back.classList.remove("appear");
      document.documentElement.scrollTop = elmtop;
      console.log(element);
      console.log(rect);
      
    });
  });

  // メニューボタンの操作
  btnMenu.addEventListener('click', function(){
    menu.classList.toggle("appear");
    back.classList.toggle("appear");
    btnMenu.classList.toggle("close");
  });



}