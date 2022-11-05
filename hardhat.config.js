require("@nomicfoundation/hardhat-toolbox");
require("./accountsList")
require("./beneficiary")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/" + infuraKey,
      // accounts: accounts
      accounts: accounts
    }
  }
};
