const readline = require('readline');
const util = require('util')

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let verticesCount
let adjacencyMatrix = []

rl.question('Please enter the number of vertices:', (answer) => {
    if(Number(answer)) {
        let verticesCount = Math.round(Number(answer))
        console.log(verticesCount)
        console.log(`Your graph will have ${verticesCount} vertices`)
        let count = 1
        function getData(rl) {
            rl.question(`Please enter comma-separated list of vertices, vertice ${count} is connected to:`, (answer) => {
                let adjacentVertices = answer.trim().split(',')
                adjacencyMatrix.push(adjacentVertices)
                if(count < verticesCount) {
                    count = count + 1
                    getData(rl)
                } else {
                    rl.write(adjacencyMatrix.toString())
                }
            })
        }
        getData(rl)
    } else {
        console.error('Vertices count must be a number!')
    }
});