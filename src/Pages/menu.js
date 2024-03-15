import React, { useEffect, useState } from "react";

const Menu = () => {
  const [currentMode, setCurrentMode] = useState(" ");
  const [value, setValue] = useState(" ");
  const [result, setResult] = useState(0);
  const [check, setCheck] = useState(0);

  const onChangeInput = (event) => {
    setValue(event.target.value);
  };

  console.log(currentMode);

  const mainInput = document.querySelector(".input_field");
  const input1 = document.querySelectorAll(".mini_input");
  const button = document.querySelector(".button_check");
  let flag = false;

  /*
AND 1
OR 2
XOR 3
NOT 4
BRACKET_OPEN 5
BRACKET_CLOSED 6
END 7
START 8
A 9
B 10
C 11
 
*/
  class lexer {
    curr;
    s;
    pos = 0;
    n;

    // constructor(){
    //     this.s="";
    //     this.pos=0;
    //     this.curr=8;
    //     this.n=this.s.length;
    // }
    constructor(s1) {
      this.s = s1;
      this.pos = 0;
      this.curr = 8;
      this.n = this.s.length;
    }

    next() {
      if (this.s[this.pos] == "." && this.pos == this.n - 1) {
        this.curr = 7;
      } else if (this.s[this.pos] == "A") {
        this.pos++;
        if (this.pos < this.n && this.s[this.pos] == "N") {
          this.pos += 2;
          this.curr = 1;
        } else {
          this.curr = 9;
        }
      } else if (this.s[this.pos] == "O") {
        this.curr = 2;
        this.pos += 2;
      } else if (this.s[this.pos] == "X") {
        this.curr = 3;
        this.pos += 3;
      } else if (this.s[this.pos] == "C") {
        this.curr = 11;
        this.pos++;
      } else if (this.s[this.pos] == "B") {
        this.curr = 10;
        this.pos++;
      } else if (this.s[this.pos] == "N") {
        this.curr = 4;
        this.pos += 3;
      } else if (this.s[this.pos] == ")") {
        this.curr = 6;
        this.pos++;
      } else if (this.s[this.pos] == "(") {
        this.curr = 5;
        this.pos++;
      } else if (this.s[this.pos] == "=") {
        this.pos++;
        if (this.s[this.pos] == "=") {
          this.pos++;
          this.curr = 13;
        } else {
          this.curr = 12;
          this.pos++;
        }
      } else if (this.s[this.pos] == "+") {
        this.pos++;
        this.curr = 2;
      } else if (this.s[this.pos] == "*") {
        this.pos++;
        this.curr = 1;
      } else if (this.s[this.pos] == "-") {
        this.pos++;
        this.curr = 4;
      } else if (this.pos < this.n && this.s[this.pos] == " ") {
        this.pos++;
        this.next();
      } else {
        //something get wrong
      }
    }

    get() {
      return this.curr;
    }
  }
  let a;
  let b;
  let c;

  class parser {
    l;

    constructor(l1) {
      this.l = l1;
    }

    parseB() {
      if (this.l.get() == 4) {
        this.l.next();
        this.res2 = this.parseB();
        if (this.res2 == 1) {
          return 0;
        } else {
          return 1;
        }
      }
      if (this.l.get() == 9) {
        this.l.next();
        return a;
      }
      if (this.l.get() == 10) {
        this.l.next();
        //console.log("YES ", b);
        return b;
      }
      if (this.l.get() == 11) {
        this.l.next();
        return c;
      }
      if (this.l.get() == 5) {
        this.l.next();
        this.res = this.parseF();
        if (this.l.get() != 6) {
          //что-то не так
        }
        this.l.next();
        return this.res;
      }

      //something gets wrong
    }

    parseA() {
      this.res1 = this.parseB();
      while (this.l.get() == 1) {
        this.l.next();
        this.res1 *= this.parseB();
      }
      return this.res1;
    }

    parseE() {
      this.es1 = this.parseA();
      while (this.l.get() == 2 || this.l.get() == 3) {
        //console.log("?");
        if (this.l.get() == 2) {
          this.l.next();
          this.es1 = Math.max(this.es1, this.parseA());
        } else {
          this.l.next();
          this.es1 = (this.es1 + this.parseA()) % 2;
        }
      }
      return this.es1;
    }

    parseF() {
      this.ress1 = this.parseE();
      //console.log(this.res1)
      while (this.l.get() == 12) {
        this.l.next();
        this.ress = this.parseE();
        if (this.ress1 == 1 && this.ress == 0) {
          this.ress1 = 0;
        } else {
          this.ress1 = 1;
        }
      }
      return this.ress1;
    }

    parseG() {
      this.re1 = this.parseF();
      while (this.l.get() == 13) {
        this.l.next();
        this.re2 = this.parseF();
        if (this.re1 == this.re2) {
          this.re1 = 1;
        } else {
          this.re1 = 0;
        }
      }
      return this.re1;
    }

    parse() {
      this.l.next();
      this.res = this.parseG();
      return this.res;
    }
  }
  function checkk(s) {
    let l = new lexer(s);
    let pos1 = 0;
    let pos2 = -1;
    let token1 = 0;
    let token2 = 0;
    while (l.pos < l.n) {
      l.next();
      if (pos2 == -1) {
        if (
          l.get() == 1 ||
          l.get() == 2 ||
          l.get() == 3 ||
          l.get() == 12 ||
          l.get() == 13
        ) {
          return false;
        }
      }
      pos2 = pos1;
      pos1 = l.pos;
      if (pos1 == pos2) {
        return false;
      }

      if (
        l.get() == 1 ||
        l.get() == 2 ||
        l.get() == 3 ||
        l.get() == 12 ||
        l.get() == 13
      ) {
        token2 = token1;
        console.log("зашел");
        token1 = 1;
      } else {
        if (l.get() == 5 || l.get() == 6 || l.get() == 4) {
        } else {
          token2 = token1;
          token1 = 0;
        }
      }
      if (token1 == 1 && token2 == 1) {
        return false;
      }
    }
    if (l.pos < l.n) {
      return false;
    }
    if (token1 == 1) {
      return false;
    }
    return true;
  }

  function find_solution(s, s1, s2, s3, s4, s5, s6, s7, s8) {
    s = s.toUpperCase();
    let arr = [];
    let ans = 0;
    arr.push(Number(s1));
    arr.push(Number(s2));
    arr.push(Number(s3));
    arr.push(Number(s4));
    arr.push(Number(s5));
    arr.push(Number(s6));
    arr.push(Number(s7));
    arr.push(Number(s8));
    if (!checkk(s)) {
      flag = true;
      return 0;
    }
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
          a = i;
          b = j;
          c = k;
          let l = new lexer(s);
          let p = new parser(l);
          let cura = p.parse();
          if (arr[i * 4 + j * 2 + k] == cura) ans++;
        }
      }
    }
    return ans;
  }

  const checkResult = () => {
    if ((currentMode == 2 || currentMode == 4) && check != 0) {
      console.log(`Чекинг внутри if ${check}`);
      return;
    }
    const arr = [];
    if (currentMode == 1 || currentMode == 2) {
      for (let a of [...input1]) {
        arr.push(a.value);
        arr.push(a.value);
        console.log(arr);
      }
    } else {
      for (let a of [...input1]) {
        arr.push(a.value);
      }
    }
    flag = false;
    let cnt = find_solution(value, ...arr);
    // if (currentMode == 1 || currentMode == 2) {
    //   cnt = find_solution2();
    // }
    if (flag) {
      mainInput.classList.remove("white");
      mainInput.classList.add("red");
      setResult(0);
    } else {
      mainInput.classList.remove("red");
      mainInput.classList.add("white");
      setResult(cnt);
      
      if (currentMode == 2 || currentMode == 4) {
        setCheck(1);
        button.classList.add("red");
      }
    }
  };

  if (currentMode == 1) {
    
    return (
      <>
        <div>
          <span className="title">Введите логическое выражение:</span>
          <form>
            <input class="input_field" onChange={onChangeInput} />
          </form>
          <div className="row">
            <div className="table">
              <div>A</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className="table">
              <div>B</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
            </div>
            <div classname="table">
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            </div>
            <div className="table">
              <div>F</div>
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
            </div>
            </div>
            
          

          <div class="row mt-5 fs-2">
            <div class="col"></div>
  <button
              class="col button_check"
              onClick={() => setCurrentMode(" ")}
            >
              Назад
            </button>
            <button class="button_check" onClick={() => checkResult()}>
              Проверить
            </button>
            <span className="result">Результат: {result / 2} из 4</span>
          </div>
          <div class="guide">
            <details>
              <summary>Правильная запись логического выражения</summary>
              Операция "ИЛИ": OR, + <br />
              Операция "И": AND, * <br />
              Операция "Не": NOT, - <br />
              Операция "xor": XOR <br />
              Операция "Импликация": =&gt; <br />
              Операция "Эквивалентность": == <br />
              Скобки ( ) <br />
              Переменые A, B, C
            </details>
          </div>
          <div class="guide">
            <div class="col">
              <details>
                <summary>Справочник</summary>
                <img src="https://media.discordapp.net/attachments/638404294873186314/1088433519824478259/image.png?ex=66055d35&is=65f2e835&hm=ec7b60a7db5cd9c7aa8b40521261ebac2896556309868ca35cf2c5850a025e0c&=&format=webp&quality=lossless" />
              </details>
            </div>
          </div>
        </div>
      </>
    );
  } else if (currentMode == 2) {
   
    return (
      <>
        <div>
          <span className="title">Введите логическое выражение:</span>
          <form>
            <input class="input_field" onChange={onChangeInput} />
          </form>
          <div className="row">
            <div className="table">
              <div>A</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className="table">
              <div>B</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
            </div>
            <div classname="table">
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            </div>
            <div className="table">
              <div>F</div>
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
            </div>
          </div>

          <div class="row mt-5 fs-2">
            <div class="col"></div>
            <button class="col button_check" onClick={() => checkResult()}>
              Проверить
            </button>
            <span className="result">Результат: {result / 2} из 4</span>
          </div>
          <div class="guide">
            <details>
              <summary>Правильная запись логического выражения</summary>
              Операция "ИЛИ": OR, + <br />
              Операция "И": AND, * <br />
              Операция "Не": NOT, - <br />
              Операция "xor": XOR <br />
              Операция "Импликация": =&gt; <br />
              Операция "Эквивалентность": == <br />
              Скобки ( ) <br />
              Переменые A, B, C
            </details>
          </div>
        </div>
      </>
    );
  } else if (currentMode == 3) {
    
    return (
      <>
        <div>
          <span className="title">Введите логическое выражение:</span>
          <form>
            <input class="input_field" onChange={onChangeInput} />
          </form>
          <div className="row">
            <div className="table">
              <div>A</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className="table">
              <div>B</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className="table">
              <div>C</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
            </div>
            <div classname="table">
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            </div>
            <div className="table">
              <div>F</div>
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
            </div>
          </div>

          <div class="row mt-5 fs-2">
            <div class="col"></div>
<button
              class="col button_check"
              onClick={() => setCurrentMode(" ")}
            >
              Назад
            </button>
            <button class="col button_check" onClick={() => checkResult()}>
              Проверить
            </button>
            <span className="result">Результат: {result} из 8</span>
          </div>
          <div class="guide">
            <details>
              <summary>Правильная запись логического выражения</summary>
              Операция "ИЛИ": OR, + <br />
              Операция "И": AND, * <br />
              Операция "Не": NOT, - <br />
              Операция "xor": XOR <br />
              Операция "Импликация": =&gt; <br />
              Операция "Эквивалентность": == <br />
              Скобки ( ) <br />
              Переменые A, B, C
            </details>
          </div>
<div class="guide">
            <div class="col">
              <details>
                <summary>Справочник</summary>
                <img src="https://media.discordapp.net/attachments/638404294873186314/1088433519824478259/image.png?ex=66055d35&is=65f2e835&hm=ec7b60a7db5cd9c7aa8b40521261ebac2896556309868ca35cf2c5850a025e0c&=&format=webp&quality=lossless" />
              </details>
            </div>
          </div>
        </div>
      </>
    );
  } else if (currentMode == 4) {
    
    return (
      <>
        <div>
          <span className="title">Введите логическое выражение:</span>
          <form>
            <input class="input_field" onChange={onChangeInput} />
          </form>
          <div className="row">
            <div className="table">
              <div>A</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className="table">
              <div>B</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
              <div>0</div>
              <div>0</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div className="table">
              <div>C</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
              <div>0</div>
              <div>1</div>
            </div>
            <div classname="table">
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            <div className="row">
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
              <input className="mini_check_input" />
            </div>
            </div>
            <div className="table">
              <div>F</div>
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
              <input className="mini_input" />
            </div>
          </div>

          <div class="row mt-5 fs-2">
            <div class="col"></div>
            <button class="col button_check" onClick={() => checkResult()}>
              Проверить
            </button>
            <span className="result">Результат: {result} из 8</span>
          </div>
          <div class="guide">
            <details>
              <summary>Правильная запись логического выражения</summary>
              Операция "ИЛИ": OR, + <br />
              Операция "И": AND, * <br />
              Операция "Не": NOT, - <br />
              Операция "xor": XOR <br />
              Операция "Импликация": =&gt; <br />
              Операция "Эквивалентность": == <br />
              Скобки ( ) <br />
              Переменые A, B, C
            </details>
          </div>
          
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="title">Логика и таблица истинности.</div>
        <div className="title"> Выберите режим:</div>
        <a className="menu_item" onClick={() => setCurrentMode(1)}>
          1. Пробная работа - 2 переменные
        </a>
        <br />
        <a className="menu_item" onClick={() => setCurrentMode(2)}>
          2. Контрольная работа - 2 переменные
        </a>
        <br />
        <a className="menu_item" onClick={() => setCurrentMode(3)}>
          3. Пробная работа - 3 переменные
        </a>
        <br />
        <a className="menu_item" onClick={() => setCurrentMode(4)}>
          4. Контрольная работа - 3 переменные
        </a>
      </div>
    </>
  );
};

export default Menu;
