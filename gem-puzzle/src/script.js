// import Controller from './modules/controller';
// import Model from './modules/model';
// import View from './modules/render.view.model';

// import './modules/components';

// const controller = new Controller();
// controller.log();

// const model = new Model();
// model.log();

class View {
  constructor() {
    this.string = {
      en: {
        resetBtn: 'new game',
        gemPuzzle: 'gem-puzzle',
        startBtn: 'start',
        stopBtn: 'pause',
        saveBtn: 'save',
        loadBtn: 'load',
        bestResBtn: 'results',
        soundBtn: 'sound ON',
        soundBtnOFF: 'sound OFF',
        stepBtn: 'auto',
        step: 'step: ',
      },
      ru: {
        resetBtn: 'заново',
        gemPuzzle: 'пятнашки',
        stopBtn: 'пауза',
        startBtn: 'начать',
        saveBtn: 'сохранить',
        loadBtn: 'загрузить',
        bestResBtn: 'результаты',
        soundBtn: 'звук ВКЛ',
        soundBtnOFF: 'звук ВЫВКЛ',
        stepBtn: 'авто',
        step: 'шаг: ',
      },
    };
    this.lang = 'ru';

    this.mainEl = null;
    this.mainContainer = null;
    this.innerEl = null;
    this.el = null;
    // this.some = '';
    this.tempLog = '';
    this.tempLogBR = "\n";

    this.sattingsBoardContainer = null;
    this.gameBoardContainer = null;

    this.dashBoardContainer = null;
    this.timer = null;
    this.timerVal = null;
    this.isPaused = true;
    this.stopStartBtn = null;
    this.timerID = null;
    this.step = 0;
    this.stepCounterObj = null;
    this.solvingHint = null;
    this.winHint = null;

    this.matrixDimensionX = null;
    this.matrixDimensionY = null;
    this.mainElNum = null;
    this.defaultDimension = 8;
    this.dem = {
      mobile: {
        2: 160, 3: 106, 4: 80, 5: 64, 6: 53, 7: 45, 8: 40,
      },
      tablet: {
        2: 218, 3: 146, 4: 109, 5: 87, 6: 73, 7: 63, 8: 55,
      },
      desktop: {
        2: 218, 3: 146, 4: 109, 5: 87, 6: 73, 7: 63, 8: 55,
      },
    };
    this.isMobile = false;
    this.initIsMobile();
    this.setDimentionXY();
    this.setMainElNum();
    this.offset = null; // this.dem[this.matrixDimensionX]; /* 3x3-146; 4x4=109  438px 438px;*/
    this.setOffset();
    this.matrix = [];
    this.shuffledMatrix = [];
    this.stepMatrix = [];
    this.shuffledMatrixEvenSumm = 0;
    // this.repeated = [];
    this.stepBtn = null;
    this.bestResBtnObj = null;

    this.soundBtn = null;
    this.soundObj = null;
    this.isSound = true;

    this.autoStepSpeed = 800;
    this.isAutoMode = false;
    this.autoFnID = null;

    this.styleSheet = null;
    this.setStyleSheet();

    this.img = {
      imagesPath: "",
      imagesAmount: 150,
      images: {
      },
    };
  }

  checkShuffledMatrix() {
    let check = true;
    this.shuffledMatrix.forEach((el, i) => {
      if (this.getCurrentElNum(el) !== i + 1) {
        check = false;
      }
    });
    return check;
  }

  makeAISteps() {
    let i = 0;
    let leftRightTop = 1;
    let l;

    let elNum = 16;
    const elNumMax = 16;

    const CNTX = this;
    this.setCurrentMatrixN();
    // console.log(`chek matrix: ${this.checkShuffledMatrix()}`);
    // console.log(this.getMatrixDimension());
    // console.log(this.stepMatrix);
    this.autoFnID = setInterval(() => {
      if (i === 0) {
        console.log(`element: ${elNum}`);
        CNTX.stepsCompute(elNum, leftRightTop);
        l = CNTX.stepMatrix.length;
      }
      if (CNTX.stepMatrix.length === 0) {
        i = l;
      }
      if (!CNTX.isAutoMode) {
        clearInterval(CNTX.autoFnID);
        CNTX.stepMatrix = [];
        console.log('end');
      }
      if (i === l) {
        leftRightTop += 1;
        this.stepMatrix = [];
        i = 0;
        if (leftRightTop > 3) {
          if (elNumMax !== elNum) {
            elNum += 1;
            leftRightTop = 1;
          } else {
            clearInterval(CNTX.autoFnID);
            CNTX.isAutoMode = false;
            console.log('end');
          }
        }
      } else {
        i += 1;
        if (CNTX.stepMatrix.length !== 0) {
          console.log(`${CNTX.stepMatrix[i - 1][0]} ${this.tempGetDirection(CNTX.stepMatrix[i - 1][1])}`);
          CNTX.makeStep(CNTX.stepMatrix[i - 1][1], CNTX.stepMatrix[i - 1][0]);
        }
      }
    }, this.autoStepSpeed);
  }

  tempGetDirection(n) {
    switch (n) {
      case 1:
        return 'TOP';
      case 2:
        return 'RIGHT';
      case 3:
        return 'BOTTOM';
      case 4:
        return 'LEFT';
      default:
    }
    return false;
  }

