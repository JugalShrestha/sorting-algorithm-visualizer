//All the doms

const arrayGenerator = document.querySelector('.array-generator');
const arraySpeed = document.querySelector('.array-speed-controller');
const arraySize = document.querySelector('.array-size-controller');
const sortingAlgorithms = document.querySelectorAll('.sorting-algo');
const sorter = document.querySelector('.sorter');

const visualizer = document.querySelector('.visualizer');
const swapDisplay = document.querySelector('.swap-display .text');
const infoAboutAlgo = document.querySelector(".info-about-algo");

const loader = document.querySelector('.loader');
const everything = document.querySelector('.everything');

//--------------Loading screen--------------------

window.addEventListener('load',()=>{
    setTimeout(removeLoader,1000)
})
function removeLoader(){
    loader.style.opacity = "0"
    loader.style.display  = "none"
    setTimeout(load,1000)
}
function load(){
    everything.style.display = "flex"
    everything.style.opacity = "1"
}

//-------------Array maker----------------------

let array = {}

//Deletes array
function deleteArray() {
    array = {}
    while(visualizer.firstChild)
    {
        visualizer.removeChild(visualizer.firstChild)
    }
  }

//New array generator
function generateArray(){
    deleteArray();
    sorter.style.pointerEvents = "all";
    sorter.innerText = "sort";
    swapDisplay.innerText = "...";
    var max = 50;
    var min = 1;
    var size = arraySize.value || Math.floor(Math.random()*(15-4+1)+4)
    if(size<4 || size>15){size=15}
    for(var i = 0 ; i < size ; i++)
    {
        //Now visualizing the array{}
        var number = Math.floor(Math.random()*(max-min+1)+min)
        array[i] =  number
        const div = document.createElement('div')
        div.classList.add('number')
        div.classList.add('unsorted')
        div.innerText = number
        visualizer.appendChild(div)
    }
}

//to generate array on load
generateArray()

//to generate info on load
infoAboutAlgo.innerHTML = "<li>The simplest sorting algorithm.<li>Repeatedly compares adjacent elements and swaps them if they are in the wrong order.<li>The largest elements bubble up to their correct positions in each pass.<li>Time complexity: O(n^2) in the worst and average case, O(n) in the best case (when the array is already sorted)."

arrayGenerator.addEventListener('click',generateArray)

//--------------Algo Selector---------------------------

let algo = 'bubble'

sortingAlgorithms.forEach(algorithm=>{
    algorithm.addEventListener('click',()=>{
        sortingAlgorithms.forEach(algorithm=>{    
            algorithm.style.background = "var(--p-color)"
            algorithm.style.color = "var(--s-color)";
            algorithm.style.boxShadow = '.5vh .5vh var(--n1-color)'
        })
        algo = algorithm.innerText.toLowerCase()
        algorithm.style.background = "var(--n1-color)"
        algorithm.style.color = "var(--p-color)";
        algorithm.style.boxShadow = '.5vh .5vh var(--shadow)'
    })
})

//------------Sorter------------------------

const sleep = (time) =>{
    return new Promise(resolve => setTimeout(resolve,time))
}

function swap(array,i,j)
{
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

async function sort(option){
    var size = visualizer.children.length
    var speed = arraySpeed.value*800 || 800
    //Bubble sort
    switch(option)
    {
        case 'bubble':
            for(var i=0;i < size-1;i++)
            {
                for(var j=0;j<size-i-1;j++)
                {
                    if(array[j]>array[j+1])
                    {
                        visualizer.children[j].classList.add('sorting-2');
                        visualizer.children[j+1].classList.add('sorting-1');
                        swapDisplay.innerText = array[j] + " > "+ array[j+1] + " ,So moving "+ array[j];
                        swap(array,j,j+1);
                        visualizer.children[j].innerText = array[j]
                        visualizer.children[j+1].innerText = array[j+1]
                        await sleep(speed)
                        swapDisplay.innerText = "...";
                        visualizer.children[j].classList.remove('sorting-2')
                        visualizer.children[j+1].classList.remove('sorting-1')
                    }
                    else{
                        visualizer.children[j].classList.add('sorting-2');
                        visualizer.children[j+1].classList.add('sorting-1');
                        swapDisplay.innerText = array[j] + " < "+ array[j+1] + " ,So selected "+array[j+1];
                        await sleep(speed);
                        swapDisplay.innerText = "...";
                        visualizer.children[j].classList.remove('sorting-2');
                        visualizer.children[j+1].classList.remove('sorting-1');
                        
                    }
                }
                swapDisplay.innerText = "Sorted "+array[size-i-1];
                visualizer.children[size-i-1].classList.add('sorted');
                await sleep(speed);
            }
            swapDisplay.innerText = "Sorted!";
            visualizer.firstChild.classList.add('sorted');
            sorter.style.pointerEvents = "all";
            sorter.innerText = "sort";
            break;

        case 'selection':
            console.log('selection sort');
            for (var i = 0; i < size-1; i++)
            {
                var min_idx = i;
                visualizer.children[min_idx].classList.add('sorting-1')
                for (var j = i + 1; j < size; j++)
                {
                    await sleep(speed)
                    if (array[j] < array[min_idx])
                    {
                        min_idx = j;
                        visualizer.children[min_idx].classList.add('sorting-2')
                    }
                }
                swap(array,min_idx, i);
                visualizer.children[i].innerText = array[i]
                visualizer.children[min_idx].innerText = array[min_idx]
                await sleep(speed-500)
                visualizer.children[i].classList.remove('sorting-1')
                visualizer.children[min_idx].classList.remove('sorting-2')
                visualizer.children[i].classList.add('sorted')
            }
            visualizer.lastChild.classList.add('sorted')
            break;

        case 'merge':
            console.log('merge sort');
            break;
        case 'quick':
            console.log('quick sort');
            break;
        case 'insertion': 
            for (i = 1; i < size; i++)
            { 
                let key = array[i]; 
                j = i - 1; 
                visualizer.children[i].classList.add('sorting-1')
                while (j >= 0 && array[j] > key)
                {
                    await sleep(speed) 
                    array[j + 1] = array[j]; 
                    visualizer.children[j+1].classList.add('sorting-2') 
                    visualizer.children[j+1].innerText = array[j]
                    j = j - 1;
                    await sleep(speed-500)    
                    visualizer.children[j+1].classList.remove('sorting-2') 
                } 
                visualizer.children[i].classList.remove('sorting-1')
                array[j + 1] = key; 
                visualizer.children[j+1].innerText = key
                visualizer.children[j+1].classList.add('sorted') 
            } 
            for (i = 0; i < size; i++)
            {
                visualizer.children[i].classList.add('sorted')
            }
            break;

        default:
            console.log('default');
            break;
    }
}

sorter.addEventListener('click',()=>{
    sort(algo)
    sorter.style.pointerEvents = "none";
    sorter.innerText = "sorting!";
})