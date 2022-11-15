const subject_id = jsPsych.data.getURLVariable("sub");
const trial_order = jsPsych.data.getURLVariable("order");
const today = new Date();
const DoT = {
  month: today.getMonth() + 1,
  day: today.getDate(),
  year: today.getFullYear(),
  hour: today.getHours(),
  min: today.getMinutes(),
};

const soundURL =
  "https://raw.githubusercontent.com/rpomper/PreFam/master/orders/PreFam-Order-1-Sound.csv";
const refURL =
  "https://raw.githubusercontent.com/rpomper/PreFam/master/orders/PreFam-Order-1-Ref.csv";
const linkURL =
  "https://raw.githubusercontent.com/rpomper/PreFam/master/orders/PreFam-Order-1-Link.csv";

const teachingURL = `https://raw.githubusercontent.com/rpomper/PreFam/master/orders/PreFam-Order-${trial_order}.csv`;

function postToRedcap(body) {
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
  return fetch("https://study.boystown.org/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });
}

function uploadToRedcap(token) {
  postToRedcap(`token=${token}&content=generateNextRecordName`)
    .then((response) => response.text())
    .then((text) => {
      const id = text;
      postToRedcap(
        `token=${token}&content=record&format=json&type=flat&overwriteBehavior=normal&forceAutoNumber=false&data=[${JSON.stringify(
          {
            record_id: id,
            subject_num: subject_id,
            order: trial_order,
            date: JSON.stringify(DoT),
            results_sound: jsPsych.data
              .get()
              .filter({ phase: "test_sound" })
              .json(),
            results_ref: jsPsych.data
              .get()
              .filter({ phase: "test_ref" })
              .json(),
            results_link: jsPsych.data
              .get()
              .filter({ phase: "test_link" })
              .json(),
          }
        )}]&returnContent=count&returnFormat=json`
      );
    });
}

const timeline = [];

const imageExt = "stimuli/images/";
const images = [
  `${imageExt}B1.jpg`,
  `${imageExt}A1.jpg`,
  `${imageExt}A2.jpg`,
  `${imageExt}A3.jpg`,
  `${imageExt}A4.jpg`,
  `${imageExt}A21.jpg`,
  `${imageExt}A22.jpg`,
  `${imageExt}A23.jpg`,
  `${imageExt}A24.jpg`,
  `${imageExt}A25.jpg`,
  `${imageExt}A26.jpg`,
  `${imageExt}A27.jpg`,
  `${imageExt}A28.jpg`,
  `${imageExt}A30.jpg`,
  `${imageExt}A31.jpg`,
  `${imageExt}A32.jpg`,
  `${imageExt}A33.jpg`,
  `${imageExt}A34.jpg`,
  `${imageExt}A35.jpg`,
  `${imageExt}B1.jpg`,
  `${imageExt}B2.jpg`,
  `${imageExt}B3.jpg`,
  `${imageExt}B4.jpg`,
  `${imageExt}B21.jpg`,
  `${imageExt}B22.jpg`,
  `${imageExt}B23.jpg`,
  `${imageExt}B24.jpg`,
  `${imageExt}B25.jpg`,
  `${imageExt}B26.jpg`,
  `${imageExt}B28.jpg`,
  `${imageExt}B29.jpg`,
  `${imageExt}B30.jpg`,
  `${imageExt}B31.jpg`,
  `${imageExt}B32.jpg`,
  `${imageExt}B34.jpg`,
  `${imageExt}B35.jpg`,
  `${imageExt}C1.jpg`,
  `${imageExt}C2.jpg`,
  `${imageExt}C3.jpg`,
  `${imageExt}C21.jpg`,
  `${imageExt}C22.jpg`,
  `${imageExt}C23.jpg`,
  `${imageExt}C24.jpg`,
  `${imageExt}C25.jpg`,
  `${imageExt}C26.jpg`,
  `${imageExt}C27.jpg`,
  `${imageExt}C28.jpg`,
  `${imageExt}C29.jpg`,
  `${imageExt}C30.jpg`,
  `${imageExt}C31.jpg`,
  `${imageExt}C32.jpg`,
  `${imageExt}C33.jpg`,
  `${imageExt}C34.jpg`,
  `${imageExt}C35.jpg`,
  `${imageExt}C36.jpg`,
  `${imageExt}D1.jpg`,
  `${imageExt}D2.jpg`,
  `${imageExt}D3.jpg`,
  `${imageExt}D4.jpg`,
  `${imageExt}E1.jpg`,
  `${imageExt}E2.jpg`,
  `${imageExt}E3.jpg`,
  `${imageExt}E4.jpg`,
  `${imageExt}F1.jpg`,
  `${imageExt}F2.jpg`,
  `${imageExt}F3.jpg`,
  `${imageExt}F4.jpg`,
  `${imageExt}G1.jpg`,
  `${imageExt}G2.jpg`,
  `${imageExt}G3.jpg`,
  `${imageExt}G4.jpg`,
  `${imageExt}H1.jpg`,
  `${imageExt}H2.jpg`,
  `${imageExt}H3.jpg`,
  `${imageExt}H4.jpg`,
  `${imageExt}I1.jpg`,
  `${imageExt}I2.jpg`,
  `${imageExt}I3.jpg`,
  `${imageExt}I4.jpg`,
  `${imageExt}J1.jpg`,
  `${imageExt}J2.jpg`,
  `${imageExt}J3.jpg`,
  `${imageExt}J4.jpg`,
  `${imageExt}K1.jpg`,
  `${imageExt}K2.jpg`,
  `${imageExt}K3.jpg`,
  `${imageExt}K4.jpg`,
  `${imageExt}L1.jpg`,
  `${imageExt}L2.jpg`,
  `${imageExt}L3.jpg`,
  `${imageExt}L4.jpg`,
  `${imageExt}mercury.jpg`,
  `${imageExt}venus.jpg`,
  `${imageExt}earth.jpg`,
  `${imageExt}mars.jpg`,
  `${imageExt}jupiter.jpg`,
  `${imageExt}saturn.jpg`,
  `${imageExt}neptune.jpg`,
  `${imageExt}mae.jpg`,
  `${imageExt}black.jpg`,
  `${imageExt}black-background.jpg`,
  `${imageExt}launch-pad-background.jpg`,
  `${imageExt}launch-pad-ship-background.jpg`,
  `${imageExt}spaceship-1.jpg`,
  `${imageExt}spaceship-2.jpg`,
  `${imageExt}spaceship-3.jpg`,
  `${imageExt}luggage-1.jpg`,
  `${imageExt}luggage-2.jpg`,
  `${imageExt}luggage-3.jpg`,
  `${imageExt}newspaper.jpg`,
  `${imageExt}plastic-bag.jpg`,
  `${imageExt}numpad-a-1.jpg`,
  `${imageExt}numpad-a-2.jpg`,
  `${imageExt}numpad-a-3.jpg`,
  `${imageExt}numpad-a-4.jpg`,
  `${imageExt}numpad-a-5.jpg`,
  `${imageExt}numpad-a-6.jpg`,
  `${imageExt}numpad-a-7.jpg`,
  `${imageExt}numpad-b-1.jpg`,
  `${imageExt}numpad-b-2.jpg`,
  `${imageExt}numpad-b-3.jpg`,
  `${imageExt}numpad-b-4.jpg`,
  `${imageExt}numpad-b-5.jpg`,
  `${imageExt}numpad-b-6.jpg`,
  `${imageExt}numpad-b-7.jpg`,
  `${imageExt}numpad-keys.jpg`,
  `${imageExt}dot.jpg`,
  `${imageExt}space-1.jpg`,
  `${imageExt}space-2.jpg`,
  `${imageExt}space-3.jpg`,
  `${imageExt}space-4.jpg`,
  `${imageExt}space-5.jpg`,
  `${imageExt}space-6.jpg`,
  `${imageExt}space-7.jpg`,
  `${imageExt}space-8.jpg`,
  `${imageExt}space-1.jpg`,
  `${imageExt}control-panel-1.jpg`,
  `${imageExt}control-panel-2.jpg`,
  `${imageExt}control-panel-3.jpg`,
  `${imageExt}control-panel-4.jpg`,
  `${imageExt}control-panel-5.jpg`,
];

function createTrials(teaching, test_Sound, test_Ref, test_Link, tabletop) {
  const audioExt = "stimuli/sounds/";
  const imageStart = '<img src= "stimuli/images/';
  const imageStop = '.jpg"  title = "" width="300" height="300">';
  const numStop = '.jpg"  title = "" width="250" height="300">';
  const dotStop = '.jpg"  title = "" width="100" height="100">';
  const spaceStop = '.jpg"  title = "" width="800" height="218">';

  const welcome = {
    type: "fullscreen",
    message: `<p style='font-size:30px;'> Version: 1.6.3 <br><br><br>Subject: ${subject_id.toString()}<br><br>Order: ${trial_order.toString()}</p><br>`,
    button_label: "Next",
    delay_after: 250,
  };

  timeline.push(welcome);

  const wait_for_instructions = {
    type: "html-button-response",
    stimulus:
      "<p style='font-size:30px;'> When you are ready, click the NEXT button to hear the instructions.</br> </p>",
    choices: ["Next"],
    trial_duration: null,
    set_background: "black-background",
  };

  timeline.push(wait_for_instructions);

  function presentBlock(block_num) {
    const teachingStart = 0 + 5 * block_num;
    const teachingStop = 5 + 5 * block_num;
    const testStart = 0 + 5 * block_num;
    const testStop = 5 + 5 * block_num;

    if (block_num === 0) {
      const intro_mae = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: 26000,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioExt}instruct-start.wav`,
        choices: [
          `${imageStart}mae${imageStop}`,
          `${imageStart}earth${imageStop}`,
        ],
      };
      timeline.push(intro_mae);

      const wait_to_start = {
        type: "html-button-response",
        stimulus:
          "<p style='font-size:30px;'> When you are ready to meet Mae's friends, click the START button below.</br> </p>",
        choices: [
          '<img src= "stimuli/images/start-button.jpg" title = "" width="150" height="75">',
        ],
        trial_duration: null,
        set_background: "black-background",
      };

      timeline.push(wait_to_start);
    } else {
      const more_friends = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: 10000,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioExt}instruct-more.wav`,
        choices: [
          `${imageStart}mae${imageStop}`,
          `${imageStart}earth${imageStop}`,
        ],
      };
      timeline.push(more_friends);
    }

    for (let i = teachingStart; i < teachingStop; i += 1) {
      const show_trial_num = {
        type: "html-keyboard-response",
        stimulus: `<p style='font-size:90px;'>${teaching[i].tr_num}</p>`,
        choices: jsPsych.NO_KEYS,
        set_background: "black-background",
        trial_duration: 500,
      };

      timeline.push(show_trial_num);

      const part_1 = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: teaching[i].audio1_dur,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        set_background: teaching[i].background,
        stimulus: `${audioExt}teaching/${teaching[i].audio1}.wav`,
        choices: [
          imageStart + teaching[i].left_image1 + imageStop,
          imageStart + teaching[i].right_image1 + imageStop,
        ],
      };

      timeline.push(part_1);

      const part_2 = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: teaching[i].audio2_dur,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioExt}teaching/${teaching[i].audio2}.wav`,
        choices: [
          imageStart + teaching[i].left_image2 + imageStop,
          imageStart + teaching[i].right_image2 + imageStop,
        ],
        data: {
          phase: "teaching",
          block: teaching[i].block,
          trial: teaching[i].phase_num,
          condition: teaching[i].condition,
          alien: teaching[i].alien,
          name: teaching[i].name,
          target_side: teaching[i].target_side,
          correct_response: teaching[i].correct_response,
        },
        post_trial_gap: 500,
        on_finish(data) {
          data.correct = data.button_pressed === data.correct_response;
        },
      };

      timeline.push(part_2);
    }

    const phono_instr = {
      type: "audio-button-response-flexiblelocations",
      trial_duration: 9000,
      response_ends_trial: false,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioExt}instruct-sound.wav`,
      choices: [`${imageStart}mae${imageStop}`],
    };

    timeline.push(phono_instr);

    for (let i = testStart; i < testStop; i += 1) {
      const show_trial_num = {
        type: "html-keyboard-response",
        stimulus: `<p style='font-size:90px;'>${test_Sound[i].tr_num}</p>`,
        choices: jsPsych.NO_KEYS,
        set_background: "black-background",
        trial_duration: 500,
      };

      timeline.push(show_trial_num);

      const test_phono_1 = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: 1000,
        response_ends_trial: false,
        margin_top: ["0px"],
        margin_bottom: ["0px"],
        margin_left: ["0px"],
        margin_right: ["680px"],
        display_attribute: ["inline-block"],
        stimulus: `${audioExt}testing/${test_Sound[i].sound1}.wav`,
        choices: [`${imageStart}dot${dotStop}`],
      };

      timeline.push(test_phono_1);

      const test_phono_2 = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: 1000,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "200px"],
        margin_right: ["0px", "340px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioExt}testing/${test_Sound[i].sound2}.wav`,
        choices: [`${imageStart}dot${dotStop}`, `${imageStart}dot${dotStop}`],
      };

      timeline.push(test_phono_2);

      const test_phono_3 = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["0px", "0px", "0px"],
        margin_bottom: ["0px", "0px", "0px"],
        margin_left: ["0px", "200px", "200px"],
        margin_right: ["0px", "0px", "0px"],
        display_attribute: ["inline-block", "inline-block", "inline-block"],
        stimulus: `${audioExt}testing/${test_Sound[i].sound3}.wav`,
        choices: [
          `${imageStart}dot${dotStop}`,
          `${imageStart}dot${dotStop}`,
          `${imageStart}dot${dotStop}`,
        ],
        data: {
          phase: "test_sound",
          block: test_Sound[i].block,
          trial: test_Sound[i].phase_num,
          condition: test_Sound[i].condition,
          name: test_Sound[i].name,
          target_side: test_Sound[i].target_side,
          correct_response: test_Sound[i].correct_response,
        },
        on_finish(data) {
          data.correct = data.button_pressed === data.correct_response;
        },
      };

      timeline.push(test_phono_3);
    }

    const ref_instr = {
      type: "audio-button-response-flexiblelocations",
      trial_duration: 9000,
      response_ends_trial: false,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioExt}instruct-ref.wav`,
      choices: [`${imageStart}mae${imageStop}`],
    };

    timeline.push(ref_instr);

    for (let i = testStart; i < testStop; i += 1) {
      const show_trial_num = {
        type: "html-keyboard-response",
        stimulus: `<p style='font-size:90px;'>${test_Ref[i].tr_num}</p>`,
        choices: jsPsych.NO_KEYS,
        set_background: "black-background",
        trial_duration: 500,
      };

      timeline.push(show_trial_num);

      const test_referent = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["0px", "0px", "0px"],
        margin_bottom: ["0px", "0px", "0px"],
        margin_left: ["0px", "150px", "0px"],
        margin_right: ["0px", "0px", "0px"],
        display_attribute: ["inline-block", "inline-block", "block"],
        stimulus: "stimuli/sounds/silence.wav",
        choices: [
          imageStart + test_Ref[i].left_image + imageStop,
          imageStart + test_Ref[i].center_image + imageStop,
          imageStart + test_Ref[i].right_image + imageStop,
        ],
        data: {
          phase: "test_ref",
          block: test_Ref[i].block,
          trial: test_Ref[i].phase_num,
          condition: test_Ref[i].condition,
          alien: test_Ref[i].alien,
          target_side: test_Ref[i].target,
          correct_response: test_Ref[i].correct_response,
        },
        on_finish(data) {
          data.correct = data.button_pressed === data.correct_response;
        },
      };

      timeline.push(test_referent);
    }

    const visuo_instr = {
      type: "audio-button-response-flexiblelocations",
      trial_duration: 8000,
      response_ends_trial: false,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioExt}instruct-link.wav`,
      choices: [`${imageStart}mae${imageStop}`],
    };

    timeline.push(visuo_instr);

    for (let i = testStart; i < testStop; i += 1) {
      const show_trial_num = {
        type: "html-keyboard-response",
        stimulus: `<p style='font-size:90px;'>${test_Link[i].tr_num}</p>`,
        choices: jsPsych.NO_KEYS,
        set_background: "black-background",
        trial_duration: 500,
      };

      timeline.push(show_trial_num);

      const test_visuo = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["0px", "0px", "0px"],
        margin_bottom: ["0px", "0px", "0px"],
        margin_left: ["0px", "150px", "0px"],
        margin_right: ["0px", "0px", "0px"],
        display_attribute: ["inline-block", "inline-block", "block"],

        stimulus: `${audioExt}testing/${test_Link[i].audio}.wav`,
        choices: [
          imageStart + test_Link[i].left_image + imageStop,
          imageStart + test_Link[i].center_image + imageStop,
          imageStart + test_Link[i].right_image + imageStop,
        ],
        data: {
          phase: "test_link",
          block: test_Link[i].block,
          trial: test_Link[i].phase_num,
          condition: test_Link[i].condition,
          alien: test_Link[i].alien,
          name: test_Link[i].audio,
          target_side: test_Link[i].target,
          correct_response: test_Link[i].correct_response,
        },
        on_finish(data) {
          data.correct = data.button_pressed === data.correct_response;
        },
      };

      timeline.push(test_visuo);
    }
  }

  function show_progress(block_num) {
    const blocks_left = 6 - block_num;

    const progress_between_block = {
      type: "audio-button-response-flexiblelocations",
      trial_duration: null,
      response_ends_trial: true,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioExt}between-block.wav`,
      prompt: `<p style='font-size:30px;'>Great Job! You have ${blocks_left.toString()} groups left.`,
      choices: [
        '<img src= "stimuli/images/ok-button.jpg" title = "" width="200" height="100">',
      ],
      set_background: `end-block-${block_num.toString()}`,
      background_size: "100%",
    };

    timeline.push(progress_between_block);
  }

  function unlock_ship(code_type) {
    document.body.style.backgroundSize = "100%";

    const num_pad_start = {
      type: "audio-button-response-flexiblelocations",
      trial_duration: 6500,
      response_ends_trial: false,
      margin_top: ["25px"],
      margin_bottom: ["700px"],
      margin_left: ["20px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      set_background: `numpad-${code_type.toString()}-1`,
      background_size: "auto",
      stimulus: "stimuli/sounds/instruct-2-unlock.wav",
      choices: [`${imageStart}numpad-keys${numStop}`],
    };

    timeline.push(num_pad_start);

    for (let i = 1; i <= 6; i += 1) {
      const num_pad = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["25px"],
        margin_bottom: ["700px"],
        margin_left: ["20px"],
        margin_right: ["0px"],
        display_attribute: ["inline-block"],
        set_background: `numpad-${code_type.toString()}-${i.toString()}`,
        background_size: "auto",
        stimulus: `stimuli/sounds/key-${i.toString()}.wav`,
        choices: [`${imageStart}numpad-keys${numStop}`],
      };

      timeline.push(num_pad);
    }

    const num_pad_end = {
      type: "audio-button-response-flexiblelocations",
      trial_duration: 500,
      response_ends_trial: false,
      margin_top: ["25px"],
      margin_bottom: ["700px"],
      margin_left: ["20px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      set_background: `numpad-${code_type.toString()}-6`,
      background_size: "auto",
      stimulus: "stimuli/sounds/key-7.wav",
      choices: [`${imageStart}numpad-keys${numStop}`],
    };

    timeline.push(num_pad_end);
  }

  function start_ship() {
    const lever = {
      type: "audio-slider-response",
      top_prompt: "<br><br> </br>",
      stimulus: "stimuli/sounds/instruct-4-turnon.wav",
      labels: ["1", "2", "3", "4", "5"],
      slider_start: 1,
      min: 1,
      max: 5,
      step: 1,
      button_label: "OK",
      slider_width: 400,
      set_background: "control-panel-1",
      prompt: " ",
    };

    timeline.push(lever);

    for (let i = 2; i <= 5; i += 1) {
      const lever = {
        type: "audio-slider-response",
        top_prompt: "<br><br> </br>",
        stimulus: `stimuli/sounds/key-${i.toString()}.wav`,
        labels: ["1", "2", "3", "4", "5"],
        slider_start: 1,
        min: 1,
        max: 5,
        step: 1,
        button_label: "OK",
        slider_width: 400,
        set_background: `control-panel-${i.toString()}`,
        prompt: " ",
      };

      timeline.push(lever);
    }
  }

  function plot_route(plot_type) {
    document.body.style.backgroundSize = "auto";

    if (plot_type === "a") {
      const route_start = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["150px"],
        margin_bottom: ["700px"],
        margin_left: ["0px"],
        margin_right: ["0px"],
        display_attribute: ["inline-block"],
        set_background: "control-panel-route",
        background_size: "auto",
        stimulus: "stimuli/sounds/instruct-5-route.wav",
        choices: [`${imageStart}space-1${spaceStop}`],
      };

      timeline.push(route_start);

      for (let i = 2; i <= 3; i += 1) {
        const route = {
          type: "audio-button-response-flexiblelocations",
          trial_duration: null,
          response_ends_trial: true,
          margin_top: ["150px"],
          margin_bottom: ["700px"],
          margin_left: ["0px"],
          margin_right: ["0px"],
          display_attribute: ["inline-block"],
          set_background: "control-panel-route",
          background_size: "auto",
          stimulus: "stimuli/sounds/key-2.wav",
          choices: [`${imageStart}space-${i.toString()}${spaceStop}`],
        };

        timeline.push(route);
      }

      const route_stop = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: 500,
        response_ends_trial: true,
        margin_top: ["150px"],
        margin_bottom: ["700px"],
        margin_left: ["0px"],
        margin_right: ["0px"],
        display_attribute: ["inline-block"],
        set_background: "control-panel-route",
        background_size: "auto",
        stimulus: "stimuli/sounds/key-2.wav",
        choices: [`${imageStart}space-4${spaceStop}`],
      };

      timeline.push(route_stop);
    }

    if (plot_type === "b") {
      const route_start = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["150px"],
        margin_bottom: ["700px"],
        margin_left: ["0px"],
        margin_right: ["0px"],
        display_attribute: ["inline-block"],
        set_background: "control-panel-route",
        background_size: "auto",
        stimulus: "stimuli/sounds/key-1.wav",
        choices: [`${imageStart}space-5${spaceStop}`],
      };

      timeline.push(route_start);

      for (let i = 6; i <= 7; i += 1) {
        const route = {
          type: "audio-button-response-flexiblelocations",
          trial_duration: null,
          response_ends_trial: true,
          margin_top: ["150px"],
          margin_bottom: ["700px"],
          margin_left: ["0px"],
          margin_right: ["0px"],
          display_attribute: ["inline-block"],
          set_background: "control-panel-route",
          background_size: "auto",
          stimulus: "stimuli/sounds/key-2.wav",
          choices: [`${imageStart}space-${i.toString()}${spaceStop}`],
        };

        timeline.push(route);
      }

      const route_stop = {
        type: "audio-button-response-flexiblelocations",
        trial_duration: 500,
        response_ends_trial: false,
        margin_top: ["150px"],
        margin_bottom: ["700px"],
        margin_left: ["0px"],
        margin_right: ["0px"],
        display_attribute: ["inline-block"],
        set_background: "control-panel-route",
        background_size: "auto",
        stimulus: "stimuli/sounds/key-2.wav",
        choices: [`${imageStart}space-8${spaceStop}`],
      };

      timeline.push(route_stop);
    }
  }

  for (let block_num = 0; block_num <= 5; block_num += 1) {
    presentBlock(block_num);
    if (block_num === 0) unlock_ship("a");
    if (block_num === 1) unlock_ship("b");
    if (block_num === 2) start_ship();
    if (block_num === 3) plot_route("a");
    if (block_num === 4) plot_route("b");

    if (block_num < 5) show_progress(block_num + 1);
  }

  const fullscreen_exit = {
    type: "fullscreen",
    fullscreen_mode: false,
  };
  timeline.push(fullscreen_exit);
}

function startExperiment(teaching, test_Sound, test_Ref, test_Link, tabletop) {
  createTrials(teaching, test_Sound, test_Ref, test_Link);
  jsPsych.init({
    timeline,
    preload_images: images,
    default_iti: 0,
    on_finish() {
      uploadToRedcap("9AD33F7962227A4DA4920A77E6A80685");
      jsPsych.data.displayData();
    },
  });
}

function loadRefTrials(teaching, test_Sound, test_Link) {
  Papa.parse(refURL, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete(results) {
      const test_Ref = results.data;
      startExperiment(teaching, test_Sound, test_Ref, test_Link);
    },
  });
}

function loadTeaching(test_Sound, test_Link) {
  Papa.parse(teachingURL, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete(results) {
      const teaching = results.data;
      loadRefTrials(teaching, test_Sound, test_Link);
    },
  });
}

function loadLinkTrials(test_Sound) {
  Papa.parse(linkURL, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete(results) {
      const test_Link = results.data;
      loadTeaching(test_Sound, test_Link);
    },
  });
}

Papa.parse(soundURL, {
  download: true,
  header: true,
  dynamicTyping: true,
  complete(results) {
    const test_Sound = results.data;
    loadLinkTrials(test_Sound);
  },
});

document.body.style.backgroundColor = "black";
document.body.style.backgroundSize = "100%";
document.body.style.backgroundPosition = "top";
document.body.style.backgroundRepeat = "no-repeat";
