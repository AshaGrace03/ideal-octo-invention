/**
 *
 * task.js
 * Asha Doughty-Garside, William Ngiam
 *
 * task script for attribute amnesia / associative learning hybrid
 * do people learn statistical regularities when the associations are irrelevant?
 *
 **/

/* initialize jsPsych */
var jsPsych = initJsPsych({
    show_proress_bar: true,
    on_finish: function () {
        jsPsych.data.displayData();
    }
});

// ADD DataPipe later.

// DEFINE EXPERIMENT VARIABLES
let canvas_width = 1200 // sets canvas width
let canvas_height = 500 // sets canvas height
const item_size = 100 // sets item size
const n_trials = 8 // Number of trials
const stim_duration = 500 // Stimulus duration

let item_locs = [
    [canvas_width / 3 + item_size * -3, canvas_height / 2 + item_size * 1],
    [canvas_width / 3 + item_size * 2, canvas_height / 2 + item_size * 1],
    [canvas_width / 3 + item_size * -3, canvas_height / 2 + item_size * -1],
    [canvas_width / 3 + item_size * 2, canvas_height / 2 + item_size * -1]
]

/* create timeline */
var timeline = [];

/* Preload images */
var preload = {
    type: jsPsychPreload,
    stimuli: [
        'stim/VCS_1_RED.jpg',
        'stim/VCS_1_BLUE.jpg',
        'stim/VCS_1_GREEN.jpg',
        'stim/VCS_73_BLUE.jpg',
        'VCSshapes/shape.jpg',
        'VCSshapes/Shape2.jpg',
        'VCSshapes/Shape3.jpg',
        'VCSshapes/Shape4.jpg'
    ],
    max_load_time: 30000
};
timeline.push(preload);

// BUILD EXPERIMENT
/* Force full screen */
var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
}
// timeline.push(enter_fullscreen);

/* define welcome message trial */
var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome);

// resize the screen
var resize = {
    type: jsPsychResize,
    item_width: 3 + 3 / 8,
    item_height: 2 + 1 / 8,
    prompt: `
    <p>This experiment is best completed using a computer mouse rather than a trackpad.</p>
    <p>Click and drag the lower right corner of the box until the box is the same size as a credit card held up to the screen.</p>`,
    pixels_per_unit: 150
};

//timeline.push(resize)

// Start instructions
// Will need to change for the task later.
var instructions = {
    type: jsPsychCanvasKeyboardResponse,
    stimulus: draw_instruction,
    canvas_size: [500, 1200], // height x width
    prompt: "Shapes will appear on the screen. If the shape is <strong>Blue</strong>, press the letter R on the keyboard. If the shape is <strong>Red</strong>, press the letter U as fast as you can, If the shape is <strong>Green</strong>, press the letter P as fast as you can and if the shape is <strong>Yellow</strong>, press the letter Q as fast as you can."

}

/* Insert images to instructions page */
function draw_instruction(c) {
    let ctx = c.getContext('2d');  // Get canvas context
    ctx.globalCompositeOperation = "screen"; // Set canvas blending

    var img1 = new Image();
    img1.src = "VCSshapes/Shape4.jpg";
    img1.onload = function () {
        ctx.drawImage(img1, canvas_width / 2 - item_size * 1.5, 0, item_size, item_size);
        ctx.fillStyle = "#18a000";
        ctx.fillRect(canvas_width / 2 - item_size * 1.5, 0, item_size, item_size)
    };

    var img2 = new Image();
    img2.src = "VCSshapes/Shape3.jpg";
    img2.onload = function () {
        ctx.drawImage(img2, canvas_width / 2 - item_size * .5, 0, item_size, item_size);
        ctx.fillStyle = "#fee700";
        ctx.fillRect(canvas_width / 2 - item_size * .5, 0, item_size, item_size)
    };

    var img3 = new Image();
    img3.src = "VCSshapes/Shape2.jpg";
    img3.onload = function () {
        ctx.drawImage(img3, canvas_width / 2 + item_size * .5, 0, item_size, item_size);
        ctx.fillStyle = "#d20000";
        ctx.fillRect(canvas_width / 2 + item_size * .5, 0, item_size, item_size);
    }

    var img4 = new Image();
    img4.src = "VCSshapes/shape.jpg"; // Load the image
    img4.onload = function () {
        ctx.drawImage(img4, canvas_width / 2 + item_size * 1.5, 0, item_size, item_size); // Draw image
        ctx.fillStyle = "#0062d2";
        ctx.fillRect(canvas_width / 2 + item_size * 1.5, 0, item_size, item_size); // Apply overlay
    }
}

