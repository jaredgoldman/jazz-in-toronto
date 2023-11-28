async function request(path, method, data) {
    return (res = await fetch(`http://localhost:1337/api/${path}`, {
        method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    }))
}
