//All the doms

const arrayGenerator = document.querySelector('.array-generator');
const arraySpeed = document.querySelector('.array-speed-controller');
const arraySize = document.querySelector('.array-size-controller');
const sortingAlgorithms = document.querySelector('.sorting-algo-options');
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

//-------- speed and size --------------------
//------------Sorter------------------------

const sleep = (time) =>{
    return new Promise(resolve => setTimeout(resolve,parseInt(time)))
}

function swap(array,i,j)
{
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

var size = visualizer.children.length;
var speed = arraySpeed.value*800 || 800;

arraySize.addEventListener("change",()=>{
    size = visualizer.children.length;
})
arraySpeed.addEventListener("change",()=>{
    speed = arraySpeed.value * 800;
})

//-----------------All Algorithms---------------

let algorithms = [
    //Bubble sort
    {
        name: "bubble",
        info: "<h1>bubble sort:</h1><li>The simplest sorting algorithm.<li>Repeatedly compares adjacent elements and swaps them if they are in the wrong order.<li>The largest elements bubble up to their correct positions in each pass.<li>Time complexity: O(n^2) in the worst and average case, O(n) in the best case (when the array is already sorted).",
        method: async function(){
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
            arrayGenerator.style.pointerEvents = "all";
            arrayGenerator.innerText = "new array";
        },
    }
    ,
    //Selection sort
    {
        name: "selection",
        info: "<h1>Selection Sort:</h1><li>In each pass, finds the minimum (or maximum) element and moves it to its correct position.<li>Works by dividing the array into two parts: sorted and unsorted.<li>Time complexity: O(n^2) in all cases, as it always scans the unsorted part of the array.",
        method: async function(){
            for (var i = 0; i < size-1; i++)
            {
                var min_idx = i;
                visualizer.children[min_idx].classList.add('sorting-1')
                for (var j = i + 1; j < size; j++)
                {
                    if (array[j] < array[min_idx])
                    {
                        visualizer.children[min_idx].classList.remove('sorting-1');
                        min_idx = j;
                        swapDisplay.innerText = array[j] +" < "+array[min_idx]+" ,So min= "+array[j];
                        visualizer.children[min_idx].classList.add('sorting-1');
                    }
                    else{
                        swapDisplay.innerText = array[j] +" > "+array[min_idx]+" ,So min= "+array[min_idx];
                        visualizer.children[j].classList.add("sorting-2");
                        await sleep(speed);
                        visualizer.children[j].classList.remove("sorting-2");
                    }
                    await sleep(speed)
                }
                visualizer.children[min_idx].classList.remove('sorting-1');
                swapDisplay.innerText = "swapping " + array[min_idx]+ " with "+ array[i];
                swap(array,min_idx, i);
                visualizer.children[i].innerText = array[i]
                visualizer.children[min_idx].innerText = array[min_idx]
                await sleep(speed)
                visualizer.children[i].classList.remove('sorting-1')
                visualizer.children[min_idx].classList.remove('sorting-2')
                swapDisplay.innerHTML = "Sorted "+array[i];
                visualizer.children[i].classList.add('sorted')
            }
            swapDisplay.innerText = "Sorted! ";
            visualizer.lastChild.classList.add('sorted');
            sorter.style.pointerEvents = "all";
            sorter.innerText = "sort";
            arrayGenerator.style.pointerEvents = "all";
            arrayGenerator.innerText = "new array";
        }
    }
]


//--------------Algo Selector---------------------------

let algo = 'bubble'

algorithms.forEach(algorithm=>{
    const div = document.createElement('div');
    div.classList.add('sorting-algo');
    div.innerText = algorithm.name;
    sortingAlgorithms.appendChild(div);
})

const algorithmOptions = document.querySelectorAll(".sorting-algo");

algorithmOptions.forEach((algorithm,index)=>{
    algorithm.addEventListener('click',()=>{
        algorithmOptions.forEach(algorithm=>{    
            algorithm.style.background = "var(--p-color)"
            algorithm.style.color = "var(--s-color)";
            algorithm.style.boxShadow = '.5vh .5vh var(--n1-color)'
        })
        algo = algorithm.innerText.toLowerCase();
        infoAboutAlgo.innerHTML = algorithms[index].info;
        algorithm.style.background = "var(--n1-color)";
        algorithm.style.color = "var(--p-color)";
        algorithm.style.boxShadow = '.5vh .5vh var(--shadow)';
    })
})


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
    size = arraySize.value || Math.floor(Math.random()*(15-4+1)+4)
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
infoAboutAlgo.innerHTML = algorithms[0].info;

arrayGenerator.addEventListener('click',generateArray)

sorter.addEventListener('click',()=>{
    algorithms.forEach(algorithm=>{
        if(algorithm.name == algo)
        {
            algorithm.method();
        }
    })
    sorter.style.pointerEvents = "none";
    sorter.innerText = "sorting!";
    arrayGenerator.style.pointerEvents = "none";
    arrayGenerator.innerText = "Can't rn!"
})