const root = document.querySelector(':root'),
			preview = document.querySelector('.prev'),
			settings = document.querySelector('.settings'),
			modal = document.querySelector('.modal_back'),
			cross = modal.querySelector('.cross'),
			diagramBox = document.querySelector('.diagram'),
			timerBord = diagramBox.querySelector('.timer'),
		  pause = diagramBox.querySelector('.pause'),
			pauseAgain = diagramBox.querySelector('.pause_again'),
		  start = diagramBox.querySelector('.start'),
	    reStart = diagramBox.querySelector('.restart'),
      pom = document.querySelector('#pom'),
      pomText = pom.querySelector('#p_text'),
		  short = document.querySelector('#short'),
 			shortText = short.querySelector('#s_text'),
      long = document.querySelector('#long'),
    	longText = long.querySelector('#l_text'),
		  pomSet = modal.querySelector('#p_set'),
      pomPlus = modal.querySelector('#p_plus'),
      pomMinus = modal.querySelector('#p_minus'),
      shortSet = modal.querySelector('#sh_set'),
      shortPlus = modal.querySelector('#sh_plus'),
      shortMinus = modal.querySelector('#sh_minus'),
      longSet = modal.querySelector('#l_set'),
      longPlus = modal.querySelector('#l_plus'),
			longMinus = modal.querySelector('#l_minus'),
			apply = modal.querySelector('.apply_button'),
		  fontOne = modal.querySelector('#font_one'),
      fontTwo = modal.querySelector('#font_two'),
      fontThree = modal.querySelector('#font_three'),
      colorOne = modal.querySelector('.color_one'),
      colorTwo = modal.querySelector('.color_two'),
      colorThree = modal.querySelector('.color_three'),
      checkMarkOne = colorOne.querySelector('#ch_one'),
      checkMarkTwo = colorTwo.querySelector('#ch_two'),
			checkMarkThree = colorThree.querySelector('#ch_three');
let pomSeconds = 1500, shortSeconds = 300, longSeconds = 900,
		seconds = pomSeconds, prymaryColor = '#F87070', prymaryFont = 'Kumbh Sans',
		timerId;			
		
function minutes(seconds) {
	let minutes = Math.floor(seconds / 60);
	minutes = minutes < 10 ?'0' + minutes : minutes;
	return minutes;
}

function formSeconds(seconds) {
	let formSeconds = seconds % 60;
	formSeconds = formSeconds < 10 ? '0' + formSeconds : formSeconds;
	return formSeconds;
}

function timer(seconds, max) {
  let deg = (360 * seconds / max) + 180;
  if(seconds >= max / 2){
    diagramBox.classList.add('over_50');
  }else{
    diagramBox.classList.remove('over_50');
  }

  diagramBox.querySelector('.piece.right').style.transform = 'rotate('+deg+'deg)';
	timerBord.innerText = `${minutes(seconds)}:${formSeconds(seconds)}`;
	if (seconds > 0) {
		timerId = setTimeout(() => {
			timer(seconds - 1, max);
		}, 1000);
	} else {
		clearTimeout(timerId);
		reStart.classList.remove('h')
		pause.classList.add('h');
	}

	reStart.addEventListener('click', () => {
		reStart.classList.add('h')
		start.classList.remove('h')
	})

	pause.addEventListener('click', () => {
		clearTimeout(timerId);
		pause.classList.add('h');
		pauseAgain.classList.remove('h');
	});
	
	pauseAgain.addEventListener('click',() => {
		clearTimeout(timerId);
		timer(seconds, max)
		pauseAgain.classList.add('h');
		reStart.classList.add('h');
		pause.classList.remove('h');
	})
}

preview.addEventListener('click', () => {
	preview.classList.add('h');
});

settings.addEventListener('click', () => modal.classList.remove('h'));
cross.addEventListener('click', () => modal.classList.add('h'));

fontOne.addEventListener('click', () => {
	prymaryFont = 'Kumbh Sans';
});	
fontTwo.addEventListener('click', () => {
	prymaryFont = 'Roboto Slab';
	timerBord.classList.add('m_top');
});	
fontThree.addEventListener('click', () => {
	prymaryFont = 'Space Mono';
	timerBord.classList.add('m_top');
});	

