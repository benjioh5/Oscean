'use strict'

function Aeth (name = null, data = []) {
  Entry.call(this, name, data)

  this.consonant = this.name.substr(0, 1)
  this.vowel = this.name.substr(1, 1)
  this.childspeak = name || data.name
  this.adultspeak = adultspeak(name || data.name)
  this.indexes = []

  this.type = function () {
    return Ø('database').find(`${this.consonant}Y`, true).to_english()
  }

  this.toEn = function () {
    return data[0].toLowerCase()
  }

  this.hasEn = function (target = '') {
    return this.data && this.data instanceof Array ? this.data.indexOf(target.toUpperCase()) > -1 : false
  }

  function adultspeak (cs) {
    const childspeak = cs.toLowerCase()
    const vowels = { 'a': 'ä', 'e': 'ë', 'i': 'ï', 'o': 'ö', 'u': 'ü', 'y': 'ÿ' }

    if (childspeak.length === 2) {
      const c = childspeak.substr(0, 1)
      const v = childspeak.substr(1, 1)
      return v + c
    }
    if (childspeak.length === 4) {
      const c1 = childspeak.substr(0, 1)
      const v1 = childspeak.substr(1, 1)
      const c2 = childspeak.substr(2, 1)
      const v2 = childspeak.substr(3, 1)

      // Complex
      if (v1 === 'i' && v2 === 'a' && c1 === c2) {
        return 'e' + c1
      } else if (v1 === 'a' && v2 === 'o' && c1 === c2) {
        return 'u' + c1
      } else if (v1 === 'i' && v2 === 'a') {
        return c1 + 'e' + c2
      } else if (v1 === 'a' && v2 === 'o') {
        return c1 + 'u' + c2
      }

      // Basics
      if (c1 === c2 && v1 === v2) {
        return vowels[v1] + c1
      } else if (c1 === c2) {
        return c1 + v1 + v2
      } else if (v1 === v2) {
        return c1 + vowels[v1] + c2
      }
    }
    if (childspeak.length === 6) {
      return adultspeak(childspeak.substr(0, 2)) + adultspeak(childspeak.substr(2, 4))
    }
    if (childspeak.length === 8) {
      return adultspeak(childspeak.substr(0, 4)) + adultspeak(childspeak.substr(4, 4))
    }
    return childspeak
  }

  this.toString = function () {
    const en = this.to_english()
    return `<p>{*${this.name.toTitleCase()}*}${this.name.toLowerCase() !== this.adultspeak.toLowerCase() ? ', or ' + this.adultspeak.toTitleCase() : ''} is a {(Lietal)} word${en ? ' that translates to \"' + en + '\" in {(English)}' : ''}.</p>`.toCurlic()
  }
}

function Construction (str) {
  this.str = str

  this.prepare = function (str) {
    return str.replace(/\'/g, " ' ").replace(/\,/g, ' , ').replace(/\?/g, ' ? ').replace(/\!/g, ' ! ')
  }

  this.complete = function (html) {
    return html.replace(/ \' /g, "'").replace(/ \, /g, ', ').replace(/ \? /g, '? ').replace(/ \! /g, '! ').trim()
  }

  this.find = function (target, adultspeak = true) {
    const d = Ø('database').cache.dictionaery
    for (const id in d) {
      if (d[id].to_english() === target.toLowerCase()) {
        return adultspeak ? d[id].adultspeak : d[id].childspeak
      }
    }
    return target
  }

  this.to_septambres = function () {
    return new Septambres(this.toString(false))
  }

  this.toString = function (adultspeak = true) {
    let html = ''
    const str = this.prepare(this.str)
    const parts = str.split(' ')
    for (const id in parts) {
      const part = parts[id]
      html += `${this.find(part, adultspeak)} `
    }
    return this.complete(html)
  }
}
