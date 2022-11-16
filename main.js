
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

function startExperiment(page, conditionSelect, jsPsych) {
  document.body.removeChild(page);
  const condition = conditionSelect.options.item(
    conditionSelect.selectedIndex,
  ).textContent;

  const timeline = [];
  const imageDirectory = "stimuli/images/";
  const audioDirectory = "stimuli/sounds/";
  timeline.push({
    type: jsPsychPreload,
    auto_preload: true,
  });

  timeline.push({
    type: jsPsychHtmlButtonResponse,
    stimulus:
      "<p style='font-size:50px;'>Click the star to begin!</p>",
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

  timeline.push({
    type: OstensiveNamingJsPsychPlugin,
    imageUrl: `${imageDirectory}joast.bmp`,
    audioUrl: `${audioDirectory}joast_t_sp1.wav`,
    startingColumn: 2
  });

  jsPsych.run(timeline);
}

function createChildElement(parent, tag) {
  const child = document.createElement(tag);
  parent.append(child);
  return child;
}

function main() {
  const jsPsych = initJsPsych({
    default_iti: 0,
    on_finish() {
      //uploadToRedcap("9AD33F7962227A4DA4920A77E6A80685");
      jsPsych.data.displayData();
    },
  });
  const page = createChildElement(document.body, "div");
  const conditionLabel = createChildElement(
    createChildElement(page, "div"),
    "label",
  );
  conditionLabel.textContent = "Condition";
  const conditionSelect = createChildElement(conditionLabel, "select");
  createChildElement(conditionSelect, "option").textContent =
    "ON";
  createChildElement(conditionSelect, "option").textContent =
    "Form";
  const confirmButton = createChildElement(page, "button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", () => {
    startExperiment(page, conditionSelect, jsPsych);
  });
}

main();