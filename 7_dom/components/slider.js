export default class Slider {
    image = document.querySelector('#slider')
    images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/TEIDE.JPG/220px-TEIDE.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tourism_in_London795.jpg/170px-Tourism_in_London795.jpg"
    ]
    index
    interval = 3

    constructor() {
        const initialIndex = 0;
        this.image.src = this.images[initialIndex];
        this.index = initialIndex;
        document.querySelector('#sliderRight').addEventListener('click', (event) => {
            this.slideRight()
        })
        document.querySelector('#sliderLeft').addEventListener('click', (event) => {
            this.slideLeft();
        })
        document.querySelector('#newImageButton').addEventListener('click', (event) => {
            let newImageUrl = document.querySelector('#newImageUrl')
            if (newImageUrl.value) {
                this.images.push(newImageUrl.value)
                newImageUrl.value = ''
                this.index = this.images.length - 1
                this.image.src = this.images[this.index]
            }
        })
        this.image.addEventListener('dblclick', (event) => {
            if (confirm("Do you really want to remove this image?")) {
                let indexToRemove = this.index
                this.slideRight()
                this.images.splice(indexToRemove, 1)
            }
        })
        const slideInterval = document.querySelector('#slideInterval');
        slideInterval.value = this.interval;
        slideInterval.addEventListener('input', (event) => {
            this.interval = event.target.value
        })

        var counter = this.interval * 1000;
        var slideByTimer = function () {
            this.slideRight()
            counter = this.interval * 1000
            setTimeout(slideByTimer, counter)
        }.bind(this)
        setTimeout(slideByTimer, counter)
    }

    slideRight() {
        if (this.index >= this.images.length - 1) {
            this.index = 0
        } else {
            this.index++
        }
        this.image.src = this.images[this.index];
    }

    slideLeft() {
        if (this.index <= 0) {
            this.index = this.images.length - 1
        } else {
            this.index--
        }
        this.image.src = this.images[this.index];
    }
}