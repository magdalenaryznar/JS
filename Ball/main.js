document.addEventListener("DOMContentLoaded", () => {
    var garden = document.querySelector('.garden');

    const playing = true;
 
    const startDate =  Date.now(); 
    var ball = document.querySelector('.ball');

    var maxX = garden.clientWidth - ball.clientWidth;
    var maxY = garden.clientHeight - ball.clientHeight;
    var randomX = getRandomInt(0, maxX);
    var randomY = getRandomInt(0, maxY);

    const hall = document.getElementById("holeTemplate").content.cloneNode(true);



    const hole = hall.querySelector(".hole");

    hole.style.top = randomX + "px";
    hole.style.left = randomY + "px";

    garden.appendChild(hole);

    window.addEventListener('deviceorientation', handleOrientation);

    function handleOrientation(event) {
        var x = event.beta;
        var y = event.gamma;




        if (x > 180) { x = 180 };
        if (x < -180) { x = -180 };


        x += 180;
        y += 180;


        ball.style.top = (maxY * y / 360 - 10) + "px";
        ball.style.left = (maxX * x / 360 - 10) + "px";

        const rectBall = ball.getBoundingClientRect();


        const rectHole = hole.getBoundingClientRect();


        const currentDate = (Date.now() - startDate) / 1000;
       

 
        if (rectBall.top + rectBall.height > rectHole.top
            && rectBall.left + rectBall.width > rectHole.left
            && rectBall.bottom - rectBall.height < rectHole.bottom
            && rectBall.right - rectBall.width < rectHole.right) {
          
            if (playing) {
                alert("You win! In " + currentDate + " seconds")
                playing = false;
                window.location.reload(true);
            }
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

});