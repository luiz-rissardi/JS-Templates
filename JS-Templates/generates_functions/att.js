function* generate() {
    const response = yield fetch("https://jsonplaceholder.typicode.com/users")
    const data = yield response.json()
    return data
}

function master(generator) {
    return new Promise((resolve, reject) => {
        try {
            const generate = generator();
            function generators(data) {
                if (data.done) {
                    resolve(data)
                } else {
                    resolve(data.value).then(response => {
                        return generators(generate.next(response))
                    })
                }
            }
            generators(generate.next())
        } catch (error) {
            reject(error)
        }
    })
}

async function main() {
    const data = await master(generate)
    console.log(await data.json())
}

main()