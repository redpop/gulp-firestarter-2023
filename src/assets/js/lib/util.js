// Utility function

export default function Util() {}

/*
	class manipulation functions
*/
Util.hasClass = function (element, className) {
    if (element.classList) return element.classList.contains(className);
    return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};

Util.addClass = function (element, className) {
    const classList = className.split(' ');
    if (element.classList) element.classList.add(classList[0]);
    else if (!Util.hasClass(element, classList[0]))
        element.className += ` ${classList[0]}`;
    if (classList.length > 1)
        Util.addClass(element, classList.slice(1).join(' '));
};

Util.removeClass = function (element, className) {
    const classList = className.split(' ');
    if (element.classList) element.classList.remove(classList[0]);
    else if (Util.hasClass(element, classList[0])) {
        const reg = new RegExp(`(\\s|^)${classList[0]}(\\s|$)`);
        element.className = element.className.replace(reg, ' ');
    }
    if (classList.length > 1)
        Util.removeClass(element, classList.slice(1).join(' '));
};

Util.toggleClass = function (element, className, bool) {
    if (bool) Util.addClass(element, className);
    else Util.removeClass(element, className);
};

Util.setAttributes = function (element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

/*
  DOM manipulation
*/
Util.getChildrenByClassName = function (element, className) {
    const { children } = element;
    const childrenByClass = [];
    for (let i = 0; i < element.children.length; i++) {
        if (Util.hasClass(element.children[i], className))
            childrenByClass.push(element.children[i]);
    }
    return childrenByClass;
};

Util.is = function (element, selector) {
    if (selector.nodeType) {
        return element === selector;
    }

    const qa =
        typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : selector;
    let { length } = qa;
    const returnArray = [];

    while (length--) {
        if (qa[length] === element) {
            return true;
        }
    }

    return false;
};

/*
	Animate height of an element
*/
Util.setHeight = function (start, to, element, duration, callback) {
    const change = to - start;
    let currentTime = null;

    var animateHeight = function (timestamp) {
        if (!currentTime) currentTime = timestamp;
        const progress = timestamp - currentTime;
        const value = Number.parseInt((progress / duration) * change + start);
        element.style.height = `${value}px`;
        if (progress < duration) {
            window.requestAnimationFrame(animateHeight);
        } else {
            callback();
        }
    };

    // set the height of the element before starting animation -> fix bug on Safari
    element.style.height = `${start}px`;
    window.requestAnimationFrame(animateHeight);
};

/*
	Smooth Scroll
*/

Util.scrollTo = function (final, duration, callback, scrollElement) {
    const element = scrollElement || window;
    let start = element.scrollTop || document.documentElement.scrollTop;
    let currentTime = null;

    if (!scrollElement)
        start = window.scrollY || document.documentElement.scrollTop;

    var animateScroll = function (timestamp) {
        if (!currentTime) currentTime = timestamp;
        let progress = timestamp - currentTime;
        if (progress > duration) progress = duration;
        const value = Math.easeInOutQuad(
            progress,
            start,
            final - start,
            duration
        );
        element.scrollTo(0, value);
        if (progress < duration) {
            window.requestAnimationFrame(animateScroll);
        } else {
            callback && callback();
        }
    };

    window.requestAnimationFrame(animateScroll);
};

/*
  Focus utility classes
*/

// Move focus to an element
Util.moveFocus = function (element) {
    if (!element) element = document.querySelectorAll('body')[0];
    element.focus();
    if (document.activeElement !== element) {
        element.setAttribute('tabindex', '-1');
        element.focus();
    }
};

/*
  Misc
*/

Util.getIndexInArray = function (array, element) {
    return Array.prototype.indexOf.call(array, element);
};

Util.cssSupports = function (property, value) {
    if ('CSS' in window) {
        return CSS.supports(property, value);
    }
    const jsProperty = property.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
    return jsProperty in document.body.style;
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function () {
    // Variables
    const extended = {};
    let deep = false;
    let i = 0;
    const { length } = arguments;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
    }

    // Merge the object into the extended object
    const merge = function (object) {
        for (const property in object) {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
                // If deep merge and property is an object, merge properties
                if (
                    deep &&
                    Object.prototype.toString.call(object[property]) ===
                        '[object Object]'
                ) {
                    extended[property] = extend(
                        true,
                        extended[property],
                        object[property]
                    );
                } else {
                    extended[property] = object[property];
                }
            }
        }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
        const object = arguments[i];
        merge(object);
    }

    return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function () {
    if (!window.matchMedia) return false;
    const matchMediaObject = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );
    if (matchMediaObject) return matchMediaObject.matches;
    return false; // return false if not supported
};

/*
	Polyfills
*/
// Closest() method
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let element = this;
        if (!document.documentElement.contains(element)) return null;
        do {
            if (element.matches(s)) return element;
            element = element.parentElement || element.parentNode;
        } while (element !== null && element.nodeType === 1);
        return null;
    };
}

// Custom Event() constructor
if (typeof window.CustomEvent !== 'function') {
    function CustomEvent(event, parameters) {
        parameters = parameters || {
            bubbles: false,
            cancelable: false,
            detail: undefined,
        };
        const event_ = document.createEvent('CustomEvent');
        event_.initCustomEvent(
            event,
            parameters.bubbles,
            parameters.cancelable,
            parameters.detail
        );
        return event_;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}

/*
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

Math.easeInQuart = function (t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
};

Math.easeOutQuart = function (t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
};

Math.easeInOutQuart = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
};

Math.easeOutElastic = function (t, b, c, d) {
    var s = 1.70158;
    let p = d * 0.7;
    let a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
        a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
        c +
        b
    );
};

/* JS Utility Classes */
(function () {
    // make focus ring visible only for keyboard navigation (i.e., tab key)
    const focusTab = document.querySelectorAll('.js-tab-focus');
    function detectClick() {
        if (focusTab.length > 0) {
            resetFocusTabs(false);
            window.addEventListener('keydown', detectTab);
        }
        window.removeEventListener('mousedown', detectClick);
    }

    function detectTab(event) {
        if (event.keyCode !== 9) return;
        resetFocusTabs(true);
        window.removeEventListener('keydown', detectTab);
        window.addEventListener('mousedown', detectClick);
    }

    function resetFocusTabs(bool) {
        const outlineStyle = bool ? '' : 'none';
        for (const element of focusTab) {
            element.style.setProperty('outline', outlineStyle);
        }
    }
    window.addEventListener('mousedown', detectClick);
})();
