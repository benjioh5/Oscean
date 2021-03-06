'use strict'

function Status (logs) {
  this.toString = function () {
    const len = 14
    const today = new Arvelie()
    const now = new Horaire(logs.filter(__onlyCurrentMonth))
    const average = new Horaire(logs.filter(__onlyPast365))
    const elapsed = parseInt(now.range.to.time.d)

    return `
    <div class='status'>
      <ul>
        <li><b style='color:#72dec2'>Devine Lu Linvega</b></li>
        <li style='color:#666; border-bottom:1.5px solid #333; padding-bottom:10px; margin-bottom:10px'>${now.range.from.time}—${today}, ${14 - today.d} days left</li>
        ${_item('Stamina', (now.fh * elapsed), (average.fh * len))}
        ${_item('Productivity', (now.ch * elapsed), average.ch * len)}
        ${_item('Focus', (now.os * elapsed), average.os * len)}
      </ul>
      <hr />
    </div>`
  }

  function _rating (val, max) {
    return (val / max) > 0.6 ? 'high' : (val / max) > 0.4 ? 'med' : 'low'
  }

  function _progress (val, max, width = 40) {
    return `<svg style='width:${width}px' class='${_rating(val, max)}'><rect x='0' y='0' width='${parseInt((val / max) * width)}' height='13'/></svg>`
  }

  function _item (name, val, max) {
    return `<li class='${name}'><b>${name}</b> <span class='score'>${parseInt(max - val)}/${parseInt(max)}<i>${name.substr(0, 1)}P</i></span> ${_progress(max - val, max)}</li>`
  }
}
