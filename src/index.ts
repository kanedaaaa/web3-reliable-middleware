//fancy apis
import {Network, Alchemy} from "alchemy-sdk";

//raw abi call
import {ethers} from "ethers";

// other imports
import * as dotenv from 'dotenv';
import fs from "fs";

dotenv.config();

// this is the contract we will use for testing purposes
const nftContract = "0x845a007D9f283614f403A24E3eB3455f720559ca";

const abi = JSON.parse(fs.readFileSync("./src/data/erc721.json", "utf-8"));

const alchemySettings = {
    apiKey: process.env.alchemyPrivKey,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(alchemySettings);

const provider = new ethers.providers.JsonRpcProvider(process.env.infuraPrivKey);
const contract = new ethers.Contract(nftContract, abi, provider)

/** {getNftOwner} will return owner of ERC721 token */
const getNftOwner = async (id: number): Promise<string | undefined> => {
    /*
        i dont care what you think about nested try/catch
        currently only 2 nested try/catch: alchemy and raw abi call
        cry about it
    */
    let owner: any;
    try {
        owner = await alchemy.nft.getOwnersForNft(nftContract, id);
        return owner.owners[0];
    } catch (err) {
        try {
            console.log("retry")
            owner = await contract.ownerOf(id);
            return owner;
        } catch (err) {
            console.log(err)
            console.log("too much retry");
        }
    }
}

/** {getUserNftBalance} will return all the ERC721 tokens user owns */
const getUserNftBalance = async (address: string): Promise<object> => {
    return {};
}

/** {getUserTokenBalance} will return balance of ERC20 tokens that belongs to user */
const getUserTokenBalance = async (address: string): Promise<number> => {
    return 1000;
}

const main = () => {
    getNftOwner(10).then(res => {
        console.log(res)
    });
};

export {main};