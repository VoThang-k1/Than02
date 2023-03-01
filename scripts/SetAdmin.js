const { getContractAt } = require("@nomiclabs/hardhat-ethers/dist/src/helpers");
const { ethers, upgrades } = require("hardhat");

require("dotenv").config();

const PROXY_ADDRESS = process.env.PROXY_ADDRESS;
async function main() {

    [deployer] = await ethers.getSigners();
    const upgradeable = await ethers.getContractAt("Upgradeable", PROXY_ADDRESS);

    console.log("Deploying contracts with the account:", deployer.address);

    //set Admin
    const setAdmin =  await upgradeable.setAdmin(process.env.ADMIN_ADDRESS, "true");
    await setAdmin.wait();
}

main().then(async() => {
    process.exit();
}).catch((error) => {
    console.log(error);
    process.exit(1);
});