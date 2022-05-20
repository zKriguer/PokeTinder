

(async function () {
    pickRandom()
    function animateMatch(){
        let main = document.querySelector('main')
        main.classList.add('fadeout')
        let heart = document.getElementsByClassName('animate-heart')[0]
        heart.style.display = 'flex'
        setTimeout(() => {
            main.classList.remove('fadeout')
            heart.style.display = 'none'
        }, 600);
    }

    function animateDont(){
        let main = document.querySelector('main')
        main.classList.add('fadein')
        let x = document.getElementsByClassName('animate-x')[0]
        x.style.display = 'flex'

        setTimeout(() => {
            main.classList.remove('fadein')
            x.style.display = 'none'
        }, 600);
    }

    let matchId = document.getElementById('match')
    let dontId = document.getElementById('dont')
    dontId.addEventListener('click', ()=>{
        pickRandom()
        animateDont()
    })
    let array = JSON.parse(localStorage.getItem('matchs')||'[]');
    console.log(array)
    let name ;
    matchId.addEventListener("click", async () => {
            array.push({imagem:avatar.src, nome:name})
            localStorage.setItem('matchs', JSON.stringify(array))
            pickRandom()
            animateMatch()
    });
    
    async function pickRandom() {
        let api = 'https://pokeapi.co/api/v2/pokemon?limit=1126'
        let response = await (await fetch(api)).json()
        let image = document.getElementById('avatar')
        let randomNumber = response.results[Math.floor(Math.random() * response.results.length)]
        let pokemons = randomNumber
        //FINAL FORM TO RESPONSE VARIABLE - RE-USE
        response = await (await fetch(pokemons.url)).json()
        let avatar = response.sprites.other.home.front_default
        image.src= avatar
        let nameId = document.getElementById('name')
        name = pokemons.name
        nameId.innerHTML = name.charAt(0).toUpperCase() + name.slice(1)
        let descricao = document.getElementById('descricao')
        let main = document.querySelector('main')
        let hp = response.stats[0].base_stat 
        if(hp >=100){
            main.style.backgroundColor = "#daa520";
            nameId.innerHTML = name.charAt(0).toUpperCase() + name.slice(1) + ' LEGEND'
        }
        else{
            main.style.backgroundColor = "var(--radical-red)";
        }
        //seleção de dados para a descrição - HP ATTACK ETC
        let stats = response.stats.map(function (elemento){
            return `<div class="grid"><p class="statname">${elemento.stat.name.toUpperCase()}</p> <p>${elemento.base_stat.toString()}</p> </div>`
        })
        descricao.innerHTML = `<h2 class="title"> Stats</h2> <div class="stats">${stats.join('\n')}</div>`
    }
})()