timeline.push(instructions);

// START TRIAL LOOP
// Draw stimulus
var stim = {
    type: jsPsychCanvasKeyboardResponse,
    canvas_size: [600, 800],
    stimulus: draw_stimulus,
    choices: "NO_KEYS",
    trial_duration: stim_duration,
    data: {
        task: 'stimulus'
    }
};

function draw_stimulus(c) {
    let ctx = c.getContext('2d');

    test_location = jsPsych.randomization.sampleWithoutReplacement([0, 1, 2, 3], 1);
    for (var i = 0; i < 2; i++) {
        ctx.strokeRect(x = item_locs[2 * i][0], y = item_locs[2 * i][1], item_size, item_size);
        ctx.strokeRect(x = item_locs[2 * i + 1][0], y = item_locs[2 * i + 1][1], item_size, item_size);
    };

    shuffledLocations = jsPsych.randomization.sampleWithoutReplacement([0, 1, 2, 3], 4)

    var img1 = new Image();
    img1.src = "VCSshapes/Shape4.jpg";
    img1.onload = function () {
        ctx.drawImage(img1, item_locs[shuffledLocations[0]][0], item_locs[shuffledLocations[0]][1], item_size, item_size);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = "#18a000";
        ctx.fillRect(item_locs[shuffledLocations[0]][0], item_locs[shuffledLocations[0]][1], item_size, item_size);
    };

    var img2 = new Image();
    img2.src = "VCSshapes/Shape3.jpg";
    img2.onload = function () {
        ctx.drawImage(img2, item_locs[shuffledLocations[1]][0], item_locs[shuffledLocations[1]][1], item_size, item_size);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = "#fee700";
        ctx.fillRect(item_locs[shuffledLocations[1]][0], item_locs[shuffledLocations[1]][1], item_size, item_size);
    };

    var img3 = new Image();
    img3.src = "VCSshapes/Shape2.jpg";
    img3.onload = function () {
        ctx.drawImage(img3, item_locs[shuffledLocations[2]][0], item_locs[shuffledLocations[2]][1], item_size, item_size);
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = "#d20000";
        ctx.fillRect(item_locs[shuffledLocations[2]][0], item_locs[shuffledLocations[2]][1], item_size, item_size);
    };

    var img4 = new Image();
    img4.src = "VCSshapes/shape.jpg"; // Load the image
    img4.onload = function () {
        ctx.drawImage(img4, item_locs[shuffledLocations[3]][0], item_locs[shuffledLocations[3]][1], item_size, item_size); // Draw image
        ctx.globalCompositeOperation = "screen"; // Blending mode
        ctx.fillStyle = "#0062d2";
        ctx.fillRect(item_locs[shuffledLocations[3]][0], item_locs[shuffledLocations[3]][1], item_size, item_size); // Apply overlay
    }
}

// Draw blank period
var blank = {
    type: jsPsychHtmlKeyboardResponse,
    canvas_size: [600, 800],
    stimulus: '',
    choices: "NO_KEYS",
    trial_duration: 500,
    data: {
        task: 'blank'
    }
};

