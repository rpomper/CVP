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

const jsPsych = initJsPsych({
  preload_images: images,
  default_iti: 0,
  on_finish() {
    uploadToRedcap("9AD33F7962227A4DA4920A77E6A80685");
    jsPsych.data.displayData();
  },
});

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

function createTrials(teaching, test_Sound, test_Ref, test_Link, tabletop) {
  const audioDirectory = "stimuli/sounds/";
  const imageTagPrefix = '<img src= "stimuli/images/';
  const imageTagPostfix = '.jpg"  title = "" width="300" height="300">';
  const numStop = '.jpg"  title = "" width="250" height="300">';
  const dotStop = '.jpg"  title = "" width="100" height="100">';
  const spaceStop = '.jpg"  title = "" width="800" height="218">';

  timeline.push({
    type: jsPsychFullscreen,
    message: `<p style='font-size:30px;'> Version: 1.6.3 <br><br><br>Subject: ${subject_id.toString()}<br><br>Order: ${trial_order.toString()}</p><br>`,
    button_label: "Next",
    delay_after: 250,
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus:
      "<p style='font-size:30px;'> When you are ready, click the NEXT button to hear the instructions.</br> </p>",
    choices: ["Next"],
    trial_duration: null,
    set_background: "black-background",
  });

  function presentBlock(block_num) {
    const teachingStart = 0 + 5 * block_num;
    const teachingStop = 5 + 5 * block_num;
    const testStart = 0 + 5 * block_num;
    const testStop = 5 + 5 * block_num;

    if (block_num === 0) {
    } else {
      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: 10000,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioDirectory}instruct-more.wav`,
        choices: [
          `${imageTagPrefix}mae${imageTagPostfix}`,
          `${imageTagPrefix}earth${imageTagPostfix}`,
        ],
      });
    }

    for (let i = teachingStart; i < teachingStop; i += 1) {
      timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p style='font-size:90px;'>${teaching[i].tr_num}</p>`,
        choices: "NO_KEYS",
        set_background: "black-background",
        trial_duration: 500,
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: teaching[i].audio1_dur,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        set_background: teaching[i].background,
        stimulus: `${audioDirectory}teaching/${teaching[i].audio1}.wav`,
        choices: [
          imageTagPrefix + teaching[i].left_image1 + imageTagPostfix,
          imageTagPrefix + teaching[i].right_image1 + imageTagPostfix,
        ],
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: teaching[i].audio2_dur,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "75px"],
        margin_right: ["75px", "0px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioDirectory}teaching/${teaching[i].audio2}.wav`,
        choices: [
          imageTagPrefix + teaching[i].left_image2 + imageTagPostfix,
          imageTagPrefix + teaching[i].right_image2 + imageTagPostfix,
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
      });
    }

    timeline.push({
      type: jsPsychAudioButtonResponse,
      trial_duration: 9000,
      response_ends_trial: false,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioDirectory}instruct-sound.wav`,
      choices: [`${imageTagPrefix}mae${imageTagPostfix}`],
    });

    for (let i = testStart; i < testStop; i += 1) {
      timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p style='font-size:90px;'>${test_Sound[i].tr_num}</p>`,
        choices: "NO_KEYS",
        set_background: "black-background",
        trial_duration: 500,
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: 1000,
        response_ends_trial: false,
        margin_top: ["0px"],
        margin_bottom: ["0px"],
        margin_left: ["0px"],
        margin_right: ["680px"],
        display_attribute: ["inline-block"],
        stimulus: `${audioDirectory}testing/${test_Sound[i].sound1}.wav`,
        choices: [`${imageTagPrefix}dot${dotStop}`],
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: 1000,
        response_ends_trial: false,
        margin_top: ["0px", "0px"],
        margin_bottom: ["0px", "0px"],
        margin_left: ["0px", "200px"],
        margin_right: ["0px", "340px"],
        display_attribute: ["inline-block", "inline-block"],
        stimulus: `${audioDirectory}testing/${test_Sound[i].sound2}.wav`,
        choices: [
          `${imageTagPrefix}dot${dotStop}`,
          `${imageTagPrefix}dot${dotStop}`,
        ],
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["0px", "0px", "0px"],
        margin_bottom: ["0px", "0px", "0px"],
        margin_left: ["0px", "200px", "200px"],
        margin_right: ["0px", "0px", "0px"],
        display_attribute: ["inline-block", "inline-block", "inline-block"],
        stimulus: `${audioDirectory}testing/${test_Sound[i].sound3}.wav`,
        choices: [
          `${imageTagPrefix}dot${dotStop}`,
          `${imageTagPrefix}dot${dotStop}`,
          `${imageTagPrefix}dot${dotStop}`,
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
      });
    }

    timeline.push({
      type: jsPsychAudioButtonResponse,
      trial_duration: 9000,
      response_ends_trial: false,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioDirectory}instruct-ref.wav`,
      choices: [`${imageTagPrefix}mae${imageTagPostfix}`],
    });

    for (let i = testStart; i < testStop; i += 1) {
      timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p style='font-size:90px;'>${test_Ref[i].tr_num}</p>`,
        choices: "NO_KEYS",
        set_background: "black-background",
        trial_duration: 500,
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["0px", "0px", "0px"],
        margin_bottom: ["0px", "0px", "0px"],
        margin_left: ["0px", "150px", "0px"],
        margin_right: ["0px", "0px", "0px"],
        display_attribute: ["inline-block", "inline-block", "block"],
        stimulus: "stimuli/sounds/silence.wav",
        choices: [
          imageTagPrefix + test_Ref[i].left_image + imageTagPostfix,
          imageTagPrefix + test_Ref[i].center_image + imageTagPostfix,
          imageTagPrefix + test_Ref[i].right_image + imageTagPostfix,
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
      });
    }

    timeline.push({
      type: jsPsychAudioButtonResponse,
      trial_duration: 8000,
      response_ends_trial: false,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioDirectory}instruct-link.wav`,
      choices: [`${imageTagPrefix}mae${imageTagPostfix}`],
    });

    for (let i = testStart; i < testStop; i += 1) {
      timeline.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<p style='font-size:90px;'>${test_Link[i].tr_num}</p>`,
        choices: "NO_KEYS",
        set_background: "black-background",
        trial_duration: 500,
      });

      timeline.push({
        type: jsPsychAudioButtonResponse,
        trial_duration: null,
        response_ends_trial: true,
        margin_top: ["0px", "0px", "0px"],
        margin_bottom: ["0px", "0px", "0px"],
        margin_left: ["0px", "150px", "0px"],
        margin_right: ["0px", "0px", "0px"],
        display_attribute: ["inline-block", "inline-block", "block"],

        stimulus: `${audioDirectory}testing/${test_Link[i].audio}.wav`,
        choices: [
          imageTagPrefix + test_Link[i].left_image + imageTagPostfix,
          imageTagPrefix + test_Link[i].center_image + imageTagPostfix,
          imageTagPrefix + test_Link[i].right_image + imageTagPostfix,
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
      });
    }
  }

  function show_progress(block_num) {
    const blocks_left = 6 - block_num;

    timeline.push({
      type: jsPsychAudioButtonResponse,
      trial_duration: null,
      response_ends_trial: true,
      margin_top: ["0px"],
      margin_bottom: ["0px"],
      margin_left: ["0px"],
      margin_right: ["0px"],
      display_attribute: ["inline-block"],
      stimulus: `${audioDirectory}between-block.wav`,
      prompt: `<p style='font-size:30px;'>Great Job! You have ${blocks_left.toString()} groups left.`,
      choices: [
        '<img src= "stimuli/images/ok-button.jpg" title = "" width="200" height="100">',
      ],
      set_background: `end-block-${block_num.toString()}`,
      background_size: "100%",
    });
  }

  function unlock_ship(code_type) {
    document.body.style.backgroundSize = "100%";

    timeline.push({
      type: jsPsychAudioButtonResponse,
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
      choices: [`${imageTagPrefix}numpad-keys${numStop}`],
    });

    for (let i = 1; i <= 6; i += 1) {
      timeline.push({
        type: jsPsychAudioButtonResponse,
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
        choices: [`${imageTagPrefix}numpad-keys${numStop}`],
      });
    }

    timeline.push({
      type: jsPsychAudioButtonResponse,
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
      choices: [`${imageTagPrefix}numpad-keys${numStop}`],
    });
  }

  function start_ship() {
  }

  function plot_route(plot_type) {
    document.body.style.backgroundSize = "auto";

    if (plot_type === "a") {
      timeline.push({
        type: jsPsychAudioButtonResponse,
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
        choices: [`${imageTagPrefix}space-1${spaceStop}`],
      });

      for (let i = 2; i <= 3; i += 1) {
        timeline.push({
          type: jsPsychAudioButtonResponse,
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
          choices: [`${imageTagPrefix}space-${i.toString()}${spaceStop}`],
        });
      }

      timeline.push({
        type: jsPsychAudioButtonResponse,
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
        choices: [`${imageTagPrefix}space-4${spaceStop}`],
      });
    }

    if (plot_type === "b") {
      timeline.push({
        type: jsPsychAudioButtonResponse,
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
        choices: [`${imageTagPrefix}space-5${spaceStop}`],
      });

      for (let i = 6; i <= 7; i += 1) {
        timeline.push({
          type: jsPsychAudioButtonResponse,
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
          choices: [`${imageTagPrefix}space-${i.toString()}${spaceStop}`],
        });
      }

      timeline.push({
        type: jsPsychAudioButtonResponse,
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
        choices: [`${imageTagPrefix}space-8${spaceStop}`],
      });
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

  timeline.push({
    type: "fullscreen",
    fullscreen_mode: false,
  });
}

function startExperiment(teaching, test_Sound, test_Ref, test_Link, tabletop) {
  createTrials(teaching, test_Sound, test_Ref, test_Link);
  jsPsych.run(timeline);
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
