/* =========================================================
   SUBHASH CHANDRA
   PORTFOLIO INTERACTIONS
========================================================= */


/* =========================================================
   THEME
========================================================= */

const themeHint =
    document.getElementById("themeHint");


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );
}


/*
    Double-click anywhere on the page
    to switch theme.
*/

document.addEventListener(
    "dblclick",
    function (event) {


        /*
            Don't trigger theme switch
            when double-clicking links.
        */

        if (event.target.closest("a")) {

            return;
        }


        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "portfolio-theme",
            isDark
                ? "dark"
                : "light"
        );


        if (themeHint) {

            themeHint.textContent =
                isDark
                    ? "DARK MODE"
                    : "LIGHT MODE";


            themeHint.classList.add(
                "show"
            );


            setTimeout(
                function () {

                    themeHint.classList.remove(
                        "show"
                    );

                },
                1200
            );

        }

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   PROJECT CURSOR PREVIEW
========================================================= */

const projectPreview =
    document.getElementById(
        "cursorProjectPreview"
    );


const previewTitle =
    document.getElementById(
        "cursorPreviewTitle"
    );


const previewTech =
    document.getElementById(
        "cursorPreviewTech"
    );


const projects =
    document.querySelectorAll(
        ".project-link"
    );


const projectData = {


    snake: {

        number: "01",

        title:
            "Autonomous Snake AI",

        tech:
            "DQN · Q-Learning · Reinforcement Learning"

    },


    gym: {

        number: "02",

        title:
            "Gym Injury Risk Predictor",

        tech:
            "Machine Learning · FastAPI · MLOps"

    },


    youtube: {

        number: "03",

        title:
            "YouTube Comment Analyzer",

        tech:
            "NLP · FastAPI"

    }

};


let mouseX = 0;

let mouseY = 0;

let previewX = 0;

let previewY = 0;


document.addEventListener(
    "mousemove",
    function (event) {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function movePreview() {


    previewX +=
        (mouseX - previewX)
        * 0.12;


    previewY +=
        (mouseY - previewY)
        * 0.12;


    if (projectPreview) {

        projectPreview.style.left =
            `${previewX + 22}px`;


        projectPreview.style.top =
            `${previewY + 22}px`;

    }


    requestAnimationFrame(
        movePreview
    );

}


movePreview();


projects.forEach(
    function (project) {


        project.addEventListener(
            "mouseenter",
            function () {


                const projectName =
                    project.dataset.project;


                const data =
                    projectData[
                        projectName
                    ];


                if (!data) {

                    return;
                }


                if (previewTitle) {

                    previewTitle.textContent =
                        data.title;

                }


                if (previewTech) {

                    previewTech.textContent =
                        data.tech;

                }


                const number =
                    document.querySelector(
                        ".cursor-preview-number"
                    );


                if (number) {

                    number.textContent =
                        data.number;

                }


                if (projectPreview) {

                    projectPreview.classList.add(
                        "active"
                    );

                }

            }
        );


        project.addEventListener(
            "mouseleave",
            function () {

                if (projectPreview) {

                    projectPreview.classList.remove(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navLinks.forEach(
    function (link) {


        link.addEventListener(
            "click",
            function (event) {


                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }

            }
        );

    }
);


/* =========================================================
   INTERACTIVE TERMINAL
========================================================= */

const terminalInput =
    document.getElementById(
        "terminalInput"
    );


const terminalHistory =
    document.getElementById(
        "terminalHistory"
    );


const terminalScreen =
    document.getElementById(
        "terminalScreen"
    );


/* =========================================================
   JOKES
========================================================= */

const jokes = [

    "Why did the ML model go to the gym?\nTo improve its weights. 💀",

    "Why was the neural network bad at relationships?\nIt had too many hidden layers.",

    "A SQL query walks into a bar...\nIt walks up to two tables and asks: 'Can I join you?'",

    "Why do programmers prefer dark mode?\nBecause light attracts bugs.",

    "My model achieved 99% accuracy.\nThen I tested it on real life.",

    "Why did the developer go broke?\nBecause he used up all his cache.",

    "I told my computer I needed a break.\nNow it won't stop sending me vacation ads.",

    "Machine learning is basically:\n'Let's throw data at it and see what happens.'"

];


/* =========================================================
   TERMINAL COMMANDS
========================================================= */

const commands = [

    "help",

    "about",

    "projects",

    "skills",

    "contact",

    "joke",

    "whoami",

    "snake",

    "clear",

    "sudo hire subhash",

    "coffee"

];


/* =========================================================
   RANDOM ITEM
========================================================= */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   ADD TERMINAL ENTRY
========================================================= */

function addTerminalEntry(
    command,
    result
) {


    const entry =
        document.createElement(
            "div"
        );


    entry.className =
        "terminal-history-entry";


    const commandElement =
        document.createElement(
            "div"
        );


    commandElement.className =
        "terminal-command";


    commandElement.textContent =
        `subhash@portfolio:~$ ${command}`;


    const resultElement =
        document.createElement(
            "div"
        );


    resultElement.className =
        "terminal-result";


    resultElement.innerHTML =
        result;


    entry.appendChild(
        commandElement
    );


    entry.appendChild(
        resultElement
    );


    terminalHistory.appendChild(
        entry
    );


    /*
        Scroll terminal to bottom.
    */

    terminalScreen.scrollTop =
        terminalScreen.scrollHeight;

}


/* =========================================================
   TERMINAL COMMAND HANDLER
========================================================= */

function executeCommand(
    rawCommand
) {


    const command =
        rawCommand
            .trim()
            .toLowerCase();


    if (!command) {

        return;

    }


    /* -----------------------------------------
       HELP
    ----------------------------------------- */

    if (command === "help") {

        addTerminalEntry(

            command,

            `Available commands:

help        Show available commands
about       About Subhash
projects    View live projects
skills      View technical skills
contact     Contact information
joke        Tell a developer joke
whoami      Identify the user
snake       Launch Snake AI
coffee      Developer fuel
clear       Clear terminal

Try:
sudo hire subhash`

        );

        return;
    }


    /* -----------------------------------------
       ABOUT
    ----------------------------------------- */

    if (command === "about") {

        addTerminalEntry(

            command,

            `Subhash Chandra

AI / ML Engineer
B.Tech — Artificial Intelligence & Machine Learning

Focus:
Machine Learning
Reinforcement Learning
Computer Vision
FastAPI
MLOps`

        );

        return;
    }


    /* -----------------------------------------
       WHOAMI
    ----------------------------------------- */

    if (command === "whoami") {

        addTerminalEntry(

            command,

            `Subhash Chandra

AI / ML Engineer
Builder of ML systems
Occasional bug creator
Professional coffee consumer`

        );

        return;
    }


    /* -----------------------------------------
       PROJECTS
    ----------------------------------------- */

    if (command === "projects") {

        addTerminalEntry(

            command,

            `<strong>[01]</strong> Autonomous Snake AI
     DQN · Q-Learning
     ● LIVE

<strong>[02]</strong> Gym Injury Risk Predictor
     ML · FastAPI · MLOps
     ● LIVE

<strong>[03]</strong> YouTube Comment Analyzer
     NLP · FastAPI
     ● LIVE`

        );

        return;
    }


    /* -----------------------------------------
       SKILLS
    ----------------------------------------- */

    if (command === "skills") {

        addTerminalEntry(

            command,

            `Python · Java · C · JavaScript · SQL

Machine Learning
Scikit-learn · Pandas · NumPy

Deep Learning
PyTorch · TensorFlow · Keras · OpenCV

AI
DQN · Q-Learning · NLP

Backend
FastAPI · Flask

MLOps
Docker · MLflow · GitHub Actions`

        );

        return;
    }


    /* -----------------------------------------
       CONTACT
    ----------------------------------------- */

    if (command === "contact") {

        addTerminalEntry(

            command,

            `Email:
bishnoisub0@gmail.com

LinkedIn:
linkedin.com/in/subhashbishnoi0/

GitHub:
github.com/subhbishnoi`

        );

        return;
    }


    /* -----------------------------------------
       JOKE
    ----------------------------------------- */

    if (command === "joke") {

        addTerminalEntry(

            command,

            randomItem(jokes)

        );

        return;
    }


    /* -----------------------------------------
       SNAKE
    ----------------------------------------- */

    if (command === "snake") {

        addTerminalEntry(

            command,

            `Launching Autonomous Snake AI...

DQN ................. ONLINE
Q-Learning .......... ONLINE
Environment ......... READY

Opening live project...`

        );


        setTimeout(
            function () {

                window.open(
                    "https://autonomous-snake-dqn.onrender.com/",
                    "_blank"
                );

            },
            700
        );


        return;
    }


    /* -----------------------------------------
       COFFEE
    ----------------------------------------- */

    if (command === "coffee") {

        addTerminalEntry(

            command,

            `Coffee dependency detected.

Status:
████████████████████ 100%

System can continue. ☕`

        );

        return;
    }


    /* -----------------------------------------
       SUDO HIRE
    ----------------------------------------- */

    if (
        command ===
        "sudo hire subhash"
    ) {

        addTerminalEntry(

            command,

            `Initializing Subhash...

[████████████████████] 100%

✓ Python
✓ Machine Learning
✓ FastAPI
✓ MLOps
✓ Reinforcement Learning
✓ Computer Vision

ACCESS GRANTED.

SYSTEM MESSAGE:
You should probably hire him. 😎`

        );

        return;
    }


    /* -----------------------------------------
       CLEAR
    ----------------------------------------- */

    if (command === "clear") {

        terminalHistory.innerHTML =
            "";

        return;
    }


    /* -----------------------------------------
       UNKNOWN COMMAND
    ----------------------------------------- */

    addTerminalEntry(

        command,

        `Command not found: ${command}

Type <strong>help</strong> to see what I understand.

Maybe the AI needs more training. 🤖`

    );

}


/* =========================================================
   ENTER KEY
========================================================= */

if (terminalInput) {

    terminalInput.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key === "Enter"
            ) {


                const command =
                    terminalInput.value;


                terminalInput.value =
                    "";


                executeCommand(
                    command
                );

            }

        }
    );

}


/* =========================================================
   QUICK COMMAND BUTTONS
========================================================= */

const commandButtons =
    document.querySelectorAll(
        "[data-command]"
    );


commandButtons.forEach(
    function (button) {


        button.addEventListener(
            "click",
            function () {


                const command =
                    button.dataset.command;


                executeCommand(
                    command
                );


                if (terminalInput) {

                    terminalInput.focus();

                }

            }
        );

    }
);


/* =========================================================
   CLICK TERMINAL TO FOCUS INPUT
========================================================= */

if (terminalScreen) {

    terminalScreen.addEventListener(
        "click",
        function () {

            if (terminalInput) {

                terminalInput.focus();

            }

        }
    );

}


/* =========================================================
   DESKTOP CURSOR
========================================================= */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {


    projects.forEach(
        function (project) {


            project.addEventListener(
                "mouseenter",
                function () {

                    document.body.style.cursor =
                        "none";

                }
            );


            project.addEventListener(
                "mouseleave",
                function () {

                    document.body.style.cursor =
                        "";

                }
            );

        }
    );

}