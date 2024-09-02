export default function translateInteraction(interaction) {
    switch (interaction) {
        case "like": {
            return "💗"
        }
        case "lol": {
            return "😂"
        }
        default: {
            return "💗"
        }
    }
}