  initIsMobile() {
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 480) {
      this.isMobile = true;
    }
  }

  getBackGroundSize() {
    return this.getOffset() * this.matrixDimensionX;
  }

  getBackGroundSizeCSS() {
    const box = this.getBackGroundSize();
    return `background-size: ${box}px ${box}px;`;
  }

  setOffset() {
    this.offset = this.isMobile ? this.dem.mobile[this.matrixDimensionX] : this.dem.desktop[this.matrixDimensionX];
  }

  getOffset() {
    return this.offset;
  }

  isElOnItsTopRow(elNum) {
    return this.isElOnPropPosY(elNum);
  }

  isElOnItsLeftCol(elNum) {
    return this.isElOnPropPosX(elNum);
  }

  getBoxElNumViaCurrElNum(elNum) {
    return this.getElNumViaLeftTopPos(this.getPosX(elNum), this.getPosY(elNum));
  }

  getCurrentElNumN(elNum) {
    return parseInt(this.getPosX(elNum) / this.getOffset(), 10) + 1 + parseInt(this.getPosY(elNum) / this.getOffset(), 10) * this.matrixDimensionY;
  }

  setCurrentMatrixN() {
    Object.keys(this.matrix).forEach((el, i) => {
      this.shuffledMatrix[this.getCurrentElNumN(i + 1) - 1] = (i + 1);
    });
  }

  setShffldOnElNumAndGooo(elNum, destElNum = -1) {
    // console.log(`elNum: ${elNum} ${destElNum}`);
    let counter = 0;
    this.shuffledMatrix.forEach((el, i) => {
      if (el === elNum && counter === 0) {
        if (this.shuffledMatrix[i + destElNum]) {
          this.shuffledMatrix[i] = this.shuffledMatrix[i + destElNum];
          this.shuffledMatrix[i + destElNum] = el;
          counter++;
        }
      } else {
        this.shuffledMatrix[i] = el;
      }
    });
    this.shuffle('notShuffle');
  }

  getCountOfStepsToPropYPos(elNum) {
    return (this.matrix[elNum - 1].y / this.getOffset()) - this.getYInitElementPosInsidMatrix(elNum);
  }

  toTop(elNum) {
    this.setMElAbove(elNum);
    if (this.stepMatrix.length === 0) {
      return;
    }
    let countOfStepsToPropYPos = this.getCountOfStepsToPropYPos(elNum) - 1;
    this.addStep(elNum, 1);
    while (countOfStepsToPropYPos > 0) {
      if (this.isElLastOnRow(elNum)) {
        console.log('laaaaast el!');
        this.goMountOfSteps('left', 1);
        this.goMountOfSteps('top', 2);
        this.goMountOfSteps('right', 1);
      } else {
        this.goMountOfSteps('right', 1);
        this.goMountOfSteps('top', 2);
        this.goMountOfSteps('left', 1);
      }
      this.addStep(elNum, 1);
      countOfStepsToPropYPos--;
    }
    /* установка предпоследнего элемента на последнее место */
    if (this.isItPreLastElInRow(elNum)) {
      console.log(`posiiiiition isItPreLastElInRow`);
      this.goMountOfSteps('right', 1);
      this.goMountOfSteps('top', 1);
      this.addStep(elNum, 2);
    }
  }

  setMElAbove(elNum) {
    console.log('set MEl Under');
    /* 1-я и 2-я четверти */
    if (this.isMElBefore(elNum)) {
      if ((this.matrix[elNum - 1].x <= this.getXPXPosition(elNum)) && (this.matrix[elNum - 1].y - this.getOffset() === this.getYPXPosition(elNum))) {
        /* если элемент стоит под уже установленной строкой, то обходить только снизу, чтобы не испортить позицию предыдущих элов */
        /* в данном случает это может быть только таже строка */
        if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
          console.log('special case (set MEl Under)');
          this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
          this.goMountOfSteps('bottom', 1);
          this.goMountOfSteps('right', 2);
          this.goMountOfSteps('top', 2);
          this.goMountOfSteps('left', 1);
        }
        return;
      }

      if (this.isMElOnTheSameRow(elNum)) { /* гэл в одной строке */
        if (this.stepsToRight(elNum) >= 0) { /* вправо есть шаги */
          console.log('on the same row (set MEl Under)');
          this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
          this.goMountOfSteps('top', 1);
          this.goMountOfSteps('right', 1);
        }
        return;
      }
      console.log('1st 2nd part (set MEl Under)');
      if (this.stepsToBottom(elNum) > 0) { /* вниз есть шаги */
        this.goMountOfSteps('bottom', this.getMountOfSteps(elNum, 'bottom') - 1);
      }
      if (this.stepsToRight(elNum) >= 0) { /* вправо есть шаги */
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right'));
      }
      if (this.stepsToLeft(elNum) >= 0) { /* влево есть шаги */
        this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left'));
      }
    } else {
      /* 3-я и 4-я четверти */
      if (this.isMElOnTheSameRow(elNum)) { /* гэл в одной строке */
        if (this.stepsToLeft(elNum) >= 0) { /* (обход вправо) */
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') - 1);
          this.goMountOfSteps('top', 1);
          this.goMountOfSteps('left', 1);
        }
        return;
      }
      if (this.isMElOnTheSameCol(elNum)) { /* гэл в одной колонке */
        if (this.isMElCanMoveToTheRight()) { /* (обход вправо) */
          this.goMountOfSteps('right', 1);
          this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top') + 1);
          this.goMountOfSteps('left', 1);
        } else {
          this.goMountOfSteps('left', 1);
          this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top') + 1);
          this.goMountOfSteps('right', 1);
        }
        return;
      }
      if ((this.matrix[elNum - 1].x <= this.getXPXPosition(elNum)) && (this.matrix[elNum - 1].y - this.getOffset() === this.getYPXPosition(elNum))) {
        if (this.stepsTotop(elNum) >= 0) { /* (вверх) */
          this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top') - 1);
        }
        if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
          this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right'));
        }
        if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left'));
        }
        this.goMountOfSteps('right', 1);
        this.goMountOfSteps('top', 2);
        this.goMountOfSteps('left', 1);
        return;
      }
      if (this.stepsTotop(elNum) >= 0) { /* (вверх) */
        this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top') - 1);
      }
      if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right'));
      }
      if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
        this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left'));
      }
      this.goMountOfSteps('left', 1);
      this.goMountOfSteps('top', 2);
      this.goMountOfSteps('right', 1);
    }
  }

  getCountOfStepsToPropXPos(elNum) {
    return (this.matrix[elNum - 1].x / this.getOffset()) - this.getXInitElementPosInsideMatrix(elNum);
  }

  toLeft(elNum) {
    console.log('set MEl Before');
    this.setMElBefore(elNum);

    if (this.stepMatrix.length === 0) {
      return;
    }

    let countOfStepsToPropXPos = this.getCountOfStepsToPropXPos(elNum) - 1;
    console.log(`(${this.matrix[elNum - 1].x} / ${this.getOffset()}) - ${this.getXInitElementPosInsideMatrix(elNum)} = ${countOfStepsToPropXPos}`);
    this.addStep(elNum, 4);
    while (countOfStepsToPropXPos > 0) {
      console.log(`countOfStepsToPropXPos: ----> ${countOfStepsToPropXPos}`);
      console.log(`countOfStepsToPropXPos: 999 ${(countOfStepsToPropXPos > 0)}`);
      if (this.isThereAbilityToGoByBottom(elNum)) {
        this.goMountOfSteps('bottom', 1);
        this.goMountOfSteps('left', 2);
        this.goMountOfSteps('top', 1);
      } else {
        this.goMountOfSteps('top', 1);
        this.goMountOfSteps('left', 2);
        this.goMountOfSteps('bottom', 1);
      }
      this.addStep(elNum, 4);
      countOfStepsToPropXPos--;
    }
  }

  isElBeforeItsPropRow(elNum) {
    return this.matrix[elNum - 1].x < this.getXPXPosition(elNum);
  }

  setMElBefore(elNum) {
    if (this.isElOnPropPosX(elNum)) {
      console.log(`isElOnPropPosX ${this.isElOnPropPosX(elNum)}`);
      return false;
    }
    if (this.isElBeforeItsPropRow(elNum)) {
      console.log(`${elNum} El Before Its Prop Row`);
      return false;
    }
    let returnFlag = false;
    /* 1-я и 2-я четверти */
    if (this.isMElBefore(elNum)) { /* гэл перед */
      if (this.isMElOnTheSameRow(elNum) && (this.stepsToRight(elNum) >= 0)) { /* гэл в одной строке */
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1); /* вправо есть шаги */
        return true;
      }
      if (this.isMElOnTheSameCol(elNum) && (this.stepsToBottom(elNum) >= 0)) { /* гэл в одной колонке */
        /* виниз есть шаги    сдесь поправка если более раза необходимо вниз то вначале раз вниз поптом влево... */
        this.goMountOfSteps('bottom', this.getMountOfSteps(elNum, 'bottom') - 1);
        this.goMountOfSteps('left', 1);
        this.goMountOfSteps('bottom', 1);
        return true;
      }
      /* 1-я и 2-я четверти ОБЩЕЕ */
      if (this.stepsToBottom(elNum) >= 0) { /* виниз есть шаги  */
        this.goMountOfSteps('bottom', this.getMountOfSteps(elNum, 'bottom') - 1);
        if (this.stepsToRight(elNum) >= 0) { /* вправо есть шаги */
          this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
        }
        if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') + 1);
        }
        this.goMountOfSteps('bottom', 1);
        returnFlag = true;
      } else {
        if (this.stepsToRight(elNum) >= 0) { /* вправо есть шаги */
          this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
        }
        if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') + 1);
        }
        /* !важно опускать в конце! */
        if (this.stepsToBottom(elNum) >= 0) { /* (вниз) */
          this.goMountOfSteps('bottom', this.getMountOfSteps(elNum, 'bottom'));
        }
      }
    } else {
      /* 3-я и 4-я четверти */
      if (this.isMElOnTheSameRow(elNum)) { /* гэл на одной строке */
        if (this.isMElCanMoveToTheBottom()) {
          this.goMountOfSteps('bottom', 1);
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') + 1);
          this.goMountOfSteps('top', 1);
        } else {
          this.goMountOfSteps('top', 1);
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') + 1);
          this.goMountOfSteps('bottom', 1);
        }
        return;
      }
      if (this.isMElOnTheSameCol(elNum)) { /* гэл в одной колонке */
        this.goMountOfSteps('left', 1);
        this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top'));
        return;
      }
      /* !важна последовательность */
      if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
      }
      if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
        this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') + 1);
      }
      if (this.stepsTotop(elNum) >= 0) { /* (вверх) */
        this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top'));
      }
    }
    return returnFlag;
  }

  isElLastOnRow(elNum) {
    return this.getXInitElementPosInsideMatrix(elNum) + 1 === this.matrixDimensionX;
  }

  isItPreLastElInRow(elNum) {
    return this.getXInitElementPosInsideMatrix(elNum) + 1 === this.matrixDimensionX - 1;
  }

  toRight(elNum) {
    console.log('set MEl After');
    if (!this.setMElAfter(elNum)) {
      return;
    }

    let countOfStepsToPropXPos = this.getCountOfStepsToPropXPos(elNum) * (-1) - 1;
    this.addStep(elNum, 2);
    while (countOfStepsToPropXPos > 0) {
      if (this.isThereAbilityToGoByBottom(elNum)) {
        console.log(`isThereAbilityToGoByBottom: ${this.isThereAbilityToGoByBottom(elNum)}`);
        this.goMountOfSteps('bottom', 1);
        this.goMountOfSteps('right', 2);
        this.goMountOfSteps('top', 1);
      } else {
        console.log(`isThereAbilityToGoByBottom: ${this.isThereAbilityToGoByBottom(elNum)}`);
        this.goMountOfSteps('top', 1);
        this.goMountOfSteps('right', 2);
        this.goMountOfSteps('bottom', 1);
      }
      this.addStep(elNum, 2);
      countOfStepsToPropXPos--;
    }
  }

  /* если элемент стоит под уже установленной строкой, то обходить только снизу, чтобы не испортить позицию предыдущих элов */
  isCaseRangedRowAbove(elNum) {
    return (this.matrix[elNum - 1].x <= this.getXPXPosition(elNum)) && (this.matrix[elNum - 1].y - this.getOffset() === this.getYPXPosition(elNum));
  }

  setMElAfter(elNum) {
    if (this.isElOnPropPosX(elNum)) {
      return false; /* !!!ОШИБКА надо все-равно ставить эл над!!! */
    }
    if (!this.isElBeforeItsPropRow(elNum)) { /* isItPsblToSetMElAfter(elNum) this.matrix[elNum - 1].x > this.getXPXPosition(elNum) */
      console.log(`isElNOTBeforeItsPropRow ${!this.isElBeforeItsPropRow(elNum)} - EXIT FROM setMElAfter`);
      return false;
    }
    let returnFlag = false;
    /* 1-я и 2-я четверти */
    if (this.isMElBefore(elNum)) { /* гэл перед эл в матрице */
      if (this.isCaseRangedRowAbove(elNum)) {
        console.log('case when ranged row is above');
        if (this.stepsToRight(elNum) >= 0) {
          this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
          this.goMountOfSteps('bottom', 1);
          this.goMountOfSteps('right', 2);
          this.goMountOfSteps('top', 2);
        }
        /* редко - случай, когда мэл находится рядом с уже собранным рядом */
        if (this.stepsToLeft(elNum) >= 0) {
          this.goMountOfSteps('bottom', 1);
          this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') - 1);
        }
        return true;
      }
      /* над эл много пространства и там мэл */
      if (this.isMElOnTheSameRow(elNum) && (this.stepsToRight(elNum) >= 0)) { /* мэл в одной строке */
        console.log('МЭЛ на одной строке и перед эл');
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') - 1);
        this.goMountOfSteps('top', 1);
        this.goMountOfSteps('right', 2);
        this.goMountOfSteps('bottom', 1);
        return true;
      }
      /* Common */
      if (this.stepsToBottom(elNum) >= 0) { /* (вниз) */
        this.goMountOfSteps('bottom', this.getMountOfSteps(elNum, 'bottom') - 1);
        returnFlag = true;
      }
      if (this.isMElOnTheSameCol(elNum)) {
        this.goMountOfSteps('right', 1);
        this.goMountOfSteps('bottom', 1);
        return true;
      }
      if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right') + 1);
        // this.goMountOfSteps('top', 1);
        // this.goMountOfSteps('right', 2);
        console.log('testing ------------');
        this.goMountOfSteps('bottom', 1);
        returnFlag = true;
      }
      if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
        this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') - 1);
        this.goMountOfSteps('bottom', 1);
        returnFlag = true;
      }
    } else {
      /* 3-я и 4-я четверти */
      if (this.isMElOnTheSameRow(elNum) && (this.stepsToLeft(elNum) >= 0)) { /* гэл в одной строке */
        this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left') - 1);
        return true;
      }
      if (this.isMElOnTheSameCol(elNum) && (this.isMElCanMoveToTheRight())) { /* гэл в одной колонке обход последнего элемента не должен происходить */
        this.goMountOfSteps('right', 1);
        this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top'));
        return true;
      }
      // if ((this.matrix[elNum - 1].x <= this.getXPXPosition(elNum)) && (this.matrix[elNum - 1].y - this.getOffset() === this.getYPXPosition(elNum))) {
      /* если элемент стоит под уже установленной строкой, то обходить только снизу, чтобы не испортить позицию предыдущих элов */
      //   if (this.stepsTotop(elNum) >= 0) { /* (вверх) */
      //     this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top') - 1);
      //   }
      //   if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
      //     this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right'));
      //   }
      //   if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
      //     this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left'));
      //   }
      //   this.goMountOfSteps('right', 1);
      //   this.goMountOfSteps('top', 2);
      //   this.goMountOfSteps('left', 1);
      //   return;
      // }
      if (this.stepsTotop(elNum) >= 0) { /* (вверх) */
        this.goMountOfSteps('top', this.getMountOfSteps(elNum, 'top') - 1);
        returnFlag = true;
      }
      if (this.stepsToRight(elNum) >= 0) { /* (вправо) */
        this.goMountOfSteps('right', this.getMountOfSteps(elNum, 'right'));
        returnFlag = true;
      }
      if (this.stepsToLeft(elNum) >= 0) { /* (влево) */
        this.goMountOfSteps('left', this.getMountOfSteps(elNum, 'left'));
        returnFlag = true;
      }
      // this.goMountOfSteps('left', 1);
      if (returnFlag) {
        this.goMountOfSteps('right', 1);
        this.goMountOfSteps('top', 1);
      }
    }
    return returnFlag;
  }

  /**
  *  @private Prepeare Steps (saves in stepMatrix)
  *
  * @param {number} el number of element inMatrix
  * @param {number} stepDirection direction: 1-top, 2-right, 3-bottom, 4-left
  * @returns {void}
  */
  addStep(el, stepDirection) {
    this.stepMatrix.push([el, stepDirection]);
  }

  makeStep(dir, elNum = this.mainElNum) {
    switch (dir) {
      case 1:
      case 'top':
        /* шагнуть главным элементом вверх */
        // console.log(`позиция el над главным ${this.getTopCurrentElNum(this.mainElNum)}`);
        this.setShffldOnElNumAndGooo(elNum, this.matrixDimensionX * (-1));
        break;
      case 2:
      case 'right':
        /* шагнуть главным элементом вправо */
        // console.log(`позиция el справа от главного ${this.getRightCurrentElNum(this.mainElNum)}`);
        this.setShffldOnElNumAndGooo(elNum, 1);
        break;
      case 3:
      case 'bottom':
        /* шагнуть главным элементом вниз */
        // console.log(`позиция el под главным ${this.getBottomCurrentElNum(this.mainElNum)}`);
        this.setShffldOnElNumAndGooo(elNum, this.matrixDimensionX);
        break;
      case 4:
      case 'left':
        /* шагнуть главным элементом влево */
        // console.log(`позиция el слева от главного ${this.getLeftCurrentElNum(this.mainElNum)}`);
        if (elNum !== this.mainElNum) {
          if (this.isDrggblToLeft(elNum)) {
            this.setShffldOnElNumAndGooo(elNum);
            break;
          }
        }
        this.setShffldOnElNumAndGooo(elNum);
        break;
      default:
    }
  }

  getMountOfSteps(elNum, dir) {
    switch (dir) {
      case 'top':
        return this.getElRowNum(this.mainElNum) - this.getElRowNum(elNum);
      case 'right':
        return this.getElColNum(elNum) - this.getElColNum(this.mainElNum);
      case 'bottom':
        return this.getElRowNum(elNum) - this.getElRowNum(this.mainElNum);
      case 'left':
        return this.getElColNum(this.mainElNum) - this.getElColNum(elNum);
      default:
        return false;
    }
  }

  goMountOfSteps(dir, mount) {
    for (let i = 0; i < mount; i++) {
      switch (dir) {
        case 'top':
          /* шагнуть главным элементом вверх */
          // console.log(`позиция el над главным ${this.getTopCurrentElNum(this.mainElNum)}`);
          this.addStep(this.mainElNum, 1);
          // this.setShffldOnElNumAndGooo(this.mainElNum, this.matrixDimensionX * (-1));
          break;
        case 'right':
          /* шагнуть главным элементом вправо */
          // console.log(`позиция el справа от главного ${this.getRightCurrentElNum(this.mainElNum)}`);
          this.addStep(this.mainElNum, 2);
          // this.setShffldOnElNumAndGooo(this.mainElNum, 1);
          break;
        case 'bottom':
          /* шагнуть главным элементом вниз */
          // console.log(`позиция el под главным ${this.getBottomCurrentElNum(this.mainElNum)}`);
          this.addStep(this.mainElNum, 3);
          // this.setShffldOnElNumAndGooo(this.mainElNum, this.matrixDimensionX);
          break;
        case 'left':
          /* шагнуть главным элементом влево */
          // console.log(`позиция el слева от главного ${this.getLeftCurrentElNum(this.mainElNum)}`);
          this.addStep(this.mainElNum, 4);
          // this.setShffldOnElNumAndGooo(this.mainElNum);
          break;
        default:
      }
    }
  }

  getElRowNum(elNum) {
    return ((this.matrix[elNum - 1].y) / this.getOffset()) + 1;
  }

  getElColNum(elNum) {
    return ((this.matrix[elNum - 1].x) / this.getOffset()) + 1;
  }

  // const isMElBefore = this.getCurrentElNumN(this.mainElNum) < this.getCurrentElNumN(elNum);
  isMElBefore(elNum) {
    return this.getCurrentElNumN(this.mainElNum) < this.getCurrentElNumN(elNum);
  }

  isOnPropRow(elNum) {
    return this.isElOnPropPosY(elNum);
  }

  isOnPropCol(elNum) {
    return this.isElOnPropPosX(elNum);
  }

  isMElOnTheSameRow(elNum) {
    return this.matrix[this.mainElNum - 1].y === this.matrix[elNum - 1].y;
  }

  isMElOnTheSameCol(elNum) {
    return this.matrix[this.mainElNum - 1].x === this.matrix[elNum - 1].x;
  }

  isMElCanMoveToTheRight() {
    return (this.getCurrentElNumN(this.mainElNum) % this.matrixDimensionX) !== 0;
  }

  isMElCanMoveToTheLeft() {
    return ((this.getCurrentElNumN(this.mainElNum) - 1) % this.matrixDimensionX) !== 0;
  }

  isMElCanMoveToTheTop() {
    return this.matrix[this.mainElNum - 1].y !== 0;
  }

  isMElCanMoveToTheBottom() {
    return this.matrix[this.mainElNum - 1].y < ((this.matrixDimensionY - 1) * this.getOffset());
  }

  isThereAbilityToGoByBottom(elNum) {
    return this.matrix[elNum - 1].y < ((this.matrixDimensionY - 1) * this.getOffset());
  }

  // isThereAbilityToGoByRight(elNum) {
  //   return this.isElLastOnRow(elNum); // (this.matrix[elNum - 1].x / ((this.matrixDimensionX - 1) * this.getOffset())) === 1;
  // }

  isDrggblToTop(elNum) {
    return this.isElMain(this.getTopElNum(elNum));
  }

  isDrggblToBottom(elNum) {
    return this.isElMain(this.getBottomElNum(elNum));
  }

  isDrggblToLeft(elNum) {
    return this.isElMain(this.getLeftElNum(elNum));
  }

  isDrggblToRight(elNum) {
    return this.isElMain(this.getRightElNum(elNum));
  }

  stepsToBottom(elNum) {
    return (this.getMountOfSteps(elNum, 'bottom') - 1);
  }

  stepsTotop(elNum) {
    return (this.getMountOfSteps(elNum, 'top') - 1);
  }

  stepsToRight(elNum) {
    return (this.getMountOfSteps(elNum, 'right') - 1);
  }

  stepsToLeft(elNum) {
    return (this.getMountOfSteps(elNum, 'left') - 1);
  }

  /**
   * @private compute and set stepMatrix function
   * @param {number} elNum element number
   * @param {number} leftRightT is it left param needed 1-left, 2-right, 3-top
   */
  stepsCompute(elNum, leftRightT) {
    if (this.mainElNum === elNum) {
      return;
    }
    this.setCurrentMatrixN();
    // console.log(this.shuffledMatrix);
    if (this.isElOnPropPos(elNum)) {
      return;
    }

    switch (leftRightT) {
      case 1:
        console.log('case 1 LEFT');
        this.toLeft(elNum);
        break;
      case 2:
        console.log('case 2 RIGHT');
        this.toRight(elNum);
        break;
      case 3:
        console.log('case 3 TOP');
        this.toTop(elNum);
        break;
      default:
    }

    // if (this.matrix[elNum - 1].x <= this.getXPXPosition(elNum)) { /* toright !isOnPropRow && !isOnPropCol */
    //   this.toRight(elNum);
    //   if (this.isElOnPropPos(elNum)) {
    //     this.tempLog += `эл на своей позиции${this.tempLogBR}`;
    //     return;
    //   }
    //   this.toTop(elNum);
    //   return;
    // }
    // console.log('toleft');
    // this.toLeft(elNum);
    // if (this.isElOnPropPos(elNum)) {
    //   this.tempLog += `эл на своей позиции${this.tempLogBR}`;
    //   return;
    // }
    // console.log('toTop');
    // this.toTop(elNum);
  }
  // const isOnPropRow = this.isElOnPropPosY(elNum);
  // const isOnPropCol = this.isElOnPropPosX(elNum);
  // const isMElOnTheSameRow = this.matrix[this.mainElNum - 1].y === this.matrix[elNum - 1].y;
  // const isMElOnTheSameCol = this.matrix[this.mainElNum - 1].x === this.matrix[elNum - 1].x;
  // const isMElBefore = this.getCurrentElNumN(this.mainElNum) < this.getCurrentElNumN(elNum);
  // const isMElCanMoveToTheRight = (this.getCurrentElNumN(this.mainElNum) % this.matrixDimensionX) !== 0;
  // const isMElCanMoveToTheLeft = ((this.getCurrentElNumN(this.mainElNum) - 1) % this.matrixDimensionX) !== 0;
  // const isMElCanMoveToTheTop = this.matrix[this.mainElNum - 1].y !== 0;
  // const isMElCanMoveToTheBottom = this.matrix[this.mainElNum - 1].y < ((this.matrixDimensionY - 1) * this.getOffset());
  // const isDrggblToTop = this.isDrggblToTop(elNum);
  // const isDrggblToRight = this.isDrggblToRight(elNum);
  // const isDrggblToBottom = this.isDrggblToBottom(elNum);
  // const isDrggblToLeft = this.isDrggblToLeft(elNum);
  // const stepsToBottom = (this.getMountOfSteps(elNum, 'bottom') - 1);
  // const stepsTotop = (this.getMountOfSteps(elNum, 'top') - 1);
  // const stepsToRight = (this.getMountOfSteps(elNum, 'right') - 1);
  // const stepsToLeft = (this.getMountOfSteps(elNum, 'left') - 1);
  // if (isDrggblToLeft) {
  //   this.tempLog += `эл DrggblToLeft${this.tempLogBR}`;
  // }
  // if (isDrggblToTop) {
  //   this.tempLog += `эл DrggblToTop${this.tempLogBR}`;
  // }
  // if (isDrggblToRight) {
  //   this.tempLog += `эл DrggblToRight${this.tempLogBR}`;
  // }
  // if (isDrggblToBottom) {
  //   this.tempLog += `эл DrggblToBottom${this.tempLogBR}`;
  // }

  // /* гэл */
  // if (isMElBefore) {
  //   this.tempLog += `гэл раньше${this.tempLogBR}`;
  // } else {
  //   this.tempLog += `гэл позже${this.tempLogBR}`;
  // }

  // if (isMElOnTheSameRow) {
  //   this.tempLog += `гэл в одной строке с эл${this.tempLogBR}`;
  // }
  // if (isMElOnTheSameCol) {
  //   this.tempLog += `гэл в одной колонке с эл${this.tempLogBR}`;
  // }

  // if (isMElCanMoveToTheRight) {
  //   this.tempLog += `гэл ходит вправо${this.tempLogBR}`;
  // } else {
  //   this.tempLog += `гэл НЕ ходит вправо${this.tempLogBR}`;
  // }
  // if (isMElCanMoveToTheLeft) {
  //   this.tempLog += `гэл ходит влево${this.tempLogBR}`;
  // } else {
  //   this.tempLog += `гэл НЕ ходит влево${this.tempLogBR}`;
  // }
  // if (isMElCanMoveToTheTop) {
  //   this.tempLog += `гэл ходит вверх${this.tempLogBR}`;
  // } else {
  //   this.tempLog += `гэл НЕ ходит вверх${this.tempLogBR}`;
  // }
  // if (isMElCanMoveToTheBottom) {
  //   this.tempLog += `гэл ходит вниз${this.tempLogBR}`;
  // } else {
  //   this.tempLog += `гэл НЕ ходит вниз${this.tempLogBR}`;
  // }

  /* compute */
  // if (stepsToBottom >= 0) {
  //   this.tempLog += `(вниз) ${(this.getMountOfSteps(elNum, 'bottom') - 1)}${this.tempLogBR}`;
  // }
  // if (stepsTotop >= 0) {
  //   this.tempLog += `(вверх) ${(this.getMountOfSteps(elNum, 'top') - 1)}${this.tempLogBR}`;
  // }
  // if (stepsToRight >= 0) {
  //   this.tempLog += `(вправо) ${(this.getMountOfSteps(elNum, 'right') - 1)}${this.tempLogBR}`;
  // }
  // if (stepsToLeft >= 0) {
  //   this.tempLog += `(влево) ${(this.getMountOfSteps(elNum, 'left') - 1)}${this.tempLogBR}`;
  // }

  // this.tempLog += `гэл НЕ ходит вниз${this.tempLogBR}`;

  /* установить гэл перед эл влево и ход */

  /* если эл может драг влево
    if (!isElOnItsLeftCol {
      console.log('el on its not Left Col');
      if (this.isDrggblToLeft(elNum)) {
        this.setShffldOnElNumAndGooo(elNum);
      }
    } */
  /* если эл может драг вверх
    if (!this.isElOnItsTopRow(elNum)) {
      console.log('el not on its top row');
      if (isDrggblToTop {
        this.setShffldOnElNumAndGooo(elNum, this.matrixDimensionX * (-1));
      }
    } */
  araseMatrix() {
    this.matrix = [];
  }

  setDimentionXY(x) {
    this.matrixDimensionX = !x ? this.defaultDimension : x;
    this.matrixDimensionY = !x ? this.defaultDimension : x;
    this.setMainElNum();
  }

  getElObj(elNum) {
    return {
      x: this.getXPXPosition(elNum),
      y: this.getYPXPosition(elNum),
      ownNum: elNum,
      isMain: elNum === this.getMatrixDimension(),
    };
  }

  // setOffset() {
  //   this.offset = this.dem[this.matrixDimensionX];
  // }

  getXInitElementPosInsideMatrix(elNum) {
    return (elNum - 1) % this.matrixDimensionX;
  }

  getYInitElementPosInsidMatrix(elNum) {
    return parseInt((elNum - 1) / this.matrixDimensionX, 10);
  }

  getYPXPosition(elNum) {
    return this.getYInitElementPosInsidMatrix(elNum) * this.getOffset();
  }

  getXPXPosition(elNum) {
    return this.getXInitElementPosInsideMatrix(elNum) * this.getOffset();
  }

  setPosY(elNum, _y) {
    this.matrix[elNum - 1].y = _y;
  }

  setPosX(elNum, _x) {
    this.matrix[elNum - 1].x = _x;
  }

  setMatrixDimensionX(dimension) {
    this.matrixDimensionX = dimension;
  }

  getMatrixDimension() {
    return this.matrixDimensionX * this.matrixDimensionY;
  }

  setMainElNum() {
    this.mainElNum = this.getMatrixDimension();
  }

  getMainElID() {
    return `elID_${this.mainElNum}`;
  }

  addElObjToMatrix(elNum) {
    this.matrix.push(this.getElObj(elNum));
  }

  // getRandInt() {
  //   return Math.floor(1 + Math.random() * this.getMatrixDimension());
  // }

  makeShuffledMatrix() {
    for (let i = 1, l = this.getMatrixDimension(); i <= l; i++) {
      this.shuffledMatrix.push(i);
    }
    this.shuffledMatrix.sort(() => Math.random() - 0.5);
  }

  makeAllObj() {
    this.makeShuffledMatrix();
    for (let i = 1, l = this.getMatrixDimension(); i <= l; i++) {
      this.addElObjToMatrix(i);
    }
  }

  getElLeftTopCSSProp(elNum) {
    return `left: ${this.getXPXPosition(elNum)}px; top: ${this.getYPXPosition(elNum)}px;`;
  }

  getElBgPosCSSProp(elNum) {
    return `${this.getBackGroundSizeCSS()} background-position: -${this.getXPXPosition(elNum)}px -${this.getYPXPosition(elNum)}px;`;
  }

  isElMain(elNum) {
    return elNum ? this.matrix[elNum - 1].isMain : false;
  }

  getElNumViaLeftTopPos(left, top) {
    try {
      return this.matrix.find((el) => (el.x === left && el.y === top)).ownNum;
    } catch (e) {
      return false;
    }
  }

  getPosX(elNum) {
    return this.matrix[elNum - 1].x;
  }

  getPosY(elNum) {
    return this.matrix[elNum - 1].y;
  }

  getTopElNum(elNum) {
    return this.getElNumViaLeftTopPos(this.getPosX(elNum), this.getPosY(elNum) - this.getOffset());
  }

  getRightElNum(elNum) {
    return this.getElNumViaLeftTopPos(this.getPosX(elNum) + this.getOffset(), this.getPosY(elNum));
  }

  getBottomElNum(elNum) {
    return this.getElNumViaLeftTopPos(this.getPosX(elNum), this.getPosY(elNum) + this.getOffset());
  }

  getLeftElNum(elNum) {
    return this.getElNumViaLeftTopPos(this.getPosX(elNum) - this.getOffset(), this.getPosY(elNum));
  }

  render() {
    this.makeNoMatrixElmnts();
    this.showMatrix();
    this.mainUsrController();
  }

  /*  Timer  */
  startTimer() {
    this.isPaused = false;
    const timerVal = this.getTimerVal() ? this.getTimerVal().split(":") : false;
    let sec = timerVal ? parseInt(timerVal[2], 10) : 0;
    let min = timerVal ? parseInt(timerVal[1], 10) : 0;
    let hr = timerVal ? parseInt(timerVal[0], 10) : 0;
    // const shift = 0;// this.getTimerResult();
    // const start	= Date.now();
    const obResult = this.timer;

    this.timerID = setInterval(() => {
      sec += 1;
      if (sec >= 60) {
        min += 1;
        sec = 0;
      }
      if (min >= 60) {
        hr += 1;
        min = 0;
      }
      obResult.innerText = `${hr.toString().length < 2 ? `0${hr}` : hr}:${min.toString().length < 2 ? `0${min}` : min}:${sec.toString().length < 2 ? `0${sec}` : sec}`;
    }, 1000);
  }

  getTimerVal() {
    return this.timerVal;
  }

  setTimerVal() {
    this.timerVal = this.timer.innerText;
  }

  resetTimer() {
    this.timerVal = null;
    this.startTimer();
  }

  pauseGame() {
    if (!this.isPaused) {
      this.isPaused = true;
      this.setTimerVal();
      clearInterval(this.timerID);
      console.log('paused');
      return;
    }
    this.isPaused = false;
    this.startTimer();
  }

  /*
    View
  */

  /* cssRules ID */
  setStyleSheet() {
    if (this.styleSheet !== null) {
      return;
    }
    const ss = document.styleSheets;
    for (let i = 0, ssLngth = ss.length; i < ssLngth; i++) {
      for (let j = 0, rulesLngth = ss[i].cssRules.length; j < rulesLngth; j++) {
        if (ss[i].cssRules[j].selectorText === '.main-container') {
          this.styleSheet = ss[i];
        }
      }
    }
    // console.log(this.styleSheet);
  }

  setClassRule(selector, styles) {
    this.styleSheet.insertRule(`${selector}{${styles}}`, this.styleSheet.cssRules.length);
  }

  changeCSSClass(el, pre, old, on) {
    const OB = document.getElementById(el);
    OB.classList.remove(pre + old);
    OB.classList.add(pre + on);
  }

  makeAllParts() {
    if (!this.mainContainer) {
      this.el = this.createElNode('div', 'mainContainer', 'main-container pos');
      this.setClassRule('.pos', `top: calc(50% - ${this.getBackGroundSize()}px/2); left: calc(50% - ${this.getBackGroundSize()}px/2);`);
      this.appendToMain(this.el);
      this.mainContainer = document.getElementById('mainContainer');
    }
    this.makeAllObj();

    this.matrix.forEach((elmnt) => {
      this.setClassRule(`.cube-position${elmnt.ownNum}`, `${this.getElLeftTopCSSProp(elmnt.ownNum)}`);
      this.setClassRule(`.cube-bg${elmnt.ownNum}`, this.getElCSS(elmnt.ownNum));
      this.innerEl = document.createElement('div');
      this.innerEl.id = `elID_${elmnt.ownNum}`;
      this.innerEl.dataset.elNum = elmnt.ownNum;
      this.innerEl.classList = `cube-position${elmnt.ownNum} cube-bg${elmnt.ownNum}`;
      this.innerEl.textContent = elmnt.ownNum;
      this.mainContainer.appendChild(this.innerEl);
    });
    // this.appendToMain(this.mainContainer);
  }

  createElNode(type, _id = '', _classList = '', _textContent = '', dataName = '', dataVal = '') {
    const NODE = document.createElement(type);
    if (_id !== '') {
      NODE.id = _id;
    }
    if (dataName !== '') {
      NODE.dataset[dataName] = dataVal;
    }
    if (_classList !== '') {
      NODE.classList = _classList;
    }
    if (_textContent !== '') {
      NODE.textContent = _textContent;
    }
    return NODE;
  }

  appendToMain(node) {
    if (!this.mainEl) {
      this.mainEl = document.getElementById('main');
    }
    this.mainEl.appendChild(node);
  }

  makeDimensionSelect() {
    const SELECT = this.createElNode('select', 'dimSelect', 'selects');
    Object.keys(this.isMobile ? this.dem.mobile : this.dem.desktop).forEach((el) => {
      this.el = this.createElNode('option', '', '', `${el}x${el}`, 'dim', el);
      if (el.toString() === this.defaultDimension.toString()) {
        this.el.selected = true;
      }
      SELECT.appendChild(this.el);
    });
    this.sattingsBoardContainer.appendChild(SELECT);
  }

  makeImagesSelect() {
    const SELECT = this.createElNode('select', 'imgSelect', 'selects');
    for (let el = 1; el <= this.img.imagesAmount; el++) {
      this.el = this.createElNode('option', '', '', `image ${el}`, 'dim', el);
      // if (el.toString() === this.defaultDimension.toString()) {
      //   this.el.selected = true;
      // }
      SELECT.appendChild(this.el);
    }
    this.sattingsBoardContainer.appendChild(SELECT);
  }

  makeHeader() {
    this.appendToMain(this.createElNode('h1', '', '', this.string[this.lang].gemPuzzle));
  }

  makeResetBtn() {
    this.gameBoardContainer.appendChild(this.createElNode('div', 'resetBtn', 'btn centered', this.string[this.lang].resetBtn));
  }

  makeGameDashBoard() {
    this.appendToMain(this.createElNode('div', 'dashBoardContainer', 'dash dash-pos'));
    const w = this.getBackGroundSize();
    this.setClassRule('.dash-pos', `width: ${w}px; left: calc(50% - ${w}px/2); top: calc(50% - ${w - (w > 320 ? 180 : 120)}px);`);
    this.dashBoardContainer = document.getElementById('dashBoardContainer');
  }

  makeSettingsDash() {
    this.appendToMain(this.createElNode('div', 'sattingsBoardContainer', 'dash sattings-board-container'));
    this.sattingsBoardContainer = document.getElementById('sattingsBoardContainer');
  }

  makeGameDash() {
    this.appendToMain(this.createElNode('div', 'gameBoardContainer', 'dash sattings-board-container game-top-mod'));
    this.gameBoardContainer = document.getElementById('gameBoardContainer');
  }

  makeTimer() {
    this.dashBoardContainer.appendChild(this.createElNode('div', 'timer', 'centered', '00:00:00'));
    this.timer = document.getElementById('timer');
  }

  makeStopStartTimerBtn() {
    this.dashBoardContainer.appendChild(this.createElNode('div', 'stopStartBtn', 'btn centered', this.string[this.lang].startBtn));
    this.stopStartBtn = document.getElementById('stopStartBtn');
  }

  makeStepNumber() {
    this.dashBoardContainer.appendChild(this.createElNode('div', 'steps', 'centered', `${this.string[this.lang].step}0`));
    this.stepCounterObj = document.getElementById('steps');
  }

  makeSaveBtn() {
    this.gameBoardContainer.appendChild(this.createElNode('div', 'saveBtn', 'btn centered', this.string[this.lang].saveBtn));
  }

  makeLoadBtn() {
    this.gameBoardContainer.appendChild(this.createElNode('div', 'loadBtn', 'btn centered', this.string[this.lang].loadBtn));
  }

  bestResBtn() {
    this.gameBoardContainer.appendChild(this.createElNode('div', 'bestResBtn', 'btn centered', this.string[this.lang].bestResBtn));
    this.bestResBtnObj = document.getElementById('bestResBtn');
  }

  makeIsSolvingHint() {
    this.appendToMain(this.createElNode('div', 'solvingHint', 'solving-hint centered'));
    this.solvingHint = document.getElementById('solvingHint');
  }

  makeIsWinHint() {
    this.appendToMain(this.createElNode('div', 'winHint', 'win-hint centered'));
    this.winHint = document.getElementById('winHint');
  }

  makeSoundBtn() {
    this.sattingsBoardContainer.appendChild(this.createElNode('div', 'soundBtn', 'btn centered', this.string[this.lang].soundBtn));
    this.soundBtn = document.getElementById('soundBtn');
  }

  makeSoundField() {
    const soundEl = this.createElNode('audio', 'sound1', 'sound-1');
    soundEl.src = 'sounds/sound1.wav';
    this.appendToMain(soundEl);
    this.soundObj = document.getElementById('sound1');
  }

  makeAIStepBtn() {
    // makeAISteps(elNum);
    this.dashBoardContainer.appendChild(this.createElNode('div', 'stepBtn', 'btn centered', this.string[this.lang].stepBtn));
    this.stepBtn = document.getElementById('stepBtn');
  }

  /* important to feat */
  getClassRule(selector) {
    for (let j = 0, l = this.styleSheet.cssRules.length; j < l; j++) {
      if (this.styleSheet.cssRules[j].selectorText === selector) {
        return this.styleSheet.cssRules[j];
      }
    }
    return false;
  }

  getElCSS(elNum) {
    const z = (elNum === this.getMatrixDimension()) ? 'z-index: 0; opacity: 0;' : 'z-index: 1; opacity: 1;';
    return `${this.getElBgPosCSSProp(elNum)} width: ${this.getOffset()}px; height: ${this.getOffset()}px; line-height: ${this.getOffset()}px; ${z}`;
  }

  makeNoMatrixElmnts() {
    this.makeHeader();

    this.makeSettingsDash();

    this.makeDimensionSelect();
    this.makeImagesSelect();

    this.makeSoundBtn();
    this.makeSoundField();

    this.makeGameDash();

    this.makeResetBtn();
    this.makeSaveBtn();
    this.makeLoadBtn();
    this.bestResBtn();

    this.makeGameDashBoard();
    this.makeTimer();
    this.startTimer();
    this.makeStopStartTimerBtn();
    this.makeStepNumber();
    this.makeAIStepBtn();

    this.makeIsSolvingHint();
    this.makeIsWinHint();
  }

  showMatrix() {
    this.makeAllParts();
    this.shuffle();
    this.dragElementInit();
  }

  setAllPartsInItsPos() {
    let ob;
    this.matrix.forEach((el, i) => {
      ob = document.getElementById(`elID_${i + 1}`);
      this.setPosX(i + 1, this.getXPXPosition(i + 1));
      this.setPosY(i + 1, this.getYPXPosition(i + 1));
      ob.className = `wbrdr box-text-color cube-bg${i + 1}`;
      ob.classList.add(`cube-position${i + 1}`);
    });
  }

  // setCurrentMatrix() {
  //   this.shuffledMatrix = [];
  //   Object.keys(this.matrix).forEach((el, i) => {
  //     this.shuffledMatrix.push(this.getCurrentElNum(this.matrix[i].x, this.matrix[i].y));
  //   });
  // }

  isPairEven(start, el) {
    for (let i = start, l = this.shuffledMatrix.length; i < l; i++) {
      // console.log(el +' '+(el !== this.getMatrixDimension())+' '+this.getMatrixDimension().toString());
      if (el > this.shuffledMatrix[i] && el !== this.getMatrixDimension()) {
        this.shuffledMatrixEvenSumm += 1;
        this.tempLog = `${this.tempLog}${el} > ${this.shuffledMatrix[i]}\n`;
      }
    }
  }

  isShuffledMatrixSolving() {
    // this.setCurrentMatrix();
    this.shuffledMatrixEvenSumm = 0;
    // console.log(this.shuffledMatrix);
    this.shuffledMatrix.forEach((el, i) => {
      this.isPairEven(i, el);
      // console.log(`${el}\n${this.tempLog}сумма: ${this.shuffledMatrixEvenSumm}\n`);
      this.tempLog = '';
    });
    // console.log(`lbv ${this.getMatrixDimension() % 2 === 0} plus row: ${this.shuffledMatrixEvenSumm}`);
    if (this.getMatrixDimension() % 2 === 0) {
      this.shuffledMatrixEvenSumm = this.shuffledMatrixEvenSumm + (this.matrix[this.getMatrixDimension() - 1].y / this.getOffset()) + 1;
      // console.log((this.shuffledMatrixEvenSumm % 2 === 0) ? 'solving' : 'not solving');
      return this.shuffledMatrixEvenSumm % 2 === 0;
    }
    // console.log('out '+ (this.shuffledMatrixEvenSumm % 2 !== 0));
    // console.log((this.shuffledMatrixEvenSumm % 2 === 0) ? 'solving' : 'not solving');
    return this.shuffledMatrixEvenSumm % 2 === 0;
  }

  shuffle(m = false) {
    // console.log(this.shuffledMatrix);
    this.shuffledMatrix.forEach((el, i) => {
      // this.shuffleFn(i + 1, el);
      // console.log(`elID_${el} c-pos${i + 1}`);
      this.shuffleFnMakeStep(el, i + 1);
    });
    this.setClassRule(`.cube-bg${this.getMatrixDimension()}`, "opacity: 0;");
    if (!m) {
      if (!this.isShuffledMatrixSolving()) {
        this.resetShuffledMatrix();
        // this.setAllPartsInItsPos();
        console.log('notsolving');
        this.shuffle();
        // this.solvingHint.innerText = this.isShuffledMatrixSolving() ? '' : 'warning! the pazzle can\'t be solved';
      }
      this.winHint.innerText = '';
    }
  }

  shuffleFnMakeStep(elNum, shuffle) {
    const ob = document.getElementById(`elID_${elNum}`);
    ob.className = `wbrdr box-text-color cube-bg${elNum}`;
    ob.classList.add(`cube-position${shuffle}`);
    this.setPosX(elNum, this.getXPXPosition(shuffle));
    this.setPosY(elNum, this.getYPXPosition(shuffle));
    // console.log(`elNum${elNum} ${this.matrix[elNum - 1].x} ${this.matrix[elNum - 1].y}`);
  }

  resetShuffledMatrix() {
    // this.repeated = [];
    this.shuffledMatrix = [];
    this.makeShuffledMatrix();
    this.winHint.innerText = '';
  }

  getCurrentElNum(elNum) {
    return parseInt(this.getPosX(elNum) / this.getOffset(), 10) + 1 + parseInt(this.getPosY(elNum) / this.getOffset(), 10) * this.matrixDimensionY;
  }

  getRightCurrentElNum(elNum) {
    return parseInt((this.getPosX(elNum) + this.getOffset()) / this.getOffset(), 10) + 1 + parseInt(this.getPosY(elNum) / this.getOffset(), 10) * this.matrixDimensionY;
  }

  getLeftCurrentElNum(elNum) {
    return parseInt((this.getPosX(elNum) - this.getOffset()) / this.getOffset(), 10) + 1 + parseInt(this.getPosY(elNum) / this.getOffset(), 10) * this.matrixDimensionY;
  }

  getBottomCurrentElNum(elNum) {
    return parseInt(this.getPosX(elNum) / this.getOffset(), 10) + 1 + parseInt((this.getPosY(elNum) + this.getOffset()) / this.getOffset(), 10) * this.matrixDimensionY;
  }

  getTopCurrentElNum(elNum) {
    return parseInt(this.getPosX(elNum) / this.getOffset(), 10) + 1 + parseInt((this.getPosY(elNum) - this.getOffset()) / this.getOffset(), 10) * this.matrixDimensionY;
  }

  changDrgblClass(id, pred, curElNum, altElNum) {
    this.changeCSSClass(id, pred, curElNum, altElNum);
    this.changeCSSClass(this.getMainElID(), pred, altElNum, curElNum);
  }

  changeObPosVal(elNum) {
    const mainElX = this.getPosX(this.getMatrixDimension());
    const mainElY = this.getPosY(this.getMatrixDimension());
    this.setPosX(this.getMatrixDimension(), this.getPosX(elNum));
    this.setPosY(this.getMatrixDimension(), this.getPosY(elNum));
    this.setPosX(elNum, mainElX);
    this.setPosY(elNum, mainElY);
    if (this.isUserWin() === 'win') {
      // console.log('You win!');
      this.winHint.innerText = `You win! for ${this.step} steps and ${document.getElementById('timer').innerText}`;
      this.setClassRule(`.cube-bg${this.getMatrixDimension()}`, "opacity: 1;");
      document.getElementById(this.getMainElID()).classList.add('animated');
      document.querySelectorAll('[data-el-num]').forEach((el) => {
        el.classList.remove("box-text-color");
        el.classList.add("box-text-color-trnsprnt");
        el.classList.remove('wbrdr');
      });
      this.isPaused = true;
      clearInterval(this.timerID);
    }
    // this.winHint.innerText = 'You win! for '+this.step+' and '+document.getElementById('timer').innerText
  }

  isElOnPropPosX(elNum) {
    return this.matrix[elNum - 1].x === this.getXPXPosition(elNum);
  }

  isElOnPropPosY(elNum) {
    return this.matrix[elNum - 1].y === this.getYPXPosition(elNum);
  }

  isElOnPropPos(elNum) {
    return this.isElOnPropPosX(elNum) && this.isElOnPropPosY(elNum);
  }

  isUserWin() {
    if (this.isElOnPropPos(this.getMatrixDimension())) {
      for (let i = 0, l = this.matrix.length; i < l; i++) {
        if (!this.isElOnPropPos(i + 1)) {
          return false;
        }
      }
      return 'win';
    }
    return false;
  }

  clearSteps() {
    this.step = 0;
    this.stepCounterObj.innerText = `${this.string[this.lang].step}0`;
  }

  changeStepCountNum() {
    this.step += 1;
    this.stepCounterObj.innerText = `${this.string[this.lang].step}${this.step}`;
  }

  /*
    Controller
  */

  dragElementInit() {
    // itElID = 'resetBtn'
    // let tx = 0;
    // let ty = 0;
    // let ofsetX = 0;
    // let ofsetY = 0;
    // const header = document.getElementById(itElID);
    // const ob = header.parentElement;// document.getElementById('last_setings_el_for_toggle_after');
    // if (header) {
    //   header.onmousedown = dragMouseDown;
    //   header.ontouchstart = dragTstart;
    // }

    // function dragTstart(e) {
    //   // cl('Draaag!!!');
    //   e = e || window.event;
    //   // e.preventDefault();
    //   ofsetX = e.targetTouches[0].pageX - header.offsetLeft;
    //   ofsetY = e.targetTouches[0].pageY - header.offsetTop;
    //   document.ontouchend = closeDragElement;
    //   document.ontouchmove = elementTDrag;
    // }
    // function dragMouseDown(e) {
    //   e = e || window.event;
    //   // e.preventDefault();
    //   ofsetX = e.clientX;
    //   ofsetY = e.clientY;
    //   document.onmouseup = closeDragElement;
    //   document.onmousemove = elementDrag;
    // }

    // function elementTDrag(e) {
    //   e = e || window.event;
    //   // e.preventDefault();
    //   tx = e.targetTouches[0].pageX - ofsetX;
    //   ty = e.targetTouches[0].pageY - ofsetY;
    //   header.style.left = `${tx}px`;
    //   header.style.top = `${ty}px`;
    //   console.log(`cstmzr7296 touch xy(${tx},${ty})`);
    // }

    // function elementDrag(e) {
    //   e = e || window.event;
    //   // e.preventDefault();
    //   tx = ofsetX - e.clientX;
    //   ty = ofsetY - e.clientY;
    //   ofsetX = e.clientX;
    //   ofsetY = e.clientY;
    //   header.style.top = `${header.offsetTop - ty}px`;
    //   header.style.left = `${header.offsetLeft - tx}px`;
    // }

    // function closeDragElement() {
    //   document.onmouseup = null;
    //   document.onmousemove = null;
    //   document.ontouchend = null;
    //   document.ontouchmove = null;
    // }
  }

  mainUsrController() {
    const CNTX = this;
    function controlIt(e) {
      if (e.target.id === 'resetBtn') {
        CNTX.resetShuffledMatrix();
        CNTX.setAllPartsInItsPos();
        CNTX.shuffle();
        clearInterval(CNTX.timerID);
        CNTX.resetTimer();
        CNTX.clearSteps();
        return;
      }
      if (e.target.id === 'soundBtn') {
        CNTX.soundBtn.innerText = CNTX.isSound ? CNTX.string[CNTX.lang].soundBtnOFF : CNTX.string[CNTX.lang].soundBtn;
        CNTX.isSound = !CNTX.isSound; /* kind of CNTX.isSound = CNTX.isSound ? false : true; */
        console.log('sound');
        return;
      }
      if (e.target.id === 'stepBtn') {
        CNTX.isAutoMode = !CNTX.isAutoMode; /* kind of CNTX.isAutoMode = CNTX.isAutoMode ? false : true; */
        if (CNTX.isAutoMode) {
          CNTX.makeAISteps();
        }
        return;
      }
      if (e.target.id === 'saveBtn') {
        console.log('save');
        return;
      }
      if (e.target.id === 'loadBtn') {
        console.log('load');
        return;
      }
      if (e.target.id === 'loadBtn') {
        console.log('load');
        return;
      }
      if (e.target.id === 'bestResBtn') {
        console.log('best Result Btn');
        return;
      }
      if (e.target.id === 'stopStartBtn') {
        CNTX.stopStartBtn.innerText = CNTX.isPaused ? CNTX.string[CNTX.lang].stopBtn : CNTX.string[CNTX.lang].startBtn;
        CNTX.pauseGame();
        return;
      }

      if (!e.target.dataset.elNum) {
        return;
      }

      const elNum = e.target.dataset.elNum;
      // const x = CNTX.getPosX(elNum);
      // const y = CNTX.getPosY(elNum);
      const curElNum = CNTX.getCurrentElNum(elNum);

      // if (e.target.dataset.elNum === CNTX.getMatrixDimension().toString()) {
      //   console.log("Main\n");
      //   CNTX.matrix.forEach((element) => {
      //     console.log(element);
      //   });
      //   return;
      // }
      if (CNTX.isPaused) {
        return;
      }
      if (CNTX.isDrggblToTop(elNum)) {
        // console.log('Top');
        CNTX.changeStepCountNum();
        const topCurrentEl = CNTX.getTopCurrentElNum(elNum);
        CNTX.changDrgblClass(e.target.id, 'cube-position', curElNum, topCurrentEl);
        CNTX.changeObPosVal(elNum);
        if (CNTX.isSound) {
          CNTX.soundObj.play();
        }
        return;
      }
      if (CNTX.isDrggblToBottom(elNum)) {
        // console.log('Bottom');
        CNTX.changeStepCountNum();
        const bottomCurrentEl = CNTX.getBottomCurrentElNum(elNum);
        CNTX.changDrgblClass(e.target.id, 'cube-position', curElNum, bottomCurrentEl);
        CNTX.changeObPosVal(elNum);
        if (CNTX.isSound) {
          CNTX.soundObj.play();
        }
        return;
      }
      if (CNTX.isDrggblToRight(elNum)) {
        // console.log('Right');
        CNTX.changeStepCountNum();
        const rightCurrentEl = CNTX.getRightCurrentElNum(elNum);
        CNTX.changDrgblClass(e.target.id, 'cube-position', curElNum, rightCurrentEl);
        CNTX.changeObPosVal(elNum);
        if (CNTX.isSound) {
          CNTX.soundObj.play();
        }
        return;
      }
      if (CNTX.isDrggblToLeft(elNum)) {
        // console.log('Left');
        CNTX.changeStepCountNum();
        const leftCurrentEl = CNTX.getLeftCurrentElNum(elNum);
        CNTX.changDrgblClass(e.target.id, 'cube-position', curElNum, leftCurrentEl);
        CNTX.changeObPosVal(elNum);
        if (CNTX.isSound) {
          CNTX.soundObj.play();
        }
      }

      // console.log("\n\n");

      // console.log(bottomCurrentEl);
      // console.log(`isDrggblToTop:${CNTX.isDrggblToTop(elNum)}`);
      // console.log(`isDrggblToRight:${CNTX.isDrggblToRight(elNum)}`);
      // console.log(`isDrggblToBottom:${CNTX.isDrggblToBottom(elNum)}`);
      // console.log(`isDrggblToLeft:${CNTX.isDrggblToLeft(elNum)}`);

      // console.log(curElNum);
      // console.log(rightCurrentEl);
      // console.log(leftCurrentEl);
      // console.log(bottomCurrentEl);
      // console.log(topCurrentEl);

      // const mainElY = CNTX.getPosY(CNTX.getMatrixDimension());
      // const mainElX = CNTX.getPosX(CNTX.getMatrixDimension());
      // CNTX.setPosY(CNTX.getMatrixDimension(), CNTX.getPosY(elNum));
      // CNTX.setPosX(CNTX.getMatrixDimension(), CNTX.getPosX(elNum));
      // CNTX.setPosY(elNum, mainElY);
      // CNTX.setPosX(elNum, mainElX);
    }

    function controllerMoblTabltDsckVer() {
      const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      // const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      if (w < 480) {
        console.log(w);
        CNTX.isMobile = true;
        CNTX.setOffset();
      } else if (CNTX.isMobile) {
        CNTX.isMobile = false;
        CNTX.setOffset();
      }
    }

    function controlSelect(e) {
      if (e.target.id === 'dimSelect') {
        // console.log(`${e.target.options[e.target.selectedIndex].value} ${e.target.options[e.target.selectedIndex].dataset.dim}`);
        clearInterval(CNTX.timerID);
        CNTX.resetTimer();
        CNTX.clearSteps();
        CNTX.setDimentionXY(e.target.options[e.target.selectedIndex].dataset.dim);
        CNTX.setMainElNum();
        CNTX.setOffset();
        CNTX.mainContainer.innerHTML = "";
        CNTX.araseMatrix();
        CNTX.resetShuffledMatrix();
        CNTX.setAllPartsInItsPos();
        CNTX.showMatrix();

        CNTX.shuffle();
      }
      if (e.target.id === 'imgSelect') {
        CNTX.setClassRule('.main-container div', `background-image: url('../images/${e.target.options[e.target.selectedIndex].dataset.dim}.jpg');`);
      }
    }

    document.onclick = controlIt;
    document.onchange = controlSelect;
    window.onresize = controllerMoblTabltDsckVer;
  }
}

const view = new View();
document.addEventListener("DOMContentLoaded", () => {
  view.render();
});

// shuffleFn(elNum, shuffle) {
//   if (shuffle <= elNum) {
//     return;
//   }
//   if (this.getRepeated(elNum) === elNum) {
//     return;
//   }
//   const ob = document.getElementById(`elID_${elNum}`);
//   const obFake = document.getElementById(`elID_${shuffle}`);

//   ob.className = `cube-bg${elNum}`;
//   ob.classList.add(`cube-position${shuffle}`);

//   obFake.className = `cube-bg${shuffle}`;
//   obFake.classList.add(`cube-position${elNum}`);

//   const mainElX = this.getPosX(shuffle);
//   const mainElY = this.getPosY(shuffle);
//   this.setPosX(shuffle, this.getPosX(elNum));
//   this.setPosY(shuffle, this.getPosY(elNum));
//   this.setPosX(elNum, mainElX);
//   this.setPosY(elNum, mainElY);

//   this.repeated.push(shuffle);
// }

// getRepeated(val) {
//   return this.repeated.find((el) => el === val);
// }