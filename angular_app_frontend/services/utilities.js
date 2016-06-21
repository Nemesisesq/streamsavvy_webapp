app.factory('_', function ($window) {
    return $window._;
})

app.factory('Fuse', function ($window) {
    return $window.Fuse
})

app.factory('Fuzzy', function ($window) {
    return $window.fuzzy
})

app.factory('classie', function ($window) {
    return $window.classie
})

app.factory('ShowDetailAnimate', function ($timeout, $q) {
    //debugger;

    var bodyEl = document.body,
        // gridEl = $('#theGrid')[0],
        // sidebarEl = document.getElementById('theSidebar'),
        // gridItemsContainer = gridEl.querySelector('div.row'),
    //contentItemsContainer = gridEl.querySelector('section.server'),
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

        },
    //transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

        getViewport = function (axis) {
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
        }
    scrollX = function () {
        return window.pageXOffset || docElem.scrollLeft;
    }
    scrollY = function () {
        return $('#search-and-shows').scrollTop()
    }


    onEndTransition = function (el, callback) {
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
    }

    return {
        loadContent: function (positionItem, scaleItem, container) {
            // add expanding element/placeholder
            var dummy = document.createElement('div');
            dummy.className = 'placeholder';

            // set the width/heigth and position
            dummy.style.WebkitTransform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';
            dummy.style.transform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';

            // add transition class
            classie.add(dummy, 'placeholder--trans-in');

            // insert it after all the grid items
            container.appendChild(dummy);

            // body overlay
            classie.add(bodyEl, 'view-single');
            //
            return $timeout(function () {

                // expands the placeholder
                dummy.style.WebkitTransform = 'translate3d(0, ' + (scrollY() + 50) + 'px, 0px)';
                dummy.style.transform = 'translate3d(0, ' + (scrollY() + 50) + 'px, 0px)';
                // disallow scroll
                window.addEventListener('scroll', this.noscroll);
                onEndTransition(dummy, function () {
                    // add transition class
                    classie.remove(dummy, 'placeholder--trans-in');
                    classie.add(dummy, 'placeholder--trans-out');
                    // position the server container
                    //contentItemsContainer.style.top = scrollY() + 'px';
                    // show the main server container
                    //classie.add(contentItemsContainer, 'server--show');
                    // show server item:
                    //classie.add(contentItems[current], 'content__item--show');
                    // show close control
                    //classie.add(closeCtrl, 'close-button--show');
                    // sets overflow hidden to the body and allows the switch to the server scroll
                    classie.addClass(bodyEl, 'noscroll');

                    isAnimating = false;
                });
            }, 25);

        },

        hideContent: function (positionItem, scaleItem, container) {
            //var gridItem = gridItems[current], contentItem = contentItems[current];
            //debugger;

            //classie.remove(contentItem, 'content__item--show');
            //classie.remove(contentItemsContainer, 'server--show');
            //classie.remove(closeCtrl, 'close-button--show');
            classie.remove(bodyEl, 'view-single');

            return $timeout(function () {
                // debugger;

                var dummy = container.querySelector('.placeholder');

                function firstStep() {
                    // debugger;
                    classie.removeClass(bodyEl, 'noscroll');
                    return 'hello first'
                }

                $q.when(firstStep())
                    .then(function (data) {
                        dummy.style.WebkitTransform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';
                        dummy.style.transform = 'translate3d(' + (positionItem.offsetLeft + 14) + 'px, ' + (positionItem.offsetTop ) + 'px, 0px) scale3d(' + (scaleItem.offsetWidth / container.offsetWidth) + ',' + scaleItem.offsetHeight / getViewport('y') + ',1)';
                        return "hello world"
                    }).then(function (data) {
                    return $timeout(function () {
                        onEndTransition(dummy, function () {
                            // reset server scroll..
                            positionItem.parentNode.scrollTop = 0;
                            container.removeChild(dummy);
                            //classie.remove(gridItem, 'grid__item--loading');
                            //classie.remove(gridItem, 'grid__item--animate');
                            lockScroll = false;
                            window.removeEventListener('scroll', this.noscroll);
                        })
                        current = -1;
                    }, 400)
                })

                //debugger;


                // reset current
            }, 25);
        },
        noscroll: function () {
            if (!lockScroll) {
                lockScroll = true;
                xscroll = scrollX();
                yscroll = scrollY();
            }
            window.scrollTo(xscroll, yscroll);
        }

    }
});
