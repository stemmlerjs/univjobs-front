/* randomNameGenerator
 *
 * this function makes a random name fore email name generation and returns it
 *
 * */
const randomGenerator = () => {
    const alphabet = ["a","b","c","d",
                    "e","f","g","h",
                    "i","j","k","l",
                    "m","n","o","p",
                    "q","r","s","t",
                    "u","v","w","x",
                    "y","z"]
    let tempNum = []

  //Generate 4 random digits & store them to it's own array
    for (i=0; i<4; i++) {
        tempNum.push(alphabet[Math.floor(Math.random() * alphabet.length)])
    }

  return tempNum.join('')
}


