const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Function to get a random letter
function getRandomLetter() {
  const index = Math.floor(Math.random() * alphabet.length);
  return alphabet[index];
}

// Caesar encryption for one letter
function shiftLetter(letter, shift) {
  const lower = letter.toLowerCase();
  const isUpper = letter === letter.toUpperCase();
  const index = alphabet.indexOf(lower);

  if (index === -1) return letter; // Non-alphabet characters stay the same

  let newIndex = (index + shift) % alphabet.length;
  if (newIndex < 0) newIndex += alphabet.length;

  const shifted = alphabet[newIndex];
  return isUpper ? shifted.toUpperCase() : shifted;
}

// Caesar decryption for one letter
function unshiftLetter(letter, shift) {
  const lower = letter.toLowerCase();
  const isUpper = letter === letter.toUpperCase();
  const index = alphabet.indexOf(lower);

  if (index === -1) return letter;

  let newIndex = (index - shift) % alphabet.length;
  if (newIndex < 0) newIndex += alphabet.length;

  const unshifted = alphabet[newIndex];
  return isUpper ? unshifted.toUpperCase() : unshifted;
}

// Encrypt the full message with random insertions
function encrypt(message, shiftValue) {
  let result = "";
  let letterCount = 0;

  for (let char of message) {
    const encryptedChar = shiftLetter(char, shiftValue);
    result += encryptedChar;

    if (alphabet.includes(char.toLowerCase())) {
      letterCount++;
      if (letterCount % 2 === 0) {
        result += getRandomLetter(); // Insert random letter after every 2 real ones
      }
    }
  }

  return result;
}

// Decrypt full message, skipping random letters
function decrypt(encryptedMessage, shiftValue) {
  let result = "";
  let letterCount = 0;

  for (let i = 0; i < encryptedMessage.length; i++) {
    const char = encryptedMessage[i];

    if (alphabet.includes(char.toLowerCase())) {
      letterCount++;

      if (letterCount % 3 === 0) {
        // This is a random inserted letter – skip it
        continue;
      }

      result += unshiftLetter(char, shiftValue);
    } else {
      result += char; // Keep punctuation, spaces, etc.
    }
  }

  return result;
}
// Inspired by: Springboard Caesar Cipher Reloaded Prompt, random letter insertion idea based on project hints.