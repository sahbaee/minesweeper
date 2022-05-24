(() => {
  // select DOM Element.
  let boxes = document.querySelectorAll(".box");
  let end_screen = document.querySelector(".end_screen");
  let refresh_btn = document.querySelector(".refresh_button");
  let sfx_1: HTMLAudioElement | null = document.querySelector("#sfx_1");
  let sfx_2: HTMLAudioElement | null = document.querySelector("#sfx_2");
  // the exist state/mode for mines.
  let state_list = [1, 2, 3, "null", "bomb"];
  // random replace mines box.
  function random_box_set() {
    for (let y = 0; y < state_list.length; y++) {
      for (let i = 0; i < state_list.length; i++) {
        let no_state = document.querySelectorAll(".box[state='unset']");
        let box_number = Math.floor(Math.random() * no_state.length);
        no_state[box_number].setAttribute("state", String(state_list[y]));
      }
    }
  }
  // click event handler.
  function click() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener("click", () => {
        let checkState = String(boxes[i].getAttribute("state"));
        let clickState = String(boxes[i].getAttribute("click_state"));
        let clickStatus = String(boxes[i].getAttribute("click_status"));
        if (clickState == "ready" && clickStatus !== "disable") {
          boxes[i].setAttribute("click_state", "clicked");
          if (checkState !== "bomb" && checkState !== "null") {
            boxes[i].innerHTML = String(boxes[i].getAttribute("state"));
          }
          if (checkState == "bomb") {
            boxes[i].setAttribute("state", "exploded");
            exploded();
          }
        }
      });
    }
  }
  // explode mine event
  function exploded() {
    let mines = document.querySelectorAll(".box[state='bomb']");
    for (let i = 0; i < mines.length; i++) {
      setInterval(() => {
        mines[i].setAttribute("state", "exploded_mines");
      }, 200 * i);
    }
    disable_click();
    sound();
    endScreen();
  }
  function disable_click() {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].setAttribute("click_status", "disable");
    }
  }
  function endScreen() {
    setTimeout(() => {
      end_screen?.classList.remove("display_none");
    }, 1000);
    refresh_btn?.addEventListener("click", () => {
      location.reload();
    });
  }
  function sound() {
    sfx_1?.play();
    setTimeout(() => {
      sfx_2?.play();
    }, 1000);
  }
  click();
  random_box_set();
})();
