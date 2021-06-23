//variables globales
let pointer, rectangle, circl, lin, fil, eras, restart; // permet de charger les photos
let x,y; //position de la souris lorsque qu'on appui dessus
let indice, indiceSelected; //indices dans shapes (deux fonctions différentes)
let Rfill = 128; //couleur de fond (fonction fill)
let Gfill = 128;
let Bfill = 128;
let Rstroke = 0; //couleur de trait (fonctions stroke)
let Gstroke = 0;
let Bstroke = 0;
let strokeW = 1; //épaisseur de trait (fonction strokeWeight)

function mousePressed(){ //lorsque l'on appui sur la souris
  x = mouseX;
  y = mouseY;
  mousepressed = true;
  indice = shapes.length;
}

function mouseDragged(){ //lorsque la souris est enfoncée et déplacée
  if(mouseY > 51 && mouseY < 121){
    config.mouseDragged();
    if(navbar.button > 1){
      if(config.color.fillSelection){
        Rfill = config.color.fred;
        Gfill = config.color.fgreen;
        Bfill = config.color.fblue;
      } else if (!config.color.fillSelection){
        Rstroke = config.color.sred;
        Gstroke = config.color.sgreen;
        Bstroke = config.color.sblue;
      }
    } else if (navbar.button == 1){
        shapes[indiceSelected].fred = config.color.fred;
        shapes[indiceSelected].fgreen = config.color.fgreen;
        shapes[indiceSelected].fblue = config.color.fblue;
        shapes[indiceSelected].sred = config.color.sred;
        shapes[indiceSelected].sgreen = config.color.sgreen;
        shapes[indiceSelected].sblue = config.color.sblue;
    }
  }
  if(mouseY > 121 && abs(mouseX -x) + abs(mouseY -y) > 1){
    switch (navbar.button){
      case 2:
        shapes[indice] = new Line(x,y,mouseX,mouseY,strokeW,Rstroke,Gstroke,Bstroke);
        break;
      case 3:
        shapes[indice] = new Rectangle(x,y,mouseX - x, mouseY - y,strokeW,Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill);
        break;
      case 4:
        let norme = 2*Math.sqrt((x-mouseX)*(x-mouseX) + (y-mouseY)*(y-mouseY));
        shapes[indice] = new Circle(x,y,norme,strokeW,Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill);
        break;
      case 5:
        //efface les objets sur le passage de la souris
        break;
    }
  }
}

function mouseReleased(){ //lorsque la souris est relachée
  if (mouseX < x+2 && mouseX > x-2 && mouseY < y+2 && mouseY > y-2){
    if(mouseY < 51){
      navbar.click();
      if(navbar.button %4 == 1){
        config.hide();
      } else if (navbar.button > 1 && navbar.button < 5){
        config.show(); 
        config.strokeW.strokeWeight = strokeW;
        config.color.fred = Rfill;
        config.color.fgreen = Gfill;
        config.color.fblue = Bfill;
        config.color.sred = Rstroke;
        config.color.sgreen = Gstroke;
        config.color.sblue = Bstroke;
      }
    } else if(mouseY > 51 && mouseY < 121){
      if(config.display && navbar.button > 1){
        config.click();
        strokeW = config.strokeW.strokeWeight;
      } else if(config.display && navbar.button == 1){
        config.click();
        shapes[indiceSelected].sw = config.strokeW.strokeWeight;
      }
    } else {
      if(navbar.button %4 == 1){
        for(let i = shapes.length - 1; i >=  0; i--){
          if(shapes[i].click()){
            switch(navbar.button){
              case 1:
                config.show();
                indiceSelected = i;
                config.strokeW.strokeWeight = shapes[indiceSelected].sw;
                if(!(shapes[indiceSelected] instanceof Line)){
                  config.color.fred = shapes[indiceSelected].fred;
                  config.color.fgreen = shapes[indiceSelected].fgreen;
                  config.color.fblue = shapes[indiceSelected].fblue;
                }
                config.color.sred = shapes[indiceSelected].sred;
                config.color.sgreen = shapes[indiceSelected].sgreen;
                config.color.sblue = shapes[indiceSelected].sblue;
                break;
              case 5:
                shapes.splice(i,1);
                break;
            }
            break;
          }
          config.hide();
        }
      }
    }
  }
}

function keyPressed(){ //permettera, à terme de faire des raccourcis clavier ou entrér des valeurs numériques.

}

let navbar, config; 
let shapes = [];//enregistre toutes les formes du dessins (sous forme d'objets)


function setup() {
  createCanvas(800 , 800);
  pointer = loadImage('assets/pointer.png'); //images pour les boutons (screenshots provenant de fontawesome.com)
  rectangle = loadImage('assets/rectangle.png');
  circl = loadImage('assets/circle.png');
  lin = loadImage('assets/line.png');
  eras = loadImage('assets/erase.png');
  restart = loadImage('assets/restart.png');
  navbar = new Navbar(pointer,lin,rectangle,circl,eras,restart);//sert à créer la bar de contrôle
  config = new Configuration(strokeW, Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill);//sert à créer le panneau de configuration, qui sortira lorsque qu'on click sur une forme pour la modifier
}

function draw() {
  background(220)
  for(let i = 0; i < shapes.length; i++){
    shapes[i].draw();
  }
  navbar.draw();
  config.draw();
}