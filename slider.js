//Slider's constructor class
class Slider {
    constructor(slider_container, start_slide_index, slide_item, prev_button, next_button, dots_container = undefined, dot = undefined) {
        this.slider_container = document.querySelector(slider_container);       //container for slider's instance
        this.slide_index = start_slide_index;                                   //number of the starting slide
        this.slides = this.slider_container.querySelectorAll(slide_item);       //slides items list
        this.prev_button = this.slider_container.querySelector(prev_button);    //previous slide button
        this.next_button = this.slider_container.querySelector(next_button);    //next slide button

        //check the availability of the dots and its container into the object instance
        if ((dots_container && dot) !== undefined) {
            this.dots_container = document.querySelector(dots_container);       //container for dots as control items
            this.dot = dot.slice(1);

            //check the length of the dots items list
            //and if its are shorter than the length of the slides items list
            //then start adding the dots while the both lists length aren't became equal
            if (this.dots_container.querySelectorAll(dot).length < this.slides.length) {
                for (let i = 1; i < this.slides.length; i++) {
                    let additional_dot = document.createElement('div');
                    additional_dot.classList.add(this.dot);
                    this.dots_container.appendChild(additional_dot);
                }
            }

            this.dots = this.dots_container.querySelectorAll(dot);              //dots items list
        }
    }

    //initialize slider with starting slide number getting as a method argument
    show_slide(current_slide_index) {

        //check the following condition to define which slide needed to be displayed
        //the condition: if the current slide index (defined as an argument at class instance creating)
        //are over of the slides items list length then set the current slide index equals to one
        //else if the current slide index are less than one
        //then set the current slide index equals to the slides items list length thus will be displayed the last slider's item
        if (current_slide_index > this.slides.length) {
            this.slide_index = 1;
        } else if (current_slide_index < 1) {
            this.slide_index = this.slides.length;
        }

        //if there are exists dots container with its own inner dots
        //then remove from all the dots class "active" (you may define its name different)
        //and add it only for the dot with the index equals to the current slide index
        if (this.dots_container !== undefined && this.dots !== undefined) {
            this.dots.forEach((item) => item.classList.remove('dot-active'));
            this.dots[this.slide_index - 1].classList.add('dot-active');

            //catch the single dot item click event and invoke the click handler
            this.dots_container.addEventListener('click', this.dots_control);
        }

        //hide all the slides
        this.slides.forEach((item) => item.style.display = 'none');

        //show the current slide
        this.slides[this.slide_index - 1].style.display = 'block';

        //catch the previous slide button click event
        this.prev_button.addEventListener('click', this.decrease);

        //catch the next slide button click event
        this.next_button.addEventListener('click', this.increase);
    }

    //his method invokes the show_slide() method with an argument
    //that change current slide index in depending on it's self value
    change_slide_index(current_slide_index_changed_by) {
        this.show_slide(this.slide_index += current_slide_index_changed_by);
    }

    //decrease method invoke the change_slide_index() method
    //with a negative 1 as an argument
    decrease = () => this.change_slide_index(-1);

    //increase method invoke the change_slide_index() method
    //with a positive 1 as an argument
    increase = () => this.change_slide_index(1);

    //single dot item click handler
    //check the click event target, and if the target element equals to the single dot
    //then we get the current dot index and set it as a current slide index to the show_slide() method
    dots_control = (event) => {
        let target = event.target;
        for (let i = 1; i < this.dots.length + 1; ++i) {
            if (target.classList.contains(this.dot) && target === this.dots[i-1]) {
                this.show_slide(this.slide_index = i);
            }
        }
    }
}

//creating the Slider class instance
let slider = new Slider('.wrap', 1, '.slider-item', '.prev', '.next', '.slider-dots', '.dot');

//initialize new slider object
slider.show_slide();