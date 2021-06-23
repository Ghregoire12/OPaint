function norme (x,y){ //renvoi la norme du point x,y
  return Math.sqrt(x*x + y*y);
}

function inside(x1,x2,y1,y2){ //renvoi true si la souris est placé entre x1,y1 et x2,y2
  return (mouseX > min(x1,x2) && mouseX < max(x1,x2) && mouseY > min(y1,y2) && mouseY < max(y1,y2));
}

class ButtonNav { //classe des boutons de navigations dans la barre de navigation
  constructor (x,y,w,h,c,img){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.img = img;
    this.selected = false;
  }
  draw(){
    stroke("black");
    strokeWeight(1);
    if (this.selected == false){
      fill(this.c);
    } else {
      fill('#DDDDDD');
    }
    rect(this.x, this.y, this.w, this.h);
    image(this.img,this.x + 10, this.y + 10, this.w - 20, this.h - 20);
  }
  click(){
    if(inside(this.x,this.x + this.w,this.y,this.y + this.h)){
      this.selected = true;
    } else {
      this.selected = false;
    }
  }
}



class PlusMinus { //classe pour créer un bouton + - (permet notamment de gerer la taille d'une police par exemple)
  constructor (strokeW, x,y){
    this.strokeWeight = strokeW;
    this.x = x;
    this.y = y;
  }
  draw(){
    stroke("black");
    strokeWeight(1);
    rect(this.x,this.y,80,40,10);
    textAlign(LEFT, CENTER);
    fill("black");
    textSize(14);
    noStroke();
    text("stroke weight", this.x, this.y - 10);
    textSize(24);
    textAlign(RIGHT, CENTER);
    text(this.strokeWeight, this.x + 45, this.y + 20);
    textAlign(LEFT, CENTER);
    stroke(1);
    line(this.x + 59,this.y + 10,this.x + 69,this.y + 10);
    line(this.x + 64,this.y + 5,this.x + 64,this.y + 15);
    line(this.x + 59,this.y + 30,this.x + 69,this.y + 30);
    line(this.x + 50,this.y,this.x + 50,this.y + 40);
    line(this.x + 50,this.y+20,this.x + 80,this.y + 20);
  }
  click(){
    if(inside(this.x + 50,this.x + 80,this.y,this.y + 40)){
      if(mouseY < this.y + 20){
        this.increment();
      } else if (mouseY > this.y + 20){
        this.decrement();
      }
    }
  }
  increment(){
    this.strokeWeight ++;
  }
  decrement(){
    if(this.strokeWeight > 0){
      this.strokeWeight --;
    }
  }
}

