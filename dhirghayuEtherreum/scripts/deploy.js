const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const gasLimit = 30000000;
  const gasPrice = hre.ethers.utils.parseUnits("5000", "gwei");
  const upload = await Upload.deploy({gasLimit, gasPrice});

  await upload.deployed();

  console.log("Library deployed to:", upload.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
