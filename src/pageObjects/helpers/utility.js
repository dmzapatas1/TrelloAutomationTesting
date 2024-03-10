class Utility {
  createRandomItem (item) {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const newUsername = item + randomNumber;
    return newUsername;
  }

  async getTextLastItem (array) {
    const lengthList = await array.length - 1;
    return await array[lengthList].getText();
  }
}

module.exports = new Utility();
