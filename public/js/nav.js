var nav = (function () {
  
  var _this = this;
  this.openedBodyClass = 'main-nav-opened';
  
  var defaults = {
    navElement: 'main-nav',
    chevronImage: 'images/chevron.svg',
    jsonDataUrl: '/api/nav.json',
    afterRender: function(){}
  };

  if (arguments[0] && typeof arguments[0] === 'object') {
    this.opts = extendDefaults(defaults, arguments[0]);
  }else{
    this.opts = defaults;
  }
  
  var bodyElement = document.querySelector('body');
  bodyElement.addEventListener('click', bodyClickEvent.bind(this));
  
  var stripesIcon = document.getElementById('toggle-open');
  if(stripesIcon){
    stripesIcon.addEventListener('click', toggleMenu.bind(this));
  }
  
  /**
    * Private function to load menu data JSON from a URL.
    * @private
    * @param {string} jsonUrl - The URL that will be called by a XMLHttpRequest.
    */
  function loadMenuFromJson(jsonUrl){
    
    req = new XMLHttpRequest();
    req.onload = function (e) {
      buildMenu(_this.opts.navElement, e.target.response);
    };
    
    req.open('GET', jsonUrl, true);
    req.responseType = 'json';
    req.send();
  }

  /**
   * Private function to create and populate a Ul list and insert inside a nav.
   * @private
   * @param {element} nav - The nav element to be used.
   * @param {object} menuObj - main-nav default Object.
   */
  function buildMenu(nav, menuObj){
    var navElement = document.getElementById(nav),
      navMainUl = document.createElement('ul');

    for(var i = 0; i < menuObj.items.length; i++){
      var navLi = document.createElement('li'),
        itemObj = menuObj.items[i];

      if(itemObj.items.length > 0){
        var subNavUl = document.createElement('ul');
        for(var j = 0; j < itemObj.items.length; j++){
          var subnavLi = document.createElement('li'),
            subItemObj = itemObj.items[j];

          var subnavLink = document.createElement('a');
          subnavLink.setAttribute('href', subItemObj.url);
          subnavLink.innerHTML = subItemObj.label;
          subnavLink.addEventListener('click', closeMenu.bind(this));
          subnavLi.appendChild(subnavLink);

          subNavUl.appendChild(subnavLi);
        }

        var spanLabel = document.createElement('span');
        spanLabel.innerHTML = itemObj.label;
        spanLabel.addEventListener('click', openMenuEvent.bind(this));

        if(this.opts.chevronImage){
          var chevronArrow = document.createElement('img');
          chevronArrow.setAttribute('src', this.opts.chevronImage);
          spanLabel.appendChild(chevronArrow);
        }

        navLi.appendChild(spanLabel);
        navLi.appendChild(subNavUl);
      }else{
        var menuLink = document.createElement('a');
        menuLink.setAttribute('href', itemObj.url);
        menuLink.innerHTML = itemObj.label;
        navLi.addEventListener('click', closeMenu.bind(this));

        navLi.appendChild(menuLink);
      }
      navMainUl.appendChild(navLi);
    }
    navElement.appendChild(navMainUl);
  }
  
  /**
  * Private function that bind event clicks on body and close menu when target is not a nav DOM children
  * @private
  * @param {event} e - The refered event.
  */
  function bodyClickEvent(e){
    var navElement = closest(e.target, 'nav');
    if(!navElement){
      closeMenu.apply(this);
    }
  }


  /**
   * Private function used on toggle button (hamburger style, mobile only) to toggle menu.
   * @private
   */
  function toggleMenu(){
    var bodyElement = document.querySelector('body');
    if(bodyElement.classList.contains(this.openedBodyClass)){
      bodyElement.classList.remove(this.openedBodyClass);
    }else{
      bodyElement.classList.add(this.openedBodyClass);
    }
  }

  /**
   * Private function that opens a menu.
   * @private
   * @param {event} e - The refered event.
   */
  function openMenuEvent(e){
    var openedMenu = document.querySelector('.opened'),
        bodyElement = document.querySelector('body');

    if(openedMenu){
      openedMenu.classList.remove('opened');
    }

    e.target.parentNode.classList.add('opened');
    bodyElement.classList.add(this.openedBodyClass);
  }

  /**
   * Private function to close a menu
   * @private
   * @param {event} e - The refered event.
   */
  function closeMenu(){
    var openedMenu = document.querySelector('.opened'),
      bodyElement = document.querySelector('body');
    if(openedMenu){
      openedMenu.classList.remove('opened');
    }
    bodyElement.classList.remove(this.openedBodyClass);
  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function closest(element, tagname) {
    tagname = tagname.toLowerCase();
    do
    {
      if(element.nodeName.toLowerCase() === tagname){
        return element;
      }
    }while(element = element.parentNode);
    
    return null;
  }
  
  return {
    init: function(){
      loadMenuFromJson(opts.jsonDataUrl);
    }
  }
  
})();