// Draw response screen
var response = {
    type: jsPsychCanvasKeyboardResponse,
    canvas_size: [600, 800],
    stimulus: drawResponse,
    choices: ['a', 'd', 'j', 'l'],
    data: { shape: 'rectangle' },
    prompt: 'Which color was in the bolded location?',
    on_finish: function (data) {
        response_array = ['a','d','j','l'];
        data.correct_response = response_array[test_location];
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
};

function drawResponse(c) {
    let ctx = c.getContext('2d');

    ctx.fillStyle = "#d20000";
    ctx.fillRect(120, 500, 50, 50);
    ctx.font = "50px Arial";
    ctx.fillText("A", 130, 590);

    ctx.fillStyle = "#0062d2";
    ctx.fillRect(270, 500, 50, 50);
    ctx.font = "50px Arial";
    ctx.fillText("D", 280, 590);

    ctx.fillStyle = "#18a000";
    ctx.fillRect(470, 500, 50, 50);
    ctx.font = "50px Arial";
    ctx.fillText("J", 480, 590);

    ctx.fillStyle = "#fee700";
    ctx.fillRect(620, 500, 50, 50);
    ctx.font = "50px Arial";
    ctx.fillText("L", 630, 590);

    var test_location = jsPsych.randomization.sampleWithoutReplacement([0, 1, 2, 3], 1);
    for (var i = 0; i < 2; i++) {
        ctx.strokeRect(x = item_locs[2 * i][0], y = item_locs[2 * i][1], item_size, item_size);
        ctx.strokeRect(x = item_locs[2 * i + 1][0], y = item_locs[2 * i + 1][1], item_size, item_size);
    }

    ctx.lineWidth = 5; // thick test location
    ctx.strokeRect(x = item_locs[test_location][0], y = item_locs[test_location][1], item_size, item_size);

}

// Inter-trial interval
var ITI = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: "NO_KEYS",
    trial_duration: 500,
    data: {
        task: 'fixation'
    }
};

// Set-up timeline loop
var test_procedure = {
    timeline: [stim, blank, response, ITI],
    repetitions: n_trials,
    randomize_order: true
};
timeline.push(test_procedure);

// SURPRISE TRIAL
// Create a trial which tests the 'irrelevant' feature until now
// Should shuffle shapes so that they do not match with the paired colour.
var surprise = {
    type: jsPsychCanvasKeyboardResponse,
    canvas_size: [600, 800],
    stimulus: draw_surprise,
    choices: ['q', 'r', 'u', 'p'],
    prompt: 'Which <b>shape</b> was in the bolded location?',
    on_finish: function (data) {
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
    }
};

function draw_surprise(c) {
    let ctx = c.getContext('2d');

    var img3 = new Image();
    img3.src = "VCSshapes/Shape2.jpg";
    img3.onload = function () {
        ctx.drawImage(img3, 120, 480, item_size/1.5, item_size/1.5);
        ctx.font = "50px Arial";
        ctx.fillText("Q", 130, 590);
    };

    var img5 = new Image();
    img5.src = "VCSshapes/shape.jpg";
    img5.onload = function () {
        ctx.drawImage(img5, 270, 480, item_size/1.5, item_size/1.5);
        ctx.font = "50px Arial";
        ctx.fillText("R", 280, 590);
    };

    var img1 = new Image();
    img1.src = "VCSshapes/Shape4.jpg";
    img1.onload = function () {
        ctx.drawImage(img1, 470, 480, item_size/1.5, item_size/1.5);
        ctx.font = "50px Arial";
        ctx.fillText("U", 480, 590);
    };

    var img2 = new Image();
    img2.src = "VCSshapes/Shape3.jpg";
    img2.onload = function () {
        ctx.drawImage(img2, 620, 480, item_size/1.5, item_size/1.5);
        ctx.font = "50px Arial";
        ctx.fillText("P", 630, 590);
    };

    test_location = jsPsych.randomization.sampleWithoutReplacement([0, 1, 2, 3], 1);
    for (var i = 0; i < 2; i++) {
        ctx.strokeRect(x = item_locs[2 * i][0], y = item_locs[2 * i][1], item_size, item_size);
        ctx.strokeRect(x = item_locs[2 * i + 1][0], y = item_locs[2 * i + 1][1], item_size, item_size);
    }

    ctx.lineWidth = 5; // thick test location
    ctx.strokeRect(x = item_locs[test_location][0], y = item_locs[test_location][1], item_size, item_size);

}

// FOLLOW-UP TRIALS
var follow_up = {
    timeline: [stim, blank, surprise, response, ITI],
    repetitions: 5
};
timeline.push(follow_up);

/* start the experiment */
jsPsych.run(timeline);

