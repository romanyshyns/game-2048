!function(){function t(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,a=Array(e);r<e;r++)a[r]=t[r];return a}function r(t,r){if(t){if("string"==typeof t)return e(t,r);var a=Object.prototype.toString.call(t).slice(8,-1);if("Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a)return Array.from(a);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return e(t,r)}}function a(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||r(t)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var n=new/*#__PURE__*/(function(){var e,n;function i(t){!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,i),this.initialState=t||i.generateDefaultState(),this.state=this.initialState.map(function(t){return a(t)}),this.status=i.gameStatuses.idle,this.score=0}return e=[{key:"moveLeft",value:function(){var t=this;if(this.isStateValid(this.state)){var e=this.state.map(function(e){return t.applyMove(e)});this.updateGameState(e),this.completeMoveTasks()}}},{key:"moveRight",value:function(){var t=this,e=this.state.map(function(t){return a(t).reverse()});if(this.isStateValid(e)){var r=e.map(function(e){return t.applyMove(e).reverse()});this.isStateDifferent(this.state,r)&&(this.updateGameState(r),this.completeMoveTasks())}}},{key:"moveUp",value:function(){var t=this,e=this.rotateRight(this.state);if(this.isStateValid(e)){var r=e.map(function(e){return t.applyMove(a(e))}),n=this.rotateLeft(r);this.updateGameState(n),this.completeMoveTasks()}}},{key:"moveDown",value:function(){var t=this,e=this.rotateRight(this.state).map(function(t){return a(t).reverse()});if(this.isStateValid(e)){var r=e.map(function(e){return t.applyMove(a(e)).reverse()}),n=this.rotateLeft(r);this.updateGameState(n),this.completeMoveTasks()}}},{key:"applyMove",value:function(t){for(var e=[],r=0;r<t.length;){var a=t[r],n=t[r+1];a?a===n?(e.push(2*a),this.score+=2*a,r+=2):(e.push(a),r++):r++}for(;e.length<t.length;)e.push(0);return e}},{key:"getScore",value:function(){return this.score}},{key:"getState",value:function(){return this.state}},{key:"getStatus",value:function(){return this.status}},{key:"start",value:function(){this.status=i.gameStatuses().playing,this.completeMoveTasks(2)}},{key:"restart",value:function(){this.resetState(),this.status=i.gameStatuses().idle,this.score=0}},{key:"generateNewTile",value:function(){var t=this.getEmptyCells();if(t.length){var e,a=function(t){if(Array.isArray(t))return t}(e=t[Math.floor(Math.random()*t.length)])||function(t,e){var r,a,n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var i=[],s=!0,o=!1;try{for(n=n.call(t);!(s=(r=n.next()).done)&&(i.push(r.value),2!==i.length);s=!0);}catch(t){o=!0,a=t}finally{try{s||null==n.return||n.return()}finally{if(o)throw a}}return i}}(e,2)||r(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n=a[0],i=a[1];this.state[n][i]=.9>Math.random()?2:4}}},{key:"getEmptyCells",value:function(){return this.state.flatMap(function(t,e){return t.map(function(t,r){return 0===t?[e,r]:null})}).filter(function(t){return null!==t})}},{key:"rotateLeft",value:function(t){return t[0].map(function(e,r){return t.map(function(t){return t[r]}).reverse()})}},{key:"rotateRight",value:function(t){return t[0].map(function(e,r){return t.map(function(t){return t[t.length-1-r]})})}},{key:"isStateValid",value:function(t){if(this.status!==i.gameStatuses().playing)return!1;var e=!0,r=!1,a=void 0;try{for(var n,s=t[Symbol.iterator]();!(e=(n=s.next()).done);e=!0){for(var o=n.value,u=!1,l=!1,c=0;c<o.length-1;c++){if(o[c]===o[c+1]){u=!0;break}o[c]||(l=!0)}if(u||l)return!0}}catch(t){r=!0,a=t}finally{try{e||null==s.return||s.return()}finally{if(r)throw a}}return!1}},{key:"isStateDifferent",value:function(t,e){return JSON.stringify(t)!==JSON.stringify(e)}},{key:"completeMoveTasks",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,e=0;e<t;e++)this.generateNewTile();var r=this.getState();this.isVictory(r)?this.status=i.gameStatuses().win:this.isDefeat(r)&&(this.status=i.gameStatuses().lose)}},{key:"isDefeat",value:function(t){var e=this;if(this.getEmptyCells().length>0)return!1;var r=this.rotateRight(t);return[t,r].every(function(t){return!e.isStateValid(t)})}},{key:"isVictory",value:function(t){return t.flat().some(function(t){return 2048===t})}},{key:"resetState",value:function(){this.state=this.initialState.map(function(t){return a(t)})}},{key:"updateGameState",value:function(t){this.state=t}}],n=[{key:"generateDefaultState",value:function(){return Array.from({length:4},function(){return[,,,,].fill(0)})}},{key:"gameStatuses",value:function(){return{idle:"idle",playing:"playing",win:"win",lose:"lose"}}}],e&&t(i.prototype,e),n&&t(i,n),i}()),i={startButton:document.querySelector(".start"),gameScore:document.querySelector(".game-score"),gameBoardRows:document.querySelectorAll("tr"),messageLose:document.querySelector(".message-lose"),messageWin:document.querySelector(".message-win"),messageStart:document.querySelector(".message-start")},s=i.startButton,o=i.gameScore,u=i.gameBoardRows,l=i.messageLose,c=i.messageWin,f=i.messageStart,h=function(){var t=n.getState();u.forEach(function(e,r){var a=!0,n=!1,i=void 0;try{for(var s,o=e.cells[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var u=s.value;u.textContent="",u.className="field-cell";var l=u.cellIndex,c=t[r][l];0!==c&&(u.textContent=c,u.classList.add("".concat(u.className,"--").concat(c)))}}catch(t){n=!0,i=t}finally{try{a||null==o.return||o.return()}finally{if(n)throw i}}})},v=function(){l.classList.add("hidden"),c.classList.add("hidden"),f.classList.add("hidden"),"win"===n.getStatus()?c.classList.remove("hidden"):"lose"===n.getStatus()?l.classList.remove("hidden"):"idle"===n.getStatus()&&f.classList.remove("hidden")},m=function(){o.textContent=n.getScore()},y=!0;s.addEventListener("click",function(){"Start"===s.textContent?(n.start(),s.textContent="Restart",s.classList.remove("start"),s.classList.add("restart")):"Restart"===s.textContent&&(n.restart(),s.textContent="Start",s.classList.remove("restart"),s.classList.add("start"),m()),h(),v(),y=!0}),document.addEventListener("keydown",function(t){if("idle"!==n.getStatus()){switch(t.key){case"ArrowLeft":n.moveLeft();break;case"ArrowRight":n.moveRight();break;case"ArrowUp":n.moveUp();break;case"ArrowDown":n.moveDown()}y&&(s.textContent="Restart",s.classList.remove("start"),s.classList.add("restart"),y=!1),v(),h(),m()}})}();
//# sourceMappingURL=index.2c33a090.js.map