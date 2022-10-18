"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
//fancy apis
const alchemy_sdk_1 = require("alchemy-sdk");
//raw abi call
const ethers_1 = require("ethers");
// other imports
const dotenv = __importStar(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv.config();
// this is the contract we will use for testing purposes
const nftContract = "0x845a007D9f283614f403A24E3eB3455f720559ca";
const abi = JSON.parse(fs_1.default.readFileSync("./src/data/erc721.json", "utf-8"));
const alchemySettings = {
    apiKey: process.env.alchemyPrivKey,
    network: alchemy_sdk_1.Network.ETH_MAINNET,
};
const alchemy = new alchemy_sdk_1.Alchemy(alchemySettings);
const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.infuraPrivKey);
const contract = new ethers_1.ethers.Contract(nftContract, abi, provider);
/** {getNftOwner} will return owner of ERC721 token */
const getNftOwner = (id) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        i dont care what you think about nested try/catch
        currently only 2 nested try/catch: alchemy and raw abi call
        cry about it
    */
    let owner;
    try {
        owner = yield alchemy.nft.getOwnersForNft(nftContract, id);
        return owner.owners[0];
    }
    catch (err) {
        try {
            console.log("retry");
            owner = yield contract.ownerOf(id);
            return owner;
        }
        catch (err) {
            console.log(err);
            console.log("too much retry");
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
