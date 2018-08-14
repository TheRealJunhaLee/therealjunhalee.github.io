var canvas = document.getElementById("ctx");
var c = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;

var frameCount = 0;
var keys = [];
var clicked = false;
var mousePos = {};

var jobs = ["sewer\ncleaner", "chimney\nsweep", "construction\nworker", "hotel\nhousekeeper", "pool\ncleaner", "window\nwasher", "meat\nprocessor", "horse\ninseminator", "e.r.\nnurse", "dog\ngroomer", "oil\nrig\nworker", "mortician", "maggot\nfarmer", "dishwasher", "sperm\nbank\njanitor", "esthecian/\nwaxer", "coal\nminer", "scrap yard\nworker"];
var traits = ["obsessive\nfoot\nwasher", "germaphobe", "fecal\nmatter", "garbage", "lipstick\nstain", "blacklight", "vegetarian", "really\nloves\nblood", "sharp\nknives", "allergic\nto\neverything", "moderately\ngood\nin\nbed", "bad\nunder\npressure", "resourceful", "can\nswallow\nanything", "dirty\nmind", "player", "target\npractice", "snake", "eggplant", "afraid\nof\nwater", "skin\nsamples", "dumpster\ndiver", "only\neats\nblue\nfood", "bikini\nseason", "bald\neagle", "comes\nin\nspurts", "prickly", "word\nvomit", "always\nhungry", "big\nshoes", "airtight", "super\nstressed", "nasty\nrash", "smuggled\ngoods", "daredevil", "living\na\nlie", "anal\nglands", "manicured\nnails", "sexy\ntime", "jerk\nmagnet", "smells\nlike\nonion", "dark\nroom", "bleached\nblonde", "disorganized", "full\nof\nfear", "bathes\nin\nbleach", "likes\nto play\ngames", "fluids", "soap", "chemicals", "big\nnet", "glorious\nmane", "squeegee", "uniform", "comfortable\nshoes", "avid\nreader", "lives\nin own\nreality", "reservations", "pivot", "glitter\nburps"];
var traitsInRotation = traits.slice(0);

function init() {
    window.requestAnimationFrame(draw);
}

init();

var Card = function(x, y, type, text) {
    this.x = x;
    this.y = y;
    this.width = 113;
    this.height = 175;
    this.activated = false;
    this.type = type;
    this.text = text;
}

Card.prototype.draw = function() {
    c.lineWidth = 4;
    c.fillStyle = "white";
    c.strokeStyle = (this.type === "job" ? "green" : "black");
    roundRect(c, this.x, this.y, this.width, this.height, 15, false, true);
    
    if (this.activated) {
        c.font = "24px Open Sans";
        c.fillStyle = (this.type === "job" ? "green" : "black");
        
        fillTextMultiLine(c, this.text, this.x+this.width/2, this.y+this.height/2, this.width-10);
    } else {
        c.font = (this.type === "job" ? 48 : 32) + "px Do Hyeon";
        c.fillStyle = (this.type === "job" ? "green" : "black");
        c.fillText((this.type === "job" ? "Job": "Trait"), this.x+this.width/2, this.y+this.height/2+12);
    }
    
}

Card.prototype.interact = function() {
    if (pointRectCollided(mousePos.x, mousePos.y, this.x, this.y, this.width, this.height) && !this.activated) {
        document.body.style.cursor = "pointer";
        if (clicked) {
            this.activated = true;
        }
    }
}

var jobCard;
var traitCards = [];

resetJob();
resetTraits();

function draw() {
    
    document.body.style.cursor = "default";
    
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.textBaseline = "center";
    c.textAlign = "center";
    c.fillStyle = "black";
    c.font = "48px Do Hyeon";
    c.fillText("Funemployed randomizer", canvas.width/2, 60);
    
    jobCard.draw();
    jobCard.interact();
    
    for (var i = 0 ; i < traitCards.length ; i++) {
        traitCards[i].draw();
        traitCards[i].interact();
    }
    
    c.strokeStyle = "black";
    if (pointRectCollided(mousePos.x, mousePos.y, 200, 150, 150, 70)) {
        document.body.style.cursor = "pointer";
        c.strokeStyle = "grey";
        if (clicked) {
            c.strokeStyle = "red";
            resetTraits();
        }
    }
    c.strokeRect(200, 150, 150, 70);
    c.fillStyle = "black";
    c.font = "24px Open Sans";
    c.fillText("Reset Traits", 200+150/2, 150+70/2+12);
    
    c.strokeStyle = "black";
    if (pointRectCollided(mousePos.x, mousePos.y, 400, 150, 150, 70)) {
        document.body.style.cursor = "pointer";
        c.strokeStyle = "grey";
        if (clicked) {
            c.strokeStyle = "red";
            resetTraits();
            resetJob();
        }
    }
    c.strokeRect(400, 150, 150, 70);
    c.fillStyle = "black";
    c.font = "16px Open Sans";
    c.fillText("Reset Everything", 400+150/2, 150+70/2+8);
    
    console.log(traits);
    
    frameCount++;
    clicked = false;
    window.requestAnimationFrame(draw);
}

canvas.addEventListener("keydown", function(e) {
    keys[e.key] = true;
	e.preventDefault();
});

canvas.addEventListener("keyup", function(e) {
    keys[e.key] = false;
	e.preventDefault();
});

canvas.addEventListener("click", function() {
    clicked = true;
});

canvas.addEventListener("mousemove", function(e) {
    mousePos = getMousePos(canvas, e);
});

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}
    
function random(min, max) {
	var w = max-min;
	return Math.random()*w+min;
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

function pointRectCollided(pointX, pointY, rectX, rectY, rectW, rectH) {
    if (pointX > rectX && pointY > rectY && pointX < rectX+rectW && pointY < rectY+rectH) {
        return true;
    }
    return false;
}

function resetJob() {
    var jobID = Math.floor(random(0, jobs.length));
    jobCard = new Card(20, 100, "job", jobs[jobID]);
}

function resetTraits() {
    traitsInRotation = traits.slice(0);
    traitCards = [];
    for (var i = 0 ; i < 4 ; i++) {
        //console.log(traitsInRotation);
        //console.log(traits);
        var traitID = Math.floor(random(0, traitsInRotation.length));
        
        traitCards.push(new Card (20+i*150, 295, "trait", traitsInRotation[traitID]));
        
        traitsInRotation.splice(traitID, 1);
    }
}

function fillTextMultiLine(ctx, text, x, y, maxWidth) {
    var lineHeight = ctx.measureText("M").width * 1.2;
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; ++i) {
        ctx.fillText(lines[i], x, y, maxWidth);
        y += lineHeight;
    }
}
