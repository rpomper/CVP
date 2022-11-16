
function audioBufferSource(jsPsych, url) {
  const audioContext = jsPsych.pluginAPI.audioContext();
  return jsPsych.pluginAPI.getAudioBuffer(url).then((buffer) => {
    const bufferSource = audioContext.createBufferSource();
    bufferSource.buffer = buffer;
    bufferSource.connect(audioContext.destination);
    return bufferSource;
  });
}

function moveToColumn(image, column) {
  switch (column) {
    case 1:
      image.style.right = "";
      image.style.left = "25%";
      image.style.transform = "translate(-50%, -50%)";
      break;
    case 2:
      image.style.left = "";
      image.style.right = "25%";
      image.style.transform = "translate(50%, -50%)";
      break;
    default:
      break;
  }
}

class OstensiveNamingJsPsychPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }
  trial(display_element, trial) {
    const image = new Image();
    image.style.position = "fixed";
    image.style.top = "50%";
    image.style.maxWidth = "50%";
    image.style.maxHeight = "100%";
    moveToColumn(image, trial.startingColumn)
    image.style.visibility = "hidden";
    image.src = trial.imageUrl;

    display_element.append(image);
    audioBufferSource(this.jsPsych, trial.audioUrl).then((audioSource) => {
      audioSource.start();
      image.style.visibility = "visible";
      this.jsPsych.pluginAPI.setTimeout(() => {
        moveToColumn(image, (trial.startingColumn % 2) + 1);
        this.jsPsych.pluginAPI.setTimeout(() => {
          moveToColumn(image, trial.startingColumn);
          this.jsPsych.pluginAPI.setTimeout(() => {
            display_element.removeChild(image);
            this.jsPsych.finishTrial();
          }, 2000);
        }, 2000);
      }, 2000);
    });
  }
}

OstensiveNamingJsPsychPlugin.info = {
  name: "PLUGIN-NAME",
  parameters: {
    imageUrl: {
      type: jsPsychModule.ParameterType.IMAGE,
    },
    audioUrl: {
      type: jsPsychModule.ParameterType.AUDIO,
    },
    startingColumn: {
      type: jsPsychModule.ParameterType.INT
    }
  },
};

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

