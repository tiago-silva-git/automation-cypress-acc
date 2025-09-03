function generateRandomPassword(length = 12) {
  if (length < 8) {
    throw new Error("Password length must be at least 8 characters");
  }

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!';

  const getRandomChar = (charset) =>
    charset[Math.floor(Math.random() * charset.length)];

  const requiredChars = [
    getRandomChar(upper),
    getRandomChar(lower),
    getRandomChar(numbers),
    getRandomChar(special),
  ];

  const allChars = upper + lower + numbers + special;
  const remainingLength = length - requiredChars.length;
  const remainingChars = Array.from({ length: remainingLength }, () =>
    getRandomChar(allChars)
  );

  const finalPassword = shuffle([...requiredChars, ...remainingChars]);

  return finalPassword;
}

function generateRandomUsername() {
  const prefixes = ['user', 'test', 'qa', 'demo', 'dev'];
  const suffix = Math.floor(1000 + Math.random() * 9000); // Gera número entre 1000 e 9999

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomString = Math.random().toString(36).substring(2, 5); // 3 letras aleatórias

  return `${prefix}_${randomString}${suffix}`;
}

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .join('');
}

module.exports = {
  generateRandomPassword,
  generateRandomUsername,
};