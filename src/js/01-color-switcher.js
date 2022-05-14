function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    screen:document.querySelector('body'),
}

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

const colorGenerator = {

    intervalId: null,
    isActive: false,
   
    start() {

        if (this.isActive) {
            return;
        }
       
        refs.startBtn.disabled = true;
        refs.stopBtn.disabled = false;
        this.isActive = true;

        this.intervalId = setInterval(() => {
            refs.screen.style.background = getRandomHexColor();
        }, 1000);
    },

    stop() {
        
        clearInterval(this.intervalId);
        this.isActive = false;
        refs.stopBtn.disabled = true;
        refs.startBtn.disabled = false;
      
    }
}

refs.startBtn.addEventListener('click', () => { colorGenerator.start() });
refs.stopBtn.addEventListener('click', () => { colorGenerator.stop() });

