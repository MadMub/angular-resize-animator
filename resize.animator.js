app.directive('resizeAnimator', function($animate) {
    return {
        link: function(scope, elem, attrs) {
            /* control variables to lock animation */
            scope.animating = {
                width: false,
                height: false
            };

            function resize(newValue, oldValue, property) {
                /* animate if size has actually changed and animation isn't already in progress */
                if (newValue !== oldValue && !scope.animating[property]) {
                    var oldValueCss = oldValue + 'px';
                    var newValueCss = newValue + 'px';
                    var from = {};
                    var to = {};
                    from[property] = oldValueCss;
                    to[property] = newValueCss;
                    /* lock down animation */
                    scope.animating[property] = true;
                    $animate.animate(elem, from, to, attrs.resizeAnimate).then(function() {
                        /* animation complete, set property back to auto
                        this will trigger a recalculation essentially negating our animation
                        (ie container started at 200px, we animated it to 500px,
                        but switching it to auto brings it back to 200px)
                        hence the reason for the control variables */
                        elem.attr('style', property + ': auto;');
                        /* since we indirectly modified element width/height,
                        we need to trigger the rest of the DOM render so the size calculation
                        is brought back up to its true size. */
                        scope.$apply();
                        /* at this point, two digest cycles would have been triggered,
                        using control variables allows us to ignore unwanted animations */
                        scope.animating[property] = false;
                    });
                }
            }

            function resizeWidth(newValue, oldValue) {
                /* don't animate if other axis is */
                if (!scope.animating.height) {
                    resize(newValue, oldValue, 'width');
                }
            }

            function resizeHeight(newValue, oldValue) {
                /* don't animate if other axis is */
                if (!scope.animating.width) {
                    resize(newValue, oldValue, 'height');
                }
            }

            scope.$watch(function() {
                return elem[0].offsetWidth;
            }, resizeWidth);

            scope.$watch(function() {
                return elem[0].offsetHeight;
            }, resizeHeight);
        }
    };
});
