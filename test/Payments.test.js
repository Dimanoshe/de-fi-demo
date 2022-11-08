const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("Payments", function () {
  let owner
  let signer
  let payments // contract

  beforeEach(async function() {
    [owner, signer] = await ethers.getSigners()
    const Payments = await ethers.getContractFactory("Payments", owner)
    payments = await Payments.deploy()
    await payments.deployed()
  })

  it("should be deployed", async function() {
    expect(payments.address).to.be.properAddress // Address is correct
  })

  it("should have 0 ether by default", async function() {
    const balance = await payments.currentBalance()
    expect(balance).to.eq(0)
  })

  it("should be possible to send funds", async function() {
    // decrease in the sender's balance(-sum)
    // Replenishment of the contract(+sum)
    const sum = 100
    const msg = "hello from hardhat"
    const tx = await payments.connect(signer).pay(msg, { value: sum })
    
    await expect(() => tx)
      .to.changeEtherBalances([signer, payments], [-sum, sum]); 

    await tx.wait()

    const newPayment = await payments.getPayment(signer.address, 0)
    expect(newPayment.message).to.eq(msg)
    expect(newPayment.amount).to.eq(sum)
    expect(newPayment.from).to.eq(signer.address)
  })

  it("should be passible to send owner", async function(){
    const tx = await payments.connect(signer).pay('test phrase', { value: 90 })
    await expect(() => tx)
      .to.changeEtherBalances([signer, payments], [-90, 90]); 
    
  })
})