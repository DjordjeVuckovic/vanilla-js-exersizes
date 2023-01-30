let crashRide = document.querySelector('#crash-ride')
let hiHatTop = document.querySelector('#hihat-top')
const animateCrash = ()=> {
    crashRide.style.transform = 'rotate(-15deg) scale(1.5)'
}
const animateHiHatClosed = () => {
  hiHatTop.style.top = '171px'
}
const animateCrashUp = () => {
    crashRide.style.removeProperty('transform');
    crashRide.style.transform = 'rotate(15deg) scale(1.5)'
}
const animateHiHatOpen = () => {
    hiHatTop.style.removeProperty('top');
}

window.addEventListener('keydown',(event)=>{
    let code = event.keyCode
    let audio = document.querySelector(`audio[data-key="${code}"]`)
    if(audio === null){
        return
    }
    audio.currentTime = 0
    audio.play()
    switch (code) {
        case 69:
            animateCrashUp()
            break
        case 82:
            animateCrash()
            break
        case 75:
            animateHiHatClosed()
            break
        case 73:
            animateHiHatOpen()
            break

    }
})