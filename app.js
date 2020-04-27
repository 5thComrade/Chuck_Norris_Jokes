document.querySelector('#main-form').addEventListener('submit', getJokes);
const num = document.querySelector('#value');

function getJokes(e) {
    if(num.value > 5) {
        const alert = document.querySelector('#alert');
        if(alert.childElementCount < 1) {
            alert.className = 'alert alert-danger';
            const p = document.createElement('p');
            p.innerHTML = `I can't crack ${num.value} jokes...try 5 xD`;
            alert.appendChild(p);
            setTimeout(function() {
                alert.removeChild(p);
                alert.className = '';
            }, 2000);
        }
        num.value = '';  
    } else {
         const xhr = new XMLHttpRequest();
         xhr.open('GET', `http://api.icndb.com/jokes/random/${num.value}` , true);

         xhr.onload = function() {
             if(this.status === 200) {
                 const response = JSON.parse(this.responseText);
                 let output = ''

                 if(response.type === 'success') {
                    response.value.forEach(function(joke){
                        output += `<li>${joke.joke}</li>`;
                    })
                 } else {
                     output += '<li>Something Went Wrong!!!</li>';
                 }
                 const ul = document.querySelector('#jokes');
                 ul.innerHTML = output;
             }
         }
         xhr.send();
         setTimeout(function() {
            num.value = '';
         }, 2500);
        }

    e.preventDefault();
}

