//All the doms

const arrayGenerator = document.querySelector('.array-generator')
const arraySpeed = document.querySelector('.array-speed-controller')
const arraySize = document.querySelector('.array-size-controller')
const sortingAlgorithms = document.querySelectorAll('.sorting-algo')
const sorter = document.querySelector('.sorter')

const visualizer = document.querySelector('.visualizer')

const blocker = document.querySelector('.blocker')
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
    deleteArray()
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

arrayGenerator.addEventListener('click',generateArray)

//------------Sorter------------------------

const sleep = (time) =>{
    return new Promise(resolve => setTimeout(resolve,time))
}

async function sort(){
    blocker.style.display = "block"
    var size = visualizer.children.length
    var speed = arraySpeed.value*1000 || 1000
    //Bubble sort
    for(i=0;i < size-1;i++)
    {
        for(j=0;j<size-i-1;j++)
        {
            await sleep(speed)
            if(array[j]>array[j+1])
            {
                visualizer.children[j].classList.add('sorting-1')
                visualizer.children[j+1].classList.add('sorting-2')
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                visualizer.children[j].innerText = array[j]
                visualizer.children[j+1].innerText = array[j+1]
                await sleep(speed-500)
                visualizer.children[j].classList.remove('sorting-1')
                visualizer.children[j+1].classList.remove('sorting-2')
            }
        }
        visualizer.children[size-i-1].classList.add('sorted')
    }
    visualizer.firstChild.classList.add('sorted') 
    
    blocker.style.display = "none"
}

sorter.addEventListener('click',sort)