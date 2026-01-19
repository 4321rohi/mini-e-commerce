const storeProducts = async (req, res) => {
  try {

    res.json({ message: "hi hello" });

  } catch (error) {
    console.log(error);
  }
}

module.exports = { storeProducts }