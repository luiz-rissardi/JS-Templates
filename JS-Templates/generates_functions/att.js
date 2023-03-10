function* getRepoInGitHub(){
    const resolve = yield fetch("https://api.github.com/users/timmywheels/repos")
    const data = yield resolve.json()
    return data
}

ProcessAsync(getRepoInGitHub).then(console.log)

function ProcessAsync(generator){
    return new Promise((resolve,reject)=>{
        try {
            const initGenerator =  generator()
            resolveNextGeneration(initGenerator.next())
            function resolveNextGeneration(dataGenerate){
                if(dataGenerate.done){
                    resolve(dataGenerate.value)
                }else{
                    Promise.resolve(dataGenerate.value).then(response =>{
                        resolveNextGeneration(initGenerator.next(response))
                    })
                }
            }
        } catch (error) {
            reject( new Error(" um erro foi lançado ao ar"))
        }
    })
}