class RGBColor { //classe permettant de créer un bouton pour gérer la couleur
  constructor (Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill, x,y){
    this.sred = Rstroke;
    this.sgreen = Gstroke;
    this.sblue = Bstroke;
    this.fred = Rfill;
    this.fgreen = Gfill;
    this.fblue = Bfill;
    this.x = x;
    this.y = y;
    this.fillSelection = false;
  }
  draw(){
    stroke("black");
    line(this.x+55, this.y+5, this.x + 183, this.y + 5);
    line(this.x+55, this.y+20, this.x + 183, this.y + 20);
    line(this.x+55, this.y+35, this.x + 183, this.y + 35);
    stroke("white");
    strokeWeight(1);
    if(!this.fillSelection){
      fill(this.fred,this.fgreen,this.fblue);
      rect(this.x,this.y, 30,30);
      fill(this.sred,this.sgreen,this.sblue);
      rect(this.x + 10,this.y + 10, 30,30);
      fill('white');
      rect(this.x + 18,this.y + 18, 14,14);
      fill("grey");
      noStroke();
      circle(this.x + 55 + this.sred/2, this.y+5, 12);
      circle(this.x + 55 + this.sgreen/2, this.y+20, 12);
      circle(this.x + 55 + this.sblue/2, this.y+35, 12);
    } else if (this.fillSelection){
      fill(this.sred,this.sgreen,this.sblue);
      rect(this.x + 10,this.y + 10, 30,30);
      fill('white');
      rect(this.x + 18,this.y + 18, 14,14);
      fill(this.fred,this.fgreen,this.fblue);
      rect(this.x,this.y, 30,30);
      fill("grey");
      noStroke();
      circle(this.x + 55 + this.fred/2, this.y+5, 12);
      circle(this.x + 55 + this.fgreen/2, this.y+20, 12);
      circle(this.x + 55 + this.fblue/2, this.y+35, 12);
    }
    fill("black");
    textAlign(LEFT, CENTER);
    textSize(14);
    text("color", this.x, this.y - 10);
    text("R", this.x + 193, this.y + 5);
    text("G", this.x + 193, this.y + 20);
    text("B", this.x + 193, this.y + 35);
    stroke(1);
  }
  click(){
    if(inside(this.x,this.x + 40,this.y,this.y + 40)){
      if(this.fillSelection){
        this.fillSelection = false;
      } else if (!this.fillSelection){
        this.fillSelection = true;
      }
    }
  }
  mouseDragged(){
    if(!this.fillSelection){
      if(inside(this.x + 49 + this.sred/2, this.x + 61 + this.sred/2, this.y-1, this.y+11)){
       if (this.sred < 0){
         this.sred = 0;
       } else if(this.sred > 255) {
         this.sred = 255;
       } else if(this.sred >= 0 && this.sred <= 256){
         this.sred = 2*(mouseX - (this.x + 55));
       }
     } else if(inside(this.x + 49 + this.sgreen/2, this.x + 61 + this.sgreen/2, this.y+14, this.y+26)){
       if (this.sgreen < 0){
         this.sgreen = 0;
       } else if(this.sgreen > 255) {
         this.sgreen = 255;
       } else if(this.sgreen >= 0 && this.sgreen <= 256){
         this.sgreen = 2*(mouseX - (this.x + 55));
       }
     } else if(inside(this.x + 49 + this.sblue/2, this.x + 61 + this.sblue/2, this.y+29, this.y+41)){
       if (this.sblue < 0){
         this.sblue = 0;
       } else if(this.sblue > 255) {
         this.sblue = 255;
       } else if(this.sblue >= 0 && this.sblue <= 256){
         this.sblue = 2*(mouseX - (this.x + 55));
       }
     }
    } else if (this.fillSelection){
      if(inside(this.x + 49 + this.fred/2, this.x + 61 + this.fred/2, this.y-1, this.y+11)){
       if (this.fred < 0){
         this.fred = 0;
       } else if(this.fred > 255) {
         this.fred = 255;
       } else if(this.fred >= 0 && this.fred <= 256){
         this.fred = 2*(mouseX - (this.x + 55));
       }
     } else if(inside(this.x + 49 + this.fgreen/2, this.x + 61 + this.fgreen/2, this.y+14, this.y+26)){
       if (this.fgreen < 0){
         this.fgreen = 0;
       } else if(this.fgreen > 255) {
         this.fgreen = 255;
       } else if(this.fgreen >= 0 && this.fgreen <= 256){
         this.fgreen = 2*(mouseX - (this.x + 55));
       }
     } else if(inside(this.x + 49 + this.fblue/2, this.x + 61 + this.fblue/2, this.y+29, this.y+41)){
       if (this.fblue < 0){
         this.fblue = 0;
       } else if(this.fblue > 255) {
         this.fblue = 255;
       } else if(this.fblue >= 0 && this.fblue <= 256){
         this.fblue = 2*(mouseX - (this.x + 55));
       }
     }
    }
  }
}

//l'array shape (dans sketch) prend trois types de forme, les lignes, les rectangles, et les cercles. Ce serait intéressant de rajouter un outil courbe/arc/... (toutes les fcts d'illustrator)
class Line { //permet de construire une ligne
  constructor (x1,y1,x2,y2,strokeW,Rstroke,Gstroke,Bstroke){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.sw = strokeW;
    this.sred = Rstroke;
    this.sgreen = Gstroke;
    this.sblue = Bstroke;
  }
  draw(){
    stroke(this.sred,this.sgreen,this.sblue);
    strokeWeight(this.sw);
    line(this.x1,this.y1,this.x2,this.y2);
  }
  click(){
    let ab = norme(this.x1 - mouseX, this.y1 - mouseY);
    let bc = norme(this.x2 - mouseX, this.y2 - mouseY);
    let cb = norme(this.x1 - this.x2, this.y1 - this.y2);
    let demiPerimetre = (ab+bc+cb)/2;  //cf formules de Heron
    let aire = Math.sqrt(demiPerimetre*(demiPerimetre-ab)*(demiPerimetre-bc)*(demiPerimetre-cb));
    let hauteur = 2*aire/cb; 
    if(mouseX>min(this.x1,this.x2) - 2 - this.sw/2 && mouseX <max(this.x1,this.x2) + 2 + this.sw/2 && mouseY>min(this.y1,this.y2) - 2 - this.sw/2 && mouseY<max(this.y1,this.y2) + 2 + this.sw/2 && hauteur < 4+this.sw){
      return true;
    }
    return false;
  }
}

