import {Network, Alchemy} from "alchemy-sdk";

const settings = {
    apiKey: "",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// this is the contract we will use for testing purposes
const nftContract = "0x845a007D9f283614f403A24E3eB3455f720559ca";

/** {getNftOwner} will return owner of ERC721 token */
const getNftOwner = async (id: number): Promise<string | undefined> => {
    let retry = 0;

    while(true) {
        try {
            const owner = await alchemy.nft.getOwnersForNft(nftContract, id);
            return owner.owners[0];
        } catch (err) {
            console.log(`error occured, retrying ${retry}`);
            retry++;

            if (retry >= 3) {
                console.log("retry limit, exiting")
                retry = 0;
                break;
            }
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