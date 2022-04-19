const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("krishnan");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("vishnu", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain vishnu.krishnan");

  txn = await domainContract.setRecord("vishnu", "vishnu's domain");
  await txn.wait();
  console.log("Set record for vishnu.krishnan");

  const address = await domainContract.getAddress("vishnu");
  console.log("Owner of domain vishnu:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
