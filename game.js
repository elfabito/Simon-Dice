document.addEventListener("DOMContentLoaded", function () {
  const colors = ["black", "red", "blue", "green"];
  let mach_sequence = [];
  let user_sequence = [];
  let canClick = false;
  let game_continue = true;

  function randomColor(colors) {
    let rand_color = colors[Math.floor(Math.random() * colors.length)];
    return rand_color;
  }

  function createDiv(colors) {
    for (color of colors) {
      const box = document.createElement("div");
      box.id = color;
      box.className = "box";
      box.style.backgroundColor = color;
      document.getElementById("game-container").appendChild(box);
      box.addEventListener("click", function () {
        user(box.id);
      });
    }
  }

  function comparar() {
    if (user_sequence.length < mach_sequence.length) {
      for (let i = 0; i < user_sequence.length; i++) {
        if (user_sequence[i] != mach_sequence[i]) {
          game_continue = false;

          return game_continue;
        } else {
          canClick = true;
          game_continue = true;
          return game_continue;
        }
      }
    } else if (user_sequence.length == mach_sequence.length && game_continue) {
      if (mach_sequence.join() == user_sequence.join()) {
        game_continue = true;
        user_sequence = [];
        canClick = false;
        setTimeout(() => {
          machine();
        }, 1000);
        return game_continue;
      } else {
        game_continue = false;
        return game_continue;
      }
    }
  }

  async function machine() {
    if (canClick == false) {
      rand_color = randomColor(colors);
      mach_sequence.push(rand_color);

      for (let i = 0; i < mach_sequence.length; i++) {
        var box = document.getElementById(mach_sequence[i]);
        console.log("**" + mach_sequence[i]);
        box.style.opacity = 0.5;
        // Use await to pause the loop for 1 second before changing opacity back to 1
        await new Promise((resolve) => setTimeout(resolve, 400));

        box.style.opacity = 1;
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }
    canClick = true;
  }
  function user(color) {
    if (canClick == true) {
      user_sequence.push(color);

      comparar();

      if (game_continue) {
        const box = document.getElementById(color);
        box.style.opacity = 0.5;
        setTimeout(() => {
          box.style.opacity = 1;
        }, 400);

        let text = document.getElementById("text");
        text.innerHTML = "Keep going you are right";

        document.getElementById("game").appendChild(text);
      } else {
        for (color of colors) {
          const box = document.getElementById(color);
          box.style.opacity = 0.5;
        }
        canClick = false;
        let text = document.getElementById("text");
        text.innerHTML = "Wrong";
        const button = document.createElement("button");
        button.innerHTML = "Play Again";
        button.type = "submit";
        button.addEventListener("click", function () {
          location.reload();
        });

        document.getElementById("game").appendChild(text);
        document.getElementById("game").appendChild(button);
        return;
      }
    }
  }

  function initialize() {
    createDiv(colors);
    machine();
  }

  initialize();
});
