interface Player {
  name: string;
  point: number;
  ranking: string;
}
const players: Player[] = [
  { name: "Nguyễn Khánh Huyền", point: 0, ranking: "no-ranking" },
  { name: "Lê Minh Hải", point: 5, ranking: "no-ranking" },
  { name: "Trần Bảo Minh", point: 10, ranking: "no-ranking" },
];
if (!localStorage.getItem("players")) {
  localStorage.setItem("players", JSON.stringify(players));
}

//Render players
function renderPlayers(): void {
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  function sumPoint(): number {
    let sum = 0;
    for (let i = 0; i < players.length; i++) {
      sum += Number(players[i].point);
    }
    return sum;
  }
  const sum = sumPoint();
  const pointBoardElement = document.querySelector(
    ".point-board"
  ) as HTMLElement;
  let pointBoardElementContent = `<table>
  <tr>
      <td>Players:</td>
      <td>${players.length}</td>
  </tr>
  <tr>
      <td>Total Points:</td>
      <td>${sum}</td>
  </tr>
</table>`;
  const mainElement = document.querySelector("main") as HTMLElement;
  let mainElementContent = "";
  for (let i = 0; i < players.length; i++) {
    mainElementContent += `<section class="player-info">
    <div class="group-icon">
    <div class="delete-button">
    <i class="fa-solid fa-xmark" onclick="handleDelete(${i})"></i>
  </div>
        <i class="fa-solid fa-crown ${players[i].ranking}" id="crown"></i>
        <p class="player-name">${players[i].name}</p>
    </div>
    <div class="point-grade">
        <i class="fa-solid fa-minus pg icon-minus" onclick="handleMinus(${i})"></i>
        <span class="point pg">${players[i].point}</span>
        <i class="fa-solid fa-plus pg" onclick="handlePlus(${i})"></i>
    </div>
  
</section>`;
  }
  pointBoardElement.innerHTML = pointBoardElementContent;
  mainElement.innerHTML = mainElementContent;
  updateRanking();
}
renderPlayers();

// Add players
function handleAdd(): void {
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  const inputPlayerName = (
    document.querySelector(".input-player") as HTMLInputElement
  ).value;
  const inputPlayer: Player = {
    name: inputPlayerName,
    point: 0,
    ranking: "no-ranking",
  };
  players.push(inputPlayer);
  localStorage.setItem("players", JSON.stringify(players));
  (document.querySelector(".input-player") as HTMLInputElement).value = "";
  renderPlayers();
}

// + & -
function handlePlus(i: number): void {
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  players[i].point++;

  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}
function handleMinus(i: number): void {
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  players[i].point--;
  if (players[i].point < 0) {
    players[i].point = 0;
  }
  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}

// Rank
function updateRanking(): void {
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  let maxPoint = 0;

  // max point
  for (let i = 0; i < players.length; i++) {
    if (players[i].point > maxPoint) {
      maxPoint = players[i].point;
    }
  }

  // Update rank
  for (let i = 0; i < players.length; i++) {
    if (players[i].point === maxPoint) {
      players[i].ranking = "top-ranking";
    } else {
      players[i].ranking = "no-ranking";
    }
  }
  localStorage.setItem("players", JSON.stringify(players));
  renderPlayers();
}

//Delete player
function handleDelete(i: number): void {
  const players: Player[] = JSON.parse(localStorage.getItem("players") || "[]");
  if (i >= 0 && i < players.length) {
    players.splice(i, 1);
    localStorage.setItem("players", JSON.stringify(players));
    renderPlayers();
  }
}
