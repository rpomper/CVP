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

function pixelsString(a) {
  return `${a}px`;
}

function percentString(a) {
  return `${a}%`;
}

function circleElementWithColorAndDiameter(color, diameterPixels) {
  const circle = document.createElement("div");
  circle.style.height = pixelsString(diameterPixels);
  circle.style.width = pixelsString(diameterPixels);
  circle.style.borderRadius = pixelsString(diameterPixels / 2);
  circle.style.backgroundColor = color;
  return circle;
}

class FormExampleJsPsychPlugin {
  constructor(jsPsych) {
    this.jsPsych = jsPsych;
  }
  trial(display_element, trial) {
    const leftCircle = circleElementWithColorAndDiameter("black", 200);
    leftCircle.style.position = "fixed";
    leftCircle.style.left = percentString(25);
    leftCircle.style.top = percentString(50);
    leftCircle.style.transform = "translate(-50%, -50%)";
    leftCircle.style.visibility = "hidden";
    display_element.append(leftCircle);
    const middleCircle = circleElementWithColorAndDiameter("black", 200);
    middleCircle.style.position = "fixed";
    middleCircle.style.left = percentString(50);
    middleCircle.style.top = percentString(50);
    middleCircle.style.transform = "translate(-50%, -50%)";
    middleCircle.style.visibility = "hidden";
    display_element.append(middleCircle);
    const rightCircle = circleElementWithColorAndDiameter("black", 200);
    rightCircle.style.position = "fixed";
    rightCircle.style.right = percentString(25);
    rightCircle.style.top = percentString(50);
    rightCircle.style.transform = "translate(50%, -50%)";
    rightCircle.style.visibility = "hidden";
    display_element.append(rightCircle);
    audioBufferSource(this.jsPsych, trial.audioUrl).then((audioSource) => {
      audioSource.start();
      this.jsPsych.pluginAPI.setTimeout(() => {
        leftCircle.style.visibility = "visible";
      }, trial.leftCircleAppearsAfterMilliseconds);
      this.jsPsych.pluginAPI.setTimeout(() => {
        middleCircle.style.visibility = "visible";
      }, trial.middleCircleAppearsAfterMilliseconds);
      this.jsPsych.pluginAPI.setTimeout(() => {
        rightCircle.style.visibility = "visible";
      }, trial.rightCircleAppearsAfterMilliseconds);
      audioSource.onended = () => {
        leftCircle.addEventListener("click", () => {
          this.jsPsych.finishTrial();
        });
        middleCircle.addEventListener("click", () => {
          this.jsPsych.finishTrial();
        });
        rightCircle.addEventListener("click", () => {
          this.jsPsych.finishTrial();
        });
      };
    });
  }
}

FormExampleJsPsychPlugin.info = {
  name: "Form Example",
  parameters: {
    audioUrl: {
      type: jsPsychModule.ParameterType.AUDIO,
    },
    leftCircleAppearsAfterMilliseconds: {
      type: jsPsychModule.ParameterType.INT,
    },
    middleCircleAppearsAfterMilliseconds: {
      type: jsPsychModule.ParameterType.INT,
    },
    rightCircleAppearsAfterMilliseconds: {
      type: jsPsychModule.ParameterType.INT,
    },
  },
};

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
    moveToColumn(image, trial.startingColumn);
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
  name: "Ostensive Naming",
  parameters: {
    imageUrl: {
      type: jsPsychModule.ParameterType.IMAGE,
    },
    audioUrl: {
      type: jsPsychModule.ParameterType.AUDIO,
    },
    startingColumn: {
      type: jsPsychModule.ParameterType.INT,
    },
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

const ONText = "ON";
const FormText = "Form";

function startExperiment(page, conditionSelect, jsPsych) {
  document.body.removeChild(page);
  const condition = conditionSelect.options.item(
    conditionSelect.selectedIndex
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
    stimulus: "<p style='font-size:50px;'>Click the star to begin!</p>",
    button_html: '<img src="stimuli/images/star.bmp"></img>',
    choices: [""],
  });
  switch (condition) {
    case ONText:
      timeline.push({
        type: jsPsychAudioKeyboardResponse,
        trial_ends_after_audio: true,
        choices: "NO_KEYS",
        stimulus: `${audioDirectory}ON_intro.wav`,
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
        startingColumn: 1,
      });

      timeline.push({
        type: jsPsychAudioKeyboardResponse,
        trial_ends_after_audio: true,
        choices: "NO_KEYS",
        stimulus: `${audioDirectory}click_the_star_to_begin.wav`,
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
        startingColumn: 2,
      });
      break;
    case FormText:
      timeline.push({
        type: jsPsychAudioKeyboardResponse,
        trial_ends_after_audio: true,
        choices: "NO_KEYS",
        stimulus: `${audioDirectory}3AFCform_intro_day1.wav`,
      });

      timeline.push({
        type: FormExampleJsPsychPlugin,
        audioUrl: `${audioDirectory}3AFCform_example1.wav`,
        leftCircleAppearsAfterMilliseconds: 1000,
        middleCircleAppearsAfterMilliseconds: 2000,
        rightCircleAppearsAfterMilliseconds: 3000,
      });
      break;
    default:
      break;
  }
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
    "label"
  );
  conditionLabel.textContent = "Condition";
  const conditionSelect = createChildElement(conditionLabel, "select");
  createChildElement(conditionSelect, "option").textContent = ONText;
  createChildElement(conditionSelect, "option").textContent = FormText;
  const confirmButton = createChildElement(page, "button");
  confirmButton.textContent = "Confirm";
  confirmButton.addEventListener("click", () => {
    startExperiment(page, conditionSelect, jsPsych);
  });
}

main();
