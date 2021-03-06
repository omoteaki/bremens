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
      const element = document.querySelector('.list' + index);
      const rect =element.getBoundingClientRect();
      const elmtop = rect.top + window.pageYOffset;
      // top.classList.add("appear")
      btnMenu.classList.remove("disappear")
      btnMenu.classList.remove("close")
      menu.classList.remove("appear")
      back.classList.remove("appear");
      document.documentElement.scrollTop = elmtop;
      // console.log(element);
      // console.log(rect);
      
    });
  });

  // メニューボタンの操作
  btnMenu.addEventListener('click', function(){
    menu.classList.toggle("appear");
    back.classList.toggle("appear");
    btnMenu.classList.toggle("close");
  });

  // トップ画面の領域が小さくなったらメニューボタンを登場させたい
  const target = document.querySelector('.main-menu');
  function callback(entries) {
    // console.log(entries[0]);

    if (!entries[0].isIntersecting) {
      btnMenu.classList.remove("disappear");
    } else {
      btnMenu.classList.add("disappear");
    }
  }
  const options = {
    threshold: 0.7,
  }
  const observer = new IntersectionObserver(callback, options);
  observer.observe(target);


    // top.addEventListener('click', function(){
  //   top.classList.remove("appear");
  //   document.documentElement.scrollTop = 0;
    
  // });


  // 音楽再生
  const music = new Audio('music/tsukino_sita_de.mp3');
  const play = document.getElementById('play');
  const volumeUp = document.getElementById('volume-up');
  const volumeDown = document.getElementById('volume-down');
  const mute = document.getElementById('mute');
  const musicPopup = document.getElementById('music-popup');
  const popupPlay = document.getElementById('popup-play');
  const skip = document.getElementById('popup-skip');

  const cat = document.querySelector('.cat');
  const moon = document.querySelector('.moon');
  const backgroundColor = document.getElementById('back');

  const popupClose = document.getElementById('popup-close');

  const message = document.getElementById('message');



  skip.addEventListener('click', function(){
    musicPopup.classList.add('close');
    message.classList.remove('hidden');
  });

  popupClose.addEventListener('click', function(){
    // musicPopup.classList.add('small');
    musicPopup.classList.add('close');
    message.classList.remove('hidden');
    // information.innerHTML = "こちらからいつでも再生できます";
  });

  popupPlay.addEventListener('click', function(){
    play.innerHTML = "<span class='material-icons'>pause</span>";
      music.play();
      musicPopup.classList.add('close');
      cat.classList.add('hidden');
      moon.classList.remove('closed');
      backgroundColor.classList.add('night');
  });

  music.addEventListener('ended', function(){
    play.innerHTML = "<span class='material-icons'>play_arrow</span>";
    backgroundColor.classList.remove('night');
    cat.classList.remove('hidden');
    moon.classList.add('closed');
  });
  // 再生ボタン
  play.addEventListener('click', function(){
    if(!music.paused){
      play.innerHTML = "<span class='material-icons'>play_arrow</span>";
      backgroundColor.classList.remove('night');
      cat.classList.remove('hidden');
      moon.classList.add('closed');
      music.pause();
    } else {
      play.innerHTML = "<span class='material-icons'>pause</span>";
      music.play();
      backgroundColor.classList.add('night');
      cat.classList.add('hidden');
      moon.classList.remove('closed');
    }
  });

  // 音量ボタン
  volumeUp.addEventListener('click', function(){
    const volume = music.volume;
    if(volume < 1){
      music.volume = (volume * 10 + 1) / 10;
    }
  });
  volumeDown.addEventListener('click', function(){
    const volume = music.volume;
    if(volume > 0){
      music.volume = (volume * 10 - 1) / 10;
    }
  });

  // ミュートボタン
  mute.addEventListener('click', function(){
    if(music.muted){
      music.muted = false;
      mute.innerHTML = "<span class='material-icons'>volume_off</span>"
    } else {
      music.muted = true;
      mute.innerHTML = "<span class='material-icons'>volume_mute</span>"
    }
  });



  // カルーセル
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul = document.querySelector('.works-container > ul');
  const slides = ul.children;
  const squares = [];
  let currentIndex = 0;

  function updateButtons() {
    prev.classList.remove('hidden');
    next.classList.remove('hidden');

    if (currentIndex === 0) {
      prev.classList.add('hidden');
    }
    if (currentIndex === slides.length - 1) {
      next.classList.add('hidden');
    }
  }

  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
  }

  function setupSquares() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        currentIndex = i;
        updateSquares()
        updateButtons();
        moveSlides();
      });
      squares.push(button);
      document.querySelector('nav').appendChild(button);
    }

    squares[0].classList.add('current');
  }

  function updateSquares() {
    squares.forEach(square => {
      square.classList.remove('current');
    });
    squares[currentIndex].classList.add('current');
  };


  updateButtons();
  setupSquares();

  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    updateSquares()
    moveSlides();
  });

  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    updateSquares()
    moveSlides();
  });

}