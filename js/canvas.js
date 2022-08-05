let canvas = document.getElementById("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let c = canvas.getContext('2d');


let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 30
let minRadius = 2

let colorArray = [
    // "#2C3E50",
    "green",
    // "#ECF0F1",
    // "#3498DB",
    // "#2980B9",
]

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    init()
})

class Circle {
    constructor(m, n, dm, dn, radius) {
        this.m = m;
        this.n = n;
        this.dm = dm;
        this.dn = dn;
        this.radius = radius;
        this.minRadius = radius
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]


        this.draw = function () {
            c.beginPath();
            c.arc(this.m, this.n, this.radius, 0, Math.PI * 2, false)
            c.strokeStyle = this.color
            c.stroke()
            c.fillStyle = this.color

            c.fill()

        }

        this.update = function () {
            if (this.m + this.radius > innerWidth || this.m - this.radius < 0) {
                this.dm = -this.dm
            }

            if (this.n + this.radius > innerHeight || this.n - this.radius < 0) {
                this.dn = -this.dn
            }

            this.m += this.dm
            this.n += this.dn

            //interactivity
            if (mouse.x - this.m < 50 && mouse.x - this.m > -50
                && mouse.y - this.n < 50 && mouse.y - this.n > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1
                }
            
            }
            else if (this.radius > this.minRadius) {
                this.radius -= 1
            }
        

            this.draw()


        }

    }
}



let circleArray = [];

for (let i = 0; i < 800; i++) {
    let radius = Math.random() * 4 + 1;
    let m = Math.random() * (innerWidth - (radius * 2)) + radius;
    let n = Math.random() * (innerHeight - (radius * 2)) + radius;
    let dm = (Math.random() - 0.5);
    let dn = (Math.random() - 0.5);

    circleArray.push(new Circle(m, n, dm, dn, radius))
}



function init(){
    circleArray = [];

for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 2 + 1;
    let m = Math.random() * (innerWidth - (radius * 2)) + radius;
    let n = Math.random() * (innerHeight - (radius * 2)) + radius;
    let dm = (Math.random() - 0.5);
    let dn = (Math.random() - 0.5);

    circleArray.push(new Circle(m, n, dm, dn, radius))
}

}

function animate() {
    requestAnimationFrame(animate)

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }

}

animate()
