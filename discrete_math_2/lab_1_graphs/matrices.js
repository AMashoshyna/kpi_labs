class Matrix {
    constructor(width, height, data) {
        this.width = width
        this.height = height
        if(data) {
            if(!Array.isArray(data)) {
                throw new TypeError('Data columns must be array')
            } else if (data.length !== this.width) {
                throw new Error('Number of columns does not match matrix width')
            } else if(!data.every(item => Array.isArray(item))) {
                throw new TypeError('Data rows must be arrays')
            } else if(!data.every(item => item.length <= this.height)) {
                throw new Error('Number of rows does not match matrix width')
            } else {
                this.data = data
            }
        }

    }
}

function printMatrix(matrix) {
    process.stdout.write('\n')
    for(j = 0; j < matrix.height; j++) {
        process.stdout.write('| ')
        for(i = 0; i < matrix.width; i++) {
            process.stdout.write(matrix.data[i][j] + ' | ')
        }    
        process.stdout.write('\n')
    }
}

function multiplyMatrices(matrixA, matrixB) {
    if(matrixA.width !== matrixB.height) {
        throw new Error('Matrices have unmatching sizes')
    }
    let matrixC = {}
    matrixC.width = matrixB.width // number of columns
    matrixC.height = matrixA.height // items per column
    matrixC.data = []

    for(i = 0; i < matrixC.width; i++) {
        let nextColumn = new Array()
        for(j = 0; j < matrixC.height; j++) {
            let nextItem = matrixB.data[i]
                .reduce(
                    (acc, value, index) => acc + value * matrixA.data[index][i],
                    0
                )

            nextColumn.push(nextItem)
        }
        matrixC.data.push(nextColumn)
    }

    return new Matrix(matrixC.width, matrixC.height, matrixC.data)
}

let m1 = new Matrix(
    5, 6,
    // each inner array represents matrix column
    [
        [1,1,1,1,1,1],
        [2,2,2,2,2,2],
        [3,3,3,3,3,3],
        [4,4,4,4,4,4],
        [5,5,5,5,5,5]
]
)

let m2 = new Matrix(
    3, 5,
    // each inner array represents patrix column
    [
        [1,1,1,1,1],
        [2,2,2,2,2],
        [3,3,3,3,3]
]
)

let m12 = multiplyMatrices(m1, m2)
printMatrix(m12)