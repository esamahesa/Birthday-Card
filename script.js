(function(){
  const $ = id=>{return document.getElementById(id)};
  let card = $('card'),
      openButton = $('open'),
      closeButton = $('close'),
      timer = null;
  
  openButton.addEventListener('click',()=>{
    card.className = 'open-half';
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      card.className = 'open-fully';
      timer = null;
    }, 1000);
  });

  closeButton.addEventListener('click',()=>{
    card.className = 'close-half';
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      card.className = '';
      timer = null;
    }, 1000);
  });
})();