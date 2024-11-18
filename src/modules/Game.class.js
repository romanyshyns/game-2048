'use strict';

class Game {
  constructor(initialState) {
    this.initialState = initialState || Game.generateDefaultState();
    this.state = this.initialState.map((row) => [...row]);
    this.status = Game.gameStatuses.idle;
    this.score = 0;
  }

  static generateDefaultState() {
    return Array.from({ length: 4 }, () => Array(4).fill(0));
  }

  static gameStatuses() {
    return {
      idle: 'idle',
      playing: 'playing',
      win: 'win',
      lose: 'lose',
    };
  }

  moveLeft() {
    if (!this.isStateValid(this.state)) {
      return;
    }

    const updatedState = this.state.map((row) => this.applyMove(row));

    this.updateGameState(updatedState);
    this.completeMoveTasks();
  }

  moveRight() {
    const reversedState = this.state.map((row) => [...row].reverse());

    if (!this.isStateValid(reversedState)) {
      return;
    }

    const updatedState = reversedState.map((row) =>
      this.applyMove(row).reverse(),
    );

    if (!this.isStateDifferent(this.state, updatedState)) {
      return;
    }

    this.updateGameState(updatedState);
    this.completeMoveTasks();
  }

  moveUp() {
    const rotatedRightState = this.rotateRight(this.state);

    if (!this.isStateValid(rotatedRightState)) {
      return;
    }

    const newState = rotatedRightState.map((row) => this.applyMove([...row]));
    const rotatedLeftState = this.rotateLeft(newState);

    this.updateGameState(rotatedLeftState);
    this.completeMoveTasks();
  }

  moveDown() {
    const rotatedRightState = this.rotateRight(this.state);

    const rotatedLocaleState = rotatedRightState.map((row) =>
      [...row].reverse(),
    );

    if (!this.isStateValid(rotatedLocaleState)) {
      return;
    }

    const newState = rotatedLocaleState.map((row) =>
      this.applyMove([...row]).reverse(),
    );
    const rotatedLeftState = this.rotateLeft(newState);

    this.updateGameState(rotatedLeftState);
    this.completeMoveTasks();
  }

  applyMove(vector) {
    const newRow = [];
    let i = 0;

    while (i < vector.length) {
      const current = vector[i];
      const next = vector[i + 1];

      if (current) {
        if (current === next) {
          newRow.push(current * 2);
          this.score += current * 2;
          i += 2;
        } else {
          newRow.push(current);
          i++;
        }
      } else {
        i++;
      }
    }

    while (newRow.length < vector.length) {
      newRow.push(0);
    }

    return newRow;
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.state;
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.status = Game.gameStatuses().playing;
    this.completeMoveTasks(2);
  }

  restart() {
    this.resetState();
    this.status = Game.gameStatuses().idle;
    this.score = 0;
  }

  generateNewTile() {
    const emptyCells = this.getEmptyCells();

    if (!emptyCells.length) {
      return;
    }

    const [row, col]
      = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    this.state[row][col] = Math.random() < 0.9 ? 2 : 4;
  }

  getEmptyCells() {
    return this.state
      .flatMap((row, rowIndex) =>
        row.map((cel, colIndex) => (cel === 0 ? [rowIndex, colIndex] : null)),
      )
      .filter((cell) => cell !== null);
  }

  rotateLeft(matrix) {
    return matrix[0].map((_, colIndex) =>
      matrix.map((row) => row[colIndex]).reverse(),
    );
  }

  rotateRight(matrix) {
    return matrix[0].map((_, colIndex) =>
      matrix.map((row) => row[row.length - 1 - colIndex]),
    );
  }

  isStateValid(currentState) {
    if (this.status !== Game.gameStatuses().playing) {
      return false;
    }

    for (const row of currentState) {
      let hasAdjacentEqualCells = false;
      let hasIsolatedEmptyCell = false;

      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
          hasAdjacentEqualCells = true;
          break;
        }

        if (!row[i]) {
          hasIsolatedEmptyCell = true;
        }
      }

      if (hasAdjacentEqualCells || hasIsolatedEmptyCell) {
        return true;
      }
    }

    return false;
  }

  isStateDifferent(stateA, stateB) {
    return JSON.stringify(stateA) !== JSON.stringify(stateB);
  }

  completeMoveTasks(count = 1) {
    for (let i = 0; i < count; i++) {
      this.generateNewTile();
    }

    const state = this.getState();

    if (this.isVictory(state)) {
      this.status = Game.gameStatuses().win;
    } else if (this.isDefeat(state)) {
      this.status = Game.gameStatuses().lose;
    }
  }

  isDefeat(state) {
    if (this.getEmptyCells().length > 0) {
      return false;
    }

    const rotatedRight = this.rotateRight(state);

    return [state, rotatedRight].every(
      (currentState) => !this.isStateValid(currentState),
    );
  }

  isVictory(state) {
    return state.flat().some((tile) => tile === 2048);
  }

  resetState() {
    this.state = this.initialState.map((row) => [...row]);
  }

  updateGameState(state) {
    this.state = state;
  }
}

module.exports = Game;