const imageDirectory = "stimuli/images/";
const images = [
  `${imageDirectory}B1.jpg`,
  `${imageDirectory}A1.jpg`,
  `${imageDirectory}A2.jpg`,
  `${imageDirectory}A3.jpg`,
  `${imageDirectory}A4.jpg`,
  `${imageDirectory}A21.jpg`,
  `${imageDirectory}A22.jpg`,
  `${imageDirectory}A23.jpg`,
  `${imageDirectory}A24.jpg`,
  `${imageDirectory}A25.jpg`,
  `${imageDirectory}A26.jpg`,
  `${imageDirectory}A27.jpg`,
  `${imageDirectory}A28.jpg`,
  `${imageDirectory}A30.jpg`,
  `${imageDirectory}A31.jpg`,
  `${imageDirectory}A32.jpg`,
  `${imageDirectory}A33.jpg`,
  `${imageDirectory}A34.jpg`,
  `${imageDirectory}A35.jpg`,
  `${imageDirectory}B1.jpg`,
  `${imageDirectory}B2.jpg`,
  `${imageDirectory}B3.jpg`,
  `${imageDirectory}B4.jpg`,
  `${imageDirectory}B21.jpg`,
  `${imageDirectory}B22.jpg`,
  `${imageDirectory}B23.jpg`,
  `${imageDirectory}B24.jpg`,
  `${imageDirectory}B25.jpg`,
  `${imageDirectory}B26.jpg`,
  `${imageDirectory}B28.jpg`,
  `${imageDirectory}B29.jpg`,
  `${imageDirectory}B30.jpg`,
  `${imageDirectory}B31.jpg`,
  `${imageDirectory}B32.jpg`,
  `${imageDirectory}B34.jpg`,
  `${imageDirectory}B35.jpg`,
  `${imageDirectory}C1.jpg`,
  `${imageDirectory}C2.jpg`,
  `${imageDirectory}C3.jpg`,
  `${imageDirectory}C21.jpg`,
  `${imageDirectory}C22.jpg`,
  `${imageDirectory}C23.jpg`,
  `${imageDirectory}C24.jpg`,
  `${imageDirectory}C25.jpg`,
  `${imageDirectory}C26.jpg`,
  `${imageDirectory}C27.jpg`,
  `${imageDirectory}C28.jpg`,
  `${imageDirectory}C29.jpg`,
  `${imageDirectory}C30.jpg`,
  `${imageDirectory}C31.jpg`,
  `${imageDirectory}C32.jpg`,
  `${imageDirectory}C33.jpg`,
  `${imageDirectory}C34.jpg`,
  `${imageDirectory}C35.jpg`,
  `${imageDirectory}C36.jpg`,
  `${imageDirectory}D1.jpg`,
  `${imageDirectory}D2.jpg`,
  `${imageDirectory}D3.jpg`,
  `${imageDirectory}D4.jpg`,
  `${imageDirectory}E1.jpg`,
  `${imageDirectory}E2.jpg`,
  `${imageDirectory}E3.jpg`,
  `${imageDirectory}E4.jpg`,
  `${imageDirectory}F1.jpg`,
  `${imageDirectory}F2.jpg`,
  `${imageDirectory}F3.jpg`,
  `${imageDirectory}F4.jpg`,
  `${imageDirectory}G1.jpg`,
  `${imageDirectory}G2.jpg`,
  `${imageDirectory}G3.jpg`,
  `${imageDirectory}G4.jpg`,
  `${imageDirectory}H1.jpg`,
  `${imageDirectory}H2.jpg`,
  `${imageDirectory}H3.jpg`,
  `${imageDirectory}H4.jpg`,
  `${imageDirectory}I1.jpg`,
  `${imageDirectory}I2.jpg`,
  `${imageDirectory}I3.jpg`,
  `${imageDirectory}I4.jpg`,
  `${imageDirectory}J1.jpg`,
  `${imageDirectory}J2.jpg`,
  `${imageDirectory}J3.jpg`,
  `${imageDirectory}J4.jpg`,
  `${imageDirectory}K1.jpg`,
  `${imageDirectory}K2.jpg`,
  `${imageDirectory}K3.jpg`,
  `${imageDirectory}K4.jpg`,
  `${imageDirectory}L1.jpg`,
  `${imageDirectory}L2.jpg`,
  `${imageDirectory}L3.jpg`,
  `${imageDirectory}L4.jpg`,
  `${imageDirectory}mercury.jpg`,
  `${imageDirectory}venus.jpg`,
  `${imageDirectory}earth.jpg`,
  `${imageDirectory}mars.jpg`,
  `${imageDirectory}jupiter.jpg`,
  `${imageDirectory}saturn.jpg`,
  `${imageDirectory}neptune.jpg`,
  `${imageDirectory}mae.jpg`,
  `${imageDirectory}black.jpg`,
  `${imageDirectory}black-background.jpg`,
  `${imageDirectory}launch-pad-background.jpg`,
  `${imageDirectory}launch-pad-ship-background.jpg`,
  `${imageDirectory}spaceship-1.jpg`,
  `${imageDirectory}spaceship-2.jpg`,
  `${imageDirectory}spaceship-3.jpg`,
  `${imageDirectory}luggage-1.jpg`,
  `${imageDirectory}luggage-2.jpg`,
  `${imageDirectory}luggage-3.jpg`,
  `${imageDirectory}newspaper.jpg`,
  `${imageDirectory}plastic-bag.jpg`,
  `${imageDirectory}numpad-a-1.jpg`,
  `${imageDirectory}numpad-a-2.jpg`,
  `${imageDirectory}numpad-a-3.jpg`,
  `${imageDirectory}numpad-a-4.jpg`,
  `${imageDirectory}numpad-a-5.jpg`,
  `${imageDirectory}numpad-a-6.jpg`,
  `${imageDirectory}numpad-a-7.jpg`,
  `${imageDirectory}numpad-b-1.jpg`,
  `${imageDirectory}numpad-b-2.jpg`,
  `${imageDirectory}numpad-b-3.jpg`,
  `${imageDirectory}numpad-b-4.jpg`,
  `${imageDirectory}numpad-b-5.jpg`,
  `${imageDirectory}numpad-b-6.jpg`,
  `${imageDirectory}numpad-b-7.jpg`,
  `${imageDirectory}numpad-keys.jpg`,
  `${imageDirectory}dot.jpg`,
  `${imageDirectory}space-1.jpg`,
  `${imageDirectory}space-2.jpg`,
  `${imageDirectory}space-3.jpg`,
  `${imageDirectory}space-4.jpg`,
  `${imageDirectory}space-5.jpg`,
  `${imageDirectory}space-6.jpg`,
  `${imageDirectory}space-7.jpg`,
  `${imageDirectory}space-8.jpg`,
  `${imageDirectory}space-1.jpg`,
  `${imageDirectory}control-panel-1.jpg`,
  `${imageDirectory}control-panel-2.jpg`,
  `${imageDirectory}control-panel-3.jpg`,
  `${imageDirectory}control-panel-4.jpg`,
  `${imageDirectory}control-panel-5.jpg`,
];

const jsPsych = initJsPsych({
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
    type: jsPsychPreload,
    auto_preload: true,
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus:
      "<p style='font-size:30px;'>Click the star to begin!</p>",
    button_html: '<img src="stimuli/images/star.bmp"></img>',
    choices: [""],
  });

  timeline.push({
    type: jsPsychAudioKeyboardResponse,
    trial_ends_after_audio: true,
    choices: "NO_KEYS",
    stimulus: `${audioDirectory}ON_intro.wav`
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: "",
    button_html: '<img src="stimuli/images/star.bmp"></img>',
    choices: [""],
  });

  timeline.push({
    type: OstensiveNamingJsPsychPlugin,
    imageUrl: `${imageDirectory}bee.bmp`,
    audioUrl: `${audioDirectory}bee_h_sp1.wav`,
    startingColumn: 1
  });

  timeline.push({
    type: jsPsychAudioKeyboardResponse,
    trial_ends_after_audio: true,
    choices: "NO_KEYS",
    stimulus: `${audioDirectory}click_the_star_to_begin.wav`
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus: "",
    button_html: '<img src="stimuli/images/star.bmp"></img>',
    choices: [""],
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

document.body.style.backgroundSize = "100%";
document.body.style.backgroundPosition = "top";
document.body.style.backgroundRepeat = "no-repeat";