class Rectangle { //permet de construire un rectangle
  constructor (x,y,w,h,strokeW,Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sw = strokeW;
    this.sred = Rstroke;
    this.sgreen = Gstroke;
    this.sblue = Bstroke;
    this.fred = Rfill;
    this.fgreen = Gfill;
    this.fblue = Bfill;
  }
  draw(){
    fill(this.fred,this.fgreen,this.fblue);
    stroke(this.sred,this.sgreen,this.sblue);
    strokeWeight(this.sw);
    rect(this.x,this.y,this.w,this.h);
  }
  click(){
    if(inside(this.x + this.w, this.x,this.y + this.h, this.y)){
      return true;
    }
    return false; 
  }
}

class Circle { //permet de construire un cercle
  constructor (x,y,d,strokeW,Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill){
    this.x = x;
    this.y = y;
    this.d = d;
    this.sw = strokeW;
    this.sred = Rstroke;
    this.sgreen = Gstroke;
    this.sblue = Bstroke;
    this.fred = Rfill;
    this.fgreen = Gfill;
    this.fblue = Bfill;
  }
  draw(){
    fill(this.fred,this.fgreen,this.fblue);
    stroke(this.sred,this.sgreen,this.sblue);
    strokeWeight(this.sw);
    circle(this.x,this.y,this.d);
  }
  click(){
    let norme = 2*Math.sqrt((this.x-mouseX)*(this.x-mouseX) + (this.y-mouseY)*(this.y-mouseY));
    if(norme < this.d){
      return true;
    }
    return false;
  }
}


class Navbar{ //réuni tous les ButtonNav, permet de sélectionner l'outil qu'on souhaite pour dessiner
  constructor(pointer,lin,rectangle,circl,eras,restart){
    this.button = 1;
    this.x = 1;
    this.y = 1;
    this.w = 300;
    this.h = 50;
    this.pointer = new ButtonNav(1,1,50,50,'white',pointer);
    this.line = new ButtonNav(51,1,50,50,'white',lin);
    this.rectangle = new ButtonNav(101,1,50,50,'white',rectangle);
    this.circle = new ButtonNav(151,1,50,50,'white',circl);
    this.erase = new ButtonNav(201,1,50,50,'white',eras);
    this.restart = new ButtonNav(251,1,50,50,'white',restart);
    this.pointer.selected = true;
  }
  draw(){
    this.pointer.draw();
    this.line.draw();
    this.rectangle.draw();
    this.circle.draw();
    this.erase.draw();
    this.restart.draw();
  }
  click(){
     if(inside(this.x,this.x + this.w,this.y,this.y + this.h)){
      this.pointer.click();
      this.line.click();
      this.rectangle.click();
      this.circle.click();
      this.erase.click();
      this.restart.click();
      if(this.restart.selected == true){ //efface le dessin
        shapes = [];
        this.restart.selected = false;
        this.pointer.selected = true;
        this.button = 1;
      } else if(this.pointer.selected == true){
        this.button = 1;
      } else if(this.line.selected == true){
        this.button = 2;
      } else if(this.rectangle.selected == true){
         this.button = 3;
      } else if(this.circle.selected == true){
        this.button = 4;
      } else if(this.erase.selected == true){
        this.button = 5;
      }
    }
  }
}

class Configuration { //réuni tous les parametres de dessin, pour l'instant, l'epaisseur des traits, et la couleur, des traits et de fond des formes
//Manque le zIndex pour placer une forme sur un plan supérieur ou inférieur et position qui permet de redimensionner la forme ou de la déplacer
  constructor(strokeW, Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill){
    this.display = false;                 //par défaut, fermé
    this.shape = false;                   //aucune forme selectionnée
    this.strokeW = new PlusMinus(strokeW, 30, 70);
    //this.zIndex = new ZIndex();
    this.color = new RGBColor(Rstroke,Gstroke,Bstroke,Rfill,Gfill,Bfill, 140,70);
    //this.pos = new PositionButton();
  }
  draw(){
    if(this.display){
      rect(1,51,798,70); 
      this.strokeW.draw();
      this.color.draw();
    }
  }
  click(){
    this.strokeW.click();
    this.color.click();
  }
  mouseDragged(){
    this.color.mouseDragged();
  }
  show(){
    this.display = true;
  }
  hide(){
    this.display = false;
  }
}
