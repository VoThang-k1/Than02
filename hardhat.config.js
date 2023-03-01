require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();

const fs = require('fs');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.2",
    networks: {
        // polygonMainnet: {
        //     url: process.env.POLYGONMAINNET_RPC,
        //     accounts: [process.env.PRIVATE_KEY],
        // },
        polygonTestnet: {
            url: process.env.POLYGONTESTNET_RPC,
            accounts: [process.env.PRIVATE_KEY],
            gasPrice: 8000000000,
        },
        bscTestnet: {
            url: process.env.RPC_ULR,
            accounts: [process.env.PRIVATE_KEY],
            // gasPrice: 8000000000,
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    },
};