const hre = require("hardhat");
const { string } = require('hardhat/internal/core/params/argumentTypes');
require("../beneficiary")


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function main() {
    a = await hre.ethers.getSigners()
    let receiverAddress = beneficiary

    while(receiverAddress) {
        for (i in a){
            a = await hre.ethers.getSigners()
            let balance = ethers.utils.formatEther(await a[i].getBalance())
            console.log(a[i].address, balance)
            if (balance > 0.005){
                let amountInEther = (balance - "0.005").toString()
                let tx = {
                    to: receiverAddress,
                    value: ethers.utils.parseEther(amountInEther)
                }
                let txSend = await a[i].sendTransaction(tx)
                console.log(txSend)
            }
        }
        console.log('Taking a break...');
        sec = await sleep(300000);
        console.log('120 seconds later continue...');
    };
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  }); 