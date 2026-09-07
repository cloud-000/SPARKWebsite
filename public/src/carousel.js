/**
 * Rotate the id "current" for the children of the wrapper element by the given rotation(wrap around).
 * Make sure the given wrapper only have children element you want to rotate. If not, make a wrapper div
 * @param {String | String[]} wrapper the parent element of the children to be rotated. Should be String class name of the parent element.
 * @param {int | int[]} rotation how much to rotate the children by. If $setTo is true, this will be the index of the child to be "current". Positive = go right
 * @param {bool} setTo if true, will set the children of the given index to be "current"
 * @returns void
 */
function rotate(wrapper, rotation, setTo=false) {
    
    wrapper = Array.isArray(wrapper) ? wrapper : [wrapper];
    wrapper.map(selector => document.querySelector(selector)).forEach(parent => {
        
        const children = Array.from(parent.children);

        if(setTo) {
            children.filter(child => child.classList.contains("current")).forEach(e => e.classList.remove("current"));
            if(Array.isArray(rotation)) {
                return rotation.forEach(index => children[index].classList.add("current"));
            }
            return children[rotation].classList.add("current");
        }

        const currentElements = children.filter(child => child.classList.contains("current"));
        
        if(currentElements.length > 1) rotation *= -1; 

        const indexes = children.map((child, i) => child.classList.contains("current") ? i : -1).filter(i => i !== -1);   
        
        currentElements.forEach(e => e.classList.remove("current"));

        for(let i = 0, l = currentElements.length; i < l; i++) {
            let newIndex = (indexes[i] + rotation) % children.length;
            if (newIndex < 0) newIndex += children.length;
            children[newIndex].classList.add("current");
        }

        if(currentElements.length > 1) {
            for(let i = 0, l = Math.abs(rotation); i < l; i++) 
                rotation > 0 ? children.push(children.shift()) : children.unshift(children.pop());

            parent.innerHTML = '';
            children.forEach(child => parent.appendChild(child));
        }
    })
}
