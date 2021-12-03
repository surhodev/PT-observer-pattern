// Pattern definition

/** Observable subject */
class WeatherStation {

  /** Absolute private props  */
  observers = []
  state = {
    temperature: 5
  }

  /** Public constructor */
  constructor() { }

  /** Public method to add a new Observer */
  add = (observer) => {
    this.observers.push(observer)
  }

  /** Public method to remove an Observer */
  remove = (observer) => {
    for(const i in this.observers) {
      if(this.observers[i] === observer) {
        this.observers.splice(i, 1)
      }
    }
  }

  /** Private method to notify all observers that there is a state modification */
  notify = () => {
    for(const observer of this.observers) {
      observer.update(this.state)
    }
  }

  /** Public method to set the temerature in state */
  setTemperature = (value) => {
    this.state.temperature = value
    this.notify()
  }
}

/** Generic observer subject */
class Observer {

  /** Absolute private props  */
  name = ''
  
  /** Public constructor */
  constructor(name) {
    this.name = name
  }

  /** Public method used by the Observable when notify is called */
  update = (state) => {
    console.log(`I am ${this.name} and I receive the temperature : ${state.temperature}`)
  }
}

// Pattern usage
/** Observable instantiation */
const station = new WeatherStation()

/** Observers instantiations */
const phone1 = new Observer('phone1')
const phone2 = new Observer('phone2')
const display1 = new Observer('display1')
const screen1 = new Observer('screen1')

/** Observers subscription to observable */
station.add(phone1)
station.add(phone2)
station.add(display1)
station.add(screen1)

console.log('--- MANUAL NOTIFICATION ---')
/** It works but we don't have to do this */
station.notify()

console.log('--- REMOVING phone1 ---')
station.remove(phone1)

console.log('--- UPDATING TEMPERATURE & AUTO NOTIFICATION ---')
/** This is the right way to do */
station.setTemperature(26)
