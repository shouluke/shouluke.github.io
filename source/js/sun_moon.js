function switchNightMode() {
  // 检查是否已经存在这些元素，避免重复插入
  if (!document.getElementById('sun') || !document.getElementById('moon')) {
    document.querySelector('body').insertAdjacentHTML('beforeend', 
      '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'
    );
  }

  setTimeout(function() {
    if (document.querySelector('body').classList.contains('darkmode--activated')) {
      document.querySelector('body').classList.add('DarkMode');
    } else {
      document.querySelector('body').classList.remove('DarkMode');
    }

    setTimeout(function() {
      const darkSky = document.getElementsByClassName('Cuteen_DarkSky')[0];
      darkSky.style.transition = 'opacity 3s';
      darkSky.style.opacity = '0';
      
      setTimeout(function() {
        darkSky.remove();
      }, 1000);
    }, 2000);
  }, 0);

  var isWhite = document.querySelector('.darkmode-toggle.darkmode-toggle--white');

  // 保持元素透明度的状态，避免重置
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");

  if (isWhite) {
    sun.style.opacity = "1";
    moon.style.opacity = "0";
    setTimeout(function () {
      sun.style.opacity = "0";
      moon.style.opacity = "1";
    }, 1000);
    console.log("light");
  } else {
    sun.style.opacity = "0";
    moon.style.opacity = "1";
    setTimeout(function () {
      sun.style.opacity = "1";
      moon.style.opacity = "0";
    }, 1000);
    console.log("dark");
  }
}

if (document.querySelector('body').classList.contains('darkmode--activated')) {
  document.querySelector('body').classList.add('DarkMode');
}

var Button = document.querySelector('.darkmode-toggle');

if (Button) {
  Button.addEventListener('click', function() {
    switchNightMode();
  });
}