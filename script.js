$(window).on("load", function () {
  let count = 0;
  var ballInterval;

  var introductionText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit cumque ipsam, asperiores reiciendis libero fuga dolorem? Quod pariatur ad cum";
  var words = introductionText.split(" ");
  var index = 0;

  var intervalId = setInterval(() => {
    if (index < words.length) {
      $(".introduction").text($(".introduction").text() + " " + words[index]);
      index++;
    } else {
      clearInterval(intervalId); // Stop the setInterval once all words are displayed
      $("<button class=beginButton>Lets begin</button>").appendTo(
        ".beforeGame"
      );
    }
  }, 100);

  setInterval(function () {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    var minDistanceFromEdge = 50; // Adjust this value as needed

    var positionStarX =
      Math.random() * (windowWidth - 2 * minDistanceFromEdge) +
      minDistanceFromEdge;
    var positionStarY =
      Math.random() * (windowHeight - 2 * minDistanceFromEdge) +
      minDistanceFromEdge;

    var degreeStar = Math.random() * 360;

    $("<div class='stars'><span class='fa fa-star star'></span></div>")
      .appendTo(".beforeGame")
      .css({
        position: "absolute",
        left: positionStarX + "px",
        top: positionStarY + "px",
        color: "yellow",
        textShadow: "0 0 10px white",
        fontSize: "100px",
        height: "100px",
        width: "100px",
        transform: "rotateZ(" + degreeStar + "deg)",
        animation: "stars 1s linear infinite",
      });
  }, 1000);

  setTimeout(() => {
    var ballInterval = setInterval(function () {
      $(".stars:first").remove();
    }, 1000);
  }, 1000);

  $(".beginButton").on("click", function () {
    $(".beforeGame").css("display", "none");
    $(".game").css("display", "block");
  });
  $(".beginButton").on("click", function () {
    //game begins----------------------------------------------------------------------------------------------------------------------------->

    $(".beforeGame").css("display", "none");
    $(".game").css("display", "block");
    // Set up the initial interval to create and animate balls
    setInterval(function () {
      var randomX = Math.random() * ($(window).width() - 100);
      var randomColor1 = Math.random() * 255;
      var randomColor2 = Math.random() * 255;
      var randomColor3 = Math.random() * 255;
      var shadowColor =
        "rgb(" +
        Math.floor(randomColor1) +
        ", " +
        Math.floor(randomColor2) +
        ", " +
        Math.floor(randomColor3) +
        ")";

      // Create a new ball element and append it to the body
      $("<div class='ball'><span class='fa fa-star star'></span></div>")
        .appendTo(".game")
        .css({
          left: randomX + "px",
          color: shadowColor,
          backgroundColor: "transparent",
          boxShadow: "0 0 30px 15px " + shadowColor,
        });

      // Check if count is greater than or equal to 5 and adjust the width
      if (count >= 5) {
        $(".ball").css("animation", "move 1s linear infinite");
      }
      if (count >= 10) {
        $(".ball").css("animation", "move 0.7s linear infinite");
      }
    }, 1000);

    // Set up a timeout to start the interval for removing balls after 3 seconds
    setTimeout(function () {
      // Set up the interval to remove the first ball every second
      ballInterval = setInterval(function () {
        $(".ball:first").remove();
      }, 1000);
    }, 1000);

    // Use event delegation for click events on dynamically created elements
    $("body").on("click", ".ball", function () {
      var ball = $(this);

      // Increase the size of the ball
      ball.css({
        width: "100px",
        height: "100px",
        opacity: "0.3",
        color: "yellow",
        fontSize: "200px",
        textShadow: "0 0 100px 60px yellow",
      });

      // Hide the ball after 300 milliseconds
      setTimeout(function () {
        ball.css("display", "none");
      }, 150);

      count++;

      // Update the score
      $(".score").html("Count now is: " + count);
    });

    setTimeout(function () {
      $(".game").css("display", "none");

      setTimeout(function () {
        $(".result").html(
          "<div>Time is over. Your score is : " + count + "</div>"
        );
        $(".result").fadeIn(2000);
        $(".result").css("display", "block");
        setTimeout(function () {
          $(".button").fadeIn(1000);
        }, 1000);
      }, 200);
    }, 5000);
    //time control
    setInterval(function () {
      $(".timesheet").css("left", "-=5px");
    }, 100);
    $(".button").on("click", function () {
      location.reload();
    });
    setTimeout(function () {
      $(".timesheet").css("backgroundColor", "#f39c12");
    }, 10000);
    setTimeout(function () {
      $(".timesheet").css("backgroundColor", "#e74c3c");
      $(".time").css("border", "2px solid #ff0000");
      $(".time").css("animation", "blink 0.5s infinite");
    }, 15000);
  });
});
