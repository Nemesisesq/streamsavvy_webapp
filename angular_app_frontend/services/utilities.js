app.factory('_', function ($window) {
    return $window._;
})

app.factory('Fuse', function ($window) {
    return $window.Fuse
})

app.factory('classie', function ($window) {
    return $window.classie
})

app.factory('ShowDetailAnimate', function () {
    //debugger;

    var bodyEl = document.body,
        gridEl = $('#theGrid')[0],
        sidebarEl = document.getElementById('theSidebar'),
        gridItemsContainer = gridEl.querySelector('div.row'),
        //contentItemsContainer = gridEl.querySelector('section.content'),
        //gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
        //contentItems = contentItemsContainer.querySelectorAll('.content__item'),
        //closeCtrl = contentItemsContainer.querySelector('.close-button'),
        current = -1,
        lockScroll = false,
        xscroll = "",
        yscroll = "",
        isAnimating = false,
        //menuCtrl = document.getElementById('menu-toggle'),
        //menuCloseCtrl = sidebarEl.querySelector('.close-button'),
        docElem = window.document.documentElement,
        support = {transitions: Modernizr.csstransitions},
    // transition end event name
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        };
        //transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

    return {
        onEndTransition: function (el, callback) {
            var onEndCallbackFn = function (ev) {
                if (support.transitions) {
                    if (ev.target != this) return;
                    this.removeEventListener(transEndEventName, onEndCallbackFn);
                }
                if (callback && typeof callback === 'function') {
                    callback.call(this);
                }
            };
            if (support.transitions) {
                el.addEventListener(transEndEventName, onEndCallbackFn);
            }
            else {
                onEndCallbackFn();
            }
        },

        getViewport: function (axis) {
            var client, inner;
            if (axis === 'x') {
                client = docElem['clientWidth'];
                inner = window['innerWidth'];
            }
            else if (axis === 'y') {
                client = docElem['clientHeight'];
                inner = window['innerHeight'];
            }

            return client < inner ? inner : client;
        },
        scrollX: function () {
            return window.pageXOffset || docElem.scrollLeft;
        },
        scrollY: function () {
            return window.pageYOffset || docElem.scrollTop;
        },
        loadContent: function (item) {

            console.log(this.scrollY());
            // add expanding element/placeholder
            debugger;
            var dummy = document.createElement('div');
            dummy.className = 'placeholder';

            // set the width/heigth and position
            dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop) + 'px, 0px) scale3d(' + (item.offsetWidth / gridItemsContainer.offsetWidth) -.3 + ',' + item.offsetHeight / this.getViewport('y') + ',1)';
            dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop) + 'px, 0px) scale3d(' +  (item.offsetWidth / gridItemsContainer.offsetWidth) -.3 + ',' + item.offsetHeight / this.getViewport('y') + ',1)';

            // add transition class
            classie.add(dummy, 'placeholder--trans-in');

            // insert it after all the grid items
            gridItemsContainer.appendChild(dummy);

            // body overlay
            //classie.add(bodyEl, 'view-single');
            //
            //setTimeout(function () {
            //    debugger;
            //    // expands the placeholder
            //    dummy.style.WebkitTransform = 'translate3d(-5px, ' + (this.scrollY - 5) + 'px, 0px)';
            //    dummy.style.transform = 'translate3d(-5px, ' + (this.scrollY - 5) + 'px, 0px)';
            //    // disallow scroll
            //    window.addEventListener('scroll', this.noscroll);
            //}, 25);

            //this.onEndTransition(dummy, function () {
            //    // add transition class
            //    classie.remove(dummy, 'placeholder--trans-in');
            //    classie.add(dummy, 'placeholder--trans-out');
            //    // position the content container
            //    contentItemsContainer.style.top = scrollY() + 'px';
            //    // show the main content container
            //    classie.add(contentItemsContainer, 'content--show');
            //    // show content item:
            //    classie.add(contentItems[current], 'content__item--show');
            //    // show close control
            //    classie.add(closeCtrl, 'close-button--show');
            //    // sets overflow hidden to the body and allows the switch to the content scroll
            //    classie.addClass(bodyEl, 'noscroll');
            //
            //    isAnimating = false;
            //});
        },

        hideContent: function () {
            var gridItem = gridItems[current], contentItem = contentItems[current];

            classie.remove(contentItem, 'content__item--show');
            classie.remove(contentItemsContainer, 'content--show');
            classie.remove(closeCtrl, 'close-button--show');
            classie.remove(bodyEl, 'view-single');

            setTimeout(function () {
                var dummy = gridItemsContainer.querySelector('.placeholder');

                classie.removeClass(bodyEl, 'noscroll');

                dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth / gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight / getViewport('y') + ',1)';
                dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth / gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight / getViewport('y') + ',1)';

                this.onEndTransition(dummy, function () {
                    // reset content scroll..
                    contentItem.parentNode.scrollTop = 0;
                    gridItemsContainer.removeChild(dummy);
                    classie.remove(gridItem, 'grid__item--loading');
                    classie.remove(gridItem, 'grid__item--animate');
                    lockScroll = false;
                    window.removeEventListener('scroll', this.noscroll);
                });

                // reset current
                current = -1;
            }, 25);
        },
        noscroll: function () {
            if (!lockScroll) {
                lockScroll = true;
                xscroll = this.scrollX();
                yscroll = this.scrollY();
            }
            window.scrollTo(xscroll, yscroll);
        }

    }
})