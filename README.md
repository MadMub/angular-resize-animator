# A few notes
This codebase should more suitably exist as a gist, or a snippet found on stackoverflow, however I thought it would be fun to make it a whole thing and list it on bower. I've done my best to not make it a hack, but in the end this works on the assumption that I know what the browser is doing and what angular is doing when I think it's doing it, so I guess it's still kinda a hack.

As of July 19th, 2015 it works on Safari, Chrome, and Firefox, and maybe IE but I really don't care to try. It is currently targeted for Angular 1.3. Future plans include providing a minifed version via a build process and maybe solving a current issue where only one axis will animate at a time. Since the codebase is small, and due to the nature of it, I will likely not provide test cases, so use it at your own disgression. For some information on the implementation read the comments in the source code.

# Usage
Simple attach the directive to your container and specify the css class where the transition is defined.
```html
<div resize-animator="my-easing-class">{{ dynamicContent }}</div>
```
For many the following css will suffice
```css
.my-easing-class {
  -webkit-transition: width 0.3s ease, height 0.3s ease;
     -moz-transition: width 0.3s ease, height 0.3s ease;
       -o-transition: width 0.3s ease, height 0.3s ease;
          transition: width 0.3s ease, height 0.3s ease;
}
```
