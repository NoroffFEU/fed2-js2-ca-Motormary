export async function getKey(name) {
    const key = localStorage.token ?? null

    if (!key) throw new Error("No key in locale storage")
    
    return key
}
