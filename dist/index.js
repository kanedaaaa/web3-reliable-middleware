"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const alchemy_sdk_1 = require("alchemy-sdk");
const settings = {
    apiKey: "",
    network: alchemy_sdk_1.Network.ETH_MAINNET,
};
const alchemy = new alchemy_sdk_1.Alchemy(settings);
// this is the contract we will use for testing purposes
const nftContract = "0x845a007D9f283614f403A24E3eB3455f720559ca";
/** {getNftOwner} will return owner of ERC721 token */
const getNftOwner = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let retry = 0;
    while (true) {
        try {
            const owner = yield alchemy.nft.getOwnersForNft(nftContract, id);
            return owner.owners[0];
        }
        catch (err) {
            console.log(`error occured, retrying ${retry}`);
            retry++;
            if (retry >= 3) {
                console.log("retry limit, exiting");
                retry = 0;
                break;
            }
        }
    }
});
/** {getUserNftBalance} will return all the ERC721 tokens user owns */
const getUserNftBalance = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return {};
});
/** {getUserTokenBalance} will return balance of ERC20 tokens that belongs to user */
const getUserTokenBalance = (address) => __awaiter(void 0, void 0, void 0, function* () {
    return 1000;
});
const main = () => {
    getNftOwner(10).then(res => {
        console.log(res);
    });
};
exports.main = main;