colorOne.addEventListener('click', () => {
	prymaryColor = '#F87070';
	if (checkMarkOne.classList.contains('h')) {
		checkMarkOne.classList.remove('h');
	}
	if (!checkMarkTwo.classList.contains('h')) {
		checkMarkTwo.classList.add('h');
	}
	if (!checkMarkThree.classList.contains('h')) {
		checkMarkThree.classList.add('h');
	}
});	
colorTwo.addEventListener('click', () => {
	prymaryColor = '#70F3F8';
	if (checkMarkTwo.classList.contains('h')) {
		checkMarkTwo.classList.remove('h');
	}
	if (!checkMarkOne.classList.contains('h')) {
		checkMarkOne.classList.add('h');
	}
	if (!checkMarkThree.classList.contains('h')) {
		checkMarkThree.classList.add('h');
	}
});	
colorThree.addEventListener('click', () => {
	prymaryColor = '#D881F8';
	if (checkMarkThree.classList.contains('h')) {
		checkMarkThree.classList.remove('h');
	}
	if (!checkMarkOne.classList.contains('h')) {
		checkMarkOne.classList.add('h');
	}
	if (!checkMarkTwo.classList.contains('h')) {
		checkMarkTwo.classList.add('h');
	}
});	

pomPlus.addEventListener('click', () => {
	pomSet.innerHTML++;
})
pomMinus.addEventListener('click', () => {
	if (pomSet.innerHTML > 0) {
		pomSet.innerHTML--;
	}		
});

shortPlus.addEventListener('click', () => {
	shortSet.innerHTML++;
})
shortMinus.addEventListener('click', () => {
	if (shortSet.innerHTML > 0) {
		shortSet.innerHTML--;
	}	
});

longPlus.addEventListener('click', () => {
	longSet.innerHTML++;
})
longMinus.addEventListener('click', () => {
	if (longSet.innerHTML > 0) {
		longSet.innerHTML--;
	}	
});

apply.addEventListener('click', () => {
	pomSeconds = pomSet.innerHTML * 60;
	shortSeconds = shortSet.innerHTML * 60;
	longSeconds = longSet.innerHTML * 60;
	root.style.setProperty('--prymary_color', prymaryColor);
	root.style.setProperty('--prymary_font', prymaryFont);
});

pom.addEventListener('click', () => {
	clearTimeout(timerId);
	pom.classList.add('color');
	pomText.classList.add('text_dark');
	pomText.classList.remove('text_light');
	seconds = pomSeconds;
	timerBord.innerText = `${minutes(seconds)}:${formSeconds(seconds)}`;
	if (short.classList.contains('color')) { 
		short.classList.remove('color');
		shortText.classList.remove('text_dark');
		shortText.classList.add('text_light');
	}
	if (long.classList.contains('color')) { 
		long.classList.remove('color');
		longText.classList.remove('text_dark');
		longText.classList.add('text_light');
	}
	start.classList.remove('h')
	pause.classList.add('h');
	pauseAgain.classList.add('h');
	reStart.classList.add('h');
});

short.addEventListener('click', () => {
	clearTimeout(timerId);
	short.classList.add('color');
	shortText.classList.add('text_dark');
	shortText.classList.remove('text_light');
	seconds = shortSeconds;
	timerBord.innerText = `${minutes(seconds)}:${formSeconds(seconds)}`;
	if (pom.classList.contains('color')) { 
		pom.classList.remove('color');
		pomText.classList.remove('text_dark');
		pomText.classList.add('text_light');
	}
	if (long.classList.contains('color')) { 
		long.classList.remove('color');
		longText.classList.remove('text_dark');
		longText.classList.add('text_light');
	}
	start.classList.remove('h')
	pause.classList.add('h');
	pauseAgain.classList.add('h');
	reStart.classList.add('h');
});

long.addEventListener('click', () => {
	clearTimeout(timerId);
	long.classList.add('color');
	longText.classList.add('text_dark');
	longText.classList.remove('text_light');
	seconds = longSeconds;
	timerBord.innerText = `${minutes(seconds)}:${formSeconds(seconds)}`;
	if (pom.classList.contains('color')) { 
		pom.classList.remove('color');
		pomText.classList.remove('text_dark');
		pomText.classList.add('text_light');
	}
	if (short.classList.contains('color')) { 
		short.classList.remove('color');
		shortText.classList.remove('text_dark');
		shortText.classList.add('text_light');
	}
	start.classList.remove('h')
	pause.classList.add('h');
	pauseAgain.classList.add('h');
	reStart.classList.add('h');
});

start.addEventListener('click', () => {
	clearTimeout(timerId);
	timer(seconds, seconds);
	pause.classList.remove('h');
	start.classList.add('h')
});	