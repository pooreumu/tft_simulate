import { useState } from "react";

function App() {
  const oneGoldChamp = ["니달리", "레오나", "블라디미르", "세나", "세주아니", "세트", "스카너", "아트록스", "이즈리얼", "카르마", "타릭", "탐켄치", "하이머딩거"];
  const twoGoldChamp = ["나르", "나미", "릴리아", "브라움", "쉔", "쓰레쉬", "애쉬", "요네", "징크스", "케인", "키아나", "트리스타나", "트위치"];
  const threeGoldChamp = ["누누", "다이애나", "라이즈", "룰루", "리신", "바루스", "볼리베어", "사일러스", "스웨인", "애니비아", "엘리스", "올라프", "일라오이"];
  const fourGoldChamp = ["니코", "소나", "오른", "자야", "코르키", "탈론", "헤카림"];
  const fiveGoldChamp = ["바드", "소라카", "야스오", "조이", "파이크"];
  const eightGoldChamp = ["다에야", "사이펜", "시오유", "이다스"];
  const tenGoldChamp = ["쉬바나", "아오 신", "아우렐리온 솔"];

  const oneGoldChampList = oneGoldChamp.map((e) => ({ name: e, gold: 1 }));
  const twoGoldChampList = twoGoldChamp.map((e) => ({ name: e, gold: 2 }));
  const threeGoldChampList = threeGoldChamp.map((e) => ({ name: e, gold: 3 }));
  const fourGoldChampList = fourGoldChamp.map((e) => ({ name: e, gold: 4 }));
  const fiveGoldChampList = fiveGoldChamp.map((e) => ({ name: e, gold: 5 }));
  const eightGoldChampList = eightGoldChamp.map((e) => ({ name: e, gold: 8 }));
  const tenGoldChampList = tenGoldChamp.map((e) => ({ name: e, gold: 10 }));

  const onePool = [];
  const twoPool = [];
  const threePool = [];
  const fourPool = [];
  const fivePool = [];
  const eightPool = [];
  const tenPool = [];

  const field = [];

  const percent = [
    [100, 0, 0, 0, 0],
    [100, 0, 0, 0, 0],
    [75, 25, 0, 0, 0],
    [55, 30, 15, 0, 0],
    [45, 33, 20, 2, 0],
    [25, 40, 30, 5, 0],
    [19, 30, 35, 15, 1],
    [15, 20, 35, 25, 5],
    [10, 15, 30, 30, 15],
  ];
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const initChampPool = () => {
    for (let i = 0; i < 29; i++) {
      onePool.push(...oneGoldChampList);
    }
    for (let i = 0; i < 22; i++) {
      twoPool.push(...twoGoldChampList);
    }
    for (let i = 0; i < 18; i++) {
      threePool.push(...threeGoldChampList);
    }
    for (let i = 0; i < 12; i++) {
      fourPool.push(...fourGoldChampList);
    }
    for (let i = 0; i < 10; i++) {
      fivePool.push(...fiveGoldChampList);
    }
    for (let i = 0; i < 12; i++) {
      eightPool.push(...eightGoldChampList);
    }
    for (let i = 0; i < 10; i++) {
      tenPool.push(...tenGoldChampList);
    }
  };

  const levelChampPool = () => {};
  initChampPool();

  const initpickChampList = ["", "", "", "", ""];
  const requireExp = [0, 2, 2, 6, 10, 20, 36, 56, 80];
  const [gold, setGold] = useState(1);
  const [stage, setStage] = useState(1);
  const [round, setRound] = useState(2);
  const [level, setLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(2);
  const [pickChampList, setPickChampList] = useState(initpickChampList.map((e, i) => onePool.splice(getRandomInt(0, onePool.length), 1)[0]));
  const [champBasketList, setChampBasketList] = useState([
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
    { name: "", gold: 0 },
  ]);

  const onClickReroll = () => {
    if (gold > 1)
      setGold((prev) => {
        reroll();
        return (prev -= 2);
      });
  };
  const reroll = () => {
    setPickChampList((prev) =>
      prev.map((e, i) => {
        onePool.push(e);
        return onePool.splice(getRandomInt(0, onePool.length), 1)[0];
      })
    );
  };
  const onClickLevelUp = () => {
    if (gold > 3) {
      setGold((prev) => prev - 4);
      setExp((prev) => {
        prev += 4;
        if (prev >= maxExp) levelUp(prev - maxExp);
        else return prev;
      });
    } else {
      console.log("empty gold");
    }
  };

  const levelUp = (remainedExp) => {
    setExp((prev) => (prev = remainedExp));
    setLevel((prev) => {
      const nextLevel = prev + 1;
      setMaxExp((prev) => (prev = requireExp[nextLevel]));
      return nextLevel;
    });
  };

  const nextRound = () => {
    // stage
    if (stage === 1 && round === 4) {
      setStage((prev) => prev + 1);
      setRound((prev) => (prev = 1));
    } else {
      if (round === 7) {
        setStage((prev) => prev + 1);
        setRound((prev) => (prev = 1));
      } else {
        setRound((prev) => prev + 1);
      }
    }

    if (stage === 1 || (stage > 1 && round !== 4)) {
      // 이자 gold
      if (gold > 49) setGold((prev) => prev + 5);
      else if (gold > 39) setGold((prev) => prev + 4);
      else if (gold > 29) setGold((prev) => prev + 3);
      else if (gold > 19) setGold((prev) => prev + 2);
      else if (gold > 9) setGold((prev) => prev + 1);

      // round gold
      if (stage === 1) {
        if (round === 1) setGold((prev) => prev + 1);
        if (round === 2 || round === 3) setGold((prev) => prev + 2);
        if (round === 4) setGold((prev) => prev + 3);
      } else if (stage === 2 && round === 1) setGold((prev) => prev + 4);
      else {
        setGold((prev) => prev + 5);
      }

      // exp
      setExp((prev) => {
        prev += 2;
        if (prev >= maxExp) levelUp(prev - maxExp);
        else return prev;
      });
      reroll();
    }
  };

  const buyChamp = (index) => {
    const checkBasket = champBasketList.filter((e) => e.name === "");
    if (gold >= pickChampList[index].gold && checkBasket.length >= 1) {
      champBasketList[champBasketList.findIndex((e) => e.name === "")] = pickChampList[index];
      setChampBasketList((prev) => champBasketList);
      const minusGold = pickChampList[index].gold;
      setGold((prev) => prev - minusGold);
      pickChampList[index] = { name: "", gold: 0 };
      setPickChampList((prev) => pickChampList);
    }
  };
  const sellChamp = (index) => {
    const plusGold = champBasketList[index].gold;
    setGold((prev) => prev + plusGold);
    champBasketList[index] = { name: "", gold: 0 };
  };
  return (
    <div>
      <h1>Welcome Back!</h1>
      <h6>
        스테이지:{stage}/{round}
      </h6>
      <h6>레벨: {level}</h6>
      <h6>
        경험치: {exp}/{maxExp}
      </h6>
      <h6>골드: {gold}</h6>

      <table>
        {field.map((e) => (
          <td>
            <button>{e.name}</button>
          </td>
        ))}
      </table>
      <table>
        <tbody>
          <tr>
            {champBasketList.map((e, i) => (
              <td key={i}>
                <button onClick={() => sellChamp(i)}>{e.name}</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            {pickChampList.map((e, i) => (
              <td key={i}>
                <button onClick={() => buyChamp(i)}>{e.name}</button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <button onClick={onClickReroll}>새로고침</button>
      <button onClick={onClickLevelUp}>레벨업</button>
      <button onClick={nextRound}>다음라운드</button>
    </div>
  );
}

export default App;
